from classes import *



class Game:
    def __init__(self):
        pg.init()
        self.screen = pg.display.set_mode((WIDTH, HEIGHT))
        pg.display.set_caption(TITLE)
        self.is_running = True
        self.clock = pg.time.Clock()
    
    def new(self):
        self.group_all = GROUP()
        self.group_body = []
        Body(self)
        Body(self)
        Body(self)
        Body(self)
        Body(self)
        self.player = Player(self)
        self.run()
    def run(self):
        self.is_playing = True
        while self.is_playing:
            self.clock.tick(FPS)
            self.update()
            self.events()
            self.draw()

    def draw_grid(self):
        for x in range(0, WIDTH, GRID_SIZE):
            pg.draw.line(self.screen, WHITE, (x, 0), (x, HEIGHT))
        for y in range(0, HEIGHT, GRID_SIZE):
            pg.draw.line(self.screen, WHITE, (0, y), (WIDTH, y))

    def update(self):
        for index, body in enumerate(self.group_body):
            if index == 0:
                body.change_direction(self.player.direction)
            else:
                body.change_direction(self.group_body[index - 1].direction)



        self.group_all.update()

    def events(self):
        for e in pg.event.get():
            if e.type == pg.QUIT:
                self.is_playing = False
                self.is_running = False
            if e.type == pg.KEYDOWN:
                direction = Name.RIGHT
                if e.key == pg.K_LEFT:
                    direction = Name.LEFT
                elif e.key == pg.K_UP:
                    direction = Name.UP
                elif e.key == pg.K_DOWN:
                    direction = Name.DOWN
                self.player.change_direction(direction)
                    

    def draw(self):
        self.screen.fill(BLACK)
        self.group_all.draw(self.screen)
        self.draw_grid()

        pg.display.flip()



game = Game()

while game.is_running:
    game.new()


pg.quit()

