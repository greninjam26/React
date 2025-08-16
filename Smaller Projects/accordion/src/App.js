import { useState } from "react";
import "./index.css";

const faqs = [
	{
		title: "Where are these chairs assembled?",
		text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
	},
	{
		title: "How long do I have to return my chair?",
		text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
	},
	{
		title: "Do you ship to countries outside the EU?",
		text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
	},
];

export default function App() {
	return (
		<div>
			<Accordion data={faqs} />
		</div>
	);
}

function Accordion({ data }) {
	const [curOpen, setCurOpen] = useState(null);

	return (
		<div className="accordion">
			{data.map((el, i) => (
				<AccordionItem
					curOpen={curOpen}
					onOpen={setCurOpen}
					num={i + 1}
					title={el.title}
					key={el.title}
				>
					{el.text}
				</AccordionItem>
			))}
		</div>
	);
}

function AccordionItem({ num, title, children, curOpen, onOpen }) {
	const isOpen = num === curOpen;
	return (
		<div
			className={`item ${isOpen ? "open" : ""}`}
			onClick={() => (curOpen === num ? onOpen(null) : onOpen(num))}
		>
			<p className="number">{num < 10 ? `0${num}` : num}</p>
			<p className="title">{title}</p>
			<p className="icon">{isOpen ? "-" : "+"}</p>

			{/* <div style={isOpen ? null : { display: "none" }} className="content-box">
				{children}
			</div> */}
			{isOpen && <div className="content-box">{children}</div>}
		</div>
	);
}
