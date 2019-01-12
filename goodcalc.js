let num = "" ;//temporary  insert number 
let str = "" ;//temporary  insert operator 
let isCalledExp = false;//if insert operator isCalledExp is true
let arrOfNum = [];// array for numbers
let arrOfString = [];// array for operators 
let result1Exp = 0;// total: temporary

let openedBracket = [];//array of opened brackets
let closedBracket = [];//array of closed brackets
let countOfOpenedBrackets = 0; 
let countOfClosedBrackets = 0; 

function insert(elem) {


	let exp = document.form.textview.value;
	if ( countOfOpenedBrackets > 0 && typeof elem === "string" && elem !== "()" &&  elem !== "."  && ( exp.charAt(exp.length-1) === "." || exp.charAt(exp.length-1) === "(" ) )  {
		return;
	}

	if ( exp.charAt(exp.length-1) === ")" && typeof elem === "number" ) {
		return;
	}
	if ( elem === "." && exp.charAt(exp.length-1) === ")" ) {// after close bracket dont use dot 
		return;
	}
	if (elem === "." && ( parseFloat(num) - Math.floor(parseFloat(num)) > 0 ) ) {//two dots not allowed
		return;
	}

	if (!num && isEmpty(arrOfNum) && elem === 0 ) { elem === "";return; }

	checkInputSize();
	if (!num && !str && ( typeof elem === "string" ) && (elem !== '()') ) {
		num = ""+result1Exp;
		isCalledExp = true;
	}

	if (!num && !str && ( typeof elem === "string" ) && (elem === '()') ) {
		document.form.textview.value = document.form.textview.value + '(' ;
		openedBracket.push(countOfOpenedBrackets);
		countOfOpenedBrackets++;
	}

	//2 operators cannot include,replace first inputed operator to last
	if( isCalledExp === true  ) {  
		if ( typeof elem === "string" && elem !== '.' && elem !== "()" ) {
			
			if ( exp.charAt(exp.length-1) !== "(" && exp.charAt(exp.length-1) !== ")" ) {
				document.form.textview.value = exp.slice(0,exp.length-1);
			}			
		}
		else if ( typeof elem === "number" ) {
			isCalledExp = false;
		}
	}
	//print expression in input 
	if ( elem !== '()') {
		document.form.textview.value = document.form.textview.value + elem;
	}
	
	if ( elem === '()' ) {
		creatBracket();
	}else if (elem  === "." ) {
		creatNumber(elem);
	}
	else if ( typeof elem === "number" ) {
		creatNumber(elem);
	}
	else if ( typeof elem === "string" ) {
		creatExp(elem);
	}
}

function clearAll() {
	document.form.textview.value = "";
	result1Exp = 0;
	document.form.text1.value = 0;
	document.getElementById("text1").style.fontSize = "25px";
	init();
}

function creatNumber(number) {
	num = num + number;
	if(str) {
		arrOfString.push(str);
		str = "";
	}
}

function creatExp(string) {
	str = string; 
 	isCalledExp = true;
	 if (num) {
	 	arrOfNum.push(parseFloat(num));
		num = "";
	}
}

function equal () {

	arrOfNum.push(parseFloat(num)); 	
	

	let start = 0;
	let end = arrOfString.length;
	let indexofclosed = 0;
	let begin = 0; 
	let finish = 0;
	let arrtmp = [];
	if ( countOfOpenedBrackets !== countOfClosedBrackets ) {
		return;
	}
	while( openedBracket.length !== 0  ) {
		start = Math.max(...openedBracket);
		end = Math.min(...closedBracket);
		for(let i = 0; i < closedBracket.length; i++ ) {
			if ( end < start  ) {
				end = closedBracket[i+1];
			}
			else {
				indexofclosed = i;
				break;
			}
		}
		arrtmp = document.form.textview.value.slice(0,start);

		begin = start - countOfOpenedBrackets - indexofclosed - Math.floor( (arrtmp.length - countOfOpenedBrackets - indexofclosed) /2);
		finish = begin + Math.floor( (end - start)/2)-1; 
		doCalc(begin,finish);
		for (let i = indexofclosed; i < closedBracket.length; i++ ) {
			closedBracket[i] = closedBracket[i] - (end-start);
		}
		openedBracket.pop();countOfOpenedBrackets--;
		closedBracket.splice(indexofclosed,1);countOfClosedBrackets--;

	}

	start = 0;
	end = arrOfString.length;
	doCalc(start,end);
 	
 	
 	if (arrOfNum[0] || (arrOfNum[0] === 0)) {
 		document.form.text1.value = arrOfNum[0];
 		result1Exp = arrOfNum[0];
	}
 	init();
}

function init() {
	num = "" ;
	str = "" ;
	isCalledExp = false;
	arrOfNum = [];
	arrOfString = [];
	document.form.textview.value = "" ;
	document.getElementById("textview").style.fontSize = "45px";
}

function doCalcFirst(i) {

	switch (arrOfString[i]) {
 		case "*":
	 		arrOfNum[i] = arrOfNum[i] * arrOfNum[i+1];
	 		arrOfNum.splice(i+1,1);
	 		arrOfString.splice(i,1);
	 		break;
 		case "/":
	 		arrOfNum[i] = arrOfNum[i] / arrOfNum[i+1];
	 		arrOfNum.splice(i+1,1);
	 		arrOfString.splice(i,1);
	 		break;
 		case "%":
 			arrOfNum[i] = arrOfNum[i] % arrOfNum[i+1];
 			arrOfNum.splice(i+1,1);
 			arrOfString.splice(i,1);
 			break;
 	}
}

function doCalcSecond(i) {
	switch (arrOfString[i]) {
 		case "+":
 			arrOfNum[i] = arrOfNum[i] + arrOfNum[i+1];
 			arrOfNum.splice(i+1,1);
 			arrOfString.splice(i,1);
 			break;
 		case "-":
 			arrOfNum[i] = arrOfNum[i] - arrOfNum[i+1];
 			arrOfNum.splice(i+1,1);
 			arrOfString.splice(i,1);
 			break;
 	}
}

function checkInputSize () {
	let size = document.getElementById("textview");
	if ( document.form.textview.value.length > 11 && document.form.textview.value.length < 18 ) {
		size.style.fontSize = "30px"; 
	}
	if ( document.form.textview.value.length >= 18 && document.form.textview.value.length < 24 ) {
		size.style.fontSize = "22px";
	}
	if (document.form.textview.value.length >= 24) {
		size.style.fontSize = "17px";
	}
}
function isEmpty(array) {
	if (array.length===0) {
		return true;
	}
	else {
		return false;
	}
}

document.getElementById("drag").addEventListener("mouseover", mouseOver);
document.getElementById("drag").addEventListener("mouseout", mouseOut);


function mouseOver() {
    document.getElementById("drag").style.background = "#b3dcf5";
    document.getElementById("drag").style.cursor = "-webkit-grab";
    document.getElementById("drag").addEventListener("mousedown",myMousedown);
}

function mouseOut() {
    document.getElementById("drag").style.background = "#bbbbbbab";
}

function myMousedown(event) { 
    event.target.style.cursor = "-webkit-grabbing";
    document.getElementById("drag").addEventListener("mouseup",myMouseup);
}

function myMouseup(event) {
   	event.target.style.cursor = "-webkit-grab";
}

document.getElementById("drag").removeEventListener("mousedown",myMousedown);
document.getElementById("drag").removeEventListener("mouseup",myMouseup);

dragElement(document.getElementById("main"));

function dragElement(elmnt) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function creatBracket() {

	if ( str ) {
		document.form.textview.value = document.form.textview.value + '(';
		openedBracket.push(arrOfNum.length + arrOfString.length + 1 + countOfOpenedBrackets + countOfClosedBrackets);
		countOfOpenedBrackets++;
	}
	else if ( num ) { 
		if ( countOfOpenedBrackets > countOfClosedBrackets  ) {
			document.form.textview.value = document.form.textview.value + ')';
			closedBracket.push(arrOfNum.length + arrOfString.length + 1 + countOfClosedBrackets + countOfOpenedBrackets);
			countOfClosedBrackets++;
		}
	}
	
}


function doCalc(start,end) {
	for(let i = start; i < end; i++) {
 		if ( arrOfString[i] === "*" || arrOfString[i] === "/" || arrOfString[i] === "%") {
 			doCalcFirst(i);
 			i--;
 			end--;
 		}
 	}
 	for ( let i = start; i < end; i++ ) {
 		if ( arrOfString[i] === "+" || arrOfString[i] === "-" ) {
 			doCalcSecond(i);
 			i--;
 			end--;
 		}
 	}
 	
}