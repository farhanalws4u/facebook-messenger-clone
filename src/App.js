import "./App.css";
import react, { useEffect, useState } from "react";
import Message from "./Message";
import { Button, FormControl, InputLabel, Input } from "@material-ui/core";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(prompt("please enter your name"));
  }, []); // if [] is blank when the app component loads. but if we type [input] then every sigle type the input changes the code runs inside the useEffect.

  useEffect(() => {
    // for reading the messages from the database.
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapShot) => {
        setMessages(
          snapShot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  const sendMessage = (event) => {
    // all logics to send message goes here..
    event.preventDefault();
    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(), // it will use automatically everyone's timezone .
    });
    setInput("");
  };

  return (
    <div className="App">
      <img
        className="app_logo"
        src="https://scontent.fpat1-1.fna.fbcdn.net/v/t39.8562-6/120009688_325579128711709_1736249742330805861_n.png?_nc_cat=1&ccb=2&_nc_sid=6825c5&_nc_ohc=IhSl_p2ITbcAX_fXKEk&_nc_ht=scontent.fpat1-1.fna&oh=941d2b86e8728dfdf4228727ca70f3d3&oe=603625FD"
      />
      <h1>Facebook Messenger Clone </h1>
      <h2>Welcome {username}</h2>

      <form className="app_form">
        <FormControl className="app_formControl">
          <Input
            className="app_input"
            placeholder="Enter a message..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />

          <IconButton
            className="app_iconButton"
            variant="contained"
            disabled={!input}
            color="primary"
            type="submit"
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

      <FlipMove>
        {messages.map(({ message, id }) => (
          <Message key={id} username={username} message={message} />
        ))}
      </FlipMove>
    </div> //  when we put somthing inside the form and crate a submit button, then on pressing the enter the submit button works. and we will prevent the page to refresh.
  );
}

export default App;
