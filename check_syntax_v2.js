
// â”€â”€â”€ CURSOR â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const CUR=document.getElementById('cur'),CUR2=document.getElementById('cur2');
let mx=window.innerWidth/2,my=window.innerHeight/2,rx=mx,ry=my;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;});
(function lc(){
  CUR.style.left=mx+'px';CUR.style.top=my+'px';
  rx+=(mx-rx)*.12;ry+=(my-ry)*.12;
  CUR2.style.left=rx+'px';CUR2.style.top=ry+'px';
  requestAnimationFrame(lc);
})();
function addHov(el){
  el.addEventListener('mouseenter',()=>{CUR.classList.add('xl');CUR2.classList.add('xl');});
  el.addEventListener('mouseleave',()=>{CUR.classList.remove('xl');CUR2.classList.remove('xl');});
}
document.querySelectorAll('.cc,.wc,.tr,.gate-btn,.dot,#anv,#bnv,#mp,.pill,.ltr,.qb').forEach(addHov);

// â”€â”€â”€ LOADER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
let lp=0;const lf=document.getElementById('lf');
const li=setInterval(()=>{
  lp+=Math.random()*12+4;
  if(lp>=100){lp=100;clearInterval(li);setTimeout(()=>document.getElementById('ldr').classList.add('off'),600);}
  lf.style.width=lp+'%';
},120);

// â”€â”€â”€ CONSTANTS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const TOTAL=30;
console.log("Birthday Universe Script Starting...");
let activeLoop='gate-cv';
let globalMX=0,globalMY=0;
document.addEventListener('mousemove',e=>{globalMX=(e.clientX/window.innerWidth-.5)*2;globalMY=-(e.clientY/window.innerHeight-.5)*2;});

const renderRegistry = {};
function mainLoop() {
  if (activeLoop !== 'none' && renderRegistry[activeLoop]) {
    try {
      renderRegistry[activeLoop]();
    } catch (e) {
      console.error("Error in render loop:", activeLoop, e);
      activeLoop = 'none';
    }
  }
  requestAnimationFrame(mainLoop);
}

document.addEventListener('visibilitychange',()=>{
  if(document.hidden) {
    paused=activeLoop;
    activeLoop='none';
  } else {
    activeLoop=paused;
  }
});
let paused='gate-cv';

// â”€â”€â”€ NAV DOTS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const dotsEl=document.getElementById('dots');
for(let i=0;i<TOTAL;i++){const d=document.createElement('div');d.className='dot'+(i===0?' on':'');d.dataset.i=i;dotsEl.appendChild(d);}

// â”€â”€â”€ PAGE NAV â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
let curPg=0;
function goTo(n){
  if(n===curPg||n<0||n>=TOTAL)return;
  document.getElementById('pg'+curPg).classList.add('out');
  const prev=curPg;
  setTimeout(()=>document.getElementById('pg'+prev).classList.remove('on','out'),850);
  document.getElementById('pg'+n).classList.add('on');
  curPg=n;
  activeLoop='cv'+n;
  document.querySelectorAll('.dot').forEach((d,i)=>d.classList.toggle('on',i===n));
  document.getElementById('pgn').textContent=String(n+1).padStart(2,'0')+' / '+TOTAL;
  if(n===TOTAL-1)doBurst(window.innerWidth/2,window.innerHeight*.4,80);
}
document.getElementById('bnv').addEventListener('click',()=>goTo(curPg+1));
document.getElementById('anv').addEventListener('click',()=>goTo(curPg-1));
document.querySelectorAll('.dot').forEach(d=>d.addEventListener('click',()=>goTo(+d.dataset.i)));
document.addEventListener('keydown',e=>{if(e.key==='ArrowDown'||e.key==='PageDown')goTo(curPg+1);if(e.key==='ArrowUp'||e.key==='PageUp')goTo(curPg-1);});
let wcd=false;
document.addEventListener('wheel',e=>{if(wcd)return;wcd=true;setTimeout(()=>wcd=false,900);e.deltaY>0?goTo(curPg+1):goTo(curPg-1);},{passive:true});
let ts=0;
document.addEventListener('touchstart',e=>ts=e.touches[0].clientY,{passive:true});
document.addEventListener('touchend',e=>{const d=ts-e.changedTouches[0].clientY;if(Math.abs(d)>45){d>0?goTo(curPg+1):goTo(curPg-1);}},{passive:true});

// â”€â”€â”€ AUDIO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const aud=document.getElementById('aud'),dsc=document.getElementById('dsc'),mlbl=document.getElementById('mlbl');
let playing=false;
function tryAudio(){aud.volume=.3;aud.play().then(()=>{playing=true;dsc.classList.add('go');mlbl.textContent='â™ª Playing';}).catch(()=>{});}
document.getElementById('mp').addEventListener('click',()=>{
  if(!playing){aud.play();playing=true;dsc.classList.add('go');mlbl.textContent='â™ª Playing';}
  else{aud.pause();playing=false;dsc.classList.remove('go');mlbl.textContent='Play Music';}
});

// â”€â”€â”€ GATE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
let entered=false;
document.getElementById('gbtn').addEventListener('click',()=>{
  if(entered)return;entered=true;
  document.getElementById('gate').classList.add('bye');
  activeLoop='cv0';
  doBurst(window.innerWidth/2,window.innerHeight/2,70);
  tryAudio();
});

// â”€â”€â”€ CONFETTI â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function doBurst(cx,cy,n){
  const cf=document.getElementById('cf');
  const cols=['#FF6B8A','#FFD700','#C9A7EB','#7EFFD4','#FF9EC4','#87CEEB','#fff','#FF8B70'];
  for(let i=0;i<n;i++){
    const el=document.createElement('div');el.className='cfp';
    el.style.cssText=`left:${cx+(Math.random()*120-60)}px;top:${cy}px;background:${cols[i%cols.length]};border-radius:${Math.random()>.5?'50%':'3px'};animation-duration:${2.5+Math.random()*3}s;animation-delay:${Math.random()*.6}s;`;
    cf.appendChild(el);
  }
  setTimeout(()=>cf.innerHTML='',7000);
}

// â”€â”€â”€ CLICK SPARKS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
document.addEventListener('click',e=>{
  ['#FFD700','#FF6B8A','#7EFFD4','#C9A7EB','#FF9EC4','#fff'].forEach((col)=>{
    const sp=document.createElement('div');sp.className='spk';
    const angle=Math.random()*Math.PI*2,dist=50+Math.random()*80;
    sp.style.cssText=`left:${e.clientX}px;top:${e.clientY}px;width:7px;height:7px;background:${col};--dx:${Math.cos(angle)*dist}px;--dy:${Math.sin(angle)*dist}px;`;
    document.body.appendChild(sp);setTimeout(()=>sp.remove(),700);
  });
});

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// CANVAS BACKGROUND RENDERERS â€” All using 2D Canvas (no Three.js bugs)
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

// Helper: resize canvas
function initCanvas(id){
  const cv=document.getElementById(id);
  if(!cv)return null;
  const ctx=cv.getContext('2d');
  function rsz(){cv.width=window.innerWidth;cv.height=window.innerHeight;}
  rsz();window.addEventListener('resize',rsz);
  return{cv,ctx};
}

// â”€â”€ GATE CANVAS: Magical floating particle sky â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
(()=>{
  const cv=document.getElementById('gate-cv');
  const gl=cv.getContext('2d');
  let W,H;
  function rsz(){W=cv.width=window.innerWidth;H=cv.height=window.innerHeight;}rsz();
  window.addEventListener('resize',rsz);
  const pts=[];
  const pcols=['#FF6B8A','#FFD700','#C9A7EB','#7EFFD4','#fff','#FF9EC4','#87CEEB'];
  for(let i=0;i<180;i++)pts.push({x:Math.random()*W,y:Math.random()*H,r:.5+Math.random()*2,c:pcols[i%pcols.length],s:.2+Math.random()*.4,vx:(Math.random()-.5)*.2,vy:-(Math.random()*.2+.04)});
  let t=0;
  renderRegistry['gate-cv'] = () => {
    t+=.008;
    const bg=gl.createLinearGradient(0,0,0,H);
    bg.addColorStop(0,'#040210');bg.addColorStop(.5,'#110928');bg.addColorStop(1,'#1c0432');
    gl.fillStyle=bg;gl.fillRect(0,0,W,H);
    // Moon
    const mg=gl.createRadialGradient(W*.78,H*.16,0,W*.78,H*.16,85);
    mg.addColorStop(0,'rgba(255,245,180,1)');mg.addColorStop(.4,'rgba(255,215,0,.5)');mg.addColorStop(1,'rgba(255,215,0,0)');
    gl.fillStyle=mg;gl.beginPath();gl.arc(W*.78,H*.16,52,0,Math.PI*2);gl.fill();
    // Soft cloud puffs
    [[W*.08,H*.3,55],[W*.5,H*.14,40],[W*.7,H*.42,48]].forEach(([cx,cy,sz])=>{
      gl.save();gl.globalAlpha=.1;gl.fillStyle='#d0aaff';
      [-sz,0,sz,sz*1.5].forEach((ox,i)=>{gl.beginPath();gl.arc(cx+ox,cy+(i%2)*-10,sz*.7,0,Math.PI*2);gl.fill();});
      gl.restore();
    });
    // Floating stars/particles
    pts.forEach(p=>{
      p.x+=p.vx+(globalMX*.15);p.y+=p.vy;
      if(p.y<-5)p.y=H+5;if(p.x<-5)p.x=W+5;if(p.x>W+5)p.x=-5;
      const pulse=Math.abs(Math.sin(t*p.s*3+p.r));
      gl.save();gl.globalAlpha=.35+pulse*.6;gl.fillStyle=p.c;
      gl.beginPath();gl.arc(p.x,p.y,p.r+pulse*.8,0,Math.PI*2);gl.fill();gl.restore();
    });
    // Shooting stars
    if(Math.sin(t*0.3)>.97){
      const sx=Math.random()*W,sy=Math.random()*H*.4;
      gl.save();gl.globalAlpha=.7;gl.strokeStyle='#FFD700';gl.lineWidth=1.5;
      gl.beginPath();gl.moveTo(sx,sy);gl.lineTo(sx+60,sy+20);gl.stroke();gl.restore();
    }
  };
})();

// â”€â”€ BG00: Night sky â€” stars + moon + floating hearts â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
(()=>{
  const o=initCanvas('cv0');if(!o)return;
  const{cv,ctx:c}=o;
  const stars=[];for(let i=0;i<300;i++)stars.push({x:Math.random(),y:Math.random(),r:.5+Math.random()*1.5,b:Math.random()*Math.PI*2,s:.5+Math.random()*.5});
  const hearts=[];
  const hcols=['#FF6B8A','#FF9EC4','#C9A7EB','#FFD700','#7EFFD4'];
  for(let i=0;i<14;i++)hearts.push({x:Math.random(),y:Math.random(),size:10+Math.random()*22,col:hcols[i%5],vx:(Math.random()-.5)*.0004,vy:-(Math.random()*.0006+.0003),phase:Math.random()*Math.PI*2,rot:Math.random()*Math.PI*2});
  function drawHeart(ctx,x,y,size,col,alpha){
    ctx.save();ctx.globalAlpha=alpha;ctx.fillStyle=col;ctx.shadowColor=col;ctx.shadowBlur=12;ctx.translate(x,y);ctx.beginPath();
    ctx.moveTo(0,-size*.35);ctx.bezierCurveTo(size*.5,-size,size,-.4*size,size,.1*size);ctx.bezierCurveTo(size,.55*size,0,size*1.1,0,size*1.1);ctx.bezierCurveTo(0,size*1.1,-size,.55*size,-size,.1*size);ctx.bezierCurveTo(-size,-.4*size,-size*.5,-size,0,-size*.35);ctx.fill();ctx.restore();
  }
  let t=0;
  renderRegistry['cv0'] = () => {
    t+=.008;
    const W=cv.width,H=cv.height;
    const bg=c.createLinearGradient(0,0,0,H);
    bg.addColorStop(0,'#05010f');bg.addColorStop(.5,'#0d0520');bg.addColorStop(1,'#180830');
    c.fillStyle=bg;c.fillRect(0,0,W,H);
    // Moon
    const mg=c.createRadialGradient(W*.82,H*.12,0,W*.82,H*.12,70);
    mg.addColorStop(0,'#FFF5CC');mg.addColorStop(.6,'rgba(255,215,0,.4)');mg.addColorStop(1,'transparent');
    c.fillStyle=mg;c.beginPath();c.arc(W*.82,H*.12,45,0,Math.PI*2);c.fill();
    // Stars
    stars.forEach(s=>{
      const blink=.4+.6*Math.abs(Math.sin(t*s.s+s.b));
      c.globalAlpha=blink;c.fillStyle='#fff';c.beginPath();c.arc(s.x*W,s.y*H,s.r,0,Math.PI*2);c.fill();
    });c.globalAlpha=1;
    // Hearts
    hearts.forEach(h=>{
      h.x+=h.vx;h.y+=h.vy;h.rot+=.01;
      if(h.y<-.05)h.y=1.05;if(h.x<-.05)h.x=1.05;if(h.x>1.05)h.x=-.05;
      const alpha=.3+.5*Math.abs(Math.sin(t+h.phase));
      drawHeart(c,h.x*W,h.y*H,h.size,h.col,alpha);
    });c.globalAlpha=1;
  };
})();

// â”€â”€ BG01: Spiral galaxy â€” rotating rings of coloured dots â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
(()=>{
  const o=initCanvas('cv1');if(!o)return;
  const{cv,ctx:c}=o;
  const arms=[];
  const cols=['#FF6B8A','#7EFFD4','#C9A7EB','#FFD700','#FF9EC4','#87CEEB'];
  for(let a=0;a<6;a++){
    const pts=[];
    for(let i=0;i<120;i++){
      const rv=i*.12,angle=a/6*Math.PI*2+rv*.8+(Math.random()-.5)*.3;
      pts.push({rv,angle,col:cols[a],size:.8+Math.random()*2.5,phase:Math.random()*Math.PI*2});
    }
    arms.push(pts);
  }
  let t=0;
  renderRegistry['cv1'] = () => {
    t+=.006;
    const W=cv.width,H=cv.height,cx=W/2,cy=H/2;
    c.fillStyle='rgba(5,1,15,.18)';c.fillRect(0,0,W,H);
    // Core glow
    const grd=c.createRadialGradient(cx,cy,0,cx,cy,60);
    grd.addColorStop(0,'rgba(255,215,0,.8)');grd.addColorStop(.5,'rgba(255,107,138,.3)');grd.addColorStop(1,'transparent');
    c.fillStyle=grd;c.beginPath();c.arc(cx,cy,60,0,Math.PI*2);c.fill();
    arms.forEach(arm=>{
      arm.forEach(p=>{
        const angle=p.angle+t;
        const x=cx+Math.cos(angle)*p.rv*Math.min(W,H)*.042;
        const y=cy+Math.sin(angle)*p.rv*Math.min(W,H)*.028;
        const alpha=.3+.6*Math.abs(Math.sin(t*1.5+p.phase));
        c.globalAlpha=alpha;c.fillStyle=p.col;c.shadowColor=p.col;c.shadowBlur=6;
        c.beginPath();c.arc(x,y,p.size,0,Math.PI*2);c.fill();
      });
    });c.globalAlpha=1;c.shadowBlur=0;
  };
})();

// â”€â”€ BG02: Enchanted forest â€” trees + fireflies + bokeh â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
(()=>{
  const o=initCanvas('cv2');if(!o)return;
  const{cv,ctx:c}=o;
  const flies=[];for(let i=0;i<80;i++)flies.push({x:Math.random(),y:.2+Math.random()*.7,vx:(Math.random()-.5)*.0012,vy:(Math.random()-.5)*.0008,phase:Math.random()*Math.PI*2});
  function drawTree(ctx,x,y,W,H,h,col){
    // trunk
    ctx.fillStyle='#4a2800';ctx.fillRect(x-W*.012,y-h,W*.024,h);
    // layers
    [[0,h,W*.12,H*.14],[0,h*.75,W*.1,H*.16],[0,h*.45,W*.08,H*.18]].forEach(([ox,oh,tw,th])=>{
      ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(x+ox,y-oh);ctx.lineTo(x-tw,y-oh+th);ctx.lineTo(x+tw,y-oh+th);ctx.closePath();ctx.fill();
    });
  }
  const treeCols=['#1a4a1a','#2a5e2a','#0e3a0e','#3a6e3a','#165016'];
  const treeData=[];
  for(let i=0;i<12;i++)treeData.push({xr:.04+i*.08+Math.random()*.04,hr:.25+Math.random()*.18,col:treeCols[i%5]});
  let t=0;
  renderRegistry['cv2'] = () => {
    t+=.01;
    const W=cv.width,H=cv.height;
    const bg=c.createLinearGradient(0,0,0,H);
    bg.addColorStop(0,'#040c04');bg.addColorStop(.5,'#0a180a');bg.addColorStop(.8,'#0d200d');bg.addColorStop(1,'#162b10');
    c.fillStyle=bg;c.fillRect(0,0,W,H);
    // Moon glow through trees
    const mg=c.createRadialGradient(W*.5,H*.08,0,W*.5,H*.08,H*.25);
    mg.addColorStop(0,'rgba(201,167,235,.35)');mg.addColorStop(1,'transparent');
    c.fillStyle=mg;c.fillRect(0,0,W,H);
    // Trees
    treeData.forEach(td=>drawTree(c,td.xr*W,H,W,H,td.hr*H,td.col));
    // Ground
    c.fillStyle='#0c1e08';c.fillRect(0,H*.85,W,H*.15);
    // Fireflies
    flies.forEach(f=>{
      f.x+=f.vx;f.y+=f.vy+Math.sin(t+f.phase)*.0004;
      if(f.x<0)f.x=1;if(f.x>1)f.x=0;if(f.y<.2)f.y=.9;if(f.y>.85)f.y=.2;
      const alpha=.4+.6*Math.abs(Math.sin(t*2+f.phase));
      c.globalAlpha=alpha;c.fillStyle='#ccff88';c.shadowColor='#88ff44';c.shadowBlur=8;
      c.beginPath();c.arc(f.x*W,f.y*H,2.5,0,Math.PI*2);c.fill();
    });c.globalAlpha=1;c.shadowBlur=0;
  };
})();

// â”€â”€ BG03: Ocean world â€” waves + jellyfish â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
(()=>{
  const o=initCanvas('cv3');if(!o)return;
  const{cv,ctx:c}=o;
  const jellyfish=[];
  const jcols=['#FF6B8A','#C9A7EB','#7EFFD4','#FFD700','#FF9EC4'];
  for(let i=0;i<6;i++)jellyfish.push({x:.1+i*.16,y:.2+Math.random()*.5,phase:Math.random()*Math.PI*2,col:jcols[i%5],size:.04+Math.random()*.04});
  let t=0;
  renderRegistry['cv3'] = () => {
    t+=.01;
    const W=cv.width,H=cv.height;
    const bg=c.createLinearGradient(0,0,0,H);
    bg.addColorStop(0,'#010818');bg.addColorStop(.4,'#021428');bg.addColorStop(1,'#041c38');
    c.fillStyle=bg;c.fillRect(0,0,W,H);
    // Bioluminescent glow
    [[.2,.5,'rgba(126,255,212,.06)'],[.7,.4,'rgba(255,107,138,.05)'],[.5,.8,'rgba(135,206,235,.07)']].forEach(([gx,gy,col])=>{
      const gr=c.createRadialGradient(gx*W,gy*H,0,gx*W,gy*H,W*.28);
      gr.addColorStop(0,col);gr.addColorStop(1,'transparent');
      c.fillStyle=gr;c.fillRect(0,0,W,H);
    });
    // Waves
    for(let layer=0;layer<6;layer++){
      const yBase=H*(.45+layer*.1);
      const alpha=.15+layer*.06;const hue=210+layer*8;
      c.beginPath();c.moveTo(0,H);
      for(let x=0;x<=W;x+=5){
        const wave=Math.sin(x*.012+t+layer*.7)*18+Math.sin(x*.007+t*.8+layer)* 12;
        c.lineTo(x,yBase+wave);
      }
      c.lineTo(W,H);c.closePath();
      c.fillStyle=`hsla(${hue},70%,${20+layer*5}%,${alpha})`;c.fill();
    }
    // Jellyfish
    jellyfish.forEach(j=>{
      j.y+=Math.sin(t+j.phase)*.0012;
      const px=j.x*W,py=j.y*H,sz=j.size*Math.min(W,H);
      c.save();c.globalAlpha=.65;c.fillStyle=j.col;c.shadowColor=j.col;c.shadowBlur=20;
      // Dome
      c.beginPath();c.arc(px,py,sz,Math.PI,Math.PI*2);c.fill();
      // Tentacles
      c.globalAlpha=.35;c.strokeStyle=j.col;c.lineWidth=1.5;
      for(let tt=0;tt<6;tt++){
        const tx=px+(tt-2.5)*sz*.3;
        c.beginPath();c.moveTo(tx,py);
        c.bezierCurveTo(tx+Math.sin(t+tt)*sz*.4,py+sz*.6,tx+Math.sin(t*1.3+tt)*sz*.3,py+sz*1.2,tx+Math.sin(t+tt*2)*sz*.2,py+sz*1.8);
        c.stroke();
      }
      c.restore();
    });
    // Bubbles
    c.globalAlpha=1;
  };
})();

// â”€â”€ BG04: Nebula â€” swirling colour clouds â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
(()=>{
  const o=initCanvas('cv4');if(!o)return;
  const{cv,ctx:c}=o;
  const clouds=[];
  const ncols=['rgba(255,107,138,','rgba(201,167,235,','rgba(255,215,0,','rgba(126,255,212,','rgba(135,206,235,'];
  for(let i=0;i<20;i++)clouds.push({x:Math.random(),y:Math.random(),r:.08+Math.random()*.2,col:ncols[i%5],phase:Math.random()*Math.PI*2,s:.3+Math.random()*.4,vx:(Math.random()-.5)*.0005,vy:(Math.random()-.5)*.0003});
  const stars2=[];for(let i=0;i<200;i++)stars2.push({x:Math.random(),y:Math.random(),r:.5+Math.random()*2,b:Math.random()*Math.PI*2});
  let t=0;
  renderRegistry['cv4'] = () => {
    t+=.006;
    const W=cv.width,H=cv.height;
    c.fillStyle='rgba(8,3,20,.12)';c.fillRect(0,0,W,H);
    // Stars
    stars2.forEach(s=>{
      const a=.3+.7*Math.abs(Math.sin(t*.5+s.b));
      c.globalAlpha=a;c.fillStyle='#fff';c.beginPath();c.arc(s.x*W,s.y*H,s.r,0,Math.PI*2);c.fill();
    });c.globalAlpha=1;
    // Nebula clouds
    clouds.forEach(cl=>{
      cl.x+=cl.vx;cl.y+=cl.vy+Math.sin(t*cl.s+cl.phase)*.0002;
      if(cl.x<-.2)cl.x=1.2;if(cl.x>1.2)cl.x=-.2;
      const alpha=.04+.06*Math.abs(Math.sin(t*cl.s+cl.phase));
      const grd=c.createRadialGradient(cl.x*W,cl.y*H,0,cl.x*W,cl.y*H,cl.r*Math.min(W,H));
      grd.addColorStop(0,cl.col+(alpha*5).toFixed(2)+')');
      grd.addColorStop(1,cl.col+'0)');
      c.fillStyle=grd;c.fillRect(0,0,W,H);
    });
    // Crystal shards
    const shardCols=['#FF6B8A','#C9A7EB','#FFD700','#7EFFD4'];
    for(let i=0;i<8;i++){
      const a=i/8*Math.PI*2+t*.2,rv=0.28;
      const px=(0.5+Math.cos(a)*rv)*W,py=(0.5+Math.sin(a)*rv*.6)*H;
      c.save();c.globalAlpha=.6;c.fillStyle=shardCols[i%4];c.shadowColor=shardCols[i%4];c.shadowBlur=20;
      c.translate(px,py);c.rotate(t+i);
      c.beginPath();c.moveTo(0,-14);c.lineTo(6,0);c.lineTo(0,14);c.lineTo(-6,0);c.closePath();c.fill();
      c.restore();
    }c.globalAlpha=1;c.shadowBlur=0;
  };
})();

// â”€â”€ BG05: Candy land â€” rainbow swirls + floating treats â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
(()=>{
  const o=initCanvas('cv5');if(!o)return;
  const{cv,ctx:c}=o;
  const candies=[];
  const ccols=['#FF6B8A','#FFD700','#C9A7EB','#7EFFD4','#FF9EC4','#FF8B70'];
  for(let i=0;i<20;i++)candies.push({x:Math.random(),y:Math.random(),size:8+Math.random()*20,col:ccols[i%6],vx:(Math.random()-.5)*.0006,vy:-(Math.random()*.0005+.0002),phase:Math.random()*Math.PI*2,rot:Math.random()*Math.PI*2,type:i%3});
  const stars3=[];for(let i=0;i<150;i++)stars3.push({x:Math.random(),y:Math.random(),r:.5+Math.random()*1.5,col:ccols[i%6],b:Math.random()*Math.PI*2});
  let t=0;
  renderRegistry['cv5'] = () => {
    t+=.009;
    const W=cv.width,H=cv.height;
    const bg=c.createLinearGradient(0,0,W,H);
    bg.addColorStop(0,'#1a0520');bg.addColorStop(.3,'#200a30');bg.addColorStop(.6,'#180828');bg.addColorStop(1,'#100615');
    c.fillStyle=bg;c.fillRect(0,0,W,H);
    // Rainbow swirl
    for(let i=0;i<8;i++){
      const a=i/8*Math.PI*2+t*.3,sw=W*.06;
      const gr=c.createLinearGradient(W*.5,H*.5,W*.5+Math.cos(a)*W*.4,H*.5+Math.sin(a)*H*.35);
      gr.addColorStop(0,`hsla(${i*45},90%,60%,0)`);gr.addColorStop(.5,`hsla(${i*45},90%,60%,.06)`);gr.addColorStop(1,`hsla(${i*45},90%,60%,0)`);
      c.fillStyle=gr;c.fillRect(0,0,W,H);
    }
    // Stars
    stars3.forEach(s=>{
      const a=.3+.7*Math.abs(Math.sin(t*.8+s.b));
      c.globalAlpha=a;c.fillStyle=s.col;c.shadowColor=s.col;c.shadowBlur=5;
      c.beginPath();c.arc(s.x*W,s.y*H,s.r,0,Math.PI*2);c.fill();
    });c.globalAlpha=1;c.shadowBlur=0;
    // Candies
    candies.forEach(cd=>{
      cd.x+=cd.vx;cd.y+=cd.vy+Math.sin(t+cd.phase)*.0003;cd.rot+=.012;
      if(cd.y<-.05)cd.y=1.05;if(cd.x<0)cd.x=1;if(cd.x>1)cd.x=0;
      const px=cd.x*W,py=cd.y*H;
      c.save();c.globalAlpha=.75;c.fillStyle=cd.col;c.shadowColor=cd.col;c.shadowBlur=15;
      c.translate(px,py);c.rotate(cd.rot);
      if(cd.type===0){// circle
        c.beginPath();c.arc(0,0,cd.size,0,Math.PI*2);c.fill();
        c.globalAlpha=.3;c.fillStyle='#fff';c.beginPath();c.arc(-cd.size*.25,-cd.size*.25,cd.size*.25,0,Math.PI*2);c.fill();
      }else if(cd.type===1){// star
        c.beginPath();for(let i=0;i<5;i++){const a=i*Math.PI*.4-Math.PI*.5;c.lineTo(Math.cos(a)*cd.size,Math.sin(a)*cd.size);c.lineTo(Math.cos(a+Math.PI*.2)*cd.size*.5,Math.sin(a+Math.PI*.2)*cd.size*.5);}c.closePath();c.fill();
      }else{// diamond
        c.beginPath();c.moveTo(0,-cd.size);c.lineTo(cd.size*.6,0);c.lineTo(0,cd.size);c.lineTo(-cd.size*.6,0);c.closePath();c.fill();
      }
      c.restore();
    });c.globalAlpha=1;c.shadowBlur=0;
  };
})();

// â”€â”€ BG06: Crystal cave â€” gem shards + light beams â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
(()=>{
  const o=initCanvas('cv6');if(!o)return;
  const{cv,ctx:c}=o;
  const gems=[];
  const gcols=['#FF6B8A','#C9A7EB','#FFD700','#7EFFD4','#87CEEB','#FF9EC4'];
  for(let i=0;i<35;i++)gems.push({x:Math.random(),y:Math.random(),size:8+Math.random()*22,col:gcols[i%6],rot:Math.random()*Math.PI*2,vrot:.005+Math.random()*.01,phase:Math.random()*Math.PI*2});
  let t=0;
  renderRegistry['cv6'] = () => {
    t+=.007;
    const W=cv.width,H=cv.height;
    const bg=c.createLinearGradient(0,0,0,H);
    bg.addColorStop(0,'#050018');bg.addColorStop(.5,'#0a0025');bg.addColorStop(1,'#080020');
    c.fillStyle=bg;c.fillRect(0,0,W,H);
    // Light beams
    for(let i=0;i<5;i++){
      const bx=(i*.22+.05)*W,by=0,bw=30+i*8;
      const gr=c.createLinearGradient(bx,by,bx+bw*.3,H);
      gr.addColorStop(0,gcols[i]+'88');gr.addColorStop(.5,gcols[i]+'22');gr.addColorStop(1,'transparent');
      c.save();c.globalAlpha=.15+.1*Math.sin(t+i);c.fillStyle=gr;
      c.beginPath();c.moveTo(bx,by);c.lineTo(bx+bw,by);c.lineTo(bx+bw*2.5,H);c.lineTo(bx-bw,H);c.closePath();c.fill();
      c.restore();
    }
    // Central diamond
    const cx=W*.5,cy=H*.5;
    const gr=c.createRadialGradient(cx,cy,0,cx,cy,80);
    gr.addColorStop(0,'rgba(201,167,235,.6)');gr.addColorStop(.5,'rgba(255,215,0,.2)');gr.addColorStop(1,'transparent');
    c.fillStyle=gr;c.fillRect(0,0,W,H);
    // Gem shards
    gems.forEach(g=>{
      g.rot+=g.vrot;
      const px=g.x*W,py=g.y*H;
      const alpha=.5+.4*Math.abs(Math.sin(t+g.phase));
      c.save();c.globalAlpha=alpha;c.fillStyle=g.col;c.shadowColor=g.col;c.shadowBlur=18;
      c.translate(px,py);c.rotate(g.rot);
      c.beginPath();c.moveTo(0,-g.size);c.lineTo(g.size*.5,0);c.lineTo(0,g.size);c.lineTo(-g.size*.5,0);c.closePath();c.fill();
      c.globalAlpha=alpha*.4;c.fillStyle='#fff';c.beginPath();c.moveTo(0,-g.size);c.lineTo(g.size*.2,-g.size*.3);c.lineTo(0,-g.size*.1);c.closePath();c.fill();
      c.restore();
    });c.globalAlpha=1;c.shadowBlur=0;
  };
})();

// â”€â”€ BG07: Aurora sky â€” northern lights ribbons â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
(()=>{
  const o=initCanvas('cv7');if(!o)return;
  const{cv,ctx:c}=o;
  const starsA=[];for(let i=0;i<250;i++)starsA.push({x:Math.random(),y:Math.random()*0.6,r:.4+Math.random()*1.4,b:Math.random()*Math.PI*2});
  const acols=['#7EFFD4','#C9A7EB','#87CEEB','#FF6B8A','#FFD700'];
  let t=0;
  renderRegistry['cv7'] = () => {
    t+=.008;
    const W=cv.width,H=cv.height;
    const bg=c.createLinearGradient(0,0,0,H);
    bg.addColorStop(0,'#010510');bg.addColorStop(.6,'#030d1a');bg.addColorStop(1,'#0a1505');
    c.fillStyle=bg;c.fillRect(0,0,W,H);
    // Stars
    starsA.forEach(s=>{
      const a=.2+.7*Math.abs(Math.sin(t*.4+s.b));
      c.globalAlpha=a;c.fillStyle='#cce0ff';c.beginPath();c.arc(s.x*W,s.y*H,s.r,0,Math.PI*2);c.fill();
    });c.globalAlpha=1;
    // Aurora ribbons
    for(let layer=0;layer<5;layer++){
      const yBase=H*(.2+layer*.12);
      const col=acols[layer];
      c.save();c.globalAlpha=.18+.08*Math.sin(t*.5+layer);
      c.strokeStyle=col;c.lineWidth=H*.06+layer*4;c.lineCap='round';c.shadowColor=col;c.shadowBlur=30;
      c.beginPath();
      for(let x=0;x<=W;x+=8){
        const y=yBase+Math.sin(x*.006+t*.8+layer*1.2)*H*.07+Math.sin(x*.003+t*.5)*H*.05;
        x===0?c.moveTo(x,y):c.lineTo(x,y);
      }
      c.stroke();c.restore();
    }
    // Mountain silhouettes
    c.fillStyle='#050f05';c.beginPath();c.moveTo(0,H);
    const mpts=[[0,H*.8],[.08,H*.55],[.15,H*.65],[.22,H*.5],[.3,H*.62],[.38,H*.48],[.46,H*.58],[.55,H*.45],[.62,H*.6],[.7,H*.52],[.78,H*.65],[.86,H*.55],[.95,H*.68],[1,H*.75],[1,H]];
    mpts.forEach(([x,y])=>c.lineTo(x*W,y));c.closePath();c.fill();
  };
})();

// â”€â”€ BG08: Rainbow waterfall â€” cascading arcs â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
(()=>{
  const o=initCanvas('cv8');if(!o)return;
  const{cv,ctx:c}=o;
  const drops=[];
  for(let i=0;i<200;i++){
    const col=`hsl(${Math.floor(Math.random()*360)},90%,65%)`;
    drops.push({x:Math.random(),y:Math.random(),vy:.003+Math.random()*.005,col,size:1.5+Math.random()*3});
  }
  let t=0;
  renderRegistry['cv8'] = () => {
    t+=.01;
    const W=cv.width,H=cv.height;
    const bg=c.createLinearGradient(0,0,0,H);
    bg.addColorStop(0,'#080215');bg.addColorStop(.5,'#0e0520');bg.addColorStop(1,'#180830');
    c.fillStyle=bg;c.fillRect(0,0,W,H);
    // Rainbow arches
    for(let i=0;i<7;i++){
      const gr=c.createRadialGradient(W*.5,H*.7,H*(i*.08),W*.5,H*.7,H*(.08+i*.11));
      gr.addColorStop(0,'transparent');
      gr.addColorStop(.45,`hsla(${i*51},90%,62%,0)`);
      gr.addColorStop(.5,`hsla(${i*51},90%,62%,.35)`);
      gr.addColorStop(.55,`hsla(${i*51},90%,62%,0)`);
      gr.addColorStop(1,'transparent');
      c.fillStyle=gr;c.fillRect(0,0,W,H);
    }
    // Mist at bottom
    const mist=c.createLinearGradient(0,H*.55,0,H);
    mist.addColorStop(0,'transparent');mist.addColorStop(.5,'rgba(180,220,255,.08)');mist.addColorStop(1,'rgba(200,230,255,.15)');
    c.fillStyle=mist;c.fillRect(0,0,W,H);
    // Falling drops
    drops.forEach(d=>{
      d.y+=d.vy;if(d.y>1)d.y=0;
      c.globalAlpha=.7;c.fillStyle=d.col;c.shadowColor=d.col;c.shadowBlur=4;
      c.beginPath();c.ellipse(d.x*W,d.y*H,d.size*.5,d.size,0,0,Math.PI*2);c.fill();
    });c.globalAlpha=1;c.shadowBlur=0;
  };
})();

// â”€â”€ BG09: Cherry blossom â€” pink petals raining â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
(()=>{
  const o=initCanvas('cv9');if(!o)return;
  const{cv,ctx:c}=o;
  const petals=[];
  for(let i=0;i<160;i++)petals.push({x:Math.random(),y:Math.random(),vx:(Math.random()-.5)*.0015,vy:.001+Math.random()*.003,rot:Math.random()*Math.PI*2,vrot:.02+Math.random()*.04,size:4+Math.random()*10,phase:Math.random()*Math.PI*2,col:Math.random()>.5?'#FF9EC4':'#FFB6D1'});
  let t=0;
  function drawPetal(ctx,x,y,size,rot,col){
    ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.fillStyle=col;ctx.shadowColor=col;ctx.shadowBlur=6;
    ctx.beginPath();ctx.ellipse(0,0,size,size*.55,0,0,Math.PI*2);ctx.fill();
    ctx.restore();
  }
  renderRegistry['cv9'] = () => {
    t+=.01;
    const W=cv.width,H=cv.height;
    const bg=c.createLinearGradient(0,0,0,H);
    bg.addColorStop(0,'#1a040e');bg.addColorStop(.4,'#28081a');bg.addColorStop(1,'#1c0614');
    c.fillStyle=bg;c.fillRect(0,0,W,H);
    // Pink sky glow
    [[.3,.3,'rgba(255,150,196,.1)'],[.7,.5,'rgba(201,167,235,.08)'],[.5,.8,'rgba(255,100,150,.06)']].forEach(([gx,gy,col])=>{
      const gr=c.createRadialGradient(gx*W,gy*H,0,gx*W,gy*H,W*.4);
      gr.addColorStop(0,col);gr.addColorStop(1,'transparent');
      c.fillStyle=gr;c.fillRect(0,0,W,H);
    });
    // Cherry trees silhouette
    [[.15,H*.5,.2],[.5,H*.45,.24],[.82,H*.52,.18]].forEach(([tx,ty,sz])=>{
      c.fillStyle='#1a0810';c.fillRect(tx*W-5,ty,10,H-ty);
      c.globalAlpha=.4;c.fillStyle='#cc6688';
      for(let i=0;i<8;i++){
        const bx=tx*W+(Math.random()-.5)*W*sz*2,by=ty-(Math.random()*.3+.05)*H;
        c.beginPath();c.arc(bx,by,W*sz*.12+Math.random()*W*sz*.08,0,Math.PI*2);c.fill();
      }
      c.globalAlpha=1;
    });
    // Petals
    petals.forEach(p=>{
      p.x+=p.vx+Math.sin(t+p.phase)*.0008;p.y+=p.vy;p.rot+=p.vrot;
      if(p.y>1.05){p.y=-0.05;p.x=Math.random();}
      c.globalAlpha=.75;
      drawPetal(c,p.x*W,p.y*H,p.size,p.rot,p.col);
    });c.globalAlpha=1;c.shadowBlur=0;
  };
})();

// â”€â”€ BG10: Diamond palace â€” gold pillars + rotating crown â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
(()=>{
  const o=initCanvas('cv10');if(!o)return;
  const{cv,ctx:c}=o;
  const starsG=[];for(let i=0;i<180;i++)starsG.push({x:Math.random(),y:Math.random()*0.5,r:.4+Math.random()*1.8,b:Math.random()*Math.PI*2});
  let t=0;
  renderRegistry['cv10'] = () => {
    t+=.008;
    const W=cv.width,H=cv.height;
    const bg=c.createLinearGradient(0,0,0,H);
    bg.addColorStop(0,'#08060a');bg.addColorStop(.5,'#110d18');bg.addColorStop(1,'#0d0810');
    c.fillStyle=bg;c.fillRect(0,0,W,H);
    starsG.forEach(s=>{
      const a=.3+.6*Math.abs(Math.sin(t*.5+s.b));
      c.globalAlpha=a;c.fillStyle='#FFD700';c.beginPath();c.arc(s.x*W,s.y*H,s.r,0,Math.PI*2);c.fill();
    });c.globalAlpha=1;
    // Gold pillars
    const pilCol='rgba(255,215,0,';
    [.1,.25,.4,.55,.7,.85,.95].forEach(px=>{
      const gr=c.createLinearGradient(px*W-10,0,px*W+10,0);
      gr.addColorStop(0,pilCol+'0)');gr.addColorStop(.3,pilCol+'.15)');gr.addColorStop(.5,pilCol+'.3)');gr.addColorStop(.7,pilCol+'.15)');gr.addColorStop(1,pilCol+'0)');
      c.fillStyle=gr;c.fillRect(px*W-10,H*.3,20,H*.7);
      // Capital
      c.fillStyle='rgba(255,215,0,.5)';
      c.beginPath();c.arc(px*W,H*.3,12,0,Math.PI*2);c.fill();
    });
    // Floor reflection
    const fgr=c.createLinearGradient(0,H*.8,0,H);
    fgr.addColorStop(0,'rgba(255,215,0,.05)');fgr.addColorStop(1,'rgba(255,215,0,.02)');
    c.fillStyle=fgr;c.fillRect(0,H*.8,W,H*.2);
    // Central crown
    const cx=W*.5,cy=H*.45;
    c.save();c.translate(cx,cy);c.rotate(t*.3);
    c.strokeStyle='#FFD700';c.lineWidth=3;c.shadowColor='#FFD700';c.shadowBlur=20;
    // Crown ring
    for(let i=0;i<6;i++){
      const a=i/6*Math.PI*2;
      c.save();c.globalAlpha=.6;c.fillStyle='#FFD700';c.beginPath();c.arc(Math.cos(a)*55,Math.sin(a)*40,8,0,Math.PI*2);c.fill();c.restore();
    }
    c.beginPath();for(let i=0;i<361;i++){const a=i*Math.PI/180;c.lineTo(Math.cos(a)*55,Math.sin(a)*40);}c.closePath();c.stroke();
    c.restore();c.shadowBlur=0;
  };
})();

// â”€â”€ BG11: Cosmic garden â€” floating flowers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
(()=>{
  const o=initCanvas('cv11');if(!o)return;
  const{cv,ctx:c}=o;
  const flowers=[];
  const fcols=['#FF6B8A','#C9A7EB','#FFD700','#FF9EC4','#7EFFD4'];
  for(let i=0;i<20;i++)flowers.push({x:Math.random(),y:Math.random(),col:fcols[i%5],size:12+Math.random()*22,vx:(Math.random()-.5)*.0004,vy:-(Math.random()*.0004+.0001),rot:Math.random()*Math.PI*2,vrot:.005+Math.random()*.008,phase:Math.random()*Math.PI*2});
  function drawFlower(ctx,x,y,size,col,rot,alpha){
    ctx.save();ctx.globalAlpha=alpha;ctx.translate(x,y);ctx.rotate(rot);
    ctx.shadowColor=col;ctx.shadowBlur=12;
    for(let p=0;p<6;p++){const a=p/6*Math.PI*2;ctx.fillStyle=col;ctx.beginPath();ctx.ellipse(Math.cos(a)*size*.6,Math.sin(a)*size*.6,size*.45,size*.25,a,0,Math.PI*2);ctx.fill();}
    ctx.fillStyle='#FFD700';ctx.beginPath();ctx.arc(0,0,size*.28,0,Math.PI*2);ctx.fill();
    ctx.restore();
  }
  let t=0;
  renderRegistry['cv11'] = () => {
    t+=.008;
    const W=cv.width,H=cv.height;
    const bg=c.createLinearGradient(0,0,0,H);
    bg.addColorStop(0,'#08021a');bg.addColorStop(.5,'#100328');bg.addColorStop(1,'#0c0520');
    c.fillStyle=bg;c.fillRect(0,0,W,H);
    // Soft glow
    [[.4,.4,'rgba(255,107,138,.08)'],[.6,.6,'rgba(201,167,235,.07)'],[.5,.2,'rgba(255,215,0,.06)']].forEach(([gx,gy,gcol])=>{
      const gr=c.createRadialGradient(gx*W,gy*H,0,gx*W,gy*H,W*.35);
      gr.addColorStop(0,gcol);gr.addColorStop(1,'transparent');
      c.fillStyle=gr;c.fillRect(0,0,W,H);
    });
    flowers.forEach(f=>{
      f.x+=f.vx;f.y+=f.vy+Math.sin(t+f.phase)*.0003;f.rot+=f.vrot;
      if(f.y<-.08)f.y=1.08;if(f.x<0)f.x=1;if(f.x>1)f.x=0;
      const alpha=.4+.55*Math.abs(Math.sin(t*1.2+f.phase));
      drawFlower(c,f.x*W,f.y*H,f.size,f.col,f.rot,alpha);
    });c.globalAlpha=1;c.shadowBlur=0;
  };
})();

// â”€â”€ BG12: Volcanic sunset â€” lava + ember particles â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
(()=>{
  const o=initCanvas('cv12');if(!o)return;
  const{cv,ctx:c}=o;
  const embers=[];
  for(let i=0;i<120;i++)embers.push({x:Math.random(),y:.6+Math.random()*.4,vx:(Math.random()-.5)*.002,vy:-(Math.random()*.003+.001),size:1.5+Math.random()*4,col:Math.random()>.5?'#FF4500':'#FFD700',alpha:Math.random(),phase:Math.random()*Math.PI*2});
  let t=0;
  renderRegistry['cv12'] = () => {
    t+=.01;
    const W=cv.width,H=cv.height;
    const bg=c.createLinearGradient(0,0,0,H);
    bg.addColorStop(0,'#050005');bg.addColorStop(.3,'#1a0500');bg.addColorStop(.6,'#2a0800');bg.addColorStop(.85,'#400c00');bg.addColorStop(1,'#ff2a00');
    c.fillStyle=bg;c.fillRect(0,0,W,H);
    // Lava glow
    const lg=c.createRadialGradient(W*.5,H,0,W*.5,H,W*.6);
    lg.addColorStop(0,'rgba(255,60,0,.5)');lg.addColorStop(.4,'rgba(255,140,0,.2)');lg.addColorStop(1,'transparent');
    c.fillStyle=lg;c.fillRect(0,0,W,H);
    // Sun/moon in sky
    const sg=c.createRadialGradient(W*.5,H*.15,0,W*.5,H*.15,60);
    sg.addColorStop(0,'rgba(255,180,0,.9)');sg.addColorStop(.5,'rgba(255,100,0,.4)');sg.addColorStop(1,'transparent');
    c.fillStyle=sg;c.beginPath();c.arc(W*.5,H*.15,40,0,Math.PI*2);c.fill();
    // Volcano silhouette
    c.fillStyle='#0a0200';c.beginPath();c.moveTo(0,H);c.lineTo(W*.2,H*.4);c.lineTo(W*.35,H*.55);c.lineTo(W*.5,H*.3);c.lineTo(W*.65,H*.5);c.lineTo(W*.85,H*.38);c.lineTo(W,H*.6);c.lineTo(W,H);c.closePath();c.fill();
    // Lava rivers
    c.strokeStyle='rgba(255,100,0,.6)';c.lineWidth=3;
    c.beginPath();c.moveTo(W*.5,H*.3);c.bezierCurveTo(W*.52,H*.45,W*.48,H*.6,W*.5,H*.75);c.stroke();
    // Embers
    embers.forEach(e=>{
      e.x+=e.vx+Math.sin(t+e.phase)*.001;e.y+=e.vy;e.alpha-=.004;
      if(e.y<-.05||e.alpha<=0){e.y=.65+Math.random()*.35;e.x=.3+Math.random()*.4;e.alpha=.8+Math.random()*.2;e.vy=-(Math.random()*.003+.001);}
      c.globalAlpha=e.alpha;c.fillStyle=e.col;c.shadowColor=e.col;c.shadowBlur=8;
      c.beginPath();c.arc(e.x*W,e.y*H,e.size,0,Math.PI*2);c.fill();
    });c.globalAlpha=1;c.shadowBlur=0;
  };
})();

// â”€â”€ BG13: Space station â€” satellites + star clusters â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
(()=>{
  const o=initCanvas('cv13');if(!o)return;
  const{cv,ctx:c}=o;
  const starsS=[];for(let i=0;i<400;i++)starsS.push({x:Math.random(),y:Math.random(),r:.3+Math.random()*1.5,b:Math.random()*Math.PI*2});
  const orbiters=[];
  for(let i=0;i<5;i++)orbiters.push({angle:Math.random()*Math.PI*2,speed:.004+i*.003,rv:.28+i*.04,col:['#FF6B8A','#FFD700','#7EFFD4','#C9A7EB','#FF9EC4'][i]});
  let t=0;
  renderRegistry['cv13'] = () => {
    t+=.008;
    const W=cv.width,H=cv.height,cx=W*.5,cy=H*.5;
    c.fillStyle='rgba(3,1,12,.15)';c.fillRect(0,0,W,H);
    // Stars
    starsS.forEach(s=>{
      const a=.2+.7*Math.abs(Math.sin(t*.3+s.b));
      c.globalAlpha=a;c.fillStyle='#cce8ff';c.beginPath();c.arc(s.x*W,s.y*H,s.r,0,Math.PI*2);c.fill();
    });c.globalAlpha=1;
    // Earth glow
    const eg=c.createRadialGradient(cx,cy,0,cx,cy,H*.25);
    eg.addColorStop(0,'rgba(30,80,200,.3)');eg.addColorStop(.6,'rgba(0,150,100,.15)');eg.addColorStop(1,'transparent');
    c.fillStyle=eg;c.fillRect(0,0,W,H);
    // Orbital paths
    c.strokeStyle='rgba(255,215,0,.08)';c.lineWidth=1;
    orbiters.forEach((o2,i)=>{
      c.beginPath();c.ellipse(cx,cy,o2.rv*W*.9,o2.rv*H*.6,0,0,Math.PI*2);c.stroke();
    });
    // Orbiters (satellites)
    orbiters.forEach(o2=>{
      o2.angle+=o2.speed;
      const ox=cx+Math.cos(o2.angle)*o2.rv*W*.88;
      const oy=cy+Math.sin(o2.angle)*o2.rv*H*.58;
      c.fillStyle=o2.col;c.shadowColor=o2.col;c.shadowBlur=14;c.globalAlpha=.85;
      c.fillRect(ox-8,oy-3,16,6);// body
      c.fillRect(ox-18,oy-2,8,4);// left panel
      c.fillRect(ox+10,oy-2,8,4);// right panel
      c.globalAlpha=1;c.shadowBlur=0;
    });
  };
})();

// â”€â”€ BG14: Magic recipe â€” potion bubbles â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
(()=>{
  const o=initCanvas('cv14');if(!o)return;
  const{cv,ctx:c}=o;
  const bubbles=[];
  const bcols=['#FF6B8A','#C9A7EB','#FFD700','#7EFFD4','#FF9EC4','#87CEEB'];
  for(let i=0;i<60;i++)bubbles.push({x:Math.random(),y:1+Math.random(),vy:-.003-.002*Math.random(),size:8+Math.random()*28,col:bcols[i%6],phase:Math.random()*Math.PI*2});
  let t=0;
  renderRegistry['cv14'] = () => {
    t+=.009;
    const W=cv.width,H=cv.height;
    const bg=c.createLinearGradient(0,0,0,H);
    bg.addColorStop(0,'#04000e');bg.addColorStop(.5,'#0a0218');bg.addColorStop(1,'#140428');
    c.fillStyle=bg;c.fillRect(0,0,W,H);
    // Cauldron glow
    const cg=c.createRadialGradient(W*.5,H*.85,0,W*.5,H*.85,W*.35);
    cg.addColorStop(0,'rgba(201,167,235,.3)');cg.addColorStop(.4,'rgba(126,255,212,.15)');cg.addColorStop(1,'transparent');
    c.fillStyle=cg;c.fillRect(0,0,W,H);
    // Magic bubbles
    bubbles.forEach(b=>{
      b.y+=b.vy+Math.sin(t+b.phase)*.0006;b.x+=Math.sin(t*.7+b.phase)*.0006;
      if(b.y<-.1){b.y=1.1;b.x=.2+Math.random()*.6;}
      c.save();c.globalAlpha=.45;c.strokeStyle=b.col;c.lineWidth=2;c.shadowColor=b.col;c.shadowBlur=12;
      c.beginPath();c.arc(b.x*W,b.y*H,b.size,0,Math.PI*2);c.stroke();
      c.globalAlpha=.1;c.fillStyle=b.col;c.fill();
      // Highlight
      c.globalAlpha=.35;c.fillStyle='#fff';c.beginPath();c.arc(b.x*W-b.size*.25,b.y*H-b.size*.25,b.size*.22,0,Math.PI*2);c.fill();
      c.restore();
    });c.shadowBlur=0;
  };
})();

// â”€â”€ BG15: Galaxy â€” star field with constellation lines â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
(()=>{
  const o=initCanvas('cv15');if(!o)return;
  const{cv,ctx:c}=o;
  const stsL=[];for(let i=0;i<350;i++)stsL.push({x:Math.random(),y:Math.random(),r:.3+Math.random()*2.2,b:Math.random()*Math.PI*2,col:i%5===0?'#FFD700':i%5===1?'#FF9EC4':i%5===2?'#7EFFD4':'#fff'});
  const conLines=[[.1,.2,.2,.15],[.2,.15,.3,.25],[.3,.25,.25,.4],[.7,.3,.8,.2],[.8,.2,.9,.3],[.9,.3,.75,.45],[.4,.6,.5,.5],[.5,.5,.6,.6],[.5,.5,.55,.7]];
  let t=0;
  renderRegistry['cv15'] = () => {
    t+=.005;
    const W=cv.width,H=cv.height;
    c.fillStyle='rgba(5,2,15,.15)';c.fillRect(0,0,W,H);
    stsL.forEach(s=>{
      const a=.2+.8*Math.abs(Math.sin(t*.6+s.b));
      c.globalAlpha=a;c.fillStyle=s.col;c.shadowColor=s.col;c.shadowBlur=s.r>1.5?10:0;
      c.beginPath();c.arc(s.x*W,s.y*H,s.r,0,Math.PI*2);c.fill();
    });c.globalAlpha=1;c.shadowBlur=0;
    // Constellation lines
    c.strokeStyle='rgba(201,167,235,.15)';c.lineWidth=1;
    conLines.forEach(([x1,y1,x2,y2])=>{
      c.beginPath();c.moveTo(x1*W,y1*H);c.lineTo(x2*W,y2*H);c.stroke();
    });
    // Milky way band
    const mw=c.createLinearGradient(0,H*.2,W,H*.8);
    mw.addColorStop(0,'transparent');mw.addColorStop(.3,'rgba(180,160,255,.04)');mw.addColorStop(.5,'rgba(200,180,255,.07)');mw.addColorStop(.7,'rgba(180,160,255,.04)');mw.addColorStop(1,'transparent');
    c.fillStyle=mw;c.fillRect(0,0,W,H);
  };
})();

// â”€â”€ BG16: Shooting stars + poem glow â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
(()=>{
  const o=initCanvas('cv16');if(!o)return;
  const{cv,ctx:c}=o;
  const stsP=[];for(let i=0;i<200;i++)stsP.push({x:Math.random(),y:Math.random(),r:.3+Math.random()*1.5,b:Math.random()*Math.PI*2});
  const shooters=[];
  for(let i=0;i<6;i++)shooters.push({x:Math.random(),y:Math.random()*.5,vx:.007+Math.random()*.005,vy:.004+Math.random()*.003,life:0,maxLife:40+Math.random()*60,active:false,delay:i*80});
  let t=0,frame=0;
  renderRegistry['cv16'] = () => {
    t+=.007;frame++;
    const W=cv.width,H=cv.height;
    const bg=c.createLinearGradient(0,0,0,H);
    bg.addColorStop(0,'#020008');bg.addColorStop(.6,'#08001a');bg.addColorStop(1,'#100025');
    c.fillStyle=bg;c.fillRect(0,0,W,H);
    // Stars
    stsP.forEach(s=>{
      const a=.2+.7*Math.abs(Math.sin(t*.5+s.b));
      c.globalAlpha=a;c.fillStyle='#eeeeff';c.beginPath();c.arc(s.x*W,s.y*H,s.r,0,Math.PI*2);c.fill();
    });c.globalAlpha=1;
    // Shooting stars
    shooters.forEach(sh=>{
      if(frame>sh.delay){
        if(!sh.active){sh.active=true;sh.x=Math.random();sh.y=Math.random()*.4;sh.life=0;}
        sh.x+=sh.vx;sh.y+=sh.vy;sh.life++;
        if(sh.life>sh.maxLife){sh.active=false;sh.delay=frame+100+Math.random()*200;}
        if(sh.active){
          const alpha=(sh.maxLife-sh.life)/sh.maxLife;
          c.save();c.globalAlpha=alpha;c.strokeStyle='#FFD700';c.lineWidth=2;c.shadowColor='#FFD700';c.shadowBlur=8;
          c.beginPath();c.moveTo(sh.x*W,sh.y*H);c.lineTo((sh.x-sh.vx*15)*W,(sh.y-sh.vy*15)*H);c.stroke();
          c.fillStyle='#fff';c.beginPath();c.arc(sh.x*W,sh.y*H,2.5,0,Math.PI*2);c.fill();
          c.restore();
        }
      }
    });c.shadowBlur=0;
    // Central glow for poem
    const pg=c.createRadialGradient(W*.5,H*.5,0,W*.5,H*.5,W*.3);
    pg.addColorStop(0,'rgba(201,167,235,.06)');pg.addColorStop(1,'transparent');
    c.fillStyle=pg;c.fillRect(0,0,W,H);
  };
})();

// â”€â”€ BG17: Treasure / sparkle gold â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
(()=>{
  const o=initCanvas('cv17');if(!o)return;
  const{cv,ctx:c}=o;
  const sparkles=[];
  for(let i=0;i<100;i++)sparkles.push({x:Math.random(),y:Math.random(),size:3+Math.random()*8,phase:Math.random()*Math.PI*2,speed:.5+Math.random()*.8,col:['#FFD700','#FFF3AA','#FFB800','#fff','#FF9EC4'][i%5]});
  let t=0;
  renderRegistry['cv17'] = () => {
    t+=.009;
    const W=cv.width,H=cv.height;
    const bg=c.createLinearGradient(0,0,0,H);
    bg.addColorStop(0,'#050200');bg.addColorStop(.4,'#120900');bg.addColorStop(.7,'#1a0e00');bg.addColorStop(1,'#0d0700');
    c.fillStyle=bg;c.fillRect(0,0,W,H);
    // Gold dust clouds
    [[.3,.4,'rgba(255,215,0,.08)'],[.7,.6,'rgba(255,160,0,.06)'],[.5,.2,'rgba(255,200,0,.07)']].forEach(([gx,gy,gcol])=>{
      const gr=c.createRadialGradient(gx*W,gy*H,0,gx*W,gy*H,W*.35);
      gr.addColorStop(0,gcol);gr.addColorStop(1,'transparent');
      c.fillStyle=gr;c.fillRect(0,0,W,H);
    });
    // Sparkles (4-pointed stars)
    sparkles.forEach(sp=>{
      const alpha=.3+.7*Math.abs(Math.sin(t*sp.speed+sp.phase));
      const px=sp.x*W,py=sp.y*H,sz=sp.size*(0.5+0.5*alpha);
      c.save();c.globalAlpha=alpha;c.fillStyle=sp.col;c.shadowColor=sp.col;c.shadowBlur=12;
      c.beginPath();c.moveTo(px,py-sz);c.lineTo(px+sz*.25,py-sz*.25);c.lineTo(px+sz,py);c.lineTo(px+sz*.25,py+sz*.25);c.lineTo(px,py+sz);c.lineTo(px-sz*.25,py+sz*.25);c.lineTo(px-sz,py);c.lineTo(px-sz*.25,py-sz*.25);c.closePath();c.fill();
      c.restore();
    });c.shadowBlur=0;
  };
})();

// â”€â”€ BG18: Mirror / reflection â€” symmetrical particles â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
(()=>{
  const o=initCanvas('cv18');if(!o)return;
  const{cv,ctx:c}=o;
  const pts18=[];
  const cols18=['#FF6B8A','#C9A7EB','#FFD700','#7EFFD4','#FF9EC4'];
  for(let i=0;i<80;i++)pts18.push({x:Math.random()*.5,y:Math.random(),vx:.0004+Math.random()*.0006,vy:(Math.random()-.5)*.0004,col:cols18[i%5],r:1.5+Math.random()*3,phase:Math.random()*Math.PI*2});
  let t=0;
  renderRegistry['cv18'] = () => {
    t+=.008;
    const W=cv.width,H=cv.height;
    const bg=c.createLinearGradient(0,0,0,H);
    bg.addColorStop(0,'#04000c');bg.addColorStop(.5,'#080018');bg.addColorStop(1,'#0c0020');
    c.fillStyle=bg;c.fillRect(0,0,W,H);
    // Mirror line
    c.strokeStyle='rgba(255,215,0,.1)';c.lineWidth=1;c.setLineDash([8,12]);
    c.beginPath();c.moveTo(W*.5,0);c.lineTo(W*.5,H);c.stroke();c.setLineDash([]);
    pts18.forEach(p=>{
      p.x+=p.vx;p.y+=p.vy+Math.sin(t+p.phase)*.0003;
      if(p.x>0.5){p.x=0;p.y=Math.random();}
      if(p.y<0)p.y=1;if(p.y>1)p.y=0;
      const alpha=.4+.6*Math.abs(Math.sin(t+p.phase));
      // Left side
      c.globalAlpha=alpha;c.fillStyle=p.col;c.shadowColor=p.col;c.shadowBlur=8;
      c.beginPath();c.arc(p.x*W,p.y*H,p.r,0,Math.PI*2);c.fill();
      // Mirrored right side
      c.beginPath();c.arc((1-p.x)*W,p.y*H,p.r,0,Math.PI*2);c.fill();
    });c.globalAlpha=1;c.shadowBlur=0;
  };
})();

// â”€â”€ BG19: Dream clouds â€” soft pastel floating world â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
(()=>{
  const o=initCanvas('cv19');if(!o)return;
  const{cv,ctx:c}=o;
  const clouds19=[];
  for(let i=0;i<12;i++)clouds19.push({x:Math.random(),y:.15+Math.random()*.6,speed:.0003+Math.random()*.0004,scale:.5+Math.random()*.8,col:i%3===0?'rgba(255,158,196,':i%3===1?'rgba(201,167,235,':'rgba(135,206,235,'});
  // Fix the ternary string issues
  const cBase=['rgba(255,158,196,','rgba(201,167,235,','rgba(135,206,235,'];
  clouds19.forEach((cl,i)=>{cl.col=cBase[i%3];});
  const stsDream=[];for(let i=0;i<120;i++)stsDream.push({x:Math.random(),y:Math.random()*.5,r:.4+Math.random()*1.2,b:Math.random()*Math.PI*2});
  function drawCloud(ctx,x,y,scale,col,alpha){
    ctx.save();ctx.globalAlpha=alpha*0.3;ctx.fillStyle=col+'1)';ctx.shadowColor=col+'0.8)';ctx.shadowBlur=20;
    const s=scale*Math.min(ctx.canvas.width,ctx.canvas.height)*.06;
    [[0,0,s],[s*.7,-.15*s,s*.75],[s*1.5,0,s*.85],[s*2.2,-.1*s,s*.7],[s*2.8,0,s*.6]].forEach(([ox,oy,r])=>{ctx.beginPath();ctx.arc(x+ox,y+oy,r,0,Math.PI*2);ctx.fill();});
    ctx.restore();
  }
  let t=0;
  renderRegistry['cv19'] = () => {
    t+=.007;
    const W=cv.width,H=cv.height;
    const bg=c.createLinearGradient(0,0,0,H);
    bg.addColorStop(0,'#060110');bg.addColorStop(.5,'#0d0320');bg.addColorStop(1,'#150828');
    c.fillStyle=bg;c.fillRect(0,0,W,H);
    stsDream.forEach(s=>{
      const a=.2+.7*Math.abs(Math.sin(t*.5+s.b));
      c.globalAlpha=a;c.fillStyle='#ffeeee';c.beginPath();c.arc(s.x*W,s.y*H,s.r,0,Math.PI*2);c.fill();
    });c.globalAlpha=1;
    clouds19.forEach(cl=>{
      cl.x+=cl.speed;if(cl.x>1.3)cl.x=-0.3;
      const alpha=0.4+0.3*Math.sin(t*.5+cl.x*Math.PI);
      drawCloud(c,cl.x*W,cl.y*H,cl.scale,cl.col,alpha);
    });
  };
})();

// â”€â”€ BG20: Seasons â€” quadrant gradient transitions â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
(()=>{
  const o=initCanvas('cv20');if(!o)return;
  const{cv,ctx:c}=o;
  const particles20=[];
  const pCols20=['#FFB6C1','#FFD700','#FF8C00','#87CEEB','#fff'];
  for(let i=0;i<80;i++)particles20.push({x:Math.random(),y:Math.random(),vx:(Math.random()-.5)*.0005,vy:(Math.random()-.5)*.0005,r:1.5+Math.random()*3,col:pCols20[i%5],phase:Math.random()*Math.PI*2});
  let t=0;
  renderRegistry['cv20'] = () => {
    t+=.007;
    const W=cv.width,H=cv.height;
    // 4 seasonal quadrants
    const seasons=[
      {x:0,y:0,c1:'#1a0510',c2:'#2a0e20'},   // Spring (top-left) - pink tones
      {x:W/2,y:0,c1:'#150a00',c2:'#2a1500'}, // Summer (top-right) - gold
      {x:0,y:H/2,c1:'#100800',c2:'#1a1000'}, // Autumn (bottom-left) - amber
      {x:W/2,y:H/2,c1:'#020510',c2:'#050d1a'} // Winter (bottom-right) - blue
    ];
    seasons.forEach(s=>{
      const gr=c.createLinearGradient(s.x,s.y,s.x+W/2,s.y+H/2);
      gr.addColorStop(0,s.c1);gr.addColorStop(1,s.c2);
      c.fillStyle=gr;c.fillRect(s.x,s.y,W/2,H/2);
    });
    // Dividing lines
    c.strokeStyle='rgba(255,215,0,.08)';c.lineWidth=1;
    c.beginPath();c.moveTo(W*.5,0);c.lineTo(W*.5,H);c.moveTo(0,H*.5);c.lineTo(W,H*.5);c.stroke();
    particles20.forEach(p=>{
      p.x+=p.vx;p.y+=p.vy+Math.sin(t+p.phase)*.0002;
      if(p.x<0)p.x=1;if(p.x>1)p.x=0;if(p.y<0)p.y=1;if(p.y>1)p.y=0;
      const alpha=.3+.6*Math.abs(Math.sin(t+p.phase));
      c.globalAlpha=alpha;c.fillStyle=p.col;c.shadowColor=p.col;c.shadowBlur=6;
      c.beginPath();c.arc(p.x*W,p.y*H,p.r,0,Math.PI*2);c.fill();
    });c.globalAlpha=1;c.shadowBlur=0;
  };
})();

// â”€â”€ BG21â€“29: Use shared generic cosmic canvas for remaining pages â”€â”€â”€â”€â”€
const genericBGs=[
  // 21: music notes swirling
  {id:'cv21',draw:(c,W,H,t)=>{
    const bg=c.createLinearGradient(0,0,0,H);bg.addColorStop(0,'#040010');bg.addColorStop(1,'#0e0025');c.fillStyle=bg;c.fillRect(0,0,W,H);
    for(let i=0;i<12;i++){const a=i/12*Math.PI*2+t*.3,rv=.32,px=(0.5+Math.cos(a)*rv)*W,py=(0.5+Math.sin(a)*rv*.6)*H;
      c.save();c.globalAlpha=.6;c.fillStyle=['#FF6B8A','#FFD700','#C9A7EB','#7EFFD4'][i%4];c.shadowColor=c.fillStyle;c.shadowBlur=18;
      c.font=`${20+Math.sin(t+i)*5}px serif`;c.fillText(['â™ª','â™«','â™¬','â™©'][i%4],px,py);c.restore();}
    c.shadowBlur=0;
  }},
  // 22: colour wash
  {id:'cv22',draw:(c,W,H,t)=>{
    for(let i=0;i<6;i++){const gr=c.createRadialGradient(.5*W,.5*H,0,.5*W,.5*H,W*.7);gr.addColorStop(0,`hsla(${i*60+t*20},80%,20%,.15)`);gr.addColorStop(1,'transparent');c.fillStyle=gr;c.fillRect(0,0,W,H);}
  }},
  // 23: toast bubbles
  {id:'cv23',draw:(c,W,H,t)=>{
    const bg=c.createLinearGradient(0,0,0,H);bg.addColorStop(0,'#050008');bg.addColorStop(1,'#100018');c.fillStyle=bg;c.fillRect(0,0,W,H);
    for(let i=0;i<18;i++){const x=W*((i/18+t*.05)%1),y=H*(.3+.5*Math.sin(t*.4+i));c.globalAlpha=.45;c.strokeStyle=['#FFD700','#FF6B8A','#C9A7EB'][i%3];c.lineWidth=1.5;c.beginPath();c.arc(x,y,10+i*3,0,Math.PI*2);c.stroke();}c.globalAlpha=1;
  }},
  // 24: adventure map dots
  {id:'cv24',draw:(c,W,H,t)=>{
    const bg=c.createLinearGradient(0,0,0,H);bg.addColorStop(0,'#030010');bg.addColorStop(1,'#0a0020');c.fillStyle=bg;c.fillRect(0,0,W,H);
    const pts=[[.2,.3],[.4,.2],[.6,.4],[.8,.25],[.7,.6],[.45,.7],[.25,.55]];
    pts.forEach(([px,py],i)=>{
      const alpha=.4+.5*Math.abs(Math.sin(t+i));c.globalAlpha=alpha;c.fillStyle=['#FFD700','#FF6B8A','#7EFFD4'][i%3];c.shadowColor=c.fillStyle;c.shadowBlur=15;c.beginPath();c.arc(px*W,py*H,5+Math.sin(t+i)*3,0,Math.PI*2);c.fill();
      if(i>0){c.globalAlpha=.2;c.strokeStyle='rgba(255,215,0,.5)';c.lineWidth=1;c.setLineDash([6,8]);c.beginPath();c.moveTo(pts[i-1][0]*W,pts[i-1][1]*H);c.lineTo(px*W,py*H);c.stroke();c.setLineDash([]);}
    });c.globalAlpha=1;c.shadowBlur=0;
  }},
  // 25: constellation
  {id:'cv25',draw:(c,W,H,t)=>{
    const bg=c.createLinearGradient(0,0,0,H);bg.addColorStop(0,'#020008');bg.addColorStop(1,'#080018');c.fillStyle=bg;c.fillRect(0,0,W,H);
    for(let i=0;i<160;i++){const sx=(i*0.618)%1,sy=(i*0.382)%1,alpha=.2+.7*Math.abs(Math.sin(t*.5+i));c.globalAlpha=alpha;c.fillStyle=i%7===0?'#FFD700':'#fff';c.beginPath();c.arc(sx*W,sy*H,i%7===0?2:1,0,Math.PI*2);c.fill();}c.globalAlpha=1;
  }},
  // 26: rainy diamond
  {id:'cv26',draw:(c,W,H,t)=>{
    const bg=c.createLinearGradient(0,0,0,H);bg.addColorStop(0,'#020510');bg.addColorStop(1,'#0a1020');c.fillStyle=bg;c.fillRect(0,0,W,H);
    for(let i=0;i<60;i++){const x=((i*.137+t*.02)%1)*W,y=((i*.271+t*.04)%1)*H;c.globalAlpha=.35;c.strokeStyle='rgba(135,206,235,.6)';c.lineWidth=1;c.beginPath();c.moveTo(x,y);c.lineTo(x+3,y+18);c.stroke();}c.globalAlpha=1;
    // Diamond
    const cx=W*.5,cy=H*.5;c.save();c.translate(cx,cy);c.rotate(t*.15);c.globalAlpha=.25;c.strokeStyle='#C9A7EB';c.lineWidth=2;c.shadowColor='#C9A7EB';c.shadowBlur=25;c.beginPath();c.moveTo(0,-60);c.lineTo(40,0);c.lineTo(0,60);c.lineTo(-40,0);c.closePath();c.stroke();c.restore();c.shadowBlur=0;
  }},
  // 27: kaleidoscope
  {id:'cv27',draw:(c,W,H,t)=>{
    const bg=c.createLinearGradient(0,0,0,H);bg.addColorStop(0,'#04000a');bg.addColorStop(1,'#0a0018');c.fillStyle=bg;c.fillRect(0,0,W,H);
    const cx=W*.5,cy=H*.5;
    for(let seg=0;seg<8;seg++){
      c.save();c.translate(cx,cy);c.rotate(seg/8*Math.PI*2+t*.1);
      for(let i=0;i<5;i++){
        const a=i/5*Math.PI*.5,rv=80+i*40;
        c.globalAlpha=.2;c.strokeStyle=`hsl(${seg*45+i*30+t*30},80%,65%)`;c.lineWidth=3;c.shadowColor=c.strokeStyle;c.shadowBlur=10;
        c.beginPath();c.arc(Math.cos(a)*rv*.5,Math.sin(a)*rv*.5,rv*.3,0,Math.PI*2);c.stroke();
      }c.restore();
    }c.shadowBlur=0;c.globalAlpha=1;
  }},
  // 28: starfield zoom
  {id:'cv28',draw:(c,W,H,t)=>{
    c.fillStyle='rgba(4,1,12,.12)';c.fillRect(0,0,W,H);
    const cx=W*.5,cy=H*.5;
    for(let i=0;i<80;i++){
      const speed=0.5+i*.06,angle=i*2.618,rv=((t*speed*0.04+i*0.015)%0.5)*Math.min(W,H);
      const x=cx+Math.cos(angle)*rv,y=cy+Math.sin(angle)*rv*.7;
      const alpha=Math.min(1,(rv/(Math.min(W,H)*.4)));
      c.globalAlpha=alpha*.8;c.fillStyle='#fff';c.beginPath();c.arc(x,y,1+rv/100,0,Math.PI*2);c.fill();
    }c.globalAlpha=1;
  }},
  // 29: finale fireworks
  {id:'cv29',draw:(c,W,H,t)=>{
    c.fillStyle='rgba(4,1,12,.1)';c.fillRect(0,0,W,H);
    for(let fw=0;fw<8;fw++){
      const angle=(t+fw*.8)%(Math.PI*2);if(angle<.1||angle>.99*Math.PI*2)continue;
      const cx=W*(.15+fw*.1),cy=H*(.2+Math.sin(fw*1.3)*0.3);
      for(let ray=0;ray<16;ray++){
        const ra=ray/16*Math.PI*2,rv=30+50*((angle)/Math.PI);
        const px=cx+Math.cos(ra)*rv,py=cy+Math.sin(ra)*rv;
        c.globalAlpha=Math.max(0,1-angle/Math.PI)*.7;
        c.fillStyle=`hsl(${fw*45+ray*22},90%,65%)`;c.shadowColor=c.fillStyle;c.shadowBlur=8;
        c.beginPath();c.arc(px,py,2,0,Math.PI*2);c.fill();
      }
    }c.globalAlpha=1;c.shadowBlur=0;
  }}
];

// Init and run all generic BGs
genericBGs.forEach(bg=>{
  const o=initCanvas(bg.id);if(!o)return;
  const{cv,ctx}=o;
  // initial full clear
  ctx.fillStyle='#04000e';ctx.fillRect(0,0,cv.width,cv.height);
  let t=0;
  renderRegistry[bg.id] = () => {
    t+=.008;
    bg.draw(ctx,cv.width,cv.height,t);
  };
});

// Start the loop after all registrations are complete
mainLoop();
console.log("Birthday Universe Fully Initialized.");

