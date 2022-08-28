var gamePattern = [];
var userPattern = [];

var buttonColours = ["red","blue","green","yellow"];

var level = 0;
var started = false;

$(document).bind("touchstart",function(){
    if(!started)
    {
        nextSequence();
        started = true;
    }
});

function startOver()
{
    started = false;
    level = 0;
    gamePattern = [];
}

$(".btn").bind("touchstart", function(){
    var userChosenColour = $(this).attr("id");
    userPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userPattern.length-1);
});

function checkAnswer(currentLevel)
{
    if(userPattern[currentLevel]===gamePattern[currentLevel])
    {
        console.log("Success");
        if(userPattern.length === gamePattern.length)
        {
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else
    {
        $("h1").text("Game Over, Press Anywhere to Restart.");
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}

function nextSequence()
{
    userPattern = [];
    level++;
    $("h1").text("Level: "+level);
    var randomNumber = Math.random();
    randomNumber = Math.floor(randomNumber*4);
    var randomColour = buttonColours[randomNumber];
    gamePattern.push(randomColour);

    playSound(randomColour);
    animatePress(randomColour);
}

function playSound(name)
{
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(Colour)
{
    $("#"+Colour).addClass("pressed");
    setTimeout(function(){
        $("#"+Colour).removeClass("pressed");
    },100);

}

