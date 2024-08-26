# Game settings
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)
YELLOW = (255, 255, 0)


TITLE = 'Jump Game!'
SIZE = {'width': 480, 'height': 600}
FPS = 60
FONT_NAME = 'arial'
BG_COLOR = (0, 155, 155)
DATA_FILE = 'data.txt'
SPRITESHEET_NAME = 'spritesheet_jumper.png'

# PLAYER
PLAYER_ACC = 0.3
PLAYER_FRICTION = -0.1
PLAYER_JUMP = 13

# Game properties
BOOST_POWER = 50
POWER_SPAWN_CHANCE = 7
MOB_SPAWN_CHANCE = 5 * 1000

ORDER_PLAYER = 2
ORDER_PLATFORM = 1
ORDER_POWER = 1
ORDER_MOB = 2
ORDER_CLOUD = 0
# Platforms

PLATFORM_LIST = [
    (0, SIZE['height'] - 50), (100, SIZE['height'] - 50), (200, SIZE['height'] - 50), (300, SIZE['height'] - 50), (430, SIZE['height'] - 50),
    (SIZE['width']/2 - 50, 400 ),
    (300, SIZE['height'] - 500 ),
    (10000, SIZE['height'] - 20 ),
    (20, SIZE['height'] - 320 ),
    (300, SIZE['height'] - 120 ),
]

# COLORS

class Name:
    helicopter_mob = 'helimob'
    bird_mob = 'bird_mob'
    pointy_mob = 'pointy_mob'

    bubble = 'bubble'
    heal = 'heal'
    boost = 'boost'
