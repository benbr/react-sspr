"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cache = exports.refreshSSPRCache = exports.addURL = exports.renderStaticSSPR = exports.getCache = void 0;

var _isomorphicFetch = _interopRequireDefault(require("isomorphic-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getData = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
    var data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _isomorphicFetch["default"])(url).then(function (r) {
              return r.json();
            })["catch"](function (err) {
              console.log("Error fetching sspr data for ".concat(url, " : ").concat(err));
            });

          case 2:
            data = _context.sent;
            return _context.abrupt("return", data);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getData(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Holds the server-side data cache
 */


function makeExternalDataCache() {
  var cache = {};
  var dataSources = [];
  /**
     * used to pass data from react to server then to client
     * @type {{}}
     */

  var currentRender = {};

  var processData = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url) {
      var processURL,
          data,
          processedData,
          _args2 = arguments;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              processURL = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : false;
              _context2.next = 3;
              return getData(url);

            case 3:
              data = _context2.sent;

              if (processURL) {
                processedData = processURL(data);
                Object.keys(processedData).forEach(function (pURL) {
                  cache[pURL] = processedData[pURL];
                });
              } else {
                cache[url] = data;
              }

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function processData(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  var addURL = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(url) {
      var processURL,
          _args3 = arguments;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              processURL = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : false;
              dataSources.push({
                url: url,
                processURL: processURL
              });
              _context3.next = 4;
              return processData(url, processURL);

            case 4:
              cache[url] = _context3.sent;

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function addURL(_x3) {
      return _ref3.apply(this, arguments);
    };
  }();

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
    dataSources.forEach(function (source) {
      cache[source.url] = processData(source.url, source.processURL);
    });
  };

  return {
    renderStaticSSPR: renderStaticSSPR,
    getCache: getCache,
    getCurrentRender: getCurrentRender,
    refresh: refresh,
    addURL: addURL
  };
}

var cache = makeExternalDataCache();
exports.cache = cache;

var renderStaticSSPR = function renderStaticSSPR() {
  return cache.renderStaticSSPR();
};

exports.renderStaticSSPR = renderStaticSSPR;

var addURL = function addURL(url, process) {
  return cache.addURL(url, process);
};

exports.addURL = addURL;

var refreshSSPRCache = function refreshSSPRCache() {
  cache.refresh();
};

exports.refreshSSPRCache = refreshSSPRCache;
var getCache = cache.getCache;
exports.getCache = getCache;