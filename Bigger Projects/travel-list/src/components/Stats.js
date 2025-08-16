export default function Stats({ items }) {
	if (!items.length) {
		return (
			<footer className="stats">
				<em>Start adding some items to your packing list 🚀</em>
			</footer>
		);
	}

	const totalItems = items.length;
	const totalPacked = items.filter(item => item.packed).length;
	const packedPercent = Math.round((totalPacked / totalItems) * 100);

	return (
		<footer className="stats">
			<em>
				{packedPercent === 100
					? `You got everything! Ready to go ✈️`
					: `💼 You have ${totalItems} item${
							totalItems !== 1 ? "s" : ""
					  } in your list, and you already packed ${totalPacked} item${
							totalPacked !== 1 ? "s" : ""
					  } (${packedPercent}%)`}
			</em>
		</footer>
	);
}
