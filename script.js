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

// ========== 강의분야 아코디언 (접기/펼치기) ==========
(function() {
    const categoryHeaders = document.querySelectorAll('.category-header');
    categoryHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const category = this.closest('.expertise-category');
            category.classList.toggle('collapsed');
        });
    });

    // 기본적으로 모두 접힌 상태로 시작
    const categories = document.querySelectorAll('.expertise-category');
    categories.forEach(cat => cat.classList.add('collapsed'));

    // 주요강의이력 포트폴리오 그룹 아코디언
    const portfolioGroupTitles = document.querySelectorAll('.portfolio-group-title');
    portfolioGroupTitles.forEach(title => {
        title.addEventListener('click', function() {
            const group = this.closest('.portfolio-group');
            group.classList.toggle('collapsed');
        });
    });
    // 기본적으로 모두 접힌 상태로 시작
    const portfolioGroups = document.querySelectorAll('.portfolio-group');
    portfolioGroups.forEach(group => group.classList.add('collapsed'));

    // 갤러리 아코디언
    const galleryHeader = document.querySelector('.gallery-accordion-header');
    if (galleryHeader) {
        galleryHeader.addEventListener('click', function() {
            const accordion = this.closest('.gallery-accordion');
            accordion.classList.toggle('collapsed');
        });
        // 기본 접힌 상태
        document.querySelector('.gallery-accordion').classList.add('collapsed');
    }
})();

// ========== SMOOTH SCROLL 개선 ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);

            // 강의분야 아코디언 자동 펼치기
            if (target.classList.contains('expertise-category') && target.classList.contains('collapsed')) {
                target.classList.remove('collapsed');
            }

            // 주요강의이력 포트폴리오 그룹 자동 펼치기
            if (target.classList.contains('portfolio-group') && target.classList.contains('collapsed')) {
                target.classList.remove('collapsed');
            }

            setTimeout(() => {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 50);
        }
    });
});