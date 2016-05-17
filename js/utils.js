! function(t) {
	"use strict";
	//字符串format方法
	String.prototype.format = function() {
			var o = arguments;
			if (o.length == 0) return this.toString();
			o = o.length == 1 && typeof o[0] == "object" ? o[0] : o;
			return this.replace(/{([^{}]+)}/g, function($0, $1, index, self) {
				return o[$1] != undefined && o[$1] != null ? o[$1] : "";
			});
		},
		String.prototype.maskPhone = function(begin, end, maskChar) {
			var str = this.toString();
			var fstStr = str.substring(0, begin);
			var scdStr = str.substring(begin, end);
			var maskStr = "";
			var lstStr = str.substring(end, str.length);
			for (var i = 0; i < scdStr.length; i++) {
				maskStr += maskChar;
			}
			return fstStr + maskStr + lstStr;
		},
		t.plusReady = function(act) {
			if (mui.os.plus) {
				mui.plusReady(act);
			} else {
				mui.ready(act);
			}
		},
		String.prototype.PadLeft = function(totalWidth, paddingChar) {
			if (paddingChar != null) {
				return this.PadHelper(totalWidth, paddingChar, false);
			} else {
				return this.PadHelper(totalWidth, ' ', false);
			}
		},
		String.prototype.PadRight = function(totalWidth, paddingChar) {
			if (paddingChar != null) {
				return this.PadHelper(totalWidth, paddingChar, true);
			} else {
				return this.PadHelper(totalWidth, ' ', true);
			}
		},
		String.prototype.PadHelper = function(totalWidth, paddingChar, isRightPadded) {
			if (this.length < totalWidth) {
				var paddingString = new String();
				for (var i = 1; i <= (totalWidth - this.length); i++) {
					paddingString += paddingChar;
				}
				if (isRightPadded) {
					return (this + paddingString);
				} else {
					return (paddingString + this);
				}

			} else {
				return this;
			}
		},
		/**
		 * 初始化页面元素的绑定事件，如绑定自定义[data-url],[data-winid]属性的tap打开新窗口事件
		 * @param {String} container 容器元素选择器，默认document.body		
		 * @param {Boolean} waitingShow 是否显示加载雪花，默认false
		 */
		t.initContainerEvent = function(container, whole, waitingShow) {
			//处理所有 data-url 事件绑定			
			mui(container || document.body).on('tap', '[data-url]', function(event) {
				var item = this;
				var url = item.getAttribute('data-url');
				var winId = item.getAttribute('data-winid');
				t.openWindow(url, winId, !!waitingShow);
				event.stopPropagation();
				return false;
			});
		},

		t.openWindow = function(url, winId, waitingShow) {
			if (mui.os.plus) {
				var w = waitingShow == undefined || waitingShow; //waitingShow默认true
				mui.openWindow({
					url: url,
					id: winId,
					show: {
						aniShow: 'pop-in'
					},
					waiting: {
						autoShow: w
					}
				});
			} else {
				window.open(url, '_self');
			}
		},
		t.waiting = function(showOrClose) {
			if (mui.os.plus) {
				showOrClose ? plus.nativeUI.showWaiting() : plus.nativeUI.closeWaiting();
			}
		},

		t.storage = function(key, value) {
			var f = mui.os.plus ? plus.storage : localStorage;
			if (arguments.length == 2) { //设置
				return f.setItem(key, value);
			} else {
				return f.getItem(key);
			}
		},
		t.storageClearAll = function(){
			var f = mui.os.plus ? plus.storage : localStorage;
			f.clear();
		},
		/**
		 * 获取queryString
		 */
		t.queryString = function(n) {
			var reg = new RegExp('(?:^\\?|&)' + n + '=([^&]*)(?:&|$)');
			var match = location.search.match(reg);
			if (match && match.length > 1) {
				return decodeURIComponent(match[1]);
			}
			return "";
		},

		t.parseElement = function(htmlStr) {
			var d = document.createElement("body");
			d.innerHTML = htmlStr;
			return d.firstChild;
		},
		t.isNull = function(t) {
			return null === t || "undefined" == typeof t
		},
		t.trim = function(t) {
			return this.isNull(t) ? t : t.trim ? t.trim() : t.replace(/(^[\\s]*)|([\\s]*$)/g, "")
		},
		t.replace = function(t, e, i) {
			return this.isNull(t) ? t : t.replace(new RegExp(e, "g"), i)
		},
		t.startWith = function(t, e) {
			return this.isNull(t) || this.isNull(e) ? !1 : 0 === t.indexOf(e)
		},
		t.contains = function(t, e) {
			var i = this;
			return this.isNull(t) || this.isNull(e) ? !1 : i.isArray(t) ? i.each(t, function(t, i) {
				return i == e ? !0 : void 0
			}) : t && e && t.indexOf(e) > -1
		},
		t.endWith = function(t, e) {
			return this.isNull(t) || this.isNull(e) ? !1 : t.indexOf(e) === t.length - e.length
		},
		t.has = t.hasProperty = function(t, e) {
			return this.isNull(t) || this.isNull(e) ? !1 : e in t || t.hasOwnProperty(e)
		},
		t.isFunction = function(t) {
			return this.isNull(t) ? !1 : "function" == typeof t
		},
		t.isString = function(t) {
			return this.isNull(t) ? !1 : "string" == typeof t || t instanceof String
		},
		t.isNumber = function(t) {
			return this.isNull(t) ? !1 : "number" == typeof t || t instanceof Number
		},
		t.isBoolean = function(t) {
			return this.isNull(t) ? !1 : "boolean" == typeof t || t instanceof Boolean
		},
		t.isElement = function(t) {
			return this.isNull(t) ? !1 : window.Element ? t instanceof Element : t.tagName && t.nodeType && t.nodeName && t.attributes && t.ownerDocument
		},
		t.isText = function(t) {
			return this.isNull(t) ? !1 : t instanceof Text
		},
		t.isObject = function(t) {
			return this.isNull(t) ? !1 : "object" == typeof t
		},
		t.isArray = function(t) {
			if (this.isNull(t))
				return !1;
			var e = "[object Array]" === Object.prototype.toString.call(t),
				i = t instanceof Array,
				n = !this.isString(t) && this.isNumber(t.length) && this.isFunction(t.splice),
				r = !this.isString(t) && this.isNumber(t.length) && t[0];
			return e || i || n || r
		},
		t.isDate = function(t) {
			return this.isNull(t) ? !1 : t instanceof Date
		},
		t.toArray = function(t) {
			if (this.isNull(t))
				return [];
			try {
				return Array.prototype.slice.call(t)
			} catch (e) {
				for (var i = [], n = (t.length,
						0); n < len; n++)
					i[n] = s[n];
				return i
			}
		},
		t.toDate = function(t) {
			var e = this;
			return e.isNumber(t) ? new Date(t) : e.isString(t) ? new Date(e.replace(e.replace(t, "-", "/"), "T", " ")) : e.isDate(t) ? t : null
		},
		t.each = function(t, e) {
			if (!this.isNull(t) && !this.isNull(e))
				if (this.isArray(t)) {
					for (var i = t.length, n = 0; i > n; n++)
						if (!this.isNull(t[n])) {
							var r = e.call(t[n], n, t[n]);
							if (!this.isNull(r))
								return r
						}
				} else
					for (var s in t)
						if (!this.isNull(t[s])) {
							var r = e.call(t[s], s, t[s]);
							if (!this.isNull(r))
								return r
						}
		},
		t.formatDate = function(t, e) {
			if (this.isNull(e) || this.isNull(t))
				return t;
			t = this.toDate(t);
			var i = {
				"M+": t.getMonth() + 1,
				"d+": t.getDate(),
				"h+": t.getHours(),
				"m+": t.getMinutes(),
				"s+": t.getSeconds(),
				"q+": Math.floor((t.getMonth() + 3) / 3),
				S: t.getMilliseconds()
			};
			/(y+)/.test(e) && (e = e.replace(RegExp.$1, (t.getFullYear() + "").substr(4 - RegExp.$1.length)));
			for (var n in i)
				new RegExp("(" + n + ")").test(e) && (e = e.replace(RegExp.$1, 1 == RegExp.$1.length ? i[n] : ("00" + i[n]).substr(("" + i[n]).length)));
			return e
		},
		t.clone = function(t, e) {
			if (this.isNull(t) || this.isString(t) || this.isNumber(t) || this.isBoolean(t) || this.isDate(t))
				return t;
			var i = t;
			try {
				i = new t.constructor
			} catch (n) {}
			for (var r in t)
				i[r] == t[r] || this.contains(e, r) || (i[r] = "object" == typeof t[r] ? this.clone(t[r], e) : t[r]);
			return i.toString = t.toString,
				i.valueOf = t.valueOf,
				i
		},
		t.copy = function(t, e) {
			return e = e || {},
				this.each(t, function(i) {
					try {
						e[i] = t[i]
					} catch (n) {}
				}),
				e
		},
		t.newGuid = function() {
			var t = function() {
				return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
			};
			return t() + t() + "-" + t() + "-" + t() + "-" + t() + "-" + t() + t() + t()
		},
		t.defineProperty = function(t, e, i, n) {
			if (t && e && i) {
				var r = this;
				if (i.set = i.set || function() {
						throw "do not implement " + e + " setter."
					},
					i.get = i.get || function() {
						throw "do not implement " + e + " getter."
					}, !n)
					if (t.__defineGetter__ && t.__defineSetter__)
						t.__defineSetter__(e, i.set),
						t.__defineGetter__(e, i.get);
					else if (Object.defineProperty)
					try {
						Object.defineProperty(t, e, i)
					} catch (s) {}
				return r.has(t, e) || (t[e] = function(e) {
						var n = r.isNull(e) ? "get" : "set";
						return i[n].apply(t, arguments || [])
					}),
					t[e]
			}
		},
		t.wrapUrl = function(t) {
			return this.isNull(t) ? t : t += t.indexOf("?") > -1 ? "&__t=" + this.newGuid() : "?__t=" + this.newGuid()
		},
		t.sleep = function(t) {
			for (var e = (new Date).getTime() + t;
				(new Date).getTime() + 1 < e;)
			;
		},
		t.async = function(t, e) {
			return this.isFunction(t) ? (e = e || 0,
				t.asyncTimer && clearTimeout(t.asyncTimer),
				t.asyncTimer = setTimeout(t, e),
				t.asyncTimer) : void 0
		},
		"function" == typeof define && define.amd && define("utils", [], function() {
			return t
		})
}("undefined" == typeof exports ? window.utils = {} : exports);

var bLib = function() {}
	/*
	 * type=1服务于日志 	type=2 服务于妈妈圈返回最大的单位
	 */
bLib.calcDateDiff = function(pubDate, type) {
	var birthObj = new Date(pubDate.replace(/-/g, "/"));
	var nowDate = new Date();
	var diffTime = nowDate.getTime() - birthObj.getTime();
	var year = parseInt((diffTime / (1000 * 60 * 60 * 24 * 365)).toFixed(1));
	var monthLeave = parseInt((diffTime % (1000 * 60 * 60 * 24 * 365)).toFixed(1));
	var month = Math.floor((monthLeave / (1000 * 60 * 60 * 24 * 30)).toFixed(1))
	var dayLeave = parseInt((monthLeave % (1000 * 60 * 60 * 24 * 30)).toFixed(1));
	var day = Math.floor((dayLeave / (1000 * 60 * 60 * 24)).toFixed(1));
	if (type == 1) {
		if (month < 1)
			return year + "岁零" + day + "天";
		else
			return year + "岁" + month + "个月" + day + "天";
	} else {
		if (year > 0) {
			return year + "年前";
		} else if (month > 0)
			return month + "月前";
		else if (day > 0)
			return day + "天前";
		else {
			var hourLeave = parseInt(dayLeave % (1000 * 60 * 60 * 24));
			var hour = Math.floor(dayLeave / (1000 * 60 * 60));
			var minLeave = parseInt(hourLeave % (1000 * 60 * 60));
			var min = Math.floor(hourLeave / (1000 * 60));
			if (hour > 0) {
				return hour + "小时前";
			} else if (min > 0) {
				return min + "分钟前";
			} else
				return "刚刚";
		}
	}
}