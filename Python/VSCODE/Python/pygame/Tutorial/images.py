import pygame


player_size = (100, 100)


walkLeft = [
    pygame.transform.scale(pygame.transform.flip(pygame.image.load(
        ('png\Walk (2).png')), True, False), player_size),
    pygame.transform.scale(pygame.transform.flip(pygame.image.load(
        ('png\Walk (2).png')), True, False), player_size),
    pygame.transform.scale(pygame.transform.flip(pygame.image.load(
        ('png\Walk (3).png')), True, False), player_size),
    pygame.transform.scale(pygame.transform.flip(pygame.image.load(
        ('png\Walk (4).png')), True, False), player_size),
    pygame.transform.scale(pygame.transform.flip(pygame.image.load(
        ('png\Walk (5).png')), True, False), player_size),
    pygame.transform.scale(pygame.transform.flip(pygame.image.load(
        ('png\Walk (6).png')), True, False), player_size),
    pygame.transform.scale(pygame.transform.flip(pygame.image.load(
        ('png\Walk (7).png')), True, False), player_size),
    pygame.transform.scale(pygame.transform.flip(pygame.image.load(
        ('png\Walk (8).png')), True, False), player_size),
    pygame.transform.scale(pygame.transform.flip(pygame.image.load(
        ('png\Walk (9).png')), True, False), player_size),
    pygame.transform.scale(pygame.transform.flip(pygame.image.load(('png\Walk (10).png')), True, False), player_size)]

walkRight = [
    pygame.transform.scale(pygame.image.load(
        ('png\Walk (1).png')), player_size),
    pygame.transform.scale(pygame.image.load(
        ('png\Walk (2).png')), player_size),
    pygame.transform.scale(pygame.image.load(
        ('png\Walk (3).png')), player_size),
    pygame.transform.scale(pygame.image.load(
        ('png\Walk (4).png')), player_size),
    pygame.transform.scale(pygame.image.load(
        ('png\Walk (5).png')), player_size),
    pygame.transform.scale(pygame.image.load(
        ('png\Walk (6).png')), player_size),
    pygame.transform.scale(pygame.image.load(
        ('png\Walk (7).png')), player_size),
    pygame.transform.scale(pygame.image.load(
        ('png\Walk (8).png')), player_size),
    pygame.transform.scale(pygame.image.load(
        ('png\Walk (9).png')), player_size),
    pygame.transform.scale(pygame.image.load(('png\Walk (10).png')), player_size)]

runRight = [
    pygame.transform.scale(pygame.image.load(
        ('png\Run (1).png')), player_size),
    pygame.transform.scale(pygame.image.load(
        ('png\Run (2).png')), player_size),
    pygame.transform.scale(pygame.image.load(
        ('png\Run (3).png')), player_size),
    pygame.transform.scale(pygame.image.load(
        ('png\Run (4).png')), player_size),
    pygame.transform.scale(pygame.image.load(
        ('png\Run (5).png')), player_size),
    pygame.transform.scale(pygame.image.load(
        ('png\Run (6).png')), player_size),
    pygame.transform.scale(pygame.image.load(
        ('png\Run (7).png')), player_size),
    pygame.transform.scale(pygame.image.load(
        ('png\Run (8).png')), player_size),
    pygame.transform.scale(pygame.image.load(
        ('png\Run (9).png')), player_size),
    pygame.transform.scale(pygame.image.load(('png\Run (10).png')), player_size)]

runLeft = [
    pygame.transform.scale(pygame.transform.flip(pygame.image.load(
        ('png\Run (1).png')), True, False), player_size),
    pygame.transform.scale(pygame.transform.flip(pygame.image.load(
        ('png\Run (2).png')), True, False), player_size),
    pygame.transform.scale(pygame.transform.flip(pygame.image.load(
        ('png\Run (3).png')), True, False), player_size),
    pygame.transform.scale(pygame.transform.flip(pygame.image.load(
        ('png\Run (4).png')), True, False), player_size),
    pygame.transform.scale(pygame.transform.flip(pygame.image.load(
        ('png\Run (5).png')), True, False), player_size),
    pygame.transform.scale(pygame.transform.flip(pygame.image.load(
        ('png\Run (6).png')), True, False), player_size),
    pygame.transform.scale(pygame.transform.flip(pygame.image.load(
        ('png\Run (7).png')), True, False), player_size),
    pygame.transform.scale(pygame.transform.flip(pygame.image.load(
        ('png\Run (8).png')), True, False), player_size),
    pygame.transform.scale(pygame.transform.flip(pygame.image.load(
        ('png\Run (9).png')), True, False), player_size),
    pygame.transform.scale(pygame.transform.flip(pygame.image.load(('png\Run (10).png')), True, False), player_size)]

attackRight = [
    pygame.transform.scale(pygame.image.load(
        ('png\Attack (1).png')), player_size),
    pygame.transform.scale(pygame.image.load(
        ('png\Attack (2).png')), player_size),
    pygame.transform.scale(pygame.image.load(
        ('png\Attack (3).png')), player_size),
    pygame.transform.scale(pygame.image.load(
        ('png\Attack (4).png')), player_size),
    pygame.transform.scale(pygame.image.load(
        ('png\Attack (5).png')), player_size),
    pygame.transform.scale(pygame.image.load(
        ('png\Attack (6).png')), player_size),
    pygame.transform.scale(pygame.image.load(
        ('png\Attack (7).png')), player_size),
    pygame.transform.scale(pygame.image.load(
        ('png\Attack (8).png')), player_size),
    pygame.transform.scale(pygame.image.load(
        ('png\Attack (9).png')), player_size),
    pygame.transform.scale(pygame.image.load(
        ('png\Attack (10).png')), player_size)
]


character = pygame.transform.scale(
    pygame.image.load('Idle (1).png'), player_size)
