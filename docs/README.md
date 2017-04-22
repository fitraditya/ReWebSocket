ReWebSocket
===========
A simple JavaScript WebSocket API wrapper with automatic reconnect function if the connection is down.

Basic Configuration
-------------------
```html
<script src="rewebsocket.min.js"></script>
<script>
  var ws = new ReWebSocket('wss://rewebsocket.herokuapp.com');
  ws.onopen = function(event) {
    // do something
  }
  ws.onreopen = function(event) {
    // do something
  }
  ws.onmessage = function(event) {
    // do something
  }
  ws.onerror = function(event) {
    // do something
  }
  ws.onclose = function(event) {
    // do something
  }
  ws.onstop = function(event) {
    // do something
  }
</script>
```
