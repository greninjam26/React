import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const infoList = [
	{ info: "Water Type", topic: "type", bColor: "#2b6bca", color: "#fff" },
	{ info: "Dark Type", topic: "type", bColor: "#21004f", color: "#fff" },
	{ info: "Water Shuriken", topic: "normal", bColor: "#0000ff", color: "#fff" },
	{ info: "Special Form", topic: "special", bColor: "#ff0000", color: "#fff" },
	{ info: "Big Water Shuriken", topic: "special", bColor: "aqua" },
];

export function App() {
	return (
		<main className="card">
			<Avatar />
			<div className="data">
				<Intro />
				<Infos />
			</div>
		</main>
	);
}

function Avatar() {
	return <img src="Greninja Cut.png" alt="Avatar" className="avatar" />;
}

function Intro() {
	return (
		<div>
			<h1>Ash Greninja</h1>
			<p>
				A Water and Dark Type. It is a special form of Greninja. After Ash's
				Frogadier evolved into Greninja, during battle it can transform into this
				special form through the bond he shared with Ash. After they mastered this
				ability, Greninja became one of the, if not the, strongest pokemon on
				Ash's team.
			</p>
		</div>
	);
}

function Infos() {
	return (
		<ul className="info-list">
			{infoList.map(info => (
				<Info infoObj={info} key={info.info} />
			))}
		</ul>
	);
}

function Info({ infoObj }) {
	return (
		<li
			className="info"
			style={{ backgroundColor: infoObj.bColor, color: infoObj.color }}
		>
			<span>
				{infoObj.topic === "type"
					? "🩵"
					: infoObj.topic === "special"
					? "🔥"
					: "💦"}
			</span>
			<span>{infoObj.info}</span>
		</li>
	);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
