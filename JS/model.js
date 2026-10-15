const model = {
  app: {},

  viewState: {},

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
      id: 0,
      role: "admin",
      username: "Admin",
      password: "Admin123",
      membershipType: [],
      approved: true,
      paymentDate: "15-10-2026", //Update to ISO-format
      paymentStatus: true,
      activeBooking: false,
      bookings: [],
      signUps: [],
      penalties: 0,
      registeredShowUps: 0,
    },
    {
      id: 1,
      role: "customer",
      username: "Kunde Kundesen",
      password: "Kunde123",
      membershipType: [],
      approved: true,
      paymentDate: "15-10-2026", //Update to ISO-format
      paymentStatus: true,
      activeBooking: false,
      bookings: [0],
      signUps: [0],
      penalties: 0,
      registeredShowUps: 0,
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
      id: "0",
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
      date: "15-10-2026",
      eventIds: [0],
      bookings: [
        {
          bookingId: 0,
          userid: 1,
          equipmentId: [0],
          startTime: "13.00",
          endTime: "13.30",
          approved: true,
        },
      ],
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
      signups: [{ id: 1, approved: true }],
    },
  ],
};
