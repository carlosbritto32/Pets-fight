const buttonPet = document.getElementById("button-pet");
const restartBtn = document.getElementById("button-restart");
const chosenPetPlayer = document.getElementById("pet-player");
const chosenPetEnemy = document.getElementById("pet-enemy");
const cardContainer = document.getElementById("card-container-id");
const sectionSelectPet = document.getElementById("select-pet");
const sectionAttack = document.getElementById("select-attack");
const sectionRestart = document.getElementById("restart");
const playerPetImg = document.getElementById("player-pet-img");
const enemyPetImg = document.getElementById("enemy-pet-img");
const attackButtonContainer = document.getElementById("attack-btn-container");
const spanPlayersLive = document.getElementById("player-lives");
const spanEnemysLive = document.getElementById("enemy-lives");
const messageSection = document.getElementById("result");
const messagePlayer = document.getElementById("msg-player-attack");
const messageEnemy = document.getElementById("msg-enemy-attack");

let battleResult;
let petOption;
let buttonFire;
let buttonWater;
let buttonPlant;
let buttons = [];
let petPlayer;
let petEnemy;
let petsAttacks;
let PetEnemyAttack;
let inputPinky;
let inputPacha;
let inputRatigueya;

let playerAttack = [];
let enemyAttack = [];
let indexPlayerAttack;
let indexEnemyAttack;
let attackOption;

let playersWins = 0;
let enemysWins = 0;

sectionAttack.style.display = "none";
sectionRestart.style.display = "none";

// characters by Class
let pets = [];
class Pet {
  constructor(name, img, healthPoints) {
    this.name = name;
    this.img = img;
    this.healthPoints = healthPoints;
    this.attacks = [];
  }
}

let pinky = new Pet("Pinky", "./assets/pinky.png", 5);
let pacha = new Pet("Pacha", "./assets/pacha.png", 5);
let Ratigueya = new Pet("Ratigueya", "./assets/images.png", 5);

pinky.attacks.push(
  { name: "🔥", id: "button-fire" },
  { name: "🔥", id: "button-fire" },
  { name: "🔥", id: "button-fire" },
  { name: "💧", id: "button-water" },
  { name: "🌱", id: "button-plant" }
);
pacha.attacks.push(
  { name: "💧", id: "button-water" },
  { name: "💧", id: "button-water" },
  { name: "💧", id: "button-water" },
  { name: "🔥", id: "button-fire" },
  { name: "🌱", id: "button-plant" }
);
Ratigueya.attacks.push(
  { name: "🌱", id: "button-plant" },
  { name: "🌱", id: "button-plant" },
  { name: "🌱", id: "button-plant" },
  { name: "🔥", id: "button-fire" },
  { name: "💧", id: "button-water" }
);

pets.push(pinky, pacha, Ratigueya);

pets.forEach((pet) => {
  petOption = `<input type="radio" name="pet" id=${pet.name} />
        <label for=${pet.name} class="pet-card">
          <p>${pet.name}</p>
          <img src=${pet.img} alt=${pet.name} />
        </label>`;

  cardContainer.innerHTML += petOption;

  inputPinky = document.getElementById("Pinky");
  inputPacha = document.getElementById("Pacha");
  inputRatigueya = document.getElementById("Ratigueya");
});

// GAME PLAY - 1.SELECT CHARACTERS 2.SELECT ATTACKS
function selectPet() {
  sectionAttack.style.display = "flex";
  sectionSelectPet.style.display = "none";
  if (inputPinky.checked) {
    chosenPetPlayer.innerHTML = inputPinky.id;
    petPlayer = inputPinky.id;
  } else if (inputPacha.checked) {
    chosenPetPlayer.innerHTML = inputPacha.id;
    petPlayer = inputPacha.id;
  } else if (inputRatigueya.checked) {
    chosenPetPlayer.innerHTML = inputRatigueya.id;
    petPlayer = inputRatigueya.id;
  } else {
    return alert("Select a pet");
  }

  showPetPlayer(petPlayer);
  getAttack(petPlayer);

  selectPetEnemy();
}

function showPetPlayer(petPlayer) {
  pets.forEach((pet) => {
    if (petPlayer === pet.name) {
      playerPetImg.innerHTML = `<img src=${pet.img} alt=${pet.name}></img>`;
    }
  });
}

function getAttack(petPlayer) {
  let attack;
  for (let i = 0; i < pets.length; i++) {
    if (petPlayer === pets[i].name) attack = pets[i].attacks;
  }

  showAttacks(attack);
}

function showAttacks(attack) {
  attack.forEach((atk) => {
    petsAttacks = `<button id=${atk.id} class="btn-attack BtnAttack">${atk.name}</button>`;
    attackButtonContainer.innerHTML += petsAttacks;
  });
  buttonFire = document.getElementById("button-fire");
  buttonWater = document.getElementById("button-water");
  buttonPlant = document.getElementById("button-plant");
  buttons = document.querySelectorAll(".BtnAttack");
}

function attackSequence() {
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      if (e.target.textContent === "🔥") {
        playerAttack.push("fire🔥");
        console.log(playerAttack);
        button.style.background = "#7d9d9c";
        button.disabled = true;
      } else if (e.target.textContent === "💧") {
        playerAttack.push("water💧");
        console.log(playerAttack);
        button.style.background = "#7d9d9c";
        button.disabled = true;
      } else {
        playerAttack.push("plant🌱");
        console.log(playerAttack);
        button.style.background = "#7d9d9c";
        button.disabled = true;
      }
      randomEnemyAttack();
    });
  });
}

function selectPetEnemy() {
  let randomPetEnemy = random(0, pets.length - 1);
  chosenPetEnemy.innerHTML = pets[randomPetEnemy].name;
  PetEnemyAttack = pets[randomPetEnemy].attacks;
  enemyPetImg.innerHTML = `<img src =${pets[randomPetEnemy].img} alt=${pets[randomPetEnemy].name}></img>`;

  attackSequence();
}

function randomEnemyAttack() {
  let randomAttackEnemy = random(0, PetEnemyAttack.length - 1);
  let attk = PetEnemyAttack[randomAttackEnemy].name;
  PetEnemyAttack.splice(randomAttackEnemy, 1);
  if (attk == "🔥") {
    enemyAttack.push("fire🔥");
  } else if (attk == "💧") {
    enemyAttack.push("water💧");
  } else {
    enemyAttack.push("plant🌱");
  }
  console.log("enemy", enemyAttack);
  startFight();
}

function startFight() {
  if (playerAttack.length === 5) {
    battle();
  }
}

function indexBothPlayers(player, enemy) {
  indexPlayerAttack = playerAttack[player];
  indexEnemyAttack = enemyAttack[enemy];
}

function battle() {
  for (let i = 0; i < playerAttack.length; i++) {
    if (playerAttack[i] === enemyAttack[i]) {
      indexBothPlayers(i, i);
      createMessage("DRAW😒");
    } else if (playerAttack[i] == "fire🔥" && enemyAttack[i] == "plant🌱") {
      indexBothPlayers(i, i);
      createMessage("WIN🎊🙌");
      playersWins++;
      spanPlayersLive.innerHTML = playersWins;
    } else if (playerAttack[i] == "water💧" && enemyAttack[i] == "fire🔥") {
      indexBothPlayers(i, i);
      createMessage("WIN🎊🙌");
      playersWins++;
      spanPlayersLive.innerHTML = playersWins;
    } else if (playerAttack[i] == "plant🌱" && enemyAttack[i] == "water💧") {
      indexBothPlayers(i, i);
      createMessage("WIN🎊🙌");
      playersWins++;
      spanPlayersLive.innerHTML = playersWins;
    } else {
      createMessage("LOSE😭");
      enemysWins++;
      spanEnemysLive.innerHTML = enemysWins;
    }
  }

  victorysCounter();
}

function victorysCounter() {
  if (enemysWins == playersWins) {
    finalMessage("it's a DRAW");
  } else if (enemysWins > playersWins) {
    finalMessage("Sadly your enemy beat you😭");
  } else {
    finalMessage("Congratulations! you beat your enemys ass🎊🙌");
  }
}

function createMessage(battleResult) {
  let msgPlayer = document.createElement("p");
  let msgEnemy = document.createElement("p");

  messageSection.innerHTML = battleResult;
  msgPlayer.innerHTML = indexPlayerAttack;
  msgEnemy.innerHTML = indexEnemyAttack;

  messagePlayer.appendChild(msgPlayer);
  messageEnemy.appendChild(msgEnemy);
}

function finalMessage(finalResult) {
  messageSection.innerHTML = finalResult;

  sectionRestart.style.display = "block";
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function restartGame() {
  location.reload();
}

// eventListeners
buttonPet.addEventListener("click", selectPet);
restartBtn.addEventListener("click", restartGame);
