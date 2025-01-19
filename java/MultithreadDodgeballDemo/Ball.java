public class Ball implements Runnable{
    private final int WAIT = 50;
    private Room room;
    private int x;
    private int y;
    private int directionX = 0;
    private int directionY = 1;
    private boolean inMotion = false;
    public Ball(Room room) {
        this.room = room;
        boolean ok = false;
        while (!ok) {
            int tmpX = (int) (Math.random() * (room.getX()));
            int tmpY = (int) (Math.random() * (room.getY()));
            synchronized (room) {
                if (room.getObject(tmpX, tmpY).getClass() == Empty.class) {
                    x = tmpX;
                    y = tmpY;
                    room.placeObject(this, x, y);
                    ok = true;
                }
            }
        }
    }
    public int getX() { return x; }
    public int getY() { return y; }
    public boolean isInMotion() { return inMotion; }
    public void throwBall(int x, int y) {
        //System.out.println("LABDA");
        directionX = x;
        directionY = y;
        inMotion = true;
    }

    @Override
    public void run() {
        while (room.activePlayers() > 1) {
            try {
                Thread.sleep(WAIT);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            synchronized (room){
                if(inMotion) {
                    if(directionX < 0 || directionY < 0 || directionX >= room.getX() || directionY >= room.getY()) {
                        inMotion = false;
                    }else {
                        if(room.getObject(directionX, directionY).getClass() == Player.class) {
                            Player p = (Player)room.getObject(directionX, directionY);
                            p.out();
                            inMotion = false;
                        }else {
                            int tmpX = x;
                            int tmpY = y;
                            x = directionX;
                            y = directionY;
                            room.moveObject(this, x, y);
                            this.throwBall(x + (directionX - tmpX),y + (directionY - tmpY));
                        }
                    }
                }
            }
        }
    }

    @Override
    public String toString() {
        return "o";
    }
}
