fetch("content.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {

    /* =====================
       FAVICON (JSON)
    ====================== */
    var favicon = document.getElementById("favicon");
    if (favicon && data.site && data.site.favicon) {
      favicon.href = data.site.favicon;
    }

    /* =====================
       LOGO + NOM DU SITE
    ====================== */
    var logo = document.getElementById("logo");
    if (logo && data.site && data.site.logo) {
      logo.src = data.site.logo;
    }

    var siteName = document.getElementById("site-nom");
    if (siteName && data.site && data.site.nom) {
      siteName.textContent = data.site.nom;
    }

    /* =====================
       MENU
    ====================== */
    var menu = document.getElementById("menu");
    if (menu && Array.isArray(data.menu)) {
      menu.innerHTML = "";
      data.menu.forEach(function (item) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = item.lien;
        a.textContent = item.nom;
        li.appendChild(a);
        menu.appendChild(li);
      });
    }

    /* =====================
       PRESENTATION
    ====================== */
    var presentationImage = document.getElementById("presentation-image");
    if (presentationImage && data.presentation && data.presentation.image) {
      presentationImage.src = data.presentation.image;
    }

    var presentationTitre = document.getElementById("presentation-titre");
    if (presentationTitre && data.presentation && data.presentation.titre) {
      presentationTitre.textContent = data.presentation.titre;
    }

    var presentationTexte = document.getElementById("presentation-texte");
    if (presentationTexte && data.presentation && data.presentation.texte) {
      presentationTexte.textContent = data.presentation.texte;
    }

    /* =====================
       GALERIE
    ====================== */
    const images = [
  "images/gallery1.jpg",
  "images/gallery2.jpg",
  "images/gallery3.jpg",
  "images/gallery4.jpg",
  "images/gallery5.jpg",
  "images/gallery6.jpg",
  "images/gallery7.jpg",
  "images/gallery8.jpg",
  "images/gallery9.jpg",
  "images/gallery10.jpg"
];

const track = document.getElementById("gallery-track");
let currentIndex = 0;

// Création des images
images.forEach((src, index) => {
  const img = document.createElement("img");
  img.src = src;
  img.classList.add("gallery-image");
  if (index === 0) img.classList.add("active");
  track.appendChild(img);
});

const imgs = document.querySelectorAll(".gallery-image");

function updateGallery() {
  imgs.forEach((img, index) => {
    img.classList.remove("active", "prev", "next");

    if (index === currentIndex) {
      img.classList.add("active");
    } else if (index === currentIndex - 1) {
      img.classList.add("prev");
    } else if (index === currentIndex + 1) {
      img.classList.add("next");
    }
  });
}

document.getElementById("next").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % imgs.length;
  updateGallery();
});

document.getElementById("prev").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + imgs.length) % imgs.length;
  updateGallery();
});

updateGallery();

    /* =====================
       ELEVAGE
    ====================== */
    var elevageTexte = document.getElementById("elevage-texte");
    if (elevageTexte && data.elevage && data.elevage.texte) {
      elevageTexte.textContent = data.elevage.texte;
    }

    var elevagePrix = document.getElementById("elevage-prix");
    if (elevagePrix && data.elevage && data.elevage.prix) {
      elevagePrix.textContent = data.elevage.prix;
    }

    var elevagePhotos = document.getElementById("elevage-photos");
    if (
      elevagePhotos &&
      data.elevage &&
      Array.isArray(data.elevage.photos)
    ) {
      elevagePhotos.innerHTML = "";
      data.elevage.photos.forEach(function (src) {
        var img = document.createElement("img");
        img.src = src;
        img.alt = "Photo élevage";
        elevagePhotos.appendChild(img);
      });
    }

    /* =====================
       MIEL
    ====================== */
    var mielsContainer = document.getElementById("miels-container");
    if (mielsContainer && Array.isArray(data.miels)) {
      mielsContainer.innerHTML = "";
      data.miels.forEach(function (miel) {
        var card = document.createElement("div");
        card.className = "card";

        var imagesWrapper = document.createElement("div");
        imagesWrapper.className = "miel-images";

        var imgMiel = document.createElement("img");
        imgMiel.src = miel.imageMiel;
        imgMiel.alt = "Pot de " + miel.nom;

        var imgFleur = document.createElement("img");
        imgFleur.src = miel.imageFleur;
        imgFleur.alt = "Fleur associée au " + miel.nom;

        imagesWrapper.appendChild(imgMiel);
        imagesWrapper.appendChild(imgFleur);

        var h3 = document.createElement("h3");
        h3.textContent = miel.nom;

        var p = document.createElement("p");
        p.textContent = miel.description;

        card.appendChild(imagesWrapper);
        card.appendChild(h3);
        card.appendChild(p);

        mielsContainer.appendChild(card);
      });
    }

    /* =====================
       RESEAUX SOCIAUX
    ====================== */
    var socialContainer = document.getElementById("social-links");
    if (socialContainer && data.reseaux) {
      var icons = {
        googleMaps: '<svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>',
        instagram: '<svg viewBox="0 0 24 24"><path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5z"/></svg>',
        facebook: '<svg viewBox="0 0 24 24"><path d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-3h2V9.5z"/></svg>',
        tiktok: '<svg viewBox="0 0 24 24"><path d="M16 2h3v3a8 8 0 01-8-8z"/></svg>'
      };

      Object.keys(data.reseaux).forEach(function (key) {
        if (!data.reseaux[key] || !icons[key]) return;
        var a = document.createElement("a");
        a.href = data.reseaux[key];
        a.target = "_blank";
        a.innerHTML = icons[key];
        socialContainer.appendChild(a);
      });
    }

    /* =====================
       MENTIONS LEGALES
    ====================== */
    var legalNotice = document.getElementById("legal-notice");
    if (legalNotice && data.legal) {
      legalNotice.textContent = data.legal;
    }

  })
  .catch(function (error) {
    console.error("Erreur chargement JSON :", error);
  });
