package tron.database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class HighScores {
    public static void addScore(String playerName) {
        String selectSql = "SELECT score FROM HIGHSCORES WHERE name = ?";
        String updateSql = "UPDATE HIGHSCORES SET score = score + 1 WHERE name = ?";
        String insertSql = "INSERT INTO HIGHSCORES (name, score) VALUES (?, 1)";

        try (Connection conn = Database.connect();
             PreparedStatement selectStmt = conn.prepareStatement(selectSql);
             PreparedStatement updateStmt = conn.prepareStatement(updateSql);
             PreparedStatement insertStmt = conn.prepareStatement(insertSql)) {

            selectStmt.setString(1, playerName);
            ResultSet rs = selectStmt.executeQuery();

            if (rs.next()) {
                updateStmt.setString(1, playerName);
                updateStmt.executeUpdate();
                System.out.println("Score updated successfully!");
            } else {
                insertStmt.setString(1, playerName);
                insertStmt.executeUpdate();
                System.out.println("New score added successfully!");
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }


    public static String printTop10Scores() {
        StringBuilder result = new StringBuilder();
        String sql = "SELECT name, score FROM HIGHSCORES ORDER BY score DESC LIMIT 10";

        try (Connection conn = Database.connect();
             PreparedStatement pstmt = conn.prepareStatement(sql);
             ResultSet rs = pstmt.executeQuery()) {

            result.append("Top 10 jatekos:\n");
            int rank = 1;
            while (rs.next()) {
                String name = rs.getString("name");
                int score = rs.getInt("score");
                result.append(rank).append(". ").append(name).append(" - ").append(score).append("\n");
                rank++;
            }

        } catch (SQLException e) {
            e.printStackTrace();
            return "Hiba";
        }

        return result.toString();
    }
}
