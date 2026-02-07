// 1. СЛОВАРЬ (Внутри файла для скорости)
const translations = {
    fi: {
        home: "Etusivu", about: "Meistä", references: "Referenssit", contacts: "Yhteystiedot",
        quote: "Pyydä tarjous", services: "Palvelut", "services-title": "Mitä tarjoamme",
        hero_name: "Oy", "hero-text": "Vankkaa osaamista raudoituksesta betonitöihin.",
        "about-title": "Rakennusalan asiantuntija Uudenmaan alueella",
        since: "Vuodesta 2021", "since-years": "Vuotta kokemusta",
        reinforcement: "Raudoitus", concrete: "Betonityöt", carpentry: "Timpurityöt", general: "Yleisrakennus",
        "desc-reinf": "Luotettavat ja kestävät raudoitustyöt.", "desc-concrete": "Ammattitaitoista betonointia.",
        "desc-carpentry": "Monipuoliset timpurityöt alusta loppuun.", "desc-general": "Kattavat rakennuspalvelut.",
        "footer-text": "Fimarek Oy – Rakennusalan Asiantuntija Uudenmaan Alueella",
        "cta-text": "Küsi pakkumist juba tänа, ehitame sinu unistused koos!", scroll: "Selaa"
    },
    et: {
        home: "Avaleht", about: "Meist", references: "Viited", contacts: "Kontaktid",
        quote: "Küsi pakkumist", services: "Teenused", "services-title": "Mida pakume",
        hero_name: "OÜ", "hero-text": "Tugev oskusteave armeerimisest betoonitöödeni.",
        "about-title": "Ehitusvaldkonna ekspert Uusimaa piirkonnas",
        since: "Alates 2021", "since-years": "Aastat kogemust",
        reinforcement: "Armeerimine", concrete: "Betoonitööd", carpentry: "Puusepatööd", general: "Üldehitustööd",
        "desc-reinf": "Usaldusväärsed armeerimistööd igas suuruses projektidele.", "desc-concrete": "Professionaalsed betoonitööd.",
        "desc-carpentry": "Mitmekülgsed puusepatööd algusest lõpuni.", "desc-general": "Kogupakett ehitusteenuseid.",
        "footer-text": "Fimarek OÜ – Ehitusvaldkonna ekspert Uusimaa piirkonnas",
        "cta-text": "Küsi pakkumist juba tänа, ehitame sinu unistused koos!", scroll: "Keri"
    },
    ru: {
        home: "Главная", about: "О нас", references: "Объекты", contacts: "Контакты",
        quote: "Запросить цену", services: "Услуги", "services-title": "Что мы предлагаем",
        hero_name: "OÜ", "hero-text": "Профессиональный опыт от армирования до бетонных работ.",
        "about-title": "Эксперт строительной отрасли в регионе Уусимаа",
        since: "С 2021 года", "since-years": "Лет опыта",
        reinforcement: "Армирование", concrete: "Бетон", carpentry: "Плотник", general: "Общестрой",
        "desc-reinf": "Надежное армирование для любых проектов.", "desc-concrete": "Профессиональные бетонные работы.",
        "desc-carpentry": "Плотницкие работы от А до Я.", "desc-general": "Комплексные услуги в столичном регионе.",
        "footer-text": "Fimarek OÜ – Эксперт строительной отрасли в регионе Уусимаа",
        "cta-text": "Запросите предложение сегодня, построим ваши мечты вместе!", scroll: "Вниз"
    }
};

// Функция перевода
function applyTranslations(lang) {
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    document.documentElement.lang = lang;
}

// Загрузка модулей
async function loadComponent(id, path) {
    try {
        const res = await fetch(path);
        if (!res.ok) throw new Error(`404: ${path}`);
        const html = await res.text();
        document.getElementById(id).innerHTML = html;
    } catch (e) { console.error(e); }
}

// Инициализация
async function init() {
    // 1. Загружаем всё параллельно (быстрее)
    await Promise.all([
        loadComponent('header-placeholder', 'partials/header.html'),
        loadComponent('footer-placeholder', 'partials/footer.html')
    ]);

    // 2. Инициализируем язык
    const langSelect = document.getElementById('language-select');
    let lang = localStorage.getItem('fimarek_lang') || 'fi';

    if (langSelect) {async function initSite() {
    // 1. Загружаем компоненты
    await loadComponent('header-placeholder', 'partials/header.html');
    await loadComponent('footer-placeholder', 'partials/footer.html');

    // 2. АВТО-ОБНОВЛЕНИЕ ГОДА (Добавь эти строки здесь)
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 3. Инициализируем переводы
    if (typeof initTranslations === 'function') {
        initTranslations();
    }
    
    // ... остальной код (скролл и т.д.)
}
        langSelect.value = lang;
        langSelect.addEventListener('change', (e) => {
            lang = e.target.value;
            localStorage.setItem('fimarek_lang', lang);
            applyTranslations(lang);
        });
    }

    applyTranslations(lang);

    // 3. Скролл-эффект
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    }, { passive: true }); // Для производительности
}

document.addEventListener('DOMContentLoaded', init);