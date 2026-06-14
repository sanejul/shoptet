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
