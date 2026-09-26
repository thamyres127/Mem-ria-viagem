const ICONS = ["✈️", "🗺️", "🧭", "⛰️", "🏖️", "🗼", "🎡", "⛺"];
const STORAGE_KEY = "memoria-viagem-best";

const boardEl = document.getElementById("board");
const movesEl = document.getElementById("moves");
const timerEl = document.getElementById("timer");
const bestEl = document.getElementById("best");
const restartBtn = document.getElementById("restart");
const winModal = document.getElementById("winModal");
const winSummary = document.getElementById("winSummary");
const playAgainBtn = document.getElementById("playAgain");

let state = {
  flipped: [],
  matched: 0,
  moves: 0,
  seconds: 0,
  timerId: null,
  locked: false,
};

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function formatTime(totalSeconds) {
  const m = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const s = String(totalSeconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function startTimer() {
  clearInterval(state.timerId);
  state.timerId = setInterval(() => {
    state.seconds += 1;
    timerEl.textContent = formatTime(state.seconds);
  }, 1000);
}

function loadBest() {
  const saved = localStorage.getItem(STORAGE_KEY);
  bestEl.textContent = saved ? `${saved} jog.` : "—";
  return saved ? Number(saved) : null;
}

function saveBestIfNeeded() {
  const best = loadBest();
  if (best === null || state.moves < best) {
    localStorage.setItem(STORAGE_KEY, String(state.moves));
    loadBest();
  }
}

function createCard(icon, index) {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.icon = icon;
  card.dataset.index = index;
  card.setAttribute("role", "button");
  card.setAttribute("tabindex", "0");
  card.innerHTML = `
    <div class="card__inner">
      <div class="card__face card__face--back">?</div>
      <div class="card__face card__face--front">${icon}</div>
    </div>`;
  card.addEventListener("click", () => onCardClick(card));
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onCardClick(card); }
  });
  return card;
}

function onCardClick(card) {
  if (state.locked) return;
  if (card.classList.contains("is-flipped") || card.classList.contains("is-matched")) return;
  if (state.flipped.length === 0 && state.moves === 0 && state.seconds === 0) startTimer();

  card.classList.add("is-flipped");
  state.flipped.push(card);

  if (state.flipped.length === 2) {
    state.moves += 1;
    movesEl.textContent = state.moves;
    checkMatch();
  }
}

function checkMatch() {
  const [first, second] = state.flipped;
  const isMatch = first.dataset.icon === second.dataset.icon;

  if (isMatch) {
    first.classList.add("is-matched");
    second.classList.add("is-matched");
    state.flipped = [];
    state.matched += 1;
    if (state.matched === ICONS.length) endGame();
  } else {
    state.locked = true;
    setTimeout(() => {
      first.classList.remove("is-flipped");
      second.classList.remove("is-flipped");
      state.flipped = [];
      state.locked = false;
    }, 800);
  }
}

function endGame() {
  clearInterval(state.timerId);
  saveBestIfNeeded();
  winSummary.textContent = `Você fechou o mapa em ${state.moves} jogadas e ${formatTime(state.seconds)}.`;
  winModal.hidden = false;
}

function init() {
  boardEl.innerHTML = "";
  clearInterval(state.timerId);
  state = { flipped: [], matched: 0, moves: 0, seconds: 0, timerId: null, locked: false };
  movesEl.textContent = "0";
  timerEl.textContent = "00:00";
  winModal.hidden = true;
  loadBest();

  const deck = shuffle([...ICONS, ...ICONS]);
  deck.forEach((icon, i) => boardEl.appendChild(createCard(icon, i)));
}

restartBtn.addEventListener("click", init);
playAgainBtn.addEventListener("click", init);

init();
