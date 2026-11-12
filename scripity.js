/*
  GTA VI - DevClub Character Selector
  Premium Cinematic JavaScript
  ─────────────────────────────────────
  GSAP Animations + Particle System
*/

// ═══════════════════════════════════════════
// 1. DOM REFERENCES
// ═══════════════════════════════════════════
const lucianame   = document.querySelector(".lucianame")
const luciaimg    = document.querySelector(".luciaimg")
const dogimg      = document.querySelector(".dog-img")
const textBlock   = document.querySelector(".text")
const buttonsList  = document.querySelectorAll(".buttons > *")
const logoRockstar = document.querySelector(".logo-rockstar")
const logoGame     = document.querySelector(".logo-game")
const bottomLogos  = document.querySelector(".bottom-logos")
const canvas       = document.getElementById("particle-canvas")
const ctx          = canvas.getContext("2d")

// ═══════════════════════════════════════════
// 2. PARTICLE SYSTEM (Background Glow)
// ═══════════════════════════════════════════
let particles = []
let particleColor = { r: 255, g: 60, b: 172 } // Cor inicial (Lucia rosa)
let targetColor = { r: 255, g: 60, b: 172 }

function resizeCanvas() {
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight
}
resizeCanvas()
window.addEventListener("resize", resizeCanvas)

class Particle {
    constructor() {
        this.reset()
    }
    reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2.5 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.4
        this.speedY = (Math.random() - 0.5) * 0.3 - 0.15
        this.opacity = Math.random() * 0.4 + 0.05
        this.life = Math.random() * 300 + 100
        this.age = 0
    }
    update() {
        this.x += this.speedX
        this.y += this.speedY
        this.age++
        // Fade in and out
        const lifeRatio = this.age / this.life
        if (lifeRatio < 0.1) {
            this.currentOpacity = this.opacity * (lifeRatio / 0.1)
        } else if (lifeRatio > 0.8) {
            this.currentOpacity = this.opacity * ((1 - lifeRatio) / 0.2)
        } else {
            this.currentOpacity = this.opacity
        }
        if (this.age >= this.life || this.x < -10 || this.x > canvas.width + 10 || this.y < -10 || this.y > canvas.height + 10) {
            this.reset()
        }
    }
    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${Math.round(particleColor.r)}, ${Math.round(particleColor.g)}, ${Math.round(particleColor.b)}, ${this.currentOpacity})`
        ctx.fill()
        // Glow effect
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${Math.round(particleColor.r)}, ${Math.round(particleColor.g)}, ${Math.round(particleColor.b)}, ${this.currentOpacity * 0.15})`
        ctx.fill()
    }
}

// Criar partículas
for (let i = 0; i < 60; i++) {
    particles.push(new Particle())
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Interpolar suavemente a cor das partículas em direção à cor-alvo
    particleColor.r += (targetColor.r - particleColor.r) * 0.02
    particleColor.g += (targetColor.g - particleColor.g) * 0.02
    particleColor.b += (targetColor.b - particleColor.b) * 0.02
    
    particles.forEach(p => {
        p.update()
        p.draw()
    })
    requestAnimationFrame(animateParticles)
}
animateParticles()

// ═══════════════════════════════════════════
// 3. MAP DE CORES POR PERSONAGEM
// ═══════════════════════════════════════════
const characterColors = {
    'Lucia':    { r: 255, g: 60,  b: 172 },
    'Jason':    { r: 0,   g: 178, b: 201 },
    'CJ':       { r: 126, g: 211, b: 126 },
    'Tommy':    { r: 68,  g: 149, b: 255 },
    'Claude':   { r: 255, g: 0,   b: 0   },
    'Franklin': { r: 10,  g: 126, b: 140 },
    'YOU':      { r: 255, g: 211, b: 25  }
}

// ═══════════════════════════════════════════
<<<<<<< HEAD
// 3.05 MAP DE WANTED LEVEL + HUD POR PERSONAGEM
// ═══════════════════════════════════════════
const characterWanted = {
    'Lucia':    3,
    'Jason':    2,
    'CJ':       4,
    'Tommy':    5,
    'Claude':   4,
    'Franklin': 3,
    'YOU':      1
}

const characterHuds = {
    'Claude':   'img/hud/HUDGTA3.png',
    'Tommy':    'img/hud/HUDGTAVC.png',
    'CJ':       'img/hud/HUDSAN.png',
    'Franklin': 'img/hud/HUDGTAV.png'
    // Lucia, Jason e YOU usam o HUD sem imagem dedicada, mostrando o painel de procurado estilizado
}

// ═══════════════════════════════════════════
=======
>>>>>>> 12d065686d8552236f0f462b8ac07d0d5be8503d
// 3.1 MAP DE LOGOS POR PERSONAGEM
// ═══════════════════════════════════════════
const characterLogos = {
    'Lucia': {
        rockstar: 'img/ico/rockstar logo GTA6.jpeg',
        game: 'img/ico/GTA6 ico.png'
    },
    'Jason': {
        rockstar: 'img/ico/rockstar logo GTA6.jpeg',
        game: 'img/ico/GTA6 ico.png'
    },
    'CJ': {
        rockstar: 'img/ico/Rockstar_logo.png',
        game: 'img/ico/san ico.png'
    },
    'Tommy': {
        rockstar: 'img/ico/Rockstar_logo.png',
        game: 'img/ico/Vc ico.png'
    },
    'Claude': {
        rockstar: 'img/ico/Rockstar_logo.png',
        game: 'img/ico/GTA3 ico.png'
    },
    'Franklin': {
        rockstar: 'img/ico/Rockstar_logo.png',
        game: 'img/ico/GTA V ico.png'
    },
    'YOU': {
        rockstar: 'img/ico/rockstar logo GTA6.jpeg',
        game: 'img/ico/GTA6 ico.png'
    }
}

// ═══════════════════════════════════════════
// 4. INTRO ANIMATION (Page Load)
// ═══════════════════════════════════════════
<<<<<<< HEAD
function initIntro() {
    updateHUD('Lucia', '#ff3cac')

    const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => startCharacterAnimation('Lucia')
=======
window.addEventListener("DOMContentLoaded", () => {
    const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: startIdleAnimation
>>>>>>> 12d065686d8552236f0f462b8ac07d0d5be8503d
    })

    tl.from("body", {
        opacity: 0,
        duration: 0.5
    })
    .from(lucianame, {
        y: -40,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
    }, "-=0.2")
    .fromTo(luciaimg,
        { opacity: 0, scale: 0.94, transformOrigin: "bottom center" },
        { opacity: 1, scale: 1, duration: 0.7, ease: "power2.out" },
        "-=0.4"
    )
    .from(textBlock, {
        x: -30,
        opacity: 0,
        duration: 0.5
    }, "-=0.4")
    .from(buttonsList, {
        y: 20,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "back.out(1.5)"
    }, "-=0.3")
    .from(bottomLogos, {
        x: 30,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out"
    }, "-=0.3")
<<<<<<< HEAD
}

if (document.readyState === 'loading') {
    window.addEventListener("DOMContentLoaded", initIntro)
} else {
    initIntro()
}

// ═══════════════════════════════════════════
// 5. ANIMAÇÕES EXCLUSIVAS DE CADA PERSONAGEM
// ═══════════════════════════════════════════

// Cachorro (Chop) - Agressivo, latindo com botes rápidos e rosnado
function startDogAggressiveAnimation() {
    gsap.killTweensOf(dogimg)
    gsap.set(dogimg, { opacity: 1, transformOrigin: "bottom center" })

    // Timeline em loop: Latido 1 + Latido 2 com salto + Rosnado ofegante
    const dogTL = gsap.timeline({ repeat: -1, repeatDelay: 0.25 })

    // Latido 1 (Pulo rápido e firme para frente/cima)
    dogTL.to(dogimg, {
        y: -14,
        scaleY: 1.055,
        scaleX: 1.03,
        rotation: -2.8,
        duration: 0.12,
        ease: "power2.out"
    })
    .to(dogimg, {
        y: 0,
        scaleY: 0.98,
        scaleX: 1.01,
        rotation: 0,
        duration: 0.14,
        ease: "power2.in"
    })
    // Micro pausa entre latidos
    .to({}, { duration: 0.08 })
    // Latido 2 (Mais agressivo, salto maior defendendo o Franklin)
    .to(dogimg, {
        y: -22,
        scaleY: 1.075,
        scaleX: 1.045,
        rotation: -3.8,
        duration: 0.13,
        ease: "power2.out"
    })
    .to(dogimg, {
        y: 0,
        scaleY: 0.965,
        scaleX: 1.01,
        rotation: 0,
        duration: 0.16,
        ease: "power2.in"
    })
    // Fase de alerta/rosnado ofegante com respiração rápida e tensa
    .to(dogimg, {
        scaleY: 1.025,
        scaleX: 1.012,
        rotation: -0.8,
        duration: 0.3,
        yoyo: true,
        repeat: 3,
        ease: "sine.inOut"
    })
}

// Aliases de compatibilidade
function startIdleAnimation() {
    startCharacterAnimation()
}

function startDogIdleAnimation() {
    startDogAggressiveAnimation()
}

// Respiração suave, leve e sutil original para todos os personagens
function startCharacterAnimation() {
    gsap.killTweensOf(luciaimg)
    gsap.set(luciaimg, { opacity: 1, transformOrigin: "bottom center", rotation: 0, x: 0, y: 0 })
=======
})

// ═══════════════════════════════════════════
// 5. IDLE BREATHING ANIMATIONS
// ═══════════════════════════════════════════
function startIdleAnimation() {
    gsap.killTweensOf(luciaimg)
    gsap.set(luciaimg, { opacity: 1 })
>>>>>>> 12d065686d8552236f0f462b8ac07d0d5be8503d
    gsap.to(luciaimg, {
        scaleY: 1.012,
        scaleX: 1.006,
        transformOrigin: "bottom center",
        duration: 2.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    })
}

<<<<<<< HEAD
=======
function startDogIdleAnimation() {
    gsap.killTweensOf(dogimg)
    gsap.to(dogimg, {
        scaleY: 1.018,
        scaleX: 1.01,
        transformOrigin: "bottom center",
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    })
}

>>>>>>> 12d065686d8552236f0f462b8ac07d0d5be8503d
// ═══════════════════════════════════════════
// 6. CHARACTER SWITCHING
// ═══════════════════════════════════════════
function sectercharacter(name, image, colorname, background = 'img/background/background2.jpg', btnEl) {
    // Marcar botão ativo
    document.querySelectorAll('.char-btn-box').forEach(b => b.classList.remove('active'))
    if (btnEl) btnEl.classList.add('active')

    // Atualizar cor das partículas
    if (characterColors[name]) {
        targetColor = { ...characterColors[name] }
    }

<<<<<<< HEAD
    // Atualizar HUD (Wanted Stars + Weapon)
    updateHUD(name, colorname)

=======
>>>>>>> 12d065686d8552236f0f462b8ac07d0d5be8503d
    // Animação de saída rápida
    gsap.to([luciaimg, lucianame, bottomLogos], {
        opacity: 0,
        duration: 0.2,
        ease: "power1.in",
        onComplete: () => {
            // Atualiza dados do personagem
            lucianame.innerHTML = name
            luciaimg.src = image
            lucianame.style.color = colorname

            // Atualiza logos do canto inferior direito
            if (characterLogos[name]) {
                logoRockstar.src = characterLogos[name].rockstar
                logoGame.src = characterLogos[name].game
            }

            // Glow no nome que combina com a cor do personagem
            lucianame.style.textShadow = `0 0 40px ${colorname}66, 0 10px 60px rgba(0,0,0,0.8)`

            // Transição de fundo
            document.body.style.backgroundImage = `url(${background})`

            // Reseta classes de zoom
            luciaimg.classList.remove('claude-zoom', 'franklin-zoom')

            if (name === 'Claude') {
                luciaimg.classList.add('claude-zoom')
            } else if (name === 'Franklin') {
                luciaimg.classList.add('franklin-zoom')
            }

            // Animação de entrada (ancorada na base, sem mostrar o corte do corpo)
            gsap.fromTo(luciaimg,
                { opacity: 0, scale: 0.95, transformOrigin: "bottom center" },
<<<<<<< HEAD
                { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out", onComplete: () => startCharacterAnimation(name) }
=======
                { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out", onComplete: startIdleAnimation }
>>>>>>> 12d065686d8552236f0f462b8ac07d0d5be8503d
            )

            // Animação do nome
            gsap.fromTo(lucianame,
                { opacity: 0, y: -15 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
            )

            // Animação das logos (fade-in suave com scale)
            gsap.fromTo(bottomLogos,
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
            )

            // Cachorro (Chop) - apenas com Franklin
            if (name === 'Franklin') {
                dogimg.classList.add('show')
                gsap.fromTo(dogimg,
                    { opacity: 0, scale: 0.9, transformOrigin: "bottom center" },
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.5,
                        delay: 0.1,
                        ease: "power2.out",
<<<<<<< HEAD
                        onComplete: startDogAggressiveAnimation
=======
                        onComplete: startDogIdleAnimation
>>>>>>> 12d065686d8552236f0f462b8ac07d0d5be8503d
                    }
                )
            } else {
                if (dogimg.classList.contains('show')) {
                    gsap.killTweensOf(dogimg)
                    gsap.to(dogimg, {
                        opacity: 0,
                        duration: 0.2,
                        onComplete: () => dogimg.classList.remove('show')
                    })
                }
            }
        }
    })
}

// ═══════════════════════════════════════════
// 7. USER PHOTO UPLOAD
// ═══════════════════════════════════════════
function seephoto(input) {
    if (input.files && input.files[0]) {
        let urlFoto = URL.createObjectURL(input.files[0])
        const youBtn = document.getElementById('btn-you')
        sectercharacter("YOU", urlFoto, "#ffd319", 'img/background/background2.jpg', youBtn)
    }
}
<<<<<<< HEAD

// ═══════════════════════════════════════════
// 8. GAME HUD + WANTED STARS UPDATE
// ═══════════════════════════════════════════
const wantedStars = document.querySelectorAll('.wanted-star')
const hudFrame    = document.getElementById('hud-frame')
const hudImage    = document.getElementById('hud-image')

function updateHUD(name, colorname) {
    // ── Wanted Stars ──
    const level = characterWanted[name] || 1

    wantedStars.forEach((star, i) => {
        star.classList.remove('active', 'pulse')
        if (i < level) {
            star.classList.add('active')
            if (i === level - 1) {
                star.classList.add('pulse')
            }
        }
    })

    gsap.fromTo(wantedStars,
        { scale: 0.7, opacity: 0.3 },
        {
            scale: 1,
            opacity: 1,
            duration: 0.35,
            stagger: 0.05,
            ease: "back.out(2)"
        }
    )

    // ── Game HUD Image (Canto Superior Direito) ──
    const hudSrc = characterHuds[name]

    if (hudSrc) {
        gsap.to(hudFrame, {
            opacity: 0,
            scale: 0.85,
            y: -10,
            duration: 0.2,
            ease: "power2.in",
            onComplete: () => {
                hudImage.src = hudSrc
                hudFrame.style.display = 'flex'
                gsap.to(hudFrame, {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.4,
                    ease: "back.out(1.7)"
                })
            }
        })
    } else {
        // Se o personagem não tiver HUD dedicada (ex: Lucia, Jason, YOU)
        gsap.to(hudFrame, {
            opacity: 0,
            duration: 0.2,
            onComplete: () => {
                hudFrame.style.display = 'none'
                hudImage.src = ''
            }
        })
    }
}

// ═══════════════════════════════════════════
// 8. 3D PARALLAX EFFECT ON MOUSEMOVE
// ═══════════════════════════════════════════
let mouseX = 0, mouseY = 0
let currentBgX = 0, currentBgY = 0
let currentCharX = 0, currentTextX = 0

window.addEventListener('mousemove', (e) => {
    // Normaliza de -1 a 1 baseado no centro da tela
    const normX = (e.clientX / window.innerWidth) * 2 - 1
    const normY = (e.clientY / window.innerHeight) * 2 - 1

    // Parallax no Fundo (movimento sutil oposto ao mouse)
    gsap.to(document.body, {
        backgroundPosition: `${50 + normX * 2}% ${50 + normY * 2}%`,
        duration: 0.8,
        ease: "power1.out"
    })

    // Parallax no Personagem Principal (sensação de profundidade 3D)
    gsap.to(luciaimg, {
        x: normX * -18,
        y: normY * -6,
        rotationY: normX * 4,
        duration: 0.7,
        ease: "power2.out"
    })

    // Parallax no Chop (quando visível)
    if (dogimg && dogimg.classList.contains('show')) {
        gsap.to(dogimg, {
            x: 260 + (normX * -12),
            y: normY * -4,
            duration: 0.7,
            ease: "power2.out"
        })
    }

    // Parallax no Nome Gigante de Fundo (move com profundidade maior)
    gsap.to(lucianame, {
        x: normX * 22,
        y: normY * 8,
        duration: 0.9,
        ease: "power2.out"
    })

    // Parallax no Bloco de Texto lateral
    if (textBlock) {
        gsap.to(textBlock, {
            x: normX * -8,
            duration: 0.6,
            ease: "power1.out"
        })
    }
})
=======
>>>>>>> 12d065686d8552236f0f462b8ac07d0d5be8503d
