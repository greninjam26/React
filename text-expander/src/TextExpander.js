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

	return (
		<div className={className}>
			<span>{expand ? children : children}</span>{" "}
			<span
				role="button"
				style={{ color: buttonColor, cursor: "pointer" }}
				onClick={handleExpand}
			>
				{expand ? collapseButtonText : expandButtonText}
			</span>
		</div>
	);
}
