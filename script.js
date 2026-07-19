// ==========================================================================
// ☕ CAFÉ IMPOSTEUR V2 - CORE ENGINE & GAME CLIENT
// ==========================================================================

// Global Default Game Pack Definitions (Word Pairs: [CitizenWord, UndercoverWord])
const DEFAULT_CATEGORIES = {
  "Plats Tunisiens 🌶️": [
    ["Couscous", "Ojja"],
    ["Brik", "Fricassé"],
    ["Lablabi", "Kafteji"],
    ["Mloukhiya", "Kamouneya"],
    ["Chakchouka", "Salade Mechouia"],
    ["Chapaty", "Makloub"],
    ["Bambalouni", "Ftaiir"]
  ],
  "Joueurs Arabes / TN ⚽": [
    ["Wahbi Khazri", "Youssef Msakni"],
    ["Ali Maaloul", "Ferjani Sassi"],
    ["Hannibal Mejbri", "Naïm Sliti"],
    ["Hatem Trabelsi", "Karim Haggui"],
    ["Sadio Mané", "Mohamed Salah"],
    ["Riyad Mahrez", "Youssef Belaïli"]
  ],
  "Joueurs Internationaux 🌟": [
    ["Messi", "Ronaldo"],
    ["Mbappé", "Haaland"],
    ["Neymar", "Vinicius Jr"],
    ["Zidane", "Platini"],
    ["Benzema", "Lewandowski"],
    ["De Bruyne", "Luka Modric"],
    ["Courtois", "Manuel Neuer"]
  ],
  "Métiers de Rêve 💼": [
    ["Médecin", "Infirmier"],
    ["Ingénieur", "Développeur"],
    ["Avocat", "Juge"],
    ["Policier", "Militaire"],
    ["Pilote", "Astronaute"],
    ["Architecte", "Designer"],
    ["Professeur", "Formateur"]
  ],
  "Places Célèbres 🌍": [
    ["Tour Eiffel", "Arc de Triomphe"],
    ["Statue de la Liberté", "Empire State"],
    ["Burj Khalifa", "Eiffel Tower"],
    ["Pyramides de Gizeh", "Grand Sphinx"],
    ["Colisée de Rome", "Parthénon"],
    ["Sidi Bou Saïd", "La Marsa"]
  ],
  "Animaux 🦁": [
    ["Lion", "Tigre"],
    ["Chien", "Chat"],
    ["Éléphant", "Rhinocéros"],
    ["Dauphin", "Requin"],
    ["Aigle", "Hibou"],
    ["Serpent", "Lézard"],
    ["Gorille", "Chimpanzé"]
  ],
  "Objets de Poche 📱": [
    ["Téléphone", "Tablette"],
    ["Clés", "Portefeuille"],
    ["Stylo", "Crayon"],
    ["Montre", "Bracelet"],
    ["Écouteurs", "Casque audio"],
    ["Lunettes", "Lentilles"]
  ]
};

// Preset Tunisian and popular names for fast play setup
const PRESET_NAMES = [
  "Khalil", "Youssef", "Sonia", "Firas", "Rania", "Ahmed",
  "Meriam", "Amin", "Selma", "Wissem", "Farah", "Anis"
];

// ==========================================================================
// 🔊 SOUND EFFECTS SYNTHESIZER (WEB AUDIO API)
// ==========================================================================
class SoundSynthesizer {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  isSoundEnabled() {
    return document.getElementById("soundToggle").checked;
  }

  playTap() {
    if (!this.isSoundEnabled()) return;
    this.init();
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.08);
    
    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }

  playFlip() {
    if (!this.isSoundEnabled()) return;
    this.init();
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.type = "triangle";
    osc.frequency.setValueAtTime(300, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(900, this.ctx.currentTime + 0.35);
    
    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.005, this.ctx.currentTime + 0.35);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.35);
  }

  playTimerTick() {
    if (!this.isSoundEnabled()) return;
    this.init();
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(600, this.ctx.currentTime);
    
    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  playTimerEnd() {
    if (!this.isSoundEnabled()) return;
    this.init();
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(220, this.ctx.currentTime);
    osc.frequency.setValueAtTime(180, this.ctx.currentTime + 0.15);
    osc.frequency.setValueAtTime(220, this.ctx.currentTime + 0.3);
    
    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.6);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.6);
  }

  playVictory() {
    if (!this.isSoundEnabled()) return;
    this.init();
    
    const times = [0, 0.1, 0.2, 0.3, 0.4];
    const freqs = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C major chord arpeggio
    
    times.forEach((t, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freqs[i], this.ctx.currentTime + t);
      
      gain.gain.setValueAtTime(0.0, this.ctx.currentTime + t);
      gain.gain.linearRampToValueAtTime(0.1, this.ctx.currentTime + t + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + t + 0.4);
      
      osc.start(this.ctx.currentTime + t);
      osc.stop(this.ctx.currentTime + t + 0.4);
    });
  }

  playDefeat() {
    if (!this.isSoundEnabled()) return;
    this.init();
    
    const times = [0, 0.15, 0.3];
    const freqs = [349.23, 311.13, 261.63]; // Descending sad minor chord notes
    
    times.forEach((t, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(freqs[i], this.ctx.currentTime + t);
      
      gain.gain.setValueAtTime(0.0, this.ctx.currentTime + t);
      gain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + t + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + t + 0.5);
      
      osc.start(this.ctx.currentTime + t);
      osc.stop(this.ctx.currentTime + t + 0.5);
    });
  }
}

const soundSynth = new SoundSynthesizer();

// Haptic vibration proxy
function triggerHaptic(pattern) {
  const checkbox = document.getElementById("vibrationToggle");
  if (checkbox && checkbox.checked && navigator.vibrate) {
    navigator.vibrate(pattern);
  }
}

// ==========================================================================
// 🛠️ GAME MODEL & STATE
// ==========================================================================

let gameCategories = {};
let selectedCategoryName = "";
let customWordPairs = []; // Form storage for editing

// Live Game variables
let players = [];
let assignedRoles = []; // { name, role: 'citoyen'|'infiltre'|'imposteur', word: string }
let curRevealIndex = 0;
let revealed = false;
let memoTimerId = null;

// Settings Options (Persisted to localStorage)
let settingsOptions = {
  impostors: 1,
  useUndercover: true,
  timerDuration: 120, // seconds
  soundEnabled: true,
  vibrationEnabled: true
};

// Timer Variables
let timerRemaining = 0;
let timerIntervalId = null;
let timerPaused = false;

// Choice variables for final guessing stage
let currentSecretPair = null; // [CitoyenWord, InfiltreWord]
let votedPlayerIndex = -1;

// ==========================================================================
// 🔌 INITIALIZATION & LOCALSTORAGE SYNC
// ==========================================================================

window.addEventListener("DOMContentLoaded", () => {
  loadCustomCategories();
  loadSavedSettings();
  loadSavedPlayersList();
  
  // Create setup view options
  renderCategoryGrid();
  updateSetupPanelsState();

  // Attach tap sounds to general UI clickables
  document.querySelectorAll("button, select, input[type='checkbox']").forEach(elem => {
    elem.addEventListener("click", () => {
      soundSynth.playTap();
    });
  });
});

// Switch screens with smooth animation support
function showScreen(screenId) {
  const screens = document.querySelectorAll(".screen");
  const activeScreen = document.querySelector(".screen.active");

  if (activeScreen) {
    activeScreen.style.opacity = "0";
    activeScreen.style.transform = "scale(0.97) translateY(8px)";
    setTimeout(() => {
      activeScreen.classList.add("hidden");
      activeScreen.classList.remove("active");

      const target = document.getElementById(screenId);
      target.classList.remove("hidden");
      target.style.display = "flex"; // Force layout
      
      // Force repaint
      target.offsetHeight;
      
      target.classList.add("active");
      target.style.opacity = "1";
      target.style.transform = "scale(1) translateY(0)";
    }, 150);
  } else {
    const target = document.getElementById(screenId);
    target.classList.remove("hidden");
    target.classList.add("active");
    target.style.opacity = "1";
    target.style.transform = "scale(1) translateY(0)";
  }
}

// Setup top navbar tabs
function switchSetupTab(tabName) {
  // Update nav class
  document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
  if (tabName === 'players') document.getElementById("tabPlayers").classList.add("active");
  if (tabName === 'settings') document.getElementById("tabSettings").classList.add("active");
  if (tabName === 'categories') document.getElementById("tabCategories").classList.add("active");

  // Show corresponding pane
  document.querySelectorAll(".setup-pane").forEach(pane => pane.classList.remove("active"));
  if (tabName === 'players') document.getElementById("panePlayers").classList.add("active");
  if (tabName === 'settings') document.getElementById("paneSettings").classList.add("active");
  if (tabName === 'categories') document.getElementById("paneCategories").classList.add("active");
}

// Open rules modal helper
function openRulesModal() {
  soundSynth.playTap();
  document.getElementById("rulesModal").classList.remove("hidden");
}
function closeRulesModal() {
  document.getElementById("rulesModal").classList.add("hidden");
}

// ==========================================================================
// 📂 CATEGORIES ENGINE (MERGING DEFAULT + CUSTOMS)
// ==========================================================================

function loadCustomCategories() {
  let customs = {};
  try {
    const stored = localStorage.getItem("impostor_custom_categories");
    if (stored) {
      customs = JSON.parse(stored);
    }
  } catch (err) {
    console.error("Erreur de chargement des catégories personnalisées", err);
  }
  
  // Merge
  gameCategories = Object.assign({}, DEFAULT_CATEGORIES, customs);
}

function renderCategoryGrid() {
  const container = document.getElementById("categoryGrid");
  container.innerHTML = "";

  Object.keys(gameCategories).forEach((categoryName, index) => {
    const card = document.createElement("div");
    card.className = "category-card";
    
    // Choose selected if none set
    if (!selectedCategoryName && index === 0) {
      selectedCategoryName = categoryName;
    }
    
    if (categoryName === selectedCategoryName) {
      card.classList.add("selected");
    }

    // Determine an emoji
    let emoji = "🎲";
    if (categoryName.includes("🌶️") || categoryName.toLowerCase().includes("plat")) emoji = "🍲";
    else if (categoryName.includes("⚽") || categoryName.toLowerCase().includes("foot")) emoji = "⚽";
    else if (categoryName.includes("🌟") || categoryName.toLowerCase().includes("inter")) emoji = "💫";
    else if (categoryName.includes("💼") || categoryName.toLowerCase().includes("métier")) emoji = "👨‍🔧";
    else if (categoryName.includes("🌍") || categoryName.toLowerCase().includes("plac") || categoryName.toLowerCase().includes("voyage")) emoji = "🗽";
    else if (categoryName.includes("🦁") || categoryName.toLowerCase().includes("anim")) emoji = "🐨";
    else if (categoryName.includes("📱") || categoryName.toLowerCase().includes("obj")) emoji = "🔑";

    const count = gameCategories[categoryName].length;

    card.innerHTML = `
      <span class="cat-emoji">${emoji}</span>
      <span class="cat-name">${categoryName.replace(/[^\w\s/TN🌶️⚽🌟💼🌍🦁📱]/g, '')}</span>
      <span class="cat-count">${count} mots</span>
    `;

    card.onclick = () => {
      selectedCategoryName = categoryName;
      soundSynth.playTap();
      
      // Toggle selected class
      document.querySelectorAll(".category-card").forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");
    };

    container.appendChild(card);
  });
}

// ==========================================================================
// 👥 SUSPECTS / PLAYERS LIST SETUP
// ==========================================================================

function loadSavedPlayersList() {
  try {
    const stored = localStorage.getItem("impostor_players_list");
    if (stored) {
      const list = JSON.parse(stored);
      if (list && list.length >= 3) {
        players = list;
        renderPlayersInputs();
        return;
      }
    }
  } catch (e) {
    console.error(e);
  }
  
  // Default values
  players = ["Khalil", "Youssef", "Sonia", "Firas"];
  renderPlayersInputs();
}

function renderPlayersInputs() {
  const container = document.getElementById("playersInputs");
  container.innerHTML = "";

  players.forEach((pName, index) => {
    const field = document.createElement("div");
    field.className = "player-field";
    field.id = `pField_${index}`;

    field.innerHTML = `
      <span class="p-number">${index + 1}</span>
      <input type="text" value="${pName}" placeholder="Nom du joueur" onchange="updatePlayerName(${index}, this.value)">
      <button class="delete-field-btn" onclick="removePlayerField(${index})" title="Supprimer">
        <svg viewBox="0 0 24 24" style="width:16px; height:16px; fill:currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
      </button>
    `;
    container.appendChild(field);
  });

  const countBadge = document.getElementById("playerCountBadge");
  countBadge.innerText = players.length + " joueurs";
}

function updatePlayerName(index, val) {
  players[index] = val.trim();
  savePlayersListState();
}

function addPlayerField() {
  // Find a name not yet in players
  let nextPreset = "";
  for (let name of PRESET_NAMES) {
    if (!players.includes(name)) {
      nextPreset = name;
      break;
    }
  }
  if (!nextPreset) {
    nextPreset = "Joueur " + (players.length + 1);
  }

  players.push(nextPreset);
  renderPlayersInputs();
  savePlayersListState();
  
  // Scroll to bottom
  const container = document.getElementById("playersInputs");
  container.scrollTop = container.scrollHeight;
  triggerHaptic([50]);
}

function removePlayerField(index) {
  if (players.length <= 3) {
    alert("Vous devez avoir au moins 3 joueurs pour faire une partie !");
    return;
  }
  players.splice(index, 1);
  renderPlayersInputs();
  savePlayersListState();
  triggerHaptic([50]);
}

function loadDefaultPlayers() {
  // Random shuffle presets
  let shuffled = [...PRESET_NAMES].sort(() => 0.5 - Math.random());
  players = shuffled.slice(0, 5); // default to 5 players
  renderPlayersInputs();
  savePlayersListState();
  triggerHaptic([60, 40]);
}

function savePlayersListState() {
  localStorage.setItem("impostor_players_list", JSON.stringify(players));
}

// ==========================================================================
// ⚙️ SETTINGS CONFIGURATION ENGINE
// ==========================================================================

function loadSavedSettings() {
  try {
    const storedStatus = localStorage.getItem("impostor_settings_options");
    if (storedStatus) {
      settingsOptions = Object.assign({}, settingsOptions, JSON.parse(storedStatus));
    }
  } catch (err) {
    console.error(err);
  }
  
  // Sync to elements
  document.getElementById("impostorsCount").innerText = settingsOptions.impostors;
  document.getElementById("infiltrateToggle").checked = settingsOptions.useUndercover;
  document.getElementById("timerDurationSelect").value = settingsOptions.timerDuration;
  document.getElementById("soundToggle").checked = settingsOptions.soundEnabled;
  document.getElementById("vibrationToggle").checked = settingsOptions.vibrationEnabled;
}

function changeSetting(type, val) {
  soundSynth.playTap();
  if (type === 'impostors') {
    let count = settingsOptions.impostors + val;
    // Limits
    if (count < 1) count = 1;
    // Cap based on minimum requirements: impostors + undercover (if active) <= players - 2
    let minimumCitizenCount = 2; // at least 2 citizen players are needed to talk to each other
    let maxImpostors = players.length - minimumCitizenCount;
    if (settingsOptions.useUndercover) {
      maxImpostors -= 1; // reserve 1 spot for undercover
    }
    
    if (count > maxImpostors) {
      if (maxImpostors < 1) {
        alert("Ajoutez des joueurs pour pouvoir mettre plus d'imposteurs !");
        return;
      }
      count = maxImpostors;
    }
    
    settingsOptions.impostors = count;
    document.getElementById("impostorsCount").innerText = count;
  }
  saveOptionsState();
}

function updateSetupPanelsState() {
  // Hook changes in parameters
  const toggleUndercover = document.getElementById("infiltrateToggle");
  if (toggleUndercover) {
    toggleUndercover.addEventListener("change", () => {
      settingsOptions.useUndercover = toggleUndercover.checked;
      // Re-validate settingsOptions.impostors against limits
      let minimumCitizenCount = 2;
      let maxImpostors = players.length - minimumCitizenCount;
      if (settingsOptions.useUndercover) {
        maxImpostors -= 1;
      }
      if (settingsOptions.impostors > maxImpostors) {
        settingsOptions.impostors = Math.max(1, maxImpostors);
        document.getElementById("impostorsCount").innerText = settingsOptions.impostors;
      }
      saveOptionsState();
    });
  }
}

function saveOptionsState() {
  settingsOptions.impostors = parseInt(document.getElementById("impostorsCount").innerText);
  settingsOptions.useUndercover = document.getElementById("infiltrateToggle").checked;
  settingsOptions.timerDuration = parseInt(document.getElementById("timerDurationSelect").value);
  settingsOptions.soundEnabled = document.getElementById("soundToggle").checked;
  settingsOptions.vibrationEnabled = document.getElementById("vibrationToggle").checked;

  localStorage.setItem("impostor_settings_options", JSON.stringify(settingsOptions));
}

// ==========================================================================
// 🎲 GAME PLAY ENGINE (DISTRIBUTION & PASS SCANS)
// ==========================================================================

function startGame() {
  soundSynth.playTap();
  triggerHaptic([80, 50]);
  
  // Clean names
  players = players.map(p => p.trim()).filter(p => p !== "");
  if (players.length < 3) {
    alert("Il faut au moins 3 joueurs pour démarrer !");
    return;
  }
  savePlayersListState();

  // Validate settings based on player list size
  let neededCit = 2;
  let spaceLeft = players.length - neededCit;
  let impCount = settingsOptions.impostors;
  let underCount = settingsOptions.useUndercover ? 1 : 0;
  
  if (impCount + underCount > spaceLeft) {
    // Override settings to fit player size
    if (players.length === 3) {
      // 3 players always forces: 1 Impostor, 0 Undercover, 2 Citizens
      impCount = 1;
      underCount = 0;
      settingsOptions.useUndercover = false;
      document.getElementById("infiltrateToggle").checked = false;
    } else {
      // 4 players allows: 1 Impostor, 0 Undercover, 3 Citizens OR 1 Impostor, 1 Undercover, 2 Citizens
      impCount = 1;
      if (settingsOptions.useUndercover) underCount = 1;
    }
    
    settingsOptions.impostors = impCount;
    document.getElementById("impostorsCount").innerText = impCount;
    saveOptionsState();
  }

  // Load words of this category
  const wordsList = gameCategories[selectedCategoryName];
  if (!wordsList || wordsList.length === 0) {
    alert("Aucun mot trouvé dans cette catégorie. Ajoutez des mots ou changez de thème !");
    return;
  }

  // Select random pair
  const randomIndex = Math.floor(Math.random() * wordsList.length);
  const selectedPair = wordsList[randomIndex]; // Format: [CitizenWord, UndercoverWord]
  currentSecretPair = selectedPair;

  const citizenWord = selectedPair[0];
  const undercoverWord = (selectedPair.length > 1) ? selectedPair[1] : selectedPair[0];

  // Distribute roles
  // Initialize role pool
  let rolePool = [];
  for (let i = 0; i < impCount; i++) {
    rolePool.push({ role: 'impostor', word: 'IMPOSTEUR ❌' });
  }
  for (let i = 0; i < underCount; i++) {
    rolePool.push({ role: 'undercover', word: undercoverWord });
  }
  
  const remainingSize = players.length - rolePool.length;
  for (let i = 0; i < remainingSize; i++) {
    rolePool.push({ role: 'citizen', word: citizenWord });
  }

  // Shuffle roles randomly
  rolePool.sort(() => 0.5 - Math.random());

  // Merge mapping
  assignedRoles = players.map((pName, index) => {
    return {
      name: pName,
      role: rolePool[index].role,
      word: rolePool[index].word
    };
  });

  // Prepare pass loops
  curRevealIndex = 0;
  loadPassScreen();
}

function loadPassScreen() {
  revealed = false;
  
  if (curRevealIndex >= players.length) {
    // Everyone saw their roles, start debate timer
    loadDiscussionScreen();
    return;
  }

  const pName = players[curRevealIndex];
  document.getElementById("passPlayerName").innerText = pName;
  
  // Set random graphic emojis for suspense
  const emojis = ["🕵️‍♀️", "🕵️‍♂️", "🤫", "👽", "💡", "☕", "🔑"];
  document.getElementById("passIcon").innerText = emojis[Math.floor(Math.random() * emojis.length)];

  showScreen("passScreen");
}

function proceedToReveal() {
  soundSynth.playFlip();
  triggerHaptic([70]);

  const playerObj = assignedRoles[curRevealIndex];

  // Configure flip card details
  document.getElementById("revealPlayerTitle").innerText = playerObj.name;
  
  const cardBackObj = document.getElementById("cardBack");
  cardBackObj.className = "flip-card-back"; // reset class list
  
  const wordDisplay = document.getElementById("roleWord");
  const detailDisplay = document.getElementById("roleDesc");
  const badgeDisplay = document.getElementById("roleBadge");

  // Reset card state
  document.getElementById("flipCard").classList.remove("flipped");
  document.getElementById("revealNextBtn").classList.add("hidden");
  document.getElementById("revealActionHelp").innerText = "Tapez sur la carte pour découvrir votre mot secret.";

  // Fill in role specifications
  if (playerObj.role === 'impostor') {
    cardBackObj.classList.add("card-impostor");
    badgeDisplay.innerText = "Imposteur 👽";
    badgeDisplay.className = "role-badge role-badge-impostor";
    wordDisplay.innerText = "Tu es l'Imposteur !";
    wordDisplay.style.fontSize = "22px";
    detailDisplay.innerHTML = "Vous n'avez pas de mot secret.<br>Écoutez bien les autres, faites semblant d'avoir le mot, et tentez de deviner le thème.";
  } else if (playerObj.role === 'undercover') {
    cardBackObj.classList.add("card-infiltre");
    badgeDisplay.innerText = "Infiltré 🕵️‍♂️";
    badgeDisplay.className = "role-badge role-badge-infiltre";
    wordDisplay.innerText = playerObj.word;
    wordDisplay.style.fontSize = "32px";
    detailDisplay.innerHTML = "Décrivez votre mot de manière subtile.<br>Attention, un autre joueur a un mot voisin proche !";
  } else {
    cardBackObj.classList.add("card-citoyen");
    badgeDisplay.innerText = "Citoyen 🧑‍🤝‍🧑";
    badgeDisplay.className = "role-badge role-badge-citoyen";
    wordDisplay.innerText = playerObj.word;
    wordDisplay.style.fontSize = "32px";
    detailDisplay.innerHTML = "Vous avez le mot majoritaire de la table.<br>Démasquez l'imposteur ou l'infiltré qui s'y oppose.";
  }

  showScreen("revealScreen");
}

function revealRoleWord() {
  if (revealed) return;
  revealed = true;

  soundSynth.playFlip();
  triggerHaptic([60, 40]);

  const card = document.getElementById("flipCard");
  card.classList.add("flipped");

  document.getElementById("revealActionHelp").innerText = "Mémorisez votre mot avant la fin du décompte...";

  // Standard Auto-countdown bar layout (prevents screen sitting open long or peek leaks)
  const bar = document.getElementById("memoBar");
  bar.style.transition = "none";
  bar.style.transform = "scaleX(1)";
  
  // Trigger layout float force
  bar.offsetHeight; 
  
  bar.style.transition = "transform 4s linear";
  bar.style.transform = "scaleX(0)";

  // Wait 4 seconds then force hide or enable Next
  memoTimerId = setTimeout(() => {
    document.getElementById("revealNextBtn").classList.remove("hidden");
    document.getElementById("revealActionHelp").innerText = "Vous pouvez passer le téléphone au joueur suivant.";
  }, 4000);
}

function finishRoleReveal() {
  if (memoTimerId) clearTimeout(memoTimerId);
  curRevealIndex++;
  loadPassScreen();
}

// ==========================================================================
// ⏳ DISCUSSION TIMER & SUSPICION LAYOUTS
// ==========================================================================

function loadDiscussionScreen() {
  // Clear any existing timer loops
  if (timerIntervalId) clearInterval(timerIntervalId);

  timerPaused = false;
  const svgPlayPause = document.getElementById("svgPlayPause");
  svgPlayPause.innerHTML = `<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>`; // Pause symbol

  const durationSec = settingsOptions.timerDuration;
  timerRemaining = durationSec;
  
  updateTimerUI();

  // Load Suspicion Tracker checklist
  const grid = document.getElementById("discussionChecklist");
  grid.innerHTML = "";
  
  players.forEach((pName, idx) => {
    const card = document.createElement("div");
    card.className = "suspect-row";
    card.id = `suspCheck_${idx}`;
    card.innerHTML = `
      <div class="suspect-check">✓</div>
      <span class="s-name">${pName}</span>
    `;
    card.onclick = () => {
      soundSynth.playTap();
      card.classList.toggle("safe");
      triggerHaptic([30]);
    };
    grid.appendChild(card);
  });

  showScreen("discussionScreen");

  if (durationSec > 0) {
    document.getElementById("timerStatusLabel").innerText = "Discussion";
    startDebateCountdown();
  } else {
    document.getElementById("countdownText").innerText = "∞";
    document.getElementById("timerStatusLabel").innerText = "Débats Libres";
    document.getElementById("btnPauseResume").style.display = "none";
  }
}

function startDebateCountdown() {
  timerIntervalId = setInterval(() => {
    if (timerPaused) return;

    timerRemaining--;
    updateTimerUI();

    // Woodblock ticking when remaining time gets low
    if (timerRemaining > 0 && timerRemaining <= 10) {
      soundSynth.playTimerTick();
      triggerHaptic([40]);
    }

    if (timerRemaining <= 0) {
      clearInterval(timerIntervalId);
      soundSynth.playTimerEnd();
      triggerHaptic([200, 100, 200]);
      
      document.getElementById("countdownText").innerText = "00:00";
      document.getElementById("timerStatusLabel").innerText = "Vote Immédiat !";
    }
  }, 1000);
}

function updateTimerUI() {
  if (settingsOptions.timerDuration === 0) return;

  const min = Math.floor(timerRemaining / 60);
  const sec = timerRemaining % 60;
  document.getElementById("countdownText").innerText = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;

  // SVG ring offset calculation
  const circle = document.getElementById("timerProgressCircle");
  const totalLength = 596.9; // 2 * PI * 95
  const fraction = timerRemaining / settingsOptions.timerDuration;
  const offset = totalLength - (fraction * totalLength);
  
  circle.style.strokeDashoffset = Math.max(0, Math.min(totalLength, offset));

  // Visual Warn color turns red in last 10s
  if (timerRemaining <= 10) {
    circle.style.stroke = "var(--accent-red)";
  } else {
    circle.style.stroke = "var(--accent-primary)";
  }
}

function toggleTimer() {
  soundSynth.playTap();
  timerPaused = !timerPaused;
  const svgPlayPause = document.getElementById("svgPlayPause");
  if (timerPaused) {
    // Play symbol
    svgPlayPause.innerHTML = `<path d="M8 5v14l11-7z"/>`;
    document.getElementById("timerStatusLabel").innerText = "PAUSE";
  } else {
    // Pause symbol
    svgPlayPause.innerHTML = `<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>`;
    document.getElementById("timerStatusLabel").innerText = "Discussion";
  }
}

function addExtraTime(amount) {
  soundSynth.playTap();
  timerRemaining += amount;
  
  // Make sure limit isn't broken
  if (timerRemaining > settingsOptions.timerDuration) {
    settingsOptions.timerDuration = timerRemaining; // expand dynamically mapping
  }
  updateTimerUI();
}

// ==========================================================================
// 🗳️ VOTING SCREEN ENGINE
// ==========================================================================

function proceedToVote() {
  if (timerIntervalId) clearInterval(timerIntervalId);
  soundSynth.playTap();

  const grid = document.getElementById("voteGrid");
  grid.innerHTML = "";

  assignedRoles.forEach((playerObj, index) => {
    const card = document.createElement("div");
    card.className = "vote-candidate-card";
    
    // Set random avatar icon for each player
    const avatars = ["☕", "🥐", "🍩", "🧊", "🍋", "🍫", "🥑"];
    const avatar = avatars[index % avatars.length];

    card.innerHTML = `
      <div class="candidate-info">
        <span class="cand-avatar">${avatar}</span>
        <span class="cand-name">${playerObj.name}</span>
      </div>
      <span class="cand-action">Voter 👀</span>
    `;

    card.onclick = () => {
      castVoteElimination(index);
    };

    grid.appendChild(card);
  });

  showScreen("voteScreen");
}

function castVoteElimination(index) {
  votedPlayerIndex = index;
  const targetObj = assignedRoles[index];
  
  soundSynth.playTap();
  triggerHaptic([100]);

  if (targetObj.role === 'impostor') {
    // Impostor was successfully voted out. They have a final guess.
    loadGuessTheWordScreen(index);
  } else {
    // An Innocent or Undercover was voted out instead => Impostor wins.
    concludeGame(false, `Le groupe a éliminé ${targetObj.name} (${targetObj.role === 'undercover' ? "un Infiltré" : "un Citoyen"}). L'Imposteur triomphe !`);
  }
}

// ==========================================================================
// ⭐ GUESS SCREEN PACK FOR THE IMPOSTOR
// ==========================================================================

function loadGuessTheWordScreen(votedIndex) {
  const impostorObj = assignedRoles[votedIndex];
  document.getElementById("guessImpostorName").innerText = impostorObj.name;

  const choicesContainer = document.getElementById("guessOptionsList");
  choicesContainer.innerHTML = "";

  // Compile options (1 correct citizen word + 3 distractors)
  const citizenWord = currentSecretPair[0];
  const listChoices = [citizenWord];

  // Distractor 1: Undercover word if separate
  if (currentSecretPair.length > 1 && currentSecretPair[1] !== citizenWord) {
    listChoices.push(currentSecretPair[1]);
  }

  // Gather other words from this active category
  const siblings = gameCategories[selectedCategoryName].map(pair => pair[0]);
  const others = siblings.filter(w => w !== citizenWord && !listChoices.includes(w));

  // Dynamic filling of distractors
  let shuffledOthers = others.sort(() => 0.5 - Math.random());
  while (listChoices.length < 4) {
    if (shuffledOthers.length > 0) {
      listChoices.push(shuffledOthers.pop());
    } else {
      // General backup distractors if Category size is too low
      const backupMots = ["Croissant", "Espresso", "Chocolat", "Football", "Cinéma", "Plage"];
      const bWord = backupMots[Math.floor(Math.random() * backupMots.length)];
      if (!listChoices.includes(bWord)) {
        listChoices.push(bWord);
      }
    }
  }

  // Shuffle choice listing
  const finalChoicesShuffled = listChoices.sort(() => 0.5 - Math.random());

  finalChoicesShuffled.forEach(choice => {
    const btn = document.createElement("button");
    btn.innerText = choice;
    btn.onclick = () => {
      submitWordGuess(choice);
    };
    choicesContainer.appendChild(btn);
  });

  showScreen("guessScreen");
}

function submitWordGuess(word) {
  const correctCitWord = currentSecretPair[0];
  const votedImpName = assignedRoles[votedPlayerIndex].name;

  if (word === correctCitWord) {
    // Impostor successfully guessed the word
    concludeGame(false, `L'Imposteur (${votedImpName}) a été démasqué mais a deviné le mot secret : "${correctCitWord}" !`);
  } else {
    // Failed guess
    concludeGame(true, `L'Imposteur (${votedImpName}) a échoué sa devinette en choisissant "${word}". Le mot était "${correctCitWord}" !`);
  }
}

// ==========================================================================
// 🏆 FINAL GAME CONCLUSION SCREEN
// ==========================================================================

function concludeGame(citizensWon, narrativeText) {
  const resultBanner = document.getElementById("resultBanner");
  const title = document.getElementById("resultSummaryTitle");
  const subtitle = document.getElementById("resultSummarySubtitle");
  const emoji = document.getElementById("resultEmoji");

  if (citizensWon) {
    soundSynth.playVictory();
    triggerHaptic([100, 50, 100, 50, 200]);
    
    resultBanner.style.background = "radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 80%)";
    title.innerText = "Victoire des Citoyens ! 🎉";
    emoji.innerText = "🏆";
    subtitle.innerText = narrativeText;
  } else {
    soundSynth.playDefeat();
    triggerHaptic([300, 150, 300]);

    resultBanner.style.background = "radial-gradient(circle, rgba(239, 68, 68, 0.2) 0%, transparent 80%)";
    title.innerText = "Victoire de l'Imposteur ! 👽";
    emoji.innerText = "😈";
    subtitle.innerText = narrativeText;
  }

  // Populate dynamic summary table
  const listContainer = document.getElementById("summaryList");
  listContainer.innerHTML = "";

  assignedRoles.forEach((playerObj, index) => {
    const row = document.createElement("div");
    row.className = "summary-row";

    let roleLabel = "Citoyen";
    let roleClass = "role-badge-citizen-sm";
    
    if (playerObj.role === 'impostor') {
      roleLabel = "Imposteur";
      roleClass = "role-badge-impostor-sm";
    } else if (playerObj.role === 'undercover') {
      roleLabel = "Infiltré";
      roleClass = "role-badge-undercover-sm";
    }

    row.innerHTML = `
      <div class="summary-player">
        <span class="summary-player-name">${playerObj.name}</span>
        <span class="summary-player-role ${roleClass}">${roleLabel}</span>
      </div>
      <span class="summary-word">${playerObj.word}</span>
    `;

    listContainer.appendChild(row);
  });

  showScreen("resultScreen");
}

function restartSameGame() {
  // Clear timer state
  timerRemaining = 0;
  if (timerIntervalId) clearInterval(timerIntervalId);
  
  startGame();
}

function backToSetup() {
  timerRemaining = 0;
  if (timerIntervalId) clearInterval(timerIntervalId);

  // Return to setup configuration screen
  showScreen("setupScreen");
  switchSetupTab("players");
}

// ==========================================================================
// ✏️ CUSTOM CATEGORIES PACK EDITOR SYSTEM
// ==========================================================================

function openCustomCatScreen() {
  soundSynth.playTap();
  
  // Load custom editor lists
  renderCustomCategoriesList();
  
  // Wipe creation form inputs
  document.getElementById("customCatName").value = "";
  document.getElementById("customWordPairsContainer").innerHTML = "";
  
  // Add initial blank pair
  addCustomWordPairRow();

  showScreen("customCatScreen");
}

function closeCustomCatScreen() {
  soundSynth.playTap();
  // Return to Setup categories tab
  renderCategoryGrid(); // sync changes made
  showScreen("setupScreen");
  switchSetupTab("categories");
}

function addCustomWordPairRow() {
  const container = document.getElementById("customWordPairsContainer");
  const row = document.createElement("div");
  row.className = "word-pair-inputs";
  row.innerHTML = `
    <input type="text" class="word-citoyen" placeholder="Ex: Café">
    <span class="vs-divider">|</span>
    <input type="text" class="word-infiltre" placeholder="Ex: Thé (Optionnel)">
  `;
  container.appendChild(row);
  // Scroll to bottom
  container.scrollTop = container.scrollHeight;
}

function saveCustomCategory() {
  const catNameInput = document.getElementById("customCatName").value.trim();
  if (!catNameInput) {
    alert("Veuillez saisir un nom pour la catégorie.");
    return;
  }

  const rows = document.querySelectorAll("#customWordPairsContainer .word-pair-inputs");
  const wordsArray = [];

  rows.forEach(row => {
    const citWord = row.querySelector(".word-citoyen").value.trim();
    let infWord = row.querySelector(".word-infiltre").value.trim();
    
    if (citWord) {
      if (!infWord) infWord = citWord; // clone if empty
      wordsArray.push([citWord, infWord]);
    }
  });

  if (wordsArray.length === 0) {
    alert("Veuillez ajouter au moins une paire de mots pour cette catégorie.");
    return;
  }

  // Load existing storage
  let currentCustoms = {};
  try {
    const stored = localStorage.getItem("impostor_custom_categories");
    if (stored) currentCustoms = JSON.parse(stored);
  } catch (err) {
    console.error(err);
  }

  // Append & save
  // Format Category Name visually
  let finalCatName = catNameInput;
  if (!finalCatName.match(/[\uD800-\uDFFF].|.$/)) {
    // Add visual block emoji if not present
    finalCatName += " 🎨";
  }
  
  currentCustoms[finalCatName] = wordsArray;
  localStorage.setItem("impostor_custom_categories", JSON.stringify(currentCustoms));

  alert(`La catégorie "${finalCatName}" a été enregistrée avec succès !`);

  // Reload category lists
  loadCustomCategories();
  renderCustomCategoriesList();
  
  // Wipe input fields
  document.getElementById("customCatName").value = "";
  document.getElementById("customWordPairsContainer").innerHTML = "";
  addCustomWordPairRow();
}

function renderCustomCategoriesList() {
  const container = document.getElementById("customCategoriesList");
  container.innerHTML = "";

  // Get only stored custom items
  let customs = {};
  try {
    const stored = localStorage.getItem("impostor_custom_categories");
    if (stored) customs = JSON.parse(stored);
  } catch (e) {
    console.error(e);
  }

  const keys = Object.keys(customs);
  if (keys.length === 0) {
    container.innerHTML = `<p style="font-size:12px; color:var(--text-secondary); text-align:center; padding:10px 0;">Vous n'avez hébergé aucun thème personnalisé.</p>`;
    return;
  }

  keys.forEach(catName => {
    const row = document.createElement("div");
    row.className = "custom-cat-row";
    
    const count = customs[catName].length;

    row.innerHTML = `
      <div class="custom-cat-row-info">
        <span>${catName}</span>
        <span>${count} paires de mots</span>
      </div>
      <button class="trash-btn" onclick="deleteCustomCategory('${catName.replace(/'/g, "\\'")}')" title="Supprimer">
        <svg viewBox="0 0 24 24" style="width:16px; height:16px; fill:currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
      </button>
    `;
    container.appendChild(row);
  });
}

function deleteCustomCategory(catName) {
  if (!confirm(`Voulez-vous vraiment supprimer définitivement la catégorie "${catName}" ?`)) {
    return;
  }

  let customs = {};
  try {
    const stored = localStorage.getItem("impostor_custom_categories");
    if (stored) customs = JSON.parse(stored);
  } catch(e) {
    console.error(e);
  }

  if (customs[catName]) {
    delete customs[catName];
    localStorage.setItem("impostor_custom_categories", JSON.stringify(customs));
    
    // Reload lists
    loadCustomCategories();
    renderCustomCategoriesList();
    triggerHaptic([80]);
  }
}
