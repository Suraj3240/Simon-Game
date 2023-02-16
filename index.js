var userClickedPattern=[];
var gamePattern=[];

var started=false;
var level=0;

var buttonColors=["red","blue","green","yellow"];

$(document).keypress(function(){
    if(!started)
    {
        $("#level-title").text("Level " + level);
        nextSequence();
        started=true;
    }
});

function nextSequence()
{
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);

    var randomNum=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomNum];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    animatePress(randomChosenColor);
}

$(".btn").on("click",function(){
    $(this).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound($(this).attr("id"));
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    animatePress($(this).attr("id"));

    checkAnswer(userClickedPattern.length - 1);
});

function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor)
{
    $("." + currentColor).addClass("pressed");
    setTimeout(function(){
        $("." + currentColor).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel)
{
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel])
    {
        if(userClickedPattern.length == gamePattern.length)
        {
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else
    {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");

        },400);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}


function startOver()
{
    started=false;
    level=0;
    gamePattern=[];    
}