import Choices from "choices.js";
//import "choices.js/public/assets/styles/choices.min.css";
const form = document.querySelector("#international-delivery-form");
const selectFrom = form.querySelector(`[name="from"]`);
const selectTo = form.querySelector(`[name="to"]`);

const selectFromObj = new Choices(selectFrom);
const selectToObj = new Choices(selectTo);

fetch("http://localhost:3000/countries")
	.then((response) => response.json())
	.then((countriesData) => {
		const countries = countriesData.map(function (countryItem) {
			return {
				value: countryItem.id,
				label: countryItem.name,
			};
		});

		selectFromObj.setChoices(countries);
		selectToObj.setChoices(countries);
	});

//========================================
const tabsBtn = document.querySelectorAll(".tabs__btn");

tabsBtn.forEach(function (btn) {
	console.log(btn);
	btn.addEventListener("click", function () {
		if (btn === "click") {
			btn.classList.remove("tabs__btn--disable");
			btn.classList.add("tabs__btn--active");
		} else {
			btn.classList.add("tabs__btn--disable");
		}
	});
});
//=======================================

const selectTypeBtn = form.querySelector(".select__btn");
const selectInner = form.querySelector(".select__inner");
const sendingType = form.querySelector(`[name="sendingType"]`);

selectTypeBtn.addEventListener("click", function (event) {
	selectTypeBtn.classList.toggle("select__btn--open");
	selectInner.classList.toggle("select__inner--open");
});

selectInner.addEventListener("click", function (event) {
	const buttonBox = event.target.closest(".select__box-btn");

	if (buttonBox !== null) {
		selectTypeBtn.innerHTML = buttonBox.innerHTML;
		selectInner.classList.remove("select__inner--open");
		selectTypeBtn.classList.remove("select__btn--open");
		sendingType.value = buttonBox.value;
		sendingType.dispatchEvent(new Event("change"));
	}
});
//==================================================
function onChangeForm(event) {
	const input = event.target;
	console.log(input.value);
}
form.addEventListener("change", function (event) {
	onChangeForm(event);
});
// form.addEventListener("input", function (event) {
// 	onChangeForm(event);
// });
form.addEventListener("submit", function (event) {
	event.preventDefault();
	console.log(event);
});
sendingType.addEventListener("change", function (event) {
	onChangeForm(event);
});
