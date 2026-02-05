// async function loadComponent(id, path) {
//     const response = await fetch(path);
//     if (!response.ok) throw new Error(`Failed to load ${path}`);
//     const text = await response.text();
//     document.getElementById(id).innerHTML = text;
// }

// async function initSite() {
//     try {
//         // 1. Загружаем Header и Footer
//         await loadComponent('header-placeholder', 'partials/header.html');
//         await loadComponent('footer-placeholder', 'partials/footer.html');

//         // 2. ТЕПЕРЬ, когда Header вставлен в страницу, запускаем перевод
//         if (typeof initTranslations === 'function') {
//             initTranslations();
//         }

//         // 3. Логика скролла для Header
//         const header = document.getElementById('main-header');
//         window.addEventListener('scroll', () => {
//             if (window.scrollY > 80) {
//                 header.classList.add('scrolled');
//             } else {
//                 header.classList.remove('scrolled');
//             }
//         });

//     } catch (err) {
//         console.error("Init Error:", err);
//     }


//     // 4. Подсветка активной страницы в меню
//     const currentPath = window.location.pathname.split("/").pop() || 'index.html';
//     document.querySelectorAll('.nav-link').forEach(link => {
//         if (link.getAttribute('href') === currentPath) {
//             link.classList.add('active');
//         }
//     });
// }

// document.addEventListener('DOMContentLoaded', initSite);

// 1. СЛОВАРЬ (Перенеси его сюда целиком, чтобы не было проблем с доступом)
const translations = {
    fi: {
        home: "Etusivu", about: "Meistä", references: "Referenssit", contacts: "Yhteystiedot",
        hero_name: "Oy", "hero-text": "Vankkaa osaamista raudoituksesta betonitöihin.",
        quote: "Pyydä tarjous", services: "Palvelut", since: "Vuodesta 2021"
    },
    et: {
        home: "Avaleht", about: "Meist", references: "Viited", contacts: "Kontaktid",
        hero_name: "OÜ", "hero-text": "Tugev oskusteave armeerimisest betoonitöödeni.",
        quote: "Küsi pakkumist", services: "Teenused", since: "Alates 2021"
    },
    ru: {
        home: "Главная", about: "О нас", references: "Объекты", contacts: "Контакты",
        hero_name: "OÜ", "hero-text": "Профессиональный опыт от армирования до бетонных работ.",
        quote: "Запросить цену", services: "Услуги", since: "С 2021 года"
    }
};

// 2. ФУНКЦИЯ ПЕРЕВОДА
function applyTranslations(lang) {
    console.log("Applying language:", lang);
    const elements = document.querySelectorAll('[data-lang]');
    
    elements.forEach(el => {
        const key = el.getAttribute('data-lang');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        } else {
            console.warn(`Key "${key}" not found for language "${lang}"`);
        }
    });
    document.documentElement.lang = lang;
}

// 3. ЗАГРУЗКА КОМПОНЕНТОВ
async function loadComponent(id, path) {
    const res = await fetch(path);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;
}

// 4. ГЛАВНЫЙ ЗАПУСК
async function initSite() {
    console.log("Site Init Started...");
    
    // Ждем загрузку хедера и футера
    await loadComponent('header-placeholder', 'partials/header.html');
    await loadComponent('footer-placeholder', 'partials/footer.html');
    console.log("Components Loaded.");

    // Теперь, когда хедер в DOM, ищем селектор
    const langSelect = document.getElementById('language-select');
    let currentLang = localStorage.getItem('fimarek_lang') || 'fi';

    if (langSelect) {
        console.log("Language selector found!");
        langSelect.value = currentLang;
        
        // Вешаем событие
        langSelect.addEventListener('change', (e) => {
            currentLang = e.target.value;
            localStorage.setItem('fimarek_lang', currentLang);
            applyTranslations(currentLang);
        });
    } else {
        console.error("CRITICAL: #language-select NOT FOUND! Check partials/header.html");
    }

    // Применяем язык при старте
    applyTranslations(currentLang);

    // Доп. логика скролла
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    });
}

document.addEventListener('DOMContentLoaded', initSite);