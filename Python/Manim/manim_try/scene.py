from manim import *
from types import *

class Moving(MovingCameraScene):
    def construct(self):
        x_pos = ValueTracker()
        plane = Axes(x_range=(-10, 100),x_length=20).add_coordinates().scale(3)
        self.camera.frame.move_to(plane.get_origin() + RIGHT * 2)
        self.add(plane)
        t = Integer(0).add_updater(lambda x : x.set_value(x_pos.get_value()).move_to(self.camera.frame.get_center()))
        # t = always_redraw(lambda : Text(
        #         str(x_pos.get_value())
        #     ).move_to(self.camera.frame.get_center())
        # )
        self.add(t)        
        self.camera.frame.add_updater(lambda mob: mob.move_to(RIGHT * x_pos.get_value()))
        self.add(self.camera.frame)
        self.play(x_pos.animate.set_value(100), run_time=30)
        
        
        # line = plane.plot(lambda x : 2)
        
        # self.play(Write(line, run_time=100))
        
        
        
        
        
        
        
        
        
        
        


class AreaBetweenCurces(MovingCameraScene):
    def title_page(self):
        text = Text("Area between Curves")
        self.play(ScaleInPlace(text, 1.2))
        self.wait()
        self.play(FadeOut(text))
        self.remove(text)
        
    def construct(self):
        self.title_page()
        
        self.camera.frame.shift(DOWN)
        plane = NumberPlane(
            x_range=[-12,12],
            y_range=[-1,9], 
            background_line_style={
                "stroke_opacity": 0
            }
        ).add_coordinates()
        self.play(
            Write(plane, run_time=2, rate_func=rate_functions.double_smooth), 
        )
        
        parabola = plane.plot( lambda x: x * x, x_range=(-3,3) )
        parabola_text = MathTex("y = x^2", color=YELLOW).move_to(parabola.get_bottom() + RIGHT * 3 + UP * 2)
        
        line = plane.plot(lambda x : 4, x_range=(-7,7))
        line_text = MathTex("y = 4", color=YELLOW).move_to(line.get_top() + UP * 0.5 + LEFT )
        self.play(
            Write(parabola,run_time=4,),
            Write(parabola_text),
            Write(line_text),
            Write(line, run_time=4),
        )
        
        a = plane.get_area(parabola, bounded_graph=line, x_range=(-2,2),color=BLUE)
        self.play(FadeIn(a), run_time=1.5)
        self.wait()
        
        group = VGroup(parabola, parabola_text, line, line_text)
        self.play(FadeOut(group), FadeOut(a))
        self.remove(a)
        
        group.remove(line)
        line = plane.plot(lambda x : 4, x_range=(-7,12))
        self.play(self.camera.frame.animate.shift(RIGHT * 4))

        a_line = plane.get_area(line, x_range=(-2,2), color=ORANGE)
        self.play(Write(line), Write(line_text))
        self.play(FadeIn(a_line))
        self.wait()
        
        line_group = VGroup(line, a_line, line_text)
        self.play(FadeOut(line_group))
        
        a_para = plane.get_area(parabola, x_range=(-2,2),color=GREEN_C)
        self.play(Write(parabola), Write(parabola_text))
        self.play(FadeIn(a_para))
        self.wait()
        
        self.play(FadeIn(line_group))
        self.play(ScaleInPlace(a_para, 1.2),Write(a))
        self.play(FadeOut(a_para, a_line))
        self.remove(a_para, a_line)
        self.wait()
        

class Integral(MovingCameraScene):
    def construct(self):
        self.camera.frame.shift(UP * 3)
        plane = NumberPlane(
            x_range=[-16,16,1],
            y_range=[-16,16,1], 
            background_line_style={
                "stroke_opacity": 0
            }
        ).add_coordinates()
        self.play(
            Write(plane, run_time=2, rate_func=rate_functions.double_smooth), 
        )
        
        parabola = plane.plot( lambda x: x * x, x_range=(-6,6) )
        parabola_text = MathTex("y = x^2").move_to( UP + RIGHT * 4)
        self.play(
            Write(parabola,run_time=4,),
            Write(parabola_text)
        )
        
        a = plane.get_area(parabola, x_range=[0,2], color=BLUE)
        self.play(FadeIn(a))
        self.wait(0.5)
        self.play(FadeOut(a))
        
        rects = None
        for i in range(3, 10):
            rects = plane.get_riemann_rectangles(parabola, x_range=(0,2), dx=1/ (i), stroke_color=BLUE)
            self.play(Create(rects),run_time=1.25, rate_func=rate_functions.ease_in_sine)
            if i != 9:
                self.play(FadeOut(rects), run_time=0.25)
                self.remove(rects)
        self.wait()
        
        t = MathTex(r"\int_{0}^{2} x^2 \,dx").shift(UP * 3 + RIGHT * 4)
        # t = MathTex(r"Nice (\binom{2n}{n+2})").shift(UP * 3 + RIGHT * 4)
        self.play(Write(t), run_time=1.5)
        self.wait()
        self.remove(rects)
        
        line = plane.plot(lambda x : 4, x_range=(-2,2))
        
        self.play(Write(line), run_time=1.5)
        
        
        region = plane.get_area(parabola, bounded_graph=line, x_range=(-2,2))        
        self.play(Write(region))
        self.wait()
        
        
        
        
        

class Try(MovingCameraScene):
    def construct(self):
        plane = NumberPlane(y_length=10,y_range=[-5,10,1]).add_coordinates().scale(1.5)
        self.play(Create(plane), run_time=1.5, rate_func=rate_functions.ease_out_elastic)        
        self.wait(1.5)
        
        par = lambda x: -pow(x, 2) +5
        range = [-2.236, 2.236]
        par_func = plane.plot(par, range)
        
        
        self.camera.frame.save_state()
        self.play(self.camera.frame.animate.scale(0.8))
        
        
        area_of_func = plane.get_riemann_rectangles(par_func, range, dx=0.0000001)
        anims = [Write(par_func, run_time=2), Write(area_of_func, run_time=3)]
        self.play(LaggedStart(*anims, lag_ratio=0.25) )
        self.wait()
    


class CreateCircle(Scene):
    def construct(self):
        rectangle  = Rectangle(stroke_color=BLUE, width=10, height=4)
        
        text = Text("Hello", font_size=12)
        text.add_updater(lambda x : x.move_to(rectangle.get_center()))
        
        self.wait()
        self.play(FadeIn(rectangle), run_time=1.5)
        self.wait()
        self.play(Write(text))
        self.wait()
        
        self.play(rectangle.animate.shift(RIGHT * 2, DOWN * 0).set_width(2).set_height(1))
        
        self.wait()
        text.clear_updaters()
        
        self.play(rectangle.animate.shift(RIGHT * -2, UP * 2).set_width(4).set_height(2),FadeOut(text, run_time=0.2))
        
        
        
        
        
        
        

            