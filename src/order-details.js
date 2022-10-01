import Choices from "choices.js";
import { deliveryType, OrderStatus } from "./constants.js";
import getFormValues from "./getFormValues.js";

const urlParam = new URLSearchParams(location.search);
const orderId = urlParam.get("id");
const fillingTypeSum = document.querySelector(".filling__type-sum");
const fillingWeightSum = document.querySelector(".filling__weight-sum");
const fillingChoiceDay = document.querySelector(".filling__choice-day");
const fillingChoiceSpeed = document.querySelector(".filling__choice-speed");
const fillingChoicePrice = document.querySelector(".filling__choice-pice");
const inputElementFrom = document.querySelector(".input__element--from");
const inputElementTo = document.querySelector(".input__element--to");

fetch(`http://localhost:3000/orders/${orderId}`)
	.then((response) => response.json())
	.then(function (order) {
		fillingTypeSum.innerText = `${order.length}x${order.width}x${order.height}`;
		fillingWeightSum.innerText = order.weight;

		const orderDeliveryType = deliveryType.find(function (item) {
			return order.delivery === item.name;
		});
		fillingChoiceDay.innerText =
			orderDeliveryType.minDay + "-" + orderDeliveryType.maxDay;
		fillingChoiceSpeed.innerText = orderDeliveryType.express
			? "Швидка"
			: "Звичайна";
		fillingChoicePrice.innerText = orderDeliveryType.price;

		fetch("http://localhost:3000/countries")
			.then((response) => response.json())
			.then((countriesData) => {
				countriesData.find(function (countryItem) {
					if (countryItem.id === order.from) {
						inputElementFrom.value = countryItem.name;
					}
					if (countryItem.id === order.to) {
						inputElementTo.value = countryItem.name;
					}
				});
			});
	});
//=======================================================
const form = document.querySelector(".order__form");
const deliveryTime = form.querySelector(`[name="deliveryTime"]`);
const paymentType = form.querySelector(`[name="paymentType"]`);

new Choices(deliveryTime);
new Choices(paymentType);
//=======================================================
form.addEventListener("submit", function (event) {
	event.preventDefault();
	const values = getFormValues(form);
	//debugger;
	values.status = OrderStatus.Completed; //вручну змінюємо статус замовлення
	fetch(`http://localhost:3000/orders/${orderId}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(values),
	})
		.then((response) => response.json())
		.then(function (order) {
			// const newUrl = new URL(location.href);
			// newUrl.pathname = "order-details.html";
			// newUrl.searchParams.set("id", order.id);
			// location.href = newUrl.toString();
		});
});
