import { useReducer } from "react";

const initialState = {
	balance: 0,
	loan: 0,
	isActive: false,
};

function reducer(state, action) {
	if (!state.isActive && action.type !== "openAccount") return state;
	switch (action.type) {
		case "openAccount":
			return { ...state, isActive: true, balance: action.payLoad };
		case "deposit":
			return { ...state, balance: state.balance + action.payLoad };
		case "withdraw":
			if (state.balance === 0) return state;
			return { ...state, balance: state.balance - action.payLoad };
		case "requestLoan":
			if (state.loan !== 0) return state;
			return {
				...state,
				loan: action.payLoad,
				balance: state.balance + action.payLoad,
			};
		case "payLoan":
			if (state.loan === 0 || state.balance < state.loan) return state;
			return { ...state, loan: 0, balance: state.balance - state.loan };
		case "closeAccount":
			if (state.balance !== 0 || state.loan !== 0) return state;
			return initialState;
		default:
			throw new Error("Action is not valid");
	}
}

export default function App() {
	const [{ balance, loan, isActive }, dispatch] = useReducer(reducer, initialState);
	return (
		<div className="App">
			<h1>useReducer Bank Account</h1>
			<p>Balance: {balance}</p>
			<p>Loan: {loan}</p>

			<p>
				<button
					onClick={() => dispatch({ type: "openAccount", payLoad: 500 })}
					disabled={isActive}
				>
					Open account
				</button>
			</p>
			<p>
				<button
					onClick={() => dispatch({ type: "deposit", payLoad: 150 })}
					disabled={!isActive}
				>
					Deposit 150
				</button>
			</p>
			<p>
				<button
					onClick={() => dispatch({ type: "withdraw", payLoad: 50 })}
					disabled={!isActive || balance === 0}
				>
					Withdraw 50
				</button>
			</p>
			<p>
				<button
					onClick={() => dispatch({ type: "requestLoan", payLoad: 5000 })}
					disabled={!isActive || loan !== 0}
				>
					Request a loan of 5000
				</button>
			</p>
			<p>
				<button
					onClick={() => dispatch({ type: "payLoan" })}
					disabled={!isActive || loan === 0 || balance < loan}
				>
					Pay loan
				</button>
			</p>
			<p>
				<button
					onClick={() => dispatch({ type: "closeAccount" })}
					disabled={!isActive || balance !== 0 || loan !== 0}
				>
					Close account
				</button>
			</p>
		</div>
	);
}
