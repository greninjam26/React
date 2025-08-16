import { useState, useEffect } from "react";

export default function App() {
	const [curCurrency, setCurCurrency] = useState("");
	const [curAmount, setCurAmount] = useState("");
	const [newCurrency, setNewCurrency] = useState("");
	const [newAmount, setNewAmount] = useState("");

	function handleChangeCurCurrency(e) {
		setCurCurrency(e.target.value);
	}

	function handleChangeCurAmount(e) {
		setCurAmount(Number(e.target.value));
	}

	function handleChangeNewCurrency(e) {
		setNewCurrency(e.target.value);
	}

	useEffect(
		function () {
			// const controller = new AbortController();
			if (curCurrency === "" || curAmount === "" || newCurrency === "") return;
			async function fetchNewAmount() {
				const resp = await fetch(
					`https://api.frankfurter.app/latest?amount=${curAmount}&from=${curCurrency}&to=${newCurrency}`
				);
				const data = await resp.json();
				setNewAmount(data.rates?.[newCurrency]);
			}
			fetchNewAmount();
			// return () => controller.abort();
		},
		[curCurrency, curAmount, newCurrency]
	);

	return (
		<div>
			<label>Original Currency:</label>
			<input
				type="text"
				placeholder="USD"
				value={curCurrency}
				onChange={handleChangeCurCurrency}
			/>
			<br />
			<label>Amount:</label>
			<input
				type="text"
				placeholder="100"
				value={curAmount}
				onChange={handleChangeCurAmount}
			/>
			<br />
			<label>Converted Currency:</label>
			<input
				type="text"
				placeholder="CAD"
				value={newCurrency}
				onChange={handleChangeNewCurrency}
			/>
			{/* <select>
				<option value="USD">USD</option>
				<option value="EUR">EUR</option>
				<option value="CAD">CAD</option>
				<option value="INR">INR</option>
			</select>
			<select>
				<option value="USD">USD</option>
				<option value="EUR">EUR</option>
				<option value="CAD">CAD</option>
				<option value="INR">INR</option>
			</select> */}
			<p>{newAmount}</p>
		</div>
	);
}
