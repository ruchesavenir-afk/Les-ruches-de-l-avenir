fetch("content.json")
.then(res => res.json())
.then(data => {

  document.querySelectorAll("[data-site-nom]")
    .forEach(el => el.textContent = data.site.nom);

  document.querySelector("[data-presentation-titre]").textContent =
    data.presentation.titre;

  document.querySelector("[data-presentation-texte]").textContent =
    data.presentation.texte;

  // Miels
  const container = document.querySelector("[data-miels]");
  if (container) {
    data.miels.forEach(miel => {
      container.innerHTML += `
        <article class="card">
          <img src="${miel.imageMiel}" alt="${miel.nom}">
          <img src="${miel.imageFleur}" alt="Fleur ${miel.nom}">
          <h3>${miel.nom}</h3>
          <p>${miel.description}</p>
        </article>`;
    });
  }

  // Contact
  if (document.querySelector("[data-telephone]")) {
    document.querySelector("[data-telephone]").textContent = data.site.telephone;
    document.querySelector("[data-email]").textContent = data.site.email;
  }
});
