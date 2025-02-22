const volumeBtn = document.getElementById('volumeBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const bgMusic = document.getElementById('bgMusic');
    let isMuted = true;
    let hasStartedOnce = false;

    // Volume button click handler
    volumeBtn.addEventListener('click', () => {
      if (!hasStartedOnce) {
        bgMusic.play();
        hasStartedOnce = true;
      }
      
      isMuted = !isMuted;
      bgMusic.muted = isMuted;
      updateVolumeIcon();
    });

    // Volume slider change handler
    volumeSlider.addEventListener('input', (e) => {
      const volume = e.target.value / 100;
      bgMusic.volume = volume;
      updateVolumeIcon();
    });

    // Update volume icon based on volume level
    function updateVolumeIcon() {
      const volume = bgMusic.volume;
      const iconElement = volumeBtn.querySelector('i');
      
      if (isMuted || volume === 0) {
        iconElement.className = 'fas fa-volume-mute';
      } else if (volume < 0.5) {
        iconElement.className = 'fas fa-volume-down';
      } else {
        iconElement.className = 'fas fa-volume-up';
      }
    }

    function openNav() {
      document.getElementById("mySidenav").style.width = "250px";
    }

    function closeNav() {
      document.getElementById("mySidenav").style.width = "0";
    }

    // Initialize background music
    document.addEventListener('DOMContentLoaded', () => {
      bgMusic.volume = volumeSlider.value / 100;
      bgMusic.muted = true;
    });
