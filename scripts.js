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

//GALERIA CERTIFICADOS
document.addEventListener("DOMContentLoaded", () => {
    const imagens = document.querySelectorAll(".certificados img");
    const lightbox = document.querySelector(".lightbox");
    const lightboxImg = document.querySelector(".lightbox-img");
    const fechar = document.querySelector(".close");
    if (!lightbox || !lightboxImg) return;

    imagens.forEach(img => {
        img.addEventListener("click", () => {
            lightbox.classList.add("active");
            lightboxImg.src = img.src;
        });
    });

    fechar?.addEventListener("click", () => lightbox.classList.remove("active"));
    lightbox.addEventListener("click", (e) => { if (e.target === lightbox) lightbox.classList.remove("active"); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") lightbox.classList.remove("active"); });
});