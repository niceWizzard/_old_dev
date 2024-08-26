import pygame as pg
from settings import *
from tilemap import collide_hitbox
sprite = pg.sprite.Sprite
time = pg.time.get_ticks
collide = pg.sprite
vec = pg.math.Vector2


def collide_with_walls(sprite, group,dir):
    if dir == 'x':
        hits = collide.spritecollide(sprite, group, False, collide_hitbox)
        if hits:
            if sprite.vel.x > 0:
                sprite.pos.x = hits[0].rect.left - sprite.hitbox.width /2
            if sprite.vel.x < 0:
                sprite.pos.x = hits[0].rect.right   + sprite.hitbox.width /2
            sprite.vel.x = 0
            sprite.hitbox.centerx = sprite.pos.x
    elif dir == 'y':
        hits = collide.spritecollide(sprite, sprite.game.group_walls, False, collide_hitbox)
        if hits:
            if sprite.vel.y > 0:
                sprite.pos.y = hits[0].rect.top - sprite.hitbox.height / 2
            if sprite.vel.y < 0:
                sprite.pos.y = hits[0].rect.bottom + sprite.hitbox.height / 2
            sprite.vel.y = 0
            sprite.hitbox.centery = sprite.pos.y


class Player(sprite):
    def __init__(self, game, x, y):
        self.groups = game.all_sprites
        sprite.__init__(self, self.groups)
        self.game = game
        self.image = game.player_img
        self.rect = self.image.get_rect()
        self.hitbox = PLAYER_HIT_RECT
        self.hitbox.center = self.rect.center
        self.pos = vec(x,y ) * TILE_SIZE
        self.vel = vec(0 ,0)
        self.rot = 0

    def get_keys(self):
        self.rot_speed = 0
        self.vel = vec(0, 0)
        keys = pg.key.get_pressed()
        if keys[pg.K_LEFT] or keys[pg.K_a]:
            self.rot_speed = PLAYER_ROTATE_SPEED
        if keys[pg.K_RIGHT] or keys[pg.K_d]:
            self.rot_speed = -PLAYER_ROTATE_SPEED
        if keys[pg.K_UP] or keys[pg.K_w]:
            self.vel = vec(PLAYER_SPEED, 0).rotate(-self.rot)
        if keys[pg.K_DOWN] or keys[pg.K_s]:
            self.vel = vec(-PLAYER_SPEED / 2, 0).rotate(-self.rot)


                
    def update(self):
        self.get_keys()
        self.rot = (self.rot + self.rot_speed * self.game.dt) % 360
        self.image = pg.transform.rotate(self.game.player_img, self.rot)
        self.rect = self.image.get_rect()
        self.rect.center = self.pos
        self.pos += self.vel * self.game.dt
        self.hitbox.centerx = self.pos.x
        collide_with_walls(self, self.game.group_walls,'x')
        self.hitbox.centery = self.pos.y
        collide_with_walls(self, self.game.group_walls,'y')
        self.rect.center = self.hitbox.center

class Wall(sprite):
    def __init__(self, game, x, y):
        self.groups = game.all_sprites, game.group_walls
        pg.sprite.Sprite.__init__(self, self.groups)
        self.game = game
        self.image = game.wall_img
        self.rect = self.image.get_rect()
        self.x = x
        self.y = y
        self.rect.x = x * TILE_SIZE
        self.rect.y = y * TILE_SIZE

class Mob(sprite):
    def __init__(self, game, x, y):
        self.groups = game.all_sprites, game.group_mobs
        pg.sprite.Sprite.__init__(self, self.groups)
        self.game = game
        self.image = game.image_mob
        self.rect = self.image.get_rect()
        self.pos = vec(x, y) * TILE_SIZE
        self.rect.center = self.pos
        self.rot = 0
        self.vel = vec(0, 0)
        self.acc = vec(0, 0)
        self.hitbox = MOB_HITBOX.copy()
        self.hitbox.center = self.rect.center

    def update(self):
        self.rot = (self.game.player.pos -self.pos).angle_to(vec(1, 0))
        self.image = pg.transform.rotate(self.game.image_mob, self.rot)
        self.rect = self.image.get_rect()
        self.rect.center = self.pos
        self.acc = vec(MOB_SPEED, 0).rotate(-self.rot)
        self.acc += self.vel  * -1  
        self.vel += self.acc * self.game.dt
        self.pos += self.vel * self.game.dt + 0.5 * self.acc * self.game.dt ** 2
        self.hitbox.centerx = self.pos.x
        collide_with_walls(self, self.game.group_walls, 'x')
        self.hitbox.centery = self.pos.y
        collide_with_walls(self, self.game.group_walls, 'y')
        self.rect.center = self.hitbox.center



        
