// Tiny hash router. Hash routes work on GitHub Pages with no server config.

const routes = [];

export function route(pattern, handler) {
  const keys = [];
  const regex = new RegExp(
    '^' + pattern.replace(/:(\w+)/g, (_, k) => { keys.push(k); return '([^/]+)'; }) + '$'
  );
  routes.push({ regex, keys, handler });
}

export function navigate(path) {
  window.location.hash = path.startsWith('#') ? path : `#${path}`;
}

export function currentPath() {
  const h = window.location.hash.replace(/^#/, '');
  return h === '' ? '/' : h;
}

export function start(root, notFound) {
  function render() {
    const path = currentPath();
    for (const r of routes) {
      const m = path.match(r.regex);
      if (m) {
        const params = {};
        r.keys.forEach((k, i) => { params[k] = decodeURIComponent(m[i + 1]); });
        root.innerHTML = '';
        r.handler(root, params);
        root.focus({ preventScroll: true });
        window.scrollTo(0, 0);
        highlightNav(path);
        return;
      }
    }
    root.innerHTML = '';
    notFound(root, path);
  }
  window.addEventListener('hashchange', render);
  render();
}

function highlightNav(path) {
  document.querySelectorAll('.nav-links a').forEach((a) => {
    const target = a.getAttribute('href').replace(/^#/, '');
    const active = target === '/' ? path === '/' : path.startsWith(target);
    a.setAttribute('aria-current', active ? 'page' : 'false');
  });
}
