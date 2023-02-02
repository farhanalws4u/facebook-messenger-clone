import "./App.css";
import react, { useEffect, useState } from "react";
import Message from "./Message";
import { FormControl, Input } from "@material-ui/core";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";
import Picker from "emoji-picker-react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [boolean, setBoolen] = useState(false);
  const [color, setColor] = useState("");
  const [rotateValue, setRotateValue] = useState(0);
  const [pickerDis, setPickerDis] = useState("none");

  const onEmojiClick = (event, emojiObject) => {
    event.preventDefault();
    setInput(input + emojiObject.emoji);
  };
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

  const emojiPopup = () => {
    boolean === false ? setBoolen(true) : setBoolen(false);
  };

  useEffect(() => {
    if (boolean) {
      setColor("secondary");
      setRotateValue(180);
      setPickerDis("");
    } else {
      setColor("");
      setRotateValue(0);
      setPickerDis("none");
    }
  }, [boolean]);

  return (
    <div className="App">
      <img
        className="app_logo"
        src="data:image/jpeg;base64,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"
      />
      <h1>Facebook Messenger Clone </h1>
      <h2>Welcome {username}</h2>

      <form className="app_form">
        <Picker
          className="emoji-picker-react"
          // pickerStyle={boolean ? { display: "" } : { display: "none" }}
          pickerStyle={{
            display: `${pickerDis}`,
          }}
          onEmojiClick={onEmojiClick}
        />

        <FormControl className="app_formControl">
          <IconButton className="app_addCircleIcon">
            <AddCircleIcon color="primary" />
          </IconButton>
          <IconButton className="app_EmojiEmotionIcon" onClick={emojiPopup}>
            <EmojiEmotionsIcon
              color={color}
              style={{
                transform: `rotate(${rotateValue}deg)`,
                transition: "ease .15s",
              }}
            />
          </IconButton>
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
    </div>

    //  when we put somthing inside the form and crate a submit button, then on pressing the enter the submit button works. and we will prevent the page to refresh.
  );
}

export default App;
