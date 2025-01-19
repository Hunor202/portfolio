package tron.model;

import javax.swing.*;
import java.awt.Image;
import java.util.LinkedList;

public class Motorcycle extends Sprite {
    Image lineImage;
    Player player;
    private double velX;
    private double velY;
    private LinkedList<Line> lines;
    private final int MAX_LINES = 100;
    public Motorcycle(int x, int y, int width, int height, Image image, Player player) {
        super(x, y, width, height, image);
        velX = 0;
        velY = 0;
        this.player = player;
        this.lines = new LinkedList<>();
        lineImage = new ImageIcon("data/images/line_" + player.getColor() + ".png").getImage();
    }

    public void move() {
        x += velX;
        y += velY;
        lines.add(new Line(x, y, width, height, lineImage));

        if (lines.size() > MAX_LINES) {
            lines.removeFirst();
        }
    }

    public boolean collides(LinkedList<Line> lines) {
        Boolean collided = false;
        for (Line line : lines) {
            if (this.collides(line)) {
                collided = true;
                System.out.println("asd");
                break;
            }
        }
        return collided;
    }
    public LinkedList<Line> getLines() { return lines; }
    public void setVelX(double velX) {
        this.velX = velX;
    }
    public void setVelY(double velY) { this.velY = velY; }
}
