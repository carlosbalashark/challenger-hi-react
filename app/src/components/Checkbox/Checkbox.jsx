import React, { useRef, useEffect } from "react";
import { status } from "../../store/status";

export default function Checkbox(props) {
	const { indeterminate, checked, id, compute, name, ...rest } = props;
	const inputRef = useRef(null);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.indeterminate = indeterminate;
			inputRef.current.checked = checked;
		}
	}, [indeterminate, checked]);

	return (
		<input
			{...rest}
			ref={inputRef}
			type="checkbox"
			id={name}
			name={name}
			onChange={() => {
				const newStatus = inputRef.current.checked
					? status.checked
					: status.unchecked;
				compute(id, newStatus);
			}}
		/>
	);
}