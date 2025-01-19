public class Player implements Runnable{
    private final String name;
    private final int WAIT = 100;
    private boolean active;
    private Room room;
    private int x;
    private int y;

    public Player(Room room, char[] name) {
        this.name = new String(name);
        this.room = room;
        this.active = true;
    }
    public boolean isActive() { return active; }
    public String getName() { return name; }

    @Override
    public void run() {
        boolean ok = false;
        int tmpX = -1;
        int tmpY = -1;
        while (!ok) {
            tmpX = (int) (Math.random() * (room.getX()));
            tmpY = (int) (Math.random() * (room.getY()));
            synchronized (room) {
                if(room.getObject(tmpX, tmpY).getClass() == Empty.class) {
                    x = tmpX;
                    y = tmpY;
                    room.placeObject(this, x, y);
                    ok = true;
                }
            }

        }
        while(this.active) {
            try {
                Thread.sleep(WAIT);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            int d = (int)(Math.random() * 8);
            switch (d){
                case 0:
                    tmpX = x - 1;
                    tmpY = y - 1;
                    break;
                case 1:
                    tmpX = x - 1;
                    tmpY = y;
                    break;
                case 2:
                    tmpX = x - 1;
                    tmpY = y + 1;
                    break;
                case 3:
                    tmpX = x;
                    tmpY = y + 1;
                    break;
                case 4:
                    tmpX = x + 1;
                    tmpY = y + 1;
                    break;
                case 5:
                    tmpX = x + 1;
                    tmpY = y;
                    break;
                case 6:
                    tmpX = x + 1;
                    tmpY = y - 1;
                    break;
                case 7:
                    tmpX = x;
                    tmpY = y - 1;
                    break;
            }
            synchronized (room) {
                if(tmpX < 0 || tmpY < 0 || tmpX >= room.getX() || tmpY >= room.getY()
                        || room.getObject(tmpX, tmpY).getClass() != Empty.class) {
                    //System.out.println("a mozgas sikertelen(FAL) " + "x:" + tmpX + " y:" + tmpY);
                }
                else {
                    //System.out.println("a mozgas sikeres " + "x:" + tmpX + " y:" + tmpY);
                    x = tmpX;
                    y = tmpY;
                    room.moveObject(this, x, y);
                    if(x + 1 < room.getX() && room.getObject(x+1, y).getClass() == Ball.class) {
                        Ball b = (Ball) room.getObject(x+1, y);
                        if(!b.isInMotion()) this.ballThrow(b);
                        //System.out.println(name + " x:" + (x + 1) + " y:" + y);
                    }
                    else if(x - 1 >= 0 && room.getObject(x-1, y).getClass() == Ball.class) {
                        Ball b = (Ball) room.getObject(x-1, y);
                        if(!b.isInMotion()) this.ballThrow(b);
                        //System.out.println(name + " x:" + (x - 1) + " y:" + y);
                    }
                    else if(y + 1 < room.getY() && room.getObject(x, y+1).getClass() == Ball.class) {
                        Ball b = (Ball) room.getObject(x, y+1);
                        if(!b.isInMotion()) this.ballThrow(b);
                        //System.out.println(name + " x:" + x + " y:" + (y+1));
                    }
                    else if(y - 1 >= 0 && room.getObject(x, y-1).getClass() == Ball.class) {
                        Ball b = (Ball) room.getObject(x, y-1);
                        if(!b.isInMotion()) this.ballThrow(b);
                        //System.out.println(name + " x:" + x + " y:" + (y-1));
                    }
                }
            }
        }
    }
    private void ballThrow(Ball b) {
        boolean ok = false;
        int tmpX = -1;
        int tmpY = -1;
        while (!ok) {
            int d = (int)(Math.random() * 8);
            switch (d){
                case 0:
                    tmpX = b.getX() - 1;
                    tmpY = b.getY() - 1;
                    break;
                case 1:
                    tmpX = b.getX() - 1;
                    tmpY = b.getY();
                    break;
                case 2:
                    tmpX = b.getX() - 1;
                    tmpY = b.getY() + 1;
                    break;
                case 3:
                    tmpX = b.getX();
                    tmpY = b.getY() + 1;
                    break;
                case 4:
                    tmpX = b.getX() + 1;
                    tmpY = b.getY() + 1;
                    break;
                case 5:
                    tmpX = b.getX() + 1;
                    tmpY = b.getY();
                    break;
                case 6:
                    tmpX = b.getX() + 1;
                    tmpY = b.getY() - 1;
                    break;
                case 7:
                    tmpX = b.getX();
                    tmpY = b.getY() - 1;
                    break;
            }
            if(tmpX != x || tmpY != y) { ok = true;}
        }
        b.throwBall(tmpX, tmpY);
    }
    public void out() {
        synchronized (room) {
            room.removeObject(this);
            active = false;
        }
    }

    @Override
    public String toString() {
        return name;
    }
}
