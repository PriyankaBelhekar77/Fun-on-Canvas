	
var x, size, b_size = 60;
var w_width = 600;
var w_height = 600;

w_width -= b_size; 
w_height -= b_size; 
size = b_size;
x = w_width;
var pos = 0, pos1 = 0, pos2 = w_width, pos3 = w_width, size1 = 0;
		
var id ;

function moveObject() {	
	id = setInterval(moveRight, 1);
	document.getElementById("play").style.visibility='hidden';
	document.getElementById("pause").style.visibility='visible';
} 
function moveRight() {
	var box_elem = document.getElementById("InnerBox"); 
			
	if (pos < w_width) {
		pos++; 
		box_elem.style.left = pos + 'px'; 
	} else if (pos1 < w_height) {
		pos1++; 
		box_elem.style.top = pos1 + 'px'; 
	}
	else if (pos2 > size1) {
		pos2--;
		box_elem.style.left = pos2 + 'px';
	}	
	else if (pos3 > size) {
		pos3--;
		box_elem.style.top = pos3 + 'px';
		
		if(pos3 == size)
		{
			pos = 0 + size1;
			pos1 = 0 + size;
			pos2 = pos3 = x - size;
			
			size = size + b_size;	
			size1 = size1 + b_size;	
				
			w_width = w_width - b_size;
			w_height = w_height - b_size;
					
			console.log("pos "+pos);
			console.log("pos1 "+pos1);
			console.log("pos2 "+pos2);
			console.log("pos3 "+pos3);
			console.log(w_height);
			console.log(w_width);
				
			moveRight();
		}
	}
}	

function stopObject()
{
	clearInterval(id);	
	console.log("stop"+id);
	document.getElementById("pause").style.visibility='hidden';
	document.getElementById("play").style.visibility='visible';
	
}
