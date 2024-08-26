import pygame
import sys
from images import runLeft, runRight, walkRight, walkLeft, player_size, character, attackRight
pygame.init()
clock = pygame.time.Clock()
WINDOW_SIZE = (500, 500)
window = pygame.display.set_mode(WINDOW_SIZE)
pygame.display.set_caption('PYGAME TUTORIAL')
bg = pygame.image.load('Game\\bg.jpg')


class Player():
    def __init__(self, x, y, width, height):
        self.x = x
        self.y = y
        self.width = width - 40
        self.height = height
        self.velocity = 5
        self.isJumping = False
        self.jumpCount = 10
        self.isLeft = False
        self.isRight = False
        self.walkCount = 0
        self.isRunning = False
        self.jumpHeight = 4
        self.isAttacking = False
        self.attackCount = 0

    def attack(self, state=True):
        global pygame
        if not(self.isAttacking) and not(self.isJumping):
            self.isAttacking = state


run = True
player = Player(250, 400, player_size[0], player_size[1])


def redrawWindow():
    global player
    window.blit(bg, (0, 0))
    if player.walkCount + 1 >= 27:
        player.walkCount = 0

    if player.isAttacking:
        window.blit(attackRight[player.attackCount - 1], (player.x, player.y))
        player.attackCount += 1
        if player.attackCount >= 10:
            player.isAttacking = False
            player.attackCount = 0

    else:
        if player.isLeft:
            if player.isRunning:
                window.blit(runLeft[player.walkCount//3], (player.x, player.y))
            else:
                window.blit(walkLeft[player.walkCount//3],
                            (player.x, player.y))
            player.walkCount += 1
        elif player.isRight:

            if player.isRunning:
                window.blit(runRight[player.walkCount//3],
                            (player.x, player.y))
            else:
                window.blit(walkRight[player.walkCount//3],
                            (player.x, player.y))
            player.walkCount += 1
        else:
            window.blit(character, (player.x, player.y))
    pygame.display.update()


while run:
    print(player.isAttacking, player.attackCount)
    window.fill((0, 0, 0))
    clock.tick(30)
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            run = False
        if event.type == pygame.KEYUP:
            if event.key == pygame.K_LSHIFT:
                player.isRunning = False
                player.jumpHeight = 3
            if event.key == pygame.K_r:
                player.attack()

    if player.isRunning:
        player.velocity = 10
    else:
        player.velocity = 5

    if player.isAttacking:
        clock.tick(25)
        player.attackCount += 1
    else:
        if not(player.isJumping) and player.y + 20 + player.height < WINDOW_SIZE[1]:
            player.y += 20
        keys = pygame.key.get_pressed()
        if keys[pygame.K_r]:
            player.attack()
        if keys[pygame.K_LSHIFT] and not(player.isJumping) and keys[pygame.K_LEFT] or keys[pygame.K_RIGHT]:
            player.isRunning = True
        if keys[pygame.K_LEFT] and (player.x - player.velocity) + player.width//2 >= 0:
            player.x -= player.velocity
            character = walkLeft[0]
            player.isLeft = True
            player.isRight = False

        elif keys[pygame.K_RIGHT] and (player.x + player.velocity) + player.width < WINDOW_SIZE[0]:
            player.x += player.velocity
            character = walkRight[0]
            player.isRight = True
            player.isLeft = False
        else:
            player.isRight = False
            player.isLeft = False
            player.walkCount = 0

        if not(player.isJumping):
            if keys[pygame.K_SPACE]:
                player.isJumping = True
                player.walkCount = 0
        else:
            if player.jumpCount >= -10:
                neg = 1
                if player.isRunning:
                    player.jumpHeight = 2
                if player.jumpCount < 0:
                    neg = -1
                player.y -= (player.jumpCount ** 2) / player.jumpHeight * neg
                player.jumpCount -= 1
            else:
                player.isJumping = False
                player.jumpCount = 10
    redrawWindow()


pygame.quit()
sys.exit()
