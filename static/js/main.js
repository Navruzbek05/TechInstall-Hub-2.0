// Анимации и интерактивность
document.addEventListener('DOMContentLoaded', function() {
    // Параллакс эффект для фона
    const background = document.querySelector('.background-animation');
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        background.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
    });

    // Анимация появления элементов при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Наблюдаем за всеми карточками и секциями
    document.querySelectorAll('.card, .instruction-section, .upload-form').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });

    // Интерактивность для файлов
    document.querySelectorAll('.file-item').forEach(item => {
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Анимация загрузки файлов
    const fileInput = document.querySelector('.file-input');
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            if (this.files.length > 0) {
                this.style.borderColor = '#10b981';
                this.style.background = '#ecfdf5';
                
                // Добавляем анимацию успешной загрузки
                const fileName = document.createElement('div');
                fileName.textContent = `✓ ${this.files[0].name}`;
                fileName.style.color = '#10b981';
                fileName.style.marginTop = '0.5rem';
                fileName.style.fontWeight = '500';
                fileName.style.animation = 'fadeInUp 0.5s ease-out';
                
                this.parentNode.appendChild(fileName);
            }
        });
    }

    // Плавная прокрутка для навигации
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Интерактивные кнопки
    document.querySelectorAll('button, .download-btn').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1) translateY(-2px)';
        });
    });

    // Анимация текста в герое
    const heroText = document.querySelector('.hero h1');
    if (heroText) {
        const text = heroText.textContent;
        heroText.innerHTML = '';
        
        text.split('').forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.animation = `fadeInUp 0.5s ease-out ${i * 0.1}s both`;
            heroText.appendChild(span);
        });
    }
});

// Уведомления
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideInRight 0.5s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.5s ease-out reverse';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}