import pygame as pg
from random import randrange
from settings import *
VEC = pg.math.Vector2
sprite = pg.sprite.Sprite
timer = pg.time.get_ticks

def draw_text(surface, text, font_size, x, y, color=(BLACK)):
    font_name = pg.font.match_font('arial')
    font = pg.font.Font(font_name, font_size)
    text_surface = font.render(text, True, color)
    text_rect = text_surface.get_rect()
    text_rect.midtop = (x, y)
    text_rect.y = y
    surface.blit(text_surface, text_rect)

class Player(sprite):
    def __init__(self, game):
        self.game = game
        groups = self.game.all_sprites
        sprite.__init__(self, groups)
        self.image_orig = pg.Surface((100, 100), pg.SRCALPHA)
        self.image = self.image_orig
        self.image.fill(GREEN)
        self.rect = self.image.get_rect()
        self.pos = VEC(WIDTH/2, HEIGHT)
        self.vel = VEC(0, 0)
        self.rot = 0
        self.max_rot = 10
        self.timer = timer()
        self.speed = 0
        self.timer_speed = timer()
        self.last_hit = timer()
    def rotate(self):
        ROT_ADD = 1
        now = timer()
        if now - self.timer > 100:
            if self.vel.x > 0:
                self.image = pg.transform.rotate(self.image_orig, -max(self.rot, self.max_rot))
                self.rot = (self.rot + ROT_ADD) % self.max_rot
            elif self.vel.x < 0:
                self.image = pg.transform.rotate(self.image_orig, max(self.rot, self.max_rot))
                self.rot = (self.rot + ROT_ADD) % self.max_rot
            else:
                self.image = pg.transform.rotate(self.image, -20)
                self.image = self.image_orig
                self.rot = max(self.rot - ROT_ADD, 0)
            old_rect = self.rect.center
            self.rect = self.image.get_rect()
            self.rect.center = old_rect
            self.timer = now

    def update(self):
        self.vel = VEC(0, self.vel.y if self.speed > 0 else 0)
        if self.speed < 0:
            self.speed = 0

        keys = pg.key.get_pressed()
        if keys[pg.K_RIGHT]:
            self.vel.x = PLAYER_SPEED
        elif keys[pg.K_LEFT]:
            self.vel.x = -PLAYER_SPEED
        if keys[pg.K_UP]:
            self.vel.y = -max(self.vel.y + self.speed % 10, 3)
        elif keys[pg.K_DOWN]:
            self.vel.y = max(self.vel.y - self.speed % 10, 3)
        else:
            self.vel.y = max(self.vel.y - 0.2, 0.1)

        # Reduce Diagonal
        if abs(self.vel.y) > 0 and abs(self.vel.x) > 0:
            self.vel *= 0.7071 

        SPEED_ADD = 0.5
        if timer() -self.timer_speed> 200:
            if  self.vel.y <= 0.1 and self.speed < 20:
                self.speed += SPEED_ADD
            elif self.vel.y > 0.1 and self.speed -SPEED_ADD >= 0:
                self.speed -= SPEED_ADD
            self.timer_speed = timer()
            
                


        self.pos += self.vel
        self.rect.midbottom = self.pos
        if self.rect.bottom + self.vel.y > HEIGHT:
            self.pos.y -= self.vel.y
            self.rect.midbottom = (self.pos.x, HEIGHT)
        self.rotate()
        
        
class Car(sprite):
    def __init__(self, game):
        self.groups = game.all_sprites, game.group_cars
        sprite.__init__(self, self.groups)
        self.game = game
        self.image = pg.Surface((100, 100))
        self.image.fill(BLUE)
        self.rect = self.image.get_rect()
        self.rect.x = randrange(1, 5) * ROAD_WIDTH
        self.rect.y = randrange(-300, -100)
        self.vel = VEC(0, 0)
    
    def update(self):
        self.vel = VEC(0, -(4/max(self.game.player.speed, 1) + 1))
        self.rect.centery +=  self.vel.y

        if self.rect.bottom + 100 < -100 or self.rect.top > HEIGHT + 100:
            self.kill()
