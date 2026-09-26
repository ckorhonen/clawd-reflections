# Repository instructions

This is a static reflections site: `index.html` contains the browser UI, `assets/` contains media, `reflections.json` supplies content, and `worker.js` serves objects through the `__STATIC_CONTENT` binding. `wrangler.toml` owns the deployment configuration. There is no package manifest or test/lint/typecheck/build script.

Treat reflection content as personal data: read only what the task requires, use synthetic entries for UI checks, and do not copy the dataset into reports or provider prompts. Preserve the JSON structure expected by the page. For static local development, Python 3 can serve the root with `python3 -m http.server 8000`; browser imports may still need network access. A local static server does not exercise the Worker's KV binding, content types, caching, or 404 handling.

For Worker changes, test request/response behavior against a mocked binding before considering an authorized Wrangler environment. For visual changes, inspect the rendered result with controlled content. For Markdown-only changes, inspect paths and use `git diff --check -- <changed-paths>`. Remote deployment, KV writes, and publishing personal content are separate actions.

Complete the authorized change through relevant verification and repair of introduced failures. Resolve routine implementation choices directly; ask only for information or decisions that materially affect the result. If blocked, name the affected action and missing prerequisite, continue independent work, and close with changed paths, checks actually run, and unverified behavior.
