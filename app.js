const PROFILE = {
  name: "محمد یاسین کرمی",
  phone: "09043387470",
  tel: "+989043387470",
  email: "officialbymyk@proton.me",
  telegram: "https://t.me/officialbymyk",
  bot: "https://t.me/mykofficialbot",
  github: "https://github.com/officialbymyk",
};

const SOCIALS = [
  { id: "youtube", label: "YouTube", href: "https://www.youtube.com/@officialbymyk", handle: "youtube.com/@officialbymyk",
    icon: '<path d="M22.5 12s0-3.2-.4-4.7a2.9 2.9 0 0 0-2-2C18.6 5 12 5 12 5s-6.6 0-8.1.3a2.9 2.9 0 0 0-2 2C1.5 8.8 1.5 12 1.5 12s0 3.2.4 4.7a2.9 2.9 0 0 0 2 2C5.4 19 12 19 12 19s6.6 0 8.1-.3a2.9 2.9 0 0 0 2-2c.4-1.5.4-4.7.4-4.7Z"/><path d="m10 15.2 5.2-3.2L10 8.8v6.4Z" fill="currentColor" stroke="none"/>' },
  { id: "telegram", label: "Telegram", href: "https://t.me/officialbymyk", handle: "t.me/officialbymyk",
    icon: '<path fill="currentColor" stroke="none" d="M21.5 4.6 3.7 11.4c-1.2.5-1.2 1.1-.2 1.4l4.6 1.4 10.6-6.7c.5-.3.9-.1.6.2l-8.6 7.8-.3 4.5c.5 0 .7-.2 1-.5l2.3-2.2 4.8 3.5c.9.5 1.5.2 1.7-.8l3.1-14.6c.3-1.3-.5-1.9-1.4-1.5Z"/>' },
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/officialbymyk", handle: "instagram.com/officialbymyk",
    icon: '<rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.4" cy="6.6" r="0.8" fill="currentColor" stroke="none"/>' },
  { id: "x", label: "X", href: "https://x.com/officialbymyk", handle: "x.com/officialbymyk",
    icon: '<path fill="currentColor" stroke="none" d="M14.7 10.3 22.2 2h-1.8l-6.5 7.2L8.7 2H2.2l7.9 11.1L2 22h1.8l6.9-7.6L15.3 22h6.5l-7.1-11.7Zm-2.4 2.7-.8-1.1-6.4-8.8h2.8l5.2 7.1.8 1.1 6.7 9.2h-2.8l-5.5-7.5Z"/>' },
  { id: "facebook", label: "Facebook", href: "https://www.facebook.com/officialbymyk", handle: "facebook.com/officialbymyk",
    icon: '<path fill="currentColor" stroke="none" d="M14 9h3V5.5h-3C11.6 5.5 10 7.2 10 9.5V11H7.5v3.5H10V21h3.5v-6.5H16l.5-3.5h-3V9.6c0-.4.2-.6.5-.6Z"/>' },
  { id: "threads", label: "Threads", href: "https://www.threads.com/@officialbymyk", handle: "threads.com/@officialbymyk",
    icon: '<path d="M8.2 8.2c2.4-2.6 9.2-2.2 9.2 4.4 0 5.2-4.4 7.2-7.4 7.2-4.2 0-6.2-2.6-6.2-2.6M16.8 9.4c-4.8-4.6-12.2.6-8.4 5.6 3.2 4.2 10.6 1.4 8.8-2.6-1.2-2.6-6.4-3.2-8.6-1"/>' },
  { id: "github", label: "GitHub", href: "https://github.com/officialbymyk", handle: "github.com/officialbymyk",
    icon: '<path fill="currentColor" stroke="none" d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.9.6-3.5-1.4-3.5-1.4-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.4-1.1.6-1.3-2.3-.3-4.7-1.2-4.7-5.1 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.7.7 1 1.6 1 2.7 0 4-2.4 4.8-4.7 5.1.4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2Z"/>' },
  { id: "email", label: "Email", href: "mailto:officialbymyk@proton.me", handle: "officialbymyk@proton.me",
    icon: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>' },
];

const toastEl = document.getElementById("toast");
let toastTimer;
function toast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2200);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    toast("کپی شد");
    return true;
  } catch {
    toast("کپی نشد — دستی کپی کن");
    return false;
  }
}

const rail = document.getElementById("socials");
SOCIALS.forEach((s) => {
  const a = document.createElement("a");
  a.className = "slab";
  a.href = s.href;
  a.target = "_blank";
  a.rel = "noreferrer";
  a.innerHTML = `
    <span class="chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${s.icon}</svg></span>
    <span class="meta"><b>${s.label}</b><span dir="ltr">${s.handle}</span></span>
    <span class="actions">
      <button class="icon-btn" type="button" aria-label="کپی لینک ${s.label}">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
      </button>
      <svg class="ext" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 4h6v6M10 14 20 4M20 14v6H4V4h6"/></svg>
    </span>`;
  const btn = a.querySelector("button");
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    copyText(s.href);
  });
  a.addEventListener("pointermove", (e) => {
    const r = a.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    a.style.setProperty("--rx", `${(-y * 10).toFixed(2)}deg`);
    a.style.setProperty("--ry", `${(x * 14).toFixed(2)}deg`);
    a.style.setProperty("--tz", "22px");
  });
  a.addEventListener("pointerleave", () => {
    a.style.setProperty("--rx", "0deg");
    a.style.setProperty("--ry", "0deg");
    a.style.setProperty("--tz", "0px");
  });
  rail.appendChild(a);
});

document.querySelectorAll(".story-item .acc").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    const open = item.getAttribute("data-open") === "true";
    document.querySelectorAll(".story-item").forEach((el) => el.setAttribute("data-open", "false"));
    item.setAttribute("data-open", open ? "false" : "true");
  });
});

const scene = document.getElementById("scene");
window.addEventListener("pointermove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 6;
  const y = (e.clientY / window.innerHeight - 0.5) * -5;
  scene.style.setProperty("--tilt-x", y.toFixed(2));
  scene.style.setProperty("--tilt-y", x.toFixed(2));
});
window.addEventListener("pointerleave", () => {
  scene.style.setProperty("--tilt-x", "0");
  scene.style.setProperty("--tilt-y", "0");
});

const avatar = document.getElementById("avatarStage");
avatar.addEventListener("pointermove", (e) => {
  const r = avatar.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  avatar.style.setProperty("--ay", `${(x * 18).toFixed(1)}deg`);
  avatar.style.setProperty("--ax", `${(-y * 14).toFixed(1)}deg`);
});
avatar.addEventListener("pointerleave", () => {
  avatar.style.setProperty("--ax", "0deg");
  avatar.style.setProperty("--ay", "0deg");
});

const themeBtn = document.getElementById("themeBtn");
themeBtn.addEventListener("click", () => {
  const next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", next);
  try { localStorage.setItem("myk-theme", next); } catch (e) {}
  drawField();
});

const sheet = document.getElementById("sheet");
function openSheet() { sheet.classList.add("open"); }
function closeSheet() { sheet.classList.remove("open"); }
document.querySelectorAll("[data-open-sheet]").forEach((b) => b.addEventListener("click", openSheet));
document.getElementById("closeSheet").addEventListener("click", closeSheet);
sheet.addEventListener("click", (e) => { if (e.target === sheet) closeSheet(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeSheet(); });

document.getElementById("copyPhone").addEventListener("click", () => copyText(PROFILE.phone));
document.getElementById("vcardBtn").addEventListener("click", () => {
  const v = [
    "BEGIN:VCARD", "VERSION:3.0",
    `FN:${PROFILE.name}`, "N:کرمی;محمد یاسین;;;", "NICKNAME:MYK",
    `TEL;TYPE=CELL:${PROFILE.tel}`, `EMAIL:${PROFILE.email}`,
    `URL:${PROFILE.telegram}`, `URL:${PROFILE.github}`,
    "END:VCARD",
  ].join("\n");
  const blob = new Blob([v], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "MYK.vcf";
  a.click();
  URL.revokeObjectURL(url);
  toast("مخاطب آماده دانلود شد");
});

function composed(form) {
  const name = form.name.value.trim() || "مهمان";
  const contact = form.contact.value.trim() || "-";
  const body = form.body.value.trim();
  return `پیام از ${name}\nارتباط: ${contact}\n\n${body}`;
}

// ---------- Real SQL API (Vercel Postgres) ----------
async function saveToInbox(name, contact, body) {
  try {
    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, contact, body })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'خطا');
    return true;
  } catch (e) {
    console.warn('Inbox save failed', e);
    return false;
  }
}

const form = document.getElementById("msgForm");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (form.website.value) return;
  const body = form.body.value.trim();
  if (body.length < 4) { toast("اول متن پیام را بنویس"); return; }
  const name = form.name.value.trim() || "مهمان";
  const contact = form.contact.value.trim() || "-";

  // ذخیره در دیتابیس SQL
  const saved = await saveToInbox(name, contact, body);

  // باز کردن تلگرام
  const text = composed(form);
  const url = `https://t.me/share/url?url=${encodeURIComponent(PROFILE.telegram)}&text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");
  toast(saved ? "پیام ذخیره شد و به تلگرام منتقل شدی" : "به تلگرام منتقل شدی (ذخیره ناموفق)");
  form.body.value = "";
});

document.getElementById("mailBtn").addEventListener("click", async () => {
  const body = form.body.value.trim();
  if (body.length < 4) { toast("اول متن پیام را بنویس"); return; }
  const name = form.name.value.trim() || "مهمان";
  const contact = form.contact.value.trim() || "-";
  await saveToInbox(name, contact, body);
  const text = composed(form);
  window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent("پیام برای " + PROFILE.name)}&body=${encodeURIComponent(text)}`;
});

// دکمه ارسال مستقیم به دیتابیس
const directBtn = document.getElementById("directBtn");
if (directBtn) {
  directBtn.addEventListener("click", async () => {
    const body = form.body.value.trim();
    if (body.length < 4) { toast("اول متن پیام را بنویس"); return; }
    const name = form.name.value.trim() || "مهمان";
    const contact = form.contact.value.trim() || "-";

    directBtn.disabled = true;
    directBtn.textContent = "در حال ارسال...";
    const ok = await saveToInbox(name, contact, body);
    directBtn.disabled = false;
    directBtn.textContent = "ارسال پیام";

    if (ok) {
      toast("پیام با موفقیت در صندوق ذخیره شد ✓");
      form.reset();
    } else {
      toast("خطا در ذخیره پیام — دوباره تلاش کن");
    }
  });
}

function drawField() {
  const svg = document.getElementById("field");
  const w = window.innerWidth;
  const h = window.innerHeight;
  svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
  const theme = document.documentElement.getAttribute("data-theme");
  const c = theme === "light" ? "0,119,194" : "0,180,255";
  const nodes = [];
  const n = Math.min(42, Math.floor((w * h) / 28000) + 18);
  for (let i = 0; i < n; i++) {
    nodes.push({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.6 + 0.6 });
  }
  let lines = "";
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const d = Math.hypot(dx, dy);
      if (d < 160) {
        const o = (1 - d / 160) * 0.35;
        lines += `<line x1="${nodes[i].x.toFixed(1)}" y1="${nodes[i].y.toFixed(1)}" x2="${nodes[j].x.toFixed(1)}" y2="${nodes[j].y.toFixed(1)}" stroke="rgba(${c},${o.toFixed(3)})" stroke-width="1"/>`;
      }
    }
  }
  const dots = nodes.map((p) => `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${p.r}" fill="rgba(${c},0.7)"/>`).join("");
  svg.innerHTML = lines + dots;
}
drawField();
window.addEventListener("resize", drawField);
