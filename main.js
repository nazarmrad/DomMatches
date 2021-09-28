//setting the vars

var cardsArray = [
    {    'name': 'CSS',    'img': 'https://github.com/robgmerrill/img/blob/master/css3-logo.png?raw=true',  },
    {    'name': 'HTML',    'img': 'https://github.com/robgmerrill/img/blob/master/html5-logo.png?raw=true',  },
    {    'name': 'jQuery',    'img': 'https://github.com/robgmerrill/img/blob/master/jquery-logo.png?raw=true',  },
    {    'name': 'JS',    'img': 'https://github.com/robgmerrill/img/blob/master/js-logo.png?raw=true',  },
    {    'name': 'Node',    'img': 'https://github.com/robgmerrill/img/blob/master/nodejs-logo.png?raw=true',  },
    {    'name': 'Photo Shop',    'img': 'https://github.com/robgmerrill/img/blob/master/photoshop-logo.png?raw=true',  },
    {    'name': 'PHP',    'img': 'https://github.com/robgmerrill/img/blob/master/php-logo_1.png?raw=true',  },
    {    'name': 'Python',    'img': 'https://github.com/robgmerrill/img/blob/master/python-logo.png?raw=true',  },
    {    'name': 'Ruby',    'img': 'https://github.com/robgmerrill/img/blob/master/rails-logo.png?raw=true',  },
    {    'name': 'Sass',    'img': 'https://github.com/robgmerrill/img/blob/master/sass-logo.png?raw=true',  },
    {    'name': 'Sublime',    'img': 'https://github.com/robgmerrill/img/blob/master/sublime-logo.png?raw=true',  },
    {    'name': 'Wordpress',    'img': 'https://github.com/robgmerrill/img/blob/master/wordpress-logo.png?raw=true',  },
  ];  

var firstGuess = '';
var secondGuess = ''; 
var count = 0;
var previousTarget = null;
var delay = 1200;



// duplicating the cardArray

var gameGrid = cardsArray.concat(cardsArray);

// randomizing the deck 
gameGrid.sort(function(){
    return 0.5 - Math.random();
}
    );

// getting the dive element

  var game = document.getElementById('game');

// creating a new section and attaching to it a "grid" class

  var grid = document.createElement('section');
  grid.setAttribute('class', 'grid');
  game.appendChild(grid);

// iteration through elements in the cards array and putting them in the list

  for (i = 0; i < gameGrid.length ; i++){
    var card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = gameGrid[i].name ;
    
  

    // create the front of the card 

    var front = document.createElement('div');
    front.classList.add('front')

    // create the back of the card

    var back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = `url(${gameGrid[i].img})`;
    
    // appending the card to the grid 

    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);

  };


// creating the match function 

var match = function(){
    var selected = document.querySelectorAll('.selected');
    for (i = 0; i < selected.length; i++){
        selected[i].classList.add('match');
    }
}

// resetting the gueses 

var resetGuesses = function() {
  firstGuess = '';
  secondGuess = '';
  count = 0 ;
  previousTarget = null;

  var selected = document.querySelectorAll('.selected');

  for (i = 0 ; i < selected.length; i++){
    selected[i].classList.remove('selected');
  }
}


// event listener on our grid

grid.addEventListener('click', function(event){
    var clicked = event.target;
    if (clicked.nodeName === 'SECTION'|| clicked === previousTarget || clicked.parentNode.classList.contains('match')|| clicked.parentNode.classList.contains('select')){
        return;
    }
    if (count < 2){
        count++;
       if ( count ===1){
           firstGuess = clicked.parentNode.dataset.name;
           clicked.parentNode.classList.add('selected');
       }else {
        secondGuess = clicked.parentNode.dataset.name;
        clicked.parentNode.classList.add('selected');
       }
       if (firstGuess !== '' && secondGuess !== ''){
           if (firstGuess === secondGuess){
               setTimeout(match, delay);
               setTimeout(resetGuesses , delay);
           }else {
             setTimeout(resetGuesses , delay);
           }
       }
       previousTarget = clicked;
    }

});