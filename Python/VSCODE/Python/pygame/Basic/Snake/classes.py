import pygame as pg
from settings import *
from os import path
from random import randrange
GROUP = pg.sprite.Group
sprite = pg.sprite.Sprite
vec = pg.math.Vector2
time = pg.time.get_ticks

class Player(sprite):
    def __init__(self, game):
        self.groups = game.group_all
        sprite.__init__(self, self.groups)
        self.game = game
        self.image = pg.Surface(PLAYER_SIZE)
        self.image.fill(BLUE)
        self.rect= self.image.get_rect()
        self.acc = vec(1, 0)
        self.vel = vec(0, 0)
        self.pos = vec(0 ,0)
        self.direction = Name.RIGHT
        self.last_move = time()

    def move_direction(self):
        MOVE_SPEED = 1
        x, y = MOVE_SPEED,0
        if self.direction == Name.UP:
            x, y = 0,-MOVE_SPEED
        elif self.direction == Name.LEFT:
            x, y = -MOVE_SPEED,0
        elif self.direction == Name.DOWN:
            x, y = 0,MOVE_SPEED
        self.acc = vec(x, y)

    def change_direction(self, direction=Name.RIGHT):
        self.direction = direction

    def update(self):
        self.move_direction()
        self.vel = vec(0, 0)
        self.pos = vec(0, 0)

        if time() - self.last_move > 100:
            self.vel += self.acc
            self.pos += self.vel
            self.rect.center += self.pos * GRID_SIZE
            self.last_move = time()

        if self.rect.right < 0:
            self.rect.left = WIDTH
        if self.rect.left > WIDTH:
            self.rect.right = 0
        if self.rect.bottom < 0:
            self.rect.top = HEIGHT 
        if self.rect.top > HEIGHT:
            self.rect.bottom = 0


class Body(sprite):
    def __init__(self, game):
        self.groups = game.group_all
        game.group_body.append(self)
        sprite.__init__(self, self.groups)
        self.game = game
        self.image = pg.Surface(PLAYER_SIZE)
        self.image.fill(BLUE)
        self.rect= self.image.get_rect()
        self.acc = vec(1, 0)
        self.vel = vec(0, 0)
        self.pos = vec(0 ,0)
        self.direction = Name.RIGHT
        self.last_move = time()

    def move_direction(self):
        MOVE_SPEED = 1
        x, y = MOVE_SPEED,0
        if self.direction == Name.UP:
            x, y = 0,-MOVE_SPEED
        elif self.direction == Name.LEFT:
            x, y = -MOVE_SPEED,0
        elif self.direction == Name.DOWN:
            x, y = 0,MOVE_SPEED
        self.acc = vec(x, y)

    def change_direction(self, direction=Name.RIGHT):
        self.direction = direction

    def update(self):
        self.move_direction()
        self.vel = vec(0, 0)
        self.pos = vec(0, 0)

        if time() - self.last_move > 100:
            self.vel += self.acc
            self.pos += self.vel
            self.rect.center += self.pos * GRID_SIZE
            self.last_move = time()

        if self.rect.right < 0:
            self.rect.left = WIDTH
        if self.rect.left > WIDTH:
            self.rect.right = 0
        if self.rect.bottom < 0:
            self.rect.top = HEIGHT 
        if self.rect.top > HEIGHT:
            self.rect.bottom = 0




