class Node {
  constructor(cont) {
    this.content = cont;
    this.left = null;
    this.right = null;
    this.deepness = 0;
    this.height = 0;
    this.radius = 0;
    this.x = 0;
    this.y = 0;
    this.newX = 0;
    this.newY = 0;
    this.newR = 0;
    this.color = color(0);
  }

  calc(x, y, r) {
    this.newX = even(x);
    this.newY = even(y);
    this.newR = even(r);

    let ypos = (y / ((2*this.deepness) - 1)) * ((2*this.deepness) + 1);
    let xfact = (windowWidth/2**(this.deepness+1));
    let radiusFact = 0.8;

    if(this.left != null) {
      this.left.calc(this.newX - xfact, ypos, this.newR*radiusFact)
    }
    if(this.right != null) {
      this.right.calc(this.newX + xfact, ypos, this.newR*radiusFact);
    }

    function even(num) {
      num = floor(num);
      if(num % 2 == 0) {
        return num;
      }else {
        return num + 1;
      }
    }
  }

  calcHeight() {
    if(this.left == null && this.right == null) {
      this.height = 0;
    }else if(this.left != null && this.right != null) {
      this.height = max(this.left.calcHeight(), this.right.calcHeight());
    }else if(this.left != null) {
      this.height = this.left.calcHeight();
    }else if(this.right != null) {
      this.height = this.right.calcHeight();
    }

    return this.height + 1;
  }
  
  calcColor(){
    let blue =color("#1E88E5") ;
    let orange =color("#F4511E");
    let red = color("#E53935");
    let green = color("#43A047");
    let purple = color("#5E35B1");
    switch(Math.floor(Math.random() * (5 - 1 + 1)) + 1){
        case 1: 
             this.color = blue;
        break; 
        case 2: 
             this.color = red;
        break; 
        case 3: 
             this.color = orange; 
        break;
        case 4: 
             this.color = purple; 
        break;
        case 5: 
             this.color = green;
        break; 
    } 
    return this.color;
  }
  showNode() {
    if(this.x == this.newX && this.y == this.newY && this.radius == this.newR) {
      this.showLines();
    }
    this.show();

    if(this.left != null) {
      this.left.showNode();
    }

    if(this.right != null) {
      this.right.showNode();
    }
  }
    
  show() {
    let circumferenceColor = this.color;
    let circleColor = this.color;
    let lettersColor = color(250);
    let vel = 5;

    if(abs(this.x - this.newX) <= 5) this.x = this.newX;
    if(abs(this.y - this.newY) <= 5) this.y = this.newY;
    if(abs(this.radius - this.newR) <= 5) this.radius = this.newR;

    if(this.newX < this.x) {
      this.x -= vel;
    }else if(this.newX > this.x) {
      this.x += vel;
    }

    if(this.newY < this.y) {
      this.y -= vel;
    }else if(this.newY > this.y) {
      this.y += vel;
    }

    if(this.newR < this.radius) {
      this.radius -= vel;
    }else if(this.newR > this.radius) {
      this.radius += vel;
    }

    strokeWeight(10);

    stroke(circumferenceColor);
    fill(circleColor);
    ellipse(this.x, this.y, this.radius);

    fill(lettersColor);
    noStroke();
    textSize(this.radius * 0.7);
    textAlign(CENTER, CENTER);
    text(this.content, this.x, this.y);
  }

  showLines() {
    let linesColor = this.color;
    stroke(linesColor);
    if(this.left != null && this != null) {
      if(this.left.x == this.left.newX && this.left.y == this.left.newY && this.left.radius == this.left.newR) {
        line(this.x, this.y, this.left.x, this.left.y);
      }
    }
    if(this.right != null && this != null) {
      if(this.right.x == this.right.newX && this.right.y == this.right.newY && this.right.radius == this.right.newR) {
        line(this.x, this.y, this.right.x, this.right.y);
      }
    }
  }


  compareTo(node2) {
    if(this.content > node2.content) {
      return 1;
    }else if(this.content < node2.content) {
      return -1;
    }else {
      return 0;
    }
  }

}
