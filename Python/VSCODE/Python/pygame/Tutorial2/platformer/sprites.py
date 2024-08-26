from settings import *
import pygame as pg
from random import choice, randrange
VECTOR = pg.math.Vector2
sprite = pg.sprite.Sprite

def new_rect_bottom(image, bottom):
    rect = image.get_rect()
    rect.bottom = bottom
    return rect

def draw_health(surface, x, y, amount, width=100, height=10, COLOR=(0, 255,0), LOW_COLOR=(250, 0,0)):
    if amount < 0:
        amount = 0
    percentage = (amount/100) * width
    outline_rect = pg.Rect(x, y, width, height)
    fill_rect = pg.Rect(x, y, percentage, height)
    COLOR = COLOR if amount > 30 else LOW_COLOR
    pg.draw.rect(surface, COLOR, fill_rect)
    pg.draw.rect(surface, (255, 255, 255), outline_rect, int(height * 1/4))

class Spritesheet:  
    def __init__(self, filename, ):
        self.spritesheet = pg.image.load(filename).convert()

    def get_image(self, x, y, width, height, color_key=BLACK):
        image = pg.Surface((width, height))
        image.blit(self.spritesheet, (0, 0), (x,y,width, height))
        image = pg.transform.scale(image, (width//3, height//3))
        image.set_colorkey(color_key)
        return image
    
    def scale_image(self, size, x, y, width, height, color_key=BLACK):
        image = self.get_image(x, y, width, height, color_key)
        return pg.transform.scale(image, size)


class Player(sprite):
    def __init__(self, game):
        self.groups = game.all_sprites
        self._layer = ORDER_PLAYER
        pg.sprite.Sprite.__init__(self, self.groups)
        self.game = game
        self.load_images()
        self.image = self.game.spritesheet.get_image(614 ,1063 ,120, 191)
        self.rect = self.image.get_rect()
        self.rect.center = (SIZE['width']/2, SIZE['height'] -100)
        self.pos = VECTOR(40, SIZE['height'] - 100)
        self.vel = VECTOR(0, 0)
        self.acc = VECTOR(0, 0)
        self.walking = False
        self.jumping = False
        self.current_frame = 0
        self.last_update = 0 
        self.is_invinsible = False
        self.health = 100
        self.timer_last_hit = 0
        self.is_hurt = False
        self.timer_last_shown_health_bar = 0
        self.show_health = False
        self.smoke_appear = False
        self.timer_bubble = 0

        
    def reduce_health(self, amount, is_hurt=True):
        now = pg.time.get_ticks()
        good = now - self.timer_last_hit > 1000
        if good:
            if not self.smoke_appear:
                self.vel.x = 0
                self.vel.y = 0
                self.game.sounds['player_hurt'].play()
                self.health -= amount
                self.is_hurt = is_hurt
                self.show_health = True
                self.timer_last_shown_health_bar = now
            elif self.smoke_appear:
                self.timer_bubble -= 5000
            self.timer_last_hit = now
            
            


    def load_images(self):
        self.frames_standing = [self.game.spritesheet.get_image(614, 1063, 120, 191),
                                self.game.spritesheet.get_image(690, 406, 120, 201) ]
        self.frames_walking_right = [self.game.spritesheet.get_image(678, 860, 120, 201 ),
                                    self.game.spritesheet.get_image(692, 1458, 120, 207 )]
        self.frames_walking_left = []
        for i in self.frames_walking_right:
            self.frames_walking_left.append(pg.transform.flip(i, True, False) )
        self.frames_jump = self.game.spritesheet.get_image(382, 763, 150, 181)
        self.frames_hurt = self.game.spritesheet.get_image(382, 946, 150, 174)

    def jump(self):
        self.rect.y += 4
        hits = pg.sprite.spritecollide(self, self.game.group_platform, False)
        self.rect.y -= 4
        if hits and not self.jumping and not self.is_hurt:
            self.vel.y = -PLAYER_JUMP
            self.game.sounds['player_jump'].play()
            self.jumping = True        

    def update(self):
        self.animate()
        
        self.acc = VECTOR(0, 0.4)
        keys = pg.key.get_pressed()
        if keys[pg.K_LEFT] and not self.is_hurt or keys[pg.K_a] and not self.is_hurt:
            self.acc.x = -PLAYER_ACC
            self.walking = True
        elif keys[pg.K_RIGHT] and not self.is_hurt or keys[pg.K_d] and not self.is_hurt:
            self.acc.x = PLAYER_ACC
            self.walking = True
        else:
            self.walking =False
        self.acc.x += self.vel.x * PLAYER_FRICTION
        self.vel += self.acc
        if abs(self.vel.x) < 0.3:
            self.vel.x = 0
        self.pos += self.vel + 0.7 * self.acc
        #
        if self.rect.left > SIZE['width']:
            self.pos.x = 0 - self.rect.width/2
        if self.rect.right < 0:
            self.pos.x = SIZE['width'] + self.rect.width/2

        self.rect.midbottom = self.pos

    def animate(self):
        now = pg.time.get_ticks()
        if now - self.timer_last_shown_health_bar > 1500:
            self.show_health = False
        if self.smoke_appear:
                if now - self.timer_bubble > 10000:
                    self.smoke_appear = False
        
        old_bottom = self.rect.bottom
        if self.is_hurt:
            self.image = self.frames_hurt
            self.rect = new_rect_bottom(self.image, old_bottom)
            if now - self.timer_last_hit > 800:
                self.is_hurt = False
        elif self.walking:
            if now - self.last_update > 200:
                self.last_update = now
                self.current_frame  = (self.current_frame + 1) % len(self.frames_walking_right)
                old_bottom = self.rect.bottom
                if self.vel.x > 0:
                    self.image = self.frames_walking_right[self.current_frame]
                else:
                    self.image = self.frames_walking_left[self.current_frame]
                self.rect = self.image.get_rect()
                self.rect.bottom = old_bottom
        
        elif not self.jumping and not self.walking:
            if now - self.last_update > 500:
                self.last_update = now
                self.current_frame  = (self.current_frame + 1) % len(self.frames_standing)
                self.image = self.frames_standing[self.current_frame]
                self.rect = self.image.get_rect()
                self.rect.bottom = old_bottom

        self.mask = pg.mask.from_surface(self.image)


class Cloud(sprite):
    def __init__(self, game):
        self.groups = game.all_sprites, game.group_clouds
        self._layer = ORDER_CLOUD
        pg.sprite.Sprite.__init__(self, self.groups)
        self.game = game
        self.image = choice(self.game.images_cloud)
        self.rect = self.image.get_rect()
        scale = randrange(50, 120)/ 100
        self.image = pg.transform.scale(self.image, (int(self.rect.width * scale), int(self.rect.height * scale)))
        self.rect.x = randrange(SIZE['width'] - self.rect.width)
        self.rect.y = randrange(-500, -50)
        self.x_speed = randrange(1)
        self.last_update = 0
    def update(self):
        now = pg.time.get_ticks()

        if now -  self.last_update > 400:
            self.last_update = now
            self.rect.x += self.x_speed

        self.rect.x += randrange(2) if randrange(100) < 2 else 0 
        if self.rect.top > SIZE['height'] + 100 or self.rect.right <= -100 or self.rect.left > SIZE['width'] + 100 :
            self.kill()

class Platform(sprite):
    def __init__(self, game, x, y):
        self.groups = game.all_sprites, game.group_platform
        self._layer = ORDER_PLATFORM
        pg.sprite.Sprite.__init__(self, self.groups)
        self.game = game
        images = [self.game.spritesheet.get_image(0, 288, 380, 94), self.game.spritesheet.scale_image((100, 20),213, 1662, 201, 100)]
        self.image = choice(images)
        self.rect = self.image.get_rect()
        self.rect.x = x
        self.rect.y = y
        if randrange(100) < POWER_SPAWN_CHANCE:
            Powerup(self.game, self)




class Powerup(sprite):
    def __init__(self, game, platform):
        self._layer = ORDER_POWER
        self.groups = game.all_sprites, game.group_powerups
        pg.sprite.Sprite.__init__(self, self.groups)
        self.game = game
        self.platform = platform
        self.type = choice([Name.boost, Name.heal, Name.bubble])
        if self.type == Name.boost:
            self.image = self.game.spritesheet.get_image(820, 1805, 71, 70)
        elif self.type == Name.heal:
            self.image = self.game.spritesheet.get_image(820 ,1733, 78, 70)
        elif self.type == Name.bubble:
            self.image = self.game.spritesheet.get_image(826,134, 71, 70)
        self.rect = self.image.get_rect()
        self.rect.centerx = self.platform.rect.centerx
        self.rect.bottom = self.platform.rect.top - 10

    def update(self):
        self.rect.bottom = self.platform.rect.top - 10
        if not self.game.group_platform.has(self.platform):
            self.kill()
#
class Mob(sprite):
    def __init__(self, game, image, typed):
        self._layer = ORDER_MOB
        self.groups = game.all_sprites, game.group_mobs
        pg.sprite.Sprite.__init__(self, self.groups)
        self.game = game
        self.image = image
        self.rect =self.image.get_rect()
        self.last_update = 0
        self.frame = 0
        self.damage = 15
        self.type = typed
        self.frame_rate = 200
  




class Platform_Mob(Mob):
    def __init__(self, game, platform):
        self.game = game
        self.image_idle = self.game.spritesheet.get_image(814,1417, 90, 155)
        self.image_walking_right  = [self.game.spritesheet.get_image(704,1256, 120, 159), self.game.spritesheet.get_image(812, 296, 90, 155)]
        self.image_walking_left = []
        for i in self.image_walking_right:
            hm = pg.transform.flip(i, True, False)
            self.image_walking_left.append(hm)
        super().__init__(game,  self.image_idle, Name.pointy_mob)
        self.platform = platform
        self.rect.x = self.platform.rect.centerx
        self.rect.bottom = self.platform.rect.top
        self.x_speed = 1
        self.damage = 30

    def animate(self):
        now = pg.time.get_ticks()
        if self.x_speed > 0:
            if now - self.last_update > self.frame_rate:
                old_center= self.rect.center
                self.image = self.image_walking_right[self.frame]
                self.frame = (self.frame + 1) % len(self.image_walking_right)
                self.rect = self.image.get_rect()
                self.rect.center = old_center
                self.last_update = now
        else:
            if now - self.last_update > self.frame_rate:
                old_center= self.rect.center
                self.image = self.image_walking_left[self.frame]
                self.frame = (self.frame + 1) % len(self.image_walking_left)
                self.rect = self.image.get_rect()
                self.rect.center = old_center
                self.last_update = now

    def update(self):
        self.animate()
        if self.x_speed > 0:
            if self.rect.right > self.platform.rect.right:
                self.x_speed *= -1
        else:
            if self.rect.left < self.platform.rect.left:
                self.x_speed *= -1
        self.rect.x += self.x_speed

class Flying_Mob(Mob):
    def __init__(self, game, images, typed):
        self.game = game
        self.type = typed
        self.images = images
        super().__init__(game, self.images[0], self.type)
        self.rect =self.image.get_rect()
        self.rect.centerx = randrange(SIZE['width'])
        self.rect.y = randrange( -200, -100 )
        self.x_speed = randrange(1, 2)/5
        self.y_speed_orig =  randrange(1, 2)
        self.y_speed = self.y_speed_orig
        self.dy = 0.5
        self.last_update = 0
        self.frame = 0
        self.damage = 30
        self.type = typed
        self.frame_rate = 200
        self.timer_first_pushed = pg.time.get_ticks()
        self.should_push = False
        self.push_amount = 1
    def push_down(self, amount=10):
        now = pg.time.get_ticks()
        self.should_push = True
        timer = now - self.timer_first_pushed 
        if timer > 1000/FPS:
            self.y_speed += amount - self.push_amount
            self.timer_first_pushed = now
            self.push_amount += 1
        if self.push_amount >= amount:
            self.should_push = False
            self.push_amount = 0

    def update(self):
        self.y_speed = self.y_speed_orig
        self.push_down() if self.should_push else ''
        self.rect.x += self.x_speed
        self.rect.y += self.y_speed
        now = pg.time.get_ticks()
        if now - self.last_update > self.frame_rate:
            self.last_update = now
            center = self.rect.center
            self.frame = (self.frame + 1) % len(self.images) if not self.should_push else 0
            self.image = self.images[self.frame]
            self.rect = self.image.get_rect()
            self.rect.center = center
            self.mask = pg.mask.from_surface(self.image)

        if self.rect.top > SIZE['height'] + 100:
            self.kill()


class HeliMob(Flying_Mob):
    def __init__(self, game):
        self.game =game
        images =[self.game.spritesheet.get_image(566, 510, 122, 139), self.game.spritesheet.get_image(568, 1534, 122, 135)]
        super().__init__(self.game, images, Name.helicopter_mob)    
        self.frame_rate = 250
        self.y_speed = randrange(1, 4)
    
    def update(self):
        self.rect.x += self.x_speed
        self.rect.y += self.y_speed
        now = pg.time.get_ticks()
        if now - self.last_update > self.frame_rate:
            self.last_update = now
            center = self.rect.center
            self.frame = (self.frame + 1) % len(self.images)
            self.image = self.images[self.frame] if not self.should_push else self.game.spritesheet.get_image(692, 1667 ,120 ,132)
            self.rect = self.image.get_rect()
            self.rect.center = center
            self.rect.centery += 8 if self.frame == 1 else -8
            self.mask = pg.mask.from_surface(self.image)

        if self.rect.top > SIZE['height'] + 100:
            self.kill()

class Bird_Mob(Flying_Mob):
    def __init__(self, game):
        self.game = game
        images = [self.game.spritesheet.get_image(382,635, 174, 126), self.game.spritesheet.get_image(0, 1879, 206, 107), self.game.spritesheet.get_image(0 ,1559, 216, 101), self.game.spritesheet.get_image(0, 1456,216, 101),self.game.spritesheet.get_image(382, 510, 182, 123)]
        super().__init__(self.game, images, Name.bird_mob)
        self.frame_rate = 100
        self.y_speed = randrange(1, 3)
# 


