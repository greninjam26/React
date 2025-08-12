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
	const [isExpanded, setIsExpanded] = useState(expanded);

	function handleExpand() {
		setIsExpanded(expand => !expand);
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
			<span>
				{isExpanded
					? children
					: children.split(" ").slice(0, collapsedNumWords).join(" ") + "..."}
			</span>{" "}
			<button style={buttonStyle} onClick={handleExpand}>
				{isExpanded ? collapseButtonText : expandButtonText}
			</button>
		</div>
	);
}
