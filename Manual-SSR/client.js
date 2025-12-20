// we don't want to create a new tree, but use the existing one
// import { createRoot } from "react-dom/client";
// createRoot()

// this is all we need to hydrate
ReactDOM.hydrateRoot(document.getElementById("root"), <Home />);

// we wouldn't normally have this here
// with Next.js there are bundler that inject this here with this code in another file
const pizzas = [
	{
		name: "Focaccia",
		price: 6,
	},
	{
		name: "Pizza Margherita",
		price: 10,
	},
	{
		name: "Pizza Spinaci",
		price: 12,
	},
	{
		name: "Pizza Funghi",
		price: 12,
	},
	{
		name: "Pizza Prosciutto",
		price: 15,
	},
];

function Home() {
	return (
		<div>
			<h1>🍕 Fast React Pizza Co.</h1>
			<p>This page has been rendered with React on the server 🤯</p>

			<h2>Menu</h2>
			<ul>
				{pizzas.map(pizza => (
					<MenuItem pizza={pizza} key={pizza.name} />
				))}
			</ul>
		</div>
	);
}

function Counter() {
	const [count, setCount] = React.useState(0);
	return (
		<div>
			<button onClick={() => setCount(c => c + 1)}>+1</button>
			<span>{count}</span>
		</div>
	);
}

function MenuItem({ pizza }) {
	return (
		<li>
			<h4>
				{pizza.name} (${pizza.price})
			</h4>
			<Counter />
		</li>
	);
}
