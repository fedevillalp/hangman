var inquirer = require('inquirer');

var attempts=0;
var max_attempts=10;
var word_counter = 0;
var words = ['one','two','three'];
var progress = [];
var solution =[];


function getletter(){

    if (word_counter<words.length){

        inquirer
        .prompt([
            {
                'name': 'user_letter',
                'message':'What letter do you choose?'
            }
        ])
        .then(answers => {
            
                var word = new Word(words[word_counter],answers.user_letter);
                
                word.init_template();
                word.find_letters();

                if (word.check_win()){
                    word_counter++;
                    attempts=0;
                    progress = [];
                    console.log('You win !');
                    getletter();
                } else if (attempts<max_attempts){
                    var attempts_left = (max_attempts-1) - attempts;
                    console.log('You have ' + attempts_left + ' attempts left');
                    attempts++;
                    getletter();
                } else if (attempts = max_attempts){
                    console.log('You lost! The correct solution was: ')
                    word.print_solution();
                    word_counter++;
                    attempts=0;
                    progress = [];
                    getletter();
                } 
        });

    } else { console.log('END!')}
}



function Word(word, user_letter){
    
    //fill the array with '_' unless a letter or a '_' exist 
    this.init_template = function(){
        
        for (var index in word){
            if(!progress[index]){
                progress[index]= '_';
            }  
        }
    }

    this.find_letters = function(){
        this.word = word.split(''); // split word into array of strings
        
        for (var index in this.word){
            if (this.word[index] == user_letter){
                progress[index]= user_letter;
            } 
        }

        console.log(progress);
    }

    this.print_solution = function(){
        for (var index in word){
            solution[index]= word[index];    
        }
        console.log(solution);
        solution = [];
    }

    this.check_win = function(){
        for (var index in word){
            if(progress[index] != word[index]){
                return false;
            }  
        }
        
        return true;
    }
}
    
getletter();



