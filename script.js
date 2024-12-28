let h1 = document.getElementsByTagName("h1")[0];
let buttons = document.getElementsByTagName("button");
buttons = Array.from(buttons);
let userPattern = [], gamePattern = [];
let colors = ["green", "red", "yellow", "blue"];

function randomGenerator() {
  return Math.floor(Math.random() * 4);
}

function delayGenerator(time) {
  return new Promise((resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  }))
}

async function nextStage() {
  userPattern=[];
  gamePattern.push(colors[randomGenerator()]);
  h1.textContent = "level " + (gamePattern.length);
  for (let i = 0; i < gamePattern.length; i++) {
    await delayGenerator(500);
    playSound(gamePattern[i]);
  }
}

function playSound(color) {
  let audio;
  switch (color) {
    case "green": audio = new Audio("./sounds/green.mp3");
      audio.play();
      break;
    case "red": audio = new Audio("./sounds/red.mp3");
      audio.play();
      break;
    case "yellow": audio = new Audio("./sounds/yellow.mp3");
      audio.play();
      break;
    case "blue": audio = new Audio("./sounds/blue.mp3");
      audio.play();
      break;
    default: console.log("no other clicks are valid.");
  }
  let button = document.getElementsByClassName(color)[0];
  button.classList.add("clicked");
  setTimeout(() => {
    button.classList.remove("clicked");
  }, 500);
}

buttons.forEach(button => {
  button.addEventListener("click", async () => {
    let buttonColor = button.className;
    userPattern.push(buttonColor);
    playSound(buttonColor);
    console.log(gamePattern,userPattern);
    if (userPattern[userPattern.length-1]!=gamePattern[userPattern.length-1]) {
      await delayGenerator(500);
      new Audio("./sounds/wrong.mp3").play();
      document.body.classList.add("wrong");
      setTimeout(() => {
        document.body.classList.remove("wrong");
      }, 200);
      gamePattern = [];
      userPattern = [];
      h1.textContent = "Click Here To Start";
    }
    if(userPattern.length==gamePattern.length && gamePattern.length!=0){
      setTimeout(()=>{
        nextStage();
      },1000);
    }
  })
})

h1.addEventListener("click",nextStage);