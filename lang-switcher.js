// lang-switcher.js - VERSIÓN CORREGIDA
// =====================================

(function() {
    console.log('🔤 Creando selector de idioma...');
    
    function createLanguageSwitcher() {
        if (document.getElementById('languageSwitcher')) return;
        
        // Esperar a que changeLanguage esté disponible
        if (typeof changeLanguage === 'undefined') {
            setTimeout(createLanguageSwitcher, 500);
            return;
        }
        
        const currentLang = localStorage.getItem('language') || 'es';
        
        const switcher = document.createElement('div');
        switcher.id = 'languageSwitcher';
        switcher.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            z-index: 999999;
            background: linear-gradient(135deg, #1e293b, #0f172a);
            border-radius: 40px;
            padding: 8px 16px;
            display: flex;
            gap: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            border: 1px solid rgba(139,92,246,0.4);
            backdrop-filter: blur(10px);
        `;
        
        switcher.innerHTML = `
            <button id="lang-es" style="
                background: ${currentLang === 'es' ? '#8b5cf6' : 'transparent'};
                color: ${currentLang === 'es' ? 'white' : '#94a3b8'};
                border: none;
                padding: 8px 16px;
                border-radius: 30px;
                cursor: pointer;
                font-weight: 600;
                font-size: 13px;
                transition: all 0.2s;
            ">🇪🇸 ES</button>
            
            <button id="lang-en" style="
                background: ${currentLang === 'en' ? '#8b5cf6' : 'transparent'};
                color: ${currentLang === 'en' ? 'white' : '#94a3b8'};
                border: none;
                padding: 8px 16px;
                border-radius: 30px;
                cursor: pointer;
                font-weight: 600;
                font-size: 13px;
                transition: all 0.2s;
            ">🇬🇧 EN</button>
        `;
        
        document.body.appendChild(switcher);
        
        // Eventos
        document.getElementById('lang-es')?.addEventListener('click', () => {
            if (typeof changeLanguage === 'function') {
                changeLanguage('es');
            }
            updateButtonStyles('es');
        });
        
        document.getElementById('lang-en')?.addEventListener('click', () => {
            if (typeof changeLanguage === 'function') {
                changeLanguage('en');
            }
            updateButtonStyles('en');
        });
        
        function updateButtonStyles(lang) {
            const esBtn = document.getElementById('lang-es');
            const enBtn = document.getElementById('lang-en');
            
            if (esBtn) {
                esBtn.style.background = lang === 'es' ? '#8b5cf6' : 'transparent';
                esBtn.style.color = lang === 'es' ? 'white' : '#94a3b8';
            }
            if (enBtn) {
                enBtn.style.background = lang === 'en' ? '#8b5cf6' : 'transparent';
                enBtn.style.color = lang === 'en' ? 'white' : '#94a3b8';
            }
        }
    }
    
    // Esperar a que el DOM cargue completamente
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(createLanguageSwitcher, 3000);
        });
    } else {
        setTimeout(createLanguageSwitcher, 3000);
    }
})();