/* =================================================================
   NAV.JS — poskládá horní řadu navigace dle Figmy.
   Shoptet má logo a košík v samostatném #header řádku; design je chce
   v horní liště (.top-navigation-bar) spolu s kontakty a ikonami.
   CSS neumí přesunout prvek do jiného kontejneru → uděláme to zde.
   Nahrát do správce souborů a připojit přes <script src=...> v hlavičce.
   ================================================================= */
(function () {
    function build() {
        var topContainer = document.querySelector('.top-navigation-bar .container');
        if (!topContainer) return;

        var tools = topContainer.querySelector('.top-navigation-tools');
        var logo = document.querySelector('.site-name-wrapper');
        var cart = document.querySelector('.navigation-buttons');

        // Logo doprostřed horní lišty
        if (logo && logo.parentElement !== topContainer) {
            topContainer.appendChild(logo);
        }
        // Košík mezi pravé ikony (na začátek nástrojů)
        if (cart && tools && cart.parentElement !== tools) {
            tools.insertBefore(cart, tools.firstChild);
        }

        document.documentElement.classList.add('hn-nav-ready');
    }

    if (document.readyState !== 'loading') {
        build();
    } else {
        document.addEventListener('DOMContentLoaded', build);
    }
})();
