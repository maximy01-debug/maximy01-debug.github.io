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

            setTimeout(() => {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 50);
        }
    });
});

// ========== 강의영상 YouTube 로드 ==========
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.video-thumb[data-url]').forEach(function(thumb) {
        var url = thumb.getAttribute('data-url');
        if (!url) return; // URL이 비어있으면 placeholder 유지

        // YouTube ID 추출
        var videoId = '';
        var match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/);
        if (match) videoId = match[1];
        if (!videoId) return;

        // placeholder 제거하고 썸네일 + 재생 버튼 표시
        thumb.innerHTML = '<img src="https://img.youtube.com/vi/' + videoId + '/maxresdefault.jpg" alt="강의영상 썸네일">' +
            '<div class="video-play-overlay">' +
                '<svg viewBox="0 0 68 48"><path d="M66.5 7.7s-.7-4.7-2.7-6.8C61 -1.8 57.9-1.8 56.4-2 47-.8 34 .8 34 .8S21-.8 11.6-2C10.1-1.8 7-1.8 4.2.9 2.2 3 1.5 7.7 1.5 7.7S.8 13.2.8 18.7v5.1c0 5.5.7 11 .7 11s.7 4.7 2.7 6.8c2.8 2.7 6.4 2.6 8 2.9C18 45.2 34 45.4 34 45.4s13 0 22.4-1.2c1.5-.2 4.6-.2 7.4-2.9 2-2.1 2.7-6.8 2.7-6.8s.7-5.5.7-11v-5.1c0-5.5-.7-11-.7-11z" fill="red"/><path d="M27 33V13l18 10-18 10z" fill="#fff"/></svg>' +
            '</div>';

        // 클릭 시 iframe 로드
        thumb.addEventListener('click', function() {
            thumb.innerHTML = '<iframe src="https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
        });
    });
});

// ========== 문의하기 폼 제출 (localStorage 저장) ==========
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const inquiry = {
            id: Date.now(),
            name: document.getElementById('contactName').value.trim(),
            email: document.getElementById('contactEmail').value.trim(),
            phone: document.getElementById('contactPhone').value.trim(),
            subject: document.getElementById('contactSubject').value.trim(),
            message: document.getElementById('contactMessage').value.trim(),
            date: new Date().toLocaleString('ko-KR'),
            read: false
        };

        // localStorage에 저장
        const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
        inquiries.unshift(inquiry);
        localStorage.setItem('inquiries', JSON.stringify(inquiries));

        // 폼 숨기고 성공 메시지 표시
        contactForm.style.display = 'none';
        document.getElementById('formSuccess').style.display = 'block';

        // 3초 후 폼 다시 표시
        setTimeout(function() {
            contactForm.reset();
            contactForm.style.display = 'flex';
            document.getElementById('formSuccess').style.display = 'none';
        }, 3000);
    });
});