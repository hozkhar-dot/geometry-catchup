// KaTeX is bundled by Vite from node_modules; nothing loads from a CDN at runtime.
import katex from 'katex';
import 'katex/dist/katex.min.css';

export function tex(expr, display = false) {
  return katex.renderToString(expr, { throwOnError: false, displayMode: display });
}

/** Render every <span data-tex> and <div data-tex-display> inside a root node. */
export function renderMath(root = document) {
  root.querySelectorAll('[data-tex]').forEach((el) => {
    el.innerHTML = tex(el.getAttribute('data-tex'), false);
  });
  root.querySelectorAll('[data-tex-display]').forEach((el) => {
    el.innerHTML = tex(el.getAttribute('data-tex-display'), true);
  });
}
