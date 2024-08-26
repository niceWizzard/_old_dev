from manim import *

class Moving(Scene):
    def construct(self):
        text = MathTex(r'E = \frac{k q}{r^2}')
        self.play(Write(text),text.animate.set_color(color.BLUE).scale(2))
        
        
        self.wait(1.5)
        
        
        