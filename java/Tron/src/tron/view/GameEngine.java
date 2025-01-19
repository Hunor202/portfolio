package tron.view;

import tron.model.Line;
import tron.model.Motorcycle;
import tron.model.Level;

import java.awt.Graphics;
import java.awt.Image;
import javax.swing.ImageIcon;
import javax.swing.JPanel;

public class GameEngine extends JPanel {
    private final int FPS = 240;
    private final int MOTOR_WIDTH = 50;
    private final int MOTOR_HEIGHT = 50;
    private final int MOTOR_MOVEMENT = 2;
    private Image background;
    private Motorcycle motorcycle1, motorcycle2;
    private Level level;

    public GameEngine() {
        super();
        background = new ImageIcon("data/images/background.png").getImage();
    }

    public int getFPS() {
        return FPS;
    }

    public int getMotorWidth() {
        return MOTOR_WIDTH;
    }

    public int getMotorHeight() {
        return MOTOR_HEIGHT;
    }

    public int getMotorMovement() {
        return MOTOR_MOVEMENT;
    }

    public Image getMotorImage() {
        return new ImageIcon("data/images/motorcycle.png").getImage();
    }

    public void setMotorcycle1(Motorcycle motorcycle) {
        this.motorcycle1 = motorcycle;
    }
    public void setMotorcycle2(Motorcycle motorcycle) {
        this.motorcycle2 = motorcycle;
    }

    public void setLevel(Level level) { this.level = level; }

    @Override
    protected void paintComponent(Graphics grphcs) {
        super.paintComponent(grphcs);
        grphcs.drawImage(background, 0, 0, 800, 600, null);
        level.draw(grphcs);

        for (Line line : motorcycle1.getLines()) {
            line.draw(grphcs);
        }

        for (Line line : motorcycle2.getLines()) {
            line.draw(grphcs);
        }

        motorcycle1.draw(grphcs);
        motorcycle2.draw(grphcs);
    }
}