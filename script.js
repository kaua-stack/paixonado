document.addEventListener("DOMContentLoaded", () => {
  // Inicializar AOS (Animate On Scroll)
  AOS.init({
    duration: 1000,
    once: false,
    mirror: true,
  });

   // Contador de tempo juntos - DATA CORRIGIDA: 2023-03-29
  const startDate = new Date("2023-03-29");

function updateCounter() {
    const now = new Date();
    const diff = now - startDate;

    const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const totalMonths = Math.floor(totalDays / 30.44); // Média de dias por mês
    const totalYears = Math.floor(totalMonths / 12);
    const totalHours = totalDays * 24;

    document.getElementById("years").textContent = totalYears;
    document.getElementById("months").textContent = totalMonths;
    document.getElementById("days").textContent = totalDays;
    document.getElementById("hours").textContent = totalHours;
}

updateCounter();
setInterval(updateCounter, 1000); // Atualiza a cada segundo

  // Player de música
  const audio = document.getElementById("background-music");
  const playPauseBtn = document.getElementById("play-pause-btn");
  const playIcon = document.getElementById("play-icon");
  const pauseIcon = document.getElementById("pause-icon");
  const volumeSlider = document.getElementById("volume-slider");

  playPauseBtn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play().catch((error) => {
        console.log("Reprodução automática impedida:", error);
      });
      playIcon.classList.add("hidden");
      pauseIcon.classList.remove("hidden");
    } else {
      audio.pause();
      playIcon.classList.remove("hidden");
      pauseIcon.classList.add("hidden");
    }
  });

  volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value;
  });

  // Botão "Não" que foge do mouse
  const noBtn = document.getElementById("no-btn");

  noBtn.addEventListener("mouseover", () => {
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 100);

    noBtn.style.position = "fixed";
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
  });

  // Botão "Sim" que mostra resposta e reproduz o vídeo
  const yesBtn = document.getElementById("yes-btn");
  const loveResponse = document.getElementById("love-response");
  const loveVideo = document.getElementById("love-video");

  yesBtn.addEventListener("click", () => {
    loveResponse.classList.remove("hidden");
    createHearts();
    
    // Reproduzir o vídeo automaticamente quando o botão "Sim" for clicado
    if (loveVideo) {
      loveVideo.play().catch(error => {
        console.log("Reprodução automática do vídeo impedida:", error);
        // Alguns navegadores bloqueiam reprodução automática sem interação do usuário
      });
    }

    // Rolar para a resposta
    setTimeout(() => {
      loveResponse.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 300);
  });

  // Função para criar corações flutuantes - CORRIGIDA
  function createHearts() {
    const heartsContainer = document.getElementById("hearts-container");
    
    // Limpar os corações existentes antes de criar novos
    heartsContainer.innerHTML = '';
    
    // Criar mais corações para melhor visibilidade
    for (let i = 0; i < 100; i++) {
      setTimeout(() => {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.innerHTML = "❤️";

        // Posicionamento dos corações mais distribuído na tela
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const size = Math.random() * 20 + 10;
        
        heart.style.left = x + "px";
        heart.style.top = y + "px"; // Usar top em vez de bottom
        heart.style.fontSize = size + "px";
        heart.style.opacity = "1"; // Garantir que os corações comecam visíveis
        
        heartsContainer.appendChild(heart);

        // Remover os corações após a animação
        setTimeout(() => {
          heart.remove();
        }, 5000);
      }, i * 50); // Tempo reduzido para criar os corações mais rapidamente
    }
  }

  // Auto-play música quando o usuário rolar a página
  let musicStarted = false;
  window.addEventListener("scroll", () => {
    if (!musicStarted && window.scrollY > 100) {
      audio.play().catch((error) => {
        console.log("Reprodução automática impedida:", error);
      });
      playIcon.classList.add("hidden");
      pauseIcon.classList.remove("hidden");
      musicStarted = true;
    }
  });

  // NOVO: Carrossel com rolagem manual e automática
  const carousel = document.getElementById("image-carousel");
  
  if (carousel) {
    let isDown = false;
    let startX;
    let scrollLeft;
    
    // Adicionar classe para animação automática após carregar
    setTimeout(() => {
      carousel.classList.add("auto-scroll");
    }, 1000);
    
    // Eventos para arrastar o carrossel
    carousel.addEventListener("mousedown", (e) => {
      isDown = true;
      carousel.classList.remove("auto-scroll");
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
      carousel.style.cursor = "grabbing";
    });
    
    carousel.addEventListener("mouseleave", () => {
      isDown = false;
      carousel.style.cursor = "grab";
      // Retomar animação automática após soltar
      setTimeout(() => {
        carousel.classList.add("auto-scroll");
      }, 1000);
    });
    
    carousel.addEventListener("mouseup", () => {
      isDown = false;
      carousel.style.cursor = "grab";
      // Retomar animação automática após soltar
      setTimeout(() => {
        carousel.classList.add("auto-scroll");
      }, 1000);
    });
    
    carousel.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 2; // Velocidade de rolagem
      carousel.scrollLeft = scrollLeft - walk;
      
      // Verificar se chegou ao final e reiniciar para criar efeito infinito
      checkInfiniteScroll();
    });
    
    // Suporte para touch em dispositivos móveis
    carousel.addEventListener("touchstart", (e) => {
      isDown = true;
      carousel.classList.remove("auto-scroll");
      startX = e.touches[0].pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
    });
    
    carousel.addEventListener("touchend", () => {
      isDown = false;
      // Retomar animação automática após soltar
      setTimeout(() => {
        carousel.classList.add("auto-scroll");
      }, 1000);
    });
    
    carousel.addEventListener("touchmove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.touches[0].pageX - carousel.offsetLeft;
      const walk = (x - startX) * 2;
      carousel.scrollLeft = scrollLeft - walk;
      
      // Verificar se chegou ao final e reiniciar para criar efeito infinito
      checkInfiniteScroll();
    });
    
    // Função para verificar e ajustar o scroll para efeito infinito
    function checkInfiniteScroll() {
      const carouselWidth = carousel.scrollWidth / 2;
      
      if (carousel.scrollLeft === 0) {
        // Se chegou ao início, pular para o meio
        carousel.scrollLeft = carouselWidth;
      } else if (carousel.scrollLeft >= carouselWidth) {
        // Se chegou ao final, voltar para o início
        carousel.scrollLeft = 0;
      }
    }
    
    // Verificar o scroll durante a animação automática
    setInterval(checkInfiniteScroll, 1000);
  }
});
