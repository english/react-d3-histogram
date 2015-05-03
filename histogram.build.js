"use strict";

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

function getYScale(data, height) {
  return d3.scale.linear().domain([0, d3.max(data, function (d) {
    return d.y;
  })]).range([height, 0]);
}

function getXScale(data, width) {
  return d3.scale.linear().domain([0, d3.max(data)]).range([0, width]);
}

var Histogram = (function (_React$Component) {
  function Histogram() {
    _classCallCheck(this, Histogram);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(Histogram, _React$Component);

  _createClass(Histogram, [{
    key: "render",
    value: function render() {
      var _props = this.props;
      var top = _props.top;
      var right = _props.right;
      var bottom = _props.bottom;
      var left = _props.left;
      var data = _props.data;
      var width = _props.width;
      var height = _props.height;

      var xScale = getXScale(data, width);
      var histogramDataFn = d3.layout.histogram().bins(xScale.ticks(20));
      var histogramData = histogramDataFn(data);
      var yScale = getYScale(histogramData, height);

      return React.createElement(
        "div",
        { className: "react-d3-histogram" },
        React.createElement(
          "svg",
          { width: width + left + right, height: height + top + bottom },
          React.createElement(
            "g",
            { transform: "translate(" + left + "," + top + ")" },
            React.createElement(XAxis, { height: height, scale: xScale }),
            histogramData.map(function (d, i) {
              return React.createElement(Bar, { data: d, xScale: xScale, yScale: yScale, height: height, key: i });
            })
          )
        )
      );
    }
  }], [{
    key: "propTypes",
    value: {
      top: React.PropTypes.number,
      right: React.PropTypes.number,
      bottom: React.PropTypes.number,
      left: React.PropTypes.number,
      width: React.PropTypes.number.isRequired,
      height: React.PropTypes.number.isRequired,
      data: React.PropTypes.arrayOf(React.PropTypes.number).isRequired
    },
    enumerable: true
  }, {
    key: "defaultProps",
    value: {
      top: 20,
      right: 10,
      bottom: 30,
      left: 30
    },
    enumerable: true
  }]);

  return Histogram;
})(React.Component);

var Path = (function (_React$Component2) {
  function Path() {
    _classCallCheck(this, Path);

    if (_React$Component2 != null) {
      _React$Component2.apply(this, arguments);
    }
  }

  _inherits(Path, _React$Component2);

  _createClass(Path, [{
    key: "render",
    value: function render() {
      var _props$scale$range = this.props.scale.range();

      var _props$scale$range2 = _slicedToArray(_props$scale$range, 2);

      var start = _props$scale$range2[0];
      var end = _props$scale$range2[1];

      var d = "M0" + start + ",6V0H" + end + "V6";

      return React.createElement("path", { className: "react-d3-histogram__domain", d: d });
    }
  }], [{
    key: "propTypes",
    value: {
      scale: React.PropTypes.func.isRequired
    },
    enumerable: true
  }]);

  return Path;
})(React.Component);

var Tick = (function (_React$Component3) {
  function Tick() {
    _classCallCheck(this, Tick);

    if (_React$Component3 != null) {
      _React$Component3.apply(this, arguments);
    }
  }

  _inherits(Tick, _React$Component3);

  _createClass(Tick, [{
    key: "render",
    value: function render() {
      var _props2 = this.props;
      var value = _props2.value;
      var scale = _props2.scale;

      var textStyle = { textAnchor: "middle" };

      return React.createElement(
        "g",
        { className: "react-d3-histogram__tick", transform: "translate(" + scale(value) + ",0)" },
        React.createElement("line", { x2: "0", y2: "6" }),
        React.createElement(
          "text",
          { dy: ".71em", y: "9", x: "0", style: textStyle },
          value
        )
      );
    }
  }], [{
    key: "propTypes",
    value: {
      value: React.PropTypes.number.isRequired,
      scale: React.PropTypes.func.isRequired
    },
    enumerable: true
  }]);

  return Tick;
})(React.Component);

var XAxis = (function (_React$Component4) {
  function XAxis() {
    _classCallCheck(this, XAxis);

    if (_React$Component4 != null) {
      _React$Component4.apply(this, arguments);
    }
  }

  _inherits(XAxis, _React$Component4);

  _createClass(XAxis, [{
    key: "render",
    value: function render() {
      var _props3 = this.props;
      var height = _props3.height;
      var scale = _props3.scale;

      var ticks = scale.ticks.apply(scale).map(function (tick, i) {
        return React.createElement(Tick, { value: tick, scale: scale, key: i });
      });

      return React.createElement(
        "g",
        { className: "react-d3-histogram__x-axis", transform: "translate(0," + height + ")" },
        React.createElement(Path, { scale: scale }),
        React.createElement(
          "g",
          null,
          ticks
        )
      );
    }
  }], [{
    key: "propTypes",
    value: {
      height: React.PropTypes.number.isRequired,
      scale: React.PropTypes.func.isRequired
    },
    enumerable: true
  }]);

  return XAxis;
})(React.Component);

var Bar = (function (_React$Component5) {
  function Bar() {
    _classCallCheck(this, Bar);

    if (_React$Component5 != null) {
      _React$Component5.apply(this, arguments);
    }
  }

  _inherits(Bar, _React$Component5);

  _createClass(Bar, [{
    key: "render",
    value: function render() {
      var _props4 = this.props;
      var data = _props4.data;
      var xScale = _props4.xScale;
      var yScale = _props4.yScale;
      var height = _props4.height;

      var scaledX = xScale(data.x);
      var scaledY = yScale(data.y);
      var scaledDx = xScale(data.dx);

      return React.createElement(
        "g",
        { className: "react-d3-histogram__bar", transform: "translate(" + scaledX + "," + scaledY + ")" },
        React.createElement("rect", { width: scaledDx - 1, height: height - scaledY }),
        React.createElement(
          "text",
          { dy: "0.75em", y: "6", x: scaledDx / 2, textAnchor: "middle" },
          data.y
        )
      );
    }
  }], [{
    key: "propTypes",
    value: {
      data: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
      xScale: React.PropTypes.func.isRequired,
      yScale: React.PropTypes.func.isRequired,
      height: React.PropTypes.number.isRequired
    },
    enumerable: true
  }]);

  return Bar;
})(React.Component);
