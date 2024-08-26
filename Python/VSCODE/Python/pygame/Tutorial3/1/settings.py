from os import path, listdir

WIDTH = 800
HEIGHT = int(WIDTH  * 0.8)
TITLE = 'Shooter'
FPS = 60
TILE_SIZE = WIDTH //16

# GAME -------------
GRAVITY = 0.75

BLUE = (0, 0, 255)
GREEN = (0, 255, 0)
GREEN = (255, 0, 0)
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
BG_COLOR = (144, 201, 120)

DIR_MAIN = path.dirname(__file__)
DIR_IMAGES = path.join(DIR_MAIN, 'images')
DIR_PLAYER = path.join(DIR_IMAGES, 'player')
DIR_ENEMY = path.join(DIR_IMAGES, 'enemy')
DIR_BACKGROUND = path.join(DIR_IMAGES, 'background')
DIR_EXPLOSION = path.join(DIR_IMAGES, 'explosion')
DIR_ICONS = path.join(DIR_IMAGES, 'icons')
DIR_TILE = path.join(DIR_IMAGES, 'tile')


class name:
    idle = 'Idle'
    run = 'Run'
    jump = 'Jump'
    death = 'Death'

    grenade = 'grenade_box'
    health = 'health_box'
    bullet = 'ammo_box'




