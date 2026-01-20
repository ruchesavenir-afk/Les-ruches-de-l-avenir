fetch("content.json")
  .then(response => response.json())
  .then(data => {

    /* =====================
       LOGO + NOM DU SITE
    ====================== */
    const logo = document.getElementById("site-logo");
    if (logo && data.site?.logo) {
      logo.src = data.site.logo;
    }

    const siteName = document.getElementById("site-name");
    if (siteName && data.site?.nom) {
      siteName.textContent = data.site.nom;
    }

    /* =====================
       MENU
    ====================== */
    const menu = document.getElementById("menu-items");
    if (menu && Array.isArray(data.menu)) {
      menu.innerHTML = "";
      data.menu.forEach(item => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = item.lien;
        a.textContent = item.nom;
        li.appendChild(a);
        menu.appendChild(li);
      });
    }

    /* =====================
       PRESENTATION
    ====================== */
    const

    /* =====================
   ELEVAGE
===================== */
const elevageTexte = document.getElementById("elevage-texte");
if (elevageTexte && data.elevage?.texte) {
  elevageTexte.textContent = data.elevage.texte;
}

const elevagePrix = document.getElementById("elevage-prix");
if (elevagePrix && data.elevage?.prix) {
  elevagePrix.textContent = data.elevage.prix;
}

const elevagePhotos = document.getElementById("elevage-photos");
if (elevagePhotos && Array.isArray(data.elevage?.photos)) {
  elevagePhotos.innerHTML = "";
  data.elevage.photos.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Photo élevage";
    elevagePhotos.appendChild(img);
  });
}

        /* =====================
   MIEL
===================== */
const mielsContainer = document.getElementById("miels-container");

if (mielsContainer && Array.isArray(data.miels)) {
  mielsContainer.innerHTML = "";

  data.miels.forEach(miel => {
    const card = document.createElement("div");
    card.classList.add("card");

    const imgMiel = document.createElement("img");
    imgMiel.src = miel.imageMiel;
    imgMiel.alt = miel.nom;

    const h3 = document.createElement("h3");
    h3.textContent = miel.nom;

    const p = document.createElement("p");
    p.textContent = miel.description;

    card.appendChild(imgMiel);
    card.appendChild(h3);
    card.appendChild(p);

    mielsContainer.appendChild(card);
  });
}
/* =====================
   RESEAUX SOCIAUX
===================== */
const socialContainer = document.getElementById("social-links");

if (socialContainer && data.reseaux) {
  const icons = {
    googleMaps: "📍",
    instagram: "📸",
    facebook: "📘",
    tiktok: "🎵"
  };

  Object.entries(data.reseaux).forEach(([key, url]) => {
    if (!url) return;

    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.title = key;

    a.textContent = icons[key] || "🔗";

    socialContainer.appendChild(a);
  });
}
