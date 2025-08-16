import { useEffect } from "react";

export function useKey(key, action) {
	useEffect(
		function () {
			function callBack(e) {
				if (e.key.toLowerCase() !== key.toLowerCase()) return;
				action();
			}
			document.addEventListener("keydown", callBack);
			return () => document.removeEventListener("keydown", callBack);
		},
		[key, action]
	);
}
