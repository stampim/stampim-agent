# Embedding demo

A local recording on a fictional app, **"Granit — warehouse and requests"**.
Organisations, names, requests and stock levels are made up; there are no real
customers or their data here. The app UI is in Russian by default; add `?lang=en`
for the English version.

| File | What it is |
|---|---|
| `stampim-agent-demo.mp4` | 30 s video: page without the agent → one `<script>` line → the agent appears → a question in plain words → answer, highlight and opening a request |
| `stampim-agent-demo.gif` | the same video as a GIF (2.8 MB) for the README |
| `shot-highlight.png` | frame: the agent highlighted overdue requests |
| `shot-click.png` | frame: the agent opened a request card when asked |
| `conveyor/` | the "one core — any profession — one click" conveyor animation (EN and RU) |

## How to reproduce locally

1. The widget script is not part of the public repository — it is product code.
   Put a working copy of the script at `demo/agent.js`.
2. Start a static server from the `demo/` folder
   (for example, `python -m http.server 8017`).
3. Open `http://127.0.0.1:8017/` and press **"Embed the agent"**.
   Embedding is exactly one line:

```html
<script src="/agent.js"></script>
```

The video was recorded locally (Playwright + Chromium), with no editing of the agent's answers.
