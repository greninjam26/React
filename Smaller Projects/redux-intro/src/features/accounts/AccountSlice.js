const initialStateAccount = {
	balance: 0,
	loan: 0,
	loanPurpose: "",
	isLoading: false,
};

export default function accountReducer(state = initialStateAccount, action) {
	switch (action.type) {
		case "account/convertingCurrency":
			return { ...state, isLoading: true };
		case "account/deposit":
			return {
				...state,
				balance: state.balance + action.payLoad,
				isLoading: false,
			};
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

export function deposit(amount, currency) {
	if (currency === "USD") return { type: "account/deposit", payLoad: amount };
	// by returning this function, redux will know this is the thunk and will execute it before going to the store
	return async function (dispatch, getState) {
		dispatch({ type: "account/convertingCurrency" });
		// API call
		const resp = await fetch(
			`https://api.frankfurter.dev/v1/latest?amount=${amount}&base=${currency}&symbols=USD`
		);
		const data = await resp.json();
		const converted = data.rates.USD;
		// return the action
		dispatch({ type: "account/deposit", payLoad: converted });
	};
}

export function withdraw(amount) {
	return { type: "account/withdraw", payLoad: amount };
}

export function requestLoan(amount, purpose) {
	return { type: "account/requestLoan", payLoad: { amount, purpose } };
}

export function payLoan() {
	return { type: "account/payLoan" };
}
