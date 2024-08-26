import pygame as pg
from random import randrange, choice
from settings import *
from os import path
sprited = pg.sprite.Sprite
vec = pg.math.Vector2
time = pg.time.get_ticks

def get_image(filenames, width=50, height=50):
    output = []
    for name in filenames:
        img = pg.image.load(name).convert_alpha()
        img = pg.transform.scale(img, (width, height))
        output.append(img)
    return output


# -----------------------------------------------------------------------------------------------------------------------------

class Player(sprited):
    def __init__(self, game):
        self.game = game
        self.groups = game.group_all
        sprited.__init__(self, self.groups)
        self.images = get_image([path.join(self.game.image_dir, 'player_1.png'), path.join(self.game.image_dir, 'player_2.png')])
        self.image = self.images[0]
        self.rect = self.image.get_rect()
        self.pos = vec(100, HEIGHT/4)
        self.vel = vec(0, 0)
        self.acc = vec(0, 3)
        self.has_flapped = False
        self.last_flapped = 0
        self.rot = 0
        self.radius = 20
        self.frame = 0

    def jump(self):
        self.vel.y = -15
        self.flap()

    def change_image(self):
        self.image = self.images[self.frame]
        

    def flap(self, index=1):
        self.frame = index
        self.has_flapped = True
        self.last_flapped = time()

    def rotate(self):
        self.image = pg.transform.rotate(self.images[self.frame], -self.rot)
        old_center = self.rect.center
        self.rect = self.image.get_rect()
        self.rect.center = old_center

    def update(self):
        if self.vel.y > 0:
            self.rot = min((self.rot + 1), 40)
        elif self.vel.y < 0:
            self.rot = max((self.rot - 3), -20)

        self.change_image()
        self.rotate()
        if self.has_flapped and time() - self.last_flapped > 200:
            self.has_flapped = False
            self.frame = 0
        self.acc = vec(0, 1)
        self.vel += self.acc
        self.pos += self.vel
        self.rect.center = self.pos
        self.mask = pg.mask.from_surface(self.image)
        if self.rect.bottom <= 0 or self.rect.top >= HEIGHT:
            self.game.game_running = False

class Block(sprited):
    def __init__(self, game, x, y, width, height, _type='top',color=BLUE):
        self.groups = game.group_all, game.group_towers
        sprited.__init__(self, self.groups)
        self.game = game
        self.image = pg.transform.scale(self.game.img_pipe, (width, int(height)))
        if _type == 'top':
            self.image = pg.transform.flip(self.image, False, True)

        self.rect = self.image.get_rect()
        self.rect.centerx = x
        self.is_counted = False
        if _type == 'top':
            self.rect.top = y
            self.rect.centery -= 10
        else:
            self.rect.bottom = y
            self.rect.centery += 10
            

    def update(self):
        self.rect.x -= (5 + min((self.game.score // 30),3 ))
        if self.rect.right < -10:
            self.kill()

class Tower(Block):
    def __init__(self, game):
        self.game = game
        self.towers = []
        x = WIDTH + 100
        gap = randrange(150, 300)
        top_percentage = randrange(30, 80)
        bottom_percentage = 100 - top_percentage
        top_height = abs((HEIGHT * (top_percentage /100)) - gap//2)
        bottom_height = abs((HEIGHT * (bottom_percentage /100)) - gap//2)
        # print(top_height , bottom_height, top_height + bottom_height)
        COLOR = choice([BLUE, RED, WHITE])
        self.tower_up = Block(game, x, 0, 100, top_height, 'top',COLOR)
        self.tower_down = Block(game, x, HEIGHT, 100, bottom_height, 'bottom', COLOR)
        self.towers.append(self.tower_up)
        self.towers.append(self.tower_down)



        





