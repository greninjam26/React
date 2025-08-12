import { useState } from "react";

export default function TextExpander({
	collapsedNumWords = 10,
	expandButtonText = "Show more",
	collapseButtonText = "Show less",
	buttonColor = "blue",
	expanded = false,
	className = "",
	children,
}) {
	const [expand, setExpand] = useState(expanded);

	function handleExpand() {
		setExpand(bool => !bool);
	}

	const buttonStyle = {
		color: buttonColor,
		cursor: "pointer",
		border: "none",
		background: "none",
		fontSize: "inherit",
	};

	return (
		<div className={className}>
			<span>{expand ? children : children}</span>{" "}
			<button style={buttonStyle} onClick={handleExpand}>
				{expand ? collapseButtonText : expandButtonText}
			</button>
		</div>
	);
}
