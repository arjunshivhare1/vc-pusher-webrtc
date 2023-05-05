const express = require("express");
const bodyParser = require("body-parser");
const Pusher = require("pusher");
const app = express();

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Session middleware

// Create an instance of Pusher
const pusher = new Pusher({
  app_id: "1594556",
  key: "bd76e8898f5b0bae7a64",
  secret: "24260ca0dc4121509eed",
  cluster: "ap2",
  encrypted: true,
});

app.get("/", (req, res) => {
  return res.sendFile(__dirname + "/index.html");
});

//listen on the app
app.listen(3000, () => {
  return console.log("Server is up on 3000");
});

// get authentictation for the channel;
app.post("/pusher/auth", (req, res) => {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  var presenceData = {
    user_id: Math.random().toString(36).slice(2) + Date.now(),
  };
  const auth = pusher.authenticate(socketId, channel, presenceData);
  res.send(auth);
});
