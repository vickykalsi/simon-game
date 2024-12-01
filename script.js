let gamePattern = [], userPattern = [];
const h1 = document.getElementsByTagName("h1")[0];
let buttons = document.getElementsByTagName("button");
buttons = Array.from(buttons);
const buttonColors = ["green", "red", "yellow", "blue"];

buttons.forEach(button => {
  button.addEventListener("click", () => {
    let color = button.className.split(" ")[0];
    let audio = new Audio("./sounds/" + color + ".mp3");
    audio.play();
    button.classList.add("opaque");
    setTimeout(() => {
      button.classList.remove("opaque");
    }, 200);
  })
})

function nextRandomNumber() {
  return Math.floor(Math.random() * 4);
}

function dummy(time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  })
}

async function nextButtonPlay() {
  userPattern=[];
  var nextRandomColor = buttonColors[nextRandomNumber()];
  gamePattern.push(nextRandomColor);
  await dummy(500);
  h1.textContent = "Level " + (gamePattern.length);
  for (let i = 0; i < gamePattern.length; i++) {
    document.getElementsByClassName(gamePattern[i])[0].click();
    await dummy(300);
  }
}

function wrongDecision() {
  let audio = new Audio("./sounds/wrong.mp3");
  audio.play();
  document.body.classList.add("wrong");
  gamePattern = [];
  userPattern = [];
  setTimeout(() => {
    h1.textContent = "Press a key to start";
    document.body.classList.remove("wrong");
  }, 100);
}

document.addEventListener("keydown", () => {
  nextButtonPlay();
})

document.addEventListener("mousedown", e => {
  let userClickedButton = e.target;
  let color = userClickedButton.className.split(" ")[0];
  if (buttonColors.includes(color))
    userPattern.push(color);
  if (gamePattern[userPattern.length-1] != userPattern[userPattern.length-1]){
    setTimeout(()=>{
      wrongDecision();
    },500);
  }
  else if(userPattern.length===gamePattern.length)
    nextButtonPlay();
})