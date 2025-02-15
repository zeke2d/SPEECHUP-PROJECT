// Play sound
document.querySelectorAll('.play-sound').forEach(button => {
  button.addEventListener('click', () => {
    const soundPath = button.dataset.sound;
    console.log(`Attempting to play: ${soundPath}`);
    const sound = new Audio(soundPath);

    sound.play().then(() => {
      console.log(`Playing sound: ${soundPath}`);
    }).catch(error => {
      console.error(`Error playing sound: ${soundPath}`, error);
    });
  });
});

  
document.addEventListener("DOMContentLoaded", () => {
  const recordings = new Map(); // Map to store recordings for each animal

  document.querySelectorAll('.animal').forEach(animalDiv => {
    const recordButton = animalDiv.querySelector('.record-sound');
    const playButton = animalDiv.querySelector('.play-recording');
    const animal = recordButton.dataset.animal; // Get animal identifier

    // Record sound for a specific animal
    recordButton.addEventListener('click', async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('Microphone access is not supported in your browser.');
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        const chunks = [];

        mediaRecorder.ondataavailable = e => chunks.push(e.data);

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(chunks, { type: 'audio/wav' });
          const audioUrl = URL.createObjectURL(audioBlob);

          // Save the recording for this specific animal
          recordings.set(animal, audioUrl);
          playButton.disabled = false; // Enable the playback button
          console.log(`Recording saved for ${animal}.`);
        };

        mediaRecorder.start();
        alert(`Recording started for ${animal}. Click OK to stop.`);

        setTimeout(() => {
          mediaRecorder.stop();
          stream.getTracks().forEach(track => track.stop());
          console.log(`Recording stopped for ${animal}.`);
        }, 3000); // Record for 3 seconds
      } catch (error) {
        console.error(`Error recording for ${animal}:`, error);
        alert('Could not access your microphone. Please check permissions.');
      }
    });

    // Play the latest recording for this specific animal
    playButton.addEventListener('click', () => {
      if (recordings.has(animal)) {
        const audio = new Audio(recordings.get(animal));
        audio.play();
        console.log(`Playing recording for ${animal}.`);
      } else {
        alert(`No recording available for ${animal}.`);
      }
    });
  });
});
