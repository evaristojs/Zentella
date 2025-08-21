/**
 * Starfield Effect
 * Adapted from the example configuration
 */

const Starfield = (function() {
  let canvas, ctx;
  let stars = [];
  let animationId;
  let config = {
    numStars: 250,
    baseSpeed: 1,
    trailLength: 0.8,
    starColor: 'rgb(230, 230, 100)',
    canvasColor: 'rgb(0, 0, 0)',
    hueJitter: 0,
    maxAcceleration: 10,
    accelerationRate: 0.2,
    decelerationRate: 0.2,
    minSpawnRadius: 80,
    maxSpawnRadius: 500
  };
  
  let origin = { x: 0, y: 0 };
  let isAccelerating = false;

  function Star(x, y) {
    this.x = x;
    this.y = y;
    this.z = Math.random() * 1000;
    this.prevX = x;
    this.prevY = y;
    this.speed = config.baseSpeed;
    this.baseOpacity = 0.3 + Math.random() * 0.7; // Each star has its own base opacity
    
    // Random initial direction for floating effect
    const angle = Math.random() * Math.PI * 2;
    this.vx = Math.cos(angle) * this.speed * 0.5; // Slower movement
    this.vy = Math.sin(angle) * this.speed * 0.5;
  }

  Star.prototype.update = function() {
    this.prevX = this.x;
    this.prevY = this.y;
    
    // Gentle floating movement
    this.x += this.vx;
    this.y += this.vy;
    
    // Add slight random movement for twinkling effect
    this.x += (Math.random() - 0.5) * 0.2;
    this.y += (Math.random() - 0.5) * 0.2;
    
    // Wrap around screen edges for continuous effect
    if (this.x < 0) this.x = canvas.width;
    if (this.x > canvas.width) this.x = 0;
    if (this.y < 0) this.y = canvas.height;
    if (this.y > canvas.height) this.y = 0;
  };
  
  Star.prototype.respawn = function() {
    // Respawn randomly across the canvas
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.prevX = this.x;
    this.prevY = this.y;
    this.speed = config.baseSpeed;
    
    // Random direction for movement
    const angle = Math.random() * Math.PI * 2;
    this.vx = Math.cos(angle) * this.speed;
    this.vy = Math.sin(angle) * this.speed;
  };
  
  Star.prototype.draw = function() {
    // Use base opacity with slight variation for twinkling
    const opacity = this.baseOpacity * (0.8 + Math.random() * 0.4);
    
    // Apply hue jitter if configured
    let color = config.starColor;
    if (config.hueJitter > 0) {
      const hueShift = (Math.random() - 0.5) * config.hueJitter;
      color = adjustHue(color, hueShift);
    }
    
    // Draw star as a simple circle
    const size = 0.5 + Math.random() * 1.5; // Random size between 0.5 and 2
    ctx.fillStyle = `rgba(${extractRGB(color).join(',')}, ${opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
    ctx.fill();
    
    // Add sparkle effect for brighter stars
    if (opacity > 0.7) {
      ctx.strokeStyle = `rgba(${extractRGB(color).join(',')}, ${opacity * 0.5})`;
      ctx.lineWidth = 0.5;
      
      // Draw cross sparkle
      ctx.beginPath();
      ctx.moveTo(this.x - size * 2, this.y);
      ctx.lineTo(this.x + size * 2, this.y);
      ctx.moveTo(this.x, this.y - size * 2);
      ctx.lineTo(this.x, this.y + size * 2);
      ctx.stroke();
    }
  };
  
  function extractRGB(rgbString) {
    const match = rgbString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    return match ? [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])] : [255, 255, 255];
  }
  
  function adjustHue(rgbString, hueShift) {
    const [r, g, b] = extractRGB(rgbString);
    // Convert to HSL, adjust hue, convert back to RGB
    const [h, s, l] = rgbToHsl(r, g, b);
    const newH = (h + hueShift / 360) % 1;
    const [newR, newG, newB] = hslToRgb(newH, s, l);
    return `rgb(${Math.round(newR)}, ${Math.round(newG)}, ${Math.round(newB)})`;
  }
  
  function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return [h, s, l];
  }
  
  function hslToRgb(h, s, l) {
    let r, g, b;
    
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    
    return [r * 255, g * 255, b * 255];
  }
  
  function createStars() {
    stars = [];
    for (let i = 0; i < config.numStars; i++) {
      // Distribute stars randomly across the entire canvas
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      stars.push(new Star(x, y));
    }
  }
  
  function updateOrigin() {
    const originElement = document.querySelector('.starfield-origin');
    if (originElement) {
      const rect = originElement.getBoundingClientRect();
      const canvasRect = canvas.getBoundingClientRect();
      origin.x = rect.left + rect.width / 2 - canvasRect.left;
      origin.y = rect.top + rect.height / 2 - canvasRect.top;
    } else {
      origin.x = canvas.width / 2;
      origin.y = canvas.height / 2;
    }
  }
  
  function animate() {
    // Clear canvas with trail effect
    const [r, g, b] = extractRGB(config.canvasColor);
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${1 - config.trailLength})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    updateOrigin();
    
    stars.forEach(star => {
      star.update();
      star.draw();
    });
    
    animationId = requestAnimationFrame(animate);
  }
  
  function resizeCanvas() {
    const container = canvas.parentElement;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    updateOrigin();
  }
  
  function setupEventListeners() {
    const originElement = document.querySelector('.starfield-origin');
    if (originElement) {
      originElement.addEventListener('mouseenter', () => {
        isAccelerating = true;
      });
      
      originElement.addEventListener('mouseleave', () => {
        isAccelerating = false;
      });
    }
    
    window.addEventListener('resize', resizeCanvas);
  }
  
  return {
    setup: function(customConfig = {}) {
      // Merge custom config with defaults
      config = { ...config, ...customConfig };
      
      // Find starfield container
      const container = document.querySelector('.starfield');
      if (!container) {
        console.error('Starfield container (.starfield) not found');
        return;
      }
      
      // Create canvas
      canvas = document.createElement('canvas');
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '1';
      
      container.appendChild(canvas);
      ctx = canvas.getContext('2d');
      
      resizeCanvas();
      setupEventListeners();
      createStars();
      animate();
    },
    
    destroy: function() {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (canvas) {
        canvas.remove();
      }
      window.removeEventListener('resize', resizeCanvas);
    }
  };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Starfield;
}

// Global usage
if (typeof window !== 'undefined') {
  window.Starfield = Starfield;
}