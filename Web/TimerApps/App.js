// --- DOM Elements ---
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const modeTextEl = document.getElementById("mode-text");
const modeIndicatorEl = document.getElementById("mode-indicator");
const startStopTextEl = document.getElementById("start-stop-text");
const editModal = document.getElementById("edit-modal");
const modalMinutesInput = document.getElementById("modal-minutes");
const modalSecondsInput = document.getElementById("modal-seconds");
const saveButton = document.getElementById("save-button");
const cancelButton = document.getElementById("cancel-button");
const alarmModal = document.getElementById("stopwatch-alarm-modal");
const closeAlarmButton = document.getElementById("close-alarm-button");
const confettiCanvas = document.getElementById("confetti-canvas");

// --- State Variables ---
let totalSeconds = 5 * 60;
let initialTime = 5 * 60;
let timerInterval = null;
let isRunning = false;
let isStopwatch = false;

// --- Sound & Animation Setup ---
const synth = new Tone.Synth().toDestination();
const myConfetti = confetti.create(confettiCanvas, {
  resize: true,
  useWorker: true,
});

// --- Core Functions ---
function updateDisplay() {
  const minutes = Math.floor(Math.abs(totalSeconds) / 60);
  const seconds = Math.abs(totalSeconds) % 60;
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}

function triggerConfetti() {
  myConfetti({
    particleCount: 150,
    spread: 90,
    origin: { y: 0.6 },
    colors: ["#FFFFFF", "#FFD700", "#ADD8E6", "#FF6347"],
  });
}

function playRingSound() {
  if (Tone.context.state !== "running") {
    Tone.start();
  }
  synth.triggerAttackRelease("C5", "8n", Tone.now());
  synth.triggerAttackRelease("G5", "8n", Tone.now() + 0.2);
}

function startTimer() {
  if (isRunning) return;
  if (!isStopwatch && totalSeconds <= 0) return;

  isRunning = true;
  startStopTextEl.textContent = "Pause Timer";

  timerInterval = setInterval(() => {
    if (isStopwatch) {
      totalSeconds++;
    } else {
      totalSeconds--;
      if (totalSeconds < 0) {
        stopTimer();
        totalSeconds = 0;
        triggerConfetti(); // Fire confetti on countdown end
      }
    }
    updateDisplay();
  }, 1000);
}

function stopTimer() {
  // Trigger alarm ONLY when pausing the stopwatch while it was running
  if (isStopwatch && isRunning) {
    showStopwatchAlarm();
  }
  isRunning = false;
  startStopTextEl.textContent = "Start Timer";
  clearInterval(timerInterval);
}

function resetTimer() {
  stopTimer();
  totalSeconds = isStopwatch ? 0 : initialTime;
  updateDisplay();
}

function toggleMode() {
  isStopwatch = !isStopwatch;
  stopTimer();
  if (isStopwatch) {
    modeTextEl.textContent = "Stopwatch";
    modeIndicatorEl.classList.remove("opacity-0");
    totalSeconds = 0;
  } else {
    modeTextEl.textContent = "Countdown";
    modeIndicatorEl.classList.add("opacity-0");
    totalSeconds = initialTime;
  }
  updateDisplay();
}

modeTextEl.textContent = isStopwatch ? "Stopwatch" : "Countdown";
modeIndicatorEl.classList.toggle("opacity-0", !isStopwatch);

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((err) => {
      console.error(`Error enabling full-screen: ${err.message}`);
    });
  } else {
    if (document.exitFullscreen) document.exitFullscreen();
  }
}

// --- Modal Functions ---
function showEditModal() {
  stopTimer();
  modalMinutesInput.value = String(Math.floor(initialTime / 60)).padStart(
    2,
    "0"
  );
  modalSecondsInput.value = String(initialTime % 60).padStart(2, "0");
  editModal.classList.remove("hidden");
  editModal.classList.add("flex");
  modalMinutesInput.focus();
}

function hideEditModal() {
  editModal.classList.add("hidden");
  editModal.classList.remove("flex");
}

function saveTimerSettings() {
  const newMinutes = parseInt(modalMinutesInput.value, 10) || 0;
  const newSeconds = parseInt(modalSecondsInput.value, 10) || 0;
  initialTime = newMinutes * 60 + newSeconds;
  if (!isStopwatch) resetTimer();
  hideEditModal();
}

function showStopwatchAlarm() {
  playRingSound();
  alarmModal.classList.remove("hidden");
  alarmModal.classList.add("flex");
}

function hideStopwatchAlarm() {
  alarmModal.classList.add("hidden");
  alarmModal.classList.remove("flex");
}

// --- Event Listeners ---
document.addEventListener("keydown", (e) => {
  if (!editModal.classList.contains("hidden") && e.key !== "Escape") return;
  if (!alarmModal.classList.contains("hidden") && e.key !== "Escape") return;

  switch (e.code) {
    case "Space":
      e.preventDefault();
      isRunning ? stopTimer() : startTimer();
      break;
    case "KeyF":
      toggleFullscreen();
      break;
    case "KeyE":
      showEditModal();
      break;
    case "KeyR":
      resetTimer();
      break;
    case "KeyS":
      toggleMode();
      break;
    case "Escape":
      hideEditModal();
      hideStopwatchAlarm();
      break;
  }
});

saveButton.addEventListener("click", saveTimerSettings);
cancelButton.addEventListener("click", hideEditModal);
closeAlarmButton.addEventListener("click", hideStopwatchAlarm);

// --- Initial Setup ---
updateDisplay();
