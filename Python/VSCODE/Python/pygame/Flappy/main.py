from classes import * 



class Game():
    def __init__(self):
        pg.init()
        pg.mixer.init()
        self.screen = pg.display.set_mode((WIDTH, HEIGHT))
        pg.display.set_caption(TITLE) 
        self.clock = pg.time.Clock()
        self.is_running = True
        self.load_data()
    
    def new(self):
        self.group_all = pg.sprite.Group()
        self.group_towers = pg.sprite.Group()
        self.custom_group = []
        self.player = Player(self)
        self.timer = time()
        self.score = 0
        self.freeze = False
        self.last_freeze = 0
        self.run()

    def load_data(self): 
        self.dir = path.dirname(__file__)
        self.assets_dir = path.join(self.dir, 'assets')
        self.image_dir = path.join(self.assets_dir, 'images') 
        self.img_pipe = get_image([path.join(self.image_dir, 'pipe.png')], height=HEIGHT//2, width=100)[0]
        

    def run(self):
        self.game_running = True
        while self.game_running:
            TITLE = f'Flappy {self.score} Speed: {5 + min(self.score//10, 3)}'
            pg.display.set_caption(TITLE )
            self.clock.tick(FPS)
            self.update()         
            self.events()
            self.draw()

    def update(self):
        self.group_all.update()
        if time() - self.timer > 1700:
            tow = Tower(self)
            self.timer = time()
        for i in self.group_towers:
            if not i.is_counted:
                if i.rect.right <= self.player.rect.centerx:
                    self.score += 0.5
                    i.is_counted = True

        hits = pg.sprite.spritecollide(self.player, self.group_towers, False)
        if hits:
            hit = pg.sprite.spritecollide(self.player, self.group_towers, False, pg.sprite.collide_mask)
            if hit:
                self.game_running = False

    def events(self):
        for e in pg.event.get():
            if e.type == pg.QUIT: 
                self.game_running = False
                self.is_running = False
            if e.type == pg.KEYDOWN:
                if e.key != pg.K_ESCAPE:
                    self.player.jump()
        



    def draw(self):
        self.screen.fill(BG_COLOR)
        self.group_all.draw(self.screen)
        pg.display.flip()

    def start_up_screen(self):
        pass

    def game_over_screen(self):
        pass 


game = Game()
game.start_up_screen()
while game.is_running:
    game.new()
    game.game_over_screen()

pg.quit()





