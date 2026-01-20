fetch("content.json")
.then(res => res.json())
.then(data => {


/* ===== En-tête ===== */
const logo = document.getElementById("site-logo");
if (logo && data.site.logo) logo.src = data.site.logo;


const siteName = document.getElementById("site-name");
if (siteName) siteName.textContent = data.site.nom;


const menu = document.getElementById("menu-items");
if (menu && data.menu) {
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


/* ===== Présentation ===== */
const presImg = document.getElementById("presentation-image");
if (presImg && data.presentation.image) presImg.src = data.presentation.image;


const presTitle = document.getElementById("presentation-title");
if (presTitle) presTitle.textContent = data.presentation.titre;


const presDesc = document.getElementById("presentation-description");
if (presDesc) presDesc.textContent = data.presentation.texte;


/* ===== Galerie ===== */
const galleryTitle = document.getElementById("gallery-title");
if (galleryTitle) galleryTitle.textContent = data.galerie.titre;


const galleryContainer = document.getElementById("gallery-container");
if (galleryContainer && data.galerie.images) {
galleryContainer.innerHTML = "";
data.galerie.images.forEach(imgSrc => {
const img = document.createElement("img");
img.src = imgSrc;
img.alt = "Photo galerie";
img.classList.add("gallery-image");
galleryContainer.appendChild(img);
});
}


/* ===== Mentions légales ===== */
const legal = document.getElementById("legal-notice");
if (legal) legal.textContent = data.mentions_legales;


})
.catch(err => console.error("Erreur chargement contenu :", err));

    // Miels
    const mielsContainer = document.querySelector("[data-miels]");
    if (mielsContainer) {
      data.miels.forEach(miel => {
        mielsContainer.innerHTML += `
          <article class="card reveal">
            <img src="${miel.imageMiel}" alt="${miel.nom}">
            <img src="${miel.imageFleur}" alt="Fleur ${miel.nom}">
            <h3>${miel.nom}</h3>
            <p>${miel.description}</p>
          </article>
        `;
      });
    }

    // Elevage
    const elevageContainer = document.querySelector("[data-elevage-photos]");
    if (elevageContainer) {
      data.elevage.photos.forEach(photo => {
        elevageContainer.innerHTML += `
          <img src="${photo}" class="reveal" alt="Élevage d’abeilles">
        `;
      });
    }

    if (document.querySelector("[data-elevage-texte]")) {
      document.querySelector("[data-elevage-texte]").textContent =
        data.elevage.texte;
    }

    // Contact
    if (document.querySelector("[data-telephone]")) {
      document.querySelector("[data-telephone]").textContent = data.site.telephone;
      document.querySelector("[data-email]").textContent = data.site.email;
    }
  });
