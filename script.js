let intervalId = null
const startBtn = document.getElementById('startBtn')
const stopBtn = document.getElementById('stopBtn')
const speed = document.getElementById('speed')
const speedVal = document.getElementById('speedVal')
const status = document.getElementById('status')
const warning = document.getElementById('warning')
const accept = document.getElementById('accept')
const decline = document.getElementById('decline')

function randColor(){const h=Math.floor(Math.random()*360);const s=60+Math.floor(Math.random()*40);const l=45+Math.floor(Math.random()*10);return `hsl(${h} ${s}% ${l}%)`}
function luminanceFromHSL(hsl){const parts=hsl.match(/hsl\((\d+)\s+(\d+)%\s+(\d+)%\)/);if(!parts)return 0;const l=Number(parts[3])/100;return l}
function updateTextContrast(bg){const lum=luminanceFromHSL(bg);document.body.style.color=(lum>0.6)?'#000':'#fff'}
function setBg(color){document.body.style.background=color;updateTextContrast(color)}
function startFlashing(){if(intervalId)clearInterval(intervalId);const ms=Number(speed.value);setBg(randColor());intervalId=setInterval(()=>setBg(randColor()),ms);status.textContent='Running';startBtn.setAttribute('aria-pressed','true');startBtn.classList.add('hidden');stopBtn.classList.remove('hidden')}
function stopFlashing(){if(intervalId)clearInterval(intervalId);intervalId=null;status.textContent='Paused';startBtn.setAttribute('aria-pressed','false');startBtn.classList.remove('hidden');stopBtn.classList.add('hidden')}
speed.addEventListener('input',()=>{speedVal.textContent=`${speed.value} ms`;if(intervalId){startFlashing()}})
startBtn.addEventListener('click',()=>startFlashing())
stopBtn.addEventListener('click',()=>stopFlashing())
accept.addEventListener('click',()=>{warning.classList.add('hidden');startFlashing();startBtn.focus()})
decline.addEventListener('click',()=>{window.close();warning.classList.add('hidden');status.textContent='Cancelled';startBtn.disabled=true})
document.addEventListener('keydown',e=>{if(e.key==='Escape'){stopFlashing()} if((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==='k'){e.preventDefault();stopFlashing()}})
document.addEventListener('visibilitychange',()=>{if(document.hidden){stopFlashing()}})
window.addEventListener('beforeunload',e=>{if(intervalId){stopFlashing()}})