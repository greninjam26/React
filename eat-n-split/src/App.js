import { useState } from "react";

const initialFriends = [
	{
		id: 118836,
		name: "Clark",
		image: "https://i.pravatar.cc/48?u=118836",
		balance: -7,
	},
	{
		id: 933372,
		name: "Sarah",
		image: "https://i.pravatar.cc/48?u=933372",
		balance: 20,
	},
	{
		id: 499476,
		name: "Anthony",
		image: "https://i.pravatar.cc/48?u=499476",
		balance: 0,
	},
];

function Button({ children, onClick }) {
	return (
		<button onClick={onClick} className="button">
			{children}
		</button>
	);
}

export default function App() {
	const [addingFriend, setAddingFriend] = useState(false);
	const [friends, setFriends] = useState([]);
	const [selectedFriend, setSelectedFriend] = useState(null);

	function handleShowAddFriend() {
		setAddingFriend(addingFriend => !addingFriend);
		setSelectedFriend(null);
	}

	function handleAddFriend(friend) {
		setAddingFriend(false);
		setFriends(friends => [...friends, friend]);
	}

	function handleSelectFriend(friend) {
		setAddingFriend(false);
		// setSelectedFriend(friend);
		setSelectedFriend(selected => (selected?.id === friend.id ? null : friend));
	}

	function handleUpdateFriend(expense) {
		setFriends(friends =>
			friends.map(friend =>
				friend.id === selectedFriend.id
					? {
							...friend,
							balance: friend.balance + expense,
					  }
					: friend
			)
		);
		setSelectedFriend(null);
	}

	return (
		<div className="app">
			<div className="sidebar">
				<FriendsList
					friends={friends}
					onSelectFriend={handleSelectFriend}
					selectedFriend={selectedFriend}
				/>

				{addingFriend && <FormAddFriend onAddFriend={handleAddFriend} />}

				<Button onClick={handleShowAddFriend}>
					{addingFriend ? "Close" : "Add Friend"}
				</Button>
			</div>
			{selectedFriend && (
				<FormSplitBill
					friend={selectedFriend}
					onUpdateFriend={handleUpdateFriend}
				/>
			)}
		</div>
	);
}

function FriendsList({ friends, onSelectFriend, selectedFriend }) {
	return (
		<ul>
			{friends.map(friend => (
				<Friend
					friend={friend}
					key={friend.id}
					onSelectFriend={onSelectFriend}
					selectedFriend={selectedFriend}
				/>
			))}
		</ul>
	);
}

function Friend({ friend, onSelectFriend, selectedFriend }) {
	const isSelected = selectedFriend?.id === friend.id;
	return (
		<li className={isSelected ? "selected" : null}>
			<img src={friend.image} alt={friend.name} />
			<h3>{friend.name}</h3>
			{friend.balance === 0 && <p>You and {friend.name} are even</p>}
			{friend.balance > 0 && (
				<p className="green">
					{friend.name} owes you ${friend.balance}
				</p>
			)}
			{friend.balance < 0 && (
				<p className="red">
					You owe {friend.name} ${Math.abs(friend.balance)}
				</p>
			)}
			<Button onClick={() => onSelectFriend(friend)}>
				{isSelected ? "Close" : "Select"}
			</Button>
		</li>
	);
}

function FormAddFriend({ onAddFriend }) {
	const [friendName, setFriendName] = useState("");
	const [imageURL, setImageURL] = useState("");
	function handleClickAddFriend(e) {
		e.preventDefault();
		if (!friendName || !imageURL) return;
		onAddFriend({
			id: crypto.randomUUID(),
			name: friendName,
			image: imageURL,
			balance: 0,
		});
	}
	return (
		<form className="form-add-friend" onSubmit={e => handleClickAddFriend(e)}>
			<label>👯 Friend Name</label>
			<input
				type="text"
				value={friendName}
				onChange={e => setFriendName(e.target.value)}
			/>

			<label>🌄 Image URL</label>
			<input
				type="text"
				value={imageURL}
				onChange={e => setImageURL(e.target.value)}
			/>

			<Button>Add</Button>
		</form>
	);
}

function FormSplitBill({ friend, onUpdateFriend }) {
	const [bill, setBill] = useState(0);
	const [myBill, setMyBill] = useState(0);
	const [whoPaid, setWhoPaid] = useState("You");

	function handleSubmit(e) {
		e.preventDefault();
		if (!bill) return;
		onUpdateFriend((whoPaid === "You" ? bill : 0) - myBill);
	}

	return (
		<form className="form-split-bill" onSubmit={e => handleSubmit(e)}>
			<h2>Split a bill with {friend.name}</h2>

			<label>💰 Bill Value</label>
			<input
				type="text"
				value={bill}
				onChange={e => setBill(Number(e.target.value))}
			/>

			<label>🤑 your expense</label>
			<input
				type="text"
				value={myBill}
				onChange={e =>
					setMyBill(
						Number(e.target.value) > bill ? myBill : Number(e.target.value)
					)
				}
			/>

			<label>👯 {friend.name}'s expense</label>
			<input type="text" disabled value={bill - myBill} />

			<label>💵 Who is paying the bill</label>
			<select value={whoPaid} onChange={e => setWhoPaid(e.target.value)}>
				<option value="user">You</option>
				<option value="friend">{friend.name}</option>
			</select>

			<Button>Split Bill</Button>
		</form>
	);
}
