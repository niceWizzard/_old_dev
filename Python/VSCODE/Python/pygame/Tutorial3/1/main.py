from sprites import *

# ---------------------------------------------------------------- GROUPS ----------------------------------------------------------------


class Game():
    def __init__(self):
        pg.init()
        self.game_screen = pg.display.set_mode((WIDTH, HEIGHT))
        self.clock = pg.time.Clock()
        self.is_running = True

    def new(self):
        self.group_all = pg.sprite.Group()
        self.group_bullet = pg.sprite.Group()
        self.group_grenade = pg.sprite.Group()
        self.group_mobs = pg.sprite.Group()
        self.group_explosion = pg.sprite.Group()
        self.group_consumables = pg.sprite.Group()
        self.player = Soldier(self, 'player' ,500, 200, 3, 5)
        self.enemy = Soldier(self, 'enemy' ,700, 200, 3, 5, 5000, 300)
        Consumables(self, name.health, self.player.rect.left - 100, self.player.rect.top)
        Consumables(self, name.grenade, self.player.rect.left - 200, self.player.rect.top)
        Consumables(self, name.bullet, 100, self.player.rect.top)
        self.run()
    
    def run(self):
        self.is_playing = True
        while self.is_playing:
            self.clock.tick(FPS)
            self.update()
            self.event()
            self.draw()
    
    def update(self):
        self.group_all.update()

        grenade_explosion_collision = pg.sprite.groupcollide(self.group_grenade, self.group_explosion, False, False, pg.sprite.collide_circle)
        
        for grenade in grenade_explosion_collision:
            grenade.timer -= 50            
        
        consumable_collision = pg.sprite.spritecollide(self.player, self.group_consumables, False)
        for consumable in consumable_collision:
            if consumable._type == name.health and self.player.health < 100:
                self.player.health = min(self.player.health + 50, self.player.max_health) 
                consumable.kill()
            elif consumable._type == name.bullet:
                self.player.ammo += 30
                consumable.kill()
            elif consumable._type == name.grenade:
                self.player.ammo_grenades += 5
                consumable.kill()
        
        player_collision_grenade = pg.sprite.groupcollide(self.group_mobs, self.group_explosion, False, False, pg.sprite.collide_circle)
        for hit in player_collision_grenade:
            exp = player_collision_grenade[hit][0]
            if not exp.has_hit:
                exp.has_hit = True
                hit.health -= 50            

        hey = pg.sprite.groupcollide(self.group_mobs, self.group_bullet, False, True)

        for h in hey:
            h.health -= 10

    def event(self):
        for e in pg.event.get():
            if e.type == pg.QUIT:
                self.is_playing = False
                self.is_running = False
            if e.type == pg.KEYDOWN:
                if self.player.is_alive:
                    if e.key == pg.K_a:
                        self.player.moving_left = True
                    elif e.key == pg.K_d:
                        self.player.moving_right = True
                    elif (e.key == pg.K_w or e.key == pg.K_SPACE) and self.player.is_alive:
                        self.player.is_jumping = True
                    if e.key == pg.K_r or e.key == pg.K_s:
                        self.player.shoot()
                    if e.key == pg.K_f:
                        self.player.throw_grenade()
                
            if e.type == pg.MOUSEBUTTONDOWN and self.player.is_alive:
                    self.player.shoot()
            if e.type == pg.KEYUP:
                if e.key == pg.K_a:
                    self.player.moving_left = False
                elif e.key == pg.K_d:
                    self.player.moving_right = False

    def draw(self):
        self.game_screen.fill(BG_COLOR)
        pg.draw.line(self.game_screen, BLUE, (0, 300), (WIDTH, 300))
        self.group_all.draw(self.game_screen)


        pg.display.flip()


game = Game()

while game.is_running:
    game.new()


pg.quit()




