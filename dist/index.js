(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["react-simple-zoom"] = factory();
	else
		root["react-simple-zoom"] = factory();
})(this, function() {
return webpackJsonpreact_simple_zoom([1],{

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(25);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(45)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!./index.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!./index.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(20);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(19);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = __webpack_require__(21);

var style = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SimpleZoom = function (_Component) {
  _inherits(SimpleZoom, _Component);

  function SimpleZoom(props) {
    _classCallCheck(this, SimpleZoom);

    var _this = _possibleConstructorReturn(this, (SimpleZoom.__proto__ || Object.getPrototypeOf(SimpleZoom)).call(this, props));

    _this.state = {
      timerCount: 0
    };
    _this.timerInstance = null;
    return _this;
  }

  _createClass(SimpleZoom, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var img = new Image();
      img.src = this.props.fullUrl;
    }
  }, {
    key: 'startHoverTimer',
    value: function startHoverTimer() {
      var _this2 = this;

      var updateInt = 10;
      this.timerInstance = setInterval(function () {
        _this2.setState(function (prevState) {
          return {
            timerCount: prevState.timerCount + updateInt
          };
        });
      }, updateInt);
    }
  }, {
    key: 'endHoverTimer',
    value: function endHoverTimer() {
      var timeout = this.props.onExitTimeout || 0;
      clearInterval(this.timerInstance);
      if (this.props.onExitCallback && this.state.timerCount >= timeout) this.props.onExitCallback();
      this.setState({ timerCount: 0 });
    }
  }, {
    key: 'zoomPositionHandler',
    value: function zoomPositionHandler(e) {
      var container = this.imgThumb;
      var target = this.imgZoomed;
      var containerBox = container.getBoundingClientRect();
      var transform = {
        x: (e.clientX - containerBox.left) / containerBox.width * 100,
        y: (e.clientY - containerBox.top) / containerBox.height * 100
      };

      target.style.height = containerBox.height;
      target.style.transformOrigin = transform.x + '% ' + transform.y + '%';
    }
  }, {
    key: 'componentMouseEnter',
    value: function componentMouseEnter(e) {
      e.preventDefault();
      this.startHoverTimer();
      if (this.props.onEnterCallback) this.props.onEnterCallback();
    }
  }, {
    key: 'componentMouseLeave',
    value: function componentMouseLeave(e) {
      e.preventDefault();
      this.endHoverTimer();
    }
  }, {
    key: 'componentMouseMove',
    value: function componentMouseMove(e) {
      e.preventDefault();
      this.zoomPositionHandler(e);
    }
  }, {
    key: 'renderThumb',
    value: function renderThumb() {
      var _this3 = this;

      return _react2.default.createElement('img', {
        'data-ref': 'imgThumb',
        ref: function ref(r) {
          _this3.imgThumb = r;
        },
        style: {},
        src: this.props.thumbUrl
      });
    }
  }, {
    key: 'renderFull',
    value: function renderFull() {
      var _this4 = this;

      return _react2.default.createElement('div', {
        className: style.simpleZoom__zoomed,
        'data-ref': 'imgZoomed',
        ref: function ref(r) {
          _this4.imgZoomed = r;
        },
        style: {
          backgroundImage: 'url(' + this.props.fullUrl + ')',
          transform: 'scale(' + this.props.zoomScale + ')'
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      if (!this.props.thumbUrl) return null;
      return _react2.default.createElement(
        'div',
        {
          ref: function ref(r) {
            _this5.imgContainer = r;
          },
          'data-ref': 'imgContainer',
          className: style.simpleZoom,
          onMouseEnter: function onMouseEnter(e) {
            return _this5.componentMouseEnter(e);
          },
          onMouseLeave: function onMouseLeave(e) {
            return _this5.componentMouseLeave(e);
          },
          onMouseMove: function onMouseMove(e) {
            return _this5.componentMouseMove(e);
          }
        },
        this.renderThumb(),
        this.renderFull()
      );
    }
  }]);

  return SimpleZoom;
}(_react.Component);

SimpleZoom.propTypes = {
  thumbUrl: _propTypes2.default.string.isRequired,
  fullUrl: _propTypes2.default.string.isRequired,
  zoomScale: _propTypes2.default.number,
  onEnterCallback: _propTypes2.default.func,
  onExitCallback: _propTypes2.default.func,
  onExitTimeout: _propTypes2.default.number
};
SimpleZoom.defaultProps = {
  zoomScale: 2.4
};
exports.default = SimpleZoom;

/***/ }),

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(26)(undefined);
// imports


// module
exports.push([module.i, ".index__simpleZoom___pAG-d {\n  position: relative;\n  overflow: hidden;\n  cursor: grab;\n}\n\n.index__simpleZoom___pAG-d img {\n  float: left;\n  width: 100%;\n  height: auto;\n}\n\n.index__simpleZoom__zoomed___1-5LC {\n  display: none;\n}\n\n.index__simpleZoom___pAG-d:hover img {\n  visibility: hidden;\n}\n\n.index__simpleZoom___pAG-d:hover .index__simpleZoom__zoomed___1-5LC {\n  display: block;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: cover;\n}\n\n@media (hover: none) {\n  .index__simpleZoom___pAG-d:hover .index__simpleZoom__zoomed___1-5LC {\n    display: none;\n  }\n\n  .index__simpleZoom___pAG-d:hover img {\n    visibility: visible;\n  }\n}\n", ""]);

// exports
exports.locals = {
	"simpleZoom": "index__simpleZoom___pAG-d",
	"simpleZoom__zoomed": "index__simpleZoom__zoomed___1-5LC"
};

/***/ })

},[22]);
});