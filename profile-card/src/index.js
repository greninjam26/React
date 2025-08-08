import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

export function App() {
	return (
		<main className="card">
			<Avatar />
			<div className="data">
				<Intro />
				<Skills />
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

function Skills() {
	return (
		<ul className="skill-list">
			<Skill skill="Special Form" bc="green" />
			<Skill skill="Water and Dark Type" bc="blue" />
			<Skill skill="Water Shuriken" bc="aqua" />
			<Skill skill="Bond Coonection" bc="yellow" />
		</ul>
	);
}

function Skill(props) {
	return (
		<li className="skill" style={{ backgroundColor: props.bc }}>
			{props.skill}
		</li>
	);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
