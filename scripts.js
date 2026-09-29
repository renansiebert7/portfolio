const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector("#nav-menu-mobile");

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

window.addEventListener("click", (e) => {
    if (
        navMenu.classList.contains("active") &&
        !navMenu.contains(e.target) &&
        !hamburger.contains(e.target)
    ) {
        closeMenu();
    }
});

// --- Rolagem suave para qualquer elemento com data-scroll ---
document.querySelectorAll("[data-scroll]").forEach((el) => {
    el.addEventListener("click", () => {
        const target = document.querySelector(el.dataset.scroll);
        if (target) target.scrollIntoView({ behavior: "smooth" });
        closeMenu();
    });
});

// --- Download do currículo ---
document.getElementById("btnCurriculo").addEventListener("click", (e) => {
    e.preventDefault();
    const link = document.createElement("a");
    link.href = "assets/Meu Currículo.pdf";
    link.download = "Curriculo-Renan.pdf";
    link.click();
});

// --- Navbar sólida ao rolar + botão voltar ao topo ---
const navbar = document.querySelector(".nav-bar");
const btnTopo = document.querySelector("#btnTopo");
const footer = document.querySelector("footer");

const footerObserver = new IntersectionObserver(
    ([entry]) => {
        btnTopo.classList.toggle("visible", window.scrollY > 300 && !entry.isIntersecting);
    },
    { threshold: 0 }
);
footerObserver.observe(footer);

window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);

    const footerVisible = footer.getBoundingClientRect().top < window.innerHeight;
    btnTopo.classList.toggle("visible", window.scrollY > 300 && !footerVisible);
});

btnTopo.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});


/* =========================================================
   GALERIA / LIGHTBOX
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    const imagens = Array.from(document.querySelectorAll(".certificados img"));
    const lightbox = document.querySelector(".lightbox");
    const lightboxImg = document.querySelector(".lightbox-img");
    const fechar = document.querySelector(".close");
    const btnPrev = document.querySelector(".lightbox-prev");
    const btnNext = document.querySelector(".lightbox-next");
    if (!lightbox || !lightboxImg || !imagens.length) return;

    let indiceAtual = 0;

    function abrirImagem(indice) {
        indiceAtual = (indice + imagens.length) % imagens.length; // wraparound nas pontas
        lightboxImg.src = imagens[indiceAtual].src;
        lightboxImg.alt = imagens[indiceAtual].alt || "Imagem ampliada";
    }

    function abrirLightbox(indice) {
        abrirImagem(indice);
        lightbox.classList.add("active");
    }

    function fecharLightbox() {
        lightbox.classList.remove("active");
    }

    imagens.forEach((img, i) => {
        img.addEventListener("click", () => abrirLightbox(i));
    });

    btnPrev?.addEventListener("click", (e) => {
        e.stopPropagation();
        abrirImagem(indiceAtual - 1);
    });

    btnNext?.addEventListener("click", (e) => {
        e.stopPropagation();
        abrirImagem(indiceAtual + 1);
    });

    fechar?.addEventListener("click", fecharLightbox);

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) fecharLightbox();
    });

    document.addEventListener("keydown", (e) => {
        if (!lightbox.classList.contains("active")) return;
        if (e.key === "Escape") fecharLightbox();
        if (e.key === "ArrowRight") abrirImagem(indiceAtual + 1);
        if (e.key === "ArrowLeft") abrirImagem(indiceAtual - 1);
    });

    /* =========================================================
       ARRASTAR PARA TROCAR DE IMAGEM (mouse + touch)
       ========================================================= */
    let inicioX = 0;
    let arrastando = false;
    const LIMIAR_ARRASTO = 50; // pixels mínimos para considerar "trocou de imagem"

    function iniciarArrasto(x) {
        inicioX = x;
        arrastando = true;
        lightboxImg.style.transition = "none";
    }

    function moverArrasto(x) {
        if (!arrastando) return;
        const delta = x - inicioX;
        lightboxImg.style.transform = `translateX(${delta}px)`;
    }

    function finalizarArrasto(x) {
        if (!arrastando) return;
        arrastando = false;
        const delta = x - inicioX;

        lightboxImg.style.transition = "transform 0.25s ease";
        lightboxImg.style.transform = "translateX(0)";

        if (Math.abs(delta) > LIMIAR_ARRASTO) {
            if (delta < 0) abrirImagem(indiceAtual + 1); // arrastou pra esquerda -> próxima
            else abrirImagem(indiceAtual - 1);            // arrastou pra direita -> anterior
        }
    }

    // Mouse
    lightboxImg.addEventListener("mousedown", (e) => {
        e.preventDefault();
        iniciarArrasto(e.clientX);
    });

    window.addEventListener("mousemove", (e) => moverArrasto(e.clientX));

    window.addEventListener("mouseup", (e) => finalizarArrasto(e.clientX));

    // Touch
    lightboxImg.addEventListener("touchstart", (e) => {
        iniciarArrasto(e.touches[0].clientX);
    }, { passive: true });

    lightboxImg.addEventListener("touchmove", (e) => {
        moverArrasto(e.touches[0].clientX);
    }, { passive: true });

    lightboxImg.addEventListener("touchend", (e) => {
        finalizarArrasto(e.changedTouches[0].clientX);
    });
});
