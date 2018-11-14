
let tree;
let add, input, rem;

function keyPressed() {
   if(keyCode === ENTER) {
        let inp = input.value();
		if(inp != "") {
			print("Value: " + input.value());
			let inp = parseInt(input.value());
			if(!isNaN(inp)) {
				input.value("");
				tree.addNode(inp);
				tree.inOrder();
			}
            $("#user_input").val("");
        }
    }
}
function setup() {
	createCanvas(windowWidth, windowHeight*0.92);
	background(255);

	tree = new Tree();

	add = select("#add_button");
	rem = select("#remove_button");
	input = select("#user_input");

	add.mousePressed(increaseTree);
	rem.mousePressed(reduceTree);
    function increaseTree() {
		let inp = input.value();
		if(inp != "") {
			print("Value: " + input.value());
			let inp = parseInt(input.value());
			if(!isNaN(inp)) {
				input.value("");
				tree.addNode(inp);
				tree.inOrder();
			}
		}
	}
	function reduceTree() {
		let inp = input.value();
		if(inp != "") {
			inp = parseInt(inp);
			input.value("");
			if(!isNaN(inp) && tree.root != null) {
				tree.removeNode(inp);
				tree.inOrder();
			}
		}
	}
}

function draw() {
	background(250);
	tree.show();

}
