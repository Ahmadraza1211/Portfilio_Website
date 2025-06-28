class GymTrainer {
  constructor() {
    this.tasks = [];
    this.selectedTasks = [];
    this.currentTaskIndex = 0;
    this.isRunning = false;
    this.isPaused = false;
    this.isResting = false;
    this.timeRemaining = 0;
    this.totalTime = 0;
    this.interval = null;
    this.completedTasks = new Set();
    this.waitingForNext = false;
    this.soundEnabled = true;

    // Audio elements
    this.audio30sec = document.getElementById("audio30sec");
    this.audio10sec = document.getElementById("audio10sec");
    this.audioNextGame = document.getElementById("audioNextGame");

    this.loadTasks();
    this.updateDisplay();
    this.updateTaskStats();
    this.addDefaultTasks();

    // Bind sound toggle event
    this.bindSoundToggle();
  }

  // Replace playAudio method
  playAudio(audioElement) {
    if (this.soundEnabled && audioElement) {
      audioElement.currentTime = 0;
      audioElement.loop = false; // Ensure loop is controlled by user
      audioElement.volume = audioElement.dataset.volume || 0.3;
      audioElement.play().catch((e) => console.log("Audio play failed:", e));
    }
  }

  // Replace playBeep method
  playBeep() {
    if (this.soundEnabled && this.audioBeep) {
      this.playAudio(this.audioBeep);
    }
  }
  addDefaultTasks() {
    if (this.tasks.length === 0) {
      setTimeout(() => {
        this.addTask("Push-ups", 45);
        this.addTask("Squats", 60);
        this.addTask("Plank", 30);
        this.addTask("Jumping Jacks", 45);
        this.addTask("Burpees", 30);
      }, 500);
    }
  }

  playAudio(audioElement) {
    if (this.soundEnabled && audioElement) {
      audioElement.currentTime = 0;
      audioElement.play().catch((e) => console.log("Audio play failed:", e));
    }
  }

  playBeep(frequency = 800, duration = 200) {
    if (!this.soundEnabled) return;
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration / 1000);
    } catch (e) {
      console.log("Audio context not supported");
    }
  }

  speak(text) {
    if (this.soundEnabled && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.2;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  }

  bindSoundToggle() {
    const soundToggle = document.getElementById("soundToggle");
    if (soundToggle) {
      soundToggle.addEventListener("change", () => {
        this.soundEnabled = soundToggle.checked;
        this.showSuccess(this.soundEnabled ? "Sound enabled" : "Sound disabled");
      });
    }
  }

  addTask(name, duration) {
    if (!name || !duration) {
      const taskName = document.getElementById("taskName")?.value.trim();
      const minutes = Number.parseInt(document.getElementById("taskMinutes")?.value) || 0;
      const seconds = Number.parseInt(document.getElementById("taskSeconds")?.value) || 0;

      name = taskName;
      duration = minutes * 60 + seconds;
    }

    if (!name || duration < 10) {
      this.showError("Please enter a valid exercise name and duration (minimum 10 seconds)");
      return;
    }

    const task = {
      id: Date.now(),
      name: name,
      duration: duration,
    };

    this.tasks.push(task);
    this.saveTasks();
    this.renderTasks();
    this.updateTaskStats();

    if (document.getElementById("taskName")) {
      document.getElementById("taskName").value = "";
      document.getElementById("taskMinutes").value = "1";
      document.getElementById("taskSeconds").value = "0";
    }

    this.showSuccess("Exercise added successfully!");
  }

  removeTask(taskId) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.selectedTasks = this.selectedTasks.filter((task) => task.id !== taskId);
    this.completedTasks.delete(taskId);
    this.saveTasks();
    this.renderTasks();
    this.updateTaskStats();
  }

  renderTasks() {
    const taskList = document.getElementById("taskList");
    if (!taskList) return;

    if (this.tasks.length === 0) {
      taskList.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🏋️‍♂️</div>
          <p>No exercises added yet</p>
          <small>Add some exercises above to get started!</small>
        </div>
      `;
      return;
    }

    taskList.innerHTML = this.tasks
      .map(
        (task) => `
          <div class="task-item ${this.selectedTasks.some((t) => t.id === task.id) ? "selected" : ""} ${this.completedTasks.has(task.id) ? "completed" : ""}">
            <input type="checkbox" 
                   class="task-checkbox"
                   onchange="trainer.toggleTaskSelection(${task.id})" 
                   ${this.selectedTasks.some((t) => t.id === task.id) ? "checked" : ""}>
            <div class="task-info-item">
              <div class="task-name-display">${task.name}</div>
              <div class="task-duration">${this.formatTime(task.duration)}</div>
            </div>
            ${this.completedTasks.has(task.id) ? '<span class="checkmark">✓</span>' : ""}
            <div class="task-actions">
              <button class="btn btn-stop btn-small" onclick="trainer.removeTask(${task.id})" title="Remove exercise">
                ×
              </button>
            </div>
          </div>
        `
      )
      .join("");
  }

  toggleTaskSelection(taskId) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (!task) return;

    const isSelected = this.selectedTasks.some((t) => t.id === taskId);
    if (isSelected) {
      this.selectedTasks = this.selectedTasks.filter((t) => t.id !== taskId);
    } else {
      this.selectedTasks.push(task);
    }

    this.renderTasks();
    this.updateTaskStats();
  }

  startWorkout() {
    if (this.selectedTasks.length === 0) {
      this.showError("Please select at least one exercise to perform!");
      return;
    }

    this.isRunning = true;
    this.isPaused = false;
    this.isResting = false;
    this.currentTaskIndex = 0;
    this.completedTasks.clear();
    this.waitingForNext = false;

    this.startCurrentTask();
    this.updateButtons();
    this.speak("Workout started!");
    this.playAudio(this.audioNextGame);
  }

  startCurrentTask() {
    if (this.currentTaskIndex >= this.selectedTasks.length) {
      this.completeWorkout();
      return;
    }

    const currentTask = this.selectedTasks[this.currentTaskIndex];
    this.timeRemaining = currentTask.duration;
    this.totalTime = currentTask.duration;
    this.isResting = false;
    this.waitingForNext = false;

    this.updateDisplay();
    this.startTimer();

    this.speak(`Starting ${currentTask.name}`);
  }

  startRestPeriod() {
    const restMinutes = Number.parseInt(document.getElementById("restMinutes")?.value) || 0;
    const restSeconds = Number.parseInt(document.getElementById("restSeconds")?.value) || 0;
    const restDuration = restMinutes * 60 + restSeconds;

    if (restDuration <= 0) {
      this.currentTaskIndex++;
      this.startCurrentTask();
      return;
    }

    this.timeRemaining = restDuration;
    this.totalTime = restDuration;
    this.isResting = true;
    this.waitingForNext = false;

    this.updateDisplay();
    this.startTimer();

    this.speak("Rest time");
  }

  startTimer() {
    if (this.interval) {
      clearInterval(this.interval);
    }

    this.interval = setInterval(() => {
      if (!this.isPaused) {
        this.timeRemaining--;
        this.updateDisplay();

        if (this.timeRemaining === 30) {
          this.speak("30 seconds left");
          this.playAudio(this.audio30sec);
        }

        if (this.timeRemaining === 10) {
          this.playAudio(this.audio10sec);
        }

        if (this.timeRemaining <= 3 && this.timeRemaining > 0) {
          this.speak(this.timeRemaining.toString());
          this.playBeep(1000, 200);
        }

        if (this.timeRemaining <= 0) {
          this.playBeep(1200, 500);
          clearInterval(this.interval);

          if (this.isResting) {
            this.currentTaskIndex++;
            this.startCurrentTask();
          } else {
            const currentTask = this.selectedTasks[this.currentTaskIndex];
            this.completedTasks.add(currentTask.id);
            this.renderTasks();
            this.startRestPeriod();
          }
        }
      }
    }, 1000);
  }

  showNextTaskPrompt() {
    this.waitingForNext = true;
    this.isRunning = false;
    this.updateButtons();

    const prompt = document.getElementById("nextTaskPrompt");
    const nextTaskText = document.getElementById("nextTaskText");

    if (this.currentTaskIndex < this.selectedTasks.length) {
      const nextTask = this.selectedTasks[this.currentTaskIndex];
      nextTaskText.textContent = `Next: ${nextTask.name} (${this.formatTime(nextTask.duration)})`;
    } else {
      nextTaskText.textContent = "All exercises completed!";
    }

    if (prompt) {
      prompt.style.display = "flex";
    }
    this.speak("Task complete!");
  }

  hideNextTaskPrompt() {
    const prompt = document.getElementById("nextTaskPrompt");
    if (prompt) {
      prompt.style.display = "none";
    }
  }

  startNextTask() {
    this.hideNextTaskPrompt();
    this.isRunning = true;
    this.waitingForNext = false;

    if (this.isResting) {
      this.currentTaskIndex++;
      this.startCurrentTask();
    } else {
      this.startRestPeriod();
    }

    this.updateButtons();
    this.playAudio(this.audioNextGame);
  }

  skipToRest() {
    this.hideNextTaskPrompt();
    this.isRunning = true;
    this.waitingForNext = false;
    this.startRestPeriod();
    this.updateButtons();
  }

  finishWorkout() {
    this.hideNextTaskPrompt();
    this.completeWorkout();
  }

  pauseWorkout() {
    this.isPaused = !this.isPaused;
    const pauseBtn = document.getElementById("pauseBtn");

    if (this.isPaused) {
      pauseBtn.innerHTML = '<span class="btn-icon">▶</span>Resume';
      pauseBtn.className = "btn btn-start";
      this.speak("Workout paused");
    } else {
      pauseBtn.innerHTML = '<span class="btn-icon">⏸</span>Pause';
      pauseBtn.className = "btn btn-pause";
      this.speak("Workout resumed");
    }
  }

  stopWorkout() {
    this.isRunning = false;
    this.isPaused = false;
    this.isResting = false;
    this.waitingForNext = false;
    this.currentTaskIndex = 0;
    this.timeRemaining = 0;

    if (this.interval) {
      clearInterval(this.interval);
    }

    this.hideNextTaskPrompt();
    this.updateDisplay();
    this.updateButtons();
    this.speak("Workout stopped");
  }

  completeWorkout() {
    this.isRunning = false;
    this.isPaused = false;
    this.isResting = false;
    this.waitingForNext = false;
    this.currentTaskIndex = 0;
    this.timeRemaining = 0;

    if (this.interval) {
      clearInterval(this.interval);
    }

    this.hideNextTaskPrompt();
    this.updateDisplay();
    this.updateButtons();
    this.speak("Workout completed! Great job!");

    const timerDisplay = document.getElementById("timerDisplay");
    if (timerDisplay) {
      timerDisplay.classList.add("pulse");
      setTimeout(() => timerDisplay.classList.remove("pulse"), 2000);
    }

    setTimeout(() => this.playBeep(800, 200), 100);
    setTimeout(() => this.playBeep(1000, 200), 300);
    setTimeout(() => this.playBeep(1200, 400), 500);

    this.showSuccess("🎉 Workout Complete! Great job!");
  }

  updateDisplay() {
    const timeDisplay = document.getElementById("timeDisplay");
    const statusDisplay = document.getElementById("statusDisplay");
    const currentTaskName = document.getElementById("currentTaskName");
    const taskCounter = document.getElementById("taskCounter");
    const timerDisplay = document.getElementById("timerDisplay");
    const progressRing = document.querySelector(".progress-ring-circle");

    if (timeDisplay) timeDisplay.textContent = this.formatTime(this.timeRemaining);

    if (progressRing && this.totalTime > 0) {
      const progress = ((this.totalTime - this.timeRemaining) / this.totalTime) * 565.48;
      progressRing.style.strokeDashoffset = 565.48 - progress;
      progressRing.classList.add("active");
    } else if (progressRing) {
      progressRing.style.strokeDashoffset = 565.48;
      progressRing.classList.remove("active");
    }

    if (!this.isRunning && !this.waitingForNext) {
      if (statusDisplay) statusDisplay.textContent = "Ready to Start";
      if (currentTaskName) currentTaskName.textContent = "";
      if (taskCounter) taskCounter.textContent = "";
      if (timerDisplay) timerDisplay.classList.remove("pulse");
    } else if (this.isPaused) {
      if (statusDisplay) statusDisplay.textContent = "Paused";
      if (timerDisplay) timerDisplay.classList.remove("pulse");
    } else if (this.waitingForNext) {
      if (statusDisplay) statusDisplay.textContent = "Waiting";
      if (timerDisplay) timerDisplay.classList.remove("pulse");
    } else if (this.isResting) {
      if (statusDisplay) statusDisplay.textContent = "Rest Time";
      if (currentTaskName) currentTaskName.textContent = "Take a break! 💪";
      if (taskCounter) taskCounter.textContent = this.currentTaskIndex < this.selectedTasks.length ? `Next: Task ${this.currentTaskIndex + 1} of ${this.selectedTasks.length}` : "";
      if (timerDisplay) timerDisplay.classList.add("pulse");
    } else {
      const currentTask = this.selectedTasks[this.currentTaskIndex];
      if (statusDisplay) statusDisplay.textContent = "Exercise Time";
      if (currentTaskName) currentTaskName.textContent = currentTask.name;
      if (taskCounter) taskCounter.textContent = `Task ${this.currentTaskIndex + 1} of ${this.selectedTasks.length}`;
      if (timerDisplay) timerDisplay.classList.toggle("pulse", this.timeRemaining <= 10 && this.timeRemaining > 0);
    }
  }

  updateButtons() {
    const startBtn = document.getElementById("startBtn");
    const pauseBtn = document.getElementById("pauseBtn");
    const stopBtn = document.getElementById("stopBtn");
    const nextBtn = document.getElementById("nextBtn");
    const restBtn = document.getElementById("restBtn");
    const finishBtn = document.getElementById("finishBtn");

    if (startBtn) startBtn.disabled = this.isRunning || this.waitingForNext;
    if (pauseBtn) pauseBtn.disabled = !this.isRunning || this.waitingForNext;
    if (stopBtn) stopBtn.disabled = !this.isRunning && !this.waitingForNext;
    if (nextBtn) nextBtn.disabled = !this.waitingForNext || this.currentTaskIndex >= this.selectedTasks.length;
    if (restBtn) restBtn.disabled = !this.waitingForNext || this.isResting;
    if (finishBtn) finishBtn.disabled = !this.waitingForNext;

    if (pauseBtn && !this.isPaused) {
      pauseBtn.innerHTML = '<span class="btn-icon">⏸</span>Pause';
      pauseBtn.className = "btn btn-pause";
    }
  }

  updateTaskStats() {
    const taskStats = document.getElementById("taskStats");
    if (!taskStats) return;

    const selectedCount = this.selectedTasks.length;
    const totalCount = this.tasks.length;
    taskStats.textContent = totalCount === 0 ? "0 exercises" : `${selectedCount}/${totalCount} selected`;
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  showSuccess(message) {
    const toast = document.createElement("div");
    toast.className = "toast success";
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }

  showError(message) {
    const toast = document.createElement("div");
    toast.className = "toast error";
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }

  saveTasks() {
    localStorage.setItem("gymTrainerTasks", JSON.stringify(this.tasks));
  }

  loadTasks() {
    const saved = localStorage.getItem("gymTrainerTasks");
    if (saved) {
      this.tasks = JSON.parse(saved);
      this.renderTasks();
    }
  }
}

const trainer = new GymTrainer();