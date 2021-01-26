# Lightweight I18N for Svelte Apps


## Usage

Installation:

`npm install svelte-i18n-light`

1. create a translation file:

translations.json

```js

{
  "en": {
      "hello": "hello world"
  },
  "de": {
      "hello": "hallo Welt"
  }

```

2. Initialize the dictionary & hook to language selection:

```js
import { dict, locale, t } from "svelte-i18n-light";
    import translations from "translations";
    $: languages = Object.keys(translations);
    $: dict.set(translations);


....

function selectLang(e) {
    let langElem = e.target;
    $locale = langElem.innerHTML;
    handleMenuOpen();
}


....


{#each languages as lang}
    <li
        on:click={selectLang}
        >
        <p class:font-bold={$locale == lang}>
            {lang}
        </p>
    </li>
{/each}

```

3. Translate in any component

```html
<script>
  import { t } from 'svelte-i18n-light'
</script>

{$t('hello')}
```
