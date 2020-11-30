"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SSPRServerProvider = SSPRServerProvider;
exports.SSPRClientProvider = SSPRClientProvider;

var _react = _interopRequireDefault(require("react"));

var _Context = require("./Context");

var _Cache = require("./Cache");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function SSPRServerProvider(_ref) {
  var props = _extends({}, _ref);

  return /*#__PURE__*/_react["default"].createElement(_Context.SSPRDataProvider, _extends({
    context: _Cache.cache.getCache(),
    currentRender: _Cache.cache.getCurrentRender()
  }, props));
}

function SSPRClientProvider(props) {
  // eslint-disable-next-line no-underscore-dangle
  var SSPRInitialData = typeof window !== 'undefined' ? window._SSPR_DATA_ : {};
  return /*#__PURE__*/_react["default"].createElement(_Context.SSPRDataProvider, _extends({
    context: SSPRInitialData
  }, props));
}