document.addEventListener('DOMContentLoaded', () => {
  const playButton = document.getElementById('playSong');
  const song = document.getElementById('song');
  const caja = document.getElementById('cajaSorpresa');
  const mensaje = document.getElementById('mensajeSorpresa');
  const galeria = document.querySelector('.galeria-container');
  const imagenes = [
    './images/DiLeva1.jpg',
    './images/DiLeva2.jpg',
    './images/DiLeva3.jpg',
    './images/DiLeva4.jpg',
    './images/Dilevajuntos1.jpg',
    './images/Dilevajuntos2.jpg',
  ];

  // === Reproducir canción cumpleaños ===
  let isPlaying = false;

playButton.addEventListener('click', () => {
  if (isPlaying) {
    song.pause();
    playButton.textContent = "🎶 Reproducir canción";
    document.body.classList.remove('celebracion');
  } else {
    song.play();
    playButton.textContent = "⏸️ Pausar canción";
    document.body.classList.add('celebracion');
  }
  isPlaying = !isPlaying;
});

song.addEventListener("ended", () => {
  isPlaying = false;
  playButton.textContent = "🎶 Reproducir canción";
  document.body.classList.remove('celebracion');
});

  // === Caja sorpresa ===
  caja.addEventListener('click', () => {
    caja.classList.toggle('abierta');
    mensaje.classList.toggle('visible');
    reproducirConfeti();
  });

  // === Galería automática con imágenes + lightbox ===
  galeria.innerHTML = ''; // Limpia por si acaso

  imagenes.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Recuerdo';
    img.classList.add('clickable-image');
    galeria.appendChild(img);
  });

  // === Crear lightbox
  const lightbox = document.createElement('div');
  lightbox.id = 'image-lightbox';
  const imgZoom = document.createElement('img');
  lightbox.appendChild(imgZoom);
  document.body.appendChild(lightbox);

  // === Evento global para mostrar/ocultar lightbox
  document.addEventListener('click', e => {
    if (e.target.classList.contains('clickable-image')) {
      imgZoom.src = e.target.src;
      lightbox.style.display = 'flex';
    } else if (e.target.id === 'image-lightbox') {
      lightbox.style.display = 'none';
      imgZoom.src = '';
    }
  });

  // === Confeti mágico ===
  function reproducirConfeti() {
    for (let i = 0; i < 100; i++) {
      const confeti = document.createElement('div');
      confeti.classList.add('confeti');
      confeti.style.left = Math.random() * 100 + 'vw';
      confeti.style.animationDelay = Math.random() * 2 + 's';
      confeti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
      document.body.appendChild(confeti);
      setTimeout(() => confeti.remove(), 4000);
    }
  }

  // === Estilo dinámico de confeti ===
  const style = document.createElement('style');
  style.textContent = `
    .confeti {
      position: fixed;
      top: -10px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      z-index: 9999;
      animation: caer 3s ease-in forwards;
    }
    @keyframes caer {
      to {
        transform: translateY(100vh) rotate(360deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // === Scroll reveal de secciones ===
  const secciones = document.querySelectorAll('.seccion');
  const options = { threshold: 0.3 };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, options);

  secciones.forEach(seccion => {
    seccion.style.opacity = 0;
    seccion.style.transform = 'translateY(30px)';
    seccion.style.transition = 'all 1s';
    observer.observe(seccion);
  });

  // === Efecto de título vibrante ===
  const titulo = document.querySelector('h1');
  setInterval(() => {
    titulo.classList.toggle('vibrar');
  }, 1500);

  const vibrarEstilo = document.createElement('style');
  vibrarEstilo.textContent = `
    .vibrar {
      animation: vibrar 0.2s linear infinite;
    }
    @keyframes vibrar {
      0% { transform: translateX(0); }
      25% { transform: translateX(2px); }
      50% { transform: translateX(-2px); }
      75% { transform: translateX(2px); }
      100% { transform: translateX(0); }
    }
  `;
  document.head.appendChild(vibrarEstilo);

 const creedText = document.querySelector("#creed-message .creed-text");
const creedTitle = document.querySelector("#creed-message .creed-title");

if (creedText && creedTitle) {
  creedText.style.opacity = 0;
  creedTitle.style.opacity = 0;

  const originalText = creedText.innerHTML; // ✅ Guarda el texto antes de borrarlo
  const words = originalText.split(" ");
  creedText.innerHTML = ""; // Luego sí puedes vaciarlo

  const observerCreed = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        creedTitle.style.transition = "opacity 2s ease-in-out";
        creedTitle.style.opacity = 1;
        creedText.style.opacity = 1;

        let index = 0;
        const interval = setInterval(() => {
          if (index < words.length) {
            creedText.innerHTML += words[index] + " ";
            index++;
          } else {
            clearInterval(interval);
          }
        }, 50);
      }
    });
  }, { threshold: 0.3 });

  observerCreed.observe(document.querySelector("#creed-message"));
}
});

// === Música de fondo – Sección Dark Souls
function reproducirMusicaDark() {
  const audio = document.getElementById("darkMusic");
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}
