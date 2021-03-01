class Home extends Rectangle {

    constructor(x, y, width, height, speed) {
        super(x, y, width, height);
        this.speed = speed;
    }

    show(){
        noStroke();
        fill(255, 0, 0);
        rect(this.x-29, this.y, this.width+35, this.height);
        stroke(1);
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
