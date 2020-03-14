var btnColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userChosenPattern = [];
var started = false;
var level = 0;

$(document).keypress(function() {
    if (!started) {
        nextSquare();
        started = true;
        $("h1").text("Level " + level);
    }
});

function nextSquare() {
    var randomNum = Math.floor(Math.random() * 4);
    var randomChosenColor = btnColors[randomNum];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColor);
    level++;
    $("h1").text("Level " + level);
    console.log($("#" + randomChosenColor));
    console.log(randomChosenColor);
}

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    playsound(userChosenColor);
    animatePress(userChosenColor);
    userChosenPattern.push(userChosenColor);
    checkAnswer(userChosenPattern.length - 1);
    console.log("btn clicked " + userChosenPattern);
});

function playsound(key) {
    var soundEffect = new Audio("sounds/" + key + ".mp3");
    soundEffect.play();
}

function animatePress(key) {
    $("#" + key).addClass("pressed");
    setTimeout(function() {
        $("#" + key).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userChosenPattern[currentLevel]) {
        console.log("success");
        setTimeout(nextSquare, 1000);
    } else {
        console.log("wrong");
        playsound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game over, enter anykey to restart!");

        startOver();
    }
}

function startOver() {
    started = false;
    level = 0;
    gamePattern = [];
    userChosenPattern = [];
}