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
Object.defineProperty(exports, "makeExternalDataCache", {
  enumerable: true,
  get: function get() {
    return _Cache.makeExternalDataCache;
  }
});

var _Providers = require("./Providers");

var _useSSPR = _interopRequireDefault(require("./useSSPR"));

var _Cache = require("./Cache");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }