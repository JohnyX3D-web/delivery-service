// import Choices from "choices.js";
// //import "choices.js/public/assets/styles/choices.min.css";
// const form = document.querySelector("#international-delivery-form");
// const selectFrom = form.querySelector(`[name="from"]`);
// const selectTo = form.querySelector(`[name="to"]`);

// const selectFromObj = new Choices(selectFrom);
// const selectToObj = new Choices(selectTo);

// fetch("http://localhost:3000/countries")
// 	.then((response) => response.json())
// 	.then((countriesData) => {
// 		const countries = countriesData.map(function (countryItem) {
// 			return {
// 				value: countryItem.id,
// 				label: countryItem.name,
// 			};
// 		});

// 		selectFromObj.setChoices(countries);
// 		selectToObj.setChoices(countries);
// 	});
