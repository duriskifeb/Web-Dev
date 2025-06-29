// --- Elemen DOM ---
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const startStopTextEl = document.getElementById("start-stop-text");
const editModal = document.getElementById("edit-modal");
const modalMinutesInput = document.getElementById("modal-minutes");
const modalSecondsInput = document.getElementById("modal-seconds");
const saveButton = document.getElementById("save-button");
const cancelButton = document.getElementById("cancel-button");
const alarmModal = document.getElementById("stopwatch-alarm-modal");
const closeAlarmButton = document.getElementById("close-alarm-button");
const confettiCanvas = document.getElementById("confetti-canvas");
const countdownBtn = document.getElementById("countdown-btn");
const stopwatchBtn = document.getElementById("stopwatch-btn");
const countdownIndicator = document.getElementById("countdown-indicator");
const stopwatchIndicator = document.getElementById("stopwatch-indicator");
// --- KODE BARU: Elemen untuk kontainer lap ---
const lapContainer = document.getElementById("lap-times-container");

// --- Variabel State ---
// --- KODE DIUBAH: Ambil waktu tersimpan dari localStorage. Jika tidak ada, default ke 5 menit (300 detik) ---
const savedTime = localStorage.getItem("doraTimerInitialTime");
let initialTime = savedTime ? parseInt(savedTime, 10) : 300;
let totalSeconds = initialTime;
let timerInterval = null;
let isRunning = false;
let isStopwatch = false;
// --- KODE BARU: Array untuk menyimpan waktu lap ---
let lapTimes = [];

// --- Pengaturan Suara & Animasi ---
const synth = new Tone.Synth().toDestination();
const myConfetti = confetti.create(confettiCanvas, {
  resize: true,
  useWorker: true,
});

// --- Fungsi Inti ---
// --- KODE BARU: Fungsi untuk memformat detik menjadi string MM:SS ---
const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
};

function updateDisplay() {
  const displayTime = formatTime(Math.abs(totalSeconds));
  minutesEl.textContent = displayTime.split(":")[0];
  secondsEl.textContent = displayTime.split(":")[1];
}

// --- KODE BARU: Fungsi untuk menampilkan daftar waktu lap ---
function displayLaps() {
  lapContainer.innerHTML = ""; // Kosongkan kontainer
  if (lapTimes.length > 0) {
    const title = document.createElement("h3");
    title.className = "font-bold mb-2 text-base";
    title.textContent = "Waktu Lap";
    lapContainer.appendChild(title);

    lapTimes.forEach((lap, index) => {
      const lapEl = document.createElement("div");
      lapEl.className = "flex justify-between";
      lapEl.innerHTML = `<span>Lap ${index + 1}</span><span>${formatTime(
        lap
      )}</span>`;
      lapContainer.appendChild(lapEl);
    });
  }
}

// --- KODE BARU: Fungsi untuk mencatat waktu lap ---
function recordLap() {
  if (isStopwatch && isRunning) {
    lapTimes.push(totalSeconds);
    displayLaps();
  }
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
  startStopTextEl.textContent = "Jeda Timer";
  timerInterval = setInterval(() => {
    if (isStopwatch) {
      totalSeconds++;
    } else {
      totalSeconds--;
      if (totalSeconds < 0) {
        stopTimer();
        totalSeconds = 0;
        triggerConfetti();
      }
    }
    updateDisplay();
  }, 1000);
}

function stopTimer() {
  if (isStopwatch && isRunning) {
    showStopwatchAlarm();
  }
  isRunning = false;
  startStopTextEl.textContent = "Mulai Timer";
  clearInterval(timerInterval);
}

// --- KODE DIUBAH: resetTimer sekarang juga membersihkan data lap ---
function resetTimer() {
  stopTimer();
  totalSeconds = isStopwatch ? 0 : initialTime;
  lapTimes = []; // Kosongkan array lap
  displayLaps(); // Perbarui tampilan lap (menjadi kosong)
  updateDisplay();
}

// --- KODE DIUBAH: setMode sekarang juga membersihkan data lap ---
function setMode(newIsStopwatch) {
  if (isStopwatch === newIsStopwatch) return;
  isStopwatch = newIsStopwatch;
  stopTimer();
  lapTimes = []; // Kosongkan lap saat berganti mode
  displayLaps(); // Perbarui tampilan

  if (isStopwatch) {
    countdownIndicator.classList.add("opacity-0");
    stopwatchIndicator.classList.remove("opacity-0");
    totalSeconds = 0;
  } else {
    countdownIndicator.classList.remove("opacity-0");
    stopwatchIndicator.classList.add("opacity-0");
    totalSeconds = initialTime;
  }
  updateDisplay();
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement
      .requestFullscreen()
      .catch((err) => console.error(`Error: ${err.message}`));
  } else {
    if (document.exitFullscreen) document.exitFullscreen();
  }
}

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

// --- KODE DIUBAH: saveTimerSettings sekarang menyimpan waktu ke localStorage ---
function saveTimerSettings() {
  const newMinutes = parseInt(modalMinutesInput.value, 10) || 0;
  const newSeconds = parseInt(modalSecondsInput.value, 10) || 0;
  initialTime = newMinutes * 60 + newSeconds;

  // --- KODE BARU: Simpan waktu ke localStorage agar tidak hilang ---
  localStorage.setItem("doraTimerInitialTime", initialTime);

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

// --- KODE DIUBAH: Event listener keyboard sekarang mengenali tombol 'L' ---
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
      setMode(!isStopwatch);
      break;
    case "KeyL":
      recordLap();
      break; // <-- KODE BARU
    case "Escape":
      hideEditModal();
      hideStopwatchAlarm();
      break;
  }
});

saveButton.addEventListener("click", saveTimerSettings);
cancelButton.addEventListener("click", hideEditModal);
closeAlarmButton.addEventListener("click", hideStopwatchAlarm);
countdownBtn.addEventListener("click", () => setMode(false));
stopwatchBtn.addEventListener("click", () => setMode(true));

// --- Pengaturan Awal ---
// Panggil setMode saat pertama kali dimuat untuk memastikan UI sinkron
setMode(isStopwatch);
updateDisplay();
