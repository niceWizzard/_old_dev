import pygame as pg
from settings import *

def collide_hitbox(one, two):
    return one.hitbox.colliderect(two.rect)


class Map:
    def __init__(self, filename):
        self.data = []
        with open(filename, 'rt') as file:
            for line in file:
                self.data.append(line.strip())

        self.tile_width = len(self.data[0])
        self.tile_height = len(self.data)
        self.width = self.tile_width * TILE_SIZE
        self.height = self.tile_height * TILE_SIZE


class Camera:
    def __init__(self, width, height, target):
        self.camera = pg.Rect(0,0, width, height)
        self.width = width
        self.height = height
    
    def apply(self, entity):
        return entity.rect.move(self.camera.topleft)
    
    def update(self, target):
        x = -target.rect.centerx + int(WIDTH/2)
        y = -target.rect.centery + int(HEIGHT/2)
        # Limit
        x = min(0, x)
        y = min(0, y)
        x = max(-(self.width - WIDTH), x)
        y = max(-(self.height - HEIGHT), y)
        self.camera = pg.Rect(x, y, self.width, self.height)
