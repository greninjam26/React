import { useEffect, useState } from "react";

export function useLocalStorageState(initalState, key) {
	const [value, setValue] = useState(function () {
		return JSON.parse(localStorage.getItem(key)) || initalState;
	});

	useEffect(
		function () {
			localStorage.setItem(key, JSON.stringify(value));
		},
		[value]
	);

	return [value, setValue];
}
