import React, { useState, useEffect } from "react";
import './App.css';
import CheckboxList from './components/CheckboxList/CheckboxList'
import { status } from './store/status'
import data from './data/data.json'

export default function App() {

	const [items, setItems] = useState(data);

	useEffect(() => {
		loadLocalStorage(Object.values(items));
		setItems(Object.values(items));
	}, []);

	const handleLocalStorage = (id, checkBoxStatus) => {
		switch (checkBoxStatus) {
			case status.checked:
				localStorage.setItem(id, checkBoxStatus)
				break;
			case status.unchecked:
				localStorage.removeItem(id)
				break;
		}
	}

	const loadLocalStorage = (root) => {

		let id;
		let items;

		if (root.children) {
			id = root.id;
			items = root.children;
		} else {
			items = root;
		}

		if (localStorage.getItem(id) === '1') {
			return setStatus(root, status.checked);
		}

		if (!items) {
			return root;
		} else {
			Object.values(items).forEach((item) => loadLocalStorage(item));
		}

		if (Object.values(items).length > 0) {
			root.status = computeStatus(items)
		}

	}

	const setStatus = (root, checkBoxStatus) => {

		let id;
		let items;

		if (root.children) {
			id = root.id;
			items = root.children;
		} else {
			items = root;
		}

		root.status = checkBoxStatus;

		handleLocalStorage(id, checkBoxStatus)

		if (!items) {
			return root;
		} else {
			Object.values(items).forEach((item) => setStatus(item, checkBoxStatus));
		}
	};


	const computeStatus = (items) => {

		let checked = 0;
		let indeterminate = 0;

		Object.values(items).forEach((item) => {
			if (item.status === status.checked) checked++;
			if (item.status === status.indeterminate) indeterminate++;
		});

		if (checked === Object.values(items).length) {
			return status.checked;
		} else if (checked > 0 || indeterminate > 0) {
			return status.indeterminate;
		}

	};

	const traverse = (root, checkboxId, checkBoxStatus) => {

		let id;
		let items;

		if (root.children) {
			id = root.id;
			items = root.children;
		} else {
			items = root;
		}

		if (id === checkboxId) {
			return setStatus(root, checkBoxStatus);
		}

		if (!items) {
			return root;
		} else {
			Object.values(items).forEach((item) => traverse(item, checkboxId, checkBoxStatus));
		}

		if (Object.values(items).length > 0) {
			root.status = computeStatus(items)
		}

	};

	const compute = (checkboxId, checkBoxStatus) => {
		traverse(Object.values(items), checkboxId, checkBoxStatus);
		setItems(Object.values(items));
	};

	return (
		<div className="App">
			<CheckboxList items={items} compute={compute} />
		</div>
	);
}
