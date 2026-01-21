document.addEventListener("DOMContentLoaded", function () {

  fetch("content.json")
    .then(response => response.json())
    .then(data => {

      /* =====================
         FAVICON
      ===================== */
      const favicon = document.getElementById("favicon");
      if (favicon && data.site?.favicon) {
        favicon.href = data.site.favicon;
      }

      /* =====================
         MENU
      ===================== */
      const menu = document.getElementById("menu");
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
      const presImg = document.getElementById("presentation-image");
      if (presImg && data.presentation?.image) {
        presImg.src = data.presentation.image;
      }

      const presTitre = document.getElementById("presentation-titre");
      if (presTitre && data.presentation?.titre) {
        presTitre.textContent = data.presentation.titre;
      }

      const presTexte = document.getElementById("presentation-texte");
      if (presTexte && data.presentation?.texte) {
        presTexte.textContent = data.presentation.texte;
      }

      /* =====================
         GALERIE (10 IMAGES)
      ===================== */
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
      const btnNext = document.getElementById("next");
      const btnPrev = document.getElementById("prev");

      if (track && btnNext && btnPrev) {

        let currentIndex = 0;
        let autoPlayInterval = null;
        const AUTOPLAY_DELAY = 4000;

        track.innerHTML = "";

        images.forEach((src, index) => {
          const img = document.createElement("img");
          img.src = src;
          img.alt = "Photo galerie";
          img.className = "gallery-image";
          if (index === 0) img.classList.add("active");
          track.appendChild(img);
        });

        const imgs = track.querySelectorAll(".gallery-image");

        function updateGallery() {
          imgs.forEach((img, index) => {
            img.classList.remove("active", "prev", "next");
            if (index === currentIndex) img.classList.add("active");
            else if (index === currentIndex - 1) img.classList.add("prev");
            else if (index === currentIndex + 1) img.classList.add("next");
          });
        }

        function startAutoplay() {
          stopAutoplay();
          autoPlayInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % imgs.length;
            updateGallery();
          }, AUTOPLAY_DELAY);
        }

        function stopAutoplay() {
          if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
          }
        }

        btnNext.addEventListener("click", () => {
          stopAutoplay();
          currentIndex = (currentIndex + 1) % imgs.length;
          updateGallery();
          startAutoplay();
        });

        btnPrev.addEventListener("click", () => {
          stopAutoplay();
          currentIndex = (currentIndex - 1 + imgs.length) % imgs.length;
          updateGallery();
          startAutoplay();
        });

        updateGallery();
        startAutoplay();
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
         MIELS
      ===================== */
      const mielsContainer = document.getElementById("miels-container");
      if (mielsContainer && Array.isArray(data.miels)) {
        mielsContainer.innerHTML = "";
        data.miels.forEach(miel => {
          const card = document.createElement("div");
          card.className = "card";

          const img = document.createElement("img");
          img.src = miel.imageMiel;
          img.alt = miel.nom;

          const h3 = document.createElement("h3");
          h3.textContent = miel.nom;

          const p = document.createElement("p");
          p.textContent = miel.description;

          card.append(img, h3, p);
          mielsContainer.appendChild(card);
        });
      }

      /* =====================
         RESEAUX SOCIAUX (SVG)
      ===================== */
      const social = document.getElementById("social-links");
      if (social && data.reseaux) {

        const icons = {
          googleMaps: '<svg viewBox="0 0 24 24"><path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7z"/></svg>',
          instagram: '<svg viewBox="0 0 24 24"><path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5z"/></svg>',
          facebook: '<svg viewBox="0 0 24 24"><path d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-3h2V9.5z"/></svg>',
          tiktok: '<svg viewBox="0 0 24 24"><path d="M16 2h3v3a8 8 0 01-8-8z"/></svg>'
        };

        social.innerHTML = "";

        Object.keys(data.reseaux).forEach(key => {
          if (!icons[key]) return;
          const a = document.createElement("a");
          a.href = data.reseaux[key];
          a.target = "_blank";
          a.innerHTML = icons[key];
          social.appendChild(a);
        });
      }

      /* =====================
         MENTIONS LEGALES
      ===================== */
      const legal = document.getElementById("legal-notice");
      if (legal && data.legal) {
        legal.textContent = data.legal;
      }

    })
    .catch(err => console.error("Erreur JSON :", err));
});
