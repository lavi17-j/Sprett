function getSignUpEvent() {
    const state = model.viewState.adminSignUpsPage;

    if (state.selectedEventId === null) return null;

    for (const event of model.events) {
        if (event.id === state.selectedEventId) {
            return event;
        }
    }
    return null;
}

function getSignUpUsername(userId) {
    for (const user of model.users) {
        if (user.userId === userId) {
            return user.username;
        }
    }

    return "Ukjent bruker";
}

function approveSignUp(eventId, userId) {
    setSignUpApproved(eventId, userId, true);
}

function rejectSignUp(eventId, userId) {
    const confirmed = confirm("Er du sikker på at du vil avslå påmeldingen?");
    if (!confirmed) return;

    setSignUpApproved(eventId, userId, false);

}

function setSignUpApproved(eventId, userId, approved) {
    for (const event of model.events) {
        if (event.id !== eventId) continue;

        for (const signup of event.signups) {
            if (signup.userId === userId) {
                signup.approved = approved;
            }
        }
    }

    model.viewState.adminSignUpsPage.selectedEventId = eventId;
    updateView();
}

function startEditSignUpEvent(eventId) {
    const pageState = model.viewState.adminSignUpsPage;

    for (const event of model.events) {
        if (event.id !== eventId) continue;

        pageState.eventID = event.id;
        pageState.title = event.title;
        pageState.description = event.description;
        pageState.startDate = event.startDate;
        pageState.endDate = event.endDate;
        pageState.startTime = event.startTime;
        pageState.endTime = event.endTime;
        pageState.maxParticipants = event.maxParticipants;
    }
    
    navigateTo("addEvent");
}

function cancelEvent(eventId) {
    const confirmed = confirm("Er du sikker på at du vil avlyse arrangementet?");
    if (!confirmed) return;

    for (const event of model.events) {
        if (event.id === eventId) {
            event.isArchived = true;
        }
    }

    for (const day of model.calender) {
        day.eventIds = day.eventIds.filter((id) => id !== eventId);
    }

    model.viewState.adminSignUpsPage.selectedEventId = null;
    updateView();
}

function selectSignUpEvent(eventId) {
    model.viewState.adminSignUpsPage.selectedEventId = eventId;
    updateView();
}