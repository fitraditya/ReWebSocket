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
      interval: 5000,
      maxAttempts: 0,
      useOfflinejs: false
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

      if ((self.options.maxAttempts > 0) && (attempt >= self.options.maxAttempts)) {
        console.error('Maximum reconnect attempts reached.');
        destroy();
        return;
      } else {
        if (self.options.debug) {
          console.warn('Reconnecting, attempt ' + attempt);
          self.onreopen();
        }
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
      };
    };

    self.open(self.attempt);

    // Offline.js option
    if (self.options.useOfflinejs) {
      if (!('Offline' in window)) {
        console.error('Your have to manually include offline.js in your application.');
      } else {
        self.Offline = Offline;

        Offline.on('down', function() {
          if (ws && (ws.readyState !== WebSocket.CLOSING || ws.readyState !== WebSocket.CLOSED)) {
            ws.close();
          }
        });
      }
    }

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
      self.onstop();
    }

    // Public method
    self.send = function(data) {
      if (ws) {
        ws.send(data);
      } else {
        console.error('Invalid WebSocket state while sending data.');
      }
    };

    self.close = function() {
      if (ws) {
        self.closed = true;
        ws.close();
      } else {
        console.error('Invalid WebSocket state while closing connection.');
      }
    };
  }

  // Websocket listener
  ReWebSocket.prototype.onopen = function(event) {};
  ReWebSocket.prototype.onclose = function(event) {};
  ReWebSocket.prototype.onconnecting = function(event) {};
  ReWebSocket.prototype.onmessage = function(event) {};
  ReWebSocket.prototype.onerror = function(event) {};

  // Additional listener
  ReWebSocket.prototype.onreopen = function(event) {};
  ReWebSocket.prototype.onstop = function(event) {};

  return ReWebSocket;
});
