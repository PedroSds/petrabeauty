/**
 * STUDIO PETRA BEAUTY — COREOGRAFIA & INTERATIVIDADE
 * Orquestração cinematográfica da Hero, transições de máscara,
 * controles de cena e lightbox do portfólio.
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroScenes();
  initHeader();
  initMobileNav();
  initPortfolioModal();
  initScrollAnimations();
  initStudioVideo();
});

/* --------------------------------------------------------------------------
   1. COREOGRAFIA DA HERO — 3 CENAS EDITORIAIS
   -------------------------------------------------------------------------- */
function initHeroScenes() {
  const heroViewport = document.querySelector('.hero-viewport');
  const watermark = document.querySelector('.hero-watermark');
  const scenes = document.querySelectorAll('.scene-frame');
  const curtain = document.querySelector('.scene-curtain');
  const stepBtns = document.querySelectorAll('.scene-step-btn');
  const progressFill = document.querySelector('.scene-progress-fill');
  const header = document.querySelector('.site-header');

  if (!heroViewport || scenes.length === 0) return;

  // Metadados das 3 cenas confirmadas no prompt
  const sceneConfig = {
    1: {
      watermark: 'PETRA',
      theme: 'light',
      bg: 'var(--color-ivory-bg)',
      progress: '33.33%'
    },
    2: {
      watermark: 'ESSÊNCIA',
      theme: 'dark',
      bg: 'var(--color-wine-bg)',
      progress: '66.66%'
    },
    3: {
      watermark: 'BEAUTY',
      theme: 'light',
      bg: 'var(--color-ivory-bg)',
      progress: '100%'
    }
  };

  let currentSceneIndex = 1;
  let isTransitioning = false;
  let hasCompletedFinalEffect = false;
  let postTransitionCooldownUntil = 0;
  let autoplayTimer = null;
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Entrada inicial da cena 1
  function playHeroEntrance() {
    const scene1 = document.querySelector('.scene-frame[data-scene="1"]');
    if (!scene1) return;

    scene1.classList.add('animating-in');
    setTimeout(() => {
      scene1.classList.remove('animating-in');
    }, 1600);
  }

  // Transição cinematográfica de cena
  function goToScene(nextIndex, isUserAction = true) {
    if (nextIndex === currentSceneIndex || isTransitioning) return;
    if (nextIndex < 1 || nextIndex > 3) return;

    isTransitioning = true;
    const currentScene = document.querySelector(`.scene-frame[data-scene="${currentSceneIndex}"]`);
    const nextScene = document.querySelector(`.scene-frame[data-scene="${nextIndex}"]`);
    const targetConfig = sceneConfig[nextIndex];

    // Atualiza botões e barra de progresso
    stepBtns.forEach(btn => {
      const step = parseInt(btn.dataset.step, 10);
      btn.classList.toggle('active', step === nextIndex);
    });
    if (progressFill) {
      progressFill.style.width = targetConfig.progress;
    }

    if (isReducedMotion) {
      // Transição instantânea sem movimento para acessibilidade
      if (currentScene) currentScene.classList.remove('active');
      if (nextScene) nextScene.classList.add('active');
      applyTheme(targetConfig);
      currentSceneIndex = nextIndex;
      isTransitioning = false;
      hasCompletedFinalEffect = (nextIndex === 3 && isUserAction);
      postTransitionCooldownUntil = Date.now() + 300;
      return;
    }

    // Coreografia cinematográfica:
    // Cortina desliza pela janela revelando a nova atmosfera
    if (curtain) {
      curtain.classList.remove('wipe-out');
      curtain.classList.add('wipe-in');
    }

    // Troca suave da palavra de fundo com leve deslocamento
    if (watermark) {
      watermark.style.opacity = '0';
      watermark.style.transform = nextIndex > currentSceneIndex ? 'translateY(8%)' : 'translateY(-8%)';
    }

    setTimeout(() => {
      // No ápice da cortina, alternamos as cenas e o tema
      if (currentScene) currentScene.classList.remove('active');
      if (nextScene) {
        nextScene.classList.add('active');
        nextScene.classList.add('animating-in');
      }

      applyTheme(targetConfig);

      if (watermark) {
        watermark.textContent = targetConfig.watermark;
        watermark.style.transform = 'translateY(0)';
        watermark.style.opacity = targetConfig.theme === 'dark' ? '0.04' : '0.055';
      }

      // Cortina desliza para fora
      if (curtain) {
        curtain.classList.remove('wipe-in');
        curtain.classList.add('wipe-out');
      }

      setTimeout(() => {
        if (nextScene) nextScene.classList.remove('animating-in');
        currentSceneIndex = nextIndex;
        isTransitioning = false;

        // REGRA CRÍTICA: O último efeito só é dado como realizado quando acionado pelo usuário e concluir por inteiro
        if (nextIndex === 3 && isUserAction) {
          hasCompletedFinalEffect = true;
          // Absorve a inércia restante do mouse/trackpad para que a transição seja apreciada antes de descer
          postTransitionCooldownUntil = Date.now() + 450;
        } else {
          hasCompletedFinalEffect = false;
        }
      }, 700);

    }, 420);
  }

  function applyTheme(config) {
    if (config.theme === 'dark') {
      heroViewport.classList.add('theme-dark');
      heroViewport.style.backgroundColor = 'var(--color-wine-bg)';
      if (header && window.scrollY < 200) {
        header.classList.add('theme-dark');
      }
    } else {
      heroViewport.classList.remove('theme-dark');
      heroViewport.style.backgroundColor = 'var(--color-ivory-bg)';
      if (header && window.scrollY < 200) {
        header.classList.remove('theme-dark');
      }
    }
  }

  // Interação pelos botões numéricos (01 / 02 / 03)
  stepBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const step = parseInt(btn.dataset.step, 10);
      stopAutoplay();
      goToScene(step, true);
    });
  });

  // Navegação por teclado quando no topo da Hero
  window.addEventListener('keydown', (e) => {
    if (window.scrollY <= 15) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        if (!hasCompletedFinalEffect || currentSceneIndex < 3) {
          e.preventDefault();
          stopAutoplay();
          if (currentSceneIndex < 3) {
            goToScene(currentSceneIndex + 1, true);
          } else if (currentSceneIndex === 3) {
            hasCompletedFinalEffect = true;
            postTransitionCooldownUntil = Date.now() + 450;
          }
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        if (currentSceneIndex > 1) {
          e.preventDefault();
          stopAutoplay();
          hasCompletedFinalEffect = false;
          goToScene(currentSceneIndex - 1, true);
        }
      }
    }
  });

  // Reset obrigatório ao voltar para o Início:
  // Se o usuário rolou além da hero e voltou ao topo (ou clicou no menu/logo),
  // reseta incondicionalmente a hero para a Cena 1 e reativa a trava estrita!
  let hasScrolledPastHero = false;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Detecta quando o usuário rolou para a segunda dobra ou além
    if (scrollY > window.innerHeight * 0.45) {
      hasScrolledPastHero = true;
    } 
    // Detecta quando o usuário retornou ao topo da página (Início)
    else if (scrollY <= 8 && hasScrolledPastHero) {
      hasScrolledPastHero = false;
      hasCompletedFinalEffect = false;
      wheelAccumulator = 0;
      postTransitionCooldownUntil = Date.now() + 500;

      // Força o retorno à Cena 1 para exigir a progressão completa novamente
      if (currentSceneIndex !== 1 && !isTransitioning) {
        stopAutoplay();
        goToScene(1, false);
      }
    }
  }, { passive: true });

  // Cliques em links de retorno para o Início (#inicio, logotipo da marca, home)
  document.querySelectorAll('a[href="#inicio"], a[href="#"], .brand').forEach(link => {
    link.addEventListener('click', () => {
      hasScrolledPastHero = false;
      hasCompletedFinalEffect = false;
      wheelAccumulator = 0;
      postTransitionCooldownUntil = Date.now() + 500;

      if (currentSceneIndex !== 1 && !isTransitioning) {
        stopAutoplay();
        goToScene(1, false);
      }
    });
  });

  // Controle de scroll estrito na Hero:
  // NUNCA desce para a segunda dobra antes de realizar e concluir o último efeito da Cena 3!
  let wheelAccumulator = 0;
  let lastWheelTime = 0;

  window.addEventListener('wheel', (e) => {
    // Se o usuário já rolou além da Hero (navegando no estúdio, portfólio, etc.), não interfere
    if (window.scrollY > 20) return;

    const now = Date.now();

    // ROLAGEM PARA BAIXO (intenção de descer na página ou avançar efeito)
    if (e.deltaY > 0) {
      // Enquanto o último efeito não for concluído, ou se estiver antes da cena 3, ou em transição:
      // BLOQUEIA INCONDICIONALMENTE qualquer descida de scroll da página!
      if (!hasCompletedFinalEffect || currentSceneIndex < 3 || isTransitioning) {
        e.preventDefault();

        // Se estiver animando a transição ou no resfriamento de inércia pós-efeito, apenas bloqueia
        if (isTransitioning || now < postTransitionCooldownUntil) {
          return;
        }

        if (now - lastWheelTime > 600) {
          wheelAccumulator = 0;
        }
        lastWheelTime = now;
        wheelAccumulator += e.deltaY;

        // Acumulador limpo para acionar o próximo efeito cinematográfico
        if (wheelAccumulator >= 35) {
          wheelAccumulator = 0;
          stopAutoplay();
          if (currentSceneIndex < 3) {
            goToScene(currentSceneIndex + 1, true);
          } else if (currentSceneIndex === 3 && !hasCompletedFinalEffect) {
            // Efeito final da Cena 3 acionado pelo usuário
            hasCompletedFinalEffect = true;
            postTransitionCooldownUntil = Date.now() + 450;
          }
        }
        return;
      }

      // Se atingiu este ponto: Cena 3 está ativa, seu efeito terminou (hasCompletedFinalEffect === true),
      // e o cooldown de inércia expirou. A rolagem para baixo é liberada normalmente para o resto da página!
    }

    // ROLAGEM PARA CIMA (retornar cenas se estiver no topo)
    if (e.deltaY < 0 && window.scrollY <= 10) {
      if (currentSceneIndex > 1) {
        e.preventDefault();

        if (isTransitioning || now < postTransitionCooldownUntil) {
          return;
        }

        if (now - lastWheelTime > 600) {
          wheelAccumulator = 0;
        }
        lastWheelTime = now;
        wheelAccumulator += e.deltaY;

        if (wheelAccumulator <= -35) {
          wheelAccumulator = 0;
          stopAutoplay();
          hasCompletedFinalEffect = false;
          goToScene(currentSceneIndex - 1, true);
        }
      }
    }
  }, { passive: false });

  // Indicador "Role para explorar": se clicado antes do último efeito, avança cena
  const scrollCue = document.querySelector('.hero-scroll-cue');
  if (scrollCue) {
    scrollCue.addEventListener('click', (e) => {
      if (!hasCompletedFinalEffect || currentSceneIndex < 3) {
        e.preventDefault();
        stopAutoplay();
        if (currentSceneIndex < 3) {
          goToScene(currentSceneIndex + 1, true);
        } else if (currentSceneIndex === 3) {
          hasCompletedFinalEffect = true;
          postTransitionCooldownUntil = Date.now() + 450;
        }
      }
    });
  }

  // Suporte a gestos touch/swipe em dispositivos móveis com a mesma regra de trava
  let touchStartX = 0;
  let touchStartY = 0;
  let touchMoveY = 0;
  let touchMoveX = 0;

  window.addEventListener('touchstart', (e) => {
    if (window.scrollY <= 10 && e.touches.length > 0) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchMoveX = touchStartX;
      touchMoveY = touchStartY;
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (window.scrollY <= 10 && e.touches.length > 0) {
      touchMoveX = e.touches[0].clientX;
      touchMoveY = e.touches[0].clientY;
      const diffY = touchStartY - touchMoveY;

      // Arrastar para cima (querendo descer a página):
      // Trava incondicionalmente enquanto o último efeito não estiver 100% completo
      if (diffY > 10 && (!hasCompletedFinalEffect || currentSceneIndex < 3 || isTransitioning)) {
        e.preventDefault();
      }
    }
  }, { passive: false });

  window.addEventListener('touchend', (e) => {
    if (window.scrollY <= 10) {
      const diffY = touchStartY - touchMoveY;
      const diffX = touchStartX - touchMoveX;

      // Swipe vertical para cima (avançar cena)
      if (diffY > 40 && Math.abs(diffY) > Math.abs(diffX)) {
        if (!hasCompletedFinalEffect || currentSceneIndex < 3) {
          if (!isTransitioning) {
            stopAutoplay();
            if (currentSceneIndex < 3) {
              goToScene(currentSceneIndex + 1, true);
            } else if (currentSceneIndex === 3) {
              hasCompletedFinalEffect = true;
              postTransitionCooldownUntil = Date.now() + 450;
            }
          }
        }
      } else if (diffY < -40 && Math.abs(diffY) > Math.abs(diffX)) {
        // Swipe vertical para baixo (retroceder cena)
        if (currentSceneIndex > 1 && !isTransitioning) {
          stopAutoplay();
          hasCompletedFinalEffect = false;
          goToScene(currentSceneIndex - 1, true);
        }
      } else if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
        // Swipe horizontal
        if (diffX > 0 && currentSceneIndex < 3 && !isTransitioning) {
          stopAutoplay();
          goToScene(currentSceneIndex + 1, true);
        } else if (diffX < 0 && currentSceneIndex > 1 && !isTransitioning) {
          stopAutoplay();
          hasCompletedFinalEffect = false;
          goToScene(currentSceneIndex - 1, true);
        }
      }
    }
  }, { passive: true });

  // Autoplay sutil (pausável por interação)
  function startAutoplay() {
    if (isReducedMotion) return;
    autoplayTimer = setInterval(() => {
      // Se o usuário rolou além da hero, pausa a transição da hero
      if (window.scrollY > 20) return;
      const next = currentSceneIndex < 3 ? currentSceneIndex + 1 : 1;
      goToScene(next, false);
    }, 7000);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  // Início
  playHeroEntrance();
  startAutoplay();
}

/* --------------------------------------------------------------------------
   2. HEADER & NAVEGAÇÃO SCROLL
   -------------------------------------------------------------------------- */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 50;
    header.classList.toggle('scrolled', scrolled);

    // Quando passa da hero, retorna sempre para o tema claro com blur
    if (window.scrollY > window.innerHeight * 0.75) {
      header.classList.remove('theme-dark');
    } else {
      const heroDark = document.querySelector('.hero-viewport.theme-dark');
      if (heroDark) {
        header.classList.add('theme-dark');
      }
    }
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   3. MENU MOBILE ACESSÍVEL
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.querySelector('.menu-toggle');
  const drawer = document.querySelector('.mobile-nav');
  const backdrop = document.querySelector('.mobile-nav-backdrop');
  const links = document.querySelectorAll('.mobile-nav-links a');

  if (!toggleBtn || !drawer) return;

  function toggleMenu() {
    const isOpen = drawer.classList.contains('open');
    toggleBtn.classList.toggle('active', !isOpen);
    drawer.classList.toggle('open', !isOpen);
    if (backdrop) backdrop.classList.toggle('open', !isOpen);
    document.body.style.overflow = !isOpen ? 'hidden' : '';
    toggleBtn.setAttribute('aria-expanded', String(!isOpen));
  }

  function closeMenu() {
    toggleBtn.classList.remove('active');
    drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    document.body.style.overflow = '';
    toggleBtn.setAttribute('aria-expanded', 'false');
  }

  toggleBtn.addEventListener('click', toggleMenu);
  if (backdrop) backdrop.addEventListener('click', closeMenu);

  links.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeMenu();
    }
  });
}

/* --------------------------------------------------------------------------
   4. LIGHTBOX MODAL EDITORIAL DO PORTFÓLIO
   -------------------------------------------------------------------------- */
function initPortfolioModal() {
  const modal = document.querySelector('.portfolio-modal');
  const modalImg = modal ? modal.querySelector('.modal-media img') : null;
  const modalCategory = modal ? modal.querySelector('.modal-category') : null;
  const modalTitle = modal ? modal.querySelector('.modal-title') : null;
  const modalDesc = modal ? modal.querySelector('.modal-desc') : null;
  const modalWhatsAppBtn = modal ? modal.querySelector('.modal-whatsapp-btn') : null;
  const closeBtn = modal ? modal.querySelector('.modal-close-btn') : null;

  const items = document.querySelectorAll('.portfolio-item');
  if (!modal || items.length === 0) return;
  let activeTrigger = null;

  items.forEach(item => {
    item.addEventListener('click', () => {
      activeTrigger = item;
      const img = item.querySelector('img');
      const category = item.dataset.categoryLabel || item.dataset.category;
      const title = item.dataset.title || 'Studio Petra Beauty';
      const desc = item.dataset.desc || '';
      const customText = encodeURIComponent(`Olá, Studio Petra Beauty! Adorei a foto de ${title} do portfólio e gostaria de agendar uma consulta.`);

      if (modalImg && img) {
        modalImg.src = img.src;
        modalImg.alt = img.alt;
      }
      if (modalCategory) modalCategory.textContent = category;
      if (modalTitle) modalTitle.textContent = title;
      if (modalDesc) modalDesc.textContent = desc;
      if (modalWhatsAppBtn) {
        modalWhatsAppBtn.href = `https://wa.me/27999108197?text=${customText}`;
      }

      modal.classList.add('open');
      modal.removeAttribute('inert');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      closeBtn?.focus();
    });
  });

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('inert', '');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    activeTrigger?.focus();
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   5. ANIMAÇÕES DINÂMICAS DE SCROLL & FLUIDEZ CONTÍNUA
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const progressBar = document.getElementById('scroll-progress-bar');
  const portfolioImgs = document.querySelectorAll('.portfolio-image img');

  // Elementos que ganham revelação dinâmica ao entrar na tela
  const revealTargets = document.querySelectorAll(`
    .studio-visual,
    .studio-narrative,
    .section-portfolio,
    .portfolio-item,
    .section-cta,
    .site-footer
  `);

  if (!isReduced) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        } else {
          // Quando o elemento sai do campo de visão (ao rolar para cima ou para baixo),
          // remove a classe para que a animação dinâmica aconteça novamente ao voltar!
          entry.target.classList.remove('revealed');
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px'
    });

    revealTargets.forEach(el => observer.observe(el));
  } else {
    // Redução de movimento: revela tudo imediatamente
    revealTargets.forEach(el => el.classList.add('revealed'));
  }

  // Loop contínuo com requestAnimationFrame para fluidez de 60fps no scroll
  let ticking = false;

  function onScrollTick() {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // 1. Barra de progresso editorial no topo
    if (progressBar && docHeight > 0) {
      const pct = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
      progressBar.style.width = pct.toFixed(1) + '%';
    }

    // 3. Micro-paralaxe suave nas fotos do portfólio para sensação fluida
    if (!isReduced && portfolioImgs.length > 0) {
      const viewH = window.innerHeight;
      portfolioImgs.forEach(img => {
        const rect = img.getBoundingClientRect();
        if (rect.top < viewH && rect.bottom > 0) {
          const centerDelta = ((rect.top + rect.height / 2) - viewH / 2) / (viewH / 2);
          const translateY = centerDelta * -6;
          img.style.transform = `scale(1.025) translateY(${translateY.toFixed(1)}px)`;
        }
      });
    }

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(onScrollTick);
      ticking = true;
    }
  }, { passive: true });

  // Executa uma vez no carregamento para sincronizar o estado inicial
  onScrollTick();
}

/* --------------------------------------------------------------------------
   6. CONTROLE DO VÍDEO DO ESTÚDIO (LOOP SILENCIOSO CONTÍNUO)
   -------------------------------------------------------------------------- */
function initStudioVideo() {
  const video = document.getElementById('studio-video');
  if (!video) return;

  // Garante que o vídeo rode sempre em loop e silencioso (muted)
  video.muted = true;
  video.loop = true;

  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      const resumeOnInteraction = () => {
        video.play().catch(() => {});
        window.removeEventListener('click', resumeOnInteraction);
        window.removeEventListener('scroll', resumeOnInteraction);
        window.removeEventListener('touchstart', resumeOnInteraction);
      };
      window.addEventListener('click', resumeOnInteraction, { once: true });
      window.addEventListener('scroll', resumeOnInteraction, { once: true, passive: true });
      window.addEventListener('touchstart', resumeOnInteraction, { once: true, passive: true });
    });
  }

  // Pausa inteligente quando sai do campo de visão e retoma ao voltar
  if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.1 });

    videoObserver.observe(video);
  }
}

