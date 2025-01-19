import java.io.IOException;

public class Room {
    private int x;
    private int y;
    private int numOfPlayers;
    private int activePlayers = 0;
    private Object[][] field;

    public Room(int x, int y) {
        this.x = x;
        this.y = y;
        field = new Object[x][y];
        for(int i = 0 ; i < x; i++) {
            for(int j = 0; j < y; j++) {
                field[i][j] = new Empty();
            }
        }
    }
    public int getX() { return x; }
    public int getY() { return y; }
    public void draw() {
        //System.out.print("\033[H\033[2J");
        //System.out.print("\u001B[0;0H");
        System.out.print("\033[H\033[2J");
        System.out.flush();
        System.out.println("+-----+");
        for(int i = 0 ; i < x; i++) {
            System.out.print("|");
            for(int j = 0; j < y; j++) {
                System.out.print(field[i][j]);
            }
            System.out.println("|");
        }
        System.out.println("+-----+");
    }
    public Object getObject(int x, int y) { return field[x][y]; }
    public void placeObject(Object o, int x, int y) {
        field[x][y] = o;
        if(o.getClass() == Player.class) { ++activePlayers; }
    }
    public void removeObject(Object o) {
        for(int i = 0 ; i < x; i++) {
            for(int j = 0; j < y; j++) {
                if(o == field[i][j]) {
                    if(o.getClass() == Player.class) { --activePlayers; }
                    field[i][j] = new Empty();
                    return;
                }
            }
        }
    }
    public void moveObject(Object o, int x, int y) {
        for(int i = 0 ; i < this.x; i++) {
            for(int j = 0; j < this.y; j++) {
                if(o == field[i][j]) {
                    field[i][j] = new Empty();
                    field[x][y] = o;
                }
            }
        }
    }
    public int activePlayers() { return activePlayers; }

}