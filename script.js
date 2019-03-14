/* Initialize Firebase */
firebase.initializeApp({
  /* Fill in the following values based on your config. */
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
});

firebase.firestore().settings({
  timestampsInSnapshots: true
});

/* Define firebase refs */
const messagesRef = firebase.firestore().collection("messages");

/* Define DOM elements */
const messageInputDOM = document.getElementById("messageInput");
const namePickerDOM= document.getElementById("namePicker");
const messagesDOM = document.getElementById("messages");

/* Define global variables */
const sessionId = btoa(Math.random()).substring(0, 16);
let userName;

/* Define helper functions */
const scrollToBottom = (element) => {
  if (element) element.scrollTop = element.scrollHeight;
};

const createParagraph = (content) => {
  const newParagraph = document.createElement("p");

  if (content) {
    const contentEl = document.createTextNode(content);
    newParagraph.appendChild(contentEl);
  }

  return newParagraph;
};

const sendMessage = (message) => {
  messagesRef.add({
    message,
    time: firebase.firestore.Timestamp.now(),
    session: sessionId,
    name: userName || "Anonymous",
  });
};

const sendImage = (image) => {
  messagesRef.add({
    image,
    time: firebase.firestore.Timestamp.now(),
    session: sessionId,
    name: userName || "Anonymous",
  });
};

/* Setup message listener */
messagesRef.orderBy("time").onSnapshot((snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      const { session, name, image, message, time } = change.doc.data();

      const messageEl = document.createElement("div");
      messageEl.className = `message${session === sessionId ? " own" : ""}`;

      const nameEl = createParagraph(name);
      nameEl.className = "name";
      messageEl.appendChild(nameEl);

      const messageContentEl = document.createElement("div");
      messageContentEl.className = "messageContent";

      if (change.doc.data().image !== undefined) {
        const imageEl = document.createElement("img");
        imageEl.className = "image";
        imageEl.setAttribute("src", image);
        imageEl.setAttribute("height", "256px");
        messageContentEl.appendChild(imageEl);
      }

      if (change.doc.data().message !== undefined) {
        const msgTextEl = createParagraph(message);
        messageContentEl.appendChild(msgTextEl);
      }

      messageEl.appendChild(messageContentEl);

      var timestampEl = createParagraph(time.toDate());
      timestampEl.className = "timestamp";
      messageEl.appendChild(timestampEl);
      
      messagesDOM.appendChild(messageEl);
    }
  });

  scrollToBottom(messagesDOM);
});

/* Setup event listeners */
namePickerDOM.addEventListener("click", () => {
  userName = prompt("What's your name?").substring(0, 16);
  namePickerDOM.parentNode.removeChild(namePickerDOM);
});

messageInputDOM.addEventListener("keydown", (event) => {
  if (event.which === 13 || event.keyCode === 13) {
    sendMessage(messageInputDOM.value);
    messageInputDOM.value = "";
  }
});

/* Setup Bitmoji Kit Web here */