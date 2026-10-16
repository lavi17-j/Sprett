const model = {
  // 1. App-tilstand og global navigasjon
  app: {
    currentPage: "home", // Hvilken "side" som vises (f.eks. 'home', 'booking', 'profile', 'admin')
    loggedInUserId: 1, // ID til innlogget bruker (null hvis ikke innlogget)
  },

  // 2. Midlertidig lagring, skjemaer og UI-tilstand (viewState)
  viewState: {
    // Skjema for innlogging
    login: {
      email: "",
      password: "",
      errorMessage: "",
    },

    // Skjema for å registrere nytt medlem
    registerMember: {
      name: "",
      email: "",
      phone: "",
      membershipTypeId: null,
    },

    // Midlertidig tilstand for booking-siden
    booking: {
      selectedDate: "2026-10-16",
      selectedRoomId: null,
      selectedEquipmentId: null,
      activeTab: "equipment", // f.eks. 'equipment' eller 'classes'
    },

    // Midlertidig tilstand for admin-redigering av utstyr
    adminEquipmentEdit: {
      isEditing: false,
      equipmentId: null,
      name: "",
      roomId: null,
      status: "",
    },
  },

  // 3. Permanente domenedata (relatert med ID-er)
  data: {
    users: [
      { id: 1, name: "Lars Vetle", email: "lars@sprett.no", role: "member" },
      { id: 2, name: "Kari Nordmann", email: "kari@sprett.no", role: "admin" },
    ],

    memberships: [
      { id: 1, name: "Standard Medlemskap", price: 499 },
      { id: 2, name: "Premium Medlemskap", price: 699 },
    ],

    rooms: [
      { id: 1, name: "Sal 1 (Styrke)", capacity: 20 },
      { id: 2, name: "Sal 2 (Kondisjon & Sal)", capacity: 15 },
    ],

    equipment: [
      { id: 1, name: "Knebøystativ A", roomId: 1, status: "Tilgjengelig" },
      { id: 2, name: "Tredemølle 1", roomId: 2, status: "I bruk" },
    ],

    equipmentBookings: [
      { id: 1, userId: 1, equipmentId: 1, date: "2026-10-16", time: "10:00" },
    ],

    bulletins: [
      {
        id: 1,
        title: "Nytt utstyr på plass!",
        content: "Vi har fått nye manualer i Sal 1.",
        date: "2026-10-15",
      },
    ],

    calendar: [
      {
        id: 1,
        title: "Styrketrening med instruktør",
        roomId: 1,
        date: "2026-10-17",
        time: "18:00",
      },
    ],
  },
};
