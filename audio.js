/**
 * ===================================================================
 * 💖 ROMANTIC AUDIO CONTROLLER & MUSIC ENGINE 💖
 * ===================================================================
 * - Supports custom MP3 file (from config.js)
 * - Built-in procedural romantic piano / music-box synthesizer fallback
 *   (guarantees dreamy music plays even before adding an MP3 file!)
 * - Autoplay safety with user-gesture unlocking
 * - Floating glassmorphism music player widget with audio equalizer
 * ===================================================================
 */

class RomanticAudioPlayer {
  constructor() {
    this.isPlaying = false;
    this.audioElement = new Audio();
    this.audioContext = null;
    this.synthInterval = null;
    this.useSynth = false;

    this.playBtn = document.getElementById('music-toggle-btn');
    this.playerContainer = document.getElementById('floating-music-player');
    this.trackTitle = document.getElementById('music-track-title');
    this.artistTitle = document.getElementById('music-artist-name');
    this.equalizer = document.getElementById('music-equalizer');

    this.init();
  }

  init() {
    // Populate track meta from LOVE_CONFIG
    if (typeof LOVE_CONFIG !== 'undefined') {
      if (this.trackTitle) this.trackTitle.textContent = LOVE_CONFIG.songTitle || "Our Love Song";
      if (this.artistTitle) this.artistTitle.textContent = LOVE_CONFIG.artistName || "Just For You ❤️";
      if (LOVE_CONFIG.musicPath) {
        this.audioElement.src = LOVE_CONFIG.musicPath;
        this.audioElement.loop = true;
      }
    }

    // Audio error fallback to synth
    this.audioElement.addEventListener('error', () => {
      console.log('No local MP3 found or format unsupported. Activating built-in romantic melody synthesizer!');
      this.useSynth = true;
    });

    // Toggle button handler
    if (this.playBtn) {
      this.playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.togglePlay();
      });
    }

    // Setup global landing page button play hook
    const landingBtn = document.getElementById('open-heart-btn');
    if (landingBtn) {
      landingBtn.addEventListener('click', () => {
        // Attempt soft autoplay on first user interaction
        if (!this.isPlaying) {
          this.play();
        }
      });
    }
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  play() {
    if (this.useSynth || !this.audioElement.src || this.audioElement.src.includes('undefined')) {
      this.playProceduralRomanticMelody();
      this.setPlayingState(true);
      return;
    }

    // Try playing the audio element
    const playPromise = this.audioElement.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        this.setPlayingState(true);
      }).catch((err) => {
        console.log('Audio file playback prevented or not found. Falling back to romantic synthesizer.', err);
        this.useSynth = true;
        this.playProceduralRomanticMelody();
        this.setPlayingState(true);
      });
    }
  }

  pause() {
    if (!this.useSynth) {
      this.audioElement.pause();
    } else {
      this.stopProceduralMelody();
    }
    this.setPlayingState(false);
  }

  setPlayingState(playing) {
    this.isPlaying = playing;
    if (this.playerContainer) {
      if (playing) {
        this.playerContainer.classList.add('is-playing');
      } else {
        this.playerContainer.classList.remove('is-playing');
      }
    }
    if (this.playBtn) {
      this.playBtn.setAttribute('aria-label', playing ? 'Pause Music' : 'Play Music');
      const icon = this.playBtn.querySelector('.play-icon');
      if (icon) {
        icon.textContent = playing ? '⏸️' : '🎵';
      }
    }
  }

  /**
   * Dreamy Romantic Piano & Music Box Synthesizer (Web Audio API)
   * Plays a tender, peaceful romantic lullaby in C Major / A Minor
   */
  playProceduralRomanticMelody() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!this.audioContext) {
        this.audioContext = new AudioCtx();
      }
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }

      // Romantic chord notes sequence (Hz frequencies)
      // Cmaj7 -> Am9 -> Fmaj7 -> Gsus4 / G7 -> Em7 -> Fmaj9
      const melodyNotes = [
        // Chord 1: C - E - G - B - C5
        [261.63, 329.63, 392.00, 493.88, 523.25],
        // Chord 2: A - C - E - G - B
        [220.00, 261.63, 329.63, 392.00, 493.88],
        // Chord 3: F - A - C - E - G
        [174.61, 220.00, 261.63, 329.63, 392.00],
        // Chord 4: G - B - D - F - A
        [196.00, 246.94, 293.66, 349.23, 440.00],
        // Chord 5: E - G - B - D - E5
        [164.81, 196.00, 246.94, 293.66, 329.63],
        // Chord 6: F - C - E - A - C6
        [174.61, 261.63, 329.63, 440.00, 523.25]
      ];

      let chordIdx = 0;
      let arpeggioStep = 0;

      this.stopProceduralMelody();

      const playNextNote = () => {
        if (!this.isPlaying) return;
        const currentChord = melodyNotes[chordIdx];
        const freq = currentChord[arpeggioStep % currentChord.length];

        this.synthesizeTenderBellNote(freq);

        arpeggioStep++;
        if (arpeggioStep >= currentChord.length) {
          arpeggioStep = 0;
          chordIdx = (chordIdx + 1) % melodyNotes.length;
        }
      };

      // Play note every 450ms
      playNextNote();
      this.synthInterval = setInterval(playNextNote, 480);
    } catch (e) {
      console.warn('Web Audio synthesis error:', e);
    }
  }

  synthesizeTenderBellNote(frequency) {
    if (!this.audioContext) return;
    const now = this.audioContext.currentTime;

    // Master gain
    const masterGain = this.audioContext.createGain();
    masterGain.gain.setValueAtTime(0.08, now);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

    // Warm soft sine oscillator
    const osc1 = this.audioContext.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(frequency, now);

    // Subtle harmonic overtone (triangle)
    const osc2 = this.audioContext.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(frequency * 2, now);

    const osc2Gain = this.audioContext.createGain();
    osc2Gain.gain.setValueAtTime(0.02, now);
    osc2Gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

    osc1.connect(masterGain);
    osc2.connect(osc2Gain);
    osc2Gain.connect(masterGain);
    masterGain.connect(this.audioContext.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 2.6);
    osc2.stop(now + 2.6);
  }

  stopProceduralMelody() {
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
  }
}

// Initialize when DOM is ready
window.RomanticAudioInstance = null;
function initRomanticAudio() {
  if (!window.RomanticAudioInstance) {
    window.RomanticAudioInstance = new RomanticAudioPlayer();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRomanticAudio);
} else {
  initRomanticAudio();
}
