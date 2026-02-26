export const deliveryOption = [
	{
		idDelivery: "1",
		deliveryDays: 7,
		costDelivery: 0,
	},
	{
		idDelivery: "2",
		deliveryDays: 3,
		costDelivery: 499,
	},
	{
		idDelivery: "3",
		deliveryDays: 1,
		costDelivery: 999,
	},
];

export function getIDDelivery(takedeliveryID) {
	let calldeliveryOption;

	deliveryOption.forEach((option) => {
		if (option.idDelivery === takedeliveryID) {
			calldeliveryOption = option;
		}
	});
	return calldeliveryOption || calldeliveryOption[0];
}
