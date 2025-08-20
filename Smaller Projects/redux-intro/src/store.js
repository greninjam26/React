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
				balance: state.balance + action.payLoad,
				load: action.payLoad,
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
