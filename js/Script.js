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
