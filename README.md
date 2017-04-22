ReWebSocket
===========
A simple JavaScript WebSocket API wrapper with automatic reconnect function if the connection was down.

ReWebSocket is fully API compatible. You just need to replace
```javascript
var ws = new WebSocket(url, protocols);
```
with
```javascript
var ws = new ReWebSocket(url, protocols, options);
```

Installation
------------
Include the javascript, and you're done!
```html
<script src="rewebsocket.min.js"></script>
```

Initialization
--------------
```javascript
var ws = new ReWebSocket(url, protocols, options);
```

#### `url`
- The URL to which to connect

#### `protocols` (optional)
- Either a single protocol string or an array of protocol strings. These strings are used to indicate WebSocket sub-protocols.

#### `options` (optional)
- Options (see below)

Options
-------
#### `debug`
- Whether to log debug messages. Debug messages are printed using `console.debug()`.
- Boolean. Default: `false`

#### `reconnect`
- Whether to implement automatic reconnect if the connection was down.
- Boolean. Default: `true`

#### `interval`
- The number of milliseconds to delay before attempting to reconnect.
- Integer. Default: `5000`

#### `maxAttempts`
- The number of maximum reconnection attempts that will be made before giving up.
- Integer. Default: `0` (`0` = unlimited)

#### `useOfflinejs`
Each browsers has its own behaviour to handle WebSocket `onclose` event. Some of them take a long time (or even never) to trigger `onclose` event since the connection was down.

- Whether to use Offline.js to monitor connection status.
- Boolean. Default: `false`

Properties
------
ReWebSocket has similar properties to WebSocket.
- `readyState`
- `binaryType`

Methods
------
ReWebSocket has similar methods to WebSocket.
- `send()`
- `close()`

Additional methods:
- `open()`: Manually open WebSocket connection if the connection has fully closed.

Events
------
ReWebSocket has similar events to WebSocket.
- `onopen`
- `onmessage`
- `onerror`
- `onclose`

Additional events:
- `onreopen`: Triggered when trying to reopen WebSocket connection if the maximum reconnection attempts has not reached yet.
- `onstop`: Triggered when user manually close the WebSocket connection, or maximum reconnection attempts has reached.

Example
-------
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

Documentation
-------------
See the documentation [here](https://github.com/fitraditya/ReWebSocket/tree/master/docs).
