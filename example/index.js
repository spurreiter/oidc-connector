/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/adapter/default.js":
/*!********************************!*\
  !*** ./src/adapter/default.js ***!
  \********************************/
/*! namespace exports */
/*! export Adapter [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Adapter": () => /* binding */ Adapter
/* harmony export */ });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Adapter = /*#__PURE__*/function () {
  function Adapter() {
    _classCallCheck(this, Adapter);
  }

  _createClass(Adapter, [{
    key: "initialize",
    value: function initialize(client) {
      this.client = client;
      this.endpoints = client.endpoints;
      this.options = client.options;
    }
  }, {
    key: "_isInitialized",
    value: function _isInitialized() {
      if (!this.options) throw new Error('adapter not initialized');
    }
  }, {
    key: "redirectUri",
    value: function redirectUri() {
      var url = new URL(location.href);
      url.search = url.hash = '';
      return this.options.redirectUri || url.toString();
    }
  }, {
    key: "login",
    value: function () {
      var _login = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(opts) {
        var url;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this._isInitialized();

                _context.next = 3;
                return this.endpoints.createLoginUrl(_objectSpread(_objectSpread({}, this.options), opts));

              case 3:
                url = _context.sent;
                window.location.replace(url);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function login(_x) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  }, {
    key: "register",
    value: function () {
      var _register = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var url;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this._isInitialized();

                _context2.next = 3;
                return this.endpoints.createRegisterUrl(this.options);

              case 3:
                url = _context2.sent;
                window.location.replace(url);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function register() {
        return _register.apply(this, arguments);
      }

      return register;
    }()
  }, {
    key: "logout",
    value: function () {
      var _logout = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref) {
        var idToken, url;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                idToken = _ref.idToken;

                this._isInitialized();

                _context3.next = 4;
                return this.endpoints.createLogoutUrl(this.options, {
                  idToken: idToken
                });

              case 4:
                url = _context3.sent;
                window.location.replace(url);

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function logout(_x2) {
        return _logout.apply(this, arguments);
      }

      return logout;
    }()
  }, {
    key: "account",
    value: function () {
      var _account = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var url;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this._isInitialized();

                _context4.next = 3;
                return this.endpoints.createAccountUrl(this.options);

              case 3:
                url = _context4.sent;

                if (!url) {
                  _context4.next = 8;
                  break;
                }

                window.location.href = url;
                _context4.next = 9;
                break;

              case 8:
                throw new Error('Not supported by the OIDC server');

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function account() {
        return _account.apply(this, arguments);
      }

      return account;
    }()
  }]);

  return Adapter;
}();

/***/ }),

/***/ "./src/client.js":
/*!***********************!*\
  !*** ./src/client.js ***!
  \***********************/
/*! namespace exports */
/*! export Client [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Client": () => /* binding */ Client
/* harmony export */ });
/* harmony import */ var _adapter_default_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./adapter/default.js */ "./src/adapter/default.js");
/* harmony import */ var _tokens_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tokens.js */ "./src/tokens.js");
/* harmony import */ var _endpoints_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./endpoints.js */ "./src/endpoints.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/index.js */ "./src/utils/initOptions.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/index.js */ "./src/utils/callback.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/index.js */ "./src/utils/createPromise.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/index.js */ "./src/utils/loadConfig.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/index.js */ "./src/utils/statusIframe.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils/index.js */ "./src/utils/get.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./utils/index.js */ "./src/utils/checkSilentLogin.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./utils/index.js */ "./src/utils/EventEmitter.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./utils/index.js */ "./src/utils/urls.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./constants.js */ "./src/constants.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
Copyright 2016 Red Hat, Inc. and/or its affiliates and other contributors.
Copyright 2020 spurreiter

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0
*/





var Client = /*#__PURE__*/function (_EventEmitter) {
  _inherits(Client, _EventEmitter);

  var _super = _createSuper(Client);

  function Client() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Client);

    _this = _super.call(this);
    _this.options = (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.initOptions)(options);
    _this.adapter = options.adapter || new _adapter_default_js__WEBPACK_IMPORTED_MODULE_1__.Adapter();
    _this.callback = new _utils_index_js__WEBPACK_IMPORTED_MODULE_2__.Callback(_this.options);
    _this.tokens = new _tokens_js__WEBPACK_IMPORTED_MODULE_3__.Tokens(_this.options);
    _this.debounce = (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_4__.debouncePromises)();
    _this.endpoints = null;
    _this.statusIframe = null; // try to load tokens

    _this.tokens.fromInitOptions(_this.options);

    return _this;
  }

  _createClass(Client, [{
    key: "init",
    value: function () {
      var _init = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var log, _yield$loadConfig, serverUrl, clientId, oidcConfig;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                log = this.options.log;
                _context.next = 4;
                return (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_5__.loadConfig)(this.options);

              case 4:
                _yield$loadConfig = _context.sent;
                serverUrl = _yield$loadConfig.serverUrl;
                clientId = _yield$loadConfig.clientId;
                oidcConfig = _yield$loadConfig.oidcConfig;
                this.options.clientId = clientId;
                this.endpoints = (0,_endpoints_js__WEBPACK_IMPORTED_MODULE_6__.endpoints)(serverUrl, oidcConfig, this.callback);
                this.statusIframe = new _utils_index_js__WEBPACK_IMPORTED_MODULE_7__.StatusIframe(this);
                this.adapter.initialize(this);
                this.options.redirectUri = this.adapter.redirectUri();
                log.info('oidcConfig loaded %o', oidcConfig);
                _context.next = 16;
                return this._processInit();

              case 16:
                this._schedule();

                return _context.abrupt("return", this._handleToken());

              case 20:
                _context.prev = 20;
                _context.t0 = _context["catch"](0);

                this._handleError(_context.t0);

                return _context.abrupt("return", Promise.reject(_context.t0));

              case 24:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 20]]);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "_processInit",
    value: function () {
      var _processInit2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var oauth, _this$tokens, token, refreshToken;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                oauth = this.callback.parse(window.location.href);

                if (!oauth) {
                  _context2.next = 7;
                  break;
                }

                window.history.replaceState(window.history.state, null, oauth.newUrl);

                if (!oauth.valid) {
                  _context2.next = 7;
                  break;
                }

                _context2.next = 6;
                return this.statusIframe.setup();

              case 6:
                return _context2.abrupt("return", this._processCallback(oauth));

              case 7:
                _this$tokens = this.tokens, token = _this$tokens.token, refreshToken = _this$tokens.refreshToken;

                if (!(token && refreshToken)) {
                  _context2.next = 10;
                  break;
                }

                return _context2.abrupt("return", this._processWithTokens());

              case 10:
                if (!this.options.forceLogin) {
                  _context2.next = 12;
                  break;
                }

                return _context2.abrupt("return", this.login());

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _processInit() {
        return _processInit2.apply(this, arguments);
      }

      return _processInit;
    }()
  }, {
    key: "_processWithTokens",
    value: function () {
      var _processWithTokens2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _this2 = this;

        var minValidity;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.statusIframe.schedule();

              case 2:
                // force refresh if status iframe is disabled
                minValidity = !this.statusIframe.enabled && -1;
                return _context3.abrupt("return", this._refresh(minValidity).then(function (tokens) {
                  return tokens || _this2.tokens.getTokens();
                }));

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _processWithTokens() {
        return _processWithTokens2.apply(this, arguments);
      }

      return _processWithTokens;
    }()
  }, {
    key: "_processCallback",
    value: function () {
      var _processCallback2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(oauth) {
        var _this$options, flow, clientId, code, error, err, query, url, res, tokenResponse, _error, _err;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _this$options = this.options, flow = _this$options.flow, clientId = _this$options.clientId;
                code = oauth.code, error = oauth.error;

                if (oauth.kc_action_status) {
                  this.emit('action', {
                    status: oauth.kc_action_status
                  });
                }

                if (!error) {
                  _context4.next = 7;
                  break;
                }

                err = new Error(error);
                err.description = oauth.error_description;
                return _context4.abrupt("return", Promise.reject(err));

              case 7:
                if (!(flow !== _constants_js__WEBPACK_IMPORTED_MODULE_8__.STANDARD && (oauth.access_token || oauth.id_token))) {
                  _context4.next = 9;
                  break;
                }

                return _context4.abrupt("return", this._authSuccess(oauth, oauth));

              case 9:
                if (!(flow !== _constants_js__WEBPACK_IMPORTED_MODULE_8__.IMPLICIT && code)) {
                  _context4.next = 29;
                  break;
                }

                query = {
                  code: code,
                  grant_type: 'authorization_code',
                  client_id: clientId,
                  redirect_uri: oauth.redirectUri
                };

                if (oauth.pkceCodeVerifier) {
                  query.code_verifier = oauth.pkceCodeVerifier;
                }

                url = this.endpoints.createTokenUrl();
                this.tokens.startTokenRequest();
                _context4.next = 16;
                return fetchToken(url, query);

              case 16:
                res = _context4.sent;

                if (!(res.status === 200)) {
                  _context4.next = 22;
                  break;
                }

                _context4.next = 20;
                return res.json();

              case 20:
                tokenResponse = _context4.sent;
                return _context4.abrupt("return", this._authSuccess(tokenResponse, oauth));

              case 22:
                _context4.next = 24;
                return res.json();

              case 24:
                _error = _context4.sent;
                _err = new Error((0,_utils_index_js__WEBPACK_IMPORTED_MODULE_9__.get)(_error, 'error', 'auth error'));
                _err.description = (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_9__.get)(_error, 'error_description');
                _err.status = res.status;
                return _context4.abrupt("return", Promise.reject(_err));

              case 29:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _processCallback(_x) {
        return _processCallback2.apply(this, arguments);
      }

      return _processCallback;
    }()
  }, {
    key: "_authSuccess",
    value: function () {
      var _authSuccess2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(tokenResponse, oauth) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.tokens.setTokens(tokenResponse);

                if (!this.tokens.isInvalidNonce(oauth.storedNonce)) {
                  _context5.next = 3;
                  break;
                }

                return _context5.abrupt("return", Promise.reject(new Error('invalid nonce')));

              case 3:
                _context5.next = 5;
                return this.statusIframe.schedule();

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function _authSuccess(_x2, _x3) {
        return _authSuccess2.apply(this, arguments);
      }

      return _authSuccess;
    }()
  }, {
    key: "_refresh",
    value: function () {
      var _refresh2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var minValidity,
            promise,
            _this$options2,
            log,
            clientId,
            tokens,
            needsRefresh,
            query,
            url,
            res,
            tokenResponse,
            err,
            _args6 = arguments;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                minValidity = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : this.options.minValidity;
                promise = (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_4__.createPromise)();
                _this$options2 = this.options, log = _this$options2.log, clientId = _this$options2.clientId;
                tokens = this.tokens;

                if (this.tokens.refreshToken) {
                  _context6.next = 7;
                  break;
                }

                promise.reject(new Error('no refresh token'));
                return _context6.abrupt("return", promise);

              case 7:
                needsRefresh = false;

                if (minValidity === -1) {
                  needsRefresh = true;
                  log.info('forced refresh');
                } else if (tokens.isTokenExpired(minValidity)) {
                  needsRefresh = true;
                  log.info('token expired');
                }

                if (needsRefresh) {
                  _context6.next = 14;
                  break;
                }

                log.info('token expires in %s seconds', this.tokens.expiresIn());
                promise.resolve();
                _context6.next = 35;
                break;

              case 14:
                if (!this.debounce.push(promise)) {
                  _context6.next = 35;
                  break;
                }

                query = {
                  grant_type: 'refresh_token',
                  refresh_token: tokens.refreshToken,
                  client_id: clientId
                };
                url = this.endpoints.createTokenUrl();
                this.tokens.startTokenRequest();
                _context6.next = 20;
                return fetchToken(url, query);

              case 20:
                res = _context6.sent;

                if (!(res.status === 200)) {
                  _context6.next = 32;
                  break;
                }

                log.info('token refreshed');
                _context6.next = 25;
                return res.json();

              case 25:
                tokenResponse = _context6.sent;
                this.tokens.setTokens(tokenResponse);
                _context6.next = 29;
                return this.statusIframe.schedule();

              case 29:
                this.debounce.resolveAll(this.tokens.getTokens());
                _context6.next = 35;
                break;

              case 32:
                if (res.status === 400) {
                  this._handleLogout();
                }

                err = new Error('refresh failed');
                this.debounce.rejectAll(err);

              case 35:
                return _context6.abrupt("return", promise);

              case 36:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function _refresh() {
        return _refresh2.apply(this, arguments);
      }

      return _refresh;
    }()
  }, {
    key: "_schedule",
    value: function _schedule() {
      var _this3 = this;

      var expiryInterval = this.options.expiryInterval;

      if (expiryInterval > 0 && !this._expiryTimerId && this.tokens.refreshToken) {
        this._expiryTimerId = setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
          return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  _this3._refresh().then(function (tokens) {
                    if (tokens) _this3.emit('token', tokens);
                    _this3._expiryTimerId = null;

                    _this3._schedule();
                  })["catch"](function (err) {
                    _this3._expiryTimerId = null;

                    _this3._handleLogout();

                    _this3._handleError(err);
                  });

                case 1:
                case "end":
                  return _context7.stop();
              }
            }
          }, _callee7);
        })), expiryInterval * 1000);
      }
    }
  }, {
    key: "_handleToken",
    value: function _handleToken() {
      var tokens = this.tokens.getTokens();
      this.emit('token', tokens);
      return tokens;
    }
  }, {
    key: "_handleError",
    value: function _handleError(err) {
      var log = this.options.log;
      log.error(err.message);
      this.emit('error', err);
    }
  }, {
    key: "_handleLogout",
    value: function _handleLogout() {
      var _this4 = this;

      var forceLogout = this.options.forceLogout;
      this.tokens.clearTokens();
      this.emit('logout');

      if (forceLogout) {
        this.logout()["catch"](function (err) {
          return _this4._handleError(err);
        });
      }
    }
  }, {
    key: "getTokens",
    value: function getTokens() {
      return this.tokens.getTokens();
    }
  }, {
    key: "bearerToken",
    value: function () {
      var _bearerToken = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var _this$tokens2, token, refreshToken, isExpired;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _this$tokens2 = this.tokens, token = _this$tokens2.token, refreshToken = _this$tokens2.refreshToken;
                isExpired = this.tokens.isTokenExpired();

                if (!((!token || isExpired) && refreshToken)) {
                  _context8.next = 6;
                  break;
                }

                _context8.next = 5;
                return this._refresh();

              case 5:
                return _context8.abrupt("return", this.tokens.token);

              case 6:
                return _context8.abrupt("return", !isExpired && token);

              case 7:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function bearerToken() {
        return _bearerToken.apply(this, arguments);
      }

      return bearerToken;
    }()
  }, {
    key: "login",
    value: function () {
      var _login = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        var opts,
            _args9 = arguments;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                opts = _args9.length > 0 && _args9[0] !== undefined ? _args9[0] : {};
                opts.prompt = opts.prompt || _constants_js__WEBPACK_IMPORTED_MODULE_8__.LOGIN;
                return _context9.abrupt("return", this.adapter.login(opts));

              case 3:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function login() {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  }, {
    key: "silentLogin",
    value: function () {
      var _silentLogin = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        var _this5 = this;

        var silentLoginRedirectUri;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                silentLoginRedirectUri = this.options.silentLoginRedirectUri;

                if (silentLoginRedirectUri) {
                  _context10.next = 3;
                  break;
                }

                return _context10.abrupt("return", Promise.reject(new Error('no silentLoginRedirectUri')));

              case 3:
                return _context10.abrupt("return", (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_10__.checkSilentLogin)(this).then(function (oauth) {
                  return _this5._processCallback(oauth);
                }).then(function () {
                  _this5._schedule();

                  return _this5._handleToken();
                }));

              case 4:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function silentLogin() {
        return _silentLogin.apply(this, arguments);
      }

      return silentLogin;
    }()
  }, {
    key: "logout",
    value: function () {
      var _logout = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
        var _this$getTokens, idToken;

        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _this$getTokens = this.getTokens(), idToken = _this$getTokens.idToken;
                this.statusIframe.clearSchedule();
                clearTimeout(this._expiryTimerId);
                this.tokens.clearTokens();
                return _context11.abrupt("return", this.adapter.logout({
                  idToken: idToken
                }));

              case 5:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function logout() {
        return _logout.apply(this, arguments);
      }

      return logout;
    }()
  }, {
    key: "userinfo",
    value: function () {
      var _userinfo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
        var url, token, res, err;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                url = this.endpoints.userinfo();
                _context12.next = 3;
                return this.bearerToken();

              case 3:
                token = _context12.sent;
                _context12.next = 6;
                return fetch(url, {
                  headers: {
                    Accept: 'application/json',
                    Authorization: "Bearer ".concat(token)
                  }
                });

              case 6:
                res = _context12.sent;

                if (!(res.status === 200)) {
                  _context12.next = 9;
                  break;
                }

                return _context12.abrupt("return", res.json());

              case 9:
                err = new Error('userinfo failed');
                err.status = res.status;
                err.response = res;
                return _context12.abrupt("return", Promise.reject(err));

              case 13:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function userinfo() {
        return _userinfo.apply(this, arguments);
      }

      return userinfo;
    }()
  }, {
    key: "register",
    value: function () {
      var _register = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                return _context13.abrupt("return", this.adapter.register());

              case 1:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function register() {
        return _register.apply(this, arguments);
      }

      return register;
    }()
  }, {
    key: "account",
    value: function () {
      var _account = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                return _context14.abrupt("return", this.adapter.account());

              case 1:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function account() {
        return _account.apply(this, arguments);
      }

      return account;
    }()
  }]);

  return Client;
}(_utils_index_js__WEBPACK_IMPORTED_MODULE_11__.EventEmitter);

function fetchToken(_x4, _x5) {
  return _fetchToken.apply(this, arguments);
}

function _fetchToken() {
  _fetchToken = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(url, query) {
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            return _context15.abrupt("return", fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': _constants_js__WEBPACK_IMPORTED_MODULE_8__.TYPE_URLENCODED,
                Accept: 'application/json'
              },
              // mode: 'no-cors',
              body: (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_12__.urlEncoded)(query)
            }));

          case 1:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  }));
  return _fetchToken.apply(this, arguments);
}

/***/ }),

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/*! namespace exports */
/*! export ACCESS_TOKEN [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CHANGED [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CODE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ERROR [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ERROR_DESCRIPTION [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ERROR_URI [provided] [no usage info] [missing usage info prevents renaming] */
/*! export EXPIRES_IN [provided] [no usage info] [missing usage info prevents renaming] */
/*! export FRAGMENT [provided] [no usage info] [missing usage info prevents renaming] */
/*! export HYBRID [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ID_TOKEN [provided] [no usage info] [missing usage info prevents renaming] */
/*! export IMPLICIT [provided] [no usage info] [missing usage info prevents renaming] */
/*! export KC_ACTION_STATUS [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LOGIN [provided] [no usage info] [missing usage info prevents renaming] */
/*! export NONE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export OPENID [provided] [no usage info] [missing usage info prevents renaming] */
/*! export QUERY [provided] [no usage info] [missing usage info prevents renaming] */
/*! export REFRESH_TOKEN [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RESPONSE_MODE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export SESSION_STATE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export STANDARD [provided] [no usage info] [missing usage info prevents renaming] */
/*! export STATE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export TOKEN [provided] [no usage info] [missing usage info prevents renaming] */
/*! export TOKEN_TYPE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export TYPE_URLENCODED [provided] [no usage info] [missing usage info prevents renaming] */
/*! export UNCHANGED [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OPENID": () => /* binding */ OPENID,
/* harmony export */   "FRAGMENT": () => /* binding */ FRAGMENT,
/* harmony export */   "QUERY": () => /* binding */ QUERY,
/* harmony export */   "STANDARD": () => /* binding */ STANDARD,
/* harmony export */   "IMPLICIT": () => /* binding */ IMPLICIT,
/* harmony export */   "HYBRID": () => /* binding */ HYBRID,
/* harmony export */   "TOKEN": () => /* binding */ TOKEN,
/* harmony export */   "CODE": () => /* binding */ CODE,
/* harmony export */   "STATE": () => /* binding */ STATE,
/* harmony export */   "SESSION_STATE": () => /* binding */ SESSION_STATE,
/* harmony export */   "RESPONSE_MODE": () => /* binding */ RESPONSE_MODE,
/* harmony export */   "ACCESS_TOKEN": () => /* binding */ ACCESS_TOKEN,
/* harmony export */   "REFRESH_TOKEN": () => /* binding */ REFRESH_TOKEN,
/* harmony export */   "ID_TOKEN": () => /* binding */ ID_TOKEN,
/* harmony export */   "EXPIRES_IN": () => /* binding */ EXPIRES_IN,
/* harmony export */   "KC_ACTION_STATUS": () => /* binding */ KC_ACTION_STATUS,
/* harmony export */   "TOKEN_TYPE": () => /* binding */ TOKEN_TYPE,
/* harmony export */   "ERROR": () => /* binding */ ERROR,
/* harmony export */   "ERROR_DESCRIPTION": () => /* binding */ ERROR_DESCRIPTION,
/* harmony export */   "ERROR_URI": () => /* binding */ ERROR_URI,
/* harmony export */   "NONE": () => /* binding */ NONE,
/* harmony export */   "LOGIN": () => /* binding */ LOGIN,
/* harmony export */   "CHANGED": () => /* binding */ CHANGED,
/* harmony export */   "UNCHANGED": () => /* binding */ UNCHANGED,
/* harmony export */   "TYPE_URLENCODED": () => /* binding */ TYPE_URLENCODED
/* harmony export */ });
// default scope
var OPENID = 'openid'; // responseMode

var FRAGMENT = 'fragment';
var QUERY = 'query'; // flow

var STANDARD = 'standard';
var IMPLICIT = 'implicit';
var HYBRID = 'hybrid'; // responseType

var TOKEN = 'token'; // params

var CODE = 'code';
var STATE = 'state';
var SESSION_STATE = 'session_state';
var RESPONSE_MODE = 'response_mode';
var ACCESS_TOKEN = 'access_token';
var REFRESH_TOKEN = 'refresh_token';
var ID_TOKEN = 'id_token';
var EXPIRES_IN = 'expires_in';
var KC_ACTION_STATUS = 'kc_action_status';
var TOKEN_TYPE = 'token_type';
var ERROR = 'error';
var ERROR_DESCRIPTION = 'error_description';
var ERROR_URI = 'error_uri'; // prompt

var NONE = 'none';
var LOGIN = 'login'; // status iframe

var CHANGED = 'changed';
var UNCHANGED = 'unchanged'; // export const ERROR = 'error'
// content-type

var TYPE_URLENCODED = 'application/x-www-form-urlencoded';

/***/ }),

/***/ "./src/endpoints.js":
/*!**************************!*\
  !*** ./src/endpoints.js ***!
  \**************************/
/*! namespace exports */
/*! export Endpoints [provided] [no usage info] [missing usage info prevents renaming] */
/*! export endpoints [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Endpoints": () => /* binding */ Endpoints,
/* harmony export */   "endpoints": () => /* binding */ endpoints
/* harmony export */ });
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/index.js */ "./src/utils/random.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/index.js */ "./src/utils/urls.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var Endpoints = /*#__PURE__*/function () {
  function Endpoints(serverUrl, oidcConfig, callback) {
    _classCallCheck(this, Endpoints);

    if (!oidcConfig || !oidcConfig.authorization_endpoint || !oidcConfig.token_endpoint) {
      throw new Error('oidcConfig required');
    }

    this.serverUrl = serverUrl;
    this.oidcConfig = oidcConfig;
    this.callback = callback;
  }

  _createClass(Endpoints, [{
    key: "_maybeKeycloak",
    value: function _maybeKeycloak() {
      return this.token().includes('/realms/');
    }
  }, {
    key: "createLoginUrl",
    value: function () {
      var _createLoginUrl = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(options) {
        var state, nonce, clientId, responseMode, responseType, redirectUri, prompt, scope, useNonce, maxAge, loginHint, idpHint, action, locale, pkceMethod, authorizationParams, doRegister, callbackState, baseUrl, query, _yield$options$pkce, codeVerifier, challenge;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                state = (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.uuid4)();
                nonce = (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.uuid4)();
                clientId = options.clientId, responseMode = options.responseMode, responseType = options.responseType, redirectUri = options.redirectUri, prompt = options.prompt, scope = options.scope, useNonce = options.useNonce, maxAge = options.maxAge, loginHint = options.loginHint, idpHint = options.idpHint, action = options.action, locale = options.locale, pkceMethod = options.pkceMethod, authorizationParams = options.authorizationParams;
                doRegister = action === 'register';
                callbackState = {
                  state: state,
                  nonce: nonce,
                  redirectUri: redirectUri,
                  expires: new Date().getTime() + 60000
                };

                if (prompt) {
                  callbackState.prompt = prompt;
                }

                baseUrl = doRegister ? this.register() : this.authorize();
                query = _objectSpread(_objectSpread({}, authorizationParams), {}, {
                  client_id: clientId,
                  redirect_uri: redirectUri,
                  state: state,
                  response_mode: responseMode,
                  response_type: responseType,
                  scope: scope,
                  prompt: prompt,
                  max_age: maxAge,
                  login_hint: loginHint,
                  kc_idp_hint: idpHint,
                  ui_locales: locale
                });

                if (useNonce) {
                  query.nonce = nonce;
                }

                if (action && !doRegister) {
                  query.action = action;
                }

                if (!(pkceMethod && options.pkce)) {
                  _context.next = 19;
                  break;
                }

                _context.next = 13;
                return options.pkce(pkceMethod);

              case 13:
                _yield$options$pkce = _context.sent;
                codeVerifier = _yield$options$pkce.codeVerifier;
                challenge = _yield$options$pkce.challenge;
                callbackState.pkceCodeVerifier = codeVerifier;
                query.code_challenge = challenge;
                query.code_challenge_method = pkceMethod;

              case 19:
                this.callback.store(callbackState);
                return _context.abrupt("return", (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.createUrl)(baseUrl, query));

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createLoginUrl(_x) {
        return _createLoginUrl.apply(this, arguments);
      }

      return createLoginUrl;
    }()
  }, {
    key: "createRegisterUrl",
    value: function () {
      var _createRegisterUrl = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(options) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", this.createLoginUrl(_objectSpread(_objectSpread({}, options), {}, {
                  action: 'register'
                })));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function createRegisterUrl(_x2) {
        return _createRegisterUrl.apply(this, arguments);
      }

      return createRegisterUrl;
    }()
  }, {
    key: "createLogoutUrl",
    value: function () {
      var _createLogoutUrl = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(options, _ref) {
        var idToken, redirectUri, postLogoutRedirectUri, url, query;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                idToken = _ref.idToken;
                redirectUri = options.redirectUri, postLogoutRedirectUri = options.postLogoutRedirectUri;
                url = this.logout();

                if (url) {
                  _context3.next = 5;
                  break;
                }

                throw new Error('no end_session_endpoint');

              case 5:
                query = {
                  post_logout_redirect_uri: postLogoutRedirectUri || redirectUri,
                  id_token_hint: idToken
                };
                return _context3.abrupt("return", (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.createUrl)(url, query));

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function createLogoutUrl(_x3, _x4) {
        return _createLogoutUrl.apply(this, arguments);
      }

      return createLogoutUrl;
    }()
  }, {
    key: "createAccountUrl",
    value: function () {
      var _createAccountUrl = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(options) {
        var clientId, redirectUri, url;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                clientId = options.clientId, redirectUri = options.redirectUri;
                url = this.account();
                return _context4.abrupt("return", (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.createUrl)(url, {
                  referrer: clientId,
                  referrer_uri: redirectUri
                }));

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function createAccountUrl(_x5) {
        return _createAccountUrl.apply(this, arguments);
      }

      return createAccountUrl;
    }()
  }, {
    key: "createTokenUrl",
    value: function createTokenUrl(query) {
      return (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.createUrl)(this.token(), query);
    }
  }, {
    key: "authorize",
    value: function authorize() {
      return this.oidcConfig.authorization_endpoint;
    }
  }, {
    key: "token",
    value: function token() {
      return this.oidcConfig.token_endpoint;
    }
  }, {
    key: "logout",
    value: function logout() {
      // may be undefined
      var url = this.oidcConfig.end_session_endpoint;
      return url;
    }
  }, {
    key: "checkSessionIframe",
    value: function checkSessionIframe() {
      // may be undefined
      return this.oidcConfig.check_session_iframe;
    }
  }, {
    key: "userinfo",
    value: function userinfo() {
      // may be undefined
      var url = this.oidcConfig.userinfo_endpoint;
      if (!url) throw new Error('no userinfo_endpoint');
      return url;
    }
  }, {
    key: "register",
    value: function register() {
      var url = this.oidcConfig.userRegistrationEndpoint;

      if (!url && this._maybeKeycloak()) {
        url = this.authorize().replace(/\/[^/]+$/, '/registrations');
      }

      if (!url) throw new Error('no register endpoint');
      return url;
    }
  }, {
    key: "account",
    value: function account() {
      var url = this.oidcConfig.userAccountEndpoint;

      if (!url && this._maybeKeycloak()) {
        url = "".concat(this.serverUrl, "/account");
      }

      if (!url) throw new Error('no account endpoint');
      return url;
    }
  }]);

  return Endpoints;
}();
var endpoints = function endpoints(serverUrl, oidcConfig, callback) {
  return new Endpoints(serverUrl, oidcConfig, callback);
};

/***/ }),

/***/ "./src/tokens.js":
/*!***********************!*\
  !*** ./src/tokens.js ***!
  \***********************/
/*! namespace exports */
/*! export Tokens [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Tokens": () => /* binding */ Tokens
/* harmony export */ });
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/index.js */ "./src/utils/get.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/index.js */ "./src/utils/decodeToken.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/index.js */ "./src/utils/storage.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants.js */ "./src/constants.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var now = function now() {
  return Math.ceil(new Date().getTime() / 1000);
};

var toNumber = function toNumber(num, def) {
  return !isNaN(Number(num)) ? Number(num) : def;
};

var claim = function claim(t, _claim, def) {
  return (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.get)(t, ['idTokenParsed', _claim], (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.get)(t, ['tokenParsed', _claim], def));
};

var Tokens = /*#__PURE__*/function () {
  function Tokens() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        log = _ref.log,
        useNonce = _ref.useNonce,
        minValidity = _ref.minValidity,
        _ref$useLocalStorage = _ref.useLocalStorage,
        useLocalStorage = _ref$useLocalStorage === void 0 ? true : _ref$useLocalStorage;

    _classCallCheck(this, Tokens);

    this.log = log;
    this._useNonce = useNonce;
    this._authenticated = false;
    this._timeSkew = 0;
    this._expiresAt = 0;
    this._store = new Store(useLocalStorage);
    this._minValidity = minValidity;
  }

  _createClass(Tokens, [{
    key: "loadTokens",

    /**
     * load tokens from localStorage
     */
    value: function loadTokens() {
      var tokens = this._store.get();

      if (tokens) this.setTokens(tokens);
      return this;
    }
  }, {
    key: "fromInitOptions",
    value: function fromInitOptions() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          token = _ref2.token,
          refreshToken = _ref2.refreshToken,
          idToken = _ref2.idToken;

      var ls = this._store.get() || {};
      token = token || ls.access_token;
      refreshToken = refreshToken || ls.refresh_token;

      if (token) {
        var tokens = {
          access_token: token,
          refresh_token: refreshToken,
          id_token: idToken || ls.id_token,
          expiresAt: ls.expiresAt
        };
        this.setTokens(tokens);
      }

      return this;
    }
  }, {
    key: "startTokenRequest",
    value: function startTokenRequest() {
      this._timeLocal = new Date().getTime();
    }
  }, {
    key: "setTokens",
    value: function setTokens() {
      var tokenResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var token = tokenResponse.access_token,
          refreshToken = tokenResponse.refresh_token,
          idToken = tokenResponse.id_token,
          _tokenResponse$expire = tokenResponse.expires_in,
          expiresIn = _tokenResponse$expire === void 0 ? 60 : _tokenResponse$expire,
          expiresAt = tokenResponse.expiresAt;
      this._timeLocal = (this._timeLocal + new Date().getTime()) / 2;

      if (refreshToken) {
        this.refreshToken = refreshToken;

        this._store.refreshToken(refreshToken);

        try {
          this.refreshTokenParsed = (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.decodeToken)(refreshToken);
        } catch (e) {
          // token may be a oauth2 only token
          delete this.refreshTokenParsed;
        }

        this.log.info('refresh token set %o', this.refreshTokenParsed);
      } else {
        delete this.refreshToken;
        delete this.refreshTokenParsed;

        this._store.refreshToken(null);

        this.log.info('refresh token cleared');
      }

      if (idToken) {
        this.idToken = idToken;

        this._store.idToken(idToken);

        this.idTokenParsed = (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.decodeToken)(idToken);
        this.log.info('id token set %o', this.idTokenParsed);
      } else {
        delete this.idToken;
        delete this.idTokenParsed;

        this._store.idToken(null);

        this.log.info('id token cleared');
      }

      if (token) {
        this.token = token;

        this._store.token(token);

        try {
          this.tokenParsed = (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_1__.decodeToken)(token);
        } catch (e) {
          // token may be a oauth2 only token
          delete this.tokenParsed;
        }

        this.log.info('token set %o', this.tokenParsed);
        var iat = toNumber(claim(this, 'iat'), now() - 1);
        this._expiresAt = toNumber(claim(this, 'exp'), now() + expiresIn);
        this._timeSkew = Math.floor(this._timeLocal / 1000) - iat;
        this.log.info('Estimated time difference is %s seconds', this._timeSkew);
        this._expiresAt += this._timeSkew;
        this._expiresAt = expiresAt || this._expiresAt;

        this._store.token(token, this._expiresAt);

        this._authenticated = true;
      } else {
        this._authenticated = false;
        delete this.token;
        delete this.tokenParsed;

        this._store.token(null);

        this.log.info('token cleared');
      }
    }
  }, {
    key: "getTokens",
    value: function getTokens() {
      var _this = this;

      var obj = ['token', 'idToken', 'refreshToken'].reduce(function (o, key) {
        var parsed = key + 'Parsed';
        o[key] = _this[key];
        o[parsed] = _this[parsed];
        return o;
      }, {});
      return obj;
    }
  }, {
    key: "clearTokens",
    value: function clearTokens() {
      this.setTokens();
    }
  }, {
    key: "sessionState",
    value: function sessionState() {
      return claim(this, _constants_js__WEBPACK_IMPORTED_MODULE_2__.SESSION_STATE, '');
    }
  }, {
    key: "subject",
    value: function subject() {
      return claim(this, 'sub');
    }
  }, {
    key: "realmAccess",
    value: function realmAccess() {
      return (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.get)(this, 'tokenParsed.realm_access');
    }
  }, {
    key: "resourceAccess",
    value: function resourceAccess() {
      return (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.get)(this, 'tokenParsed.resource_access');
    }
    /**
     * expiry in seconds
     * @return {number}
     */

  }, {
    key: "expiresIn",
    value: function expiresIn() {
      return this._expiresAt - now();
    }
  }, {
    key: "isTokenExpired",
    value: function isTokenExpired() {
      var minValidity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._minValidity;
      var expiresIn = this.expiresIn();

      if (!isNaN(minValidity)) {
        expiresIn -= minValidity;
      }

      return expiresIn < 0;
    }
    /**
     * checkes if storedNonce is different than nonce in tokens
     * requires `useNonce` in options.
     * if invalid tokens are cleared
     * @param {string} storedNonce
     * @return {boolean} true if storedNonce is different than nonce in tokens
     */

  }, {
    key: "isInvalidNonce",
    value: function isInvalidNonce(storedNonce) {
      var _useNonce = this._useNonce,
          tokenParsed = this.tokenParsed,
          refreshTokenParsed = this.refreshTokenParsed,
          idTokenParsed = this.idTokenParsed;

      var verify = function verify(obj) {
        return obj && obj.nonce && obj.nonce !== storedNonce;
      };

      var invalid = _useNonce && (verify(tokenParsed) || verify(refreshTokenParsed) || verify(idTokenParsed));

      if (invalid) {
        this.clearTokens();
      }

      return invalid;
    }
  }, {
    key: "authenticated",
    get: function get() {
      return this._authenticated;
    }
  }]);

  return Tokens;
}();
var TOKEN = 'oidc-token';
var TOKEN_EXPIRES_AT = 'oidc-token-exp';
var ID_TOKEN = 'oidc-id-token';
var REFRESH_TOKEN = 'oidc-refresh-token';

var Store = /*#__PURE__*/function () {
  function Store(useLocalStorage) {
    _classCallCheck(this, Store);

    try {
      this.store = useLocalStorage ? new _utils_index_js__WEBPACK_IMPORTED_MODULE_3__.LocalStorage() : undefined;
    } catch (e) {}
  }

  _createClass(Store, [{
    key: "_set",
    value: function _set(key, token) {
      if (!this.store) return;
      token ? this.store.setItem(key, token) : this.store.removeItem(key);
    }
  }, {
    key: "token",
    value: function token(_token, expiresAt) {
      this._set(TOKEN, _token);

      this._set(TOKEN_EXPIRES_AT, expiresAt);
    }
  }, {
    key: "refreshToken",
    value: function refreshToken(token) {
      this._set(REFRESH_TOKEN, token);
    }
  }, {
    key: "idToken",
    value: function idToken(token) {
      this._set(ID_TOKEN, token);
    }
  }, {
    key: "get",
    value: function get() {
      if (!this.store) return;
      return {
        access_token: this.store.getItem(TOKEN),
        refresh_token: this.store.getItem(REFRESH_TOKEN),
        id_token: this.store.getItem(ID_TOKEN),
        expiresAt: this.store.getItem(TOKEN_EXPIRES_AT)
      };
    }
  }]);

  return Store;
}();

/***/ }),

/***/ "./src/utils/EventEmitter.js":
/*!***********************************!*\
  !*** ./src/utils/EventEmitter.js ***!
  \***********************************/
/*! namespace exports */
/*! export EventEmitter [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EventEmitter": () => /* binding */ EventEmitter
/* harmony export */ });
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EventEmitter = /*#__PURE__*/function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    this._events = {};
  }

  _createClass(EventEmitter, [{
    key: "_getMap",
    value: function _getMap(eventName) {
      if (!this._events[eventName]) this._events[eventName] = new Map();
      return this._events[eventName];
    }
  }, {
    key: "on",
    value: function on(eventName, listener) {
      this._getMap(eventName).set(listener, listener);

      return this;
    }
  }, {
    key: "off",
    value: function off(eventName, listener) {
      this._getMap(eventName)["delete"](listener);

      return this;
    }
  }, {
    key: "emit",
    value: function emit(eventName) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var _iterator = _createForOfIteratorHelper(this._getMap(eventName)),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray(_step.value, 2),
              _ = _step$value[0],
              listener = _step$value[1];

          // eslint-disable-line no-unused-vars
          listener.apply(void 0, args);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }]);

  return EventEmitter;
}();

/***/ }),

/***/ "./src/utils/callback.js":
/*!*******************************!*\
  !*** ./src/utils/callback.js ***!
  \*******************************/
/*! namespace exports */
/*! export Callback [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Callback": () => /* binding */ Callback
/* harmony export */ });
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage.js */ "./src/utils/storage.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants.js */ "./src/constants.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


 // const PARAMS = {
//   [STANDARD]: [CODE, STATE, SESSION_STATE, KC_ACTION_STATUS],
//   [IMPLICIT]: [CODE, ACCESS_TOKEN, TOKEN_TYPE, ID_TOKEN, STATE, SESSION_STATE, EXPIRES_IN, KC_ACTION_STATUS],
//   [HYBRID]: [CODE, ACCESS_TOKEN, ID_TOKEN, STATE, SESSION_STATE, KC_ACTION_STATUS]
// }

var PARAMS = [_constants_js__WEBPACK_IMPORTED_MODULE_0__.CODE, _constants_js__WEBPACK_IMPORTED_MODULE_0__.ACCESS_TOKEN, _constants_js__WEBPACK_IMPORTED_MODULE_0__.TOKEN_TYPE, _constants_js__WEBPACK_IMPORTED_MODULE_0__.ID_TOKEN, _constants_js__WEBPACK_IMPORTED_MODULE_0__.STATE, _constants_js__WEBPACK_IMPORTED_MODULE_0__.SESSION_STATE, _constants_js__WEBPACK_IMPORTED_MODULE_0__.EXPIRES_IN, _constants_js__WEBPACK_IMPORTED_MODULE_0__.KC_ACTION_STATUS];
var Callback = /*#__PURE__*/function () {
  function Callback(options) {
    _classCallCheck(this, Callback);

    var _ref = options || {},
        flow = _ref.flow,
        responseMode = _ref.responseMode,
        log = _ref.log;

    this._flow = flow || _constants_js__WEBPACK_IMPORTED_MODULE_0__.STANDARD;
    this._responseMode = responseMode || _constants_js__WEBPACK_IMPORTED_MODULE_0__.FRAGMENT;
    this._store = new _storage_js__WEBPACK_IMPORTED_MODULE_1__.CallbackStorage();
    this.log = log;
  }

  _createClass(Callback, [{
    key: "store",
    value: function store(state) {
      this._store.add(state);
    }
  }, {
    key: "parse",
    value: function parse(url) {
      var oauth = this._parseUrl(url);

      if (!oauth) {
        return;
      }

      this.log.info('callback parsed to %o', oauth);

      var oauthState = this._store.get(oauth.state);

      if (oauthState) {
        oauth.valid = true;
        oauth.pkceCodeVerifier = oauthState.pkceCodeVerifier;
        oauth.prompt = oauthState.prompt;
        oauth.redirectUri = oauthState.redirectUri;
        oauth.storedNonce = oauthState.nonce;
      }

      return oauth;
    }
  }, {
    key: "_parseUrl",
    value: function _parseUrl(url) {
      // let supportedParams = PARAMS[this._flow] || []
      var supportedParams = PARAMS;
      supportedParams = supportedParams.concat([_constants_js__WEBPACK_IMPORTED_MODULE_0__.RESPONSE_MODE, _constants_js__WEBPACK_IMPORTED_MODULE_0__.ERROR, _constants_js__WEBPACK_IMPORTED_MODULE_0__.ERROR_DESCRIPTION, _constants_js__WEBPACK_IMPORTED_MODULE_0__.ERROR_URI]);
      var oauth;
      var uri = new URL(url);

      var reduce = function reduce(search) {
        return supportedParams.reduce(function (oauth, param) {
          var val = search.get(param);

          if (val) {
            search["delete"](param);
            oauth[param] = val;
          }

          return oauth;
        }, {});
      };

      if (this._responseMode === _constants_js__WEBPACK_IMPORTED_MODULE_0__.QUERY) {
        oauth = reduce(uri.searchParams);
        oauth.newUrl = uri.toString();
      } else if (this._responseMode === _constants_js__WEBPACK_IMPORTED_MODULE_0__.FRAGMENT) {
        var search = new URLSearchParams(uri.hash.substring(1));
        oauth = reduce(search);
        uri.hash = "#".concat(search.toString());
        oauth.newUrl = uri.toString();
      }

      if (oauth && oauth.state) {
        if ((this._flow === _constants_js__WEBPACK_IMPORTED_MODULE_0__.STANDARD || this._flow === _constants_js__WEBPACK_IMPORTED_MODULE_0__.HYBRID) && (oauth.code || oauth.error)) {
          return oauth;
        } else if (this._flow === _constants_js__WEBPACK_IMPORTED_MODULE_0__.IMPLICIT && (oauth.access_token || oauth.error)) {
          return oauth;
        }
      }

      this.log.error('bad params %o for %s flow', oauth, this._flow);
    }
  }]);

  return Callback;
}();

/***/ }),

/***/ "./src/utils/checkSilentLogin.js":
/*!***************************************!*\
  !*** ./src/utils/checkSilentLogin.js ***!
  \***************************************/
/*! namespace exports */
/*! export checkSilentLogin [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkSilentLogin": () => /* binding */ checkSilentLogin
/* harmony export */ });
/* harmony import */ var _createPromise_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createPromise.js */ "./src/utils/createPromise.js");
/* harmony import */ var _createIframe_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createIframe.js */ "./src/utils/createIframe.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants.js */ "./src/constants.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }




var MESSAGE = 'message';
function checkSilentLogin(_x) {
  return _checkSilentLogin.apply(this, arguments);
}

function _checkSilentLogin() {
  _checkSilentLogin = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(client) {
    var callback, endpoints, options, promise, src, iframe, handleMessage;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            callback = client.callback, endpoints = client.endpoints, options = client.options;
            promise = (0,_createPromise_js__WEBPACK_IMPORTED_MODULE_0__.createPromise)();
            _context.next = 4;
            return endpoints.createLoginUrl(_objectSpread(_objectSpread({}, options), {}, {
              prompt: _constants_js__WEBPACK_IMPORTED_MODULE_1__.NONE,
              redirectUri: options.silentLoginRedirectUri
            }));

          case 4:
            src = _context.sent;
            iframe = (0,_createIframe_js__WEBPACK_IMPORTED_MODULE_2__.createIframe)({
              src: src,
              title: 'oidc-silent-check-sso'
            });

            handleMessage = function handleMessage(ev) {
              if (ev.origin !== window.location.origin || iframe.contentWindow !== ev.source) {
                return;
              }

              var oauth = callback.parse(ev.data);
              document.body.removeChild(iframe);
              window.removeEventListener(MESSAGE, handleMessage);

              if (!oauth) {
                promise.reject(new Error('silent login failed'));
              } else {
                promise.resolve(oauth);
              }
            };

            window.addEventListener(MESSAGE, handleMessage);
            return _context.abrupt("return", promise);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _checkSilentLogin.apply(this, arguments);
}

/***/ }),

/***/ "./src/utils/createIframe.js":
/*!***********************************!*\
  !*** ./src/utils/createIframe.js ***!
  \***********************************/
/*! namespace exports */
/*! export createIframe [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createIframe": () => /* binding */ createIframe
/* harmony export */ });
function createIframe(_ref) {
  var src = _ref.src,
      title = _ref.title;
  var iframe = document.createElement('iframe');
  iframe.setAttribute('src', src);
  iframe.setAttribute('title', title);
  iframe.style.display = 'none';
  document.body.appendChild(iframe);
  return iframe;
}

/***/ }),

/***/ "./src/utils/createPromise.js":
/*!************************************!*\
  !*** ./src/utils/createPromise.js ***!
  \************************************/
/*! namespace exports */
/*! export createPromise [provided] [no usage info] [missing usage info prevents renaming] */
/*! export debouncePromises [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPromise": () => /* binding */ createPromise,
/* harmony export */   "debouncePromises": () => /* binding */ debouncePromises
/* harmony export */ });
function createPromise() {
  var _resolve;

  var _reject;

  var promise = new Promise(function (resolve, reject) {
    _resolve = resolve;
    _reject = reject;
  });
  promise.resolve = _resolve;
  promise.reject = _reject;
  return promise;
}
function debouncePromises() {
  var queue = [];

  var push = function push(promise) {
    queue.push(promise);
    return queue.length === 1;
  };

  var resolveAll = function resolveAll(result) {
    while (queue.length) {
      queue.shift().resolve(result);
    }
  };

  var rejectAll = function rejectAll(err) {
    while (queue.length) {
      queue.shift().reject(err);
    }
  };

  return {
    push: push,
    resolveAll: resolveAll,
    rejectAll: rejectAll
  };
}

/***/ }),

/***/ "./src/utils/decodeToken.js":
/*!**********************************!*\
  !*** ./src/utils/decodeToken.js ***!
  \**********************************/
/*! namespace exports */
/*! export decodeToken [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "decodeToken": () => /* binding */ decodeToken
/* harmony export */ });
var map = {
  '-': '+',
  _: '/'
};
var RE_MAP = /[_-]/g;
/**
 * decode a JWT
 * @throws
 * @param {string} [token='']
 * @return {object} payload of decoded token
 */

function decodeToken() {
  var token = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var payload = token.split('.')[1];
  var b64 = payload.replace(RE_MAP, function (m) {
    return map[m];
  });

  switch (b64.length % 4) {
    case 0:
      break;

    case 2:
      b64 += '==';
      break;

    case 3:
      b64 += '=';
      break;

    default:
      throw new Error('Invalid token');
  }

  var str = decodeURIComponent(escape(atob(b64)));
  return JSON.parse(str);
}

/***/ }),

/***/ "./src/utils/get.js":
/*!**************************!*\
  !*** ./src/utils/get.js ***!
  \**************************/
/*! namespace exports */
/*! export get [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "get": () => /* binding */ get
/* harmony export */ });
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var get = function get(obj) {
  var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var def = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  var o = obj;
  if (typeof keys === 'string') keys = keys.split('.');

  var _iterator = _createForOfIteratorHelper(keys),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var key = _step.value;

      if (o && o[key]) {
        o = o[key];
      } else {
        return def;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return o;
};

/***/ }),

/***/ "./src/utils/globalThis.js":
/*!*********************************!*\
  !*** ./src/utils/globalThis.js ***!
  \*********************************/
/*! namespace exports */
/*! export _globalThis [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_globalThis": () => /* binding */ _globalThis
/* harmony export */ });
/* global globalThis */
var _globalThis = function () {
  if (typeof globalThis !== 'undefined') {
    return globalThis;
  }
  /* istanbul ignore next */


  if (typeof window !== 'undefined') {
    return window;
  }
  /* istanbul ignore next */


  if (typeof global !== 'undefined') {
    return global;
  }
}();

/***/ }),

/***/ "./src/utils/initOptions.js":
/*!**********************************!*\
  !*** ./src/utils/initOptions.js ***!
  \**********************************/
/*! namespace exports */
/*! export initOptions [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initOptions": () => /* binding */ initOptions
/* harmony export */ });
/* harmony import */ var _get_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./get.js */ "./src/utils/get.js");
/* harmony import */ var _urls_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./urls.js */ "./src/utils/urls.js");
/* harmony import */ var _pkce_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pkce.js */ "./src/utils/pkce.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants.js */ "./src/constants.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }






var set = function set(val, def) {
  return Array.isArray(def) ? def.includes(val) ? val : def[0] : val !== undefined ? typeof def === 'boolean' ? !!val : val : def;
};

var number = function number(val) {
  return isNaN(val) ? undefined : val;
};

var func = function func(val) {
  return typeof val === 'function' ? val : undefined;
};

var setResponseType = function setResponseType(_ref) {
  var _ref$responseType = _ref.responseType,
      responseType = _ref$responseType === void 0 ? '' : _ref$responseType,
      flow = _ref.flow;
  var allowed = [_constants_js__WEBPACK_IMPORTED_MODULE_0__.NONE, _constants_js__WEBPACK_IMPORTED_MODULE_0__.CODE, _constants_js__WEBPACK_IMPORTED_MODULE_0__.TOKEN, _constants_js__WEBPACK_IMPORTED_MODULE_0__.ID_TOKEN];
  var types = responseType.split(' ').reduce(function (types, type) {
    if (allowed.indexOf(type) !== -1) {
      types.push(type);
    }

    return types;
  }, flow === _constants_js__WEBPACK_IMPORTED_MODULE_0__.IMPLICIT ? [] : [_constants_js__WEBPACK_IMPORTED_MODULE_0__.CODE]);
  return _toConsumableArray(new Set(types)).join(' ');
};

function initOptions() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var log = {
    info: set(func((0,_get_js__WEBPACK_IMPORTED_MODULE_1__.get)(options, 'log.info', (0,_get_js__WEBPACK_IMPORTED_MODULE_1__.get)(options, 'log.log'))), function () {}),
    error: set(func((0,_get_js__WEBPACK_IMPORTED_MODULE_1__.get)(options, 'log.error')), function () {})
  };

  var opts = _objectSpread(_objectSpread({}, options), {}, {
    forceLogin: set(options.forceLogin, false),
    forceLogout: set(options.forceLogout, true),
    useNonce: set(options.useNonce, true),
    useLocalStorage: set(options.useLocalStorage, true),
    useStatusIframe: set(options.useStatusIframe, true),
    statusIframeInterval: set(number(options.statusIframeInterval), 5),
    responseMode: set(options.responseMode, [_constants_js__WEBPACK_IMPORTED_MODULE_0__.FRAGMENT, _constants_js__WEBPACK_IMPORTED_MODULE_0__.QUERY]),
    responseType: setResponseType(options),
    flow: set(options.flow, [_constants_js__WEBPACK_IMPORTED_MODULE_0__.STANDARD, _constants_js__WEBPACK_IMPORTED_MODULE_0__.IMPLICIT, _constants_js__WEBPACK_IMPORTED_MODULE_0__.HYBRID]),
    prompt: set(options.prompt, [_constants_js__WEBPACK_IMPORTED_MODULE_0__.NONE, _constants_js__WEBPACK_IMPORTED_MODULE_0__.LOGIN]),
    minValidity: set(number(options.minValidity), 15),
    expiryInterval: set(number(options.expiryInterval), 5),
    pkce: set(func(options.pkce), _pkce_js__WEBPACK_IMPORTED_MODULE_2__.pkce),
    log: log
  }); // sanitize scope


  var scope_ = options.scope;
  var scope = (!scope_ ? [] : typeof scope_ === 'string' ? scope_.split(' ') : scope_).filter(Boolean);

  if (!scope.includes(_constants_js__WEBPACK_IMPORTED_MODULE_0__.OPENID) && !options.noOpenidInScope) {
    scope.unshift(_constants_js__WEBPACK_IMPORTED_MODULE_0__.OPENID);
  }

  opts.scope = scope.join(' '); // make url point to a real host

  var s = 'silentLoginRedirectUri';

  if (opts[s]) {
    opts[s] = (0,_urls_js__WEBPACK_IMPORTED_MODULE_3__.absoluteUrl)(opts[s]);
  } // test if pkceMethod is supported


  if (opts.pkce && opts.pkceMethod) {
    try {
      opts.pkce(opts.pkceMethod);
    } catch (e) {
      opts.log.error('pkceMethod %s not supported', opts.pkceMethod);
      opts.pkceMethod = undefined;
    }
  }

  return opts;
}

/***/ }),

/***/ "./src/utils/loadConfig.js":
/*!*********************************!*\
  !*** ./src/utils/loadConfig.js ***!
  \*********************************/
/*! namespace exports */
/*! export loadConfig [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadConfig": () => /* binding */ loadConfig
/* harmony export */ });
/* harmony import */ var _urls_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./urls.js */ "./src/utils/urls.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


function loadConfig(_x) {
  return _loadConfig.apply(this, arguments);
}

function _loadConfig() {
  _loadConfig = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(config) {
    var url, realm, userRegistrationEndpoint, userAccountEndpoint, _config, oidcConfigUrl, mergeC, res, oidcConfig;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (config.url) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", Promise.reject(new Error('url missing')));

          case 2:
            if (config.clientId) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", Promise.reject(new Error('clientId missing')));

          case 4:
            url = config.url, realm = config.realm, userRegistrationEndpoint = config.userRegistrationEndpoint, userAccountEndpoint = config.userAccountEndpoint, _config = _objectWithoutProperties(config, ["url", "realm", "userRegistrationEndpoint", "userAccountEndpoint"]);
            _config.serverUrl = (0,_urls_js__WEBPACK_IMPORTED_MODULE_0__.clearUrl)(realm ? "".concat(url, "/realms/").concat(realm) : url);
            oidcConfigUrl = "".concat(_config.serverUrl, "/.well-known/openid-configuration");

            if (typeof _config.oidcConfig === 'string') {
              oidcConfigUrl = _config.oidcConfig;
              _config.oidcConfig = null;
            }

            mergeC = function mergeC(c) {
              return _objectSpread(_objectSpread({}, c), {}, {
                userRegistrationEndpoint: userRegistrationEndpoint,
                userAccountEndpoint: userAccountEndpoint
              });
            };

            if (_config.oidcConfig) {
              _context.next = 21;
              break;
            }

            _context.next = 12;
            return fetch(oidcConfigUrl, {
              headers: {
                Accept: 'application/json'
              }
            });

          case 12:
            res = _context.sent;

            if (!(res.status !== 200)) {
              _context.next = 15;
              break;
            }

            return _context.abrupt("return", Promise.reject(new Error("error loading oidcConfig ".concat(oidcConfigUrl))));

          case 15:
            _context.next = 17;
            return res.json();

          case 17:
            oidcConfig = _context.sent;
            return _context.abrupt("return", _objectSpread(_objectSpread({}, _config), {}, {
              oidcConfig: mergeC(oidcConfig)
            }));

          case 21:
            _config.oidcConfig = mergeC(config.oidcConfig);

          case 22:
            return _context.abrupt("return", _config);

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _loadConfig.apply(this, arguments);
}

/***/ }),

/***/ "./src/utils/pkce.js":
/*!***************************!*\
  !*** ./src/utils/pkce.js ***!
  \***************************/
/*! namespace exports */
/*! export pkce [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pkce": () => /* binding */ pkce
/* harmony export */ });
/* harmony import */ var _random_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./random.js */ "./src/utils/random.js");
/* harmony import */ var _globalThis_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./globalThis.js */ "./src/utils/globalThis.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



var map = {
  '+': '-',
  '/': '_',
  '=': ''
};
var RE_MAP = /[+/=]/g;

function uint8ArrayToString(arrUint8) {
  var sUtf8 = '';

  for (var i = 0; i < arrUint8.length; i++) {
    sUtf8 += String.fromCharCode(arrUint8[i]);
  }

  return sUtf8;
}

function genCodeVerifier(len) {
  var binary = uint8ArrayToString((0,_random_js__WEBPACK_IMPORTED_MODULE_0__.genRandomData)(len));
  return _globalThis_js__WEBPACK_IMPORTED_MODULE_1__._globalThis.btoa(binary).replace(RE_MAP, '').substring(0, len);
}

function base64Encode(hash) {
  var binary = uint8ArrayToString(new Uint8Array(hash));

  var encoded = _globalThis_js__WEBPACK_IMPORTED_MODULE_1__._globalThis.btoa(binary).replace(RE_MAP, function (m) {
    return map[m];
  });

  return encoded;
}

function createHash(buffer, algorithm) {
  if (typeof buffer === 'string') {
    buffer = new _globalThis_js__WEBPACK_IMPORTED_MODULE_1__._globalThis.TextEncoder().encode(buffer);
  }

  return _globalThis_js__WEBPACK_IMPORTED_MODULE_1__._globalThis.crypto.subtle.digest(algorithm, buffer);
}

function genPkceChallenge(_x, _x2) {
  return _genPkceChallenge.apply(this, arguments);
}

function _genPkceChallenge() {
  _genPkceChallenge = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(pkceMethod, codeVerifier) {
    var hash;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = pkceMethod;
            _context.next = _context.t0 === 'S256' ? 3 : 7;
            break;

          case 3:
            _context.next = 5;
            return createHash(codeVerifier, 'SHA-256');

          case 5:
            hash = _context.sent;
            return _context.abrupt("return", base64Encode(hash));

          case 7:
            throw new Error('Invalid value for pkceMethod');

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _genPkceChallenge.apply(this, arguments);
}

function pkce(_x3, _x4) {
  return _pkce.apply(this, arguments);
}

function _pkce() {
  _pkce = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(pkceMethod, test) {
    var codeVerifier, challenge;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            codeVerifier = test || genCodeVerifier(96);
            _context2.next = 3;
            return genPkceChallenge(pkceMethod, codeVerifier);

          case 3:
            challenge = _context2.sent;
            return _context2.abrupt("return", {
              codeVerifier: codeVerifier,
              challenge: challenge
            });

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _pkce.apply(this, arguments);
}

/***/ }),

/***/ "./src/utils/random.js":
/*!*****************************!*\
  !*** ./src/utils/random.js ***!
  \*****************************/
/*! namespace exports */
/*! export genRandomData [provided] [no usage info] [missing usage info prevents renaming] */
/*! export uuid4 [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "genRandomData": () => /* binding */ genRandomData,
/* harmony export */   "uuid4": () => /* binding */ uuid4
/* harmony export */ });
/* harmony import */ var _globalThis_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globalThis.js */ "./src/utils/globalThis.js");
;
function genRandomData(len) {
  // use web crypto APIs if possible
  var crypto = _globalThis_js__WEBPACK_IMPORTED_MODULE_0__._globalThis.crypto || _globalThis_js__WEBPACK_IMPORTED_MODULE_0__._globalThis.msCrypto;

  if (crypto && crypto.getRandomValues) {
    var _array = new Uint8Array(len);

    crypto.getRandomValues(_array);
    return Array.from(_array);
  } // fallback to Math random


  var array = new Array(len);

  for (var i = 0; i < array.length; i++) {
    array[i] = Math.random() * 256 | 0;
  }

  return array;
}
function uuid4() {
  var arr = genRandomData(32);
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
    return (c ^ arr.pop() & 15 >> c / 4).toString(16);
  });
}

/***/ }),

/***/ "./src/utils/statusIframe.js":
/*!***********************************!*\
  !*** ./src/utils/statusIframe.js ***!
  \***********************************/
/*! namespace exports */
/*! export StatusIframe [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StatusIframe": () => /* binding */ StatusIframe
/* harmony export */ });
/* harmony import */ var _createPromise_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createPromise.js */ "./src/utils/createPromise.js");
/* harmony import */ var _createIframe_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createIframe.js */ "./src/utils/createIframe.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants.js */ "./src/constants.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var TITLE = 'oidc-status-iframe'; // https://openid.net/specs/openid-connect-session-1_0.html

var StatusIframe = /*#__PURE__*/function () {
  function StatusIframe(client) {
    _classCallCheck(this, StatusIframe);

    var _client$options = client.options,
        useStatusIframe = _client$options.useStatusIframe,
        statusIframeInterval = _client$options.statusIframeInterval,
        log = _client$options.log;
    this.client = client;
    this.iframe = null;
    this.iframeOrigin = null;
    this.debounce = (0,_createPromise_js__WEBPACK_IMPORTED_MODULE_0__.debouncePromises)();
    this.enabled = useStatusIframe;
    this.interval = statusIframeInterval * 1000;
    this.log = log;
  }

  _createClass(StatusIframe, [{
    key: "_schedule",
    value: function _schedule() {
      var _this = this;

      if (this.enabled && !this.timerId) {
        this.timerId = setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var status;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _this.timerId = null;
                  _context.prev = 1;
                  _context.next = 4;
                  return _this.check();

                case 4:
                  status = _context.sent;

                  if (!(status === _constants_js__WEBPACK_IMPORTED_MODULE_1__.UNCHANGED)) {
                    _context.next = 8;
                    break;
                  }

                  _this._schedule();

                  return _context.abrupt("return");

                case 8:
                  _context.next = 12;
                  break;

                case 10:
                  _context.prev = 10;
                  _context.t0 = _context["catch"](1);

                case 12:
                  // start logout if ERROR or CHANGED
                  _this.client._handleLogout();

                case 13:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[1, 10]]);
        })), this.interval);
      }
    }
  }, {
    key: "origin",
    value: function origin() {
      var authUrl = this.client.endpoints.authorize();
      return authUrl.charAt(0) === '/' ? window.location.origin : authUrl.substring(0, authUrl.indexOf('/', 8));
    }
  }, {
    key: "disable",
    value: function disable() {
      this.enabled = false;
    }
  }, {
    key: "setup",
    value: function () {
      var _setup = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this2 = this;

        var promise, src, iframe, handleLoad, handleMessage;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                promise = (0,_createPromise_js__WEBPACK_IMPORTED_MODULE_0__.createPromise)();

                if (!(this.iframe || !this.enabled)) {
                  _context2.next = 4;
                  break;
                }

                promise.resolve();
                return _context2.abrupt("return", promise);

              case 4:
                src = this.client.endpoints.checkSessionIframe();

                if (src) {
                  _context2.next = 10;
                  break;
                }

                this.log.info('no check_session_iframe');
                this.disable();
                promise.resolve();
                return _context2.abrupt("return", promise);

              case 10:
                iframe = this.iframe = (0,_createIframe_js__WEBPACK_IMPORTED_MODULE_2__.createIframe)({
                  src: src,
                  title: TITLE
                });

                handleLoad = function handleLoad() {
                  _this2.iframeOrigin = _this2.origin();
                  promise.resolve();
                };

                iframe.addEventListener('load', handleLoad);

                handleMessage = function handleMessage(event) {
                  if (event.origin !== _this2.iframeOrigin || _this2.iframe.contentWindow !== event.source) {
                    return;
                  }

                  if (![_constants_js__WEBPACK_IMPORTED_MODULE_1__.UNCHANGED, _constants_js__WEBPACK_IMPORTED_MODULE_1__.CHANGED, _constants_js__WEBPACK_IMPORTED_MODULE_1__.ERROR].includes(event.data)) {
                    return;
                  }

                  _this2.log.info('statusIframe "%s"', event.data);

                  if (event.data === _constants_js__WEBPACK_IMPORTED_MODULE_1__.ERROR) {
                    _this2.disable();
                  }

                  _this2.debounce.resolveAll(event.data);
                };

                window.addEventListener('message', handleMessage, false);
                return _context2.abrupt("return", promise);

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function setup() {
        return _setup.apply(this, arguments);
      }

      return setup;
    }()
  }, {
    key: "check",
    value: function () {
      var _check = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var promise, enabled, iframe, iframeOrigin, clientId, sessionState, msg;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                promise = (0,_createPromise_js__WEBPACK_IMPORTED_MODULE_0__.createPromise)();
                enabled = this.enabled, iframe = this.iframe, iframeOrigin = this.iframeOrigin;
                clientId = this.client.options.clientId;
                sessionState = this.client.tokens.sessionState();

                if (enabled && iframe && iframeOrigin && clientId && sessionState) {
                  if (this.debounce.push(promise)) {
                    this.log.info('statusIframe check "%s" "%s"', clientId, sessionState);
                    msg = "".concat(clientId, " ").concat(sessionState);
                    this.iframe.contentWindow.postMessage(msg, this.iframeOrigin);
                  }
                } else {
                  this.log.info('statusIframe disabled %o', {
                    enabled: enabled,
                    iframe: iframe,
                    iframeOrigin: iframeOrigin,
                    clientId: clientId,
                    sessionState: sessionState
                  });
                  this.disable();
                  promise.resolve(_constants_js__WEBPACK_IMPORTED_MODULE_1__.ERROR);
                }

                return _context3.abrupt("return", promise);

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function check() {
        return _check.apply(this, arguments);
      }

      return check;
    }()
  }, {
    key: "schedule",
    value: function () {
      var _schedule2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var needsFirstCheck, status;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                needsFirstCheck = !this.iframe;
                _context4.next = 3;
                return this.setup();

              case 3:
                if (this.enabled) {
                  _context4.next = 5;
                  break;
                }

                return _context4.abrupt("return");

              case 5:
                if (!needsFirstCheck) {
                  _context4.next = 15;
                  break;
                }

                _context4.next = 8;
                return this.check();

              case 8:
                status = _context4.sent;

                if (!(status === _constants_js__WEBPACK_IMPORTED_MODULE_1__.UNCHANGED)) {
                  _context4.next = 13;
                  break;
                }

                this._schedule();

                _context4.next = 15;
                break;

              case 13:
                if (status === _constants_js__WEBPACK_IMPORTED_MODULE_1__.CHANGED) {
                  this.client._handleLogout();
                }

                return _context4.abrupt("return", Promise.reject(new Error('status iframe %s', status)));

              case 15:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function schedule() {
        return _schedule2.apply(this, arguments);
      }

      return schedule;
    }()
  }, {
    key: "clearSchedule",
    value: function clearSchedule() {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }]);

  return StatusIframe;
}();

/***/ }),

/***/ "./src/utils/storage.js":
/*!******************************!*\
  !*** ./src/utils/storage.js ***!
  \******************************/
/*! namespace exports */
/*! export CallbackStorage [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CookieStorage [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LocalStorage [provided] [no usage info] [missing usage info prevents renaming] */
/*! export storage [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CookieStorage": () => /* binding */ CookieStorage,
/* harmony export */   "LocalStorage": () => /* binding */ LocalStorage,
/* harmony export */   "storage": () => /* binding */ storage,
/* harmony export */   "CallbackStorage": () => /* binding */ CallbackStorage
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function min2ms(min) {
  return min * 60000;
}

function getCookie(key) {
  var name = key + '=';
  var ca = document.cookie.split(';');

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trimStart();

    if (c.indexOf(name) === 0) {
      return decodeURIComponent(c.substring(name.length, c.length));
    }
  }

  return '';
}

function getCookies() {
  var obj = {};
  var ca = document.cookie.split(';');

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trimStart();

    var _$exec = /^([^=]+)=(.*)$/.exec(c),
        _$exec2 = _slicedToArray(_$exec, 3),
        _ = _$exec2[0],
        key = _$exec2[1],
        value = _$exec2[2]; // eslint-disable-line no-unused-vars


    obj[key] = decodeURIComponent(value);
  }

  return obj;
}

function cookieExpiration(minutes) {
  var exp = new Date();
  exp.setTime(exp.getTime() + min2ms(minutes));
  return exp;
}

function setCookie(key, value, minutes) {
  var expirationDate = cookieExpiration(minutes);
  var cookie = "".concat(key, "=").concat(encodeURIComponent(value), "; expires=").concat(expirationDate.toUTCString(), "; ");
  document.cookie = cookie;
}

var CookieStorage = /*#__PURE__*/function () {
  function CookieStorage() {
    _classCallCheck(this, CookieStorage);
  }

  _createClass(CookieStorage, [{
    key: "keys",
    value: function keys() {
      return getCookies();
    }
  }, {
    key: "getItem",
    value: function getItem(key) {
      var value = getCookie(key);
      return JSON.parse(value);
    }
  }, {
    key: "setItem",
    value: function setItem(key, value) {
      setCookie(key, JSON.stringify(value), 60);
    }
  }, {
    key: "removeItem",
    value: function removeItem(key) {
      setCookie(key, '', -60);
    }
  }, {
    key: "clear",
    value: function clear() {}
  }]);

  return CookieStorage;
}();
var LocalStorage = /*#__PURE__*/function () {
  /**
   * [constructor description]
   * @param {object} [type] - window.sessionStorage
   */
  function LocalStorage(type) {
    _classCallCheck(this, LocalStorage);

    var test = '##-test';
    this._store = type || window.localStorage;

    this._store.setItem(test, test);

    this._store.removeItem(test);
  }

  _createClass(LocalStorage, [{
    key: "keys",
    value: function keys() {
      return this._store;
    }
  }, {
    key: "getItem",
    value: function getItem(key) {
      var value = this._store.getItem(key);

      return JSON.parse(value);
    }
  }, {
    key: "setItem",
    value: function setItem(key, value) {
      this._store.setItem(key, JSON.stringify(value));
    }
  }, {
    key: "removeItem",
    value: function removeItem(key) {
      this._store.removeItem(key);
    }
  }, {
    key: "clear",
    value: function clear() {
      this._store.clear();
    }
  }]);

  return LocalStorage;
}();
function storage(type) {
  if (type === 'cookie') {
    return new CookieStorage();
  }

  try {
    return new LocalStorage(type);
  } catch (e) {
    return new CookieStorage();
  }
}
var CallbackStorage = /*#__PURE__*/function () {
  function CallbackStorage(type) {
    _classCallCheck(this, CallbackStorage);

    this._callback = 'oidc-callback-';
    this._store = storage(type);
  }

  _createClass(CallbackStorage, [{
    key: "_clearExpired",
    value: function _clearExpired() {
      var _this = this;

      var time = new Date().getTime();
      var keys = Object.keys(this._store.keys());
      keys.forEach(function (key) {
        if (key.indexOf(_this._callback) === 0) {
          try {
            var _this$_store$getItem = _this._store.getItem(key),
                expires = _this$_store$getItem.expires;

            if (!expires || expires < time) {
              _this._store.removeItem(key);
            }
          } catch (e) {
            _this._store.removeItem(key);
          }
        }
      });
    }
  }, {
    key: "get",
    value: function get(state) {
      if (!state) return;

      this._clearExpired();

      var key = this._callback + state;

      var value = this._store.getItem(key);

      if (value) {
        this._store.removeItem(key);

        return value;
      }
    }
  }, {
    key: "add",
    value: function add(state) {
      this._clearExpired();

      var key = this._callback + state.state;
      state.expires = state.expires || new Date().getTime() + min2ms(60);

      this._store.setItem(key, state);
    }
  }]);

  return CallbackStorage;
}();

/***/ }),

/***/ "./src/utils/urls.js":
/*!***************************!*\
  !*** ./src/utils/urls.js ***!
  \***************************/
/*! namespace exports */
/*! export absoluteUrl [provided] [no usage info] [missing usage info prevents renaming] */
/*! export clearUrl [provided] [no usage info] [missing usage info prevents renaming] */
/*! export createUrl [provided] [no usage info] [missing usage info prevents renaming] */
/*! export urlEncoded [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "absoluteUrl": () => /* binding */ absoluteUrl,
/* harmony export */   "clearUrl": () => /* binding */ clearUrl,
/* harmony export */   "createUrl": () => /* binding */ createUrl,
/* harmony export */   "urlEncoded": () => /* binding */ urlEncoded
/* harmony export */ });
var hasProto = function hasProto(proto) {
  return /^https?:/.test(proto);
};

function absoluteUrl(url, origin) {
  if (hasProto(url)) {
    return url;
  } else {
    var u = new URL(origin || window.location.origin);
    u.pathname = url;
    return u.toString();
  }
}
function clearUrl(url) {
  var parts = url.split('/').filter(Boolean);
  var proto = parts.shift();
  return (hasProto(proto) ? "".concat(proto, "//") : "/".concat(proto, "/")) + parts.join('/');
}
function createUrl(url, query) {
  var u = new URL(clearUrl(url));

  if (query) {
    u.search = urlEncoded(query);
  }

  return u.toString();
}
function urlEncoded(query) {
  return new URLSearchParams(Object.entries(JSON.parse(JSON.stringify(query)))).toString();
}

/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 732:31-45 */
/***/ ((module) => {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : 0
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ }),

/***/ "./test/html/app.js":
/*!**************************!*\
  !*** ./test/html/app.js ***!
  \**************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var regenerator_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var _src_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../src/index.js */ "./src/client.js");
/* eslint no-console: off */

;
(function () {
  const port = 3000
  const LSKEY = 'my-app'

  const id = {
    settings: document.getElementById('settings'),
    token: document.getElementById('token'),
    nav: document.getElementById('nav')
  }

  const options = {
    log: console,
    url: `http://localhost:${port}/oidc`,
    realm: '',
    clientId: 'my-app',
    forceLogin: false,
    forceLogout: true,
    scope: 'openid',
    useNonce: true,
    useLocalStorage: true,
    minValidity: 15,
    expiryInterval: 5,
    responseMode: 'fragment',
    responseType: 'code',
    flow: 'standard',
    pkceMethod: '',
    prompt: 'none',
    useStatusIframe: true,
    statusIframeInterval: 5,
    silentLoginRedirectUri: '/silent-login-check.html',
    redirectUri: '',
    postLogoutRedirectUri: '',
    authorizationParams: {}
  }

  // --- rendering ---

  const load = () =>
    JSON.parse(localStorage.getItem(LSKEY) || '{}')
  const store = ({ log, ...opts }) =>
    localStorage.setItem(LSKEY, JSON.stringify(opts))

  function renderSettings (_options) {
    const options = { ..._options }
    const formMeta = {
      url: { type: 'text' },
      realm: { type: 'text' },
      clientId: { type: 'text' },
      // forceLogin: { type: 'checkbox' },
      forceLogout: { type: 'checkbox' },
      scope: { type: 'text' },
      useNonce: { type: 'checkbox' },
      useLocalStorage: { type: 'checkbox' },
      minValidity: { type: 'text' },
      expiryInterval: { type: 'text' },
      responseMode: { options: ['fragment', 'query'] },
      responseType: {
        options: [
          'code',
          'none',
          'id_token',
          'token',
          'id_token token',
          'code id_token',
          'code token',
          'code id_token token'
        ]
      },
      flow: { options: ['standard', 'hybrid', 'implicit'] },
      prompt: { options: ['none', 'login'] },
      pkceMethod: { options: ['', 'S256'] },
      useStatusIframe: { type: 'checkbox' },
      statusIframeInterval: { type: 'text' },
      silentLoginRedirectUri: { type: 'text' },
      redirectUri: { type: 'text' },
      postLogoutRedirectUri: { type: 'text' },
      authorizationParams: { type: 'text' }
    }
    const input = ({ name, value }) => `
      <div>
        <label for="${name}">${name}:</label>
        <input type="text" name="${name}" value="${value}">
      </div>
    `
    const checkbox = ({ name, value }) => `
      <div>
        <label for="${name}">${name}:</label>
        <input type="checkbox" name="${name}" ${value ? 'checked' : ''}>
      </div>
    `
    const select = ({ name, value, options }) => `
      <div>
        <label for="${name}">${name}:</label>
        <select name="${name}">
          ${options.map(option => `<option value="${option}" ${value === option ? 'selected' : ''}>${option}</option>`)}
        </select>
      </div>
    `

    if (options.authorizationParams) {
      options.authorizationParams = JSON.stringify(options.authorizationParams)
    }

    const html = `
    <form onsubmit="return false">
      ${Object.entries(formMeta).map(([name, meta]) => {
        let value = options[name]
        if (typeof value === 'string') {
          value = value.replace(/"/g, '&quot;')
        }
        if (meta.options) {
          return select({ name, value, options: meta.options })
        } else if (meta.type === 'checkbox') {
          return checkbox({ name, value })
        } else {
          return input({ name, value })
        }
      })
        .join('\n')
      }
      <button onclick="window.__settings()">submit</button>
      <button onclick="window.__settingsReset()">reset</button>
    </form>`
    id.settings.innerHTML = html
  }

  const getSettings = () => {
    const form = new FormData(id.settings.querySelector('form'))
    const opts = Array.from(form).reduce((o, [key, value]) => {
      const type = typeof options[key]
      if (type === 'boolean') {
        o[key] = (value === 'on' || value === true)
      } else if (key === 'authorizationParams') {
        try {
          o[key] = JSON.parse(value)
        } catch (e) {
          console.error(value)
          console.error(e)
        }
      } else {
        o[key] = value === '' ? undefined : value
      }
      return o
    }, { ...options })
    store(opts)
    // console.log(localStorage.getItem('my-app'))
    opts.log = console
    return opts
  }

  function renderNav () {
    id.nav.innerHTML = `
      <a href="/">home</a>
      <a href="#" onclick="__login()">login</a>
      <a href="#" onclick="__silentLogin()">silentlogin</a>
      <a href="#" onclick="__logout()">logout</a>
      <a href="#" onclick="__register()">register</a>
      <a href="#" onclick="__account()">account</a>
      <a href="#" onclick="__userinfo()">userinfo</a>
      <a href="#" onclick="__wellknownConfig()">well-known</a>
    `
  }

  function renderContent (content) {
    if (typeof content === 'object') {
      content = JSON.stringify(content, null, 2)
    }
    id.token.textContent = content
  }

  let client
  function setupClient () {
    client = new _src_index_js__WEBPACK_IMPORTED_MODULE_1__.Client(getSettings())

    client.on('token', tokens => {
      console.log(tokens)
      renderContent(tokens)
    })
    client.on('logout', () => {
      renderContent('logged out')
    })
    client.on('error', err => {
      console.log(err)
      const { message, description, stack } = err
      renderContent({ message, description, stack })
    })

    return client.init()
      .catch(() => {})
      .then(() => client)
  }

  // ---

  renderNav()
  // console.log(load())
  renderSettings({ ...options, ...load() })
  setupClient().catch(() => {})

  window.__settings = () => {
    setupClient().catch(() => {})
  }
  window.__settingsReset = () => {
    localStorage.removeItem(LSKEY)
    renderSettings({ ...options, ...load() })
    setupClient().catch(() => {})
  }

  window.__login = () =>
    client.login().catch(console.error)
  window.__silentLogin = () =>
    client.silentLogin().catch(console.error)
  window.__logout = () =>
    client.logout().catch(console.error)
  window.__register = () =>
    client.register().catch(console.error)
  window.__account = () =>
    client.account().catch(console.error)
  window.__userinfo = () =>
    client.userinfo().then(info => renderContent(info)).catch(console.error)
  window.__wellknownConfig = () => {
    const opts = getSettings()
    const url = `${opts.url}${opts.realm ? `/realms/${opts.realm}` : ''}/.well-known/openid-configuration`
    window.open(url, '_blanc')
  }
})()


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./test/html/app.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vaWRjLWNvbm5lY3Rvci8uL3NyYy9hZGFwdGVyL2RlZmF1bHQuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jb25uZWN0b3IvLi9zcmMvY2xpZW50LmpzIiwid2VicGFjazovL29pZGMtY29ubmVjdG9yLy4vc3JjL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9vaWRjLWNvbm5lY3Rvci8uL3NyYy9lbmRwb2ludHMuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jb25uZWN0b3IvLi9zcmMvdG9rZW5zLmpzIiwid2VicGFjazovL29pZGMtY29ubmVjdG9yLy4vc3JjL3V0aWxzL0V2ZW50RW1pdHRlci5qcyIsIndlYnBhY2s6Ly9vaWRjLWNvbm5lY3Rvci8uL3NyYy91dGlscy9jYWxsYmFjay5qcyIsIndlYnBhY2s6Ly9vaWRjLWNvbm5lY3Rvci8uL3NyYy91dGlscy9jaGVja1NpbGVudExvZ2luLmpzIiwid2VicGFjazovL29pZGMtY29ubmVjdG9yLy4vc3JjL3V0aWxzL2NyZWF0ZUlmcmFtZS5qcyIsIndlYnBhY2s6Ly9vaWRjLWNvbm5lY3Rvci8uL3NyYy91dGlscy9jcmVhdGVQcm9taXNlLmpzIiwid2VicGFjazovL29pZGMtY29ubmVjdG9yLy4vc3JjL3V0aWxzL2RlY29kZVRva2VuLmpzIiwid2VicGFjazovL29pZGMtY29ubmVjdG9yLy4vc3JjL3V0aWxzL2dldC5qcyIsIndlYnBhY2s6Ly9vaWRjLWNvbm5lY3Rvci8uL3NyYy91dGlscy9nbG9iYWxUaGlzLmpzIiwid2VicGFjazovL29pZGMtY29ubmVjdG9yLy4vc3JjL3V0aWxzL2luaXRPcHRpb25zLmpzIiwid2VicGFjazovL29pZGMtY29ubmVjdG9yLy4vc3JjL3V0aWxzL2xvYWRDb25maWcuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jb25uZWN0b3IvLi9zcmMvdXRpbHMvcGtjZS5qcyIsIndlYnBhY2s6Ly9vaWRjLWNvbm5lY3Rvci8uL3NyYy91dGlscy9yYW5kb20uanMiLCJ3ZWJwYWNrOi8vb2lkYy1jb25uZWN0b3IvLi9zcmMvdXRpbHMvc3RhdHVzSWZyYW1lLmpzIiwid2VicGFjazovL29pZGMtY29ubmVjdG9yLy4vc3JjL3V0aWxzL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jb25uZWN0b3IvLi9zcmMvdXRpbHMvdXJscy5qcyIsIndlYnBhY2s6Ly9vaWRjLWNvbm5lY3Rvci8uL25vZGVfbW9kdWxlcy9yZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUuanMiLCJ3ZWJwYWNrOi8vb2lkYy1jb25uZWN0b3IvLi90ZXN0L2h0bWwvYXBwLmpzIiwid2VicGFjazovL29pZGMtY29ubmVjdG9yL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29pZGMtY29ubmVjdG9yL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vaWRjLWNvbm5lY3Rvci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29pZGMtY29ubmVjdG9yL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb2lkYy1jb25uZWN0b3Ivd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbIkFkYXB0ZXIiLCJjbGllbnQiLCJlbmRwb2ludHMiLCJvcHRpb25zIiwiRXJyb3IiLCJ1cmwiLCJVUkwiLCJsb2NhdGlvbiIsImhyZWYiLCJzZWFyY2giLCJoYXNoIiwicmVkaXJlY3RVcmkiLCJ0b1N0cmluZyIsIm9wdHMiLCJfaXNJbml0aWFsaXplZCIsImNyZWF0ZUxvZ2luVXJsIiwid2luZG93IiwicmVwbGFjZSIsImNyZWF0ZVJlZ2lzdGVyVXJsIiwiaWRUb2tlbiIsImNyZWF0ZUxvZ291dFVybCIsImNyZWF0ZUFjY291bnRVcmwiLCJDbGllbnQiLCJpbml0T3B0aW9ucyIsImFkYXB0ZXIiLCJjYWxsYmFjayIsIkNhbGxiYWNrIiwidG9rZW5zIiwiVG9rZW5zIiwiZGVib3VuY2UiLCJkZWJvdW5jZVByb21pc2VzIiwic3RhdHVzSWZyYW1lIiwiZnJvbUluaXRPcHRpb25zIiwibG9nIiwibG9hZENvbmZpZyIsInNlcnZlclVybCIsImNsaWVudElkIiwib2lkY0NvbmZpZyIsIlN0YXR1c0lmcmFtZSIsImluaXRpYWxpemUiLCJpbmZvIiwiX3Byb2Nlc3NJbml0IiwiX3NjaGVkdWxlIiwiX2hhbmRsZVRva2VuIiwiX2hhbmRsZUVycm9yIiwiUHJvbWlzZSIsInJlamVjdCIsIm9hdXRoIiwicGFyc2UiLCJoaXN0b3J5IiwicmVwbGFjZVN0YXRlIiwic3RhdGUiLCJuZXdVcmwiLCJ2YWxpZCIsInNldHVwIiwiX3Byb2Nlc3NDYWxsYmFjayIsInRva2VuIiwicmVmcmVzaFRva2VuIiwiX3Byb2Nlc3NXaXRoVG9rZW5zIiwiZm9yY2VMb2dpbiIsImxvZ2luIiwic2NoZWR1bGUiLCJtaW5WYWxpZGl0eSIsImVuYWJsZWQiLCJfcmVmcmVzaCIsInRoZW4iLCJnZXRUb2tlbnMiLCJmbG93IiwiY29kZSIsImVycm9yIiwia2NfYWN0aW9uX3N0YXR1cyIsImVtaXQiLCJzdGF0dXMiLCJlcnIiLCJkZXNjcmlwdGlvbiIsImVycm9yX2Rlc2NyaXB0aW9uIiwiU1RBTkRBUkQiLCJhY2Nlc3NfdG9rZW4iLCJpZF90b2tlbiIsIl9hdXRoU3VjY2VzcyIsIklNUExJQ0lUIiwicXVlcnkiLCJncmFudF90eXBlIiwiY2xpZW50X2lkIiwicmVkaXJlY3RfdXJpIiwicGtjZUNvZGVWZXJpZmllciIsImNvZGVfdmVyaWZpZXIiLCJjcmVhdGVUb2tlblVybCIsInN0YXJ0VG9rZW5SZXF1ZXN0IiwiZmV0Y2hUb2tlbiIsInJlcyIsImpzb24iLCJ0b2tlblJlc3BvbnNlIiwiZ2V0Iiwic2V0VG9rZW5zIiwiaXNJbnZhbGlkTm9uY2UiLCJzdG9yZWROb25jZSIsInByb21pc2UiLCJjcmVhdGVQcm9taXNlIiwibmVlZHNSZWZyZXNoIiwiaXNUb2tlbkV4cGlyZWQiLCJleHBpcmVzSW4iLCJyZXNvbHZlIiwicHVzaCIsInJlZnJlc2hfdG9rZW4iLCJyZXNvbHZlQWxsIiwiX2hhbmRsZUxvZ291dCIsInJlamVjdEFsbCIsImV4cGlyeUludGVydmFsIiwiX2V4cGlyeVRpbWVySWQiLCJzZXRUaW1lb3V0IiwibWVzc2FnZSIsImZvcmNlTG9nb3V0IiwiY2xlYXJUb2tlbnMiLCJsb2dvdXQiLCJpc0V4cGlyZWQiLCJwcm9tcHQiLCJMT0dJTiIsInNpbGVudExvZ2luUmVkaXJlY3RVcmkiLCJjaGVja1NpbGVudExvZ2luIiwiY2xlYXJTY2hlZHVsZSIsImNsZWFyVGltZW91dCIsInVzZXJpbmZvIiwiYmVhcmVyVG9rZW4iLCJmZXRjaCIsImhlYWRlcnMiLCJBY2NlcHQiLCJBdXRob3JpemF0aW9uIiwicmVzcG9uc2UiLCJyZWdpc3RlciIsImFjY291bnQiLCJFdmVudEVtaXR0ZXIiLCJtZXRob2QiLCJUWVBFX1VSTEVOQ09ERUQiLCJib2R5IiwidXJsRW5jb2RlZCIsIk9QRU5JRCIsIkZSQUdNRU5UIiwiUVVFUlkiLCJIWUJSSUQiLCJUT0tFTiIsIkNPREUiLCJTVEFURSIsIlNFU1NJT05fU1RBVEUiLCJSRVNQT05TRV9NT0RFIiwiQUNDRVNTX1RPS0VOIiwiUkVGUkVTSF9UT0tFTiIsIklEX1RPS0VOIiwiRVhQSVJFU19JTiIsIktDX0FDVElPTl9TVEFUVVMiLCJUT0tFTl9UWVBFIiwiRVJST1IiLCJFUlJPUl9ERVNDUklQVElPTiIsIkVSUk9SX1VSSSIsIk5PTkUiLCJDSEFOR0VEIiwiVU5DSEFOR0VEIiwiRW5kcG9pbnRzIiwiYXV0aG9yaXphdGlvbl9lbmRwb2ludCIsInRva2VuX2VuZHBvaW50IiwiaW5jbHVkZXMiLCJ1dWlkNCIsIm5vbmNlIiwicmVzcG9uc2VNb2RlIiwicmVzcG9uc2VUeXBlIiwic2NvcGUiLCJ1c2VOb25jZSIsIm1heEFnZSIsImxvZ2luSGludCIsImlkcEhpbnQiLCJhY3Rpb24iLCJsb2NhbGUiLCJwa2NlTWV0aG9kIiwiYXV0aG9yaXphdGlvblBhcmFtcyIsImRvUmVnaXN0ZXIiLCJjYWxsYmFja1N0YXRlIiwiZXhwaXJlcyIsIkRhdGUiLCJnZXRUaW1lIiwiYmFzZVVybCIsImF1dGhvcml6ZSIsInJlc3BvbnNlX21vZGUiLCJyZXNwb25zZV90eXBlIiwibWF4X2FnZSIsImxvZ2luX2hpbnQiLCJrY19pZHBfaGludCIsInVpX2xvY2FsZXMiLCJwa2NlIiwiY29kZVZlcmlmaWVyIiwiY2hhbGxlbmdlIiwiY29kZV9jaGFsbGVuZ2UiLCJjb2RlX2NoYWxsZW5nZV9tZXRob2QiLCJzdG9yZSIsImNyZWF0ZVVybCIsInBvc3RMb2dvdXRSZWRpcmVjdFVyaSIsInBvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaSIsImlkX3Rva2VuX2hpbnQiLCJyZWZlcnJlciIsInJlZmVycmVyX3VyaSIsImVuZF9zZXNzaW9uX2VuZHBvaW50IiwiY2hlY2tfc2Vzc2lvbl9pZnJhbWUiLCJ1c2VyaW5mb19lbmRwb2ludCIsInVzZXJSZWdpc3RyYXRpb25FbmRwb2ludCIsIl9tYXliZUtleWNsb2FrIiwidXNlckFjY291bnRFbmRwb2ludCIsIm5vdyIsIk1hdGgiLCJjZWlsIiwidG9OdW1iZXIiLCJudW0iLCJkZWYiLCJpc05hTiIsIk51bWJlciIsImNsYWltIiwidCIsInVzZUxvY2FsU3RvcmFnZSIsIl91c2VOb25jZSIsIl9hdXRoZW50aWNhdGVkIiwiX3RpbWVTa2V3IiwiX2V4cGlyZXNBdCIsIl9zdG9yZSIsIlN0b3JlIiwiX21pblZhbGlkaXR5IiwibHMiLCJleHBpcmVzQXQiLCJfdGltZUxvY2FsIiwiZXhwaXJlc19pbiIsInJlZnJlc2hUb2tlblBhcnNlZCIsImRlY29kZVRva2VuIiwiZSIsImlkVG9rZW5QYXJzZWQiLCJ0b2tlblBhcnNlZCIsImlhdCIsImZsb29yIiwib2JqIiwicmVkdWNlIiwibyIsImtleSIsInBhcnNlZCIsInZlcmlmeSIsImludmFsaWQiLCJUT0tFTl9FWFBJUkVTX0FUIiwiTG9jYWxTdG9yYWdlIiwidW5kZWZpbmVkIiwic2V0SXRlbSIsInJlbW92ZUl0ZW0iLCJfc2V0IiwiZ2V0SXRlbSIsIl9ldmVudHMiLCJldmVudE5hbWUiLCJNYXAiLCJsaXN0ZW5lciIsIl9nZXRNYXAiLCJzZXQiLCJhcmdzIiwiXyIsIlBBUkFNUyIsIl9mbG93IiwiX3Jlc3BvbnNlTW9kZSIsIkNhbGxiYWNrU3RvcmFnZSIsImFkZCIsIl9wYXJzZVVybCIsIm9hdXRoU3RhdGUiLCJzdXBwb3J0ZWRQYXJhbXMiLCJjb25jYXQiLCJ1cmkiLCJwYXJhbSIsInZhbCIsInNlYXJjaFBhcmFtcyIsIlVSTFNlYXJjaFBhcmFtcyIsInN1YnN0cmluZyIsIk1FU1NBR0UiLCJzcmMiLCJpZnJhbWUiLCJjcmVhdGVJZnJhbWUiLCJ0aXRsZSIsImhhbmRsZU1lc3NhZ2UiLCJldiIsIm9yaWdpbiIsImNvbnRlbnRXaW5kb3ciLCJzb3VyY2UiLCJkYXRhIiwiZG9jdW1lbnQiLCJyZW1vdmVDaGlsZCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiY3JlYXRlRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsInN0eWxlIiwiZGlzcGxheSIsImFwcGVuZENoaWxkIiwiX3Jlc29sdmUiLCJfcmVqZWN0IiwicXVldWUiLCJsZW5ndGgiLCJyZXN1bHQiLCJzaGlmdCIsIm1hcCIsIlJFX01BUCIsInBheWxvYWQiLCJzcGxpdCIsImI2NCIsIm0iLCJzdHIiLCJkZWNvZGVVUklDb21wb25lbnQiLCJlc2NhcGUiLCJhdG9iIiwiSlNPTiIsImtleXMiLCJfZ2xvYmFsVGhpcyIsImdsb2JhbFRoaXMiLCJnbG9iYWwiLCJBcnJheSIsImlzQXJyYXkiLCJudW1iZXIiLCJmdW5jIiwic2V0UmVzcG9uc2VUeXBlIiwiYWxsb3dlZCIsInR5cGVzIiwidHlwZSIsImluZGV4T2YiLCJTZXQiLCJqb2luIiwidXNlU3RhdHVzSWZyYW1lIiwic3RhdHVzSWZyYW1lSW50ZXJ2YWwiLCJzY29wZV8iLCJmaWx0ZXIiLCJCb29sZWFuIiwibm9PcGVuaWRJblNjb3BlIiwidW5zaGlmdCIsInMiLCJhYnNvbHV0ZVVybCIsImNvbmZpZyIsInJlYWxtIiwiX2NvbmZpZyIsImNsZWFyVXJsIiwib2lkY0NvbmZpZ1VybCIsIm1lcmdlQyIsImMiLCJ1aW50OEFycmF5VG9TdHJpbmciLCJhcnJVaW50OCIsInNVdGY4IiwiaSIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsImdlbkNvZGVWZXJpZmllciIsImxlbiIsImJpbmFyeSIsImdlblJhbmRvbURhdGEiLCJiYXNlNjRFbmNvZGUiLCJVaW50OEFycmF5IiwiZW5jb2RlZCIsImNyZWF0ZUhhc2giLCJidWZmZXIiLCJhbGdvcml0aG0iLCJlbmNvZGUiLCJnZW5Qa2NlQ2hhbGxlbmdlIiwidGVzdCIsImNyeXB0byIsImdldFJhbmRvbVZhbHVlcyIsImFycmF5IiwiZnJvbSIsInJhbmRvbSIsImFyciIsInBvcCIsIlRJVExFIiwiaWZyYW1lT3JpZ2luIiwiaW50ZXJ2YWwiLCJ0aW1lcklkIiwiY2hlY2siLCJhdXRoVXJsIiwiY2hhckF0IiwiY2hlY2tTZXNzaW9uSWZyYW1lIiwiZGlzYWJsZSIsImhhbmRsZUxvYWQiLCJldmVudCIsInNlc3Npb25TdGF0ZSIsIm1zZyIsInBvc3RNZXNzYWdlIiwibmVlZHNGaXJzdENoZWNrIiwibWluMm1zIiwibWluIiwiZ2V0Q29va2llIiwibmFtZSIsImNhIiwiY29va2llIiwidHJpbVN0YXJ0IiwiZ2V0Q29va2llcyIsImV4ZWMiLCJ2YWx1ZSIsImNvb2tpZUV4cGlyYXRpb24iLCJtaW51dGVzIiwiZXhwIiwic2V0VGltZSIsInNldENvb2tpZSIsImV4cGlyYXRpb25EYXRlIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwidG9VVENTdHJpbmciLCJDb29raWVTdG9yYWdlIiwic3RyaW5naWZ5IiwibG9jYWxTdG9yYWdlIiwiY2xlYXIiLCJzdG9yYWdlIiwiX2NhbGxiYWNrIiwidGltZSIsIk9iamVjdCIsImZvckVhY2giLCJfY2xlYXJFeHBpcmVkIiwiaGFzUHJvdG8iLCJwcm90byIsInUiLCJwYXRobmFtZSIsInBhcnRzIiwiZW50cmllcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0Esd0NBQXdDLFdBQVc7QUFDbkQ7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsU0FBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQ0FBb0MsY0FBYztBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQ0FBaUMsa0JBQWtCO0FBQ25EO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixpQkFBaUI7QUFDekM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBLFlBQVk7QUFDWjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDhDQUE4QyxRQUFRO0FBQ3REO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLDhDQUE4QyxRQUFRO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0EsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLEtBQTBCLG9CQUFvQixDQUFFO0FBQ2xEOztBQUVBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM3VCQTs7QUFFQSxDQUE0QjtBQUczQjtBQUNEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNkJBQTZCLEtBQUs7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsaURBQWlEO0FBQ2pELGtCQUFrQixlQUFlO0FBQ2pDOztBQUVBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EsWUFBWSxlQUFlO0FBQzNCLGNBQWMsZUFBZTtBQUM3QixpQkFBaUIsZUFBZTtBQUNoQyxzQkFBc0IsbUJBQW1CO0FBQ3pDLG9CQUFvQixtQkFBbUI7QUFDdkMsY0FBYyxlQUFlO0FBQzdCLGlCQUFpQixtQkFBbUI7QUFDcEMsd0JBQXdCLG1CQUFtQjtBQUMzQyxvQkFBb0IsZUFBZTtBQUNuQyx1QkFBdUIsZUFBZTtBQUN0QyxxQkFBcUIsaUNBQWlDO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsYUFBYSw4Q0FBOEM7QUFDM0QsZUFBZSw2QkFBNkI7QUFDNUMsbUJBQW1CLHdCQUF3QjtBQUMzQyx3QkFBd0IsbUJBQW1CO0FBQzNDLDZCQUE2QixlQUFlO0FBQzVDLCtCQUErQixlQUFlO0FBQzlDLG9CQUFvQixlQUFlO0FBQ25DLDhCQUE4QixlQUFlO0FBQzdDLDRCQUE0QjtBQUM1QjtBQUNBLG9CQUFvQixjQUFjO0FBQ2xDO0FBQ0Esc0JBQXNCLEtBQUssSUFBSSxLQUFLO0FBQ3BDLG1DQUFtQyxLQUFLLFdBQVcsTUFBTTtBQUN6RDtBQUNBO0FBQ0EsdUJBQXVCLGNBQWM7QUFDckM7QUFDQSxzQkFBc0IsS0FBSyxJQUFJLEtBQUs7QUFDcEMsdUNBQXVDLEtBQUssSUFBSSx1QkFBdUI7QUFDdkU7QUFDQTtBQUNBLHFCQUFxQix1QkFBdUI7QUFDNUM7QUFDQSxzQkFBc0IsS0FBSyxJQUFJLEtBQUs7QUFDcEMsd0JBQXdCLEtBQUs7QUFDN0IsWUFBWSx3Q0FBd0MsT0FBTyxJQUFJLG1DQUFtQyxHQUFHLE9BQU87QUFDNUc7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBLHlCQUF5QixxQ0FBcUM7QUFDOUQsU0FBUztBQUNULDJCQUEyQixjQUFjO0FBQ3pDLFNBQVM7QUFDVCx3QkFBd0IsY0FBYztBQUN0QztBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSyxHQUFHLGFBQWE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIsaURBQU07O0FBRXZCO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxhQUFhLDhCQUE4QjtBQUMzQyxxQkFBcUIsOEJBQThCO0FBQ25ELEtBQUs7O0FBRUw7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCLHdCQUF3QjtBQUMxQyw4QkFBOEI7O0FBRTlCO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQix3QkFBd0I7QUFDNUMsZ0NBQWdDO0FBQ2hDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsU0FBUyxFQUFFLHdCQUF3QixXQUFXLE9BQU87QUFDeEU7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7VUN0T0Q7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDckJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSxzRjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7OztVQ05BO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5leHBvcnQgY2xhc3MgQWRhcHRlciB7XG4gIGluaXRpYWxpemUgKGNsaWVudCkge1xuICAgIHRoaXMuY2xpZW50ID0gY2xpZW50XG4gICAgdGhpcy5lbmRwb2ludHMgPSBjbGllbnQuZW5kcG9pbnRzXG4gICAgdGhpcy5vcHRpb25zID0gY2xpZW50Lm9wdGlvbnNcbiAgfVxuXG4gIF9pc0luaXRpYWxpemVkICgpIHtcbiAgICBpZiAoIXRoaXMub3B0aW9ucykgdGhyb3cgbmV3IEVycm9yKCdhZGFwdGVyIG5vdCBpbml0aWFsaXplZCcpXG4gIH1cblxuICByZWRpcmVjdFVyaSAoKSB7XG4gICAgY29uc3QgdXJsID0gbmV3IFVSTChsb2NhdGlvbi5ocmVmKVxuICAgIHVybC5zZWFyY2ggPSB1cmwuaGFzaCA9ICcnXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5yZWRpcmVjdFVyaSB8fCB1cmwudG9TdHJpbmcoKVxuICB9XG5cbiAgYXN5bmMgbG9naW4gKG9wdHMpIHtcbiAgICB0aGlzLl9pc0luaXRpYWxpemVkKClcbiAgICBjb25zdCB1cmwgPSBhd2FpdCB0aGlzLmVuZHBvaW50cy5jcmVhdGVMb2dpblVybCh7IC4uLnRoaXMub3B0aW9ucywgLi4ub3B0cyB9KVxuICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHVybClcbiAgfVxuXG4gIGFzeW5jIHJlZ2lzdGVyICgpIHtcbiAgICB0aGlzLl9pc0luaXRpYWxpemVkKClcbiAgICBjb25zdCB1cmwgPSBhd2FpdCB0aGlzLmVuZHBvaW50cy5jcmVhdGVSZWdpc3RlclVybCh0aGlzLm9wdGlvbnMpXG4gICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UodXJsKVxuICB9XG5cbiAgYXN5bmMgbG9nb3V0ICh7IGlkVG9rZW4gfSkge1xuICAgIHRoaXMuX2lzSW5pdGlhbGl6ZWQoKVxuICAgIGNvbnN0IHVybCA9IGF3YWl0IHRoaXMuZW5kcG9pbnRzLmNyZWF0ZUxvZ291dFVybCh0aGlzLm9wdGlvbnMsIHsgaWRUb2tlbiB9KVxuICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHVybClcbiAgfVxuXG4gIGFzeW5jIGFjY291bnQgKCkge1xuICAgIHRoaXMuX2lzSW5pdGlhbGl6ZWQoKVxuICAgIGNvbnN0IHVybCA9IGF3YWl0IHRoaXMuZW5kcG9pbnRzLmNyZWF0ZUFjY291bnRVcmwodGhpcy5vcHRpb25zKVxuICAgIGlmICh1cmwpIHtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdXJsXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm90IHN1cHBvcnRlZCBieSB0aGUgT0lEQyBzZXJ2ZXInKVxuICAgIH1cbiAgfVxufVxuIiwiLyoqXG5Db3B5cmlnaHQgMjAxNiBSZWQgSGF0LCBJbmMuIGFuZC9vciBpdHMgYWZmaWxpYXRlcyBhbmQgb3RoZXIgY29udHJpYnV0b3JzLlxuQ29weXJpZ2h0IDIwMjAgc3B1cnJlaXRlclxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbmh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuKi9cblxuaW1wb3J0IHsgQWRhcHRlciB9IGZyb20gJy4vYWRhcHRlci9kZWZhdWx0LmpzJ1xuaW1wb3J0IHsgVG9rZW5zIH0gZnJvbSAnLi90b2tlbnMuanMnXG5pbXBvcnQgeyBlbmRwb2ludHMgfSBmcm9tICcuL2VuZHBvaW50cy5qcydcblxuaW1wb3J0IHtcbiAgQ2FsbGJhY2ssXG4gIGNoZWNrU2lsZW50TG9naW4sXG4gIGNyZWF0ZVByb21pc2UsXG4gIGRlYm91bmNlUHJvbWlzZXMsXG4gIEV2ZW50RW1pdHRlcixcbiAgZ2V0LFxuICBpbml0T3B0aW9ucyxcbiAgbG9hZENvbmZpZyxcbiAgU3RhdHVzSWZyYW1lLFxuICB1cmxFbmNvZGVkXG59IGZyb20gJy4vdXRpbHMvaW5kZXguanMnXG5cbmltcG9ydCB7XG4gIElNUExJQ0lULFxuICBMT0dJTixcbiAgU1RBTkRBUkQsXG4gIFRZUEVfVVJMRU5DT0RFRFxufSBmcm9tICcuL2NvbnN0YW50cy5qcydcblxuZXhwb3J0IGNsYXNzIENsaWVudCBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIGNvbnN0cnVjdG9yIChvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5vcHRpb25zID0gaW5pdE9wdGlvbnMob3B0aW9ucylcbiAgICB0aGlzLmFkYXB0ZXIgPSBvcHRpb25zLmFkYXB0ZXIgfHwgbmV3IEFkYXB0ZXIoKVxuICAgIHRoaXMuY2FsbGJhY2sgPSBuZXcgQ2FsbGJhY2sodGhpcy5vcHRpb25zKVxuICAgIHRoaXMudG9rZW5zID0gbmV3IFRva2Vucyh0aGlzLm9wdGlvbnMpXG4gICAgdGhpcy5kZWJvdW5jZSA9IGRlYm91bmNlUHJvbWlzZXMoKVxuICAgIHRoaXMuZW5kcG9pbnRzID0gbnVsbFxuICAgIHRoaXMuc3RhdHVzSWZyYW1lID0gbnVsbFxuICAgIC8vIHRyeSB0byBsb2FkIHRva2Vuc1xuICAgIHRoaXMudG9rZW5zLmZyb21Jbml0T3B0aW9ucyh0aGlzLm9wdGlvbnMpXG4gIH1cblxuICBhc3luYyBpbml0ICgpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBsb2cgfSA9IHRoaXMub3B0aW9uc1xuICAgICAgY29uc3Qge1xuICAgICAgICBzZXJ2ZXJVcmwsXG4gICAgICAgIGNsaWVudElkLFxuICAgICAgICBvaWRjQ29uZmlnXG4gICAgICB9ID0gYXdhaXQgbG9hZENvbmZpZyh0aGlzLm9wdGlvbnMpXG4gICAgICB0aGlzLm9wdGlvbnMuY2xpZW50SWQgPSBjbGllbnRJZFxuICAgICAgdGhpcy5lbmRwb2ludHMgPSBlbmRwb2ludHMoc2VydmVyVXJsLCBvaWRjQ29uZmlnLCB0aGlzLmNhbGxiYWNrKVxuICAgICAgdGhpcy5zdGF0dXNJZnJhbWUgPSBuZXcgU3RhdHVzSWZyYW1lKHRoaXMpXG4gICAgICB0aGlzLmFkYXB0ZXIuaW5pdGlhbGl6ZSh0aGlzKVxuICAgICAgdGhpcy5vcHRpb25zLnJlZGlyZWN0VXJpID0gdGhpcy5hZGFwdGVyLnJlZGlyZWN0VXJpKClcbiAgICAgIGxvZy5pbmZvKCdvaWRjQ29uZmlnIGxvYWRlZCAlbycsIG9pZGNDb25maWcpXG5cbiAgICAgIGF3YWl0IHRoaXMuX3Byb2Nlc3NJbml0KClcbiAgICAgIHRoaXMuX3NjaGVkdWxlKClcbiAgICAgIHJldHVybiB0aGlzLl9oYW5kbGVUb2tlbigpXG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aGlzLl9oYW5kbGVFcnJvcihlcnIpXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIF9wcm9jZXNzSW5pdCAoKSB7XG4gICAgY29uc3Qgb2F1dGggPSB0aGlzLmNhbGxiYWNrLnBhcnNlKHdpbmRvdy5sb2NhdGlvbi5ocmVmKVxuICAgIGlmIChvYXV0aCkge1xuICAgICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHdpbmRvdy5oaXN0b3J5LnN0YXRlLCBudWxsLCBvYXV0aC5uZXdVcmwpXG4gICAgICBpZiAob2F1dGgudmFsaWQpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5zdGF0dXNJZnJhbWUuc2V0dXAoKVxuICAgICAgICByZXR1cm4gdGhpcy5fcHJvY2Vzc0NhbGxiYWNrKG9hdXRoKVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHsgdG9rZW4sIHJlZnJlc2hUb2tlbiB9ID0gdGhpcy50b2tlbnNcbiAgICBpZiAodG9rZW4gJiYgcmVmcmVzaFRva2VuKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcHJvY2Vzc1dpdGhUb2tlbnMoKVxuICAgIH1cbiAgICBpZiAodGhpcy5vcHRpb25zLmZvcmNlTG9naW4pIHtcbiAgICAgIHJldHVybiB0aGlzLmxvZ2luKClcbiAgICB9XG4gIH1cblxuICBhc3luYyBfcHJvY2Vzc1dpdGhUb2tlbnMgKCkge1xuICAgIC8vIGNoZWNrIGlmIHNlc3Npb24gaXMgc3RpbGwgdmFsaWRcbiAgICAvLyB0aHJvd3MgaWYgaW52YWxpZCBvdGhlcndpc2Ugc3RhcnRzIHRpbWVyXG4gICAgYXdhaXQgdGhpcy5zdGF0dXNJZnJhbWUuc2NoZWR1bGUoKVxuXG4gICAgLy8gZm9yY2UgcmVmcmVzaCBpZiBzdGF0dXMgaWZyYW1lIGlzIGRpc2FibGVkXG4gICAgY29uc3QgbWluVmFsaWRpdHkgPSAhdGhpcy5zdGF0dXNJZnJhbWUuZW5hYmxlZCAmJiAtMVxuXG4gICAgcmV0dXJuIHRoaXMuX3JlZnJlc2gobWluVmFsaWRpdHkpXG4gICAgICAudGhlbih0b2tlbnMgPT4gdG9rZW5zIHx8IHRoaXMudG9rZW5zLmdldFRva2VucygpKSAvLyB0b2tlbnMgbWF5IG5vdCBiZSBwcmVzZW50IGlmIG5vdCB5ZXQgZXhwaXJlZFxuICB9XG5cbiAgYXN5bmMgX3Byb2Nlc3NDYWxsYmFjayAob2F1dGgpIHtcbiAgICBjb25zdCB7IGZsb3csIGNsaWVudElkIH0gPSB0aGlzLm9wdGlvbnNcbiAgICBjb25zdCB7IGNvZGUsIGVycm9yIH0gPSBvYXV0aFxuXG4gICAgaWYgKG9hdXRoLmtjX2FjdGlvbl9zdGF0dXMpIHtcbiAgICAgIHRoaXMuZW1pdCgnYWN0aW9uJywgeyBzdGF0dXM6IG9hdXRoLmtjX2FjdGlvbl9zdGF0dXMgfSlcbiAgICB9XG5cbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcihlcnJvcilcbiAgICAgIGVyci5kZXNjcmlwdGlvbiA9IG9hdXRoLmVycm9yX2Rlc2NyaXB0aW9uXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKVxuICAgIH1cblxuICAgIGlmICgoZmxvdyAhPT0gU1RBTkRBUkQpICYmIChvYXV0aC5hY2Nlc3NfdG9rZW4gfHwgb2F1dGguaWRfdG9rZW4pKSB7XG4gICAgICByZXR1cm4gdGhpcy5fYXV0aFN1Y2Nlc3Mob2F1dGgsIG9hdXRoKVxuICAgIH1cblxuICAgIGlmICgoZmxvdyAhPT0gSU1QTElDSVQpICYmIGNvZGUpIHtcbiAgICAgIGNvbnN0IHF1ZXJ5ID0ge1xuICAgICAgICBjb2RlLFxuICAgICAgICBncmFudF90eXBlOiAnYXV0aG9yaXphdGlvbl9jb2RlJyxcbiAgICAgICAgY2xpZW50X2lkOiBjbGllbnRJZCxcbiAgICAgICAgcmVkaXJlY3RfdXJpOiBvYXV0aC5yZWRpcmVjdFVyaVxuICAgICAgfVxuICAgICAgaWYgKG9hdXRoLnBrY2VDb2RlVmVyaWZpZXIpIHtcbiAgICAgICAgcXVlcnkuY29kZV92ZXJpZmllciA9IG9hdXRoLnBrY2VDb2RlVmVyaWZpZXJcbiAgICAgIH1cbiAgICAgIGNvbnN0IHVybCA9IHRoaXMuZW5kcG9pbnRzLmNyZWF0ZVRva2VuVXJsKClcbiAgICAgIHRoaXMudG9rZW5zLnN0YXJ0VG9rZW5SZXF1ZXN0KClcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoVG9rZW4odXJsLCBxdWVyeSlcbiAgICAgIGlmIChyZXMuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgY29uc3QgdG9rZW5SZXNwb25zZSA9IGF3YWl0IHJlcy5qc29uKClcbiAgICAgICAgcmV0dXJuIHRoaXMuX2F1dGhTdWNjZXNzKHRva2VuUmVzcG9uc2UsIG9hdXRoKVxuICAgICAgfVxuICAgICAgY29uc3QgZXJyb3IgPSBhd2FpdCByZXMuanNvbigpXG4gICAgICBjb25zdCBlcnIgPSBuZXcgRXJyb3IoZ2V0KGVycm9yLCAnZXJyb3InLCAnYXV0aCBlcnJvcicpKVxuICAgICAgZXJyLmRlc2NyaXB0aW9uID0gZ2V0KGVycm9yLCAnZXJyb3JfZGVzY3JpcHRpb24nKVxuICAgICAgZXJyLnN0YXR1cyA9IHJlcy5zdGF0dXNcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpXG4gICAgfVxuICB9XG5cbiAgYXN5bmMgX2F1dGhTdWNjZXNzICh0b2tlblJlc3BvbnNlLCBvYXV0aCkge1xuICAgIHRoaXMudG9rZW5zLnNldFRva2Vucyh0b2tlblJlc3BvbnNlKVxuXG4gICAgaWYgKHRoaXMudG9rZW5zLmlzSW52YWxpZE5vbmNlKG9hdXRoLnN0b3JlZE5vbmNlKSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignaW52YWxpZCBub25jZScpKVxuICAgIH1cblxuICAgIGF3YWl0IHRoaXMuc3RhdHVzSWZyYW1lLnNjaGVkdWxlKClcbiAgfVxuXG4gIGFzeW5jIF9yZWZyZXNoIChtaW5WYWxpZGl0eSA9IHRoaXMub3B0aW9ucy5taW5WYWxpZGl0eSkge1xuICAgIGNvbnN0IHByb21pc2UgPSBjcmVhdGVQcm9taXNlKClcbiAgICBjb25zdCB7IGxvZywgY2xpZW50SWQgfSA9IHRoaXMub3B0aW9uc1xuICAgIGNvbnN0IHsgdG9rZW5zIH0gPSB0aGlzXG5cbiAgICBpZiAoIXRoaXMudG9rZW5zLnJlZnJlc2hUb2tlbikge1xuICAgICAgcHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCdubyByZWZyZXNoIHRva2VuJykpXG4gICAgICByZXR1cm4gcHJvbWlzZVxuICAgIH1cblxuICAgIGxldCBuZWVkc1JlZnJlc2ggPSBmYWxzZVxuICAgIGlmIChtaW5WYWxpZGl0eSA9PT0gLTEpIHtcbiAgICAgIG5lZWRzUmVmcmVzaCA9IHRydWVcbiAgICAgIGxvZy5pbmZvKCdmb3JjZWQgcmVmcmVzaCcpXG4gICAgfSBlbHNlIGlmICh0b2tlbnMuaXNUb2tlbkV4cGlyZWQobWluVmFsaWRpdHkpKSB7XG4gICAgICBuZWVkc1JlZnJlc2ggPSB0cnVlXG4gICAgICBsb2cuaW5mbygndG9rZW4gZXhwaXJlZCcpXG4gICAgfVxuXG4gICAgaWYgKCFuZWVkc1JlZnJlc2gpIHtcbiAgICAgIGxvZy5pbmZvKCd0b2tlbiBleHBpcmVzIGluICVzIHNlY29uZHMnLCB0aGlzLnRva2Vucy5leHBpcmVzSW4oKSlcbiAgICAgIHByb21pc2UucmVzb2x2ZSgpXG4gICAgfSBlbHNlIGlmICh0aGlzLmRlYm91bmNlLnB1c2gocHJvbWlzZSkpIHtcbiAgICAgIGNvbnN0IHF1ZXJ5ID0ge1xuICAgICAgICBncmFudF90eXBlOiAncmVmcmVzaF90b2tlbicsXG4gICAgICAgIHJlZnJlc2hfdG9rZW46IHRva2Vucy5yZWZyZXNoVG9rZW4sXG4gICAgICAgIGNsaWVudF9pZDogY2xpZW50SWRcbiAgICAgIH1cbiAgICAgIGNvbnN0IHVybCA9IHRoaXMuZW5kcG9pbnRzLmNyZWF0ZVRva2VuVXJsKClcbiAgICAgIHRoaXMudG9rZW5zLnN0YXJ0VG9rZW5SZXF1ZXN0KClcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoVG9rZW4odXJsLCBxdWVyeSlcbiAgICAgIGlmIChyZXMuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgbG9nLmluZm8oJ3Rva2VuIHJlZnJlc2hlZCcpXG4gICAgICAgIGNvbnN0IHRva2VuUmVzcG9uc2UgPSBhd2FpdCByZXMuanNvbigpXG4gICAgICAgIHRoaXMudG9rZW5zLnNldFRva2Vucyh0b2tlblJlc3BvbnNlKVxuICAgICAgICBhd2FpdCB0aGlzLnN0YXR1c0lmcmFtZS5zY2hlZHVsZSgpXG4gICAgICAgIHRoaXMuZGVib3VuY2UucmVzb2x2ZUFsbCh0aGlzLnRva2Vucy5nZXRUb2tlbnMoKSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChyZXMuc3RhdHVzID09PSA0MDApIHtcbiAgICAgICAgICB0aGlzLl9oYW5kbGVMb2dvdXQoKVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcigncmVmcmVzaCBmYWlsZWQnKVxuICAgICAgICB0aGlzLmRlYm91bmNlLnJlamVjdEFsbChlcnIpXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHByb21pc2VcbiAgfVxuXG4gIF9zY2hlZHVsZSAoKSB7XG4gICAgY29uc3QgeyBleHBpcnlJbnRlcnZhbCB9ID0gdGhpcy5vcHRpb25zXG4gICAgaWYgKGV4cGlyeUludGVydmFsID4gMCAmJiAhdGhpcy5fZXhwaXJ5VGltZXJJZCAmJiB0aGlzLnRva2Vucy5yZWZyZXNoVG9rZW4pIHtcbiAgICAgIHRoaXMuX2V4cGlyeVRpbWVySWQgPSBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgICAgdGhpcy5fcmVmcmVzaCgpXG4gICAgICAgICAgLnRoZW4odG9rZW5zID0+IHtcbiAgICAgICAgICAgIGlmICh0b2tlbnMpIHRoaXMuZW1pdCgndG9rZW4nLCB0b2tlbnMpXG4gICAgICAgICAgICB0aGlzLl9leHBpcnlUaW1lcklkID0gbnVsbFxuICAgICAgICAgICAgdGhpcy5fc2NoZWR1bGUoKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICB0aGlzLl9leHBpcnlUaW1lcklkID0gbnVsbFxuICAgICAgICAgICAgdGhpcy5faGFuZGxlTG9nb3V0KClcbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZUVycm9yKGVycilcbiAgICAgICAgICB9KVxuICAgICAgfSwgZXhwaXJ5SW50ZXJ2YWwgKiAxMDAwKVxuICAgIH1cbiAgfVxuXG4gIF9oYW5kbGVUb2tlbiAoKSB7XG4gICAgY29uc3QgdG9rZW5zID0gdGhpcy50b2tlbnMuZ2V0VG9rZW5zKClcbiAgICB0aGlzLmVtaXQoJ3Rva2VuJywgdG9rZW5zKVxuICAgIHJldHVybiB0b2tlbnNcbiAgfVxuXG4gIF9oYW5kbGVFcnJvciAoZXJyKSB7XG4gICAgY29uc3QgeyBsb2cgfSA9IHRoaXMub3B0aW9uc1xuICAgIGxvZy5lcnJvcihlcnIubWVzc2FnZSlcbiAgICB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyKVxuICB9XG5cbiAgX2hhbmRsZUxvZ291dCAoKSB7XG4gICAgY29uc3QgeyBmb3JjZUxvZ291dCB9ID0gdGhpcy5vcHRpb25zXG4gICAgdGhpcy50b2tlbnMuY2xlYXJUb2tlbnMoKVxuICAgIHRoaXMuZW1pdCgnbG9nb3V0JylcbiAgICBpZiAoZm9yY2VMb2dvdXQpIHtcbiAgICAgIHRoaXMubG9nb3V0KCkuY2F0Y2goZXJyID0+IHRoaXMuX2hhbmRsZUVycm9yKGVycikpXG4gICAgfVxuICB9XG5cbiAgZ2V0VG9rZW5zICgpIHtcbiAgICByZXR1cm4gdGhpcy50b2tlbnMuZ2V0VG9rZW5zKClcbiAgfVxuXG4gIGFzeW5jIGJlYXJlclRva2VuICgpIHtcbiAgICBjb25zdCB7IHRva2VuLCByZWZyZXNoVG9rZW4gfSA9IHRoaXMudG9rZW5zXG4gICAgY29uc3QgaXNFeHBpcmVkID0gdGhpcy50b2tlbnMuaXNUb2tlbkV4cGlyZWQoKVxuICAgIGlmICgoIXRva2VuIHx8IGlzRXhwaXJlZCkgJiYgcmVmcmVzaFRva2VuKSB7XG4gICAgICBhd2FpdCB0aGlzLl9yZWZyZXNoKClcbiAgICAgIHJldHVybiB0aGlzLnRva2Vucy50b2tlblxuICAgIH1cbiAgICByZXR1cm4gIWlzRXhwaXJlZCAmJiB0b2tlblxuICB9XG5cbiAgYXN5bmMgbG9naW4gKG9wdHMgPSB7fSkge1xuICAgIG9wdHMucHJvbXB0ID0gb3B0cy5wcm9tcHQgfHwgTE9HSU5cbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyLmxvZ2luKG9wdHMpXG4gIH1cblxuICBhc3luYyBzaWxlbnRMb2dpbiAoKSB7XG4gICAgY29uc3QgeyBzaWxlbnRMb2dpblJlZGlyZWN0VXJpIH0gPSB0aGlzLm9wdGlvbnNcbiAgICBpZiAoIXNpbGVudExvZ2luUmVkaXJlY3RVcmkpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ25vIHNpbGVudExvZ2luUmVkaXJlY3RVcmknKSlcbiAgICB9XG4gICAgcmV0dXJuIGNoZWNrU2lsZW50TG9naW4odGhpcylcbiAgICAgIC50aGVuKG9hdXRoID0+IHRoaXMuX3Byb2Nlc3NDYWxsYmFjayhvYXV0aCkpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuX3NjaGVkdWxlKClcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hhbmRsZVRva2VuKClcbiAgICAgIH0pXG4gIH1cblxuICBhc3luYyBsb2dvdXQgKCkge1xuICAgIGNvbnN0IHsgaWRUb2tlbiB9ID0gdGhpcy5nZXRUb2tlbnMoKVxuICAgIHRoaXMuc3RhdHVzSWZyYW1lLmNsZWFyU2NoZWR1bGUoKVxuICAgIGNsZWFyVGltZW91dCh0aGlzLl9leHBpcnlUaW1lcklkKVxuICAgIHRoaXMudG9rZW5zLmNsZWFyVG9rZW5zKClcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyLmxvZ291dCh7IGlkVG9rZW4gfSlcbiAgfVxuXG4gIGFzeW5jIHVzZXJpbmZvICgpIHtcbiAgICBjb25zdCB1cmwgPSB0aGlzLmVuZHBvaW50cy51c2VyaW5mbygpXG4gICAgY29uc3QgdG9rZW4gPSBhd2FpdCB0aGlzLmJlYXJlclRva2VuKClcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCh1cmwsIHtcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gXG4gICAgICB9XG4gICAgfSlcbiAgICBpZiAocmVzLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICByZXR1cm4gcmVzLmpzb24oKVxuICAgIH1cbiAgICBjb25zdCBlcnIgPSBuZXcgRXJyb3IoJ3VzZXJpbmZvIGZhaWxlZCcpXG4gICAgZXJyLnN0YXR1cyA9IHJlcy5zdGF0dXNcbiAgICBlcnIucmVzcG9uc2UgPSByZXNcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKVxuICB9XG5cbiAgYXN5bmMgcmVnaXN0ZXIgKCkge1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXIucmVnaXN0ZXIoKVxuICB9XG5cbiAgYXN5bmMgYWNjb3VudCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuYWRhcHRlci5hY2NvdW50KClcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBmZXRjaFRva2VuICh1cmwsIHF1ZXJ5KSB7XG4gIHJldHVybiBmZXRjaCh1cmwsIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiBUWVBFX1VSTEVOQ09ERUQsIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgLy8gbW9kZTogJ25vLWNvcnMnLFxuICAgIGJvZHk6IHVybEVuY29kZWQocXVlcnkpXG4gIH0pXG59XG4iLCJcbi8vIGRlZmF1bHQgc2NvcGVcbmV4cG9ydCBjb25zdCBPUEVOSUQgPSAnb3BlbmlkJ1xuXG4vLyByZXNwb25zZU1vZGVcbmV4cG9ydCBjb25zdCBGUkFHTUVOVCA9ICdmcmFnbWVudCdcbmV4cG9ydCBjb25zdCBRVUVSWSA9ICdxdWVyeSdcblxuLy8gZmxvd1xuZXhwb3J0IGNvbnN0IFNUQU5EQVJEID0gJ3N0YW5kYXJkJ1xuZXhwb3J0IGNvbnN0IElNUExJQ0lUID0gJ2ltcGxpY2l0J1xuZXhwb3J0IGNvbnN0IEhZQlJJRCA9ICdoeWJyaWQnXG5cbi8vIHJlc3BvbnNlVHlwZVxuZXhwb3J0IGNvbnN0IFRPS0VOID0gJ3Rva2VuJ1xuXG4vLyBwYXJhbXNcbmV4cG9ydCBjb25zdCBDT0RFID0gJ2NvZGUnXG5leHBvcnQgY29uc3QgU1RBVEUgPSAnc3RhdGUnXG5leHBvcnQgY29uc3QgU0VTU0lPTl9TVEFURSA9ICdzZXNzaW9uX3N0YXRlJ1xuZXhwb3J0IGNvbnN0IFJFU1BPTlNFX01PREUgPSAncmVzcG9uc2VfbW9kZSdcbmV4cG9ydCBjb25zdCBBQ0NFU1NfVE9LRU4gPSAnYWNjZXNzX3Rva2VuJ1xuZXhwb3J0IGNvbnN0IFJFRlJFU0hfVE9LRU4gPSAncmVmcmVzaF90b2tlbidcbmV4cG9ydCBjb25zdCBJRF9UT0tFTiA9ICdpZF90b2tlbidcbmV4cG9ydCBjb25zdCBFWFBJUkVTX0lOID0gJ2V4cGlyZXNfaW4nXG5leHBvcnQgY29uc3QgS0NfQUNUSU9OX1NUQVRVUyA9ICdrY19hY3Rpb25fc3RhdHVzJ1xuZXhwb3J0IGNvbnN0IFRPS0VOX1RZUEUgPSAndG9rZW5fdHlwZSdcbmV4cG9ydCBjb25zdCBFUlJPUiA9ICdlcnJvcidcbmV4cG9ydCBjb25zdCBFUlJPUl9ERVNDUklQVElPTiA9ICdlcnJvcl9kZXNjcmlwdGlvbidcbmV4cG9ydCBjb25zdCBFUlJPUl9VUkkgPSAnZXJyb3JfdXJpJ1xuXG4vLyBwcm9tcHRcbmV4cG9ydCBjb25zdCBOT05FID0gJ25vbmUnXG5leHBvcnQgY29uc3QgTE9HSU4gPSAnbG9naW4nXG5cbi8vIHN0YXR1cyBpZnJhbWVcbmV4cG9ydCBjb25zdCBDSEFOR0VEID0gJ2NoYW5nZWQnXG5leHBvcnQgY29uc3QgVU5DSEFOR0VEID0gJ3VuY2hhbmdlZCdcbi8vIGV4cG9ydCBjb25zdCBFUlJPUiA9ICdlcnJvcidcblxuLy8gY29udGVudC10eXBlXG5leHBvcnQgY29uc3QgVFlQRV9VUkxFTkNPREVEID0gJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbiIsImltcG9ydCB7IHV1aWQ0LCBjcmVhdGVVcmwgfSBmcm9tICcuL3V0aWxzL2luZGV4LmpzJ1xuXG5leHBvcnQgY2xhc3MgRW5kcG9pbnRzIHtcbiAgY29uc3RydWN0b3IgKHNlcnZlclVybCwgb2lkY0NvbmZpZywgY2FsbGJhY2spIHtcbiAgICBpZiAoIW9pZGNDb25maWcgfHxcbiAgICAgICAgIW9pZGNDb25maWcuYXV0aG9yaXphdGlvbl9lbmRwb2ludCB8fFxuICAgICAgICAhb2lkY0NvbmZpZy50b2tlbl9lbmRwb2ludCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdvaWRjQ29uZmlnIHJlcXVpcmVkJylcbiAgICB9XG4gICAgdGhpcy5zZXJ2ZXJVcmwgPSBzZXJ2ZXJVcmxcbiAgICB0aGlzLm9pZGNDb25maWcgPSBvaWRjQ29uZmlnXG4gICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrXG4gIH1cblxuICBfbWF5YmVLZXljbG9hayAoKSB7XG4gICAgcmV0dXJuIHRoaXMudG9rZW4oKS5pbmNsdWRlcygnL3JlYWxtcy8nKVxuICB9XG5cbiAgYXN5bmMgY3JlYXRlTG9naW5VcmwgKG9wdGlvbnMpIHtcbiAgICBjb25zdCBzdGF0ZSA9IHV1aWQ0KClcbiAgICBjb25zdCBub25jZSA9IHV1aWQ0KClcblxuICAgIGNvbnN0IHtcbiAgICAgIGNsaWVudElkLFxuICAgICAgcmVzcG9uc2VNb2RlLFxuICAgICAgcmVzcG9uc2VUeXBlLFxuICAgICAgcmVkaXJlY3RVcmksXG4gICAgICBwcm9tcHQsXG4gICAgICBzY29wZSxcbiAgICAgIHVzZU5vbmNlLFxuICAgICAgbWF4QWdlLFxuICAgICAgbG9naW5IaW50LFxuICAgICAgaWRwSGludCxcbiAgICAgIGFjdGlvbixcbiAgICAgIGxvY2FsZSxcbiAgICAgIHBrY2VNZXRob2QsXG4gICAgICBhdXRob3JpemF0aW9uUGFyYW1zXG4gICAgfSA9IG9wdGlvbnNcblxuICAgIGNvbnN0IGRvUmVnaXN0ZXIgPSBhY3Rpb24gPT09ICdyZWdpc3RlcidcblxuICAgIGNvbnN0IGNhbGxiYWNrU3RhdGUgPSB7XG4gICAgICBzdGF0ZSxcbiAgICAgIG5vbmNlLFxuICAgICAgcmVkaXJlY3RVcmksXG4gICAgICBleHBpcmVzOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSArIDYwMDAwXG4gICAgfVxuXG4gICAgaWYgKHByb21wdCkge1xuICAgICAgY2FsbGJhY2tTdGF0ZS5wcm9tcHQgPSBwcm9tcHRcbiAgICB9XG5cbiAgICBjb25zdCBiYXNlVXJsID0gZG9SZWdpc3RlclxuICAgICAgPyB0aGlzLnJlZ2lzdGVyKClcbiAgICAgIDogdGhpcy5hdXRob3JpemUoKVxuXG4gICAgY29uc3QgcXVlcnkgPSB7XG4gICAgICAuLi5hdXRob3JpemF0aW9uUGFyYW1zLFxuICAgICAgY2xpZW50X2lkOiBjbGllbnRJZCxcbiAgICAgIHJlZGlyZWN0X3VyaTogcmVkaXJlY3RVcmksXG4gICAgICBzdGF0ZTogc3RhdGUsXG4gICAgICByZXNwb25zZV9tb2RlOiByZXNwb25zZU1vZGUsXG4gICAgICByZXNwb25zZV90eXBlOiByZXNwb25zZVR5cGUsXG4gICAgICBzY29wZSxcbiAgICAgIHByb21wdCxcbiAgICAgIG1heF9hZ2U6IG1heEFnZSxcbiAgICAgIGxvZ2luX2hpbnQ6IGxvZ2luSGludCxcbiAgICAgIGtjX2lkcF9oaW50OiBpZHBIaW50LFxuICAgICAgdWlfbG9jYWxlczogbG9jYWxlXG4gICAgfVxuICAgIGlmICh1c2VOb25jZSkge1xuICAgICAgcXVlcnkubm9uY2UgPSBub25jZVxuICAgIH1cbiAgICBpZiAoYWN0aW9uICYmICFkb1JlZ2lzdGVyKSB7XG4gICAgICBxdWVyeS5hY3Rpb24gPSBhY3Rpb25cbiAgICB9XG4gICAgaWYgKHBrY2VNZXRob2QgJiYgb3B0aW9ucy5wa2NlKSB7XG4gICAgICBjb25zdCB7IGNvZGVWZXJpZmllciwgY2hhbGxlbmdlIH0gPSBhd2FpdCBvcHRpb25zLnBrY2UocGtjZU1ldGhvZClcbiAgICAgIGNhbGxiYWNrU3RhdGUucGtjZUNvZGVWZXJpZmllciA9IGNvZGVWZXJpZmllclxuICAgICAgcXVlcnkuY29kZV9jaGFsbGVuZ2UgPSBjaGFsbGVuZ2VcbiAgICAgIHF1ZXJ5LmNvZGVfY2hhbGxlbmdlX21ldGhvZCA9IHBrY2VNZXRob2RcbiAgICB9XG5cbiAgICB0aGlzLmNhbGxiYWNrLnN0b3JlKGNhbGxiYWNrU3RhdGUpXG5cbiAgICByZXR1cm4gY3JlYXRlVXJsKGJhc2VVcmwsIHF1ZXJ5KVxuICB9XG5cbiAgYXN5bmMgY3JlYXRlUmVnaXN0ZXJVcmwgKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVMb2dpblVybCh7IC4uLm9wdGlvbnMsIGFjdGlvbjogJ3JlZ2lzdGVyJyB9KVxuICB9XG5cbiAgYXN5bmMgY3JlYXRlTG9nb3V0VXJsIChvcHRpb25zLCB7IGlkVG9rZW4gfSkge1xuICAgIGNvbnN0IHsgcmVkaXJlY3RVcmksIHBvc3RMb2dvdXRSZWRpcmVjdFVyaSB9ID0gb3B0aW9uc1xuICAgIGNvbnN0IHVybCA9IHRoaXMubG9nb3V0KClcbiAgICBpZiAoIXVybCkgdGhyb3cgbmV3IEVycm9yKCdubyBlbmRfc2Vzc2lvbl9lbmRwb2ludCcpXG4gICAgY29uc3QgcXVlcnkgPSB7XG4gICAgICBwb3N0X2xvZ291dF9yZWRpcmVjdF91cmk6IHBvc3RMb2dvdXRSZWRpcmVjdFVyaSB8fCByZWRpcmVjdFVyaSxcbiAgICAgIGlkX3Rva2VuX2hpbnQ6IGlkVG9rZW5cbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZVVybCh1cmwsIHF1ZXJ5KVxuICB9XG5cbiAgYXN5bmMgY3JlYXRlQWNjb3VudFVybCAob3B0aW9ucykge1xuICAgIGNvbnN0IHsgY2xpZW50SWQsIHJlZGlyZWN0VXJpIH0gPSBvcHRpb25zXG4gICAgY29uc3QgdXJsID0gdGhpcy5hY2NvdW50KClcbiAgICByZXR1cm4gY3JlYXRlVXJsKHVybCwge1xuICAgICAgcmVmZXJyZXI6IGNsaWVudElkLFxuICAgICAgcmVmZXJyZXJfdXJpOiByZWRpcmVjdFVyaVxuICAgIH0pXG4gIH1cblxuICBjcmVhdGVUb2tlblVybCAocXVlcnkpIHtcbiAgICByZXR1cm4gY3JlYXRlVXJsKHRoaXMudG9rZW4oKSwgcXVlcnkpXG4gIH1cblxuICBhdXRob3JpemUgKCkge1xuICAgIHJldHVybiB0aGlzLm9pZGNDb25maWcuYXV0aG9yaXphdGlvbl9lbmRwb2ludFxuICB9XG5cbiAgdG9rZW4gKCkge1xuICAgIHJldHVybiB0aGlzLm9pZGNDb25maWcudG9rZW5fZW5kcG9pbnRcbiAgfVxuXG4gIGxvZ291dCAoKSB7XG4gICAgLy8gbWF5IGJlIHVuZGVmaW5lZFxuICAgIGNvbnN0IHVybCA9IHRoaXMub2lkY0NvbmZpZy5lbmRfc2Vzc2lvbl9lbmRwb2ludFxuICAgIHJldHVybiB1cmxcbiAgfVxuXG4gIGNoZWNrU2Vzc2lvbklmcmFtZSAoKSB7XG4gICAgLy8gbWF5IGJlIHVuZGVmaW5lZFxuICAgIHJldHVybiB0aGlzLm9pZGNDb25maWcuY2hlY2tfc2Vzc2lvbl9pZnJhbWVcbiAgfVxuXG4gIHVzZXJpbmZvICgpIHtcbiAgICAvLyBtYXkgYmUgdW5kZWZpbmVkXG4gICAgY29uc3QgdXJsID0gdGhpcy5vaWRjQ29uZmlnLnVzZXJpbmZvX2VuZHBvaW50XG4gICAgaWYgKCF1cmwpIHRocm93IG5ldyBFcnJvcignbm8gdXNlcmluZm9fZW5kcG9pbnQnKVxuICAgIHJldHVybiB1cmxcbiAgfVxuXG4gIHJlZ2lzdGVyICgpIHtcbiAgICBsZXQgdXJsID0gdGhpcy5vaWRjQ29uZmlnLnVzZXJSZWdpc3RyYXRpb25FbmRwb2ludFxuICAgIGlmICghdXJsICYmIHRoaXMuX21heWJlS2V5Y2xvYWsoKSkge1xuICAgICAgdXJsID0gdGhpcy5hdXRob3JpemUoKS5yZXBsYWNlKC9cXC9bXi9dKyQvLCAnL3JlZ2lzdHJhdGlvbnMnKVxuICAgIH1cbiAgICBpZiAoIXVybCkgdGhyb3cgbmV3IEVycm9yKCdubyByZWdpc3RlciBlbmRwb2ludCcpXG4gICAgcmV0dXJuIHVybFxuICB9XG5cbiAgYWNjb3VudCAoKSB7XG4gICAgbGV0IHVybCA9IHRoaXMub2lkY0NvbmZpZy51c2VyQWNjb3VudEVuZHBvaW50XG4gICAgaWYgKCF1cmwgJiYgdGhpcy5fbWF5YmVLZXljbG9haygpKSB7XG4gICAgICB1cmwgPSBgJHt0aGlzLnNlcnZlclVybH0vYWNjb3VudGBcbiAgICB9XG4gICAgaWYgKCF1cmwpIHRocm93IG5ldyBFcnJvcignbm8gYWNjb3VudCBlbmRwb2ludCcpXG4gICAgcmV0dXJuIHVybFxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBlbmRwb2ludHMgPSAoc2VydmVyVXJsLCBvaWRjQ29uZmlnLCBjYWxsYmFjaykgPT5cbiAgbmV3IEVuZHBvaW50cyhzZXJ2ZXJVcmwsIG9pZGNDb25maWcsIGNhbGxiYWNrKVxuIiwiaW1wb3J0IHsgZGVjb2RlVG9rZW4sIGdldCwgTG9jYWxTdG9yYWdlIH0gZnJvbSAnLi91dGlscy9pbmRleC5qcydcblxuaW1wb3J0IHtcbiAgU0VTU0lPTl9TVEFURVxufSBmcm9tICcuL2NvbnN0YW50cy5qcydcblxuY29uc3Qgbm93ID0gKCkgPT4gTWF0aC5jZWlsKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMClcblxuY29uc3QgdG9OdW1iZXIgPSAobnVtLCBkZWYpID0+ICFpc05hTihOdW1iZXIobnVtKSkgPyBOdW1iZXIobnVtKSA6IGRlZlxuXG5jb25zdCBjbGFpbSA9ICh0LCBjbGFpbSwgZGVmKSA9PiBnZXQodCwgWydpZFRva2VuUGFyc2VkJywgY2xhaW1dLCBnZXQodCwgWyd0b2tlblBhcnNlZCcsIGNsYWltXSwgZGVmKSlcblxuZXhwb3J0IGNsYXNzIFRva2VucyB7XG4gIGNvbnN0cnVjdG9yICh7IGxvZywgdXNlTm9uY2UsIG1pblZhbGlkaXR5LCB1c2VMb2NhbFN0b3JhZ2UgPSB0cnVlIH0gPSB7fSkge1xuICAgIHRoaXMubG9nID0gbG9nXG4gICAgdGhpcy5fdXNlTm9uY2UgPSB1c2VOb25jZVxuICAgIHRoaXMuX2F1dGhlbnRpY2F0ZWQgPSBmYWxzZVxuICAgIHRoaXMuX3RpbWVTa2V3ID0gMFxuICAgIHRoaXMuX2V4cGlyZXNBdCA9IDBcbiAgICB0aGlzLl9zdG9yZSA9IG5ldyBTdG9yZSh1c2VMb2NhbFN0b3JhZ2UpXG4gICAgdGhpcy5fbWluVmFsaWRpdHkgPSBtaW5WYWxpZGl0eVxuICB9XG5cbiAgZ2V0IGF1dGhlbnRpY2F0ZWQgKCkge1xuICAgIHJldHVybiB0aGlzLl9hdXRoZW50aWNhdGVkXG4gIH1cblxuICAvKipcbiAgICogbG9hZCB0b2tlbnMgZnJvbSBsb2NhbFN0b3JhZ2VcbiAgICovXG4gIGxvYWRUb2tlbnMgKCkge1xuICAgIGNvbnN0IHRva2VucyA9IHRoaXMuX3N0b3JlLmdldCgpXG4gICAgaWYgKHRva2VucykgdGhpcy5zZXRUb2tlbnModG9rZW5zKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBmcm9tSW5pdE9wdGlvbnMgKHsgdG9rZW4sIHJlZnJlc2hUb2tlbiwgaWRUb2tlbiB9ID0ge30pIHtcbiAgICBjb25zdCBscyA9IHRoaXMuX3N0b3JlLmdldCgpIHx8IHt9XG4gICAgdG9rZW4gPSB0b2tlbiB8fCBscy5hY2Nlc3NfdG9rZW5cbiAgICByZWZyZXNoVG9rZW4gPSByZWZyZXNoVG9rZW4gfHwgbHMucmVmcmVzaF90b2tlblxuXG4gICAgaWYgKHRva2VuKSB7XG4gICAgICBjb25zdCB0b2tlbnMgPSB7XG4gICAgICAgIGFjY2Vzc190b2tlbjogdG9rZW4sXG4gICAgICAgIHJlZnJlc2hfdG9rZW46IHJlZnJlc2hUb2tlbixcbiAgICAgICAgaWRfdG9rZW46IGlkVG9rZW4gfHwgbHMuaWRfdG9rZW4sXG4gICAgICAgIGV4cGlyZXNBdDogbHMuZXhwaXJlc0F0XG4gICAgICB9XG4gICAgICB0aGlzLnNldFRva2Vucyh0b2tlbnMpXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBzdGFydFRva2VuUmVxdWVzdCAoKSB7XG4gICAgdGhpcy5fdGltZUxvY2FsID0gbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgfVxuXG4gIHNldFRva2VucyAodG9rZW5SZXNwb25zZSA9IHt9KSB7XG4gICAgY29uc3Qge1xuICAgICAgYWNjZXNzX3Rva2VuOiB0b2tlbixcbiAgICAgIHJlZnJlc2hfdG9rZW46IHJlZnJlc2hUb2tlbixcbiAgICAgIGlkX3Rva2VuOiBpZFRva2VuLFxuICAgICAgZXhwaXJlc19pbjogZXhwaXJlc0luID0gNjAsXG4gICAgICBleHBpcmVzQXRcbiAgICB9ID0gdG9rZW5SZXNwb25zZVxuXG4gICAgdGhpcy5fdGltZUxvY2FsID0gKHRoaXMuX3RpbWVMb2NhbCArIG5ldyBEYXRlKCkuZ2V0VGltZSgpKSAvIDJcbiAgICBpZiAocmVmcmVzaFRva2VuKSB7XG4gICAgICB0aGlzLnJlZnJlc2hUb2tlbiA9IHJlZnJlc2hUb2tlblxuICAgICAgdGhpcy5fc3RvcmUucmVmcmVzaFRva2VuKHJlZnJlc2hUb2tlbilcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMucmVmcmVzaFRva2VuUGFyc2VkID0gZGVjb2RlVG9rZW4ocmVmcmVzaFRva2VuKVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyB0b2tlbiBtYXkgYmUgYSBvYXV0aDIgb25seSB0b2tlblxuICAgICAgICBkZWxldGUgdGhpcy5yZWZyZXNoVG9rZW5QYXJzZWRcbiAgICAgIH1cbiAgICAgIHRoaXMubG9nLmluZm8oJ3JlZnJlc2ggdG9rZW4gc2V0ICVvJywgdGhpcy5yZWZyZXNoVG9rZW5QYXJzZWQpXG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB0aGlzLnJlZnJlc2hUb2tlblxuICAgICAgZGVsZXRlIHRoaXMucmVmcmVzaFRva2VuUGFyc2VkXG4gICAgICB0aGlzLl9zdG9yZS5yZWZyZXNoVG9rZW4obnVsbClcbiAgICAgIHRoaXMubG9nLmluZm8oJ3JlZnJlc2ggdG9rZW4gY2xlYXJlZCcpXG4gICAgfVxuXG4gICAgaWYgKGlkVG9rZW4pIHtcbiAgICAgIHRoaXMuaWRUb2tlbiA9IGlkVG9rZW5cbiAgICAgIHRoaXMuX3N0b3JlLmlkVG9rZW4oaWRUb2tlbilcbiAgICAgIHRoaXMuaWRUb2tlblBhcnNlZCA9IGRlY29kZVRva2VuKGlkVG9rZW4pXG4gICAgICB0aGlzLmxvZy5pbmZvKCdpZCB0b2tlbiBzZXQgJW8nLCB0aGlzLmlkVG9rZW5QYXJzZWQpXG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB0aGlzLmlkVG9rZW5cbiAgICAgIGRlbGV0ZSB0aGlzLmlkVG9rZW5QYXJzZWRcbiAgICAgIHRoaXMuX3N0b3JlLmlkVG9rZW4obnVsbClcbiAgICAgIHRoaXMubG9nLmluZm8oJ2lkIHRva2VuIGNsZWFyZWQnKVxuICAgIH1cblxuICAgIGlmICh0b2tlbikge1xuICAgICAgdGhpcy50b2tlbiA9IHRva2VuXG4gICAgICB0aGlzLl9zdG9yZS50b2tlbih0b2tlbilcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMudG9rZW5QYXJzZWQgPSBkZWNvZGVUb2tlbih0b2tlbilcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gdG9rZW4gbWF5IGJlIGEgb2F1dGgyIG9ubHkgdG9rZW5cbiAgICAgICAgZGVsZXRlIHRoaXMudG9rZW5QYXJzZWRcbiAgICAgIH1cbiAgICAgIHRoaXMubG9nLmluZm8oJ3Rva2VuIHNldCAlbycsIHRoaXMudG9rZW5QYXJzZWQpXG4gICAgICBjb25zdCBpYXQgPSB0b051bWJlcihcbiAgICAgICAgY2xhaW0odGhpcywgJ2lhdCcpLFxuICAgICAgICBub3coKSAtIDFcbiAgICAgIClcbiAgICAgIHRoaXMuX2V4cGlyZXNBdCA9IHRvTnVtYmVyKFxuICAgICAgICBjbGFpbSh0aGlzLCAnZXhwJyksXG4gICAgICAgIG5vdygpICsgZXhwaXJlc0luXG4gICAgICApXG4gICAgICB0aGlzLl90aW1lU2tldyA9IE1hdGguZmxvb3IodGhpcy5fdGltZUxvY2FsIC8gMTAwMCkgLSBpYXRcbiAgICAgIHRoaXMubG9nLmluZm8oJ0VzdGltYXRlZCB0aW1lIGRpZmZlcmVuY2UgaXMgJXMgc2Vjb25kcycsIHRoaXMuX3RpbWVTa2V3KVxuICAgICAgdGhpcy5fZXhwaXJlc0F0ICs9IHRoaXMuX3RpbWVTa2V3XG4gICAgICB0aGlzLl9leHBpcmVzQXQgPSBleHBpcmVzQXQgfHwgdGhpcy5fZXhwaXJlc0F0XG4gICAgICB0aGlzLl9zdG9yZS50b2tlbih0b2tlbiwgdGhpcy5fZXhwaXJlc0F0KVxuICAgICAgdGhpcy5fYXV0aGVudGljYXRlZCA9IHRydWVcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fYXV0aGVudGljYXRlZCA9IGZhbHNlXG4gICAgICBkZWxldGUgdGhpcy50b2tlblxuICAgICAgZGVsZXRlIHRoaXMudG9rZW5QYXJzZWRcbiAgICAgIHRoaXMuX3N0b3JlLnRva2VuKG51bGwpXG4gICAgICB0aGlzLmxvZy5pbmZvKCd0b2tlbiBjbGVhcmVkJylcbiAgICB9XG4gIH1cblxuICBnZXRUb2tlbnMgKCkge1xuICAgIGNvbnN0IG9iaiA9IFsndG9rZW4nLCAnaWRUb2tlbicsICdyZWZyZXNoVG9rZW4nXS5yZWR1Y2UoKG8sIGtleSkgPT4ge1xuICAgICAgY29uc3QgcGFyc2VkID0ga2V5ICsgJ1BhcnNlZCdcbiAgICAgIG9ba2V5XSA9IHRoaXNba2V5XVxuICAgICAgb1twYXJzZWRdID0gdGhpc1twYXJzZWRdXG4gICAgICByZXR1cm4gb1xuICAgIH0sIHt9KVxuICAgIHJldHVybiBvYmpcbiAgfVxuXG4gIGNsZWFyVG9rZW5zICgpIHtcbiAgICB0aGlzLnNldFRva2VucygpXG4gIH1cblxuICBzZXNzaW9uU3RhdGUgKCkge1xuICAgIHJldHVybiBjbGFpbSh0aGlzLCBTRVNTSU9OX1NUQVRFLCAnJylcbiAgfVxuXG4gIHN1YmplY3QgKCkge1xuICAgIHJldHVybiBjbGFpbSh0aGlzLCAnc3ViJylcbiAgfVxuXG4gIHJlYWxtQWNjZXNzICgpIHtcbiAgICByZXR1cm4gZ2V0KHRoaXMsICd0b2tlblBhcnNlZC5yZWFsbV9hY2Nlc3MnKVxuICB9XG5cbiAgcmVzb3VyY2VBY2Nlc3MgKCkge1xuICAgIHJldHVybiBnZXQodGhpcywgJ3Rva2VuUGFyc2VkLnJlc291cmNlX2FjY2VzcycpXG4gIH1cblxuICAvKipcbiAgICogZXhwaXJ5IGluIHNlY29uZHNcbiAgICogQHJldHVybiB7bnVtYmVyfVxuICAgKi9cbiAgZXhwaXJlc0luICgpIHtcbiAgICByZXR1cm4gdGhpcy5fZXhwaXJlc0F0IC0gbm93KClcbiAgfVxuXG4gIGlzVG9rZW5FeHBpcmVkIChtaW5WYWxpZGl0eSA9IHRoaXMuX21pblZhbGlkaXR5KSB7XG4gICAgbGV0IGV4cGlyZXNJbiA9IHRoaXMuZXhwaXJlc0luKClcbiAgICBpZiAoIWlzTmFOKG1pblZhbGlkaXR5KSkge1xuICAgICAgZXhwaXJlc0luIC09IG1pblZhbGlkaXR5XG4gICAgfVxuICAgIHJldHVybiBleHBpcmVzSW4gPCAwXG4gIH1cblxuICAvKipcbiAgICogY2hlY2tlcyBpZiBzdG9yZWROb25jZSBpcyBkaWZmZXJlbnQgdGhhbiBub25jZSBpbiB0b2tlbnNcbiAgICogcmVxdWlyZXMgYHVzZU5vbmNlYCBpbiBvcHRpb25zLlxuICAgKiBpZiBpbnZhbGlkIHRva2VucyBhcmUgY2xlYXJlZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3RvcmVkTm9uY2VcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiBzdG9yZWROb25jZSBpcyBkaWZmZXJlbnQgdGhhbiBub25jZSBpbiB0b2tlbnNcbiAgICovXG4gIGlzSW52YWxpZE5vbmNlIChzdG9yZWROb25jZSkge1xuICAgIGNvbnN0IHtcbiAgICAgIF91c2VOb25jZSxcbiAgICAgIHRva2VuUGFyc2VkLFxuICAgICAgcmVmcmVzaFRva2VuUGFyc2VkLFxuICAgICAgaWRUb2tlblBhcnNlZFxuICAgIH0gPSB0aGlzXG4gICAgY29uc3QgdmVyaWZ5ID0gb2JqID0+IG9iaiAmJiBvYmoubm9uY2UgJiYgb2JqLm5vbmNlICE9PSBzdG9yZWROb25jZVxuICAgIGNvbnN0IGludmFsaWQgPSBfdXNlTm9uY2UgJiZcbiAgICAgICh2ZXJpZnkodG9rZW5QYXJzZWQpIHx8IHZlcmlmeShyZWZyZXNoVG9rZW5QYXJzZWQpIHx8IHZlcmlmeShpZFRva2VuUGFyc2VkKSlcbiAgICBpZiAoaW52YWxpZCkge1xuICAgICAgdGhpcy5jbGVhclRva2VucygpXG4gICAgfVxuICAgIHJldHVybiBpbnZhbGlkXG4gIH1cbn1cblxuY29uc3QgVE9LRU4gPSAnb2lkYy10b2tlbidcbmNvbnN0IFRPS0VOX0VYUElSRVNfQVQgPSAnb2lkYy10b2tlbi1leHAnXG5jb25zdCBJRF9UT0tFTiA9ICdvaWRjLWlkLXRva2VuJ1xuY29uc3QgUkVGUkVTSF9UT0tFTiA9ICdvaWRjLXJlZnJlc2gtdG9rZW4nXG5cbmNsYXNzIFN0b3JlIHtcbiAgY29uc3RydWN0b3IgKHVzZUxvY2FsU3RvcmFnZSkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLnN0b3JlID0gdXNlTG9jYWxTdG9yYWdlID8gbmV3IExvY2FsU3RvcmFnZSgpIDogdW5kZWZpbmVkXG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuXG4gIF9zZXQgKGtleSwgdG9rZW4pIHtcbiAgICBpZiAoIXRoaXMuc3RvcmUpIHJldHVyblxuICAgIHRva2VuXG4gICAgICA/IHRoaXMuc3RvcmUuc2V0SXRlbShrZXksIHRva2VuKVxuICAgICAgOiB0aGlzLnN0b3JlLnJlbW92ZUl0ZW0oa2V5KVxuICB9XG5cbiAgdG9rZW4gKHRva2VuLCBleHBpcmVzQXQpIHtcbiAgICB0aGlzLl9zZXQoVE9LRU4sIHRva2VuKVxuICAgIHRoaXMuX3NldChUT0tFTl9FWFBJUkVTX0FULCBleHBpcmVzQXQpXG4gIH1cblxuICByZWZyZXNoVG9rZW4gKHRva2VuKSB7XG4gICAgdGhpcy5fc2V0KFJFRlJFU0hfVE9LRU4sIHRva2VuKVxuICB9XG5cbiAgaWRUb2tlbiAodG9rZW4pIHtcbiAgICB0aGlzLl9zZXQoSURfVE9LRU4sIHRva2VuKVxuICB9XG5cbiAgZ2V0ICgpIHtcbiAgICBpZiAoIXRoaXMuc3RvcmUpIHJldHVyblxuICAgIHJldHVybiB7XG4gICAgICBhY2Nlc3NfdG9rZW46IHRoaXMuc3RvcmUuZ2V0SXRlbShUT0tFTiksXG4gICAgICByZWZyZXNoX3Rva2VuOiB0aGlzLnN0b3JlLmdldEl0ZW0oUkVGUkVTSF9UT0tFTiksXG4gICAgICBpZF90b2tlbjogdGhpcy5zdG9yZS5nZXRJdGVtKElEX1RPS0VOKSxcbiAgICAgIGV4cGlyZXNBdDogdGhpcy5zdG9yZS5nZXRJdGVtKFRPS0VOX0VYUElSRVNfQVQpXG4gICAgfVxuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgRXZlbnRFbWl0dGVyIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMuX2V2ZW50cyA9IHt9XG4gIH1cblxuICBfZ2V0TWFwIChldmVudE5hbWUpIHtcbiAgICBpZiAoIXRoaXMuX2V2ZW50c1tldmVudE5hbWVdKSB0aGlzLl9ldmVudHNbZXZlbnROYW1lXSA9IG5ldyBNYXAoKVxuICAgIHJldHVybiB0aGlzLl9ldmVudHNbZXZlbnROYW1lXVxuICB9XG5cbiAgb24gKGV2ZW50TmFtZSwgbGlzdGVuZXIpIHtcbiAgICB0aGlzLl9nZXRNYXAoZXZlbnROYW1lKS5zZXQobGlzdGVuZXIsIGxpc3RlbmVyKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBvZmYgKGV2ZW50TmFtZSwgbGlzdGVuZXIpIHtcbiAgICB0aGlzLl9nZXRNYXAoZXZlbnROYW1lKS5kZWxldGUobGlzdGVuZXIpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGVtaXQgKGV2ZW50TmFtZSwgLi4uYXJncykge1xuICAgIGZvciAoY29uc3QgW18sIGxpc3RlbmVyXSBvZiB0aGlzLl9nZXRNYXAoZXZlbnROYW1lKSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICBsaXN0ZW5lciguLi5hcmdzKVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQ2FsbGJhY2tTdG9yYWdlIH0gZnJvbSAnLi9zdG9yYWdlLmpzJ1xuXG5pbXBvcnQge1xuICAvLyByZXNwb25zZU1vZGVcbiAgRlJBR01FTlQsXG4gIFFVRVJZLFxuICAvLyBmbG93XG4gIFNUQU5EQVJELFxuICBJTVBMSUNJVCxcbiAgSFlCUklELFxuICAvLyBwYXJhbXNcbiAgQ09ERSxcbiAgU1RBVEUsXG4gIFNFU1NJT05fU1RBVEUsXG4gIFJFU1BPTlNFX01PREUsXG4gIEFDQ0VTU19UT0tFTixcbiAgSURfVE9LRU4sXG4gIEVYUElSRVNfSU4sXG4gIEtDX0FDVElPTl9TVEFUVVMsXG4gIFRPS0VOX1RZUEUsXG4gIEVSUk9SLFxuICBFUlJPUl9ERVNDUklQVElPTixcbiAgRVJST1JfVVJJXG59IGZyb20gJy4uL2NvbnN0YW50cy5qcydcblxuLy8gY29uc3QgUEFSQU1TID0ge1xuLy8gICBbU1RBTkRBUkRdOiBbQ09ERSwgU1RBVEUsIFNFU1NJT05fU1RBVEUsIEtDX0FDVElPTl9TVEFUVVNdLFxuLy8gICBbSU1QTElDSVRdOiBbQ09ERSwgQUNDRVNTX1RPS0VOLCBUT0tFTl9UWVBFLCBJRF9UT0tFTiwgU1RBVEUsIFNFU1NJT05fU1RBVEUsIEVYUElSRVNfSU4sIEtDX0FDVElPTl9TVEFUVVNdLFxuLy8gICBbSFlCUklEXTogW0NPREUsIEFDQ0VTU19UT0tFTiwgSURfVE9LRU4sIFNUQVRFLCBTRVNTSU9OX1NUQVRFLCBLQ19BQ1RJT05fU1RBVFVTXVxuLy8gfVxuXG5jb25zdCBQQVJBTVMgPSBbQ09ERSwgQUNDRVNTX1RPS0VOLCBUT0tFTl9UWVBFLCBJRF9UT0tFTiwgU1RBVEUsIFNFU1NJT05fU1RBVEUsIEVYUElSRVNfSU4sIEtDX0FDVElPTl9TVEFUVVNdXG5cbmV4cG9ydCBjbGFzcyBDYWxsYmFjayB7XG4gIGNvbnN0cnVjdG9yIChvcHRpb25zKSB7XG4gICAgY29uc3QgeyBmbG93LCByZXNwb25zZU1vZGUsIGxvZyB9ID0gb3B0aW9ucyB8fCB7fVxuICAgIHRoaXMuX2Zsb3cgPSBmbG93IHx8IFNUQU5EQVJEXG4gICAgdGhpcy5fcmVzcG9uc2VNb2RlID0gcmVzcG9uc2VNb2RlIHx8IEZSQUdNRU5UXG4gICAgdGhpcy5fc3RvcmUgPSBuZXcgQ2FsbGJhY2tTdG9yYWdlKClcbiAgICB0aGlzLmxvZyA9IGxvZ1xuICB9XG5cbiAgc3RvcmUgKHN0YXRlKSB7XG4gICAgdGhpcy5fc3RvcmUuYWRkKHN0YXRlKVxuICB9XG5cbiAgcGFyc2UgKHVybCkge1xuICAgIGNvbnN0IG9hdXRoID0gdGhpcy5fcGFyc2VVcmwodXJsKVxuICAgIGlmICghb2F1dGgpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRoaXMubG9nLmluZm8oJ2NhbGxiYWNrIHBhcnNlZCB0byAlbycsIG9hdXRoKVxuXG4gICAgY29uc3Qgb2F1dGhTdGF0ZSA9IHRoaXMuX3N0b3JlLmdldChvYXV0aC5zdGF0ZSlcblxuICAgIGlmIChvYXV0aFN0YXRlKSB7XG4gICAgICBvYXV0aC52YWxpZCA9IHRydWVcbiAgICAgIG9hdXRoLnBrY2VDb2RlVmVyaWZpZXIgPSBvYXV0aFN0YXRlLnBrY2VDb2RlVmVyaWZpZXJcbiAgICAgIG9hdXRoLnByb21wdCA9IG9hdXRoU3RhdGUucHJvbXB0XG4gICAgICBvYXV0aC5yZWRpcmVjdFVyaSA9IG9hdXRoU3RhdGUucmVkaXJlY3RVcmlcbiAgICAgIG9hdXRoLnN0b3JlZE5vbmNlID0gb2F1dGhTdGF0ZS5ub25jZVxuICAgIH1cblxuICAgIHJldHVybiBvYXV0aFxuICB9XG5cbiAgX3BhcnNlVXJsICh1cmwpIHtcbiAgICAvLyBsZXQgc3VwcG9ydGVkUGFyYW1zID0gUEFSQU1TW3RoaXMuX2Zsb3ddIHx8IFtdXG4gICAgbGV0IHN1cHBvcnRlZFBhcmFtcyA9IFBBUkFNU1xuICAgIHN1cHBvcnRlZFBhcmFtcyA9IHN1cHBvcnRlZFBhcmFtcy5jb25jYXQoW1xuICAgICAgUkVTUE9OU0VfTU9ERSxcbiAgICAgIEVSUk9SLFxuICAgICAgRVJST1JfREVTQ1JJUFRJT04sXG4gICAgICBFUlJPUl9VUklcbiAgICBdKVxuXG4gICAgbGV0IG9hdXRoXG4gICAgY29uc3QgdXJpID0gbmV3IFVSTCh1cmwpXG5cbiAgICBjb25zdCByZWR1Y2UgPSAoc2VhcmNoKSA9PiBzdXBwb3J0ZWRQYXJhbXMucmVkdWNlKChvYXV0aCwgcGFyYW0pID0+IHtcbiAgICAgIGNvbnN0IHZhbCA9IHNlYXJjaC5nZXQocGFyYW0pXG4gICAgICBpZiAodmFsKSB7XG4gICAgICAgIHNlYXJjaC5kZWxldGUocGFyYW0pXG4gICAgICAgIG9hdXRoW3BhcmFtXSA9IHZhbFxuICAgICAgfVxuICAgICAgcmV0dXJuIG9hdXRoXG4gICAgfSwge30pXG5cbiAgICBpZiAodGhpcy5fcmVzcG9uc2VNb2RlID09PSBRVUVSWSkge1xuICAgICAgb2F1dGggPSByZWR1Y2UodXJpLnNlYXJjaFBhcmFtcylcbiAgICAgIG9hdXRoLm5ld1VybCA9IHVyaS50b1N0cmluZygpXG4gICAgfSBlbHNlIGlmICh0aGlzLl9yZXNwb25zZU1vZGUgPT09IEZSQUdNRU5UKSB7XG4gICAgICBjb25zdCBzZWFyY2ggPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHVyaS5oYXNoLnN1YnN0cmluZygxKSlcbiAgICAgIG9hdXRoID0gcmVkdWNlKHNlYXJjaClcbiAgICAgIHVyaS5oYXNoID0gYCMke3NlYXJjaC50b1N0cmluZygpfWBcbiAgICAgIG9hdXRoLm5ld1VybCA9IHVyaS50b1N0cmluZygpXG4gICAgfVxuXG4gICAgaWYgKG9hdXRoICYmIG9hdXRoLnN0YXRlKSB7XG4gICAgICBpZiAoKHRoaXMuX2Zsb3cgPT09IFNUQU5EQVJEIHx8IHRoaXMuX2Zsb3cgPT09IEhZQlJJRCkgJiYgKG9hdXRoLmNvZGUgfHwgb2F1dGguZXJyb3IpKSB7XG4gICAgICAgIHJldHVybiBvYXV0aFxuICAgICAgfSBlbHNlIGlmICh0aGlzLl9mbG93ID09PSBJTVBMSUNJVCAmJiAob2F1dGguYWNjZXNzX3Rva2VuIHx8IG9hdXRoLmVycm9yKSkge1xuICAgICAgICByZXR1cm4gb2F1dGhcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmxvZy5lcnJvcignYmFkIHBhcmFtcyAlbyBmb3IgJXMgZmxvdycsIG9hdXRoLCB0aGlzLl9mbG93KVxuICB9XG59XG4iLCJpbXBvcnQgeyBjcmVhdGVQcm9taXNlIH0gZnJvbSAnLi9jcmVhdGVQcm9taXNlLmpzJ1xuaW1wb3J0IHsgY3JlYXRlSWZyYW1lIH0gZnJvbSAnLi9jcmVhdGVJZnJhbWUuanMnXG5pbXBvcnQgeyBOT05FIH0gZnJvbSAnLi4vY29uc3RhbnRzLmpzJ1xuXG5jb25zdCBNRVNTQUdFID0gJ21lc3NhZ2UnXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjaGVja1NpbGVudExvZ2luIChjbGllbnQpIHtcbiAgY29uc3QgeyBjYWxsYmFjaywgZW5kcG9pbnRzLCBvcHRpb25zIH0gPSBjbGllbnRcbiAgY29uc3QgcHJvbWlzZSA9IGNyZWF0ZVByb21pc2UoKVxuXG4gIGNvbnN0IHNyYyA9IGF3YWl0IGVuZHBvaW50cy5jcmVhdGVMb2dpblVybCh7XG4gICAgLi4ub3B0aW9ucyxcbiAgICBwcm9tcHQ6IE5PTkUsXG4gICAgcmVkaXJlY3RVcmk6IG9wdGlvbnMuc2lsZW50TG9naW5SZWRpcmVjdFVyaVxuICB9KVxuICBjb25zdCBpZnJhbWUgPSBjcmVhdGVJZnJhbWUoeyBzcmMsIHRpdGxlOiAnb2lkYy1zaWxlbnQtY2hlY2stc3NvJyB9KVxuXG4gIGNvbnN0IGhhbmRsZU1lc3NhZ2UgPSBmdW5jdGlvbiAoZXYpIHtcbiAgICBpZiAoZXYub3JpZ2luICE9PSB3aW5kb3cubG9jYXRpb24ub3JpZ2luIHx8IGlmcmFtZS5jb250ZW50V2luZG93ICE9PSBldi5zb3VyY2UpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBjb25zdCBvYXV0aCA9IGNhbGxiYWNrLnBhcnNlKGV2LmRhdGEpXG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChpZnJhbWUpXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoTUVTU0FHRSwgaGFuZGxlTWVzc2FnZSlcbiAgICBpZiAoIW9hdXRoKSB7XG4gICAgICBwcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ3NpbGVudCBsb2dpbiBmYWlsZWQnKSlcbiAgICB9IGVsc2Uge1xuICAgICAgcHJvbWlzZS5yZXNvbHZlKG9hdXRoKVxuICAgIH1cbiAgfVxuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKE1FU1NBR0UsIGhhbmRsZU1lc3NhZ2UpXG5cbiAgcmV0dXJuIHByb21pc2Vcbn1cbiIsIlxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUlmcmFtZSAoeyBzcmMsIHRpdGxlIH0pIHtcbiAgY29uc3QgaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJylcbiAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnc3JjJywgc3JjKVxuICBpZnJhbWUuc2V0QXR0cmlidXRlKCd0aXRsZScsIHRpdGxlKVxuICBpZnJhbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGlmcmFtZSlcbiAgcmV0dXJuIGlmcmFtZVxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVByb21pc2UgKCkge1xuICBsZXQgX3Jlc29sdmVcbiAgbGV0IF9yZWplY3RcbiAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBfcmVzb2x2ZSA9IHJlc29sdmVcbiAgICBfcmVqZWN0ID0gcmVqZWN0XG4gIH0pXG4gIHByb21pc2UucmVzb2x2ZSA9IF9yZXNvbHZlXG4gIHByb21pc2UucmVqZWN0ID0gX3JlamVjdFxuICByZXR1cm4gcHJvbWlzZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVib3VuY2VQcm9taXNlcyAoKSB7XG4gIGNvbnN0IHF1ZXVlID0gW11cblxuICBjb25zdCBwdXNoID0gKHByb21pc2UpID0+IHtcbiAgICBxdWV1ZS5wdXNoKHByb21pc2UpXG4gICAgcmV0dXJuIHF1ZXVlLmxlbmd0aCA9PT0gMVxuICB9XG4gIGNvbnN0IHJlc29sdmVBbGwgPSAocmVzdWx0KSA9PiB7XG4gICAgd2hpbGUgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgcXVldWUuc2hpZnQoKS5yZXNvbHZlKHJlc3VsdClcbiAgICB9XG4gIH1cbiAgY29uc3QgcmVqZWN0QWxsID0gKGVycikgPT4ge1xuICAgIHdoaWxlIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgIHF1ZXVlLnNoaWZ0KCkucmVqZWN0KGVycilcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHB1c2gsXG4gICAgcmVzb2x2ZUFsbCxcbiAgICByZWplY3RBbGxcbiAgfVxufVxuIiwiXG5jb25zdCBtYXAgPSB7XG4gICctJzogJysnLFxuICBfOiAnLydcbn1cbmNvbnN0IFJFX01BUCA9IC9bXy1dL2dcblxuLyoqXG4gKiBkZWNvZGUgYSBKV1RcbiAqIEB0aHJvd3NcbiAqIEBwYXJhbSB7c3RyaW5nfSBbdG9rZW49JyddXG4gKiBAcmV0dXJuIHtvYmplY3R9IHBheWxvYWQgb2YgZGVjb2RlZCB0b2tlblxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVjb2RlVG9rZW4gKHRva2VuID0gJycpIHtcbiAgY29uc3QgcGF5bG9hZCA9IHRva2VuLnNwbGl0KCcuJylbMV1cbiAgbGV0IGI2NCA9IHBheWxvYWQucmVwbGFjZShSRV9NQVAsIG0gPT4gbWFwW21dKVxuXG4gIHN3aXRjaCAoYjY0Lmxlbmd0aCAlIDQpIHtcbiAgICBjYXNlIDA6XG4gICAgICBicmVha1xuICAgIGNhc2UgMjpcbiAgICAgIGI2NCArPSAnPT0nXG4gICAgICBicmVha1xuICAgIGNhc2UgMzpcbiAgICAgIGI2NCArPSAnPSdcbiAgICAgIGJyZWFrXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCB0b2tlbicpXG4gIH1cblxuICBjb25zdCBzdHIgPSBkZWNvZGVVUklDb21wb25lbnQoZXNjYXBlKGF0b2IoYjY0KSkpXG4gIHJldHVybiBKU09OLnBhcnNlKHN0cilcbn1cbiIsImV4cG9ydCBjb25zdCBnZXQgPSAob2JqLCBrZXlzID0gW10sIGRlZiA9IHVuZGVmaW5lZCkgPT4ge1xuICBsZXQgbyA9IG9ialxuICBpZiAodHlwZW9mIGtleXMgPT09ICdzdHJpbmcnKSBrZXlzID0ga2V5cy5zcGxpdCgnLicpXG4gIGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcbiAgICBpZiAobyAmJiBvW2tleV0pIHsgbyA9IG9ba2V5XSB9IGVsc2UgeyByZXR1cm4gZGVmIH1cbiAgfVxuICByZXR1cm4gb1xufVxuIiwiLyogZ2xvYmFsIGdsb2JhbFRoaXMgKi9cblxuZXhwb3J0IGNvbnN0IF9nbG9iYWxUaGlzID0gKCgpID0+IHtcbiAgaWYgKHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBnbG9iYWxUaGlzXG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gd2luZG93XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZ2xvYmFsXG4gIH1cbn0pKClcbiIsImltcG9ydCB7IGdldCB9IGZyb20gJy4vZ2V0LmpzJ1xuaW1wb3J0IHsgYWJzb2x1dGVVcmwgfSBmcm9tICcuL3VybHMuanMnXG5pbXBvcnQgeyBwa2NlIH0gZnJvbSAnLi9wa2NlLmpzJ1xuXG5pbXBvcnQge1xuICBGUkFHTUVOVCxcbiAgUVVFUlksXG4gIFRPS0VOLFxuICBDT0RFLFxuICBJRF9UT0tFTixcbiAgU1RBTkRBUkQsXG4gIElNUExJQ0lULFxuICBIWUJSSUQsXG4gIE5PTkUsXG4gIExPR0lOLFxuICBPUEVOSURcbn0gZnJvbSAnLi4vY29uc3RhbnRzLmpzJ1xuXG5jb25zdCBzZXQgPSAodmFsLCBkZWYpID0+IEFycmF5LmlzQXJyYXkoZGVmKVxuICA/IGRlZi5pbmNsdWRlcyh2YWwpXG4gICAgICA/IHZhbFxuICAgICAgOiBkZWZbMF1cbiAgOiB2YWwgIT09IHVuZGVmaW5lZFxuICAgID8gdHlwZW9mIGRlZiA9PT0gJ2Jvb2xlYW4nXG4gICAgICAgID8gISF2YWxcbiAgICAgICAgOiB2YWxcbiAgICA6IGRlZlxuXG5jb25zdCBudW1iZXIgPSB2YWwgPT4gaXNOYU4odmFsKSA/IHVuZGVmaW5lZCA6IHZhbFxuXG5jb25zdCBmdW5jID0gdmFsID0+IHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicgPyB2YWwgOiB1bmRlZmluZWRcblxuY29uc3Qgc2V0UmVzcG9uc2VUeXBlID0gKHsgcmVzcG9uc2VUeXBlID0gJycsIGZsb3cgfSkgPT4ge1xuICBjb25zdCBhbGxvd2VkID0gW05PTkUsIENPREUsIFRPS0VOLCBJRF9UT0tFTl1cbiAgY29uc3QgdHlwZXMgPSByZXNwb25zZVR5cGUuc3BsaXQoJyAnKS5yZWR1Y2UoKHR5cGVzLCB0eXBlKSA9PiB7XG4gICAgaWYgKGFsbG93ZWQuaW5kZXhPZih0eXBlKSAhPT0gLTEpIHtcbiAgICAgIHR5cGVzLnB1c2godHlwZSlcbiAgICB9XG4gICAgcmV0dXJuIHR5cGVzXG4gIH0sIGZsb3cgPT09IElNUExJQ0lUID8gW10gOiBbQ09ERV0pXG4gIHJldHVybiBbLi4ubmV3IFNldCh0eXBlcyldLmpvaW4oJyAnKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdE9wdGlvbnMgKG9wdGlvbnMgPSB7fSkge1xuICBjb25zdCBsb2cgPSB7XG4gICAgaW5mbzogc2V0KGZ1bmMoZ2V0KG9wdGlvbnMsICdsb2cuaW5mbycsIGdldChvcHRpb25zLCAnbG9nLmxvZycpKSksIGZ1bmN0aW9uICgpIHt9KSxcbiAgICBlcnJvcjogc2V0KGZ1bmMoZ2V0KG9wdGlvbnMsICdsb2cuZXJyb3InKSksIGZ1bmN0aW9uICgpIHt9KVxuICB9XG5cbiAgY29uc3Qgb3B0cyA9IHtcbiAgICAuLi5vcHRpb25zLFxuICAgIGZvcmNlTG9naW46IHNldChvcHRpb25zLmZvcmNlTG9naW4sIGZhbHNlKSxcbiAgICBmb3JjZUxvZ291dDogc2V0KG9wdGlvbnMuZm9yY2VMb2dvdXQsIHRydWUpLFxuICAgIHVzZU5vbmNlOiBzZXQob3B0aW9ucy51c2VOb25jZSwgdHJ1ZSksXG4gICAgdXNlTG9jYWxTdG9yYWdlOiBzZXQob3B0aW9ucy51c2VMb2NhbFN0b3JhZ2UsIHRydWUpLFxuICAgIHVzZVN0YXR1c0lmcmFtZTogc2V0KG9wdGlvbnMudXNlU3RhdHVzSWZyYW1lLCB0cnVlKSxcbiAgICBzdGF0dXNJZnJhbWVJbnRlcnZhbDogc2V0KG51bWJlcihvcHRpb25zLnN0YXR1c0lmcmFtZUludGVydmFsKSwgNSksXG4gICAgcmVzcG9uc2VNb2RlOiBzZXQob3B0aW9ucy5yZXNwb25zZU1vZGUsIFtGUkFHTUVOVCwgUVVFUlldKSxcbiAgICByZXNwb25zZVR5cGU6IHNldFJlc3BvbnNlVHlwZShvcHRpb25zKSxcbiAgICBmbG93OiBzZXQob3B0aW9ucy5mbG93LCBbU1RBTkRBUkQsIElNUExJQ0lULCBIWUJSSURdKSxcbiAgICBwcm9tcHQ6IHNldChvcHRpb25zLnByb21wdCwgW05PTkUsIExPR0lOXSksXG4gICAgbWluVmFsaWRpdHk6IHNldChudW1iZXIob3B0aW9ucy5taW5WYWxpZGl0eSksIDE1KSxcbiAgICBleHBpcnlJbnRlcnZhbDogc2V0KG51bWJlcihvcHRpb25zLmV4cGlyeUludGVydmFsKSwgNSksXG4gICAgcGtjZTogc2V0KGZ1bmMob3B0aW9ucy5wa2NlKSwgcGtjZSksXG4gICAgbG9nXG4gIH1cblxuICAvLyBzYW5pdGl6ZSBzY29wZVxuICBjb25zdCBzY29wZV8gPSBvcHRpb25zLnNjb3BlXG4gIGNvbnN0IHNjb3BlID0gKFxuICAgICFzY29wZV9cbiAgICAgID8gW11cbiAgICAgIDogdHlwZW9mIHNjb3BlXyA9PT0gJ3N0cmluZydcbiAgICAgICAgPyBzY29wZV8uc3BsaXQoJyAnKVxuICAgICAgICA6IHNjb3BlX1xuICApLmZpbHRlcihCb29sZWFuKVxuICBpZiAoIXNjb3BlLmluY2x1ZGVzKE9QRU5JRCkgJiYgIW9wdGlvbnMubm9PcGVuaWRJblNjb3BlKSB7XG4gICAgc2NvcGUudW5zaGlmdChPUEVOSUQpXG4gIH1cbiAgb3B0cy5zY29wZSA9IHNjb3BlLmpvaW4oJyAnKVxuXG4gIC8vIG1ha2UgdXJsIHBvaW50IHRvIGEgcmVhbCBob3N0XG4gIGNvbnN0IHMgPSAnc2lsZW50TG9naW5SZWRpcmVjdFVyaSdcbiAgaWYgKG9wdHNbc10pIHtcbiAgICBvcHRzW3NdID0gYWJzb2x1dGVVcmwob3B0c1tzXSlcbiAgfVxuXG4gIC8vIHRlc3QgaWYgcGtjZU1ldGhvZCBpcyBzdXBwb3J0ZWRcbiAgaWYgKG9wdHMucGtjZSAmJiBvcHRzLnBrY2VNZXRob2QpIHtcbiAgICB0cnkge1xuICAgICAgb3B0cy5wa2NlKG9wdHMucGtjZU1ldGhvZClcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBvcHRzLmxvZy5lcnJvcigncGtjZU1ldGhvZCAlcyBub3Qgc3VwcG9ydGVkJywgb3B0cy5wa2NlTWV0aG9kKVxuICAgICAgb3B0cy5wa2NlTWV0aG9kID0gdW5kZWZpbmVkXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9wdHNcbn1cbiIsImltcG9ydCB7IGNsZWFyVXJsIH0gZnJvbSAnLi91cmxzLmpzJ1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9hZENvbmZpZyAoY29uZmlnKSB7XG4gIGlmICghY29uZmlnLnVybCkge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ3VybCBtaXNzaW5nJykpXG4gIH1cbiAgaWYgKCFjb25maWcuY2xpZW50SWQpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCdjbGllbnRJZCBtaXNzaW5nJykpXG4gIH1cblxuICBjb25zdCB7XG4gICAgdXJsLFxuICAgIHJlYWxtLFxuICAgIHVzZXJSZWdpc3RyYXRpb25FbmRwb2ludCxcbiAgICB1c2VyQWNjb3VudEVuZHBvaW50LFxuICAgIC4uLl9jb25maWdcbiAgfSA9IGNvbmZpZ1xuICBfY29uZmlnLnNlcnZlclVybCA9IGNsZWFyVXJsKHJlYWxtXG4gICAgPyBgJHt1cmx9L3JlYWxtcy8ke3JlYWxtfWBcbiAgICA6IHVybFxuICApXG5cbiAgbGV0IG9pZGNDb25maWdVcmwgPSBgJHtfY29uZmlnLnNlcnZlclVybH0vLndlbGwta25vd24vb3BlbmlkLWNvbmZpZ3VyYXRpb25gXG4gIGlmICh0eXBlb2YgX2NvbmZpZy5vaWRjQ29uZmlnID09PSAnc3RyaW5nJykge1xuICAgIG9pZGNDb25maWdVcmwgPSBfY29uZmlnLm9pZGNDb25maWdcbiAgICBfY29uZmlnLm9pZGNDb25maWcgPSBudWxsXG4gIH1cblxuICBjb25zdCBtZXJnZUMgPSAoYykgPT4gKHtcbiAgICAuLi5jLFxuICAgIHVzZXJSZWdpc3RyYXRpb25FbmRwb2ludCxcbiAgICB1c2VyQWNjb3VudEVuZHBvaW50XG4gIH0pXG5cbiAgaWYgKCFfY29uZmlnLm9pZGNDb25maWcpIHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChvaWRjQ29uZmlnVXJsLCB7XG4gICAgICBoZWFkZXJzOiB7IEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nIH1cbiAgICB9KVxuICAgIGlmIChyZXMuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoYGVycm9yIGxvYWRpbmcgb2lkY0NvbmZpZyAke29pZGNDb25maWdVcmx9YCkpXG4gICAgfVxuICAgIGNvbnN0IG9pZGNDb25maWcgPSBhd2FpdCByZXMuanNvbigpXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLl9jb25maWcsXG4gICAgICBvaWRjQ29uZmlnOiBtZXJnZUMob2lkY0NvbmZpZylcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgX2NvbmZpZy5vaWRjQ29uZmlnID0gbWVyZ2VDKGNvbmZpZy5vaWRjQ29uZmlnKVxuICB9XG5cbiAgcmV0dXJuIF9jb25maWdcbn1cbiIsImltcG9ydCB7IGdlblJhbmRvbURhdGEgfSBmcm9tICcuL3JhbmRvbS5qcydcbmltcG9ydCB7IF9nbG9iYWxUaGlzIH0gZnJvbSAnLi9nbG9iYWxUaGlzLmpzJ1xuXG5jb25zdCBtYXAgPSB7XG4gICcrJzogJy0nLFxuICAnLyc6ICdfJyxcbiAgJz0nOiAnJ1xufVxuY29uc3QgUkVfTUFQID0gL1srLz1dL2dcblxuZnVuY3Rpb24gdWludDhBcnJheVRvU3RyaW5nIChhcnJVaW50OCkge1xuICBsZXQgc1V0ZjggPSAnJ1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGFyclVpbnQ4Lmxlbmd0aDsgaSsrKSB7XG4gICAgc1V0ZjggKz0gU3RyaW5nLmZyb21DaGFyQ29kZShhcnJVaW50OFtpXSlcbiAgfVxuICByZXR1cm4gc1V0Zjhcbn1cblxuZnVuY3Rpb24gZ2VuQ29kZVZlcmlmaWVyIChsZW4pIHtcbiAgY29uc3QgYmluYXJ5ID0gdWludDhBcnJheVRvU3RyaW5nKGdlblJhbmRvbURhdGEobGVuKSlcbiAgcmV0dXJuIF9nbG9iYWxUaGlzLmJ0b2EoYmluYXJ5KS5yZXBsYWNlKFJFX01BUCwgJycpLnN1YnN0cmluZygwLCBsZW4pXG59XG5cbmZ1bmN0aW9uIGJhc2U2NEVuY29kZSAoaGFzaCkge1xuICBjb25zdCBiaW5hcnkgPSB1aW50OEFycmF5VG9TdHJpbmcobmV3IFVpbnQ4QXJyYXkoaGFzaCkpXG4gIGNvbnN0IGVuY29kZWQgPSBfZ2xvYmFsVGhpcy5idG9hKGJpbmFyeSkucmVwbGFjZShSRV9NQVAsIG0gPT4gbWFwW21dKVxuICByZXR1cm4gZW5jb2RlZFxufVxuXG5mdW5jdGlvbiBjcmVhdGVIYXNoIChidWZmZXIsIGFsZ29yaXRobSkge1xuICBpZiAodHlwZW9mIGJ1ZmZlciA9PT0gJ3N0cmluZycpIHtcbiAgICBidWZmZXIgPSBuZXcgX2dsb2JhbFRoaXMuVGV4dEVuY29kZXIoKS5lbmNvZGUoYnVmZmVyKVxuICB9XG4gIHJldHVybiBfZ2xvYmFsVGhpcy5jcnlwdG8uc3VidGxlLmRpZ2VzdChhbGdvcml0aG0sIGJ1ZmZlcilcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2VuUGtjZUNoYWxsZW5nZSAocGtjZU1ldGhvZCwgY29kZVZlcmlmaWVyKSB7XG4gIHN3aXRjaCAocGtjZU1ldGhvZCkge1xuICAgIGNhc2UgJ1MyNTYnOiB7XG4gICAgICBjb25zdCBoYXNoID0gYXdhaXQgY3JlYXRlSGFzaChjb2RlVmVyaWZpZXIsICdTSEEtMjU2JylcbiAgICAgIHJldHVybiBiYXNlNjRFbmNvZGUoaGFzaClcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCB2YWx1ZSBmb3IgcGtjZU1ldGhvZCcpXG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHBrY2UgKHBrY2VNZXRob2QsIHRlc3QpIHtcbiAgY29uc3QgY29kZVZlcmlmaWVyID0gdGVzdCB8fCBnZW5Db2RlVmVyaWZpZXIoOTYpXG4gIGNvbnN0IGNoYWxsZW5nZSA9IGF3YWl0IGdlblBrY2VDaGFsbGVuZ2UocGtjZU1ldGhvZCwgY29kZVZlcmlmaWVyKVxuICByZXR1cm4geyBjb2RlVmVyaWZpZXIsIGNoYWxsZW5nZSB9XG59XG4iLCJpbXBvcnQgeyBfZ2xvYmFsVGhpcyB9IGZyb20gJy4vZ2xvYmFsVGhpcy5qcydcblxuZXhwb3J0IGZ1bmN0aW9uIGdlblJhbmRvbURhdGEgKGxlbikge1xuICAvLyB1c2Ugd2ViIGNyeXB0byBBUElzIGlmIHBvc3NpYmxlXG4gIGNvbnN0IGNyeXB0byA9IF9nbG9iYWxUaGlzLmNyeXB0byB8fCBfZ2xvYmFsVGhpcy5tc0NyeXB0b1xuICBpZiAoY3J5cHRvICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMpIHtcbiAgICBjb25zdCBhcnJheSA9IG5ldyBVaW50OEFycmF5KGxlbilcbiAgICBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKGFycmF5KVxuICAgIHJldHVybiBBcnJheS5mcm9tKGFycmF5KVxuICB9XG5cbiAgLy8gZmFsbGJhY2sgdG8gTWF0aCByYW5kb21cbiAgY29uc3QgYXJyYXkgPSBuZXcgQXJyYXkobGVuKVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgYXJyYXlbaV0gPSAoTWF0aC5yYW5kb20oKSAqIDI1NikgfCAwXG4gIH1cbiAgcmV0dXJuIGFycmF5XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1dWlkNCAoKSB7XG4gIGNvbnN0IGFyciA9IGdlblJhbmRvbURhdGEoMzIpXG4gIHJldHVybiAoWzFlN10gKyAtMWUzICsgLTRlMyArIC04ZTMgKyAtMWUxMSkucmVwbGFjZSgvWzAxOF0vZywgYyA9PlxuICAgIChjIF4gKGFyci5wb3AoKSAmICgxNSA+PiAoYyAvIDQpKSkpLnRvU3RyaW5nKDE2KVxuICApXG59XG4iLCJpbXBvcnQgeyBjcmVhdGVQcm9taXNlLCBkZWJvdW5jZVByb21pc2VzIH0gZnJvbSAnLi9jcmVhdGVQcm9taXNlLmpzJ1xuaW1wb3J0IHsgY3JlYXRlSWZyYW1lIH0gZnJvbSAnLi9jcmVhdGVJZnJhbWUuanMnXG5pbXBvcnQge1xuICBDSEFOR0VELFxuICBVTkNIQU5HRUQsXG4gIEVSUk9SXG59IGZyb20gJy4uL2NvbnN0YW50cy5qcydcblxuY29uc3QgVElUTEUgPSAnb2lkYy1zdGF0dXMtaWZyYW1lJ1xuXG4vLyBodHRwczovL29wZW5pZC5uZXQvc3BlY3Mvb3BlbmlkLWNvbm5lY3Qtc2Vzc2lvbi0xXzAuaHRtbFxuZXhwb3J0IGNsYXNzIFN0YXR1c0lmcmFtZSB7XG4gIGNvbnN0cnVjdG9yIChjbGllbnQpIHtcbiAgICBjb25zdCB7IHVzZVN0YXR1c0lmcmFtZSwgc3RhdHVzSWZyYW1lSW50ZXJ2YWwsIGxvZyB9ID0gY2xpZW50Lm9wdGlvbnNcbiAgICB0aGlzLmNsaWVudCA9IGNsaWVudFxuICAgIHRoaXMuaWZyYW1lID0gbnVsbFxuICAgIHRoaXMuaWZyYW1lT3JpZ2luID0gbnVsbFxuICAgIHRoaXMuZGVib3VuY2UgPSBkZWJvdW5jZVByb21pc2VzKClcbiAgICB0aGlzLmVuYWJsZWQgPSB1c2VTdGF0dXNJZnJhbWVcbiAgICB0aGlzLmludGVydmFsID0gc3RhdHVzSWZyYW1lSW50ZXJ2YWwgKiAxMDAwXG4gICAgdGhpcy5sb2cgPSBsb2dcbiAgfVxuXG4gIF9zY2hlZHVsZSAoKSB7XG4gICAgaWYgKHRoaXMuZW5hYmxlZCAmJiAhdGhpcy50aW1lcklkKSB7XG4gICAgICB0aGlzLnRpbWVySWQgPSBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgICAgdGhpcy50aW1lcklkID0gbnVsbFxuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IHN0YXR1cyA9IGF3YWl0IHRoaXMuY2hlY2soKVxuICAgICAgICAgIGlmIChzdGF0dXMgPT09IFVOQ0hBTkdFRCkge1xuICAgICAgICAgICAgdGhpcy5fc2NoZWR1bGUoKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgICAvLyBzdGFydCBsb2dvdXQgaWYgRVJST1Igb3IgQ0hBTkdFRFxuICAgICAgICB0aGlzLmNsaWVudC5faGFuZGxlTG9nb3V0KClcbiAgICAgIH0sIHRoaXMuaW50ZXJ2YWwpXG4gICAgfVxuICB9XG5cbiAgb3JpZ2luICgpIHtcbiAgICBjb25zdCBhdXRoVXJsID0gdGhpcy5jbGllbnQuZW5kcG9pbnRzLmF1dGhvcml6ZSgpXG4gICAgcmV0dXJuIChhdXRoVXJsLmNoYXJBdCgwKSA9PT0gJy8nKVxuICAgICAgPyB3aW5kb3cubG9jYXRpb24ub3JpZ2luXG4gICAgICA6IGF1dGhVcmwuc3Vic3RyaW5nKDAsIGF1dGhVcmwuaW5kZXhPZignLycsIDgpKVxuICB9XG5cbiAgZGlzYWJsZSAoKSB7XG4gICAgdGhpcy5lbmFibGVkID0gZmFsc2VcbiAgfVxuXG4gIGFzeW5jIHNldHVwICgpIHtcbiAgICBjb25zdCBwcm9taXNlID0gY3JlYXRlUHJvbWlzZSgpXG5cbiAgICBpZiAodGhpcy5pZnJhbWUgfHwgIXRoaXMuZW5hYmxlZCkge1xuICAgICAgcHJvbWlzZS5yZXNvbHZlKClcbiAgICAgIHJldHVybiBwcm9taXNlXG4gICAgfVxuXG4gICAgY29uc3Qgc3JjID0gdGhpcy5jbGllbnQuZW5kcG9pbnRzLmNoZWNrU2Vzc2lvbklmcmFtZSgpXG4gICAgaWYgKCFzcmMpIHtcbiAgICAgIHRoaXMubG9nLmluZm8oJ25vIGNoZWNrX3Nlc3Npb25faWZyYW1lJylcbiAgICAgIHRoaXMuZGlzYWJsZSgpXG4gICAgICBwcm9taXNlLnJlc29sdmUoKVxuICAgICAgcmV0dXJuIHByb21pc2VcbiAgICB9XG5cbiAgICBjb25zdCBpZnJhbWUgPSB0aGlzLmlmcmFtZSA9IGNyZWF0ZUlmcmFtZSh7IHNyYywgdGl0bGU6IFRJVExFIH0pXG5cbiAgICBjb25zdCBoYW5kbGVMb2FkID0gKCkgPT4ge1xuICAgICAgdGhpcy5pZnJhbWVPcmlnaW4gPSB0aGlzLm9yaWdpbigpXG4gICAgICBwcm9taXNlLnJlc29sdmUoKVxuICAgIH1cbiAgICBpZnJhbWUuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGhhbmRsZUxvYWQpXG5cbiAgICBjb25zdCBoYW5kbGVNZXNzYWdlID0gKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoKGV2ZW50Lm9yaWdpbiAhPT0gdGhpcy5pZnJhbWVPcmlnaW4pIHx8XG4gICAgICAgICAgKHRoaXMuaWZyYW1lLmNvbnRlbnRXaW5kb3cgIT09IGV2ZW50LnNvdXJjZSkpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmICghW1VOQ0hBTkdFRCwgQ0hBTkdFRCwgRVJST1JdLmluY2x1ZGVzKGV2ZW50LmRhdGEpKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICB0aGlzLmxvZy5pbmZvKCdzdGF0dXNJZnJhbWUgXCIlc1wiJywgZXZlbnQuZGF0YSlcbiAgICAgIGlmIChldmVudC5kYXRhID09PSBFUlJPUikge1xuICAgICAgICB0aGlzLmRpc2FibGUoKVxuICAgICAgfVxuXG4gICAgICB0aGlzLmRlYm91bmNlLnJlc29sdmVBbGwoZXZlbnQuZGF0YSlcbiAgICB9XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGhhbmRsZU1lc3NhZ2UsIGZhbHNlKVxuXG4gICAgcmV0dXJuIHByb21pc2VcbiAgfVxuXG4gIGFzeW5jIGNoZWNrICgpIHtcbiAgICBjb25zdCBwcm9taXNlID0gY3JlYXRlUHJvbWlzZSgpXG5cbiAgICBjb25zdCB7IGVuYWJsZWQsIGlmcmFtZSwgaWZyYW1lT3JpZ2luIH0gPSB0aGlzXG4gICAgY29uc3QgeyBjbGllbnRJZCB9ID0gdGhpcy5jbGllbnQub3B0aW9uc1xuICAgIGNvbnN0IHNlc3Npb25TdGF0ZSA9IHRoaXMuY2xpZW50LnRva2Vucy5zZXNzaW9uU3RhdGUoKVxuXG4gICAgaWYgKGVuYWJsZWQgJiYgaWZyYW1lICYmIGlmcmFtZU9yaWdpbiAmJiBjbGllbnRJZCAmJiBzZXNzaW9uU3RhdGUpIHtcbiAgICAgIGlmICh0aGlzLmRlYm91bmNlLnB1c2gocHJvbWlzZSkpIHtcbiAgICAgICAgdGhpcy5sb2cuaW5mbygnc3RhdHVzSWZyYW1lIGNoZWNrIFwiJXNcIiBcIiVzXCInLCBjbGllbnRJZCwgc2Vzc2lvblN0YXRlKVxuICAgICAgICBjb25zdCBtc2cgPSBgJHtjbGllbnRJZH0gJHtzZXNzaW9uU3RhdGV9YFxuICAgICAgICB0aGlzLmlmcmFtZS5jb250ZW50V2luZG93LnBvc3RNZXNzYWdlKG1zZywgdGhpcy5pZnJhbWVPcmlnaW4pXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubG9nLmluZm8oJ3N0YXR1c0lmcmFtZSBkaXNhYmxlZCAlbycsIHtcbiAgICAgICAgZW5hYmxlZCxcbiAgICAgICAgaWZyYW1lLFxuICAgICAgICBpZnJhbWVPcmlnaW4sXG4gICAgICAgIGNsaWVudElkLFxuICAgICAgICBzZXNzaW9uU3RhdGVcbiAgICAgIH0pXG4gICAgICB0aGlzLmRpc2FibGUoKVxuICAgICAgcHJvbWlzZS5yZXNvbHZlKEVSUk9SKVxuICAgIH1cblxuICAgIHJldHVybiBwcm9taXNlXG4gIH1cblxuICBhc3luYyBzY2hlZHVsZSAoKSB7XG4gICAgY29uc3QgbmVlZHNGaXJzdENoZWNrID0gIXRoaXMuaWZyYW1lXG5cbiAgICBhd2FpdCB0aGlzLnNldHVwKClcbiAgICBpZiAoIXRoaXMuZW5hYmxlZCkgcmV0dXJuXG5cbiAgICBpZiAobmVlZHNGaXJzdENoZWNrKSB7XG4gICAgLy8gZmlyc3QgY2hlY2sgLSBpZ25vcmUgZmlyc3QgZXJyb3IgYXMgdGhpcyBtaWdodCBiZSBkdWUgdG8gYmxvY2tlZCAzcmQgcGFydHkgY29va2llc1xuICAgICAgY29uc3Qgc3RhdHVzID0gYXdhaXQgdGhpcy5jaGVjaygpXG4gICAgICBpZiAoc3RhdHVzID09PSBVTkNIQU5HRUQpIHtcbiAgICAgICAgdGhpcy5fc2NoZWR1bGUoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gQ0hBTkdFRCkge1xuICAgICAgICAgIHRoaXMuY2xpZW50Ll9oYW5kbGVMb2dvdXQoKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ3N0YXR1cyBpZnJhbWUgJXMnLCBzdGF0dXMpKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNsZWFyU2NoZWR1bGUgKCkge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVySWQpXG4gICAgdGhpcy50aW1lcklkID0gbnVsbFxuICB9XG59XG4iLCJmdW5jdGlvbiBtaW4ybXMgKG1pbikge1xuICByZXR1cm4gbWluICogNjAwMDBcbn1cblxuZnVuY3Rpb24gZ2V0Q29va2llIChrZXkpIHtcbiAgY29uc3QgbmFtZSA9IGtleSArICc9J1xuICBjb25zdCBjYSA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOycpXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY2EubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBjID0gY2FbaV0udHJpbVN0YXJ0KClcbiAgICBpZiAoYy5pbmRleE9mKG5hbWUpID09PSAwKSB7XG4gICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGMuc3Vic3RyaW5nKG5hbWUubGVuZ3RoLCBjLmxlbmd0aCkpXG4gICAgfVxuICB9XG4gIHJldHVybiAnJ1xufVxuXG5mdW5jdGlvbiBnZXRDb29raWVzICgpIHtcbiAgY29uc3Qgb2JqID0ge31cbiAgY29uc3QgY2EgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsnKVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNhLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgYyA9IGNhW2ldLnRyaW1TdGFydCgpXG4gICAgY29uc3QgW18sIGtleSwgdmFsdWVdID0gL14oW149XSspPSguKikkLy5leGVjKGMpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICBvYmpba2V5XSA9IGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZSlcbiAgfVxuICByZXR1cm4gb2JqXG59XG5cbmZ1bmN0aW9uIGNvb2tpZUV4cGlyYXRpb24gKG1pbnV0ZXMpIHtcbiAgY29uc3QgZXhwID0gbmV3IERhdGUoKVxuICBleHAuc2V0VGltZShleHAuZ2V0VGltZSgpICsgbWluMm1zKG1pbnV0ZXMpKVxuICByZXR1cm4gZXhwXG59XG5cbmZ1bmN0aW9uIHNldENvb2tpZSAoa2V5LCB2YWx1ZSwgbWludXRlcykge1xuICBjb25zdCBleHBpcmF0aW9uRGF0ZSA9IGNvb2tpZUV4cGlyYXRpb24obWludXRlcylcbiAgY29uc3QgY29va2llID0gYCR7a2V5fT0ke2VuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSl9OyBleHBpcmVzPSR7ZXhwaXJhdGlvbkRhdGUudG9VVENTdHJpbmcoKX07IGBcbiAgZG9jdW1lbnQuY29va2llID0gY29va2llXG59XG5cbmV4cG9ydCBjbGFzcyBDb29raWVTdG9yYWdlIHtcbiAga2V5cyAoKSB7XG4gICAgcmV0dXJuIGdldENvb2tpZXMoKVxuICB9XG5cbiAgZ2V0SXRlbSAoa2V5KSB7XG4gICAgY29uc3QgdmFsdWUgPSBnZXRDb29raWUoa2V5KVxuICAgIHJldHVybiBKU09OLnBhcnNlKHZhbHVlKVxuICB9XG5cbiAgc2V0SXRlbSAoa2V5LCB2YWx1ZSkge1xuICAgIHNldENvb2tpZShrZXksIEpTT04uc3RyaW5naWZ5KHZhbHVlKSwgNjApXG4gIH1cblxuICByZW1vdmVJdGVtIChrZXkpIHtcbiAgICBzZXRDb29raWUoa2V5LCAnJywgLTYwKVxuICB9XG5cbiAgY2xlYXIgKCkge1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBMb2NhbFN0b3JhZ2Uge1xuICAvKipcbiAgICogW2NvbnN0cnVjdG9yIGRlc2NyaXB0aW9uXVxuICAgKiBAcGFyYW0ge29iamVjdH0gW3R5cGVdIC0gd2luZG93LnNlc3Npb25TdG9yYWdlXG4gICAqL1xuICBjb25zdHJ1Y3RvciAodHlwZSkge1xuICAgIGNvbnN0IHRlc3QgPSAnIyMtdGVzdCdcbiAgICB0aGlzLl9zdG9yZSA9IHR5cGUgfHwgd2luZG93LmxvY2FsU3RvcmFnZVxuICAgIHRoaXMuX3N0b3JlLnNldEl0ZW0odGVzdCwgdGVzdClcbiAgICB0aGlzLl9zdG9yZS5yZW1vdmVJdGVtKHRlc3QpXG4gIH1cblxuICBrZXlzICgpIHtcbiAgICByZXR1cm4gdGhpcy5fc3RvcmVcbiAgfVxuXG4gIGdldEl0ZW0gKGtleSkge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5fc3RvcmUuZ2V0SXRlbShrZXkpXG4gICAgcmV0dXJuIEpTT04ucGFyc2UodmFsdWUpXG4gIH1cblxuICBzZXRJdGVtIChrZXksIHZhbHVlKSB7XG4gICAgdGhpcy5fc3RvcmUuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KHZhbHVlKSlcbiAgfVxuXG4gIHJlbW92ZUl0ZW0gKGtleSkge1xuICAgIHRoaXMuX3N0b3JlLnJlbW92ZUl0ZW0oa2V5KVxuICB9XG5cbiAgY2xlYXIgKCkge1xuICAgIHRoaXMuX3N0b3JlLmNsZWFyKClcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RvcmFnZSAodHlwZSkge1xuICBpZiAodHlwZSA9PT0gJ2Nvb2tpZScpIHtcbiAgICByZXR1cm4gbmV3IENvb2tpZVN0b3JhZ2UoKVxuICB9XG4gIHRyeSB7XG4gICAgcmV0dXJuIG5ldyBMb2NhbFN0b3JhZ2UodHlwZSlcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBuZXcgQ29va2llU3RvcmFnZSgpXG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENhbGxiYWNrU3RvcmFnZSB7XG4gIGNvbnN0cnVjdG9yICh0eXBlKSB7XG4gICAgdGhpcy5fY2FsbGJhY2sgPSAnb2lkYy1jYWxsYmFjay0nXG4gICAgdGhpcy5fc3RvcmUgPSBzdG9yYWdlKHR5cGUpXG4gIH1cblxuICBfY2xlYXJFeHBpcmVkICgpIHtcbiAgICBjb25zdCB0aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModGhpcy5fc3RvcmUua2V5cygpKVxuICAgIGtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBpZiAoa2V5LmluZGV4T2YodGhpcy5fY2FsbGJhY2spID09PSAwKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgeyBleHBpcmVzIH0gPSB0aGlzLl9zdG9yZS5nZXRJdGVtKGtleSlcbiAgICAgICAgICBpZiAoIWV4cGlyZXMgfHwgZXhwaXJlcyA8IHRpbWUpIHtcbiAgICAgICAgICAgIHRoaXMuX3N0b3JlLnJlbW92ZUl0ZW0oa2V5KVxuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHRoaXMuX3N0b3JlLnJlbW92ZUl0ZW0oa2V5KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGdldCAoc3RhdGUpIHtcbiAgICBpZiAoIXN0YXRlKSByZXR1cm5cbiAgICB0aGlzLl9jbGVhckV4cGlyZWQoKVxuICAgIGNvbnN0IGtleSA9IHRoaXMuX2NhbGxiYWNrICsgc3RhdGVcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuX3N0b3JlLmdldEl0ZW0oa2V5KVxuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5fc3RvcmUucmVtb3ZlSXRlbShrZXkpXG4gICAgICByZXR1cm4gdmFsdWVcbiAgICB9XG4gIH1cblxuICBhZGQgKHN0YXRlKSB7XG4gICAgdGhpcy5fY2xlYXJFeHBpcmVkKClcbiAgICBjb25zdCBrZXkgPSB0aGlzLl9jYWxsYmFjayArIHN0YXRlLnN0YXRlXG4gICAgc3RhdGUuZXhwaXJlcyA9IHN0YXRlLmV4cGlyZXMgfHwgKG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgbWluMm1zKDYwKSlcbiAgICB0aGlzLl9zdG9yZS5zZXRJdGVtKGtleSwgc3RhdGUpXG4gIH1cbn1cbiIsImNvbnN0IGhhc1Byb3RvID0gcHJvdG8gPT4gL15odHRwcz86Ly50ZXN0KHByb3RvKVxuXG5leHBvcnQgZnVuY3Rpb24gYWJzb2x1dGVVcmwgKHVybCwgb3JpZ2luKSB7XG4gIGlmIChoYXNQcm90byh1cmwpKSB7XG4gICAgcmV0dXJuIHVybFxuICB9IGVsc2Uge1xuICAgIGNvbnN0IHUgPSBuZXcgVVJMKG9yaWdpbiB8fCB3aW5kb3cubG9jYXRpb24ub3JpZ2luKVxuICAgIHUucGF0aG5hbWUgPSB1cmxcbiAgICByZXR1cm4gdS50b1N0cmluZygpXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyVXJsICh1cmwpIHtcbiAgY29uc3QgcGFydHMgPSB1cmwuc3BsaXQoJy8nKS5maWx0ZXIoQm9vbGVhbilcbiAgY29uc3QgcHJvdG8gPSBwYXJ0cy5zaGlmdCgpXG4gIHJldHVybiAoaGFzUHJvdG8ocHJvdG8pXG4gICAgPyBgJHtwcm90b30vL2BcbiAgICA6IGAvJHtwcm90b30vYCkgKyBwYXJ0cy5qb2luKCcvJylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVVybCAodXJsLCBxdWVyeSkge1xuICBjb25zdCB1ID0gbmV3IFVSTChjbGVhclVybCh1cmwpKVxuICBpZiAocXVlcnkpIHtcbiAgICB1LnNlYXJjaCA9IHVybEVuY29kZWQocXVlcnkpXG4gIH1cbiAgcmV0dXJuIHUudG9TdHJpbmcoKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdXJsRW5jb2RlZCAocXVlcnkpIHtcbiAgcmV0dXJuIG5ldyBVUkxTZWFyY2hQYXJhbXMoXG4gICAgT2JqZWN0LmVudHJpZXMoSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShxdWVyeSkpKVxuICApLnRvU3RyaW5nKClcbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxudmFyIHJ1bnRpbWUgPSAoZnVuY3Rpb24gKGV4cG9ydHMpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIE9wID0gT2JqZWN0LnByb3RvdHlwZTtcbiAgdmFyIGhhc093biA9IE9wLmhhc093blByb3BlcnR5O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cbiAgdmFyICRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2wgOiB7fTtcbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcbiAgdmFyIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgXCJAQGFzeW5jSXRlcmF0b3JcIjtcbiAgdmFyIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcblxuICBmdW5jdGlvbiBkZWZpbmUob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gb2JqW2tleV07XG4gIH1cbiAgdHJ5IHtcbiAgICAvLyBJRSA4IGhhcyBhIGJyb2tlbiBPYmplY3QuZGVmaW5lUHJvcGVydHkgdGhhdCBvbmx5IHdvcmtzIG9uIERPTSBvYmplY3RzLlxuICAgIGRlZmluZSh7fSwgXCJcIik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGRlZmluZSA9IGZ1bmN0aW9uKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIG9ialtrZXldID0gdmFsdWU7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBJZiBvdXRlckZuIHByb3ZpZGVkIGFuZCBvdXRlckZuLnByb3RvdHlwZSBpcyBhIEdlbmVyYXRvciwgdGhlbiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvci5cbiAgICB2YXIgcHJvdG9HZW5lcmF0b3IgPSBvdXRlckZuICYmIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yID8gb3V0ZXJGbiA6IEdlbmVyYXRvcjtcbiAgICB2YXIgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShwcm90b0dlbmVyYXRvci5wcm90b3R5cGUpO1xuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pO1xuXG4gICAgLy8gVGhlIC5faW52b2tlIG1ldGhvZCB1bmlmaWVzIHRoZSBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlIC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcy5cbiAgICBnZW5lcmF0b3IuX2ludm9rZSA9IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG5cbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG4gIGV4cG9ydHMud3JhcCA9IHdyYXA7XG5cbiAgLy8gVHJ5L2NhdGNoIGhlbHBlciB0byBtaW5pbWl6ZSBkZW9wdGltaXphdGlvbnMuIFJldHVybnMgYSBjb21wbGV0aW9uXG4gIC8vIHJlY29yZCBsaWtlIGNvbnRleHQudHJ5RW50cmllc1tpXS5jb21wbGV0aW9uLiBUaGlzIGludGVyZmFjZSBjb3VsZFxuICAvLyBoYXZlIGJlZW4gKGFuZCB3YXMgcHJldmlvdXNseSkgZGVzaWduZWQgdG8gdGFrZSBhIGNsb3N1cmUgdG8gYmVcbiAgLy8gaW52b2tlZCB3aXRob3V0IGFyZ3VtZW50cywgYnV0IGluIGFsbCB0aGUgY2FzZXMgd2UgY2FyZSBhYm91dCB3ZVxuICAvLyBhbHJlYWR5IGhhdmUgYW4gZXhpc3RpbmcgbWV0aG9kIHdlIHdhbnQgdG8gY2FsbCwgc28gdGhlcmUncyBubyBuZWVkXG4gIC8vIHRvIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvYmplY3QuIFdlIGNhbiBldmVuIGdldCBhd2F5IHdpdGggYXNzdW1pbmdcbiAgLy8gdGhlIG1ldGhvZCB0YWtlcyBleGFjdGx5IG9uZSBhcmd1bWVudCwgc2luY2UgdGhhdCBoYXBwZW5zIHRvIGJlIHRydWVcbiAgLy8gaW4gZXZlcnkgY2FzZSwgc28gd2UgZG9uJ3QgaGF2ZSB0byB0b3VjaCB0aGUgYXJndW1lbnRzIG9iamVjdC4gVGhlXG4gIC8vIG9ubHkgYWRkaXRpb25hbCBhbGxvY2F0aW9uIHJlcXVpcmVkIGlzIHRoZSBjb21wbGV0aW9uIHJlY29yZCwgd2hpY2hcbiAgLy8gaGFzIGEgc3RhYmxlIHNoYXBlIGFuZCBzbyBob3BlZnVsbHkgc2hvdWxkIGJlIGNoZWFwIHRvIGFsbG9jYXRlLlxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJub3JtYWxcIiwgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKSB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJ0aHJvd1wiLCBhcmc6IGVyciB9O1xuICAgIH1cbiAgfVxuXG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0ID0gXCJzdXNwZW5kZWRTdGFydFwiO1xuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCA9IFwic3VzcGVuZGVkWWllbGRcIjtcbiAgdmFyIEdlblN0YXRlRXhlY3V0aW5nID0gXCJleGVjdXRpbmdcIjtcbiAgdmFyIEdlblN0YXRlQ29tcGxldGVkID0gXCJjb21wbGV0ZWRcIjtcblxuICAvLyBSZXR1cm5pbmcgdGhpcyBvYmplY3QgZnJvbSB0aGUgaW5uZXJGbiBoYXMgdGhlIHNhbWUgZWZmZWN0IGFzXG4gIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC5cbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTtcblxuICAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuXG4gIC8vIFRoaXMgaXMgYSBwb2x5ZmlsbCBmb3IgJUl0ZXJhdG9yUHJvdG90eXBlJSBmb3IgZW52aXJvbm1lbnRzIHRoYXRcbiAgLy8gZG9uJ3QgbmF0aXZlbHkgc3VwcG9ydCBpdC5cbiAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG4gIEl0ZXJhdG9yUHJvdG90eXBlW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICB2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG4gIHZhciBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvICYmIGdldFByb3RvKGdldFByb3RvKHZhbHVlcyhbXSkpKTtcbiAgaWYgKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmXG4gICAgICBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAhPT0gT3AgJiZcbiAgICAgIGhhc093bi5jYWxsKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCkpIHtcbiAgICAvLyBUaGlzIGVudmlyb25tZW50IGhhcyBhIG5hdGl2ZSAlSXRlcmF0b3JQcm90b3R5cGUlOyB1c2UgaXQgaW5zdGVhZFxuICAgIC8vIG9mIHRoZSBwb2x5ZmlsbC5cbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlO1xuICB9XG5cbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID1cbiAgICBHZW5lcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSk7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdwLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb247XG4gIEdlbmVyYXRvckZ1bmN0aW9uLmRpc3BsYXlOYW1lID0gZGVmaW5lKFxuICAgIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLFxuICAgIHRvU3RyaW5nVGFnU3ltYm9sLFxuICAgIFwiR2VuZXJhdG9yRnVuY3Rpb25cIlxuICApO1xuXG4gIC8vIEhlbHBlciBmb3IgZGVmaW5pbmcgdGhlIC5uZXh0LCAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMgb2YgdGhlXG4gIC8vIEl0ZXJhdG9yIGludGVyZmFjZSBpbiB0ZXJtcyBvZiBhIHNpbmdsZSAuX2ludm9rZSBtZXRob2QuXG4gIGZ1bmN0aW9uIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhwcm90b3R5cGUpIHtcbiAgICBbXCJuZXh0XCIsIFwidGhyb3dcIiwgXCJyZXR1cm5cIl0uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgIGRlZmluZShwcm90b3R5cGUsIG1ldGhvZCwgZnVuY3Rpb24oYXJnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UobWV0aG9kLCBhcmcpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICB2YXIgY3RvciA9IHR5cGVvZiBnZW5GdW4gPT09IFwiZnVuY3Rpb25cIiAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIGN0b3JcbiAgICAgID8gY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHxcbiAgICAgICAgLy8gRm9yIHRoZSBuYXRpdmUgR2VuZXJhdG9yRnVuY3Rpb24gY29uc3RydWN0b3IsIHRoZSBiZXN0IHdlIGNhblxuICAgICAgICAvLyBkbyBpcyB0byBjaGVjayBpdHMgLm5hbWUgcHJvcGVydHkuXG4gICAgICAgIChjdG9yLmRpc3BsYXlOYW1lIHx8IGN0b3IubmFtZSkgPT09IFwiR2VuZXJhdG9yRnVuY3Rpb25cIlxuICAgICAgOiBmYWxzZTtcbiAgfTtcblxuICBleHBvcnRzLm1hcmsgPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICBpZiAoT2JqZWN0LnNldFByb3RvdHlwZU9mKSB7XG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgICAgIGRlZmluZShnZW5GdW4sIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvckZ1bmN0aW9uXCIpO1xuICAgIH1cbiAgICBnZW5GdW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShHcCk7XG4gICAgcmV0dXJuIGdlbkZ1bjtcbiAgfTtcblxuICAvLyBXaXRoaW4gdGhlIGJvZHkgb2YgYW55IGFzeW5jIGZ1bmN0aW9uLCBgYXdhaXQgeGAgaXMgdHJhbnNmb3JtZWQgdG9cbiAgLy8gYHlpZWxkIHJlZ2VuZXJhdG9yUnVudGltZS5hd3JhcCh4KWAsIHNvIHRoYXQgdGhlIHJ1bnRpbWUgY2FuIHRlc3RcbiAgLy8gYGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIilgIHRvIGRldGVybWluZSBpZiB0aGUgeWllbGRlZCB2YWx1ZSBpc1xuICAvLyBtZWFudCB0byBiZSBhd2FpdGVkLlxuICBleHBvcnRzLmF3cmFwID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIHsgX19hd2FpdDogYXJnIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gQXN5bmNJdGVyYXRvcihnZW5lcmF0b3IsIFByb21pc2VJbXBsKSB7XG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChnZW5lcmF0b3JbbWV0aG9kXSwgZ2VuZXJhdG9yLCBhcmcpO1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmc7XG4gICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlICYmXG4gICAgICAgICAgICB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIikpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZUltcGwucmVzb2x2ZSh2YWx1ZS5fX2F3YWl0KS50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJuZXh0XCIsIHZhbHVlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgaW52b2tlKFwidGhyb3dcIiwgZXJyLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24odW53cmFwcGVkKSB7XG4gICAgICAgICAgLy8gV2hlbiBhIHlpZWxkZWQgUHJvbWlzZSBpcyByZXNvbHZlZCwgaXRzIGZpbmFsIHZhbHVlIGJlY29tZXNcbiAgICAgICAgICAvLyB0aGUgLnZhbHVlIG9mIHRoZSBQcm9taXNlPHt2YWx1ZSxkb25lfT4gcmVzdWx0IGZvciB0aGVcbiAgICAgICAgICAvLyBjdXJyZW50IGl0ZXJhdGlvbi5cbiAgICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQ7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgIC8vIElmIGEgcmVqZWN0ZWQgUHJvbWlzZSB3YXMgeWllbGRlZCwgdGhyb3cgdGhlIHJlamVjdGlvbiBiYWNrXG4gICAgICAgICAgLy8gaW50byB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIHNvIGl0IGNhbiBiZSBoYW5kbGVkIHRoZXJlLlxuICAgICAgICAgIHJldHVybiBpbnZva2UoXCJ0aHJvd1wiLCBlcnJvciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHByZXZpb3VzUHJvbWlzZTtcblxuICAgIGZ1bmN0aW9uIGVucXVldWUobWV0aG9kLCBhcmcpIHtcbiAgICAgIGZ1bmN0aW9uIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2VJbXBsKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPVxuICAgICAgICAvLyBJZiBlbnF1ZXVlIGhhcyBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gd2Ugd2FudCB0byB3YWl0IHVudGlsXG4gICAgICAgIC8vIGFsbCBwcmV2aW91cyBQcm9taXNlcyBoYXZlIGJlZW4gcmVzb2x2ZWQgYmVmb3JlIGNhbGxpbmcgaW52b2tlLFxuICAgICAgICAvLyBzbyB0aGF0IHJlc3VsdHMgYXJlIGFsd2F5cyBkZWxpdmVyZWQgaW4gdGhlIGNvcnJlY3Qgb3JkZXIuIElmXG4gICAgICAgIC8vIGVucXVldWUgaGFzIG5vdCBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gaXQgaXMgaW1wb3J0YW50IHRvXG4gICAgICAgIC8vIGNhbGwgaW52b2tlIGltbWVkaWF0ZWx5LCB3aXRob3V0IHdhaXRpbmcgb24gYSBjYWxsYmFjayB0byBmaXJlLFxuICAgICAgICAvLyBzbyB0aGF0IHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gaGFzIHRoZSBvcHBvcnR1bml0eSB0byBkb1xuICAgICAgICAvLyBhbnkgbmVjZXNzYXJ5IHNldHVwIGluIGEgcHJlZGljdGFibGUgd2F5LiBUaGlzIHByZWRpY3RhYmlsaXR5XG4gICAgICAgIC8vIGlzIHdoeSB0aGUgUHJvbWlzZSBjb25zdHJ1Y3RvciBzeW5jaHJvbm91c2x5IGludm9rZXMgaXRzXG4gICAgICAgIC8vIGV4ZWN1dG9yIGNhbGxiYWNrLCBhbmQgd2h5IGFzeW5jIGZ1bmN0aW9ucyBzeW5jaHJvbm91c2x5XG4gICAgICAgIC8vIGV4ZWN1dGUgY29kZSBiZWZvcmUgdGhlIGZpcnN0IGF3YWl0LiBTaW5jZSB3ZSBpbXBsZW1lbnQgc2ltcGxlXG4gICAgICAgIC8vIGFzeW5jIGZ1bmN0aW9ucyBpbiB0ZXJtcyBvZiBhc3luYyBnZW5lcmF0b3JzLCBpdCBpcyBlc3BlY2lhbGx5XG4gICAgICAgIC8vIGltcG9ydGFudCB0byBnZXQgdGhpcyByaWdodCwgZXZlbiB0aG91Z2ggaXQgcmVxdWlyZXMgY2FyZS5cbiAgICAgICAgcHJldmlvdXNQcm9taXNlID8gcHJldmlvdXNQcm9taXNlLnRoZW4oXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcsXG4gICAgICAgICAgLy8gQXZvaWQgcHJvcGFnYXRpbmcgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnkgbGF0ZXJcbiAgICAgICAgICAvLyBpbnZvY2F0aW9ucyBvZiB0aGUgaXRlcmF0b3IuXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmdcbiAgICAgICAgKSA6IGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCk7XG4gICAgfVxuXG4gICAgLy8gRGVmaW5lIHRoZSB1bmlmaWVkIGhlbHBlciBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIGltcGxlbWVudCAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIChzZWUgZGVmaW5lSXRlcmF0b3JNZXRob2RzKS5cbiAgICB0aGlzLl9pbnZva2UgPSBlbnF1ZXVlO1xuICB9XG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKTtcbiAgQXN5bmNJdGVyYXRvci5wcm90b3R5cGVbYXN5bmNJdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIGV4cG9ydHMuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3I7XG5cbiAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG4gIGV4cG9ydHMuYXN5bmMgPSBmdW5jdGlvbihpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCwgUHJvbWlzZUltcGwpIHtcbiAgICBpZiAoUHJvbWlzZUltcGwgPT09IHZvaWQgMCkgUHJvbWlzZUltcGwgPSBQcm9taXNlO1xuXG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcihcbiAgICAgIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpLFxuICAgICAgUHJvbWlzZUltcGxcbiAgICApO1xuXG4gICAgcmV0dXJuIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKVxuICAgICAgPyBpdGVyIC8vIElmIG91dGVyRm4gaXMgYSBnZW5lcmF0b3IsIHJldHVybiB0aGUgZnVsbCBpdGVyYXRvci5cbiAgICAgIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICAgICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcblxuICAgIHJldHVybiBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVFeGVjdXRpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUNvbXBsZXRlZCkge1xuICAgICAgICBpZiAobWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOlxuICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnRleHQubWV0aG9kID0gbWV0aG9kO1xuICAgICAgY29udGV4dC5hcmcgPSBhcmc7XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZVJlc3VsdCA9IG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0ID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZVJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgLy8gU2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gY29udGV4dC5hcmc7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgICAgdGhyb3cgY29udGV4dC5hcmc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG5cbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lXG4gICAgICAgICAgICA/IEdlblN0YXRlQ29tcGxldGVkXG4gICAgICAgICAgICA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG5cbiAgICAgICAgICBpZiAocmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcblxuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgIC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBDYWxsIGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXShjb250ZXh0LmFyZykgYW5kIGhhbmRsZSB0aGVcbiAgLy8gcmVzdWx0LCBlaXRoZXIgYnkgcmV0dXJuaW5nIGEgeyB2YWx1ZSwgZG9uZSB9IHJlc3VsdCBmcm9tIHRoZVxuICAvLyBkZWxlZ2F0ZSBpdGVyYXRvciwgb3IgYnkgbW9kaWZ5aW5nIGNvbnRleHQubWV0aG9kIGFuZCBjb250ZXh0LmFyZyxcbiAgLy8gc2V0dGluZyBjb250ZXh0LmRlbGVnYXRlIHRvIG51bGwsIGFuZCByZXR1cm5pbmcgdGhlIENvbnRpbnVlU2VudGluZWwuXG4gIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdO1xuICAgIGlmIChtZXRob2QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gQSAudGhyb3cgb3IgLnJldHVybiB3aGVuIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgbm8gLnRocm93XG4gICAgICAvLyBtZXRob2QgYWx3YXlzIHRlcm1pbmF0ZXMgdGhlIHlpZWxkKiBsb29wLlxuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIC8vIE5vdGU6IFtcInJldHVyblwiXSBtdXN0IGJlIHVzZWQgZm9yIEVTMyBwYXJzaW5nIGNvbXBhdGliaWxpdHkuXG4gICAgICAgIGlmIChkZWxlZ2F0ZS5pdGVyYXRvcltcInJldHVyblwiXSkge1xuICAgICAgICAgIC8vIElmIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgYSByZXR1cm4gbWV0aG9kLCBnaXZlIGl0IGFcbiAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIC8vIElmIG1heWJlSW52b2tlRGVsZWdhdGUoY29udGV4dCkgY2hhbmdlZCBjb250ZXh0Lm1ldGhvZCBmcm9tXG4gICAgICAgICAgICAvLyBcInJldHVyblwiIHRvIFwidGhyb3dcIiwgbGV0IHRoYXQgb3ZlcnJpZGUgdGhlIFR5cGVFcnJvciBiZWxvdy5cbiAgICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICd0aHJvdycgbWV0aG9kXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuXG4gICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG5cbiAgICBpZiAoISBpbmZvKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0XCIpO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAvLyBBc3NpZ24gdGhlIHJlc3VsdCBvZiB0aGUgZmluaXNoZWQgZGVsZWdhdGUgdG8gdGhlIHRlbXBvcmFyeVxuICAgICAgLy8gdmFyaWFibGUgc3BlY2lmaWVkIGJ5IGRlbGVnYXRlLnJlc3VsdE5hbWUgKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlO1xuXG4gICAgICAvLyBSZXN1bWUgZXhlY3V0aW9uIGF0IHRoZSBkZXNpcmVkIGxvY2F0aW9uIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jO1xuXG4gICAgICAvLyBJZiBjb250ZXh0Lm1ldGhvZCB3YXMgXCJ0aHJvd1wiIGJ1dCB0aGUgZGVsZWdhdGUgaGFuZGxlZCB0aGVcbiAgICAgIC8vIGV4Y2VwdGlvbiwgbGV0IHRoZSBvdXRlciBnZW5lcmF0b3IgcHJvY2VlZCBub3JtYWxseS4gSWZcbiAgICAgIC8vIGNvbnRleHQubWV0aG9kIHdhcyBcIm5leHRcIiwgZm9yZ2V0IGNvbnRleHQuYXJnIHNpbmNlIGl0IGhhcyBiZWVuXG4gICAgICAvLyBcImNvbnN1bWVkXCIgYnkgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yLiBJZiBjb250ZXh0Lm1ldGhvZCB3YXNcbiAgICAgIC8vIFwicmV0dXJuXCIsIGFsbG93IHRoZSBvcmlnaW5hbCAucmV0dXJuIGNhbGwgdG8gY29udGludWUgaW4gdGhlXG4gICAgICAvLyBvdXRlciBnZW5lcmF0b3IuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmUteWllbGQgdGhlIHJlc3VsdCByZXR1cm5lZCBieSB0aGUgZGVsZWdhdGUgbWV0aG9kLlxuICAgICAgcmV0dXJuIGluZm87XG4gICAgfVxuXG4gICAgLy8gVGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGlzIGZpbmlzaGVkLCBzbyBmb3JnZXQgaXQgYW5kIGNvbnRpbnVlIHdpdGhcbiAgICAvLyB0aGUgb3V0ZXIgZ2VuZXJhdG9yLlxuICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICB9XG5cbiAgLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuXG4gIGRlZmluZShHcCwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yXCIpO1xuXG4gIC8vIEEgR2VuZXJhdG9yIHNob3VsZCBhbHdheXMgcmV0dXJuIGl0c2VsZiBhcyB0aGUgaXRlcmF0b3Igb2JqZWN0IHdoZW4gdGhlXG4gIC8vIEBAaXRlcmF0b3IgZnVuY3Rpb24gaXMgY2FsbGVkIG9uIGl0LiBTb21lIGJyb3dzZXJzJyBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlXG4gIC8vIGl0ZXJhdG9yIHByb3RvdHlwZSBjaGFpbiBpbmNvcnJlY3RseSBpbXBsZW1lbnQgdGhpcywgY2F1c2luZyB0aGUgR2VuZXJhdG9yXG4gIC8vIG9iamVjdCB0byBub3QgYmUgcmV0dXJuZWQgZnJvbSB0aGlzIGNhbGwuIFRoaXMgZW5zdXJlcyB0aGF0IGRvZXNuJ3QgaGFwcGVuLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2lzc3Vlcy8yNzQgZm9yIG1vcmUgZGV0YWlscy5cbiAgR3BbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgR3AudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfTtcblxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHsgdHJ5TG9jOiBsb2NzWzBdIH07XG5cbiAgICBpZiAoMSBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgfVxuXG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuXG4gICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIjtcbiAgICBkZWxldGUgcmVjb3JkLmFyZztcbiAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG5cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3sgdHJ5TG9jOiBcInJvb3RcIiB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuXG4gIGV4cG9ydHMua2V5cyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIGtleXMucmV2ZXJzZSgpO1xuXG4gICAgLy8gUmF0aGVyIHRoYW4gcmV0dXJuaW5nIGFuIG9iamVjdCB3aXRoIGEgbmV4dCBtZXRob2QsIHdlIGtlZXBcbiAgICAvLyB0aGluZ3Mgc2ltcGxlIGFuZCByZXR1cm4gdGhlIG5leHQgZnVuY3Rpb24gaXRzZWxmLlxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICAgIG5leHQudmFsdWUgPSBrZXk7XG4gICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVG8gYXZvaWQgY3JlYXRpbmcgYW4gYWRkaXRpb25hbCBvYmplY3QsIHdlIGp1c3QgaGFuZyB0aGUgLnZhbHVlXG4gICAgICAvLyBhbmQgLmRvbmUgcHJvcGVydGllcyBvZmYgdGhlIG5leHQgZnVuY3Rpb24gb2JqZWN0IGl0c2VsZi4gVGhpc1xuICAgICAgLy8gYWxzbyBlbnN1cmVzIHRoYXQgdGhlIG1pbmlmaWVyIHdpbGwgbm90IGFub255bWl6ZSB0aGUgZnVuY3Rpb24uXG4gICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlcmFibGUubmV4dCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuXG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuICAgIHJldHVybiB7IG5leHQ6IGRvbmVSZXN1bHQgfTtcbiAgfVxuICBleHBvcnRzLnZhbHVlcyA9IHZhbHVlcztcblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuXG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICB0aGlzLm5leHQgPSAwO1xuICAgICAgLy8gUmVzZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICB0aGlzLnNlbnQgPSB0aGlzLl9zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuXG4gICAgICB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KTtcblxuICAgICAgaWYgKCFza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcykge1xuICAgICAgICAgIC8vIE5vdCBzdXJlIGFib3V0IHRoZSBvcHRpbWFsIG9yZGVyIG9mIHRoZXNlIGNvbmRpdGlvbnM6XG4gICAgICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09PSBcInRcIiAmJlxuICAgICAgICAgICAgICBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJlxuICAgICAgICAgICAgICAhaXNOYU4oK25hbWUuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG5cbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG5cbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24oZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG5cbiAgICAgICAgaWYgKGNhdWdodCkge1xuICAgICAgICAgIC8vIElmIHRoZSBkaXNwYXRjaGVkIGV4Y2VwdGlvbiB3YXMgY2F1Z2h0IGJ5IGEgY2F0Y2ggYmxvY2ssXG4gICAgICAgICAgLy8gdGhlbiBsZXQgdGhhdCBjYXRjaCBibG9jayBoYW5kbGUgdGhlIGV4Y2VwdGlvbiBub3JtYWxseS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICEhIGNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWJydXB0OiBmdW5jdGlvbih0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJlxuICAgICAgICAgICAgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmluYWxseUVudHJ5ICYmXG4gICAgICAgICAgKHR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgICB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmXG4gICAgICAgICAgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiZcbiAgICAgICAgICBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBmaW5hbGx5IGVudHJ5IGlmIGNvbnRyb2wgaXMgbm90IGp1bXBpbmcgdG8gYVxuICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmVjb3JkLnR5cGUgPSB0eXBlO1xuICAgICAgcmVjb3JkLmFyZyA9IGFyZztcblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSkge1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYztcbiAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcblxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgIHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gdGhpcy5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgIHRoaXMubmV4dCA9IFwiZW5kXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiICYmIGFmdGVyTG9jKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGFmdGVyTG9jO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuXG4gICAgZmluaXNoOiBmdW5jdGlvbihmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKTtcbiAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBjb250ZXh0LmNhdGNoIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIHdpdGggYSBsb2NhdGlvblxuICAgICAgLy8gYXJndW1lbnQgdGhhdCBjb3JyZXNwb25kcyB0byBhIGtub3duIGNhdGNoIGJsb2NrLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG5cbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbihpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgLy8gRGVsaWJlcmF0ZWx5IGZvcmdldCB0aGUgbGFzdCBzZW50IHZhbHVlIHNvIHRoYXQgd2UgZG9uJ3RcbiAgICAgICAgLy8gYWNjaWRlbnRhbGx5IHBhc3MgaXQgb24gdG8gdGhlIGRlbGVnYXRlLlxuICAgICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9O1xuXG4gIC8vIFJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGVcbiAgLy8gb3Igbm90LCByZXR1cm4gdGhlIHJ1bnRpbWUgb2JqZWN0IHNvIHRoYXQgd2UgY2FuIGRlY2xhcmUgdGhlIHZhcmlhYmxlXG4gIC8vIHJlZ2VuZXJhdG9yUnVudGltZSBpbiB0aGUgb3V0ZXIgc2NvcGUsIHdoaWNoIGFsbG93cyB0aGlzIG1vZHVsZSB0byBiZVxuICAvLyBpbmplY3RlZCBlYXNpbHkgYnkgYGJpbi9yZWdlbmVyYXRvciAtLWluY2x1ZGUtcnVudGltZSBzY3JpcHQuanNgLlxuICByZXR1cm4gZXhwb3J0cztcblxufShcbiAgLy8gSWYgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlLCB1c2UgbW9kdWxlLmV4cG9ydHNcbiAgLy8gYXMgdGhlIHJlZ2VuZXJhdG9yUnVudGltZSBuYW1lc3BhY2UuIE90aGVyd2lzZSBjcmVhdGUgYSBuZXcgZW1wdHlcbiAgLy8gb2JqZWN0LiBFaXRoZXIgd2F5LCB0aGUgcmVzdWx0aW5nIG9iamVjdCB3aWxsIGJlIHVzZWQgdG8gaW5pdGlhbGl6ZVxuICAvLyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIHZhcmlhYmxlIGF0IHRoZSB0b3Agb2YgdGhpcyBmaWxlLlxuICB0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiID8gbW9kdWxlLmV4cG9ydHMgOiB7fVxuKSk7XG5cbnRyeSB7XG4gIHJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG59IGNhdGNoIChhY2NpZGVudGFsU3RyaWN0TW9kZSkge1xuICAvLyBUaGlzIG1vZHVsZSBzaG91bGQgbm90IGJlIHJ1bm5pbmcgaW4gc3RyaWN0IG1vZGUsIHNvIHRoZSBhYm92ZVxuICAvLyBhc3NpZ25tZW50IHNob3VsZCBhbHdheXMgd29yayB1bmxlc3Mgc29tZXRoaW5nIGlzIG1pc2NvbmZpZ3VyZWQuIEp1c3RcbiAgLy8gaW4gY2FzZSBydW50aW1lLmpzIGFjY2lkZW50YWxseSBydW5zIGluIHN0cmljdCBtb2RlLCB3ZSBjYW4gZXNjYXBlXG4gIC8vIHN0cmljdCBtb2RlIHVzaW5nIGEgZ2xvYmFsIEZ1bmN0aW9uIGNhbGwuIFRoaXMgY291bGQgY29uY2VpdmFibHkgZmFpbFxuICAvLyBpZiBhIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5IGZvcmJpZHMgdXNpbmcgRnVuY3Rpb24sIGJ1dCBpbiB0aGF0IGNhc2VcbiAgLy8gdGhlIHByb3BlciBzb2x1dGlvbiBpcyB0byBmaXggdGhlIGFjY2lkZW50YWwgc3RyaWN0IG1vZGUgcHJvYmxlbS4gSWZcbiAgLy8geW91J3ZlIG1pc2NvbmZpZ3VyZWQgeW91ciBidW5kbGVyIHRvIGZvcmNlIHN0cmljdCBtb2RlIGFuZCBhcHBsaWVkIGFcbiAgLy8gQ1NQIHRvIGZvcmJpZCBGdW5jdGlvbiwgYW5kIHlvdSdyZSBub3Qgd2lsbGluZyB0byBmaXggZWl0aGVyIG9mIHRob3NlXG4gIC8vIHByb2JsZW1zLCBwbGVhc2UgZGV0YWlsIHlvdXIgdW5pcXVlIHByZWRpY2FtZW50IGluIGEgR2l0SHViIGlzc3VlLlxuICBGdW5jdGlvbihcInJcIiwgXCJyZWdlbmVyYXRvclJ1bnRpbWUgPSByXCIpKHJ1bnRpbWUpO1xufVxuIiwiLyogZXNsaW50IG5vLWNvbnNvbGU6IG9mZiAqL1xuXG5pbXBvcnQgJ3JlZ2VuZXJhdG9yLXJ1bnRpbWUnXG5pbXBvcnQgQ2xpZW50IGZyb20gJy4uLy4uL3NyYy9pbmRleC5qcydcblxuOyhmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHBvcnQgPSAzMDAwXG4gIGNvbnN0IExTS0VZID0gJ215LWFwcCdcblxuICBjb25zdCBpZCA9IHtcbiAgICBzZXR0aW5nczogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NldHRpbmdzJyksXG4gICAgdG9rZW46IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2tlbicpLFxuICAgIG5hdjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hdicpXG4gIH1cblxuICBjb25zdCBvcHRpb25zID0ge1xuICAgIGxvZzogY29uc29sZSxcbiAgICB1cmw6IGBodHRwOi8vbG9jYWxob3N0OiR7cG9ydH0vb2lkY2AsXG4gICAgcmVhbG06ICcnLFxuICAgIGNsaWVudElkOiAnbXktYXBwJyxcbiAgICBmb3JjZUxvZ2luOiBmYWxzZSxcbiAgICBmb3JjZUxvZ291dDogdHJ1ZSxcbiAgICBzY29wZTogJ29wZW5pZCcsXG4gICAgdXNlTm9uY2U6IHRydWUsXG4gICAgdXNlTG9jYWxTdG9yYWdlOiB0cnVlLFxuICAgIG1pblZhbGlkaXR5OiAxNSxcbiAgICBleHBpcnlJbnRlcnZhbDogNSxcbiAgICByZXNwb25zZU1vZGU6ICdmcmFnbWVudCcsXG4gICAgcmVzcG9uc2VUeXBlOiAnY29kZScsXG4gICAgZmxvdzogJ3N0YW5kYXJkJyxcbiAgICBwa2NlTWV0aG9kOiAnJyxcbiAgICBwcm9tcHQ6ICdub25lJyxcbiAgICB1c2VTdGF0dXNJZnJhbWU6IHRydWUsXG4gICAgc3RhdHVzSWZyYW1lSW50ZXJ2YWw6IDUsXG4gICAgc2lsZW50TG9naW5SZWRpcmVjdFVyaTogJy9zaWxlbnQtbG9naW4tY2hlY2suaHRtbCcsXG4gICAgcmVkaXJlY3RVcmk6ICcnLFxuICAgIHBvc3RMb2dvdXRSZWRpcmVjdFVyaTogJycsXG4gICAgYXV0aG9yaXphdGlvblBhcmFtczoge31cbiAgfVxuXG4gIC8vIC0tLSByZW5kZXJpbmcgLS0tXG5cbiAgY29uc3QgbG9hZCA9ICgpID0+XG4gICAgSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShMU0tFWSkgfHwgJ3t9JylcbiAgY29uc3Qgc3RvcmUgPSAoeyBsb2csIC4uLm9wdHMgfSkgPT5cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShMU0tFWSwgSlNPTi5zdHJpbmdpZnkob3B0cykpXG5cbiAgZnVuY3Rpb24gcmVuZGVyU2V0dGluZ3MgKF9vcHRpb25zKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHsgLi4uX29wdGlvbnMgfVxuICAgIGNvbnN0IGZvcm1NZXRhID0ge1xuICAgICAgdXJsOiB7IHR5cGU6ICd0ZXh0JyB9LFxuICAgICAgcmVhbG06IHsgdHlwZTogJ3RleHQnIH0sXG4gICAgICBjbGllbnRJZDogeyB0eXBlOiAndGV4dCcgfSxcbiAgICAgIC8vIGZvcmNlTG9naW46IHsgdHlwZTogJ2NoZWNrYm94JyB9LFxuICAgICAgZm9yY2VMb2dvdXQ6IHsgdHlwZTogJ2NoZWNrYm94JyB9LFxuICAgICAgc2NvcGU6IHsgdHlwZTogJ3RleHQnIH0sXG4gICAgICB1c2VOb25jZTogeyB0eXBlOiAnY2hlY2tib3gnIH0sXG4gICAgICB1c2VMb2NhbFN0b3JhZ2U6IHsgdHlwZTogJ2NoZWNrYm94JyB9LFxuICAgICAgbWluVmFsaWRpdHk6IHsgdHlwZTogJ3RleHQnIH0sXG4gICAgICBleHBpcnlJbnRlcnZhbDogeyB0eXBlOiAndGV4dCcgfSxcbiAgICAgIHJlc3BvbnNlTW9kZTogeyBvcHRpb25zOiBbJ2ZyYWdtZW50JywgJ3F1ZXJ5J10gfSxcbiAgICAgIHJlc3BvbnNlVHlwZToge1xuICAgICAgICBvcHRpb25zOiBbXG4gICAgICAgICAgJ2NvZGUnLFxuICAgICAgICAgICdub25lJyxcbiAgICAgICAgICAnaWRfdG9rZW4nLFxuICAgICAgICAgICd0b2tlbicsXG4gICAgICAgICAgJ2lkX3Rva2VuIHRva2VuJyxcbiAgICAgICAgICAnY29kZSBpZF90b2tlbicsXG4gICAgICAgICAgJ2NvZGUgdG9rZW4nLFxuICAgICAgICAgICdjb2RlIGlkX3Rva2VuIHRva2VuJ1xuICAgICAgICBdXG4gICAgICB9LFxuICAgICAgZmxvdzogeyBvcHRpb25zOiBbJ3N0YW5kYXJkJywgJ2h5YnJpZCcsICdpbXBsaWNpdCddIH0sXG4gICAgICBwcm9tcHQ6IHsgb3B0aW9uczogWydub25lJywgJ2xvZ2luJ10gfSxcbiAgICAgIHBrY2VNZXRob2Q6IHsgb3B0aW9uczogWycnLCAnUzI1NiddIH0sXG4gICAgICB1c2VTdGF0dXNJZnJhbWU6IHsgdHlwZTogJ2NoZWNrYm94JyB9LFxuICAgICAgc3RhdHVzSWZyYW1lSW50ZXJ2YWw6IHsgdHlwZTogJ3RleHQnIH0sXG4gICAgICBzaWxlbnRMb2dpblJlZGlyZWN0VXJpOiB7IHR5cGU6ICd0ZXh0JyB9LFxuICAgICAgcmVkaXJlY3RVcmk6IHsgdHlwZTogJ3RleHQnIH0sXG4gICAgICBwb3N0TG9nb3V0UmVkaXJlY3RVcmk6IHsgdHlwZTogJ3RleHQnIH0sXG4gICAgICBhdXRob3JpemF0aW9uUGFyYW1zOiB7IHR5cGU6ICd0ZXh0JyB9XG4gICAgfVxuICAgIGNvbnN0IGlucHV0ID0gKHsgbmFtZSwgdmFsdWUgfSkgPT4gYFxuICAgICAgPGRpdj5cbiAgICAgICAgPGxhYmVsIGZvcj1cIiR7bmFtZX1cIj4ke25hbWV9OjwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCIke25hbWV9XCIgdmFsdWU9XCIke3ZhbHVlfVwiPlxuICAgICAgPC9kaXY+XG4gICAgYFxuICAgIGNvbnN0IGNoZWNrYm94ID0gKHsgbmFtZSwgdmFsdWUgfSkgPT4gYFxuICAgICAgPGRpdj5cbiAgICAgICAgPGxhYmVsIGZvcj1cIiR7bmFtZX1cIj4ke25hbWV9OjwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwiJHtuYW1lfVwiICR7dmFsdWUgPyAnY2hlY2tlZCcgOiAnJ30+XG4gICAgICA8L2Rpdj5cbiAgICBgXG4gICAgY29uc3Qgc2VsZWN0ID0gKHsgbmFtZSwgdmFsdWUsIG9wdGlvbnMgfSkgPT4gYFxuICAgICAgPGRpdj5cbiAgICAgICAgPGxhYmVsIGZvcj1cIiR7bmFtZX1cIj4ke25hbWV9OjwvbGFiZWw+XG4gICAgICAgIDxzZWxlY3QgbmFtZT1cIiR7bmFtZX1cIj5cbiAgICAgICAgICAke29wdGlvbnMubWFwKG9wdGlvbiA9PiBgPG9wdGlvbiB2YWx1ZT1cIiR7b3B0aW9ufVwiICR7dmFsdWUgPT09IG9wdGlvbiA/ICdzZWxlY3RlZCcgOiAnJ30+JHtvcHRpb259PC9vcHRpb24+YCl9XG4gICAgICAgIDwvc2VsZWN0PlxuICAgICAgPC9kaXY+XG4gICAgYFxuXG4gICAgaWYgKG9wdGlvbnMuYXV0aG9yaXphdGlvblBhcmFtcykge1xuICAgICAgb3B0aW9ucy5hdXRob3JpemF0aW9uUGFyYW1zID0gSlNPTi5zdHJpbmdpZnkob3B0aW9ucy5hdXRob3JpemF0aW9uUGFyYW1zKVxuICAgIH1cblxuICAgIGNvbnN0IGh0bWwgPSBgXG4gICAgPGZvcm0gb25zdWJtaXQ9XCJyZXR1cm4gZmFsc2VcIj5cbiAgICAgICR7T2JqZWN0LmVudHJpZXMoZm9ybU1ldGEpLm1hcCgoW25hbWUsIG1ldGFdKSA9PiB7XG4gICAgICAgIGxldCB2YWx1ZSA9IG9wdGlvbnNbbmFtZV1cbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKVxuICAgICAgICB9XG4gICAgICAgIGlmIChtZXRhLm9wdGlvbnMpIHtcbiAgICAgICAgICByZXR1cm4gc2VsZWN0KHsgbmFtZSwgdmFsdWUsIG9wdGlvbnM6IG1ldGEub3B0aW9ucyB9KVxuICAgICAgICB9IGVsc2UgaWYgKG1ldGEudHlwZSA9PT0gJ2NoZWNrYm94Jykge1xuICAgICAgICAgIHJldHVybiBjaGVja2JveCh7IG5hbWUsIHZhbHVlIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGlucHV0KHsgbmFtZSwgdmFsdWUgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgICAgLmpvaW4oJ1xcbicpXG4gICAgICB9XG4gICAgICA8YnV0dG9uIG9uY2xpY2s9XCJ3aW5kb3cuX19zZXR0aW5ncygpXCI+c3VibWl0PC9idXR0b24+XG4gICAgICA8YnV0dG9uIG9uY2xpY2s9XCJ3aW5kb3cuX19zZXR0aW5nc1Jlc2V0KClcIj5yZXNldDwvYnV0dG9uPlxuICAgIDwvZm9ybT5gXG4gICAgaWQuc2V0dGluZ3MuaW5uZXJIVE1MID0gaHRtbFxuICB9XG5cbiAgY29uc3QgZ2V0U2V0dGluZ3MgPSAoKSA9PiB7XG4gICAgY29uc3QgZm9ybSA9IG5ldyBGb3JtRGF0YShpZC5zZXR0aW5ncy5xdWVyeVNlbGVjdG9yKCdmb3JtJykpXG4gICAgY29uc3Qgb3B0cyA9IEFycmF5LmZyb20oZm9ybSkucmVkdWNlKChvLCBba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgIGNvbnN0IHR5cGUgPSB0eXBlb2Ygb3B0aW9uc1trZXldXG4gICAgICBpZiAodHlwZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIG9ba2V5XSA9ICh2YWx1ZSA9PT0gJ29uJyB8fCB2YWx1ZSA9PT0gdHJ1ZSlcbiAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnYXV0aG9yaXphdGlvblBhcmFtcycpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBvW2tleV0gPSBKU09OLnBhcnNlKHZhbHVlKVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcih2YWx1ZSlcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGUpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9ba2V5XSA9IHZhbHVlID09PSAnJyA/IHVuZGVmaW5lZCA6IHZhbHVlXG4gICAgICB9XG4gICAgICByZXR1cm4gb1xuICAgIH0sIHsgLi4ub3B0aW9ucyB9KVxuICAgIHN0b3JlKG9wdHMpXG4gICAgLy8gY29uc29sZS5sb2cobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ215LWFwcCcpKVxuICAgIG9wdHMubG9nID0gY29uc29sZVxuICAgIHJldHVybiBvcHRzXG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJOYXYgKCkge1xuICAgIGlkLm5hdi5pbm5lckhUTUwgPSBgXG4gICAgICA8YSBocmVmPVwiL1wiPmhvbWU8L2E+XG4gICAgICA8YSBocmVmPVwiI1wiIG9uY2xpY2s9XCJfX2xvZ2luKClcIj5sb2dpbjwvYT5cbiAgICAgIDxhIGhyZWY9XCIjXCIgb25jbGljaz1cIl9fc2lsZW50TG9naW4oKVwiPnNpbGVudGxvZ2luPC9hPlxuICAgICAgPGEgaHJlZj1cIiNcIiBvbmNsaWNrPVwiX19sb2dvdXQoKVwiPmxvZ291dDwvYT5cbiAgICAgIDxhIGhyZWY9XCIjXCIgb25jbGljaz1cIl9fcmVnaXN0ZXIoKVwiPnJlZ2lzdGVyPC9hPlxuICAgICAgPGEgaHJlZj1cIiNcIiBvbmNsaWNrPVwiX19hY2NvdW50KClcIj5hY2NvdW50PC9hPlxuICAgICAgPGEgaHJlZj1cIiNcIiBvbmNsaWNrPVwiX191c2VyaW5mbygpXCI+dXNlcmluZm88L2E+XG4gICAgICA8YSBocmVmPVwiI1wiIG9uY2xpY2s9XCJfX3dlbGxrbm93bkNvbmZpZygpXCI+d2VsbC1rbm93bjwvYT5cbiAgICBgXG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJDb250ZW50IChjb250ZW50KSB7XG4gICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnb2JqZWN0Jykge1xuICAgICAgY29udGVudCA9IEpTT04uc3RyaW5naWZ5KGNvbnRlbnQsIG51bGwsIDIpXG4gICAgfVxuICAgIGlkLnRva2VuLnRleHRDb250ZW50ID0gY29udGVudFxuICB9XG5cbiAgbGV0IGNsaWVudFxuICBmdW5jdGlvbiBzZXR1cENsaWVudCAoKSB7XG4gICAgY2xpZW50ID0gbmV3IENsaWVudChnZXRTZXR0aW5ncygpKVxuXG4gICAgY2xpZW50Lm9uKCd0b2tlbicsIHRva2VucyA9PiB7XG4gICAgICBjb25zb2xlLmxvZyh0b2tlbnMpXG4gICAgICByZW5kZXJDb250ZW50KHRva2VucylcbiAgICB9KVxuICAgIGNsaWVudC5vbignbG9nb3V0JywgKCkgPT4ge1xuICAgICAgcmVuZGVyQ29udGVudCgnbG9nZ2VkIG91dCcpXG4gICAgfSlcbiAgICBjbGllbnQub24oJ2Vycm9yJywgZXJyID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgIGNvbnN0IHsgbWVzc2FnZSwgZGVzY3JpcHRpb24sIHN0YWNrIH0gPSBlcnJcbiAgICAgIHJlbmRlckNvbnRlbnQoeyBtZXNzYWdlLCBkZXNjcmlwdGlvbiwgc3RhY2sgfSlcbiAgICB9KVxuXG4gICAgcmV0dXJuIGNsaWVudC5pbml0KClcbiAgICAgIC5jYXRjaCgoKSA9PiB7fSlcbiAgICAgIC50aGVuKCgpID0+IGNsaWVudClcbiAgfVxuXG4gIC8vIC0tLVxuXG4gIHJlbmRlck5hdigpXG4gIC8vIGNvbnNvbGUubG9nKGxvYWQoKSlcbiAgcmVuZGVyU2V0dGluZ3MoeyAuLi5vcHRpb25zLCAuLi5sb2FkKCkgfSlcbiAgc2V0dXBDbGllbnQoKS5jYXRjaCgoKSA9PiB7fSlcblxuICB3aW5kb3cuX19zZXR0aW5ncyA9ICgpID0+IHtcbiAgICBzZXR1cENsaWVudCgpLmNhdGNoKCgpID0+IHt9KVxuICB9XG4gIHdpbmRvdy5fX3NldHRpbmdzUmVzZXQgPSAoKSA9PiB7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oTFNLRVkpXG4gICAgcmVuZGVyU2V0dGluZ3MoeyAuLi5vcHRpb25zLCAuLi5sb2FkKCkgfSlcbiAgICBzZXR1cENsaWVudCgpLmNhdGNoKCgpID0+IHt9KVxuICB9XG5cbiAgd2luZG93Ll9fbG9naW4gPSAoKSA9PlxuICAgIGNsaWVudC5sb2dpbigpLmNhdGNoKGNvbnNvbGUuZXJyb3IpXG4gIHdpbmRvdy5fX3NpbGVudExvZ2luID0gKCkgPT5cbiAgICBjbGllbnQuc2lsZW50TG9naW4oKS5jYXRjaChjb25zb2xlLmVycm9yKVxuICB3aW5kb3cuX19sb2dvdXQgPSAoKSA9PlxuICAgIGNsaWVudC5sb2dvdXQoKS5jYXRjaChjb25zb2xlLmVycm9yKVxuICB3aW5kb3cuX19yZWdpc3RlciA9ICgpID0+XG4gICAgY2xpZW50LnJlZ2lzdGVyKCkuY2F0Y2goY29uc29sZS5lcnJvcilcbiAgd2luZG93Ll9fYWNjb3VudCA9ICgpID0+XG4gICAgY2xpZW50LmFjY291bnQoKS5jYXRjaChjb25zb2xlLmVycm9yKVxuICB3aW5kb3cuX191c2VyaW5mbyA9ICgpID0+XG4gICAgY2xpZW50LnVzZXJpbmZvKCkudGhlbihpbmZvID0+IHJlbmRlckNvbnRlbnQoaW5mbykpLmNhdGNoKGNvbnNvbGUuZXJyb3IpXG4gIHdpbmRvdy5fX3dlbGxrbm93bkNvbmZpZyA9ICgpID0+IHtcbiAgICBjb25zdCBvcHRzID0gZ2V0U2V0dGluZ3MoKVxuICAgIGNvbnN0IHVybCA9IGAke29wdHMudXJsfSR7b3B0cy5yZWFsbSA/IGAvcmVhbG1zLyR7b3B0cy5yZWFsbX1gIDogJyd9Ly53ZWxsLWtub3duL29wZW5pZC1jb25maWd1cmF0aW9uYFxuICAgIHdpbmRvdy5vcGVuKHVybCwgJ19ibGFuYycpXG4gIH1cbn0pKClcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZVxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vdGVzdC9odG1sL2FwcC5qc1wiKTtcbi8vIFRoaXMgZW50cnkgbW9kdWxlIHVzZWQgJ2V4cG9ydHMnIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbiJdLCJzb3VyY2VSb290IjoiIn0=