/*!
 * wavesurfer.js regions plugin 6.2.0 (2022-05-16)
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
		: ((e.WaveSurfer = e.WaveSurfer || {}), (e.WaveSurfer.regions = t()))
})(self, () =>
	(() => {
		"use strict"
		var e = {
				23: (e, t, r) => {
					Object.defineProperty(t, "__esModule", { value: !0 }),
						(t.default = void 0)
					var i = r(638)
					function n(e, t) {
						var r = Object.keys(e)
						if (Object.getOwnPropertySymbols) {
							var i = Object.getOwnPropertySymbols(e)
							t &&
								(i = i.filter(function (t) {
									return Object.getOwnPropertyDescriptor(e, t).enumerable
								})),
								r.push.apply(r, i)
						}
						return r
					}
					function a(e) {
						for (var t = 1; t < arguments.length; t++) {
							var r = null != arguments[t] ? arguments[t] : {}
							t % 2
								? n(Object(r), !0).forEach(function (t) {
										s(e, t, r[t])
								  })
								: Object.getOwnPropertyDescriptors
								? Object.defineProperties(
										e,
										Object.getOwnPropertyDescriptors(r)
								  )
								: n(Object(r)).forEach(function (t) {
										Object.defineProperty(
											e,
											t,
											Object.getOwnPropertyDescriptor(r, t)
										)
								  })
						}
						return e
					}
					function s(e, t, r) {
						return (
							t in e
								? Object.defineProperty(e, t, {
										value: r,
										enumerable: !0,
										configurable: !0,
										writable: !0,
								  })
								: (e[t] = r),
							e
						)
					}
					function o(e, t) {
						for (var r = 0; r < t.length; r++) {
							var i = t[r]
							;(i.enumerable = i.enumerable || !1),
								(i.configurable = !0),
								"value" in i && (i.writable = !0),
								Object.defineProperty(e, i.key, i)
						}
					}
					var l = (function () {
						function e(t, r) {
							var n = this
							!(function (e, t) {
								if (!(e instanceof t))
									throw new TypeError("Cannot call a class as a function")
							})(this, e),
								(this.params = t),
								(this.wavesurfer = r),
								(this.util = a(
									a({}, r.util),
									{},
									{
										getRegionSnapToGridValue: function (e) {
											return n.getRegionSnapToGridValue(e, t)
										},
									}
								)),
								(this.maxRegions = t.maxRegions),
								(this.regionsMinLength = t.regionsMinLength || null),
								Object.getOwnPropertyNames(
									this.util.Observer.prototype
								).forEach(function (e) {
									i.Region.prototype[e] = n.util.Observer.prototype[e]
								}),
								(this.wavesurfer.Region = i.Region)
							;(this._onBackendCreated = function () {
								;(n.wrapper = n.wavesurfer.drawer.wrapper),
									(n.orientation = n.wavesurfer.drawer.orientation),
									(n.defaultEdgeScrollWidth = 0.05 * n.wrapper.clientWidth),
									n.params.regions &&
										n.params.regions.forEach(function (e) {
											n.add(e)
										})
							}),
								(this.list = {}),
								(this._onReady = function () {
									;(n.wrapper = n.wavesurfer.drawer.wrapper),
										(n.vertical = n.wavesurfer.drawer.params.vertical),
										n.params.dragSelection && n.enableDragSelection(n.params),
										Object.keys(n.list).forEach(function (e) {
											n.list[e].updateRender()
										})
								})
						}
						var t, r, n
						return (
							(t = e),
							(n = [
								{
									key: "create",
									value: function (t) {
										return {
											name: "regions",
											deferInit: !(!t || !t.deferInit) && t.deferInit,
											params: t,
											staticProps: {
												addRegion: function (e) {
													return (
														this.initialisedPluginList.regions ||
															this.initPlugin("regions"),
														this.regions.add(e)
													)
												},
												clearRegions: function () {
													this.regions && this.regions.clear()
												},
												enableDragSelection: function (e) {
													this.initialisedPluginList.regions ||
														this.initPlugin("regions"),
														this.regions.enableDragSelection(e)
												},
												disableDragSelection: function () {
													this.regions.disableDragSelection()
												},
											},
											instance: e,
										}
									},
								},
							]),
							(r = [
								{
									key: "init",
									value: function () {
										this.wavesurfer.isReady
											? (this._onBackendCreated(), this._onReady())
											: (this.wavesurfer.once("ready", this._onReady),
											  this.wavesurfer.once(
													"backend-created",
													this._onBackendCreated
											  ))
									},
								},
								{
									key: "destroy",
									value: function () {
										this.wavesurfer.un("ready", this._onReady),
											this.wavesurfer.un(
												"backend-created",
												this._onBackendCreated
											),
											this.wavesurfer.setDisabledEventEmissions([
												"region-removed",
											]),
											this.disableDragSelection(),
											this.clear()
									},
								},
								{
									key: "wouldExceedMaxRegions",
									value: function () {
										return (
											this.maxRegions &&
											Object.keys(this.list).length >= this.maxRegions
										)
									},
								},
								{
									key: "add",
									value: function (e) {
										var t = this
										if (this.wouldExceedMaxRegions()) return null
										!(e = a(
											{
												edgeScrollWidth:
													this.params.edgeScrollWidth ||
													this.defaultEdgeScrollWidth,
											},
											e
										)).formatTimeCallback &&
											this.params.formatTimeCallback &&
											(e = a(
												a({}, e),
												{},
												{ formatTimeCallback: this.params.formatTimeCallback }
											)),
											!e.minLength &&
												this.regionsMinLength &&
												(e = a(
													a({}, e),
													{},
													{ minLength: this.regionsMinLength }
												))
										var r = new this.wavesurfer.Region(
											e,
											this.util,
											this.wavesurfer
										)
										return (
											(this.list[r.id] = r),
											r.on("remove", function () {
												delete t.list[r.id]
											}),
											r
										)
									},
								},
								{
									key: "clear",
									value: function () {
										var e = this
										Object.keys(this.list).forEach(function (t) {
											e.list[t].remove()
										})
									},
								},
								{
									key: "enableDragSelection",
									value: function (e) {
										var t = this
										this.disableDragSelection()
										var r,
											i,
											n,
											a,
											s,
											o,
											l,
											h = e.slop || 2,
											u = this.wavesurfer.drawer.container,
											d =
												!1 !== e.scroll && this.wavesurfer.params.scrollParent,
											c = e.scrollSpeed || 1,
											v = e.scrollThreshold || 10,
											f = this.wavesurfer.getDuration(),
											g = 0,
											p = function e(r) {
												if (a && o) {
													var s = t.wrapper.scrollLeft + c * o
													t.wrapper.scrollLeft = s = Math.min(i, Math.max(0, s))
													var l = t.wavesurfer.drawer.handleEvent(r)
													a.update({
														start: Math.min(l * f, n * f),
														end: Math.max(l * f, n * f),
													}),
														s < i &&
															s > 0 &&
															window.requestAnimationFrame(function () {
																e(r)
															})
												}
											},
											m = function (h) {
												if (!(h.touches && h.touches.length > 1)) {
													if (
														((f = t.wavesurfer.getDuration()),
														(s = h.targetTouches
															? h.targetTouches[0].identifier
															: null),
														(i = t.wrapper.scrollWidth - t.wrapper.clientWidth),
														(l = t.util.withOrientation(
															t.wrapper.getBoundingClientRect(),
															t.vertical
														)),
														t.wavesurfer.params.splitChannels)
													) {
														var u =
																(h.touches ? h.touches[0].clientY : h.clientY) -
																l.top,
															d =
																null != t.wavesurfer.backend.buffer
																	? t.wavesurfer.backend.buffer.numberOfChannels
																	: 1,
															c = t.wrapper.clientHeight / d,
															v = Math.floor(u / c)
														e.channelIdx = v
														var g =
															t.wavesurfer.params.splitChannelsOptions
																.channelColors[v]
														g && g.dragColor && (e.color = g.dragColor)
													}
													;(r = !0),
														(n = t.wavesurfer.drawer.handleEvent(h, !0)),
														(a = null),
														(o = null)
												}
											}
										this.wrapper.addEventListener("mousedown", m),
											this.wrapper.addEventListener("touchstart", m),
											this.on("disable-drag-selection", function () {
												t.wrapper.removeEventListener("touchstart", m),
													t.wrapper.removeEventListener("mousedown", m)
											})
										var w = function (e) {
											;(e.touches && e.touches.length > 1) ||
												((r = !1),
												(g = 0),
												(o = null),
												a &&
													(t.util.preventClick(),
													a.fireEvent("update-end", e),
													t.wavesurfer.fireEvent("region-update-end", a, e)),
												(a = null))
										}
										this.wrapper.addEventListener("mouseleave", w),
											this.wrapper.addEventListener("mouseup", w),
											this.wrapper.addEventListener("touchend", w),
											document.body.addEventListener("mouseup", w),
											document.body.addEventListener("touchend", w),
											this.on("disable-drag-selection", function () {
												document.body.removeEventListener("mouseup", w),
													document.body.removeEventListener("touchend", w),
													t.wrapper.removeEventListener("touchend", w),
													t.wrapper.removeEventListener("mouseup", w),
													t.wrapper.removeEventListener("mouseleave", w)
											})
										var b = function (i) {
											if (
												r &&
												!(++g <= h) &&
												!(i.touches && i.touches.length > 1) &&
												(!i.targetTouches ||
													i.targetTouches[0].identifier == s) &&
												(a || (a = t.add(e || {})))
											) {
												var c = t.wavesurfer.drawer.handleEvent(i),
													m =
														t.wavesurfer.regions.util.getRegionSnapToGridValue(
															n * f
														),
													w =
														t.wavesurfer.regions.util.getRegionSnapToGridValue(
															c * f
														)
												a.update({
													start: Math.min(w, m),
													end: Math.max(w, m),
												})
												var b = t.util.withOrientation(i, t.vertical)
												if (d && u.clientWidth < t.wrapper.scrollWidth) {
													var y = b.clientX - l.left
													;(o = y <= v ? -1 : y >= l.right - v ? 1 : null) &&
														p(i)
												}
											}
										}
										this.wrapper.addEventListener("mousemove", b),
											this.wrapper.addEventListener("touchmove", b),
											this.on("disable-drag-selection", function () {
												t.wrapper.removeEventListener("touchmove", b),
													t.wrapper.removeEventListener("mousemove", b)
											}),
											this.wavesurfer.on("region-created", function (e) {
												t.regionsMinLength && (e.minLength = t.regionsMinLength)
											})
									},
								},
								{
									key: "disableDragSelection",
									value: function () {
										this.fireEvent("disable-drag-selection")
									},
								},
								{
									key: "getCurrentRegion",
									value: function () {
										var e = this,
											t = this.wavesurfer.getCurrentTime(),
											r = null
										return (
											Object.keys(this.list).forEach(function (i) {
												var n = e.list[i]
												n.start <= t &&
													n.end >= t &&
													(!r || n.end - n.start < r.end - r.start) &&
													(r = n)
											}),
											r
										)
									},
								},
								{
									key: "getRegionSnapToGridValue",
									value: function (e, t) {
										if (t.snapToGridInterval) {
											var r = t.snapToGridOffset || 0
											return (
												Math.round((e - r) / t.snapToGridInterval) *
													t.snapToGridInterval +
												r
											)
										}
										return e
									},
								},
							]) && o(t.prototype, r),
							n && o(t, n),
							Object.defineProperty(t, "prototype", { writable: !1 }),
							e
						)
					})()
					;(t.default = l), (e.exports = t.default)
				},
				638: (e, t) => {
					function r(e, t) {
						for (var r = 0; r < t.length; r++) {
							var i = t[r]
							;(i.enumerable = i.enumerable || !1),
								(i.configurable = !0),
								"value" in i && (i.writable = !0),
								Object.defineProperty(e, i.key, i)
						}
					}
					Object.defineProperty(t, "__esModule", { value: !0 }),
						(t.Region = void 0)
					var i = (function () {
						function e(t, r, i) {
							var n,
								a = this
							!(function (e, t) {
								if (!(e instanceof t))
									throw new TypeError("Cannot call a class as a function")
							})(this, e),
								(this.wavesurfer = i),
								(this.wrapper = i.drawer.wrapper),
								(this.util = i.util),
								(this.style = this.util.style),
								(this.regionsUtil = r),
								(this.vertical = i.drawer.params.vertical),
								(this.id = null == t.id ? i.util.getId() : t.id),
								(this.start = Number(t.start) || 0),
								(this.end =
									null == t.end
										? this.start +
										  (4 / this.wrapper.scrollWidth) *
												this.wavesurfer.getDuration()
										: Number(t.end)),
								(this.resize = void 0 === t.resize || Boolean(t.resize)),
								(this.drag = void 0 === t.drag || Boolean(t.drag)),
								(this.isResizing = !1),
								(this.isDragging = !1),
								(this.loop = Boolean(t.loop)),
								(this.color = t.color || "rgba(0, 0, 0, 0.1)"),
								(this.handleStyle = t.handleStyle || {
									left: {},
									right: {},
								}),
								(this.handleLeftEl = null),
								(this.handleRightEl = null),
								(this.data = t.data || {}),
								(this.attributes = t.attributes || {}),
								(this.showTooltip =
									null === (n = t.showTooltip) || void 0 === n || n),
								(this.maxLength = t.maxLength),
								(this.minLength = t.minLength),
								(this._onRedraw = function () {
									return a.updateRender()
								}),
								(this.scroll = !1 !== t.scroll && i.params.scrollParent),
								(this.scrollSpeed = t.scrollSpeed || 1),
								(this.scrollThreshold = t.scrollThreshold || 10),
								(this.preventContextMenu =
									void 0 !== t.preventContextMenu &&
									Boolean(t.preventContextMenu))
							var s = null == t.channelIdx ? -1 : parseInt(t.channelIdx)
							if (
								((this.channelIdx = s),
								(this.regionHeight = "100%"),
								(this.marginTop = "0px"),
								-1 !== s)
							) {
								var o =
									null != this.wavesurfer.backend.buffer
										? this.wavesurfer.backend.buffer.numberOfChannels
										: -1
								o >= 0 &&
									s < o &&
									((this.regionHeight = Math.floor((1 / o) * 100) + "%"),
									(this.marginTop = this.wavesurfer.getHeight() * s + "px"))
							}
							;(this.formatTimeCallback = t.formatTimeCallback),
								(this.edgeScrollWidth = t.edgeScrollWidth),
								this.bindInOut(),
								this.render(),
								this.wavesurfer.on("zoom", this._onRedraw),
								this.wavesurfer.on("redraw", this._onRedraw),
								this.wavesurfer.fireEvent("region-created", this)
						}
						var t, i, n
						return (
							(t = e),
							(i = [
								{
									key: "update",
									value: function (e, t) {
										null != e.start && (this.start = Number(e.start)),
											null != e.end && (this.end = Number(e.end)),
											null != e.loop && (this.loop = Boolean(e.loop)),
											null != e.color && (this.color = e.color),
											null != e.handleStyle &&
												(this.handleStyle = e.handleStyle),
											null != e.data && (this.data = e.data),
											null != e.resize &&
												((this.resize = Boolean(e.resize)),
												this.updateHandlesResize(this.resize)),
											null != e.drag && (this.drag = Boolean(e.drag)),
											null != e.maxLength &&
												(this.maxLength = Number(e.maxLength)),
											null != e.minLength &&
												(this.minLength = Number(e.minLength)),
											null != e.attributes && (this.attributes = e.attributes),
											this.updateRender(),
											this.fireEvent("update"),
											this.wavesurfer.fireEvent("region-updated", this, t)
									},
								},
								{
									key: "remove",
									value: function () {
										this.element &&
											(this.wrapper.removeChild(this.element.domElement),
											(this.element = null),
											this.fireEvent("remove"),
											this.wavesurfer.un("zoom", this._onRedraw),
											this.wavesurfer.un("redraw", this._onRedraw),
											this.wavesurfer.fireEvent("region-removed", this))
									},
								},
								{
									key: "play",
									value: function (e) {
										var t = e || this.start
										this.wavesurfer.play(t, this.end),
											this.fireEvent("play"),
											this.wavesurfer.fireEvent("region-play", this)
									},
								},
								{
									key: "playLoop",
									value: function (e) {
										;(this.loop = !0), this.play(e)
									},
								},
								{
									key: "setLoop",
									value: function (e) {
										this.loop = e
									},
								},
								{
									key: "render",
									value: function () {
										for (var e in ((this.element = this.util.withOrientation(
											this.wrapper.appendChild(
												document.createElement("region")
											),
											this.vertical
										)),
										(this.element.className = "wavesurfer-region"),
										this.showTooltip &&
											(this.element.title = this.formatTime(
												this.start,
												this.end
											)),
										this.element.setAttribute("data-id", this.id),
										this.attributes))
											this.element.setAttribute(
												"data-region-" + e,
												this.attributes[e]
											)
										if (
											(this.style(this.element, {
												position: "absolute",
												zIndex: 3,
												height: this.regionHeight,
												top: this.marginTop,
											}),
											this.resize)
										) {
											;(this.handleLeftEl = this.util.withOrientation(
												this.element.appendChild(
													document.createElement("handle")
												),
												this.vertical
											)),
												(this.handleRightEl = this.util.withOrientation(
													this.element.appendChild(
														document.createElement("handle")
													),
													this.vertical
												)),
												(this.handleLeftEl.className =
													"wavesurfer-handle wavesurfer-handle-start"),
												(this.handleRightEl.className =
													"wavesurfer-handle wavesurfer-handle-end")
											var t = {
													cursor: this.vertical ? "row-resize" : "col-resize",
													position: "absolute",
													top: "0px",
													width: "5px",
													height: "100%",
													backgroundColor: "rgba(0, 0, 0, 1)",
												},
												r =
													"none" !== this.handleStyle.left
														? Object.assign(
																{ left: "0px" },
																t,
																this.handleStyle.left
														  )
														: null,
												i =
													"none" !== this.handleStyle.right
														? Object.assign(
																{ right: "0px" },
																t,
																this.handleStyle.right
														  )
														: null
											r && this.style(this.handleLeftEl, r),
												i && this.style(this.handleRightEl, i)
										}
										this.updateRender(), this.bindEvents()
									},
								},
								{
									key: "formatTime",
									value: function (e, t) {
										return this.formatTimeCallback
											? this.formatTimeCallback(e, t)
											: (e == t ? [e] : [e, t])
													.map(function (e) {
														return [
															Math.floor((e % 3600) / 60),
															("00" + Math.floor(e % 60)).slice(-2),
														].join(":")
													})
													.join("-")
									},
								},
								{
									key: "getWidth",
									value: function () {
										return (
											this.wavesurfer.drawer.width /
											this.wavesurfer.params.pixelRatio
										)
									},
								},
								{
									key: "updateRender",
									value: function () {
										var e = this.wavesurfer.getDuration(),
											t = this.getWidth(),
											r = this.start,
											i = this.end
										if (
											(r < 0 && (i -= r = 0),
											i > e && (r = e - ((i = e) - r)),
											null != this.minLength &&
												(i = Math.max(r + this.minLength, i)),
											null != this.maxLength &&
												(i = Math.min(r + this.maxLength, i)),
											null != this.element)
										) {
											var n = Math.round((r / e) * t),
												a = Math.round((i / e) * t) - n
											for (var s in (this.style(this.element, {
												left: n + "px",
												width: a + "px",
												backgroundColor: this.color,
												cursor: this.drag ? "move" : "default",
											}),
											this.attributes))
												this.element.setAttribute(
													"data-region-" + s,
													this.attributes[s]
												)
											this.showTooltip &&
												(this.element.title = this.formatTime(
													this.start,
													this.end
												))
										}
									},
								},
								{
									key: "bindInOut",
									value: function () {
										var e = this
										;(this.firedIn = !1), (this.firedOut = !1)
										var t = function (t) {
											var r = Math.round(10 * e.start) / 10,
												i = Math.round(10 * e.end) / 10
											;(t = Math.round(10 * t) / 10),
												!e.firedOut &&
													e.firedIn &&
													(r > t || i <= t) &&
													((e.firedOut = !0),
													(e.firedIn = !1),
													e.fireEvent("out"),
													e.wavesurfer.fireEvent("region-out", e)),
												!e.firedIn &&
													r <= t &&
													i > t &&
													((e.firedIn = !0),
													(e.firedOut = !1),
													e.fireEvent("in"),
													e.wavesurfer.fireEvent("region-in", e))
										}
										this.wavesurfer.backend.on("audioprocess", t),
											this.on("remove", function () {
												e.wavesurfer.backend.un("audioprocess", t)
											}),
											this.on("out", function () {
												if (e.loop) {
													var t = e.wavesurfer.getCurrentTime()
													t >= e.start &&
														t <= e.end &&
														e.wavesurfer.play(e.start)
												}
											})
									},
								},
								{
									key: "bindEvents",
									value: function () {
										var e = this,
											t = this.preventContextMenu
										this.element.addEventListener("mouseenter", function (t) {
											e.fireEvent("mouseenter", t),
												e.wavesurfer.fireEvent("region-mouseenter", e, t)
										}),
											this.element.addEventListener("mouseleave", function (t) {
												e.fireEvent("mouseleave", t),
													e.wavesurfer.fireEvent("region-mouseleave", e, t)
											}),
											this.element.addEventListener("click", function (t) {
												t.preventDefault(),
													e.fireEvent("click", t),
													e.wavesurfer.fireEvent("region-click", e, t)
											}),
											this.element.addEventListener("dblclick", function (t) {
												t.stopPropagation(),
													t.preventDefault(),
													e.fireEvent("dblclick", t),
													e.wavesurfer.fireEvent("region-dblclick", e, t)
											}),
											this.element.addEventListener(
												"contextmenu",
												function (r) {
													t && r.preventDefault(),
														e.fireEvent("contextmenu", r),
														e.wavesurfer.fireEvent("region-contextmenu", e, r)
												}
											),
											(this.drag || this.resize) && this.bindDragEvents()
									},
								},
								{
									key: "bindDragEvents",
									value: function () {
										var e,
											t,
											r,
											i,
											n,
											a,
											s,
											o,
											l,
											h = this,
											u = this.wavesurfer.drawer.container,
											d = this.scrollSpeed,
											c = (this.scrollThreshold, !1),
											v = function t(u) {
												var c = h.util.withOrientation(u, h.vertical),
													v = h.wavesurfer.getDuration()
												if (a && (r || n)) {
													var f = c.clientX,
														g = 0,
														p = 0,
														m = 0,
														w = h.regionsUtil.getRegionSnapToGridValue(
															h.wavesurfer.drawer.handleEvent(u) * v
														)
													if (r)
														-1 === a
															? ((p = o * h.wavesurfer.params.minPxPerSec),
															  (g = f - s.left))
															: ((p = l * h.wavesurfer.params.minPxPerSec),
															  (g = s.right - f))
													else {
														var b = h.minLength
														b || (b = 0),
															"start" === n
																? (w > h.end - b &&
																		((w = h.end - b), (m = d * a)),
																  w < 0 && (w = 0))
																: "end" === n &&
																  (w < h.start + b &&
																		((w = h.start + b), (m = d * a)),
																  w > v && (w = v))
													}
													var y = h.wrapper.scrollLeft
													if (-1 === a) {
														if (0 === Math.round(y)) return
														if (Math.round(y - p + g) <= 0) return
													} else {
														if (Math.round(y) === i) return
														if (Math.round(y + p - g) >= i) return
													}
													var E = y - m + d * a
													if (-1 === a) {
														var L = Math.max(0 + p - g, E)
														h.wrapper.scrollLeft = E = L
													} else {
														var k = Math.min(i - p + g, E)
														h.wrapper.scrollLeft = E = k
													}
													var x = w - e
													;(e = w),
														r ? h.onDrag(x) : h.onResize(x, n),
														window.requestAnimationFrame(function () {
															t(u)
														})
												}
											},
											f = function (a) {
												var u = h.wavesurfer.getDuration()
												;(a.touches && a.touches.length > 1) ||
													((t = a.targetTouches
														? a.targetTouches[0].identifier
														: null),
													(h.drag || h.resize) && a.stopPropagation(),
													(e = h.regionsUtil.getRegionSnapToGridValue(
														h.wavesurfer.drawer.handleEvent(a, !0) * u
													)),
													(o = e - h.start),
													(l = h.end - e),
													(i = h.wrapper.scrollWidth - h.wrapper.clientWidth),
													(s = h.util.withOrientation(
														h.wrapper.getBoundingClientRect(),
														h.vertical
													)),
													(h.isResizing = !1),
													(h.isDragging = !1),
													"handle" === a.target.tagName.toLowerCase()
														? ((h.isResizing = !0),
														  (n = a.target.classList.contains(
																"wavesurfer-handle-start"
														  )
																? "start"
																: "end"))
														: ((h.isDragging = !0), (r = !0), (n = !1)))
											},
											g = function (e) {
												;(e.touches && e.touches.length > 1) ||
													((r || n) &&
														((h.isDragging = !1),
														(h.isResizing = !1),
														(r = !1),
														(a = null),
														(n = !1)),
													c &&
														((c = !1),
														h.util.preventClick(),
														h.fireEvent("update-end", e),
														h.wavesurfer.fireEvent("region-update-end", h, e)))
											},
											p = function (i) {
												var d = h.wavesurfer.getDuration(),
													f = h.util.withOrientation(i, h.vertical)
												if (
													!(i.touches && i.touches.length > 1) &&
													(!i.targetTouches ||
														i.targetTouches[0].identifier == t) &&
													(r || n)
												) {
													var g = h.regionsUtil.getRegionSnapToGridValue(
														h.wavesurfer.drawer.handleEvent(i) * d
													)
													if (r) {
														var p = h.wavesurfer.getDuration()
														g > p - l && (g = p - l), g - o < 0 && (g = o)
													}
													if (n) {
														var m = h.minLength
														m || (m = 0),
															"start" === n
																? (g > h.end - m && (g = h.end - m),
																  g < 0 && (g = 0))
																: "end" === n &&
																  (g < h.start + m && (g = h.start + m),
																  g > d && (g = d))
													}
													var w = g - e
													if (
														((e = g),
														h.drag && r && ((c = c || !!w), h.onDrag(w)),
														h.resize && n && ((c = c || !!w), h.onResize(w, n)),
														h.scroll && u.clientWidth < h.wrapper.scrollWidth)
													) {
														var b = f.clientX
														;(a =
															b < s.left + h.edgeScrollWidth
																? -1
																: b > s.right - h.edgeScrollWidth
																? 1
																: null) && v(i)
													}
												}
											}
										this.element.addEventListener("mousedown", f),
											this.element.addEventListener("touchstart", f),
											document.body.addEventListener("mousemove", p),
											document.body.addEventListener("touchmove", p, {
												passive: !1,
											}),
											document.addEventListener("mouseup", g),
											document.body.addEventListener("touchend", g),
											this.on("remove", function () {
												document.removeEventListener("mouseup", g),
													document.body.removeEventListener("touchend", g),
													document.body.removeEventListener("mousemove", p),
													document.body.removeEventListener("touchmove", p)
											}),
											this.wavesurfer.on("destroy", function () {
												document.removeEventListener("mouseup", g),
													document.body.removeEventListener("touchend", g)
											})
									},
								},
								{
									key: "onDrag",
									value: function (e) {
										var t = this.wavesurfer.getDuration()
										this.end + e > t && (e = t - this.end),
											this.start + e < 0 && (e = -1 * this.start)
										var r = {
											direction: this._getDragDirection(e),
											action: "drag",
										}
										this.update({ start: this.start + e, end: this.end + e }, r)
									},
								},
								{
									key: "_getDragDirection",
									value: function (e) {
										return e < 0 ? "left" : e > 0 ? "right" : null
									},
								},
								{
									key: "onResize",
									value: function (e, t) {
										var r = this.wavesurfer.getDuration(),
											i = {
												action: "resize",
												direction: "start" === t ? "left" : "right",
											}
										"start" === t
											? (e > 0 &&
													this.end - (this.start + e) < this.minLength &&
													(e = this.end - this.minLength - this.start),
											  e < 0 &&
													this.end - (this.start + e) > this.maxLength &&
													(e = this.end - this.start - this.maxLength),
											  e < 0 && this.start + e < 0 && (e = -1 * this.start),
											  this.update(
													{
														start: Math.min(this.start + e, this.end),
														end: Math.max(this.start + e, this.end),
													},
													i
											  ))
											: (e < 0 &&
													this.end + e - this.start < this.minLength &&
													(e = this.start + this.minLength - this.end),
											  e > 0 &&
													this.end + e - this.start > this.maxLength &&
													(e = this.maxLength - (this.end - this.start)),
											  e > 0 && this.end + e > r && (e = r - this.end),
											  this.update(
													{
														start: Math.min(this.end + e, this.start),
														end: Math.max(this.end + e, this.start),
													},
													i
											  ))
									},
								},
								{
									key: "updateHandlesResize",
									value: function (e) {
										var t
										;(t = e
											? this.vertical
												? "row-resize"
												: "col-resize"
											: "auto"),
											this.handleLeftEl &&
												this.style(this.handleLeftEl, { cursor: t }),
											this.handleRightEl &&
												this.style(this.handleRightEl, { cursor: t })
									},
								},
							]) && r(t.prototype, i),
							n && r(t, n),
							Object.defineProperty(t, "prototype", { writable: !1 }),
							e
						)
					})()
					t.Region = i
				},
			},
			t = {}
		var r = (function r(i) {
			var n = t[i]
			if (void 0 !== n) return n.exports
			var a = (t[i] = { exports: {} })
			return e[i](a, a.exports, r), a.exports
		})(23)
		return r
	})()
)
//# sourceMappingURL=wavesurfer.regions.min.js.map
