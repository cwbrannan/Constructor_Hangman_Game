//This hangman game is run, using the prompt npm package, from the node.js prompt.
//Three files are used in this application. The word.js file, called in here, compares the letter guesses
//to the letters in the words in the wordlist array. The choices.js file is required by the word.js file.

  var prompt = require("prompt");
  prompt.start();
  var Word = require("./word.js");
  
//Here begins the setup for the game, with an array of words, an initial number of guesses, and a randomized
//"pull" of a word to guess (as JSON objects).
  
  var game = {
    wordList : ["thor", "hulk", "captain", "panther", "thanos", "stark", "widow", "vision", "spider", "ant"],
    remainingGuesses : 10,
    currentWord : null,
    startGame : function(wrd){
      var word = new Word(this.wordList[Math.floor(Math.random()*this.wordList.length)]);
      this.currentWord = word;
      this.currentWord.getLets();
      this.userPrompt();
      },
  
//On the command line, this prompts the user for a letter guess, and provides feedback as to whether
//the guess was correct or incorrect. It counts down the guesses remaining, and if the game is won
//it announces that the player won the game. If the game is not won, after all guesses are exhausted,
//a message is displayed that the game has ended.
  
    userPrompt : function(){
      var player = this;
      prompt.get(["guessLetter"], function(err, result){
        console.log("Your guess is: " + result.guessLetter);
        var trackGuesses = player.currentWord.wasLetterFound(result.guessLetter);
        if (trackGuesses === 0){
          console.log("You guessed incorrectly!");
          player.remainingGuesses -= 1;
        }else{
          console.log("You guessed correctly");
          if (player.currentWord.wasWordFound() === true){
            console.log("Congratulations - you Won!!");
            return 1;
          }else{
            console.log("You have " + player.remainingGuesses + " of your 10 guesses left.");
            console.log(player.currentWord.wordRender());
          }
        }
        if (player.remainingGuesses > 0 && player.currentWord.found === false){
          player.userPrompt();
        }
        else if(player.remainingGuesses === 0){
          console.log("The game has ended!");
          console.log("The word is " + player.currentWord.word + ".");
        }else{
          console.log(player.currentWord.wordRender());
        }
      });
    }
  };
  
  game.startGame();