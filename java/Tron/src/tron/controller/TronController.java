package tron.controller;

import tron.Tron;
import tron.database.HighScores;
import tron.model.Level;
import tron.model.Motorcycle;
import tron.model.Player;
import tron.view.GameEngine;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import javax.swing.*;

public class TronController implements KeyListener, ActionListener {
    Player player1, player2;
    private GameEngine view;
    private Level level;
    private Motorcycle motorcycle1, motorcycle2;
    private Timer newFrameTimer;
    private boolean paused = false;

    public TronController(GameEngine view, Player player1, Player player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.view = view;
        this.view.addKeyListener(this);
        this.view.setFocusable(true);
        this.view.requestFocusInWindow();
        level = new Level();
        view.setLevel(level);
        restart();
        newFrameTimer = new Timer(1000 / view.getFPS(), this);
        newFrameTimer.start();
    }

    private void restart() {
        motorcycle1 = new Motorcycle(200, 200, view.getMotorWidth(), view.getMotorHeight(), view.getMotorImage(), player1);
        motorcycle2 = new Motorcycle(500, 200, view.getMotorWidth(), view.getMotorHeight(), view.getMotorImage(), player2);
        view.setMotorcycle1(motorcycle1);
        view.setMotorcycle2(motorcycle2);
    }

    @Override
    public void actionPerformed(ActionEvent ae) {
        if (!paused) {
            motorcycle1.move();
            motorcycle2.move();
        }else {
            int option = JOptionPane.showOptionDialog(
                    null,
                    "A játék megállítva. Mit szeretnél tenni?",
                    "Szünet",
                    JOptionPane.YES_NO_OPTION,
                    JOptionPane.QUESTION_MESSAGE,
                    null,
                    new Object[]{"Folytatás", "Új játék"},
                    "Folytatás"
            );

            if (option == JOptionPane.YES_OPTION) {
                paused = false;
            } else if (option == JOptionPane.NO_OPTION) {
                JOptionPane.showMessageDialog(null, "Új játék indítása...");
                paused = false;
                restart();
            }
        }
        if(level.collides(motorcycle1) || motorcycle1.collides(motorcycle2.getLines())){
            JOptionPane.showMessageDialog(null, "Játék vége, a győztes " + player2.getName() + "!");
            HighScores.addScore(player2.getName());
            System.exit(0);
        }
        if(level.collides(motorcycle2) || motorcycle2.collides(motorcycle1.getLines())){
            JOptionPane.showMessageDialog(null, "Játék vége, a győztes " + player1.getName() + "!");
            HighScores.addScore(player1.getName());
            System.exit(0);
        }
        view.repaint();
    }

    @Override
    public void keyPressed(KeyEvent e) {
        switch (e.getKeyCode()) {
            case KeyEvent.VK_LEFT:
                motorcycle1.setVelX(-view.getMotorMovement());
                motorcycle1.setVelY(0);
                break;
            case KeyEvent.VK_RIGHT:
                motorcycle1.setVelX(view.getMotorMovement());
                motorcycle1.setVelY(0);
                break;
            case KeyEvent.VK_DOWN:
                motorcycle1.setVelY(view.getMotorMovement());
                motorcycle1.setVelX(0);
                break;
            case KeyEvent.VK_UP:
                motorcycle1.setVelY(-view.getMotorMovement());
                motorcycle1.setVelX(0);
                break;
            case KeyEvent.VK_A:
                motorcycle2.setVelX(-view.getMotorMovement());
                motorcycle2.setVelY(0);
                break;
            case KeyEvent.VK_D:
                motorcycle2.setVelX(view.getMotorMovement());
                motorcycle2.setVelY(0);
                break;
            case KeyEvent.VK_S:
                motorcycle2.setVelY(view.getMotorMovement());
                motorcycle2.setVelX(0);
                break;
            case KeyEvent.VK_W:
                motorcycle2.setVelY(-view.getMotorMovement());
                motorcycle2.setVelX(0);
                break;
            case KeyEvent.VK_ESCAPE:
                paused = true;
                break;
        }
    }

    @Override
    public void keyReleased(KeyEvent e) {
        // Empty
    }

    @Override
    public void keyTyped(KeyEvent e) {
        // Empty
    }
}