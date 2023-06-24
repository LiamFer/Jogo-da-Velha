const inptPlay1 = document.getElementById("player1");
const inptPlay2 = document.getElementById("player2");
const playBtn = document.getElementById("playBtn");
const playersBox = document.getElementById("playerNames");
const root = document.querySelector(":root");
let spanName = document.getElementById("spanName");
let player1 = "";
let player2 = "";
let count = 0;
let squaresFull = 0;
let player1Positions = [];
let player2Positions = [];
let player1Win = "";
let player2Win = "";
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
let color1 = "";
let color2 = "";

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
document.querySelectorAll(".tableSquare").forEach(function (square) {
  square.addEventListener("click", function game() {
    squaresFull++;
    if (squaresFull === 9) {
      alert("empate");
    }
    if (count > 1) {
      count = 0;
    }
    if (count === 0) {
      root.style.setProperty("--timer-color", color1);
      spanName.style.color = color1;
      spanName.innerText = player1;
      square.innerText = 0;
      square.style.color = color2;
      player2Positions.push(square.dataset.position);
      console.log(`${player2} posições ${player2Positions}`);
    } else {
      root.style.setProperty("--timer-color", color2);
      spanName.style.color = color2;
      spanName.innerText = player2;
      square.innerText = 1;
      square.style.color = color1;
      player1Positions.push(square.dataset.position);
      console.log(`${player1} posições ${player1Positions}`);
    }
    count++;
    square.removeEventListener("click", game);
    checkWin();
  });
});

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
    console.log(`${player1}`);
  }

  if (winner2 > 0) {
    console.log(`${player2}`);
  }
}
