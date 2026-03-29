import { orders } from "../data/orders.js";
import { formatCurrency } from "../script/utils/money.js";
import { getProductID, loadProductFetch } from "../data/products.js";

loadProductFetch(orderPageSummary);

function orderPageSummary() {
	let orderPage = "";
	orders.forEach((orderitem) => {
		const dataProduct = orderitem.products;
		let productsHTML = "";
		const dateOrder = orderitem.orderTime;
		const date = new Date(dateOrder);
		const years = date.getFullYear();
		const mount = date.toLocaleDateString("en", { month: "long" });
		const day = date.getDate();

		dataProduct.forEach((product) => {
			const matchingProduct = getProductID(product.productId);
			// const today = dayjs();
			// const deliveryDate = today.add(product.deliveryDays, "days");
			// const dateString = deliveryDate.format("dddd, D MMMM");

			const dateEstimatedDelivery = product.estimatedDeliveryTime;
			const date = new Date(dateEstimatedDelivery);
			const years = date.getFullYear();
			const mount = date.toLocaleDateString("en", { month: "long" });
			const day = date.getDate();

			productsHTML += `
				<div class="product-image-container">
					<img src="${matchingProduct.image}">
				</div>

				<div class="product-details">
					<div class="product-name">
						${matchingProduct.name}
					</div>
					<div class="product-delivery-date">
					Arriving on: 
					${day} ${mount} ${years}
					</div>
					<div class="product-quantity">
					Quantity: ${product.quantity}
					</div>
					<button class="buy-again-button button-primary">
					<img class="buy-again-icon" src="images/icons/buy-again.png">
					<span class="buy-again-message">Buy it again</span>
					</button>
				</div>

				<div class="product-actions">
					<a href="tracking.html?orderid=123&productid=456">
					<button class="track-package-button button-secondary">
						Track package
					</button>
					</a>
				</div>
		`;
		});

		orderPage += `
		<div class="order-container">
			<div class="order-header">
				<div class="order-header-left-section">
					<div class="order-date">
					<div class="order-header-label">Order Placed:</div>
					<div> ${day} ${mount} ${years}</div>
					</div>
					<div class="order-total">
					<div class="order-header-label">Total:</div>
					<div>$${formatCurrency(orderitem.totalCostCents)}</div>
					</div>
				</div>

				<div class="order-header-right-section">
					<div class="order-header-label">Order ID:</div>
					<div>${orderitem.id}</div>
				</div>
			</div>

			<div class="order-details-grid">
				${productsHTML}
			</div>
		</div>
	`;
	});

	document.querySelector(".js-orders-grid").innerHTML = orderPage;
}
