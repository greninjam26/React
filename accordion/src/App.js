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
			<Accordion />
		</div>
	);
}

function Accordion() {
	return (
		<div className="accordion">
			{faqs.map((faq, i) => (
				<AccordionItem
					num={i + 1}
					title={faq.title}
					text={faq.text}
					key={faq.title}
				/>
			))}
		</div>
	);
}

function AccordionItem({ num, title, text }) {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div
			className={`item ${isOpen ? "open" : ""}`}
			onClick={() => setIsOpen(open => !open)}
		>
			<p className="number">{num < 10 ? `0${num}` : num}</p>
			<h1 className="title">{title}</h1>
			<p className="icon">{isOpen ? "-" : "+"}</p>

			<div style={isOpen ? null : { display: "none" }} className="content-box">
				{text}
			</div>
		</div>
	);
}
