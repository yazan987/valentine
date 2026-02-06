const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const title = document.getElementById("title");
const hoverText = document.getElementById("hoverText");
const container = document.querySelector(".container");
const cuteCharacter = document.querySelector(".cute-character");

/* ---------- SPARKLE EFFECTS ---------- */
function createSparkle(x, y) {
  const sparkle = document.createElement("div");
  sparkle.className = "sparkle";
  sparkle.style.left = x + "px";
  sparkle.style.top = y + "px";
  document.body.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 2000);
}

// Add sparkles on mouse move (sparingly)
let lastSparkle = 0;
document.addEventListener("mousemove", (e) => {
  const now = Date.now();
  if (now - lastSparkle > 100) {
    if (Math.random() > 0.7) {
      createSparkle(e.clientX, e.clientY);
    }
    lastSparkle = now;
  }
});

/* ---------- NO BUTTON BEHAVIOR ---------- */
let isNoButtonMoving = false;

function moveNoButton() {
  if (isNoButtonMoving) return;
  isNoButtonMoving = true;
  
  // Get current position before changing to fixed
  const currentRect = noBtn.getBoundingClientRect();
  
  // Set to fixed positioning
  noBtn.style.position = "fixed";
  noBtn.style.margin = "0";
  
  // Get actual rendered dimensions (accounting for transforms)
  const btnWidth = currentRect.width;
  const btnHeight = currentRect.height;
  
  // Get viewport dimensions
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  
  // Set safe boundaries with padding
  const padding = 50;
  const minX = padding;
  const maxX = Math.max(minX, viewportWidth - btnWidth - padding);
  const minY = padding;
  const maxY = Math.max(minY, viewportHeight - btnHeight - padding);
  
  // Generate random position within safe bounds
  let newX = minX + Math.random() * (maxX - minX);
  let newY = minY + Math.random() * (maxY - minY);
  
  // Clamp to ensure it stays in bounds
  newX = Math.max(minX, Math.min(newX, maxX));
  newY = Math.max(minY, Math.min(newY, maxY));
  
  // Apply position
  noBtn.style.left = newX + "px";
  noBtn.style.top = newY + "px";
  noBtn.style.transform = "none"; // Reset any transforms
  
  console.log(`Button moved to (${newX.toFixed(0)}, ${newY.toFixed(0)}). Button size: ${btnWidth.toFixed(0)}x${btnHeight.toFixed(0)}, Viewport: ${viewportWidth}x${viewportHeight}`);
  
  setTimeout(() => {
    isNoButtonMoving = false;
  }, 100);
}

const funnyTexts = [
  "Shamma please 🥺💖",
  "That button is dangerous 😭",
  "Think about cuddles 🐻",
  "My heart can't take this 💔",
  "This is emotional damage 😵‍💫",
  "You KNOW the answer 😌",
  "I love you 💕",
  "Don't break my heart 😢",
  "Pretty please? 🌟",
  "Click YES instead! ✨",
  "You're killing me 💘",
  "Come onnnnn 🥹"
];

// NO button hover behavior
noBtn.addEventListener("mouseenter", () => {
  moveNoButton();

  // Change character emotion
  cuteCharacter.textContent = "😭";

  // Pick random funny text
  const randomText = funnyTexts[Math.floor(Math.random() * funnyTexts.length)];
  hoverText.textContent = randomText;

  // Get YES button position
  const yesRect = yesBtn.getBoundingClientRect();
  
  // Calculate center position of YES button
  const yesCenterX = yesRect.left + (yesRect.width / 2);
  const yesBottom = yesRect.bottom;
  
  // Position hover text
  // First make it visible to calculate width
  hoverText.style.opacity = "1";
  hoverText.style.display = "block";
  
  // Wait for next frame to get accurate width
  requestAnimationFrame(() => {
    const textWidth = hoverText.offsetWidth;
    
    // Center the text horizontally under YES button
    const textLeft = yesCenterX - (textWidth / 2);
    
    // Position below YES button with spacing
    const textTop = yesBottom + 20;
    
    hoverText.style.left = textLeft + "px";
    hoverText.style.top = textTop + "px";
    
    console.log(`Hover text positioned at (${textLeft}, ${textTop}). YES button at (${yesRect.left}, ${yesRect.top})`);
  });

  // Add sparkles around the YES button
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      const sparkleX = yesRect.left + Math.random() * yesRect.width;
      const sparkleY = yesRect.top + Math.random() * yesRect.height;
      createSparkle(sparkleX, sparkleY);
    }, i * 100);
  }
});

noBtn.addEventListener("mouseleave", () => {
  hoverText.style.opacity = "0";
  setTimeout(() => {
    hoverText.style.display = "none";
  }, 300);
  cuteCharacter.textContent = "🥺";
});

// Also trigger on touch for mobile
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveNoButton();
  cuteCharacter.textContent = "😭";
  
  const randomText = funnyTexts[Math.floor(Math.random() * funnyTexts.length)];
  hoverText.textContent = randomText;
  
  const yesRect = yesBtn.getBoundingClientRect();
  const yesCenterX = yesRect.left + (yesRect.width / 2);
  const yesBottom = yesRect.bottom;
  
  hoverText.style.opacity = "1";
  hoverText.style.display = "block";
  
  requestAnimationFrame(() => {
    const textWidth = hoverText.offsetWidth;
    const textLeft = yesCenterX - (textWidth / 2);
    const textTop = yesBottom + 20;
    
    hoverText.style.left = textLeft + "px";
    hoverText.style.top = textTop + "px";
  });
  
  setTimeout(() => {
    hoverText.style.opacity = "0";
    setTimeout(() => {
      hoverText.style.display = "none";
    }, 300);
    cuteCharacter.textContent = "🥺";
  }, 2000);
});

/* ---------- YES BUTTON BEHAVIOR ---------- */
const messages = [
  "Shamma said YES 😭💖",
  "Best Valentine ever 💕",
  "Love unlocked 🔓❤️",
  "Core memory created ✨",
  "This is so cute 🥹",
  "BA7ebekkkkk 💘",
  "you are so cuteeeeee 🥰",
  "I'm the luckiest 🥰",
  "Can't wait to see youuuu 😍",
  "bamoot feekiii 💕",
  "I'm blushingggg 😳",
  "come over hehehehe 😏",
  "I'm so happy 🥹",
  "This is a dream come true ✨",
  "I'm over the moon 🌙",
  "You just made me the happiest 🥰",
  "I can't stop smiling 😁",
  "You're the best! 💖",
  "YESSSSS 🎉",
  "Forever and always 💍"
];

const emojis = ["💖", "💕", "🎉", "😍", "💘", "✨", "🎆", "💗", "🌟", "💝", "🥰", "😘"];

yesBtn.addEventListener("click", () => {
  // Hide buttons
  noBtn.style.display = "none";
  yesBtn.style.display = "none";
  hoverText.style.opacity = "0";

  // Change character to happy
  cuteCharacter.textContent = "😍";
  cuteCharacter.style.fontSize = "7rem";

  // Update title
  title.textContent = "woohooo heheheheh 💕🎉";

  // Add success mode class
  document.body.classList.add("success-mode");

  // Start all effects
  startFireworks();
  startSpawning();
  startConfetti();
  startFloatingHearts();

  // Create explosion of sparkles
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const x = window.innerWidth / 2 + (Math.random() - 0.5) * 300;
      const y = window.innerHeight / 2 + (Math.random() - 0.5) * 300;
      createSparkle(x, y);
    }, i * 50);
  }
});

/* ---------- SPAWNING TEXT & EMOJIS ---------- */
function startSpawning() {
  setInterval(() => {
    const el = document.createElement("div");
    el.className = "spawn";
    
    // Mix of messages and emojis
    if (Math.random() > 0.4) {
      el.textContent = messages[Math.floor(Math.random() * messages.length)];
    } else {
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.fontSize = "2rem";
    }

    // Position from 15% to 85% of viewport height to keep text visible
    const topPosition = Math.random() * 70 + 15; // 15% to 85%
    el.style.top = topPosition + "vh";

    // Random colors for dark theme
    const colors = ["#e63946", "#ff6b9d", "#ffb3d9", "#fff"];
    el.style.color = colors[Math.floor(Math.random() * colors.length)];

    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3000);
  }, 250);
}

/* ---------- CONFETTI ---------- */
function startConfetti() {
  setInterval(() => {
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random() * 100 + "vw";
    
    const colors = ["#e63946", "#ff6b9d", "#ffd1dc", "#fff", "#d62828", "#ff9acb"];
    c.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    // Random size
    c.style.width = (Math.random() * 8 + 6) + "px";
    c.style.height = (Math.random() * 12 + 10) + "px";
    
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 4000);
  }, 100);
}

/* ---------- FLOATING HEARTS ---------- */
function startFloatingHearts() {
  setInterval(() => {
    const heart = document.createElement("div");
    heart.textContent = ["💖", "💕", "💗", "💝"][Math.floor(Math.random() * 4)];
    heart.style.position = "fixed";
    heart.style.fontSize = (Math.random() * 2 + 1) + "rem";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.bottom = "-50px";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "9998";
    heart.style.animation = `floatUp ${Math.random() * 3 + 4}s linear forwards`;
    
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 7000);
  }, 300);
}

// Add floatUp animation dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes floatUp {
    from {
      transform: translateY(0) rotate(0deg);
      opacity: 0.8;
    }
    to {
      transform: translateY(-100vh) rotate(360deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

/* ---------- FIREWORKS ---------- */
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let particles = [];
let fireworksActive = false;

function startFireworks() {
  fireworksActive = true;
  
  setInterval(() => {
    const x = Math.random() * canvas.width;
    const y = Math.random() * (canvas.height / 2);
    
    const colors = [
      "#e63946",
      "#ff6b9d",
      "#ffb3d9",
      "#fff",
      "#ffd1dc",
      "#d62828"
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Create more particles per firework
    for (let i = 0; i < 50; i++) {
      const angle = (Math.PI * 2 * i) / 50;
      const speed = Math.random() * 4 + 2;
      
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 100,
        color: color,
        size: Math.random() * 3 + 2
      });
    }
  }, 500);
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (fireworksActive) {
    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.1; // Gravity
      p.life--;

      const alpha = p.life / 100;
      ctx.fillStyle = p.color;
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();

      if (p.life <= 0) {
        particles.splice(i, 1);
      }
    });
  }

  ctx.globalAlpha = 1;
  requestAnimationFrame(animate);
}

animate();

/* ---------- YES BUTTON PULSING HINT ---------- */
setInterval(() => {
  if (!fireworksActive) {
    yesBtn.style.transform = "scale(1.1)";
    setTimeout(() => {
      yesBtn.style.transform = "scale(1)";
    }, 200);
  }
}, 3000);

/* ---------- HANDLE WINDOW RESIZE ---------- */
let resizeTimer;
window.addEventListener('resize', () => {
  // Reset NO button if it's in fixed position and window is resized
  if (noBtn.style.position === 'fixed') {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Reposition button to ensure it stays in viewport
      const rect = noBtn.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Check if button is out of bounds
      if (rect.right > viewportWidth || rect.bottom > viewportHeight || 
          rect.left < 0 || rect.top < 0) {
        moveNoButton();
      }
    }, 250);
  }
});