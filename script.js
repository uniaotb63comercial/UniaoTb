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

// Animação automática em 4s
window.addEventListener("load", () => {
  let duration = 4000;
  let start = performance.now();
  function animate(time) {
    let elapsed = time - start;
    progress = Math.min(elapsed / duration, 1);
    updateTube();
    if (progress < 1) requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
});

// Accordion / Carrossel
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".accordion-item");
  const imgPreview = document.getElementById("card-img");
  const textPreview = document.getElementById("card-text");

  function showItem(item){
    items.forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    let img = item.dataset.img;
    let text = item.dataset.text;
    const isMobile = window.innerWidth < 768;

    if(isMobile){
      const content = item.querySelector(".accordion-content");
      content.innerHTML = `<img src="${img}" alt=""><div>${text}</div>`;
      item.classList.add("active");
      if(imgPreview && textPreview){
        imgPreview.src = "";
        textPreview.innerHTML = "";
      }
    } else {
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

  if(window.innerWidth < 768){
    items.forEach(item=>{
      const content = item.querySelector(".accordion-content");
      content.innerHTML = `<img src="${item.dataset.img}" alt=""><div>${item.dataset.text}</div>`;
      item.classList.add("active");
    });
  } else {
    showItem(items[0]);
  }

  items.forEach(item => {
    const header = item.querySelector(".accordion-header");
    header.addEventListener("click", () => {
      if(window.innerWidth >= 768) showItem(item);
    });
  });

  window.addEventListener("resize", () => {
    const activeItem = document.querySelector(".accordion-item.active");
    if(activeItem) showItem(activeItem);
  });
})