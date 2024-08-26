import pygame as pg
import random
from settings import *
from classes import *

class Game:
    def __init__(self):
        pg.init()
        pg.mixer.init()
        self.screen = pg.display.set_mode((WIDTH, HEIGHT))
        pg.display.set_caption(TITLE)
        self.clock = pg.time.Clock()
        self.running = True
        self.speed = 0.2

    def new(self):
        # start a new game
        self.all_sprites = pg.sprite.Group()
        self.group_cars = pg.sprite.Group()
        Car(self)
        self.player = Player(self)
        self.run()

    def run(self):
        # Game Loop
        self.playing = True
        while self.playing:
            self.clock.tick(FPS)
            self.events()
            self.update()
            self.draw()

    def update(self):
        # Game Loop - Update
        self.all_sprites.update()
        for sprite in self.group_cars:
            amount = (self.player.speed//3 % 20)
            print(amount)
            sprite.rect.y +=  amount

        hits = pg.sprite.spritecollide(self.player, self.group_cars, False)
        if hits:
            if timer() - self.player.last_hit > 1000:
                hits[0].rect.y -= self.player.speed * 1.2
                self.player.vel *= 0
                self.player.speed = 0
                self.player.last_hit = timer()


        while len(self.group_cars) < 2:
            Car(self)

    def events(self):
        # Game Loop - events
        for event in pg.event.get():
            # check for closing window
            if event.type == pg.QUIT:
                if self.playing:
                    self.playing = False
                self.running = False

    def draw_lanes(self):
        STEP =  ROAD_WIDTH//3
        ADD = WIDTH * 2//6
        for x in range(0, WIDTH, ROAD_WIDTH):
            pg.draw.line(self.screen, WHITE, (x + ADD/2, 0), (x + ADD/2, HEIGHT))
        
    def quit(self):
        self.running = False
        pg.quit()

    def draw(self):
        # Game Loop - draw
        self.screen.fill(BLACK)
        self.draw_lanes()
        self.all_sprites.draw(self.screen)
        draw_text(self.screen, f'{self.player.speed}', 32, WIDTH/2, 0, WHITE)
        # *after* drawing everything, flip the display
        pg.display.flip()

    def show_start_screen(self):
        # game splash/start screen
        pass

    def show_go_screen(self):
        # game over/continue
        pass

g = Game()
g.show_start_screen()
while g.running:
    g.new()
    g.show_go_screen()

pg.quit()
