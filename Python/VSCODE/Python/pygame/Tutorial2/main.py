import pygame
import random
import sys

WINDOW_SIZE = (480, 360)
FPS = 30
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)

pygame.init()
pygame.mixer.init()
screen = pygame.display.set_mode(WINDOW_SIZE)
pygame.display.set_caption('Tutorial 2')
clock = pygame.time.Clock()

all_sprites = pygame.sprite.Group()


# Game Loop
running = True
while running:
    clock.tick(FPS)
    # Events
    for event in pygame.event.get():
        if event.type is pygame.QUIT:
            running = False

    # Update
    all_sprites.update()
    # Draw
    screen.fill(BLACK)
    all_sprites.draw(screen)
    # Last
    pygame.display.flip()


pygame.quit()
sys.exit()
