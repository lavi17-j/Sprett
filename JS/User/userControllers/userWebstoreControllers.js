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

  alert("Bestilling mottatt! Betaling skjer ved henting på lokasjon.");
  updateView();
}
