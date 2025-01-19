package tron;

import tron.menu.TronMenu;
import tron.menu.PlayerSetupMenu;
import tron.model.Player;
import tron.view.TronGUI;
import tron.view.GameEngine;
import tron.controller.TronController;

public class Tron {
    public static void main(String[] args) {
        TronMenu tronMenu = new TronMenu();
        tronMenu.setVisible(true);
        while (!tronMenu.getNewGame()) {
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        tronMenu.dispose();

        PlayerSetupMenu playerSetupMenu = new PlayerSetupMenu();
        playerSetupMenu.setVisible(true);
        while (!playerSetupMenu.isSetupComplete()) {
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        playerSetupMenu.dispose();
        Player player1 = new Player(playerSetupMenu.getPlayer1Name(), playerSetupMenu.getPlayer1Color());
        Player player2 = new Player(playerSetupMenu.getPlayer2Name(), playerSetupMenu.getPlayer2Color());

        newGame(player1, player2);
    }

    private static void newGame(Player player1, Player player2) {
        TronGUI gui = new TronGUI();
        GameEngine gameEngine = new GameEngine();
        new TronController(gameEngine, player1, player2);
        gui.add(gameEngine);
        gui.setVisible(true); // Ensure the GUI is visible
        gameEngine.requestFocusInWindow(); // Request focus for the game engine
    }
}
