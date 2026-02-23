// ================= CATEGORIES DIRECTEMENT DANS JS =================
let usedWords = [];
let lastImpostorIndex = null;
let categories = {

  "Joueurs Tunisien": [
    "Wahbi Khazri",
    "Youssef Msakni",
    "Ali Maaloul",
    "Ferjani Sassi",
    "Hannibal Mejbri",
    "Naïm Sliti",
    "Seifeddine Jaziri",
    "Wissem Yahya",
    "Anis Badri",
    "Aymen Abdennour",
    "Saber Khlifa",
    "Karim Haggui",
    "Fakherdine Ben Youssef",
    "Hamza Jlasi",
    "Hatem Trabelsi"
  ],

  "Joueurs Internationaux": [
    "Lionel Messi",
    "Cristiano Ronaldo",
    "Kylian Mbappé",
    "Neymar",
    "Erling Haaland",
    "Kevin De Bruyne",
    "Mohamed Salah",
    "Riyadh Mahrez",
    "Robert Lewandowski",
    "Luka Modric",
    "Van Djik",
    "Achref Hakimi",
    "Sadio Mané",
    "Riyadh Mahrez"
  ],

  "Plats Tunisiens": [
    "Couscous",
    "Ojja",
    "Brik",
    "Lablabi",
    "Kafteji",
    "Mloukhiya",
    "Chakchouka",
    "Salade Mechouia",
    "Kamouneya",
    "Malsouka",
    "Jelbena",
    "Kamouneya",
    "Borghol",
    "Rouz"
  ],

  "Métiers": [
    "Médecin",
    "Ingénieur",
    "Avocat",
    "Professeur",
    "Policier",
    "Pilote",
    "Architecte",
    "Journaliste",
    "Développeur",
    "Commerçant",
    "Coiffeur",
    "Mécanicien",
    "Pécheur",
    "Professeur"
  ],

  "Places Célèbres": [
    "Tour Eiffel",
    "Statue de la Liberté",
    "Burj Khalifa",
    "Pyramides de Gizeh",
    "Musée de Jam Tunisie",
    "Plage Rio de Janiero",
    "Times Square New York",
    "Grande Muraille de Chine",
    "Big Ben London ",
    "Montagne Himalaya"
  ]
};

// ================= VARIABLES =================

let selectedCategory = "";
let players = [];
let currentPlayerIndex = 0;
let impostorIndex = 0;
let selectedWord = "";
let revealed = false;

// ================= CATEGORIES =================

function createCategoryButtons() {
  const container = document.getElementById("categoryButtons");
  container.innerHTML = "";

  Object.keys(categories).forEach(category => {
    const btn = document.createElement("button");
    btn.innerText = category;
    btn.onclick = () => selectCategory(category);
    container.appendChild(btn);
  });
}

function selectCategory(category) {
  selectedCategory = category;
  alert("Catégorie choisie : " + category);
}

function randomCategory() {
  const keys = Object.keys(categories);
  const randomIndex = Math.floor(Math.random() * keys.length);
  selectedCategory = keys[randomIndex];
  alert("Catégorie aléatoire : " + selectedCategory);
}

// ================= JOUEURS =================

function addPlayer() {
  const input = document.createElement("input");
  input.placeholder = "Nom joueur";
  document.getElementById("playersInputs").appendChild(input);
}

// ================= START GAME =================

function startGame() {

  if (!selectedCategory) {
    alert("Choisis une catégorie !");
    return;
  }

  const inputs = document.querySelectorAll("#playersInputs input");
  players = [];

  inputs.forEach(input => {
    if (input.value.trim() !== "") {
      players.push(input.value.trim());
    }
  });

  if (players.length < 3) {
    alert("Minimum 3 joueurs !");
    return;
  }

  currentPlayerIndex = 0;
 do {
  impostorIndex = Math.floor(Math.random() * players.length);
} while (impostorIndex === lastImpostorIndex);

lastImpostorIndex = impostorIndex;

  const words = categories[selectedCategory];

// Enlever les mots déjà utilisés
let availableWords = words.filter(word => !usedWords.includes(word));

// Si tous les mots ont été utilisés → reset
if (availableWords.length === 0) {
  usedWords = [];
  availableWords = words;
}

selectedWord = availableWords[Math.floor(Math.random() * availableWords.length)];
usedWords.push(selectedWord);
  document.getElementById("categorySection").classList.add("hidden");

  document.getElementById("setup").classList.add("hidden");
  document.getElementById("revealSection").classList.remove("hidden");

  showPlayerTurn();
}

// ================= TOUR JOUEUR =================

function showPlayerTurn() {
  revealed = false;

  document.querySelector(".flip-card").classList.remove("flipped");

  document.getElementById("playerTurn").innerText =
    "Tour de : " + players[currentPlayerIndex];

  document.getElementById("cardBack").innerText = "";
  document.getElementById("countdown").innerText = "3";
  document.getElementById("nextBtn").classList.add("hidden");
}

// ================= REVEAL =================

function revealWord() {
  if (revealed) return;
  revealed = true;

  let word =
    currentPlayerIndex === impostorIndex
      ? "IMPOSTEUR ❌"
      : selectedWord;

  document.getElementById("cardBack").innerText = word;
  document.querySelector(".flip-card").classList.add("flipped");

  let timeLeft = 3;

  const interval = setInterval(() => {
    timeLeft--;
    document.getElementById("countdown").innerText = timeLeft;

    if (timeLeft === 0) {
      clearInterval(interval);
      document.getElementById("nextBtn").classList.remove("hidden");
    }
  }, 1000);
}

// ================= JOUEUR SUIVANT =================

function nextPlayer() {
  currentPlayerIndex++;

  if (currentPlayerIndex >= players.length) {
    startDiscussion();
  } else {
    showPlayerTurn();
  }
}

// ================= DISCUSSION =================

function startDiscussion() {
  document.getElementById("revealSection").classList.add("hidden");
  document.getElementById("discussionSection").classList.remove("hidden");

  let timeLeft = 120;

  const interval = setInterval(() => {

    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    document.getElementById("discussionTimer").innerText =
      minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(interval);
      document.getElementById("discussionTimer").innerText =
        "Temps écoulé !";
    }

  }, 1000);
}

// ================= VOTE =================

function showVote() {
  document.getElementById("discussionSection").classList.add("hidden");
  document.getElementById("voteSection").classList.remove("hidden");

  const container = document.getElementById("voteButtons");
  container.innerHTML = "";

  players.forEach((player, index) => {
    const btn = document.createElement("button");
    btn.innerText = player;
    btn.onclick = () => endGame(index);
    container.appendChild(btn);
  });
}

// ================= FIN =================

function endGame(votedIndex) {
  document.getElementById("voteSection").classList.add("hidden");
  document.getElementById("resultSection").classList.remove("hidden");

  if (votedIndex === impostorIndex) {
    document.getElementById("resultText").innerText =
      "🎉 Bien joué ! L'imposteur était " + players[impostorIndex];
  } else {
    document.getElementById("resultText").innerText =
      "❌ Mauvais choix ! L'imposteur était " + players[impostorIndex];
  }
}

function restartGame() {
  // Reset des variables du jeu
  currentPlayerIndex = 0;
  impostorIndex = null;
  selectedWord = "";
  revealed = false;

  // Retour à l'écran catégories
  document.getElementById("resultSection").classList.add("hidden");
  document.getElementById("categorySection").classList.remove("hidden");
  document.getElementById("setup").classList.remove("hidden");

}

// ================= INITIALISATION =================

createCategoryButtons();