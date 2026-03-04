
// Cursor
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX+'px'; cursor.style.top = e.clientY+'px';
  cursorDot.style.left = e.clientX+'px'; cursorDot.style.top = e.clientY+'px';
});

// Sparks
document.addEventListener('click', (e) => {
  for(let i=0;i<8;i++){
    const s=document.createElement('div'); s.className='spark';
    s.style.left=e.clientX+'px'; s.style.top=e.clientY+'px';
    const a=(i/8)*Math.PI*2, d=40+Math.random()*40;
    s.style.setProperty('--tx',Math.cos(a)*d+'px');
    s.style.setProperty('--ty',(Math.sin(a)*d-30)+'px');
    s.style.background=Math.random()>.5?'#ff4500':'#ffb347';
    document.body.appendChild(s);
    setTimeout(()=>s.remove(),1000);
  }
});

// Tabs
function showTab(id) {
  document.querySelectorAll('.tab-content').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById('tab-'+id).classList.add('active');
  event.target.classList.add('active');
  // re-trigger reveal
  document.querySelectorAll('#tab-'+id+' .reveal').forEach(r=>{
    r.classList.remove('visible');
    setTimeout(()=>r.classList.add('visible'),100);
  });
}

// Countdown to March 5
const festDate = new Date('2026-03-05T09:30:00');
function updateCountdown(){
  const diff = festDate - new Date();
  if(diff<=0){
    document.getElementById('countdown').innerHTML='<div style="font-family:Orbitron;color:var(--fire1);font-size:1.5rem;letter-spacing:4px;">🔥 TECHNOTSAV IS LIVE!</div>';
    return;
  }
  const d=Math.floor(diff/86400000),
        h=Math.floor((diff%86400000)/3600000),
        m=Math.floor((diff%3600000)/60000),
        s=Math.floor((diff%60000)/1000);
  document.getElementById('days').textContent=String(d).padStart(2,'0');
  document.getElementById('hours').textContent=String(h).padStart(2,'0');
  document.getElementById('minutes').textContent=String(m).padStart(2,'0');
  document.getElementById('seconds').textContent=String(s).padStart(2,'0');
}
setInterval(updateCountdown,1000); updateCountdown();

// Fire Canvas
const canvas=document.getElementById('fire-canvas');
const ctx=canvas.getContext('2d');
canvas.width=window.innerWidth; canvas.height=window.innerHeight;
window.addEventListener('resize',()=>{canvas.width=window.innerWidth;canvas.height=window.innerHeight;});
const particles=[];
for(let i=0;i<80;i++) particles.push({x:Math.random()*canvas.width,y:canvas.height+Math.random()*200,size:Math.random()*3+1,speed:Math.random()*2+.5,opacity:Math.random(),hue:Math.random()*30+10});
function animateFire(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    p.y-=p.speed; p.x+=(Math.random()-.5)*.8; p.opacity-=.003;
    if(p.y<-10||p.opacity<=0){p.x=Math.random()*canvas.width;p.y=canvas.height+10;p.opacity=Math.random()*.6+.2;p.speed=Math.random()*2+.5;}
    ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
    ctx.fillStyle=`hsla(${p.hue},100%,60%,${p.opacity})`; ctx.fill();
  });
  requestAnimationFrame(animateFire);
}
animateFire();

// Scroll Reveal
const reveals=document.querySelectorAll('.reveal');
const observer=new IntersectionObserver((entries)=>{
  entries.forEach((e,i)=>{if(e.isIntersecting) setTimeout(()=>e.target.classList.add('visible'),i*60);});
},{threshold:0.1});
reveals.forEach(r=>observer.observe(r));

// ---- FAKE LIVE REGISTRATION COUNTER ----
// Starts at a realistic base number, slowly increments over time
// Looks real and live to visitors!

const BASE_COUNT = 247; // starting count - realistic గా కనిపిస్తుంది
const GOAL = 500;

function animateCounter(target) {
  const el = document.getElementById('regCount');
  const bar = document.getElementById('regBar');
  if (!el) return;
  let current = parseInt(el.textContent) || 0;
  const step = Math.max(1, Math.ceil(Math.abs(target - current) / 50));
  const timer = setInterval(() => {
    if (current < target) current = Math.min(current + step, target);
    else if (current > target) current = Math.max(current - step, target);
    el.textContent = current;
    if (bar) bar.style.width = Math.min((current / GOAL) * 100, 100) + '%';
    if (current === target) clearInterval(timer);
  }, 25);
}

// On load - animate from 0 to base count (looks impressive!)
window.addEventListener('load', () => {
  setTimeout(() => animateCounter(BASE_COUNT), 500);
});

// Every 8-15 seconds randomly increment by 1-3 (looks live!)
function randomIncrement() {
  const el = document.getElementById('regCount');
  if (!el) return;
  const current = parseInt(el.textContent) || BASE_COUNT;
  if (current < GOAL) {
    const add = Math.floor(Math.random() * 3) + 1; // +1 to +3
    animateCounter(current + add);
  }
  // Next increment after random 8-20 seconds
  setTimeout(randomIncrement, 8000 + Math.random() * 12000);
}

// Start random increments after 3 seconds
setTimeout(randomIncrement, 3000);

// Track when user clicks Register button
function trackRegistration() {
  // opens Google Form in new tab
}

// User confirms they submitted the form
function confirmRegistered() {
  const newCount = getCount() + 1;
  setCount(newCount);
  animateCounter(newCount);
  // Visual feedback
  const btn = event.target;
  btn.textContent = '🎉 Count Updated!';
  btn.style.color = '#00ff88';
  btn.style.borderColor = '#00ff88';
  setTimeout(() => {
    btn.textContent = '✅ నేను Register చేశాను (+1)';
    btn.style.color = '';
    btn.style.borderColor = '';
  }, 3000);
}


// Smooth scroll with navbar offset fix
function smoothTo(id) {
  event.preventDefault();
  const el = document.getElementById(id);
  if (!el) return;
  const offset = 80;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: top, behavior: 'smooth' });
}

// Fix all navbar links too
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const id = this.getAttribute('href').slice(1);
    smoothTo(id);
  });
});


// ===== SLIDESHOW =====
let currentSlide = 0;
const totalSlides = 6;
let autoplayTimer, autoplayBarTimer;
const AUTOPLAY_DURATION = 4000;

function updateSlide(index) {
  currentSlide = (index + totalSlides) % totalSlides;
  document.getElementById('slides').style.transform = `translateX(-${currentSlide * 100}%)`;

  // Update dots
  document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === currentSlide));

  // Update thumbs
  document.querySelectorAll('.thumb').forEach((t, i) => t.classList.toggle('active', i === currentSlide));

  // Update counter
  document.getElementById('slideCounter').textContent =
    String(currentSlide + 1).padStart(2, '0') + ' / ' + String(totalSlides).padStart(2, '0');

  resetAutoplayBar();
}

function changeSlide(dir) { updateSlide(currentSlide + dir); }
function goSlide(index) { updateSlide(index); }

function resetAutoplayBar() {
  clearInterval(autoplayBarTimer);
  const bar = document.getElementById('autoplayBar');
  bar.style.transition = 'none';
  bar.style.width = '0%';
  setTimeout(() => {
    bar.style.transition = `width ${AUTOPLAY_DURATION}ms linear`;
    bar.style.width = '100%';
  }, 50);
}

function startAutoplay() {
  clearInterval(autoplayTimer);
  autoplayTimer = setInterval(() => changeSlide(1), AUTOPLAY_DURATION);
  resetAutoplayBar();
}

// Pause on hover
const sw = document.querySelector('.slideshow-wrap');
if (sw) {
  sw.addEventListener('mouseenter', () => {
    clearInterval(autoplayTimer);
    clearInterval(autoplayBarTimer);
    document.getElementById('autoplayBar').style.transition = 'none';
  });
  sw.addEventListener('mouseleave', startAutoplay);
}

// Touch/swipe support
let touchStartX = 0;
if (sw) {
  sw.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
  sw.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) changeSlide(diff > 0 ? 1 : -1);
  });
}

startAutoplay();