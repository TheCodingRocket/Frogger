let frogs = [8];
let cars = [];
let logs = [];
let home = [];
let block = [];
let grid = 50;
let lock = [7];
let score = 0;
let topscore = 0;
let lastscore = 0;
let time = 30;
let timer = time;
let play = true;

function gameOver() {
	if(play && lock[5]) {		//bonus points for extra frog
		score = score + 50;
	}
	if(play && lock[6]) {		//bonus points for extra frog
		score = score + 50;
	}
	play = false;
	noLoop();
	lastscore = score;
	if (score>topscore) topscore = score;
    timer = time;
	button.show();
}

function resetGame() {
    frogs[0] = new Frog(width / 2 - grid / 2, height - grid, grid, .9);
    frogs[0].attach(null);
    frogs[6] = new Frog(60, 0, grid, .4);
    frogs[6].attach(null);
    frogs[7] = new Frog(90, 0, grid, .4);
    frogs[7].attach(null);
    lock = [];
    lock[5] = true;
    lock[6] = true;
    score = 0;
    button.hide();
    timer = time;
    play = true;
    loop();
}

function loseFrog() {
	frogs[0] = new Frog(width / 2 - grid / 2, height - grid, grid, .9);
    frogs[0].attach(null);
    if(lock[5]) {
    	lock[5] = false;
    	timer = time;
    }
    else if(lock[6]) {
		lock[6] = false;
		timer = time;
	}
    else gameOver();
}

function resetFrog() {
	frogs[0] = new Frog(width / 2 - grid / 2, height - grid, grid, .9);
    frogs[0].attach(null);
    score = score + ceil(timer);
    if (score>topscore) topscore = score;
    timer = time;
}

function setup() {
    var canvas = createCanvas(600, 600);
  	canvas.parent('sketch-holder');

  	button = createButton('Play Again');
  	button.parent('sketch-holder');
  	button.position(width/2 - 23, height/2 + 10);
  	button.mousePressed(resetGame);
  	button.hide();
    
    resetGame();
    colorMode(RGB);
    let index = 0;

    // ROW 1
    for (let i = 0; i < 2; i++) {
        let x = i * 300;
        let y = random(255);
        cars[index] = new Car(x, height - grid * 2, grid * 2, grid, 2, y);
        index ++;
    }

    // ROW 2
    for (i = 0; i < 2; i++) {
        let x = i * 200 + 150;
        let y = random(255);
        cars[index] = new Car(x, height - grid * 3, grid, grid, -3.5, y);
        index ++;
    }

    // ROW 3
    for (i = 0; i < 4; i++) {
        let x = i * 150 + 25;
        let y = random(255);
        cars[index] = new Car(x, height - grid * 4, grid, grid, 1.2, y);
        index ++;
    }

    // ROW 4
    for (i = 0; i < 4; i++) {
        let x = i * 200 + 25;
        let y = random(255);
        cars[index] = new Car(x, height - grid * 5, grid*1.5, grid, -1.8, y);
        index ++;
    }

    // ROW 6
    index = 0;
    for (i = 0; i < 2; i++) {
        let x = i * 250 + 100;
        logs[index] = new Log(x, height - grid * 7 + 1, grid * 3, grid - 2, 2.3);
        index ++;
    }

    // ROW 7
    for (i = 0; i < 3; i++) {
        let x = i * 200 + 30;
        logs[index] = new Log(x, height - grid * 8 + 1, grid * 2, grid - 2, -1.3);
        index ++;
    }

    // ROW 8
    for (i = 0; i < 2; i++) {
        let x = i * 400 + 10;
        logs[index] = new Log(x, height - grid * 9 + 1, grid * 4, grid - 2, 0.5);
        index ++;
    }

    // ROW 9
    for (i = 0; i < 4; i++) {
        let x = i * 150 + 10;
        logs[index] = new Log(x, height - grid * 10 + 1, grid, grid - 2, -4);
        index ++;
    }

    // ROW 10
    index = 0;
    for (i = 0; i < 6; i++) {
        let x = i * 112;
        home[index] = new Home(x+29, height - grid * 11, grid * .1, grid, 0);
        index ++;
    }
}

function draw() {
    background(238);
    noStroke();
    fill(100, 100);

    // ROW 0
    rect(0, height - grid, width, grid - 1);

    // ROAD
    fill(100);
    rect(0, height - grid * 5 - 1, width, grid * 4 + 1);
    fill(255, 255, 0);
    for (let j = 0; j<3; j++) {
    	for (let i = 0; i < 6; i++) {
    		let x = i * 100 + 20;
    		rect(x, height-grid*(4 - j) - 2, 50, 4);
    	}
    }

    // ROW 5
    fill(100,100);
    rect(0, height-grid * 6 + 1, width, grid - 2);

    // WATER
    fill(0, 0, 255);
    rect(0, height-grid * 11, width, grid * 5 + 1);

    // HOME
    stroke(1);
    fill(34, 139, 34);
    for (let i = 0; i < home.length; i++) {
    	let x = i * 112 + 36;
    	ellipse(x + grid * .79, height - grid * 11 + 26, 68, grid);
    }
    noStroke();
    
    // ROW 11
    fill(255, 0, 0);
    rect(0, 0, width,grid);
    stroke(1);

    for (i = 0; i < cars.length; i++) {
        cars[i].update();
        cars[i].show();
        
        if(frogs[0].intersects(cars[i])){
            loseFrog();
        }
    }
    
    for (i = 0; i < logs.length; i++){
        logs[i].update();
        logs[i].show();
    }

    for (i = 0; i < home.length; i++) {
        home[i].update();
        home[i].show();

        if(frogs[0].intersects(home[i])) {
            loseFrog();
        }
    }
    
    if (frogs[0].y < height - grid * 6 && frogs[0].y > grid*1) {
        let ok = false;
        
        for(i = 0; i<logs.length; i++){
            if (frogs[0].intersects(logs[i])) {
                ok = true;
                frogs[0].attach(logs[i]);
            }
        }
        if(!ok){
            loseFrog();
        }
    } else {
        frogs[0].attach(null);
    }

    if (frogs[0].y < height - grid * 10) {
    	var l = floor(frogs[0].x/112);
    	if (lock[l]) {
    		loseFrog();
    	}
    	else {
    		lock[l]=true;
    		let x = l * 112;
      		frogs[l+1] = new Frog(x + 10 + grid * .79, height - grid * 11, grid, 1);
    		resetFrog();
    	}
    }

	if(lock[0] && lock[1] && lock[2] && lock[3] && lock[4]) gameOver();

    fill(238);
    rect(5,5,130,40);
    rect(465,5,130,40);
    rect(235,5,130,40);
    noStroke();
  	textSize(12);
  	textAlign(LEFT);
  	fill(0);
  	text('Frogs Left:', 10, 30);
  	text('Score:', 480, 16);
  	text('Last:', 480, 29);
  	text('Top:', 480, 42);
  	textAlign(RIGHT);
  	text(score, 585, 16);
  	text(lastscore, 585, 29);
  	text(topscore, 585, 42);
  	textAlign(CENTER);
  	textSize(36);
  	text(ceil(timer), 300, 40);
  	stroke(1);

    frogs[0].update();
    frogs[0].show();

    for (i = 1; i < frogs.length; i++) {
    	if(lock[i-1]) frogs[i].show();
    }	
    
    timer -= .015;

    if(timer < -.015) loseFrog();

}

function keyPressed() {
    if(keyCode === UP_ARROW){
        frogs[0].move(0, -1);
    }else if(keyCode === DOWN_ARROW){
        frogs[0].move(0, 1);
    }else if(keyCode === RIGHT_ARROW){
        frogs[0].move(1, 0);
    }else if(keyCode === LEFT_ARROW){
        frogs[0].move(-1, 0);
    }
}
