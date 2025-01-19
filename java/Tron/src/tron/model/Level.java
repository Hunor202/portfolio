package tron.model;

import java.awt.Graphics;
import java.awt.Image;
import java.util.ArrayList;
import javax.swing.ImageIcon;

public class Level {

    private final int WALL_SIZE = 25;
    ArrayList<Wall> walls;

    public Level() {
        walls = new ArrayList<>();
        Image image = new ImageIcon("data/images/wall1.png").getImage();
        for (int i = 0; i < 31; ++i) {
            walls.add(new Wall(i * WALL_SIZE, 0, WALL_SIZE, WALL_SIZE, image));
            walls.add(new Wall(i * WALL_SIZE, 21 * WALL_SIZE, WALL_SIZE, WALL_SIZE, image));
        }
        for (int i = 1; i < 21; ++i) {
            walls.add(new Wall(0, i * WALL_SIZE, WALL_SIZE, WALL_SIZE, image));              // Bal oldal
            walls.add(new Wall(30 * WALL_SIZE, i * WALL_SIZE, WALL_SIZE, WALL_SIZE, image)); // Jobb oldal
        }
    }

    public boolean collides(Motorcycle motorcycle) {
        Boolean collided = false;
        for (Wall wall : walls) {
            if (wall.collides(motorcycle)) {
                collided = true;
                System.out.println("asd");
                break;
            }
        }
        return collided;
    }

    public void draw(Graphics g) {
        for (Wall wall : walls) {
            wall.draw(g);
        }
    }
}

