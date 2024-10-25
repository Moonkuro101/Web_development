var randomDice1 = Math.random() * 6 + 1;
var randomDice2 = Math.random() * 6 + 1;

randomDice1 = Math.floor(randomDice1);
randomDice2 = Math.floor(randomDice2);

document
  .querySelector(".img1")
  .setAttribute("src", "images/dice" + randomDice1 + ".png");
document
  .querySelector(".img2")
  .setAttribute("src", "images/dice" + randomDice2 + ".png");

if (randomDice1 > randomDice2) {
  document.querySelector("h1").innerHTML = "🚩Player 1 Wins!";
} else if (randomDice1 < randomDice2) {
  document.querySelector("h1").innerHTML = "Player 2 Wins!🚩";
} else {
  document.querySelector("h1").innerHTML = "Draw!";
}


