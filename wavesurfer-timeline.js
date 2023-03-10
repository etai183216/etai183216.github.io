/*!
 * wavesurfer.js timeline plugin 6.3.0 (2022-10-03)
 * https://wavesurfer-js.org
 * @license BSD-3-Clause
 */
!(function (e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define("WaveSurfer", [], t)
    : "object" == typeof exports
    ? (exports.WaveSurfer = t())
    : ((e.WaveSurfer = e.WaveSurfer || {}), (e.WaveSurfer.timeline = t()));
})(self, () =>
  (() => {
    "use strict";
    var e = {
        171: (e, t) => {
          function a(e, t) {
            for (var a = 0; a < t.length; a++) {
              var r = t[a];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                "value" in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          function r(e, t, a) {
            return (
              t in e
                ? Object.defineProperty(e, t, {
                    value: a,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (e[t] = a),
              e
            );
          }
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.default = void 0);
          var i = (function () {
            function e(t, a) {
              var i = this;
              if (
                ((function (e, t) {
                  if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function");
                })(this, e),
                r(this, "_onScroll", function () {
                  i.wrapper &&
                    i.drawer.wrapper &&
                    (i.wrapper.scrollLeft = i.drawer.wrapper.scrollLeft);
                }),
                r(this, "_onRedraw", function () {
                  return i.render();
                }),
                r(this, "_onReady", function () {
                  var e = i.wavesurfer;
                  (i.drawer = e.drawer),
                    (i.pixelRatio = e.drawer.params.pixelRatio),
                    (i.maxCanvasWidth =
                      e.drawer.maxCanvasWidth || e.drawer.width),
                    (i.maxCanvasElementWidth =
                      e.drawer.maxCanvasElementWidth ||
                      Math.round(i.maxCanvasWidth / i.pixelRatio)),
                    e.drawer.wrapper.addEventListener("scroll", i._onScroll),
                    e.on("redraw", i._onRedraw),
                    e.on("zoom", i._onZoom),
                    i.render();
                }),
                r(this, "_onWrapperClick", function (e) {
                  e.preventDefault();
                  var t = "offsetX" in e ? e.offsetX : e.layerX;
                  i.fireEvent("click", t / i.wrapper.scrollWidth || 0);
                }),
                (this.container =
                  "string" == typeof t.container
                    ? document.querySelector(t.container)
                    : t.container),
                !this.container)
              )
                throw new Error("No container for wavesurfer timeline");
              (this.wavesurfer = a),
                (this.util = a.util),
                (this.params = Object.assign(
                  {},
                  {
                    height: 20,
                    notchPercentHeight: 90,
                    labelPadding: 5,
                    unlabeledNotchColor: "#c0c0c0",
                    primaryColor: "#000",
                    secondaryColor: "#c0c0c0",
                    primaryFontColor: "#000",
                    secondaryFontColor: "#000",
                    fontFamily: "Arial",
                    fontSize: 10,
                    duration: null,
                    zoomDebounce: !1,
                    formatTimeCallback: this.defaultFormatTimeCallback,
                    timeInterval: this.defaultTimeInterval,
                    primaryLabelInterval: this.defaultPrimaryLabelInterval,
                    secondaryLabelInterval: this.defaultSecondaryLabelInterval,
                    offset: 0,
                  },
                  t
                )),
                (this.canvases = []),
                (this.wrapper = null),
                (this.drawer = null),
                (this.pixelRatio = null),
                (this.maxCanvasWidth = null),
                (this.maxCanvasElementWidth = null),
                (this._onZoom = this.params.zoomDebounce
                  ? this.wavesurfer.util.debounce(function () {
                      return i.render();
                    }, this.params.zoomDebounce)
                  : function () {
                      return i.render();
                    });
            }
            var t, i, n;
            return (
              (t = e),
              (n = [
                {
                  key: "create",
                  value: function (t) {
                    return {
                      name: "timeline",
                      deferInit: !(!t || !t.deferInit) && t.deferInit,
                      params: t,
                      instance: e,
                    };
                  },
                },
              ]),
              (i = [
                {
                  key: "init",
                  value: function () {
                    this.wavesurfer.isReady
                      ? this._onReady()
                      : this.wavesurfer.once("ready", this._onReady);
                  },
                },
                {
                  key: "destroy",
                  value: function () {
                    this.unAll(),
                      this.wavesurfer.un("redraw", this._onRedraw),
                      this.wavesurfer.un("zoom", this._onZoom),
                      this.wavesurfer.un("ready", this._onReady),
                      this.wavesurfer.drawer.wrapper.removeEventListener(
                        "scroll",
                        this._onScroll
                      ),
                      this.wrapper &&
                        this.wrapper.parentNode &&
                        (this.wrapper.removeEventListener(
                          "click",
                          this._onWrapperClick
                        ),
                        this.wrapper.parentNode.removeChild(this.wrapper),
                        (this.wrapper = null));
                  },
                },
                {
                  key: "createWrapper",
                  value: function () {
                    var e = this.wavesurfer.params;
                    (this.container.innerHTML = ""),
                      (this.wrapper = this.container.appendChild(
                        document.createElement("timeline")
                      )),
                      this.util.style(this.wrapper, {
                        display: "block",
                        position: "relative",
                        userSelect: "none",
                        webkitUserSelect: "none",
                        height: "".concat(this.params.height, "px"),
                      }),
                      (e.fillParent || e.scrollParent) &&
                        this.util.style(this.wrapper, {
                          width: "100%",
                          overflowX: "hidden",
                          overflowY: "hidden",
                        }),
                      this.wrapper.addEventListener(
                        "click",
                        this._onWrapperClick
                      );
                  },
                },
                {
                  key: "render",
                  value: function () {
                    this.wrapper || this.createWrapper(),
                      this.updateCanvases(),
                      this.updateCanvasesPositioning(),
                      this.renderCanvases();
                  },
                },
                {
                  key: "addCanvas",
                  value: function () {
                    var e = this.wrapper.appendChild(
                      document.createElement("canvas")
                    );
                    this.canvases.push(e),
                      this.util.style(e, { position: "absolute", zIndex: 4 });
                  },
                },
                {
                  key: "removeCanvas",
                  value: function () {
                    var e = this.canvases.pop();
                    e.parentElement.removeChild(e);
                  },
                },
                {
                  key: "updateCanvases",
                  value: function () {
                    for (
                      var e = Math.round(this.drawer.wrapper.scrollWidth),
                        t = Math.ceil(e / this.maxCanvasElementWidth);
                      this.canvases.length < t;

                    )
                      this.addCanvas();
                    for (; this.canvases.length > t; ) this.removeCanvas();
                  },
                },
                {
                  key: "updateCanvasesPositioning",
                  value: function () {
                    var e = this,
                      t = this.canvases.length;
                    this.canvases.forEach(function (a, r) {
                      var i =
                        r === t - 1
                          ? e.drawer.wrapper.scrollWidth -
                            e.maxCanvasElementWidth * (t - 1)
                          : e.maxCanvasElementWidth;
                      (a.width = i * e.pixelRatio),
                        (a.height = (e.params.height + 1) * e.pixelRatio),
                        e.util.style(a, {
                          width: "".concat(i, "px"),
                          height: "".concat(e.params.height, "px"),
                          left: "".concat(r * e.maxCanvasElementWidth, "px"),
                        });
                    });
                  },
                },
                {
                  key: "renderCanvases",
                  value: function () {
                    var e = this,
                      t =
                        this.params.duration ||
                        this.wavesurfer.backend.getDuration();
                    if (!(t <= 0)) {
                      var a,
                        r = this.wavesurfer.params,
                        i = this.params.fontSize * r.pixelRatio,
                        n = parseInt(t, 10) + 1,
                        s =
                          r.fillParent && !r.scrollParent
                            ? this.drawer.getWidth()
                            : this.drawer.wrapper.scrollWidth * r.pixelRatio,
                        o = this.params.height * this.pixelRatio,
                        l =
                          this.params.height *
                          (this.params.notchPercentHeight / 100) *
                          this.pixelRatio,
                        h = s / t,
                        c = this.params.formatTimeCallback,
                        u = function (e) {
                          return "function" == typeof e ? e(h) : e;
                        },
                        p = u(this.params.timeInterval),
                        f = u(this.params.primaryLabelInterval),
                        d = u(this.params.secondaryLabelInterval),
                        v = h * this.params.offset,
                        m = 0,
                        y = [],
                        w = this.params.offset < 0 ? n - this.params.offset : n;
                      for (a = 0; a < w / p; a++)
                        y.push([a, m, v]), (m += p), (v += h * p);
                      var x = function (e) {
                        y.forEach(function (t) {
                          e(t[0], t[1], t[2]);
                        });
                      };
                      this.setFillStyles(this.params.primaryColor),
                        this.setFonts(
                          "".concat(i, "px ").concat(this.params.fontFamily)
                        ),
                        this.setFillStyles(this.params.primaryFontColor),
                        x(function (t, a, r) {
                          t % f == 0 &&
                            (e.fillRect(r, 0, 1, o),
                            e.fillText(
                              c(a, h),
                              r + e.params.labelPadding * e.pixelRatio,
                              o
                            ));
                        }),
                        this.setFillStyles(this.params.secondaryColor),
                        this.setFonts(
                          "".concat(i, "px ").concat(this.params.fontFamily)
                        ),
                        this.setFillStyles(this.params.secondaryFontColor),
                        x(function (t, a, r) {
                          t % d == 0 &&
                            (e.fillRect(r, 0, 1, o),
                            e.fillText(
                              c(a, h),
                              r + e.params.labelPadding * e.pixelRatio,
                              o
                            ));
                        }),
                        this.setFillStyles(this.params.unlabeledNotchColor),
                        x(function (t, a, r) {
                          t % d != 0 && t % f != 0 && e.fillRect(r, 0, 1, l);
                        });
                    }
                  },
                },
                {
                  key: "setFillStyles",
                  value: function (e) {
                    this.canvases.forEach(function (t) {
                      var a = t.getContext("2d");
                      a && (a.fillStyle = e);
                    });
                  },
                },
                {
                  key: "setFonts",
                  value: function (e) {
                    this.canvases.forEach(function (t) {
                      var a = t.getContext("2d");
                      a && (a.font = e);
                    });
                  },
                },
                {
                  key: "fillRect",
                  value: function (e, t, a, r) {
                    var i = this;
                    this.canvases.forEach(function (n, s) {
                      var o = s * i.maxCanvasWidth,
                        l = {
                          x1: Math.max(e, s * i.maxCanvasWidth),
                          y1: t,
                          x2: Math.min(e + a, s * i.maxCanvasWidth + n.width),
                          y2: t + r,
                        };
                      if (l.x1 < l.x2) {
                        var h = n.getContext("2d");
                        h &&
                          h.fillRect(l.x1 - o, l.y1, l.x2 - l.x1, l.y2 - l.y1);
                      }
                    });
                  },
                },
                {
                  key: "fillText",
                  value: function (e, t, a) {
                    var r,
                      i = 0;
                    this.canvases.forEach(function (n) {
                      var s = n.getContext("2d");
                      if (s) {
                        var o = s.canvas.width;
                        if (i > t + r) return;
                        i + o > t &&
                          s &&
                          ((r = s.measureText(e).width),
                          s.fillText(e, t - i, a)),
                          (i += o);
                      }
                    });
                  },
                },
                {
                  key: "defaultFormatTimeCallback",
                  value: function (e, t) {
                    if (e / 60 > 1) {
                      var a = parseInt(e / 60, 10);
                      return (
                        (e = (e = parseInt(e % 60, 10)) < 10 ? "0" + e : e),
                        "".concat(a, ":").concat(e)
                      );
                    }
                    return Math.round(1e3 * e) / 1e3;
                  },
                },
                {
                  key: "defaultTimeInterval",
                  value: function (e) {
                    return e >= 25
                      ? 1
                      : 5 * e >= 25
                      ? 5
                      : 15 * e >= 25
                      ? 15
                      : 60 * Math.ceil(0.5 / e);
                  },
                },
                {
                  key: "defaultPrimaryLabelInterval",
                  value: function (e) {
                    return e >= 25 ? 10 : 5 * e >= 25 ? 6 : 4;
                  },
                },
                {
                  key: "defaultSecondaryLabelInterval",
                  value: function (e) {
                    return e >= 25 ? 5 : 2;
                  },
                },
              ]) && a(t.prototype, i),
              n && a(t, n),
              Object.defineProperty(t, "prototype", { writable: !1 }),
              e
            );
          })();
          (t.default = i), (e.exports = t.default);
        },
      },
      t = {};
    var a = (function a(r) {
      var i = t[r];
      if (void 0 !== i) return i.exports;
      var n = (t[r] = { exports: {} });
      return e[r](n, n.exports, a), n.exports;
    })(171);
    return a;
  })()
);
//# sourceMappingURL=wavesurfer.timeline.min.js.map
