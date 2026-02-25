// ========== MOBILE MENU TOGGLE ==========
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    // Hamburger 버튼 클릭 이벤트
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 네비게이션 링크 클릭 시 메뉴 닫기
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

// ========== ACTIVE NAV LINK 업데이트 ==========
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ========== HERO 돋보기 & 물방울 스폰 효과 ==========
(function() {
    var hero = document.querySelector('.hero');
    var lens = document.getElementById('heroLens');
    if (!hero || !lens) return;

    var lastSpawnTime = 0;
    var spawnInterval = 60; // ms 간격으로 물방울 생성
    var maxBubbles = 30; // 최대 동시 존재 물방울 수
    var activeBubbles = [];

    function createSpawnBubble(x, y) {
        var now = Date.now();
        if (now - lastSpawnTime < spawnInterval) return;
        lastSpawnTime = now;

        // 최대 수 제한
        if (activeBubbles.length >= maxBubbles) {
            var oldest = activeBubbles.shift();
            if (oldest && oldest.parentNode) oldest.parentNode.removeChild(oldest);
        }

        var bubble = document.createElement('div');
        bubble.className = 'spawn-bubble';

        // 랜덤 크기 (8px ~ 35px)
        var size = Math.random() * 27 + 8;
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';

        // 마우스 주변 랜덤 위치 (반경 80px 내)
        var angle = Math.random() * Math.PI * 2;
        var radius = Math.random() * 80;
        var offsetX = Math.cos(angle) * radius;
        var offsetY = Math.sin(angle) * radius;

        var rect = hero.getBoundingClientRect();
        var posX = x - rect.left + offsetX;
        var posY = y - rect.top + offsetY;
        bubble.style.left = posX + 'px';
        bubble.style.top = posY + 'px';

        // 떠다니는 방향 랜덤 설정
        var driftX = (Math.random() - 0.5) * 120;
        var driftY = -(Math.random() * 80 + 30); // 위로 떠오르게
        bubble.style.setProperty('--drift-x', driftX + 'px');
        bubble.style.setProperty('--drift-y', driftY + 'px');

        // 랜덤 투명도 변화
        var hue = Math.random() * 60; // 약간의 색상 변화
        bubble.style.background = 'radial-gradient(circle at 30% 30%, '
            + 'rgba(255, 255, 255, ' + (0.5 + Math.random() * 0.3) + '), '
            + 'hsla(' + (200 + hue) + ', 80%, 85%, ' + (0.1 + Math.random() * 0.15) + '))';

        hero.appendChild(bubble);
        activeBubbles.push(bubble);

        // 애니메이션 끝나면 제거
        bubble.addEventListener('animationend', function() {
            if (bubble.parentNode) bubble.parentNode.removeChild(bubble);
            var idx = activeBubbles.indexOf(bubble);
            if (idx > -1) activeBubbles.splice(idx, 1);
        });
    }

    hero.addEventListener('mousemove', function(e) {
        // 돋보기 렌즈 따라다니기
        var rect = hero.getBoundingClientRect();
        lens.style.left = (e.clientX - rect.left) + 'px';
        lens.style.top = (e.clientY - rect.top) + 'px';
        lens.classList.add('active');

        // 마우스 포인터 주변에 물방울 생성
        createSpawnBubble(e.clientX, e.clientY);
    });

    hero.addEventListener('mouseleave', function() {
        lens.classList.remove('active');
    });
})();

// ========== SMOOTH SCROLL 개선 ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});