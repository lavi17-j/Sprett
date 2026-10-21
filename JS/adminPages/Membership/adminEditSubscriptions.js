function drawAdminEditSubscriptions() {
  const editSubscriptionsContent = /*HTML*/ `
    <div class="adminCard" style="width: 100%;">
      <h2>Endre Abonnementstyper</h2>
      
      <button onclick="createMembershipType()" style="margin-bottom: 20px;">Legg til abonnementstype</button>

      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
        ${drawExistingMembershipTypes()}
      </div>
    </div>
  `;
  return drawAdminShell(editSubscriptionsContent);
}

function createMembershipType() {}

function drawExistingMembershipTypes() {
  let html = "";
  const editingId = model.viewState.adminChangeMembershipsPage.editingId;

  if (model.memberships.length === 0) {
    return "<p>Ingen abonnementer funnet.</p>";
  }

  for (let i = 0; i < model.memberships.length; i++) {
    const membership = model.memberships[i];
    const isEditing = editingId === membership.id;

    html += /*HTML*/ `
      <div class="membershipCard" style="border: 1px solid #ddd; padding: 15px; border-radius: 6px; background: #fff; display: flex; flex-direction: column; gap: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
        <div>
          <label style="font-size: 0.85rem; font-weight: bold;">Navn:</label>
          <input type="text" id="membershipName_${membership.id}" value="${membership.name}" ${isEditing ? "" : "disabled"} style="width: 100%; padding: 6px;">
        </div>
        <div>
          <label style="font-size: 0.85rem; font-weight: bold;">Pris (kr):</label>
          <input type="number" id="membershipPrice_${membership.id}" value="${membership.price}" ${isEditing ? "" : "disabled"} style="width: 100%; padding: 6px;">
        </div>
        <div>
          <label style="font-size: 0.85rem; font-weight: bold;">
            <input type="checkbox" id="membershipBooking_${membership.id}" ${membership.bookingAllowed ? "checked" : ""} ${isEditing ? "" : "disabled"}> Kan booke
          </label>
        </div>
        
        <div style="display: flex; gap: 5px; margin-top: auto; padding-top: 10px; border-top: 1px solid #eee;">
          ${
            isEditing
              ? `<button onclick="saveMembership(${membership.id})" style="flex: 1; padding: 6px; background: #4CAF50; color: white; cursor: pointer;">Lagre</button>`
              : `<button onclick="startEditMembership(${membership.id})" style="flex: 1; padding: 6px; cursor: pointer;">Rediger</button>`
          }
          <button onclick="deleteMembership(${membership.id})" style="flex: 1; padding: 6px; background: #be0000; color: white; cursor: pointer;">Slett</button>
        </div>
      </div>
    `;
  }
  return html;
}

function startEditMembership(id) {
  model.viewState.adminChangeMembershipsPage.editingId = id;
  updateView();
}

function saveMembership(id) {
  const nameInput = document.getElementById(`membershipName_${id}`).value;
  const priceInput = Number(
    document.getElementById(`membershipPrice_${id}`).value,
  );
  const bookingInput = document.getElementById(
    `membershipBooking_${id}`,
  ).checked;

  const membership = model.memberships.find((m) => m.id === id);
  if (membership) {
    membership.name = nameInput;
    membership.price = priceInput;
    membership.bookingAllowed = bookingInput;
  }

  model.viewState.adminChangeMembershipsPage.editingId = null;
  updateView();
}

function deleteMembership(id) {
  const index = model.memberships.findIndex((m) => m.id === id);
  if (index !== -1) {
    model.memberships.splice(index, 1);
  }

  // Denne er nok ikke nok til å faktisk løse alle de potensielle problemene, men man kan gjøre en dypere dive inn i hvordan dette burde løses senere
  for (let i = 0; i < model.users.length; i++) {
    if (model.users[i].membershipType === id) {
      model.users[i].membershipType = null;
    }
  }

  updateView();
}