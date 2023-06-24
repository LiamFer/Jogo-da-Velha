const inptPlay1 = document.getElementById("player1");
const inptPlay2 = document.getElementById("player2");
const playBtn = document.getElementById("playBtn");
const playersBox = document.getElementById("playerNames");
const root = document.querySelector(":root");
const winnerScreen = document.getElementById("winnerScreen");
let spanName = document.getElementById("spanName");
let player1 = "";
let player2 = "";
let count = 1;
let squaresFull = 0;
let player1Positions = [];
let player2Positions = [];
let winConditions = [
  ["A1", "A2", "A3"],
  ["B1", "B2", "B3"],
  ["C1", "C2", "C3"],
  ["A1", "B1", "C1"],
  ["A2", "B2", "C2"],
  ["A3", "B3", "C3"],
  ["A1", "B2", "C3"],
  ["A3", "B2", "C1"],
];

// Seleção de cores no início
const player1Color = document.getElementById("colorPlayer1");
const player2Color = document.getElementById("colorPlayer2");
let color1 = "#9562f5";
let color2 = "#65def1";

player1Color.addEventListener("change", function () {
  color1 = player1Color.value;
  root.style.setProperty("--player1-color", color1);
});

player2Color.addEventListener("change", function () {
  color2 = player2Color.value;
  root.style.setProperty("--player2-color", color2);
  root.style.setProperty("--timer-color", color2);
});

// Adicionando o funcionamento dos quadrados do jogo da velha
function prepareGame() {
  document.querySelectorAll(".tableSquare").forEach(function (square) {
    square.addEventListener("click", function game() {
      console.log(count);
      count++;
      if (count > 1) {
        count = 0;
      }
      switch (count) {
        case 0:
          player2Positions.push(square.dataset.position);
          root.style.setProperty("--timer-color", color1);
          spanName.style.color = color1;
          spanName.innerText = player1;
          square.innerText = 0;
          square.style.color = color2;

          break;
        case 1:
          player1Positions.push(square.dataset.position);
          root.style.setProperty("--timer-color", color2);
          spanName.style.color = color2;
          spanName.innerText = player2;
          square.innerText = 1;
          square.style.color = color1;
          break;
      }
      squaresFull++;
      console.log(`${squaresFull} Quadrados Preenchidos`);
      console.log(`${player1} posições -> ${player1Positions}`);
      console.log(`${player2} posições -> ${player2Positions}`);
      checkWin();
      square.removeEventListener("click", game);
    });
  });
}

prepareGame();

// Menu inicial que captura o nome dos jogadores
playBtn.addEventListener("click", function () {
  if (inptPlay1.value.length === 0 || inptPlay2.value.length === 0) {
    return;
  } else {
    player1 = inptPlay1.value;
    player2 = inptPlay2.value;
    inptPlay1.value = "";
    inptPlay2.value = "";
    playersBox.classList.add("goUp");
    spanName.innerText = player2;
    setTimeout(function () {
      playersBox.style.display = "none";
      document.getElementById("all").style.display = "flex";
    }, 1000);
  }
});

// Função para verificar e retornar uma string do jogador vencedor
function checkWin() {
  let winner1 = 0;
  let winner2 = 0;
  document.getElementById("tieText").innerText = "Winner";
  for (let i = 0; i < winConditions.length; i++) {
    if (
      player1Positions.includes(winConditions[i][0]) &&
      player1Positions.includes(winConditions[i][1]) &&
      player1Positions.includes(winConditions[i][2])
    ) {
      winner1++;
      let square1 = document.getElementById(winConditions[i][0]);
      let square2 = document.getElementById(winConditions[i][1]);
      let square3 = document.getElementById(winConditions[i][2]);
      square1.style.backgroundColor = color1;
      square2.style.backgroundColor = color1;
      square3.style.backgroundColor = color1;
      square1.style.color = "white";
      square2.style.color = "white";
      square3.style.color = "white";
    }

    if (
      player2Positions.includes(winConditions[i][0]) &&
      player2Positions.includes(winConditions[i][1]) &&
      player2Positions.includes(winConditions[i][2])
    ) {
      winner2++;
      let square1 = document.getElementById(winConditions[i][0]);
      let square2 = document.getElementById(winConditions[i][1]);
      let square3 = document.getElementById(winConditions[i][2]);
      square1.style.backgroundColor = color2;
      square2.style.backgroundColor = color2;
      square3.style.backgroundColor = color2;
      square1.style.color = "white";
      square2.style.color = "white";
      square3.style.color = "white";
    }
  }

  if (winner1 > 0) {
    document.getElementById("winner").innerText = player1;
    root.style.setProperty("--winner-color", color1);
    winnerScreen.style.display = "flex";
    winnerScreen.classList.remove("winFade");
    winnerScreen.classList.add("winAppear");
    return;
  }

  if (winner2 > 0) {
    document.getElementById("winner").innerText = player2;
    root.style.setProperty("--winner-color", color2);
    winnerScreen.style.display = "flex";
    winnerScreen.classList.remove("winFade");
    winnerScreen.classList.add("winAppear");
    return;
  }

  if (squaresFull === 9) {
    document.getElementById("tieText").innerText = "";
    document.getElementById("winner").innerText = 'It"s a Tie!';
    root.style.setProperty("--winner-color", "white");
    winnerScreen.style.display = "flex";
    winnerScreen.classList.remove("winFade");
    winnerScreen.classList.add("winAppear");
    return;
  }
}

// Botão de jogar novamente
const playAgain = document.getElementById("playAgain");

playAgain.addEventListener("click", function () {
  // Resetando as variáveis
  squaresFull = 0;
  player1Positions = [];
  player2Positions = [];

  // Resetando os quadrados, criando novos.
  const positions = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"];
  const box = document.getElementById("game");
  const mainContent = document.getElementById("all");
  box.remove();
  let newSquares = document.createElement("main");
  newSquares.id = "game";
  for (let i = 0; i < 9; i++) {
    let div = document.createElement("div");
    div.dataset.position = positions[i];
    div.className = "tableSquare";
    div.id = positions[i];
    newSquares.append(div);
  }
  mainContent.append(newSquares);
  // Adicionando função aos quadrados novamente
  prepareGame();

  winnerScreen.classList.remove("winAppear");
  winnerScreen.classList.add("winFade");

  setTimeout(function () {
    winnerScreen.style.display = "none";
  }, 1500);
});
