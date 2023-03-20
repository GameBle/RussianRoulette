// all the audio files
const sounds = [
  "sounds/CONTINUE_SOUND_1.mp3",
  "sounds/CONTINUE_SOUND_2.wav",
  "sounds/CONTINUE_SOUND_3.wav",
  "sounds/LOST_SOUND.mp3",
  "sounds/CONTINUE_SOUND_4.mp3",
  "sounds/CONTINUE_SOUND_5.mp3",
  "sounds/CONTINUE_SOUND_6.mp3",
];
//

// shuffling
const shuffleSounds = () => {
  for (let i = sounds.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [sounds[i], sounds[j]] = [sounds[j], sounds[i]];
  }
};
    // defining the losing audio before shuffling
    const losingAudio = new Audio(sounds[3]);
    //
shuffleSounds();
//

// ****** Rendering Players ******
let players = JSON.parse(localStorage.getItem("players"));
console.log(players);

for (let i = 0; i < players.length; i++) {
  let element = document.createElement("div");
  element.className = "child";
  element.id = `player${i + 1}`;
  element.innerText = `${players[i]}`;
  let ul = document.querySelector("div.rem-players");
  ul.appendChild(element);
}
// let kkk = document.getElementsByClassName("child");
// console.log(kkk);
//


// checking if the sounds are getting shuffled or not
// let check = () => {
//   for (let j = 0; j < sounds.length; j++) {
//     console.log(sounds[j] + " ");
//   }
// };
//


// Main Game logic
let indexToRemove = 0;
let Eliminatedbtn = null;
let currentlyPlayingAudio = null;
let prev = false; // check to remove the "red" class


for (let i = 0; i < 7; i++) {
    const btn = document.getElementById(`${i+1}`);
    btn.addEventListener("click", (e) => {
        for(let b = 0; b < players.length; b++){
            let SinglePlayer = document.getElementById(`player${b+1}`);
            SinglePlayer.classList.remove("audio");
            SinglePlayer.classList.add("child");
        }
        let currentPlayer = document.getElementById(`player${indexToRemove+1}`);
        currentPlayer.classList.remove("child");
        currentPlayer.classList.add("audio");
    const audio = new Audio(sounds[i]);
    //console.log(audio);
    if(currentlyPlayingAudio){
        currentlyPlayingAudio.pause();
        currentlyPlayingAudio.currentTime = 0;
    }
    audio.play();
    currentlyPlayingAudio = audio;
    if(prev == true){
        for(let i = 0;i<7;i++){
            let ele = document.getElementById(`${i+1}`);    
            let audi = ele;
            audi.classList.remove('red');
            audi.classList.add('audio');
        }
        prev = false;
    }
    // removing players
        if (String(audio.src) == String(losingAudio.src)) {
            players.splice(indexToRemove, 1);
            //console.log(players)
            Eliminatedbtn = btn;
            Eliminatedbtn.classList.remove("audio");
            Eliminatedbtn.classList.add("red");
            prev = true;
            let pUI = document.getElementById(`player${indexToRemove + 1}`);
            pUI.remove();
            let playa = document.getElementsByClassName("child");
            //console.log(playa);
            for (let j = 0; j < playa.length; j++) {
                playa[j].id = `player${j+1}`;
                //console.log(playa[j].id);
            }
        }
    //
    if(players.length == 1){
        console.log(`winner ${players[0]}`);
    }
    console.log(indexToRemove);
    if (indexToRemove == players.length-1 || indexToRemove == players.length) {
        indexToRemove = -1;
    }
    indexToRemove++;
    shuffleSounds();
    //check();
    });
}
