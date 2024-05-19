# **Zaškrtávátka v exportu (inverze výběru, apod.)**
- úprava scriptu pro vytváření formuláře `(js/table.js; řádek 232 - 367)` 
=> přidání dvou tlačítek a definování výchozího stavu
- úprava stylu pro tlačítka `(css/style.css, řádek 1804 - 1903)`

# **Pro vymazání vyhledávatka, nejde klikání na řádek**
- místo přidávání click eventu na každý prvek po změně stránky, (což nefungovalo spolehlivě) poslouchat click event na celé tabulce s filtrem na tr prvek. (js/table.js)
- `js/clickRow.js; řádek 91 - 103, 169 - 189`
- `js/table.js; řádek 102 - 108`

# **Počeštit**
- konfigurace překladů JQuery DataTablu (language tag) (js/table.js) 
- řádek `70 - 90`

# **Tlačítko zavřít plovoucí**
- přesunutí tlačítka "zavřít" doprostřed spodní části editovacího okna firmy
- `css/forms-style.css; řádek 1 - 18, 41 - 61`

# Události vyhledávátko
- po obnovení stránky zůstával ve vyhledávacím políčku text `(js/table.js; řádek 141 - 164)`
- zrušení ukládání do cookies

## Poznámka
- všechny provedené změny jsou označeny přímo v kódu tímto způsobem:
```javascript
/* 
*  ==============================
*  <Jméno autora>: EDIT START/END
*  ==============================
*/
```