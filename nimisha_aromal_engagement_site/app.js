const defaultConfig = {
  bride: "Nimisha Chungappally",
  groom: "Aromal Shaju",
  tagline: "Two Hearts, One Beautiful Beginning",
  dateDisplay: "5 July 2026",
  targetDateISO: "2026-07-05T10:30:00+05:30",
  muhurtham: "04:30 PM to 05:30 PM",
  venue: "Idam Retreat, Malappuram, Kerala, India",
  mapLink: "https://maps.app.goo.gl/XEyS1gafL1X7t8Pw7",
  whatsappNumber: "96892203182",
  adminEmail: "jithscorpion@gmail.com",
  brideFamily: "Chungappally Family",
  groomFamily: "Shaju Family",
  storyText: "With blessings from both families, Nimisha and Aromal begin a beautiful new chapter together.",
  familyMessage: "Together with their families, we invite you to join us for a day filled with love, blessings and celebration."
};

let cfg = JSON.parse(localStorage.getItem("engagementConfig") || "null") || defaultConfig;

function setText(id, value){ const el = document.getElementById(id); if(el) el.textContent = value; }

function firstName(full){ return (full || "").split(" ")[0]; }

function applyConfig(){
  setText("brideName", firstName(cfg.bride));
  setText("groomName", firstName(cfg.groom));
  setText("tagline", cfg.tagline);
  setText("dateDisplay", cfg.dateDisplay);
  setText("eventDate", cfg.dateDisplay);
  setText("muhurtham", cfg.muhurtham);
  setText("venue", cfg.venue);
  setText("brideFamily", cfg.brideFamily);
  setText("groomFamily", cfg.groomFamily);
  setText("storyText", cfg.storyText);
  setText("familyMessage", cfg.familyMessage);
  const map = document.getElementById("mapLink");
  if(map) map.href = cfg.mapLink;
  const floatWa = document.getElementById("floatWhatsapp");
  if(floatWa) floatWa.href = `https://wa.me/${cfg.whatsappNumber}?text=${encodeURIComponent("Hello, I would like to confirm my presence for Nimisha & Aromal's engagement.")}`;
}
applyConfig();

window.addEventListener("load", () => {
  setTimeout(() => document.getElementById("loader")?.classList.add("hide"), 650);
});

function countdown(){
  const target = new Date(cfg.targetDateISO).getTime();
  const now = Date.now();
  const diff = Math.max(target - now, 0);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  setText("days", String(d).padStart(2,"0"));
  setText("hours", String(h).padStart(2,"0"));
  setText("minutes", String(m).padStart(2,"0"));
  setText("seconds", String(s).padStart(2,"0"));
}
countdown(); setInterval(countdown, 1000);

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add("visible"); });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

let lang = "en";
document.getElementById("langToggle")?.addEventListener("click", () => {
  lang = lang === "en" ? "ml" : "en";
  document.querySelectorAll("[data-en]").forEach(el => {
    el.textContent = el.dataset[lang];
  });
  document.getElementById("langToggle").textContent = lang === "en" ? "മലയാളം" : "English";
});

document.getElementById("musicToggle")?.addEventListener("click", async () => {
  const audio = document.getElementById("bgMusic");
  const btn = document.getElementById("musicToggle");
  if(!audio.src || audio.src.endsWith("/")) {
    alert("Add a licensed MP3 file inside assets/music.mp3 and set it in the audio source.");
    return;
  }
  if(audio.paused){ await audio.play(); btn.textContent = "Ⅱ"; } else { audio.pause(); btn.textContent = "♪"; }
});

document.getElementById("weatherBtn")?.addEventListener("click", () => {
  const note = document.getElementById("weatherNote");
  note.textContent = "For Malappuram in July, keep a rain-friendly backup plan. Live weather can be enabled by adding an OpenWeather API key.";
});

const quotes = [
  "May this beginning be wrapped in love, laughter and blessings.",
  "A promise begins softly, then becomes a lifetime of togetherness.",
  "Under Kerala skies, two hearts step into a beautiful forever.",
  "Blessed by family, held by love, and written by destiny.",
  "A golden beginning for Nimisha and Aromal."
];
document.getElementById("quoteBtn")?.addEventListener("click", () => {
  const q = quotes[Math.floor(Math.random()*quotes.length)];
  setText("quoteText", `“${q}”`);
});

document.getElementById("rsvpForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  const msg = `RSVP Confirmation%0AName: ${data.name}%0APhone: ${data.phone}%0AAttendees: ${data.attendees}%0AMeal: ${data.meal}%0AMessage: ${data.message || "-"}`;
  window.open(`https://wa.me/${cfg.whatsappNumber}?text=${msg}`, "_blank");
});

document.getElementById("photoUpload")?.addEventListener("change", (e) => {
  [...e.target.files].forEach(file => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = document.createElement("img");
      img.src = reader.result;
      img.alt = "Uploaded gallery photo";
      document.getElementById("photoGrid").prepend(img);
    };
    reader.readAsDataURL(file);
  });
});

document.getElementById("downloadPdf")?.addEventListener("click", () => window.print());

const params = new URLSearchParams(location.search);
const guest = params.get("guest");
if(guest){
  const greeting = document.getElementById("guestGreeting");
  greeting.textContent = `Welcome ${guest}, your presence will make this celebration more special.`;
}

if("serviceWorker" in navigator){
  navigator.serviceWorker.register("service-worker.js").catch(()=>{});
}
