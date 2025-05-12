const express = require("express")
const app = express()
const mongoose = require("mongoose")
const passport = require("passport")
const session = require("express-session")
const MongoStore = require("connect-mongo")(session)
const methodOverride = require("method-override")
const flash = require("express-flash")
const logger = require("morgan")
const connectDB = require("./config/database")
const mainRoutes = require("./routes/main")
const postRoutes = require("./routes/posts")
const commentRoutes = require("./routes/comment")
const image = require('image-js')
const http = require('http');
const socketIO = require('socket.io');

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

//Connect To Database from config/database.js
connectDB();

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes)
app.use("/post", postRoutes) //every postRoutes has /post infront of the request
app.use("/comment", commentRoutes) //tells us which route to use for specific request -> refer to top with require

const server = http.createServer(app);
const io = socketIO(server);
const Message = require('./models/Message');

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Listen for incoming chat messages
  socket.on('chat message', async (data) => {
    console.log('Received message:', data);

    // Save the message to MongoDB
    const createMessage = new Message({ user: data.user, message: data.message });
    await createMessage.save()
    .then(async (message) => {
      // Broadcast the message to all connected clients\
      const newMessage = await Message.findById(message.id).populate("user")
      data.user = newMessage.user // grabbing the full user object and connecting them
      io.emit('chat message', data);
    })
  });

  // Listen for user disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

//Server Running
server.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}, you better catch it!`);
});