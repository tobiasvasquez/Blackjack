  // Add your code here

  //
  //  Blackjack
  //  by Tobias Vasquez
  //
  /* Object jugador = {
    nombre: "",
    cartas: [],
    suma: 0,
    continuar: true
  }
  */

  //Obtener nombre de los jugadores
  var jugadores_obj = [];
  var cant_jugadores = 0;


  //Cards Variables
  let suits = ['Pick', 'Trebol', 'Corazones', 'Diamantes'];
  let values = ['As', 'Rey', 'Reina', 'Jota', 'Diez', 'Nueve', 'Ocho', 'Siete', 'Seis', 'Cinco', 'Cuatro', 'Tres',
      'Dos', 'Uno'
  ];

  //Dom Variables  
  let textArea = document.getElementById('text-area');
  let newGameButton = document.getElementById('new-game-button');
  let hitButton = document.getElementById('hit-button');
  let stayButton = document.getElementById('stay-button');
  let resetButton = document.getElementById('reset-button');

  // Game Variables

  let gameStarted = false,
      gameOver = false,
      dealerDraw = false,
      playerWon = false;
  deck = [];

  var dealerCards = [],
      dealerScore = 0,
      playerScore = 0;


  hitButton.style.display = 'none';
  stayButton.style.display = 'none';
  resetButton.style.display = 'none';

  startGame();
  showStatus();

  newGameButton.addEventListener('click', function () {
      gameStarted = true,
          gameOver = false,
          playerWon = false;

      deck = createDeck();
      shuffleDeck(deck)
      dealerCards = [getNextCard(), getNextCard()];

      newGameButton.style.display = 'none';
      hitButton.style.display = 'inline';
      stayButton.style.display = 'inline';
      resetButton.style.display = 'none';
      showStatus();
  });

  hitButton.addEventListener('click', function () {
      for (let i = 0; i < cant_jugadores; i++) {
          if (jugadores_obj[i].firstRound === true) {
              jugadores_obj[i].cartas.push(getNextCard());
              jugadores_obj[i].firstRound = false;
          }

          jugadores_obj[i].cartas.push(getNextCard());
      }
      checkForEndOfGame();
      showStatus();
  });
  stayButton.addEventListener('click', function () {
      showStatus();
      checkForEndOfGame();
      gameOver = true;
      resetButton.style.display = 'inline';
  });
  resetButton.addEventListener('click', function () {
      resetScores();
      startGame();
      updateScores();
      deck = createDeck();
      shuffleDeck(deck);
  })

  //Reinicia Scores a 0
  function resetScores() {
      dealerCards = [],
          dealerScore = 0,
          playerScore = 0,
          jugadores_obj = [];
  }
  //Arranca el juego
  function startGame() {
      cant_jugadores = prompt("Ingrese la cantidad de jugadores");
      for (let i = 1; i <= cant_jugadores; i++) {
          let nombre = prompt("Ingrese el nombre del jugador " + i);
          var object_jugador = {
              nombre: nombre,
              cartas: [],
              suma: 0,
              firstRound: true,
              continuar: true

          };
          jugadores_obj.push(object_jugador);


      }
  }
  //Crea un mazo
  function createDeck() {
      let deck = [];
      for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
          for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {
              let card = {
                  suit: suits[suitIdx],
                  value: values[valueIdx]
              };
              deck.push(card);
          }
      }
      return deck;
  }

  //Mezcla El mazo
  function shuffleDeck(deck) {
      for (let i = 0; i < deck.length; i++) {
          let swapIdx = Math.trunc(Math.random() * deck.length);
          let tmp = deck[swapIdx];
          deck[swapIdx] = deck[i];
          deck[i] = tmp;
      }
  }

  function getCardString(card) {
      return card.value + ' of ' + card.suit;
  }

  function getNextCard() {
      return deck.shift();
  }

  function getCardNumericValue(card) {
      switch (card.value) {
          case 'As':
              return 1;
          case 'Dos':
              return 2;
          case 'Tres':
              return 3;
          case 'Cuatro':
              return 4;
          case 'Cinco':
              return 5;
          case 'Seis':
              return 6;
          case 'Siete':
              return 7;
          case 'Ocho':
              return 8;
          case 'Nueve':
              return 9;
          default:
              return 10;
      }
  }

  function getScore(cardArray) {
      let score = 0;
      let hasAce = false;
      for (let i = 0; i < cardArray.length; i++) {
          let card = cardArray[i];
          score += getCardNumericValue(card);
          if (card.value === 'As') {
              hasAce = true;
          }
      }
      if (hasAce && score + 10 <= 21) {
          return score + 10
      }
      return score;
  }

  function updateScores() {
      dealerScore = getScore(dealerCards);
  }

  function realizarSuma(jugador) {

      var suma_cartas = 0;
      jugador.cartas.forEach((carta, numero_carta) => {
          suma_cartas += getCardNumericValue(carta)
      });

      return suma_cartas;
  }


  var ganador;

  function checkForEndOfGame() {

      updateScores();

      var ganador_score = 0;

      for (i = 0; i < jugadores_obj.length; i++) {
          // obtener carta para jugador I
          var suma_cartas = getScore(jugadores_obj[i].cartas)
          if (suma_cartas > 21) { // Suma de las cartas si se pasa de 21 PIERDE JUGADOR
              continue;
          } else if (suma_cartas > ganador_score) {
              ganador_score = suma_cartas;
              ganador = jugadores_obj[i].nombre;

          } else if (suma_cartas == ganador_score) {
              ganador = "Empate";
              ganador_score = suma_cartas;
          }
      }

      if (dealerScore <= 21) {

          if (ganador_score > dealerScore) {
              playerWon = true;
              gameOver = true;
          } else if (dealerScore === ganador_score) {
              ganador = "Empate entre el dealer y " + ganador;
              gameOver = true;
              dealerDraw = true;
          } else {
              ganador = 'Gano el dealer';
              playerWon = false;
              gameOver = true;
          }
      } else {
          playerWon = true;
          gameOver = true;
      }




  }


  /*
        for (i = 0; i < cant_jugadores; i++) {
            // obtener carta para jugador I
            suma_cartas = realizarSuma(jugadores_obj[i])
            if (suma_cartas < 21) {
                if (suma_cartas >= ganador_score) {
                    ganador_score = suma_cartas
                    if (suma_cartas == ganador_score) {
                        ganador = "Empate entre " + ganador + " y " + jugadores_obj[i];
                    } else {
                        ganador = jugadores_obj[i].nombre;
                    }


                }
            }
        }
      }
  */
  function showStatus() {

      if (!gameStarted) {
          textArea.innerText = 'Welcome to Blackjack!';
          return;
      }

      updateScores();

      textArea.innerText = 'Dealer Has:\n' + dealerCardString + '(Score: ' + dealerScore + ')\n\n';

      //Mostrar que carta tiene cada jugador (falta mostrar la carta)
      for (let i = 0; i < cant_jugadores; i++) {
          var whoIs = jugadores_obj[i];
          textArea.innerText += '\n' + whoIs.nombre + ' tiene :' + getScore(whoIs.cartas) + '\n\n';
          if (whoIs.cartas) {
              for (let ic = 0; ic < whoIs.cartas.length; ic++) {
                  textArea.innerText += "Cartas " + ic + ": " + whoIs.cartas[ic].value + " de " + whoIs.cartas[ic].suit + "\n";
              }
          }


      }
      if (gameOver) {
          if (playerWon) {
              textArea.innerText += '\n\n' + "Ha ganado el jugador : " + ganador;
          } else if (dealerDraw) {
              textArea.innerText +=  '\n\n' + 'Empate entre ' + ganador;
          } else {
              textArea.innerText +=  '\n\n' + "DEALER WINS";
          }
          newGameButton.style.display = 'inline';
          hitButton.style.display = 'none';
          stayButton.style.display = 'none';
          resetButton.style.display = 'inline';
          return;
      }
  }

  let dealerCardString = '';
  for (let i = 0; i < dealerCards.length; i++) {
      dealerCardString += getCardString(dealerCards[i]) + '\n';
  }

  let playerCardString = '';

  /*for (let i = 0; i < playerCards.length; i++) {
        playerCardString += getCardString(playerCards[i]) + '\n';
      }
    */