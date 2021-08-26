(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){(function (){
// https://github.com/ninoseki/fanger
const refang = require("fanger")["refang"];
const defang = require("fanger")["defang"];

global.window.refang = refang;
global.window.defang = defang;
}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"fanger":60}],2:[function(require,module,exports){
/*!
 * array-unique <https://github.com/jonschlinkert/array-unique>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

module.exports = function unique(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError('array-unique expects an array.');
  }

  var len = arr.length;
  var i = -1;

  while (i++ < len) {
    var j = i + 1;

    for (; j < arr.length; ++j) {
      if (arr[i] === arr[j]) {
        arr.splice(j--, 1);
      }
    }
  }
  return arr;
};

module.exports.immutable = function uniqueImmutable(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError('array-unique expects an array.');
  }

  var arrLen = arr.length;
  var newArr = new Array(arrLen);

  for (var i = 0; i < arrLen; i++) {
    newArr[i] = arr[i];
  }

  return module.exports(newArr);
};

},{}],3:[function(require,module,exports){
"use strict";

var isValue         = require("type/value/is")
  , isPlainFunction = require("type/plain-function/is")
  , assign          = require("es5-ext/object/assign")
  , normalizeOpts   = require("es5-ext/object/normalize-options")
  , contains        = require("es5-ext/string/#/contains");

var d = (module.exports = function (dscr, value/*, options*/) {
	var c, e, w, options, desc;
	if (arguments.length < 2 || typeof dscr !== "string") {
		options = value;
		value = dscr;
		dscr = null;
	} else {
		options = arguments[2];
	}
	if (isValue(dscr)) {
		c = contains.call(dscr, "c");
		e = contains.call(dscr, "e");
		w = contains.call(dscr, "w");
	} else {
		c = w = true;
		e = false;
	}

	desc = { value: value, configurable: c, enumerable: e, writable: w };
	return !options ? desc : assign(normalizeOpts(options), desc);
});

d.gs = function (dscr, get, set/*, options*/) {
	var c, e, options, desc;
	if (typeof dscr !== "string") {
		options = set;
		set = get;
		get = dscr;
		dscr = null;
	} else {
		options = arguments[3];
	}
	if (!isValue(get)) {
		get = undefined;
	} else if (!isPlainFunction(get)) {
		options = get;
		get = set = undefined;
	} else if (!isValue(set)) {
		set = undefined;
	} else if (!isPlainFunction(set)) {
		options = set;
		set = undefined;
	}
	if (isValue(dscr)) {
		c = contains.call(dscr, "c");
		e = contains.call(dscr, "e");
	} else {
		c = true;
		e = false;
	}

	desc = { get: get, set: set, configurable: c, enumerable: e };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

},{"es5-ext/object/assign":23,"es5-ext/object/normalize-options":35,"es5-ext/string/#/contains":42,"type/plain-function/is":91,"type/value/is":93}],4:[function(require,module,exports){
"use strict";

var numberIsNaN       = require("../../number/is-nan")
  , toPosInt          = require("../../number/to-pos-integer")
  , value             = require("../../object/valid-value")
  , indexOf           = Array.prototype.indexOf
  , objHasOwnProperty = Object.prototype.hasOwnProperty
  , abs               = Math.abs
  , floor             = Math.floor;

module.exports = function (searchElement/*, fromIndex*/) {
	var i, length, fromIndex, val;
	if (!numberIsNaN(searchElement)) return indexOf.apply(this, arguments);

	length = toPosInt(value(this).length);
	fromIndex = arguments[1];
	if (isNaN(fromIndex)) fromIndex = 0;
	else if (fromIndex >= 0) fromIndex = floor(fromIndex);
	else fromIndex = toPosInt(this.length) - floor(abs(fromIndex));

	for (i = fromIndex; i < length; ++i) {
		if (objHasOwnProperty.call(this, i)) {
			val = this[i];
			if (numberIsNaN(val)) return i; // Jslint: ignore
		}
	}
	return -1;
};

},{"../../number/is-nan":17,"../../number/to-pos-integer":21,"../../object/valid-value":38}],5:[function(require,module,exports){
"use strict";

module.exports = require("./is-implemented")() ? Array.from : require("./shim");

},{"./is-implemented":6,"./shim":7}],6:[function(require,module,exports){
"use strict";

module.exports = function () {
	var from = Array.from, arr, result;
	if (typeof from !== "function") return false;
	arr = ["raz", "dwa"];
	result = from(arr);
	return Boolean(result && result !== arr && result[1] === "dwa");
};

},{}],7:[function(require,module,exports){
"use strict";

var iteratorSymbol = require("es6-symbol").iterator
  , isArguments    = require("../../function/is-arguments")
  , isFunction     = require("../../function/is-function")
  , toPosInt       = require("../../number/to-pos-integer")
  , callable       = require("../../object/valid-callable")
  , validValue     = require("../../object/valid-value")
  , isValue        = require("../../object/is-value")
  , isString       = require("../../string/is-string")
  , isArray        = Array.isArray
  , call           = Function.prototype.call
  , desc           = { configurable: true, enumerable: true, writable: true, value: null }
  , defineProperty = Object.defineProperty;

// eslint-disable-next-line complexity, max-lines-per-function
module.exports = function (arrayLike/*, mapFn, thisArg*/) {
	var mapFn = arguments[1]
	  , thisArg = arguments[2]
	  , Context
	  , i
	  , j
	  , arr
	  , length
	  , code
	  , iterator
	  , result
	  , getIterator
	  , value;

	arrayLike = Object(validValue(arrayLike));

	if (isValue(mapFn)) callable(mapFn);
	if (!this || this === Array || !isFunction(this)) {
		// Result: Plain array
		if (!mapFn) {
			if (isArguments(arrayLike)) {
				// Source: Arguments
				length = arrayLike.length;
				if (length !== 1) return Array.apply(null, arrayLike);
				arr = new Array(1);
				arr[0] = arrayLike[0];
				return arr;
			}
			if (isArray(arrayLike)) {
				// Source: Array
				arr = new Array((length = arrayLike.length));
				for (i = 0; i < length; ++i) arr[i] = arrayLike[i];
				return arr;
			}
		}
		arr = [];
	} else {
		// Result: Non plain array
		Context = this;
	}

	if (!isArray(arrayLike)) {
		if ((getIterator = arrayLike[iteratorSymbol]) !== undefined) {
			// Source: Iterator
			iterator = callable(getIterator).call(arrayLike);
			if (Context) arr = new Context();
			result = iterator.next();
			i = 0;
			while (!result.done) {
				value = mapFn ? call.call(mapFn, thisArg, result.value, i) : result.value;
				if (Context) {
					desc.value = value;
					defineProperty(arr, i, desc);
				} else {
					arr[i] = value;
				}
				result = iterator.next();
				++i;
			}
			length = i;
		} else if (isString(arrayLike)) {
			// Source: String
			length = arrayLike.length;
			if (Context) arr = new Context();
			for (i = 0, j = 0; i < length; ++i) {
				value = arrayLike[i];
				if (i + 1 < length) {
					code = value.charCodeAt(0);
					// eslint-disable-next-line max-depth
					if (code >= 0xd800 && code <= 0xdbff) value += arrayLike[++i];
				}
				value = mapFn ? call.call(mapFn, thisArg, value, j) : value;
				if (Context) {
					desc.value = value;
					defineProperty(arr, j, desc);
				} else {
					arr[j] = value;
				}
				++j;
			}
			length = j;
		}
	}
	if (length === undefined) {
		// Source: array or array-like
		length = toPosInt(arrayLike.length);
		if (Context) arr = new Context(length);
		for (i = 0; i < length; ++i) {
			value = mapFn ? call.call(mapFn, thisArg, arrayLike[i], i) : arrayLike[i];
			if (Context) {
				desc.value = value;
				defineProperty(arr, i, desc);
			} else {
				arr[i] = value;
			}
		}
	}
	if (Context) {
		desc.value = null;
		arr.length = length;
	}
	return arr;
};

},{"../../function/is-arguments":11,"../../function/is-function":12,"../../number/to-pos-integer":21,"../../object/is-value":29,"../../object/valid-callable":37,"../../object/valid-value":38,"../../string/is-string":45,"es6-symbol":47}],8:[function(require,module,exports){
"use strict";

var from    = require("./from")
  , isArray = Array.isArray;

module.exports = function (arrayLike) { return isArray(arrayLike) ? arrayLike : from(arrayLike); };

},{"./from":5}],9:[function(require,module,exports){
"use strict";

var assign            = require("../object/assign")
  , isObject          = require("../object/is-object")
  , isValue           = require("../object/is-value")
  , captureStackTrace = Error.captureStackTrace;

module.exports = function (message/*, code, ext*/) {
	var err = new Error(message), code = arguments[1], ext = arguments[2];
	if (!isValue(ext)) {
		if (isObject(code)) {
			ext = code;
			code = null;
		}
	}
	if (isValue(ext)) assign(err, ext);
	if (isValue(code)) err.code = code;
	if (captureStackTrace) captureStackTrace(err, module.exports);
	return err;
};

},{"../object/assign":23,"../object/is-object":28,"../object/is-value":29}],10:[function(require,module,exports){
"use strict";

var toPosInt = require("../number/to-pos-integer");

var test = function (arg1, arg2) { return arg2; };

var desc, defineProperty, generate, mixin;

try {
	Object.defineProperty(test, "length", {
		configurable: true,
		writable: false,
		enumerable: false,
		value: 1
	});
}
catch (ignore) {}

if (test.length === 1) {
	// ES6
	desc = { configurable: true, writable: false, enumerable: false };
	defineProperty = Object.defineProperty;
	module.exports = function (fn, length) {
		length = toPosInt(length);
		if (fn.length === length) return fn;
		desc.value = length;
		return defineProperty(fn, "length", desc);
	};
} else {
	mixin = require("../object/mixin");
	generate = (function () {
		var cache = [];
		return function (length) {
			var args, i = 0;
			if (cache[length]) return cache[length];
			args = [];
			while (length--) args.push("a" + (++i).toString(36));
			// eslint-disable-next-line no-new-func
			return new Function(
				"fn",
				"return function (" + args.join(", ") + ") { return fn.apply(this, arguments); };"
			);
		};
	})();
	module.exports = function (src, length) {
		var target;
		length = toPosInt(length);
		if (src.length === length) return src;
		target = generate(length)(src);
		try { mixin(target, src); }
		catch (ignore) {}
		return target;
	};
}

},{"../number/to-pos-integer":21,"../object/mixin":34}],11:[function(require,module,exports){
"use strict";

var objToString = Object.prototype.toString
  , id = objToString.call((function () { return arguments; })());

module.exports = function (value) { return objToString.call(value) === id; };

},{}],12:[function(require,module,exports){
"use strict";

var objToString = Object.prototype.toString
  , isFunctionStringTag = RegExp.prototype.test.bind(/^[object [A-Za-z0-9]*Function]$/);

module.exports = function (value) {
	return typeof value === "function" && isFunctionStringTag(objToString.call(value));
};

},{}],13:[function(require,module,exports){
"use strict";

// eslint-disable-next-line no-empty-function
module.exports = function () {};

},{}],14:[function(require,module,exports){
"use strict";

module.exports = require("./is-implemented")() ? Math.sign : require("./shim");

},{"./is-implemented":15,"./shim":16}],15:[function(require,module,exports){
"use strict";

module.exports = function () {
	var sign = Math.sign;
	if (typeof sign !== "function") return false;
	return sign(10) === 1 && sign(-20) === -1;
};

},{}],16:[function(require,module,exports){
"use strict";

module.exports = function (value) {
	value = Number(value);
	if (isNaN(value) || value === 0) return value;
	return value > 0 ? 1 : -1;
};

},{}],17:[function(require,module,exports){
"use strict";

module.exports = require("./is-implemented")() ? Number.isNaN : require("./shim");

},{"./is-implemented":18,"./shim":19}],18:[function(require,module,exports){
"use strict";

module.exports = function () {
	var numberIsNaN = Number.isNaN;
	if (typeof numberIsNaN !== "function") return false;
	return !numberIsNaN({}) && numberIsNaN(NaN) && !numberIsNaN(34);
};

},{}],19:[function(require,module,exports){
"use strict";

module.exports = function (value) {
	// eslint-disable-next-line no-self-compare
	return value !== value;
};

},{}],20:[function(require,module,exports){
"use strict";

var sign  = require("../math/sign")
  , abs   = Math.abs
  , floor = Math.floor;

module.exports = function (value) {
	if (isNaN(value)) return 0;
	value = Number(value);
	if (value === 0 || !isFinite(value)) return value;
	return sign(value) * floor(abs(value));
};

},{"../math/sign":14}],21:[function(require,module,exports){
"use strict";

var toInteger = require("./to-integer")
  , max       = Math.max;

module.exports = function (value) { return max(0, toInteger(value)); };

},{"./to-integer":20}],22:[function(require,module,exports){
// Internal method, used by iteration functions.
// Calls a function for each key-value pair found in object
// Optionally takes compareFn to iterate object in specific order

"use strict";

var callable                = require("./valid-callable")
  , value                   = require("./valid-value")
  , bind                    = Function.prototype.bind
  , call                    = Function.prototype.call
  , keys                    = Object.keys
  , objPropertyIsEnumerable = Object.prototype.propertyIsEnumerable;

module.exports = function (method, defVal) {
	return function (obj, cb/*, thisArg, compareFn*/) {
		var list, thisArg = arguments[2], compareFn = arguments[3];
		obj = Object(value(obj));
		callable(cb);

		list = keys(obj);
		if (compareFn) {
			list.sort(typeof compareFn === "function" ? bind.call(compareFn, obj) : undefined);
		}
		if (typeof method !== "function") method = list[method];
		return call.call(method, list, function (key, index) {
			if (!objPropertyIsEnumerable.call(obj, key)) return defVal;
			return call.call(cb, thisArg, obj[key], key, obj, index);
		});
	};
};

},{"./valid-callable":37,"./valid-value":38}],23:[function(require,module,exports){
"use strict";

module.exports = require("./is-implemented")() ? Object.assign : require("./shim");

},{"./is-implemented":24,"./shim":25}],24:[function(require,module,exports){
"use strict";

module.exports = function () {
	var assign = Object.assign, obj;
	if (typeof assign !== "function") return false;
	obj = { foo: "raz" };
	assign(obj, { bar: "dwa" }, { trzy: "trzy" });
	return obj.foo + obj.bar + obj.trzy === "razdwatrzy";
};

},{}],25:[function(require,module,exports){
"use strict";

var keys  = require("../keys")
  , value = require("../valid-value")
  , max   = Math.max;

module.exports = function (dest, src/*, …srcn*/) {
	var error, i, length = max(arguments.length, 2), assign;
	dest = Object(value(dest));
	assign = function (key) {
		try {
			dest[key] = src[key];
		} catch (e) {
			if (!error) error = e;
		}
	};
	for (i = 1; i < length; ++i) {
		src = arguments[i];
		keys(src).forEach(assign);
	}
	if (error !== undefined) throw error;
	return dest;
};

},{"../keys":30,"../valid-value":38}],26:[function(require,module,exports){
"use strict";

module.exports = require("./_iterate")("forEach");

},{"./_iterate":22}],27:[function(require,module,exports){
// Deprecated

"use strict";

module.exports = function (obj) { return typeof obj === "function"; };

},{}],28:[function(require,module,exports){
"use strict";

var isValue = require("./is-value");

var map = { function: true, object: true };

module.exports = function (value) { return (isValue(value) && map[typeof value]) || false; };

},{"./is-value":29}],29:[function(require,module,exports){
"use strict";

var _undefined = require("../function/noop")(); // Support ES3 engines

module.exports = function (val) { return val !== _undefined && val !== null; };

},{"../function/noop":13}],30:[function(require,module,exports){
"use strict";

module.exports = require("./is-implemented")() ? Object.keys : require("./shim");

},{"./is-implemented":31,"./shim":32}],31:[function(require,module,exports){
"use strict";

module.exports = function () {
	try {
		Object.keys("primitive");
		return true;
	} catch (e) {
		return false;
	}
};

},{}],32:[function(require,module,exports){
"use strict";

var isValue = require("../is-value");

var keys = Object.keys;

module.exports = function (object) { return keys(isValue(object) ? Object(object) : object); };

},{"../is-value":29}],33:[function(require,module,exports){
"use strict";

var callable = require("./valid-callable")
  , forEach  = require("./for-each")
  , call     = Function.prototype.call;

module.exports = function (obj, cb/*, thisArg*/) {
	var result = {}, thisArg = arguments[2];
	callable(cb);
	forEach(obj, function (value, key, targetObj, index) {
		result[key] = call.call(cb, thisArg, value, key, targetObj, index);
	});
	return result;
};

},{"./for-each":26,"./valid-callable":37}],34:[function(require,module,exports){
"use strict";

var value                    = require("./valid-value")
  , defineProperty           = Object.defineProperty
  , getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor
  , getOwnPropertyNames      = Object.getOwnPropertyNames
  , getOwnPropertySymbols    = Object.getOwnPropertySymbols;

module.exports = function (target, source) {
	var error, sourceObject = Object(value(source));
	target = Object(value(target));
	getOwnPropertyNames(sourceObject).forEach(function (name) {
		try {
			defineProperty(target, name, getOwnPropertyDescriptor(source, name));
		} catch (e) { error = e; }
	});
	if (typeof getOwnPropertySymbols === "function") {
		getOwnPropertySymbols(sourceObject).forEach(function (symbol) {
			try {
				defineProperty(target, symbol, getOwnPropertyDescriptor(source, symbol));
			} catch (e) { error = e; }
		});
	}
	if (error !== undefined) throw error;
	return target;
};

},{"./valid-value":38}],35:[function(require,module,exports){
"use strict";

var isValue = require("./is-value");

var forEach = Array.prototype.forEach, create = Object.create;

var process = function (src, obj) {
	var key;
	for (key in src) obj[key] = src[key];
};

// eslint-disable-next-line no-unused-vars
module.exports = function (opts1/*, …options*/) {
	var result = create(null);
	forEach.call(arguments, function (options) {
		if (!isValue(options)) return;
		process(Object(options), result);
	});
	return result;
};

},{"./is-value":29}],36:[function(require,module,exports){
"use strict";

var forEach = Array.prototype.forEach, create = Object.create;

// eslint-disable-next-line no-unused-vars
module.exports = function (arg/*, …args*/) {
	var set = create(null);
	forEach.call(arguments, function (name) { set[name] = true; });
	return set;
};

},{}],37:[function(require,module,exports){
"use strict";

module.exports = function (fn) {
	if (typeof fn !== "function") throw new TypeError(fn + " is not a function");
	return fn;
};

},{}],38:[function(require,module,exports){
"use strict";

var isValue = require("./is-value");

module.exports = function (value) {
	if (!isValue(value)) throw new TypeError("Cannot use null or undefined");
	return value;
};

},{"./is-value":29}],39:[function(require,module,exports){
"use strict";

var ensureValue   = require("./valid-value")
  , stringifiable = require("./validate-stringifiable");

module.exports = function (value) { return stringifiable(ensureValue(value)); };

},{"./valid-value":38,"./validate-stringifiable":40}],40:[function(require,module,exports){
"use strict";

var isCallable = require("./is-callable");

module.exports = function (stringifiable) {
	try {
		if (stringifiable && isCallable(stringifiable.toString)) return stringifiable.toString();
		return String(stringifiable);
	} catch (e) {
		throw new TypeError("Passed argument cannot be stringifed");
	}
};

},{"./is-callable":27}],41:[function(require,module,exports){
"use strict";

var isCallable = require("./object/is-callable");

module.exports = function (value) {
	try {
		if (value && isCallable(value.toString)) return value.toString();
		return String(value);
	} catch (e) {
		return "<Non-coercible to string value>";
	}
};

},{"./object/is-callable":27}],42:[function(require,module,exports){
"use strict";

module.exports = require("./is-implemented")() ? String.prototype.contains : require("./shim");

},{"./is-implemented":43,"./shim":44}],43:[function(require,module,exports){
"use strict";

var str = "razdwatrzy";

module.exports = function () {
	if (typeof str.contains !== "function") return false;
	return str.contains("dwa") === true && str.contains("foo") === false;
};

},{}],44:[function(require,module,exports){
"use strict";

var indexOf = String.prototype.indexOf;

module.exports = function (searchString/*, position*/) {
	return indexOf.call(this, searchString, arguments[1]) > -1;
};

},{}],45:[function(require,module,exports){
"use strict";

var objToString = Object.prototype.toString, id = objToString.call("");

module.exports = function (value) {
	return (
		typeof value === "string" ||
		(value &&
			typeof value === "object" &&
			(value instanceof String || objToString.call(value) === id)) ||
		false
	);
};

},{}],46:[function(require,module,exports){
"use strict";

var safeToString = require("./safe-to-string");

var reNewLine = /[\n\r\u2028\u2029]/g;

module.exports = function (value) {
	var string = safeToString(value);
	// Trim if too long
	if (string.length > 100) string = string.slice(0, 99) + "…";
	// Replace eventual new lines
	string = string.replace(reNewLine, function (char) {
		return JSON.stringify(char).slice(1, -1);
	});
	return string;
};

},{"./safe-to-string":41}],47:[function(require,module,exports){
"use strict";

module.exports = require("./is-implemented")()
	? require("ext/global-this").Symbol
	: require("./polyfill");

},{"./is-implemented":48,"./polyfill":53,"ext/global-this":58}],48:[function(require,module,exports){
"use strict";

var global     = require("ext/global-this")
  , validTypes = { object: true, symbol: true };

module.exports = function () {
	var Symbol = global.Symbol;
	var symbol;
	if (typeof Symbol !== "function") return false;
	symbol = Symbol("test symbol");
	try { String(symbol); }
	catch (e) { return false; }

	// Return 'true' also for polyfills
	if (!validTypes[typeof Symbol.iterator]) return false;
	if (!validTypes[typeof Symbol.toPrimitive]) return false;
	if (!validTypes[typeof Symbol.toStringTag]) return false;

	return true;
};

},{"ext/global-this":58}],49:[function(require,module,exports){
"use strict";

module.exports = function (value) {
	if (!value) return false;
	if (typeof value === "symbol") return true;
	if (!value.constructor) return false;
	if (value.constructor.name !== "Symbol") return false;
	return value[value.constructor.toStringTag] === "Symbol";
};

},{}],50:[function(require,module,exports){
"use strict";

var d = require("d");

var create = Object.create, defineProperty = Object.defineProperty, objPrototype = Object.prototype;

var created = create(null);
module.exports = function (desc) {
	var postfix = 0, name, ie11BugWorkaround;
	while (created[desc + (postfix || "")]) ++postfix;
	desc += postfix || "";
	created[desc] = true;
	name = "@@" + desc;
	defineProperty(
		objPrototype,
		name,
		d.gs(null, function (value) {
			// For IE11 issue see:
			// https://connect.microsoft.com/IE/feedbackdetail/view/1928508/
			//    ie11-broken-getters-on-dom-objects
			// https://github.com/medikoo/es6-symbol/issues/12
			if (ie11BugWorkaround) return;
			ie11BugWorkaround = true;
			defineProperty(this, name, d(value));
			ie11BugWorkaround = false;
		})
	);
	return name;
};

},{"d":3}],51:[function(require,module,exports){
"use strict";

var d            = require("d")
  , NativeSymbol = require("ext/global-this").Symbol;

module.exports = function (SymbolPolyfill) {
	return Object.defineProperties(SymbolPolyfill, {
		// To ensure proper interoperability with other native functions (e.g. Array.from)
		// fallback to eventual native implementation of given symbol
		hasInstance: d(
			"", (NativeSymbol && NativeSymbol.hasInstance) || SymbolPolyfill("hasInstance")
		),
		isConcatSpreadable: d(
			"",
			(NativeSymbol && NativeSymbol.isConcatSpreadable) ||
				SymbolPolyfill("isConcatSpreadable")
		),
		iterator: d("", (NativeSymbol && NativeSymbol.iterator) || SymbolPolyfill("iterator")),
		match: d("", (NativeSymbol && NativeSymbol.match) || SymbolPolyfill("match")),
		replace: d("", (NativeSymbol && NativeSymbol.replace) || SymbolPolyfill("replace")),
		search: d("", (NativeSymbol && NativeSymbol.search) || SymbolPolyfill("search")),
		species: d("", (NativeSymbol && NativeSymbol.species) || SymbolPolyfill("species")),
		split: d("", (NativeSymbol && NativeSymbol.split) || SymbolPolyfill("split")),
		toPrimitive: d(
			"", (NativeSymbol && NativeSymbol.toPrimitive) || SymbolPolyfill("toPrimitive")
		),
		toStringTag: d(
			"", (NativeSymbol && NativeSymbol.toStringTag) || SymbolPolyfill("toStringTag")
		),
		unscopables: d(
			"", (NativeSymbol && NativeSymbol.unscopables) || SymbolPolyfill("unscopables")
		)
	});
};

},{"d":3,"ext/global-this":58}],52:[function(require,module,exports){
"use strict";

var d              = require("d")
  , validateSymbol = require("../../../validate-symbol");

var registry = Object.create(null);

module.exports = function (SymbolPolyfill) {
	return Object.defineProperties(SymbolPolyfill, {
		for: d(function (key) {
			if (registry[key]) return registry[key];
			return (registry[key] = SymbolPolyfill(String(key)));
		}),
		keyFor: d(function (symbol) {
			var key;
			validateSymbol(symbol);
			for (key in registry) {
				if (registry[key] === symbol) return key;
			}
			return undefined;
		})
	});
};

},{"../../../validate-symbol":54,"d":3}],53:[function(require,module,exports){
// ES2015 Symbol polyfill for environments that do not (or partially) support it

"use strict";

var d                    = require("d")
  , validateSymbol       = require("./validate-symbol")
  , NativeSymbol         = require("ext/global-this").Symbol
  , generateName         = require("./lib/private/generate-name")
  , setupStandardSymbols = require("./lib/private/setup/standard-symbols")
  , setupSymbolRegistry  = require("./lib/private/setup/symbol-registry");

var create = Object.create
  , defineProperties = Object.defineProperties
  , defineProperty = Object.defineProperty;

var SymbolPolyfill, HiddenSymbol, isNativeSafe;

if (typeof NativeSymbol === "function") {
	try {
		String(NativeSymbol());
		isNativeSafe = true;
	} catch (ignore) {}
} else {
	NativeSymbol = null;
}

// Internal constructor (not one exposed) for creating Symbol instances.
// This one is used to ensure that `someSymbol instanceof Symbol` always return false
HiddenSymbol = function Symbol(description) {
	if (this instanceof HiddenSymbol) throw new TypeError("Symbol is not a constructor");
	return SymbolPolyfill(description);
};

// Exposed `Symbol` constructor
// (returns instances of HiddenSymbol)
module.exports = SymbolPolyfill = function Symbol(description) {
	var symbol;
	if (this instanceof Symbol) throw new TypeError("Symbol is not a constructor");
	if (isNativeSafe) return NativeSymbol(description);
	symbol = create(HiddenSymbol.prototype);
	description = description === undefined ? "" : String(description);
	return defineProperties(symbol, {
		__description__: d("", description),
		__name__: d("", generateName(description))
	});
};

setupStandardSymbols(SymbolPolyfill);
setupSymbolRegistry(SymbolPolyfill);

// Internal tweaks for real symbol producer
defineProperties(HiddenSymbol.prototype, {
	constructor: d(SymbolPolyfill),
	toString: d("", function () { return this.__name__; })
});

// Proper implementation of methods exposed on Symbol.prototype
// They won't be accessible on produced symbol instances as they derive from HiddenSymbol.prototype
defineProperties(SymbolPolyfill.prototype, {
	toString: d(function () { return "Symbol (" + validateSymbol(this).__description__ + ")"; }),
	valueOf: d(function () { return validateSymbol(this); })
});
defineProperty(
	SymbolPolyfill.prototype,
	SymbolPolyfill.toPrimitive,
	d("", function () {
		var symbol = validateSymbol(this);
		if (typeof symbol === "symbol") return symbol;
		return symbol.toString();
	})
);
defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, d("c", "Symbol"));

// Proper implementaton of toPrimitive and toStringTag for returned symbol instances
defineProperty(
	HiddenSymbol.prototype, SymbolPolyfill.toStringTag,
	d("c", SymbolPolyfill.prototype[SymbolPolyfill.toStringTag])
);

// Note: It's important to define `toPrimitive` as last one, as some implementations
// implement `toPrimitive` natively without implementing `toStringTag` (or other specified symbols)
// And that may invoke error in definition flow:
// See: https://github.com/medikoo/es6-symbol/issues/13#issuecomment-164146149
defineProperty(
	HiddenSymbol.prototype, SymbolPolyfill.toPrimitive,
	d("c", SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive])
);

},{"./lib/private/generate-name":50,"./lib/private/setup/standard-symbols":51,"./lib/private/setup/symbol-registry":52,"./validate-symbol":54,"d":3,"ext/global-this":58}],54:[function(require,module,exports){
"use strict";

var isSymbol = require("./is-symbol");

module.exports = function (value) {
	if (!isSymbol(value)) throw new TypeError(value + " is not a symbol");
	return value;
};

},{"./is-symbol":49}],55:[function(require,module,exports){
'use strict';

module.exports = string => {
	if (typeof string !== 'string') {
		throw new TypeError('Expected a string');
	}

	// Escape characters with special meaning either inside or outside character sets.
	// Use a simple backslash escape when it’s always valid, and a \unnnn escape when the simpler form would be disallowed by Unicode patterns’ stricter grammar.
	return string
		.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
		.replace(/-/g, '\\x2d');
};

},{}],56:[function(require,module,exports){
'use strict';

var d        = require('d')
  , callable = require('es5-ext/object/valid-callable')

  , apply = Function.prototype.apply, call = Function.prototype.call
  , create = Object.create, defineProperty = Object.defineProperty
  , defineProperties = Object.defineProperties
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , descriptor = { configurable: true, enumerable: false, writable: true }

  , on, once, off, emit, methods, descriptors, base;

on = function (type, listener) {
	var data;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) {
		data = descriptor.value = create(null);
		defineProperty(this, '__ee__', descriptor);
		descriptor.value = null;
	} else {
		data = this.__ee__;
	}
	if (!data[type]) data[type] = listener;
	else if (typeof data[type] === 'object') data[type].push(listener);
	else data[type] = [data[type], listener];

	return this;
};

once = function (type, listener) {
	var once, self;

	callable(listener);
	self = this;
	on.call(this, type, once = function () {
		off.call(self, type, once);
		apply.call(listener, this, arguments);
	});

	once.__eeOnceListener__ = listener;
	return this;
};

off = function (type, listener) {
	var data, listeners, candidate, i;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) return this;
	data = this.__ee__;
	if (!data[type]) return this;
	listeners = data[type];

	if (typeof listeners === 'object') {
		for (i = 0; (candidate = listeners[i]); ++i) {
			if ((candidate === listener) ||
					(candidate.__eeOnceListener__ === listener)) {
				if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];
				else listeners.splice(i, 1);
			}
		}
	} else {
		if ((listeners === listener) ||
				(listeners.__eeOnceListener__ === listener)) {
			delete data[type];
		}
	}

	return this;
};

emit = function (type) {
	var i, l, listener, listeners, args;

	if (!hasOwnProperty.call(this, '__ee__')) return;
	listeners = this.__ee__[type];
	if (!listeners) return;

	if (typeof listeners === 'object') {
		l = arguments.length;
		args = new Array(l - 1);
		for (i = 1; i < l; ++i) args[i - 1] = arguments[i];

		listeners = listeners.slice();
		for (i = 0; (listener = listeners[i]); ++i) {
			apply.call(listener, this, args);
		}
	} else {
		switch (arguments.length) {
		case 1:
			call.call(listeners, this);
			break;
		case 2:
			call.call(listeners, this, arguments[1]);
			break;
		case 3:
			call.call(listeners, this, arguments[1], arguments[2]);
			break;
		default:
			l = arguments.length;
			args = new Array(l - 1);
			for (i = 1; i < l; ++i) {
				args[i - 1] = arguments[i];
			}
			apply.call(listeners, this, args);
		}
	}
};

methods = {
	on: on,
	once: once,
	off: off,
	emit: emit
};

descriptors = {
	on: d(on),
	once: d(once),
	off: d(off),
	emit: d(emit)
};

base = defineProperties({}, descriptors);

module.exports = exports = function (o) {
	return (o == null) ? create(base) : defineProperties(Object(o), descriptors);
};
exports.methods = methods;

},{"d":3,"es5-ext/object/valid-callable":37}],57:[function(require,module,exports){
var naiveFallback = function () {
	if (typeof self === "object" && self) return self;
	if (typeof window === "object" && window) return window;
	throw new Error("Unable to resolve global `this`");
};

module.exports = (function () {
	if (this) return this;

	// Unexpected strict mode (may happen if e.g. bundled into ESM module)

	// Thanks @mathiasbynens -> https://mathiasbynens.be/notes/globalthis
	// In all ES5+ engines global object inherits from Object.prototype
	// (if you approached one that doesn't please report)
	try {
		Object.defineProperty(Object.prototype, "__global__", {
			get: function () { return this; },
			configurable: true
		});
	} catch (error) {
		// Unfortunate case of Object.prototype being sealed (via preventExtensions, seal or freeze)
		return naiveFallback();
	}
	try {
		// Safari case (window.__global__ is resolved with global context, but __global__ does not)
		if (!__global__) return naiveFallback();
		return __global__;
	} finally {
		delete Object.prototype.__global__;
	}
})();

},{}],58:[function(require,module,exports){
"use strict";

module.exports = require("./is-implemented")() ? globalThis : require("./implementation");

},{"./implementation":57,"./is-implemented":59}],59:[function(require,module,exports){
"use strict";

module.exports = function () {
	if (typeof globalThis !== "object") return false;
	if (!globalThis) return false;
	return globalThis.Array === Array;
};

},{}],60:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defang = exports.refang = void 0;
const escape_string_regexp_1 = __importDefault(require("escape-string-regexp"));
const auxiliary_1 = require("ioc-extractor/dist/aux/auxiliary");
const extractor_1 = require("ioc-extractor/dist/aux/extractor");
const tlds_1 = require("./tlds");
function refang(text) {
    return auxiliary_1.refang(text);
}
exports.refang = refang;
function replaceDot(text) {
    const refanged = refang(text);
    return refanged.replace(/\./i, "[.]");
}
function replaceDotBeforeTLD(text) {
    const refanged = refang(text);
    const parts = refanged.split(".");
    let replaced = [];
    for (const part of parts) {
        const prefix = tlds_1.tlds.includes(part) ? "[.]" : ".";
        replaced = replaced.concat([prefix, part]);
    }
    replaced.shift();
    return replaced.join("");
}
function defangIPs(text) {
    const ipv4s = extractor_1.extractIPv4(text);
    for (const ipv4 of ipv4s) {
        const escaped = escape_string_regexp_1.default(ipv4);
        const regexp = new RegExp(escaped, "g");
        text = text.replace(regexp, replaceDot(ipv4));
    }
    return text;
}
function defangDomains(text) {
    const domains = extractor_1.extractDomain(text).sort().reverse();
    for (const domain of domains) {
        const escaped = escape_string_regexp_1.default(domain);
        const regexp = new RegExp(escaped, "g");
        text = text.replace(regexp, replaceDotBeforeTLD(domain));
    }
    return text;
}
function defangHTTPSchemes(text) {
    return text
        .replace(/http:\/\//gi, "hxxp://")
        .replace(/https:\/\//gi, "hxxps://");
}
function defang(text) {
    text = defangHTTPSchemes(text);
    text = defangIPs(text);
    text = defangDomains(text);
    return text;
}
exports.defang = defang;

},{"./tlds":61,"escape-string-regexp":55,"ioc-extractor/dist/aux/auxiliary":62,"ioc-extractor/dist/aux/extractor":63}],61:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tlds = void 0;
const tlds_1 = require("ioc-extractor/dist/aux/tlds");
exports.tlds = tlds_1.getTLDs();

},{"ioc-extractor/dist/aux/tlds":65}],62:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clean = exports.refang = exports.sortByValue = exports.dedup = void 0;
const arrayUnique = require("array-unique");
/**
 * Reject duplications from an array
 *
 * @export
 * @param {string[]} array An array of strings
 * @returns {string[]} A uniquified array of string
 */
function dedup(array) {
    return arrayUnique(array);
}
exports.dedup = dedup;
/**
 * Soar an array by value
 *
 * @export
 * @param {string[]} array An array of strings
 * @returns {string[]} A sorted array
 */
function sortByValue(array) {
    return array.sort();
}
exports.sortByValue = sortByValue;
function orRegExp(regexps) {
    return new RegExp(regexps.map((r) => r.source).join("|"), "gi");
}
/**
 * Remove defanged symbols from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string} A cleaned (aka refanged) string
 */
function refang(s) {
    const dot = orRegExp([
        /\s\.\s/,
        /(\[|\(|\{)\.(\]|\)|\})/,
        /(\[|\(|\{)\./,
        /\.(\]|\)|\})/,
        /\\\./,
        /(\[|\(|\{)dot(\]|\)|\})/,
    ]);
    const colon = /\[:\]/gi;
    const slash = /\[\/\]/gi;
    const at = /(\[|\(|\{)(at|@)(\]|\)|\})/gi;
    return s
        .replace(dot, ".")
        .replace(colon, ":")
        .replace(slash, "/")
        .replace(/hxxp(s?):\/\//gi, "http$1://")
        .replace(/h\*\*p(s?):\/\//gi, "http$1://")
        .replace(at, "@");
}
exports.refang = refang;
/**
 * Alias for refang
 *
 * @deprecated
 * @export
 * @param {string} s A string
 * @returns {string} A cleaned (aka refanged) string
 */
function clean(s) {
    return refang(s);
}
exports.clean = clean;

},{"array-unique":2}],63:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractETH = exports.extractMacAddress = exports.extractGATrackID = exports.extractGAPubID = exports.extractXMR = exports.extractBTC = exports.extractCVE = exports.extractURL = exports.extractIPv6 = exports.extractIPv4 = exports.extractEmail = exports.extractDomain = exports.extractASN = exports.extractSSDEEP = exports.extractSHA512 = exports.extractSHA256 = exports.extractSHA1 = exports.extractMD5 = void 0;
const auxiliary_1 = require("./auxiliary");
const regexpes_1 = require("./regexpes");
/**
 * Perform String match() by using a regexp
 *
 * @param {string} s A string
 * @param {RegExp} regexp A regexp to use
 * @returns {string[]} An array of matched strings, returns an empty array if not matched
 */
function matchesWithRegExp(s, regexp) {
    // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
    const matched = s.match(regexp);
    return matched === null ? [] : auxiliary_1.sortByValue(auxiliary_1.dedup(matched));
}
/**
 * Extract MD5s from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of MD5s
 */
function extractMD5(s) {
    const regexp = regexpes_1.getMD5RegExp();
    return matchesWithRegExp(s, regexp);
}
exports.extractMD5 = extractMD5;
/**
 * Extract SHA1s from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of SHA1s
 */
function extractSHA1(s) {
    const regexp = regexpes_1.getSHA1RegExp();
    return matchesWithRegExp(s, regexp);
}
exports.extractSHA1 = extractSHA1;
/**
 * Extract SHA256s from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of SHA256s
 */
function extractSHA256(s) {
    const regexp = regexpes_1.getSHA256RegExp();
    return matchesWithRegExp(s, regexp);
}
exports.extractSHA256 = extractSHA256;
/**
 * Extract SHA512s from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of SHA512s
 */
function extractSHA512(s) {
    const regexp = regexpes_1.getSHA512RegExp();
    return matchesWithRegExp(s, regexp);
}
exports.extractSHA512 = extractSHA512;
/**
 * Extract SSDEEPs from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of SSDEEPs
 */
function extractSSDEEP(s) {
    const regexp = regexpes_1.getSSDEEPRegExp();
    return matchesWithRegExp(s, regexp);
}
exports.extractSSDEEP = extractSSDEEP;
/**
 * Extract ASNs from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of ASNs
 */
function extractASN(s) {
    const regexp = regexpes_1.getASNRegExp();
    return matchesWithRegExp(s, regexp);
}
exports.extractASN = extractASN;
/**
 * Extract domains from a string
 *
 * @export
 * @param {string} s A string
 * @param {boolean} enableIDN Enable or disable IDN extraction
 * @param {boolean} strictTLD Enable or disable strict TLD validation
 * @returns {string[]} An array of domains
 */
function extractDomain(s, enableIDN = true, strictTLD = true) {
    if (enableIDN && strictTLD) {
        const internationalizedDomainRegExp = regexpes_1.getInternationalizedDomainRegExp();
        return matchesWithRegExp(s, internationalizedDomainRegExp);
    }
    if (enableIDN) {
        const nonStrictInternationalizedDomainRegExp = regexpes_1.getNonStrictInternationalizedDomainRegExp();
        return matchesWithRegExp(s, nonStrictInternationalizedDomainRegExp);
    }
    if (strictTLD) {
        const domainRegExp = regexpes_1.getDomainRegExp();
        return matchesWithRegExp(s, domainRegExp);
    }
    const nonStrictDomainRegExp = regexpes_1.getNonStrictDomainRegExp();
    return matchesWithRegExp(s, nonStrictDomainRegExp);
}
exports.extractDomain = extractDomain;
/**
 * Extract emails from a string
 *
 * @export
 * @param {string} s A string
 * @param {boolean} enableIDN Enable or disable IDN extraction
 * @param {boolean} strictTLD Enable or disable strict TLD validation
 * @returns {string[]} An array of emails
 */
function extractEmail(s, enableIDN = true, strictTLD = true) {
    if (enableIDN && strictTLD) {
        const internationalizedEmailRegExp = regexpes_1.getInternationalizedEmailRegExp();
        return matchesWithRegExp(s, internationalizedEmailRegExp);
    }
    if (enableIDN) {
        const nonStrictInternationalizedEmailRegExp = regexpes_1.getNonStrictInternationalizedEmailRegExp();
        return matchesWithRegExp(s, nonStrictInternationalizedEmailRegExp);
    }
    if (strictTLD) {
        const emailRegExp = regexpes_1.getEmailRegExp();
        return matchesWithRegExp(s, emailRegExp);
    }
    const nonStrictEmailRegExp = regexpes_1.getNonStrictEmailRegExp();
    return matchesWithRegExp(s, nonStrictEmailRegExp);
}
exports.extractEmail = extractEmail;
/**
 * Extract IPv4s from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of IPv4s
 */
function extractIPv4(s) {
    const regexp = regexpes_1.getIPv4RegExp();
    return matchesWithRegExp(s, regexp);
}
exports.extractIPv4 = extractIPv4;
/**
 * Extract IPv6s from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of IPv6s
 */
function extractIPv6(s) {
    const regexp = regexpes_1.getIPv6RegExp();
    return matchesWithRegExp(s, regexp);
}
exports.extractIPv6 = extractIPv6;
/**
 * Extract URLs from a string
 *
 * @export
 * @param {string} s A string
 * @param {boolean} enableIDN Enable or disable IDN extraction
 * @param {boolean} strictTLD Enable or disable strict TLD validation
 * @returns {string[]} An array of URLs
 */
function extractURL(s, enableIDN = true, strictTLD = true) {
    if (enableIDN && strictTLD) {
        const internationalizedURLRegExp = regexpes_1.getInternationalizedURLRegExp();
        return matchesWithRegExp(s, internationalizedURLRegExp);
    }
    if (enableIDN) {
        const nonStrictInternationalizedURLRegExp = regexpes_1.getNonStrictInternationalizedURLRegExp();
        return matchesWithRegExp(s, nonStrictInternationalizedURLRegExp);
    }
    if (strictTLD) {
        const urlRegExp = regexpes_1.getURLRegExp();
        return matchesWithRegExp(s, urlRegExp);
    }
    const nonStrictURLRegExp = regexpes_1.getNonStrictURLRegExp();
    return matchesWithRegExp(s, nonStrictURLRegExp);
}
exports.extractURL = extractURL;
/**
 * Extract CVEs from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of CVEs
 */
function extractCVE(s) {
    const regexp = regexpes_1.getCVERegExp();
    return matchesWithRegExp(s, regexp);
}
exports.extractCVE = extractCVE;
/**
 * Extract BTCs from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of BTCs
 */
function extractBTC(s) {
    const regexp = regexpes_1.getBTCRegExp();
    return matchesWithRegExp(s, regexp);
}
exports.extractBTC = extractBTC;
/**
 * Extract XMRs from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of XMRs
 */
function extractXMR(s) {
    const regexp = regexpes_1.getXMRRegExp();
    return matchesWithRegExp(s, regexp);
}
exports.extractXMR = extractXMR;
/**
 * Extract Google Adsense Publisher IDs from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of Google Adsense Publisher IDs
 */
function extractGAPubID(s) {
    const regexp = regexpes_1.getGAPubIDRegExp();
    return matchesWithRegExp(s, regexp);
}
exports.extractGAPubID = extractGAPubID;
/**
 * Extract Google Analytics tracking IDs from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of Google Analytics tracking IDs
 */
function extractGATrackID(s) {
    const regexp = regexpes_1.getGATrackIDRegExp();
    return matchesWithRegExp(s, regexp);
}
exports.extractGATrackID = extractGATrackID;
/**
 * Extract mac addresses from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of mac addresses
 */
function extractMacAddress(s) {
    const regexp = regexpes_1.getMACAddressRegExp();
    return matchesWithRegExp(s, regexp);
}
exports.extractMacAddress = extractMacAddress;
/**
 * Extract ETH addresses from a string
 *
 * @export
 * @param {string} s A string
 * @returns {string[]} An array of ETH addresses
 */
function extractETH(s) {
    const regexp = regexpes_1.getETHRegExp();
    return matchesWithRegExp(s, regexp);
}
exports.extractETH = extractETH;

},{"./auxiliary":62,"./regexpes":64}],64:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isETH = exports.getETHRegExp = exports.isMacAddress = exports.getMACAddressRegExp = exports.isGATrackID = exports.getGATrackIDRegExp = exports.isGAPubID = exports.getGAPubIDRegExp = exports.isXMR = exports.getXMRRegExp = exports.isBTC = exports.getBTCRegExp = exports.isCVE = exports.getCVERegExp = exports.isURL = exports.getNonStrictInternationalizedURLRegExp = exports.getInternationalizedURLRegExp = exports.getNonStrictURLRegExp = exports.getURLRegExp = exports.isIPv6 = exports.getIPv6RegExp = exports.isIPv4 = exports.getIPv4RegExp = exports.getIPv4RegExpString = exports.isEmail = exports.getNonStrictInternationalizedEmailRegExp = exports.getInternationalizedEmailRegExp = exports.getNonStrictEmailRegExp = exports.getEmailRegExp = exports.isDomain = exports.getNonStrictDomainRegExp = exports.getDomainRegExp = exports.getNonStrictInternationalizedDomainRegExp = exports.getInternationalizedDomainRegExp = exports.isASN = exports.getASNRegExp = exports.isSSDEEP = exports.getSSDEEPRegExp = exports.isSHA512 = exports.getSHA512RegExp = exports.isSHA256 = exports.getSHA256RegExp = exports.isSHA1 = exports.getSHA1RegExp = exports.isMD5 = exports.getMD5RegExp = void 0;
const memoize = require("memoizee");
const tlds_1 = require("./tlds");
/**
 * Check whether a string matches with a regexp or not
 *
 * @param {string} s A string
 * @param {RegExp} regexp A regexp
 * @returns {boolean} returns true if a string matches with a regexp
 */
function check(s, regexp) {
    // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
    const match = s.match(regexp);
    if (match === null) {
        return false;
    }
    return match[0].length == s.length;
}
const getMD5RegExp = () => {
    return /\b[A-Fa-f0-9]{32}\b/gi;
};
exports.getMD5RegExp = getMD5RegExp;
/**
 * Check whether a string is a MD5 or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} return true if a string is MD5
 */
function isMD5(s) {
    const regexp = exports.getMD5RegExp();
    return check(s, regexp);
}
exports.isMD5 = isMD5;
const getSHA1RegExp = () => {
    return /\b[A-Fa-f0-9]{40}\b/gi;
};
exports.getSHA1RegExp = getSHA1RegExp;
/**
 * Check whether a string is a SHA1 or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} return true if a string is a SHA1
 */
function isSHA1(s) {
    const regexp = exports.getSHA1RegExp();
    return check(s, regexp);
}
exports.isSHA1 = isSHA1;
const getSHA256RegExp = () => {
    return /\b[A-Fa-f0-9]{64}\b/gi;
};
exports.getSHA256RegExp = getSHA256RegExp;
/**
 * Check whether a string is a SHA256 or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} return true if a string is a SHA256
 */
function isSHA256(s) {
    const regexp = exports.getSHA256RegExp();
    return check(s, regexp);
}
exports.isSHA256 = isSHA256;
const getSHA512RegExp = () => {
    return /\b[A-Fa-f0-9]{128}\b/gi;
};
exports.getSHA512RegExp = getSHA512RegExp;
/**
 * Check whether a string is a SHA512 or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} return true if a string is a SHA512
 */
function isSHA512(s) {
    const regexp = exports.getSHA512RegExp();
    return check(s, regexp);
}
exports.isSHA512 = isSHA512;
const getSSDEEPRegExp = () => {
    return /\b\d{1,}:[A-Za-z0-9/+]{3,}:[A-Za-z0-9/+]{3,}/gi;
};
exports.getSSDEEPRegExp = getSSDEEPRegExp;
/**
 * Check whether a string is a SSDEEP or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} return true if a string is a SSDEEP
 */
function isSSDEEP(s) {
    const regexp = exports.getSSDEEPRegExp();
    return check(s, regexp);
}
exports.isSSDEEP = isSSDEEP;
const getASNRegExp = () => {
    return /(AS|ASN)\d+/gi;
};
exports.getASNRegExp = getASNRegExp;
/**
 * Check whether a string is an ASN or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} return true if a string is an ASN
 */
function isASN(s) {
    const regexp = exports.getASNRegExp();
    return check(s, regexp);
}
exports.isASN = isASN;
const _getInternationalizedDomainRegExpString = () => {
    const tld = tlds_1.getTLDRegExpString();
    return `(([a-z0-9\\u00a1-\\uffff]{1,63}|xn--)((?!.{0,63}--)[a-z0-9\\u00a1-\\uffff-]{0,63}[a-z0-9\\u00a1-\\uffff])?\\.)+(${tld})\\b`;
};
const getInternationalizedDomainRegExpString = memoize(_getInternationalizedDomainRegExpString);
const getInternationalizedDomainRegExp = () => {
    const internationalizedDomain = getInternationalizedDomainRegExpString();
    return new RegExp(internationalizedDomain, "gi");
};
exports.getInternationalizedDomainRegExp = getInternationalizedDomainRegExp;
const getNonStrictInternationalizedDomainRegExpString = () => {
    return "(([a-z0-9\\u00a1-\\uffff]{1,63}|xn--)((?!.{0,63}--)[a-z0-9\\u00a1-\\uffff-]{0,63}[a-z0-9\\u00a1-\\uffff])?\\.)+(?:[a-z0-9\\u00a1-\\uffff-]{2,63})\\b";
};
const getNonStrictInternationalizedDomainRegExp = () => {
    const nonStrictInternationalizedDomain = getNonStrictInternationalizedDomainRegExpString();
    return new RegExp(nonStrictInternationalizedDomain, "gi");
};
exports.getNonStrictInternationalizedDomainRegExp = getNonStrictInternationalizedDomainRegExp;
const _getDomainRegExpString = () => {
    const tld = tlds_1.getTLDRegExpString();
    return `(([a-z0-9]{1,63}|xn--)((?!.{0,63}--)[a-z0-9-]{0,63}[a-z0-9])?\\.)+(${tld})\\b`;
};
const getDomainRegExpString = memoize(_getDomainRegExpString);
const getDomainRegExp = () => {
    const domain = getDomainRegExpString();
    return new RegExp(domain, "gi");
};
exports.getDomainRegExp = getDomainRegExp;
const getNonStrictDomainRegExpString = () => {
    return "(([a-z0-9]{1,63}|xn--)((?!.{0,63}--)[a-z0-9-]{0,63}[a-z0-9])?\\.)+(?:[a-z-]{2,})";
};
const getNonStrictDomainRegExp = () => {
    const nonStrictDomain = getNonStrictDomainRegExpString();
    return new RegExp(nonStrictDomain, "gi");
};
exports.getNonStrictDomainRegExp = getNonStrictDomainRegExp;
/**
 * Check whether a string is a domain or not
 *
 * @export
 * @param {string} s A string
 * @param {boolean} enableIDN Enable or disable IDN extraction
 * @param {boolean} strictTLD Enable or disable strict TLD validation
 * @returns {boolean} return true if a string is a domain
 */
function isDomain(s, enableIDN = true, strictTLD = true) {
    if (enableIDN && strictTLD) {
        const internationalizedDomainRegExp = exports.getInternationalizedDomainRegExp();
        return check(s, internationalizedDomainRegExp);
    }
    if (enableIDN) {
        const nonStrictInternationalizedDomainRegExp = exports.getNonStrictInternationalizedDomainRegExp();
        return check(s, nonStrictInternationalizedDomainRegExp);
    }
    if (strictTLD) {
        const domainRegExp = exports.getDomainRegExp();
        return check(s, domainRegExp);
    }
    const nonStrictDomainRegExp = exports.getNonStrictDomainRegExp();
    return check(s, nonStrictDomainRegExp);
}
exports.isDomain = isDomain;
const localPart = "[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+";
const getEmailRegExp = () => {
    const domain = getDomainRegExpString();
    return new RegExp(`${localPart}@${domain}`, "gi");
};
exports.getEmailRegExp = getEmailRegExp;
const getNonStrictEmailRegExp = () => {
    const nonStrictDomain = getNonStrictDomainRegExpString();
    return new RegExp(`${localPart}@${nonStrictDomain}`, "gi");
};
exports.getNonStrictEmailRegExp = getNonStrictEmailRegExp;
const getInternationalizedEmailRegExp = () => {
    const internationalizedDomain = getInternationalizedDomainRegExpString();
    return new RegExp(`${localPart}@${internationalizedDomain}`, "gi");
};
exports.getInternationalizedEmailRegExp = getInternationalizedEmailRegExp;
const getNonStrictInternationalizedEmailRegExp = () => {
    const nonStrictInternationalizedDomain = getNonStrictInternationalizedDomainRegExpString();
    return new RegExp(`${localPart}@${nonStrictInternationalizedDomain}`, "gi");
};
exports.getNonStrictInternationalizedEmailRegExp = getNonStrictInternationalizedEmailRegExp;
/**
 * Check whether a string is an email or not
 *
 * @export
 * @param {string} s A string
 * @param {boolean} enableIDN Enable or disable IDN extraction
 * @param {boolean} strictTLD Enable or disable strict TLD validation
 * @returns {boolean} true if a string is a domain
 */
function isEmail(s, enableIDN = true, strictTLD = true) {
    if (enableIDN && strictTLD) {
        const internationalizedEmailRegExp = exports.getInternationalizedEmailRegExp();
        return check(s, internationalizedEmailRegExp);
    }
    if (enableIDN) {
        const nonStrictInternationalizedEmailRegExp = exports.getNonStrictInternationalizedEmailRegExp();
        return check(s, nonStrictInternationalizedEmailRegExp);
    }
    if (strictTLD) {
        const emailRegExp = exports.getEmailRegExp();
        return check(s, emailRegExp);
    }
    const nonStrictEmailRegExp = exports.getNonStrictEmailRegExp();
    return check(s, nonStrictEmailRegExp);
}
exports.isEmail = isEmail;
const getIPv4RegExpString = () => {
    return "(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\[?\\.]?){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";
};
exports.getIPv4RegExpString = getIPv4RegExpString;
const getIPv4RegExp = () => {
    const ipv4 = exports.getIPv4RegExpString();
    return new RegExp(ipv4, "gi");
};
exports.getIPv4RegExp = getIPv4RegExp;
/**
 * Check whether a string is an IPv4 or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} true if a string is an IPv4
 */
function isIPv4(s) {
    const regexp = exports.getIPv4RegExp();
    return check(s, regexp);
}
exports.isIPv4 = isIPv4;
const _getIPv6RegExpString = () => {
    const ipv4 = exports.getIPv4RegExpString();
    const v6seg = "[a-fA-F\\d]{1,4}";
    const ipv6 = `
(
(?:${v6seg}:){7}(?:${v6seg}|:)|                                // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8
(?:${v6seg}:){6}(?:${ipv4}|:${v6seg}|:)|                         // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4
(?:${v6seg}:){5}(?::${ipv4}|(:${v6seg}){1,2}|:)|                 // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4
(?:${v6seg}:){4}(?:(:${v6seg}){0,1}:${ipv4}|(:${v6seg}){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4
(?:${v6seg}:){3}(?:(:${v6seg}){0,2}:${ipv4}|(:${v6seg}){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4
(?:${v6seg}:){2}(?:(:${v6seg}){0,3}:${ipv4}|(:${v6seg}){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4
(?:${v6seg}:){1}(?:(:${v6seg}){0,4}:${ipv4}|(:${v6seg}){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4
(?::((?::${v6seg}){0,5}:${ipv4}|(?::${v6seg}){1,7}|:))           // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4
)(%[0-9a-zA-Z]{1,})?                                           // %eth0            %1
`
        .replace(/\s*\/\/.*$/gm, "")
        .replace(/\n/g, "")
        .trim();
    return ipv6;
};
const getIPv6RegExpString = memoize(_getIPv6RegExpString);
const getIPv6RegExp = () => {
    const ipv6 = getIPv6RegExpString();
    return new RegExp(ipv6, "gi");
};
exports.getIPv6RegExp = getIPv6RegExp;
/**
 * Check whether a string is an IPv6 or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} true if a string is an IPv6
 */
function isIPv6(s) {
    const regexp = exports.getIPv6RegExp();
    return check(s, regexp);
}
exports.isIPv6 = isIPv6;
const protocol = "(?:(?:https?)://)";
const auth = "(?:\\S+(?::\\S*)?@)?";
const port = "(?::\\d{2,5})?";
const path = '(?:[/?#][^\\s"]*)?';
const getURLRegExp = () => {
    const domain = getDomainRegExpString();
    const ipv4 = exports.getIPv4RegExpString();
    const url = `(?:${protocol})${auth}(?:${domain}|localhost|${ipv4})${port}${path}`;
    return new RegExp(url, "gi");
};
exports.getURLRegExp = getURLRegExp;
const getNonStrictURLRegExp = () => {
    const nonStrictDomain = getNonStrictDomainRegExpString();
    const ipv4 = exports.getIPv4RegExpString();
    const nonStrictURL = `(?:${protocol})${auth}(?:${nonStrictDomain}|localhost|${ipv4})${port}${path}`;
    return new RegExp(nonStrictURL, "gi");
};
exports.getNonStrictURLRegExp = getNonStrictURLRegExp;
const getInternationalizedURLRegExp = () => {
    const internationalizedDomain = getInternationalizedDomainRegExpString();
    const ipv4 = exports.getIPv4RegExpString();
    const internationalizedURL = `(?:${protocol})${auth}(?:${internationalizedDomain}|localhost|${ipv4})${port}${path}`;
    return new RegExp(internationalizedURL, "gi");
};
exports.getInternationalizedURLRegExp = getInternationalizedURLRegExp;
const getNonStrictInternationalizedURLRegExp = () => {
    const nonStrictInternationalizedDomain = getNonStrictInternationalizedDomainRegExpString();
    const ipv4 = exports.getIPv4RegExpString();
    const nonStrictInternationalizedURL = `(?:${protocol})${auth}(?:${nonStrictInternationalizedDomain}|localhost|${ipv4})${port}${path}`;
    return new RegExp(nonStrictInternationalizedURL, "gi");
};
exports.getNonStrictInternationalizedURLRegExp = getNonStrictInternationalizedURLRegExp;
/**
 * Check whether a string is a URL or not
 *
 * @export
 * @param {string} s A string
 * @param {boolean} enableIDN Enable or disable IDN extraction
 * @param {boolean} strictTLD Enable or disable strict TLD validation
 * @returns {boolean} true if a string is a URL
 */
function isURL(s, enableIDN = true, strictTLD = true) {
    if (enableIDN && strictTLD) {
        const internationalizedURLRegExp = exports.getInternationalizedURLRegExp();
        return check(s, internationalizedURLRegExp);
    }
    if (enableIDN) {
        const nonStrictInternationalizedURLRegExp = exports.getNonStrictInternationalizedURLRegExp();
        return check(s, nonStrictInternationalizedURLRegExp);
    }
    if (strictTLD) {
        const urlRegExp = exports.getURLRegExp();
        return check(s, urlRegExp);
    }
    const nonStrictURLRegExp = exports.getNonStrictURLRegExp();
    return check(s, nonStrictURLRegExp);
}
exports.isURL = isURL;
const getCVERegExp = () => {
    return /(CVE-(19|20)\d{2}-\d{4,7})/gi;
};
exports.getCVERegExp = getCVERegExp;
/**
 * Check whether a string is a CVE or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} true if a string is a CVE
 */
function isCVE(s) {
    const regexp = exports.getCVERegExp();
    return check(s, regexp);
}
exports.isCVE = isCVE;
const getBTCRegExp = () => {
    return /\b[13][a-km-zA-HJ-NP-Z0-9]{26,33}\b/gi;
};
exports.getBTCRegExp = getBTCRegExp;
/**
 * Check whether a string is a BTC or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} return true if a string is a BTC
 */
function isBTC(s) {
    const regexp = exports.getBTCRegExp();
    return check(s, regexp);
}
exports.isBTC = isBTC;
const getXMRRegExp = () => {
    return /\b4[0-9AB][1-9A-HJ-NP-Za-km-z]{93}\b/gi;
};
exports.getXMRRegExp = getXMRRegExp;
/**
 * Check whether a string is an XMR or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} true if a string is an XMR
 */
function isXMR(s) {
    const regexp = exports.getXMRRegExp();
    return check(s, regexp);
}
exports.isXMR = isXMR;
const getGAPubIDRegExp = () => {
    return /pub-\d{16}/gi;
};
exports.getGAPubIDRegExp = getGAPubIDRegExp;
/**
 * Check whether a string is a Google Adsense Publisher ID or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} true if a string is a Google Adsense Publisher ID
 */
function isGAPubID(s) {
    const regexp = exports.getGAPubIDRegExp();
    return check(s, regexp);
}
exports.isGAPubID = isGAPubID;
const getGATrackIDRegExp = () => {
    return /UA-\d{4,9}(-\d{1,2})?/gi;
};
exports.getGATrackIDRegExp = getGATrackIDRegExp;
/**
 * Check whether a string is a Google Analytics tracking ID or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} true if a string is a Google Analytics tracking ID
 */
function isGATrackID(s) {
    const regexp = exports.getGATrackIDRegExp();
    return check(s, regexp);
}
exports.isGATrackID = isGATrackID;
const getMACAddressRegExp = () => {
    return /\b(?:[A-Fa-f0-9]{2}([-:]))(?:[A-Fa-f0-9]{2}\1){4}[A-Fa-f0-9]{2}\b/gi;
};
exports.getMACAddressRegExp = getMACAddressRegExp;
/**
 * Check whether a string is a mac address or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} true if a string is a mac address
 */
function isMacAddress(s) {
    const regexp = exports.getMACAddressRegExp();
    return check(s, regexp);
}
exports.isMacAddress = isMacAddress;
const getETHRegExp = () => {
    return /\b0x[a-fA-F0-9]{40}\b/gi;
};
exports.getETHRegExp = getETHRegExp;
/**
 * Check whether a string is an ETH address or not
 *
 * @export
 * @param {string} s A string
 * @returns {boolean} true if a string is an ETH address
 */
function isETH(s) {
    const regexp = exports.getETHRegExp();
    return check(s, regexp);
}
exports.isETH = isETH;

},{"./tlds":65,"memoizee":74}],65:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTLDRegExpString = exports.getTLDs = void 0;
const memoize = require("memoizee");
function getTLDs() {
    return [
        "aaa",
        "aarp",
        "abarth",
        "abb",
        "abbott",
        "abbvie",
        "abc",
        "able",
        "abogado",
        "abudhabi",
        "ac",
        "academy",
        "accenture",
        "accountant",
        "accountants",
        "aco",
        "active",
        "actor",
        "ad",
        "adac",
        "ads",
        "adult",
        "ae",
        "aeg",
        "aero",
        "aetna",
        "af",
        "afamilycompany",
        "afl",
        "africa",
        "ag",
        "agakhan",
        "agency",
        "ai",
        "aig",
        "aigo",
        "airbus",
        "airforce",
        "airtel",
        "akdn",
        "al",
        "alfaromeo",
        "alibaba",
        "alipay",
        "allfinanz",
        "allstate",
        "ally",
        "alsace",
        "alstom",
        "am",
        "amazon",
        "americanexpress",
        "americanfamily",
        "amex",
        "amfam",
        "amica",
        "amsterdam",
        "analytics",
        "android",
        "anquan",
        "anz",
        "ao",
        "aol",
        "apartments",
        "app",
        "apple",
        "aq",
        "aquarelle",
        "ar",
        "arab",
        "aramco",
        "archi",
        "army",
        "arpa",
        "art",
        "arte",
        "as",
        "asda",
        "asia",
        "associates",
        "at",
        "athleta",
        "attorney",
        "au",
        "auction",
        "audi",
        "audible",
        "audio",
        "auspost",
        "author",
        "auto",
        "autos",
        "avianca",
        "aw",
        "aws",
        "ax",
        "axa",
        "az",
        "azure",
        "ba",
        "baby",
        "baidu",
        "banamex",
        "bananarepublic",
        "band",
        "bank",
        "bar",
        "barcelona",
        "barclaycard",
        "barclays",
        "barefoot",
        "bargains",
        "baseball",
        "basketball",
        "bauhaus",
        "bayern",
        "bb",
        "bbc",
        "bbt",
        "bbva",
        "bcg",
        "bcn",
        "bd",
        "be",
        "beats",
        "beauty",
        "beer",
        "bentley",
        "berlin",
        "best",
        "bestbuy",
        "bet",
        "bf",
        "bg",
        "bh",
        "bharti",
        "bi",
        "bible",
        "bid",
        "bike",
        "bing",
        "bingo",
        "bio",
        "biz",
        "bj",
        "black",
        "blackfriday",
        "blanco",
        "blockbuster",
        "blog",
        "bloomberg",
        "blue",
        "bm",
        "bms",
        "bmw",
        "bn",
        "bnl",
        "bnpparibas",
        "bo",
        "boats",
        "boehringer",
        "bofa",
        "bom",
        "bond",
        "boo",
        "book",
        "booking",
        "boots",
        "bosch",
        "bostik",
        "boston",
        "bot",
        "boutique",
        "box",
        "br",
        "bradesco",
        "bridgestone",
        "broadway",
        "broker",
        "brother",
        "brussels",
        "bs",
        "bt",
        "budapest",
        "bugatti",
        "build",
        "builders",
        "business",
        "buy",
        "buzz",
        "bv",
        "bw",
        "by",
        "bz",
        "bzh",
        "ca",
        "cab",
        "cafe",
        "cal",
        "call",
        "calvinklein",
        "cam",
        "camera",
        "camp",
        "cancerresearch",
        "canon",
        "capetown",
        "capital",
        "capitalone",
        "car",
        "caravan",
        "cards",
        "care",
        "career",
        "careers",
        "cars",
        "cartier",
        "casa",
        "case",
        "caseih",
        "cash",
        "casino",
        "cat",
        "catering",
        "catholic",
        "cba",
        "cbn",
        "cbre",
        "cbs",
        "cc",
        "cd",
        "ceb",
        "center",
        "ceo",
        "cern",
        "cf",
        "cfa",
        "cfd",
        "cg",
        "ch",
        "chanel",
        "channel",
        "charity",
        "chase",
        "chat",
        "cheap",
        "chintai",
        "chloe",
        "christmas",
        "chrome",
        "chrysler",
        "church",
        "ci",
        "cipriani",
        "circle",
        "cisco",
        "citadel",
        "citi",
        "citic",
        "city",
        "cityeats",
        "ck",
        "cl",
        "claims",
        "cleaning",
        "click",
        "clinic",
        "clinique",
        "clothing",
        "cloud",
        "club",
        "clubmed",
        "cm",
        "cn",
        "co",
        "coach",
        "codes",
        "coffee",
        "college",
        "cologne",
        "com",
        "comcast",
        "commbank",
        "community",
        "company",
        "compare",
        "computer",
        "comsec",
        "condos",
        "construction",
        "consulting",
        "contact",
        "contractors",
        "cooking",
        "cookingchannel",
        "cool",
        "coop",
        "corsica",
        "country",
        "coupon",
        "coupons",
        "courses",
        "cpa",
        "cr",
        "credit",
        "creditcard",
        "creditunion",
        "cricket",
        "crown",
        "crs",
        "cruise",
        "cruises",
        "csc",
        "cu",
        "cuisinella",
        "cv",
        "cw",
        "cx",
        "cy",
        "cymru",
        "cyou",
        "cz",
        "dabur",
        "dad",
        "dance",
        "data",
        "date",
        "dating",
        "datsun",
        "day",
        "dclk",
        "dds",
        "de",
        "deal",
        "dealer",
        "deals",
        "degree",
        "delivery",
        "dell",
        "deloitte",
        "delta",
        "democrat",
        "dental",
        "dentist",
        "desi",
        "design",
        "dev",
        "dhl",
        "diamonds",
        "diet",
        "digital",
        "direct",
        "directory",
        "discount",
        "discover",
        "dish",
        "diy",
        "dj",
        "dk",
        "dm",
        "dnp",
        "do",
        "docs",
        "doctor",
        "dodge",
        "dog",
        "doha",
        "domains",
        "doosan",
        "dot",
        "download",
        "drive",
        "dtv",
        "dubai",
        "duck",
        "dunlop",
        "duns",
        "dupont",
        "durban",
        "dvag",
        "dvr",
        "dz",
        "earth",
        "eat",
        "ec",
        "eco",
        "edeka",
        "edu",
        "education",
        "ee",
        "eg",
        "email",
        "emerck",
        "energy",
        "engineer",
        "engineering",
        "enterprises",
        "epost",
        "epson",
        "equipment",
        "er",
        "ericsson",
        "erni",
        "es",
        "esq",
        "estate",
        "esurance",
        "et",
        "etisalat",
        "eu",
        "eurovision",
        "eus",
        "events",
        "everbank",
        "exchange",
        "expert",
        "exposed",
        "express",
        "extraspace",
        "fage",
        "fail",
        "fairwinds",
        "faith",
        "family",
        "fan",
        "fans",
        "farm",
        "farmers",
        "fashion",
        "fast",
        "fedex",
        "feedback",
        "ferrari",
        "ferrero",
        "fi",
        "fiat",
        "fidelity",
        "fido",
        "film",
        "final",
        "finance",
        "financial",
        "fire",
        "firestone",
        "firmdale",
        "fish",
        "fishing",
        "fit",
        "fitness",
        "fj",
        "fk",
        "flickr",
        "flights",
        "flir",
        "florist",
        "flowers",
        "flsmidth",
        "fly",
        "fm",
        "fo",
        "foo",
        "food",
        "foodnetwork",
        "football",
        "ford",
        "forex",
        "forsale",
        "forum",
        "foundation",
        "fox",
        "fr",
        "free",
        "fresenius",
        "frl",
        "frogans",
        "frontdoor",
        "frontier",
        "ftr",
        "fujitsu",
        "fujixerox",
        "fun",
        "fund",
        "furniture",
        "futbol",
        "fyi",
        "ga",
        "gal",
        "gallery",
        "gallo",
        "gallup",
        "game",
        "games",
        "gap",
        "garden",
        "gay",
        "gb",
        "gbiz",
        "gd",
        "gdn",
        "ge",
        "gea",
        "gent",
        "genting",
        "george",
        "gf",
        "gg",
        "ggee",
        "gh",
        "gi",
        "gift",
        "gifts",
        "gives",
        "giving",
        "gl",
        "glade",
        "glass",
        "gle",
        "global",
        "globo",
        "gm",
        "gmail",
        "gmbh",
        "gmo",
        "gmx",
        "gn",
        "godaddy",
        "gold",
        "goldpoint",
        "golf",
        "goo",
        "goodhands",
        "goodyear",
        "goog",
        "google",
        "gop",
        "got",
        "gov",
        "gp",
        "gq",
        "gr",
        "grainger",
        "graphics",
        "gratis",
        "green",
        "gripe",
        "grocery",
        "group",
        "gs",
        "gt",
        "gu",
        "guardian",
        "gucci",
        "guge",
        "guide",
        "guitars",
        "guru",
        "gw",
        "gy",
        "hair",
        "hamburg",
        "hangout",
        "haus",
        "hbo",
        "hdfc",
        "hdfcbank",
        "health",
        "healthcare",
        "help",
        "helsinki",
        "here",
        "hermes",
        "hgtv",
        "hiphop",
        "hisamitsu",
        "hitachi",
        "hiv",
        "hk",
        "hkt",
        "hm",
        "hn",
        "hockey",
        "holdings",
        "holiday",
        "homedepot",
        "homegoods",
        "homes",
        "homesense",
        "honda",
        "honeywell",
        "horse",
        "hospital",
        "host",
        "hosting",
        "hot",
        "hoteles",
        "hotels",
        "hotmail",
        "house",
        "how",
        "hr",
        "hsbc",
        "ht",
        "htc",
        "hu",
        "hughes",
        "hyatt",
        "hyundai",
        "ibm",
        "icbc",
        "ice",
        "icu",
        "id",
        "ie",
        "ieee",
        "ifm",
        "iinet",
        "ikano",
        "il",
        "im",
        "imamat",
        "imdb",
        "immo",
        "immobilien",
        "in",
        "inc",
        "industries",
        "infiniti",
        "info",
        "ing",
        "ink",
        "institute",
        "insurance",
        "insure",
        "int",
        "intel",
        "international",
        "intuit",
        "investments",
        "io",
        "ipiranga",
        "iq",
        "ir",
        "irish",
        "is",
        "iselect",
        "ismaili",
        "ist",
        "istanbul",
        "it",
        "itau",
        "itv",
        "iveco",
        "iwc",
        "jaguar",
        "java",
        "jcb",
        "jcp",
        "je",
        "jeep",
        "jetzt",
        "jewelry",
        "jio",
        "jlc",
        "jll",
        "jm",
        "jmp",
        "jnj",
        "jo",
        "jobs",
        "joburg",
        "jot",
        "joy",
        "jp",
        "jpmorgan",
        "jprs",
        "juegos",
        "juniper",
        "kaufen",
        "kddi",
        "ke",
        "kerryhotels",
        "kerrylogistics",
        "kerryproperties",
        "kfh",
        "kg",
        "kh",
        "ki",
        "kia",
        "kim",
        "kinder",
        "kindle",
        "kitchen",
        "kiwi",
        "km",
        "kn",
        "koeln",
        "komatsu",
        "kosher",
        "kp",
        "kpmg",
        "kpn",
        "kr",
        "krd",
        "kred",
        "kuokgroup",
        "kw",
        "ky",
        "kyoto",
        "kz",
        "la",
        "lacaixa",
        "ladbrokes",
        "lamborghini",
        "lamer",
        "lancaster",
        "lancia",
        "lancome",
        "land",
        "landrover",
        "lanxess",
        "lasalle",
        "lat",
        "latino",
        "latrobe",
        "law",
        "lawyer",
        "lb",
        "lc",
        "lds",
        "lease",
        "leclerc",
        "lefrak",
        "legal",
        "lego",
        "lexus",
        "lgbt",
        "li",
        "liaison",
        "lidl",
        "life",
        "lifeinsurance",
        "lifestyle",
        "lighting",
        "like",
        "lilly",
        "limited",
        "limo",
        "lincoln",
        "linde",
        "link",
        "lipsy",
        "live",
        "living",
        "lixil",
        "lk",
        "llc",
        "llp",
        "loan",
        "loans",
        "locker",
        "locus",
        "loft",
        "lol",
        "london",
        "lotte",
        "lotto",
        "love",
        "lpl",
        "lplfinancial",
        "lr",
        "ls",
        "lt",
        "ltd",
        "ltda",
        "lu",
        "lundbeck",
        "lupin",
        "luxe",
        "luxury",
        "lv",
        "ly",
        "ma",
        "macys",
        "madrid",
        "maif",
        "maison",
        "makeup",
        "man",
        "management",
        "mango",
        "map",
        "market",
        "marketing",
        "markets",
        "marriott",
        "marshalls",
        "maserati",
        "mattel",
        "mba",
        "mc",
        "mckinsey",
        "md",
        "me",
        "med",
        "media",
        "meet",
        "melbourne",
        "meme",
        "memorial",
        "men",
        "menu",
        "meo",
        "merckmsd",
        "metlife",
        "mg",
        "mh",
        "miami",
        "microsoft",
        "mil",
        "mini",
        "mint",
        "mit",
        "mitsubishi",
        "mk",
        "ml",
        "mlb",
        "mls",
        "mm",
        "mma",
        "mn",
        "mo",
        "mobi",
        "mobile",
        "mobily",
        "moda",
        "moe",
        "moi",
        "mom",
        "monash",
        "money",
        "monster",
        "montblanc",
        "mopar",
        "mormon",
        "mortgage",
        "moscow",
        "moto",
        "motorcycles",
        "mov",
        "movie",
        "movistar",
        "mp",
        "mq",
        "mr",
        "ms",
        "msd",
        "mt",
        "mtn",
        "mtpc",
        "mtr",
        "mu",
        "museum",
        "mutual",
        "mutuelle",
        "mv",
        "mw",
        "mx",
        "my",
        "mz",
        "na",
        "nab",
        "nadex",
        "nagoya",
        "name",
        "nationwide",
        "natura",
        "navy",
        "nba",
        "nc",
        "ne",
        "nec",
        "net",
        "netbank",
        "netflix",
        "network",
        "neustar",
        "new",
        "newholland",
        "news",
        "next",
        "nextdirect",
        "nexus",
        "nf",
        "nfl",
        "ng",
        "ngo",
        "nhk",
        "ni",
        "nico",
        "nike",
        "nikon",
        "ninja",
        "nissan",
        "nissay",
        "nl",
        "no",
        "nokia",
        "northwesternmutual",
        "norton",
        "now",
        "nowruz",
        "nowtv",
        "np",
        "nr",
        "nra",
        "nrw",
        "ntt",
        "nu",
        "nyc",
        "nz",
        "obi",
        "observer",
        "off",
        "office",
        "okinawa",
        "olayan",
        "olayangroup",
        "oldnavy",
        "ollo",
        "om",
        "omega",
        "one",
        "ong",
        "onl",
        "online",
        "onyourside",
        "ooo",
        "open",
        "oracle",
        "orange",
        "org",
        "organic",
        "orientexpress",
        "origins",
        "osaka",
        "otsuka",
        "ott",
        "ovh",
        "pa",
        "page",
        "pamperedchef",
        "panasonic",
        "panerai",
        "paris",
        "pars",
        "partners",
        "parts",
        "party",
        "passagens",
        "pay",
        "pccw",
        "pe",
        "pet",
        "pf",
        "pfizer",
        "pg",
        "ph",
        "pharmacy",
        "phd",
        "philips",
        "phone",
        "photo",
        "photography",
        "photos",
        "physio",
        "piaget",
        "pics",
        "pictet",
        "pictures",
        "pid",
        "pin",
        "ping",
        "pink",
        "pioneer",
        "pizza",
        "pk",
        "pl",
        "place",
        "play",
        "playstation",
        "plumbing",
        "plus",
        "pm",
        "pn",
        "pnc",
        "pohl",
        "poker",
        "politie",
        "porn",
        "post",
        "pr",
        "pramerica",
        "praxi",
        "press",
        "prime",
        "pro",
        "prod",
        "productions",
        "prof",
        "progressive",
        "promo",
        "properties",
        "property",
        "protection",
        "pru",
        "prudential",
        "ps",
        "pt",
        "pub",
        "pw",
        "pwc",
        "py",
        "qa",
        "qpon",
        "quebec",
        "quest",
        "qvc",
        "racing",
        "radio",
        "raid",
        "re",
        "read",
        "realestate",
        "realtor",
        "realty",
        "recipes",
        "red",
        "redstone",
        "redumbrella",
        "rehab",
        "reise",
        "reisen",
        "reit",
        "reliance",
        "ren",
        "rent",
        "rentals",
        "repair",
        "report",
        "republican",
        "rest",
        "restaurant",
        "review",
        "reviews",
        "rexroth",
        "rich",
        "richardli",
        "ricoh",
        "rightathome",
        "ril",
        "rio",
        "rip",
        "rmit",
        "ro",
        "rocher",
        "rocks",
        "rodeo",
        "rogers",
        "room",
        "rs",
        "rsvp",
        "ru",
        "rugby",
        "ruhr",
        "run",
        "rw",
        "rwe",
        "ryukyu",
        "sa",
        "saarland",
        "safe",
        "safety",
        "sakura",
        "sale",
        "salon",
        "samsclub",
        "samsung",
        "sandvik",
        "sandvikcoromant",
        "sanofi",
        "sap",
        "sapo",
        "sarl",
        "sas",
        "save",
        "saxo",
        "sb",
        "sbi",
        "sbs",
        "sc",
        "sca",
        "scb",
        "schaeffler",
        "schmidt",
        "scholarships",
        "school",
        "schule",
        "schwarz",
        "science",
        "scjohnson",
        "scor",
        "scot",
        "sd",
        "se",
        "search",
        "seat",
        "secure",
        "security",
        "seek",
        "select",
        "sener",
        "services",
        "ses",
        "seven",
        "sew",
        "sex",
        "sexy",
        "sfr",
        "sg",
        "sh",
        "shangrila",
        "sharp",
        "shaw",
        "shell",
        "shia",
        "shiksha",
        "shoes",
        "shop",
        "shopping",
        "shouji",
        "show",
        "showtime",
        "shriram",
        "si",
        "silk",
        "sina",
        "singles",
        "site",
        "sj",
        "sk",
        "ski",
        "skin",
        "sky",
        "skype",
        "sl",
        "sling",
        "sm",
        "smart",
        "smile",
        "sn",
        "sncf",
        "so",
        "soccer",
        "social",
        "softbank",
        "software",
        "sohu",
        "solar",
        "solutions",
        "song",
        "sony",
        "soy",
        "spa",
        "space",
        "spiegel",
        "sport",
        "spot",
        "spreadbetting",
        "sr",
        "srl",
        "srt",
        "ss",
        "st",
        "stada",
        "staples",
        "star",
        "starhub",
        "statebank",
        "statefarm",
        "statoil",
        "stc",
        "stcgroup",
        "stockholm",
        "storage",
        "store",
        "stream",
        "studio",
        "study",
        "style",
        "su",
        "sucks",
        "supplies",
        "supply",
        "support",
        "surf",
        "surgery",
        "suzuki",
        "sv",
        "swatch",
        "swiftcover",
        "swiss",
        "sx",
        "sy",
        "sydney",
        "symantec",
        "systems",
        "sz",
        "tab",
        "taipei",
        "talk",
        "taobao",
        "target",
        "tatamotors",
        "tatar",
        "tattoo",
        "tax",
        "taxi",
        "tc",
        "tci",
        "td",
        "tdk",
        "team",
        "tech",
        "technology",
        "tel",
        "telecity",
        "telefonica",
        "temasek",
        "tennis",
        "teva",
        "tf",
        "tg",
        "th",
        "thd",
        "theater",
        "theatre",
        "tiaa",
        "tickets",
        "tienda",
        "tiffany",
        "tips",
        "tires",
        "tirol",
        "tj",
        "tjmaxx",
        "tjx",
        "tk",
        "tkmaxx",
        "tl",
        "tm",
        "tmall",
        "tn",
        "to",
        "today",
        "tokyo",
        "tools",
        "top",
        "toray",
        "toshiba",
        "total",
        "tours",
        "town",
        "toyota",
        "toys",
        "tr",
        "trade",
        "trading",
        "training",
        "travel",
        "travelchannel",
        "travelers",
        "travelersinsurance",
        "trust",
        "trv",
        "tt",
        "tube",
        "tui",
        "tunes",
        "tushu",
        "tv",
        "tvs",
        "tw",
        "tz",
        "ua",
        "ubank",
        "ubs",
        "uconnect",
        "ug",
        "uk",
        "unicom",
        "university",
        "uno",
        "uol",
        "ups",
        "us",
        "uy",
        "uz",
        "va",
        "vacations",
        "vana",
        "vanguard",
        "vc",
        "ve",
        "vegas",
        "ventures",
        "verisign",
        "versicherung",
        "vet",
        "vg",
        "vi",
        "viajes",
        "video",
        "vig",
        "viking",
        "villas",
        "vin",
        "vip",
        "virgin",
        "visa",
        "vision",
        "vista",
        "vistaprint",
        "viva",
        "vivo",
        "vlaanderen",
        "vn",
        "vodka",
        "volkswagen",
        "volvo",
        "vote",
        "voting",
        "voto",
        "voyage",
        "vu",
        "vuelos",
        "wales",
        "walmart",
        "walter",
        "wang",
        "wanggou",
        "warman",
        "watch",
        "watches",
        "weather",
        "weatherchannel",
        "webcam",
        "weber",
        "website",
        "wed",
        "wedding",
        "weibo",
        "weir",
        "wf",
        "whoswho",
        "wien",
        "wiki",
        "williamhill",
        "win",
        "windows",
        "wine",
        "winners",
        "wme",
        "wolterskluwer",
        "woodside",
        "work",
        "works",
        "world",
        "wow",
        "ws",
        "wtc",
        "wtf",
        "xbox",
        "xerox",
        "xfinity",
        "xihuan",
        "xin",
        "xn--1ck2e1b",
        "xn--1qqw23a",
        "xn--2scrj9c",
        "xn--3bst00m",
        "xn--3ds443g",
        "xn--3e0b707e",
        "xn--3hcrj9c",
        "xn--3oq18vl8pn36a",
        "xn--3pxu8k",
        "xn--4dbrk0ce",
        "xn--4gbrim",
        "xn--5su34j936bgsg",
        "xn--5tzm5g",
        "xn--6frz82g",
        "xn--6qq986b3xl",
        "xn--8y0a063a",
        "xn--9dbq2a",
        "xn--9et52u",
        "xn--9krt00a",
        "xn--11b4c3d",
        "xn--30rr7y",
        "xn--42c2d9a",
        "xn--45br5cyl",
        "xn--45brj9c",
        "xn--45q11c",
        "xn--54b7fta0cc",
        "xn--55qw42g",
        "xn--55qx5d",
        "xn--80adxhks",
        "xn--80ao21a",
        "xn--80aqecdr1a",
        "xn--80asehdb",
        "xn--80aswg",
        "xn--90a3ac",
        "xn--90ae",
        "xn--90ais",
        "xn--b4w605ferd",
        "xn--bck1b9a5dre4c",
        "xn--c1avg",
        "xn--c2br7g",
        "xn--cck2b3b",
        "xn--cckwcxetd",
        "xn--cg4bki",
        "xn--clchc0ea0b2g2a9gcd",
        "xn--czr694b",
        "xn--czrs0t",
        "xn--czru2d",
        "xn--d1acj3b",
        "xn--d1alf",
        "xn--e1a4c",
        "xn--eckvdtc9d",
        "xn--efvy88h",
        "xn--estv75g",
        "xn--fct429k",
        "xn--fhbei",
        "xn--fiq64b",
        "xn--fiq228c5hs",
        "xn--fiqs8s",
        "xn--fiqz9s",
        "xn--fjq720a",
        "xn--flw351e",
        "xn--fpcrj9c3d",
        "xn--fzc2c9e2c",
        "xn--fzys8d69uvgm",
        "xn--g2xx48c",
        "xn--gckr3f0f",
        "xn--gecrj9c",
        "xn--gk3at1e",
        "xn--h2breg3eve",
        "xn--h2brj9c",
        "xn--h2brj9c8c",
        "xn--hxt814e",
        "xn--i1b6b1a6a2e",
        "xn--imr513n",
        "xn--io0a7i",
        "xn--j1aef",
        "xn--j1amh",
        "xn--j6w193g",
        "xn--jlq61u9w7b",
        "xn--jlq480n2rg",
        "xn--jvr189m",
        "xn--kcrx77d1x4a",
        "xn--kprw13d",
        "xn--kpry57d",
        "xn--kpu716f",
        "xn--kput3i",
        "xn--l1acc",
        "xn--lgbbat1ad8j",
        "xn--mgb9awbf",
        "xn--mgba3a3ejt",
        "xn--mgba3a4f16a",
        "xn--mgba7c0bbn0a",
        "xn--mgbaakc7dvf",
        "xn--mgbaam7a8h",
        "xn--mgbab2bd",
        "xn--mgbah1a3hjkrd",
        "xn--mgbai9azgqp6j",
        "xn--mgbayh7gpa",
        "xn--mgbb9fbpob",
        "xn--mgbbh1a",
        "xn--mgbbh1a71e",
        "xn--mgbc0a9azcg",
        "xn--mgbca7dzdo",
        "xn--mgbcpq6gpa1a",
        "xn--mgberp4a5d4ar",
        "xn--mgbgu82a",
        "xn--mgbi4ecexp",
        "xn--mgbpl2fh",
        "xn--mgbt3dhd",
        "xn--mgbtx2b",
        "xn--mgbx4cd0ab",
        "xn--mix891f",
        "xn--mk1bu44c",
        "xn--mxtq1m",
        "xn--ngbc5azd",
        "xn--ngbe9e0a",
        "xn--ngbrx",
        "xn--node",
        "xn--nqv7f",
        "xn--nqv7fs00ema",
        "xn--nyqy26a",
        "xn--o3cw4h",
        "xn--ogbpf8fl",
        "xn--otu796d",
        "xn--p1acf",
        "xn--p1ai",
        "xn--pbt977c",
        "xn--pgbs0dh",
        "xn--pssy2u",
        "xn--q7ce6a",
        "xn--q9jyb4c",
        "xn--qcka1pmc",
        "xn--qxa6a",
        "xn--qxam",
        "xn--rhqv96g",
        "xn--rovu88b",
        "xn--rvc1e0am3e",
        "xn--s9brj9c",
        "xn--ses554g",
        "xn--t60b56a",
        "xn--tckwe",
        "xn--tiq49xqyj",
        "xn--unup4y",
        "xn--vermgensberater-ctb",
        "xn--vermgensberatung-pwb",
        "xn--vhquv",
        "xn--vuq861b",
        "xn--w4r85el8fhu5dnra",
        "xn--w4rs40l",
        "xn--wgbh1c",
        "xn--wgbl6a",
        "xn--xhq521b",
        "xn--xkc2al3hye2a",
        "xn--xkc2dl3a5ee0h",
        "xn--y9a3aq",
        "xn--yfro4i67o",
        "xn--ygbi2ammx",
        "xn--zfr164b",
        "xperia",
        "xxx",
        "xyz",
        "yachts",
        "yahoo",
        "yamaxun",
        "yandex",
        "ye",
        "yodobashi",
        "yoga",
        "yokohama",
        "you",
        "youtube",
        "yt",
        "yun",
        "za",
        "zappos",
        "zara",
        "zero",
        "zip",
        "zippo",
        "zm",
        "zone",
        "zuerich",
        "zw",
    ];
}
exports.getTLDs = getTLDs;
const _getTLDRegExpString = () => {
    return getTLDs().join("|");
};
exports.getTLDRegExpString = memoize(_getTLDRegExpString);

},{"memoizee":74}],66:[function(require,module,exports){
module.exports = isPromise;
module.exports.default = isPromise;

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

},{}],67:[function(require,module,exports){
'use strict';

var toPosInt = require('es5-ext/number/to-pos-integer')

  , create = Object.create, hasOwnProperty = Object.prototype.hasOwnProperty;

module.exports = function (limit) {
	var size = 0, base = 1, queue = create(null), map = create(null), index = 0, del;
	limit = toPosInt(limit);
	return {
		hit: function (id) {
			var oldIndex = map[id], nuIndex = ++index;
			queue[nuIndex] = id;
			map[id] = nuIndex;
			if (!oldIndex) {
				++size;
				if (size <= limit) return;
				id = queue[base];
				del(id);
				return id;
			}
			delete queue[oldIndex];
			if (base !== oldIndex) return;
			while (!hasOwnProperty.call(queue, ++base)) continue; //jslint: skip
		},
		delete: del = function (id) {
			var oldIndex = map[id];
			if (!oldIndex) return;
			delete queue[oldIndex];
			delete map[id];
			--size;
			if (base !== oldIndex) return;
			if (!size) {
				index = 0;
				base = 1;
				return;
			}
			while (!hasOwnProperty.call(queue, ++base)) continue; //jslint: skip
		},
		clear: function () {
			size = 0;
			base = 1;
			queue = create(null);
			map = create(null);
			index = 0;
		}
	};
};

},{"es5-ext/number/to-pos-integer":21}],68:[function(require,module,exports){
/* eslint consistent-this: 0, no-shadow:0, no-eq-null: 0, eqeqeq: 0, no-unused-vars: 0 */

// Support for asynchronous functions

"use strict";

var aFrom        = require("es5-ext/array/from")
  , objectMap    = require("es5-ext/object/map")
  , mixin        = require("es5-ext/object/mixin")
  , defineLength = require("es5-ext/function/_define-length")
  , nextTick     = require("next-tick");

var slice = Array.prototype.slice, apply = Function.prototype.apply, create = Object.create;

require("../lib/registered-extensions").async = function (tbi, conf) {
	var waiting = create(null)
	  , cache = create(null)
	  , base = conf.memoized
	  , original = conf.original
	  , currentCallback
	  , currentContext
	  , currentArgs;

	// Initial
	conf.memoized = defineLength(function (arg) {
		var args = arguments, last = args[args.length - 1];
		if (typeof last === "function") {
			currentCallback = last;
			args = slice.call(args, 0, -1);
		}
		return base.apply(currentContext = this, currentArgs = args);
	}, base);
	try { mixin(conf.memoized, base); }
	catch (ignore) {}

	// From cache (sync)
	conf.on("get", function (id) {
		var cb, context, args;
		if (!currentCallback) return;

		// Unresolved
		if (waiting[id]) {
			if (typeof waiting[id] === "function") waiting[id] = [waiting[id], currentCallback];
			else waiting[id].push(currentCallback);
			currentCallback = null;
			return;
		}

		// Resolved, assure next tick invocation
		cb = currentCallback;
		context = currentContext;
		args = currentArgs;
		currentCallback = currentContext = currentArgs = null;
		nextTick(function () {
			var data;
			if (hasOwnProperty.call(cache, id)) {
				data = cache[id];
				conf.emit("getasync", id, args, context);
				apply.call(cb, data.context, data.args);
			} else {
				// Purged in a meantime, we shouldn't rely on cached value, recall
				currentCallback = cb;
				currentContext = context;
				currentArgs = args;
				base.apply(context, args);
			}
		});
	});

	// Not from cache
	conf.original = function () {
		var args, cb, origCb, result;
		if (!currentCallback) return apply.call(original, this, arguments);
		args = aFrom(arguments);
		cb = function self(err) {
			var cb, args, id = self.id;
			if (id == null) {
				// Shouldn't happen, means async callback was called sync way
				nextTick(apply.bind(self, this, arguments));
				return undefined;
			}
			delete self.id;
			cb = waiting[id];
			delete waiting[id];
			if (!cb) {
				// Already processed,
				// outcome of race condition: asyncFn(1, cb), asyncFn.clear(), asyncFn(1, cb)
				return undefined;
			}
			args = aFrom(arguments);
			if (conf.has(id)) {
				if (err) {
					conf.delete(id);
				} else {
					cache[id] = { context: this, args: args };
					conf.emit("setasync", id, typeof cb === "function" ? 1 : cb.length);
				}
			}
			if (typeof cb === "function") {
				result = apply.call(cb, this, args);
			} else {
				cb.forEach(function (cb) { result = apply.call(cb, this, args); }, this);
			}
			return result;
		};
		origCb = currentCallback;
		currentCallback = currentContext = currentArgs = null;
		args.push(cb);
		result = apply.call(original, this, args);
		cb.cb = origCb;
		currentCallback = cb;
		return result;
	};

	// After not from cache call
	conf.on("set", function (id) {
		if (!currentCallback) {
			conf.delete(id);
			return;
		}
		if (waiting[id]) {
			// Race condition: asyncFn(1, cb), asyncFn.clear(), asyncFn(1, cb)
			if (typeof waiting[id] === "function") waiting[id] = [waiting[id], currentCallback.cb];
			else waiting[id].push(currentCallback.cb);
		} else {
			waiting[id] = currentCallback.cb;
		}
		delete currentCallback.cb;
		currentCallback.id = id;
		currentCallback = null;
	});

	// On delete
	conf.on("delete", function (id) {
		var result;
		// If false, we don't have value yet, so we assume that intention is not
		// to memoize this call. After value is obtained we don't cache it but
		// gracefully pass to callback
		if (hasOwnProperty.call(waiting, id)) return;
		if (!cache[id]) return;
		result = cache[id];
		delete cache[id];
		conf.emit("deleteasync", id, slice.call(result.args, 1));
	});

	// On clear
	conf.on("clear", function () {
		var oldCache = cache;
		cache = create(null);
		conf.emit(
			"clearasync", objectMap(oldCache, function (data) { return slice.call(data.args, 1); })
		);
	});
};

},{"../lib/registered-extensions":76,"es5-ext/array/from":5,"es5-ext/function/_define-length":10,"es5-ext/object/map":33,"es5-ext/object/mixin":34,"next-tick":86}],69:[function(require,module,exports){
// Call dispose callback on each cache purge

"use strict";

var callable   = require("es5-ext/object/valid-callable")
  , forEach    = require("es5-ext/object/for-each")
  , extensions = require("../lib/registered-extensions")

  , apply = Function.prototype.apply;

extensions.dispose = function (dispose, conf, options) {
	var del;
	callable(dispose);
	if ((options.async && extensions.async) || (options.promise && extensions.promise)) {
		conf.on("deleteasync", del = function (id, resultArray) {
			apply.call(dispose, null, resultArray);
		});
		conf.on("clearasync", function (cache) {
			forEach(cache, function (result, id) {
 del(id, result);
});
		});
		return;
	}
	conf.on("delete", del = function (id, result) {
 dispose(result);
});
	conf.on("clear", function (cache) {
		forEach(cache, function (result, id) {
 del(id, result);
});
	});
};

},{"../lib/registered-extensions":76,"es5-ext/object/for-each":26,"es5-ext/object/valid-callable":37}],70:[function(require,module,exports){
/* eslint consistent-this: 0 */

// Timeout cached values

"use strict";

var aFrom      = require("es5-ext/array/from")
  , forEach    = require("es5-ext/object/for-each")
  , nextTick   = require("next-tick")
  , isPromise  = require("is-promise")
  , timeout    = require("timers-ext/valid-timeout")
  , extensions = require("../lib/registered-extensions");

var noop = Function.prototype, max = Math.max, min = Math.min, create = Object.create;

extensions.maxAge = function (maxAge, conf, options) {
	var timeouts, postfix, preFetchAge, preFetchTimeouts;

	maxAge = timeout(maxAge);
	if (!maxAge) return;

	timeouts = create(null);
	postfix =
		(options.async && extensions.async) || (options.promise && extensions.promise)
			? "async"
			: "";
	conf.on("set" + postfix, function (id) {
		timeouts[id] = setTimeout(function () { conf.delete(id); }, maxAge);
		if (typeof timeouts[id].unref === "function") timeouts[id].unref();
		if (!preFetchTimeouts) return;
		if (preFetchTimeouts[id]) {
			if (preFetchTimeouts[id] !== "nextTick") clearTimeout(preFetchTimeouts[id]);
		}
		preFetchTimeouts[id] = setTimeout(function () {
			delete preFetchTimeouts[id];
		}, preFetchAge);
		if (typeof preFetchTimeouts[id].unref === "function") preFetchTimeouts[id].unref();
	});
	conf.on("delete" + postfix, function (id) {
		clearTimeout(timeouts[id]);
		delete timeouts[id];
		if (!preFetchTimeouts) return;
		if (preFetchTimeouts[id] !== "nextTick") clearTimeout(preFetchTimeouts[id]);
		delete preFetchTimeouts[id];
	});

	if (options.preFetch) {
		if (options.preFetch === true || isNaN(options.preFetch)) {
			preFetchAge = 0.333;
		} else {
			preFetchAge = max(min(Number(options.preFetch), 1), 0);
		}
		if (preFetchAge) {
			preFetchTimeouts = {};
			preFetchAge = (1 - preFetchAge) * maxAge;
			conf.on("get" + postfix, function (id, args, context) {
				if (!preFetchTimeouts[id]) {
					preFetchTimeouts[id] = "nextTick";
					nextTick(function () {
						var result;
						if (preFetchTimeouts[id] !== "nextTick") return;
						delete preFetchTimeouts[id];
						conf.delete(id);
						if (options.async) {
							args = aFrom(args);
							args.push(noop);
						}
						result = conf.memoized.apply(context, args);
						if (options.promise) {
							// Supress eventual error warnings
							if (isPromise(result)) {
								if (typeof result.done === "function") result.done(noop, noop);
								else result.then(noop, noop);
							}
						}
					});
				}
			});
		}
	}

	conf.on("clear" + postfix, function () {
		forEach(timeouts, function (id) { clearTimeout(id); });
		timeouts = {};
		if (preFetchTimeouts) {
			forEach(preFetchTimeouts, function (id) { if (id !== "nextTick") clearTimeout(id); });
			preFetchTimeouts = {};
		}
	});
};

},{"../lib/registered-extensions":76,"es5-ext/array/from":5,"es5-ext/object/for-each":26,"is-promise":66,"next-tick":86,"timers-ext/valid-timeout":88}],71:[function(require,module,exports){
// Limit cache size, LRU (least recently used) algorithm.

"use strict";

var toPosInteger = require("es5-ext/number/to-pos-integer")
  , lruQueue     = require("lru-queue")
  , extensions   = require("../lib/registered-extensions");

extensions.max = function (max, conf, options) {
	var postfix, queue, hit;

	max = toPosInteger(max);
	if (!max) return;

	queue = lruQueue(max);
	postfix = (options.async && extensions.async) || (options.promise && extensions.promise)
		? "async" : "";

	conf.on("set" + postfix, hit = function (id) {
		id = queue.hit(id);
		if (id === undefined) return;
		conf.delete(id);
	});
	conf.on("get" + postfix, hit);
	conf.on("delete" + postfix, queue.delete);
	conf.on("clear" + postfix, queue.clear);
};

},{"../lib/registered-extensions":76,"es5-ext/number/to-pos-integer":21,"lru-queue":67}],72:[function(require,module,exports){
/* eslint max-statements: 0 */

// Support for functions returning promise

"use strict";

var objectMap     = require("es5-ext/object/map")
  , primitiveSet  = require("es5-ext/object/primitive-set")
  , ensureString  = require("es5-ext/object/validate-stringifiable-value")
  , toShortString = require("es5-ext/to-short-string-representation")
  , isPromise     = require("is-promise")
  , nextTick      = require("next-tick");

var create = Object.create
  , supportedModes = primitiveSet("then", "then:finally", "done", "done:finally");

require("../lib/registered-extensions").promise = function (mode, conf) {
	var waiting = create(null), cache = create(null), promises = create(null);

	if (mode === true) {
		mode = null;
	} else {
		mode = ensureString(mode);
		if (!supportedModes[mode]) {
			throw new TypeError("'" + toShortString(mode) + "' is not valid promise mode");
		}
	}

	// After not from cache call
	conf.on("set", function (id, ignore, promise) {
		var isFailed = false;

		if (!isPromise(promise)) {
			// Non promise result
			cache[id] = promise;
			conf.emit("setasync", id, 1);
			return;
		}
		waiting[id] = 1;
		promises[id] = promise;
		var onSuccess = function (result) {
			var count = waiting[id];
			if (isFailed) {
				throw new Error(
					"Memoizee error: Detected unordered then|done & finally resolution, which " +
						"in turn makes proper detection of success/failure impossible (when in " +
						"'done:finally' mode)\n" +
						"Consider to rely on 'then' or 'done' mode instead."
				);
			}
			if (!count) return; // Deleted from cache before resolved
			delete waiting[id];
			cache[id] = result;
			conf.emit("setasync", id, count);
		};
		var onFailure = function () {
			isFailed = true;
			if (!waiting[id]) return; // Deleted from cache (or succeed in case of finally)
			delete waiting[id];
			delete promises[id];
			conf.delete(id);
		};

		var resolvedMode = mode;
		if (!resolvedMode) resolvedMode = "then";

		if (resolvedMode === "then") {
			var nextTickFailure = function () { nextTick(onFailure); };
			// Eventual finally needs to be attached to non rejected promise
			// (so we not force propagation of unhandled rejection)
			promise = promise.then(function (result) {
				nextTick(onSuccess.bind(this, result));
			}, nextTickFailure);
			// If `finally` is a function we attach to it to remove cancelled promises.
			if (typeof promise.finally === "function") {
				promise.finally(nextTickFailure);
			}
		} else if (resolvedMode === "done") {
			// Not recommended, as it may mute any eventual "Unhandled error" events
			if (typeof promise.done !== "function") {
				throw new Error(
					"Memoizee error: Retrieved promise does not implement 'done' " +
						"in 'done' mode"
				);
			}
			promise.done(onSuccess, onFailure);
		} else if (resolvedMode === "done:finally") {
			// The only mode with no side effects assuming library does not throw unconditionally
			// for rejected promises.
			if (typeof promise.done !== "function") {
				throw new Error(
					"Memoizee error: Retrieved promise does not implement 'done' " +
						"in 'done:finally' mode"
				);
			}
			if (typeof promise.finally !== "function") {
				throw new Error(
					"Memoizee error: Retrieved promise does not implement 'finally' " +
						"in 'done:finally' mode"
				);
			}
			promise.done(onSuccess);
			promise.finally(onFailure);
		}
	});

	// From cache (sync)
	conf.on("get", function (id, args, context) {
		var promise;
		if (waiting[id]) {
			++waiting[id]; // Still waiting
			return;
		}
		promise = promises[id];
		var emit = function () { conf.emit("getasync", id, args, context); };
		if (isPromise(promise)) {
			if (typeof promise.done === "function") promise.done(emit);
			else {
				promise.then(function () { nextTick(emit); });
			}
		} else {
			emit();
		}
	});

	// On delete
	conf.on("delete", function (id) {
		delete promises[id];
		if (waiting[id]) {
			delete waiting[id];
			return; // Not yet resolved
		}
		if (!hasOwnProperty.call(cache, id)) return;
		var result = cache[id];
		delete cache[id];
		conf.emit("deleteasync", id, [result]);
	});

	// On clear
	conf.on("clear", function () {
		var oldCache = cache;
		cache = create(null);
		waiting = create(null);
		promises = create(null);
		conf.emit("clearasync", objectMap(oldCache, function (data) { return [data]; }));
	});
};

},{"../lib/registered-extensions":76,"es5-ext/object/map":33,"es5-ext/object/primitive-set":36,"es5-ext/object/validate-stringifiable-value":39,"es5-ext/to-short-string-representation":46,"is-promise":66,"next-tick":86}],73:[function(require,module,exports){
// Reference counter, useful for garbage collector like functionality

"use strict";

var d          = require("d")
  , extensions = require("../lib/registered-extensions")

  , create = Object.create, defineProperties = Object.defineProperties;

extensions.refCounter = function (ignore, conf, options) {
	var cache, postfix;

	cache = create(null);
	postfix = (options.async && extensions.async) || (options.promise && extensions.promise)
		? "async" : "";

	conf.on("set" + postfix, function (id, length) {
 cache[id] = length || 1;
});
	conf.on("get" + postfix, function (id) {
 ++cache[id];
});
	conf.on("delete" + postfix, function (id) {
 delete cache[id];
});
	conf.on("clear" + postfix, function () {
 cache = {};
});

	defineProperties(conf.memoized, {
		deleteRef: d(function () {
			var id = conf.get(arguments);
			if (id === null) return null;
			if (!cache[id]) return null;
			if (!--cache[id]) {
				conf.delete(id);
				return true;
			}
			return false;
		}),
		getRefCount: d(function () {
			var id = conf.get(arguments);
			if (id === null) return 0;
			if (!cache[id]) return 0;
			return cache[id];
		})
	});
};

},{"../lib/registered-extensions":76,"d":3}],74:[function(require,module,exports){
"use strict";

var normalizeOpts = require("es5-ext/object/normalize-options")
  , resolveLength = require("./lib/resolve-length")
  , plain         = require("./plain");

module.exports = function (fn/*, options*/) {
	var options = normalizeOpts(arguments[1]), length;

	if (!options.normalizer) {
		length = options.length = resolveLength(options.length, fn.length, options.async);
		if (length !== 0) {
			if (options.primitive) {
				if (length === false) {
					options.normalizer = require("./normalizers/primitive");
				} else if (length > 1) {
					options.normalizer = require("./normalizers/get-primitive-fixed")(length);
				}
			} else if (length === false) options.normalizer = require("./normalizers/get")();
				else if (length === 1) options.normalizer = require("./normalizers/get-1")();
				else options.normalizer = require("./normalizers/get-fixed")(length);
		}
	}

	// Assure extensions
	if (options.async) require("./ext/async");
	if (options.promise) require("./ext/promise");
	if (options.dispose) require("./ext/dispose");
	if (options.maxAge) require("./ext/max-age");
	if (options.max) require("./ext/max");
	if (options.refCounter) require("./ext/ref-counter");

	return plain(fn, options);
};

},{"./ext/async":68,"./ext/dispose":69,"./ext/max":71,"./ext/max-age":70,"./ext/promise":72,"./ext/ref-counter":73,"./lib/resolve-length":77,"./normalizers/get":83,"./normalizers/get-1":80,"./normalizers/get-fixed":81,"./normalizers/get-primitive-fixed":82,"./normalizers/primitive":84,"./plain":85,"es5-ext/object/normalize-options":35}],75:[function(require,module,exports){
/* eslint no-eq-null: 0, eqeqeq: 0, no-unused-vars: 0 */

"use strict";

var customError      = require("es5-ext/error/custom")
  , defineLength     = require("es5-ext/function/_define-length")
  , d                = require("d")
  , ee               = require("event-emitter").methods
  , resolveResolve   = require("./resolve-resolve")
  , resolveNormalize = require("./resolve-normalize");

var apply = Function.prototype.apply
  , call = Function.prototype.call
  , create = Object.create
  , defineProperties = Object.defineProperties
  , on = ee.on
  , emit = ee.emit;

module.exports = function (original, length, options) {
	var cache = create(null)
	  , conf
	  , memLength
	  , get
	  , set
	  , del
	  , clear
	  , extDel
	  , extGet
	  , extHas
	  , normalizer
	  , getListeners
	  , setListeners
	  , deleteListeners
	  , memoized
	  , resolve;
	if (length !== false) memLength = length;
	else if (isNaN(original.length)) memLength = 1;
	else memLength = original.length;

	if (options.normalizer) {
		normalizer = resolveNormalize(options.normalizer);
		get = normalizer.get;
		set = normalizer.set;
		del = normalizer.delete;
		clear = normalizer.clear;
	}
	if (options.resolvers != null) resolve = resolveResolve(options.resolvers);

	if (get) {
		memoized = defineLength(function (arg) {
			var id, result, args = arguments;
			if (resolve) args = resolve(args);
			id = get(args);
			if (id !== null) {
				if (hasOwnProperty.call(cache, id)) {
					if (getListeners) conf.emit("get", id, args, this);
					return cache[id];
				}
			}
			if (args.length === 1) result = call.call(original, this, args[0]);
			else result = apply.call(original, this, args);
			if (id === null) {
				id = get(args);
				if (id !== null) throw customError("Circular invocation", "CIRCULAR_INVOCATION");
				id = set(args);
			} else if (hasOwnProperty.call(cache, id)) {
				throw customError("Circular invocation", "CIRCULAR_INVOCATION");
			}
			cache[id] = result;
			if (setListeners) conf.emit("set", id, null, result);
			return result;
		}, memLength);
	} else if (length === 0) {
		memoized = function () {
			var result;
			if (hasOwnProperty.call(cache, "data")) {
				if (getListeners) conf.emit("get", "data", arguments, this);
				return cache.data;
			}
			if (arguments.length) result = apply.call(original, this, arguments);
			else result = call.call(original, this);
			if (hasOwnProperty.call(cache, "data")) {
				throw customError("Circular invocation", "CIRCULAR_INVOCATION");
			}
			cache.data = result;
			if (setListeners) conf.emit("set", "data", null, result);
			return result;
		};
	} else {
		memoized = function (arg) {
			var result, args = arguments, id;
			if (resolve) args = resolve(arguments);
			id = String(args[0]);
			if (hasOwnProperty.call(cache, id)) {
				if (getListeners) conf.emit("get", id, args, this);
				return cache[id];
			}
			if (args.length === 1) result = call.call(original, this, args[0]);
			else result = apply.call(original, this, args);
			if (hasOwnProperty.call(cache, id)) {
				throw customError("Circular invocation", "CIRCULAR_INVOCATION");
			}
			cache[id] = result;
			if (setListeners) conf.emit("set", id, null, result);
			return result;
		};
	}
	conf = {
		original: original,
		memoized: memoized,
		profileName: options.profileName,
		get: function (args) {
			if (resolve) args = resolve(args);
			if (get) return get(args);
			return String(args[0]);
		},
		has: function (id) { return hasOwnProperty.call(cache, id); },
		delete: function (id) {
			var result;
			if (!hasOwnProperty.call(cache, id)) return;
			if (del) del(id);
			result = cache[id];
			delete cache[id];
			if (deleteListeners) conf.emit("delete", id, result);
		},
		clear: function () {
			var oldCache = cache;
			if (clear) clear();
			cache = create(null);
			conf.emit("clear", oldCache);
		},
		on: function (type, listener) {
			if (type === "get") getListeners = true;
			else if (type === "set") setListeners = true;
			else if (type === "delete") deleteListeners = true;
			return on.call(this, type, listener);
		},
		emit: emit,
		updateEnv: function () { original = conf.original; }
	};
	if (get) {
		extDel = defineLength(function (arg) {
			var id, args = arguments;
			if (resolve) args = resolve(args);
			id = get(args);
			if (id === null) return;
			conf.delete(id);
		}, memLength);
	} else if (length === 0) {
		extDel = function () { return conf.delete("data"); };
	} else {
		extDel = function (arg) {
			if (resolve) arg = resolve(arguments)[0];
			return conf.delete(arg);
		};
	}
	extGet = defineLength(function () {
		var id, args = arguments;
		if (length === 0) return cache.data;
		if (resolve) args = resolve(args);
		if (get) id = get(args);
		else id = String(args[0]);
		return cache[id];
	});
	extHas = defineLength(function () {
		var id, args = arguments;
		if (length === 0) return conf.has("data");
		if (resolve) args = resolve(args);
		if (get) id = get(args);
		else id = String(args[0]);
		if (id === null) return false;
		return conf.has(id);
	});
	defineProperties(memoized, {
		__memoized__: d(true),
		delete: d(extDel),
		clear: d(conf.clear),
		_get: d(extGet),
		_has: d(extHas)
	});
	return conf;
};

},{"./resolve-normalize":78,"./resolve-resolve":79,"d":3,"es5-ext/error/custom":9,"es5-ext/function/_define-length":10,"event-emitter":56}],76:[function(require,module,exports){
"use strict";

},{}],77:[function(require,module,exports){
"use strict";

var toPosInt = require("es5-ext/number/to-pos-integer");

module.exports = function (optsLength, fnLength, isAsync) {
	var length;
	if (isNaN(optsLength)) {
		length = fnLength;
		if (!(length >= 0)) return 1;
		if (isAsync && length) return length - 1;
		return length;
	}
	if (optsLength === false) return false;
	return toPosInt(optsLength);
};

},{"es5-ext/number/to-pos-integer":21}],78:[function(require,module,exports){
"use strict";

var callable = require("es5-ext/object/valid-callable");

module.exports = function (userNormalizer) {
	var normalizer;
	if (typeof userNormalizer === "function") return { set: userNormalizer, get: userNormalizer };
	normalizer = { get: callable(userNormalizer.get) };
	if (userNormalizer.set !== undefined) {
		normalizer.set = callable(userNormalizer.set);
		if (userNormalizer.delete) normalizer.delete = callable(userNormalizer.delete);
		if (userNormalizer.clear) normalizer.clear = callable(userNormalizer.clear);
		return normalizer;
	}
	normalizer.set = normalizer.get;
	return normalizer;
};

},{"es5-ext/object/valid-callable":37}],79:[function(require,module,exports){
"use strict";

var toArray  = require("es5-ext/array/to-array")
  , isValue  = require("es5-ext/object/is-value")
  , callable = require("es5-ext/object/valid-callable");

var slice = Array.prototype.slice, resolveArgs;

resolveArgs = function (args) {
	return this.map(function (resolve, i) {
		return resolve ? resolve(args[i]) : args[i];
	}).concat(slice.call(args, this.length));
};

module.exports = function (resolvers) {
	resolvers = toArray(resolvers);
	resolvers.forEach(function (resolve) {
		if (isValue(resolve)) callable(resolve);
	});
	return resolveArgs.bind(resolvers);
};

},{"es5-ext/array/to-array":8,"es5-ext/object/is-value":29,"es5-ext/object/valid-callable":37}],80:[function(require,module,exports){
"use strict";

var indexOf = require("es5-ext/array/#/e-index-of");

module.exports = function () {
	var lastId = 0, argsMap = [], cache = [];
	return {
		get: function (args) {
			var index = indexOf.call(argsMap, args[0]);
			return index === -1 ? null : cache[index];
		},
		set: function (args) {
			argsMap.push(args[0]);
			cache.push(++lastId);
			return lastId;
		},
		delete: function (id) {
			var index = indexOf.call(cache, id);
			if (index !== -1) {
				argsMap.splice(index, 1);
				cache.splice(index, 1);
			}
		},
		clear: function () {
			argsMap = [];
			cache = [];
		}
	};
};

},{"es5-ext/array/#/e-index-of":4}],81:[function(require,module,exports){
"use strict";

var indexOf = require("es5-ext/array/#/e-index-of")
  , create  = Object.create;

module.exports = function (length) {
	var lastId = 0, map = [[], []], cache = create(null);
	return {
		get: function (args) {
			var index = 0, set = map, i;
			while (index < length - 1) {
				i = indexOf.call(set[0], args[index]);
				if (i === -1) return null;
				set = set[1][i];
				++index;
			}
			i = indexOf.call(set[0], args[index]);
			if (i === -1) return null;
			return set[1][i] || null;
		},
		set: function (args) {
			var index = 0, set = map, i;
			while (index < length - 1) {
				i = indexOf.call(set[0], args[index]);
				if (i === -1) {
					i = set[0].push(args[index]) - 1;
					set[1].push([[], []]);
				}
				set = set[1][i];
				++index;
			}
			i = indexOf.call(set[0], args[index]);
			if (i === -1) {
				i = set[0].push(args[index]) - 1;
			}
			set[1][i] = ++lastId;
			cache[lastId] = args;
			return lastId;
		},
		delete: function (id) {
			var index = 0, set = map, i, path = [], args = cache[id];
			while (index < length - 1) {
				i = indexOf.call(set[0], args[index]);
				if (i === -1) {
					return;
				}
				path.push(set, i);
				set = set[1][i];
				++index;
			}
			i = indexOf.call(set[0], args[index]);
			if (i === -1) {
				return;
			}
			id = set[1][i];
			set[0].splice(i, 1);
			set[1].splice(i, 1);
			while (!set[0].length && path.length) {
				i = path.pop();
				set = path.pop();
				set[0].splice(i, 1);
				set[1].splice(i, 1);
			}
			delete cache[id];
		},
		clear: function () {
			map = [[], []];
			cache = create(null);
		}
	};
};

},{"es5-ext/array/#/e-index-of":4}],82:[function(require,module,exports){
"use strict";

module.exports = function (length) {
	if (!length) {
		return function () {
			return "";
		};
	}
	return function (args) {
		var id = String(args[0]), i = 0, currentLength = length;
		while (--currentLength) {
			id += "\u0001" + args[++i];
		}
		return id;
	};
};

},{}],83:[function(require,module,exports){
/* eslint max-statements: 0 */

"use strict";

var indexOf = require("es5-ext/array/#/e-index-of");

var create = Object.create;

module.exports = function () {
	var lastId = 0, map = [], cache = create(null);
	return {
		get: function (args) {
			var index = 0, set = map, i, length = args.length;
			if (length === 0) return set[length] || null;
			if ((set = set[length])) {
				while (index < length - 1) {
					i = indexOf.call(set[0], args[index]);
					if (i === -1) return null;
					set = set[1][i];
					++index;
				}
				i = indexOf.call(set[0], args[index]);
				if (i === -1) return null;
				return set[1][i] || null;
			}
			return null;
		},
		set: function (args) {
			var index = 0, set = map, i, length = args.length;
			if (length === 0) {
				set[length] = ++lastId;
			} else {
				if (!set[length]) {
					set[length] = [[], []];
				}
				set = set[length];
				while (index < length - 1) {
					i = indexOf.call(set[0], args[index]);
					if (i === -1) {
						i = set[0].push(args[index]) - 1;
						set[1].push([[], []]);
					}
					set = set[1][i];
					++index;
				}
				i = indexOf.call(set[0], args[index]);
				if (i === -1) {
					i = set[0].push(args[index]) - 1;
				}
				set[1][i] = ++lastId;
			}
			cache[lastId] = args;
			return lastId;
		},
		delete: function (id) {
			var index = 0, set = map, i, args = cache[id], length = args.length, path = [];
			if (length === 0) {
				delete set[length];
			} else if ((set = set[length])) {
				while (index < length - 1) {
					i = indexOf.call(set[0], args[index]);
					if (i === -1) {
						return;
					}
					path.push(set, i);
					set = set[1][i];
					++index;
				}
				i = indexOf.call(set[0], args[index]);
				if (i === -1) {
					return;
				}
				id = set[1][i];
				set[0].splice(i, 1);
				set[1].splice(i, 1);
				while (!set[0].length && path.length) {
					i = path.pop();
					set = path.pop();
					set[0].splice(i, 1);
					set[1].splice(i, 1);
				}
			}
			delete cache[id];
		},
		clear: function () {
			map = [];
			cache = create(null);
		}
	};
};

},{"es5-ext/array/#/e-index-of":4}],84:[function(require,module,exports){
"use strict";

module.exports = function (args) {
	var id, i, length = args.length;
	if (!length) return "\u0002";
	id = String(args[i = 0]);
	while (--length) id += "\u0001" + args[++i];
	return id;
};

},{}],85:[function(require,module,exports){
"use strict";

var callable      = require("es5-ext/object/valid-callable")
  , forEach       = require("es5-ext/object/for-each")
  , extensions    = require("./lib/registered-extensions")
  , configure     = require("./lib/configure-map")
  , resolveLength = require("./lib/resolve-length");

module.exports = function self(fn /*, options */) {
	var options, length, conf;

	callable(fn);
	options = Object(arguments[1]);

	if (options.async && options.promise) {
		throw new Error("Options 'async' and 'promise' cannot be used together");
	}

	// Do not memoize already memoized function
	if (hasOwnProperty.call(fn, "__memoized__") && !options.force) return fn;

	// Resolve length;
	length = resolveLength(options.length, fn.length, options.async && extensions.async);

	// Configure cache map
	conf = configure(fn, length, options);

	// Bind eventual extensions
	forEach(extensions, function (extFn, name) {
		if (options[name]) extFn(options[name], conf, options);
	});

	if (self.__profiler__) self.__profiler__(conf);

	conf.updateEnv();
	return conf.memoized;
};

},{"./lib/configure-map":75,"./lib/registered-extensions":76,"./lib/resolve-length":77,"es5-ext/object/for-each":26,"es5-ext/object/valid-callable":37}],86:[function(require,module,exports){
(function (process,setImmediate){(function (){
'use strict';

var ensureCallable = function (fn) {
	if (typeof fn !== 'function') throw new TypeError(fn + " is not a function");
	return fn;
};

var byObserver = function (Observer) {
	var node = document.createTextNode(''), queue, currentQueue, i = 0;
	new Observer(function () {
		var callback;
		if (!queue) {
			if (!currentQueue) return;
			queue = currentQueue;
		} else if (currentQueue) {
			queue = currentQueue.concat(queue);
		}
		currentQueue = queue;
		queue = null;
		if (typeof currentQueue === 'function') {
			callback = currentQueue;
			currentQueue = null;
			callback();
			return;
		}
		node.data = (i = ++i % 2); // Invoke other batch, to handle leftover callbacks in case of crash
		while (currentQueue) {
			callback = currentQueue.shift();
			if (!currentQueue.length) currentQueue = null;
			callback();
		}
	}).observe(node, { characterData: true });
	return function (fn) {
		ensureCallable(fn);
		if (queue) {
			if (typeof queue === 'function') queue = [queue, fn];
			else queue.push(fn);
			return;
		}
		queue = fn;
		node.data = (i = ++i % 2);
	};
};

module.exports = (function () {
	// Node.js
	if ((typeof process === 'object') && process && (typeof process.nextTick === 'function')) {
		return process.nextTick;
	}

	// queueMicrotask
	if (typeof queueMicrotask === "function") {
		return function (cb) { queueMicrotask(ensureCallable(cb)); };
	}

	// MutationObserver
	if ((typeof document === 'object') && document) {
		if (typeof MutationObserver === 'function') return byObserver(MutationObserver);
		if (typeof WebKitMutationObserver === 'function') return byObserver(WebKitMutationObserver);
	}

	// W3C Draft
	// http://dvcs.w3.org/hg/webperf/raw-file/tip/specs/setImmediate/Overview.html
	if (typeof setImmediate === 'function') {
		return function (cb) { setImmediate(ensureCallable(cb)); };
	}

	// Wide available standard
	if ((typeof setTimeout === 'function') || (typeof setTimeout === 'object')) {
		return function (cb) { setTimeout(ensureCallable(cb), 0); };
	}

	return null;
}());

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":94,"timers":95}],87:[function(require,module,exports){
"use strict";

module.exports = 2147483647;

},{}],88:[function(require,module,exports){
"use strict";

var toPosInt   = require("es5-ext/number/to-pos-integer")
  , maxTimeout = require("./max-timeout");

module.exports = function (value) {
	value = toPosInt(value);
	if (value > maxTimeout) throw new TypeError(value + " exceeds maximum possible timeout");
	return value;
};

},{"./max-timeout":87,"es5-ext/number/to-pos-integer":21}],89:[function(require,module,exports){
"use strict";

var isPrototype = require("../prototype/is");

module.exports = function (value) {
	if (typeof value !== "function") return false;

	if (!hasOwnProperty.call(value, "length")) return false;

	try {
		if (typeof value.length !== "number") return false;
		if (typeof value.call !== "function") return false;
		if (typeof value.apply !== "function") return false;
	} catch (error) {
		return false;
	}

	return !isPrototype(value);
};

},{"../prototype/is":92}],90:[function(require,module,exports){
"use strict";

var isValue = require("../value/is");

// prettier-ignore
var possibleTypes = { "object": true, "function": true, "undefined": true /* document.all */ };

module.exports = function (value) {
	if (!isValue(value)) return false;
	return hasOwnProperty.call(possibleTypes, typeof value);
};

},{"../value/is":93}],91:[function(require,module,exports){
"use strict";

var isFunction = require("../function/is");

var classRe = /^\s*class[\s{/}]/, functionToString = Function.prototype.toString;

module.exports = function (value) {
	if (!isFunction(value)) return false;
	if (classRe.test(functionToString.call(value))) return false;
	return true;
};

},{"../function/is":89}],92:[function(require,module,exports){
"use strict";

var isObject = require("../object/is");

module.exports = function (value) {
	if (!isObject(value)) return false;
	try {
		if (!value.constructor) return false;
		return value.constructor.prototype === value;
	} catch (error) {
		return false;
	}
};

},{"../object/is":90}],93:[function(require,module,exports){
"use strict";

// ES3 safe
var _undefined = void 0;

module.exports = function (value) { return value !== _undefined && value !== null; };

},{}],94:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],95:[function(require,module,exports){
(function (setImmediate,clearImmediate){(function (){
var nextTick = require('process/browser.js').nextTick;
var apply = Function.prototype.apply;
var slice = Array.prototype.slice;
var immediateIds = {};
var nextImmediateId = 0;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) { timeout.close(); };

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// That's not how node.js implements it but the exposed api is the same.
exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
  var id = nextImmediateId++;
  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

  immediateIds[id] = true;

  nextTick(function onNextTick() {
    if (immediateIds[id]) {
      // fn.call() is faster so we optimize for the common use-case
      // @see http://jsperf.com/call-apply-segu
      if (args) {
        fn.apply(null, args);
      } else {
        fn.call(null);
      }
      // Prevent ids from leaking
      exports.clearImmediate(id);
    }
  });

  return id;
};

exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
  delete immediateIds[id];
};
}).call(this)}).call(this,require("timers").setImmediate,require("timers").clearImmediate)
},{"process/browser.js":94,"timers":95}]},{},[1]);
