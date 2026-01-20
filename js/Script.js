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
===================== */
const presentationImage = document.getElementById("presentation-image");
if (presentationImage && data.presentation?.image) {
  presentationImage.src = data.presentation.image;
}

const presentationTitre = document.getElementById("presentation-titre");
if (presentationTitre && data.presentation?.titre) {
  presentationTitre.textContent = data.presentation.titre;
}

const presentationTexte = document.getElementById("presentation-texte");
if (presentationTexte && data.presentation?.texte) {
  presentationTexte.textContent = data.presentation.texte;
}


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

    // Conteneur images
    const imagesWrapper = document.createElement("div");
    imagesWrapper.classList.add("miel-images");

    const imgMiel = document.createElement("img");
    imgMiel.src = miel.imageMiel;
    imgMiel.alt = `Pot de ${miel.nom}`;
    imgMiel.loading = "lazy";

    const imgFleur = document.createElement("img");
    imgFleur.src = miel.imageFleur;
    imgFleur.alt = `Fleur associée au ${miel.nom}`;
    imgFleur.loading = "lazy";

    imagesWrapper.appendChild(imgMiel);
    imagesWrapper.appendChild(imgFleur);

    const h3 = document.createElement("h3");
    h3.textContent = miel.nom;

    const p = document.createElement("p");
    p.textContent = miel.description;

    card.appendChild(imagesWrapper);
    card.appendChild(h3);
    card.appendChild(p);

    mielsContainer.appendChild(card);
  });
}

/* =====================
   RESEAUX SOCIAUX (SVG)
===================== */
const socialContainer = document.getElementById("social-links");

if (socialContainer && data.reseaux) {
  const icons = {
    googleMaps: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
      </svg>
    `,
    instagram: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 5a5 5 0 100 10 5 5 0 000-10zm6.5-.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
      </svg>
    `,
    facebook: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-3h2V9.5c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V11h2.3l-.4 3h-1.9v7A10 10 0 0022 12z"/>
      </svg>
    `,
    tiktok: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M16 2h3a5 5 0 005 5v3a8 8 0 01-8-8v10a6 6 0 11-6-6c.7 0 1.3.1 2 .3v3.2a3 3 0 10-2 2.9V2z"/>
      </svg>
    `
  };

  Object.entries(data.reseaux).forEach(([key, url]) => {
    if (!url || !icons[key]) return;

    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.innerHTML = icons[key];
    a.setAttribute("aria-label", key);

    socialContainer.appendChild(a);
  });
}
