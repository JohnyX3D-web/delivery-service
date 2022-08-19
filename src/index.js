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
		sendingType.dispatchEvent(new Event("change", { bubbles: true }));
	}
});
//==================================================
const tabsOptions = form.querySelector(".tabs__options");
const computation = form.querySelector(".computation");
const lengthInput = form.querySelector(`[name="length"]`);
const widthInput = form.querySelector(`[name="width"]`);
const heightInput = form.querySelector(`[name="height"]`);
const weightInput = form.querySelector(`[name="weight"]`);
form.addEventListener("change", function (event) {
	if (
		selectFrom.value !== "" &&
		selectTo.value !== "" &&
		sendingType.value !== ""
	) {
		tabsOptions.classList.add("tabs__options--open");
	}
	if (sendingType.value !== "parcel") {
		weightInput.value = sendingType.value === "envelope-small" ? "0.3" : "0.5";
		weightInput.disabled = true;
	} else {
		weightInput.disabled = false;
	}
});
form.addEventListener("input", function (event) {
	if (
		lengthInput.value !== "0" &&
		widthInput.value !== "0" &&
		heightInput.value !== "0" &&
		weightInput.value !== "0"
	) {
		computation.classList.add("computation--open");
	}
});
form.addEventListener("submit", function (event) {
	event.preventDefault();
	console.log(event);
});
//==========================================
const discountButton = form.querySelector(".computation__discont-btn");
const discountModal = document.querySelector("#discount-modal");
const discountModalCloseBtn = document.querySelector(".modal__close");

discountButton.addEventListener("click", function (event) {
	openModal();
});
discountModalCloseBtn.addEventListener("click", function () {
	closeModal();
});
discountModal.addEventListener("click", function (event) {
	if (event.target.classList.contains("modal")) {
		closeModal();
	}
});
function closeModalOnEscape(event) {
	if (event.code === "Escape") {
		closeModal();
	}
}
function openModal() {
	document.addEventListener("keydown", closeModalOnEscape);
	discountModal.classList.add("modal--open");
	document.body.style.overflow = "hidden";
}
function closeModal() {
	document.removeEventListener("keydown", closeModalOnEscape);
	discountModal.classList.remove("modal--open");
	document.body.style.overflow = "";
}
