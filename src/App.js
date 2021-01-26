import "./App.css";
import react, { useEffect, useState } from "react";
import Message from "./Message";
import { Button, FormControl, InputLabel, Input } from "@material-ui/core";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessage] = useState([
    { username: "farhan", text: "hey there" },
    { username: "owaish", text: "hamto lullu hai." },
  ]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(prompt("please enter your name"));
  }, []); // if [] is blank when the app component loads. but if we type [input] then every sigle type the input changes the code runs inside the useEffect.

  const sendMessage = (event) => {
    // all logics to send message goes here..
    event.preventDefault();
    setMessage([...messages, { username: username, text: input }]);
    setInput("");
  };

  return (
    <div className="App">
      <h1>Facebook Messenger Clone </h1>

      <form>
        <FormControl>
          <InputLabel>Enter a message</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <Button
            variant="contained"
            disabled={!input}
            color="primary"
            type="submit"
            onClick={sendMessage}
          >
            Send Message
          </Button>
        </FormControl>
      </form>

      {messages.map((message) => (
        <Message username={username} message={message} />
      ))}
    </div> //  when we put somthing inside the form and crate a submit button, then on pressing the enter the submit button works. and we will prevent the page to refresh.
  );
}

export default App;
