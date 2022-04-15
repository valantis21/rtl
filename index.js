const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 80;


app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html")
});

io.on('connection', (socket) => {
  socket.on('postit created', coords => {
    io.emit("create postit", coords)
  });
  socket.on("text changed", text => {
    socket.broadcast.emit("change text", text)
  });
  socket.on("close postit", id => {
    socket.broadcast.emit("close postit", id)
  });
  socket.on("window move", newPos => {
    socket.broadcast.emit("window move", newPos)
  })
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
