/**
 * ===================================================================
 * 💖 MAIN ROMANTIC INTERACTION CONTROLLER 💖
 * ===================================================================
 * Renders and coordinates all sections, modals, envelopes, timeline,
 * counters, minigame, typewriter letter, and final surprise!
 * ===================================================================
 */

function initRomanticMain() {
  const cfg = typeof LOVE_CONFIG !== 'undefined' ? LOVE_CONFIG : {};

  // ─────────────────────────────────────────────────────────────────
  // 1. POPULATE LANDING SCREEN & HERO FROM CONFIG
  // ─────────────────────────────────────────────────────────────────
  if (cfg.landing) {
    const badge = document.getElementById('landing-badge');
    const title = document.getElementById('landing-title');
    const sub = document.getElementById('landing-subtitle');
    const btnText = document.getElementById('landing-btn-text');
    const footer = document.getElementById('landing-footer');

    if (badge && cfg.landing.badge) badge.textContent = cfg.landing.badge;
    if (title && cfg.landing.title) title.textContent = cfg.landing.title;
    if (sub && cfg.landing.subtitle) sub.textContent = cfg.landing.subtitle;
    if (btnText && cfg.landing.buttonText) btnText.textContent = cfg.landing.buttonText;
    if (footer && cfg.landing.footerText) footer.textContent = cfg.landing.footerText;
  }

  if (cfg.hero) {
    const tag = document.getElementById('hero-tag');
    const sub = document.getElementById('hero-subtitle');
    if (tag && cfg.hero.tag) tag.textContent = cfg.hero.tag;
    if (sub && cfg.hero.subtitle) sub.textContent = `"${cfg.hero.subtitle}"`;
  }

  const footerCustom = document.getElementById('footer-custom-names');
  if (footerCustom && cfg.boyfriendName && cfg.senderName) {
    footerCustom.textContent = `${cfg.boyfriendName} & ${cfg.senderName} ❤️`;
  }

  // Landing Page Unlock Transition
  const landingScreen = document.getElementById('landing-screen');
  const openHeartBtn = document.getElementById('open-heart-btn');

  if (openHeartBtn && landingScreen) {
    openHeartBtn.addEventListener('click', () => {
      // Spawn burst of hearts
      const rect = openHeartBtn.getBoundingClientRect();
      if (window.RomanticCanvasInstance) {
        window.RomanticCanvasInstance.spawnClickBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 25);
      }

      landingScreen.classList.add('unlocked');
      setTimeout(() => {
        // Trigger typewriter animation for letter when visible later
        setupScrollObservers();
      }, 500);
    });
  }

  // ─────────────────────────────────────────────────────────────────
  // 2. SCROLL PROGRESS INDICATOR
  // ─────────────────────────────────────────────────────────────────
  const progressBar = document.getElementById('scroll-progress-bar');
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0 && progressBar) {
      const progress = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = `${progress}%`;
      progressBar.setAttribute('aria-valuenow', Math.round(progress));
    }
  }, { passive: true });

  // ─────────────────────────────────────────────────────────────────
  // 3. SECTION 1: WHY I LOVE YOU (6 Cards)
  // ─────────────────────────────────────────────────────────────────
  const reasonsContainer = document.getElementById('reasons-container');
  if (reasonsContainer && cfg.reasons) {
    reasonsContainer.innerHTML = '';
    cfg.reasons.forEach((reason) => {
      const card = document.createElement('div');
      card.className = 'reason-card';
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `Read about ${reason.title}`);

      card.innerHTML = `
        <div class="reason-icon">${reason.icon}</div>
        <h3 class="reason-title">${reason.title}</h3>
        <p class="reason-desc">${reason.shortDesc}</p>
        <span class="card-hint">Tap to read note 💌</span>
      `;

      card.addEventListener('click', () => {
        openGeneralModal(reason.icon, reason.title, reason.fullMessage, `Forever In Love ❤️`);
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });

      reasonsContainer.appendChild(card);
    });
  }

  // ─────────────────────────────────────────────────────────────────
  // 4. SECTION 2: OUR LITTLE STORY (Interactive Timeline)
  // ─────────────────────────────────────────────────────────────────
  const timelineContainer = document.getElementById('timeline-container');
  if (timelineContainer && cfg.timeline) {
    timelineContainer.innerHTML = '';
    cfg.timeline.forEach((item, index) => {
      const isLeft = index % 2 === 0;
      const el = document.createElement('div');
      el.className = `timeline-item ${isLeft ? 'left' : 'right'}`;

      el.innerHTML = `
        <div class="timeline-node">${item.icon || '❤️'}</div>
        <div class="timeline-card">
          <span class="timeline-date">${item.date}</span>
          <h3 class="timeline-heading">${item.title}</h3>
          <p class="timeline-text">${item.description}</p>
        </div>
      `;

      timelineContainer.appendChild(el);
    });
  }

  // ─────────────────────────────────────────────────────────────────
  // 5. SECTION 3: PHOTO MEMORY WALL (Polaroids)
  // ─────────────────────────────────────────────────────────────────
  const polaroidsContainer = document.getElementById('polaroids-container');
  if (polaroidsContainer && cfg.polaroids) {
    polaroidsContainer.innerHTML = '';
    cfg.polaroids.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'polaroid-card';
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `View photo: ${item.caption}`);

      card.innerHTML = `
        <div class="polaroid-pin">❤️</div>
        <div class="polaroid-img-wrapper">
          <img src="${item.imgUrl}" alt="${item.caption}" class="polaroid-img" loading="lazy">
        </div>
        <h3 class="polaroid-caption">${item.caption}</h3>
        <span class="polaroid-date">${item.date}</span>
      `;

      card.addEventListener('click', () => {
        openLightboxModal(item.imgUrl, item.caption, item.note, item.date);
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });

      polaroidsContainer.appendChild(card);
    });
  }

  // ─────────────────────────────────────────────────────────────────
  // 6. SECTION 4: ROMANTIC SURPRISE POPUPS (Secrets)
  // ─────────────────────────────────────────────────────────────────
  const secretsContainer = document.getElementById('secrets-container');
  if (secretsContainer && cfg.popups) {
    secretsContainer.innerHTML = '';
    cfg.popups.forEach((pop) => {
      const box = document.createElement('div');
      box.className = 'secret-box';
      box.setAttribute('tabindex', '0');
      box.setAttribute('role', 'button');

      box.innerHTML = `
        <span class="secret-tag">${pop.tag || 'Special Secret'}</span>
        <h3 class="secret-title">${pop.triggerTitle}</h3>
        <p class="secret-peek">Tap to unlock this whisper 🤫✨</p>
      `;

      box.addEventListener('click', () => {
        openGeneralModal('🤫💗', pop.triggerTitle, pop.message, 'Always in my heart ❤️');
      });

      box.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          box.click();
        }
      });

      secretsContainer.appendChild(box);
    });
  }

  // ─────────────────────────────────────────────────────────────────
  // 7. SECTION 5: "OPEN WHEN..." ENVELOPES
  // ─────────────────────────────────────────────────────────────────
  const envelopesContainer = document.getElementById('envelopes-container');
  if (envelopesContainer && cfg.envelopes) {
    envelopesContainer.innerHTML = '';
    cfg.envelopes.forEach((env) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'envelope-wrapper';
      wrapper.setAttribute('tabindex', '0');
      wrapper.setAttribute('role', 'button');
      wrapper.setAttribute('aria-label', env.title);

      wrapper.innerHTML = `
        <div class="envelope-card">
          <div class="envelope-icon-box">💌</div>
          <h3 class="envelope-title">${env.title}</h3>
          <span class="envelope-action">Open Letter ✉️</span>
        </div>
      `;

      wrapper.addEventListener('click', () => {
        // Spawn small burst
        const rect = wrapper.getBoundingClientRect();
        if (window.RomanticCanvasInstance) {
          window.RomanticCanvasInstance.spawnClickBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 16);
        }
        openGeneralModal('💌🕊️', env.letterTitle, env.letterBody, 'Holding you in my thoughts ❤️');
      });

      wrapper.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          wrapper.click();
        }
      });

      envelopesContainer.appendChild(wrapper);
    });
  }

  // ─────────────────────────────────────────────────────────────────
  // 8. SECTION 6: REASONS I CHOOSE YOU (Counters)
  // ─────────────────────────────────────────────────────────────────
  const statsContainer = document.getElementById('stats-container');
  if (statsContainer && cfg.stats) {
    statsContainer.innerHTML = '';
    cfg.stats.forEach((stat) => {
      const card = document.createElement('div');
      card.className = 'stat-card';

      card.innerHTML = `
        <div class="stat-number-wrapper" data-target="${stat.number}" data-suffix="${stat.suffix}">
          0${stat.suffix}
        </div>
        <p class="stat-label">${stat.label}</p>
      `;

      statsContainer.appendChild(card);
    });
  }

  // ─────────────────────────────────────────────────────────────────
  // 9. SECTION 7: INTERACTIVE LOVE MINI GAME 🎮❤️
  // ─────────────────────────────────────────────────────────────────
  const gameOptionsContainer = document.getElementById('game-options-container');
  const gameFeedback = document.getElementById('game-feedback');
  const gameGrandReveal = document.getElementById('game-grand-reveal');
  let gameAttempts = 0;

  if (gameOptionsContainer && cfg.game && cfg.game.options) {
    gameOptionsContainer.innerHTML = '';
    cfg.game.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'game-btn';
      btn.textContent = opt.text;

      btn.addEventListener('click', () => {
        gameAttempts++;
        gameFeedback.textContent = opt.reaction;
        gameFeedback.style.display = 'block';

        if (window.RomanticCanvasInstance) {
          const rect = btn.getBoundingClientRect();
          window.RomanticCanvasInstance.spawnClickBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 15);
        }

        // On 2nd or 3rd click, or clicking the last option, reveal the grand answer!
        if (gameAttempts >= 2 || idx === cfg.game.options.length - 1) {
          setTimeout(() => {
            gameGrandReveal.textContent = cfg.game.finalReveal;
            gameGrandReveal.style.display = 'block';
          }, 400);
        }
      });

      gameOptionsContainer.appendChild(btn);
    });
  }

  // ─────────────────────────────────────────────────────────────────
  // 10. SECTION 8: LETTER FROM MY HEART 💌
  // ─────────────────────────────────────────────────────────────────
  const letterBody = document.getElementById('letter-body');
  const letterSalutation = document.getElementById('letter-salutation');
  const letterClosing = document.getElementById('letter-closing');
  const letterSignature = document.getElementById('letter-signature');
  const replayLetterBtn = document.getElementById('replay-letter-btn');

  function renderLetter() {
    if (!letterBody || !cfg.letter) return;
    letterBody.innerHTML = '';

    if (letterSalutation) letterSalutation.textContent = cfg.letter.salutation || "Dear You...";
    if (letterClosing) letterClosing.textContent = cfg.letter.closing || "Forever yours,";
    if (letterSignature) letterSignature.textContent = cfg.letter.signature || (cfg.senderName || "With All My Love ❤️");

    if (cfg.letter.paragraphs) {
      cfg.letter.paragraphs.forEach((pText, i) => {
        const p = document.createElement('p');
        p.className = 'letter-paragraph';
        p.textContent = pText;
        letterBody.appendChild(p);

        setTimeout(() => {
          p.classList.add('typed');
        }, (i + 1) * 700);
      });
    }
  }

  if (replayLetterBtn) {
    replayLetterBtn.addEventListener('click', () => {
      renderLetter();
      if (window.RomanticCanvasInstance) {
        const rect = replayLetterBtn.getBoundingClientRect();
        window.RomanticCanvasInstance.spawnClickBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 20);
      }
    });
  }

  // ─────────────────────────────────────────────────────────────────
  // 11. SECTION 9: FINAL SURPRISE CLIMAX 🎆
  // ─────────────────────────────────────────────────────────────────
  const finalLinesContainer = document.getElementById('final-lines-container');
  const finalSurpriseBtn = document.getElementById('final-surprise-btn');
  const bigPulseHeart = document.getElementById('big-pulse-heart');

  if (finalLinesContainer && cfg.finalSurprise && cfg.finalSurprise.lines) {
    finalLinesContainer.innerHTML = '';
    cfg.finalSurprise.lines.forEach((line) => {
      const lineEl = document.createElement('p');
      lineEl.className = 'final-line';
      lineEl.textContent = line;
      finalLinesContainer.appendChild(lineEl);
    });
  }

  if (bigPulseHeart) {
    bigPulseHeart.addEventListener('click', () => {
      const rect = bigPulseHeart.getBoundingClientRect();
      if (window.RomanticCanvasInstance) {
        window.RomanticCanvasInstance.spawnClickBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 35);
      }
    });
  }

  if (finalSurpriseBtn) {
    finalSurpriseBtn.addEventListener('click', () => {
      // Trigger canvas grand celebration fireworks
      if (window.RomanticCanvasInstance) {
        window.RomanticCanvasInstance.triggerCelebration();
      }

      // Ensure music is playing
      if (window.RomanticAudioInstance && !window.RomanticAudioInstance.isPlaying) {
        window.RomanticAudioInstance.play();
      }

      // Open celebration modal
      const modal = document.getElementById('celebration-modal');
      const heading = document.getElementById('celebration-heading');
      const body = document.getElementById('celebration-body');
      const signoff = document.getElementById('celebration-signoff');

      if (cfg.finalSurprise) {
        if (heading && cfg.finalSurprise.modalHeading) heading.textContent = cfg.finalSurprise.modalHeading;
        if (body && cfg.finalSurprise.modalMessage) body.textContent = cfg.finalSurprise.modalMessage;
        if (signoff && cfg.finalSurprise.modalSignoff) signoff.textContent = cfg.finalSurprise.modalSignoff;
      }

      if (modal) {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
      }
    });
  }

  // ─────────────────────────────────────────────────────────────────
  // 12. SCROLL OBSERVERS (Timeline, Stats, Letter, Climax)
  // ─────────────────────────────────────────────────────────────────
  function setupScrollObservers() {
    // 1. Timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.2 });

    timelineItems.forEach(item => timelineObserver.observe(item));

    // 2. Stats Number Counters
    const statsSection = document.getElementById('stats-section');
    let countersStarted = false;
    if (statsSection) {
      const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !countersStarted) {
            countersStarted = true;
            animateCounters();
          }
        });
      }, { threshold: 0.3 });
      statsObserver.observe(statsSection);
    }

    // 3. Letter reveal
    const letterSection = document.getElementById('letter-section');
    let letterRendered = false;
    if (letterSection) {
      const letterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !letterRendered) {
            letterRendered = true;
            renderLetter();
          }
        });
      }, { threshold: 0.2 });
      letterObserver.observe(letterSection);
    }

    // 4. Final Section line-by-line reveal
    const finalSection = document.getElementById('final-section');
    let finalRevealed = false;
    if (finalSection) {
      const finalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !finalRevealed) {
            finalRevealed = true;
            revealFinalLines();
          }
        });
      }, { threshold: 0.3 });
      finalObserver.observe(finalSection);
    }
  }

  function animateCounters() {
    const counterElements = document.querySelectorAll('.stat-number-wrapper');
    counterElements.forEach(el => {
      const targetStr = el.getAttribute('data-target');
      const suffix = el.getAttribute('data-suffix') || '';

      if (targetStr === '∞') {
        el.textContent = '∞' + suffix;
        return;
      }

      const target = parseInt(targetStr, 10);
      if (isNaN(target)) {
        el.textContent = targetStr + suffix;
        return;
      }

      let current = 0;
      const step = Math.max(1, Math.floor(target / 45));
      const interval = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        el.textContent = current.toLocaleString() + suffix;
      }, 35);
    });
  }

  function revealFinalLines() {
    const lines = document.querySelectorAll('.final-line');
    lines.forEach((line, index) => {
      setTimeout(() => {
        line.classList.add('reveal');
      }, index * 900);
    });
  }

  // ─────────────────────────────────────────────────────────────────
  // 13. MODAL CONTROLLERS & DIALOGS
  // ─────────────────────────────────────────────────────────────────
  const generalModal = document.getElementById('general-modal');
  const modalIcon = document.getElementById('modal-icon');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalFooter = document.getElementById('modal-footer-text');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  function openGeneralModal(icon, title, body, footer) {
    if (!generalModal) return;
    if (modalIcon) modalIcon.textContent = icon || '💌';
    if (modalTitle) modalTitle.textContent = title || 'A Special Note';
    if (modalBody) modalBody.textContent = body || '';
    if (modalFooter) modalFooter.textContent = footer || 'Forever Yours ❤️';

    generalModal.classList.add('active');
    generalModal.setAttribute('aria-hidden', 'false');
  }

  function closeAllModals() {
    const activeModals = document.querySelectorAll('.modal-overlay.active');
    activeModals.forEach(m => {
      m.classList.remove('active');
      m.setAttribute('aria-hidden', 'true');
    });
  }

  // Lightbox Modal
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxNote = document.getElementById('lightbox-note');
  const lightboxDate = document.getElementById('lightbox-date');

  function openLightboxModal(imgSrc, title, note, date) {
    if (!lightboxModal) return;
    if (lightboxImg) lightboxImg.src = imgSrc;
    if (lightboxTitle) lightboxTitle.textContent = title;
    if (lightboxNote) lightboxNote.textContent = note;
    if (lightboxDate) lightboxDate.textContent = date;

    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
  }

  // Close buttons bindings
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeAllModals);
  const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeAllModals);
  const celebrationCloseBtn = document.getElementById('celebration-close-btn');
  if (celebrationCloseBtn) celebrationCloseBtn.addEventListener('click', closeAllModals);

  // Close on backdrop click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeAllModals();
      }
    });
  });

  // Keyboard navigation (ESC key)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });

  // Initial call for setup
  setupScrollObservers();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRomanticMain);
} else {
  initRomanticMain();
}
