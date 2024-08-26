import pygame
import random
import sys
from os import path

WINDOW_SIZE = (550, 650)
GAME_SIZE = (WINDOW_SIZE[0], 550)
FPS = 60
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)
SHIELD_BLUE = (0, 0, 205)


#  -------------------------------------- RESOURCES ---------------------
pygame.mixer.init()
pygame.init()

screen = pygame.Surface((GAME_SIZE))
pygame.display.set_caption('Shoot!')
clock = pygame.time.Clock()

window = pygame.display.set_mode(WINDOW_SIZE)

assets_dir = path.join(path.dirname(__file__), 'assets')
image_dir = path.join(assets_dir, 'img')
sound_dir = path.join(assets_dir, 'sound')

# SOunds

sound_effect_volume = 0.05
shoot_sound = pygame.mixer.Sound(path.join(sound_dir, 'player_shoot.wav'))
player_explosion_sound = pygame.mixer.Sound(
    path.join(sound_dir, 'rumble1.ogg'))
player_damage_sound = pygame.mixer.Sound(
    (path.join(sound_dir, 'player_damage.wav')))
player_heal = pygame.mixer.Sound(path.join(sound_dir, 'player_heal.wav'))
meteor_sounds = []
meteor_name = ['meteor_damage.wav', 'meteor_damage2.wav']
meteor_hit = pygame.mixer.Sound(path.join(sound_dir, 'meteor_hit.wav'))
meteor_hit.set_volume(sound_effect_volume)
shoot_sound.set_volume(sound_effect_volume)
player_heal.set_volume(sound_effect_volume)
player_damage_sound.set_volume(0.5)
player_explosion_sound.set_volume(0.4)

for name in meteor_name:
    sound = pygame.mixer.Sound(path.join(sound_dir, name))
    sound.set_volume(sound_effect_volume)
    meteor_sounds.append(sound)

# Load Graphics
background = pygame.image.load(path.join(image_dir, "bg.png")).convert_alpha()
player_img = pygame.transform.scale(pygame.image.load(
    path.join(image_dir, 'player.png')).convert_alpha(), (50, 38))
bullet_pack_img = pygame.transform.scale(
    pygame.image.load(path.join(image_dir, 'bullet_pack.png')).convert_alpha(), (25, 25))
health_pack_img = pygame.transform.scale(
    pygame.image.load(path.join(image_dir, 'health_pack.png')).convert_alpha(), (25, 25))
enemies_img = []
enemies_name = ['enemies.png', 'meteorBrown_big1.png',
                'meteorGrey_big1.png', 'meteorGrey_big2.png', 'meteorGrey_med2.png']
for name in enemies_name:
    enemies_img.append(pygame.image.load(
        path.join(image_dir, name)).convert_alpha())
bullet_img = pygame.transform.scale(pygame.image.load(
    path.join(image_dir, 'bullet.png')).convert_alpha(), (10, 20))
background_rect = background.get_rect()

explosion_animation = {}
explosion_animation['large'] = []
explosion_animation['small'] = []
explosion_animation['player'] = []

for i in range(9):
    fileName = f'regularExplosion0{i}.png'
    img = pygame.image.load(path.join(image_dir, fileName)).convert_alpha()
    img_large = pygame.transform.scale(img, (75, 75))
    explosion_animation['large'].append(img_large)
    img_small = pygame.transform.scale(img, (32, 32))
    explosion_animation['small'].append(img_small)
    fileName = f'sonicExplosion0{i}.png'
    img = pygame.image.load(path.join(image_dir, fileName))
    explosion_animation['player'].append(img)

# ------------------------------ FUNCTIONS ------------------------


def show_game_over_screen():
    screen.blit(background, background_rect)
    window.fill(BLACK)
    window.blit(screen, (0, 0))
    draw_text(window, 'SHOOT', 64, WINDOW_SIZE[0]/2, WINDOW_SIZE[1]/4, WHITE)
    draw_text(window, 'Arrow Keys to move', 22,
              WINDOW_SIZE[0]/2, WINDOW_SIZE[1]/2, WHITE)
    draw_text(window, 'Press Space to begin', 18,
              WINDOW_SIZE[0]/2, WINDOW_SIZE[1] * 3/4, WHITE)
    pygame.display.flip()
    waiting = True
    while waiting:
        clock.tick(FPS)
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            if event.type == pygame.KEYUP:
                if event.key == pygame.K_SPACE:
                    waiting = False


def draw_text(surface, text, size, x, y, pos_type='center', COLOR=(255, 255, 255), ):
    font_name = pygame.font.match_font('arial')
    font = pygame.font.Font(font_name, size)
    text_surface = font.render(text, True, COLOR)
    text_rect = text_surface.get_rect()
    if pos_type != 'x':
        text_rect.centerx = (x)
    else:
        text_rect.x = x
    text_rect.y = (y)

    surface.blit(text_surface, (text_rect))
    pass


def draw_health(surface, x, y, amount):
    if amount < 0:
        amount = 0
    WIDTH = 200
    HEIGHT = 10
    x -= WIDTH/2
    y -= HEIGHT/2
    percentage = (amount/100) * WIDTH
    outline_rect = pygame.Rect(x, y, WIDTH, HEIGHT)
    fill_rect = pygame.Rect(x, y, percentage, HEIGHT)
    pygame.draw.rect(surface, (0, 255, 0), fill_rect)
    pygame.draw.rect(surface, (255, 255, 255), outline_rect, 3)


def draw_lives(surface, x, y, lives, image):
    for i in range(lives):
        image_rect = image.get_rect()
        image_rect.x = x + 30 * i
        image_rect.y = y - image_rect.height/2
        surface.blit(image, image_rect)


def getRandomValue(a, b):
    ran = random.randint(a, b)
    return (ran, ran)


def spawnConsumables(health, gameRound, group, Bullet_Pill, Health_Pill, consumables, boosts):
    ran = random.randrange(5000 - ((100 - health) * (gameRound % 10)))
    health_packs = 0
    bullet_packs = 0
    for i in consumables:
        health_packs = 1 if i.type == 'health' else 0
        bullet_packs = 1 if i.type == 'firing_speed' else 0
    if ran == 2212 or ran == 1331:
        if health_packs < 1:
            con = Health_Pill()
            for i in group:
                i.add(con)
    elif ran == 123:
        if bullet_packs < 1 and not(boosts['firing_speed']):
            con = Bullet_Pill()
            for i in group:
                i.add(con)


# Classes


class Bullet(pygame.sprite.Sprite):
    def __init__(self, x, y):
        pygame.sprite.Sprite.__init__(self)
        self.image = bullet_img
        self.rect = self.image.get_rect()
        self.rect.bottom = y
        self.rect.centerx = x
        self.y_speed = -10

    def update(self):
        self.rect.y += self.y_speed
        # Kill
        if self.rect.bottom < 0:
            self.kill()


class Mob(pygame.sprite.Sprite):
    def __init__(self):
        pygame.sprite.Sprite.__init__(self)
        self.image_orig = pygame.transform.scale(
            random.choice(enemies_img), (getRandomValue(25, 80)))
        self.image = self.image_orig
        self.rect = self.image.get_rect()
        self.radius = int(self.rect.width / 2 * 0.78)
        self.rect.x = random.randrange(GAME_SIZE[0] - self.rect.width)
        self.rect.y = random.randrange(-500, -40)
        self.y_speed = random.randrange(1, 8)
        self.x_speed = random.randrange(-1, 3)
        self.damage = random.randint(
            enemyBaseDamage, enemyMaxDamage) + (self.rect.width//2 % 30) + ((self.y_speed * 2) % 30)
        self.health = (self.radius * (3 * gameRound//2)
                       ) % 100 if gameRound > 80 else 20 + (self.damage//2)

        self.rot = 0
        self.rot_speed = random.randrange(-2, 2)
        self.last_rotate = pygame.time.get_ticks()

    def rotate(self):
        current_time = pygame.time.get_ticks()
        if current_time - self.last_rotate > 50:
            self.last_rotate = current_time
            self.rot = (self.rot + self.rot_speed) % 361
            new_image = pygame.transform.rotate(self.image_orig, self.rot)
            old_center = self.rect.center
            self.image = new_image
            self.rect = self.image.get_rect()
            self.rect.center = old_center

    def update(self):
        self.rotate()
        self.rect.y += self.y_speed
        self.rect.x += self.x_speed

        if self.rect.top > GAME_SIZE[1] + self.rect.width or self.rect.left < -100 or self.rect.right > self.rect.width + GAME_SIZE[0]:
            self.rect.x = random.randrange(GAME_SIZE[0] - self.rect.width)
            self.rect.y = random.randrange(-100, -40)
            self.y_speed = random.randrange(1, 8)


class Player(pygame.sprite.Sprite):
    def __init__(self, player_image):
        pygame.sprite.Sprite.__init__(self)
        self.image = player_img
        self.rect = self.image.get_rect()
        self.rect.center = (GAME_SIZE[0]/2, GAME_SIZE[1] - self.rect.height)
        self.radius = 20
        self.x_speed = 0
        self.health = 100
        self.isHit = False
        self.lastHit = 0
        self.damage = 10
        self.lastShot = 0
        self.shooting_speed = 200
        self.isHealing = False
        self.healCounter = 0
        self.healAmount = 0
        self.lives = 3
        self.hidden = False
        self.hide_timer = pygame.time.get_ticks()
        self.bullet_timer = 0
        self.boosts = {"firing_speed": False}

    def update(self):
        # Unhide
        if self.hidden and pygame.time.get_ticks() - self.hide_timer > 1000:
            self.hidden = False
            self.rect.center = (
                GAME_SIZE[0]/2, GAME_SIZE[1] - self.rect.height)
        self.increase_bullet_speed() if self.boosts['firing_speed'] else ''
        self.heal(self.healAmount) if self.isHealing else ''
        keys = pygame.key.get_pressed()
        self.x_speed = 0
        speed = 3
        if keys[pygame.K_LEFT]:
            self.x_speed = -speed
        elif keys[pygame.K_RIGHT]:
            self.x_speed = speed
        self.rect.x += self.x_speed
        if self.rect.right > GAME_SIZE[0] + self.rect.width/2:
            self.rect.right = GAME_SIZE[0] + self.rect.width/2
        if self.rect.left < 0 + 2 - self.rect.width/2:
            self.rect.left = 0 + 2 - self.rect.width/2

    def increase_bullet_speed(self):
        now = pygame.time.get_ticks()
        if not(self.boosts['firing_speed']):
            self.boosts['firing_speed'] = True
            self.shooting_speed = 100
            self.bullet_timer = now
        else:
            if now - self.bullet_timer > 10000:
                self.boosts['firing_speed'] = False
                self.shooting_speed = 200
                self.bullet_timer = 0

    def shoot(self):
        current_time = pygame.time.get_ticks()
        if current_time - self.lastShot > self.shooting_speed and not(self.hidden):
            shoot_sound.play()
            bullet = Bullet(self.rect.centerx, self.rect.top)
            all_sprites.add(bullet)
            bullets.add(bullet)
            self.lastShot = current_time

    def heal(self, amount):
        if self.healCounter <= amount and self.health <= 100:
            self.isHealing = True
            self.health += 1
            self.healCounter += 1
            self.healAmount = amount
        else:
            self.isHealing = False
            self.healCounter = 0
            self.healAmount = 0

    def hide(self):
        self.hidden = True
        self.hide_timer = pygame.time.get_ticks()
        self.rect.center = (GAME_SIZE[0]/2, GAME_SIZE[1] + 200)


class Explosion(pygame.sprite.Sprite):
    def __init__(self, center, size):
        pygame.sprite.Sprite.__init__(self)
        self.size = size
        self.rotate_value = random.randrange(360)
        self.images = explosion_animation[self.size]
        self.image = pygame.transform.rotate(self.images[0], self.rotate_value)
        self.rect = self.image.get_rect()
        self.rect.center = center
        self.frame = 0
        self.last_update = pygame.time.get_ticks()
        self.frame_rate = 75

    def update(self):
        now = pygame.time.get_ticks()
        if now - self.last_update > self.frame_rate:
            self.last_update = now
            self.frame += 1
            if self.frame == len(explosion_animation[self.size]):
                self.kill()
            else:
                center = self.rect.center
                self.image = pygame.transform.rotate(
                    self.images[self.frame], self.rotate_value)
                self.rect = self.image.get_rect()
                self.rect.center = center


class Consumable(pygame.sprite.Sprite):
    def __init__(self, typed):
        pygame.sprite.Sprite.__init__(self)
        self.image = pygame.Surface((20, 20))
        self.image.fill((BLUE))
        self.rect = self.image.get_rect()
        self.y_speed = random.randrange(1, 4)
        self.rect.centerx = random.randrange(GAME_SIZE[0])
        self.type = typed

    def update(self):
        self.rect.y += self.y_speed
        if self.rect.top >= GAME_SIZE[1] + self.rect.height:
            self.kill()


class Health_Pill(Consumable):
    def __init__(self):
        super().__init__('health')
        self.image = pygame.transform.rotate(
            health_pack_img, random.randrange(360))
        self.rect = self.image.get_rect()
        self.rect.centerx = random.randrange(GAME_SIZE[0] - self.rect.width)


class Bullet_Pill(Consumable):
    def __init__(self):
        super().__init__('firing_speed')
        self.image = pygame.transform.rotate(
            bullet_pack_img, random.randrange(360))
        self.rect = self.image.get_rect()
        self.rect.centerx = random.randrange(GAME_SIZE[0] - self.rect.width)


# Load Sound
# Initialize Mobs
# Game Loop
font = pygame.font.Font(pygame.font.get_default_font(), 16)


running = True
game_over = True
while running:
    if game_over:
        show_game_over_screen()
        game_over = False
        minMobs = 0
        maxMobs = 15
        enemyBaseDamage = 5
        enemyMaxDamage = 30
        score = 0
        gameRound = 1
        hasChecked = True
        health_packs_counter = 0
        # SPrite Gorups
        all_sprites = pygame.sprite.Group()
        player = Player(player_img)
        player_mini = pygame.transform.scale(player_img, (25, 19))
        mobs = pygame.sprite.Group()
        consumables = pygame.sprite.Group()
        bullets = pygame.sprite.Group()
        all_sprites.add(player)
        for i in range(5):
            m = Mob()
            mobs.add(m)
            all_sprites.add(m)
        timer = pygame.time.get_ticks()
        round_interval = pygame.time.get_ticks()
        round_interval_has_changed = False

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
            game_over = True
            sys.exit()
    # ---------------------------------------------------  GAME LLOOOP
    clock.tick(FPS)
    # Events
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            game_over = True
            running = False
    text = f'Round: {gameRound} Score: {score}'
    right_text = f'Enemies Left: {len(mobs)}'
    # Update
    all_sprites.update()
    player.shoot()
    # ----------------------------------------------------  Check Collision
    if player.isHit:
        current_time = pygame.time.get_ticks()
        if current_time - player.lastHit > 1000:
            player.isHit = False

    consumables_hit = pygame.sprite.spritecollide(
        player, consumables, True)

    for consum in consumables_hit:
        if consum.type == 'health':
            player.heal(50)
            player_heal.play()
        if consum.type == 'firing_speed':
            player.increase_bullet_speed()

    bulletHits = pygame.sprite.groupcollide(mobs, bullets, False, True)
    for enemy in bulletHits:
        if enemy.health <= 0:
            score += enemy.radius // 2
            meteor_sounds[1].play()
            explosion = Explosion(enemy.rect.center, 'large')
            all_sprites.add(explosion)
            enemy.kill()
        else:
            enemy.health -= player.damage
            meteor_hit.play()

    # P;ayer has hit mobs vice versa
    hits = pygame.sprite.spritecollide(
        player, mobs, True, pygame.sprite.collide_circle)
    for hit in hits:
        explosion = Explosion(hit.rect.center, 'small')
        all_sprites.add(explosion)
        meteor_sounds[0].play()
        if not(player.isHit) and not(player.hidden):
            player.health -= abs(int(hit.health//2))
            player.isHit = True
            player_damage_sound.play() if player.health > 0 else ''
            player.lastHit = pygame.time.get_ticks()
        if player.health <= 0:
            death_explosion = Explosion(player.rect.center, 'player')
            all_sprites.add(death_explosion)
            player.hide()
            player.lives -= 1
            player.heal(150)
            player_explosion_sound.play()

    if player.lives <= 0 and not(death_explosion.alive()):
        game_over = True

    # ------------------------------------------- Consumables Spawn -----------------------------------------------
    spawnConsumables(player.health, gameRound, [
                     consumables, all_sprites], Bullet_Pill, Health_Pill, consumables, player.boosts)

    # ------------------------------------------- Check Rounds ----------------
    if not(hasChecked):
        # -------- Heal Every 5 Rounds
        if gameRound % 5 == 0:
            if player.health < 100:
                player.heal(100 - player.health)
                player_heal.play()
        if gameRound % 2 == 0:
            enemyBaseDamage += gameRound // 2
            enemyMaxDamage += gameRound//4

        if gameRound % 1 == 0:
            player.damage += random.randint(0,
                                            gameRound - 1 if gameRound < 10 else 10)
        if gameRound % 2 == 0:
            if player.shooting_speed > 100:
                player.shooting_speed -= random.randrange(
                    8) * gameRound // 2
        hasChecked = True

    # Mob Spawn
    if len(mobs) <= minMobs:
        now = pygame.time.get_ticks()
        if not round_interval_has_changed:
            round_interval = now
            round_interval_has_changed = True

        if now - round_interval > 1500:
            for i in range(maxMobs - len(mobs)):
                m = Mob()
                all_sprites.add(m)
                mobs.add(m)
            gameRound += 1
            hasChecked = False
            maxMobs += random.randrange(round(gameRound))
            round_interval_has_changed = False

    # Drawing
    window.fill(BLACK)
    screen.blit(background, background_rect)
    all_sprites.draw(screen)
    if player.isHit and player.alive():
        pygame.draw.circle(
            screen, SHIELD_BLUE, (player.rect.center), 40, width=5)
    window.blit(screen, (0, 0))
    mid_bottom_screen = GAME_SIZE[1] + (WINDOW_SIZE[1] - GAME_SIZE[1]) / 2
    draw_text(window, text, 24, 0, GAME_SIZE[1] + 24, 'x')
    draw_text(window, right_text, 24,
              0, GAME_SIZE[1] + GAME_SIZE[1]/8, 'x')
    draw_health(window, WINDOW_SIZE[0] /
                2, mid_bottom_screen, player.health)
    draw_lives(window, WINDOW_SIZE[0] - 100,
               mid_bottom_screen, player.lives, player_mini)
    # Last
    pygame.display.flip()

pygame.quit()
sys.exit()
