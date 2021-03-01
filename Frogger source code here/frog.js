class Frog extends Rectangle{

    constructor(x, y, width, scale){
        super(x, y, width, width);
        this.attached = null;
        this.angle = 0;
        this.scale = scale;
    }

    attach(log){
        this.attached = log;
    }


    update(){
        if(this.attached != null) {
            this.x += this.attached.speed;
        }

        this.x = constrain(this.x, 0, width-this.width);
        this.y = constrain(this.y, 0, height-this.width);
    }

    show(){
        angleMode(DEGREES);
        rectMode(CENTER);
        fill(0, 255, 0);
        push();
            translate(this.x + this.width/2, this.y + this.width/2);
            rotate(this.angle);
            scale(this.scale);
//            rect(0,0,this.width, this.width);
            push();
                translate(-20, -10);
                rotate(-100);
                rect(0,0,10,2);
            pop();
            push();
                translate(21, -11);
                rotate(100);
                rect(0,0,10,2);
            pop();

            push();
                translate(-22, -13);
                rotate(0);
                rect(0,0,7,7);
            pop();
            push();
                translate(22, -14);
                rotate(0);
                rect(0,0,7,7);
            pop();

            push();
                translate(-16, -7);
                rotate(-45);
                rect(0,0,10,2);
            pop();
            push();
                translate(16, -8);
                rotate(45);
                rect(0,0,10,2);
            pop();

            push();
                translate(-23, 10);
                rotate(-45);
                rect(0,0,10,10);
            pop();
            push();
                translate(22, 10);
                rotate(45);
                rect(0,0,10,10);
            pop();

            push();
                translate(-15, 18);
                rotate(-45);
                rect(0,0,7,15);
            pop();
            push();
                translate(14, 18);
                rotate(45);
                rect(0,0,7,15);
            pop();
            ellipse(0, 0, this.width-22, this.width-6);
            fill(255,165,0);
            push();
                translate(-6, -17);
                rotate(-20);
                ellipse(0,0,10,6);
                fill(0);
                ellipse(0,0,3,3);
            pop();
            push();
                translate(6, -17);
                rotate(20);
                ellipse(0,0,10,6);
                fill(0);
                ellipse(0,0,3,3);
            pop();
        pop();
        rectMode(CORNER);
    }

    move(xdir, ydir){
        this.x += xdir * grid;
        this.y += ydir * grid;
        if (xdir == 1) this.angle = 90;
        if (xdir == -1) this.angle = -90;
        if (ydir == -1) this.angle = 0;
        if (ydir == 1) this.angle = 180;
    }
}