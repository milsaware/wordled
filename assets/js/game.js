/*
This is the Javascript code which runs Wordled in your browser.
The detailed explanation of how it was built is available at:
https://ozboware.co.uk/one-way-to-make-a-wordle-type-game-using-javascript
*/

// formatted with: prettier-eslint --tab-width 4 --print-width 95 --write game.js

let currentRow = 0;
let nextRowBlock = 0;
let score = 0;
let remNotification = 0;
let gameFin = 0;
let keyPress;
let restart;
let restart2;
let enterClick;
let deleteClick;
let objArray = [];
const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

let container = document.createElement('div');
container.id = 'container';
document.body.append(container);

gameStart();

function gameOver() {
    gameFin = 1;
    document.removeEventListener('keyup', deleteClick, false);
    document.removeEventListener('keyup', enterClick, false);
    document.removeEventListener('keyup', keyPress, false);
    document.removeEventListener('keyup', restart, false);
    document.addEventListener(
        'keyup',
        (restart = function(event) {
            if (event.key === 'Enter') {
                document.removeEventListener('keyup', restart, false);
                gameStart();
            }
        })
    );
}

function gameStart() {
    container.innerHTML = '';
    gameFin = 0;
    currentRow = 0;
    nextRowBlock = 0;
    score = 0;
    remNotification = 0;

    let logo = document.createElement('div');
    logo.className = 'logo';

    let domName = 'WORDLED';
    for (i = 0; i < domName.length; i++) {
        let spanClass = i == 0 || i % 2 == 0 ? 'logo_green' : 'logo_gold';
        let logoSpan = document.createElement('span');
        logoSpan.className = spanClass;
        logoSpan.innerText = domName[i];
        logo.append(logoSpan);
    }

    container.append(logo);

    let selectDifficulty = document.createElement('div');
    selectDifficulty.className = 'levelHeader';
    selectDifficulty.id = 'selectDifficulty';
    selectDifficulty.innerText = 'Select a difficulty level:';
    container.append(selectDifficulty);

    const difficultyLevels = [
        { value: 'level1', label: '<b>Level 1:</b> 100 words for young children' },
        { value: 'level2', label: '<b>Level 2:</b> over 1000 common words' },
        { value: 'level3', label: '<b>Level 3:</b> over 2500 words' },
        { value: 'level4', label: '<b>Level 4:</b> over 3400 words' },
        { value: 'level5', label: '<b>Level 5:</b> over 13,000 words' },
    ];
    let levelSelector = document.createElement('div');
    levelSelector.className = 'levelSelector';
    // generate the radio buttons
    levelSelector.innerHTML = difficultyLevels
        .map(
            item => `<div>
                        <input type="radio" name="difficultyLevel" value="${item.value}"
                        id="${item.value}"> <label for="${item.value}">${item.label}</label>
                    </div>`
        )
        .join(' ');
    container.append(levelSelector);
    // Set level2 as default
    document.querySelector('#level2').checked = true;
    let rand = Math.floor(Math.random() * level2.length);
    chosenWord = level2[rand].toUpperCase();
    // add an event listener for the change event
    const radioButtons = document.querySelectorAll('input[name="difficultyLevel"]');
    for (const radioButton of radioButtons) {
        radioButton.addEventListener('change', changeLevel);
    }
    function changeLevel() {
        if (this.checked) {
            notification.innerText = `You selected changeLevel ${this.value}`;
            if (this.value === 'level1') {
                let rand = Math.floor(Math.random() * level1.length);
                chosenWord = level1[rand].toUpperCase();
            }
            if (this.value === 'level2') {
                let rand = Math.floor(Math.random() * level2.length);
                chosenWord = level2[rand].toUpperCase();
            }
            if (this.value === 'level3') {
                let rand = Math.floor(Math.random() * level3.length);
                chosenWord = level3[rand].toUpperCase();
            }
            if (this.value === 'level4') {
                let rand = Math.floor(Math.random() * level4.length);
                chosenWord = level4[rand].toUpperCase();
            }
            if (this.value === 'level5') {
                let rand = Math.floor(Math.random() * wordlist.length);
                chosenWord = wordlist[rand].toUpperCase();
            }
        }
    }

    let gameArea = document.createElement('div');
    gameArea.className = 'game_area';
    for (i = 0; i < 6; i++) {
        let row = document.createElement('div');
        row.className = 'row';
        for (j = 0; j < 5; j++) {
            let rowBlock = document.createElement('div');
            rowBlock.className = 'row_block';
            row.append(rowBlock);
        }
        gameArea.append(row);
    }
    container.append(gameArea);

    let notification = document.createElement('div');
    notification.id = 'notification';
    notification.innerText = 'Start guessing!';
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
    deleteKey.addEventListener('click', function deleteClick(event) {
        if (gameFin == 0) {
            let wordRow = document.getElementsByClassName('row')[currentRow];
            let rowBlockEl = wordRow.childNodes;
            deleteLetter(rowBlockEl);
        }
    });
    botKeys.append(deleteKey);
    addKeys(botKeys, keyLayoutBot, 'keyboardKey_s');
    let enterKey = document.createElement('span');
    enterKey.className = 'keyboardKey_l';
    enterKey.innerText = 'Enter';
    enterKey.addEventListener(
        'click',
        (enterClick = function(event) {
            if (gameFin == 0) {
                let wordRow = document.getElementsByClassName('row')[currentRow];
                let rowBlockEl = wordRow.childNodes;
                submitWord(wordRow);
            }
        })
    );
    botKeys.append(enterKey);
    keyboard.append(botKeys);

    container.append(keyboard);

    let navBar = document.createElement('div');
    navBar.className = 'nav_bar';
    let giveUpBtn = document.createElement('button');
    giveUpBtn.id = 'giveUpBtn';
    giveUpBtn.innerText = 'Give up';
    giveUpBtn.addEventListener('click', function quitClick(event) {
        if (gameFin == 0) {
            notification.innerText =
                'The word was ' + chosenWord + '. Press Enter to play again';
            gameOver();
        }
    });
    navBar.append(giveUpBtn);
    container.append(navBar);

    let alphabet = 'abcdefghijklmnopqrstuvwxyz';
    document.addEventListener(
        'keyup',
        (keyPress = function(event) {
            if (gameFin == 0) {
                let wordRow = document.getElementsByClassName('row')[currentRow];
                let rowBlockEl = wordRow.childNodes;
                for (i = 0; i < alphabet.length; i++) {
                    if (event.key === alphabet[i] || event.key === alphabet[i].toUpperCase()) {
                        addLetter(rowBlockEl, alphabet[i]);
                    }
                }
                if (event.key === 'Enter') {
                    submitWord(wordRow, keyPress);
                }
                if (event.key === 'Backspace') {
                    deleteLetter(rowBlockEl);
                }
            }
        })
    );
}

function deleteLetter(rowBlockEl) {
    if (nextRowBlock > 0) {
        nextRowBlock--;
        rowBlockEl[nextRowBlock].innerText = '';
    }
}

function count(str, find) {
    return str.split(find).length - 1;
}

function submitWord(wordRow, keyPress) {
    if (nextRowBlock > 0 && nextRowBlock % 5 == 0) {
        let word = wordRow.innerText.replace(/[\n\r]/g, '');
        if (wordlist.includes(word)) {
            let answer = [];
            for (i = 0; i < word.length; i++) {
                let letter = word[i].toUpperCase();
                answer.push(letter);
                let blockClass = 'blockGrey';
                if (chosenWord.toUpperCase().includes(letter)) {
                    if (chosenWord[i].toUpperCase() === letter) {
                        score++;
                        blockClass = ' blockGreen';
                        if (count(word, letter) > count(chosenWord, letter)) {
                            for (j = 0; j < wordRow.childNodes.length; j++) {
                                if (
                                    wordRow.childNodes[j].innerText == letter &&
                                    wordRow.childNodes[j].className == 'row_block  blockGold'
                                ) {
                                    wordRow.childNodes[j].className = 'row_block  blockGrey';
                                    let index = answer.indexOf(letter);
                                    if (index !== -1) {
                                        answer.splice(index, 1);
                                    }
                                }
                            }
                        }
                    } else {
                        if (countOccurrences(answer, letter) <= count(chosenWord, letter)) {
                            blockClass = ' blockGold';
                        } else {
                            blockClass = ' blockGrey';
                        }
                    }
                }
                wordRow.childNodes[i].className = 'row_block ' + blockClass;
                let keyboard = document.getElementById('keyboard_' + letter);
                if (chosenWord.toUpperCase().includes(letter)) {
                    keyboard.className += ' blockGreen';
                } else {
                    keyboard.className += ' blockGrey';
                }
            }

            if (score === 5) {
                notification.innerText = 'Well done, you won! Enter to play again';
                gameOver();
            } else if (currentRow == 5) {
                notification.innerText =
                    'You lost. The word was ' + chosenWord + '. Press Enter to play again';
                gameOver();
            } else {
                score = 0;
                nextRowBlock = 0;
                currentRow++;
            }
        } else {
            remNotification = 0;
            notification.innerText = 'Word not in list';
        }
    } else {
        remNotification = 0;
        notification.innerText = 'You must enter 5 characters';
    }
}

function addKeys(el, layout, keyClass) {
    for (i = 0; i < layout.length; i++) {
        let j = i;
        let key = document.createElement('span');
        key.className = keyClass;
        key.id = 'keyboard_' + layout[i];
        key.innerText = layout[i];
        key.addEventListener('click', function keyboardPress(event) {
            if (gameFin == 0) {
                let wordRow = document.getElementsByClassName('row')[currentRow];
                let rowBlockEl = wordRow.childNodes;
                addLetter(rowBlockEl, layout[j]);
            }
        });
        el.append(key);
    }
}

function addLetter(rowBlockEl, letter) {
    // Disable difficultyLevel radio buttons once a letter is typed
    const unusedButtons = document.querySelectorAll('input[name="difficultyLevel"]');
    for (const unusedButton of unusedButtons) {
        unusedButton.disabled = true;
        // unusedButton.removeEventListener('change', changeLevel, false);
    }
    if (remNotification == 0) {
        remNotification = 1;
        notification.innerText = '';
    }
    if (nextRowBlock < 5) {
        rowBlockEl[nextRowBlock].innerText = letter.toUpperCase();
        nextRowBlock++;
    }
}
