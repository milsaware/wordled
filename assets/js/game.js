let currentRow = 0;
let nextRowBlock = 0;
let score = 0;
let remNotification = 0;
let gameFin = 0;
let gameOn = 0;
let level = 'beginner';
let difficulty = 'easy';
let mustUse = '';
let bestStreak = 0;
let currentStreak = 0;
let userScore = 0;
let scoreEasyBeginner = 0;
let scoreEasyIntermediate = 0;
let scoreEasyAdvanced = 0;
let scoreEasyGod = 0;
let scoreDifficultBeginner = 0;
let scoreDifficultIntermediate = 0;
let scoreDifficultAdvanced = 0;
let scoreDifficultGod = 0;
let streakEasyBeginner = 0;
let streakEasyIntermediate = 0;
let streakEasyAdvanced = 0;
let streakEasyGod = 0;
let streakDifficultBeginner = 0;
let streakDifficultIntermediate = 0;
let streakDifficultAdvanced = 0;
let streakDifficultGod = 0;
let scoreType = 'score';
let scoreDiff = 'easy';

const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

let container = document.createElement('div');
container.id = 'container';
document.body.append(container);

startMenu();

function showScores(modal, type, diff){
	let msBlock = document.createElement('div');
	msBlock.id = 'msBlock';
	modal.append(msBlock);
	for(i = 0; i < 4; i++){
		let modalScoreBlock = document.createElement('div');
		modalScoreBlock.className = 'msBlock';
			let msHeadContent = (i == 0)? 'BEGINNER' : ((i == 1)? 'INTERMEDIATE' : ((i == 2)? 'ADVANCED' : 'GOD MODE'));
			let modalScoreHead = document.createElement('span');
			modalScoreHead.className = 'msHead';
			modalScoreHead.innerText = msHeadContent;
			modalScoreBlock.append(modalScoreHead);
	
			let msBodyContent = localStorage.getItem(type + diff + msHeadContent.toLowerCase().replace(/ /g, ""));
			let modalScoreBody = document.createElement('span');
			modalScoreBody.className = 'msBody';
			modalScoreBody.innerText = (msBodyContent == null)? 0 : msBodyContent;
			modalScoreBlock.append(modalScoreBody);
		msBlock.append(modalScoreBlock);
	}
}

function showHelp(modal, type){
	let exampleWords = ['SUNNY', 'WORLD', 'TITAN'];
	let mhBlock = document.createElement('div');
	mhBlock.id = 'mhBlock';
	mhbHead = document.createElement('div');
	mhbHead.className = 'mhbHead';
	mhbHead.innerText = (type == 'game')? 'You have 6 tries to guess the word.\n\nOnly valid words are allowed. Hit enter to submit your guess.\n\nWith each guess, the colour of the tiles will change to show you how close your guess is to the word.' : 'There are 4 different levels ranging between beginner and God mode. The higher the level, the more words will be in play and the harder it will be to guess.\n\nYou can change the level either in the main menu or in play by clicking on the currently stated level.';
	mhBlock.append(mhbHead);

	let mhbBody = document.createElement('div');
	mhbBody.className = 'mhbBody';

	if(type == 'game'){
		for(i = 0; i < exampleWords.length; i++){
			let rand = Math.floor(Math.random() * 5);
			let tileClass = (i == 0)? 'blockGreen' : ((i == 1)? 'blockGold' : 'blockGrey');
			let exNotification = '';
			let exampleRow = document.createElement('div');
			exampleRow.className = 'exampleRow';
			for(j = 0; j < exampleWords[i].length; j++){
				let exampleTile = document.createElement('span');
				exampleTile.className = (j == rand)? 'exampleTile ' + tileClass : 'exampleTile';
				exampleTile.innerText = exampleWords[i][j];
				exampleRow.append(exampleTile);
				exNotification += (j == rand)? '<strong>' + exampleWords[i][j] + '</strong>' : '';
			}
			exNotification += (i == 0)? ' is in the word and in the correct place' : ((i == 1)? ' is in the word but in the wrong place' : ' is not in the word');
			let exNotRow = document.createElement('div');
			exNotRow.innerHTML = exNotification;
			exampleRow.append(exNotRow);
			mhbBody.append(exampleRow);
		}
	}else{
		mhbBody.className = 'mhbHead';
		mhbBody.innerText = '\nIn addition to the levels, there are 2 difficulty modes - easy and difficult. You can use any valid words within your guesses in easy mode.\n\nIn difficult mode, you must reuse any letters that you have previously chosen and are found to be within the word.\n\nYou can quit the game at any time by clicking on the give up button, which will deduct 15 points from your score and show you the current word.';
	}
	mhBlock.append(mhbBody);
	modal.append(mhBlock);
}

function openModal(type, notification){
	let modal = document.createElement('div');
	modal.id = 'modal';
	if(type == 'levelSelect'){
		for(i = 0; i < 5; i++){
			let modalBtn = document.createElement('button');
			modalBtn.className = 'modalBtn';
			modalBtn.innerText = (i == 0)? 'Beginner' : ((i == 1)? 'Intermediate' : ((i == 2)? 'Advanced' : ((i == 3)? 'God Mode' : 'Custom')));
			modalBtn.addEventListener('click', levelSelect);
			modal.append(modalBtn);
		}
	}
	else if(type == 'difficultySelect'){
		for(i = 0; i < 2; i++){
			let modalBtn = document.createElement('button');
			modalBtn.className = 'modalBtnL';
			modalBtn.innerText = (i == 0)? 'Easy' : 'Difficult';
			modalBtn.addEventListener('click', difficultySelect);
			modal.append(modalBtn);
			setTimeout(function(){
				modal.style.cssText = 'opacity: 1';
			}, 1);
		}
	}
	else if(type == 'endScore'){
		let message = document.createElement('span');
		message.className = 'modalMessage';
		message.innerHTML = notification;
		modal.append(message);

		for(i = 0; i < 4; i++){
			let modalScoreBlock = document.createElement('div');
			modalScoreBlock.className = 'msBlock';
				let msHeadContent = (i == 0)? 'SCORE' : ((i == 1)? 'TOP SCORE' : ((i == 2)? 'STREAK' : 'BEST STREAK'));
				let modalScoreHead = document.createElement('span');
				modalScoreHead.className = 'msHead';
				modalScoreHead.innerText = msHeadContent;
				modalScoreBlock.append(modalScoreHead);
				
				let msBodyContent = (i == 0)? userScore : ((i == 1)? localStorage.getItem('score' + difficulty + level) : ((i == 2)? currentStreak : localStorage.getItem('streak' + difficulty + level)));
				let modalScoreBody = document.createElement('span');
				modalScoreBody.className = 'msBody';
				modalScoreBody.innerText = (msBodyContent == null)? 0 : msBodyContent;
				modalScoreBlock.append(modalScoreBody);
			modal.append(modalScoreBlock);
		}
		setTimeout(function(){
			document.addEventListener('click', restartClick);
			document.addEventListener('keyup', restart);
		}, 100);
	}
	else if(type == 'highScores'){
		for(i = 0; i < 2; i++){
			let scoreType = document.createElement('div');
			scoreType.className = 'scoreType';
			scoreType.innerText = (i == 0)? 'SCORE' : 'STREAK';
			modal.append(scoreType);
		}

		for(i = 0; i < 4; i++){
			let scoreBtn = document.createElement('button');
			scoreBtn.className = (i == 0)? 'scoreBtnActive' : 'scoreBtn';
			scoreBtn.innerText = (i == 0 || i == 2)? 'EASY' : 'DIFFICULT';
			scoreBtn.j = i;
			scoreBtn.modal = modal;
			scoreBtn.addEventListener('click', changeScore);
			modal.append(scoreBtn);
		}
		showScores(modal, 'score', 'easy');
	}
	else if(type == 'help'){
		for(i = 0; i < 2; i++){
			let helpBtn = document.createElement('button');
			helpBtn.className = (i == 0)? 'helpBtnActive' : 'helpBtn';
			helpBtn.innerText = (i == 0 || i == 2)? 'GAME' : 'OPTIONS';
			helpBtn.j = i;
			helpBtn.modal = modal;
			helpBtn.addEventListener('click', changeHelpView);
			modal.append(helpBtn);
		}
		showHelp(modal, 'game');
	}

	container.prepend(modal);
	setTimeout(function(){
		modal.style.cssText = 'opacity: 1';
	}, 1);

	let shadowBack = document.createElement('div');
	shadowBack.id = 'shadowBack';
	container.prepend(shadowBack);
	setTimeout(function(){
		shadowBack.style.cssText = 'opacity: .35';
	}, 1);

	let modalClose = document.createElement('button');
	modalClose.id = 'modalClose';
	modalClose.innerText = 'close';
	modalClose.modal = modal;
	modalClose.shadowBack = shadowBack;
	modalClose.addEventListener('click', closeModal);
	modal.prepend(modalClose);
}

function addLogo(){
	let logo = document.createElement('div');
	logo.className = 'logo';

	let domName = 'WORDLED';
	for(i = 0; i < domName.length; i++){
		let spanClass = (i == 0 || i % 2 == 0)? 'logo_green' : 'logo_gold';
		let logoSpan = document.createElement('span');
		logoSpan.className = spanClass;
		logoSpan.innerText = domName[i];
		logo.append(logoSpan);
	}

	container.append(logo);
}

function changeHelpView(){
	let j = event.currentTarget.j;
	let modal = event.currentTarget.modal;
	document.getElementsByClassName('helpBtnActive')[0].className = 'helpBtn';
	this.className = 'helpBtnActive';
	if(j == 0){
		document.getElementById('mhBlock').remove();
		showHelp(modal, 'game');
	}else{
		document.getElementById('mhBlock').remove();
		showHelp(modal, 'options');
	}
}

function setGlobal(){
	for(i = 1; i < 16; i++){
		let lsItem = (i == 1)? 'scoreeasybeginner' : ((i == 2)? 'scoreeasyintermediate' : ((i == 3)? 'scoreeasyadvanced' : ((i == 4)? 'scoreeasygodmode' : ((i == 5)? 'scoredifficultbeginner' : ((i == 6)? 'scoredifficultintermediate' : ((i == 7)? 'scoredifficultadvanced' : ((i == 8)? 'scoredifficultgodmode' : ((i == 9)? 'streakeasybeginner' : ((i == 10)? 'streakeasyintermediate' : ((i == 11)? 'streakeasyadvanced' : ((i == 12)? 'streakeasygodmode' : ((i == 13)? 'streakdifficultbeginner' : ((i == 14)? 'streakdifficultintermediate' : ((i == 15)? 'streakdifficultadvanced' : 'streakdifficultgodmode'))))))))))))));
		if (localStorage.getItem(lsItem) === null) {
			localStorage.setItem(lsItem, 0);
		}
	}
	streakEasyBeginner = localStorage.getItem('streakeasybeginner');
	streakEasyIntermediate = localStorage.getItem('streakeasyintermediate');
	streakEasyAdvanced = localStorage.getItem('streakeasyadvanced');
	streakEasyGod = localStorage.getItem('streakeasygodmode');
	streakDifficultBeginner = localStorage.getItem('streakdifficultbeginner');
	streakDifficultIntermediate = localStorage.getItem('streakdifficultintermediate');
	streakDifficultAdvanced = localStorage.getItem('streakdifficultadvanced');
	streakDifficultGod = localStorage.getItem('streakdifficultgodmode');
	scoreEasyBeginner = localStorage.getItem('scoreeasybeginner');
	scoreEasyIntermediate = localStorage.getItem('scoreeasyintermediate');
	scoreEasyAdvanced = localStorage.getItem('scoreeasyadvanced');
	scoreEasyGod = localStorage.getItem('scoreeasygodmode');
	scoreDifficultBeginner = localStorage.getItem('scoredifficultbeginner');
	scoreDifficultIntermediate = localStorage.getItem('scoredifficultintermediate');
	scoreDifficultAdvanced = localStorage.getItem('scoredifficultadvanced');
	scoreDifficultGod = localStorage.getItem('scoredifficultgodmode');
	gameFin = 0;
	currentRow = 0;
	nextRowBlock = 0;
	score = 0;
	remNotification = 0;
	mustUse = '';
}

function startMenu(){
	setGlobal();
	container.innerHTML = '';
	addLogo();
	let menu = document.createElement('div');
	menu.id = 'menu';
	for(i = 0; i < 5; i++){
		let j = i;
		let menuBtn = document.createElement('button');
		menuBtn.className = 'menuBtn';
		menuBtn.innerText = (i == 0)? level : ((i == 1)? difficulty : ((i == 2)? 'high scores' : ((i == 3)? 'help' : 'start game')));
		menuBtn.j = i;

		menuBtn.addEventListener("click", menuClick);
		menu.append(menuBtn);
	}
	container.append(menu);
}

function gameOver(){
	gameFin = 1;
	document.removeEventListener('keyup', deleteClick, false);
	document.removeEventListener('keyup', keyPress, false);
	document.removeEventListener('keyup', restart, false);
	document.removeEventListener('click', menuClick, false);
	document.removeEventListener('click', enterClick, false);
	document.removeEventListener('click', levelModal, false);
	document.removeEventListener('click', difficultyModal, false);
	document.removeEventListener('click', closeModal, false);
}

function gameStart(){
	setGlobal();
	container.innerHTML = '';
	let wordType = (level == 'beginner')? beginner : ((level == 'intermediate')? intermediate : ((level == 'advanced')? advanced : ((level == 'godmode')? fullList : custom)));
	let rand = Math.floor(Math.random() * wordType.length);
	chosenWord = wordType[rand].toUpperCase();

	addLogo();

	let navBar = document.createElement('div');
	navBar.className = 'nav_bar';
		let difficultySelect = document.createElement('button');
		difficultySelect.id = 'difficultySelectBtn';
		difficultySelect.className = 'btn';
		difficultySelect.innerText = difficulty;
		difficultySelect.addEventListener('click', difficultyModal);
		navBar.append(difficultySelect);

		let giveUpBtn = document.createElement('button');
		giveUpBtn.id = 'giveUpBtn';
		giveUpBtn.className = 'btn';
		giveUpBtn.innerText = 'give up';
		giveUpBtn.addEventListener('click', quitQlick);
		navBar.append(giveUpBtn);

		let levelSelect = document.createElement('button');
		levelSelect.id = 'levelSelectBtn';
		levelSelect.className = 'btn';
		levelSelect.innerText = level;
		levelSelect.addEventListener('click', levelModal = function(event){
			openModal('levelSelect');
		})
		navBar.append(levelSelect);
	container.append(navBar);

	let gameArea = document.createElement('div');
	gameArea.className = 'game_area';
	for(i = 0; i < 6; i++){
		let row = document.createElement('div');
		row.className = 'row';
		for(j = 0; j < 5; j++){
			let rowBlock = document.createElement('div');
			rowBlock.className = 'row_block';
			row.append(rowBlock);
		}
		gameArea.append(row);
	}
	container.append(gameArea);

	let notification = document.createElement('div');
	notification.id = 'notification';
	notification.innerText = 'Start guessing!'
	container.append(notification);

	let keyLayoutTop = 'QWERTYUIOP';
	let keyLayoutMid = 'ASDFGHJKL';
	let keyLayoutBot = 'ZXCVBNM';

	let keyboard = document.createElement('div');
	keyboard.id = 'keyboard';

		let topKeys = document.createElement('div');
		topKeys.id = 'topKeys';
		addKeys(topKeys, keyLayoutTop, 'keyboardKey_s');
		keyboard.append(topKeys);

		let midKeys = document.createElement('div');
		midKeys.id = 'midKeys';
		addKeys(midKeys, keyLayoutMid, 'keyboardKey_m');
		keyboard.append(midKeys);

		let botKeys = document.createElement('div');
		botKeys.id = 'botKeys';

		let deleteKey = document.createElement('span');
		deleteKey.className = 'keyboardKey_l';
		deleteKey.innerHTML = '&#x2190;';
		deleteKey.addEventListener("click", deleteClick);
		botKeys.append(deleteKey);
		addKeys(botKeys, keyLayoutBot, 'keyboardKey_s');

		let enterKey = document.createElement('span');
		enterKey.className = 'keyboardKey_l';
		enterKey.innerText = 'Enter';
		enterKey.addEventListener("click", enterClick);
		botKeys.append(enterKey);
		keyboard.append(botKeys);

	container.append(keyboard);

	document.addEventListener('keyup', keyPress);
}

function difficultyModal(){
	openModal('difficultySelect');
}

function keyPress(event) {
	if(gameFin == 0){
		let alphabet = 'abcdefghijklmnopqrstuvwxyz';
		let wordRow = document.getElementsByClassName('row')[currentRow];
		let rowBlockEl = wordRow.childNodes;
		for(i = 0; i < alphabet.length; i++){
			if ((event.key === alphabet[i] || event.key === alphabet[i].toUpperCase())) {
				addLetter(rowBlockEl, alphabet[i]);
			}
		}
		if(event.key === 'Enter') {
			submitWord(wordRow, keyPress);
		}
		if(event.key === 'Backspace') {
			deleteLetter(rowBlockEl);
		}
	}
}

function quitQlick(){
	if(gameFin == 0){
		let url = '<a href="https://duckduckgo.com/?q=%22'+ chosenWord +'%22+%22definition%22&ia=definition" target="_blank">' + chosenWord + '</a>';
		notification = 'The word was ' + url + '. Click to play again';
		currentStreak = 0;
		userScore = userScore - 15;
		gameOver();

		setTimeout(function(){
			openModal('endScore', notification);
		}, 250);
	}
}

function enterClick(){
	if(gameFin == 0){
		let wordRow = document.getElementsByClassName('row')[currentRow];
		let rowBlockEl = wordRow.childNodes;
		submitWord(wordRow);
	}
}

function menuClick(event) {
	let j = event.currentTarget.j;
	let modalType = (j == 0)? 'levelSelect' : ((j == 1)? 'difficultySelect' : ((j == 2)? 'highScores' : 'help'));
	if(j < 4){
		openModal(modalType);
	}else{
		gameOn = 1;
		gameStart();
	}
}

function restart(event) {
	if (event.key === 'Enter') {
		document.removeEventListener('keyup', restart, false);
		document.removeEventListener('click', restartClick, false);
		gameStart();
	}
}

function restartClick(){
	document.removeEventListener('keyup', restart, false);
	document.removeEventListener('click', restartClick, false);
	gameStart();
}

function difficultySelect(){
	difficulty = this.innerText.toLowerCase();
	if(gameOn == 1){
		userScore = 0;
		currentStreak = 0;
		gameOver();
		document.removeEventListener('keyup', restart, false);
		gameStart();
	}else{
		startMenu();
	}
}

function changeScore(){
	let j = event.currentTarget.j;
	let modal = event.currentTarget.modal;
	document.getElementsByClassName('scoreBtnActive')[0].className = 'scoreBtn';
	this.className = 'scoreBtnActive';
	if(j == 0 || j == 1){
		document.getElementById('msBlock').remove();
		showScores(modal, 'score', this.innerText.toLowerCase());
	}else{
		document.getElementById('msBlock').remove();
		showScores(modal, 'streak', this.innerText.toLowerCase());
	}
}

function closeModal(){
	let modal = event.currentTarget.modal;
	let shadowBack = event.currentTarget.shadowBack;
	modal.style.cssText = 'opacity:0';
	shadowBack.style.cssText = 'opacity:0';
	setTimeout(function(){
		modal.remove();
		shadowBack.remove();
	}, 355);
}

function deleteClick(){
	if(gameFin == 0){
		let wordRow = document.getElementsByClassName('row')[currentRow];
		let rowBlockEl = wordRow.childNodes;
		deleteLetter(rowBlockEl);
	}
}

function levelSelect(){
	level = this.innerText.toLowerCase().replace(/ /g, "");
	if(gameOn == 1){
		userScore = 0;
		currentStreak = 0;
		gameOver();
		document.removeEventListener('keyup', restart, false);
		gameStart();
	}else{
		startMenu();
	}
}

function keyboardPress(){
	if(gameFin == 0){
		let layout = event.currentTarget.layout;
		let wordRow = document.getElementsByClassName('row')[currentRow];
		let rowBlockEl = wordRow.childNodes;
		addLetter(rowBlockEl, layout);
	}
}

function deleteLetter(rowBlockEl){
	if(nextRowBlock > 0){
		nextRowBlock--;
		rowBlockEl[nextRowBlock].innerText = '';
	}
}

function count(str, find) {
    return (str.split(find)).length - 1;
}

function checkAnswer(wordRow, answer){
	let answerArray = [];

	for(i = 0; i < answer.length; i++){
		let letter = answer[i].toUpperCase();
		answerArray.push(letter);
		let blockClass = 'blockGrey';
		if(chosenWord.toUpperCase().includes(letter)){
			if(chosenWord[i].toUpperCase() === letter){
				score++;
				blockClass = ' blockGreen';
				if(count(answer, letter) > count(chosenWord, letter)){
					for(j = 0; j < wordRow.childNodes.length; j++){
						if(wordRow.childNodes[j].innerText == letter && wordRow.childNodes[j].className == 'row_block  blockGold'){
							wordRow.childNodes[j].className = 'row_block  blockGrey';
							let index = answerArray.indexOf(letter);
							if (index !== -1) {
								answerArray.splice(index, 1);
							}
						}
					}
				}
			}else{
				if(countOccurrences(answerArray, letter) <= count(chosenWord, letter)){
					blockClass = ' blockGold';
				}
				else{
					blockClass = ' blockGrey';
				}
			}
		}
		wordRow.childNodes[i].className = 'row_block ' + blockClass;
		let keyboard = document.getElementById('keyboard_' + letter);
		if(chosenWord.toUpperCase().includes(letter)){
			keyboard.className += ' blockGreen';
			if(count(answer, letter) > count(mustUse, letter) && count(mustUse, letter) <= count(chosenWord, letter)){
				mustUse += letter;
			}
		}
		else{
			keyboard.className += ' blockGrey';
		}
	}

	if(score === 5){
		let scoreLevel = (level == 'beginner')? 1 : ((level == 'intermediate')? 2 : ((level == 'advanced')? 3 : 4));
		userScore = userScore + ((scoreLevel * 10) - ((scoreLevel + 1) * currentRow));

		if(userScore > localStorage.getItem('score' + difficulty + level)){
			localStorage.setItem('score' + difficulty + level, userScore);
		}

		currentStreak++;
		if(currentStreak > localStorage.getItem('streak' + difficulty + level)){
			localStorage.setItem('streak' + difficulty + level, currentStreak);
		}

		let notification = 'Well done, you won! Click to play again';
		gameOver();

		setTimeout(function(){
			openModal('endScore', notification);
		}, 250);
	}
	else if(currentRow == 5){
		let url = '<a href="https://duckduckgo.com/?q=%22'+ chosenWord +'%22+%22definition%22&ia=definition" target="_blank">' + chosenWord + '</a>';
		let notification = 'You lost. The word was ' + url + '. Click to play again';
		userScore = userScore - 10;
		currentStreak = 0;
		gameOver();

		setTimeout(function(){
			openModal('endScore', notification);
		}, 250);
	}
	else{
		score = 0;
		nextRowBlock = 0;
		currentRow++;
	}
}

function submitWord(wordRow){
	if(nextRowBlock > 0 && nextRowBlock % 5 == 0){
		let answer = wordRow.innerText.replace(/[\n\r]/g, '');
		if(fullList.includes(answer)){
			if(difficulty == 'difficult'){
				for(i = 0; i < mustUse.length; i++){
					if(!answer.includes(mustUse[i])){
						remNotification = 0;
						document.getElementById('notification').innerText = 'You must use found characters';
						return;
					}
				}
			}
			checkAnswer(wordRow, answer);		
		}else{
			remNotification = 0;
			document.getElementById('notification').innerText = 'Word not in list';
		}
	}else{
		remNotification = 0;
		document.getElementById('notification').innerText = 'You must enter 5 characters';
	}
}

function addKeys(el, layout, keyClass){
	for(i = 0; i < layout.length; i++){
		let key = document.createElement('span');
		key.className = keyClass;
		key.id = 'keyboard_' + layout[i];
		key.innerText = layout[i];
		key.layout = layout[i];
		key.addEventListener("click", keyboardPress);
		el.append(key);
	}
}

function addLetter(rowBlockEl, letter){
	if(remNotification == 0){
		remNotification = 1;
		document.getElementById('notification').innerText = '';
	}
	if(nextRowBlock < 5){
		rowBlockEl[nextRowBlock].innerText = letter.toUpperCase();
		nextRowBlock++;
	}
}
