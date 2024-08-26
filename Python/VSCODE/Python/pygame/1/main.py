import pygame
import sys
pygame.init()
pygame.display.set_caption(('Thing!'))

clock = pygame.time.Clock()
Velocity = pygame.math.Vector2
WINDOW_SIZE = (800, 500)

window = pygame.display.set_mode(WINDOW_SIZE)


class Position():
    def __init__(self, x, y):
        self.x = x
        self.y = y


class Size():
    def __init__(self, width, height):
        self.width = width
        self.height = height


class Player():
    global pygame, window

    def __init__(self, size, pos, vel):
        self.position = Position(pos[0], pos[1])
        self.velocity = Velocity(vel[0], vel[1])
        self.size = Size(size[0], size[1])
        self.isJumping = False
        self.isFalling = False
        self.jumpTime = 10

    def get_bottom(self):
        return self.size.height + self.position.y

    def move_x(self, value, limit):
        if self.position.x + value > 0 and self.position.x + value < limit - self.size.width:
            self.position.x += value

    def jump(self):
        print("PRINGITN!", not(self.isJumping))
        if not(self.isJumping):
            self.isJumping = True

    def update(self):
        pygame.draw.rect(window, (0, 200, 0), pygame.Rect(
            self.position.x, self.position.y, self.size.width, self.size.height))


player = Player((50, 80), (250, 250), (8, 1))


def redrawWindow():
    global pygame, player
    player.update()
    pygame.display.flip()


gravity = 10

while True:
    entities = [player]
    window.fill((0, 0, 0))
    clock.tick(30)
    for entity in entities:
        if entity.get_bottom() + gravity < WINDOW_SIZE[1] and not(entity.isJumping):
            entity.position.y += gravity
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()
    keys = pygame.key.get_pressed()
    if keys[pygame.K_d]:
        player.move_x(player.velocity.x, WINDOW_SIZE[0])
    if keys[pygame.K_a]:
        player.move_x(player.velocity.x * -1, WINDOW_SIZE[0])
    if keys[pygame.K_SPACE]:
        player.isJumping = True

    print(player.isJumping)
    if player.isJumping:
        if player.jumpTime >= -10:
            neg = 1
            if player.jumpTime < 0:
                neg = -1
            player.position.y -= (player.jumpTime **
                                  2)//10 * neg
            player.jumpTime -= 1
        else:
            player.isJumping = False
            player.jumpTime = 10
    redrawWindow()
