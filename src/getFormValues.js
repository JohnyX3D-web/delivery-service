export default function getFormValues(form) {
	const constructElement = new FormData(form);
	const values = {};
	for (let [name, value] of constructElement) {
		values[name] = value;
	}
	return values;
}
