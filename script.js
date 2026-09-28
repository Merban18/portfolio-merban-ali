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

// Reveal sections with different motion directions instead of one repeated rise.
const revealTargets=document.querySelectorAll('.section-head,.about-grid,.timeline-list,.contact-grid,.hero-card');
revealTargets.forEach(el=>el.classList.add('reveal'));
document.querySelectorAll('.service-grid,.work-grid,.skill-columns').forEach(el=>el.classList.add('stagger','reveal'));

const staggerGroups=document.querySelectorAll('.service-grid,.work-grid,.skill-columns');
staggerGroups.forEach(group=>{
  [...group.children].forEach((item,index)=>{
    item.style.setProperty('--i',index+1);
  });
});

const observer=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
},{threshold:.08,rootMargin:'0px 0px -45px'});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

// Hero card tilt while preserving its CSS floating animations.
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
  heroCard.addEventListener('mouseleave',()=>heroCard.style.transform='');
}

// Magnetic skill/tool interaction: hover, focus and pointer position create a small live response.
document.querySelectorAll('.skill-tags span').forEach(skill=>{
  skill.setAttribute('tabindex','0');
  skill.addEventListener('pointermove',e=>{
    if(!window.matchMedia('(pointer:fine)').matches) return;
    const r=skill.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    skill.style.transform=`translate(${x*6}px,${y*6-5}px) scale(1.055) rotate(${x*2}deg)`;
  });
  skill.addEventListener('pointerleave',()=>skill.style.transform='');
  skill.addEventListener('focus',()=>skill.style.transform='translateY(-5px) scale(1.04)');
  skill.addEventListener('blur',()=>skill.style.transform='');
});

// Services get a subtle pointer spotlight, like modern SaaS feature cards.
document.querySelectorAll('.service-grid article').forEach(card=>{
  card.addEventListener('pointermove',e=>{
    const r=card.getBoundingClientRect();
    card.style.setProperty('--px',((e.clientX-r.left)/r.width*100)+'%');
    card.style.setProperty('--py',((e.clientY-r.top)/r.height*100)+'%');
  });
});

// Portfolio cards respond to pointer position with restrained 3D depth.
document.querySelectorAll('.project').forEach(project=>{
  project.addEventListener('pointermove',e=>{
    if(!window.matchMedia('(pointer:fine)').matches) return;
    const r=project.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    project.style.transform=`translateY(-10px) perspective(900px) rotateX(${-y*2}deg) rotateY(${x*2}deg)`;
  });
  project.addEventListener('pointerleave',()=>project.style.transform='');

  const title=project.querySelector('h3');
  if(title && title.textContent.trim()==='CoolerTracker'){
    const image=project.querySelector('.project-visual img');
    if(image){
      image.src='https://raw.githubusercontent.com/Merban18/portfolio-merban-ali/main/cooler%20tracker.jpg?v=7';
      image.alt='CoolerTracker project preview';
    }
  }
});

// Ambient hero glow follows the pointer.
const hero=document.querySelector('.hero');
if(hero && window.matchMedia('(pointer:fine)').matches){
  hero.addEventListener('pointermove',e=>{
    const r=hero.getBoundingClientRect();
    hero.style.setProperty('--mx',((e.clientX-r.left)/r.width-.5).toFixed(3));
    hero.style.setProperty('--my',((e.clientY-r.top)/r.height-.5).toFixed(3));
  });
}
