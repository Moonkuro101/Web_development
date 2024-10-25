var allButton = $(".btn");
var gamePattern = [];
var userClickedPattern = [];
var start = false;
var level = 0;

$(".btn").on("click", function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  makesound(userChosenColor);
  animatePress(userChosenColor);
  if (start) {
    checkAnswer(userClickedPattern.length - 1);
  }
});

$(document).on("keypress", function () {
  if (!start) {
    start = true;
    nextSequence();
  }
});

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * allButton.length);
  var randomButton = allButton[randomNumber];
  var colorName = randomButton.getAttribute("id");
  gamePattern.push(colorName);
  $("#" + colorName)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  makesound(colorName);
  level++;
  $("#level-title").text("Level " + level);
  userClickedPattern = [];
}

function makesound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  // Check if the most recent user clicked color matches the game pattern
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("Success");

    // If the user has finished their sequence (matched all colors for this level)
    if (userClickedPattern.length === gamePattern.length) {
      // Wait for 1 second before starting the next sequence
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Wrong");
    makesound("wrong");

    // Add a visual effect to indicate the game is over
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    // Change the title to indicate that the game is over
    $("#level-title").text("Game Over, Press Any Key to Restart");

    // Restart the game
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  start = false;
}
