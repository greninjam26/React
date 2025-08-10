import { useState } from "react";

export default function App() {
	return (
		<div className="App">
			<Counter />
		</div>
	);
}

function Counter() {
	const date = new Date();
	const [step, setStep] = useState(1);
	const [count, setCount] = useState(0);
	date.setDate(date.getDate() + count);

	function increaseCount() {
		setCount(c => c + step);
	}

	function decreaseCount() {
		setCount(c => c - step);
	}

	function handleChangeStep(e) {
		setStep(+e.target.value);
	}

	function handleChangeCount(e) {
		setCount(+e.target.value);
	}

	function handleClick() {
		setCount(0);
		setStep(1);
	}

	return (
		<>
			<input type="range" min="0" max="10" value={step} onChange={handleChangeStep} />
			<span>Step: {step}</span>
			<br />
			<button onClick={decreaseCount}>-</button>
			<input value={count} onChange={handleChangeCount}/>
			<button onClick={increaseCount}>+</button>
			<p>
				{count < 0 &&
					`${
						count === -1 ? "Yesterday" : `${Math.abs(count)} days ago`
					} was ${date.toDateString()}`}
				{count === 0 && `Today is ${date.toDateString()}`}
				{count > 0 &&
					`${
						count === 1 ? "Tomorrow" : `${count} days from today`
					} is ${date.toDateString()}`}
			</p>
			<button
				style={count === 0 ? { display: "hidden" } : null}
				onClick={handleClick}
			>
				Reset
			</button>
		</>
	);
}
