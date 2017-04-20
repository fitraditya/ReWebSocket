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
})
