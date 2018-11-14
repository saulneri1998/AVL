//Borren el link de donde copiamos el código
//https://goo.gl/dGbFdW

class Tree {
  constructor() {
    this.root = null;
  }

  searchNode(cont) {
    if(cont != null) {
      return this.searchNodeRec(this.root, new Node(cont));
    }
  }
  searchNodeRec(root, lookingFor) {
    if(root == null) {
      return null;
    }else if(lookingFor.compareTo(root) == 0) {
      return root;
    }else if(lookingFor.compareTo(root) < 0) {
      return this.searchNodeRec(root.left, lookingFor);
    }else if(lookingFor.compareTo(root) > 0) {
      return this.searchNodeRec(root.right, lookingFor);
    }

    return null;
  }


  addNode(elem) {
    //New node
    let newNode = new Node(elem);
    newNode.x = 100;
    newNode.y = 100;
    newNode.radius = 500;
    newNode.calcColor();

    this.root = this.addNodeRec(this.root, newNode);

    this.calcDeepness();
  }
  addNodeRec(parent, child) {
    if (parent == null) {
      parent = child;
    }else if(child.compareTo(parent) < 0) {
      parent.left = this.addNodeRec(parent.left, child);
      if(this.equilibriumFactor(parent) < -1) {
        if(child.compareTo(parent.left) < 0) {
          print("simpleRotationToTheRight");
          parent = this.simpleRotationToTheRight(parent);
        }else {
          print("doubleRotationToTheRight");
          parent = this.doubleRotationToTheRight(parent);
        }
      }
    }else if(child.compareTo(parent) > 0) {
      parent.right = this.addNodeRec(parent.right, child);
      if(this.equilibriumFactor(parent) > 1) {
        if(child.compareTo(parent.right) > 0) {
          print("simpleRotationToTheLeft");
          parent = this.simpleRotationToTheLeft(parent);
        }else {
          print("doubleRotationToTheLeft");
          parent = this.doubleRotationToTheLeft(parent);
        }
      }
    }
    let h = max(this.heightOfNode(parent.left), this.heightOfNode(parent.right));
    parent.height = h + 1;
    return parent;
  }

  removeNode(elem) {
    let node = new Node(elem);
    this.root = this.removeNodeRec(this.root, node);
    this.calcDeepness();
  }
  removeNodeRec(parent, node) {
    if(parent == null) {
      return parent;
    }else if(node.compareTo(parent) < 0) {
      parent.left = this.removeNodeRec(parent.left, node);

    }else if(node.compareTo(parent) > 0) {
      parent.right = this.removeNodeRec(parent.right, node);

    }else if(node.compareTo(parent) == 0) {
      if(parent.left == null && parent.right == null) {
        return null;
      }else if(parent.left != null && parent.right != null) {
        let replacement = this.searchNode(this.maxNode(parent.left));
        parent.left = this.removeNodeRec(parent.left, replacement);
        parent.content = replacement.content;
        parent.x = replacement.x;
        parent.y = replacement.y;
        parent.radius = replacement.radius;
      }else if(parent.left != null) {
        parent = parent.left;
      }else if(parent.right != null) {
        parent = parent.right;
      }
    }

    if (this.equilibriumFactor(parent) < -1 && this.equilibriumFactor(parent.left) <= 0) {
      print("simpleRotationToTheRight");
      parent = this.simpleRotationToTheRight(parent);
    }
    if (this.equilibriumFactor(parent) < -1 && this.equilibriumFactor(parent.left) > 0) {
      print("doubleRotationToTheRight");
      parent = this.doubleRotationToTheRight(parent);
    }
    if (this.equilibriumFactor(parent) > 1 && this.equilibriumFactor(parent.right) >= 0) {
      print("simpleRotationToTheLeft");
      parent = this.simpleRotationToTheLeft(parent);
    }
    if (this.equilibriumFactor(parent) > 1 && this.equilibriumFactor(parent.right) < 0) {
      print("doubleRotationToTheLeft");
      parent = this.doubleRotationToTheLeft(parent);
    }

    let h = max(this.heightOfNode(parent.left), this.heightOfNode(parent.right)) + 1;
    parent.height = h;
    return parent;
  }

  simpleRotationToTheRight(root) {
    let temp = root.left;
    root.left = temp.right;
    temp.right = root;
    root.height = max(this.heightOfNode(root.left), this.heightOfNode(root.right)) + 1;
    temp.height = max(this.heightOfNode(temp.left), this.heightOfNode(temp.right)) + 1;
    return temp;
  }
  simpleRotationToTheLeft(root) {
    let temp = root.right;
    root.right = temp.left;
    temp.left = root;
    root.height = max(this.heightOfNode(root.left), this.heightOfNode(root.right)) + 1;
    temp.height = max(this.heightOfNode(temp.left), this.heightOfNode(temp.right)) + 1;
    return temp;
  }
  doubleRotationToTheRight(root) {
    root.left = this.simpleRotationToTheLeft(root.left);
    return this.simpleRotationToTheRight(root);
  }
  doubleRotationToTheLeft(root) {
    root.right = this.simpleRotationToTheRight(root.right);
    return this.simpleRotationToTheLeft(root);
  }

  heightOfNode(node) {
    if(node == null) {
      return -1;
    }else {
      return node.height;
    }
  }
  calcDeepness() {
    if(this.root != null) {
      this.root.deepness = 1;
      this.calcDeepnessRec(this.root);
    }
  }
  calcDeepnessRec(root) {
    if(root.left != null) {
      root.left.deepness = root.deepness + 1;
      this.calcDeepnessRec(root.left);
    }
    if(root.right != null) {
      root.right.deepness = root.deepness + 1;
      this.calcDeepnessRec(root.right);
    }
  }
  equilibriumFactor(node) {
    if(node == null) {
      return 0;
    }else {
      return this.heightOfNode(node.right) - this.heightOfNode(node.left);
    }
  }
  maxNode(node) {
    if(node.right == null) {
      return node.content;
    }else {
      return this.maxNode(node.right);
    }
  }

  show() {
    let wHeight = windowHeight * 0.92;
    if(this.root != null) {
      this.calcValues();
      this.root.showNode();
    }else {
      fill(0);
      noStroke();
      textSize(100);
      textAlign(CENTER, CENTER);
      text("Tree is empty", windowWidth/2, wHeight/2);
    }
  }

  calcValues() {
    let wHeight = windowHeight * 0.92;
    let maxHeight = this.root.calcHeight();
    let x = windowWidth / 2;
    let y = wHeight/maxHeight * 0.5;
    let rFact = 0.9;
    let r = wHeight/maxHeight * rFact;
    this.root.calc(x, y, r);
  }

  inOrder() {
    this.inOrderRec(this.root);
  }
  inOrderRec(node) {
    if(node != null) {
      this.inOrderRec(node.left);
      print(node.content);
      this.inOrderRec(node.right);
    }
  }

  preOrder() {
    this.preOrderRec(this.root);
  }
  preOrderRec(node) {
    if(node != null) {
      print(node.content);
      this.preOrderRec(node.left);
      this.preOrderRec(node.right);
    }
  }

  posOrder() {
    this.posOrderRec(this.root);
  }
  posOrderRec(node) {
    if(node != null) {
      this.posOrderRec(node.left);
      this.posOrderRec(node.right);
      print(node.content);
    }
  }

}
