function getFeedbackUsername(userId) {
    for (const user of model.users) {
        if (user.userId === userId) {
            return user.username;
        }
    }

    return "Ukjent bruker";
}

function markFeedbackRead(feedbackId) {
    for (const item of model.feedback) {
        if (item.feedbackId === feedbackId) {
            item.isRead = true;
        }
    }

    updateView();
}

function deleteFeedback(feedbackId) {
    if (!confirm("Er du sikker på at du vil slette tilbakemeldingen?")) return;

    model.feedback = model.feedback.filter((item) => item.feedbackId !== feedbackId);
    updateView();
}