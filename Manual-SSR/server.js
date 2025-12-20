// for node.js server, whenever we make some changes we need to restart the server
// if we don't want to restart everytime we need to do "node --watch server.js" instead of "node server.js"
// this is the commonjs syntax
const { readFileSync } = require("fs");
const { createServer } = require("http");
const { parse } = require("url");
const { renderToString } = require("react-dom/server");
const React = require("react");

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

// since we only need this once so it is easier to just use a Sync version to make it easier to store into a variable
const htmlTemplate = readFileSync(`${__dirname}/index.html`, "utf-8");

const server = createServer((req, res) => {
	const pathName = parse(req.url, true).pathname;

	if (pathName === "/") {
		// server side rendering
		const renderedReact = renderToString(<Home />);
		const html = htmlTemplate.replace("%%%CONTENT%%%", renderedReact);

		res.writeHead(200, { "Content-type": "text/html" });
		// res.end(htmlTemplate);
		// this one is not really real HTML code, so somethings are broken(no proper HTML structure)
		// res.end(renderedHtml);
    // this way this is real HTML code, is the header and everything, but with only this there are no interactivity, the buttons are not working at all(only HTML is passed through, not javascript what so ever)
		res.end(html);
	} else if (pathName === "/test") {
		res.end("TEST");
	} else {
		res.end("The URL can't be found");
	}
});

// the port is 8000, the function that will be called then the server starts
server.listen(8000, () => console.log("Listen for requests on port 8000"));
