import { useState } from "react";

const selectionOptions = [
	{ value: 0, text: `Dissatisfied (0%)` },
	{ value: 10, text: `It was okay (10%)` },
	{ value: 15, text: `I was good (15%)` },
	{ value: 20, text: `Absolutely Amazing (20%)` },
];

export default function App() {
	const [bill, setBill] = useState("");
	const [tip1, setTip1] = useState(0);
	const [tip2, setTip2] = useState(0);

	// function getTip(tip) {
	// 	return Number(
	// 		tip.slice(-4, -2).at(0) === "(" ? tip.slice(-3, -2) : tip.slice(-4, -2)
	// 	);
	// }

	function handleClick() {
		setBill("");
		setTip1(0);
		setTip2(0);
	}

	// const totaltip = bill * (getTip(tip1) + getTip(tip2)) / 2 / 100;
	const totaltip = bill * ((tip1 + tip2) / 2 / 100);

	return (
		<div>
			<Option
				inputType="text"
				value={bill}
				placeholder="Bill Value"
				onValueChange={setBill}
			>
				How much was the bill:
			</Option>
			<Option inputType="selection" value={tip1} onValueChange={setTip1}>
				How did you like the service?
			</Option>
			<Option inputType="selection" value={tip2} onValueChange={setTip2}>
				How did your friend like the service?
			</Option>
			{bill && (
				<>
					<Result totaltip={totaltip} bill={bill} />
					<Reset onClick={handleClick} />
				</>
			)}
		</div>
	);
}

function Option({ inputType, placeholder, children, value, onValueChange }) {
	return (
		<div>
			<label>{children}</label>
			{inputType !== "selection" ? (
				<input
					type={inputType}
					placeholder={placeholder}
					value={value}
					onChange={e => onValueChange(Number(e.target.value))}
				/>
			) : (
				<select
					value={value}
					onChange={e => onValueChange(Number(e.target.value))}
				>
					{selectionOptions.map(option => (
						<option value={option.value} key={option.text}>
							{option.text}
						</option>
					))}
				</select>
			)}
		</div>
	);
}

function Result({ bill, totaltip }) {
	return (
		<h3>
			You pay ${bill + totaltip} (${bill} + ${totaltip} tip)
		</h3>
	);
}

function Reset({ onClick }) {
	return (
		<div>
			<button onClick={onClick}>Reset</button>
		</div>
	);
}
