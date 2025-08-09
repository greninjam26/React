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
	const numPizzas = pizzaData?.length;
	return (
		<main className="menu">
			<h2>Our Menu</h2>
			{/* don't use && too much, it can put a 0 on the UI */}
			{/* this is better, but need else */}
			{numPizzas > 0 ? (
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
			) : (
				<p>
					We're still working on the Online Menu place come back later or go to
					the physical store.
				</p>
			)}
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

function Pizza({ pizzaObj }) {
	if (pizzaObj.soldOut) return null;
	return (
		<li className="pizza">
			<img src={pizzaObj.photoName} alt={pizzaObj.name} />
			<div>
				<h3>{pizzaObj.name}</h3>
				<p>{pizzaObj.ingredients}</p>
				<span>{pizzaObj.price}</span>
			</div>
		</li>
	);
}

function Footer() {
	// const curTime = new Date().toLocaleTimeString();
	const curHour = new Date().getHours();
	const openHour = 22;
	const closeHour = 22;
	const isOpen = curHour >= openHour && curHour <= closeHour;
	// const isOpen = false;

	// this works jsut a mess
	// return React.createElement("footer", null, "We're currently open!");
	// JSX is better
	return (
		<footer className="footer">
			{isOpen ? (
				<Order closeHour={closeHour} />
			) : (
				<div className="order">
					<p>
						We're closed at {closeHour}:00. We will be open at {openHour}:00,{" "}
						{curHour < openHour ? "today" : "tomorrow"}.
					</p>
				</div>
			)}
		</footer>
	);
}

function Order({ closeHour }) {
	return (
		<div className="order">
			<p>We're open util {closeHour}:00. Come visit us or order online.</p>
			<button className="btn">Order</button>
		</div>
	);
}

// React 18
const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
