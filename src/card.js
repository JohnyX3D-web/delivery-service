import { deliveryType, OrderStatus } from "./constants.js";

const card = document.querySelector(".card__wrap");

function getParcelTypeImgUrl(parcelType) {
	const imageUrlOne = new URL(
		"./assets/img/header/slect-img-1.svg",
		import.meta.url
	);
	const imageUrlTwo = new URL(
		"./assets/img/header/slect-img-2.svg",
		import.meta.url
	);
	const imageUrlThree = new URL(
		"./assets/img/header/slect-img-3.svg",
		import.meta.url
	);

	if (parcelType === "envelope-small") {
		return imageUrlOne;
	} else if (parcelType === "envelope-big") {
		return imageUrlTwo;
	} else {
		return imageUrlThree;
	}
}
// function getParcelTypeImgUrl(parcelType) {
// 	let imgName;

// 	if (parcelType === "envelope-small") {
// 		imgName = "slect-img-1.svg";
// 	} else if (parcelType === "envelope-big") {
// 		imgName = "slect-img-2.svg";
// 	} else {
// 		imgName = "slect-img-3.svg";
// 	}

// 	const imageUrlOne = new URL(
// 		`./assets/img/header/${imgName}`,
// 		import.meta.url
// 	);

// 	return imageUrlOne;
// }

fetch("http://localhost:3000/countries")
	.then((response) => response.json())
	.then((countriesData) => {
		fetch(`http://localhost:3000/orders`)
			.then((response) => response.json())
			.then(function (orders) {
				const cardHtml = orders.map(function (order) {
					const orderDeliveryType = deliveryType.find(function (item) {
						return order.delivery === item.name;
					});

					const from = countriesData.find(function (countryItem) {
						if (countryItem.id === order.from) {
							return true;
						}
					});

					const to = countriesData.find(function (countryItem) {
						if (countryItem.id === order.to) {
							return true;
						}
					});

					const completedStatus =
						order.status === "completed"
							? `<div class="completed"></div>`
							: `<div class="completed completed--no"></div>`;

					const cancelBtn =
						order.status === "draft" || order.status === undefined
							? `<button value="${order.id}" class="card__cancel"></button>`
							: "";

					const changeCard =
						order.status === "draft" || order.status === undefined
							? `<a class="filling__parameters-btn" href="/order-details.html?id=${order.id}">?????????????? ????????????????????</a>`
							: "";

					return `
							<div class="card__item outline">
								<div class="card__referral">
									<div class="card__referral-from">????????????: ${from.name}</div>
									<div class="card__referral-to">????????: ${to.name}</div>

									${cancelBtn}
								</div>
								<div class="card__content">
									<div class="card__type">
										<img src="${getParcelTypeImgUrl(order.parcelType)}" alt="" />
										<div>
											<p class="card__type-name">??????????????</p>
											<p class="card__type-number">
												${order.length}x${order.width}x${order.height}????
											</p>
										</div>
									</div>
									<div class="card__weight">
										<p class="card__weight-text">????????</p>
										<p class="card__weight-number">
											${order.weight} ????
										</p>
									</div>
									<div class="card__choice">
										<div class="card__choice-box">
											<div class="card__choice-content">
												<p class="card__choice-text">
													${orderDeliveryType.express ? "????????????" : "????????????????"} ???????????????? ????
													${orderDeliveryType.minDay + "-" + orderDeliveryType.maxDay} ??????, ?????????? ????????????????
												</p>
												<span>${orderDeliveryType.price} ??????</span>
											</div>
											<img
												src="/src/assets/img/order/filling2.png"
												alt=""
												class="card__choice-img"
											/>
										</div>
									</div>
								</div>
								${
									order.status === "completed"
										? `
								<div class="card__addressees">
									<div class="card__addressees-from">
										<div class="card__addressees-name">????'?? ??????????????????????: ${
											order.fullNameSender ?? "-"
										}</div>
										<div class="card__addressees-text">???????????? ??????????????????????: ${
											order.zipCodeSender
										}, ${order.citySender}, ${order.streetSender}</div>
										<div class="card__addressees-tel">?????????????? ??????????????????????: ${
											order.phoneSender
										}</div>
									</div>
									<div class="card__addressees-to">
										<div class="card__addressees-name">????'?? ????????????????????: ${
											order.fullNameReceiver
										}</div>
										<div class="card__addressees-text">???????????? ????????????????????: ${
											order.zipCodeReceiver
										}, ${order.cityReceiver}, ${order.streetReceiver}</div>
										<div class="card__addressees-tel">?????????????? ????????????????????: ${
											order.phoneReceiver
										}</div>
									</div>
								</div>`
										: ""
								}
								
								<div>${completedStatus}</div>
								<div>${changeCard}</div>
							</div>
						`;
				});

				card.innerHTML = cardHtml.join("");
			});
	});

card.addEventListener("click", function (event) {
	const deleteBtn = event.target.closest(".card__cancel");

	if (deleteBtn !== null) {
		const orderId = deleteBtn.value;
		fetch(`http://localhost:3000/orders/${orderId}`, {
			method: "DELETE",
		}).then(function () {
			deleteBtn.closest(".card__item").remove();
		});
	}
});
