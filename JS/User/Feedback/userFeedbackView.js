function drawUserFeedbackPage() {
    const state = model.viewState.userFeedbackPage;

    const content = /*HTML*/ `
        <section class="info-box">
            <h3>Forslagskasse</h3>
            <p>Har du  forslag eller tilbakemeldinger til oss? Skriv dem her.</p>
            <textarea
                class="feedback-input"
                placeholder="Skriv tilbakemeldingen din her..."
                oninput="model.viewState.userFeedbackPage.feedbackText = this.value"
            >${state.feedbackText}</textarea>
            <button class="wide-button" onclick="submitFeedback()">Send inn</button>
            <p>${state.message}</p>
        </section>
    `;

    return drawUserShell(content);
}
