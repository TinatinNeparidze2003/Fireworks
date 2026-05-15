const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

// ფუნქცია ეკრანის ზომის გასასწორებლად
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

let particles = [];

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = {
            x: (Math.random() - 0.5) * 10,
            y: (Math.random() - 0.5) * 10
        };
        this.alpha = 1;
        this.friction = 0.95;
        this.gravity = 0.15; // დავამატოთ გრავიტაცია
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }

    update() {
        this.velocity.x *= this.friction;
        this.velocity.y *= this.friction;
        this.velocity.y += this.gravity; // ნაპერწკლები დაბლა ვარდება
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.015;
    }
}

function animate() {
    // შავი ფონი მცირე გამჭვირვალობით "კუდის" ეფექტისთვის
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, index) => {
        if (particle.alpha > 0) {
            particle.update();
            particle.draw();
        } else {
            particles.splice(index, 1);
        }
    });

    requestAnimationFrame(animate);
}

// კლიკზე რეაგირება
window.addEventListener('click', (e) => {
    const color = `hsl(${Math.random() * 360}, 100%, 60%)`;
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle(e.clientX, e.clientY, color));
    }
});

animate();