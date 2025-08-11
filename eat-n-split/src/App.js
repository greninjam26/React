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
	const [friendName, setFriendName] = useState("");
	const [imageURL, setImageURL] = useState("");
	const [splitingBill, setSplitingBill] = useState(false);
	const [friends, setFriends] = useState(initialFriends);
	const [selectedFriend, setSelectedFriend] = useState({});
	const [bill, setBill] = useState(0);
	const [myBill, setMyBill] = useState(0);
	const [whoPaid, setWhoPaid] = useState("You");

	function handleShowAddFriend() {
		setAddingFriend(addingFriend => !addingFriend);
	}

	function handleChangeFriendName(newName) {
		setFriendName(newName);
	}

	function handleChangeImageURL(newName) {
		setImageURL(newName);
	}

	function handleClickAddFriend(e) {
		e.preventDefault();
		setAddingFriend(false);
		setFriends(friends => [
			...friends,
			{ id: 2134, name: friendName, image: imageURL, balance: 0 },
		]);
		setFriendName("");
		setImageURL("");
	}

	function handleSelectFriend(friend) {
		setSplitingBill(true);
		setSelectedFriend(friend);
	}

	function handleSplitBill(e) {
		e.preventDefault();
		setFriends(friends => [
			...friends.filter(friend => friend.id !== selectedFriend.id),
			{
				id: selectedFriend.id,
				name: selectedFriend.name,
				image: selectedFriend.image,
				balance:
					selectedFriend.balance +
					(whoPaid === "You" ? 1 : -1) * (bill - myBill),
			},
		]);
		setBill(0);
		setMyBill(0);
		setWhoPaid("You");
		setSplitingBill(false);
	}

	return (
		<div className="app">
			<div className="sidebar">
				<FriendsList friends={friends} onSelectFriend={handleSelectFriend} />
				{addingFriend && (
					<FormAddFriend
						friendName={friendName}
						onChangeFriendName={handleChangeFriendName}
						imageURL={imageURL}
						onChangeImageURL={handleChangeImageURL}
						onClickAddFriend={handleClickAddFriend}
					/>
				)}
				<Button onClick={handleShowAddFriend}>
					{addingFriend ? "Close" : "Add Friend"}
				</Button>
			</div>
			{splitingBill && (
				<FormSplitBill
					friend={selectedFriend}
					onSplitBill={handleSplitBill}
					bill={bill}
					setBill={setBill}
					myBill={myBill}
					setMyBill={setMyBill}
					whoPaid={whoPaid}
					setWhoPaid={setWhoPaid}
				/>
			)}
		</div>
	);
}

function FriendsList({ friends, onSelectFriend }) {
	return (
		<ul>
			{friends.map(friend => (
				<Friend friend={friend} key={friend.id} onSelectFriend={onSelectFriend} />
			))}
		</ul>
	);
}

function Friend({ friend, onSelectFriend }) {
	return (
		<li>
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
			<Button onClick={() => onSelectFriend(friend)}>Select</Button>
		</li>
	);
}

function FormAddFriend({
	friendName,
	onChangeFriendName,
	imageURL,
	onChangeImageURL,
	onSubmit,
	onClickAddFriend,
}) {
	return (
		<form className="form-add-friend" onSubmit={onSubmit}>
			<label>👯 Friend Name</label>
			<input
				type="text"
				value={friendName}
				onChange={e => onChangeFriendName(e.target.value)}
			/>

			<label>🌄 Image URL</label>
			<input
				type="text"
				value={imageURL}
				onChange={e => onChangeImageURL(e.target.value)}
			/>

			<Button onClick={e => onClickAddFriend(e)}>Add</Button>
		</form>
	);
}

function FormSplitBill({
	friend,
	onSplitBill,
	bill,
	setBill,
	myBill,
	setMyBill,
	whoPaid,
	setWhoPaid,
}) {
	return (
		<form className="form-split-bill">
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
				onChange={e => setMyBill(Number(e.target.value))}
			/>

			<label>👯 {friend.name}'s expense</label>
			<input type="text" disabled value={bill - myBill} />

			<label>💵 Who is paying the bill</label>
			<select value={whoPaid} onChange={e => setWhoPaid(e.target.value)}>
				<option value="user">You</option>
				<option value="friend">{friend.name}</option>
			</select>

			<Button onClick={e => onSplitBill(e)}>Split Bill</Button>
		</form>
	);
}
