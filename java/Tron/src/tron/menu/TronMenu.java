package tron.menu;

import tron.database.HighScores;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class TronMenu extends JFrame {
    Boolean newGame;
    public TronMenu() {
        newGame = false;
        setTitle("Tron Game Menu");
        setSize(800, 600);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new GridLayout(2, 1));

        JButton newGameButton = new JButton("Új Játék");
        JButton rankingButton = new JButton("Rangsor");

        newGameButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) { newGame = true; }
        });

        rankingButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                JOptionPane.showMessageDialog(null, HighScores.printTop10Scores());
            }
        });

        add(newGameButton);
        add(rankingButton);

        setLocationRelativeTo(null);
    }
    public boolean getNewGame() { return newGame; }
}
