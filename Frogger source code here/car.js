class Car extends Rectangle {

    constructor(x, y, width, height, speed, col) {
        super(x, y, width, height);
        this.speed = speed;
        this.col = col;
    }

    show(){
        colorMode(HSB);
        fill(0);
        var off = 0
        if(this.speed < 0) off = 8;
        else off = 0;
        rect(this.x + 4 + off, this.y + 4, 10, 5);
        rect(this.x + this.width - 27 + off, this.y + 4, 10, 5);
        rect(this.x + 4 + off, this.y + this.height - 9, 10, 5);
        rect(this.x + this.width - 27 + off, this.y + this.height - 9, 10, 5);
        fill(this.col, 255, 255);
        rect(this.x, this.y + this.height * .15, this.width, this.height* .70);
        fill(255);
        rect(this.x + this.width/2 + 25 * (this.width/grid - 1) - (((this.width/grid-1) * 6 + 1.5) * off), this.y + this.height * .20, 10, this.height * .6)
        colorMode(RGB);
    }

    update(){
       this.x += this.speed;

       if(this.speed > 0 && this.x > width+grid){
           this.x = - this.width - grid;
       } else if(this.speed < 0 && this.x < -this.width-grid){
            this.x = width + grid;
       }
    }
}