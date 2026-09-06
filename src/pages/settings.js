import { downloadExport, importJSON, reset, load, exportJSON } from '../progress.js';

export function settingsPage(root) {
  const state = load();
  root.innerHTML = `
    <h1>Backup</h1>
    <p class="muted">Progress lives only in this browser. Export before switching devices, then import on the new one.</p>

    <section class="card" aria-labelledby="export-h">
      <h2 id="export-h">Export</h2>
      <p>Downloads a JSON file with every attempt, checkpoint score and study day.</p>
      <div class="btn-row">
        <button class="btn" id="export-btn" type="button">Download progress file</button>
        <button class="btn btn-secondary" id="copy-btn" type="button">Copy to clipboard</button>
      </div>
      <p class="small muted" id="export-msg" aria-live="polite"></p>
    </section>

    <section class="card" aria-labelledby="import-h">
      <h2 id="import-h">Import</h2>
      <p>Replaces the progress in this browser with the file you choose.</p>
      <label class="file-label">
        <span>Choose a progress file</span>
        <input type="file" id="import-file" accept="application/json,.json" />
      </label>
      <p class="small muted" id="import-msg" aria-live="polite"></p>
    </section>

    <section class="card" aria-labelledby="reset-h">
      <h2 id="reset-h">Reset</h2>
      <p>Erases all progress in this browser. Export first if you might want it back.</p>
      <button class="btn btn-danger" id="reset-btn" type="button">Erase all progress</button>
    </section>

    <section class="card" aria-labelledby="demo-h">
      <h2 id="demo-h">Quiz player demo</h2>
      <p class="small muted">Five throwaway questions for trying the player. Nothing here is saved to your progress.</p>
      <div class="btn-row">
        <a class="btn btn-secondary" href="#/quiz/demo/practice">Demo practice</a>
        <a class="btn btn-secondary" href="#/quiz/demo/checkpoint">Demo checkpoint (timed)</a>
      </div>
    </section>

    <section class="card" aria-labelledby="info-h">
      <h2 id="info-h">Stored right now</h2>
      <ul class="small">
        <li>Study days logged: ${state.studyDays.length}</li>
        <li>Questions attempted: ${state.attempts.length}</li>
        <li>Checkpoints recorded: ${Object.keys(state.checkpoints).length}</li>
        <li>Questions in Review: ${Object.keys(state.missed).length}</li>
        <li>Created: ${state.createdAt}</li>
      </ul>
    </section>
  `;

  root.querySelector('#export-btn').addEventListener('click', () => {
    downloadExport();
    root.querySelector('#export-msg').textContent = 'Download started.';
  });
  root.querySelector('#copy-btn').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(exportJSON());
      root.querySelector('#export-msg').textContent = 'Copied. Paste it somewhere safe (a note, an email to yourself).';
    } catch {
      root.querySelector('#export-msg').textContent = 'Clipboard blocked. Use the download button instead.';
    }
  });
  root.querySelector('#import-file').addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const msg = root.querySelector('#import-msg');
    try {
      const text = await file.text();
      const ok = window.confirm('Replace the progress in this browser with the chosen file?');
      if (!ok) { msg.textContent = 'Import cancelled.'; return; }
      importJSON(text);
      msg.textContent = 'Imported. Your dashboard now reflects the file.';
      settingsPage(root);
    } catch (err) {
      msg.textContent = `Import failed: ${err.message}`;
    }
  });
  root.querySelector('#reset-btn').addEventListener('click', () => {
    if (window.confirm('Erase ALL progress in this browser? This cannot be undone.')) {
      reset();
      settingsPage(root);
    }
  });
}
