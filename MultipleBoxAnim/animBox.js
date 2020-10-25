class Operation {
	constructor(height, width, bwidth, bheight) { 
    	this.h = height; 
      	this.w = width;
      	this.b_width = bwidth;
      	this.b_height = bheight;
      	this.obj=[];
      	this.textInput;
      	this.submitButton;
		this.getInput();	
	}
	getInput() {
		this.textInput = document.createElement("INPUT");
    	this.textInput.setAttribute("type", "text");
    	document.body.appendChild(this.textInput);

    	this.submitButton = document.createElement('button');
		document.body.appendChild(this.submitButton);
		this.submitButton.innerHTML = "Submit";
		this.submitButton.id = "submit";
		this.submitButton.addEventListener("click",()=>{ 
			for(let i = 0; i < this.textInput.value; i++){
				this.obj[i] = new Activity(this.h, this.w, this.b_width, this.b_height);	
			}
			this.submitButton.disabled=true;
		});
	}
}

class Activity { 
	constructor(height, width, bwidth, bheight) { 
    	this.h = height; 
      	this.w = width;
      	this.b_width = bwidth;
      	this.b_height = bheight;
		this.w_width =  width;
		this.w_height = height;
		this.pos = 0;
		this.pos1 = 0;
		this.pos2 = this.w_width - this.b_width;
		this.pos3 = this.w_height - this.b_height;
		this.size1 = 0;
		this.w_width -= this.b_width; 
		this.w_height -= this.b_height; 
		this.size = this.b_height;
		this.x = this.w_width;
      	this.window;
      	this.play;
      	this.box;
      	this.pause;
      	this.init();
	}
	init() {
		this.displayOuterBox();
		this.displayInnerBox();
   		this.createButton();
    }
    displayOuterBox() { 
		this.window = document.createElement('div');
		document.body.appendChild(this.window);
		this.window.id = 'window';
		this.window.style.width = this.w + 'px';
		this.window.style.height = this.h + 'px';
		this.window.style.backgroundColor = "#bbb";
		this.window.style.position = "relative";
		this.window.style.marginLeft = 50 + 'px';
		this.window.style.marginRight = 30 + 'px';
		this.window.style.marginTop = 80 + 'px';
	}
	displayInnerBox() {
		this.box = document.createElement('div');
		this.box.id = "inner";
		this.window.appendChild(this.box);
		this.box.style.width = this.b_width + 'px';
		this.box.style.height = this.b_height + 'px';
		this.box.style.top = 0 + 'px';
		this.box.style.left = 0 + 'px';
		this.box.style.backgroundColor = "red";
		this.box.style.position = "absolute";
   	}
   	createButton() {
		this.play = document.createElement('button');
		document.body.appendChild(this.play);
		this.play.id = 'play';
		this.play.innerHTML = "Play";
		this.play.style.backgroundColor = "#bbb";
		this.play.style.position = "absolute";
		this.play.style.marginLeft = 270 + 'px';
		this.play.style.marginTop = 20 + 'px';
		this.play.addEventListener("click",()=>{ this.moveObject();
			this.play.disabled=true;
			this.pause.disabled=false;
		});

		this.pause = document.createElement('button');
		document.body.appendChild(this.pause);
		this.pause.id = 'pause';
		this.pause.innerHTML = "Pause";
		this.pause.style.backgroundColor = "#bbb";
		this.pause.style.position = "absolute";
		this.pause.style.marginLeft = 320 + 'px';
		this.pause.style.marginTop = 20 + 'px';
		this.pause.addEventListener("click",()=>{ this.stopObject();
			this.pause.disabled=true;
			this.play.disabled=false;
		});
   	}
   	moveObject() {
		this.id = setTimeout(()=>{
			this.frame();
		}, 3);
	}
	frame() {
		let box_elem = this.box; 
		if (this.pos < this.w_width) {
			this.pos++; 
			box_elem.style.left = this.pos + 'px'; 
		} else if (this.pos1 < this.w_height) {
			this.pos1++; 
			box_elem.style.top = this.pos1 + 'px'; 
		}
		else if (this.pos2 > this.size1) {
			this.pos2--;
			box_elem.style.left = this.pos2 + 'px';
		}	
		else if (this.pos3 > this.size) {
			this.pos3--;
			box_elem.style.top = this.pos3 + 'px';
			if(this.pos3 == this.size)
			{
				this.pos = 0 + this.size1;
				this.pos1 = 0 + this.size;
				this.pos2 = this.pos3 = this.x - this.size;	
				this.size = this.size + this.b_height;	
				this.size1 = this.size1 + this.b_width;	
				this.w_width = this.w_width - this.b_width;
				this.w_height = this.w_height - this.b_height;
			}
		}
		this.id = setTimeout(()=>{
			this.frame();
		});
	}
	stopObject(){
		clearTimeout(this.id);	
	}
}   
