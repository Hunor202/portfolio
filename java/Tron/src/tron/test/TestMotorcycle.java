package tron.test;

import tron.model.Motorcycle;
import tron.model.Player;
import tron.model.Line;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.LinkedList;

import static org.junit.jupiter.api.Assertions.*;

public class TestMotorcycle {
    Motorcycle motorcycle;
    Player player;

    @BeforeEach
    void setup() {
        player = new Player("Bela", "kek");
        motorcycle = new Motorcycle(50, 50, 10, 10, null, player);
    }

    @Test
    void testInitialization() {
        assertNotNull(motorcycle);
    }

    @Test
    void testMove() {
        motorcycle.setVelX(5);
        motorcycle.setVelY(3);
        motorcycle.move();
        assertEquals(55, motorcycle.getX());
        assertEquals(53, motorcycle.getY());
    }

    @Test
    void testCollisionWithWall() {
        LinkedList<Line> wall = new LinkedList<>();
        wall.add(new Line(60, 50, 10, 10, null));

        motorcycle.setVelX(5);
        motorcycle.setVelY(0);
        motorcycle.move();
        assertTrue(motorcycle.collides(wall));

        motorcycle.setVelY(20);
        motorcycle.move();
        assertFalse(motorcycle.collides(wall));
    }
}
