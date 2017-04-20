'use strict';

(function(global, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module !== 'undefined' && module.exports){
    module.exports = factory();
  } else {
    global.ReWebSocket = factory();
  }
})(this, function() {
  if (!('WebSocket' in window)) {
    console.error('Your browser doesn\'t support WebSocket.');
    return;
  }

  // ReWebSocket object
  function ReWebSocket(url, protocol, options) {
    var defaultOptions = {
      debug: false,
      reconnect: true,
      interval: 1500,
      maxAttempts: 0
    }

    if (typeof options === 'undefined') {
      options = {};
    }

    // Override default options
    for (var key in defaultOptions) {
      if (!options.hasOwnProperty(key)) {
        options[key] = defaultOptions[key];
      }
    }

    // Override given protocol
    if (protocol !== null) {
      if (typeof protocol === 'string') {
        protocol = [protocol];
      }
    }

    var self = this;

    self.url = url;
    self.protocol = protocol;
    self.options = options;
    self.readyState = 0;

    self.attempt = 0;
    self.closed = false;
    self.timeoutInterval = null;

    // Open websocket connection
    var ws = null;

    self.open = function(attempt) {
      ws = null;

      if (self.protocol) {
        ws = new WebSocket(self.url, self.protocol);
      } else {
        ws = new WebSocket(self.url);
      }

      if ((self.options.maxAttempts > 0) && (attempt > self.options.maxAttempts)) {
        console.error('Maximum reconnect attempts reached.');
        destroy();
        return;
      }

      self.attempt++;

      ws.onopen = function(event) {
        getReadyState()
        self.attempt = 0;
        self.onopen(event);
      };

      ws.onmessage = function(event) {
        getReadyState()
        self.onmessage(event);
      };

      ws.onclose = function(event) {
        console.log('close');
        getReadyState()

        ws = null;

        if (!self.options.reconnect) {
          self.closed = true;
        }

        if (self.closed) {
          self.onclose(event);
          destroy();
        } else {
          if (self.options.debug) {
            console.warn('WebSocket connection closed. Reconnecting.');
          }

          setTimeout(function() {
            self.open(self.attempt);
          }, self.options.interval);
        }
      };

      ws.onerror = function(event) {
        getReadyState()
        self.onerror(event);
        destroy();
      };
    };

    self.open(self.attempt);

    // Self method
    function getReadyState() {
      if (ws) {
        self.readyState = ws.readyState;
      } else {
        self.readyState = 0;
      }
    }

    function destroy() {
      self.attempt = 0;
      self.closed = false;
    }

    self.send = function(data) {
      if (ws) {
        ws.send(data);
      } else {
        console.error('Invalid WebSocket state. Please open WebSocket connection first.');
      }
    };
  }

  // Websocket state
  ReWebSocket.CONNECTING = WebSocket.CONNECTING;
  ReWebSocket.OPEN = WebSocket.OPEN;
  ReWebSocket.CLOSING = WebSocket.CLOSING;
  ReWebSocket.CLOSED = WebSocket.CLOSED;

  // Websocket listener
  ReWebSocket.prototype.onopen = function(event) {};
  ReWebSocket.prototype.onclose = function(event) {};
  ReWebSocket.prototype.onconnecting = function(event) {};
  ReWebSocket.prototype.onmessage = function(event) {};
  ReWebSocket.prototype.onerror = function(event) {};

  return ReWebSocket;
});
