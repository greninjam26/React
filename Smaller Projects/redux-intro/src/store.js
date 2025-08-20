import { createStore } from "redux";

const initialState = {
	balance: 0,
	loan: 0,
	loanPurpose: "",
};

function reducer(state = initialState, action) {
	switch (action.type) {
		case "account/deposit":
			return { ...state, balance: state.balance + action.payLoad };
		case "account/withdraw":
			return { ...state, balance: state.balance - action.payLoad };
		case "account/requestLoan":
			if (state.loan > 0) return state;
			return {
				...state,
				balance: state.balance + action.payLoad.amount,
				loanPurpose: action.payLoad.purpose,
				loan: action.payLoad.amount,
			};
		case "account/payLoan":
			return {
				...state,
				loan: 0,
				loanPurpose: "",
				balance: state.balance - state.loan,
			};
		default:
			return state;
	}
}

const store = createStore(reducer);

function deposit(amount) {
	return { type: "account/deposit", payLoad: amount };
}

function withdraw(amount) {
	return { type: "account/withdraw", payLoad: amount };
}

function requestLoan({ amount, purpose }) {
	return { type: "account/requestLoan", payLoad: { amount, purpose } };
}

function payLoan() {
	return { type: "account/payLoan" };
}

// store.dispatch({ type: "account/deposit", payLoad: 500 });
store.dispatch(deposit(500));
console.log(store.getState());
