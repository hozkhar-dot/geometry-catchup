import './styles.css';
import { route, start } from './router.js';
import { renderMath } from './math.js';
import { load } from './progress.js';
import { dashboardPage } from './pages/dashboard.js';
import { blockPage } from './pages/block.js';
import { quizPage } from './pages/quiz.js';
import { reviewPage } from './pages/review.js';
import { settingsPage } from './pages/settings.js';

load(); // initialise progress store

route('/', dashboardPage);
route('/block/:id', blockPage);
route('/quiz/:blockId/:mode', quizPage);
route('/review', reviewPage);
route('/settings', settingsPage);

const root = document.getElementById('main');

start(root, (el, path) => {
  el.innerHTML = `
    <section class="card">
      <h1>Page not found</h1>
      <p>No page at <code>${path}</code>.</p>
      <p><a class="btn" href="#/">Back to dashboard</a></p>
    </section>`;
});

// Render any KaTeX placeholders after each navigation.
const observer = new MutationObserver(() => renderMath(root));
observer.observe(root, { childList: true });
renderMath(root);
