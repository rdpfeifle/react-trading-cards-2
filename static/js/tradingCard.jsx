function TradingCard(props) {
  return (
    <div className="card">
      <p>Name: {props.name}</p>
      <img src={props.imgUrl} alt="profile" />
      <p>Skill: {props.skill} </p>
    </div>
  );
}

function TradingCardContainer() {
  const [cards, setCards] = React.useState([]);

  function addCard(newCard) {
    const currentCards = [...cards];
    setCards([...currentCards, newCard]);
  }

  React.useEffect(() => {
    fetch("/cards.json")
      .then((response) => response.json())
      .then((data) => setCards(data.cards));
  }, []);

  const tradingCards = [];

  for (const currentCard of cards) {
    tradingCards.push(
      <TradingCard
        key={currentCard.name}
        name={currentCard.name}
        skill={currentCard.skill}
        imgUrl={currentCard.imgUrl}
      />
    );
  }

  return (
    <React.Fragment>
      <AddTradingCard />
      <h2>Trading Cards</h2>
      <div className="grid">{tradingCards}</div>
    </React.Fragment>
  );
}
ReactDOM.render(<TradingCardContainer />, document.getElementById("container"));

function AddTradingCard() {
  const [name, setName] = React.useState("");
  const [skill, setSkill] = React.useState("");

  function addNewCard() {
    fetch("/add-card", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // this could also be written as body: JSON.stringify({ name, skill }) with
      // JS object property value shorthand
      body: JSON.stringify({ name: name, skill: skill }),
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        // use AJAX here to "addCard"
        //alert(`Card added! Response: ${jsonResponse}`);
      });
  }
  return (
    <React.Fragment>
      <h2>Add New Trading Card</h2>
      <label htmlFor="nameInput">Name</label>
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        id="nameInput"
        style={{ marginLeft: "5px" }}
      ></input>
      <label
        htmlFor="skillInput"
        style={{ marginLeft: "10px", marginRight: "5px" }}
      >
        Skill
      </label>
      <input
        value={skill}
        onChange={(event) => setSkill(event.target.value)}
        id="skillInput"
      ></input>
      <button style={{ marginLeft: "10px" }} onClick={addNewCard}>
        Add
      </button>
    </React.Fragment>
  );
}
