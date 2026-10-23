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
window.addEventListener("DOMContentLoaded", () => {
    const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: startIdleAnimation
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
})

// ═══════════════════════════════════════════
// 5. IDLE BREATHING ANIMATIONS
// ═══════════════════════════════════════════
function startIdleAnimation() {
    gsap.killTweensOf(luciaimg)
    gsap.set(luciaimg, { opacity: 1 })
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
                { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out", onComplete: startIdleAnimation }
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
                        onComplete: startDogIdleAnimation
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
