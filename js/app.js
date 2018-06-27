    /*********************************************
        // Create a list that holds all of your cards & some used variables
        *********************************************/
       const cardsIcon = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb", "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
       // Empty array to pass shuffle to it
       let carddraw = [];
       // tha cards container
       const cardsBox = document.querySelector("#deck");
       // For moves
       let moves = 0;
       const movesValue = document.querySelector(".moves");
       // For the matched and not matched
       let openCard = [];
       let equalCard = [];
       // For rating
       const ratingStar = document.querySelector(".stars");
       let goodRate;
       // Time  
       timerCounter = document.querySelector(".timer");
       // Win 
       let modal = document.querySelector("#win-modal");
       /*********************************************
         // Reset timer
         *********************************************/
       let timer = new Timer();
       timer.start();
       timer.addEventListener('secondsUpdated', function(e) {
           $('.timer').html(timer.getTimeValues().toString());
       });
       /*********************************************
       // Create cards & add them to the page content & animation
       *********************************************/
       function pageContent() {
           for (let x = 0; x < carddraw.length; x++) {
               const card = document.createElement('li');
               const icon = document.createElement('i');
               card.classList.add('card', 'animated');
               icon.classList.add('fa', cardsIcon[x]);
               card.appendChild(icon);
               cardsBox.appendChild(card);
               // let actions start
               clickAction(card);
           }
       }
       // Starting the game 
       function clickAction(card) {
           //card event on-click 
           card.addEventListener("click", function() {
               //opend cards
               if (openCard.length === 1) {
                   const nextCard = this;
                   const preCard = openCard[0];
                   card.classList.add("open", "show", "stop-click");
                   openCard.push(this);
                   //compare if cards are matched
                   matched(preCard, nextCard);
               } else {
                   //not open cards
                   card.classList.add("open", "show", "stop-click");
                   openCard.push(this);
               }
           });
       }
       // Matched Cards
       function matched(nextCard, preCard) {
           // calculate the movements
           countMoves();
           //compare if cards are matched
           if (nextCard.innerHTML === preCard.innerHTML) {
               equalCard.push(nextCard, preCard);
               nextCard.classList.add('match', 'rubberBand');
               preCard.classList.add('match', 'rubberBand');
               openCard = [];
               // All cards are matched & player win the game
               winner();
           } else {
               // Not open cards
               preCard.classList.add('wobble');
               nextCard.classList.add('wobble');
               setTimeout(function() {
                   nextCard.classList.remove("open", "show", "stop-click", "wobble");
                   preCard.classList.remove("open", "show", "stop-click", "wobble");
               }, 500);
               openCard = [];
           }
       }
       /*********************************************
       // Shuffle the list of cards using the provided "shuffle" method below 
       *********************************************/
       // Shuffle function from http://stackoverflow.com/a/2450976
       function shuffle(array) {
           var currentIndex = array.length,
               temporaryValue, randomIndex;
           while (currentIndex !== 0) {
               randomIndex = Math.floor(Math.random() * currentIndex);
               currentIndex -= 1;
               temporaryValue = array[currentIndex];
               array[currentIndex] = array[randomIndex];
               array[randomIndex] = temporaryValue;
           }
           return array;
       }
       /*********************************************
       // Calculate the players moves
       *********************************************/
       movesValue.innerHTML = 0;
   
       function countMoves() {
           moves++;
           movesValue.innerHTML = moves;
           ratingGame();
       }
       /*********************************************
       // Reset button to Start new game
       *********************************************/
       function newGame() {
           // Time
           clearInterval();
           // Empty cards box which have the array of cards
           cardsBox.innerHTML = "";
           // Remove the matched cards
           equalCard = [];
           // Create closed cards
           pageContent();
           // Empty moves
           moves = 0;
           movesValue.innerHTML = moves;
           // Stop timer
           timer.reset();
           timerCounter.innerHTML = "00:00:00";
           // Rating
           ratingStar.innerHTML = "";
           goodStar(3);
           // Win modal
           modal.classList.add("display-none");
           modal.classList.remove("display-block");
       }
       /*********************************************
       // Game is done the player  Win
       *********************************************/
       function winner() {
           //Stop the timer
           if (equalCard.length === cardsIcon.length) {
               modal.classList.remove("display-none");
               modal.classList.add("display-block");
               timer.pause();
               timerCounter.innerHTML = timer.getTotalTimeValues();
               finalMoves.innerHTML = moves;
               finalStars.innerHTML = goodRate;
           }
       }
       let finalMoves = document.querySelector('#moves');
       let finalStars = document.querySelector('#stars');
       /*********************************************
       // Rating Game
       *********************************************/
       // High level full star
       function goodStar(repet) {
           for (let i = 0; i < repet; i++) {
               const star = document.createElement('li');
               star.innerHTML = '<i class="fa fa-star"></i>';
               ratingStar.appendChild(star);
               goodRate = repet;
           }
       }
       // low level empty star
       function badStar(repet) {
           for (let i = 0; i < repet; i++) {
               const star = document.createElement('li');
               star.innerHTML = '<i class="fa fa-star-o"></i>';
               ratingStar.appendChild(star);
           }
       }
       // Total rate for the game
       function ratingGame() {
           if (moves == 15) {
               ratingStar.innerHTML = "";
               goodStar(2);
               badStar(1);
           } else if (moves == 25) {
               ratingStar.innerHTML = "";
               goodStar(1);
               badStar(2);
           } else if (moves == 30) {
               ratingStar.innerHTML = "";
               goodStar(0);
               badStar(3);
           }
       }
       /*********************************************
       // Run all code
       *********************************************/
       // main function to run all functions
       function ini() {
        
           // shuffle the array
           carddraw = shuffle(cardsIcon);
           // create the cards
           pageContent();
           // show the timer
           timer.start();
           // add stars
           goodStar(3);
           // win modal
           modal.classList.add("display-none");
       }     
       //Just run my code
       ini();