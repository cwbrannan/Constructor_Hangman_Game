//This file is used in the app.js code, and the file calls in the choice.js file.
//This code evaluates the letter choice made by the user to determine if the letter
//appears in the "string" that represents the word.
//If a match is found, the letter is placed in its correct position in the displayed word.  

var Choices = require('./choices.js');

var Word = function(wrd){
  this.word = wrd;
  this.lets = [];
  this.found = false;
  this.getLets = function(){
    for(var i = 0; i < this.word.length; i++){
      this.lets.push(new Choices(this.word[i]));
    }
  }; 
  this.wasLetterFound = function(guessLetter){
    var whatToReturn = 0;
    for(var i = 0; i < this.lets.length; i++){
      if(this.lets[i].charac === guessLetter){
        this.lets[i].appear = true;
        whatToReturn += 1;
      }
    } 
    return whatToReturn;
  }; 
  this.wasWordFound = function(){
    if (this.lets.every(function(curLet){
      return curLet.appear === true;
      }) === true){
      return true;
    }
  };
  this.wordRender = function(){
    var str = "";
    for(var i = 0; i < this.lets.length; i++){
      str += this.lets[i].letterRender(this.lets[i]);
    }
    return str;
  };
}; 

module.exports = Word;