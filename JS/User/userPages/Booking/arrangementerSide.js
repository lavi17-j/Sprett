function tegnArrangementerSide() {
  const arrangementer = model.events.filter(
    (arrangement) => !arrangement.isArchived,
  );
  const arrangementerHtml =
    arrangementer.length === 0
      ? "<p>Ingen arrangementer er lagt ut.</p>"
      : arrangementer
          .map(
            (arrangement) => /*HTML*/ `
              <button
                class="reservation-row"
                style="width: 100%; text-align: left; cursor: pointer; background: #ffffff;"
                onclick="visArrangementDetaljer('${arrangement.id}')"
              >
                <strong>${unnslippBookingHtml(arrangement.title || "Arrangement")}</strong>
                <span>Dato: ${unnslippBookingHtml(formatDate(arrangement.startDate))}</span>
                <span>Tid: ${unnslippBookingHtml(arrangement.startTime || "Ikke oppgitt")}</span>
                <span style="font-weight: bold; margin-top: 6px;">Meld deg på</span>
              </button>
            `,
          )
          .join("");

  return drawUserShell(/*HTML*/ `
    <section class="info-box">
      <h3>Arrangementer</h3>
      ${arrangementerHtml}
    </section>
  `);
}
