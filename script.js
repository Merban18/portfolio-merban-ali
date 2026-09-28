const menu=document.querySelector('.menu');
const links=document.querySelector('.nav-links');

if(menu){
  menu.addEventListener('click',()=>{
    const open=links.style.display==='flex';
    links.style.display=open?'none':'flex';
    if(!open){
      links.style.position='absolute';
      links.style.top='74px';
      links.style.left='0';
      links.style.right='0';
      links.style.padding='18px 24px';
      links.style.background='rgba(245,246,242,.97)';
      links.style.flexDirection='column';
      links.style.gap='16px';
      links.style.borderBottom='1px solid #dfe3dd';
      links.style.backdropFilter='blur(18px)';
    }
  });
}
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>{
  if(window.innerWidth<=900) links.style.display='none';
}));

// Scroll reveals: sections enter as groups, while cards settle with a small rhythm.
const revealTargets=document.querySelectorAll('.section-head,.about-grid,.timeline-list,.contact-grid,.hero-card');
revealTargets.forEach(el=>el.classList.add('reveal'));
document.querySelectorAll('.service-grid,.work-grid,.skill-columns').forEach(el=>el.classList.add('stagger','reveal'));

const observer=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
},{threshold:.10,rootMargin:'0px 0px -50px'});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

// Interactive hero: the image and floating tech respond to the pointer without losing their animations.
const heroCard=document.querySelector('.hero-card');
if(heroCard && window.matchMedia('(pointer:fine)').matches){
  heroCard.addEventListener('mousemove',e=>{
    const r=heroCard.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    heroCard.style.setProperty('--tiltX',(-y*3).toFixed(2)+'deg');
    heroCard.style.setProperty('--tiltY',(x*3).toFixed(2)+'deg');
    heroCard.style.transform='perspective(1000px) rotateX(var(--tiltX)) rotateY(var(--tiltY)) translateY(-2px)';
  });
  heroCard.addEventListener('mouseleave',()=>{
    heroCard.style.transform='';
  });
}

// Make every skill pill respond to hover/focus with a tiny magnetic movement.
document.querySelectorAll('.skill-tags span').forEach(skill=>{
  skill.addEventListener('pointermove',e=>{
    if(!window.matchMedia('(pointer:fine)').matches) return;
    const r=skill.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    skill.style.transform=`translate(${x*5}px,${y*5-5}px) scale(1.04) rotate(${x*1.5}deg)`;
  });
  skill.addEventListener('pointerleave',()=>skill.style.transform='');
});

// Live CoolerTracker image.
document.querySelectorAll('.project').forEach(project=>{
  const title=project.querySelector('h3');
  if(title && title.textContent.trim()==='CoolerTracker'){
    const image=project.querySelector('.project-visual img');
    if(image){
      image.src='https://raw.githubusercontent.com/Merban18/portfolio-merban-ali/main/cooler%20tracker.jpg?v=6';
      image.alt='CoolerTracker project preview';
    }
  }
});

// Ambient hero glow follows the pointer.
const hero=document.querySelector('.hero');
if(hero && window.matchMedia('(pointer:fine)').matches){
  hero.addEventListener('pointermove',e=>{
    const r=hero.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    hero.style.setProperty('--mx',x.toFixed(3));
    hero.style.setProperty('--my',y.toFixed(3));
  });
}
