// public/js/animalsounds-script.js

// 1) Remove document.addEventListener("DOMContentLoaded", ...)

console.log("animalsounds-script.js loaded!");

// Immediately attach event listeners
document.querySelectorAll(".play-sound").forEach((button) => {
  button.addEventListener("click", () => {
    const soundPath = button.dataset.sound;
    console.log(`Attempting to play: ${soundPath}`);
    const sound = new Audio(soundPath);
    sound
      .play()
      .then(() => {
        console.log(`Playing sound: ${soundPath}`);
      })
      .catch((error) => {
        console.error(`Error playing sound: ${soundPath}`, error);
      });
  });
});

const recordings = new Map();

document.querySelectorAll(".animal").forEach((animalDiv) => {
  const recordButton = animalDiv.querySelector(".record-sound");
  const playButton = animalDiv.querySelector(".play-recording");
  const animal = recordButton.dataset.animal;

  recordButton.addEventListener("click", async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Microphone access is not supported in your browser.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(audioBlob);
        recordings.set(animal, audioUrl);
        playButton.disabled = false;
        console.log(`Recording saved for ${animal}.`);
      };

      mediaRecorder.start();
      alert(`Recording started for ${animal}. Click OK to stop.`);

      setTimeout(() => {
        mediaRecorder.stop();
        stream.getTracks().forEach((track) => track.stop());
        console.log(`Recording stopped for ${animal}.`);
      }, 3000);
    } catch (error) {
      console.error(`Error recording for ${animal}:`, error);
      alert("Could not access your microphone. Please check permissions.");
    }
  });

  playButton.addEventListener("click", () => {
    if (recordings.has(animal)) {
      const audio = new Audio(recordings.get(animal));
      audio.play();
      console.log(`Playing recording for ${animal}.`);
    } else {
      alert(`No recording available for ${animal}.`);
    }
  });
});
