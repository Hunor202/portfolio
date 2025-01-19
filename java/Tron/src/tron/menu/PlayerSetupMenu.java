package tron.menu;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.HashSet;
import java.util.Set;

public class PlayerSetupMenu extends JFrame {

    private final JTextField player1NameField;
    private final JTextField player2NameField;
    private final JComboBox<String> player1ColorComboBox;
    private final JComboBox<String> player2ColorComboBox;
    private boolean setupComplete = false;

    public PlayerSetupMenu() {
        setTitle("Tron Player Setup");
        setSize(400, 300);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new GridLayout(5, 2));

        JLabel player1Label = new JLabel("1. Játékos neve:");
        player1NameField = new JTextField();
        JLabel player1ColorLabel = new JLabel("1. Játékos színe:");
        player1ColorComboBox = new JComboBox<>(new String[]{"Piros", "Sarga", "Zold", "Lila"});

        JLabel player2Label = new JLabel("2. Játékos neve:");
        player2NameField = new JTextField();
        JLabel player2ColorLabel = new JLabel("2. Játékos színe:");
        player2ColorComboBox = new JComboBox<>(new String[]{"Piros", "Sarga", "Zold", "Lila"});

        JButton startGameButton = new JButton("Játék Indítása");
        startGameButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                if (validateInput()) {
                    setupComplete = true;
                    dispose();
                } else {
                    JOptionPane.showMessageDialog(null, "Mindkét játékosnak meg kell adnia egyedi nevet és különböző színt kell választaniuk!");
                }
            }
        });

        add(player1Label);
        add(player1NameField);
        add(player1ColorLabel);
        add(player1ColorComboBox);
        add(player2Label);
        add(player2NameField);
        add(player2ColorLabel);
        add(player2ColorComboBox);
        add(new JLabel());
        add(startGameButton);
        setLocationRelativeTo(null);
    }

    private boolean validateInput() {
        String player1Name = player1NameField.getText().trim();
        String player2Name = player2NameField.getText().trim();
        String player1Color = (String) player1ColorComboBox.getSelectedItem();
        String player2Color = (String) player2ColorComboBox.getSelectedItem();

        if (player1Name.isEmpty() || player2Name.isEmpty()) {
            return false;
        }

        if (player1Name.equals(player2Name)) {
            return false;
        }

        if (player1Color.equals(player2Color)) {
            return false;
        }

        return true;
    }

    public boolean isSetupComplete() {
        return setupComplete;
    }

    public String getPlayer1Name() {
        return player1NameField.getText().trim();
    }

    public String getPlayer2Name() {
        return player2NameField.getText().trim();
    }

    public String getPlayer1Color() {
        return (String) player1ColorComboBox.getSelectedItem();
    }

    public String getPlayer2Color() {
        return (String) player2ColorComboBox.getSelectedItem();
    }
}
