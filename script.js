let isKeyboard = false;

// Detect keyboard interaction
document.addEventListener('keydown', () => {
    isKeyboard = true;
    document.body.classList.add('keyboard-active');
});

// Detect mouse interaction
document.addEventListener('mousedown', () => {
    isKeyboard = false;
    document.body.classList.remove('keyboard-active');
});

document.addEventListener("DOMContentLoaded", function () {
    initMenu();
    initFactCards();
    initNavbar();
    initBackToTop();
    initAudioPlayer();
    initModal();
});

/* --- Mobile Menu --- */
function initMenu() {
    const hamburger = document.getElementById("hamburger");
    const overlayMenu = document.getElementById("overlayMenu");
    const closeMenu = document.getElementById("closeMenu");

    hamburger.addEventListener("click", () => overlayMenu.style.right = "0");
    closeMenu.addEventListener("click", () => overlayMenu.style.right = "-100%");
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            overlayMenu.style.right = "-100%";
        }
    });
}

/* --- Fact Cards (Slider + Swiping) --- */
function initFactCards() {
    const cards = document.querySelectorAll(".fact-card");
    const prevBtn = document.querySelector(".fact-btn.left");
    const nextBtn = document.querySelector(".fact-btn.right");
    let currentIndex = 0, startX = 0, endX = 0;

    function updateCards() {
        cards.forEach((card, index) => {
            card.style.transform = `translateX(${(index - currentIndex) * 100}%)`;
            card.style.opacity = index === currentIndex ? "1" : "0";
        });
    }

    function handleSwipe() {
        let difference = startX - endX;
        if (Math.abs(difference) > 50) {
            if (difference > 0) nextSlide(); 
            else prevSlide();
        }
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % cards.length; // Loops back to first
        updateCards();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length; // Loops back to last
        updateCards();
    }

    document.querySelector(".fact-container").addEventListener("touchstart", e => startX = e.touches[0].clientX);
    document.querySelector(".fact-container").addEventListener("touchend", e => { endX = e.changedTouches[0].clientX; handleSwipe(); });

    document.querySelector(".fact-container").addEventListener("mousedown", e => startX = e.clientX);
    document.querySelector(".fact-container").addEventListener("mouseup", e => { endX = e.clientX; handleSwipe(); });

    prevBtn.addEventListener("click", prevSlide);
    nextBtn.addEventListener("click", nextSlide);

    updateCards();
}


/* --- Navbar (Sticky & Auto-Hide) --- */
function initNavbar() {
    let lastScrollTop = 0;
    const navbar = document.querySelector(".top-nav");

    window.addEventListener("scroll", function () {
        let scrollTop = window.scrollY;
        navbar.style.transform = scrollTop > lastScrollTop ? "translateY(-150%)" : "translateY(0)";
        lastScrollTop = scrollTop;
    });
}

/* --- Back to Top Button --- */
function initBackToTop() {
    const backToTopBtn = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {
        backToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    backToTopBtn.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    });
    
}

/* --- Audio Player --- */
function initAudioPlayer() {
    const audioPlayer = document.getElementById("audioPlayer");
    const playButton = document.getElementById("playAudioBtn");

    playButton.addEventListener("click", function () {
        audioPlayer.style.display = "block"; // Ensure the player appears below the button
        audioPlayer.play();
    });
}

/* --- Image Modal (Zoom-in on Click) --- */
function initModal() {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    const closeBtn = document.querySelector(".close");
    const zoomImages = document.querySelectorAll(".zoomable-image");

    zoomImages.forEach(img => {
        img.addEventListener("click", () => {
            modal.style.display = "block";
            modalImg.src = img.src;
        });
    });

    closeBtn.onclick = () => modal.style.display = "none";
    modal.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };
}
