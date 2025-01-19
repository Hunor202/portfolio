package tron.test;

import tron.model.Level;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import tron.model.Motorcycle;
import tron.model.Player;

import static org.junit.jupiter.api.Assertions.*;

public class TestLevel {
    Level level;

    @BeforeEach
    void setup() {
        level = new Level();
    }

    @Test
    void testLevelInitialization() {
        assertTrue(level != null);
    }

    @Test
    void testCollides() {
        Motorcycle m1 = new Motorcycle(50,50,10,10, null, new Player("bela", "prios"));
        Motorcycle m2 = new Motorcycle(0,50,10,10, null, new Player("bela", "prios"));
        assertFalse(level.collides(m1));
        assertTrue(level.collides(m2));
    }
}
