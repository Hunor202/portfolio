import com.sun.jdi.event.MonitorWaitedEvent;
import java.io.IOException;
public class Game {
    private static int roomX = 5;
    private static int roomY = 5;
    private static int numOfPlayers = 10;
    private static int WAIT = 50;
    static String[] ABC = {"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
            "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"};

    public static void main(String[] args) {
        //System.out.println("asd");
        Room room = new Room(roomX, roomY);

        for(int i = 0; i < numOfPlayers; i++) {
            Thread thread = new Thread(new Player(room, ABC[i].toCharArray()));
            thread.start();
        }
        Ball ball = new Ball(room);
        room.placeObject(ball, ball.getX() , ball.getY());
        Thread b = new Thread(ball);
        b.start();
        while (room.activePlayers() > 1) {
            try {
                Thread.sleep(WAIT);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            synchronized (room) {
                room.draw();
                //System.out.println(room.activePlayers());
            }
        }
        for(int i = 0 ; i < roomX; i++) {
            for(int j = 0; j < roomY; j++) {
                if(room.getObject(i, j).getClass() == Player.class) {
                    Player p = (Player) room.getObject(i, j);
                    System.out.println("Winner: " + p.getName());
                    p.out();
                }
            }
        }
    }
}
