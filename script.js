const h1=document.getElementsByTagName("h1")[0];
let gamePattern=[];
let userPattern=[];
const buttonColors=["green","red","yellow","blue"];
let buttons=document.getElementsByTagName("button");
buttons=Array.from(buttons);

buttons.forEach(button=>{
  button.addEventListener("click",e=>{
    let color=e.target.className.split(" ")[0];
    button.classList.add("opaque");
    let audio=new Audio("./sounds/"+color+".mp3");
    audio.play();
    setTimeout(()=>{
      button.classList.remove("opaque");
    },300);
  })
})

function nextRandomNumber(){
  return Math.floor(Math.random()*4);
}

function dummy(time){
  return new Promise(resolve=>{
    setTimeout(()=>{
      resolve();
    },time);
  })
}

async function nextGameColor(){
  userPattern=[];
  let color=buttonColors[nextRandomNumber()];
  gamePattern.push(color);
  await dummy(1000);
  h1.textContent="Level "+(gamePattern.length);
  for(let i=0;i<gamePattern.length;i++){
    let button=document.getElementsByClassName(gamePattern[i])[0];
    button.click();
    await dummy(500);
  }
}

async function wrongAnswer(){
  await dummy(1000);
  document.body.classList.add("wrong");
  var audio=new Audio("/sounds/wrong.mp3");
  audio.play();
  userPattern=[];
  gamePattern=[];
  h1.textContent="Press a key to start";
  setTimeout(()=>{
    document.body.classList.remove("wrong");
  },500);
}

document.addEventListener("keydown",()=>{nextGameColor()});

document.addEventListener("mousedown",e=>{
  let color=e.target.className.split(" ")[0];
  if(buttonColors.includes(color)){
    userPattern.push(color);
    if(userPattern[userPattern.length-1]!=gamePattern[userPattern.length-1])
      wrongAnswer();
    else if(userPattern.length==gamePattern.length)
      nextGameColor();
  }
})