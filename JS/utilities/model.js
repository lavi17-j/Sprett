const model = {
  app: {
    currentPage: "startPage",
    loggedInUserId: null,
  },

  viewState: {
    activeTab: "home", //booking, oppslag, profil, butikk, om oss,

    loginPage: {
      loginForm: {
        username: "",
        password: "",
        errorMessage: "",
      },

      recoverPasswordForm: {
        username: "",
      },

      newUserForm: {
        name: "",
        phone: "",
        mail: "",
        password: "",
        repeatPassword: "",
        address: "",
        postcode: "",
        paymentMethod: null,
      },
    },

    bookingPage: {
      registerBookingForm: {
        input: null,
      },
      searchForm: {
        input: "",
      },

      setFilter: {
        filter: null,
      },

      bookingDate: {
        input: null,
      },
    },

    profilePage: {
      phone: "",
      mail: "",
      password: "",
      repeatPassword: "",
      address: "",
      postcode: "",
      paymentMethod: null,
    },

    bulletinPage: {
      inputComment: "",
    },

    adminMemberPage: {
      sortingMethod: null,
    },

    adminChangeMembershipsPage: {
      name: "",
      price: "",
      booking: false,
      familyAccess: false,
    },

    adminCreatePostPage: {
      title: "",
      type: null,
      startTime: null,
      endTime: null,
      startDate: null,
      endDate: null,
      link: "",
      inputText: "",
    },

    adminEditPostPage: {
      selectedPostID: null,
      selectedCommentID: null,
    },

    adminCalenderPage: {
      selectedTab: "Events", //Equipment
    },

    adminSignUpsPage: {
      selectedEventId: null,
    },

    adminCreateEventPage: {
      title: "",
      description: "",
      type: null,
      maxParticipants: 30,
      startTime: null,
      endTime: null,
      startDate: null,
      endDate: null,
      reservedRoom: null,
      eventID: null,
    },

    adminCreateEquipmentPage: {
      equipmentName: "",
      equipmentId: null,
      reservable: false,
      category: null,
      addCategory: "",
    },

    adminEditEquipmentPage: {
      equipmentName: "",
      equipmentId: null,
      reservable: false,
      category: null,
    },

    adminRoomCreationPage: {
      newRoomName: "",
      editedRoomName: "",
    },
  },

  //------------------------------------------------------------------------
  //                             DATA
  //------------------------------------------------------------------------

  //------------------------------------------------------------------------
  //                        Equipment & Rooms
  //------------------------------------------------------------------------
  rooms: [
    {
      name: "Sal 1",
      id: 0,
    },
    {
      name: "Sal 2",
      id: 1,
    },
    {
      name: "Sal 3",
      id: 2,
    },
  ],

  equipment: [
    {
      name: "Manualer 10 kg",
      id: 0,
      category: [0],
      reservable: false,
    },
    {
      name: "Manualer 15 kg",
      id: 1,
      category: [0],
      reservable: false,
    },
  ],

  equipmentCategories: [
    {
      id: 0,
      name: "Vekter",
    },
  ],

  //------------------------------------------------------------------------
  //                            Memberships
  //------------------------------------------------------------------------
  memberships: [
    {
      name: "Styrke",
      id: 0,
      price: 299,
      bookingAllowed: false,
    },
    {
      name: "Sal",
      id: 1,
      price: 399,
      bookingAllowed: true,
    },
    {
      name: "Familie",
      id: 2,
      price: 1200,
      bookingAllowed: true,
    },
  ],

  //------------------------------------------------------------------------
  //                           Users
  //------------------------------------------------------------------------

  users: [
    {
      userId: 0,
      role: "admin",
      username: "Admin",
      password: "Admin123",
      membershipType: null,
      approved: true,
      paymentDate: "2026-10-15",
      paymentMethod: "kort",
      paymentStatus: true,
      activeBooking: false,
      bookings: [],
      signUps: [],
      penalties: 0,
      registeredShowUps: 0,
      address: "Ingensteds 15A",
      postCode: "0000",
      membershipApplicationDate: "2026-10-15",
      membershipStartUpDate: "2026-10-15",
    },
    {
      userId: 1,
      role: "customer",
      username: "Kunde Kundesen",
      password: "Kunde123",
      membershipType: 1,
      approved: true,
      paymentDate: "2026-10-15",
      paymentMethod: "kort",
      paymentStatus: true,
      activeBooking: false,
      bookings: [0],
      signUps: [0],
      penalties: 0,
      registeredShowUps: 0,
      address: "Ingensteds 15A",
      postCode: "0000",
      membershipApplicationDate: "2026-10-15",
      membershipStartUpDate: "2026-10-15",
    },
    {
      userId: 2,
      role: "customer",
      username: "Kundine Kundesen",
      password: "Kunde123",
      membershipType: 0,
      approved: false,
      paymentDate: "2026-10-15",
      paymentMethod: "kort",
      paymentStatus: true,
      activeBooking: false,
      bookings: [0],
      signUps: [0],
      penalties: 0,
      registeredShowUps: 0,
      address: "Ingensteds 15A",
      postCode: "0000",
      membershipApplicationDate: "2026-10-15",
      membershipStartUpDate: "2026-10-15",
    },
    {
      userId: 3,
      role: "customer",
      username: "Kundine Kundesen",
      password: "Kunde123",
      membershipType: 0,
      approved: false,
      paymentDate: "2026-10-15",
      paymentMethod: "kort",
      paymentStatus: true,
      activeBooking: false,
      bookings: [0],
      signUps: [0],
      penalties: 0,
      registeredShowUps: 0,
      address: "Ingensteds 15A",
      postCode: "0000",
      membershipApplicationDate: "2026-10-15",
      membershipStartUpDate: "2026-10-15",
    },
    {
      userId: 4,
      role: "customer",
      username: "Kundine Kundesen",
      password: "Kunde123",
      membershipType: 0,
      approved: false,
      paymentDate: "2026-10-15",
      paymentMethod: "kort",
      paymentStatus: true,
      activeBooking: false,
      bookings: [0],
      signUps: [0],
      penalties: 0,
      registeredShowUps: 0,
      address: "Ingensteds 15A",
      postCode: "0000",
      membershipApplicationDate: "2026-10-15",
      membershipStartUpDate: "2026-10-15",
    },
  ],

  //------------------------------------------------------------------------
  //                          Bulletin Board
  //------------------------------------------------------------------------

  bulletins: [
    {
      title: "Example Info",
      type: "info",
      description: "This is dummy text for testing purposes.",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      bulletinId: 0,
      isArchived: false,
      comments: [
        {
          commentId: 0,
          userId: 1,
          text: "This is an example comment.",
        },
      ],
    },
  ],

  //------------------------------------------------------------------------
  //                        Events & Calender
  //------------------------------------------------------------------------
  calender: [
    {
      date: "2026-10-15",
      eventIds: [0],
      equipBookings: [0],
    },
  ],

  equipmentBookings: [
    {
      bookingId: 0,
      userId: 1,
      equipmentId: 0,
      date: "2026-10-15",
      startTime: "13.00",
      endTime: "13.30",
      approved: true,
    },
  ],

  events: [
    {
      id: 0,
      title: "Example Event Title",
      description: "Example Event Text",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      reservedRoom: [0],
      signups: [{ userId: 1, approved: true }],
      isArchived: false,
    },
  ],
  //------------------------------------------------------------------------
  //                        Opening Hours
  //------------------------------------------------------------------------

  openingHours: {
    reception: { open: "09.00", close: "16.00" },
    gymAccess: { open: "06.00", close: "24.00" },
  },
};
