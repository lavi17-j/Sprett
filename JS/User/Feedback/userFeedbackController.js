function submitFeedback() {
    const state = model.viewState.userFeedbackPage;
    const text = state.feedbackText.trim();

    if (text === "") {
        state.message = "Skriv en tilbakemelding før du sender inn.";
        updateView();
        return;
    }

    let newId = 0;
    for (const item of model.feedback) {
        if (item.feedbackId >= newId) {
            newId = item.feedbackId + 1;
        }
    }

    model.feedback.push({
        feedbackId: newId,
        userId: model.app.loggedInUserId,
        text: text,
        date: new Date().toISOString().slice(0,10),
        isRead: false,
    });

    state.feedbackText = "";
    state.message = "Takk for tilbakemeldingen!";
    updateView();
}