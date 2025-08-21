let progress = 0;
const tubeStage = document.getElementById('tube-stage');
const tube = document.getElementById('tube');
const tubeContent = document.getElementById('tube-content');
const site = document.getElementById('site');

function updateTube(){
  tube.style.transform = `scale(${1+progress})`;
  tubeContent.style.opacity = progress;
  tubeContent.style.transform = `translateY(${50-50*progress}px)`;
  if(progress>=1){
    tubeStage.style.transition='opacity 1s ease';
    tubeStage.style.opacity=0;
    setTimeout(()=> tubeContent.style.opacity=0,1000);
    setTimeout(()=>{
      tubeStage.style.display='none';
      site.style.display='block';
      document.body.style.overflow='auto';
    },2000);
  }
}

// Interações de scroll/touch
window.addEventListener('wheel', e=>{
  progress += e.deltaY*0.0015;
  progress=Math.min(Math.max(progress,0),1);
  updateTube();
});
let startY=0;
window.addEventListener('touchstart', e=>{startY=e.touches[0].clientY;});
window.addEventListener('touchmove', e=>{
  let deltaY=startY-e.touches[0].clientY;
  progress+=deltaY*0.003;
  progress=Math.min(Math.max(progress,0),1);
  updateTube();
  startY=e.touches[0].clientY;
});
window.addEventListener('scroll',()=>{
  let scrollTop=window.scrollY;
  let docHeight=document.body.scrollHeight-window.innerHeight;
  if(docHeight>0){
    progress=scrollTop/docHeight;
    progress=Math.min(Math.max(progress,0),1);
    updateTube();
  }
});

// Accordion
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".accordion-item");
  const imgPreview = document.getElementById("card-img");
  const textPreview = document.getElementById("card-text");

  function showItem(item){
    items.forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    let img = item.dataset.img;
    let text = item.dataset.text;

    // Detecta se é mobile ou desktop
    const isMobile = window.innerWidth < 768;

    if(isMobile){
      // Mobile → acordeon com imagem + texto
      const content = item.querySelector(".accordion-content");
      content.innerHTML = `<img src="${img}" alt=""><div>${text}</div>`;

      // preview some (já controlado via CSS @media)
      if(imgPreview && textPreview){
        imgPreview.src = "";
        textPreview.innerHTML = "";
      }
    } else {
      // Desktop → acordeon só texto
      //const content = item.querySelector(".accordion-content");
      //content.innerHTML = `<div>${item.querySelector(".accordion-header").textContent}</div>`;

      // Preview lateral → imagem + texto
      if(imgPreview && textPreview){
        imgPreview.style.opacity=0;
        textPreview.style.opacity=0;
        setTimeout(()=>{
          imgPreview.src = img;
          textPreview.innerHTML = text;
          imgPreview.style.opacity=1;
          textPreview.style.opacity=1;
        },200);
      }
    }
  }

  // inicializa primeiro item
  showItem(items[0]);

  items.forEach(item => {
    const header = item.querySelector(".accordion-header");
    header.addEventListener("click", () => {
      showItem(item);
    });
  });

  // Atualiza quando redimensiona tela (mobile <-> desktop)
  window.addEventListener("resize", () => {
    const activeItem = document.querySelector(".accordion-item.active");
    if(activeItem) showItem(activeItem);
  });
});
