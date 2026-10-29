function visArrangementDetaljer(arrangementId) {
  model.app.valgtArrangementId = arrangementId;
  model.app.currentPage = "eventDetailsPage";
  updateView();
}

function tegnArrangementDetaljerSide() {
  const arrangement = model.events.find(
    (element) => String(element.id) === String(model.app.valgtArrangementId),
  );

  if (!arrangement || arrangement.isArchived) {
    return drawUserShell(/*HTML*/ `
      <section class="info-box">
        <h3>Arrangementer</h3>
        <p>Arrangementet finnes ikke lenger.</p>
        <button class="wide-button" onclick="navigateTo('loggedInPage')">
          Tilbake til Hjem
        </button>
      </section>
    `);
  }

  const erPameldt =
    arrangement.signups &&
    arrangement.signups.some(
      (pamelding) => pamelding.userId === model.app.loggedInUserId,
    );
  const pameldteAntall = arrangement.signups
    ? arrangement.signups.length
    : 0;
  const innhold = /*HTML*/ `
    <section class="info-box">
      <h3>Arrangementer</h3>
      <div class="reservation-row">
        <strong>${unnslippBookingHtml(arrangement.title || "Et arrangement")}</strong>
        <h4>Detaljer om arrangementet</h4>
        <span>Dato: ${unnslippBookingHtml(formatDate(arrangement.startDate))}</span>
        <span>Tid: ${unnslippBookingHtml(arrangement.startTime || "Ikke oppgitt")} - ${unnslippBookingHtml(arrangement.endTime || "Ikke oppgitt")}</span>
        ${
          arrangement.description
            ? `<span>${unnslippBookingHtml(arrangement.description)}</span>`
            : "<span>Ingen flere detaljer er lagt til.</span>"
        }
        <span>Påmeldte: ${pameldteAntall} / ${arrangement.maxParticipants || "Ubegrenset"}</span>
      </div>
      <button
        class="wide-button"
        style="margin: 8px 0 0 0; width: 100%;"
        onclick="toggleEventSignup('${arrangement.id}')"
      >
        ${erPameldt ? "Meld deg av" : "Meld deg på"}
      </button>
      <button
        class="wide-button"
        style="margin: 8px 0 0 0; width: 100%;"
        onclick="navigateTo('loggedInPage')"
      >
        Tilbake til Hjem
      </button>
    </section>
  `;

  return drawUserShell(innhold);
}
