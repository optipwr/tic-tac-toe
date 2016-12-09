// 1. Set up Board
// 2. User should be able to click a box a Mark shows up.
// --put an onclick in the first square.
// --when user clicks, call function that puts an X in the box.
// MILESTONE
// 3. Put an X on the square.
// 4. Keep track of whos turn it is.
// 5. When a square is clicked, put the symbol, and change whos turn it is.
// 6. Keep player from overwriting a square.
// 7. We need a win checker...

var whosTurn = 1;
var player1Squares = [];
var player2Squares = [];
var someoneWon = false;
var computerPlayer = false; //if true the AI player will run
var winningComboReset = [];
// Set up winners array
var winningCombos = [
	['A1', 'B1', 'C1'],	//row1
	['A2', 'B2', 'C2'], //row2
	['A3', 'B3', 'C3'], //row3
	['A1', 'A2', 'A3'], //col1
	['B1', 'B2', 'B3'], //col2
	['C1', 'C2', 'C3'], //col3
	['A1', 'B2', 'C3'], //diag1
	['A3', 'B2', 'C1'], //diag2
];

// console.log(winningCombos);

function onePlayerGame(){
	computerPlayer = true;
}

function reset(){
	if(someoneWon){
		for (var i = 0; i < 3; i++){
			document.getElementById(winningComboReset[i]).className = 'square';
		}
	}
	for (var i = 0; i < winningCombos.length; i++){
		for (var j = 0; j < winningCombos[i].length; j++){
			document.getElementById(winningCombos[i][j]).innerHTML = winningCombos[i][j];
		}
	}
	whosTurn = 1;
	player1Squares = [];
	player2Squares = [];
	someoneWon = false;		
}

function markSquare(currentSquare){
	if ((currentSquare.innerHTML == "X") || (currentSquare.innerHTML == "O")){
		// console.log("Someone is there. Stop cheating.");
		return true;
	}
	else if(someoneWon){
		console.log("Someone already won!")
	}
	else{
		if(whosTurn === 1){
			currentSquare.innerHTML = "X";
			whosTurn = 2;
			player1Squares.push(currentSquare.id);
			checkWin(1, player1Squares);
			if(computerPlayer){
				computerMove();
			}
		}
		else{
			currentSquare.innerHTML = "O";
			whosTurn = 1;
			player2Squares.push(currentSquare.id);
			checkWin(2, player2Squares);
		}
	}	
}

function computerMove(){
	// Go find a random square
	var squareFound = false;
	var squareDivs = document.getElementsByClassName('square');
	while(!squareFound){
		var randomNumber = Math.floor(Math.random() * 9);
		var randomSquare = squareDivs[randomNumber];
		var isEmpty = markSquare(randomSquare);
		console.log(isTaken);
		if(isEmpty == true){
			squareFound = true;
		}
	}
}


function checkWin(whoJustWent, currentPlayerSquares){
	//Outer Loop
	for (var i = 0; i < winningCombos.length; i++){
		var matchCount = 0;
		for (var j = 0; j < winningCombos[i].length; j++){
			var winningSquare = winningCombos[i][j];
			if(currentPlayerSquares.indexOf(winningSquare) > -1){
				//HIT! PLayer has this square somewhere.
				matchCount++;
			}
		}
		if(matchCount === 3) {
			// Player had all 3 of these j's Win
			console.log("Player " + whoJustWent + " , won!");
			gameOver(whoJustWent, winningCombos[i]);
			break;
		}
	}
}

function gameOver(whoJustWon, winningCombo){
	winningComboReset = winningCombo;
	var message = "Congrats to player " + whoJustWon + ". You just won with " + winningCombo;
	document.getElementById('message').innerHTML = message;
	for(var i = 0; i < winningCombo.length; i++){
		document.getElementById(winningCombo[i]).className += ' winning-square';
	}
	someoneWon = true;
}
