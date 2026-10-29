function tegnBookeUtstyrSide() {
  const tilstand = model.viewState.bookingPage;
  const kategorier = model.equipmentCategories
    .map(
      (kategori) => /*HTML*/ `
        <option value="${kategori.id}" ${
          String(tilstand.setFilter.filter) === String(kategori.id) ? "selected" : ""
        }>
          ${unnslippUtstyrHtml(kategori.name)}
        </option>
      `,
    )
    .join("");

  const innhold = /*HTML*/ `
    <section class="info-box">
      <h3>Book Utstyr</h3>
      <label style="display: flex; flex-direction: column; gap: 6px;">
        Søk etter utstyr
        <input
          type="search"
          placeholder="Skriv inn navn på utstyr"
          value="${unnslippUtstyrHtml(tilstand.searchForm.input || "")}"
          oninput="model.viewState.bookingPage.searchForm.input = this.value"
        >
      </label>

      <label style="display: flex; flex-direction: column; gap: 6px; margin-top: 12px;">
        Sett filter
        <select onchange="model.viewState.bookingPage.setFilter.filter = this.value; updateView()">
          <option value="" ${
            tilstand.setFilter.filter === null || tilstand.setFilter.filter === ""
              ? "selected"
              : ""
          }>Alle typer</option>
          ${kategorier}
        </select>
      </label>

      <button class="wide-button" style="margin: 12px 0 0 0; width: 100%;" onclick="updateView()">
        Søk
      </button>
    </section>

    <section class="info-box">
      <h3>Utstyr</h3>
      ${lagUtstyrsSokeresultaterHtml()}
    </section>
  `;

  return drawUserShell(innhold);
}

function lagUtstyrsSokeresultaterHtml() {
  const tilstand = model.viewState.bookingPage;
  const soketekst = (tilstand.searchForm.input || "").trim().toLowerCase();
  const kategorifilter = tilstand.setFilter.filter;
  const utstyr = model.equipment.filter((element) => {
    const passerSok = element.name.toLowerCase().includes(soketekst);
    const passerKategori =
      kategorifilter === null ||
      kategorifilter === "" ||
      element.category.some(
        (kategoriId) => String(kategoriId) === String(kategorifilter),
      );
    return passerSok && passerKategori;
  });

  if (utstyr.length === 0) {
    return "<p>Fant ikke utstyr som passer søket eller filteret.</p>";
  }

  const gruppertUtstyr = new Map();
  for (const element of utstyr) {
    const kategoriId = element.category.length > 0 ? element.category[0] : null;
    const kategori = model.equipmentCategories.find(
      (oppforing) => oppforing.id === kategoriId,
    );
    const gruppenavn = kategori ? kategori.name : "Annet utstyr";
    if (!gruppertUtstyr.has(gruppenavn)) {
      gruppertUtstyr.set(gruppenavn, []);
    }
    gruppertUtstyr.get(gruppenavn).push(element);
  }

  let html = "";
  for (const [kategorinavn, elementer] of gruppertUtstyr) {
    const tilgjengeligeAntall = elementer.filter(erUtstyrTilgjengeligIDag).length;
    html += /*HTML*/ `
      <div style="border: 2px solid #000000; border-radius: 10px; padding: 12px; margin-bottom: 10px;">
        <h4 style="margin: 0 0 8px 0;">${unnslippUtstyrHtml(kategorinavn)}</h4>
        <p style="margin: 0 0 8px 0;">Antall tilgjengelige: ${tilgjengeligeAntall}</p>
        ${elementer
          .map((element) => {
            const status = !element.reservable
              ? "Kan ikke reserveres"
              : erUtstyrTilgjengeligIDag(element)
                ? "Tilgjengelig"
                : "Allerede booket i dag";
            return `<p style="margin: 4px 0;">${unnslippUtstyrHtml(element.name)} - ${status}</p>`;
          })
          .join("")}
      </div>
    `;
  }

  return html;
}

function erUtstyrTilgjengeligIDag(element) {
  if (!element.reservable) return false;

  const dagensDato = new Date();
  const dagensDatoTekst = [
    dagensDato.getFullYear(),
    String(dagensDato.getMonth() + 1).padStart(2, "0"),
    String(dagensDato.getDate()).padStart(2, "0"),
  ].join("-");

  return !model.equipmentBookings.some(
    (bestilling) =>
      bestilling.equipmentId === element.id &&
      bestilling.date === dagensDatoTekst &&
      bestilling.approved !== false,
  );
}

function unnslippUtstyrHtml(verdi) {
  return String(verdi ?? "").replace(/[&<>"']/g, (tegn) => {
    const htmlEntiteter = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return htmlEntiteter[tegn];
  });
}
