import React from "react";
import Checkbox from "../Checkbox/Checkbox";
import { status } from "../../store/status";

export default function CheckboxList(props) {
	const { items, compute } = props;

	return (
		<ul>
			{Object.values(items).map((item) => {
				let childList = null;
				if (Object.values(item.children).length > 0) {
					childList = <CheckboxList items={item.children} compute={compute} />;
				}
				return (
					<li key={item.id}>
						<Checkbox
							id={item.id}
							name={item.name}
							checked={item.status === status.checked}
							indeterminate={item.status === status.indeterminate}
							compute={compute}
						/>
						<label htmlFor={item.name}>{item.name}</label>
						{childList}
					</li>
				);
			})}
		</ul>
	);
}
