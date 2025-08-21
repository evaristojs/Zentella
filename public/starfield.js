const Starfield = (function() {
  let canvas, ctx;
  let stars = [];
  let animationId;
  let config = {
    starColor: "rgb(103, 0, 248)",
    hueJitter: 0,
    trailLength: 0.3,
    baseSpeed: 0.5,
    maxAcceleration: 0.3,
    accelerationRate: 0.01,
    decelerationRate: 0.01,
    minSpawnRadius: 200,
    maxSpawnRadius: 400
  };

  class Star {
    constructor() {
      this.reset();
      this.speed = Math.random() * config.baseSpeed + 1;
      this.acceleration = 0;
    }

    reset() {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * (config.maxSpawnRadius - config.minSpawnRadius) + config.minSpawnRadius;
      
      this.x = canvas.width / 2 + Math.cos(angle) * radius;
      this.y = canvas.height / 2 + Math.sin(angle) * radius;
      this.z = Math.random() * 1000;
      this.prevX = this.x;
      this.prevY = this.y;
    }

    update() {
      this.prevX = this.x;
      this.prevY = this.y;

      this.z -= this.speed + this.acceleration;

      if (this.z <= 0) {
        this.reset();
        return;
      }

      const x = (this.x - canvas.width / 2) * (canvas.width / this.z);
      const y = (this.y - canvas.height / 2) * (canvas.height / this.z);

      this.x = x + canvas.width / 2;
      this.y = y + canvas.height / 2;

      // Acceleration logic
      if (Math.random() < config.accelerationRate) {
        this.acceleration = Math.min(this.acceleration + 0.1, config.maxAcceleration);
      } else if (Math.random() < config.decelerationRate) {
        this.acceleration = Math.max(this.acceleration - 0.1, 0);
      }
    }

    draw() {
      const opacity = Math.max(0, 1 - this.z / 1000);
      const size = Math.max(0.3, (1000 - this.z) / 1000 * 1.5);

      // Draw trail with gradient
      if (config.trailLength > 0) {
        const gradient = ctx.createLinearGradient(this.prevX, this.prevY, this.x, this.y);
        gradient.addColorStop(0, config.starColor.replace('rgb', 'rgba').replace(')', `, ${opacity * config.trailLength * 0.3})`));
        gradient.addColorStop(1, config.starColor.replace('rgb', 'rgba').replace(')', `, ${opacity * config.trailLength})`));
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = size * 0.5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(this.prevX, this.prevY);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
      }

      // Draw star with glow
      const glowOpacity = opacity * 0.3;
      
      // Outer glow
      ctx.fillStyle = config.starColor.replace('rgb', 'rgba').replace(')', `, ${glowOpacity})`);
      ctx.beginPath();
      ctx.arc(this.x, this.y, size * 2, 0, Math.PI * 2);
      ctx.fill();
      
      // Inner star
      ctx.fillStyle = config.starColor.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
      ctx.beginPath();
      ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function createCanvas() {
    canvas = document.createElement('canvas');
    canvas.id = 'starfield-canvas';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    
    ctx = canvas.getContext('2d');
    return canvas;
  }

  function resizeCanvas() {
    if (!canvas) return;
    
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }

  function initStars() {
    stars = [];
    const numStars = Math.floor((canvas.width * canvas.height) / 25000); // Menos estrellas
    
    for (let i = 0; i < Math.max(numStars, 20); i++) { // Mínimo 20 estrellas
      stars.push(new Star());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
      star.update();
      star.draw();
    });

    animationId = requestAnimationFrame(animate);
  }

  function handleResize() {
    resizeCanvas();
    initStars();
  }

  return {
    setup: function(options = {}) {
      // Merge options with default config
      config = { ...config, ...options };

      // Find hero section or create canvas container
      const heroSection = document.getElementById('hero') || document.body;
      
      // Remove existing canvas if any
      const existingCanvas = document.getElementById('starfield-canvas');
      if (existingCanvas) {
        existingCanvas.remove();
      }

      // Create and append canvas
      canvas = createCanvas();
      heroSection.appendChild(canvas);

      // Setup
      resizeCanvas();
      initStars();

      // Start animation
      animate();

      // Handle resize
      window.addEventListener('resize', handleResize);

      return this;
    },

    destroy: function() {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      
      const canvas = document.getElementById('starfield-canvas');
      if (canvas) {
        canvas.remove();
      }

      window.removeEventListener('resize', handleResize);
    },

    updateConfig: function(options) {
      config = { ...config, ...options };
      return this;
    }
  };
})();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Starfield;
}

// Global assignment for browser
if (typeof window !== 'undefined') {
  window.Starfield = Starfield;
}