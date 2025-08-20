const initialStateAccount = {
	balance: 0,
	loan: 0,
	loanPurpose: "",
};

export default function accountReducer(state = initialStateAccount, action) {
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

export function deposit(amount) {
	return { type: "account/deposit", payLoad: amount };
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
