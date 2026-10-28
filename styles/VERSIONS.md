# Shoptet stylesheet cache versions (`?v=`)

Zrcadlo hodnot `v=` v adminu: **Vzhled a obsah → Editor → HTML kód → Záhlaví**.

Po každém nahrání změněného souboru: v adminu i zde `v := v + 1`, pak commit se zprávou typu  
`deploy: home.css→v5, navigation.css→v12`.

Admin Záhlaví má přednost, pokud se číslo liší od této tabulky.

| Soubor | v= | Poznámka |
|--------|----|----------|
| `fonts.css` | 3 | |
| `base.css` | — | doplnit při prvním `<link>` / deployi |
| `style.css` | 50 | |
| `home.css` | 4 | |
| `navigation.css` | 11 | |

Poslední sync tabulky (mimo deploy commit): 2026-10-28 (stav z dřívější kontroly live HTML).
