import "./App.css";
import react, { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessage] = useState([]);

  console.log(input);
  console.log(messages);

  const sendMessage = (event) => {
    // all logic to send message goes here..
    event.preventDefault();
    setMessage([...messages, input]);
    setInput("");
  };

  return (
    <div className="App">
      <h1>This is a Facebook Messenger Clone </h1>

      <form>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />

        <Button
          variant="contained"
          disabled={!input}
          type="submit"
          onClick={sendMessage}
        >
          Send Message
        </Button>
      </form>

      {messages.map((message) => (
        <p>{message}</p>
      ))}
    </div> //  when we put somthing inside the form and crate a submit button, then on pressing the enter the submit button works. and we will prevent the page to refresh.
  );
}

export default App;
