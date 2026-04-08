// Shared translation helpers used by both build.js and server.js.

// Resolve a dotted key path against a translations object.
function get(obj, dotPath) {
  if (!dotPath) return undefined;
  return dotPath.split('.').reduce((o, k) => o?.[k], obj);
}

// Derive the page's URL path from its file path.
// 'index.html' → '/', 'about.html' → '/about', 'housing/student.html' → '/housing/student'
function pagePathFromFile(file) {
  const withoutExt = file.replace(/\.html$/, '').replace(/\\/g, '/');
  if (withoutExt === 'index') return '/';
  if (withoutExt.endsWith('/index')) return '/' + withoutExt.slice(0, -'/index'.length);
  return '/' + withoutExt;
}

// Apply translations to an assembled HTML string for a given language.
// Handles data-i18n (innerHTML), meta[data-i18n] (content), data-i18n-href (href),
// data-i18n-placeholder (placeholder), html[lang], and language selector links.
// Strips all data-i18n* attributes from the output.
function applyTranslations(html, translations, lang, pagePath) {
  const langPrefix = lang === 'en' ? '' : '/' + lang;

  // 1. Regular elements with data-i18n — replace innerHTML
  //    Tag-name backreference prevents greedy cross-element matches.
  html = html.replace(
    /<([a-zA-Z][a-zA-Z0-9]*)\b([^>]*\bdata-i18n="([^"]+)"[^>]*)>([\s\S]*?)<\/\1>/g,
    (match, tag, attrs, key, _inner) => {
      if (!key) return match;
      const val = get(translations, key);
      return val != null ? `<${tag}${attrs}>${val}</${tag}>` : match;
    }
  );

  // 2. meta[data-i18n] — update content attribute
  html = html.replace(
    /<meta\b([^>]*\bdata-i18n="([^"]+)"[^>]*)>/g,
    (match, attrs, key) => {
      const val = get(translations, key);
      return val != null
        ? `<meta${attrs.replace(/\bcontent="[^"]*"/, `content="${val}"`)}>`
        : match;
    }
  );

  // 3. data-i18n-href — update href with language prefix (or add href if absent)
  html = html.replace(
    /<[a-zA-Z][a-zA-Z0-9]*\b[^>]*\bdata-i18n-href="([^"]+)"[^>]*>/g,
    (fullTag, p) => {
      const newHref = `${langPrefix}${p}`;
      return /(?<!-)href="/.test(fullTag)
        ? fullTag.replace(/(?<!-)href="[^"]*"/, `href="${newHref}"`)
        : fullTag.replace(/\bdata-i18n-href="/, `href="${newHref}" data-i18n-href="`);
    }
  );

  // 4. data-i18n-placeholder — update placeholder attribute
  html = html.replace(
    /<[a-zA-Z][a-zA-Z0-9]*\b[^>]*\bdata-i18n-placeholder="([^"]+)"[^>]*>/g,
    (fullTag, key) => {
      const val = get(translations, key);
      if (val == null) return fullTag;
      return /(?<![a-z-])placeholder="[^"]*"/.test(fullTag)
        ? fullTag.replace(/(?<![a-z-])placeholder="[^"]*"/, `placeholder="${val}"`)
        : fullTag.replace(/>$/, ` placeholder="${val}">`);
    }
  );

  // 5. Update <html lang="...">
  html = html.replace(/(<html\b[^>]*?\blang=")[a-z-]+(")/,`$1${lang}$2`);

  // 6. Language selector — bake in page-specific hrefs and aria-current
  html = html.replace(
    /<a\b([^>]*)\bhref="\/(es\/|fr\/|ca\/|)"([^>]*)>(EN|ES|FR|CAT)<\/a>/g,
    (match, before, rawLang, after, label) => {
      const code = rawLang.replace(/\//g, '') || 'en';
      const href = pagePath === '/'
        ? (code === 'en' ? '/' : `/${code}/`)
        : `${code === 'en' ? '' : '/' + code}${pagePath}`;
      return `<a${before}href="${href}"${after} aria-current="${code === lang}">${label}</a>`;
    }
  );

  // 7. Strip all remaining data-i18n* attributes
  html = html.replace(/\s+data-i18n(?:-[a-z]+)?="[^"]*"/g, '');

  return html;
}

module.exports = { get, pagePathFromFile, applyTranslations };
