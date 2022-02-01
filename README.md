# wordled
A Wordle based game made in Javascript.

Unlike the original, Wordled produces a random 5 letter word with each play.

Files containing words that can be correct answers are in the directory
[assets/js](assets/js). The default is [youngsters.js](assets/js/youngsters.js)
which is a list of 100 words suitable for younger users with a more limited
vocabulary. 

To create your own list, add a new file in assets/js using the same format as
youngsters.js and use its name in index.html instead of youngsters.js.

If you change youngsters.js in index.html to allwords.js it will pick any of
over 12,000 words in assets/js/words.js. This will make winning very difficult.

**No installation required**

Wordled can be played in your browser. Simply open the index.html file in
any browser to play.

![Wordled demonstration](https://res.cloudinary.com/practicaldev/image/fetch/s--237ONCoC--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/uo600vi9hsj8o52a80pl.png)
