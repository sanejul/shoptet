# AGENTS.md

## Cursor Cloud specific instructions

### Co to je za projekt
Vlastní design (theme) pro e-shop **Haaro Naturo** na platformě **Shoptet** (šablona Classic). Nejde o samostatně běžící aplikaci — jsou to statické HTML/CSS/JS fragmenty, které se nahrávají do Shoptetu:
- `banner.html` — HTML struktura titulní stránky, vkládá se přes **textový banner** na homepage.
- `styles/style.css` — přebíjení výchozích stylů Shoptetu (navigace, patička, košík, produktové stránky) + dosud i titulka.
- `styles/fonts.css` — `@font-face` definice, fonty jsou **base64 vložené přímo v CSS** (žádné externí CDN). Aktuálně Fabrikat + Inter (Inter = běžný text dle nového návrhu, vč. latin-ext kvůli češtině).

### Jak nasazení funguje (důležité)
- CSS/JS a obrázky se nahrávají do správce souborů Shoptetu a referencují se absolutní URL `https://759082.myshoptet.com/user/documents/upload/...`.
- Změny v tomto repu se **needeployují automaticky** — soubory se ručně nahrají v administraci. Repo je zdroj pravdy pro kód, ne pro běžící web.
- Výpis složek na Shoptetu je vypnutý (GET na složku vrací 404). Jednotlivé soubory jdou číst po URL (200) → názvy souborů nelze „proklikat", je třeba je znát.

### Shoptet přebíjí styly (časté gotchas)
Shoptet přidává vlastní CSS (z CDN, není v repu v textové podobě) a často přebíjí custom styly. Ověřené případy na titulce:
- `.welcome div { max-width: 800px }` — kaskádovitě zužuje VŠECHNY vnořené divy obsahu titulky. Nutno zrušit pro vlastní strom (`.hn-wrapper, .hn-wrapper div { max-width: none !important }`) a šířku obsahu řídit kontejnerem s vyšší specificitou (`.hn-wrapper .hn-container { max-width: 1312px !important }`).
- Shoptet přebíjí velikosti nadpisů (h2 → 40px) → typografické tokeny v `base.css` mají proto `!important`.
- Reálná obsahová oblast homepage je ~1378 px (ne 1280), takže kontejner 1312 se vejde vycentrovaný bez „full-bleed" triků.

### Ladění proti reálnému Shoptetu (headless harness)
Shoptet styly se projeví jen na živé URL. Pro lokální ladění: stáhnout živou HTML (`curl https://759082.myshoptet.com/`), přepsat jen **root-relativní** odkazy na custom CSS (`/user/documents/upload/styles/*.css` → lokální `styles/*.css?cb=<ts>`), fotky nechat na jejich `cdn.myshoptet.com` URL (načtou se z internetu). Shoptet CDN CSS v HTML je absolutní, takže se načte a reprodukuje přebíjení. Měření computed stylů/šířek + screenshoty přes `google-chrome` (`/usr/local/bin/google-chrome`) + `puppeteer-core` headless (viz postup v historii). `computerUse` je stavový a po mnoha screenshotech narazí na limit obrázků — headless je spolehlivější pro měření.

### Náhled lokálně
- `banner.html` je jen fragment (nemá `<html>/<head>`). Pro vizuální náhled: spustit statický server v rootu repa `python3 -m http.server 8000` a otevřít přes dočasný wrapper, který načte `styles/fonts.css` + `styles/style.css` (+ obsah `banner.html`). Wrapper není součástí repa, vytváří se ad hoc.

### Zdroj designu (Figma)
- Figma MCP je nakonfigurovaný. File key: `fz7wjXFrn2sPSB5wcjXtrV`.
- Cílový rám titulní stránky: **„Home page - finalni texty"**, nodeId `386:789` (finální texty). Desktop 1440px. Mobilní návrh zatím neexistuje (dělá se jen desktop).
- Designové tokeny: text `#484848`, malý text `#5b5b5b`, akcent „rtěnka" `#c45c63`, bílá/černá; nadpisy Fabrikat (Bold/Regular/Medium/Black), běžný text Inter 17/1.6.

### Konvence
- Zlomy řádků dle Figmy řešit přes `<br>`. Pro budoucí mobilní verzi používat přepínací třídy `<br class="br-desktop">` / `<br class="br-mobile">` (přepínané media query), aby šly zlomy lišit desktop vs. mobil.

### Přístupy / secrets
- Analýza veřejného webu (`759082.myshoptet.com`) i Figmy funguje bez přihlášení.
- Pro administraci jsou k dispozici secrets `SHOPTET_ADMIN_USER` / `SHOPTET_ADMIN_PASS` (čtení nastavení, procházení správce souborů). Jde o ostrý e-shop — v administraci postupovat opatrně (default read-only), nic nepublikovat bez výslovného pokynu.
- Network access: je potřeba odchozí přístup na `*.figma.com`, `*.myshoptet.com`, `haaro-naturo.cz` a (jednorázově) CDN fontů.
