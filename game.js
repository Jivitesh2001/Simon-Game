var userClickedPattern = [];
var gamePattern = [];
var level = 0;
var started = false;
var noOfClicks = 0;
var buttonColours = ["red", "blue", "green", "yellow"];

/* BUTTONS AND MOUSE CLICKS */

$("body").on("keydown", function(event) { // to start the game on keboard press.
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() { //Checks button click and registers the click
    userChosenColor = $(this).attr("id"); //and then plays the sound and then calls the function checkAnwer().
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(noOfClicks);
    noOfClicks++;
});

/* CHECKING THE CLICKS, GOING TO NEXT SEQUENCE AND STARTING OVER */

function checkAnswer(currentLevel) { // to check if the buttton clicked is in the same of the game pattern.
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        if (currentLevel === level - 1) {
            setTimeout(function() {
                userClickedPattern = [];
                nextSequence();
            }, 1000);
        }

    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200)
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $('body').on("click", startOver);
    }

}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

function nextSequence() { // Adds a new random colour in the array.
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("#level-title").text("Level " + level);
    noOfClicks = 0;

}

/* ANIMATION AND SOUNDS */
function playSound(name) { // Plays the sound on the colour clicked .
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColour) { //animation while clicking a button.
    var clss = "#" + currentColour;
    $(clss).addClass("pressed");
    setTimeout(function() {
        $(clss).removeClass("pressed");
    }, 100);
}