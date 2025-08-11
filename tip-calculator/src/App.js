import { useState } from "react";

const selectionOptions = [
	"Dissatisfied (0%)",
	"It was okay (10%)",
	"I was good (15%)",
	"Absolutely Amazing (20%)",
];

export default function App() {
	const [bill, setBill] = useState(0);
	const [tip1, setTip1] = useState(selectionOptions[0]);
	const [tip2, setTip2] = useState(selectionOptions[0]);

	function getTip(tip) {
		return Number(
			tip.slice(-4, -2).at(0) === "(" ? tip.slice(-3, -2) : tip.slice(-4, -2)
		);
	}

	function handleClick() {
		setBill(0);
		setTip1(selectionOptions[0]);
		setTip2(selectionOptions[0]);
	}

	const totaltip = (bill * (getTip(tip1) + getTip(tip2))) / 2 / 100;
	return (
		<div>
			<Option inputType="text" value={bill} onValueChange={setBill}>
				How much was the bill:
			</Option>
			<Option inputType="selection" value={tip1} onValueChange={setTip1}>
				How did you like the service?
			</Option>
			<Option inputType="selection" value={tip2} onValueChange={setTip2}>
				How did your friend like the service?
			</Option>
			{bill !== 0 && (
				<>
					<Result totaltip={totaltip} bill={bill} />
					<Reset onClick={handleClick} />
				</>
			)}
		</div>
	);
}

function Option({ inputType, children, value, onValueChange }) {
	return (
		<div>
			<span>{children}</span>
			{inputType !== "selection" ? (
				<input
					type={inputType}
					value={value}
					onChange={e => onValueChange(Number(e.target.value))}
				/>
			) : (
				<select value={value} onChange={e => onValueChange(e.target.value)}>
					{selectionOptions.map(option => (
						<option key={option}>{option}</option>
					))}
				</select>
			)}
		</div>
	);
}

function Result({ bill, totaltip }) {
	return (
		<p>
			You pay ${bill} (${bill} + ${totaltip} tip)
		</p>
	);
}

function Reset({ onClick }) {
	return (
		<div>
			<button onClick={onClick}>Reset</button>
		</div>
	);
}
