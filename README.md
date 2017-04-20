ReWebSocket
===========
A simple JavaScript WebSocket API wrapper with automatic reconnect function if the connection is down.

ReWebSocket is fully API compatible. You just need to replace
```javascript
var ws = new WebSocket();
```
with
```javascript
var ws = new ReWebSocket();
```

Installation
------------
Include the javascript, and you're done!
```html
<script src="rewebsocket.js"></script>
```

Initialization
--------------
```javascript
var ws = new ReWebSocket(url, protocol, options);
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
- Whether to implement automatic reconnect if the connection is down.
- Boolean. Default: `true`

#### `interval`
- The number of milliseconds to delay before attempting to reconnect.
- Integer. Default: `2000`

#### `maxAttempts`
- The number of maximum reconnection attempts that will be made before giving up.
- Integer. Default: `0` (`0` = unlimited)

#### `useOfflinejs`
Each browsers has its own behaviour to handle WebSocket `onclose` event. Some of them take a long time (or even never) to trigger `onclose` event since the connection was down.

- Whether to use Offline.js to monitor connection status.
- Boolean. Default: `false`

Methods
------
ReWebSocket has similar methods to WebSocket.
- `send()`
- `close()`

Events
------
ReWebSocket has similar events to WebSocket.
- `onopen`
- `onmessage`
- `onerror`
- `onclose`


