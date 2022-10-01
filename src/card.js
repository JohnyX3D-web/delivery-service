import { deliveryType, OrderStatus } from "./constants.js";

const card = document.querySelector(".card__wrap");

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

					return `
							<div class="card__item outline">
								<div class="card__referral">
									<div class="card__referral-from">Звідки: ${from.name}</div>
									<div class="card__referral-to">Куди: ${to.name}</div>
									<button value="${order.id}" class="card__cancel"></button>
								</div>
								<div class="card__content">
									<div class="card__type">
										<img src="./src/assets/img/order/filling1.png" alt="" />
										<div>
											<p class="card__type-name">Посилка</p>
											<p class="card__type-number">
												${order.length}x${order.width}x${order.height}см
											</p>
										</div>
									</div>
									<div class="card__weight">
										<p class="card__weight-text">Вага</p>
										<p class="card__weight-number">
											${order.weight} кг
										</p>
									</div>
									<div class="card__choice">
										<div class="card__choice-box">
											<div class="card__choice-content">
												<p class="card__choice-text">
													${orderDeliveryType.express ? "Швидка" : "Звичайна"} доставка за
													${orderDeliveryType.minDay + "-" + orderDeliveryType.maxDay} дні, через компанію
												</p>
												<span>${orderDeliveryType.price} грн</span>
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
										<div class="card__addressees-name">Ім'я відправника: ${
											order.fullNameSender ?? "-"
										}</div>
										<div class="card__addressees-text">Адреса відправника: ${
											order.zipCodeSender
										}, ${order.citySender}, ${order.streetSender}</div>
										<div class="card__addressees-tel">Телефон відправника: ${
											order.phoneSender
										}</div>
									</div>
									<div class="card__addressees-to">
										<div class="card__addressees-name">Ім'я одержувача: ${
											order.fullNameReceiver
										}</div>
										<div class="card__addressees-text">Адреса одержувача: ${
											order.zipCodeReceiver
										}, ${order.cityReceiver}, ${order.streetReceiver}</div>
										<div class="card__addressees-tel">Телефон одержувача: ${
											order.phoneReceiver
										}</div>
									</div>
								</div>`
										: ""
								}
								
								<div>${completedStatus}</div>
							</div>
						`;
				});

				card.innerHTML = cardHtml.join("");
				const cardItems = card.querySelectorAll(".card__item");

				cardItems.forEach(function (cardItem) {
					const button = cardItem.querySelector(".card__cancel");
					button.addEventListener("click", function (event) {
						const orderId = button.value;
						fetch(`http://localhost:3000/orders/${orderId}`, {
							method: "DELETE",
						}).then(function () {
							button.closest(".card__item").remove();
						});
					});
				});
			});
	});
