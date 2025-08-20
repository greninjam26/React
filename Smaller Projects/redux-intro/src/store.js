import { combineReducers, createStore } from "redux";

const initialStateAccount = {
	balance: 0,
	loan: 0,
	loanPurpose: "",
};

const initalStateCustomer = {
	fullName: "",
	nationalID: "",
	createdAt: "",
};

function accountReducer(state = initialStateAccount, action) {
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

function customerReducer(state = initalStateCustomer, action) {
	switch (action.type) {
		case "customer/createCustomer":
			return {
				...state,
				fullName: action.payLoad.fullName,
				nationalID: action.payLoad.nationalID,
				createdAt: action.payLoad.createdAt,
			};
		case "customer/updateName":
			return { ...state, fullName: action.payLoad };
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	account: accountReducer,
	customer: customerReducer,
});

const store = createStore(rootReducer);

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

function createCustomer(fullName, nationalID) {
	return {
		type: "customer/createCustomer",
		payLoan: { fullName, nationalID, createdAt: new Date().toISOString },
	};
}

function updateName(fullName) {
	return {
		type: "customer/updateName",
		payLoan: fullName,
	};
}
