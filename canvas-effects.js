/**
 * ===================================================================
 * 💖 CANVAS EFFECTS & ROMANTIC VISUAL ENGINE 💖
 * ===================================================================
 * High-performance 60fps canvas animations:
 * - Ambient background: Floating hearts, glowing particles, soft bubbles, stars
 * - Interactive heart cursor trail
 * - Click-burst heart particle effects
 * - Grand finale celebration fireworks of hearts & sparkles
 * ===================================================================
 */

class RomanticCanvas {
  constructor() {
    this.bgCanvas = document.getElementById('bg-canvas');
    this.ctx = this.bgCanvas ? this.bgCanvas.getContext('2d') : null;
    this.particles = [];
    this.stars = [];
    this.hearts = [];
    this.bubbles = [];
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.cursorTrail = [];
    this.burstParticles = [];
    this.isCelebration = false;
    this.celebrationParticles = [];

    this.init();
  }

  init() {
    if (!this.bgCanvas) return;
    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Generate initial ambient particles
    this.createAmbientElements();

    // Mouse & Touch interactions
    this.setupInteractions();

    // Start animation loop
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.bgCanvas.width = this.width * dpr;
    this.bgCanvas.height = this.height * dpr;
    this.ctx.scale(dpr, dpr);
  }

  createAmbientElements() {
    // Twinkling stars
    const starCount = Math.floor((this.width * this.height) / 12000);
    this.stars = [];
    for (let i = 0; i < Math.min(starCount, 120); i++) {
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleDir: Math.random() > 0.5 ? 1 : -1
      });
    }

    // Soft Pink Bubbles
    const bubbleCount = Math.min(Math.floor(this.width / 40), 30);
    this.bubbles = [];
    for (let i = 0; i < bubbleCount; i++) {
      this.bubbles.push(this.createBubble());
    }

    // Floating Ambient Hearts
    const heartCount = Math.min(Math.floor(this.width / 50), 25);
    this.hearts = [];
    for (let i = 0; i < heartCount; i++) {
      this.hearts.push(this.createAmbientHeart());
    }
  }

  createBubble() {
    return {
      x: Math.random() * this.width,
      y: this.height + Math.random() * 200,
      radius: Math.random() * 18 + 8,
      speedY: Math.random() * 0.6 + 0.2,
      speedX: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.25 + 0.1,
      color: Math.random() > 0.5 ? '56, 189, 248' : '251, 191, 36'
    };
  }

  createAmbientHeart() {
    return {
      x: Math.random() * this.width,
      y: this.height + Math.random() * 300,
      size: Math.random() * 12 + 8,
      speedY: Math.random() * 0.8 + 0.4,
      speedX: (Math.random() - 0.5) * 0.4,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.03 + 0.01,
      alpha: Math.random() * 0.4 + 0.2,
      rotation: (Math.random() - 0.5) * 0.4,
      color: ['#38bdf8', '#60a5fa', '#93c5fd', '#fbbf24', '#fde68a'][Math.floor(Math.random() * 5)]
    };
  }

  setupInteractions() {
    // Cursor trail on mouse movement (desktop)
    window.addEventListener('mousemove', (e) => {
      if (Math.random() > 0.4) {
        this.cursorTrail.push({
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 10 + 6,
          alpha: 0.9,
          decay: Math.random() * 0.02 + 0.015,
          speedX: (Math.random() - 0.5) * 1.5,
          speedY: (Math.random() - 0.5) * 1.5 - 0.5,
          color: ['#38bdf8', '#60a5fa', '#fbbf24', '#7dd3fc', '#bae6fd'][Math.floor(Math.random() * 5)],
          rotation: (Math.random() - 0.5) * 0.5
        });
      }
    });

    // Burst on click anywhere
    window.addEventListener('click', (e) => {
      this.spawnClickBurst(e.clientX, e.clientY);
    });

    // Mobile touch trail/burst
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0 && Math.random() > 0.5) {
        const touch = e.touches[0];
        this.cursorTrail.push({
          x: touch.clientX,
          y: touch.clientY,
          size: Math.random() * 12 + 6,
          alpha: 0.8,
          decay: 0.025,
          speedX: (Math.random() - 0.5) * 1.2,
          speedY: -1,
          color: '#38bdf8',
          rotation: 0
        });
      }
    }, { passive: true });
  }

  spawnClickBurst(x, y, count = 12) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 / count) * i + (Math.random() - 0.5) * 0.5;
      const speed = Math.random() * 3.5 + 1.5;
      this.burstParticles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1,
        size: Math.random() * 14 + 8,
        alpha: 1,
        decay: Math.random() * 0.02 + 0.01,
        rotation: (Math.random() - 0.5) * 0.8,
        color: ['#38bdf8', '#60a5fa', '#fbbf24', '#f59e0b', '#7dd3fc'][Math.floor(Math.random() * 5)]
      });
    }
  }

  triggerCelebration() {
    this.isCelebration = true;
    for (let i = 0; i < 200; i++) {
      setTimeout(() => {
        this.celebrationParticles.push({
          x: Math.random() * this.width,
          y: this.height + 20,
          vx: (Math.random() - 0.5) * 3,
          vy: -(Math.random() * 7 + 4),
          size: Math.random() * 16 + 8,
          alpha: 1,
          decay: Math.random() * 0.006 + 0.003,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.08,
          wobble: Math.random() * Math.PI * 2,
          color: ['#38bdf8', '#60a5fa', '#93c5fd', '#fbbf24', '#f59e0b', '#ffffff'][Math.floor(Math.random() * 6)]
        });
      }, i * 35);
    }
  }

  drawHeart(x, y, size, color, alpha, rotation = 0) {
    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate(rotation);
    this.ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
    this.ctx.fillStyle = color;

    // Smooth Bezier Heart Shape
    const s = size / 30;
    this.ctx.beginPath();
    this.ctx.moveTo(0, 5 * s);
    this.ctx.bezierCurveTo(-15 * s, -15 * s, -30 * s, 10 * s, 0, 30 * s);
    this.ctx.bezierCurveTo(30 * s, 10 * s, 15 * s, -15 * s, 0, 5 * s);
    this.ctx.fill();
    this.ctx.restore();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Draw Stars
    for (const star of this.stars) {
      star.alpha += star.twinkleSpeed * star.twinkleDir;
      if (star.alpha >= 0.9) { star.alpha = 0.9; star.twinkleDir = -1; }
      else if (star.alpha <= 0.15) { star.alpha = 0.15; star.twinkleDir = 1; }

      this.ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      this.ctx.fill();
    }

    // 2. Draw Soft Ambient Bubbles
    for (let i = 0; i < this.bubbles.length; i++) {
      const b = this.bubbles[i];
      b.y -= b.speedY;
      b.x += b.speedX;

      this.ctx.save();
      this.ctx.fillStyle = `rgba(${b.color}, ${b.alpha})`;
      this.ctx.beginPath();
      this.ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();

      if (b.y < -50) {
        this.bubbles[i] = this.createBubble();
      }
    }

    // 3. Draw Ambient Floating Hearts
    for (let i = 0; i < this.hearts.length; i++) {
      const h = this.hearts[i];
      h.y -= h.speedY;
      h.wobble += h.wobbleSpeed;
      h.x += Math.sin(h.wobble) * 0.6 + h.speedX;

      this.drawHeart(h.x, h.y, h.size, h.color, h.alpha, h.rotation);

      if (h.y < -60) {
        this.hearts[i] = this.createAmbientHeart();
      }
    }

    // 4. Draw Cursor Trails
    for (let i = this.cursorTrail.length - 1; i >= 0; i--) {
      const p = this.cursorTrail[i];
      p.x += p.speedX;
      p.y += p.speedY;
      p.alpha -= p.decay;

      this.drawHeart(p.x, p.y, p.size, p.color, p.alpha, p.rotation);

      if (p.alpha <= 0) {
        this.cursorTrail.splice(i, 1);
      }
    }

    // 5. Draw Click Bursts
    for (let i = this.burstParticles.length - 1; i >= 0; i--) {
      const b = this.burstParticles[i];
      b.x += b.vx;
      b.y += b.vy;
      b.vy += 0.08; // subtle gravity
      b.alpha -= b.decay;

      this.drawHeart(b.x, b.y, b.size, b.color, b.alpha, b.rotation);

      if (b.alpha <= 0) {
        this.burstParticles.splice(i, 1);
      }
    }

    // 6. Draw Grand Celebration Hearts
    if (this.isCelebration) {
      for (let i = this.celebrationParticles.length - 1; i >= 0; i--) {
        const c = this.celebrationParticles[i];
        c.x += c.vx;
        c.y += c.vy;
        c.rotation += c.rotSpeed;
        c.wobble += 0.05;
        c.x += Math.sin(c.wobble) * 0.8;
        c.alpha -= c.decay;

        this.drawHeart(c.x, c.y, c.size, c.color, c.alpha, c.rotation);

        if (c.alpha <= 0 || c.y < -100) {
          this.celebrationParticles.splice(i, 1);
        }
      }
    }

    requestAnimationFrame(this.animate);
  }
}

// Instantiate globally when DOM is loaded
window.RomanticCanvasInstance = null;
function initRomanticCanvas() {
  if (!window.RomanticCanvasInstance) {
    window.RomanticCanvasInstance = new RomanticCanvas();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRomanticCanvas);
} else {
  initRomanticCanvas();
}
