"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeExternalDataCache = makeExternalDataCache;

var _isomorphicFetch = _interopRequireDefault(require("isomorphic-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getServerSideData = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(urls) {
    var dataUrls, _iterator, _step, url, usableURL, processURL, ret, data;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dataUrls = {}; // eslint-disable-next-line no-restricted-syntax

            _iterator = _createForOfIteratorHelper(urls);
            _context.prev = 2;

            _iterator.s();

          case 4:
            if ((_step = _iterator.n()).done) {
              _context.next = 23;
              break;
            }

            url = _step.value;
            usableURL = url;
            processURL = null;

            if (url.url && url.processURL) {
              usableURL = url.url;
              processURL = url.processURL;
            }

            ret = {}; // eslint-disable-next-line no-await-in-loop

            _context.next = 12;
            return (0, _isomorphicFetch["default"])(usableURL).then(function (r) {
              return r.json();
            })["catch"](function (err) {
              throw new Error(err);
            });

          case 12:
            data = _context.sent;

            if (!processURL) {
              _context.next = 19;
              break;
            }

            _context.next = 16;
            return processURL(data);

          case 16:
            ret = _context.sent;
            _context.next = 20;
            break;

          case 19:
            ret[url] = data;

          case 20:
            dataUrls = _objectSpread(_objectSpread({}, dataUrls), ret);

          case 21:
            _context.next = 4;
            break;

          case 23:
            _context.next = 28;
            break;

          case 25:
            _context.prev = 25;
            _context.t0 = _context["catch"](2);

            _iterator.e(_context.t0);

          case 28:
            _context.prev = 28;

            _iterator.f();

            return _context.finish(28);

          case 31:
            return _context.abrupt("return", dataUrls);

          case 32:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 25, 28, 31]]);
  }));

  return function getServerSideData(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Fetch and process data from external sources for caching purposes
 * @returns {Promise<{}>}
 */


var resolveUrls = function resolveUrls(urls) {
  return getServerSideData(urls);
};
/**
 * Holds the server-side data cache
 */


function makeExternalDataCache(urls) {
  var cache = {};
  /**
     * used to pass data from react to server then to client
     * @type {{}}
     */

  var currentRender = {};

  var _fetch = function _fetch() {
    resolveUrls(urls).then(function (d) {
      cache = d;
    });
  };

  var resetCurrentRender = function resetCurrentRender() {
    currentRender = {};
  };
  /**
     * the currentRender is reset after being read
     * @returns {{}}
     */


  var renderStaticSSPR = function renderStaticSSPR() {
    var returnableRender = _objectSpread({}, currentRender);

    resetCurrentRender();
    return "<script>window._SSPR_DATA_=".concat(JSON.stringify(returnableRender), "</script>");
  };

  var getCache = function getCache() {
    return cache;
  };

  var getCurrentRender = function getCurrentRender() {
    return currentRender;
  };

  var refresh = function refresh() {
    _fetch();
  };

  _fetch();

  return {
    renderStaticSSPR: renderStaticSSPR,
    getCache: getCache,
    getCurrentRender: getCurrentRender,
    refresh: refresh
  };
}