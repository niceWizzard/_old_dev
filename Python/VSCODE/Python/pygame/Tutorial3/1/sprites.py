import pygame as pg
from settings import *
from random import randrange, choice
sprite = pg.sprite.Sprite
vec = pg.math.Vector2
get_time = pg.time.get_ticks

def load_array_image(arr, scale=3):
    output = []
    for name in arr:
        img = load_img(name, scale)
        output.append(img)
    return output

def load_img(filename,scale=3):
        img = pg.image.load(filename).convert_alpha()
        img = pg.transform.scale(img, (img.get_width() *scale, img.get_height() *scale))
        return img

class Soldier(sprite):
    def __init__(self, game, char_type, x, y, scale, speed, ammo=20, shoot_cd=100):
        self.game = game
        self.groups = game.group_all, game.group_mobs
        sprite.__init__(self, self.groups)
        self.is_alive = True
        self.char_type = char_type
        self.speed = speed
        self.direction = 1
        self.flip = False
        self.images = {}
        self.action = name.idle
        self.load_images()
        self.frame = 0
        self.image = self.images[self.action][0]
        self.rect = self.image.get_rect()
        self.rect.center = (x, y)
        self.moving_right = False
        self.moving_left = False
        self.d = vec(0, 0)
        self.frame_rate = 100
        self.timer_last_update = 0
        self.is_jumping = False
        self.in_air = True
        self.vel = vec(0, 0)
        self.last_shot = 0
        self.last_thrown = 0
        self.shoot_cd = shoot_cd
        self.health = 100
        self.max_health = self.health
        self.ammo = ammo
        self.ammo_grenades = 5

    def shoot(self):
        if self.is_alive:
            now = get_time()
            if now - self.last_shot > self.shoot_cd and self.ammo > 0:
                Bullet(self.game, self.rect.centerx + (self.rect.width//1.5 * self.direction), self.rect.centery, self.direction)
                self.last_shot = now
                self.ammo -= 1
        
    def check_is_alive(self):
        if self.health <= 0:
            self.is_alive = False
            self.health = 0
            self.d *= 0
            self.update_action(name.death)

    def load_images(self):
        animation_types = [name.idle, name.run, name.jump, name.death]
        _dir = DIR_ENEMY
        if self.char_type == 'player':
            _dir = DIR_PLAYER
        for animation in animation_types:
            temp = []
            number_of_frames = len(listdir(path.join(_dir, animation)))
            for i in range(number_of_frames):
                fil = path.join(_dir, animation, f'{i}.png')
                temp.append(fil)
            self.images[animation] = load_array_image(temp)

    def move(self):
        self.d = vec(0, 0)
        # APply Gravity
        self.vel.y += GRAVITY
        self.vel.y = min(self.vel.y, 20)
        if self.is_alive:
            if self.moving_left:
                self.d.x = -self.speed
                self.flip = True
                self.direction = -1
            if self.moving_right:
                self.d.x = self.speed
                self.flip = False
                self.direction = 1
            

            if self.is_jumping and not self.in_air:
                self.vel.y = -11
                self.is_jumping = False
                self.in_air = True
            else:
                self.is_jumping = False

        self.d += self.vel
        if self.rect.bottom + self.d.y > 300:
            self.d.y = 300 - self.rect.bottom
            self.in_air = False

        self.rect.topleft += self.d


    def throw_grenade(self):
        now = get_time()
        if now - self.last_thrown > 200 and self.ammo_grenades >0 :
            Grenade(self.game, self.rect.centerx + (self.rect.width/3 * self.direction), 
                self.rect.top,
                self.direction)    
            self.last_thrown = now
            self.ammo_grenades -= 1
    
    def animate(self):
        now = get_time()
        if now - self.timer_last_update > self.frame_rate:
            amount = (self.frame + 1)
            self.frame = amount
            self.timer_last_update = now
        action_length = len(self.images[self.action])
        if self.frame >= action_length and self.action == name.death:
            self.frame = action_length - 1
        else:
            self.frame = (self.frame) % (len(self.images[self.action]))
        self.image = self.images[self.action][self.frame]

    def update_action(self, new_action):
        if new_action != self.action:
            self.action = new_action
            self.frame = 0
            self.timer_last_update = get_time()

    def update(self):
        self.check_is_alive()
        self.shoot() if self.char_type != 'player' else ''
        self.move() if self.alive else ''
        if self.is_alive:
            if self.in_air:
                self.update_action(name.jump)
            elif self.moving_left or self.moving_right:
                self.update_action(name.run)
            else:
                self.update_action(name.idle)

        self.animate()
        self.image = pg.transform.flip(self.image, self.flip, False)

class Consumables(sprite):
    def __init__(self, game, _type,x, y):
        self.game = game
        self.groups = game.group_all, game.group_consumables
        sprite.__init__(self, self.groups)
        self._type = _type
        self.item_boxes = {}
        self.load_image()
        self.image = self.item_boxes[self._type]
        self.rect = self.image.get_rect()
        self.rect.midtop = (x + TILE_SIZE//2, y+ TILE_SIZE - self.image.get_height())
    
    def load_image(self):
        temp = [name.bullet, name.grenade, name.health]
        for i in temp:
            file =path.join(DIR_ICONS, f'{i}.png')
            self.item_boxes[i] = load_img(file, 1)
            
class Bullet(sprite):
    def __init__(self, game, x, y, direction):
        self.groups = game.group_all, game.group_bullet
        sprite.__init__(self, self.groups)
        self.speed = 10
        self.image = pg.image.load(path.join(DIR_ICONS, 'bullet.png')).convert_alpha()
        self.rect = self.image.get_rect()
        self.rect.center = (x, y)
        self.direction = direction
        
    
    def update(self):
        self.rect.centerx += (self.speed * self.direction)
        if self.rect.right < 0 or self.rect.right > WIDTH:
            self.kill()

class Grenade(sprite):
    def __init__(self, game, x, y, direction):
        self.game = game
        self.groups = game.group_all, game.group_grenade
        sprite.__init__(self, self.groups)
        self.timer = get_time()
        self.direction = direction
        self.player_vel = game.player.d
        self.speed = (8 + (self.player_vel.x )//2.5  * self.direction) 
        self.vel = vec((self.speed, -11))
        self.image = pg.image.load(path.join(DIR_ICONS, 'grenade.png')).convert_alpha()
        self.rect = self.image.get_rect()
        self.rect.center = (x, y)
        self.last_updated = 0 
        self.bounce = 2
        
    def explode(self):
            self.kill() 
            Explosion(self.game, self.rect.centerx, self.rect.centery, 2)

    def update(self):
        now = get_time()
        if now - self.timer > 1500:
            self.explode()
            

        self.vel = vec((self.speed * self.direction, self.vel.y))
        self.vel.y += GRAVITY

        # 
        if self.rect.bottom + self.vel.y > 300:
            self.vel.y = 300 - self.rect.bottom
            if get_time() - self.last_updated > 200:
                self.vel.y = -6 if self.bounce > 0 else 0
                self.bounce -= 1
                if self.direction > 0:
                    self.speed = max(self.speed - 2.2 , 0)
                else:
                    self.speed = max(abs(self.speed) - 2.2, 0)
                self.last_updated = get_time()
        
        if self.rect.left + self.vel.x < 0 or self.rect.right + self.vel.x > WIDTH:
            self.direction *= -1
        
        self.rect.center += self.vel

class Explosion(sprite):
    def __init__(self, game ,x, y, scale):
        self.groups = game.group_all, game.group_explosion
        sprite.__init__(self, self.groups)
        self.scale = scale
        self.load_images()
        self.last_updated = 0
        self.frame_rate = 80
        self.frame = 0
        self.image = self.images[0]
        self.rect = self.image.get_rect()
        self.rect.center = (x, y)
        self.radius = 40 * scale
        self.has_hit = False

    def load_images(self):
        temp = []
        for i in range(1, 5):
            temp.append(path.join(DIR_EXPLOSION, f'exp{i}.png'))
        self.images = load_array_image(temp, self.scale)


    def update(self):
        now = get_time()
        if now - self.last_updated > self.frame_rate:
            self.frame = (self.frame + 1)
            self.last_updated = now
            if self.frame >= len(self.images):
                self.frame = len(self.images) - 1
                self.kill()
            self.image = self.images[self.frame]
        