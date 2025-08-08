import React from "react";
import ReactDom from "react-dom/client";
import "./index.css";

const pizzaData = [
	{
		name: "Focaccia",
		ingredients: "Bread with italian olive oil and rosemary",
		price: 6,
		photoName: "pizzas/focaccia.jpg",
		soldOut: false,
	},
	{
		name: "Pizza Margherita",
		ingredients: "Tomato and mozarella",
		price: 10,
		photoName: "pizzas/margherita.jpg",
		soldOut: false,
	},
	{
		name: "Pizza Spinaci",
		ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
		price: 12,
		photoName: "pizzas/spinaci.jpg",
		soldOut: false,
	},
	{
		name: "Pizza Funghi",
		ingredients: "Tomato, mozarella, mushrooms, and onion",
		price: 12,
		photoName: "pizzas/funghi.jpg",
		soldOut: false,
	},
	{
		name: "Pizza Salamino",
		ingredients: "Tomato, mozarella, and pepperoni",
		price: 15,
		photoName: "pizzas/salamino.jpg",
		soldOut: true,
	},
	{
		name: "Pizza Prosciutto",
		ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
		price: 18,
		photoName: "pizzas/prosciutto.jpg",
		soldOut: false,
	},
];

function App() {
	return (
		<div className="container">
			<Header />
			<Menu />
			<Footer />
		</div>
	);
}

function Header() {
	// inline css style
	// const style = { color: "red", fontSize: "3.2rem" };
	// return <h1 style={style}>Fast React Pizza Co.</h1>;
	// CSS file with className is easier
	return (
		<header className="header">
			<h1>Fast React Pizza Co.</h1>
		</header>
	);
}

function Menu() {
	return (
		<main className="menu">
			<h2>Our Menu</h2>
			<ul className="pizzas">
				{pizzaData.map(pizza => (
					<Pizza
						// don't do this
						// name={pizza.name}
						// ingredients={pizza.ingredients}
						// imagePath={pizza.photoName}
						// price={pizza.price}
						// do this
						pizzaObj={pizza}
						key={pizza.name}
					/>
				))}
			</ul>
			{/* <Pizza
				name="Focaccia"
				ingredients="Bread with italian olive oil and rosemary"
				imagePath="pizzas/focaccia.jpg"
				price={10}
			/>
			<Pizza
				name="Focaccia"
				ingredients="Bread with italian olive oil and rosemary"
				imagePath="pizzas/focaccia.jpg"
				price={10}
			/> */}
		</main>
	);
}

function Pizza(props) {
	return (
		<li className="pizza">
			<img src={props.pizzaObj.photoName} alt={props.pizzaObj.name} />
			<div>
				<h3>{props.pizzaObj.name}</h3>
				<p>{props.pizzaObj.ingredients}</p>
				<span>{props.pizzaObj.price}</span>
			</div>
		</li>
	);
}

function Footer() {
	const curTime = new Date().toLocaleTimeString();
	const curHour = new Date().getHours();
	const openHour = 12;
	const closeHour = 22;
	let state = "We're currently closed";

	if (curHour >= openHour && curHour <= closeHour) {
		state = "We're currently open!";
	}
	// this works jsut a mess
	// return React.createElement("footer", null, "We're currently open!");
	// JSX is better
	return (
		<footer className="footer">
			{curTime}, {state}
		</footer>
	);
}

// React 18
const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
