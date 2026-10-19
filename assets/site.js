// AA-5750 Week 1: shared page chrome: nav, theme, TOC, code blocks, pager.
(function () {
  const PAGES = [
    { href: "index.html", label: "Home" },
    { href: "tensors.html", label: "NumPy → PyTorch" },
    { href: "text-augmentation.html", label: "Text Augmentation" },
    { href: "image-augmentation.html", label: "Image Augmentation" },
    { href: "why-augmentation.html", label: "Why It Works" },
    { href: "deep-learning-history.html", label: "Deep Learning History" },
    { href: "neurons.html", label: "Biological vs Artificial" },
    { href: "perceptron-logreg.html", label: "Perceptron vs LogReg" },
    { href: "mlp.html", label: "Perceptron → MLP" },
    { href: "assignment.html", label: "Assignment Guide" },
  ];
  const here = (location.pathname.split("/").pop() || "index.html");

  // ---- theme ----
  const root = document.documentElement;
  try { const t = localStorage.getItem("aa5750-theme"); if (t) root.dataset.theme = t; } catch (e) {}
  function isDark() {
    if (root.dataset.theme) return root.dataset.theme === "dark";
    return matchMedia("(prefers-color-scheme: dark)").matches;
  }

  // ---- top bar ----
  const bar = document.createElement("header");
  bar.className = "topbar";
  bar.innerHTML =
    '<div class="topbar-inner"><a class="brand" href="index.html">AA-5750 <span>· Week 1</span></a>' +
    '<nav class="nav" aria-label="Pages">' +
    PAGES.map(p => `<a href="${p.href}"${p.href === here ? ' aria-current="page"' : ""}>${p.label}</a>`).join("") +
    '</nav><button class="theme-btn" type="button" aria-label="Toggle colour theme"></button></div>';
  document.body.prepend(bar);
  const tbtn = bar.querySelector(".theme-btn");
  const setLabel = () => (tbtn.textContent = isDark() ? "Light" : "Dark");
  setLabel();
  tbtn.addEventListener("click", () => {
    root.dataset.theme = isDark() ? "light" : "dark";
    try { localStorage.setItem("aa5750-theme", root.dataset.theme); } catch (e) {}
    setLabel();
    document.dispatchEvent(new Event("themechange"));
  });
  const cur = bar.querySelector('[aria-current="page"]');
  const navEl = bar.querySelector(".nav");
  if (cur && cur.offsetLeft + cur.offsetWidth > navEl.clientWidth) navEl.scrollLeft = cur.offsetLeft - navEl.clientWidth / 2 + cur.offsetWidth / 2;

  // ---- pager ----
  const idx = PAGES.findIndex(p => p.href === here);
  const main = document.querySelector("main");
  if (main && idx >= 0) {
    const prev = PAGES[idx - 1], next = PAGES[idx + 1];
    const pager = document.createElement("div");
    pager.className = "pager";
    pager.innerHTML =
      (prev ? `<a href="${prev.href}"><small>← Previous</small>${prev.label}</a>` : "") +
      (next ? `<a class="next" href="${next.href}"><small>Next →</small>${next.label}</a>` : "");
    main.appendChild(pager);
  }

  // ---- table of contents from h2 ----
  const toc = document.querySelector(".toc");
  if (toc && main) {
    const hs = [...main.querySelectorAll("h2[id]")];
    toc.innerHTML = "<h4>On this page</h4>" + hs.map(h => `<a href="#${h.id}">${h.dataset.toc || h.textContent}</a>`).join("");
    const links = [...toc.querySelectorAll("a")];
    const onScroll = () => {
      let i = 0;
      hs.forEach((h, k) => { if (h.getBoundingClientRect().top < 120) i = k; });
      links.forEach((a, k) => a.classList.toggle("active", k === i));
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // ---- python highlighting + copy buttons ----
  const KW = new Set("import from as def return for in if else elif while class with not and or is None True False lambda try except raise yield pass break continue global print self".split(" "));
  const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  function highlight(src) {
    const re = /(#[^\n]*)|("""[\s\S]*?"""|'''[\s\S]*?'''|f?"(?:\\.|[^"\\\n])*"|f?'(?:\\.|[^'\\\n])*')|\b(\d+\.?\d*(?:e-?\d+)?)\b|\b([A-Za-z_]\w*)\b(\s*\()?/g;
    let out = "", last = 0, m;
    while ((m = re.exec(src))) {
      out += esc(src.slice(last, m.index));
      if (m[1]) out += `<span class="c">${esc(m[1])}</span>`;
      else if (m[2]) out += `<span class="s">${esc(m[2])}</span>`;
      else if (m[3]) out += `<span class="n">${m[3]}</span>`;
      else if (m[4]) {
        if (KW.has(m[4])) out += `<span class="k">${m[4]}</span>` + (m[5] || "");
        else if (m[5]) out += `<span class="f">${m[4]}</span>${m[5]}`;
        else out += m[4];
      }
      last = re.lastIndex;
    }
    return out + esc(src.slice(last));
  }
  document.querySelectorAll("pre").forEach(pre => {
    const code = pre.querySelector("code");
    if (code && code.classList.contains("py")) code.innerHTML = highlight(code.textContent);
    if (pre.classList.contains("out")) return;
    const b = document.createElement("button");
    b.className = "copy-btn"; b.type = "button"; b.textContent = "Copy";
    b.addEventListener("click", async () => {
      try { await navigator.clipboard.writeText((code || pre).textContent); b.textContent = "Copied"; }
      catch (e) { b.textContent = "Select & copy"; }
      setTimeout(() => (b.textContent = "Copy"), 1400);
    });
    pre.appendChild(b);
  });

  // ---- footer ----
  const f = document.createElement("footer");
  f.className = "footer";
  f.innerHTML = '<div class="wrap">AA-5750 Contemporary Issues in Analytics · Week 1: Data Foundations &amp; Deep Learning Basics</div>';
  document.body.appendChild(f);

  // shared helper for pages: CSS variable lookup (used by canvas charts)
  window.cssVar = name => getComputedStyle(root).getPropertyValue(name).trim();
})();
