
  var hangman = {
    words: ['Abby',
              'Bert',
              'Count',
              'Elmo',
              'Ernie',
              'Oscar'],
    
    imageFile: ['abby.jpeg',
                'bert.jpeg',
                'count.jpeg',
                'elmo.jpeg',
                'ernie.jpeg',
                'oscar.jpeg'],
    img_root_dir : "./assets/images/",
    default_img: "seasame_all.jpg",
      numberOfGuesses: 0,
      guessLimit: 5,
      numberOfWins: 0,
      wordIndex: 0,
      currentGuesses: "",
      displayWord: "",
      reset: function() {
          this.numberOfGuesses = 0;
          this.getWord();
          this.currentGuesses = "";
          this.numberOfWins = 0;
          this.display ('numGuessed','Number of Guessing Remaining: ' + (this.guessLimit - this.numberOfGuesses));
          this.display ('guessed','Letter Already Guessed: ' + this.format(this.currentGuesses));
          document.getElementById('answer').innerHTML = '';
          this.display ('win','Win: 0');
          document.getElementById('characterImg').src = this.img_root_dir+ this.default_img;
      },

      getNextWord: function(){
          this.numberOfWins += 1;
          this.numberOfGuesses = 0;
          this.getWord();
          this.currentGuesses = "";
          this.display ('numGuessed','Number of Guessing Remaining: ' + (this.guessLimit - this.numberOfGuesses));
          this.display ('guessed','Letter Already Guessed: ' + this.format(this.currentGuesses));
          this.display ('win','Win: ' + this.numberOfWins);
      },

      getWord: function(){
          // select a word
          this.wordIndex = Math.floor(Math.random() * this.words.length); 
          this.buildString();
          this.display ('word', 'Word: ' + this.format(this.displayWord));
      },
      display: function(id, value){
        document.getElementById(id).textContent = value;
      },

      checkGuessWord: function(guess){
         var isFound = ((this.words[this.wordIndex]).toLowerCase()).indexOf(guess);
         console.log ("answer is "+ this.words[this.wordIndex]);
         if (isFound >= 0){
            // replace all occurrences 
        
            for (var i = 0; i < this.words[this.wordIndex].length; i++){
                if (this.words[this.wordIndex].substring(i,i+1).toLowerCase() == guess){
                    
                    if (i == 0) {
                        this.displayWord = guess + this.displayWord.substring(1,this.displayWord.length);
                    } else {
                        this.displayWord = this.displayWord.substring(0,i) + guess + this.displayWord.substring(i+1);
                    }
                }
            }
         } else {
            if (this.currentGuesses.indexOf(guess) == -1){
                this.currentGuesses += guess;
                this.numberOfGuesses +=1;
                this.display ('guessed','Letter Already Guessed: ' + this.format(this.currentGuesses));
                this.display ('numGuessed','Number of Guessing Remaining: ' + (this.guessLimit - this.numberOfGuesses));
            } 
         }
         this.display ('word', 'Word: '+ this.format(this.displayWord));
         this.checkStatus();
      },

      checkStatus: function(){
        if (this.guessLimit === this.numberOfGuesses){
            this.reset();
            // play loser music
        }

        if (this.displayWord === this.words[this.wordIndex].toLowerCase()){
            // play winner music
            document.getElementById('characterImg').src = this.img_root_dir+ this.imageFile[this.wordIndex];
            document.getElementById('answer').innerHTML = '<h4> Yes, it is ' + this.words[this.wordIndex] + '</h4>';
            this.getNextWord();
        }
      },

      format: function(word){
        var formattedWord = "";
        for (var i=0; i < word.length; i++){
            formattedWord += word.substring(i,i+1) + " ";
        }
        console.log ("word is" + word);
        return formattedWord;
      },

      buildString: function(){
        var val = "";
        for (var i = 0 ; i < this.words[this.wordIndex].length; i++){
            if (this.words[this.wordIndex].charAt === " " ){
                val += " ";
            }else {
                val += "_";
            }
        }
        this.displayWord = val;

      },
};

document.onkeyup = function(event){
    if (event.which > 64 && event.which < 91)
    hangman.checkGuessWord(new String(event.key));
 };





