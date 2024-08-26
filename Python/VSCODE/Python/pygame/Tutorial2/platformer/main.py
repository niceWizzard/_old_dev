import pygame as pg
import random
from settings import *
from sprites import *
from os import path

class Game:
    def __init__(self):
        # Initialize Game WIndow
        pg.init()
        pg.mixer.init()
        self.screen = pg.display.set_mode((SIZE['width'], SIZE['height']))
        pg.display.set_caption(TITLE)
        self.clock = pg.time.Clock()
        self.running = True
        self.isPlaying = True
        self.font_name = pg.font.match_font(FONT_NAME)
        self.sounds = {}
        self.load_data()

    def load_data(self):
        self.dir = path.dirname(__file__)
        assets = path.join(self.dir, 'assets')
        img_dir = path.join(assets, 'img')
        sound_dir = path.join(assets, 'sound')
        try:
            with open(path.join(assets, DATA_FILE), 'r') as file:
                self.highscore = int(file.read())
        except:
            self.highscore = 0
            with open(path.join(assets, DATA_FILE), 'w') as file:
                pass                
                        
        self.spritesheet = Spritesheet(path.join(img_dir, SPRITESHEET_NAME))
        self.images_cloud = []
        for i in range(1, 4):
            image = (pg.image.load(path.join(img_dir, f'cloud{1}.png')).convert())
            image.set_colorkey(BLACK)
            self.images_cloud.append(image)


        # Sounds
        load = pg.mixer.Sound
        self.sounds['player_jump'] = load(path.join(sound_dir, 'player_jump.wav'))
        self.sounds['bg_music'] = load(path.join(sound_dir, 'Happy Tune.ogg'))
        self.sounds['bg_music_start_screen'] = load(path.join(sound_dir, 'Yipee.ogg'))
        self.sounds['player_hurt'] = load(path.join(sound_dir, 'player_hurt.wav'))
        self.sounds['mob_spawn'] = load(path.join(sound_dir, 'mob_spawn.wav'))
        self.sounds['player_heal'] = load(path.join(sound_dir, 'player_heal.wav'))
        self.sounds['player_boost'] = load(path.join(sound_dir, 'player_boost.wav'))

    def new(self):
        # Initialize New Game
        self.game_score = 0
        self.all_sprites = pg.sprite.LayeredUpdates()
        self.group_platform = pg.sprite.Group()
        self.group_powerups = pg.sprite.Group()
        self.group_mobs = pg.sprite.Group()
        self.group_clouds = pg.sprite.Group()
        self.player = Player(self)
        for p in PLATFORM_LIST:
            platform = Platform(self, *p)

        Platform_Mob(self,  Platform(self, *PLATFORM_LIST[1]))
        
        self.mob_interval = 0
        self.run()

    def run(self):
        # Game Loop
        self.isPlaying = True
        self.sounds['bg_music'].play()
        while self.isPlaying:
            self.clock.tick(FPS)
            self.events()
            self.update()
            self.draw()
        self.sounds['bg_music'].stop()
        
    def update(self):
        now = pg.time.get_ticks()
        self.all_sprites.update()
        # CHeck if player hit platfloms when falling
        if self.player.vel.y > 0:
            hits = pg.sprite.spritecollide( self.player, self.group_platform, False)
            if hits:
                lowest_platform = hits[0]
                for hit in hits:
                    if hit.rect.bottom > lowest_platform.rect.bottom:
                        lowest_platform = hit
                if self.player.pos.x <= lowest_platform.rect.right + 8 and \
                    self.player.pos.x >= lowest_platform.rect.left - 8:
                    if self.player.rect.bottom < lowest_platform.rect.bottom and self.player.rect.bottom >= lowest_platform.rect.top :
                        self.player.vel.y = 0
                        self.player.pos.y = lowest_platform.rect.top
                        self.player.jumping = False
                        self.player.is_invinsible = False
        
        # Spawn Mobs
        if now  - self.mob_interval > MOB_SPAWN_CHANCE and randrange(100) <= 12 and\
        len(self.group_mobs) <= 7:
            self.mob_interval = now
            HeliMob(self) if randrange(100) < 3 else Bird_Mob(self)
            self.sounds['mob_spawn'].play()


        # Collision Mob
        collision_mobs = pg.sprite.spritecollide(self.player, self.group_mobs, False, pg.sprite.collide_mask)
        if collision_mobs:
            if not self.player.is_invinsible:
                for mob in collision_mobs:
                    m = mob.rect
                    damage = True
                    if self.player.rect.centery - self.player.vel.y <= mob.rect.centery and (mob.type != Name.helicopter_mob or self.player.smoke_appear):
                        if abs(self.player.vel.y) > 0.4 and self.player.rect.centery + self.player.rect.height//4 < (mob.rect.top ):
                            if mob.type == Name.pointy_mob:
                                self.player.reduce_health(mob.damage, False)
                            self.player.vel.y = -(PLAYER_JUMP - 1)
                            self.sounds['player_jump'].play()
                            damage = False
                            mob.push_down() if mob.type != Name.pointy_mob else ''
                    if mob.type != Name.pointy_mob and damage:
                        self.player.reduce_health(mob.damage)
                        if mob.rect.centerx > self.player.rect.centerx and not self.player.smoke_appear:
                            self.player.vel.x = -3
                        elif mob.rect.centerx < self.player.rect.centerx and not self.player.smoke_appear:
                            self.player.vel.x = 3
                    else:
                        self.player.vel.x = 0
                        if mob.rect.centerx >= self.player.rect.right:
                            self.player.vel.x -= 3
                        if mob.rect.centerx <= self.player.rect.left:
                            self.player.vel.x += 3
                

            if self.player.health <= 0:
                self.isPlaying = False
        # Scrolling
        if self.player.rect.top <= SIZE['height']/4:
            amount = max(abs(self.player.vel.y), 2)
            self.player.pos.y += amount
            if randrange(100) < 3:
                Cloud(self)
            for cloud in self.group_clouds:
                cloud.rect.y += max(abs(self.player.vel.y /2), 2)
            for platform in self.group_platform:
                platform.rect.y += amount
                if platform.rect.top >= SIZE['height'] + 50:
                    platform.kill()
                    self.game_score += 10
            for mob in self.group_mobs:
                mob.rect.y += amount
                if mob.rect.top > SIZE['height']:
                    mob.kill()

        # Ppowerup Collision
        powerup_collisions = pg.sprite.spritecollide(self.player, self.group_powerups, False)
        for power in powerup_collisions:
            if self.player.vel.y >= 0:
                if power.type == Name.boost:
                    self.player.vel.y = -BOOST_POWER
                    self.sounds['player_jump'].play()
                    self.player.jumping = True
                    self.player.is_invinsible = True
                    self.sounds['player_boost'].play()
                    power.kill()
                    
            if power.type == Name.heal:
                if self.player.health < 100:
                    self.player.health += 100 - self.player.health if self.player.health > 50 else 50
                    self.player.show_health = True
                    self.player.timer_last_shown_health_bar = pg.time.get_ticks()
                    self.sounds['player_heal'].play()
                    power.kill()
            elif power.type == Name.bubble:
                self.player.smoke_appear = True
                self.player.timer_bubble = now
                power.kill()

        # Fall through death
        if self.player.rect.top > SIZE['height']:
            for sprite in self.all_sprites:
                sprite.rect.y -= max(self.player.vel.y, 10)
                
            if self.player.rect.top >= SIZE['height'] + 500:
                self.isPlaying = False
        # Spawn Platforms
        while len(self.group_platform) < 6:
            x = random.randrange(50, SIZE['width'] - 50)
            y = random.randrange(-8, -5)
            plat = Platform(self, x, y)
            self.group_platform.remove(plat)
            self.all_sprites.remove(plat)
            hits = pg.sprite.spritecollide(plat, self.group_platform, True)
            if not hits:
                self.group_platform.add(plat)
                self.all_sprites.add(plat)
                Platform_Mob(self, plat) if randrange(1000) < 2 else ''            
            


    def events(self):
        # Game loop Events
        for event in pg.event.get():
            if event.type == pg.QUIT:
                if self.isPlaying:
                    self.isPlaying = False
                self.running = False
            if event.type == pg.KEYDOWN:
                if event.key == pg.K_SPACE or event.key == pg.K_UP:
                    self.player.jump()


    def draw(self):
        # Draw
        now = pg.time.get_ticks()
        last = self.player.timer_last_hit 
        self.screen.fill(BG_COLOR)
        if self.player.smoke_appear:
            image = self.spritesheet.get_image(0,1662, 211, 215)                
            image_rect = image.get_rect()
            image_rect.center = self.player.rect.center
            self.screen.blit(image, image_rect)
        self.all_sprites.draw(self.screen)
        draw_health(self.screen, self.player.rect.x, self.player.rect.top - 10, self.player.health, self.player.rect.width, 7) if self.player.show_health else ''
        if self.player.smoke_appear:
            amount = ((10000 + self.player.timer_bubble) - now )//100 
            draw_health(self.screen, self.player.rect.x, self.player.rect.bottom + 10 , amount, self.player.rect.width, height=5, COLOR=(WHITE), LOW_COLOR=WHITE)

        self.draw_text(str(self.game_score), 22, WHITE, SIZE['width']/2, 10)
        pg.display.flip()
        pass

    def show_start_screen(self):
        self.screen.fill(BG_COLOR)
        self.draw_text(TITLE, 48, WHITE, SIZE['width']/2, SIZE['height']/4)
        self.draw_text("Arrows to move ", 22, WHITE, SIZE['width']/2, SIZE['height']/2)
        self.draw_text("Press any key to play ", 22, WHITE, SIZE['width']/2, SIZE['height'] * 3/4)
        self.draw_text(f"High Score: {self.highscore}", 22, WHITE, SIZE['width']/2, SIZE['height'] * 3/5)
        pg.display.flip()
        self.sounds['bg_music_start_screen'].play()
        self.wait_for_key()
        self.sounds['bg_music_start_screen'].stop()
        

    def show_game_over_screen(self):
        if not self.running:
            return
        self.screen.fill(BG_COLOR)
        self.draw_text("YOU DIED!", 48, WHITE, SIZE['width']/2, SIZE['height']/4)
        self.draw_text(f"Score: {self.game_score}", 22, WHITE, SIZE['width']/2, SIZE['height']/2)
        self.draw_text("Press any key to play again ", 22, WHITE, SIZE['width']/2, SIZE['height'] * 3/4)
        if self.game_score > self.highscore:
            self.highscore = self.game_score
            self.draw_text("NEW HIGHSCORE!", 22, WHITE, SIZE['width'], SIZE['height'] * 3/4)
            with open(path.join(self.dir, DATA_FILE), 'w') as file:
                file.write(str(self.game_score))
        else:
            self.draw_text(f"High Score: {self.highscore}", 22, WHITE, SIZE['width']/2, SIZE['height'] * 3/5)
        pg.display.flip()
        self.wait_for_key()

    def wait_for_key(self):
        waiting = True
        while waiting:
            self.clock.tick(FPS)
            for e in pg.event.get():
                if e.type == pg.QUIT:
                    waiting = False
                    self.running = False
                if e.type == pg.KEYUP:
                    waiting = False

    def draw_text(self, text, font_size, color, x, y):
        font = pg.font.Font(self.font_name, font_size)
        text_surface = font.render(text, True, color)
        text_rect = text_surface.get_rect()
        text_rect.midtop = (x, y)
        text_rect.y = y
        self.screen.blit(text_surface, text_rect)


game = Game()
game.show_start_screen()

while game.running:
    game.new()
    game.show_game_over_screen()

pg.quit()
