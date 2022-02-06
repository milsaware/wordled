# wordled

A word game similar to [Wordle](https://www.powerlanguage.co.uk/wordle/), but
with different word lists. It chooses a new random word each time, so you can
play as often as you like, not just once per day. There is no social media
posting or score keeping, just fun and Wordle skill building.

I started with code from @ozboware, who since added a lot of features. You can
play his version online at [wordled.online](https://wordled.online).

There are five word lists of increasing difficulty in the directory
[assets/js](assets/js). The default is level2.js which contains over 1000 common
words. The simplest, [level1.js](assets/js/level1.js), is a list of 100 words
suitable for younger users with a more limited vocabulary. 

To create your own list, add a new file in assets/js using the same format as
level1.js. There are instructions in index.html.

**No installation required**

Wordled can be played in your browser. Simply open the [index.html](index.html)
file in any browser to play.

![Wordled Game Board](screenshots/gameBoard.png)
