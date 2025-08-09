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

	function increaseStep() {
		setStep(s => s + 1);
	}

	function decreaseStep() {
		setStep(s => s - 1);
	}

	return (
		<>
			<button onClick={decreaseStep}>-</button>
			<span>Step: {step}</span>
			<button onClick={increaseStep}>+</button>
			<br />
			<button onClick={decreaseCount}>-</button>
			<span>Count: {count}</span>
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
		</>
	);
}
