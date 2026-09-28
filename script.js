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

// Scroll reveal + staggered cards
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
},{threshold:.12,rootMargin:'0px 0px -40px'});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

// Subtle pointer parallax on the hero image
const heroCard=document.querySelector('.hero-card');
if(heroCard && window.matchMedia('(pointer:fine)').matches){
  heroCard.addEventListener('mousemove',e=>{
    const r=heroCard.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    heroCard.style.transform=`perspective(900px) rotateY(${x*5}deg) rotateX(${-y*5}deg) translateY(-2px)`;
  });
  heroCard.addEventListener('mouseleave',()=>heroCard.style.transform='');
}

// Keep the live CoolerTracker image pointing to the repository asset.
document.querySelectorAll('.project').forEach(project=>{
  const title=project.querySelector('h3');
  if(title && title.textContent.trim()==='CoolerTracker'){
    const image=project.querySelector('.project-visual img');
    if(image){
      image.src='https://raw.githubusercontent.com/Merban18/portfolio-merban-ali/main/cooler%20tracker.jpg?v=5';
      image.alt='CoolerTracker project preview';
    }
  }
});
