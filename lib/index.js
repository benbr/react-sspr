"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "SSPRServerProvider", {
  enumerable: true,
  get: function get() {
    return _Providers.SSPRServerProvider;
  }
});
Object.defineProperty(exports, "SSPRClientProvider", {
  enumerable: true,
  get: function get() {
    return _Providers.SSPRClientProvider;
  }
});
Object.defineProperty(exports, "useSSPR", {
  enumerable: true,
  get: function get() {
    return _useSSPR["default"];
  }
});
Object.defineProperty(exports, "renderStaticSSPR", {
  enumerable: true,
  get: function get() {
    return _Cache.renderStaticSSPR;
  }
});
Object.defineProperty(exports, "addURL", {
  enumerable: true,
  get: function get() {
    return _Cache.addURL;
  }
});
Object.defineProperty(exports, "refreshSSPRCache", {
  enumerable: true,
  get: function get() {
    return _Cache.refreshSSPRCache;
  }
});
Object.defineProperty(exports, "getCache", {
  enumerable: true,
  get: function get() {
    return _Cache.getCache;
  }
});

var _Providers = require("./Providers");

var _useSSPR = _interopRequireDefault(require("./useSSPR"));

var _Cache = require("./Cache");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }