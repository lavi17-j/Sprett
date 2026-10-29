function saveNewProduct() {
  const pageState = model.viewState.adminAddProductsPage;

  if (!pageState.productName || pageState.productPrice === null) {
    alert("Produktet må ha både navn og pris!");
    return;
  }

  let newId = 0;
  if (model.webStoreProducts && model.webStoreProducts.length > 0) {
    newId = Math.max(...model.webStoreProducts.map((p) => p.productId)) + 1;
  }

  const newProduct = {
    productId: newId,
    productName: pageState.productName,
    productProducer: pageState.productProducer || "Ukjent",
    productPrice: Math.max(0, Number(pageState.productPrice) || 0),
    productDescription: pageState.productDescription || "Manglende Beskrivelse",
    productQuantity: Math.max(0, Number(pageState.productQuantity) || 0),
    hasDiscount: pageState.hasDiscount || false,
  };

  model.webStoreProducts.push(newProduct);

  model.viewState.adminAddProductsPage = {
    productId: null,
    productName: "",
    productProducer: "",
    productPrice: null,
    productDescription: "",
    productQuantity: null,
    hasDiscount: false,
  };

  alert("Produktet ble lagret!");
  updateView();
}

function focusProduct(productId) {
  model.viewState.userWebStorePage.selectedProductId = productId;
  model.viewState.userWebStorePage.selectedQuantity = 1;
  updateView();
}

function clearProductFocus() {
  model.viewState.userWebStorePage.selectedProductId = null;
  updateView();
}

function changeProductQuantity(delta) {
  const pageState = model.viewState.userWebStorePage;
  const product = model.webStoreProducts.find(
    (p) => p.productId === pageState.selectedProductId,
  );
  if (!product) return;

  let newQty = pageState.selectedQuantity + delta;
  if (newQty < 1) newQty = 1;
  if (newQty > product.productQuantity) newQty = product.productQuantity;

  pageState.selectedQuantity = newQty;
  updateView();
}

function addToCart(productId) {
  const pageState = model.viewState.userWebStorePage;
  const quantity = pageState.selectedQuantity;

  const product = model.webStoreProducts.find((p) => p.productId === productId);
  if (!product || product.productQuantity < quantity) {
    alert("Ikke nok på lager!");
    return;
  }

  const cart = model.viewState.shoppingCart;
  const existingItem = cart.find((item) => item.productId === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ productId: productId, quantity: quantity });
  }

  alert(`${quantity} stk. '${product.productName}' lagt i handlekurven!`);
  clearProductFocus();
}

function placeOrder() {
  const cart = model.viewState.shoppingCart;
  if (!cart || cart.length === 0) {
    alert("Handlekurven er tom!");
    return;
  }

  let totalPrice = 0;
  for (const cartItem of cart) {
    const product = model.webStoreProducts.find(
      (p) => p.productId === cartItem.productId,
    );
    if (product) {
      totalPrice += product.productPrice * cartItem.quantity;
      product.productQuantity = Math.max(
        0,
        product.productQuantity - cartItem.quantity,
      );
    }
  }

  let newOrderId = 0;
  if (model.orders && model.orders.length > 0) {
    newOrderId = Math.max(...model.orders.map((o) => o.orderId)) + 1;
  }

  const newOrder = {
    orderId: newOrderId,
    userId: model.app.loggedInUserId,
    items: [...cart],
    totalPrice: Number(totalPrice.toFixed(2)),
    status: "Avventer henting",
    date: new Date().toISOString().split("T")[0],
  };

  model.orders.push(newOrder);
  model.viewState.shoppingCart = [];

  alert("Bestilling mottatt! Betaling skjer ved henting.");
  updateView();
}

function selectProductToEdit(productId) {
  const pageState = model.viewState.adminEditProductsPage;
  pageState.editingProductId = productId === "" ? null : Number(productId);

  if (pageState.editingProductId === null) {
    pageState.productName = "";
    pageState.productProducer = "";
    pageState.productPrice = null;
    pageState.productDescription = "";
    pageState.productQuantity = null;
    pageState.hasDiscount = false;
  } else {
    const product = model.webStoreProducts.find(
      (p) => p.productId === pageState.editingProductId,
    );
    if (product) {
      pageState.productName = product.productName;
      pageState.productProducer = product.productProducer;
      pageState.productPrice = product.productPrice;
      pageState.productDescription = product.productDescription;
      pageState.productQuantity = product.productQuantity;
      pageState.hasDiscount = product.hasDiscount;
    }
  }
  updateView();
}

function updateExistingProduct() {
  const pageState = model.viewState.adminEditProductsPage;

  if (pageState.editingProductId === null) {
    alert("Velg et produkt først!");
    return;
  }

  const productIndex = model.webStoreProducts.findIndex(
    (p) => p.productId === pageState.editingProductId,
  );
  if (productIndex !== -1) {
    model.webStoreProducts[productIndex] = {
      productId: pageState.editingProductId,
      productName: pageState.productName,
      productProducer: pageState.productProducer || "Ukjent",
      productPrice: Math.max(0, Number(pageState.productPrice) || 0),
      productDescription:
        pageState.productDescription || "Manglende Beskrivelse",
      productQuantity: Math.max(0, Number(pageState.productQuantity) || 0),
      hasDiscount: pageState.hasDiscount || false,
    };
  }

  alert("Produktet ble oppdatert!");
  updateView();
}

function deleteExistingProduct() {
  const pageState = model.viewState.adminEditProductsPage;

  if (pageState.editingProductId === null) {
    alert("Velg et produkt først!");
    return;
  }

  const confirmDelete = confirm(
    "Er du sikker på at du vil slette dette produktet?",
  );
  if (!confirmDelete) return;

  model.webStoreProducts = model.webStoreProducts.filter(
    (p) => p.productId !== pageState.editingProductId,
  );

  pageState.editingProductId = null;
  pageState.productName = "";
  pageState.productProducer = "";
  pageState.productPrice = null;
  pageState.productDescription = "";
  pageState.productQuantity = null;
  pageState.hasDiscount = false;

  alert("Produktet ble slettet!");
  updateView();
}

function markOrderAsFulfilled(orderId) {
  const order = model.orders.find((o) => o.orderId === orderId);
  if (!order) return;

  order.status = "Utlevert og fullført";

  alert(`Bestilling #${order.orderId} er markert som fullført.`);
  updateView();
}