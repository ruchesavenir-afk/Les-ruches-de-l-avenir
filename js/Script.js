fetch("content.json")
  .then(res => res.json())
  .then(data => {

    document.querySelectorAll("[data-site-nom]")
      .forEach(el => el.textContent = data.site.nom);

    if (document.querySelector("[data-presentation-titre]")) {
      document.querySelector("[data-presentation-titre]").textContent =
        data.presentation.titre;

      document.querySelector("[data-presentation-texte]").textContent =
        data.presentation.texte;
    }

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
