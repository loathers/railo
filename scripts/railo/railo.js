"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = function(fn, res) {
  return function() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
};
var __commonJS = function(cb, mod) {
  return function() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
};
var __export = function(target, all) {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = function(to, from, except, desc) {
  if (from && typeof from == "object" || typeof from == "function")
    for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++)
      key = keys[i], !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: function(k) {
        return from[k];
      }.bind(null, key), enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = function(mod, isNodeMode, target) {
  return target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
    mod
  );
}, __toCommonJS = function(mod) {
  return __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
};

// kolmafia-polyfill.js
var kolmafia, console, init_kolmafia_polyfill = __esm({
  "kolmafia-polyfill.js": function() {
    "use strict";
    kolmafia = require("kolmafia"), console = {
      log: kolmafia.print
    };
  }
});

// node_modules/core-js/internals/global.js
var require_global = __commonJS({
  "node_modules/core-js/internals/global.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var check = function(it) {
      return it && it.Math == Math && it;
    };
    module2.exports = check(typeof globalThis == "object" && globalThis) || check(typeof window == "object" && window) || check(typeof self == "object" && self) || check(typeof global == "object" && global) || function() {
      return this;
    }() || Function("return this")();
  }
});

// node_modules/core-js/internals/fails.js
var require_fails = __commonJS({
  "node_modules/core-js/internals/fails.js": function(exports, module2) {
    init_kolmafia_polyfill();
    module2.exports = function(exec) {
      try {
        return !!exec();
      } catch (error) {
        return !0;
      }
    };
  }
});

// node_modules/core-js/internals/descriptors.js
var require_descriptors = __commonJS({
  "node_modules/core-js/internals/descriptors.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var fails = require_fails();
    module2.exports = !fails(function() {
      return Object.defineProperty({}, 1, {
        get: function() {
          return 7;
        }
      })[1] != 7;
    });
  }
});

// node_modules/core-js/internals/function-bind-native.js
var require_function_bind_native = __commonJS({
  "node_modules/core-js/internals/function-bind-native.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var fails = require_fails();
    module2.exports = !fails(function() {
      var test = function() {
      }.bind();
      return typeof test != "function" || test.hasOwnProperty("prototype");
    });
  }
});

// node_modules/core-js/internals/function-call.js
var require_function_call = __commonJS({
  "node_modules/core-js/internals/function-call.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var NATIVE_BIND = require_function_bind_native(), call = Function.prototype.call;
    module2.exports = NATIVE_BIND ? call.bind(call) : function() {
      return call.apply(call, arguments);
    };
  }
});

// node_modules/core-js/internals/object-property-is-enumerable.js
var require_object_property_is_enumerable = __commonJS({
  "node_modules/core-js/internals/object-property-is-enumerable.js": function(exports) {
    "use strict";
    init_kolmafia_polyfill();
    var $propertyIsEnumerable = {}.propertyIsEnumerable, getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor, NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({
      1: 2
    }, 1);
    exports.f = NASHORN_BUG ? function(V) {
      var descriptor = getOwnPropertyDescriptor(this, V);
      return !!descriptor && descriptor.enumerable;
    } : $propertyIsEnumerable;
  }
});

// node_modules/core-js/internals/create-property-descriptor.js
var require_create_property_descriptor = __commonJS({
  "node_modules/core-js/internals/create-property-descriptor.js": function(exports, module2) {
    init_kolmafia_polyfill();
    module2.exports = function(bitmap, value) {
      return {
        enumerable: !(bitmap & 1),
        configurable: !(bitmap & 2),
        writable: !(bitmap & 4),
        value: value
      };
    };
  }
});

// node_modules/core-js/internals/function-uncurry-this-raw.js
var require_function_uncurry_this_raw = __commonJS({
  "node_modules/core-js/internals/function-uncurry-this-raw.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var NATIVE_BIND = require_function_bind_native(), FunctionPrototype = Function.prototype, call = FunctionPrototype.call, uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);
    module2.exports = function(fn) {
      return NATIVE_BIND ? uncurryThisWithBind(fn) : function() {
        return call.apply(fn, arguments);
      };
    };
  }
});

// node_modules/core-js/internals/classof-raw.js
var require_classof_raw = __commonJS({
  "node_modules/core-js/internals/classof-raw.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var uncurryThisRaw = require_function_uncurry_this_raw(), toString = uncurryThisRaw({}.toString), stringSlice = uncurryThisRaw("".slice);
    module2.exports = function(it) {
      return stringSlice(toString(it), 8, -1);
    };
  }
});

// node_modules/core-js/internals/function-uncurry-this.js
var require_function_uncurry_this = __commonJS({
  "node_modules/core-js/internals/function-uncurry-this.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var classofRaw = require_classof_raw(), uncurryThisRaw = require_function_uncurry_this_raw();
    module2.exports = function(fn) {
      if (classofRaw(fn) === "Function")
        return uncurryThisRaw(fn);
    };
  }
});

// node_modules/core-js/internals/indexed-object.js
var require_indexed_object = __commonJS({
  "node_modules/core-js/internals/indexed-object.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var uncurryThis = require_function_uncurry_this(), fails = require_fails(), classof = require_classof_raw(), $Object = Object, split = uncurryThis("".split);
    module2.exports = fails(function() {
      return !$Object("z").propertyIsEnumerable(0);
    }) ? function(it) {
      return classof(it) == "String" ? split(it, "") : $Object(it);
    } : $Object;
  }
});

// node_modules/core-js/internals/is-null-or-undefined.js
var require_is_null_or_undefined = __commonJS({
  "node_modules/core-js/internals/is-null-or-undefined.js": function(exports, module2) {
    init_kolmafia_polyfill();
    module2.exports = function(it) {
      return it == null;
    };
  }
});

// node_modules/core-js/internals/require-object-coercible.js
var require_require_object_coercible = __commonJS({
  "node_modules/core-js/internals/require-object-coercible.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var isNullOrUndefined = require_is_null_or_undefined(), $TypeError = TypeError;
    module2.exports = function(it) {
      if (isNullOrUndefined(it))
        throw $TypeError("Can't call method on " + it);
      return it;
    };
  }
});

// node_modules/core-js/internals/to-indexed-object.js
var require_to_indexed_object = __commonJS({
  "node_modules/core-js/internals/to-indexed-object.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var IndexedObject = require_indexed_object(), requireObjectCoercible = require_require_object_coercible();
    module2.exports = function(it) {
      return IndexedObject(requireObjectCoercible(it));
    };
  }
});

// node_modules/core-js/internals/document-all.js
var require_document_all = __commonJS({
  "node_modules/core-js/internals/document-all.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var documentAll = typeof document == "object" && document.all, IS_HTMLDDA = typeof documentAll == "undefined" && documentAll !== void 0;
    module2.exports = {
      all: documentAll,
      IS_HTMLDDA: IS_HTMLDDA
    };
  }
});

// node_modules/core-js/internals/is-callable.js
var require_is_callable = __commonJS({
  "node_modules/core-js/internals/is-callable.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var $documentAll = require_document_all(), documentAll = $documentAll.all;
    module2.exports = $documentAll.IS_HTMLDDA ? function(argument) {
      return typeof argument == "function" || argument === documentAll;
    } : function(argument) {
      return typeof argument == "function";
    };
  }
});

// node_modules/core-js/internals/is-object.js
var require_is_object = __commonJS({
  "node_modules/core-js/internals/is-object.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var isCallable = require_is_callable(), $documentAll = require_document_all(), documentAll = $documentAll.all;
    module2.exports = $documentAll.IS_HTMLDDA ? function(it) {
      return typeof it == "object" ? it !== null : isCallable(it) || it === documentAll;
    } : function(it) {
      return typeof it == "object" ? it !== null : isCallable(it);
    };
  }
});

// node_modules/core-js/internals/get-built-in.js
var require_get_built_in = __commonJS({
  "node_modules/core-js/internals/get-built-in.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var global2 = require_global(), isCallable = require_is_callable(), aFunction = function(argument) {
      return isCallable(argument) ? argument : void 0;
    };
    module2.exports = function(namespace, method) {
      return arguments.length < 2 ? aFunction(global2[namespace]) : global2[namespace] && global2[namespace][method];
    };
  }
});

// node_modules/core-js/internals/object-is-prototype-of.js
var require_object_is_prototype_of = __commonJS({
  "node_modules/core-js/internals/object-is-prototype-of.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var uncurryThis = require_function_uncurry_this();
    module2.exports = uncurryThis({}.isPrototypeOf);
  }
});

// node_modules/core-js/internals/engine-user-agent.js
var require_engine_user_agent = __commonJS({
  "node_modules/core-js/internals/engine-user-agent.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var getBuiltIn = require_get_built_in();
    module2.exports = getBuiltIn("navigator", "userAgent") || "";
  }
});

// node_modules/core-js/internals/engine-v8-version.js
var require_engine_v8_version = __commonJS({
  "node_modules/core-js/internals/engine-v8-version.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var global2 = require_global(), userAgent = require_engine_user_agent(), process = global2.process, Deno = global2.Deno, versions = process && process.versions || Deno && Deno.version, v8 = versions && versions.v8, match, version;
    v8 && (match = v8.split("."), version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]));
    !version && userAgent && (match = userAgent.match(/Edge\/(\d+)/), (!match || match[1] >= 74) && (match = userAgent.match(/Chrome\/(\d+)/), match && (version = +match[1])));
    module2.exports = version;
  }
});

// node_modules/core-js/internals/symbol-constructor-detection.js
var require_symbol_constructor_detection = __commonJS({
  "node_modules/core-js/internals/symbol-constructor-detection.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var V8_VERSION = require_engine_v8_version(), fails = require_fails();
    module2.exports = !!Object.getOwnPropertySymbols && !fails(function() {
      var symbol = Symbol();
      return !String(symbol) || !(Object(symbol) instanceof Symbol) || !Symbol.sham && V8_VERSION && V8_VERSION < 41;
    });
  }
});

// node_modules/core-js/internals/use-symbol-as-uid.js
var require_use_symbol_as_uid = __commonJS({
  "node_modules/core-js/internals/use-symbol-as-uid.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var NATIVE_SYMBOL = require_symbol_constructor_detection();
    module2.exports = NATIVE_SYMBOL && !Symbol.sham && typeof Symbol.iterator == "symbol";
  }
});

// node_modules/core-js/internals/is-symbol.js
var require_is_symbol = __commonJS({
  "node_modules/core-js/internals/is-symbol.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var getBuiltIn = require_get_built_in(), isCallable = require_is_callable(), isPrototypeOf = require_object_is_prototype_of(), USE_SYMBOL_AS_UID = require_use_symbol_as_uid(), $Object = Object;
    module2.exports = USE_SYMBOL_AS_UID ? function(it) {
      return typeof it == "symbol";
    } : function(it) {
      var $Symbol = getBuiltIn("Symbol");
      return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
    };
  }
});

// node_modules/core-js/internals/try-to-string.js
var require_try_to_string = __commonJS({
  "node_modules/core-js/internals/try-to-string.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var $String = String;
    module2.exports = function(argument) {
      try {
        return $String(argument);
      } catch (error) {
        return "Object";
      }
    };
  }
});

// node_modules/core-js/internals/a-callable.js
var require_a_callable = __commonJS({
  "node_modules/core-js/internals/a-callable.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var isCallable = require_is_callable(), tryToString = require_try_to_string(), $TypeError = TypeError;
    module2.exports = function(argument) {
      if (isCallable(argument))
        return argument;
      throw $TypeError(tryToString(argument) + " is not a function");
    };
  }
});

// node_modules/core-js/internals/get-method.js
var require_get_method = __commonJS({
  "node_modules/core-js/internals/get-method.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var aCallable = require_a_callable(), isNullOrUndefined = require_is_null_or_undefined();
    module2.exports = function(V, P) {
      var func = V[P];
      return isNullOrUndefined(func) ? void 0 : aCallable(func);
    };
  }
});

// node_modules/core-js/internals/ordinary-to-primitive.js
var require_ordinary_to_primitive = __commonJS({
  "node_modules/core-js/internals/ordinary-to-primitive.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var call = require_function_call(), isCallable = require_is_callable(), isObject = require_is_object(), $TypeError = TypeError;
    module2.exports = function(input, pref) {
      var fn, val;
      if (pref === "string" && isCallable(fn = input.toString) && !isObject(val = call(fn, input)) || isCallable(fn = input.valueOf) && !isObject(val = call(fn, input)) || pref !== "string" && isCallable(fn = input.toString) && !isObject(val = call(fn, input)))
        return val;
      throw $TypeError("Can't convert object to primitive value");
    };
  }
});

// node_modules/core-js/internals/is-pure.js
var require_is_pure = __commonJS({
  "node_modules/core-js/internals/is-pure.js": function(exports, module2) {
    init_kolmafia_polyfill();
    module2.exports = !1;
  }
});

// node_modules/core-js/internals/define-global-property.js
var require_define_global_property = __commonJS({
  "node_modules/core-js/internals/define-global-property.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var global2 = require_global(), defineProperty = Object.defineProperty;
    module2.exports = function(key, value) {
      try {
        defineProperty(global2, key, {
          value: value,
          configurable: !0,
          writable: !0
        });
      } catch (error) {
        global2[key] = value;
      }
      return value;
    };
  }
});

// node_modules/core-js/internals/shared-store.js
var require_shared_store = __commonJS({
  "node_modules/core-js/internals/shared-store.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var global2 = require_global(), defineGlobalProperty = require_define_global_property(), SHARED = "__core-js_shared__", store = global2[SHARED] || defineGlobalProperty(SHARED, {});
    module2.exports = store;
  }
});

// node_modules/core-js/internals/shared.js
var require_shared = __commonJS({
  "node_modules/core-js/internals/shared.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var IS_PURE = require_is_pure(), store = require_shared_store();
    (module2.exports = function(key, value) {
      return store[key] || (store[key] = value !== void 0 ? value : {});
    })("versions", []).push({
      version: "3.25.5",
      mode: IS_PURE ? "pure" : "global",
      copyright: "\xA9 2014-2022 Denis Pushkarev (zloirock.ru)",
      license: "https://github.com/zloirock/core-js/blob/v3.25.5/LICENSE",
      source: "https://github.com/zloirock/core-js"
    });
  }
});

// node_modules/core-js/internals/to-object.js
var require_to_object = __commonJS({
  "node_modules/core-js/internals/to-object.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var requireObjectCoercible = require_require_object_coercible(), $Object = Object;
    module2.exports = function(argument) {
      return $Object(requireObjectCoercible(argument));
    };
  }
});

// node_modules/core-js/internals/has-own-property.js
var require_has_own_property = __commonJS({
  "node_modules/core-js/internals/has-own-property.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var uncurryThis = require_function_uncurry_this(), toObject = require_to_object(), hasOwnProperty = uncurryThis({}.hasOwnProperty);
    module2.exports = Object.hasOwn || function(it, key) {
      return hasOwnProperty(toObject(it), key);
    };
  }
});

// node_modules/core-js/internals/uid.js
var require_uid = __commonJS({
  "node_modules/core-js/internals/uid.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var uncurryThis = require_function_uncurry_this(), id = 0, postfix = Math.random(), toString = uncurryThis(1 .toString);
    module2.exports = function(key) {
      return "Symbol(" + (key === void 0 ? "" : key) + ")_" + toString(++id + postfix, 36);
    };
  }
});

// node_modules/core-js/internals/well-known-symbol.js
var require_well_known_symbol = __commonJS({
  "node_modules/core-js/internals/well-known-symbol.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var global2 = require_global(), shared = require_shared(), hasOwn = require_has_own_property(), uid = require_uid(), NATIVE_SYMBOL = require_symbol_constructor_detection(), USE_SYMBOL_AS_UID = require_use_symbol_as_uid(), WellKnownSymbolsStore = shared("wks"), Symbol2 = global2.Symbol, symbolFor = Symbol2 && Symbol2.for, createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol2 : Symbol2 && Symbol2.withoutSetter || uid;
    module2.exports = function(name) {
      if (!hasOwn(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == "string")) {
        var description = "Symbol." + name;
        NATIVE_SYMBOL && hasOwn(Symbol2, name) ? WellKnownSymbolsStore[name] = Symbol2[name] : USE_SYMBOL_AS_UID && symbolFor ? WellKnownSymbolsStore[name] = symbolFor(description) : WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
      }
      return WellKnownSymbolsStore[name];
    };
  }
});

// node_modules/core-js/internals/to-primitive.js
var require_to_primitive = __commonJS({
  "node_modules/core-js/internals/to-primitive.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var call = require_function_call(), isObject = require_is_object(), isSymbol = require_is_symbol(), getMethod = require_get_method(), ordinaryToPrimitive = require_ordinary_to_primitive(), wellKnownSymbol = require_well_known_symbol(), $TypeError = TypeError, TO_PRIMITIVE = wellKnownSymbol("toPrimitive");
    module2.exports = function(input, pref) {
      if (!isObject(input) || isSymbol(input))
        return input;
      var exoticToPrim = getMethod(input, TO_PRIMITIVE), result;
      if (exoticToPrim) {
        if (pref === void 0 && (pref = "default"), result = call(exoticToPrim, input, pref), !isObject(result) || isSymbol(result))
          return result;
        throw $TypeError("Can't convert object to primitive value");
      }
      return pref === void 0 && (pref = "number"), ordinaryToPrimitive(input, pref);
    };
  }
});

// node_modules/core-js/internals/to-property-key.js
var require_to_property_key = __commonJS({
  "node_modules/core-js/internals/to-property-key.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var toPrimitive = require_to_primitive(), isSymbol = require_is_symbol();
    module2.exports = function(argument) {
      var key = toPrimitive(argument, "string");
      return isSymbol(key) ? key : key + "";
    };
  }
});

// node_modules/core-js/internals/document-create-element.js
var require_document_create_element = __commonJS({
  "node_modules/core-js/internals/document-create-element.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var global2 = require_global(), isObject = require_is_object(), document2 = global2.document, EXISTS = isObject(document2) && isObject(document2.createElement);
    module2.exports = function(it) {
      return EXISTS ? document2.createElement(it) : {};
    };
  }
});

// node_modules/core-js/internals/ie8-dom-define.js
var require_ie8_dom_define = __commonJS({
  "node_modules/core-js/internals/ie8-dom-define.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var DESCRIPTORS = require_descriptors(), fails = require_fails(), createElement = require_document_create_element();
    module2.exports = !DESCRIPTORS && !fails(function() {
      return Object.defineProperty(createElement("div"), "a", {
        get: function() {
          return 7;
        }
      }).a != 7;
    });
  }
});

// node_modules/core-js/internals/object-get-own-property-descriptor.js
var require_object_get_own_property_descriptor = __commonJS({
  "node_modules/core-js/internals/object-get-own-property-descriptor.js": function(exports) {
    init_kolmafia_polyfill();
    var DESCRIPTORS = require_descriptors(), call = require_function_call(), propertyIsEnumerableModule = require_object_property_is_enumerable(), createPropertyDescriptor = require_create_property_descriptor(), toIndexedObject = require_to_indexed_object(), toPropertyKey = require_to_property_key(), hasOwn = require_has_own_property(), IE8_DOM_DEFINE = require_ie8_dom_define(), $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function(O, P) {
      if (O = toIndexedObject(O), P = toPropertyKey(P), IE8_DOM_DEFINE)
        try {
          return $getOwnPropertyDescriptor(O, P);
        } catch (error) {
        }
      if (hasOwn(O, P))
        return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
    };
  }
});

// node_modules/core-js/internals/v8-prototype-define-bug.js
var require_v8_prototype_define_bug = __commonJS({
  "node_modules/core-js/internals/v8-prototype-define-bug.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var DESCRIPTORS = require_descriptors(), fails = require_fails();
    module2.exports = DESCRIPTORS && fails(function() {
      return Object.defineProperty(function() {
      }, "prototype", {
        value: 42,
        writable: !1
      }).prototype != 42;
    });
  }
});

// node_modules/core-js/internals/an-object.js
var require_an_object = __commonJS({
  "node_modules/core-js/internals/an-object.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var isObject = require_is_object(), $String = String, $TypeError = TypeError;
    module2.exports = function(argument) {
      if (isObject(argument))
        return argument;
      throw $TypeError($String(argument) + " is not an object");
    };
  }
});

// node_modules/core-js/internals/object-define-property.js
var require_object_define_property = __commonJS({
  "node_modules/core-js/internals/object-define-property.js": function(exports) {
    init_kolmafia_polyfill();
    var DESCRIPTORS = require_descriptors(), IE8_DOM_DEFINE = require_ie8_dom_define(), V8_PROTOTYPE_DEFINE_BUG = require_v8_prototype_define_bug(), anObject = require_an_object(), toPropertyKey = require_to_property_key(), $TypeError = TypeError, $defineProperty = Object.defineProperty, $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor, ENUMERABLE = "enumerable", CONFIGURABLE = "configurable", WRITABLE = "writable";
    exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function(O, P, Attributes) {
      if (anObject(O), P = toPropertyKey(P), anObject(Attributes), typeof O == "function" && P === "prototype" && "value" in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
        var current = $getOwnPropertyDescriptor(O, P);
        current && current[WRITABLE] && (O[P] = Attributes.value, Attributes = {
          configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
          enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
          writable: !1
        });
      }
      return $defineProperty(O, P, Attributes);
    } : $defineProperty : function(O, P, Attributes) {
      if (anObject(O), P = toPropertyKey(P), anObject(Attributes), IE8_DOM_DEFINE)
        try {
          return $defineProperty(O, P, Attributes);
        } catch (error) {
        }
      if ("get" in Attributes || "set" in Attributes)
        throw $TypeError("Accessors not supported");
      return "value" in Attributes && (O[P] = Attributes.value), O;
    };
  }
});

// node_modules/core-js/internals/create-non-enumerable-property.js
var require_create_non_enumerable_property = __commonJS({
  "node_modules/core-js/internals/create-non-enumerable-property.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var DESCRIPTORS = require_descriptors(), definePropertyModule = require_object_define_property(), createPropertyDescriptor = require_create_property_descriptor();
    module2.exports = DESCRIPTORS ? function(object, key, value) {
      return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
    } : function(object, key, value) {
      return object[key] = value, object;
    };
  }
});

// node_modules/core-js/internals/function-name.js
var require_function_name = __commonJS({
  "node_modules/core-js/internals/function-name.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var DESCRIPTORS = require_descriptors(), hasOwn = require_has_own_property(), FunctionPrototype = Function.prototype, getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor, EXISTS = hasOwn(FunctionPrototype, "name"), PROPER = EXISTS && function() {
    }.name === "something", CONFIGURABLE = EXISTS && (!DESCRIPTORS || DESCRIPTORS && getDescriptor(FunctionPrototype, "name").configurable);
    module2.exports = {
      EXISTS: EXISTS,
      PROPER: PROPER,
      CONFIGURABLE: CONFIGURABLE
    };
  }
});

// node_modules/core-js/internals/inspect-source.js
var require_inspect_source = __commonJS({
  "node_modules/core-js/internals/inspect-source.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var uncurryThis = require_function_uncurry_this(), isCallable = require_is_callable(), store = require_shared_store(), functionToString = uncurryThis(Function.toString);
    isCallable(store.inspectSource) || (store.inspectSource = function(it) {
      return functionToString(it);
    });
    module2.exports = store.inspectSource;
  }
});

// node_modules/core-js/internals/weak-map-basic-detection.js
var require_weak_map_basic_detection = __commonJS({
  "node_modules/core-js/internals/weak-map-basic-detection.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var global2 = require_global(), isCallable = require_is_callable(), WeakMap2 = global2.WeakMap;
    module2.exports = isCallable(WeakMap2) && /native code/.test(String(WeakMap2));
  }
});

// node_modules/core-js/internals/shared-key.js
var require_shared_key = __commonJS({
  "node_modules/core-js/internals/shared-key.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var shared = require_shared(), uid = require_uid(), keys = shared("keys");
    module2.exports = function(key) {
      return keys[key] || (keys[key] = uid(key));
    };
  }
});

// node_modules/core-js/internals/hidden-keys.js
var require_hidden_keys = __commonJS({
  "node_modules/core-js/internals/hidden-keys.js": function(exports, module2) {
    init_kolmafia_polyfill();
    module2.exports = {};
  }
});

// node_modules/core-js/internals/internal-state.js
var require_internal_state = __commonJS({
  "node_modules/core-js/internals/internal-state.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var NATIVE_WEAK_MAP = require_weak_map_basic_detection(), global2 = require_global(), isObject = require_is_object(), createNonEnumerableProperty = require_create_non_enumerable_property(), hasOwn = require_has_own_property(), shared = require_shared_store(), sharedKey = require_shared_key(), hiddenKeys = require_hidden_keys(), OBJECT_ALREADY_INITIALIZED = "Object already initialized", TypeError2 = global2.TypeError, WeakMap2 = global2.WeakMap, set2, get3, has, enforce = function(it) {
      return has(it) ? get3(it) : set2(it, {});
    }, getterFor = function(TYPE) {
      return function(it) {
        var state;
        if (!isObject(it) || (state = get3(it)).type !== TYPE)
          throw TypeError2("Incompatible receiver, " + TYPE + " required");
        return state;
      };
    };
    NATIVE_WEAK_MAP || shared.state ? (store = shared.state || (shared.state = new WeakMap2()), store.get = store.get, store.has = store.has, store.set = store.set, set2 = function(it, metadata) {
      if (store.has(it))
        throw TypeError2(OBJECT_ALREADY_INITIALIZED);
      return metadata.facade = it, store.set(it, metadata), metadata;
    }, get3 = function(it) {
      return store.get(it) || {};
    }, has = function(it) {
      return store.has(it);
    }) : (STATE = sharedKey("state"), hiddenKeys[STATE] = !0, set2 = function(it, metadata) {
      if (hasOwn(it, STATE))
        throw TypeError2(OBJECT_ALREADY_INITIALIZED);
      return metadata.facade = it, createNonEnumerableProperty(it, STATE, metadata), metadata;
    }, get3 = function(it) {
      return hasOwn(it, STATE) ? it[STATE] : {};
    }, has = function(it) {
      return hasOwn(it, STATE);
    });
    var store, STATE;
    module2.exports = {
      set: set2,
      get: get3,
      has: has,
      enforce: enforce,
      getterFor: getterFor
    };
  }
});

// node_modules/core-js/internals/make-built-in.js
var require_make_built_in = __commonJS({
  "node_modules/core-js/internals/make-built-in.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var fails = require_fails(), isCallable = require_is_callable(), hasOwn = require_has_own_property(), DESCRIPTORS = require_descriptors(), CONFIGURABLE_FUNCTION_NAME = require_function_name().CONFIGURABLE, inspectSource = require_inspect_source(), InternalStateModule = require_internal_state(), enforceInternalState = InternalStateModule.enforce, getInternalState = InternalStateModule.get, defineProperty = Object.defineProperty, CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function() {
      return defineProperty(function() {
      }, "length", {
        value: 8
      }).length !== 8;
    }), TEMPLATE = String(String).split("String"), makeBuiltIn = module2.exports = function(value, name, options) {
      String(name).slice(0, 7) === "Symbol(" && (name = "[" + String(name).replace(/^Symbol\(([^)]*)\)/, "$1") + "]"), options && options.getter && (name = "get " + name), options && options.setter && (name = "set " + name), (!hasOwn(value, "name") || CONFIGURABLE_FUNCTION_NAME && value.name !== name) && (DESCRIPTORS ? defineProperty(value, "name", {
        value: name,
        configurable: !0
      }) : value.name = name), CONFIGURABLE_LENGTH && options && hasOwn(options, "arity") && value.length !== options.arity && defineProperty(value, "length", {
        value: options.arity
      });
      try {
        options && hasOwn(options, "constructor") && options.constructor ? DESCRIPTORS && defineProperty(value, "prototype", {
          writable: !1
        }) : value.prototype && (value.prototype = void 0);
      } catch (error) {
      }
      var state = enforceInternalState(value);
      return hasOwn(state, "source") || (state.source = TEMPLATE.join(typeof name == "string" ? name : "")), value;
    };
    Function.prototype.toString = makeBuiltIn(function() {
      return isCallable(this) && getInternalState(this).source || inspectSource(this);
    }, "toString");
  }
});

// node_modules/core-js/internals/define-built-in.js
var require_define_built_in = __commonJS({
  "node_modules/core-js/internals/define-built-in.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var isCallable = require_is_callable(), definePropertyModule = require_object_define_property(), makeBuiltIn = require_make_built_in(), defineGlobalProperty = require_define_global_property();
    module2.exports = function(O, key, value, options) {
      options || (options = {});
      var simple = options.enumerable, name = options.name !== void 0 ? options.name : key;
      if (isCallable(value) && makeBuiltIn(value, name, options), options.global)
        simple ? O[key] = value : defineGlobalProperty(key, value);
      else {
        try {
          options.unsafe ? O[key] && (simple = !0) : delete O[key];
        } catch (error) {
        }
        simple ? O[key] = value : definePropertyModule.f(O, key, {
          value: value,
          enumerable: !1,
          configurable: !options.nonConfigurable,
          writable: !options.nonWritable
        });
      }
      return O;
    };
  }
});

// node_modules/core-js/internals/math-trunc.js
var require_math_trunc = __commonJS({
  "node_modules/core-js/internals/math-trunc.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var ceil = Math.ceil, floor = Math.floor;
    module2.exports = Math.trunc || function(x) {
      var n = +x;
      return (n > 0 ? floor : ceil)(n);
    };
  }
});

// node_modules/core-js/internals/to-integer-or-infinity.js
var require_to_integer_or_infinity = __commonJS({
  "node_modules/core-js/internals/to-integer-or-infinity.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var trunc = require_math_trunc();
    module2.exports = function(argument) {
      var number = +argument;
      return number !== number || number === 0 ? 0 : trunc(number);
    };
  }
});

// node_modules/core-js/internals/to-absolute-index.js
var require_to_absolute_index = __commonJS({
  "node_modules/core-js/internals/to-absolute-index.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var toIntegerOrInfinity = require_to_integer_or_infinity(), max = Math.max, min = Math.min;
    module2.exports = function(index, length) {
      var integer = toIntegerOrInfinity(index);
      return integer < 0 ? max(integer + length, 0) : min(integer, length);
    };
  }
});

// node_modules/core-js/internals/to-length.js
var require_to_length = __commonJS({
  "node_modules/core-js/internals/to-length.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var toIntegerOrInfinity = require_to_integer_or_infinity(), min = Math.min;
    module2.exports = function(argument) {
      return argument > 0 ? min(toIntegerOrInfinity(argument), 9007199254740991) : 0;
    };
  }
});

// node_modules/core-js/internals/length-of-array-like.js
var require_length_of_array_like = __commonJS({
  "node_modules/core-js/internals/length-of-array-like.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var toLength = require_to_length();
    module2.exports = function(obj) {
      return toLength(obj.length);
    };
  }
});

// node_modules/core-js/internals/array-includes.js
var require_array_includes = __commonJS({
  "node_modules/core-js/internals/array-includes.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var toIndexedObject = require_to_indexed_object(), toAbsoluteIndex = require_to_absolute_index(), lengthOfArrayLike = require_length_of_array_like(), createMethod = function(IS_INCLUDES) {
      return function($this, el, fromIndex) {
        var O = toIndexedObject($this), length = lengthOfArrayLike(O), index = toAbsoluteIndex(fromIndex, length), value;
        if (IS_INCLUDES && el != el) {
          for (; length > index; )
            if (value = O[index++], value != value)
              return !0;
        } else
          for (; length > index; index++)
            if ((IS_INCLUDES || index in O) && O[index] === el)
              return IS_INCLUDES || index || 0;
        return !IS_INCLUDES && -1;
      };
    };
    module2.exports = {
      includes: createMethod(!0),
      indexOf: createMethod(!1)
    };
  }
});

// node_modules/core-js/internals/object-keys-internal.js
var require_object_keys_internal = __commonJS({
  "node_modules/core-js/internals/object-keys-internal.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var uncurryThis = require_function_uncurry_this(), hasOwn = require_has_own_property(), toIndexedObject = require_to_indexed_object(), indexOf = require_array_includes().indexOf, hiddenKeys = require_hidden_keys(), push = uncurryThis([].push);
    module2.exports = function(object, names) {
      var O = toIndexedObject(object), i = 0, result = [], key;
      for (key in O)
        !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
      for (; names.length > i; )
        hasOwn(O, key = names[i++]) && (~indexOf(result, key) || push(result, key));
      return result;
    };
  }
});

// node_modules/core-js/internals/enum-bug-keys.js
var require_enum_bug_keys = __commonJS({
  "node_modules/core-js/internals/enum-bug-keys.js": function(exports, module2) {
    init_kolmafia_polyfill();
    module2.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
  }
});

// node_modules/core-js/internals/object-get-own-property-names.js
var require_object_get_own_property_names = __commonJS({
  "node_modules/core-js/internals/object-get-own-property-names.js": function(exports) {
    init_kolmafia_polyfill();
    var internalObjectKeys = require_object_keys_internal(), enumBugKeys = require_enum_bug_keys(), hiddenKeys = enumBugKeys.concat("length", "prototype");
    exports.f = Object.getOwnPropertyNames || function(O) {
      return internalObjectKeys(O, hiddenKeys);
    };
  }
});

// node_modules/core-js/internals/object-get-own-property-symbols.js
var require_object_get_own_property_symbols = __commonJS({
  "node_modules/core-js/internals/object-get-own-property-symbols.js": function(exports) {
    init_kolmafia_polyfill();
    exports.f = Object.getOwnPropertySymbols;
  }
});

// node_modules/core-js/internals/own-keys.js
var require_own_keys = __commonJS({
  "node_modules/core-js/internals/own-keys.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var getBuiltIn = require_get_built_in(), uncurryThis = require_function_uncurry_this(), getOwnPropertyNamesModule = require_object_get_own_property_names(), getOwnPropertySymbolsModule = require_object_get_own_property_symbols(), anObject = require_an_object(), concat = uncurryThis([].concat);
    module2.exports = getBuiltIn("Reflect", "ownKeys") || function(it) {
      var keys = getOwnPropertyNamesModule.f(anObject(it)), getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
      return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
    };
  }
});

// node_modules/core-js/internals/copy-constructor-properties.js
var require_copy_constructor_properties = __commonJS({
  "node_modules/core-js/internals/copy-constructor-properties.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var hasOwn = require_has_own_property(), ownKeys9 = require_own_keys(), getOwnPropertyDescriptorModule = require_object_get_own_property_descriptor(), definePropertyModule = require_object_define_property();
    module2.exports = function(target, source, exceptions) {
      for (var keys = ownKeys9(source), defineProperty = definePropertyModule.f, getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f, i = 0; i < keys.length; i++) {
        var key = keys[i];
        !hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key)) && defineProperty(target, key, getOwnPropertyDescriptor(source, key));
      }
    };
  }
});

// node_modules/core-js/internals/is-forced.js
var require_is_forced = __commonJS({
  "node_modules/core-js/internals/is-forced.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var fails = require_fails(), isCallable = require_is_callable(), replacement = /#|\.prototype\./, isForced = function(feature, detection) {
      var value = data[normalize(feature)];
      return value == POLYFILL ? !0 : value == NATIVE ? !1 : isCallable(detection) ? fails(detection) : !!detection;
    }, normalize = isForced.normalize = function(string) {
      return String(string).replace(replacement, ".").toLowerCase();
    }, data = isForced.data = {}, NATIVE = isForced.NATIVE = "N", POLYFILL = isForced.POLYFILL = "P";
    module2.exports = isForced;
  }
});

// node_modules/core-js/internals/export.js
var require_export = __commonJS({
  "node_modules/core-js/internals/export.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var global2 = require_global(), getOwnPropertyDescriptor = require_object_get_own_property_descriptor().f, createNonEnumerableProperty = require_create_non_enumerable_property(), defineBuiltIn = require_define_built_in(), defineGlobalProperty = require_define_global_property(), copyConstructorProperties = require_copy_constructor_properties(), isForced = require_is_forced();
    module2.exports = function(options, source) {
      var TARGET = options.target, GLOBAL = options.global, STATIC = options.stat, FORCED, target, key, targetProperty, sourceProperty, descriptor;
      if (GLOBAL ? target = global2 : STATIC ? target = global2[TARGET] || defineGlobalProperty(TARGET, {}) : target = (global2[TARGET] || {}).prototype, target)
        for (key in source) {
          if (sourceProperty = source[key], options.dontCallGetSet ? (descriptor = getOwnPropertyDescriptor(target, key), targetProperty = descriptor && descriptor.value) : targetProperty = target[key], FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key, options.forced), !FORCED && targetProperty !== void 0) {
            if (typeof sourceProperty == typeof targetProperty)
              continue;
            copyConstructorProperties(sourceProperty, targetProperty);
          }
          (options.sham || targetProperty && targetProperty.sham) && createNonEnumerableProperty(sourceProperty, "sham", !0), defineBuiltIn(target, key, sourceProperty, options);
        }
    };
  }
});

// node_modules/core-js/internals/object-keys.js
var require_object_keys = __commonJS({
  "node_modules/core-js/internals/object-keys.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var internalObjectKeys = require_object_keys_internal(), enumBugKeys = require_enum_bug_keys();
    module2.exports = Object.keys || function(O) {
      return internalObjectKeys(O, enumBugKeys);
    };
  }
});

// node_modules/core-js/internals/object-to-array.js
var require_object_to_array = __commonJS({
  "node_modules/core-js/internals/object-to-array.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var DESCRIPTORS = require_descriptors(), uncurryThis = require_function_uncurry_this(), objectKeys = require_object_keys(), toIndexedObject = require_to_indexed_object(), $propertyIsEnumerable = require_object_property_is_enumerable().f, propertyIsEnumerable = uncurryThis($propertyIsEnumerable), push = uncurryThis([].push), createMethod = function(TO_ENTRIES) {
      return function(it) {
        for (var O = toIndexedObject(it), keys = objectKeys(O), length = keys.length, i = 0, result = [], key; length > i; )
          key = keys[i++], (!DESCRIPTORS || propertyIsEnumerable(O, key)) && push(result, TO_ENTRIES ? [key, O[key]] : O[key]);
        return result;
      };
    };
    module2.exports = {
      entries: createMethod(!0),
      values: createMethod(!1)
    };
  }
});

// node_modules/core-js/internals/is-array.js
var require_is_array = __commonJS({
  "node_modules/core-js/internals/is-array.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var classof = require_classof_raw();
    module2.exports = Array.isArray || function(argument) {
      return classof(argument) == "Array";
    };
  }
});

// node_modules/core-js/internals/does-not-exceed-safe-integer.js
var require_does_not_exceed_safe_integer = __commonJS({
  "node_modules/core-js/internals/does-not-exceed-safe-integer.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var $TypeError = TypeError, MAX_SAFE_INTEGER = 9007199254740991;
    module2.exports = function(it) {
      if (it > MAX_SAFE_INTEGER)
        throw $TypeError("Maximum allowed index exceeded");
      return it;
    };
  }
});

// node_modules/core-js/internals/function-bind-context.js
var require_function_bind_context = __commonJS({
  "node_modules/core-js/internals/function-bind-context.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var uncurryThis = require_function_uncurry_this(), aCallable = require_a_callable(), NATIVE_BIND = require_function_bind_native(), bind = uncurryThis(uncurryThis.bind);
    module2.exports = function(fn, that) {
      return aCallable(fn), that === void 0 ? fn : NATIVE_BIND ? bind(fn, that) : function() {
        return fn.apply(that, arguments);
      };
    };
  }
});

// node_modules/core-js/internals/flatten-into-array.js
var require_flatten_into_array = __commonJS({
  "node_modules/core-js/internals/flatten-into-array.js": function(exports, module2) {
    "use strict";
    init_kolmafia_polyfill();
    var isArray = require_is_array(), lengthOfArrayLike = require_length_of_array_like(), doesNotExceedSafeInteger = require_does_not_exceed_safe_integer(), bind = require_function_bind_context(), flattenIntoArray = function flattenIntoArray2(target, original, source, sourceLen, start, depth, mapper, thisArg) {
      for (var targetIndex = start, sourceIndex = 0, mapFn = mapper ? bind(mapper, thisArg) : !1, element, elementLen; sourceIndex < sourceLen; )
        sourceIndex in source && (element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex], depth > 0 && isArray(element) ? (elementLen = lengthOfArrayLike(element), targetIndex = flattenIntoArray2(target, original, element, elementLen, targetIndex, depth - 1) - 1) : (doesNotExceedSafeInteger(targetIndex + 1), target[targetIndex] = element), targetIndex++), sourceIndex++;
      return targetIndex;
    };
    module2.exports = flattenIntoArray;
  }
});

// node_modules/core-js/internals/to-string-tag-support.js
var require_to_string_tag_support = __commonJS({
  "node_modules/core-js/internals/to-string-tag-support.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var wellKnownSymbol = require_well_known_symbol(), TO_STRING_TAG = wellKnownSymbol("toStringTag"), test = {};
    test[TO_STRING_TAG] = "z";
    module2.exports = String(test) === "[object z]";
  }
});

// node_modules/core-js/internals/classof.js
var require_classof = __commonJS({
  "node_modules/core-js/internals/classof.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var TO_STRING_TAG_SUPPORT = require_to_string_tag_support(), isCallable = require_is_callable(), classofRaw = require_classof_raw(), wellKnownSymbol = require_well_known_symbol(), TO_STRING_TAG = wellKnownSymbol("toStringTag"), $Object = Object, CORRECT_ARGUMENTS = classofRaw(function() {
      return arguments;
    }()) == "Arguments", tryGet = function(it, key) {
      try {
        return it[key];
      } catch (error) {
      }
    };
    module2.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function(it) {
      var O, tag, result;
      return it === void 0 ? "Undefined" : it === null ? "Null" : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == "string" ? tag : CORRECT_ARGUMENTS ? classofRaw(O) : (result = classofRaw(O)) == "Object" && isCallable(O.callee) ? "Arguments" : result;
    };
  }
});

// node_modules/core-js/internals/is-constructor.js
var require_is_constructor = __commonJS({
  "node_modules/core-js/internals/is-constructor.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var uncurryThis = require_function_uncurry_this(), fails = require_fails(), isCallable = require_is_callable(), classof = require_classof(), getBuiltIn = require_get_built_in(), inspectSource = require_inspect_source(), noop = function() {
    }, empty = [], construct = getBuiltIn("Reflect", "construct"), constructorRegExp = /^\s*(?:class|function)\b/, exec = uncurryThis(constructorRegExp.exec), INCORRECT_TO_STRING = !constructorRegExp.exec(noop), isConstructorModern = function(argument) {
      if (!isCallable(argument))
        return !1;
      try {
        return construct(noop, empty, argument), !0;
      } catch (error) {
        return !1;
      }
    }, isConstructorLegacy = function(argument) {
      if (!isCallable(argument))
        return !1;
      switch (classof(argument)) {
        case "AsyncFunction":
        case "GeneratorFunction":
        case "AsyncGeneratorFunction":
          return !1;
      }
      try {
        return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
      } catch (error) {
        return !0;
      }
    };
    isConstructorLegacy.sham = !0;
    module2.exports = !construct || fails(function() {
      var called;
      return isConstructorModern(isConstructorModern.call) || !isConstructorModern(Object) || !isConstructorModern(function() {
        called = !0;
      }) || called;
    }) ? isConstructorLegacy : isConstructorModern;
  }
});

// node_modules/core-js/internals/array-species-constructor.js
var require_array_species_constructor = __commonJS({
  "node_modules/core-js/internals/array-species-constructor.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var isArray = require_is_array(), isConstructor = require_is_constructor(), isObject = require_is_object(), wellKnownSymbol = require_well_known_symbol(), SPECIES = wellKnownSymbol("species"), $Array = Array;
    module2.exports = function(originalArray) {
      var C;
      return isArray(originalArray) && (C = originalArray.constructor, isConstructor(C) && (C === $Array || isArray(C.prototype)) ? C = void 0 : isObject(C) && (C = C[SPECIES], C === null && (C = void 0))), C === void 0 ? $Array : C;
    };
  }
});

// node_modules/core-js/internals/array-species-create.js
var require_array_species_create = __commonJS({
  "node_modules/core-js/internals/array-species-create.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var arraySpeciesConstructor = require_array_species_constructor();
    module2.exports = function(originalArray, length) {
      return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
    };
  }
});

// node_modules/core-js/modules/es.array.flat.js
var require_es_array_flat = __commonJS({
  "node_modules/core-js/modules/es.array.flat.js": function() {
    "use strict";
    init_kolmafia_polyfill();
    var $4 = require_export(), flattenIntoArray = require_flatten_into_array(), toObject = require_to_object(), lengthOfArrayLike = require_length_of_array_like(), toIntegerOrInfinity = require_to_integer_or_infinity(), arraySpeciesCreate = require_array_species_create();
    $4({
      target: "Array",
      proto: !0
    }, {
      flat: function() {
        var depthArg = arguments.length ? arguments[0] : void 0, O = toObject(this), sourceLen = lengthOfArrayLike(O), A = arraySpeciesCreate(O, 0);
        return A.length = flattenIntoArray(A, O, O, sourceLen, 0, depthArg === void 0 ? 1 : toIntegerOrInfinity(depthArg)), A;
      }
    });
  }
});

// node_modules/core-js/internals/object-define-properties.js
var require_object_define_properties = __commonJS({
  "node_modules/core-js/internals/object-define-properties.js": function(exports) {
    init_kolmafia_polyfill();
    var DESCRIPTORS = require_descriptors(), V8_PROTOTYPE_DEFINE_BUG = require_v8_prototype_define_bug(), definePropertyModule = require_object_define_property(), anObject = require_an_object(), toIndexedObject = require_to_indexed_object(), objectKeys = require_object_keys();
    exports.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function(O, Properties) {
      anObject(O);
      for (var props = toIndexedObject(Properties), keys = objectKeys(Properties), length = keys.length, index = 0, key; length > index; )
        definePropertyModule.f(O, key = keys[index++], props[key]);
      return O;
    };
  }
});

// node_modules/core-js/internals/html.js
var require_html = __commonJS({
  "node_modules/core-js/internals/html.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var getBuiltIn = require_get_built_in();
    module2.exports = getBuiltIn("document", "documentElement");
  }
});

// node_modules/core-js/internals/object-create.js
var require_object_create = __commonJS({
  "node_modules/core-js/internals/object-create.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var anObject = require_an_object(), definePropertiesModule = require_object_define_properties(), enumBugKeys = require_enum_bug_keys(), hiddenKeys = require_hidden_keys(), html = require_html(), documentCreateElement = require_document_create_element(), sharedKey = require_shared_key(), GT = ">", LT = "<", PROTOTYPE = "prototype", SCRIPT = "script", IE_PROTO = sharedKey("IE_PROTO"), EmptyConstructor = function() {
    }, scriptTag = function(content) {
      return LT + SCRIPT + GT + content + LT + "/" + SCRIPT + GT;
    }, NullProtoObjectViaActiveX = function(activeXDocument2) {
      activeXDocument2.write(scriptTag("")), activeXDocument2.close();
      var temp = activeXDocument2.parentWindow.Object;
      return activeXDocument2 = null, temp;
    }, NullProtoObjectViaIFrame = function() {
      var iframe = documentCreateElement("iframe"), JS = "java" + SCRIPT + ":", iframeDocument;
      return iframe.style.display = "none", html.appendChild(iframe), iframe.src = String(JS), iframeDocument = iframe.contentWindow.document, iframeDocument.open(), iframeDocument.write(scriptTag("document.F=Object")), iframeDocument.close(), iframeDocument.F;
    }, activeXDocument, _NullProtoObject = function() {
      try {
        activeXDocument = new ActiveXObject("htmlfile");
      } catch (error) {
      }
      _NullProtoObject = typeof document != "undefined" ? document.domain && activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame() : NullProtoObjectViaActiveX(activeXDocument);
      for (var length = enumBugKeys.length; length--; )
        delete _NullProtoObject[PROTOTYPE][enumBugKeys[length]];
      return _NullProtoObject();
    };
    hiddenKeys[IE_PROTO] = !0;
    module2.exports = Object.create || function(O, Properties) {
      var result;
      return O !== null ? (EmptyConstructor[PROTOTYPE] = anObject(O), result = new EmptyConstructor(), EmptyConstructor[PROTOTYPE] = null, result[IE_PROTO] = O) : result = _NullProtoObject(), Properties === void 0 ? result : definePropertiesModule.f(result, Properties);
    };
  }
});

// node_modules/core-js/internals/add-to-unscopables.js
var require_add_to_unscopables = __commonJS({
  "node_modules/core-js/internals/add-to-unscopables.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var wellKnownSymbol = require_well_known_symbol(), create = require_object_create(), defineProperty = require_object_define_property().f, UNSCOPABLES = wellKnownSymbol("unscopables"), ArrayPrototype = Array.prototype;
    ArrayPrototype[UNSCOPABLES] == null && defineProperty(ArrayPrototype, UNSCOPABLES, {
      configurable: !0,
      value: create(null)
    });
    module2.exports = function(key) {
      ArrayPrototype[UNSCOPABLES][key] = !0;
    };
  }
});

// node_modules/core-js/modules/es.array.unscopables.flat.js
var require_es_array_unscopables_flat = __commonJS({
  "node_modules/core-js/modules/es.array.unscopables.flat.js": function() {
    init_kolmafia_polyfill();
    var addToUnscopables = require_add_to_unscopables();
    addToUnscopables("flat");
  }
});

// node_modules/core-js/internals/entry-unbind.js
var require_entry_unbind = __commonJS({
  "node_modules/core-js/internals/entry-unbind.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var global2 = require_global(), uncurryThis = require_function_uncurry_this();
    module2.exports = function(CONSTRUCTOR, METHOD) {
      return uncurryThis(global2[CONSTRUCTOR].prototype[METHOD]);
    };
  }
});

// node_modules/core-js/es/array/flat.js
var require_flat = __commonJS({
  "node_modules/core-js/es/array/flat.js": function(exports, module2) {
    init_kolmafia_polyfill();
    require_es_array_flat();
    require_es_array_unscopables_flat();
    var entryUnbind = require_entry_unbind();
    module2.exports = entryUnbind("Array", "flat");
  }
});

// node_modules/core-js/stable/array/flat.js
var require_flat2 = __commonJS({
  "node_modules/core-js/stable/array/flat.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var parent = require_flat();
    module2.exports = parent;
  }
});

// node_modules/core-js/actual/array/flat.js
var require_flat3 = __commonJS({
  "node_modules/core-js/actual/array/flat.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var parent = require_flat2();
    module2.exports = parent;
  }
});

// node_modules/core-js/full/array/flat.js
var require_flat4 = __commonJS({
  "node_modules/core-js/full/array/flat.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var parent = require_flat3();
    module2.exports = parent;
  }
});

// node_modules/core-js/features/array/flat.js
var require_flat5 = __commonJS({
  "node_modules/core-js/features/array/flat.js": function(exports, module2) {
    init_kolmafia_polyfill();
    module2.exports = require_flat4();
  }
});

// node_modules/core-js/internals/iterators.js
var require_iterators = __commonJS({
  "node_modules/core-js/internals/iterators.js": function(exports, module2) {
    init_kolmafia_polyfill();
    module2.exports = {};
  }
});

// node_modules/core-js/internals/is-array-iterator-method.js
var require_is_array_iterator_method = __commonJS({
  "node_modules/core-js/internals/is-array-iterator-method.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var wellKnownSymbol = require_well_known_symbol(), Iterators = require_iterators(), ITERATOR = wellKnownSymbol("iterator"), ArrayPrototype = Array.prototype;
    module2.exports = function(it) {
      return it !== void 0 && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
    };
  }
});

// node_modules/core-js/internals/get-iterator-method.js
var require_get_iterator_method = __commonJS({
  "node_modules/core-js/internals/get-iterator-method.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var classof = require_classof(), getMethod = require_get_method(), isNullOrUndefined = require_is_null_or_undefined(), Iterators = require_iterators(), wellKnownSymbol = require_well_known_symbol(), ITERATOR = wellKnownSymbol("iterator");
    module2.exports = function(it) {
      if (!isNullOrUndefined(it))
        return getMethod(it, ITERATOR) || getMethod(it, "@@iterator") || Iterators[classof(it)];
    };
  }
});

// node_modules/core-js/internals/get-iterator.js
var require_get_iterator = __commonJS({
  "node_modules/core-js/internals/get-iterator.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var call = require_function_call(), aCallable = require_a_callable(), anObject = require_an_object(), tryToString = require_try_to_string(), getIteratorMethod = require_get_iterator_method(), $TypeError = TypeError;
    module2.exports = function(argument, usingIterator) {
      var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
      if (aCallable(iteratorMethod))
        return anObject(call(iteratorMethod, argument));
      throw $TypeError(tryToString(argument) + " is not iterable");
    };
  }
});

// node_modules/core-js/internals/iterator-close.js
var require_iterator_close = __commonJS({
  "node_modules/core-js/internals/iterator-close.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var call = require_function_call(), anObject = require_an_object(), getMethod = require_get_method();
    module2.exports = function(iterator, kind, value) {
      var innerResult, innerError;
      anObject(iterator);
      try {
        if (innerResult = getMethod(iterator, "return"), !innerResult) {
          if (kind === "throw")
            throw value;
          return value;
        }
        innerResult = call(innerResult, iterator);
      } catch (error) {
        innerError = !0, innerResult = error;
      }
      if (kind === "throw")
        throw value;
      if (innerError)
        throw innerResult;
      return anObject(innerResult), value;
    };
  }
});

// node_modules/core-js/internals/iterate.js
var require_iterate = __commonJS({
  "node_modules/core-js/internals/iterate.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var bind = require_function_bind_context(), call = require_function_call(), anObject = require_an_object(), tryToString = require_try_to_string(), isArrayIteratorMethod = require_is_array_iterator_method(), lengthOfArrayLike = require_length_of_array_like(), isPrototypeOf = require_object_is_prototype_of(), getIterator = require_get_iterator(), getIteratorMethod = require_get_iterator_method(), iteratorClose = require_iterator_close(), $TypeError = TypeError, Result = function(stopped, result) {
      this.stopped = stopped, this.result = result;
    }, ResultPrototype = Result.prototype;
    module2.exports = function(iterable, unboundFunction, options) {
      var that = options && options.that, AS_ENTRIES = !!(options && options.AS_ENTRIES), IS_RECORD = !!(options && options.IS_RECORD), IS_ITERATOR = !!(options && options.IS_ITERATOR), INTERRUPTED = !!(options && options.INTERRUPTED), fn = bind(unboundFunction, that), iterator, iterFn, index, length, result, next, step, stop = function(condition) {
        return iterator && iteratorClose(iterator, "normal", condition), new Result(!0, condition);
      }, callFn = function(value) {
        return AS_ENTRIES ? (anObject(value), INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1])) : INTERRUPTED ? fn(value, stop) : fn(value);
      };
      if (IS_RECORD)
        iterator = iterable.iterator;
      else if (IS_ITERATOR)
        iterator = iterable;
      else {
        if (iterFn = getIteratorMethod(iterable), !iterFn)
          throw $TypeError(tryToString(iterable) + " is not iterable");
        if (isArrayIteratorMethod(iterFn)) {
          for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++)
            if (result = callFn(iterable[index]), result && isPrototypeOf(ResultPrototype, result))
              return result;
          return new Result(!1);
        }
        iterator = getIterator(iterable, iterFn);
      }
      for (next = IS_RECORD ? iterable.next : iterator.next; !(step = call(next, iterator)).done; ) {
        try {
          result = callFn(step.value);
        } catch (error) {
          iteratorClose(iterator, "throw", error);
        }
        if (typeof result == "object" && result && isPrototypeOf(ResultPrototype, result))
          return result;
      }
      return new Result(!1);
    };
  }
});

// node_modules/core-js/internals/create-property.js
var require_create_property = __commonJS({
  "node_modules/core-js/internals/create-property.js": function(exports, module2) {
    "use strict";
    init_kolmafia_polyfill();
    var toPropertyKey = require_to_property_key(), definePropertyModule = require_object_define_property(), createPropertyDescriptor = require_create_property_descriptor();
    module2.exports = function(object, key, value) {
      var propertyKey = toPropertyKey(key);
      propertyKey in object ? definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value)) : object[propertyKey] = value;
    };
  }
});

// node_modules/lodash/_listCacheClear.js
var require_listCacheClear = __commonJS({
  "node_modules/lodash/_listCacheClear.js": function(exports, module2) {
    init_kolmafia_polyfill();
    function listCacheClear() {
      this.__data__ = [], this.size = 0;
    }
    module2.exports = listCacheClear;
  }
});

// node_modules/lodash/eq.js
var require_eq = __commonJS({
  "node_modules/lodash/eq.js": function(exports, module2) {
    init_kolmafia_polyfill();
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    module2.exports = eq;
  }
});

// node_modules/lodash/_assocIndexOf.js
var require_assocIndexOf = __commonJS({
  "node_modules/lodash/_assocIndexOf.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var eq = require_eq();
    function assocIndexOf(array, key) {
      for (var length = array.length; length--; )
        if (eq(array[length][0], key))
          return length;
      return -1;
    }
    module2.exports = assocIndexOf;
  }
});

// node_modules/lodash/_listCacheDelete.js
var require_listCacheDelete = __commonJS({
  "node_modules/lodash/_listCacheDelete.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var assocIndexOf = require_assocIndexOf(), arrayProto = Array.prototype, splice = arrayProto.splice;
    function listCacheDelete(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0)
        return !1;
      var lastIndex = data.length - 1;
      return index == lastIndex ? data.pop() : splice.call(data, index, 1), --this.size, !0;
    }
    module2.exports = listCacheDelete;
  }
});

// node_modules/lodash/_listCacheGet.js
var require_listCacheGet = __commonJS({
  "node_modules/lodash/_listCacheGet.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var assocIndexOf = require_assocIndexOf();
    function listCacheGet(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      return index < 0 ? void 0 : data[index][1];
    }
    module2.exports = listCacheGet;
  }
});

// node_modules/lodash/_listCacheHas.js
var require_listCacheHas = __commonJS({
  "node_modules/lodash/_listCacheHas.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var assocIndexOf = require_assocIndexOf();
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }
    module2.exports = listCacheHas;
  }
});

// node_modules/lodash/_listCacheSet.js
var require_listCacheSet = __commonJS({
  "node_modules/lodash/_listCacheSet.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var assocIndexOf = require_assocIndexOf();
    function listCacheSet(key, value) {
      var data = this.__data__, index = assocIndexOf(data, key);
      return index < 0 ? (++this.size, data.push([key, value])) : data[index][1] = value, this;
    }
    module2.exports = listCacheSet;
  }
});

// node_modules/lodash/_ListCache.js
var require_ListCache = __commonJS({
  "node_modules/lodash/_ListCache.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var listCacheClear = require_listCacheClear(), listCacheDelete = require_listCacheDelete(), listCacheGet = require_listCacheGet(), listCacheHas = require_listCacheHas(), listCacheSet = require_listCacheSet();
    function ListCache(entries2) {
      var index = -1, length = entries2 == null ? 0 : entries2.length;
      for (this.clear(); ++index < length; ) {
        var entry = entries2[index];
        this.set(entry[0], entry[1]);
      }
    }
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype.delete = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    module2.exports = ListCache;
  }
});

// node_modules/lodash/_stackClear.js
var require_stackClear = __commonJS({
  "node_modules/lodash/_stackClear.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var ListCache = require_ListCache();
    function stackClear() {
      this.__data__ = new ListCache(), this.size = 0;
    }
    module2.exports = stackClear;
  }
});

// node_modules/lodash/_stackDelete.js
var require_stackDelete = __commonJS({
  "node_modules/lodash/_stackDelete.js": function(exports, module2) {
    init_kolmafia_polyfill();
    function stackDelete(key) {
      var data = this.__data__, result = data.delete(key);
      return this.size = data.size, result;
    }
    module2.exports = stackDelete;
  }
});

// node_modules/lodash/_stackGet.js
var require_stackGet = __commonJS({
  "node_modules/lodash/_stackGet.js": function(exports, module2) {
    init_kolmafia_polyfill();
    function stackGet(key) {
      return this.__data__.get(key);
    }
    module2.exports = stackGet;
  }
});

// node_modules/lodash/_stackHas.js
var require_stackHas = __commonJS({
  "node_modules/lodash/_stackHas.js": function(exports, module2) {
    init_kolmafia_polyfill();
    function stackHas(key) {
      return this.__data__.has(key);
    }
    module2.exports = stackHas;
  }
});

// node_modules/lodash/_freeGlobal.js
var require_freeGlobal = __commonJS({
  "node_modules/lodash/_freeGlobal.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    module2.exports = freeGlobal;
  }
});

// node_modules/lodash/_root.js
var require_root = __commonJS({
  "node_modules/lodash/_root.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var freeGlobal = require_freeGlobal(), freeSelf = typeof self == "object" && self && self.Object === Object && self, root = freeGlobal || freeSelf || Function("return this")();
    module2.exports = root;
  }
});

// node_modules/lodash/_Symbol.js
var require_Symbol = __commonJS({
  "node_modules/lodash/_Symbol.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var root = require_root(), Symbol2 = root.Symbol;
    module2.exports = Symbol2;
  }
});

// node_modules/lodash/_getRawTag.js
var require_getRawTag = __commonJS({
  "node_modules/lodash/_getRawTag.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var Symbol2 = require_Symbol(), objectProto = Object.prototype, hasOwnProperty = objectProto.hasOwnProperty, nativeObjectToString = objectProto.toString, symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
    function getRawTag(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
      try {
        value[symToStringTag] = void 0;
        var unmasked = !0;
      } catch (e) {
      }
      var result = nativeObjectToString.call(value);
      return unmasked && (isOwn ? value[symToStringTag] = tag : delete value[symToStringTag]), result;
    }
    module2.exports = getRawTag;
  }
});

// node_modules/lodash/_objectToString.js
var require_objectToString = __commonJS({
  "node_modules/lodash/_objectToString.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var objectProto = Object.prototype, nativeObjectToString = objectProto.toString;
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }
    module2.exports = objectToString;
  }
});

// node_modules/lodash/_baseGetTag.js
var require_baseGetTag = __commonJS({
  "node_modules/lodash/_baseGetTag.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var Symbol2 = require_Symbol(), getRawTag = require_getRawTag(), objectToString = require_objectToString(), nullTag = "[object Null]", undefinedTag = "[object Undefined]", symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
    function baseGetTag(value) {
      return value == null ? value === void 0 ? undefinedTag : nullTag : symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
    }
    module2.exports = baseGetTag;
  }
});

// node_modules/lodash/isObject.js
var require_isObject = __commonJS({
  "node_modules/lodash/isObject.js": function(exports, module2) {
    init_kolmafia_polyfill();
    function isObject(value) {
      var type = typeof value;
      return value != null && (type == "object" || type == "function");
    }
    module2.exports = isObject;
  }
});

// node_modules/lodash/isFunction.js
var require_isFunction = __commonJS({
  "node_modules/lodash/isFunction.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var baseGetTag = require_baseGetTag(), isObject = require_isObject(), asyncTag = "[object AsyncFunction]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
    function isFunction(value) {
      if (!isObject(value))
        return !1;
      var tag = baseGetTag(value);
      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }
    module2.exports = isFunction;
  }
});

// node_modules/lodash/_coreJsData.js
var require_coreJsData = __commonJS({
  "node_modules/lodash/_coreJsData.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var root = require_root(), coreJsData = root["__core-js_shared__"];
    module2.exports = coreJsData;
  }
});

// node_modules/lodash/_isMasked.js
var require_isMasked = __commonJS({
  "node_modules/lodash/_isMasked.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var coreJsData = require_coreJsData(), maskSrcKey = function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
      return uid ? "Symbol(src)_1." + uid : "";
    }();
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    module2.exports = isMasked;
  }
});

// node_modules/lodash/_toSource.js
var require_toSource = __commonJS({
  "node_modules/lodash/_toSource.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var funcProto = Function.prototype, funcToString = funcProto.toString;
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {
        }
        try {
          return func + "";
        } catch (e) {
        }
      }
      return "";
    }
    module2.exports = toSource;
  }
});

// node_modules/lodash/_baseIsNative.js
var require_baseIsNative = __commonJS({
  "node_modules/lodash/_baseIsNative.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var isFunction = require_isFunction(), isMasked = require_isMasked(), isObject = require_isObject(), toSource = require_toSource(), reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reIsHostCtor = /^\[object .+?Constructor\]$/, funcProto = Function.prototype, objectProto = Object.prototype, funcToString = funcProto.toString, hasOwnProperty = objectProto.hasOwnProperty, reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value))
        return !1;
      var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    module2.exports = baseIsNative;
  }
});

// node_modules/lodash/_getValue.js
var require_getValue = __commonJS({
  "node_modules/lodash/_getValue.js": function(exports, module2) {
    init_kolmafia_polyfill();
    function getValue(object, key) {
      return object == null ? void 0 : object[key];
    }
    module2.exports = getValue;
  }
});

// node_modules/lodash/_getNative.js
var require_getNative = __commonJS({
  "node_modules/lodash/_getNative.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var baseIsNative = require_baseIsNative(), getValue = require_getValue();
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : void 0;
    }
    module2.exports = getNative;
  }
});

// node_modules/lodash/_Map.js
var require_Map = __commonJS({
  "node_modules/lodash/_Map.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var getNative = require_getNative(), root = require_root(), Map2 = getNative(root, "Map");
    module2.exports = Map2;
  }
});

// node_modules/lodash/_nativeCreate.js
var require_nativeCreate = __commonJS({
  "node_modules/lodash/_nativeCreate.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var getNative = require_getNative(), nativeCreate = getNative(Object, "create");
    module2.exports = nativeCreate;
  }
});

// node_modules/lodash/_hashClear.js
var require_hashClear = __commonJS({
  "node_modules/lodash/_hashClear.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var nativeCreate = require_nativeCreate();
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {}, this.size = 0;
    }
    module2.exports = hashClear;
  }
});

// node_modules/lodash/_hashDelete.js
var require_hashDelete = __commonJS({
  "node_modules/lodash/_hashDelete.js": function(exports, module2) {
    init_kolmafia_polyfill();
    function hashDelete(key) {
      var result = this.has(key) && delete this.__data__[key];
      return this.size -= result ? 1 : 0, result;
    }
    module2.exports = hashDelete;
  }
});

// node_modules/lodash/_hashGet.js
var require_hashGet = __commonJS({
  "node_modules/lodash/_hashGet.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var nativeCreate = require_nativeCreate(), HASH_UNDEFINED = "__lodash_hash_undefined__", objectProto = Object.prototype, hasOwnProperty = objectProto.hasOwnProperty;
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? void 0 : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : void 0;
    }
    module2.exports = hashGet;
  }
});

// node_modules/lodash/_hashHas.js
var require_hashHas = __commonJS({
  "node_modules/lodash/_hashHas.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var nativeCreate = require_nativeCreate(), objectProto = Object.prototype, hasOwnProperty = objectProto.hasOwnProperty;
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
    }
    module2.exports = hashHas;
  }
});

// node_modules/lodash/_hashSet.js
var require_hashSet = __commonJS({
  "node_modules/lodash/_hashSet.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var nativeCreate = require_nativeCreate(), HASH_UNDEFINED = "__lodash_hash_undefined__";
    function hashSet(key, value) {
      var data = this.__data__;
      return this.size += this.has(key) ? 0 : 1, data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value, this;
    }
    module2.exports = hashSet;
  }
});

// node_modules/lodash/_Hash.js
var require_Hash = __commonJS({
  "node_modules/lodash/_Hash.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var hashClear = require_hashClear(), hashDelete = require_hashDelete(), hashGet = require_hashGet(), hashHas = require_hashHas(), hashSet = require_hashSet();
    function Hash(entries2) {
      var index = -1, length = entries2 == null ? 0 : entries2.length;
      for (this.clear(); ++index < length; ) {
        var entry = entries2[index];
        this.set(entry[0], entry[1]);
      }
    }
    Hash.prototype.clear = hashClear;
    Hash.prototype.delete = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    module2.exports = Hash;
  }
});

// node_modules/lodash/_mapCacheClear.js
var require_mapCacheClear = __commonJS({
  "node_modules/lodash/_mapCacheClear.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var Hash = require_Hash(), ListCache = require_ListCache(), Map2 = require_Map();
    function mapCacheClear() {
      this.size = 0, this.__data__ = {
        hash: new Hash(),
        map: new (Map2 || ListCache)(),
        string: new Hash()
      };
    }
    module2.exports = mapCacheClear;
  }
});

// node_modules/lodash/_isKeyable.js
var require_isKeyable = __commonJS({
  "node_modules/lodash/_isKeyable.js": function(exports, module2) {
    init_kolmafia_polyfill();
    function isKeyable(value) {
      var type = typeof value;
      return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
    }
    module2.exports = isKeyable;
  }
});

// node_modules/lodash/_getMapData.js
var require_getMapData = __commonJS({
  "node_modules/lodash/_getMapData.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var isKeyable = require_isKeyable();
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
    }
    module2.exports = getMapData;
  }
});

// node_modules/lodash/_mapCacheDelete.js
var require_mapCacheDelete = __commonJS({
  "node_modules/lodash/_mapCacheDelete.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var getMapData = require_getMapData();
    function mapCacheDelete(key) {
      var result = getMapData(this, key).delete(key);
      return this.size -= result ? 1 : 0, result;
    }
    module2.exports = mapCacheDelete;
  }
});

// node_modules/lodash/_mapCacheGet.js
var require_mapCacheGet = __commonJS({
  "node_modules/lodash/_mapCacheGet.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var getMapData = require_getMapData();
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }
    module2.exports = mapCacheGet;
  }
});

// node_modules/lodash/_mapCacheHas.js
var require_mapCacheHas = __commonJS({
  "node_modules/lodash/_mapCacheHas.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var getMapData = require_getMapData();
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }
    module2.exports = mapCacheHas;
  }
});

// node_modules/lodash/_mapCacheSet.js
var require_mapCacheSet = __commonJS({
  "node_modules/lodash/_mapCacheSet.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var getMapData = require_getMapData();
    function mapCacheSet(key, value) {
      var data = getMapData(this, key), size = data.size;
      return data.set(key, value), this.size += data.size == size ? 0 : 1, this;
    }
    module2.exports = mapCacheSet;
  }
});

// node_modules/lodash/_MapCache.js
var require_MapCache = __commonJS({
  "node_modules/lodash/_MapCache.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var mapCacheClear = require_mapCacheClear(), mapCacheDelete = require_mapCacheDelete(), mapCacheGet = require_mapCacheGet(), mapCacheHas = require_mapCacheHas(), mapCacheSet = require_mapCacheSet();
    function MapCache(entries2) {
      var index = -1, length = entries2 == null ? 0 : entries2.length;
      for (this.clear(); ++index < length; ) {
        var entry = entries2[index];
        this.set(entry[0], entry[1]);
      }
    }
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype.delete = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    module2.exports = MapCache;
  }
});

// node_modules/lodash/_stackSet.js
var require_stackSet = __commonJS({
  "node_modules/lodash/_stackSet.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var ListCache = require_ListCache(), Map2 = require_Map(), MapCache = require_MapCache(), LARGE_ARRAY_SIZE = 200;
    function stackSet(key, value) {
      var data = this.__data__;
      if (data instanceof ListCache) {
        var pairs = data.__data__;
        if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1)
          return pairs.push([key, value]), this.size = ++data.size, this;
        data = this.__data__ = new MapCache(pairs);
      }
      return data.set(key, value), this.size = data.size, this;
    }
    module2.exports = stackSet;
  }
});

// node_modules/lodash/_Stack.js
var require_Stack = __commonJS({
  "node_modules/lodash/_Stack.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var ListCache = require_ListCache(), stackClear = require_stackClear(), stackDelete = require_stackDelete(), stackGet = require_stackGet(), stackHas = require_stackHas(), stackSet = require_stackSet();
    function Stack(entries2) {
      var data = this.__data__ = new ListCache(entries2);
      this.size = data.size;
    }
    Stack.prototype.clear = stackClear;
    Stack.prototype.delete = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;
    module2.exports = Stack;
  }
});

// node_modules/lodash/_setCacheAdd.js
var require_setCacheAdd = __commonJS({
  "node_modules/lodash/_setCacheAdd.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    function setCacheAdd(value) {
      return this.__data__.set(value, HASH_UNDEFINED), this;
    }
    module2.exports = setCacheAdd;
  }
});

// node_modules/lodash/_setCacheHas.js
var require_setCacheHas = __commonJS({
  "node_modules/lodash/_setCacheHas.js": function(exports, module2) {
    init_kolmafia_polyfill();
    function setCacheHas(value) {
      return this.__data__.has(value);
    }
    module2.exports = setCacheHas;
  }
});

// node_modules/lodash/_SetCache.js
var require_SetCache = __commonJS({
  "node_modules/lodash/_SetCache.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var MapCache = require_MapCache(), setCacheAdd = require_setCacheAdd(), setCacheHas = require_setCacheHas();
    function SetCache(values2) {
      var index = -1, length = values2 == null ? 0 : values2.length;
      for (this.__data__ = new MapCache(); ++index < length; )
        this.add(values2[index]);
    }
    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
    SetCache.prototype.has = setCacheHas;
    module2.exports = SetCache;
  }
});

// node_modules/lodash/_arraySome.js
var require_arraySome = __commonJS({
  "node_modules/lodash/_arraySome.js": function(exports, module2) {
    init_kolmafia_polyfill();
    function arraySome(array, predicate) {
      for (var index = -1, length = array == null ? 0 : array.length; ++index < length; )
        if (predicate(array[index], index, array))
          return !0;
      return !1;
    }
    module2.exports = arraySome;
  }
});

// node_modules/lodash/_cacheHas.js
var require_cacheHas = __commonJS({
  "node_modules/lodash/_cacheHas.js": function(exports, module2) {
    init_kolmafia_polyfill();
    function cacheHas(cache, key) {
      return cache.has(key);
    }
    module2.exports = cacheHas;
  }
});

// node_modules/lodash/_equalArrays.js
var require_equalArrays = __commonJS({
  "node_modules/lodash/_equalArrays.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var SetCache = require_SetCache(), arraySome = require_arraySome(), cacheHas = require_cacheHas(), COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
    function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
      if (arrLength != othLength && !(isPartial && othLength > arrLength))
        return !1;
      var arrStacked = stack.get(array), othStacked = stack.get(other);
      if (arrStacked && othStacked)
        return arrStacked == other && othStacked == array;
      var index = -1, result = !0, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : void 0;
      for (stack.set(array, other), stack.set(other, array); ++index < arrLength; ) {
        var arrValue = array[index], othValue = other[index];
        if (customizer)
          var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
        if (compared !== void 0) {
          if (compared)
            continue;
          result = !1;
          break;
        }
        if (seen) {
          if (!arraySome(other, function(othValue2, othIndex) {
            if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack)))
              return seen.push(othIndex);
          })) {
            result = !1;
            break;
          }
        } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
          result = !1;
          break;
        }
      }
      return stack.delete(array), stack.delete(other), result;
    }
    module2.exports = equalArrays;
  }
});

// node_modules/lodash/_Uint8Array.js
var require_Uint8Array = __commonJS({
  "node_modules/lodash/_Uint8Array.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var root = require_root(), Uint8Array2 = root.Uint8Array;
    module2.exports = Uint8Array2;
  }
});

// node_modules/lodash/_mapToArray.js
var require_mapToArray = __commonJS({
  "node_modules/lodash/_mapToArray.js": function(exports, module2) {
    init_kolmafia_polyfill();
    function mapToArray(map) {
      var index = -1, result = Array(map.size);
      return map.forEach(function(value, key) {
        result[++index] = [key, value];
      }), result;
    }
    module2.exports = mapToArray;
  }
});

// node_modules/lodash/_setToArray.js
var require_setToArray = __commonJS({
  "node_modules/lodash/_setToArray.js": function(exports, module2) {
    init_kolmafia_polyfill();
    function setToArray(set2) {
      var index = -1, result = Array(set2.size);
      return set2.forEach(function(value) {
        result[++index] = value;
      }), result;
    }
    module2.exports = setToArray;
  }
});

// node_modules/lodash/_equalByTag.js
var require_equalByTag = __commonJS({
  "node_modules/lodash/_equalByTag.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var Symbol2 = require_Symbol(), Uint8Array2 = require_Uint8Array(), eq = require_eq(), equalArrays = require_equalArrays(), mapToArray = require_mapToArray(), setToArray = require_setToArray(), COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2, boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", mapTag = "[object Map]", numberTag = "[object Number]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", symbolProto = Symbol2 ? Symbol2.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
    function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
      switch (tag) {
        case dataViewTag:
          if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset)
            return !1;
          object = object.buffer, other = other.buffer;
        case arrayBufferTag:
          return !(object.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object), new Uint8Array2(other)));
        case boolTag:
        case dateTag:
        case numberTag:
          return eq(+object, +other);
        case errorTag:
          return object.name == other.name && object.message == other.message;
        case regexpTag:
        case stringTag:
          return object == other + "";
        case mapTag:
          var convert = mapToArray;
        case setTag:
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
          if (convert || (convert = setToArray), object.size != other.size && !isPartial)
            return !1;
          var stacked = stack.get(object);
          if (stacked)
            return stacked == other;
          bitmask |= COMPARE_UNORDERED_FLAG, stack.set(object, other);
          var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
          return stack.delete(object), result;
        case symbolTag:
          if (symbolValueOf)
            return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
      return !1;
    }
    module2.exports = equalByTag;
  }
});

// node_modules/lodash/_arrayPush.js
var require_arrayPush = __commonJS({
  "node_modules/lodash/_arrayPush.js": function(exports, module2) {
    init_kolmafia_polyfill();
    function arrayPush(array, values2) {
      for (var index = -1, length = values2.length, offset = array.length; ++index < length; )
        array[offset + index] = values2[index];
      return array;
    }
    module2.exports = arrayPush;
  }
});

// node_modules/lodash/isArray.js
var require_isArray = __commonJS({
  "node_modules/lodash/isArray.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var isArray = Array.isArray;
    module2.exports = isArray;
  }
});

// node_modules/lodash/_baseGetAllKeys.js
var require_baseGetAllKeys = __commonJS({
  "node_modules/lodash/_baseGetAllKeys.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var arrayPush = require_arrayPush(), isArray = require_isArray();
    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
      var result = keysFunc(object);
      return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
    }
    module2.exports = baseGetAllKeys;
  }
});

// node_modules/lodash/_arrayFilter.js
var require_arrayFilter = __commonJS({
  "node_modules/lodash/_arrayFilter.js": function(exports, module2) {
    init_kolmafia_polyfill();
    function arrayFilter(array, predicate) {
      for (var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = []; ++index < length; ) {
        var value = array[index];
        predicate(value, index, array) && (result[resIndex++] = value);
      }
      return result;
    }
    module2.exports = arrayFilter;
  }
});

// node_modules/lodash/stubArray.js
var require_stubArray = __commonJS({
  "node_modules/lodash/stubArray.js": function(exports, module2) {
    init_kolmafia_polyfill();
    function stubArray() {
      return [];
    }
    module2.exports = stubArray;
  }
});

// node_modules/lodash/_getSymbols.js
var require_getSymbols = __commonJS({
  "node_modules/lodash/_getSymbols.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var arrayFilter = require_arrayFilter(), stubArray = require_stubArray(), objectProto = Object.prototype, propertyIsEnumerable = objectProto.propertyIsEnumerable, nativeGetSymbols = Object.getOwnPropertySymbols, getSymbols = nativeGetSymbols ? function(object) {
      return object == null ? [] : (object = Object(object), arrayFilter(nativeGetSymbols(object), function(symbol) {
        return propertyIsEnumerable.call(object, symbol);
      }));
    } : stubArray;
    module2.exports = getSymbols;
  }
});

// node_modules/lodash/_baseTimes.js
var require_baseTimes = __commonJS({
  "node_modules/lodash/_baseTimes.js": function(exports, module2) {
    init_kolmafia_polyfill();
    function baseTimes(n, iteratee) {
      for (var index = -1, result = Array(n); ++index < n; )
        result[index] = iteratee(index);
      return result;
    }
    module2.exports = baseTimes;
  }
});

// node_modules/lodash/isObjectLike.js
var require_isObjectLike = __commonJS({
  "node_modules/lodash/isObjectLike.js": function(exports, module2) {
    init_kolmafia_polyfill();
    function isObjectLike(value) {
      return value != null && typeof value == "object";
    }
    module2.exports = isObjectLike;
  }
});

// node_modules/lodash/_baseIsArguments.js
var require_baseIsArguments = __commonJS({
  "node_modules/lodash/_baseIsArguments.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var baseGetTag = require_baseGetTag(), isObjectLike = require_isObjectLike(), argsTag = "[object Arguments]";
    function baseIsArguments(value) {
      return isObjectLike(value) && baseGetTag(value) == argsTag;
    }
    module2.exports = baseIsArguments;
  }
});

// node_modules/lodash/isArguments.js
var require_isArguments = __commonJS({
  "node_modules/lodash/isArguments.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var baseIsArguments = require_baseIsArguments(), isObjectLike = require_isObjectLike(), objectProto = Object.prototype, hasOwnProperty = objectProto.hasOwnProperty, propertyIsEnumerable = objectProto.propertyIsEnumerable, isArguments = baseIsArguments(function() {
      return arguments;
    }()) ? baseIsArguments : function(value) {
      return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
    };
    module2.exports = isArguments;
  }
});

// node_modules/lodash/stubFalse.js
var require_stubFalse = __commonJS({
  "node_modules/lodash/stubFalse.js": function(exports, module2) {
    init_kolmafia_polyfill();
    function stubFalse() {
      return !1;
    }
    module2.exports = stubFalse;
  }
});

// node_modules/lodash/isBuffer.js
var require_isBuffer = __commonJS({
  "node_modules/lodash/isBuffer.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var root = require_root(), stubFalse = require_stubFalse(), freeExports = typeof exports == "object" && exports && !exports.nodeType && exports, freeModule = freeExports && typeof module2 == "object" && module2 && !module2.nodeType && module2, moduleExports = freeModule && freeModule.exports === freeExports, Buffer2 = moduleExports ? root.Buffer : void 0, nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0, isBuffer = nativeIsBuffer || stubFalse;
    module2.exports = isBuffer;
  }
});

// node_modules/lodash/_isIndex.js
var require_isIndex = __commonJS({
  "node_modules/lodash/_isIndex.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var MAX_SAFE_INTEGER = 9007199254740991, reIsUint = /^(?:0|[1-9]\d*)$/;
    function isIndex(value, length) {
      var type = typeof value;
      return length = length == null ? MAX_SAFE_INTEGER : length, !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
    }
    module2.exports = isIndex;
  }
});

// node_modules/lodash/isLength.js
var require_isLength = __commonJS({
  "node_modules/lodash/isLength.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var MAX_SAFE_INTEGER = 9007199254740991;
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    module2.exports = isLength;
  }
});

// node_modules/lodash/_baseIsTypedArray.js
var require_baseIsTypedArray = __commonJS({
  "node_modules/lodash/_baseIsTypedArray.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var baseGetTag = require_baseGetTag(), isLength = require_isLength(), isObjectLike = require_isObjectLike(), argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag = "[object Object]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", weakMapTag = "[object WeakMap]", arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]", typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = !0;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = !1;
    function baseIsTypedArray(value) {
      return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
    }
    module2.exports = baseIsTypedArray;
  }
});

// node_modules/lodash/_baseUnary.js
var require_baseUnary = __commonJS({
  "node_modules/lodash/_baseUnary.js": function(exports, module2) {
    init_kolmafia_polyfill();
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }
    module2.exports = baseUnary;
  }
});

// node_modules/lodash/_nodeUtil.js
var require_nodeUtil = __commonJS({
  "node_modules/lodash/_nodeUtil.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var freeGlobal = require_freeGlobal(), freeExports = typeof exports == "object" && exports && !exports.nodeType && exports, freeModule = freeExports && typeof module2 == "object" && module2 && !module2.nodeType && module2, moduleExports = freeModule && freeModule.exports === freeExports, freeProcess = moduleExports && freeGlobal.process, nodeUtil = function() {
      try {
        var types = freeModule && freeModule.require && freeModule.require("util").types;
        return types || freeProcess && freeProcess.binding && freeProcess.binding("util");
      } catch (e) {
      }
    }();
    module2.exports = nodeUtil;
  }
});

// node_modules/lodash/isTypedArray.js
var require_isTypedArray = __commonJS({
  "node_modules/lodash/isTypedArray.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var baseIsTypedArray = require_baseIsTypedArray(), baseUnary = require_baseUnary(), nodeUtil = require_nodeUtil(), nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray, isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
    module2.exports = isTypedArray;
  }
});

// node_modules/lodash/_arrayLikeKeys.js
var require_arrayLikeKeys = __commonJS({
  "node_modules/lodash/_arrayLikeKeys.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var baseTimes = require_baseTimes(), isArguments = require_isArguments(), isArray = require_isArray(), isBuffer = require_isBuffer(), isIndex = require_isIndex(), isTypedArray = require_isTypedArray(), objectProto = Object.prototype, hasOwnProperty = objectProto.hasOwnProperty;
    function arrayLikeKeys(value, inherited) {
      var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
      for (var key in value)
        (inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex(key, length))) && result.push(key);
      return result;
    }
    module2.exports = arrayLikeKeys;
  }
});

// node_modules/lodash/_isPrototype.js
var require_isPrototype = __commonJS({
  "node_modules/lodash/_isPrototype.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var objectProto = Object.prototype;
    function isPrototype(value) {
      var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
      return value === proto;
    }
    module2.exports = isPrototype;
  }
});

// node_modules/lodash/_overArg.js
var require_overArg = __commonJS({
  "node_modules/lodash/_overArg.js": function(exports, module2) {
    init_kolmafia_polyfill();
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    module2.exports = overArg;
  }
});

// node_modules/lodash/_nativeKeys.js
var require_nativeKeys = __commonJS({
  "node_modules/lodash/_nativeKeys.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var overArg = require_overArg(), nativeKeys = overArg(Object.keys, Object);
    module2.exports = nativeKeys;
  }
});

// node_modules/lodash/_baseKeys.js
var require_baseKeys = __commonJS({
  "node_modules/lodash/_baseKeys.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var isPrototype = require_isPrototype(), nativeKeys = require_nativeKeys(), objectProto = Object.prototype, hasOwnProperty = objectProto.hasOwnProperty;
    function baseKeys(object) {
      if (!isPrototype(object))
        return nativeKeys(object);
      var result = [];
      for (var key in Object(object))
        hasOwnProperty.call(object, key) && key != "constructor" && result.push(key);
      return result;
    }
    module2.exports = baseKeys;
  }
});

// node_modules/lodash/isArrayLike.js
var require_isArrayLike = __commonJS({
  "node_modules/lodash/isArrayLike.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var isFunction = require_isFunction(), isLength = require_isLength();
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }
    module2.exports = isArrayLike;
  }
});

// node_modules/lodash/keys.js
var require_keys = __commonJS({
  "node_modules/lodash/keys.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var arrayLikeKeys = require_arrayLikeKeys(), baseKeys = require_baseKeys(), isArrayLike = require_isArrayLike();
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }
    module2.exports = keys;
  }
});

// node_modules/lodash/_getAllKeys.js
var require_getAllKeys = __commonJS({
  "node_modules/lodash/_getAllKeys.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var baseGetAllKeys = require_baseGetAllKeys(), getSymbols = require_getSymbols(), keys = require_keys();
    function getAllKeys(object) {
      return baseGetAllKeys(object, keys, getSymbols);
    }
    module2.exports = getAllKeys;
  }
});

// node_modules/lodash/_equalObjects.js
var require_equalObjects = __commonJS({
  "node_modules/lodash/_equalObjects.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var getAllKeys = require_getAllKeys(), COMPARE_PARTIAL_FLAG = 1, objectProto = Object.prototype, hasOwnProperty = objectProto.hasOwnProperty;
    function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
      if (objLength != othLength && !isPartial)
        return !1;
      for (var index = objLength; index--; ) {
        var key = objProps[index];
        if (!(isPartial ? key in other : hasOwnProperty.call(other, key)))
          return !1;
      }
      var objStacked = stack.get(object), othStacked = stack.get(other);
      if (objStacked && othStacked)
        return objStacked == other && othStacked == object;
      var result = !0;
      stack.set(object, other), stack.set(other, object);
      for (var skipCtor = isPartial; ++index < objLength; ) {
        key = objProps[index];
        var objValue = object[key], othValue = other[key];
        if (customizer)
          var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
        if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
          result = !1;
          break;
        }
        skipCtor || (skipCtor = key == "constructor");
      }
      if (result && !skipCtor) {
        var objCtor = object.constructor, othCtor = other.constructor;
        objCtor != othCtor && "constructor" in object && "constructor" in other && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor) && (result = !1);
      }
      return stack.delete(object), stack.delete(other), result;
    }
    module2.exports = equalObjects;
  }
});

// node_modules/lodash/_DataView.js
var require_DataView = __commonJS({
  "node_modules/lodash/_DataView.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var getNative = require_getNative(), root = require_root(), DataView = getNative(root, "DataView");
    module2.exports = DataView;
  }
});

// node_modules/lodash/_Promise.js
var require_Promise = __commonJS({
  "node_modules/lodash/_Promise.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var getNative = require_getNative(), root = require_root(), Promise2 = getNative(root, "Promise");
    module2.exports = Promise2;
  }
});

// node_modules/lodash/_Set.js
var require_Set = __commonJS({
  "node_modules/lodash/_Set.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var getNative = require_getNative(), root = require_root(), Set2 = getNative(root, "Set");
    module2.exports = Set2;
  }
});

// node_modules/lodash/_WeakMap.js
var require_WeakMap = __commonJS({
  "node_modules/lodash/_WeakMap.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var getNative = require_getNative(), root = require_root(), WeakMap2 = getNative(root, "WeakMap");
    module2.exports = WeakMap2;
  }
});

// node_modules/lodash/_getTag.js
var require_getTag = __commonJS({
  "node_modules/lodash/_getTag.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var DataView = require_DataView(), Map2 = require_Map(), Promise2 = require_Promise(), Set2 = require_Set(), WeakMap2 = require_WeakMap(), baseGetTag = require_baseGetTag(), toSource = require_toSource(), mapTag = "[object Map]", objectTag = "[object Object]", promiseTag = "[object Promise]", setTag = "[object Set]", weakMapTag = "[object WeakMap]", dataViewTag = "[object DataView]", dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map2), promiseCtorString = toSource(Promise2), setCtorString = toSource(Set2), weakMapCtorString = toSource(WeakMap2), getTag = baseGetTag;
    (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap2 && getTag(new WeakMap2()) != weakMapTag) && (getTag = function(value) {
      var result = baseGetTag(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
      if (ctorString)
        switch (ctorString) {
          case dataViewCtorString:
            return dataViewTag;
          case mapCtorString:
            return mapTag;
          case promiseCtorString:
            return promiseTag;
          case setCtorString:
            return setTag;
          case weakMapCtorString:
            return weakMapTag;
        }
      return result;
    });
    module2.exports = getTag;
  }
});

// node_modules/lodash/_baseIsEqualDeep.js
var require_baseIsEqualDeep = __commonJS({
  "node_modules/lodash/_baseIsEqualDeep.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var Stack = require_Stack(), equalArrays = require_equalArrays(), equalByTag = require_equalByTag(), equalObjects = require_equalObjects(), getTag = require_getTag(), isArray = require_isArray(), isBuffer = require_isBuffer(), isTypedArray = require_isTypedArray(), COMPARE_PARTIAL_FLAG = 1, argsTag = "[object Arguments]", arrayTag = "[object Array]", objectTag = "[object Object]", objectProto = Object.prototype, hasOwnProperty = objectProto.hasOwnProperty;
    function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
      var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
      objTag = objTag == argsTag ? objectTag : objTag, othTag = othTag == argsTag ? objectTag : othTag;
      var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
      if (isSameTag && isBuffer(object)) {
        if (!isBuffer(other))
          return !1;
        objIsArr = !0, objIsObj = !1;
      }
      if (isSameTag && !objIsObj)
        return stack || (stack = new Stack()), objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
      if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
        var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
        if (objIsWrapped || othIsWrapped) {
          var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
          return stack || (stack = new Stack()), equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
        }
      }
      return isSameTag ? (stack || (stack = new Stack()), equalObjects(object, other, bitmask, customizer, equalFunc, stack)) : !1;
    }
    module2.exports = baseIsEqualDeep;
  }
});

// node_modules/lodash/_baseIsEqual.js
var require_baseIsEqual = __commonJS({
  "node_modules/lodash/_baseIsEqual.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var baseIsEqualDeep = require_baseIsEqualDeep(), isObjectLike = require_isObjectLike();
    function baseIsEqual(value, other, bitmask, customizer, stack) {
      return value === other ? !0 : value == null || other == null || !isObjectLike(value) && !isObjectLike(other) ? value !== value && other !== other : baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
    }
    module2.exports = baseIsEqual;
  }
});

// node_modules/lodash/isEqual.js
var require_isEqual = __commonJS({
  "node_modules/lodash/isEqual.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var baseIsEqual = require_baseIsEqual();
    function isEqual2(value, other) {
      return baseIsEqual(value, other);
    }
    module2.exports = isEqual2;
  }
});

// node_modules/lodash/isSymbol.js
var require_isSymbol = __commonJS({
  "node_modules/lodash/isSymbol.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var baseGetTag = require_baseGetTag(), isObjectLike = require_isObjectLike(), symbolTag = "[object Symbol]";
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
    }
    module2.exports = isSymbol;
  }
});

// node_modules/lodash/_baseExtremum.js
var require_baseExtremum = __commonJS({
  "node_modules/lodash/_baseExtremum.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var isSymbol = require_isSymbol();
    function baseExtremum(array, iteratee, comparator) {
      for (var index = -1, length = array.length; ++index < length; ) {
        var value = array[index], current = iteratee(value);
        if (current != null && (computed === void 0 ? current === current && !isSymbol(current) : comparator(current, computed)))
          var computed = current, result = value;
      }
      return result;
    }
    module2.exports = baseExtremum;
  }
});

// node_modules/lodash/_baseGt.js
var require_baseGt = __commonJS({
  "node_modules/lodash/_baseGt.js": function(exports, module2) {
    init_kolmafia_polyfill();
    function baseGt(value, other) {
      return value > other;
    }
    module2.exports = baseGt;
  }
});

// node_modules/lodash/_baseIsMatch.js
var require_baseIsMatch = __commonJS({
  "node_modules/lodash/_baseIsMatch.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var Stack = require_Stack(), baseIsEqual = require_baseIsEqual(), COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
    function baseIsMatch(object, source, matchData, customizer) {
      var index = matchData.length, length = index, noCustomizer = !customizer;
      if (object == null)
        return !length;
      for (object = Object(object); index--; ) {
        var data = matchData[index];
        if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object))
          return !1;
      }
      for (; ++index < length; ) {
        data = matchData[index];
        var key = data[0], objValue = object[key], srcValue = data[1];
        if (noCustomizer && data[2]) {
          if (objValue === void 0 && !(key in object))
            return !1;
        } else {
          var stack = new Stack();
          if (customizer)
            var result = customizer(objValue, srcValue, key, object, source, stack);
          if (!(result === void 0 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result))
            return !1;
        }
      }
      return !0;
    }
    module2.exports = baseIsMatch;
  }
});

// node_modules/lodash/_isStrictComparable.js
var require_isStrictComparable = __commonJS({
  "node_modules/lodash/_isStrictComparable.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var isObject = require_isObject();
    function isStrictComparable(value) {
      return value === value && !isObject(value);
    }
    module2.exports = isStrictComparable;
  }
});

// node_modules/lodash/_getMatchData.js
var require_getMatchData = __commonJS({
  "node_modules/lodash/_getMatchData.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var isStrictComparable = require_isStrictComparable(), keys = require_keys();
    function getMatchData(object) {
      for (var result = keys(object), length = result.length; length--; ) {
        var key = result[length], value = object[key];
        result[length] = [key, value, isStrictComparable(value)];
      }
      return result;
    }
    module2.exports = getMatchData;
  }
});

// node_modules/lodash/_matchesStrictComparable.js
var require_matchesStrictComparable = __commonJS({
  "node_modules/lodash/_matchesStrictComparable.js": function(exports, module2) {
    init_kolmafia_polyfill();
    function matchesStrictComparable(key, srcValue) {
      return function(object) {
        return object == null ? !1 : object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
      };
    }
    module2.exports = matchesStrictComparable;
  }
});

// node_modules/lodash/_baseMatches.js
var require_baseMatches = __commonJS({
  "node_modules/lodash/_baseMatches.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var baseIsMatch = require_baseIsMatch(), getMatchData = require_getMatchData(), matchesStrictComparable = require_matchesStrictComparable();
    function baseMatches(source) {
      var matchData = getMatchData(source);
      return matchData.length == 1 && matchData[0][2] ? matchesStrictComparable(matchData[0][0], matchData[0][1]) : function(object) {
        return object === source || baseIsMatch(object, source, matchData);
      };
    }
    module2.exports = baseMatches;
  }
});

// node_modules/lodash/_isKey.js
var require_isKey = __commonJS({
  "node_modules/lodash/_isKey.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var isArray = require_isArray(), isSymbol = require_isSymbol(), reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/;
    function isKey(value, object) {
      if (isArray(value))
        return !1;
      var type = typeof value;
      return type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value) ? !0 : reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
    }
    module2.exports = isKey;
  }
});

// node_modules/lodash/memoize.js
var require_memoize = __commonJS({
  "node_modules/lodash/memoize.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var MapCache = require_MapCache(), FUNC_ERROR_TEXT = "Expected a function";
    function memoize(func, resolver) {
      if (typeof func != "function" || resolver != null && typeof resolver != "function")
        throw new TypeError(FUNC_ERROR_TEXT);
      var memoized = function memoized2() {
        var args3 = arguments, key = resolver ? resolver.apply(this, args3) : args3[0], cache = memoized2.cache;
        if (cache.has(key))
          return cache.get(key);
        var result = func.apply(this, args3);
        return memoized2.cache = cache.set(key, result) || cache, result;
      };
      return memoized.cache = new (memoize.Cache || MapCache)(), memoized;
    }
    memoize.Cache = MapCache;
    module2.exports = memoize;
  }
});

// node_modules/lodash/_memoizeCapped.js
var require_memoizeCapped = __commonJS({
  "node_modules/lodash/_memoizeCapped.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var memoize = require_memoize(), MAX_MEMOIZE_SIZE = 500;
    function memoizeCapped(func) {
      var result = memoize(func, function(key) {
        return cache.size === MAX_MEMOIZE_SIZE && cache.clear(), key;
      }), cache = result.cache;
      return result;
    }
    module2.exports = memoizeCapped;
  }
});

// node_modules/lodash/_stringToPath.js
var require_stringToPath = __commonJS({
  "node_modules/lodash/_stringToPath.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var memoizeCapped = require_memoizeCapped(), rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, reEscapeChar = /\\(\\)?/g, stringToPath = memoizeCapped(function(string) {
      var result = [];
      return string.charCodeAt(0) === 46 && result.push(""), string.replace(rePropName, function(match, number, quote, subString) {
        result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
      }), result;
    });
    module2.exports = stringToPath;
  }
});

// node_modules/lodash/_arrayMap.js
var require_arrayMap = __commonJS({
  "node_modules/lodash/_arrayMap.js": function(exports, module2) {
    init_kolmafia_polyfill();
    function arrayMap(array, iteratee) {
      for (var index = -1, length = array == null ? 0 : array.length, result = Array(length); ++index < length; )
        result[index] = iteratee(array[index], index, array);
      return result;
    }
    module2.exports = arrayMap;
  }
});

// node_modules/lodash/_baseToString.js
var require_baseToString = __commonJS({
  "node_modules/lodash/_baseToString.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var Symbol2 = require_Symbol(), arrayMap = require_arrayMap(), isArray = require_isArray(), isSymbol = require_isSymbol(), INFINITY = 1 / 0, symbolProto = Symbol2 ? Symbol2.prototype : void 0, symbolToString = symbolProto ? symbolProto.toString : void 0;
    function baseToString(value) {
      if (typeof value == "string")
        return value;
      if (isArray(value))
        return arrayMap(value, baseToString) + "";
      if (isSymbol(value))
        return symbolToString ? symbolToString.call(value) : "";
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    module2.exports = baseToString;
  }
});

// node_modules/lodash/toString.js
var require_toString = __commonJS({
  "node_modules/lodash/toString.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var baseToString = require_baseToString();
    function toString(value) {
      return value == null ? "" : baseToString(value);
    }
    module2.exports = toString;
  }
});

// node_modules/lodash/_castPath.js
var require_castPath = __commonJS({
  "node_modules/lodash/_castPath.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var isArray = require_isArray(), isKey = require_isKey(), stringToPath = require_stringToPath(), toString = require_toString();
    function castPath(value, object) {
      return isArray(value) ? value : isKey(value, object) ? [value] : stringToPath(toString(value));
    }
    module2.exports = castPath;
  }
});

// node_modules/lodash/_toKey.js
var require_toKey = __commonJS({
  "node_modules/lodash/_toKey.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var isSymbol = require_isSymbol(), INFINITY = 1 / 0;
    function toKey(value) {
      if (typeof value == "string" || isSymbol(value))
        return value;
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    module2.exports = toKey;
  }
});

// node_modules/lodash/_baseGet.js
var require_baseGet = __commonJS({
  "node_modules/lodash/_baseGet.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var castPath = require_castPath(), toKey = require_toKey();
    function baseGet(object, path) {
      path = castPath(path, object);
      for (var index = 0, length = path.length; object != null && index < length; )
        object = object[toKey(path[index++])];
      return index && index == length ? object : void 0;
    }
    module2.exports = baseGet;
  }
});

// node_modules/lodash/get.js
var require_get = __commonJS({
  "node_modules/lodash/get.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var baseGet = require_baseGet();
    function get3(object, path, defaultValue) {
      var result = object == null ? void 0 : baseGet(object, path);
      return result === void 0 ? defaultValue : result;
    }
    module2.exports = get3;
  }
});

// node_modules/lodash/_baseHasIn.js
var require_baseHasIn = __commonJS({
  "node_modules/lodash/_baseHasIn.js": function(exports, module2) {
    init_kolmafia_polyfill();
    function baseHasIn(object, key) {
      return object != null && key in Object(object);
    }
    module2.exports = baseHasIn;
  }
});

// node_modules/lodash/_hasPath.js
var require_hasPath = __commonJS({
  "node_modules/lodash/_hasPath.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var castPath = require_castPath(), isArguments = require_isArguments(), isArray = require_isArray(), isIndex = require_isIndex(), isLength = require_isLength(), toKey = require_toKey();
    function hasPath(object, path, hasFunc) {
      path = castPath(path, object);
      for (var index = -1, length = path.length, result = !1; ++index < length; ) {
        var key = toKey(path[index]);
        if (!(result = object != null && hasFunc(object, key)))
          break;
        object = object[key];
      }
      return result || ++index != length ? result : (length = object == null ? 0 : object.length, !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object)));
    }
    module2.exports = hasPath;
  }
});

// node_modules/lodash/hasIn.js
var require_hasIn = __commonJS({
  "node_modules/lodash/hasIn.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var baseHasIn = require_baseHasIn(), hasPath = require_hasPath();
    function hasIn(object, path) {
      return object != null && hasPath(object, path, baseHasIn);
    }
    module2.exports = hasIn;
  }
});

// node_modules/lodash/_baseMatchesProperty.js
var require_baseMatchesProperty = __commonJS({
  "node_modules/lodash/_baseMatchesProperty.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var baseIsEqual = require_baseIsEqual(), get3 = require_get(), hasIn = require_hasIn(), isKey = require_isKey(), isStrictComparable = require_isStrictComparable(), matchesStrictComparable = require_matchesStrictComparable(), toKey = require_toKey(), COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
    function baseMatchesProperty(path, srcValue) {
      return isKey(path) && isStrictComparable(srcValue) ? matchesStrictComparable(toKey(path), srcValue) : function(object) {
        var objValue = get3(object, path);
        return objValue === void 0 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
      };
    }
    module2.exports = baseMatchesProperty;
  }
});

// node_modules/lodash/identity.js
var require_identity = __commonJS({
  "node_modules/lodash/identity.js": function(exports, module2) {
    init_kolmafia_polyfill();
    function identity(value) {
      return value;
    }
    module2.exports = identity;
  }
});

// node_modules/lodash/_baseProperty.js
var require_baseProperty = __commonJS({
  "node_modules/lodash/_baseProperty.js": function(exports, module2) {
    init_kolmafia_polyfill();
    function baseProperty(key) {
      return function(object) {
        return object == null ? void 0 : object[key];
      };
    }
    module2.exports = baseProperty;
  }
});

// node_modules/lodash/_basePropertyDeep.js
var require_basePropertyDeep = __commonJS({
  "node_modules/lodash/_basePropertyDeep.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var baseGet = require_baseGet();
    function basePropertyDeep(path) {
      return function(object) {
        return baseGet(object, path);
      };
    }
    module2.exports = basePropertyDeep;
  }
});

// node_modules/lodash/property.js
var require_property = __commonJS({
  "node_modules/lodash/property.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var baseProperty = require_baseProperty(), basePropertyDeep = require_basePropertyDeep(), isKey = require_isKey(), toKey = require_toKey();
    function property(path) {
      return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
    }
    module2.exports = property;
  }
});

// node_modules/lodash/_baseIteratee.js
var require_baseIteratee = __commonJS({
  "node_modules/lodash/_baseIteratee.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var baseMatches = require_baseMatches(), baseMatchesProperty = require_baseMatchesProperty(), identity = require_identity(), isArray = require_isArray(), property = require_property();
    function baseIteratee(value) {
      return typeof value == "function" ? value : value == null ? identity : typeof value == "object" ? isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value) : property(value);
    }
    module2.exports = baseIteratee;
  }
});

// node_modules/lodash/maxBy.js
var require_maxBy = __commonJS({
  "node_modules/lodash/maxBy.js": function(exports, module2) {
    init_kolmafia_polyfill();
    var baseExtremum = require_baseExtremum(), baseGt = require_baseGt(), baseIteratee = require_baseIteratee();
    function maxBy3(array, iteratee) {
      return array && array.length ? baseExtremum(array, baseIteratee(iteratee, 2), baseGt) : void 0;
    }
    module2.exports = maxBy3;
  }
});

// src/main.ts
var main_exports = {};
__export(main_exports, {
  main: function() {
    return main;
  }
});
module.exports = __toCommonJS(main_exports);
init_kolmafia_polyfill();

// node_modules/grimoire-kolmafia/dist/index.js
init_kolmafia_polyfill();

// node_modules/grimoire-kolmafia/dist/args.js
init_kolmafia_polyfill();
var import_kolmafia18 = require("kolmafia");

// node_modules/libram/dist/index.js
init_kolmafia_polyfill();

// node_modules/libram/dist/combat.js
init_kolmafia_polyfill();
var import_kolmafia4 = require("kolmafia");

// node_modules/libram/dist/lib.js
init_kolmafia_polyfill();

// node_modules/core-js/modules/es.object.entries.js
init_kolmafia_polyfill();
var $ = require_export(), $entries = require_object_to_array().entries;
$({
  target: "Object",
  stat: !0
}, {
  entries: function(O) {
    return $entries(O);
  }
});

// node_modules/libram/dist/lib.js
var import_flat = __toESM(require_flat5()), import_kolmafia3 = require("kolmafia");

// node_modules/libram/dist/property.js
init_kolmafia_polyfill();

// node_modules/core-js/modules/es.object.from-entries.js
init_kolmafia_polyfill();
var $2 = require_export(), iterate = require_iterate(), createProperty = require_create_property();
$2({
  target: "Object",
  stat: !0
}, {
  fromEntries: function(iterable) {
    var obj = {};
    return iterate(iterable, function(k, v) {
      createProperty(obj, k, v);
    }, {
      AS_ENTRIES: !0
    }), obj;
  }
});

// node_modules/libram/dist/property.js
var import_kolmafia = require("kolmafia");

// node_modules/libram/dist/propertyTyping.js
init_kolmafia_polyfill();

// node_modules/libram/dist/propertyTypes.js
init_kolmafia_polyfill();
var booleanProperties = ["abortOnChoiceWhenNotInChoice", "addChatCommandLine", "addCreationQueue", "addStatusBarToFrames", "allowCloseableDesktopTabs", "allowNegativeTally", "allowNonMoodBurning", "allowSummonBurning", "autoHighlightOnFocus", "broadcastEvents", "cacheMallSearches", "chatBeep", "chatLinksUseRelay", "compactChessboard", "copyAsHTML", "customizedTabs", "debugBuy", "debugConsequences", "debugFoxtrotRemoval", "debugPathnames", "gapProtection", "gitInstallDependencies", "gitShowCommitMessages", "gitUpdateOnLogin", "greenScreenProtection", "guiUsesOneWindow", "hideServerDebugText", "logAcquiredItems", "logBattleAction", "logBrowserInteractions", "logChatMessages", "logChatRequests", "logCleanedHTML", "logDecoratedResponses", "logFamiliarActions", "logGainMessages", "logReadableHTML", "logPreferenceChange", "logMonsterHealth", "logReverseOrder", "logStatGains", "logStatusEffects", "logStatusOnLogin", "macroDebug", "macroLens", "mementoListActive", "mergeHobopolisChat", "printStackOnAbort", "proxySet", "relayAddSounds", "relayAddsCustomCombat", "relayAddsDiscoHelper", "relayAddsGraphicalCLI", "relayAddsQuickScripts", "relayAddsRestoreLinks", "relayAddsUpArrowLinks", "relayAddsUseLinks", "relayAddsWikiLinks", "relayAllowRemoteAccess", "relayBrowserOnly", "relayCacheUncacheable", "relayFormatsChatText", "relayHidesJunkMallItems", "relayMaintainsEffects", "relayMaintainsHealth", "relayMaintainsMana", "relayOverridesImages", "relayRunsAfterAdventureScript", "relayRunsBeforeBattleScript", "relayRunsBeforePVPScript", "relayScriptButtonFirst", "relayTextualizesEffects", "relayTrimsZapList", "relayUsesInlineLinks", "relayUsesIntegratedChat", "relayWarnOnRecoverFailure", "removeMalignantEffects", "saveSettingsOnSet", "sharePriceData", "showAllRequests", "showExceptionalRequests", "stealthLogin", "svnInstallDependencies", "svnShowCommitMessages", "svnUpdateOnLogin", "switchEquipmentForBuffs", "syncAfterSvnUpdate", "useChatToolbar", "useContactsFrame", "useDevProxyServer", "useDockIconBadge", "useHugglerChannel", "useImageCache", "useLastUserAgent", "useSystemTrayIcon", "useTabbedChatFrame", "useToolbars", "useCachedVolcanoMaps", "useZoneComboBox", "verboseSpeakeasy", "verboseFloundry", "wrapLongLines", "_gitUpdated", "_svnRepoFileFetched", "_svnUpdated", "antagonisticSnowmanKitAvailable", "arcadeGameHints", "armoryUnlocked", "autoForbidIgnoringStores", "autoCraft", "autoQuest", "autoEntangle", "autoGarish", "autoManaRestore", "autoFillMayoMinder", "autoPinkyRing", "autoPlantHardcore", "autoPlantSoftcore", "autoPotionID", "autoRepairBoxServants", "autoSatisfyWithCloset", "autoSatisfyWithCoinmasters", "autoSatisfyWithMall", "autoSatisfyWithNPCs", "autoSatisfyWithStash", "autoSatisfyWithStorage", "autoSetConditions", "autoSteal", "autoTuxedo", "backupCameraReverserEnabled", "badMoonEncounter01", "badMoonEncounter02", "badMoonEncounter03", "badMoonEncounter04", "badMoonEncounter05", "badMoonEncounter06", "badMoonEncounter07", "badMoonEncounter08", "badMoonEncounter09", "badMoonEncounter10", "badMoonEncounter11", "badMoonEncounter12", "badMoonEncounter13", "badMoonEncounter14", "badMoonEncounter15", "badMoonEncounter16", "badMoonEncounter17", "badMoonEncounter18", "badMoonEncounter19", "badMoonEncounter20", "badMoonEncounter21", "badMoonEncounter22", "badMoonEncounter23", "badMoonEncounter24", "badMoonEncounter25", "badMoonEncounter26", "badMoonEncounter27", "badMoonEncounter28", "badMoonEncounter29", "badMoonEncounter30", "badMoonEncounter31", "badMoonEncounter32", "badMoonEncounter33", "badMoonEncounter34", "badMoonEncounter35", "badMoonEncounter36", "badMoonEncounter37", "badMoonEncounter38", "badMoonEncounter39", "badMoonEncounter40", "badMoonEncounter41", "badMoonEncounter42", "badMoonEncounter43", "badMoonEncounter44", "badMoonEncounter45", "badMoonEncounter46", "badMoonEncounter47", "badMoonEncounter48", "barrelShrineUnlocked", "bigBrotherRescued", "blackBartsBootyAvailable", "bondAdv", "bondBeach", "bondBeat", "bondBooze", "bondBridge", "bondDesert", "bondDR", "bondDrunk1", "bondDrunk2", "bondHoney", "bondHP", "bondInit", "bondItem1", "bondItem2", "bondItem3", "bondJetpack", "bondMartiniDelivery", "bondMartiniPlus", "bondMartiniTurn", "bondMeat", "bondMox1", "bondMox2", "bondMPregen", "bondMus1", "bondMus2", "bondMys1", "bondMys2", "bondSpleen", "bondStat", "bondStat2", "bondStealth", "bondStealth2", "bondSymbols", "bondWar", "bondWeapon2", "bondWpn", "booPeakLit", "bootsCharged", "breakfastCompleted", "burrowgrubHiveUsed", "calzoneOfLegendEaten", "canteenUnlocked", "chaosButterflyThrown", "chatbotScriptExecuted", "chateauAvailable", "chatLiterate", "chatServesUpdates", "checkJackassHardcore", "checkJackassSoftcore", "clanAttacksEnabled", "coldAirportAlways", "considerShadowNoodles", "controlRoomUnlock", "concertVisited", "controlPanel1", "controlPanel2", "controlPanel3", "controlPanel4", "controlPanel5", "controlPanel6", "controlPanel7", "controlPanel8", "controlPanel9", "corralUnlocked", "dailyDungeonDone", "dampOldBootPurchased", "daycareOpen", "deepDishOfLegendEaten", "demonSummoned", "dinseyAudienceEngagement", "dinseyGarbagePirate", "dinseyRapidPassEnabled", "dinseyRollercoasterNext", "dinseySafetyProtocolsLoose", "doghouseBoarded", "dontStopForCounters", "drippingHallUnlocked", "drippyShieldUnlocked", "edUsedLash", "eldritchFissureAvailable", "eldritchHorrorAvailable", "essenceOfAnnoyanceAvailable", "essenceOfBearAvailable", "expressCardUsed", "falloutShelterChronoUsed", "falloutShelterCoolingTankUsed", "fireExtinguisherBatHoleUsed", "fireExtinguisherChasmUsed", "fireExtinguisherCyrptUsed", "fireExtinguisherDesertUsed", "fireExtinguisherHaremUsed", "fistTeachingsHaikuDungeon", "fistTeachingsPokerRoom", "fistTeachingsBarroomBrawl", "fistTeachingsConservatory", "fistTeachingsBatHole", "fistTeachingsFunHouse", "fistTeachingsMenagerie", "fistTeachingsSlums", "fistTeachingsFratHouse", "fistTeachingsRoad", "fistTeachingsNinjaSnowmen", "flickeringPixel1", "flickeringPixel2", "flickeringPixel3", "flickeringPixel4", "flickeringPixel5", "flickeringPixel6", "flickeringPixel7", "flickeringPixel8", "frAlways", "frCemetaryUnlocked", "friarsBlessingReceived", "frMountainsUnlocked", "frSwampUnlocked", "frVillageUnlocked", "frWoodUnlocked", "getawayCampsiteUnlocked", "ghostPencil1", "ghostPencil2", "ghostPencil3", "ghostPencil4", "ghostPencil5", "ghostPencil6", "ghostPencil7", "ghostPencil8", "ghostPencil9", "gingerAdvanceClockUnlocked", "gingerBlackmailAccomplished", "gingerbreadCityAvailable", "gingerExtraAdventures", "gingerNegativesDropped", "gingerSewersUnlocked", "gingerSubwayLineUnlocked", "gingerRetailUnlocked", "glitchItemAvailable", "grabCloversHardcore", "grabCloversSoftcore", "guideToSafariAvailable", "guyMadeOfBeesDefeated", "hallowienerDefiledNook", "hallowienerGuanoJunction", "hallowienerKnollGym", "hallowienerMadnessBakery", "hallowienerMiddleChamber", "hallowienerOvergrownLot", "hallowienerSkeletonStore", "hallowienerSmutOrcs", "hallowienerSonofaBeach", "hallowienerVolcoino", "hardcorePVPWarning", "harvestBatteriesHardcore", "harvestBatteriesSoftcore", "hasAutumnaton", "hasBartender", "hasChef", "hasCocktailKit", "hasCosmicBowlingBall", "hasDetectiveSchool", "hasMaydayContract", "hasOven", "hasRange", "hasShaker", "hasSushiMat", "haveBoxingDaydreamHardcore", "haveBoxingDaydreamSoftcore", "hermitHax0red", "holidayHalsBookAvailable", "horseryAvailable", "hotAirportAlways", "implementGlitchItem", "intenseCurrents", "itemBoughtPerAscension637", "itemBoughtPerAscension8266", "itemBoughtPerAscension10790", "itemBoughtPerAscension10794", "itemBoughtPerAscension10795", "itemBoughtPerCharacter6423", "itemBoughtPerCharacter6428", "itemBoughtPerCharacter6429", "kingLiberated", "lastPirateInsult1", "lastPirateInsult2", "lastPirateInsult3", "lastPirateInsult4", "lastPirateInsult5", "lastPirateInsult6", "lastPirateInsult7", "lastPirateInsult8", "lawOfAveragesAvailable", "leafletCompleted", "libraryCardUsed", "lockPicked", "logBastilleBattalionBattles", "loginRecoveryHardcore", "loginRecoverySoftcore", "lovebugsUnlocked", "loveTunnelAvailable", "lowerChamberUnlock", "madnessBakeryAvailable", "makePocketWishesHardcore", "makePocketWishesSoftcore", "manualOfNumberologyAvailable", "mappingMonsters", "mapToAnemoneMinePurchased", "mapToKokomoAvailable", "mapToMadnessReefPurchased", "mapToTheDiveBarPurchased", "mapToTheMarinaraTrenchPurchased", "mapToTheSkateParkPurchased", "maraisBeaverUnlock", "maraisCorpseUnlock", "maraisDarkUnlock", "maraisVillageUnlock", "maraisWildlifeUnlock", "maraisWizardUnlock", "maximizerAlwaysCurrent", "maximizerCreateOnHand", "maximizerCurrentMallPrices", "maximizerFoldables", "maximizerIncludeAll", "maximizerNoAdventures", "middleChamberUnlock", "milkOfMagnesiumActive", "moonTuned", "neverendingPartyAlways", "odeBuffbotCheck", "oilPeakLit", "oscusSodaUsed", "outrageousSombreroUsed", "overgrownLotAvailable", "ownsSpeakeasy", "pathedSummonsHardcore", "pathedSummonsSoftcore", "pizzaOfLegendEaten", "popularTartUnlocked", "potatoAlarmClockUsed", "prAlways", "prayedForGlamour", "prayedForProtection", "prayedForVigor", "primaryLabCheerCoreGrabbed", "pyramidBombUsed", "ROMOfOptimalityAvailable", "rageGlandVented", "readManualHardcore", "readManualSoftcore", "relayShowSpoilers", "relayShowWarnings", "rememberDesktopSize", "restUsingChateau", "restUsingCampAwayTent", "requireBoxServants", "requireSewerTestItems", "safePickpocket", "schoolOfHardKnocksDiplomaAvailable", "scriptCascadingMenus", "serverAddsCustomCombat", "SHAWARMAInitiativeUnlocked", "showForbiddenStores", "showGainsPerUnit", "showIgnoringStorePrices", "showNoSummonOnly", "showTurnFreeOnly", "skeletonStoreAvailable", "sleazeAirportAlways", "snojoAvailable", "sortByRoom", "spacegateAlways", "spacegateVaccine1", "spacegateVaccine2", "spacegateVaccine3", "spaceInvaderDefeated", "spelunkyHints", "spiceMelangeUsed", "spookyAirportAlways", "stenchAirportAlways", "stopForFixedWanderer", "stopForUltraRare", "styxPixieVisited", "suppressInappropriateNags", "suppressPowerPixellation", "suppressMallPriceCacheMessages", "telegraphOfficeAvailable", "telescopeLookedHigh", "timeTowerAvailable", "trackLightsOut", "uneffectWithHotTub", "universalSeasoningActive", "universalSeasoningAvailable", "useBookOfEverySkillHardcore", "useBookOfEverySkillSoftcore", "useCrimboToysHardcore", "useCrimboToysSoftcore", "verboseMaximizer", "visitLoungeHardcore", "visitLoungeSoftcore", "visitRumpusHardcore", "visitRumpusSoftcore", "voteAlways", "wildfireBarrelCaulked", "wildfireDusted", "wildfireFracked", "wildfirePumpGreased", "wildfireSprinkled", "yearbookCameraPending", "youRobotScavenged", "_affirmationCookieEaten", "_affirmationHateUsed", "_airFryerUsed", "_akgyxothUsed", "_alienAnimalMilkUsed", "_alienPlantPodUsed", "_allYearSucker", "_aprilShower", "_armyToddlerCast", "_authorsInkUsed", "_baconMachineUsed", "_bagOfCandy", "_bagOfCandyUsed", "_bagOTricksUsed", "_ballastTurtleUsed", "_ballInACupUsed", "_ballpit", "_barrelPrayer", "_bastilleLastBattleWon", "_beachCombing", "_bendHellUsed", "_blankoutUsed", "_bonersSummoned", "_bookOfEverySkillUsed", "_borrowedTimeUsed", "_bowleggedSwaggerUsed", "_bowlFullOfJellyUsed", "_boxOfHammersUsed", "_brainPreservationFluidUsed", "_brassDreadFlaskUsed", "_cameraUsed", "_canSeekBirds", "_carboLoaded", "_cargoPocketEmptied", "_ceciHatUsed", "_chateauDeskHarvested", "_chateauMonsterFought", "_chronerCrossUsed", "_chronerTriggerUsed", "_chubbyAndPlumpUsed", "_circleDrumUsed", "_clanFortuneBuffUsed", "_claraBellUsed", "_coalPaperweightUsed", "_cocoaDispenserUsed", "_cocktailShakerUsed", "_coldAirportToday", "_coldOne", "_communismUsed", "_confusingLEDClockUsed", "_controlPanelUsed", "_cookbookbatRecipeDrops", "_corruptedStardustUsed", "_cosmicSixPackConjured", "_crappyCameraUsed", "_creepyVoodooDollUsed", "_crimboTree", "_cursedKegUsed", "_cursedMicrowaveUsed", "_dailyDungeonMalwareUsed", "_darkChocolateHeart", "_daycareFights", "_daycareNap", "_daycareSpa", "_daycareToday", "_defectiveTokenChecked", "_defectiveTokenUsed", "_dinseyGarbageDisposed", "_discoKnife", "_distentionPillUsed", "_dnaHybrid", "_docClocksThymeCocktailDrunk", "_drippingHallDoor1", "_drippingHallDoor2", "_drippingHallDoor3", "_drippingHallDoor4", "_drippyCaviarUsed", "_drippyNuggetUsed", "_drippyPilsnerUsed", "_drippyPlumUsed", "_drippyWineUsed", "_eldritchHorrorEvoked", "_eldritchTentacleFought", "_entauntaunedToday", "_envyfishEggUsed", "_essentialTofuUsed", "_etchedHourglassUsed", "_eternalCarBatteryUsed", "_everfullGlassUsed", "_eyeAndATwistUsed", "_fancyChessSetUsed", "_falloutShelterSpaUsed", "_fancyHotDogEaten", "_farmerItemsCollected", "_favoriteBirdVisited", "_firedJokestersGun", "_fireExtinguisherRefilled", "_fireStartingKitUsed", "_fireworksShop", "_fireworksShopHatBought", "_fireworksShopEquipmentBought", "_fireworkUsed", "_fishyPipeUsed", "_floundryItemCreated", "_floundryItemUsed", "_freePillKeeperUsed", "_frToday", "_fudgeSporkUsed", "_garbageItemChanged", "_gingerBiggerAlligators", "_gingerbreadCityToday", "_gingerbreadClockAdvanced", "_gingerbreadClockVisited", "_gingerbreadColumnDestroyed", "_gingerbreadMobHitUsed", "_glennGoldenDiceUsed", "_glitchItemImplemented", "_gnollEyeUsed", "_governmentPerDiemUsed", "_grimBuff", "_guildManualUsed", "_guzzlrQuestAbandoned", "_hardKnocksDiplomaUsed", "_hippyMeatCollected", "_hobbyHorseUsed", "_holidayFunUsed", "_holoWristCrystal", "_hotAirportToday", "_hungerSauceUsed", "_hyperinflatedSealLungUsed", "_iceHotelRoomsRaided", "_iceSculptureUsed", "_incredibleSelfEsteemCast", "_infernoDiscoVisited", "_internetDailyDungeonMalwareBought", "_internetGallonOfMilkBought", "_internetPlusOneBought", "_internetPrintScreenButtonBought", "_internetViralVideoBought", "_interviewIsabella", "_interviewMasquerade", "_interviewVlad", "_inquisitorsUnidentifiableObjectUsed", "_ironicMoustache", "_jackassPlumberGame", "_jarlsCheeseSummoned", "_jarlsCreamSummoned", "_jarlsDoughSummoned", "_jarlsEggsSummoned", "_jarlsFruitSummoned", "_jarlsMeatSummoned", "_jarlsPotatoSummoned", "_jarlsVeggiesSummoned", "_jingleBellUsed", "_jukebox", "_kgbFlywheelCharged", "_kgbLeftDrawerUsed", "_kgbOpened", "_kgbRightDrawerUsed", "_kolConSixPackUsed", "_kolhsCutButNotDried", "_kolhsIsskayLikeAnAshtray", "_kolhsPoeticallyLicenced", "_kolhsSchoolSpirited", "_kudzuSaladEaten", "_lastCombatWon", "_latteBanishUsed", "_latteCopyUsed", "_latteDrinkUsed", "_legendaryBeat", "_licenseToChillUsed", "_lookingGlass", "_loveTunnelToday", "_loveTunnelUsed", "_luckyGoldRingVolcoino", "_lunchBreak", "_lupineHormonesUsed", "_lyleFavored", "_madLiquorDrunk", "_madTeaParty", "_mafiaMiddleFingerRingUsed", "_managerialManipulationUsed", "_mansquitoSerumUsed", "_maydayDropped", "_mayoDeviceRented", "_mayoTankSoaked", "_meatballMachineUsed", "_meatifyMatterUsed", "_milkOfMagnesiumUsed", "_mimeArmyShotglassUsed", "_missGravesVermouthDrunk", "_missileLauncherUsed", "_momFoodReceived", "_mrBurnsgerEaten", "_muffinOrderedToday", "_mushroomGardenVisited", "_neverendingPartyToday", "_newYouQuestCompleted", "_olympicSwimmingPool", "_olympicSwimmingPoolItemFound", "_overflowingGiftBasketUsed", "_partyHard", "_pastaAdditive", "_perfectFreezeUsed", "_perfectlyFairCoinUsed", "_petePartyThrown", "_peteRiotIncited", "_photocopyUsed", "_pickyTweezersUsed", "_pirateBellowUsed", "_pirateForkUsed", "_pixelOrbUsed", "_plumbersMushroomStewEaten", "_pneumaticityPotionUsed", "_pottedTeaTreeUsed", "_prToday", "_psychoJarFilled", "_psychoJarUsed", "_psychokineticHugUsed", "_rainStickUsed", "_redwoodRainStickUsed", "_requestSandwichSucceeded", "_rhinestonesAcquired", "_seaJellyHarvested", "_setOfJacksUsed", "_sewingKitUsed", "_sexChanged", "_shrubDecorated", "_silverDreadFlaskUsed", "_skateBuff1", "_skateBuff2", "_skateBuff3", "_skateBuff4", "_skateBuff5", "_sleazeAirportToday", "_sobrieTeaUsed", "_softwareGlitchTurnReceived", "_spacegateMurderbot", "_spacegateRuins", "_spacegateSpant", "_spacegateToday", "_spacegateVaccine", "_spaghettiBreakfast", "_spaghettiBreakfastEaten", "_spinmasterLatheVisited", "_spinningWheel", "_spookyAirportToday", "_stabonicScrollUsed", "_steelyEyedSquintUsed", "_stenchAirportToday", "_stinkyCheeseBanisherUsed", "_streamsCrossed", "_stuffedPocketwatchUsed", "_styxSprayUsed", "_summonAnnoyanceUsed", "_summonCarrotUsed", "_summonResortPassUsed", "_sweetToothUsed", "_syntheticDogHairPillUsed", "_tacoFlierUsed", "_telegraphOfficeToday", "_templeHiddenPower", "_tempuraAirUsed", "_thesisDelivered", "_timeSpinnerReplicatorUsed", "_toastSummoned", "_tonicDjinn", "_treasuryEliteMeatCollected", "_treasuryHaremMeatCollected", "_trivialAvocationsGame", "_tryptophanDartUsed", "_turtlePowerCast", "_twelveNightEnergyUsed", "_ultraMegaSourBallUsed", "_victorSpoilsUsed", "_villainLairCanLidUsed", "_villainLairColorChoiceUsed", "_villainLairDoorChoiceUsed", "_villainLairFirecrackerUsed", "_villainLairSymbologyChoiceUsed", "_villainLairWebUsed", "_vmaskBanisherUsed", "_voraciTeaUsed", "_volcanoItemRedeemed", "_volcanoSuperduperheatedMetal", "_voteToday", "_VYKEACafeteriaRaided", "_VYKEALoungeRaided", "_walfordQuestStartedToday", "_warbearBankUsed", "_warbearBreakfastMachineUsed", "_warbearGyrocopterUsed", "_warbearSodaMachineUsed", "_wildfireBarrelHarvested", "_witchessBuff", "_workshedItemUsed", "_zombieClover", "_preventScurvy", "lockedItem4637", "lockedItem4638", "lockedItem4639", "lockedItem4646", "lockedItem4647", "unknownRecipe3542", "unknownRecipe3543", "unknownRecipe3544", "unknownRecipe3545", "unknownRecipe3546", "unknownRecipe3547", "unknownRecipe3548", "unknownRecipe3749", "unknownRecipe3751", "unknownRecipe4172", "unknownRecipe4173", "unknownRecipe4174", "unknownRecipe5060", "unknownRecipe5061", "unknownRecipe5062", "unknownRecipe5063", "unknownRecipe5064", "unknownRecipe5066", "unknownRecipe5067", "unknownRecipe5069", "unknownRecipe5070", "unknownRecipe5072", "unknownRecipe5073", "unknownRecipe5670", "unknownRecipe5671", "unknownRecipe6501", "unknownRecipe6564", "unknownRecipe6565", "unknownRecipe6566", "unknownRecipe6567", "unknownRecipe6568", "unknownRecipe6569", "unknownRecipe6570", "unknownRecipe6571", "unknownRecipe6572", "unknownRecipe6573", "unknownRecipe6574", "unknownRecipe6575", "unknownRecipe6576", "unknownRecipe6577", "unknownRecipe6578", "unknownRecipe7752", "unknownRecipe7753", "unknownRecipe7754", "unknownRecipe7755", "unknownRecipe7756", "unknownRecipe7757", "unknownRecipe7758", "unknownRecipe10970", "unknownRecipe10971", "unknownRecipe10972", "unknownRecipe10973", "unknownRecipe10974", "unknownRecipe10975", "unknownRecipe10976", "unknownRecipe10977", "unknownRecipe10978", "unknownRecipe10988", "unknownRecipe10989", "unknownRecipe10990", "unknownRecipe10991", "unknownRecipe10992", "unknownRecipe11000"], numericProperties = ["coinMasterIndex", "dailyDeedsVersion", "defaultDropdown1", "defaultDropdown2", "defaultDropdownSplit", "defaultLimit", "fixedThreadPoolSize", "itemManagerIndex", "lastBuffRequestType", "lastGlobalCounterDay", "lastImageCacheClear", "previousUpdateRevision", "relayDelayForSVN", "relaySkillButtonCount", "scriptButtonPosition", "statusDropdown", "svnThreadPoolSize", "toolbarPosition", "_g9Effect", "addingScrolls", "affirmationCookiesEaten", "aminoAcidsUsed", "antagonisticSnowmanKitCost", "ascensionsToday", "autoAbortThreshold", "autoAntidote", "autoBuyPriceLimit", "autumnatonQuestTurn", "availableCandyCredits", "availableDimes", "availableFunPoints", "availableQuarters", "availableStoreCredits", "availableSwagger", "averageSwagger", "awolMedicine", "awolPointsBeanslinger", "awolPointsCowpuncher", "awolPointsSnakeoiler", "awolDeferredPointsBeanslinger", "awolDeferredPointsCowpuncher", "awolDeferredPointsSnakeoiler", "awolVenom", "bagOTricksCharges", "ballpitBonus", "bankedKarma", "bartenderTurnsUsed", "basementMallPrices", "basementSafetyMargin", "batmanFundsAvailable", "batmanBonusInitialFunds", "batmanTimeLeft", "bearSwagger", "beeCounter", "beGregariousCharges", "beGregariousFightsLeft", "birdformCold", "birdformHot", "birdformRoc", "birdformSleaze", "birdformSpooky", "birdformStench", "blackBartsBootyCost", "blackPuddingsDefeated", "blackForestProgress", "blankOutUsed", "bloodweiserDrunk", "bondPoints", "bondVillainsDefeated", "boneAbacusVictories", "booPeakProgress", "borisPoints", "breakableHandling", "breakableHandling1964", "breakableHandling9691", "breakableHandling9692", "breakableHandling9699", "breathitinCharges", "brodenBacteria", "brodenSprinkles", "buffBotMessageDisposal", "buffBotPhilanthropyType", "buffJimmyIngredients", "burnoutsDefeated", "burrowgrubSummonsRemaining", "camelSpit", "camerasUsed", "campAwayDecoration", "candyWitchTurnsUsed", "candyWitchCandyTotal", "carboLoading", "catBurglarBankHeists", "cellarLayout", "charitableDonations", "chasmBridgeProgress", "chefTurnsUsed", "chessboardsCleared", "chilledToTheBone", "cinderellaMinutesToMidnight", "cinderellaScore", "cocktailSummons", "commerceGhostCombats", "controlPanelOmega", "cornucopiasOpened", "cosmicBowlingBallReturnCombats", "cozyCounter6332", "cozyCounter6333", "cozyCounter6334", "craftingClay", "craftingLeather", "craftingStraw", "crimbo16BeardChakraCleanliness", "crimbo16BootsChakraCleanliness", "crimbo16BungChakraCleanliness", "crimbo16CrimboHatChakraCleanliness", "crimbo16GutsChakraCleanliness", "crimbo16HatChakraCleanliness", "crimbo16JellyChakraCleanliness", "crimbo16LiverChakraCleanliness", "crimbo16NippleChakraCleanliness", "crimbo16NoseChakraCleanliness", "crimbo16ReindeerChakraCleanliness", "crimbo16SackChakraCleanliness", "crimboTreeDays", "cubelingProgress", "currentExtremity", "currentHedgeMazeRoom", "currentMojoFilters", "currentNunneryMeat", "currentPortalEnergy", "cursedMagnifyingGlassCount", "cyrptAlcoveEvilness", "cyrptCrannyEvilness", "cyrptNicheEvilness", "cyrptNookEvilness", "cyrptTotalEvilness", "darkGyfftePoints", "daycareEquipment", "daycareInstructors", "daycareLastScavenge", "daycareToddlers", "dbNemesisSkill1", "dbNemesisSkill2", "dbNemesisSkill3", "desertExploration", "desktopHeight", "desktopWidth", "dinseyFilthLevel", "dinseyFunProgress", "dinseyNastyBearsDefeated", "dinseySocialJusticeIProgress", "dinseySocialJusticeIIProgress", "dinseyTouristsFed", "dinseyToxicMultiplier", "doctorBagQuestLights", "doctorBagUpgrades", "dreadScroll1", "dreadScroll2", "dreadScroll3", "dreadScroll4", "dreadScroll5", "dreadScroll6", "dreadScroll7", "dreadScroll8", "dripAdventuresSinceAscension", "drippingHallAdventuresSinceAscension", "drippingTreesAdventuresSinceAscension", "drippyBatsUnlocked", "drippyJuice", "drippyOrbsClaimed", "drunkenSwagger", "edDefeatAbort", "edPoints", "eldritchTentaclesFought", "electricKoolAidEaten", "encountersUntilDMTChoice", "encountersUntilNEPChoice", "ensorceleeLevel", "entauntaunedColdRes", "essenceOfAnnoyanceCost", "essenceOfBearCost", "extraRolloverAdventures", "falloutShelterLevel", "familiarSweat", "fingernailsClipped", "fistSkillsKnown", "flyeredML", "fossilB", "fossilD", "fossilN", "fossilP", "fossilS", "fossilW", "fratboysDefeated", "frenchGuardTurtlesFreed", "funGuyMansionKills", "garbageChampagneCharge", "garbageFireProgress", "garbageShirtCharge", "garbageTreeCharge", "garlandUpgrades", "gingerDigCount", "gingerLawChoice", "gingerMuscleChoice", "gingerTrainScheduleStudies", "gladiatorBallMovesKnown", "gladiatorBladeMovesKnown", "gladiatorNetMovesKnown", "glitchItemCost", "glitchItemImplementationCount", "glitchItemImplementationLevel", "glitchSwagger", "gloverPoints", "gnasirProgress", "goldenMrAccessories", "gongPath", "gooseDronesRemaining", "goreCollected", "gourdItemCount", "greyYouPoints", "grimoire1Summons", "grimoire2Summons", "grimoire3Summons", "grimstoneCharge", "guardTurtlesFreed", "guideToSafariCost", "guyMadeOfBeesCount", "guzzlrBronzeDeliveries", "guzzlrDeliveryProgress", "guzzlrGoldDeliveries", "guzzlrPlatinumDeliveries", "haciendaLayout", "hallowiener8BitRealm", "hallowienerCoinspiracy", "hareMillisecondsSaved", "heavyRainsStartingThunder", "heavyRainsStartingRain", "heavyRainsStartingLightning", "heroDonationBoris", "heroDonationJarlsberg", "heroDonationSneakyPete", "hiddenApartmentProgress", "hiddenBowlingAlleyProgress", "hiddenHospitalProgress", "hiddenOfficeProgress", "hiddenTavernUnlock", "highTopPumped", "hippiesDefeated", "holidayHalsBookCost", "holidaySwagger", "homemadeRobotUpgrades", "homebodylCharges", "hpAutoRecovery", "hpAutoRecoveryTarget", "iceSwagger", "jarlsbergPoints", "jungCharge", "junglePuns", "knownAscensions", "kolhsTotalSchoolSpirited", "lastAnticheeseDay", "lastArcadeAscension", "lastBadMoonReset", "lastBangPotionReset", "lastBattlefieldReset", "lastBeardBuff", "lastBreakfast", "lastCartographyBooPeak", "lastCartographyCastleTop", "lastCartographyDarkNeck", "lastCartographyDefiledNook", "lastCartographyFratHouse", "lastCartographyFratHouseVerge", "lastCartographyGuanoJunction", "lastCartographyHauntedBilliards", "lastCartographyHippyCampVerge", "lastCartographyZeppelinProtesters", "lastCastleGroundUnlock", "lastCastleTopUnlock", "lastCellarReset", "lastChanceThreshold", "lastChasmReset", "lastColosseumRoundWon", "lastCouncilVisit", "lastCounterDay", "lastDesertUnlock", "lastDispensaryOpen", "lastDMTDuplication", "lastDwarfFactoryReset", "lastEVHelmetValue", "lastEVHelmetReset", "lastEmptiedStorage", "lastFilthClearance", "lastGoofballBuy", "lastGuildStoreOpen", "lastGuyMadeOfBeesReset", "lastFratboyCall", "lastFriarCeremonyAscension", "lastFriarElbowNC", "lastFriarHeartNC", "lastFriarNeckNC", "lastHippyCall", "lastIslandUnlock", "lastKeyotronUse", "lastKingLiberation", "lastLightsOutTurn", "lastMushroomPlot", "lastMiningReset", "lastNemesisReset", "lastPaperStripReset", "lastPirateEphemeraReset", "lastPirateInsultReset", "lastPlusSignUnlock", "lastQuartetAscension", "lastQuartetRequest", "lastSecondFloorUnlock", "lastSkateParkReset", "lastStillBeatingSpleen", "lastTavernAscension", "lastTavernSquare", "lastTelescopeReset", "lastTempleAdventures", "lastTempleButtonsUnlock", "lastTempleUnlock", "lastThingWithNoNameDefeated", "lastTowelAscension", "lastTr4pz0rQuest", "lastVioletFogMap", "lastVoteMonsterTurn", "lastWartDinseyDefeated", "lastWuTangDefeated", "lastYearbookCameraAscension", "lastZapperWand", "lastZapperWandExplosionDay", "lawOfAveragesCost", "libramSummons", "lightsOutAutomation", "louvreDesiredGoal", "louvreGoal", "lovebugsAridDesert", "lovebugsBeachBuck", "lovebugsBooze", "lovebugsChroner", "lovebugsCoinspiracy", "lovebugsCyrpt", "lovebugsFreddy", "lovebugsFunFunds", "lovebugsHoboNickel", "lovebugsItemDrop", "lovebugsMeat", "lovebugsMeatDrop", "lovebugsMoxie", "lovebugsMuscle", "lovebugsMysticality", "lovebugsOilPeak", "lovebugsOrcChasm", "lovebugsPowder", "lovebugsWalmart", "lttQuestDifficulty", "lttQuestStageCount", "manaBurnSummonThreshold", "manaBurningThreshold", "manaBurningTrigger", "manorDrawerCount", "manualOfNumberologyCost", "mapToKokomoCost", "masksUnlocked", "maximizerMRUSize", "maximizerCombinationLimit", "maximizerEquipmentLevel", "maximizerEquipmentScope", "maximizerMaxPrice", "maximizerPriceLevel", "maxManaBurn", "mayflyExperience", "mayoLevel", "meansuckerPrice", "merkinVocabularyMastery", "miniAdvClass", "miniMartinisDrunk", "moleTunnelLevel", "mothershipProgress", "mpAutoRecovery", "mpAutoRecoveryTarget", "munchiesPillsUsed", "mushroomGardenCropLevel", "nextParanormalActivity", "nextQuantumFamiliarOwnerId", "nextQuantumFamiliarTurn", "noobPoints", "noobDeferredPoints", "noodleSummons", "nsContestants1", "nsContestants2", "nsContestants3", "nuclearAutumnPoints", "numericSwagger", "nunsVisits", "oilPeakProgress", "optimalSwagger", "optimisticCandleProgress", "palindomeDudesDefeated", "parasolUsed", "pendingMapReflections", "pirateSwagger", "plantingDay", "plumberBadgeCost", "plumberCostumeCost", "plumberPoints", "poolSharkCount", "poolSkill", "primaryLabGooIntensity", "prismaticSummons", "procrastinatorLanguageFluency", "promptAboutCrafting", "puzzleChampBonus", "pyramidPosition", "rockinRobinProgress", "ROMOfOptimalityCost", "quantumPoints", "reagentSummons", "reanimatorArms", "reanimatorLegs", "reanimatorSkulls", "reanimatorWeirdParts", "reanimatorWings", "recentLocations", "redSnapperProgress", "relayPort", "relocatePygmyJanitor", "relocatePygmyLawyer", "rumpelstiltskinTurnsUsed", "rumpelstiltskinKidsRescued", "safariSwagger", "sausageGrinderUnits", "schoolOfHardKnocksDiplomaCost", "schoolSwagger", "scrapbookCharges", "scriptMRULength", "seaodesFound", "SeasoningSwagger", "sexChanges", "shenInitiationDay", "shockingLickCharges", "singleFamiliarRun", "skillBurn3", "skillBurn90", "skillBurn153", "skillBurn154", "skillBurn155", "skillBurn1019", "skillBurn5017", "skillBurn6014", "skillBurn6015", "skillBurn6016", "skillBurn6020", "skillBurn6021", "skillBurn6022", "skillBurn6023", "skillBurn6024", "skillBurn6026", "skillBurn6028", "skillBurn7323", "skillBurn14008", "skillBurn14028", "skillBurn14038", "skillBurn15011", "skillBurn15028", "skillBurn17005", "skillBurn22034", "skillBurn22035", "skillBurn23301", "skillBurn23302", "skillBurn23303", "skillBurn23304", "skillBurn23305", "skillBurn23306", "skillLevel46", "skillLevel47", "skillLevel48", "skillLevel117", "skillLevel118", "skillLevel121", "skillLevel128", "skillLevel134", "skillLevel144", "skillLevel180", "skillLevel188", "skillLevel7254", "slimelingFullness", "slimelingStacksDropped", "slimelingStacksDue", "smoresEaten", "smutOrcNoncombatProgress", "sneakyPetePoints", "snojoMoxieWins", "snojoMuscleWins", "snojoMysticalityWins", "sourceAgentsDefeated", "sourceEnlightenment", "sourceInterval", "sourcePoints", "sourceTerminalGram", "sourceTerminalPram", "sourceTerminalSpam", "spaceBabyLanguageFluency", "spacePirateLanguageFluency", "spelunkyNextNoncombat", "spelunkySacrifices", "spelunkyWinCount", "spookyPuttyCopiesMade", "statbotUses", "sugarCounter4178", "sugarCounter4179", "sugarCounter4180", "sugarCounter4181", "sugarCounter4182", "sugarCounter4183", "sugarCounter4191", "summonAnnoyanceCost", "sweat", "tacoDanCocktailSauce", "tacoDanFishMeat", "tavernLayout", "telescopeUpgrades", "tempuraSummons", "timeSpinnerMedals", "timesRested", "tomeSummons", "totalCharitableDonations", "turtleBlessingTurns", "twinPeakProgress", "twoCRSPoints", "unicornHornInflation", "universalSeasoningCost", "usable1HWeapons", "usable1xAccs", "usable2HWeapons", "usable3HWeapons", "usableAccessories", "usableHats", "usableOffhands", "usableOther", "usablePants", "usableShirts", "valueOfAdventure", "valueOfInventory", "valueOfStill", "valueOfTome", "vintnerCharge", "vintnerWineLevel", "violetFogGoal", "walfordBucketProgress", "warehouseProgress", "welcomeBackAdv", "wolfPigsEvicted", "wolfTurnsUsed", "writingDesksDefeated", "xoSkeleltonXProgress", "xoSkeleltonOProgress", "yearbookCameraAscensions", "yearbookCameraUpgrades", "youRobotBody", "youRobotBottom", "youRobotLeft", "youRobotPoints", "youRobotRight", "youRobotTop", "zeppelinProtestors", "zigguratLianas", "zombiePoints", "_absintheDrops", "_abstractionDropsCrown", "_aguaDrops", "_xenomorphCharge", "_ancestralRecallCasts", "_antihangoverBonus", "_astralDrops", "_autumnatonQuests", "_backUpUses", "_badlyRomanticArrows", "_badgerCharge", "_balefulHowlUses", "_banderRunaways", "_bastilleCheese", "_bastilleGames", "_bastilleGameTurn", "_bastilleLastCheese", "_beanCannonUses", "_bearHugs", "_beerLensDrops", "_bellydancerPickpockets", "_benettonsCasts", "_birdsSoughtToday", "_boomBoxFights", "_boomBoxSongsLeft", "_bootStomps", "_boxingGloveArrows", "_brickoEyeSummons", "_brickoFights", "_campAwayCloudBuffs", "_campAwaySmileBuffs", "_candySummons", "_captainHagnkUsed", "_carnieCandyDrops", "_carrotNoseDrops", "_catBurglarCharge", "_catBurglarHeistsComplete", "_cheerleaderSteam", "_chestXRayUsed", "_chipBags", "_chocolateCigarsUsed", "_chocolateSculpturesUsed", "_chocolatesUsed", "_chronolithActivations", "_chronolithNextCost", "_clanFortuneConsultUses", "_clipartSummons", "_coldMedicineConsults", "_coldMedicineEquipmentTaken", "_companionshipCasts", "_cookbookbatCrafting", "_cosmicBowlingSkillsUsed", "_crimbo21ColdResistance", "_dailySpecialPrice", "_daycareGymScavenges", "_daycareRecruits", "_deckCardsDrawn", "_deluxeKlawSummons", "_demandSandwich", "_detectiveCasesCompleted", "_disavowed", "_dnaPotionsMade", "_donhosCasts", "_dreamJarDrops", "_drunkPygmyBanishes", "_edDefeats", "_edLashCount", "_elronsCasts", "_enamorangs", "_energyCollected", "_expertCornerCutterUsed", "_favorRareSummons", "_feastUsed", "_feelinTheRhythm", "_feelPrideUsed", "_feelExcitementUsed", "_feelHatredUsed", "_feelLonelyUsed", "_feelNervousUsed", "_feelEnvyUsed", "_feelDisappointedUsed", "_feelSuperiorUsed", "_feelLostUsed", "_feelNostalgicUsed", "_feelPeacefulUsed", "_fingertrapArrows", "_fireExtinguisherCharge", "_fragrantHerbsUsed", "_freeBeachWalksUsed", "_frButtonsPressed", "_fudgeWaspFights", "_gapBuffs", "_garbageFireDropsCrown", "_genieFightsUsed", "_genieWishesUsed", "_gibbererAdv", "_gibbererCharge", "_gingerbreadCityTurns", "_glarkCableUses", "_glitchMonsterFights", "_gnomeAdv", "_godLobsterFights", "_goldenMoneyCharge", "_gongDrops", "_gothKidCharge", "_gothKidFights", "_grimBrotherCharge", "_grimFairyTaleDrops", "_grimFairyTaleDropsCrown", "_grimoireConfiscatorSummons", "_grimoireGeekySummons", "_grimstoneMaskDrops", "_grimstoneMaskDropsCrown", "_grooseCharge", "_grooseDrops", "_guzzlrDeliveries", "_guzzlrGoldDeliveries", "_guzzlrPlatinumDeliveries", "_hareAdv", "_hareCharge", "_highTopPumps", "_hipsterAdv", "_hoardedCandyDropsCrown", "_hoboUnderlingSummons", "_holoWristDrops", "_holoWristProgress", "_hotAshesDrops", "_hotJellyUses", "_hotTubSoaks", "_humanMuskUses", "_iceballUses", "_inigosCasts", "_jerksHealthMagazinesUsed", "_jiggleCheese", "_jiggleCream", "_jiggleLife", "_jiggleSteak", "_jitbCharge", "_juneCleaverFightsLeft", "_juneCleaverEncounters", "_juneCleaverStench", "_juneCleaverSpooky", "_juneCleaverSleaze", "_juneCleaverHot", "_juneCleaverCold", "_juneCleaverSkips", "_jungDrops", "_kgbClicksUsed", "_kgbDispenserUses", "_kgbTranquilizerDartUses", "_klawSummons", "_kloopCharge", "_kloopDrops", "_kolhsAdventures", "_kolhsSavedByTheBell", "_lastDailyDungeonRoom", "_lastSausageMonsterTurn", "_lastZomboEye", "_latteRefillsUsed", "_leafblowerML", "_legionJackhammerCrafting", "_llamaCharge", "_longConUsed", "_lovebugsBeachBuck", "_lovebugsChroner", "_lovebugsCoinspiracy", "_lovebugsFreddy", "_lovebugsFunFunds", "_lovebugsHoboNickel", "_lovebugsWalmart", "_loveChocolatesUsed", "_lynyrdSnareUses", "_machineTunnelsAdv", "_macrometeoriteUses", "_mafiaThumbRingAdvs", "_mayflowerDrops", "_mayflySummons", "_mediumSiphons", "_meteoriteAdesUsed", "_meteorShowerUses", "_micrometeoriteUses", "_miniMartiniDrops", "_monstersMapped", "_mushroomGardenFights", "_nanorhinoCharge", "_navelRunaways", "_neverendingPartyFreeTurns", "_newYouQuestSharpensDone", "_newYouQuestSharpensToDo", "_nextColdMedicineConsult", "_nextQuantumAlignment", "_nightmareFuelCharges", "_noobSkillCount", "_nuclearStockpileUsed", "_oilExtracted", "_olfactionsUsed", "_speakeasyFreeFights", "_optimisticCandleDropsCrown", "_oreDropsCrown", "_otoscopeUsed", "_oysterEggsFound", "_pantsgivingBanish", "_pantsgivingCount", "_pantsgivingCrumbs", "_pantsgivingFullness", "_pasteDrops", "_peteJukeboxFixed", "_peteJumpedShark", "_petePeeledOut", "_pieDrops", "_piePartsCount", "_pixieCharge", "_pocketProfessorLectures", "_poisonArrows", "_pokeGrowFertilizerDrops", "_poolGames", "_powderedGoldDrops", "_powderedMadnessUses", "_powerfulGloveBatteryPowerUsed", "_powerPillDrops", "_powerPillUses", "_precisionCasts", "_radlibSummons", "_raindohCopiesMade", "_rapidPrototypingUsed", "_raveStealCount", "_reflexHammerUsed", "_resolutionAdv", "_resolutionRareSummons", "_riftletAdv", "_roboDrops", "_rogueProgramCharge", "_romanticFightsLeft", "_saberForceMonsterCount", "_saberForceUses", "_saberMod", "_saltGrainsConsumed", "_sandwormCharge", "_saplingsPlanted", "_sausageFights", "_sausagesEaten", "_sausagesMade", "_sealFigurineUses", "_sealScreeches", "_sealsSummoned", "_shatteringPunchUsed", "_shortOrderCookCharge", "_shrubCharge", "_sloppyDinerBeachBucks", "_smilesOfMrA", "_smithsnessSummons", "_snojoFreeFights", "_snojoParts", "_snokebombUsed", "_snowconeSummons", "_snowglobeDrops", "_snowSuitCount", "_sourceTerminalDigitizeMonsterCount", "_sourceTerminalDigitizeUses", "_sourceTerminalDuplicateUses", "_sourceTerminalEnhanceUses", "_sourceTerminalExtrudes", "_sourceTerminalPortscanUses", "_spaceFurDropsCrown", "_spacegatePlanetIndex", "_spacegateTurnsLeft", "_spaceJellyfishDrops", "_speakeasyDrinksDrunk", "_spelunkerCharges", "_spelunkingTalesDrops", "_spikolodonSpikeUses", "_spookyJellyUses", "_stackLumpsUses", "_steamCardDrops", "_stickerSummons", "_stinkyCheeseCount", "_stressBallSqueezes", "_sugarSummons", "_sweatOutSomeBoozeUsed", "_taffyRareSummons", "_taffyYellowSummons", "_thanksgettingFoodsEaten", "_thingfinderCasts", "_thinknerdPackageDrops", "_thorsPliersCrafting", "_timeHelmetAdv", "_timeSpinnerMinutesUsed", "_tokenDrops", "_transponderDrops", "_turkeyBlastersUsed", "_turkeyBooze", "_turkeyMuscle", "_turkeyMyst", "_turkeyMoxie", "_unaccompaniedMinerUsed", "_unconsciousCollectiveCharge", "_universalSeasoningsUsed", "_universeCalculated", "_universeImploded", "_usedReplicaBatoomerang", "_vampyreCloakeFormUses", "_villainLairProgress", "_vitachocCapsulesUsed", "_vmaskAdv", "_voidFreeFights", "_volcanoItem1", "_volcanoItem2", "_volcanoItem3", "_volcanoItemCount1", "_volcanoItemCount2", "_volcanoItemCount3", "_voteFreeFights", "_VYKEACompanionLevel", "_warbearAutoAnvilCrafting", "_whiteRiceDrops", "_witchessFights", "_xoHugsUsed", "_yellowPixelDropsCrown", "_zapCount", "_zombieSmashPocketsUsed"], monsterProperties = ["beGregariousMonster", "cameraMonster", "chateauMonster", "clumsinessGroveBoss", "crappyCameraMonster", "crudeMonster", "enamorangMonster", "envyfishMonster", "glacierOfJerksBoss", "iceSculptureMonster", "lastCopyableMonster", "longConMonster", "maelstromOfLoversBoss", "makeFriendsMonster", "merkinLockkeyMonster", "nosyNoseMonster", "olfactedMonster", "photocopyMonster", "rainDohMonster", "romanticTarget", "screencappedMonster", "spookyPuttyMonster", "stenchCursedMonster", "superficiallyInterestedMonster", "waxMonster", "yearbookCameraTarget", "_gallapagosMonster", "_jiggleCreamedMonster", "_latteMonster", "_nanorhinoBanishedMonster", "_newYouQuestMonster", "_relativityMonster", "_saberForceMonster", "_sourceTerminalDigitizeMonster", "_voteMonster"], locationProperties = ["autumnatonQuestLocation", "currentJunkyardLocation", "doctorBagQuestLocation", "ghostLocation", "guzzlrQuestLocation", "nextSpookyravenElizabethRoom", "nextSpookyravenStephenRoom", "sourceOracleTarget", "_floundryBassLocation", "_floundryCarpLocation", "_floundryCodLocation", "_floundryHatchetfishLocation", "_floundryTroutLocation", "_floundryTunaLocation"], stringProperties = ["autoLogin", "browserBookmarks", "chatFontSize", "combatHotkey0", "combatHotkey1", "combatHotkey2", "combatHotkey3", "combatHotkey4", "combatHotkey5", "combatHotkey6", "combatHotkey7", "combatHotkey8", "combatHotkey9", "commandLineNamespace", "dailyDeedsOptions", "defaultBorderColor", "displayName", "externalEditor", "getBreakfast", "headerStates", "highlightList", "http.proxyHost", "http.proxyPassword", "http.proxyPort", "http.proxyUser", "https.proxyHost", "https.proxyPassword", "https.proxyPort", "https.proxyUser", "initialDesktop", "initialFrames", "lastRelayUpdate", "lastUserAgent", "lastUsername", "logPreferenceChangeFilter", "loginScript", "loginServerName", "loginWindowLogo", "logoutScript", "previousNotifyList", "previousUpdateVersion", "saveState", "saveStateActive", "scriptList", "swingLookAndFeel", "userAgent", "afterAdventureScript", "autoOlfact", "autoPutty", "autumnatonUpgrades", "backupCameraMode", "banishedMonsters", "banishingShoutMonsters", "batmanStats", "batmanZone", "batmanUpgrades", "battleAction", "beachHeadsUnlocked", "beforePVPScript", "betweenBattleScript", "boomBoxSong", "breakfastAlways", "breakfastHardcore", "breakfastSoftcore", "buffBotCasting", "buyScript", "cargoPocketsEmptied", "cargoPocketScraps", "chatbotScript", "chatPlayerScript", "choiceAdventureScript", "chosenTrip", "clanFortuneReply1", "clanFortuneReply2", "clanFortuneReply3", "clanFortuneWord1", "clanFortuneWord2", "clanFortuneWord3", "commerceGhostItem", "counterScript", "copperheadClubHazard", "crimbotChassis", "crimbotArm", "crimbotPropulsion", "crystalBallPredictions", "csServicesPerformed", "currentAstralTrip", "currentDistillateMods", "currentEasyBountyItem", "currentHardBountyItem", "currentHippyStore", "currentJunkyardTool", "currentLlamaForm", "currentMood", "currentPVPSeason", "currentPvpVictories", "currentSpecialBountyItem", "customCombatScript", "cyrusAdjectives", "defaultFlowerLossMessage", "defaultFlowerWinMessage", "demonName1", "demonName2", "demonName3", "demonName4", "demonName5", "demonName6", "demonName7", "demonName8", "demonName9", "demonName10", "demonName11", "demonName12", "demonName13", "dinseyGatorStenchDamage", "dinseyRollercoasterStats", "doctorBagQuestItem", "dolphinItem", "duckAreasCleared", "duckAreasSelected", "edPiece", "enamorangMonsterTurn", "ensorcelee", "EVEDirections", "extraCosmeticModifiers", "familiarScript", "forbiddenStores", "gameProBossSpecialPower", "gooseReprocessed", "grimoireSkillsHardcore", "grimoireSkillsSoftcore", "grimstoneMaskPath", "guzzlrQuestClient", "guzzlrQuestBooze", "guzzlrQuestTier", "harvestGardenHardcore", "harvestGardenSoftcore", "hpAutoRecoveryItems", "invalidBuffMessage", "jickSwordModifier", "juneCleaverQueue", "kingLiberatedScript", "lassoTraining", "lastAdventure", "lastBangPotion819", "lastBangPotion820", "lastBangPotion821", "lastBangPotion822", "lastBangPotion823", "lastBangPotion824", "lastBangPotion825", "lastBangPotion826", "lastBangPotion827", "lastChanceBurn", "lastChessboard", "lastCombatEnvironments", "lastDwarfDiceRolls", "lastDwarfDigitRunes", "lastDwarfEquipmentRunes", "lastDwarfFactoryItem118", "lastDwarfFactoryItem119", "lastDwarfFactoryItem120", "lastDwarfFactoryItem360", "lastDwarfFactoryItem361", "lastDwarfFactoryItem362", "lastDwarfFactoryItem363", "lastDwarfFactoryItem364", "lastDwarfFactoryItem365", "lastDwarfFactoryItem910", "lastDwarfFactoryItem3199", "lastDwarfOfficeItem3208", "lastDwarfOfficeItem3209", "lastDwarfOfficeItem3210", "lastDwarfOfficeItem3211", "lastDwarfOfficeItem3212", "lastDwarfOfficeItem3213", "lastDwarfOfficeItem3214", "lastDwarfOreRunes", "lastDwarfHopper1", "lastDwarfHopper2", "lastDwarfHopper3", "lastDwarfHopper4", "lastEncounter", "lastMacroError", "lastMessageId", "lastPaperStrip3144", "lastPaperStrip4138", "lastPaperStrip4139", "lastPaperStrip4140", "lastPaperStrip4141", "lastPaperStrip4142", "lastPaperStrip4143", "lastPaperStrip4144", "lastPirateEphemera", "lastPorkoBoard", "lastPorkoPayouts", "lastPorkoExpected", "lastSlimeVial3885", "lastSlimeVial3886", "lastSlimeVial3887", "lastSlimeVial3888", "lastSlimeVial3889", "lastSlimeVial3890", "lastSlimeVial3891", "lastSlimeVial3892", "lastSlimeVial3893", "lastSlimeVial3894", "lastSlimeVial3895", "lastSlimeVial3896", "latteModifier", "latteUnlocks", "libramSkillsHardcore", "libramSkillsSoftcore", "louvreOverride", "lovePotion", "lttQuestName", "maximizerList", "maximizerMRUList", "mayoInMouth", "mayoMinderSetting", "merkinQuestPath", "mineLayout1", "mineLayout2", "mineLayout3", "mineLayout4", "mineLayout5", "mineLayout6", "mpAutoRecoveryItems", "muffinOnOrder", "nextAdventure", "nextDistillateMods", "nextQuantumFamiliarName", "nextQuantumFamiliarOwner", "nsChallenge2", "nsChallenge3", "nsChallenge4", "nsChallenge5", "nsTowerDoorKeysUsed", "oceanAction", "oceanDestination", "parkaMode", "pastaThrall1", "pastaThrall2", "pastaThrall3", "pastaThrall4", "pastaThrall5", "pastaThrall6", "pastaThrall7", "pastaThrall8", "peteMotorbikeTires", "peteMotorbikeGasTank", "peteMotorbikeHeadlight", "peteMotorbikeCowling", "peteMotorbikeMuffler", "peteMotorbikeSeat", "pieStuffing", "plantingDate", "plantingLength", "plantingScript", "plumberCostumeWorn", "pokefamBoosts", "postAscensionScript", "preAscensionScript", "retroCapeSuperhero", "retroCapeWashingInstructions", "questClumsinessGrove", "questDoctorBag", "questECoBucket", "questESlAudit", "questESlBacteria", "questESlCheeseburger", "questESlCocktail", "questESlDebt", "questESlFish", "questESlMushStash", "questESlSalt", "questESlSprinkles", "questESpEVE", "questESpJunglePun", "questESpGore", "questESpClipper", "questESpFakeMedium", "questESpSerum", "questESpSmokes", "questESpOutOfOrder", "questEStFishTrash", "questEStGiveMeFuel", "questEStNastyBears", "questEStSocialJusticeI", "questEStSocialJusticeII", "questEStSuperLuber", "questEStWorkWithFood", "questEStZippityDooDah", "questEUNewYou", "questF01Primordial", "questF02Hyboria", "questF03Future", "questF04Elves", "questF05Clancy", "questG01Meatcar", "questG02Whitecastle", "questG03Ego", "questG04Nemesis", "questG05Dark", "questG06Delivery", "questG07Myst", "questG08Moxie", "questG09Muscle", "questGlacierOfJerks", "questGuzzlr", "questI01Scapegoat", "questI02Beat", "questL02Larva", "questL03Rat", "questL04Bat", "questL05Goblin", "questL06Friar", "questL07Cyrptic", "questL08Trapper", "questL09Topping", "questL10Garbage", "questL11MacGuffin", "questL11Black", "questL11Business", "questL11Curses", "questL11Desert", "questL11Doctor", "questL11Manor", "questL11Palindome", "questL11Pyramid", "questL11Ron", "questL11Shen", "questL11Spare", "questL11Worship", "questL12War", "questL12HippyFrat", "questL13Final", "questL13Warehouse", "questLTTQuestByWire", "questM01Untinker", "questM02Artist", "questM03Bugbear", "questM05Toot", "questM06Gourd", "questM07Hammer", "questM08Baker", "questM09Rocks", "questM10Azazel", "questM11Postal", "questM12Pirate", "questM13Escape", "questM14Bounty", "questM15Lol", "questM16Temple", "questM17Babies", "questM18Swamp", "questM19Hippy", "questM20Necklace", "questM21Dance", "questM22Shirt", "questM23Meatsmith", "questM24Doc", "questM25Armorer", "questM26Oracle", "questMaelstromOfLovers", "questPAGhost", "questS01OldGuy", "questS02Monkees", "raveCombo1", "raveCombo2", "raveCombo3", "raveCombo4", "raveCombo5", "raveCombo6", "recoveryScript", "relayCounters", "royalty", "scriptMRUList", "seahorseName", "shenQuestItem", "shrubGarland", "shrubGifts", "shrubLights", "shrubTopper", "sideDefeated", "sidequestArenaCompleted", "sidequestFarmCompleted", "sidequestJunkyardCompleted", "sidequestLighthouseCompleted", "sidequestNunsCompleted", "sidequestOrchardCompleted", "skateParkStatus", "snowsuit", "sourceTerminalChips", "sourceTerminalEducate1", "sourceTerminalEducate2", "sourceTerminalEnquiry", "sourceTerminalEducateKnown", "sourceTerminalEnhanceKnown", "sourceTerminalEnquiryKnown", "sourceTerminalExtrudeKnown", "spadingData", "spadingScript", "speakeasyName", "spelunkyStatus", "spelunkyUpgrades", "spookyravenRecipeUsed", "stationaryButton1", "stationaryButton2", "stationaryButton3", "stationaryButton4", "stationaryButton5", "streamCrossDefaultTarget", "sweetSynthesisBlacklist", "telescope1", "telescope2", "telescope3", "telescope4", "telescope5", "testudinalTeachings", "textColors", "thanksMessage", "tomeSkillsHardcore", "tomeSkillsSoftcore", "trackVoteMonster", "trapperOre", "umbrellaState", "umdLastObtained", "vintnerWineEffect", "vintnerWineName", "vintnerWineType", "violetFogLayout", "volcanoMaze1", "volcanoMaze2", "volcanoMaze3", "volcanoMaze4", "volcanoMaze5", "walfordBucketItem", "warProgress", "watchedPreferences", "workteaClue", "yourFavoriteBird", "yourFavoriteBirdMods", "youRobotCPUUpgrades", "_bastilleBoosts", "_bastilleChoice1", "_bastilleChoice2", "_bastilleChoice3", "_bastilleCurrentStyles", "_bastilleEnemyCastle", "_bastilleEnemyName", "_bastilleLastBattleResults", "_bastilleLastEncounter", "_bastilleStats", "_beachHeadsUsed", "_beachLayout", "_beachMinutes", "_birdOfTheDay", "_birdOfTheDayMods", "_bittycar", "_campAwaySmileBuffSign", "_cloudTalkMessage", "_cloudTalkSmoker", "_coatOfPaintModifier", "_dailySpecial", "_deckCardsSeen", "_feastedFamiliars", "_floristPlantsUsed", "_frAreasUnlocked", "_frHoursLeft", "_frMonstersKilled", "_horsery", "_horseryCrazyMox", "_horseryCrazyMus", "_horseryCrazyMys", "_horseryCrazyName", "_horseryCurrentName", "_horseryDarkName", "_horseryNormalName", "_horseryPaleName", "_jickJarAvailable", "_jiggleCheesedMonsters", "_lastCombatStarted", "_LastPirateRealmIsland", "_locketMonstersFought", "_mummeryMods", "_mummeryUses", "_newYouQuestSkill", "_noHatModifier", "_pantogramModifier", "_pottedPowerPlant", "_questESp", "_questPartyFair", "_questPartyFairProgress", "_questPartyFairQuest", "_roboDrinks", "_roninStoragePulls", "_spacegateAnimalLife", "_spacegateCoordinates", "_spacegateGear", "_spacegateHazards", "_spacegateIntelligentLife", "_spacegatePlanetName", "_spacegatePlantLife", "_stolenAccordions", "_tempRelayCounters", "_timeSpinnerFoodAvailable", "_unknownEasyBountyItem", "_unknownHardBountyItem", "_unknownSpecialBountyItem", "_untakenEasyBountyItem", "_untakenHardBountyItem", "_untakenSpecialBountyItem", "_userMods", "_villainLairColor", "_villainLairKey", "_voteLocal1", "_voteLocal2", "_voteLocal3", "_voteLocal4", "_voteMonster1", "_voteMonster2", "_voteModifier", "_VYKEACompanionType", "_VYKEACompanionRune", "_VYKEACompanionName"], numericOrStringProperties = ["statusEngineering", "statusGalley", "statusMedbay", "statusMorgue", "statusNavigation", "statusScienceLab", "statusSonar", "statusSpecialOps", "statusWasteProcessing", "choiceAdventure2", "choiceAdventure3", "choiceAdventure4", "choiceAdventure5", "choiceAdventure6", "choiceAdventure7", "choiceAdventure8", "choiceAdventure9", "choiceAdventure10", "choiceAdventure11", "choiceAdventure12", "choiceAdventure14", "choiceAdventure15", "choiceAdventure16", "choiceAdventure17", "choiceAdventure18", "choiceAdventure19", "choiceAdventure20", "choiceAdventure21", "choiceAdventure22", "choiceAdventure23", "choiceAdventure24", "choiceAdventure25", "choiceAdventure26", "choiceAdventure27", "choiceAdventure28", "choiceAdventure29", "choiceAdventure40", "choiceAdventure41", "choiceAdventure42", "choiceAdventure45", "choiceAdventure46", "choiceAdventure47", "choiceAdventure71", "choiceAdventure72", "choiceAdventure73", "choiceAdventure74", "choiceAdventure75", "choiceAdventure76", "choiceAdventure77", "choiceAdventure86", "choiceAdventure87", "choiceAdventure88", "choiceAdventure89", "choiceAdventure90", "choiceAdventure91", "choiceAdventure105", "choiceAdventure106", "choiceAdventure107", "choiceAdventure108", "choiceAdventure109", "choiceAdventure110", "choiceAdventure111", "choiceAdventure112", "choiceAdventure113", "choiceAdventure114", "choiceAdventure115", "choiceAdventure116", "choiceAdventure117", "choiceAdventure118", "choiceAdventure120", "choiceAdventure123", "choiceAdventure125", "choiceAdventure126", "choiceAdventure127", "choiceAdventure129", "choiceAdventure131", "choiceAdventure132", "choiceAdventure135", "choiceAdventure136", "choiceAdventure137", "choiceAdventure138", "choiceAdventure139", "choiceAdventure140", "choiceAdventure141", "choiceAdventure142", "choiceAdventure143", "choiceAdventure144", "choiceAdventure145", "choiceAdventure146", "choiceAdventure147", "choiceAdventure148", "choiceAdventure149", "choiceAdventure151", "choiceAdventure152", "choiceAdventure153", "choiceAdventure154", "choiceAdventure155", "choiceAdventure156", "choiceAdventure157", "choiceAdventure158", "choiceAdventure159", "choiceAdventure160", "choiceAdventure161", "choiceAdventure162", "choiceAdventure163", "choiceAdventure164", "choiceAdventure165", "choiceAdventure166", "choiceAdventure167", "choiceAdventure168", "choiceAdventure169", "choiceAdventure170", "choiceAdventure171", "choiceAdventure172", "choiceAdventure177", "choiceAdventure178", "choiceAdventure180", "choiceAdventure181", "choiceAdventure182", "choiceAdventure184", "choiceAdventure185", "choiceAdventure186", "choiceAdventure187", "choiceAdventure188", "choiceAdventure189", "choiceAdventure191", "choiceAdventure197", "choiceAdventure198", "choiceAdventure199", "choiceAdventure200", "choiceAdventure201", "choiceAdventure202", "choiceAdventure203", "choiceAdventure204", "choiceAdventure205", "choiceAdventure206", "choiceAdventure207", "choiceAdventure208", "choiceAdventure211", "choiceAdventure212", "choiceAdventure213", "choiceAdventure214", "choiceAdventure215", "choiceAdventure216", "choiceAdventure217", "choiceAdventure218", "choiceAdventure219", "choiceAdventure220", "choiceAdventure221", "choiceAdventure222", "choiceAdventure223", "choiceAdventure224", "choiceAdventure225", "choiceAdventure230", "choiceAdventure272", "choiceAdventure273", "choiceAdventure276", "choiceAdventure277", "choiceAdventure278", "choiceAdventure279", "choiceAdventure280", "choiceAdventure281", "choiceAdventure282", "choiceAdventure283", "choiceAdventure284", "choiceAdventure285", "choiceAdventure286", "choiceAdventure287", "choiceAdventure288", "choiceAdventure289", "choiceAdventure290", "choiceAdventure291", "choiceAdventure292", "choiceAdventure293", "choiceAdventure294", "choiceAdventure295", "choiceAdventure296", "choiceAdventure297", "choiceAdventure298", "choiceAdventure299", "choiceAdventure302", "choiceAdventure303", "choiceAdventure304", "choiceAdventure305", "choiceAdventure306", "choiceAdventure307", "choiceAdventure308", "choiceAdventure309", "choiceAdventure310", "choiceAdventure311", "choiceAdventure317", "choiceAdventure318", "choiceAdventure319", "choiceAdventure320", "choiceAdventure321", "choiceAdventure322", "choiceAdventure326", "choiceAdventure327", "choiceAdventure328", "choiceAdventure329", "choiceAdventure330", "choiceAdventure331", "choiceAdventure332", "choiceAdventure333", "choiceAdventure334", "choiceAdventure335", "choiceAdventure336", "choiceAdventure337", "choiceAdventure338", "choiceAdventure339", "choiceAdventure340", "choiceAdventure341", "choiceAdventure342", "choiceAdventure343", "choiceAdventure344", "choiceAdventure345", "choiceAdventure346", "choiceAdventure347", "choiceAdventure348", "choiceAdventure349", "choiceAdventure350", "choiceAdventure351", "choiceAdventure352", "choiceAdventure353", "choiceAdventure354", "choiceAdventure355", "choiceAdventure356", "choiceAdventure357", "choiceAdventure358", "choiceAdventure360", "choiceAdventure361", "choiceAdventure362", "choiceAdventure363", "choiceAdventure364", "choiceAdventure365", "choiceAdventure366", "choiceAdventure367", "choiceAdventure372", "choiceAdventure376", "choiceAdventure387", "choiceAdventure388", "choiceAdventure389", "choiceAdventure390", "choiceAdventure391", "choiceAdventure392", "choiceAdventure393", "choiceAdventure395", "choiceAdventure396", "choiceAdventure397", "choiceAdventure398", "choiceAdventure399", "choiceAdventure400", "choiceAdventure401", "choiceAdventure402", "choiceAdventure403", "choiceAdventure423", "choiceAdventure424", "choiceAdventure425", "choiceAdventure426", "choiceAdventure427", "choiceAdventure428", "choiceAdventure429", "choiceAdventure430", "choiceAdventure431", "choiceAdventure432", "choiceAdventure433", "choiceAdventure435", "choiceAdventure438", "choiceAdventure439", "choiceAdventure442", "choiceAdventure444", "choiceAdventure445", "choiceAdventure446", "choiceAdventure447", "choiceAdventure448", "choiceAdventure449", "choiceAdventure451", "choiceAdventure452", "choiceAdventure453", "choiceAdventure454", "choiceAdventure455", "choiceAdventure456", "choiceAdventure457", "choiceAdventure458", "choiceAdventure460", "choiceAdventure461", "choiceAdventure462", "choiceAdventure463", "choiceAdventure464", "choiceAdventure465", "choiceAdventure467", "choiceAdventure468", "choiceAdventure469", "choiceAdventure470", "choiceAdventure471", "choiceAdventure472", "choiceAdventure473", "choiceAdventure474", "choiceAdventure475", "choiceAdventure477", "choiceAdventure478", "choiceAdventure480", "choiceAdventure483", "choiceAdventure484", "choiceAdventure485", "choiceAdventure486", "choiceAdventure488", "choiceAdventure489", "choiceAdventure490", "choiceAdventure491", "choiceAdventure496", "choiceAdventure497", "choiceAdventure502", "choiceAdventure503", "choiceAdventure504", "choiceAdventure505", "choiceAdventure506", "choiceAdventure507", "choiceAdventure509", "choiceAdventure510", "choiceAdventure511", "choiceAdventure512", "choiceAdventure513", "choiceAdventure514", "choiceAdventure515", "choiceAdventure517", "choiceAdventure518", "choiceAdventure519", "choiceAdventure521", "choiceAdventure522", "choiceAdventure523", "choiceAdventure527", "choiceAdventure528", "choiceAdventure529", "choiceAdventure530", "choiceAdventure531", "choiceAdventure532", "choiceAdventure533", "choiceAdventure534", "choiceAdventure535", "choiceAdventure536", "choiceAdventure538", "choiceAdventure539", "choiceAdventure542", "choiceAdventure543", "choiceAdventure544", "choiceAdventure546", "choiceAdventure548", "choiceAdventure549", "choiceAdventure550", "choiceAdventure551", "choiceAdventure552", "choiceAdventure553", "choiceAdventure554", "choiceAdventure556", "choiceAdventure557", "choiceAdventure558", "choiceAdventure559", "choiceAdventure560", "choiceAdventure561", "choiceAdventure562", "choiceAdventure563", "choiceAdventure564", "choiceAdventure565", "choiceAdventure566", "choiceAdventure567", "choiceAdventure568", "choiceAdventure569", "choiceAdventure571", "choiceAdventure572", "choiceAdventure573", "choiceAdventure574", "choiceAdventure575", "choiceAdventure576", "choiceAdventure577", "choiceAdventure578", "choiceAdventure579", "choiceAdventure581", "choiceAdventure582", "choiceAdventure583", "choiceAdventure584", "choiceAdventure594", "choiceAdventure595", "choiceAdventure596", "choiceAdventure597", "choiceAdventure598", "choiceAdventure599", "choiceAdventure600", "choiceAdventure603", "choiceAdventure604", "choiceAdventure616", "choiceAdventure634", "choiceAdventure640", "choiceAdventure654", "choiceAdventure655", "choiceAdventure656", "choiceAdventure657", "choiceAdventure658", "choiceAdventure664", "choiceAdventure669", "choiceAdventure670", "choiceAdventure671", "choiceAdventure672", "choiceAdventure673", "choiceAdventure674", "choiceAdventure675", "choiceAdventure676", "choiceAdventure677", "choiceAdventure678", "choiceAdventure679", "choiceAdventure681", "choiceAdventure683", "choiceAdventure684", "choiceAdventure685", "choiceAdventure686", "choiceAdventure687", "choiceAdventure688", "choiceAdventure689", "choiceAdventure690", "choiceAdventure691", "choiceAdventure692", "choiceAdventure693", "choiceAdventure694", "choiceAdventure695", "choiceAdventure696", "choiceAdventure697", "choiceAdventure698", "choiceAdventure700", "choiceAdventure701", "choiceAdventure705", "choiceAdventure706", "choiceAdventure707", "choiceAdventure708", "choiceAdventure709", "choiceAdventure710", "choiceAdventure711", "choiceAdventure712", "choiceAdventure713", "choiceAdventure714", "choiceAdventure715", "choiceAdventure716", "choiceAdventure717", "choiceAdventure721", "choiceAdventure725", "choiceAdventure729", "choiceAdventure733", "choiceAdventure737", "choiceAdventure741", "choiceAdventure745", "choiceAdventure749", "choiceAdventure753", "choiceAdventure771", "choiceAdventure778", "choiceAdventure780", "choiceAdventure781", "choiceAdventure783", "choiceAdventure784", "choiceAdventure785", "choiceAdventure786", "choiceAdventure787", "choiceAdventure788", "choiceAdventure789", "choiceAdventure791", "choiceAdventure793", "choiceAdventure794", "choiceAdventure795", "choiceAdventure796", "choiceAdventure797", "choiceAdventure803", "choiceAdventure805", "choiceAdventure808", "choiceAdventure809", "choiceAdventure813", "choiceAdventure815", "choiceAdventure830", "choiceAdventure832", "choiceAdventure833", "choiceAdventure834", "choiceAdventure835", "choiceAdventure837", "choiceAdventure838", "choiceAdventure839", "choiceAdventure840", "choiceAdventure841", "choiceAdventure842", "choiceAdventure851", "choiceAdventure852", "choiceAdventure853", "choiceAdventure854", "choiceAdventure855", "choiceAdventure856", "choiceAdventure857", "choiceAdventure858", "choiceAdventure866", "choiceAdventure873", "choiceAdventure875", "choiceAdventure876", "choiceAdventure877", "choiceAdventure878", "choiceAdventure879", "choiceAdventure880", "choiceAdventure881", "choiceAdventure882", "choiceAdventure888", "choiceAdventure889", "choiceAdventure918", "choiceAdventure919", "choiceAdventure920", "choiceAdventure921", "choiceAdventure923", "choiceAdventure924", "choiceAdventure925", "choiceAdventure926", "choiceAdventure927", "choiceAdventure928", "choiceAdventure929", "choiceAdventure930", "choiceAdventure931", "choiceAdventure932", "choiceAdventure940", "choiceAdventure941", "choiceAdventure942", "choiceAdventure943", "choiceAdventure944", "choiceAdventure945", "choiceAdventure946", "choiceAdventure950", "choiceAdventure955", "choiceAdventure957", "choiceAdventure958", "choiceAdventure959", "choiceAdventure960", "choiceAdventure961", "choiceAdventure962", "choiceAdventure963", "choiceAdventure964", "choiceAdventure965", "choiceAdventure966", "choiceAdventure970", "choiceAdventure973", "choiceAdventure974", "choiceAdventure975", "choiceAdventure976", "choiceAdventure977", "choiceAdventure979", "choiceAdventure980", "choiceAdventure981", "choiceAdventure982", "choiceAdventure983", "choiceAdventure988", "choiceAdventure989", "choiceAdventure993", "choiceAdventure998", "choiceAdventure1000", "choiceAdventure1003", "choiceAdventure1005", "choiceAdventure1006", "choiceAdventure1007", "choiceAdventure1008", "choiceAdventure1009", "choiceAdventure1010", "choiceAdventure1011", "choiceAdventure1012", "choiceAdventure1013", "choiceAdventure1015", "choiceAdventure1016", "choiceAdventure1017", "choiceAdventure1018", "choiceAdventure1019", "choiceAdventure1020", "choiceAdventure1021", "choiceAdventure1022", "choiceAdventure1023", "choiceAdventure1026", "choiceAdventure1027", "choiceAdventure1028", "choiceAdventure1029", "choiceAdventure1030", "choiceAdventure1031", "choiceAdventure1032", "choiceAdventure1033", "choiceAdventure1034", "choiceAdventure1035", "choiceAdventure1036", "choiceAdventure1037", "choiceAdventure1038", "choiceAdventure1039", "choiceAdventure1040", "choiceAdventure1041", "choiceAdventure1042", "choiceAdventure1044", "choiceAdventure1045", "choiceAdventure1046", "choiceAdventure1048", "choiceAdventure1051", "choiceAdventure1052", "choiceAdventure1053", "choiceAdventure1054", "choiceAdventure1055", "choiceAdventure1056", "choiceAdventure1057", "choiceAdventure1059", "choiceAdventure1060", "choiceAdventure1061", "choiceAdventure1062", "choiceAdventure1065", "choiceAdventure1067", "choiceAdventure1068", "choiceAdventure1069", "choiceAdventure1070", "choiceAdventure1071", "choiceAdventure1073", "choiceAdventure1077", "choiceAdventure1080", "choiceAdventure1081", "choiceAdventure1082", "choiceAdventure1083", "choiceAdventure1084", "choiceAdventure1085", "choiceAdventure1091", "choiceAdventure1094", "choiceAdventure1095", "choiceAdventure1096", "choiceAdventure1097", "choiceAdventure1102", "choiceAdventure1106", "choiceAdventure1107", "choiceAdventure1108", "choiceAdventure1110", "choiceAdventure1114", "choiceAdventure1115", "choiceAdventure1116", "choiceAdventure1118", "choiceAdventure1119", "choiceAdventure1120", "choiceAdventure1121", "choiceAdventure1122", "choiceAdventure1123", "choiceAdventure1171", "choiceAdventure1172", "choiceAdventure1173", "choiceAdventure1174", "choiceAdventure1175", "choiceAdventure1193", "choiceAdventure1195", "choiceAdventure1196", "choiceAdventure1197", "choiceAdventure1198", "choiceAdventure1199", "choiceAdventure1202", "choiceAdventure1203", "choiceAdventure1204", "choiceAdventure1205", "choiceAdventure1206", "choiceAdventure1207", "choiceAdventure1208", "choiceAdventure1209", "choiceAdventure1210", "choiceAdventure1211", "choiceAdventure1212", "choiceAdventure1213", "choiceAdventure1214", "choiceAdventure1215", "choiceAdventure1219", "choiceAdventure1222", "choiceAdventure1223", "choiceAdventure1224", "choiceAdventure1225", "choiceAdventure1226", "choiceAdventure1227", "choiceAdventure1228", "choiceAdventure1229", "choiceAdventure1236", "choiceAdventure1237", "choiceAdventure1238", "choiceAdventure1239", "choiceAdventure1240", "choiceAdventure1241", "choiceAdventure1242", "choiceAdventure1243", "choiceAdventure1244", "choiceAdventure1245", "choiceAdventure1246", "choiceAdventure1247", "choiceAdventure1248", "choiceAdventure1249", "choiceAdventure1250", "choiceAdventure1251", "choiceAdventure1252", "choiceAdventure1253", "choiceAdventure1254", "choiceAdventure1255", "choiceAdventure1256", "choiceAdventure1266", "choiceAdventure1280", "choiceAdventure1281", "choiceAdventure1282", "choiceAdventure1283", "choiceAdventure1284", "choiceAdventure1285", "choiceAdventure1286", "choiceAdventure1287", "choiceAdventure1288", "choiceAdventure1289", "choiceAdventure1290", "choiceAdventure1291", "choiceAdventure1292", "choiceAdventure1293", "choiceAdventure1294", "choiceAdventure1295", "choiceAdventure1296", "choiceAdventure1297", "choiceAdventure1298", "choiceAdventure1299", "choiceAdventure1300", "choiceAdventure1301", "choiceAdventure1302", "choiceAdventure1303", "choiceAdventure1304", "choiceAdventure1305", "choiceAdventure1307", "choiceAdventure1310", "choiceAdventure1312", "choiceAdventure1313", "choiceAdventure1314", "choiceAdventure1315", "choiceAdventure1316", "choiceAdventure1317", "choiceAdventure1318", "choiceAdventure1319", "choiceAdventure1321", "choiceAdventure1322", "choiceAdventure1323", "choiceAdventure1324", "choiceAdventure1325", "choiceAdventure1326", "choiceAdventure1327", "choiceAdventure1328", "choiceAdventure1332", "choiceAdventure1333", "choiceAdventure1335", "choiceAdventure1340", "choiceAdventure1341", "choiceAdventure1345", "choiceAdventure1389", "choiceAdventure1392", "choiceAdventure1397", "choiceAdventure1399", "choiceAdventure1405", "choiceAdventure1411", "choiceAdventure1415", "choiceAdventure1427", "choiceAdventure1428", "choiceAdventure1429", "choiceAdventure1430", "choiceAdventure1431", "choiceAdventure1432", "choiceAdventure1433", "choiceAdventure1434", "choiceAdventure1436", "choiceAdventure1460", "choiceAdventure1461", "choiceAdventure1467", "choiceAdventure1468", "choiceAdventure1469", "choiceAdventure1470", "choiceAdventure1471", "choiceAdventure1472", "choiceAdventure1473", "choiceAdventure1474", "choiceAdventure1475"], familiarProperties = ["commaFamiliar", "nextQuantumFamiliar", "stillsuitFamiliar"], statProperties = ["nsChallenge1", "snojoSetting"], phylumProperties = ["dnaSyringe", "locketPhylum", "redSnapperPhylum"];

// node_modules/libram/dist/propertyTyping.js
var booleanPropertiesSet = new Set(booleanProperties), numericPropertiesSet = new Set(numericProperties), numericOrStringPropertiesSet = new Set(numericOrStringProperties), stringPropertiesSet = new Set(stringProperties), locationPropertiesSet = new Set(locationProperties), monsterPropertiesSet = new Set(monsterProperties), familiarPropertiesSet = new Set(familiarProperties), statPropertiesSet = new Set(statProperties), phylumPropertiesSet = new Set(phylumProperties);
function isBooleanProperty(property) {
  return booleanPropertiesSet.has(property);
}
function isNumericProperty(property) {
  return numericPropertiesSet.has(property);
}
function isNumericOrStringProperty(property) {
  return numericOrStringPropertiesSet.has(property);
}
function isStringProperty(property) {
  return stringPropertiesSet.has(property);
}
function isLocationProperty(property) {
  return locationPropertiesSet.has(property);
}
function isMonsterProperty(property) {
  return monsterPropertiesSet.has(property);
}
function isFamiliarProperty(property) {
  return familiarPropertiesSet.has(property);
}
function isStatProperty(property) {
  return statPropertiesSet.has(property);
}
function isPhylumProperty(property) {
  return phylumPropertiesSet.has(property);
}

// node_modules/libram/dist/property.js
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), Object.defineProperty(Constructor, "prototype", { writable: !1 }), Constructor;
}
function _defineProperty(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!!o) {
    if (typeof o == "string")
      return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray(o, minLen);
  }
}
function _arrayLikeToArray(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol != "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i != null) {
    var _arr = [], _n = !0, _d = !1, _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !(i && _arr.length === i)); _n = !0)
        ;
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        !_n && _i.return != null && _i.return();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
}
var createPropertyGetter = function(transform) {
  return function(property, default_) {
    var value = (0, import_kolmafia.getProperty)(property);
    return default_ !== void 0 && value === "" ? default_ : transform(value, property);
  };
}, createMafiaClassPropertyGetter = function(Type, toType) {
  return createPropertyGetter(function(value) {
    if (value === "")
      return null;
    var v = toType(value);
    return v === Type.none ? null : v;
  });
}, getString = createPropertyGetter(function(value) {
  return value;
}), getCommaSeparated = createPropertyGetter(function(value) {
  return value.split(/, ?/);
}), getBoolean = createPropertyGetter(function(value) {
  return value === "true";
}), getNumber = createPropertyGetter(function(value) {
  return Number(value);
}), getBounty = createMafiaClassPropertyGetter(import_kolmafia.Bounty, import_kolmafia.toBounty), getClass = createMafiaClassPropertyGetter(import_kolmafia.Class, import_kolmafia.toClass), getCoinmaster = createMafiaClassPropertyGetter(import_kolmafia.Coinmaster, import_kolmafia.toCoinmaster), getEffect = createMafiaClassPropertyGetter(import_kolmafia.Effect, import_kolmafia.toEffect), getElement = createMafiaClassPropertyGetter(import_kolmafia.Element, import_kolmafia.toElement), getFamiliar = createMafiaClassPropertyGetter(import_kolmafia.Familiar, import_kolmafia.toFamiliar), getItem = createMafiaClassPropertyGetter(import_kolmafia.Item, import_kolmafia.toItem), getLocation = createMafiaClassPropertyGetter(import_kolmafia.Location, import_kolmafia.toLocation), getMonster = createMafiaClassPropertyGetter(import_kolmafia.Monster, import_kolmafia.toMonster), getPhylum = createMafiaClassPropertyGetter(import_kolmafia.Phylum, import_kolmafia.toPhylum), getServant = createMafiaClassPropertyGetter(import_kolmafia.Servant, import_kolmafia.toServant), getSkill = createMafiaClassPropertyGetter(import_kolmafia.Skill, import_kolmafia.toSkill), getSlot = createMafiaClassPropertyGetter(import_kolmafia.Slot, import_kolmafia.toSlot), getStat = createMafiaClassPropertyGetter(import_kolmafia.Stat, import_kolmafia.toStat), getThrall = createMafiaClassPropertyGetter(import_kolmafia.Thrall, import_kolmafia.toThrall);
function get(property, _default) {
  var value = getString(property);
  if (isBooleanProperty(property)) {
    var _getBoolean;
    return (_getBoolean = getBoolean(property, _default)) !== null && _getBoolean !== void 0 ? _getBoolean : !1;
  } else if (isNumericProperty(property)) {
    var _getNumber;
    return (_getNumber = getNumber(property, _default)) !== null && _getNumber !== void 0 ? _getNumber : 0;
  } else {
    if (isNumericOrStringProperty(property))
      return value.match(/^\d+$/) ? parseInt(value) : value;
    if (isLocationProperty(property))
      return getLocation(property, _default);
    if (isMonsterProperty(property))
      return getMonster(property, _default);
    if (isFamiliarProperty(property))
      return getFamiliar(property, _default);
    if (isStatProperty(property))
      return getStat(property, _default);
    if (isPhylumProperty(property))
      return getPhylum(property, _default);
    if (isStringProperty(property))
      return value;
  }
  return _default instanceof import_kolmafia.Location ? getLocation(property, _default) : _default instanceof import_kolmafia.Monster ? getMonster(property, _default) : _default instanceof import_kolmafia.Familiar ? getFamiliar(property, _default) : _default instanceof import_kolmafia.Stat ? getStat(property, _default) : _default instanceof import_kolmafia.Phylum ? getPhylum(property, _default) : typeof _default == "boolean" ? value === "true" ? !0 : value === "false" ? !1 : _default : typeof _default == "number" ? value === "" ? _default : parseInt(value) : value === "" ? _default === void 0 ? "" : _default : value;
}
function _set(property, value) {
  var stringValue = value === null ? "" : value.toString();
  (0, import_kolmafia.setProperty)(property, stringValue);
}
function setProperties(properties) {
  for (var _i = 0, _Object$entries = Object.entries(properties); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), prop = _Object$entries$_i[0], value = _Object$entries$_i[1];
    _set(prop, value);
  }
}
function withProperties(properties, callback) {
  var propertiesBackup = Object.fromEntries(Object.entries(properties).map(function(_ref2) {
    var _ref22 = _slicedToArray(_ref2, 1), prop = _ref22[0];
    return [prop, get(prop)];
  }));
  setProperties(properties);
  try {
    callback();
  } finally {
    setProperties(propertiesBackup);
  }
}
function withProperty(property, value, callback) {
  withProperties(_defineProperty({}, property, value), callback);
}
function withChoices(choices2, callback) {
  var properties = Object.fromEntries(Object.entries(choices2).map(function(_ref32) {
    var _ref42 = _slicedToArray(_ref32, 2), choice = _ref42[0], option = _ref42[1];
    return ["choiceAdventure".concat(choice), option];
  }));
  withProperties(properties, callback);
}
function withChoice(choice, value, callback) {
  withChoices(_defineProperty({}, choice, value), callback);
}
var PropertiesManager = /* @__PURE__ */ function() {
  function PropertiesManager2() {
    _classCallCheck(this, PropertiesManager2), _defineProperty(this, "properties", {});
  }
  return _createClass(PropertiesManager2, [{
    key: "storedValues",
    get: function() {
      return this.properties;
    }
  }, {
    key: "set",
    value: function(propertiesToSet) {
      for (var _i2 = 0, _Object$entries2 = Object.entries(propertiesToSet); _i2 < _Object$entries2.length; _i2++) {
        var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2), propertyName = _Object$entries2$_i[0], propertyValue = _Object$entries2$_i[1];
        this.properties[propertyName] === void 0 && (this.properties[propertyName] = get(propertyName)), _set(propertyName, propertyValue);
      }
    }
  }, {
    key: "setChoices",
    value: function(choicesToSet) {
      this.set(Object.fromEntries(Object.entries(choicesToSet).map(function(_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2), choiceNumber = _ref6[0], choiceValue = _ref6[1];
        return ["choiceAdventure".concat(choiceNumber), choiceValue];
      })));
    }
  }, {
    key: "setChoice",
    value: function(choiceToSet, value) {
      this.setChoices(_defineProperty({}, choiceToSet, value));
    }
  }, {
    key: "reset",
    value: function() {
      for (var _len = arguments.length, properties = new Array(_len), _key = 0; _key < _len; _key++)
        properties[_key] = arguments[_key];
      for (var _i3 = 0, _properties = properties; _i3 < _properties.length; _i3++) {
        var property = _properties[_i3], value = this.properties[property];
        value && _set(property, value);
      }
    }
  }, {
    key: "resetAll",
    value: function() {
      setProperties(this.properties);
    }
  }, {
    key: "clear",
    value: function() {
      for (var _len2 = arguments.length, properties = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++)
        properties[_key2] = arguments[_key2];
      for (var _i4 = 0, _properties2 = properties; _i4 < _properties2.length; _i4++) {
        var property = _properties2[_i4];
        this.properties[property] && delete this.properties[property];
      }
    }
  }, {
    key: "clearAll",
    value: function() {
      this.properties = {};
    }
  }, {
    key: "setMinimumValue",
    value: function(property, value) {
      return get(property, 0) < value ? (this.set(_defineProperty({}, property, value)), !0) : !1;
    }
  }, {
    key: "setMaximumValue",
    value: function(property, value) {
      return get(property, 0) > value ? (this.set(_defineProperty({}, property, value)), !0) : !1;
    }
  }, {
    key: "clone",
    value: function() {
      var newGuy = new PropertiesManager2();
      return newGuy.properties = this.storedValues, newGuy;
    }
  }, {
    key: "clamp",
    value: function(property, min, max) {
      if (max < min)
        return !1;
      var start = get(property);
      return this.setMinimumValue(property, min), this.setMaximumValue(property, max), start !== get(property);
    }
  }, {
    key: "equals",
    value: function(other) {
      var thisProps = Object.entries(this.storedValues), otherProps = new Map(Object.entries(other.storedValues));
      if (thisProps.length !== otherProps.size)
        return !1;
      for (var _i5 = 0, _thisProps = thisProps; _i5 < _thisProps.length; _i5++) {
        var _thisProps$_i = _slicedToArray(_thisProps[_i5], 2), propertyName = _thisProps$_i[0], propertyValue = _thisProps$_i[1];
        if (otherProps.get(propertyName) === propertyValue)
          return !1;
      }
      return !0;
    }
  }, {
    key: "merge",
    value: function(other) {
      var newGuy = new PropertiesManager2();
      return newGuy.properties = _objectSpread(_objectSpread({}, this.properties), other.properties), newGuy;
    }
  }], [{
    key: "merge",
    value: function() {
      for (var _len3 = arguments.length, mergees = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++)
        mergees[_key3] = arguments[_key3];
      return mergees.length === 0 ? new PropertiesManager2() : mergees.reduce(function(a, b) {
        return a.merge(b);
      });
    }
  }]), PropertiesManager2;
}();

// node_modules/libram/dist/template-string.js
init_kolmafia_polyfill();
var import_kolmafia2 = require("kolmafia");

// node_modules/libram/dist/utils.js
init_kolmafia_polyfill();
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray2(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e2) {
        throw _e2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e3) {
    didErr = !0, err = _e3;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _slicedToArray2(arr, i) {
  return _arrayWithHoles2(arr) || _iterableToArrayLimit2(arr, i) || _unsupportedIterableToArray2(arr, i) || _nonIterableRest2();
}
function _nonIterableRest2() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit2(arr, i) {
  var _i = arr == null ? null : typeof Symbol != "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i != null) {
    var _arr = [], _n = !0, _d = !1, _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !(i && _arr.length === i)); _n = !0)
        ;
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        !_n && _i.return != null && _i.return();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles2(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray2(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray2(o, minLen) {
  if (!!o) {
    if (typeof o == "string")
      return _arrayLikeToArray2(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray2(o, minLen);
  }
}
function _iterableToArray(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray2(arr);
}
function _arrayLikeToArray2(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}
function sum(addends, mappingFunction) {
  return addends.reduce(function(subtotal, element) {
    return subtotal + mappingFunction(element);
  }, 0);
}
function sumNumbers(addends) {
  return sum(addends, function(x) {
    return x;
  });
}
function setEqual(a, b) {
  var sortedA = _toConsumableArray(a).sort(), sortedB = _toConsumableArray(b).sort();
  return a.length === b.length && sortedA.every(function(item5, index) {
    return item5 === sortedB[index];
  });
}
function invertMap(map) {
  var returnValue = /* @__PURE__ */ new Map(), _iterator = _createForOfIteratorHelper(map), _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var _step$value = _slicedToArray2(_step.value, 2), key = _step$value[0], value = _step$value[1];
      returnValue.set(value, key);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return returnValue;
}
function splitByCommasWithEscapes(str) {
  var returnValue = [], ignoreNext = !1, currentString = "", _iterator2 = _createForOfIteratorHelper(str.split("")), _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
      var char = _step2.value;
      char === "\\" ? ignoreNext = !0 : (char == "," && !ignoreNext ? (returnValue.push(currentString.trim()), currentString = "") : currentString += char, ignoreNext = !1);
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return returnValue.push(currentString.trim()), returnValue;
}

// node_modules/libram/dist/template-string.js
var concatTemplateString = function(literals) {
  for (var _len = arguments.length, placeholders = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++)
    placeholders[_key - 1] = arguments[_key];
  return literals.raw.reduce(function(acc, literal, i) {
    var _placeholders$i;
    return acc + literal + ((_placeholders$i = placeholders[i]) !== null && _placeholders$i !== void 0 ? _placeholders$i : "");
  }, "");
}, createSingleConstant = function(Type) {
  var tagFunction = function(literals) {
    for (var _len2 = arguments.length, placeholders = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++)
      placeholders[_key2 - 1] = arguments[_key2];
    var input = concatTemplateString.apply(void 0, [literals].concat(placeholders));
    return Type.get(input);
  };
  return tagFunction.none = Type.none, tagFunction;
}, createPluralConstant = function(Type) {
  return function(literals) {
    for (var _len3 = arguments.length, placeholders = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++)
      placeholders[_key3 - 1] = arguments[_key3];
    var input = concatTemplateString.apply(void 0, [literals].concat(placeholders));
    return input === "" ? Type.all() : Type.get(splitByCommasWithEscapes(input));
  };
}, $bounty = createSingleConstant(import_kolmafia2.Bounty), $bounties = createPluralConstant(import_kolmafia2.Bounty), $class = createSingleConstant(import_kolmafia2.Class), $classes = createPluralConstant(import_kolmafia2.Class), $coinmaster = createSingleConstant(import_kolmafia2.Coinmaster), $coinmasters = createPluralConstant(import_kolmafia2.Coinmaster), $effect = createSingleConstant(import_kolmafia2.Effect), $effects = createPluralConstant(import_kolmafia2.Effect), $element = createSingleConstant(import_kolmafia2.Element), $elements = createPluralConstant(import_kolmafia2.Element), $familiar = createSingleConstant(import_kolmafia2.Familiar), $familiars = createPluralConstant(import_kolmafia2.Familiar), $item = createSingleConstant(import_kolmafia2.Item), $items = createPluralConstant(import_kolmafia2.Item), $location = createSingleConstant(import_kolmafia2.Location), $locations = createPluralConstant(import_kolmafia2.Location), $monster = createSingleConstant(import_kolmafia2.Monster), $monsters = createPluralConstant(import_kolmafia2.Monster), $phylum = createSingleConstant(import_kolmafia2.Phylum), $phyla = createPluralConstant(import_kolmafia2.Phylum), $servant = createSingleConstant(import_kolmafia2.Servant), $servants = createPluralConstant(import_kolmafia2.Servant), $skill = createSingleConstant(import_kolmafia2.Skill), $skills = createPluralConstant(import_kolmafia2.Skill), $slot = createSingleConstant(import_kolmafia2.Slot), $slots = createPluralConstant(import_kolmafia2.Slot), $stat = createSingleConstant(import_kolmafia2.Stat), $stats = createPluralConstant(import_kolmafia2.Stat), $thrall = createSingleConstant(import_kolmafia2.Thrall), $thralls = createPluralConstant(import_kolmafia2.Thrall), $path = createSingleConstant(import_kolmafia2.Path), $paths = createPluralConstant(import_kolmafia2.Path);

// node_modules/libram/dist/lib.js
var _templateObject;
var _templateObject5, _templateObject6;
var _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22, _templateObject23, _templateObject24, _templateObject25, _templateObject26, _templateObject27, _templateObject28, _templateObject29, _templateObject30, _templateObject31, _templateObject32, _templateObject33, _templateObject34;
function _defineProperties2(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass2(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties2(Constructor.prototype, protoProps), staticProps && _defineProperties2(Constructor, staticProps), Object.defineProperty(Constructor, "prototype", { writable: !1 }), Constructor;
}
function _classCallCheck2(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _inherits(subClass, superClass) {
  if (typeof superClass != "function" && superClass !== null)
    throw new TypeError("Super expression must either be null or a function");
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: !0, configurable: !0 } }), Object.defineProperty(subClass, "prototype", { writable: !1 }), superClass && _setPrototypeOf(subClass, superClass);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else
      result = Super.apply(this, arguments);
    return _possibleConstructorReturn(this, result);
  };
}
function _possibleConstructorReturn(self2, call) {
  if (call && (typeof call == "object" || typeof call == "function"))
    return call;
  if (call !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized(self2);
}
function _assertThisInitialized(self2) {
  if (self2 === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return self2;
}
function _wrapNativeSuper(Class5) {
  var _cache = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return _wrapNativeSuper = function(Class6) {
    if (Class6 === null || !_isNativeFunction(Class6))
      return Class6;
    if (typeof Class6 != "function")
      throw new TypeError("Super expression must either be null or a function");
    if (typeof _cache != "undefined") {
      if (_cache.has(Class6))
        return _cache.get(Class6);
      _cache.set(Class6, Wrapper);
    }
    function Wrapper() {
      return _construct(Class6, arguments, _getPrototypeOf(this).constructor);
    }
    return Wrapper.prototype = Object.create(Class6.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, Class6);
  }, _wrapNativeSuper(Class5);
}
function _construct(Parent, args3, Class5) {
  return _isNativeReflectConstruct() ? _construct = Reflect.construct.bind() : _construct = function(Parent2, args4, Class6) {
    var a = [null];
    a.push.apply(a, args4);
    var Constructor = Function.bind.apply(Parent2, a), instance = new Constructor();
    return Class6 && _setPrototypeOf(instance, Class6.prototype), instance;
  }, _construct.apply(null, arguments);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect == "undefined" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch (e) {
    return !1;
  }
}
function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function _setPrototypeOf(o, p) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(o2, p2) {
    return o2.__proto__ = p2, o2;
  }, _setPrototypeOf(o, p);
}
function _getPrototypeOf(o) {
  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  }, _getPrototypeOf(o);
}
function _slicedToArray3(arr, i) {
  return _arrayWithHoles3(arr) || _iterableToArrayLimit3(arr, i) || _unsupportedIterableToArray3(arr, i) || _nonIterableRest3();
}
function _nonIterableRest3() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray3(o, minLen) {
  if (!!o) {
    if (typeof o == "string")
      return _arrayLikeToArray3(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray3(o, minLen);
  }
}
function _arrayLikeToArray3(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit3(arr, i) {
  var _i = arr == null ? null : typeof Symbol != "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i != null) {
    var _arr = [], _n = !0, _d = !1, _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !(i && _arr.length === i)); _n = !0)
        ;
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        !_n && _i.return != null && _i.return();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles3(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _taggedTemplateLiteral(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
function isSong(skillOrEffect) {
  if (skillOrEffect instanceof import_kolmafia3.Effect && skillOrEffect.attributes.includes("song"))
    return !0;
  var skill = skillOrEffect instanceof import_kolmafia3.Effect ? (0, import_kolmafia3.toSkill)(skillOrEffect) : skillOrEffect;
  return skill.class === $class(_templateObject || (_templateObject = _taggedTemplateLiteral(["Accordion Thief"]))) && skill.buff;
}
function getRemainingStomach() {
  return (0, import_kolmafia3.fullnessLimit)() - (0, import_kolmafia3.myFullness)();
}
function have(thing) {
  var quantity = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  if (thing instanceof import_kolmafia3.Effect)
    return (0, import_kolmafia3.haveEffect)(thing) >= quantity;
  if (thing instanceof import_kolmafia3.Familiar)
    return (0, import_kolmafia3.haveFamiliar)(thing);
  if (thing instanceof import_kolmafia3.Item)
    return (0, import_kolmafia3.availableAmount)(thing) >= quantity;
  if (thing instanceof import_kolmafia3.Servant)
    return (0, import_kolmafia3.haveServant)(thing);
  if (thing instanceof import_kolmafia3.Skill)
    return (0, import_kolmafia3.haveSkill)(thing);
  if (thing instanceof import_kolmafia3.Thrall) {
    var thrall = (0, import_kolmafia3.myThrall)();
    return thrall.id === thing.id && thrall.level >= quantity;
  }
  return !1;
}
function haveInCampground(item5) {
  return Object.keys((0, import_kolmafia3.getCampground)()).map(function(i) {
    return import_kolmafia3.Item.get(i);
  }).includes(item5);
}
var Wanderer;
(function(Wanderer2) {
  Wanderer2.Digitize = "Digitize Monster", Wanderer2.Enamorang = "Enamorang Monster", Wanderer2.Familiar = "Familiar", Wanderer2.Holiday = "Holiday Monster", Wanderer2.Kramco = "Kramco", Wanderer2.Nemesis = "Nemesis Assassin", Wanderer2.Portscan = "portscan.edu", Wanderer2.Romantic = "Romantic Monster", Wanderer2.Vote = "Vote Monster";
})(Wanderer || (Wanderer = {}));
var deterministicWanderers = [Wanderer.Digitize, Wanderer.Portscan];
function getFoldGroup(item5) {
  return Object.entries((0, import_kolmafia3.getRelated)(item5, "fold")).sort(function(_ref2, _ref22) {
    var _ref32 = _slicedToArray3(_ref2, 2), a = _ref32[1], _ref42 = _slicedToArray3(_ref22, 2), b = _ref42[1];
    return a - b;
  }).map(function(_ref5) {
    var _ref6 = _slicedToArray3(_ref5, 1), i = _ref6[0];
    return import_kolmafia3.Item.get(i);
  });
}
function uneffect(effect) {
  return (0, import_kolmafia3.cliExecute)("uneffect ".concat(effect.name));
}
var EnsureError = /* @__PURE__ */ function(_Error) {
  _inherits(EnsureError2, _Error);
  var _super = _createSuper(EnsureError2);
  function EnsureError2(cause, reason) {
    var _this;
    return _classCallCheck2(this, EnsureError2), _this = _super.call(this, "Failed to ensure ".concat(cause.name, "!").concat(reason ? " ".concat(reason) : "")), _this.name = "Ensure Error", _this;
  }
  return _createClass2(EnsureError2);
}(/* @__PURE__ */ _wrapNativeSuper(Error));
function ensureEffect(ef) {
  var turns = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  if ((0, import_kolmafia3.haveEffect)(ef) < turns) {
    if (ef.default === null)
      throw new EnsureError(ef, "No default action");
    if (!(0, import_kolmafia3.cliExecute)(ef.default) || (0, import_kolmafia3.haveEffect)(ef) === 0)
      throw new EnsureError(ef);
  }
}
var valueMap = /* @__PURE__ */ new Map(), MALL_VALUE_MODIFIER = 0.9;
function getSaleValue() {
  for (var _len = arguments.length, items = new Array(_len), _key = 0; _key < _len; _key++)
    items[_key] = arguments[_key];
  return items.map(function(item5) {
    return valueMap.has(item5) || (item5.discardable ? valueMap.set(item5, (0, import_kolmafia3.mallPrice)(item5) > Math.max(2 * (0, import_kolmafia3.autosellPrice)(item5), 100) ? MALL_VALUE_MODIFIER * (0, import_kolmafia3.mallPrice)(item5) : (0, import_kolmafia3.autosellPrice)(item5)) : valueMap.set(item5, (0, import_kolmafia3.mallPrice)(item5) > 100 ? MALL_VALUE_MODIFIER * (0, import_kolmafia3.mallPrice)(item5) : 0)), valueMap.get(item5) || 0;
  }).reduce(function(s, price) {
    return s + price;
  }, 0) / items.length;
}
function findLeprechaunMultiplier(familiar3) {
  if (familiar3 === $familiar(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["Mutant Cactus Bud"]))))
    return (0, import_kolmafia3.numericModifier)(familiar3, "Leprechaun Effectiveness", 1, $item.none);
  if (familiar3 === $familiar(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["Reanimated Reanimator"]))))
    return 0;
  var meatBonus = (0, import_kolmafia3.numericModifier)(familiar3, "Meat Drop", 1, $item.none);
  return meatBonus === 0 ? 0 : Math.pow(Math.sqrt(meatBonus / 2 + 55 / 4 + 3) - Math.sqrt(55) / 2, 2);
}
var holidayWanderers = /* @__PURE__ */ new Map([["El Dia De Los Muertos Borrachos", $monsters(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["Novia Cad\xE1ver, Novio Cad\xE1ver, Padre Cad\xE1ver, Persona Inocente Cad\xE1ver"])))], ["Feast of Boris", $monsters(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["Candied Yam Golem, Malevolent Tofurkey, Possessed Can of Cranberry Sauce, Stuffing Golem"])))], ["Talk Like a Pirate Day", $monsters(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["ambulatory pirate, migratory pirate, peripatetic pirate"])))]]);
function getTodaysHolidayWanderers() {
  return (0, import_kolmafia3.holiday)().split("/").map(function(holiday2) {
    var _holidayWanderers$get;
    return (_holidayWanderers$get = holidayWanderers.get(holiday2)) !== null && _holidayWanderers$get !== void 0 ? _holidayWanderers$get : [];
  }).flat();
}
var telescopeStats = /* @__PURE__ */ new Map([["standing around flexing their muscles and using grip exercisers", $stat(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["Muscle"])))], ["sitting around playing chess and solving complicated-looking logic puzzles", $stat(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["Mysticality"])))], ["all wearing sunglasses and dancing", $stat(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["Moxie"])))]]), telescopeElements = /* @__PURE__ */ new Map([["people, all of whom appear to be on fire", $element(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["hot"])))], ["people, surrounded by a cloud of eldritch mist", $element(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["spooky"])))], ["greasy-looking people furtively skulking around", $element(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["sleaze"])))], ["people, surrounded by garbage and clouds of flies", $element(_templateObject18 || (_templateObject18 = _taggedTemplateLiteral(["stench"])))], ["people, clustered around a group of igloos", $element(_templateObject19 || (_templateObject19 = _taggedTemplateLiteral(["cold"])))]]), hedgeTrap1 = /* @__PURE__ */ new Map([["smoldering bushes on the outskirts of a hedge maze", $element(_templateObject20 || (_templateObject20 = _taggedTemplateLiteral(["hot"])))], ["creepy-looking black bushes on the outskirts of a hedge maze", $element(_templateObject21 || (_templateObject21 = _taggedTemplateLiteral(["spooky"])))], ["purplish, greasy-looking hedges", $element(_templateObject22 || (_templateObject22 = _taggedTemplateLiteral(["sleaze"])))], ["nasty-looking, dripping green bushes on the outskirts of a hedge maze", $element(_templateObject23 || (_templateObject23 = _taggedTemplateLiteral(["stench"])))], ["frost-rimed bushes on the outskirts of a hedge maze", $element(_templateObject24 || (_templateObject24 = _taggedTemplateLiteral(["cold"])))]]), hedgeTrap2 = /* @__PURE__ */ new Map([["smoke rising from deeper within the maze", $element(_templateObject25 || (_templateObject25 = _taggedTemplateLiteral(["hot"])))], ["a miasma of eldritch vapors rising from deeper within the maze", $element(_templateObject26 || (_templateObject26 = _taggedTemplateLiteral(["spooky"])))], ["a greasy purple cloud hanging over the center of the maze", $element(_templateObject27 || (_templateObject27 = _taggedTemplateLiteral(["sleaze"])))], ["a cloud of green gas hovering over the maze", $element(_templateObject28 || (_templateObject28 = _taggedTemplateLiteral(["stench"])))], ["wintry mists rising from deeper within the maze", $element(_templateObject29 || (_templateObject29 = _taggedTemplateLiteral(["cold"])))]]), hedgeTrap3 = /* @__PURE__ */ new Map([["with lava slowly oozing out of it", $element(_templateObject30 || (_templateObject30 = _taggedTemplateLiteral(["hot"])))], ["surrounded by creepy black mist", $element(_templateObject31 || (_templateObject31 = _taggedTemplateLiteral(["spooky"])))], ["that occasionally vomits out a greasy ball of hair", $element(_templateObject32 || (_templateObject32 = _taggedTemplateLiteral(["sleaze"])))], ["disgorging a really surprising amount of sewage", $element(_templateObject33 || (_templateObject33 = _taggedTemplateLiteral(["stench"])))], ["occasionally disgorging a bunch of ice cubes", $element(_templateObject34 || (_templateObject34 = _taggedTemplateLiteral(["cold"])))]]);

// node_modules/libram/dist/combat.js
var _templateObject2, _templateObject210;
function _get() {
  return typeof Reflect != "undefined" && Reflect.get ? _get = Reflect.get.bind() : _get = function(target, property, receiver) {
    var base = _superPropBase(target, property);
    if (!!base) {
      var desc = Object.getOwnPropertyDescriptor(base, property);
      return desc.get ? desc.get.call(arguments.length < 3 ? target : receiver) : desc.value;
    }
  }, _get.apply(this, arguments);
}
function _superPropBase(object, property) {
  for (; !Object.prototype.hasOwnProperty.call(object, property) && (object = _getPrototypeOf2(object), object !== null); )
    ;
  return object;
}
function _createForOfIteratorHelper2(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray4(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e) {
        throw _e;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e2) {
    didErr = !0, err = _e2;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _toConsumableArray2(arr) {
  return _arrayWithoutHoles2(arr) || _iterableToArray2(arr) || _unsupportedIterableToArray4(arr) || _nonIterableSpread2();
}
function _nonIterableSpread2() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray4(o, minLen) {
  if (!!o) {
    if (typeof o == "string")
      return _arrayLikeToArray4(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray4(o, minLen);
  }
}
function _iterableToArray2(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles2(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray4(arr);
}
function _arrayLikeToArray4(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _defineProperty2(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
function _defineProperties3(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass3(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties3(Constructor.prototype, protoProps), staticProps && _defineProperties3(Constructor, staticProps), Object.defineProperty(Constructor, "prototype", { writable: !1 }), Constructor;
}
function _classCallCheck3(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _inherits2(subClass, superClass) {
  if (typeof superClass != "function" && superClass !== null)
    throw new TypeError("Super expression must either be null or a function");
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: !0, configurable: !0 } }), Object.defineProperty(subClass, "prototype", { writable: !1 }), superClass && _setPrototypeOf2(subClass, superClass);
}
function _createSuper2(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct2();
  return function() {
    var Super = _getPrototypeOf2(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf2(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else
      result = Super.apply(this, arguments);
    return _possibleConstructorReturn2(this, result);
  };
}
function _possibleConstructorReturn2(self2, call) {
  if (call && (typeof call == "object" || typeof call == "function"))
    return call;
  if (call !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized2(self2);
}
function _assertThisInitialized2(self2) {
  if (self2 === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return self2;
}
function _wrapNativeSuper2(Class5) {
  var _cache = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return _wrapNativeSuper2 = function(Class6) {
    if (Class6 === null || !_isNativeFunction2(Class6))
      return Class6;
    if (typeof Class6 != "function")
      throw new TypeError("Super expression must either be null or a function");
    if (typeof _cache != "undefined") {
      if (_cache.has(Class6))
        return _cache.get(Class6);
      _cache.set(Class6, Wrapper);
    }
    function Wrapper() {
      return _construct2(Class6, arguments, _getPrototypeOf2(this).constructor);
    }
    return Wrapper.prototype = Object.create(Class6.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf2(Wrapper, Class6);
  }, _wrapNativeSuper2(Class5);
}
function _construct2(Parent, args3, Class5) {
  return _isNativeReflectConstruct2() ? _construct2 = Reflect.construct.bind() : _construct2 = function(Parent2, args4, Class6) {
    var a = [null];
    a.push.apply(a, args4);
    var Constructor = Function.bind.apply(Parent2, a), instance = new Constructor();
    return Class6 && _setPrototypeOf2(instance, Class6.prototype), instance;
  }, _construct2.apply(null, arguments);
}
function _isNativeReflectConstruct2() {
  if (typeof Reflect == "undefined" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch (e) {
    return !1;
  }
}
function _isNativeFunction2(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function _setPrototypeOf2(o, p) {
  return _setPrototypeOf2 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(o2, p2) {
    return o2.__proto__ = p2, o2;
  }, _setPrototypeOf2(o, p);
}
function _getPrototypeOf2(o) {
  return _getPrototypeOf2 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  }, _getPrototypeOf2(o);
}
function _taggedTemplateLiteral2(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var MACRO_NAME = "Script Autoattack Macro";
function getMacroId() {
  var name = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : MACRO_NAME, macroMatches = (0, import_kolmafia4.xpath)((0, import_kolmafia4.visitUrl)("account_combatmacros.php"), '//select[@name="macroid"]/option[text()="'.concat(name, '"]/@value'));
  if (macroMatches.length === 0) {
    (0, import_kolmafia4.visitUrl)("account_combatmacros.php?action=new");
    var newMacroText = (0, import_kolmafia4.visitUrl)("account_combatmacros.php?macroid=0&name=".concat(name, "&macrotext=abort&action=save"));
    return parseInt((0, import_kolmafia4.xpath)(newMacroText, "//input[@name=".concat(name, "]/@value"))[0], 10);
  } else
    return parseInt(macroMatches[0], 10);
}
function itemOrNameToItem(itemOrName) {
  return typeof itemOrName == "string" ? import_kolmafia4.Item.get(itemOrName) : itemOrName;
}
var substringCombatItems = $items(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral2(["spider web, really sticky spider web, dictionary, NG, Cloaca-Cola, yo-yo, top, ball, kite, yo, red potion, blue potion, adder, red button, pile of sand, mushroom, deluxe mushroom"]))), substringCombatSkills = $skills(_templateObject210 || (_templateObject210 = _taggedTemplateLiteral2(["Shoot, Thrust-Smack, Headbutt, Toss, Sing, Disarm, LIGHT, BURN, Extract, Meteor Shower, Cleave, Boil, Slice, Rainbow"])));
function itemOrItemsBallsMacroName(itemOrItems) {
  if (Array.isArray(itemOrItems))
    return itemOrItems.map(itemOrItemsBallsMacroName).join(", ");
  var item5 = itemOrNameToItem(itemOrItems);
  return substringCombatItems.includes(item5) ? (0, import_kolmafia4.toInt)(item5).toString() : item5.name;
}
function itemOrItemsBallsMacroPredicate(itemOrItems) {
  return Array.isArray(itemOrItems) ? itemOrItems.map(itemOrItemsBallsMacroPredicate).join(" && ") : "hascombatitem ".concat(itemOrItems);
}
function skillOrNameToSkill(skillOrName) {
  return typeof skillOrName == "string" ? import_kolmafia4.Skill.get(skillOrName) : skillOrName;
}
function skillBallsMacroName(skillOrName) {
  var skill = skillOrNameToSkill(skillOrName);
  return skill.name.match(/^[A-Za-z ]+$/) && !substringCombatSkills.includes(skill) ? skill.name : (0, import_kolmafia4.toInt)(skill);
}
var InvalidMacroError = /* @__PURE__ */ function(_Error) {
  _inherits2(InvalidMacroError2, _Error);
  var _super = _createSuper2(InvalidMacroError2);
  function InvalidMacroError2() {
    return _classCallCheck3(this, InvalidMacroError2), _super.apply(this, arguments);
  }
  return _createClass3(InvalidMacroError2);
}(/* @__PURE__ */ _wrapNativeSuper2(Error)), Macro = /* @__PURE__ */ function() {
  function Macro3() {
    _classCallCheck3(this, Macro3), _defineProperty2(this, "components", []), _defineProperty2(this, "name", MACRO_NAME);
  }
  return _createClass3(Macro3, [{
    key: "toString",
    value: function() {
      return (this.components.join(";") + ";").replace(/;;+/g, ";");
    }
  }, {
    key: "rename",
    value: function(name) {
      var returnValue = this.name;
      return this.name = name, returnValue;
    }
  }, {
    key: "save",
    value: function() {
      _set(Macro3.SAVED_MACRO_PROPERTY, this.toString());
    }
  }, {
    key: "step",
    value: function() {
      for (var _ref2, _this$components, _len = arguments.length, nextSteps = new Array(_len), _key = 0; _key < _len; _key++)
        nextSteps[_key] = arguments[_key];
      var nextStepsStrings = (_ref2 = []).concat.apply(_ref2, _toConsumableArray2(nextSteps.map(function(x) {
        return x instanceof Macro3 ? x.components : [x];
      })));
      return (_this$components = this.components).push.apply(_this$components, _toConsumableArray2(nextStepsStrings.filter(function(s) {
        return s.length > 0;
      }))), this;
    }
  }, {
    key: "submit",
    value: function() {
      var final = this.toString();
      return (0, import_kolmafia4.visitUrl)("fight.php?action=macro&macrotext=".concat((0, import_kolmafia4.urlEncode)(final)), !0, !0);
    }
  }, {
    key: "setAutoAttack",
    value: function() {
      var id = Macro3.cachedMacroIds.get(this.name);
      id === void 0 && (id = getMacroId(this.name), Macro3.cachedMacroIds.set(this.name, id)), !((0, import_kolmafia4.getAutoAttack)() === 99e6 + id && this.toString() === Macro3.cachedAutoAttacks.get(this.name)) && ((0, import_kolmafia4.visitUrl)("account_combatmacros.php?macroid=".concat(id, "&name=").concat((0, import_kolmafia4.urlEncode)(this.name), "&macrotext=").concat((0, import_kolmafia4.urlEncode)(this.toString()), "&action=save"), !0, !0), (0, import_kolmafia4.visitUrl)("account.php?am=1&action=autoattack&value=".concat(99e6 + id, "&ajax=1")), Macro3.cachedAutoAttacks.set(this.name, this.toString()));
    }
  }, {
    key: "setAutoAttackAs",
    value: function(name) {
      this.name = name, this.setAutoAttack();
    }
  }, {
    key: "abort",
    value: function() {
      return this.step("abort");
    }
  }, {
    key: "runaway",
    value: function() {
      return this.step("runaway");
    }
  }, {
    key: "if_",
    value: function(condition, ifTrue) {
      return this.step("if ".concat(Macro3.makeBALLSPredicate(condition))).step(ifTrue).step("endif");
    }
  }, {
    key: "ifNot",
    value: function(condition, ifTrue) {
      return this.step("if !(".concat(Macro3.makeBALLSPredicate(condition), ")")).step(ifTrue).step("endif");
    }
  }, {
    key: "while_",
    value: function(condition, contents) {
      return this.step("while ".concat(condition)).step(contents).step("endwhile");
    }
  }, {
    key: "externalIf",
    value: function(condition, ifTrue, ifFalse) {
      return condition ? this.step(ifTrue) : ifFalse ? this.step(ifFalse) : this;
    }
  }, {
    key: "repeat",
    value: function() {
      return this.step("repeat");
    }
  }, {
    key: "skill",
    value: function() {
      for (var _len2 = arguments.length, skills = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++)
        skills[_key2] = arguments[_key2];
      return this.step.apply(this, _toConsumableArray2(skills.map(function(skill2) {
        return "skill ".concat(skillBallsMacroName(skill2));
      })));
    }
  }, {
    key: "trySkill",
    value: function() {
      for (var _len3 = arguments.length, skills = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++)
        skills[_key3] = arguments[_key3];
      return this.step.apply(this, _toConsumableArray2(skills.map(function(skill) {
        return Macro3.if_("hasskill ".concat(skillBallsMacroName(skill)), Macro3.skill(skill));
      })));
    }
  }, {
    key: "trySkillRepeat",
    value: function() {
      for (var _len4 = arguments.length, skills = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++)
        skills[_key4] = arguments[_key4];
      return this.step.apply(this, _toConsumableArray2(skills.map(function(skill) {
        return Macro3.if_("hasskill ".concat(skillBallsMacroName(skill)), Macro3.skill(skill).repeat());
      })));
    }
  }, {
    key: "item",
    value: function() {
      for (var _len5 = arguments.length, items = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++)
        items[_key5] = arguments[_key5];
      return this.step.apply(this, _toConsumableArray2(items.map(function(itemOrItems) {
        return "use ".concat(itemOrItemsBallsMacroName(itemOrItems));
      })));
    }
  }, {
    key: "tryItem",
    value: function() {
      for (var _len6 = arguments.length, items = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++)
        items[_key6] = arguments[_key6];
      return this.step.apply(this, _toConsumableArray2(items.map(function(item5) {
        return Macro3.if_(itemOrItemsBallsMacroPredicate(item5), "use ".concat(itemOrItemsBallsMacroName(item5)));
      })));
    }
  }, {
    key: "attack",
    value: function() {
      return this.step("attack");
    }
  }, {
    key: "ifHolidayWanderer",
    value: function(macro) {
      var todaysWanderers = getTodaysHolidayWanderers();
      return todaysWanderers.length === 0 ? this : this.if_(todaysWanderers.map(function(monster) {
        return "monsterid ".concat(monster.id);
      }).join(" || "), macro);
    }
  }, {
    key: "ifNotHolidayWanderer",
    value: function(macro) {
      var todaysWanderers = getTodaysHolidayWanderers();
      return todaysWanderers.length === 0 ? this.step(macro) : this.if_(todaysWanderers.map(function(monster) {
        return "!monsterid ".concat(monster.id);
      }).join(" && "), macro);
    }
  }], [{
    key: "load",
    value: function() {
      var _this;
      return (_this = new this()).step.apply(_this, _toConsumableArray2(get(Macro3.SAVED_MACRO_PROPERTY).split(";")));
    }
  }, {
    key: "clearSaved",
    value: function() {
      (0, import_kolmafia4.removeProperty)(Macro3.SAVED_MACRO_PROPERTY);
    }
  }, {
    key: "step",
    value: function() {
      var _this2;
      return (_this2 = new this()).step.apply(_this2, arguments);
    }
  }, {
    key: "clearAutoAttackMacros",
    value: function() {
      var _iterator = _createForOfIteratorHelper2(Macro3.cachedAutoAttacks.keys()), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var _Macro$cachedMacroIds, name = _step.value, id = (_Macro$cachedMacroIds = Macro3.cachedMacroIds.get(name)) !== null && _Macro$cachedMacroIds !== void 0 ? _Macro$cachedMacroIds : getMacroId(name);
          (0, import_kolmafia4.visitUrl)("account_combatmacros.php?macroid=".concat(id, "&action=edit&what=Delete&confirm=1")), Macro3.cachedAutoAttacks.delete(name), Macro3.cachedMacroIds.delete(name);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "abort",
    value: function() {
      return new this().abort();
    }
  }, {
    key: "runaway",
    value: function() {
      return new this().runaway();
    }
  }, {
    key: "makeBALLSPredicate",
    value: function(condition) {
      var ballsCondition = "";
      if (condition instanceof import_kolmafia4.Monster)
        ballsCondition = "monsterid ".concat(condition.id);
      else if (condition instanceof Array)
        ballsCondition = condition.map(function(mon) {
          return "monsterid ".concat(mon.id);
        }).join(" || "), ballsCondition = "(".concat(ballsCondition, ")");
      else if (condition instanceof import_kolmafia4.Effect)
        ballsCondition = "haseffect ".concat((0, import_kolmafia4.toInt)(condition));
      else if (condition instanceof import_kolmafia4.Skill)
        ballsCondition = "hasskill ".concat(skillBallsMacroName(condition));
      else if (condition instanceof import_kolmafia4.Item) {
        if (!condition.combat)
          throw new InvalidMacroError("Item ".concat(condition, " cannot be made a valid BALLS predicate (it is not combat-usable)"));
        ballsCondition = "hascombatitem ".concat(itemOrItemsBallsMacroName(condition));
      } else if (condition instanceof import_kolmafia4.Location) {
        var snarfblat = condition.id;
        if (snarfblat < 1)
          throw new InvalidMacroError("Location ".concat(condition, " cannot be made a valid BALLS predicate (it has no location id)"));
        ballsCondition = "snarfblat ".concat(snarfblat);
      } else if (condition instanceof import_kolmafia4.Class) {
        if ((0, import_kolmafia4.toInt)(condition) > 6)
          throw new InvalidMacroError("Class ".concat(condition, " cannot be made a valid BALLS predicate (it is not a standard class)"));
        ballsCondition = condition.toString().replaceAll(" ", "").toLowerCase();
      } else
        condition instanceof import_kolmafia4.Stat ? ballsCondition = "".concat(condition.toString().toLowerCase(), "class") : ballsCondition = condition;
      return ballsCondition;
    }
  }, {
    key: "if_",
    value: function(condition, ifTrue) {
      return new this().if_(condition, ifTrue);
    }
  }, {
    key: "ifNot",
    value: function(condition, ifTrue) {
      return new this().ifNot(condition, ifTrue);
    }
  }, {
    key: "while_",
    value: function(condition, contents) {
      return new this().while_(condition, contents);
    }
  }, {
    key: "externalIf",
    value: function(condition, ifTrue, ifFalse) {
      return new this().externalIf(condition, ifTrue, ifFalse);
    }
  }, {
    key: "skill",
    value: function() {
      var _this3;
      return (_this3 = new this()).skill.apply(_this3, arguments);
    }
  }, {
    key: "trySkill",
    value: function() {
      var _this4;
      return (_this4 = new this()).trySkill.apply(_this4, arguments);
    }
  }, {
    key: "trySkillRepeat",
    value: function() {
      var _this5;
      return (_this5 = new this()).trySkillRepeat.apply(_this5, arguments);
    }
  }, {
    key: "item",
    value: function() {
      var _this6;
      return (_this6 = new this()).item.apply(_this6, arguments);
    }
  }, {
    key: "tryItem",
    value: function() {
      var _this7;
      return (_this7 = new this()).tryItem.apply(_this7, arguments);
    }
  }, {
    key: "attack",
    value: function() {
      return new this().attack();
    }
  }, {
    key: "ifHolidayWanderer",
    value: function(macro) {
      return new this().ifHolidayWanderer(macro);
    }
  }, {
    key: "ifNotHolidayWanderer",
    value: function(macro) {
      return new this().ifNotHolidayWanderer(macro);
    }
  }]), Macro3;
}();
_defineProperty2(Macro, "SAVED_MACRO_PROPERTY", "libram_savedMacro");
_defineProperty2(Macro, "cachedMacroIds", /* @__PURE__ */ new Map());
_defineProperty2(Macro, "cachedAutoAttacks", /* @__PURE__ */ new Map());
var StrictMacro = /* @__PURE__ */ function(_Macro) {
  _inherits2(StrictMacro2, _Macro);
  var _super2 = _createSuper2(StrictMacro2);
  function StrictMacro2() {
    return _classCallCheck3(this, StrictMacro2), _super2.apply(this, arguments);
  }
  return _createClass3(StrictMacro2, [{
    key: "skill",
    value: function() {
      for (var _get22, _len7 = arguments.length, skills = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++)
        skills[_key7] = arguments[_key7];
      return (_get22 = _get(_getPrototypeOf2(StrictMacro2.prototype), "skill", this)).call.apply(_get22, [this].concat(skills));
    }
  }, {
    key: "item",
    value: function() {
      for (var _get3, _len8 = arguments.length, items = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++)
        items[_key8] = arguments[_key8];
      return (_get3 = _get(_getPrototypeOf2(StrictMacro2.prototype), "item", this)).call.apply(_get3, [this].concat(items));
    }
  }, {
    key: "trySkill",
    value: function() {
      for (var _get4, _len9 = arguments.length, skills = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++)
        skills[_key9] = arguments[_key9];
      return (_get4 = _get(_getPrototypeOf2(StrictMacro2.prototype), "trySkill", this)).call.apply(_get4, [this].concat(skills));
    }
  }, {
    key: "tryItem",
    value: function() {
      for (var _get5, _len10 = arguments.length, items = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++)
        items[_key10] = arguments[_key10];
      return (_get5 = _get(_getPrototypeOf2(StrictMacro2.prototype), "tryItem", this)).call.apply(_get5, [this].concat(items));
    }
  }, {
    key: "trySkillRepeat",
    value: function() {
      for (var _get6, _len11 = arguments.length, skills = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++)
        skills[_key11] = arguments[_key11];
      return (_get6 = _get(_getPrototypeOf2(StrictMacro2.prototype), "trySkillRepeat", this)).call.apply(_get6, [this].concat(skills));
    }
  }], [{
    key: "skill",
    value: function() {
      var _this8;
      return (_this8 = new this()).skill.apply(_this8, arguments);
    }
  }, {
    key: "item",
    value: function() {
      var _this9;
      return (_this9 = new this()).item.apply(_this9, arguments);
    }
  }, {
    key: "trySkill",
    value: function() {
      var _this10;
      return (_this10 = new this()).trySkill.apply(_this10, arguments);
    }
  }, {
    key: "tryItem",
    value: function() {
      var _this11;
      return (_this11 = new this()).tryItem.apply(_this11, arguments);
    }
  }, {
    key: "trySkillRepeat",
    value: function() {
      var _this12;
      return (_this12 = new this()).trySkillRepeat.apply(_this12, arguments);
    }
  }]), StrictMacro2;
}(Macro);

// node_modules/libram/dist/maximize.js
init_kolmafia_polyfill();
var import_kolmafia6 = require("kolmafia");

// node_modules/libram/dist/logger.js
init_kolmafia_polyfill();
var import_kolmafia5 = require("kolmafia");
function _classCallCheck4(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties4(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass4(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties4(Constructor.prototype, protoProps), staticProps && _defineProperties4(Constructor, staticProps), Object.defineProperty(Constructor, "prototype", { writable: !1 }), Constructor;
}
function _defineProperty3(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
var defaultHandlers = {
  info: function(message) {
    return (0, import_kolmafia5.printHtml)("<b>[Libram]</b> ".concat(message));
  },
  warning: function(message) {
    return (0, import_kolmafia5.printHtml)('<span style="background: orange; color: white;"><b>[Libram]</b> '.concat(message, "</span>"));
  },
  error: function(_error) {
    return (0, import_kolmafia5.printHtml)('<span style="background: red; color: white;"><b>[Libram]</b> '.concat(_error.toString(), "</span>"));
  }
}, Logger = /* @__PURE__ */ function() {
  function Logger2() {
    _classCallCheck4(this, Logger2), _defineProperty3(this, "handlers", defaultHandlers);
  }
  return _createClass4(Logger2, [{
    key: "setHandler",
    value: function(level, callback) {
      this.handlers[level] = callback;
    }
  }, {
    key: "log",
    value: function(level, message) {
      this.handlers[level](message);
    }
  }, {
    key: "info",
    value: function(message) {
      this.log("info", message);
    }
  }, {
    key: "warning",
    value: function(message) {
      this.log("warning", message);
    }
  }, {
    key: "error",
    value: function(message) {
      this.log("error", message);
    }
  }]), Logger2;
}(), logger_default = new Logger();

// node_modules/libram/dist/maximize.js
var _templateObject3, _templateObject211, _templateObject35, _templateObject4, _templateObject52, _templateObject62, _templateObject7, _templateObject8, _templateObject92, _templateObject102, _templateObject112, _templateObject122, _templateObject132, _templateObject142, _templateObject152, _templateObject162, _templateObject172, _templateObject182, _templateObject192, _templateObject202, _templateObject212, _templateObject222, _templateObject232, _templateObject242, _templateObject252, _templateObject262, _templateObject272, _templateObject282, _templateObject292, _templateObject302, _templateObject312, _templateObject322, _templateObject332, _templateObject342, _templateObject352, _templateObject36, _templateObject37, _templateObject38, _templateObject39, _templateObject40, _templateObject41, _templateObject42, _templateObject43, _templateObject44, _templateObject45, _templateObject46, _templateObject47, _templateObject48;
function _slicedToArray4(arr, i) {
  return _arrayWithHoles4(arr) || _iterableToArrayLimit4(arr, i) || _unsupportedIterableToArray5(arr, i) || _nonIterableRest4();
}
function _nonIterableRest4() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit4(arr, i) {
  var _i = arr == null ? null : typeof Symbol != "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i != null) {
    var _arr = [], _n = !0, _d = !1, _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !(i && _arr.length === i)); _n = !0)
        ;
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        !_n && _i.return != null && _i.return();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles4(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _classPrivateFieldInitSpec(obj, privateMap, value) {
  _checkPrivateRedeclaration(obj, privateMap), privateMap.set(obj, value);
}
function _checkPrivateRedeclaration(obj, privateCollection) {
  if (privateCollection.has(obj))
    throw new TypeError("Cannot initialize the same private elements twice on an object");
}
function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get");
  return _classApplyDescriptorGet(receiver, descriptor);
}
function _classApplyDescriptorGet(receiver, descriptor) {
  return descriptor.get ? descriptor.get.call(receiver) : descriptor.value;
}
function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");
  return _classApplyDescriptorSet(receiver, descriptor, value), value;
}
function _classExtractFieldDescriptor(receiver, privateMap, action) {
  if (!privateMap.has(receiver))
    throw new TypeError("attempted to " + action + " private field on non-instance");
  return privateMap.get(receiver);
}
function _classApplyDescriptorSet(receiver, descriptor, value) {
  if (descriptor.set)
    descriptor.set.call(receiver, value);
  else {
    if (!descriptor.writable)
      throw new TypeError("attempted to set read only private field");
    descriptor.value = value;
  }
}
function _defineProperties5(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass5(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties5(Constructor.prototype, protoProps), staticProps && _defineProperties5(Constructor, staticProps), Object.defineProperty(Constructor, "prototype", { writable: !1 }), Constructor;
}
function _classCallCheck5(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _createForOfIteratorHelper3(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray5(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e2) {
        throw _e2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e3) {
    didErr = !0, err = _e3;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _taggedTemplateLiteral3(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
function ownKeys2(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    i % 2 ? ownKeys2(Object(source), !0).forEach(function(key) {
      _defineProperty4(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys2(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty4(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
function _toConsumableArray3(arr) {
  return _arrayWithoutHoles3(arr) || _iterableToArray3(arr) || _unsupportedIterableToArray5(arr) || _nonIterableSpread3();
}
function _nonIterableSpread3() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray5(o, minLen) {
  if (!!o) {
    if (typeof o == "string")
      return _arrayLikeToArray5(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray5(o, minLen);
  }
}
function _iterableToArray3(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles3(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray5(arr);
}
function _arrayLikeToArray5(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function mergeMaximizeOptions(defaultOptions, addendums) {
  var _addendums$updateOnFa, _addendums$updateOnCa, _addendums$useOutfitC, _addendums$forceEquip, _addendums$preventEqu, _addendums$bonusEquip, _addendums$onlySlot, _addendums$preventSlo, _addendums$forceUpdat, _addendums$modes;
  return {
    updateOnFamiliarChange: (_addendums$updateOnFa = addendums.updateOnFamiliarChange) !== null && _addendums$updateOnFa !== void 0 ? _addendums$updateOnFa : defaultOptions.updateOnFamiliarChange,
    updateOnCanEquipChanged: (_addendums$updateOnCa = addendums.updateOnCanEquipChanged) !== null && _addendums$updateOnCa !== void 0 ? _addendums$updateOnCa : defaultOptions.updateOnCanEquipChanged,
    useOutfitCaching: (_addendums$useOutfitC = addendums.useOutfitCaching) !== null && _addendums$useOutfitC !== void 0 ? _addendums$useOutfitC : defaultOptions.useOutfitCaching,
    forceEquip: [].concat(_toConsumableArray3(defaultOptions.forceEquip), _toConsumableArray3((_addendums$forceEquip = addendums.forceEquip) !== null && _addendums$forceEquip !== void 0 ? _addendums$forceEquip : [])),
    preventEquip: [].concat(_toConsumableArray3(defaultOptions.preventEquip), _toConsumableArray3((_addendums$preventEqu = addendums.preventEquip) !== null && _addendums$preventEqu !== void 0 ? _addendums$preventEqu : [])).filter(function(item5) {
      var _addendums$forceEquip2;
      return !defaultOptions.forceEquip.includes(item5) && !((_addendums$forceEquip2 = addendums.forceEquip) !== null && _addendums$forceEquip2 !== void 0 && _addendums$forceEquip2.includes(item5));
    }),
    bonusEquip: new Map([].concat(_toConsumableArray3(defaultOptions.bonusEquip), _toConsumableArray3((_addendums$bonusEquip = addendums.bonusEquip) !== null && _addendums$bonusEquip !== void 0 ? _addendums$bonusEquip : []))),
    onlySlot: (_addendums$onlySlot = addendums.onlySlot) !== null && _addendums$onlySlot !== void 0 ? _addendums$onlySlot : defaultOptions.onlySlot,
    preventSlot: [].concat(_toConsumableArray3(defaultOptions.preventSlot), _toConsumableArray3((_addendums$preventSlo = addendums.preventSlot) !== null && _addendums$preventSlo !== void 0 ? _addendums$preventSlo : [])),
    forceUpdate: (_addendums$forceUpdat = addendums.forceUpdate) !== null && _addendums$forceUpdat !== void 0 ? _addendums$forceUpdat : defaultOptions.forceUpdate,
    modes: _objectSpread2(_objectSpread2({}, defaultOptions.modes), (_addendums$modes = addendums.modes) !== null && _addendums$modes !== void 0 ? _addendums$modes : {})
  };
}
var defaultMaximizeOptions = {
  updateOnFamiliarChange: !0,
  updateOnCanEquipChanged: !0,
  useOutfitCaching: !0,
  forceEquip: [],
  preventEquip: [],
  bonusEquip: /* @__PURE__ */ new Map(),
  onlySlot: [],
  preventSlot: [],
  forceUpdate: !1,
  modes: {}
};
var modeableCommands = ["backupcamera", "umbrella", "snowsuit", "edpiece", "retrocape", "parka"], modeableItems = {
  backupcamera: $item(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral3(["backup camera"]))),
  umbrella: $item(_templateObject211 || (_templateObject211 = _taggedTemplateLiteral3(["unbreakable umbrella"]))),
  snowsuit: $item(_templateObject35 || (_templateObject35 = _taggedTemplateLiteral3(["Snow Suit"]))),
  edpiece: $item(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral3(["The Crown of Ed the Undying"]))),
  retrocape: $item(_templateObject52 || (_templateObject52 = _taggedTemplateLiteral3(["unwrapped knock-off retro superhero cape"]))),
  parka: $item(_templateObject62 || (_templateObject62 = _taggedTemplateLiteral3(["Jurassic Parka"])))
}, modeableState = {
  backupcamera: function() {
    return (0, import_kolmafia6.getProperty)("backupCameraMode");
  },
  umbrella: function() {
    return (0, import_kolmafia6.getProperty)("umbrellaState");
  },
  snowsuit: function() {
    return (0, import_kolmafia6.getProperty)("snowsuit");
  },
  edpiece: function() {
    return (0, import_kolmafia6.getProperty)("edPiece");
  },
  retrocape: function() {
    return (0, import_kolmafia6.getProperty)("retroCapeSuperhero") + " " + (0, import_kolmafia6.getProperty)("retroCapeWashingInstructions");
  },
  parka: function() {
    return (0, import_kolmafia6.getProperty)("parkaMode");
  }
};
function getCurrentModes() {
  var modes = {}, _iterator = _createForOfIteratorHelper3(modeableCommands), _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var key = _step.value;
      (0, import_kolmafia6.haveEquipped)(modeableItems[key]) && (modes[key] = modeableState[key]());
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return modes;
}
function applyModes(modes) {
  var _iterator2 = _createForOfIteratorHelper3(modeableCommands), _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
      var command = _step2.value;
      (0, import_kolmafia6.haveEquipped)(modeableItems[command]) && modes[command] !== void 0 && modeableState[command]() !== modes[command] && (0, import_kolmafia6.cliExecute)(command + " " + modes[command]);
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
}
var cachedSlots = $slots(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral3(["hat, weapon, off-hand, back, shirt, pants, acc1, acc2, acc3, familiar"]))), CacheEntry = /* @__PURE__ */ _createClass5(function CacheEntry2(equipment, rider, familiar3, canEquipItemCount2, modes) {
  _classCallCheck5(this, CacheEntry2), _defineProperty4(this, "equipment", void 0), _defineProperty4(this, "rider", void 0), _defineProperty4(this, "familiar", void 0), _defineProperty4(this, "canEquipItemCount", void 0), _defineProperty4(this, "modes", void 0), this.equipment = equipment, this.rider = rider, this.familiar = familiar3, this.canEquipItemCount = canEquipItemCount2, this.modes = modes;
}), _outfitSlots = /* @__PURE__ */ new WeakMap(), _useHistory = /* @__PURE__ */ new WeakMap(), _maxSize = /* @__PURE__ */ new WeakMap(), OutfitLRUCache = /* @__PURE__ */ function() {
  function OutfitLRUCache2(maxSize) {
    _classCallCheck5(this, OutfitLRUCache2), _classPrivateFieldInitSpec(this, _outfitSlots, {
      writable: !0,
      value: []
    }), _classPrivateFieldInitSpec(this, _useHistory, {
      writable: !0,
      value: []
    }), _classPrivateFieldInitSpec(this, _maxSize, {
      writable: !0,
      value: void 0
    }), _classPrivateFieldSet(this, _maxSize, maxSize);
  }
  return _createClass5(OutfitLRUCache2, [{
    key: "checkConsistent",
    value: function() {
      if (_classPrivateFieldGet(this, _useHistory).length !== _classPrivateFieldGet(this, _outfitSlots).length || !_toConsumableArray3(_classPrivateFieldGet(this, _useHistory)).sort().every(function(value, index) {
        return value === index;
      }))
        throw new Error("Outfit cache consistency failed.");
    }
  }, {
    key: "promote",
    value: function(index) {
      _classPrivateFieldSet(this, _useHistory, [index].concat(_toConsumableArray3(_classPrivateFieldGet(this, _useHistory).filter(function(i) {
        return i !== index;
      })))), this.checkConsistent();
    }
  }, {
    key: "get",
    value: function(key) {
      var index = _classPrivateFieldGet(this, _outfitSlots).indexOf(key);
      if (!(index < 0))
        return this.promote(index), "".concat(OutfitLRUCache2.OUTFIT_PREFIX, " ").concat(index);
    }
  }, {
    key: "insert",
    value: function(key) {
      var lastUseIndex = void 0;
      if (_classPrivateFieldGet(this, _outfitSlots).length >= _classPrivateFieldGet(this, _maxSize)) {
        if (lastUseIndex = _classPrivateFieldGet(this, _useHistory).pop(), lastUseIndex === void 0)
          throw new Error("Outfit cache consistency failed.");
        return _classPrivateFieldGet(this, _useHistory).splice(0, 0, lastUseIndex), _classPrivateFieldGet(this, _outfitSlots)[lastUseIndex] = key, this.checkConsistent(), "".concat(OutfitLRUCache2.OUTFIT_PREFIX, " ").concat(lastUseIndex);
      } else {
        var index = _classPrivateFieldGet(this, _outfitSlots).push(key) - 1;
        return _classPrivateFieldGet(this, _useHistory).splice(0, 0, index), this.checkConsistent(), "".concat(OutfitLRUCache2.OUTFIT_PREFIX, " ").concat(index);
      }
    }
  }, {
    key: "clear",
    value: function() {
      _classPrivateFieldSet(this, _outfitSlots, []), _classPrivateFieldSet(this, _useHistory, []);
    }
  }]), OutfitLRUCache2;
}();
_defineProperty4(OutfitLRUCache, "OUTFIT_PREFIX", "Script Outfit");
function saveOutfit(name) {
  (0, import_kolmafia6.cliExecute)("outfit save ".concat(name));
}
var cachedObjectives = {}, outfitCache = new OutfitLRUCache(6), cachedStats = [0, 0, 0], cachedCanEquipItemCount = 0;
function canEquipItemCount() {
  var stats = $stats(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral3(["Muscle, Mysticality, Moxie"]))).map(function(stat) {
    return Math.min((0, import_kolmafia6.myBasestat)(stat), 300);
  });
  return stats.every(function(value, index) {
    return value === cachedStats[index];
  }) || (cachedStats = stats, cachedCanEquipItemCount = import_kolmafia6.Item.all().filter(function(item5) {
    return (0, import_kolmafia6.canEquip)(item5);
  }).length), cachedCanEquipItemCount;
}
function checkCache(cacheKey, options) {
  var entry = cachedObjectives[cacheKey];
  return entry ? options.updateOnFamiliarChange && (0, import_kolmafia6.myFamiliar)() !== entry.familiar ? (logger_default.warning("Equipment found in maximize cache but familiar is different."), null) : options.updateOnCanEquipChanged && entry.canEquipItemCount !== canEquipItemCount() ? (logger_default.warning("Equipment found in maximize cache but equippable item list is out of date."), null) : entry : null;
}
function applyCached(entry, options) {
  var outfitName = options.useOutfitCaching ? outfitCache.get(entry) : void 0;
  if (outfitName) {
    (0, import_kolmafia6.isWearingOutfit)(outfitName) || (0, import_kolmafia6.outfit)(outfitName);
    var familiarEquip = entry.equipment.get($slot(_templateObject92 || (_templateObject92 = _taggedTemplateLiteral3(["familiar"]))));
    familiarEquip && (0, import_kolmafia6.equip)($slot(_templateObject102 || (_templateObject102 = _taggedTemplateLiteral3(["familiar"]))), familiarEquip);
  } else {
    var _iterator3 = _createForOfIteratorHelper3(entry.equipment), _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
        var _step3$value = _slicedToArray4(_step3.value, 2), slot = _step3$value[0], item5 = _step3$value[1];
        (0, import_kolmafia6.equippedItem)(slot) !== item5 && (0, import_kolmafia6.availableAmount)(item5) > 0 && (0, import_kolmafia6.equip)(slot, item5);
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    if (verifyCached(entry) && options.useOutfitCaching) {
      var _outfitName = outfitCache.insert(entry);
      logger_default.info("Saving equipment to outfit ".concat(_outfitName, ".")), saveOutfit(_outfitName);
    }
  }
  (0, import_kolmafia6.equippedAmount)($item(_templateObject112 || (_templateObject112 = _taggedTemplateLiteral3(["Crown of Thrones"])))) > 0 && entry.rider.get($item(_templateObject122 || (_templateObject122 = _taggedTemplateLiteral3(["Crown of Thrones"])))) && (0, import_kolmafia6.enthroneFamiliar)(entry.rider.get($item(_templateObject132 || (_templateObject132 = _taggedTemplateLiteral3(["Crown of Thrones"])))) || $familiar.none), (0, import_kolmafia6.equippedAmount)($item(_templateObject142 || (_templateObject142 = _taggedTemplateLiteral3(["Buddy Bjorn"])))) > 0 && entry.rider.get($item(_templateObject152 || (_templateObject152 = _taggedTemplateLiteral3(["Buddy Bjorn"])))) && (0, import_kolmafia6.bjornifyFamiliar)(entry.rider.get($item(_templateObject162 || (_templateObject162 = _taggedTemplateLiteral3(["Buddy Bjorn"])))) || $familiar.none), applyModes(_objectSpread2(_objectSpread2({}, entry.modes), options.modes));
}
var slotStructure = [$slots(_templateObject172 || (_templateObject172 = _taggedTemplateLiteral3(["hat"]))), $slots(_templateObject182 || (_templateObject182 = _taggedTemplateLiteral3(["back"]))), $slots(_templateObject192 || (_templateObject192 = _taggedTemplateLiteral3(["shirt"]))), $slots(_templateObject202 || (_templateObject202 = _taggedTemplateLiteral3(["weapon, off-hand"]))), $slots(_templateObject212 || (_templateObject212 = _taggedTemplateLiteral3(["pants"]))), $slots(_templateObject222 || (_templateObject222 = _taggedTemplateLiteral3(["acc1, acc2, acc3"]))), $slots(_templateObject232 || (_templateObject232 = _taggedTemplateLiteral3(["familiar"])))];
function verifyCached(entry) {
  var success = !0, _iterator4 = _createForOfIteratorHelper3(slotStructure), _step4;
  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done; ) {
      var slotGroup = _step4.value, desiredSlots = slotGroup.map(function(slot) {
        var _entry$equipment$get;
        return [slot, (_entry$equipment$get = entry.equipment.get(slot)) !== null && _entry$equipment$get !== void 0 ? _entry$equipment$get : null];
      }).filter(function(_ref2) {
        var _ref22 = _slicedToArray4(_ref2, 2), item5 = _ref22[1];
        return item5 !== null;
      }), desiredSet = desiredSlots.map(function(_ref32) {
        var _ref42 = _slicedToArray4(_ref32, 2), item5 = _ref42[1];
        return item5;
      }), equippedSet = desiredSlots.map(function(_ref5) {
        var _ref6 = _slicedToArray4(_ref5, 1), slot = _ref6[0];
        return (0, import_kolmafia6.equippedItem)(slot);
      });
      setEqual(desiredSet, equippedSet) || (logger_default.warning("Failed to apply cached ".concat(desiredSet.join(", "), " in ").concat(slotGroup.join(", "), ".")), success = !1);
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
  return (0, import_kolmafia6.equippedAmount)($item(_templateObject242 || (_templateObject242 = _taggedTemplateLiteral3(["Crown of Thrones"])))) > 0 && entry.rider.get($item(_templateObject252 || (_templateObject252 = _taggedTemplateLiteral3(["Crown of Thrones"])))) && entry.rider.get($item(_templateObject262 || (_templateObject262 = _taggedTemplateLiteral3(["Crown of Thrones"])))) !== (0, import_kolmafia6.myEnthronedFamiliar)() && (logger_default.warning("Failed to apply ".concat(entry.rider.get($item(_templateObject272 || (_templateObject272 = _taggedTemplateLiteral3(["Crown of Thrones"])))), " in ").concat($item(_templateObject282 || (_templateObject282 = _taggedTemplateLiteral3(["Crown of Thrones"]))), ".")), success = !1), (0, import_kolmafia6.equippedAmount)($item(_templateObject292 || (_templateObject292 = _taggedTemplateLiteral3(["Buddy Bjorn"])))) > 0 && entry.rider.get($item(_templateObject302 || (_templateObject302 = _taggedTemplateLiteral3(["Buddy Bjorn"])))) && entry.rider.get($item(_templateObject312 || (_templateObject312 = _taggedTemplateLiteral3(["Buddy Bjorn"])))) !== (0, import_kolmafia6.myBjornedFamiliar)() && (logger_default.warning("Failed to apply".concat(entry.rider.get($item(_templateObject322 || (_templateObject322 = _taggedTemplateLiteral3(["Buddy Bjorn"])))), " in ").concat($item(_templateObject332 || (_templateObject332 = _taggedTemplateLiteral3(["Buddy Bjorn"]))), ".")), success = !1), success;
}
function saveCached(cacheKey, options) {
  var equipment = /* @__PURE__ */ new Map(), rider = /* @__PURE__ */ new Map(), _iterator5 = _createForOfIteratorHelper3(cachedSlots), _step5;
  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done; ) {
      var _slot2 = _step5.value;
      equipment.set(_slot2, (0, import_kolmafia6.equippedItem)(_slot2));
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }
  if ((0, import_kolmafia6.equippedAmount)($item(_templateObject342 || (_templateObject342 = _taggedTemplateLiteral3(["card sleeve"])))) > 0 && equipment.set($slot(_templateObject352 || (_templateObject352 = _taggedTemplateLiteral3(["card-sleeve"]))), (0, import_kolmafia6.equippedItem)($slot(_templateObject36 || (_templateObject36 = _taggedTemplateLiteral3(["card-sleeve"]))))), (0, import_kolmafia6.equippedAmount)($item(_templateObject37 || (_templateObject37 = _taggedTemplateLiteral3(["Crown of Thrones"])))) > 0 && rider.set($item(_templateObject38 || (_templateObject38 = _taggedTemplateLiteral3(["Crown of Thrones"]))), (0, import_kolmafia6.myEnthronedFamiliar)()), (0, import_kolmafia6.equippedAmount)($item(_templateObject39 || (_templateObject39 = _taggedTemplateLiteral3(["Buddy Bjorn"])))) > 0 && rider.set($item(_templateObject40 || (_templateObject40 = _taggedTemplateLiteral3(["Buddy Bjorn"]))), (0, import_kolmafia6.myBjornedFamiliar)()), options.preventSlot && options.preventSlot.length > 0) {
    var _iterator6 = _createForOfIteratorHelper3(options.preventSlot), _step6;
    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done; ) {
        var slot = _step6.value;
        equipment.delete(slot);
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }
    options.preventSlot.includes($slot(_templateObject41 || (_templateObject41 = _taggedTemplateLiteral3(["buddy-bjorn"])))) && rider.delete($item(_templateObject42 || (_templateObject42 = _taggedTemplateLiteral3(["Buddy Bjorn"])))), options.preventSlot.includes($slot(_templateObject43 || (_templateObject43 = _taggedTemplateLiteral3(["crown-of-thrones"])))) && rider.delete($item(_templateObject44 || (_templateObject44 = _taggedTemplateLiteral3(["Crown of Thrones"]))));
  }
  if (options.onlySlot && options.onlySlot.length > 0) {
    var _iterator7 = _createForOfIteratorHelper3(import_kolmafia6.Slot.all()), _step7;
    try {
      for (_iterator7.s(); !(_step7 = _iterator7.n()).done; ) {
        var _slot = _step7.value;
        options.onlySlot.includes(_slot) || equipment.delete(_slot);
      }
    } catch (err) {
      _iterator7.e(err);
    } finally {
      _iterator7.f();
    }
    options.onlySlot.includes($slot(_templateObject45 || (_templateObject45 = _taggedTemplateLiteral3(["buddy-bjorn"])))) || rider.delete($item(_templateObject46 || (_templateObject46 = _taggedTemplateLiteral3(["Buddy Bjorn"])))), options.onlySlot.includes($slot(_templateObject47 || (_templateObject47 = _taggedTemplateLiteral3(["crown-of-thrones"])))) || rider.delete($item(_templateObject48 || (_templateObject48 = _taggedTemplateLiteral3(["Crown of Thrones"]))));
  }
  var entry = new CacheEntry(equipment, rider, (0, import_kolmafia6.myFamiliar)(), canEquipItemCount(), _objectSpread2(_objectSpread2({}, getCurrentModes()), options.modes));
  if (cachedObjectives[cacheKey] = entry, options.useOutfitCaching) {
    var outfitName = outfitCache.insert(entry);
    logger_default.info("Saving equipment to outfit ".concat(outfitName, ".")), saveOutfit(outfitName);
  }
}
function maximizeCached(objectives) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, fullOptions = mergeMaximizeOptions(defaultMaximizeOptions, options), forceEquip = fullOptions.forceEquip, preventEquip = fullOptions.preventEquip, bonusEquip = fullOptions.bonusEquip, onlySlot = fullOptions.onlySlot, preventSlot = fullOptions.preventSlot, forceUpdate = fullOptions.forceUpdate, objective = _toConsumableArray3(new Set([].concat(_toConsumableArray3(objectives.sort()), _toConsumableArray3(forceEquip.map(function(item5) {
    return "equip ".concat(item5);
  }).sort()), _toConsumableArray3(preventEquip.map(function(item5) {
    return "-equip ".concat(item5);
  }).sort()), _toConsumableArray3(onlySlot.map(function(slot) {
    return "".concat(slot);
  }).sort()), _toConsumableArray3(preventSlot.map(function(slot) {
    return "-".concat(slot);
  }).sort()), _toConsumableArray3(Array.from(bonusEquip.entries()).filter(function(_ref7) {
    var _ref8 = _slicedToArray4(_ref7, 2), bonus = _ref8[1];
    return bonus !== 0;
  }).map(function(_ref9) {
    var _ref102 = _slicedToArray4(_ref9, 2), item5 = _ref102[0], bonus = _ref102[1];
    return "".concat(Math.round(bonus * 100) / 100, " bonus ").concat(item5);
  }).sort())))).join(", "), untouchedSlots = cachedSlots.filter(function(slot) {
    return preventSlot.includes(slot) || onlySlot.length > 0 && !onlySlot.includes(slot);
  }), cacheKey = [objective].concat(_toConsumableArray3(untouchedSlots.map(function(slot) {
    return "".concat(slot, ":").concat((0, import_kolmafia6.equippedItem)(slot));
  }).sort())).join("; "), cacheEntry = checkCache(cacheKey, fullOptions);
  if (cacheEntry && !forceUpdate) {
    if (logger_default.info("Equipment found in maximize cache, equipping..."), applyCached(cacheEntry, fullOptions), verifyCached(cacheEntry))
      return logger_default.info("Equipped cached ".concat(cacheKey)), !0;
    logger_default.warning("Maximize cache application failed, maximizing...");
  }
  var result = (0, import_kolmafia6.maximize)(objective, !1);
  return saveCached(cacheKey, fullOptions), result;
}
var _maximizeParameters = /* @__PURE__ */ new WeakMap(), _maximizeOptions = /* @__PURE__ */ new WeakMap(), Requirement = /* @__PURE__ */ function() {
  function Requirement2(maximizeParameters, maximizeOptions) {
    _classCallCheck5(this, Requirement2), _classPrivateFieldInitSpec(this, _maximizeParameters, {
      writable: !0,
      value: void 0
    }), _classPrivateFieldInitSpec(this, _maximizeOptions, {
      writable: !0,
      value: void 0
    }), _classPrivateFieldSet(this, _maximizeParameters, maximizeParameters), _classPrivateFieldSet(this, _maximizeOptions, maximizeOptions);
  }
  return _createClass5(Requirement2, [{
    key: "maximizeParameters",
    get: function() {
      return _classPrivateFieldGet(this, _maximizeParameters);
    }
  }, {
    key: "maximizeOptions",
    get: function() {
      return _classPrivateFieldGet(this, _maximizeOptions);
    }
  }, {
    key: "merge",
    value: function(other) {
      var _optionsA$forceEquip, _other$maximizeOption, _optionsA$preventEqui, _other$maximizeOption3, _optionsA$bonusEquip$, _optionsA$bonusEquip, _optionsB$bonusEquip$, _optionsB$bonusEquip, _optionsA$onlySlot, _optionsB$onlySlot, _optionsA$preventSlot, _optionsB$preventSlot, optionsA = this.maximizeOptions, optionsB = other.maximizeOptions;
      return new Requirement2([].concat(_toConsumableArray3(this.maximizeParameters), _toConsumableArray3(other.maximizeParameters)), {
        updateOnFamiliarChange: optionsA.updateOnFamiliarChange || other.maximizeOptions.updateOnFamiliarChange,
        updateOnCanEquipChanged: optionsA.updateOnCanEquipChanged || other.maximizeOptions.updateOnCanEquipChanged,
        forceEquip: [].concat(_toConsumableArray3((_optionsA$forceEquip = optionsA.forceEquip) !== null && _optionsA$forceEquip !== void 0 ? _optionsA$forceEquip : []), _toConsumableArray3((_other$maximizeOption = other.maximizeOptions.forceEquip) !== null && _other$maximizeOption !== void 0 ? _other$maximizeOption : [])).filter(function(x) {
          var _other$maximizeOption2;
          return !((_other$maximizeOption2 = other.maximizeOptions.preventEquip) !== null && _other$maximizeOption2 !== void 0 && _other$maximizeOption2.includes(x));
        }),
        preventEquip: [].concat(_toConsumableArray3((_optionsA$preventEqui = optionsA.preventEquip) !== null && _optionsA$preventEqui !== void 0 ? _optionsA$preventEqui : []), _toConsumableArray3((_other$maximizeOption3 = other.maximizeOptions.preventEquip) !== null && _other$maximizeOption3 !== void 0 ? _other$maximizeOption3 : [])).filter(function(x) {
          var _other$maximizeOption4;
          return !((_other$maximizeOption4 = other.maximizeOptions.forceEquip) !== null && _other$maximizeOption4 !== void 0 && _other$maximizeOption4.includes(x));
        }),
        bonusEquip: new Map([].concat(_toConsumableArray3((_optionsA$bonusEquip$ = (_optionsA$bonusEquip = optionsA.bonusEquip) === null || _optionsA$bonusEquip === void 0 ? void 0 : _optionsA$bonusEquip.entries()) !== null && _optionsA$bonusEquip$ !== void 0 ? _optionsA$bonusEquip$ : []), _toConsumableArray3((_optionsB$bonusEquip$ = (_optionsB$bonusEquip = optionsB.bonusEquip) === null || _optionsB$bonusEquip === void 0 ? void 0 : _optionsB$bonusEquip.entries()) !== null && _optionsB$bonusEquip$ !== void 0 ? _optionsB$bonusEquip$ : []))),
        onlySlot: [].concat(_toConsumableArray3((_optionsA$onlySlot = optionsA.onlySlot) !== null && _optionsA$onlySlot !== void 0 ? _optionsA$onlySlot : []), _toConsumableArray3((_optionsB$onlySlot = optionsB.onlySlot) !== null && _optionsB$onlySlot !== void 0 ? _optionsB$onlySlot : [])),
        preventSlot: [].concat(_toConsumableArray3((_optionsA$preventSlot = optionsA.preventSlot) !== null && _optionsA$preventSlot !== void 0 ? _optionsA$preventSlot : []), _toConsumableArray3((_optionsB$preventSlot = optionsB.preventSlot) !== null && _optionsB$preventSlot !== void 0 ? _optionsB$preventSlot : [])),
        forceUpdate: optionsA.forceUpdate || optionsB.forceUpdate
      });
    }
  }, {
    key: "maximize",
    value: function() {
      return maximizeCached(this.maximizeParameters, this.maximizeOptions);
    }
  }], [{
    key: "merge",
    value: function(allRequirements) {
      return allRequirements.reduce(function(x, y) {
        return x.merge(y);
      }, new Requirement2([], {}));
    }
  }, {
    key: "maximize",
    value: function() {
      for (var _len = arguments.length, requirements = new Array(_len), _key = 0; _key < _len; _key++)
        requirements[_key] = arguments[_key];
      Requirement2.merge(requirements).maximize();
    }
  }]), Requirement2;
}();

// node_modules/core-js/modules/es.object.values.js
init_kolmafia_polyfill();
var $3 = require_export(), $values = require_object_to_array().values;
$3({
  target: "Object",
  stat: !0
}, {
  values: function(O) {
    return $values(O);
  }
});

// node_modules/libram/dist/resources/index.js
init_kolmafia_polyfill();

// node_modules/libram/dist/resources/2010/CrownOfThrones.js
var CrownOfThrones_exports = {};
__export(CrownOfThrones_exports, {
  createRiderMode: function() {
    return createRiderMode;
  },
  pickRider: function() {
    return pickRider;
  },
  ridingFamiliars: function() {
    return ridingFamiliars;
  },
  valueRider: function() {
    return valueRider;
  }
});
init_kolmafia_polyfill();
var import_kolmafia7 = require("kolmafia");
var _templateObject49, _templateObject213, _modifier, _templateObject310, _templateObject410, _modifier2, _templateObject53, _templateObject63, _templateObject72, _templateObject82, _templateObject93, _templateObject103, _templateObject113, _templateObject123, _modifier7, _templateObject133, _templateObject143, _modifier8, _templateObject153, _templateObject163, _modifier9, _templateObject173, _templateObject183, _templateObject193, _templateObject203, _templateObject214, _templateObject223, _templateObject233, _templateObject243, _templateObject253, _templateObject263, _templateObject273, _templateObject283, _modifier15, _templateObject293, _templateObject303, _templateObject313, _templateObject323, _templateObject333, _templateObject343, _templateObject353, _templateObject362, _templateObject372, _templateObject382, _templateObject392, _templateObject402, _templateObject412, _templateObject422, _templateObject432, _templateObject442, _templateObject452, _templateObject462, _templateObject472, _templateObject482, _templateObject492, _templateObject50, _modifier26, _templateObject51, _templateObject522, _modifier27, _templateObject532, _templateObject54, _modifier28, _templateObject55, _templateObject56, _templateObject57, _templateObject58, _templateObject59, _templateObject60, _modifier31, _templateObject61, _templateObject622, _modifier32, _templateObject632, _templateObject64, _templateObject65, _templateObject66, _modifier34, _templateObject67, _templateObject68, _modifier35, _templateObject69, _templateObject70, _modifier36, _templateObject71, _templateObject722, _templateObject73, _templateObject74, _templateObject75, _templateObject76, _templateObject77, _templateObject78, _templateObject79, _templateObject80, _templateObject81, _templateObject822, _templateObject83, _templateObject84, _templateObject85, _templateObject86, _templateObject87, _templateObject88, _templateObject89, _templateObject90, _templateObject91, _templateObject922, _templateObject932, _templateObject94, _templateObject95, _templateObject96, _templateObject97, _templateObject98, _templateObject99, _templateObject100, _templateObject101, _templateObject1022, _templateObject1032, _templateObject104;
function _toConsumableArray4(arr) {
  return _arrayWithoutHoles4(arr) || _iterableToArray4(arr) || _unsupportedIterableToArray6(arr) || _nonIterableSpread4();
}
function _nonIterableSpread4() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray6(o, minLen) {
  if (!!o) {
    if (typeof o == "string")
      return _arrayLikeToArray6(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray6(o, minLen);
  }
}
function _iterableToArray4(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles4(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray6(arr);
}
function _arrayLikeToArray6(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _defineProperty5(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
function _taggedTemplateLiteral4(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var ridingFamiliars = [{
  familiar: $familiar(_templateObject49 || (_templateObject49 = _taggedTemplateLiteral4(["Puck Man"]))),
  meatVal: function() {
    return getSaleValue($item(_templateObject213 || (_templateObject213 = _taggedTemplateLiteral4(["yellow pixel"]))));
  },
  probability: 0.25,
  modifier: (_modifier = {}, _defineProperty5(_modifier, "Muscle", 10), _defineProperty5(_modifier, "Mysticality", 10), _defineProperty5(_modifier, "Moxie", 10), _modifier),
  dropPredicate: function() {
    return get("_yellowPixelDropsCrown") < 25;
  }
}, {
  familiar: $familiar(_templateObject310 || (_templateObject310 = _taggedTemplateLiteral4(["Ms. Puck Man"]))),
  meatVal: function() {
    return getSaleValue($item(_templateObject410 || (_templateObject410 = _taggedTemplateLiteral4(["yellow pixel"]))));
  },
  probability: 0.25,
  modifier: (_modifier2 = {}, _defineProperty5(_modifier2, "Muscle", 10), _defineProperty5(_modifier2, "Mysticality", 10), _defineProperty5(_modifier2, "Moxie", 10), _modifier2),
  dropPredicate: function() {
    return get("_yellowPixelDropsCrown") < 25;
  }
}, {
  familiar: $familiar(_templateObject53 || (_templateObject53 = _taggedTemplateLiteral4(["Grimstone Golem"]))),
  meatVal: function() {
    return getSaleValue($item(_templateObject63 || (_templateObject63 = _taggedTemplateLiteral4(["grimstone mask"]))));
  },
  probability: 0.5,
  modifier: _defineProperty5({}, "Combat Rate", -5),
  dropPredicate: function() {
    return get("_grimstoneMaskDropsCrown") < 1;
  }
}, {
  familiar: $familiar(_templateObject72 || (_templateObject72 = _taggedTemplateLiteral4(["Knob Goblin Organ Grinder"]))),
  meatVal: function() {
    return 30;
  },
  probability: 1,
  modifier: _defineProperty5({}, "Meat Drop", 25)
}, {
  familiar: $familiar(_templateObject82 || (_templateObject82 = _taggedTemplateLiteral4(["Happy Medium"]))),
  meatVal: function() {
    return 30;
  },
  probability: 1,
  modifier: _defineProperty5({}, "Meat Drop", 25)
}, {
  familiar: $familiar(_templateObject93 || (_templateObject93 = _taggedTemplateLiteral4(["Garbage Fire"]))),
  meatVal: function() {
    return getSaleValue($item(_templateObject103 || (_templateObject103 = _taggedTemplateLiteral4(["burning newspaper"]))));
  },
  probability: 0.5,
  modifier: _defineProperty5({}, "Hot Spell Damage", 25),
  dropPredicate: function() {
    return get("_garbageFireDropsCrown") < 3;
  }
}, {
  familiar: $familiar(_templateObject113 || (_templateObject113 = _taggedTemplateLiteral4(["Machine Elf"]))),
  meatVal: function() {
    return getSaleValue.apply(void 0, _toConsumableArray4($items(_templateObject123 || (_templateObject123 = _taggedTemplateLiteral4(["abstraction: sensation, abstraction: thought, abstraction: action, abstraction: category, abstraction: perception, abstraction: purpose"])))));
  },
  probability: 0.2,
  modifier: (_modifier7 = {}, _defineProperty5(_modifier7, "Muscle", 7), _defineProperty5(_modifier7, "Mysticality", 7), _defineProperty5(_modifier7, "Moxie", 7), _modifier7),
  dropPredicate: function() {
    return get("_abstractionDropsCrown") < 25;
  }
}, {
  familiar: $familiar(_templateObject133 || (_templateObject133 = _taggedTemplateLiteral4(["Trick-or-Treating Tot"]))),
  meatVal: function() {
    return getSaleValue($item(_templateObject143 || (_templateObject143 = _taggedTemplateLiteral4(["hoarded candy wad"]))));
  },
  probability: 0.5,
  modifier: (_modifier8 = {}, _defineProperty5(_modifier8, "Muscle", 10), _defineProperty5(_modifier8, "Mysticality", 10), _defineProperty5(_modifier8, "Moxie", 10), _modifier8),
  dropPredicate: function() {
    return get("_hoardedCandyDropsCrown") < 3;
  }
}, {
  familiar: $familiar(_templateObject153 || (_templateObject153 = _taggedTemplateLiteral4(["Warbear Drone"]))),
  meatVal: function() {
    return getSaleValue($item(_templateObject163 || (_templateObject163 = _taggedTemplateLiteral4(["warbear whosit"]))));
  },
  probability: 1 / 4.5,
  modifier: (_modifier9 = {}, _defineProperty5(_modifier9, "Maximum HP", 15), _defineProperty5(_modifier9, "Maximum MP", 15), _modifier9)
}, {
  familiar: $familiar(_templateObject173 || (_templateObject173 = _taggedTemplateLiteral4(["Li'l Xenomorph"]))),
  meatVal: function() {
    return getSaleValue($item(_templateObject183 || (_templateObject183 = _taggedTemplateLiteral4(["lunar isotope"]))));
  },
  probability: 0.05,
  modifier: _defineProperty5({}, "Item Drop", 15)
}, {
  familiar: $familiar(_templateObject193 || (_templateObject193 = _taggedTemplateLiteral4(["Pottery Barn Owl"]))),
  meatVal: function() {
    return getSaleValue($item(_templateObject203 || (_templateObject203 = _taggedTemplateLiteral4(["volcanic ash"]))));
  },
  probability: 0.1,
  modifier: _defineProperty5({}, "Hot Damage", 10)
}, {
  familiar: $familiar(_templateObject214 || (_templateObject214 = _taggedTemplateLiteral4(["Grim Brother"]))),
  meatVal: function() {
    return getSaleValue($item(_templateObject223 || (_templateObject223 = _taggedTemplateLiteral4(["grim fairy tale"]))));
  },
  probability: 1,
  modifier: _defineProperty5({}, "Combat Rate", 5),
  dropPredicate: function() {
    return get("_grimFairyTaleDropsCrown") < 2;
  }
}, {
  familiar: $familiar(_templateObject233 || (_templateObject233 = _taggedTemplateLiteral4(["Optimistic Candle"]))),
  meatVal: function() {
    return getSaleValue($item(_templateObject243 || (_templateObject243 = _taggedTemplateLiteral4(["glob of melted wax"]))));
  },
  probability: 1,
  dropPredicate: function() {
    return get("_optimisticCandleDropsCrown") < 3;
  },
  modifier: _defineProperty5({}, "Item Drop", 15)
}, {
  familiar: $familiar(_templateObject253 || (_templateObject253 = _taggedTemplateLiteral4(["Adventurous Spelunker"]))),
  meatVal: function() {
    return getSaleValue.apply(void 0, _toConsumableArray4($items(_templateObject263 || (_templateObject263 = _taggedTemplateLiteral4(["teflon ore, velcro ore, vinyl ore, cardboard ore, styrofoam ore, bubblewrap ore"])))));
  },
  probability: 1,
  dropPredicate: function() {
    return get("_oreDropsCrown") < 6;
  },
  modifier: _defineProperty5({}, "Item Drop", 15)
}, {
  familiar: $familiar(_templateObject273 || (_templateObject273 = _taggedTemplateLiteral4(["Twitching Space Critter"]))),
  meatVal: function() {
    return getSaleValue($item(_templateObject283 || (_templateObject283 = _taggedTemplateLiteral4(["space beast fur"]))));
  },
  probability: 1,
  modifier: (_modifier15 = {}, _defineProperty5(_modifier15, "Hot Resistance", 2), _defineProperty5(_modifier15, "Cold Resistance", 2), _defineProperty5(_modifier15, "Spooky Resistance", 2), _defineProperty5(_modifier15, "Sleaze Resistance", 2), _defineProperty5(_modifier15, "Stench Resistance", 2), _modifier15),
  dropPredicate: function() {
    return get("_spaceFurDropsCrown") < 1;
  }
}, {
  familiar: $familiar(_templateObject293 || (_templateObject293 = _taggedTemplateLiteral4(["Party Mouse"]))),
  meatVal: function() {
    return 50;
  },
  probability: 0.05,
  modifier: _defineProperty5({}, "Booze Drop", 25)
}, {
  familiar: $familiar(_templateObject303 || (_templateObject303 = _taggedTemplateLiteral4(["Yule Hound"]))),
  meatVal: function() {
    return getSaleValue($item(_templateObject313 || (_templateObject313 = _taggedTemplateLiteral4(["candy cane"]))));
  },
  probability: 1,
  modifier: _defineProperty5({}, "Candy Drop", 20)
}, {
  familiar: $familiar(_templateObject323 || (_templateObject323 = _taggedTemplateLiteral4(["Gluttonous Green Ghost"]))),
  meatVal: function() {
    return getSaleValue.apply(void 0, _toConsumableArray4($items(_templateObject333 || (_templateObject333 = _taggedTemplateLiteral4(["bean burrito, enchanted bean burrito, jumping bean burrito"])))));
  },
  probability: 1,
  modifier: _defineProperty5({}, "Food Drop", 15)
}, {
  familiar: $familiar(_templateObject343 || (_templateObject343 = _taggedTemplateLiteral4(["Reassembled Blackbird"]))),
  meatVal: function() {
    return getSaleValue($item(_templateObject353 || (_templateObject353 = _taggedTemplateLiteral4(["blackberry"]))));
  },
  probability: 1,
  modifier: _defineProperty5({}, "Item Drop", 10)
}, {
  familiar: $familiar(_templateObject362 || (_templateObject362 = _taggedTemplateLiteral4(["Reconstituted Crow"]))),
  meatVal: function() {
    return getSaleValue($item(_templateObject372 || (_templateObject372 = _taggedTemplateLiteral4(["blackberry"]))));
  },
  probability: 1,
  modifier: _defineProperty5({}, "Item Drop", 10)
}, {
  familiar: $familiar(_templateObject382 || (_templateObject382 = _taggedTemplateLiteral4(["Hunchbacked Minion"]))),
  meatVal: function() {
    return 0.02 * getSaleValue($item(_templateObject392 || (_templateObject392 = _taggedTemplateLiteral4(["disembodied brain"])))) + 0.98 * getSaleValue($item(_templateObject402 || (_templateObject402 = _taggedTemplateLiteral4(["skeleton bone"]))));
  },
  probability: 1,
  modifier: _defineProperty5({}, "Muscle Experience", 2)
}, {
  familiar: $familiar(_templateObject412 || (_templateObject412 = _taggedTemplateLiteral4(["Reanimated Reanimator"]))),
  meatVal: function() {
    return getSaleValue.apply(void 0, _toConsumableArray4($items(_templateObject422 || (_templateObject422 = _taggedTemplateLiteral4(["hot wing, broken skull"])))));
  },
  probability: 1,
  modifier: _defineProperty5({}, "Mysticality Experience", 2)
}, {
  familiar: $familiar(_templateObject432 || (_templateObject432 = _taggedTemplateLiteral4(["Attention-Deficit Demon"]))),
  meatVal: function() {
    return getSaleValue.apply(void 0, _toConsumableArray4($items(_templateObject442 || (_templateObject442 = _taggedTemplateLiteral4(["chorizo brownies, white chocolate and tomato pizza, carob chunk noodles"])))));
  },
  probability: 1,
  modifier: _defineProperty5({}, "Meat Drop", 20)
}, {
  familiar: $familiar(_templateObject452 || (_templateObject452 = _taggedTemplateLiteral4(["Piano Cat"]))),
  meatVal: function() {
    return getSaleValue.apply(void 0, _toConsumableArray4($items(_templateObject462 || (_templateObject462 = _taggedTemplateLiteral4(["beertini, papaya slung, salty slug, tomato daiquiri"])))));
  },
  probability: 1,
  modifier: _defineProperty5({}, "Meat Drop", 20)
}, {
  familiar: $familiar(_templateObject472 || (_templateObject472 = _taggedTemplateLiteral4(["Golden Monkey"]))),
  meatVal: function() {
    return getSaleValue($item(_templateObject482 || (_templateObject482 = _taggedTemplateLiteral4(["gold nuggets"]))));
  },
  probability: 0.5,
  modifier: _defineProperty5({}, "Meat Drop", 25)
}, {
  familiar: $familiar(_templateObject492 || (_templateObject492 = _taggedTemplateLiteral4(["Robot Reindeer"]))),
  meatVal: function() {
    return getSaleValue.apply(void 0, _toConsumableArray4($items(_templateObject50 || (_templateObject50 = _taggedTemplateLiteral4(["candy cane, eggnog, fruitcake, gingerbread bugbear"])))));
  },
  probability: 0.3,
  modifier: (_modifier26 = {}, _defineProperty5(_modifier26, "Muscle", 10), _defineProperty5(_modifier26, "Mysticality", 10), _defineProperty5(_modifier26, "Moxie", 10), _modifier26)
}, {
  familiar: $familiar(_templateObject51 || (_templateObject51 = _taggedTemplateLiteral4(["Stocking Mimic"]))),
  meatVal: function() {
    return getSaleValue.apply(void 0, _toConsumableArray4($items(_templateObject522 || (_templateObject522 = _taggedTemplateLiteral4(["Angry Farmer candy, Cold Hots candy, Rock Pops, Tasty Fun Good rice candy, Wint-O-Fresh mint"])))));
  },
  probability: 0.3,
  modifier: (_modifier27 = {}, _defineProperty5(_modifier27, "Muscle", 10), _defineProperty5(_modifier27, "Mysticality", 10), _defineProperty5(_modifier27, "Moxie", 10), _modifier27)
}, {
  familiar: $familiar(_templateObject532 || (_templateObject532 = _taggedTemplateLiteral4(["BRICKO chick"]))),
  meatVal: function() {
    return getSaleValue($item(_templateObject54 || (_templateObject54 = _taggedTemplateLiteral4(["BRICKO brick"]))));
  },
  probability: 1,
  modifier: (_modifier28 = {}, _defineProperty5(_modifier28, "Muscle Percent", 10), _defineProperty5(_modifier28, "Mysticality Percent", 10), _defineProperty5(_modifier28, "Moxie Percent", 10), _modifier28)
}, {
  familiar: $familiar(_templateObject55 || (_templateObject55 = _taggedTemplateLiteral4(["Cotton Candy Carnie"]))),
  meatVal: function() {
    return getSaleValue($item(_templateObject56 || (_templateObject56 = _taggedTemplateLiteral4(["cotton candy pinch"]))));
  },
  probability: 1,
  modifier: _defineProperty5({}, "Initiative", 20)
}, {
  familiar: $familiar(_templateObject57 || (_templateObject57 = _taggedTemplateLiteral4(["Untamed Turtle"]))),
  meatVal: function() {
    return getSaleValue.apply(void 0, _toConsumableArray4($items(_templateObject58 || (_templateObject58 = _taggedTemplateLiteral4(["snailmail bits, turtlemail bits, turtle wax"])))));
  },
  probability: 0.35,
  modifier: _defineProperty5({}, "Initiative", 20)
}, {
  familiar: $familiar(_templateObject59 || (_templateObject59 = _taggedTemplateLiteral4(["Astral Badger"]))),
  meatVal: function() {
    return 2 * getSaleValue.apply(void 0, _toConsumableArray4($items(_templateObject60 || (_templateObject60 = _taggedTemplateLiteral4(["spooky mushroom, Knob mushroom, Knoll mushroom"])))));
  },
  probability: 1,
  modifier: (_modifier31 = {}, _defineProperty5(_modifier31, "Maximum HP", 10), _defineProperty5(_modifier31, "Maximum MP", 10), _modifier31)
}, {
  familiar: $familiar(_templateObject61 || (_templateObject61 = _taggedTemplateLiteral4(["Green Pixie"]))),
  meatVal: function() {
    return getSaleValue($item(_templateObject622 || (_templateObject622 = _taggedTemplateLiteral4(["bottle of tequila"]))));
  },
  probability: 0.2,
  modifier: (_modifier32 = {}, _defineProperty5(_modifier32, "Maximum HP", 10), _defineProperty5(_modifier32, "Maximum MP", 10), _modifier32)
}, {
  familiar: $familiar(_templateObject632 || (_templateObject632 = _taggedTemplateLiteral4(["Angry Goat"]))),
  meatVal: function() {
    return getSaleValue($item(_templateObject64 || (_templateObject64 = _taggedTemplateLiteral4(["goat cheese pizza"]))));
  },
  probability: 1,
  modifier: _defineProperty5({}, "Muscle Percent", 15)
}, {
  familiar: $familiar(_templateObject65 || (_templateObject65 = _taggedTemplateLiteral4(["Adorable Seal Larva"]))),
  meatVal: function() {
    return getSaleValue.apply(void 0, _toConsumableArray4($items(_templateObject66 || (_templateObject66 = _taggedTemplateLiteral4(["stench nuggets, spooky nuggets, hot nuggets, cold nuggets, sleaze nuggets"])))));
  },
  probability: 0.35,
  modifier: (_modifier34 = {}, _defineProperty5(_modifier34, "HP Regen Min", 2), _defineProperty5(_modifier34, "MP Regen Min", 2), _defineProperty5(_modifier34, "HP Regen Max", 8), _defineProperty5(_modifier34, "MP Regen Max", 8), _modifier34)
}, {
  familiar: $familiar(_templateObject67 || (_templateObject67 = _taggedTemplateLiteral4(["Ancient Yuletide Troll"]))),
  meatVal: function() {
    return getSaleValue.apply(void 0, _toConsumableArray4($items(_templateObject68 || (_templateObject68 = _taggedTemplateLiteral4(["candy cane, eggnog, fruitcake, gingerbread bugbear"])))));
  },
  probability: 0.3,
  modifier: (_modifier35 = {}, _defineProperty5(_modifier35, "HP Regen Min", 2), _defineProperty5(_modifier35, "MP Regen Min", 2), _defineProperty5(_modifier35, "HP Regen Max", 8), _defineProperty5(_modifier35, "MP Regen Max", 8), _modifier35)
}, {
  familiar: $familiar(_templateObject69 || (_templateObject69 = _taggedTemplateLiteral4(["Sweet Nutcracker"]))),
  meatVal: function() {
    return getSaleValue.apply(void 0, _toConsumableArray4($items(_templateObject70 || (_templateObject70 = _taggedTemplateLiteral4(["candy cane, eggnog, fruitcake, gingerbread bugbear"])))));
  },
  probability: 0.3,
  modifier: (_modifier36 = {}, _defineProperty5(_modifier36, "HP Regen Min", 2), _defineProperty5(_modifier36, "MP Regen Min", 2), _defineProperty5(_modifier36, "HP Regen Max", 8), _defineProperty5(_modifier36, "MP Regen Max", 8), _modifier36)
}, {
  familiar: $familiar(_templateObject71 || (_templateObject71 = _taggedTemplateLiteral4(["Casagnova Gnome"]))),
  meatVal: function() {
    return 0;
  },
  probability: 0,
  modifier: _defineProperty5({}, "Meat Drop", 20)
}, {
  familiar: $familiar(_templateObject722 || (_templateObject722 = _taggedTemplateLiteral4(["Coffee Pixie"]))),
  meatVal: function() {
    return 0;
  },
  probability: 0,
  modifier: _defineProperty5({}, "Meat Drop", 20)
}, {
  familiar: $familiar(_templateObject73 || (_templateObject73 = _taggedTemplateLiteral4(["Dancing Frog"]))),
  meatVal: function() {
    return 0;
  },
  probability: 0,
  modifier: _defineProperty5({}, "Meat Drop", 20)
}, {
  familiar: $familiar(_templateObject74 || (_templateObject74 = _taggedTemplateLiteral4(["Grouper Groupie"]))),
  meatVal: function() {
    return 0;
  },
  probability: 0,
  modifier: _defineProperty5({}, "Meat Drop", 20)
}, {
  familiar: $familiar(_templateObject75 || (_templateObject75 = _taggedTemplateLiteral4(["Hand Turkey"]))),
  meatVal: function() {
    return 30;
  },
  probability: 1,
  modifier: _defineProperty5({}, "Meat Drop", 20)
}, {
  familiar: $familiar(_templateObject76 || (_templateObject76 = _taggedTemplateLiteral4(["Hippo Ballerina"]))),
  meatVal: function() {
    return 0;
  },
  probability: 0,
  modifier: _defineProperty5({}, "Meat Drop", 20)
}, {
  familiar: $familiar(_templateObject77 || (_templateObject77 = _taggedTemplateLiteral4(["Jitterbug"]))),
  meatVal: function() {
    return 0;
  },
  probability: 0,
  modifier: _defineProperty5({}, "Meat Drop", 20)
}, {
  familiar: $familiar(_templateObject78 || (_templateObject78 = _taggedTemplateLiteral4(["Leprechaun"]))),
  meatVal: function() {
    return 30;
  },
  probability: 1,
  modifier: _defineProperty5({}, "Meat Drop", 20)
}, {
  familiar: $familiar(_templateObject79 || (_templateObject79 = _taggedTemplateLiteral4(["Obtuse Angel"]))),
  meatVal: function() {
    return 0;
  },
  probability: 0,
  modifier: _defineProperty5({}, "Meat Drop", 20)
}, {
  familiar: $familiar(_templateObject80 || (_templateObject80 = _taggedTemplateLiteral4(["Psychedelic Bear"]))),
  meatVal: function() {
    return 0;
  },
  probability: 0,
  modifier: _defineProperty5({}, "Meat Drop", 20)
}, {
  familiar: $familiar(_templateObject81 || (_templateObject81 = _taggedTemplateLiteral4(["Robortender"]))),
  meatVal: function() {
    return 0;
  },
  probability: 0,
  modifier: _defineProperty5({}, "Meat Drop", 20)
}, {
  familiar: $familiar(_templateObject822 || (_templateObject822 = _taggedTemplateLiteral4(["Ghost of Crimbo Commerce"]))),
  meatVal: function() {
    return 30;
  },
  probability: 1,
  modifier: _defineProperty5({}, "Meat Drop", 25)
}, {
  familiar: $familiar(_templateObject83 || (_templateObject83 = _taggedTemplateLiteral4(["Hobo Monkey"]))),
  meatVal: function() {
    return 0;
  },
  probability: 0,
  modifier: _defineProperty5({}, "Meat Drop", 25)
}, {
  familiar: $familiar(_templateObject84 || (_templateObject84 = _taggedTemplateLiteral4(["Rockin' Robin"]))),
  meatVal: function() {
    return 60;
  },
  probability: 1,
  modifier: _defineProperty5({}, "Item Drop", 15)
}, {
  familiar: $familiar(_templateObject85 || (_templateObject85 = _taggedTemplateLiteral4(["Feral Kobold"]))),
  meatVal: function() {
    return 30;
  },
  probability: 1,
  modifier: _defineProperty5({}, "Item Drop", 15)
}, {
  familiar: $familiar(_templateObject86 || (_templateObject86 = _taggedTemplateLiteral4(["Oily Woim"]))),
  meatVal: function() {
    return 30;
  },
  probability: 1,
  modifier: _defineProperty5({}, "Item Drop", 10)
}, {
  familiar: $familiar(_templateObject87 || (_templateObject87 = _taggedTemplateLiteral4(["Cat Burglar"]))),
  meatVal: function() {
    return 0;
  },
  probability: 0,
  modifier: _defineProperty5({}, "Item Drop", 10)
}, {
  familiar: $familiar(_templateObject88 || (_templateObject88 = _taggedTemplateLiteral4(["Misshapen Animal Skeleton"]))),
  meatVal: function() {
    return 30;
  },
  probability: 1,
  modifier: _defineProperty5({}, "Familiar Weight", 5)
}, {
  familiar: $familiar(_templateObject89 || (_templateObject89 = _taggedTemplateLiteral4(["Gelatinous Cubeling"]))),
  meatVal: function() {
    return 0;
  },
  probability: 0,
  modifier: _defineProperty5({}, "Familiar Weight", 5)
}, {
  familiar: $familiar(_templateObject90 || (_templateObject90 = _taggedTemplateLiteral4(["Frozen Gravy Fairy"]))),
  meatVal: function() {
    return Math.max(0.2 * getSaleValue($item(_templateObject91 || (_templateObject91 = _taggedTemplateLiteral4(["cold wad"])))), getSaleValue($item(_templateObject922 || (_templateObject922 = _taggedTemplateLiteral4(["cold nuggets"])))));
  },
  probability: 1,
  modifier: _defineProperty5({}, "Cold Damage", 20)
}, {
  familiar: $familiar(_templateObject932 || (_templateObject932 = _taggedTemplateLiteral4(["Stinky Gravy Fairy"]))),
  meatVal: function() {
    return Math.max(0.2 * getSaleValue($item(_templateObject94 || (_templateObject94 = _taggedTemplateLiteral4(["stench wad"])))), getSaleValue($item(_templateObject95 || (_templateObject95 = _taggedTemplateLiteral4(["stench nuggets"])))));
  },
  probability: 1,
  modifier: _defineProperty5({}, "Stench Damage", 20)
}, {
  familiar: $familiar(_templateObject96 || (_templateObject96 = _taggedTemplateLiteral4(["Sleazy Gravy Fairy"]))),
  meatVal: function() {
    return Math.max(0.2 * getSaleValue($item(_templateObject97 || (_templateObject97 = _taggedTemplateLiteral4(["sleaze wad"])))), getSaleValue($item(_templateObject98 || (_templateObject98 = _taggedTemplateLiteral4(["sleaze nuggets"])))));
  },
  probability: 1,
  modifier: _defineProperty5({}, "Sleaze Damage", 20)
}, {
  familiar: $familiar(_templateObject99 || (_templateObject99 = _taggedTemplateLiteral4(["Spooky Gravy Fairy"]))),
  meatVal: function() {
    return Math.max(0.2 * getSaleValue($item(_templateObject100 || (_templateObject100 = _taggedTemplateLiteral4(["spooky wad"])))), getSaleValue($item(_templateObject101 || (_templateObject101 = _taggedTemplateLiteral4(["spooky nuggets"])))));
  },
  probability: 1,
  modifier: _defineProperty5({}, "Spooky Damage", 20)
}, {
  familiar: $familiar(_templateObject1022 || (_templateObject1022 = _taggedTemplateLiteral4(["Flaming Gravy Fairy"]))),
  meatVal: function() {
    return Math.max(0.2 * getSaleValue($item(_templateObject1032 || (_templateObject1032 = _taggedTemplateLiteral4(["hot wad"])))), getSaleValue($item(_templateObject104 || (_templateObject104 = _taggedTemplateLiteral4(["hot nuggets"])))));
  },
  probability: 1,
  modifier: _defineProperty5({}, "Hot Damage", 20)
}];
function valueRider(rider, modifierValueFunction) {
  var ignoreLimitedDrops = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, dropValue = !rider.dropPredicate || rider.dropPredicate() && !ignoreLimitedDrops ? rider.probability * rider.meatVal() : 0, modifierValue = modifierValueFunction(rider.modifier);
  return dropValue + modifierValue;
}
var riderModes = /* @__PURE__ */ new Map();
function createRiderMode(name, modifierValueFunction) {
  var ignoreLimitedDrops = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, excludeCurrentFamiliar = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !0;
  return riderModes.set(name, {
    modifierValueFunction: modifierValueFunction,
    ignoreLimitedDrops: ignoreLimitedDrops,
    excludeCurrentFamiliar: excludeCurrentFamiliar
  });
}
var riderLists = /* @__PURE__ */ new Map();
function pickRider(mode) {
  var modeData = riderModes.get(mode);
  if (!modeData)
    return null;
  var modifierValueFunction = modeData.modifierValueFunction, ignoreLimitedDrops = modeData.ignoreLimitedDrops, excludeCurrentFamiliar = modeData.excludeCurrentFamiliar;
  riderLists.has(mode) || riderLists.set(mode, ridingFamiliars.filter(function(rider) {
    return have(rider.familiar);
  }).sort(function(a, b) {
    return valueRider(b, modifierValueFunction, ignoreLimitedDrops) - valueRider(a, modifierValueFunction, ignoreLimitedDrops);
  }));
  var list = riderLists.get(mode);
  if (list) {
    var riderToReturn = list.find(function(rider) {
      return (!rider.dropPredicate || rider.dropPredicate()) && (!excludeCurrentFamiliar || (0, import_kolmafia7.myFamiliar)() !== rider.familiar);
    });
    return riderToReturn != null ? riderToReturn : null;
  }
  return null;
}

// node_modules/libram/dist/Copier.js
init_kolmafia_polyfill();
function _defineProperties6(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass6(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties6(Constructor.prototype, protoProps), staticProps && _defineProperties6(Constructor, staticProps), Object.defineProperty(Constructor, "prototype", { writable: !1 }), Constructor;
}
function _classCallCheck6(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperty6(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
var Copier = /* @__PURE__ */ _createClass6(function Copier2(couldCopy, prepare, canCopy, copiedMonster, fightCopy) {
  _classCallCheck6(this, Copier2), _defineProperty6(this, "couldCopy", void 0), _defineProperty6(this, "prepare", void 0), _defineProperty6(this, "canCopy", void 0), _defineProperty6(this, "copiedMonster", void 0), _defineProperty6(this, "fightCopy", null), this.couldCopy = couldCopy, this.prepare = prepare, this.canCopy = canCopy, this.copiedMonster = copiedMonster, fightCopy && (this.fightCopy = fightCopy);
});

// node_modules/libram/dist/resources/2016/SourceTerminal.js
var SourceTerminal_exports = {};
__export(SourceTerminal_exports, {
  Buffs: function() {
    return Buffs;
  },
  Digitize: function() {
    return Digitize;
  },
  Items: function() {
    return Items;
  },
  RolloverBuffs: function() {
    return RolloverBuffs;
  },
  Skills: function() {
    return Skills;
  },
  canDigitize: function() {
    return canDigitize;
  },
  couldDigitize: function() {
    return couldDigitize;
  },
  duplicateUsesRemaining: function() {
    return duplicateUsesRemaining;
  },
  educate: function() {
    return educate;
  },
  enhance: function() {
    return enhance;
  },
  enhanceBuffDuration: function() {
    return enhanceBuffDuration;
  },
  enhanceUsesRemaining: function() {
    return enhanceUsesRemaining;
  },
  enquiry: function() {
    return enquiry;
  },
  enquiryBuffDuration: function() {
    return enquiryBuffDuration;
  },
  extrude: function() {
    return extrude;
  },
  getChips: function() {
    return getChips;
  },
  getDigitizeMonster: function() {
    return getDigitizeMonster;
  },
  getDigitizeMonsterCount: function() {
    return getDigitizeMonsterCount;
  },
  getDigitizeUses: function() {
    return getDigitizeUses;
  },
  getDigitizeUsesRemaining: function() {
    return getDigitizeUsesRemaining;
  },
  getDuplicateUses: function() {
    return getDuplicateUses;
  },
  getEnhanceUses: function() {
    return getEnhanceUses;
  },
  getMaximumDigitizeUses: function() {
    return getMaximumDigitizeUses;
  },
  getPortscanUses: function() {
    return getPortscanUses;
  },
  getSkills: function() {
    return getSkills;
  },
  have: function() {
    return have2;
  },
  isCurrentSkill: function() {
    return isCurrentSkill;
  },
  item: function() {
    return item;
  },
  maximumDuplicateUses: function() {
    return maximumDuplicateUses;
  },
  maximumEnhanceUses: function() {
    return maximumEnhanceUses;
  },
  prepareDigitize: function() {
    return prepareDigitize;
  }
});
init_kolmafia_polyfill();
var import_kolmafia8 = require("kolmafia"), import_isEqual = __toESM(require_isEqual());
var _templateObject105, _templateObject215, _templateObject311, _templateObject411, _templateObject510, _templateObject610, _templateObject710, _templateObject810, _templateObject910, _templateObject106, _templateObject114, _templateObject124, _templateObject134, _templateObject144, _templateObject154, _templateObject164, _templateObject174, _templateObject184, _templateObject194, _templateObject204, _templateObject216, _templateObject224, _templateObject234, _templateObject244, _templateObject254, _templateObject264, _templateObject274;
function _createForOfIteratorHelper4(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray7(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e) {
        throw _e;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e2) {
    didErr = !0, err = _e2;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _unsupportedIterableToArray7(o, minLen) {
  if (!!o) {
    if (typeof o == "string")
      return _arrayLikeToArray7(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray7(o, minLen);
  }
}
function _arrayLikeToArray7(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _taggedTemplateLiteral5(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var item = $item(_templateObject105 || (_templateObject105 = _taggedTemplateLiteral5(["Source terminal"])));
function have2() {
  return haveInCampground(item);
}
var Buffs = {
  Items: $effect(_templateObject215 || (_templateObject215 = _taggedTemplateLiteral5(["items.enh"]))),
  Meat: $effect(_templateObject311 || (_templateObject311 = _taggedTemplateLiteral5(["meat.enh"]))),
  Init: $effect(_templateObject411 || (_templateObject411 = _taggedTemplateLiteral5(["init.enh"]))),
  Critical: $effect(_templateObject510 || (_templateObject510 = _taggedTemplateLiteral5(["critical.enh"]))),
  Damage: $effect(_templateObject610 || (_templateObject610 = _taggedTemplateLiteral5(["damage.enh"]))),
  Substats: $effect(_templateObject710 || (_templateObject710 = _taggedTemplateLiteral5(["substats.enh"])))
};
function enhance(buff) {
  return Object.values(Buffs).includes(buff) ? (0, import_kolmafia8.cliExecute)("terminal enhance ".concat(buff.name)) : !1;
}
var RolloverBuffs = {
  Familiar: $effect(_templateObject810 || (_templateObject810 = _taggedTemplateLiteral5(["familiar.enq"]))),
  Monsters: $effect(_templateObject910 || (_templateObject910 = _taggedTemplateLiteral5(["monsters.enq"]))),
  Protect: $effect(_templateObject106 || (_templateObject106 = _taggedTemplateLiteral5(["protect.enq"]))),
  Stats: $effect(_templateObject114 || (_templateObject114 = _taggedTemplateLiteral5(["stats.enq"])))
};
function enquiry(rolloverBuff) {
  return Object.values(RolloverBuffs).includes(rolloverBuff) ? (0, import_kolmafia8.cliExecute)("terminal enquiry ".concat(rolloverBuff.name)) : !1;
}
var Skills = {
  Extract: $skill(_templateObject124 || (_templateObject124 = _taggedTemplateLiteral5(["Extract"]))),
  Digitize: $skill(_templateObject134 || (_templateObject134 = _taggedTemplateLiteral5(["Digitize"]))),
  Compress: $skill(_templateObject144 || (_templateObject144 = _taggedTemplateLiteral5(["Compress"]))),
  Duplicate: $skill(_templateObject154 || (_templateObject154 = _taggedTemplateLiteral5(["Duplicate"]))),
  Portscan: $skill(_templateObject164 || (_templateObject164 = _taggedTemplateLiteral5(["Portscan"]))),
  Turbo: $skill(_templateObject174 || (_templateObject174 = _taggedTemplateLiteral5(["Turbo"])))
};
function educate(skills) {
  var skillsArray = Array.isArray(skills) ? skills.slice(0, 2) : [skills];
  if ((0, import_isEqual.default)(skillsArray, getSkills()))
    return !0;
  var _iterator = _createForOfIteratorHelper4(skillsArray), _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var skill = _step.value;
      if (!Object.values(Skills).includes(skill))
        return !1;
      (0, import_kolmafia8.cliExecute)("terminal educate ".concat(skill.name.toLowerCase(), ".edu"));
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return !0;
}
function getSkills() {
  return ["sourceTerminalEducate1", "sourceTerminalEducate2"].map(function(p) {
    return get(p);
  }).filter(function(s) {
    return s !== "";
  }).map(function(s) {
    return import_kolmafia8.Skill.get(s.slice(0, -4));
  });
}
function isCurrentSkill(skills) {
  var currentSkills = getSkills(), skillsArray = Array.isArray(skills) ? skills.slice(0, 2) : [skills];
  return skillsArray.every(function(skill) {
    return currentSkills.includes(skill);
  });
}
var Items = /* @__PURE__ */ new Map([[$item(_templateObject184 || (_templateObject184 = _taggedTemplateLiteral5(["browser cookie"]))), "food.ext"], [$item(_templateObject194 || (_templateObject194 = _taggedTemplateLiteral5(["hacked gibson"]))), "booze.ext"], [$item(_templateObject204 || (_templateObject204 = _taggedTemplateLiteral5(["Source shades"]))), "goggles.ext"], [$item(_templateObject216 || (_templateObject216 = _taggedTemplateLiteral5(["Source terminal GRAM chip"]))), "gram.ext"], [$item(_templateObject224 || (_templateObject224 = _taggedTemplateLiteral5(["Source terminal PRAM chip"]))), "pram.ext"], [$item(_templateObject234 || (_templateObject234 = _taggedTemplateLiteral5(["Source terminal SPAM chip"]))), "spam.ext"], [$item(_templateObject244 || (_templateObject244 = _taggedTemplateLiteral5(["Source terminal CRAM chip"]))), "cram.ext"], [$item(_templateObject254 || (_templateObject254 = _taggedTemplateLiteral5(["Source terminal DRAM chip"]))), "dram.ext"], [$item(_templateObject264 || (_templateObject264 = _taggedTemplateLiteral5(["Source terminal TRAM chip"]))), "tram.ext"], [$item(_templateObject274 || (_templateObject274 = _taggedTemplateLiteral5(["software bug"]))), "familiar.ext"]]);
function extrude(item5) {
  var fileName = Items.get(item5);
  return fileName ? (0, import_kolmafia8.cliExecute)("terminal extrude ".concat(fileName)) : !1;
}
function getChips() {
  return get("sourceTerminalChips").split(",");
}
function getDigitizeUses() {
  return get("_sourceTerminalDigitizeUses");
}
function getDigitizeMonster() {
  return get("_sourceTerminalDigitizeMonster");
}
function getDigitizeMonsterCount() {
  return get("_sourceTerminalDigitizeMonsterCount");
}
function getMaximumDigitizeUses() {
  var chips = getChips();
  return 1 + (chips.includes("TRAM") ? 1 : 0) + (chips.includes("TRIGRAM") ? 1 : 0);
}
function getDigitizeUsesRemaining() {
  return getMaximumDigitizeUses() - getDigitizeUses();
}
function couldDigitize() {
  return getDigitizeUses() < getMaximumDigitizeUses();
}
function prepareDigitize() {
  return isCurrentSkill(Skills.Digitize) ? !0 : educate(Skills.Digitize);
}
function canDigitize() {
  return couldDigitize() && getSkills().includes(Skills.Digitize);
}
var Digitize = new Copier(function() {
  return couldDigitize();
}, function() {
  return prepareDigitize();
}, function() {
  return canDigitize();
}, function() {
  return getDigitizeMonster();
});
function getDuplicateUses() {
  return get("_sourceTerminalDuplicateUses");
}
function getEnhanceUses() {
  return get("_sourceTerminalEnhanceUses");
}
function getPortscanUses() {
  return get("_sourceTerminalPortscanUses");
}
function maximumDuplicateUses() {
  return (0, import_kolmafia8.myPath)() === import_kolmafia8.Path.get("The Source") ? 5 : 1;
}
function duplicateUsesRemaining() {
  return maximumDuplicateUses() - getDuplicateUses();
}
function maximumEnhanceUses() {
  return 1 + getChips().filter(function(chip) {
    return ["CRAM", "SCRAM"].includes(chip);
  }).length;
}
function enhanceUsesRemaining() {
  return maximumEnhanceUses() - getEnhanceUses();
}
function enhanceBuffDuration() {
  return 25 + get("sourceTerminalPram") * 5 + (getChips().includes("INGRAM") ? 25 : 0);
}
function enquiryBuffDuration() {
  return 50 + 10 * get("sourceTerminalGram") + (getChips().includes("DIAGRAM") ? 50 : 0);
}

// node_modules/libram/dist/resources/2017/Robortender.js
var Robortender_exports = {};
__export(Robortender_exports, {
  currentDrinks: function() {
    return currentDrinks;
  },
  drinks: function() {
    return drinks;
  },
  dropChance: function() {
    return dropChance;
  },
  dropFrom: function() {
    return dropFrom;
  },
  familiar: function() {
    return familiar;
  },
  feed: function() {
    return feed;
  },
  have: function() {
    return have3;
  },
  majorDrinks: function() {
    return majorDrinks;
  },
  minorDrinks: function() {
    return minorDrinks;
  }
});
init_kolmafia_polyfill();
var import_kolmafia9 = require("kolmafia");
var _templateObject107, _templateObject217, _templateObject314, _templateObject413, _templateObject511, _templateObject611, _templateObject711, _templateObject811, _templateObject911, _templateObject108, _templateObject115, _templateObject125, _templateObject135, _templateObject145, _templateObject155, _templateObject165, _templateObject175, _templateObject185, _templateObject195, _templateObject205, _templateObject218, _templateObject225, _templateObject235, _templateObject245, _templateObject255, _templateObject265, _templateObject275, _templateObject284, _templateObject294, _templateObject304, _templateObject315, _templateObject324, _templateObject334, _templateObject344, _templateObject354, _templateObject363, _templateObject373;
function _toConsumableArray5(arr) {
  return _arrayWithoutHoles5(arr) || _iterableToArray5(arr) || _unsupportedIterableToArray8(arr) || _nonIterableSpread5();
}
function _nonIterableSpread5() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray8(o, minLen) {
  if (!!o) {
    if (typeof o == "string")
      return _arrayLikeToArray8(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray8(o, minLen);
  }
}
function _iterableToArray5(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles5(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray8(arr);
}
function _arrayLikeToArray8(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _taggedTemplateLiteral6(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var familiar = $familiar(_templateObject107 || (_templateObject107 = _taggedTemplateLiteral6(["Robortender"])));
function have3() {
  return (0, import_kolmafia9.haveFamiliar)(familiar);
}
var phylumDrops = /* @__PURE__ */ new Map([
  [$phylum(_templateObject217 || (_templateObject217 = _taggedTemplateLiteral6(["Bug"]))), $item(_templateObject314 || (_templateObject314 = _taggedTemplateLiteral6(["pickled grasshopper"])))],
  [$phylum(_templateObject413 || (_templateObject413 = _taggedTemplateLiteral6(["Constellation"]))), import_kolmafia9.Item.get(9348)],
  [$phylum(_templateObject511 || (_templateObject511 = _taggedTemplateLiteral6(["Demon"]))), $item(_templateObject611 || (_templateObject611 = _taggedTemplateLiteral6(["bottle of novelty hot sauce"])))],
  [$phylum(_templateObject711 || (_templateObject711 = _taggedTemplateLiteral6(["Elemental"]))), $item(_templateObject811 || (_templateObject811 = _taggedTemplateLiteral6(["elemental sugarcube"])))],
  [$phylum(_templateObject911 || (_templateObject911 = _taggedTemplateLiteral6(["Elf"]))), $item(_templateObject108 || (_templateObject108 = _taggedTemplateLiteral6(["peppermint sprig"])))],
  [$phylum(_templateObject115 || (_templateObject115 = _taggedTemplateLiteral6(["Fish"]))), $item(_templateObject125 || (_templateObject125 = _taggedTemplateLiteral6(["bottle of clam juice"])))],
  [$phylum(_templateObject135 || (_templateObject135 = _taggedTemplateLiteral6(["Goblin"]))), $item(_templateObject145 || (_templateObject145 = _taggedTemplateLiteral6(["cocktail mushroom"])))],
  [$phylum(_templateObject155 || (_templateObject155 = _taggedTemplateLiteral6(["Hippy"]))), $item(_templateObject165 || (_templateObject165 = _taggedTemplateLiteral6(["shot of granola liqueur"])))],
  [$phylum(_templateObject175 || (_templateObject175 = _taggedTemplateLiteral6(["Hobo"]))), $item(_templateObject185 || (_templateObject185 = _taggedTemplateLiteral6(["can of cherry-flavored sterno"])))],
  [$phylum(_templateObject195 || (_templateObject195 = _taggedTemplateLiteral6(["Horror"]))), $item(_templateObject205 || (_templateObject205 = _taggedTemplateLiteral6(["lump of black ichor"])))],
  [$phylum(_templateObject218 || (_templateObject218 = _taggedTemplateLiteral6(["Humanoid"]))), $item(_templateObject225 || (_templateObject225 = _taggedTemplateLiteral6(["bottle of gregnadigne"])))],
  [$phylum(_templateObject235 || (_templateObject235 = _taggedTemplateLiteral6(["Mer-kin"]))), import_kolmafia9.Item.get(9358)],
  [$phylum(_templateObject245 || (_templateObject245 = _taggedTemplateLiteral6(["Orc"]))), $item(_templateObject255 || (_templateObject255 = _taggedTemplateLiteral6(["baby oil shooter"])))],
  [$phylum(_templateObject265 || (_templateObject265 = _taggedTemplateLiteral6(["Penguin"]))), $item(_templateObject275 || (_templateObject275 = _taggedTemplateLiteral6(["fish head"])))],
  [$phylum(_templateObject284 || (_templateObject284 = _taggedTemplateLiteral6(["Pirate"]))), $item(_templateObject294 || (_templateObject294 = _taggedTemplateLiteral6(["limepatch"])))],
  [$phylum(_templateObject304 || (_templateObject304 = _taggedTemplateLiteral6(["Plant"]))), $item(_templateObject315 || (_templateObject315 = _taggedTemplateLiteral6(["pile of dirt"])))],
  [$phylum(_templateObject324 || (_templateObject324 = _taggedTemplateLiteral6(["Slime"]))), $item(_templateObject334 || (_templateObject334 = _taggedTemplateLiteral6(["slime shooter"])))],
  [$phylum(_templateObject344 || (_templateObject344 = _taggedTemplateLiteral6(["Weird"]))), $item(_templateObject354 || (_templateObject354 = _taggedTemplateLiteral6(["imaginary lemon"])))]
]);
function dropFrom(target) {
  var _phylumDrops$get, phylum = target instanceof import_kolmafia9.Monster ? target.phylum : target;
  return (_phylumDrops$get = phylumDrops.get(phylum)) !== null && _phylumDrops$get !== void 0 ? _phylumDrops$get : $item.none;
}
function dropChance() {
  var _dropNumber, dropNumber = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : get("_roboDrops");
  return (_dropNumber = [1, 0.5, 0.4, 0.4, 0.4, 0.3, 0.3, 0.3][dropNumber]) !== null && _dropNumber !== void 0 ? _dropNumber : 0.2;
}
var minorDrinks = $items(_templateObject363 || (_templateObject363 = _taggedTemplateLiteral6(["literal grasshopper, double entendre, Phlegethon, Siberian sunrise, mentholated wine, low tide martini, shroomtini, morning dew, whiskey squeeze, great old fashioned, Gnomish sagngria, vodka stinger, extremely slippery nipple, piscatini, Churchill, soilzerac, London frog, nothingtini"]))), majorDrinks = $items(_templateObject373 || (_templateObject373 = _taggedTemplateLiteral6(["eighth plague, single entendre, reverse Tantalus, elemental caipiroska, Feliz Navidad, Bloody Nora, moreltini, hell in a bucket, Newark, R'lyeh, Gnollish sangria, vodka barracuda, Mysterious Island iced tea, drive-by shooting, gunner's daughter, dirt julep, Simepore slime, Phil Collins"]))), drinks = [].concat(_toConsumableArray5(minorDrinks), _toConsumableArray5(majorDrinks));
function currentDrinks() {
  var pref = get("_roboDrinks");
  return pref ? pref.split(",").filter(function(x) {
    return x.trim();
  }).map(function(name) {
    return (0, import_kolmafia9.toItem)(name);
  }).filter(function(drink) {
    return drinks.includes(drink);
  }) : [];
}
function feed(beverage) {
  if (currentDrinks().includes(beverage))
    return !0;
  if (currentDrinks().length >= 5 || !drinks.includes(beverage) || !(0, import_kolmafia9.itemAmount)(beverage) || !have3())
    return !1;
  var priorFamiliar = (0, import_kolmafia9.myFamiliar)();
  return (0, import_kolmafia9.useFamiliar)(familiar), (0, import_kolmafia9.visitUrl)("inventory.php?action=robooze&which=1&whichitem=".concat((0, import_kolmafia9.toInt)(beverage))), (0, import_kolmafia9.useFamiliar)(priorFamiliar), currentDrinks().includes(beverage);
}

// node_modules/libram/dist/resources/2018/SongBoom.js
var SongBoom_exports = {};
__export(SongBoom_exports, {
  dropProgress: function() {
    return dropProgress;
  },
  have: function() {
    return have4;
  },
  item: function() {
    return item2;
  },
  setSong: function() {
    return setSong;
  },
  song: function() {
    return song;
  },
  songBoomSongs: function() {
    return songBoomSongs;
  },
  songChangesLeft: function() {
    return songChangesLeft;
  }
});
init_kolmafia_polyfill();
var import_kolmafia10 = require("kolmafia");
var _templateObject109;
function _taggedTemplateLiteral7(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var item2 = $item(_templateObject109 || (_templateObject109 = _taggedTemplateLiteral7(["SongBoom\u2122 BoomBox"])));
function have4() {
  return have(item2);
}
var keywords = {
  "Eye of the Giger": "spooky",
  "Food Vibrations": "food",
  "Remainin' Alive": "dr",
  "These Fists Were Made for Punchin'": "damage",
  "Total Eclipse of Your Meat": "meat"
}, songBoomSongs = new Set(Object.keys(keywords));
function song() {
  var stored = get("boomBoxSong");
  return songBoomSongs.has(stored) ? stored : null;
}
function songChangesLeft() {
  return get("_boomBoxSongsLeft");
}
function setSong(newSong) {
  if (song() !== newSong) {
    if (songChangesLeft() === 0)
      throw new Error("Out of song changes!");
    return (0, import_kolmafia10.cliExecute)("boombox ".concat(newSong ? keywords[newSong] : "none")), !0;
  } else
    return !1;
}
function dropProgress() {
  return get("_boomBoxFights");
}

// node_modules/libram/dist/resources/2019/Snapper.js
var Snapper_exports = {};
__export(Snapper_exports, {
  getProgress: function() {
    return getProgress;
  },
  getTrackedPhylum: function() {
    return getTrackedPhylum;
  },
  have: function() {
    return have5;
  },
  itemPhylum: function() {
    return itemPhylum;
  },
  phylumItem: function() {
    return phylumItem;
  },
  trackPhylum: function() {
    return trackPhylum;
  }
});
init_kolmafia_polyfill();
var import_kolmafia11 = require("kolmafia");
function _slicedToArray5(arr, i) {
  return _arrayWithHoles5(arr) || _iterableToArrayLimit5(arr, i) || _unsupportedIterableToArray9(arr, i) || _nonIterableRest5();
}
function _nonIterableRest5() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit5(arr, i) {
  var _i = arr == null ? null : typeof Symbol != "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i != null) {
    var _arr = [], _n = !0, _d = !1, _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !(i && _arr.length === i)); _n = !0)
        ;
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        !_n && _i.return != null && _i.return();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles5(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _toConsumableArray6(arr) {
  return _arrayWithoutHoles6(arr) || _iterableToArray6(arr) || _unsupportedIterableToArray9(arr) || _nonIterableSpread6();
}
function _nonIterableSpread6() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray9(o, minLen) {
  if (!!o) {
    if (typeof o == "string")
      return _arrayLikeToArray9(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray9(o, minLen);
  }
}
function _iterableToArray6(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles6(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray9(arr);
}
function _arrayLikeToArray9(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
var familiar2 = import_kolmafia11.Familiar.get("Red-Nosed Snapper"), phylumItem = /* @__PURE__ */ new Map([[import_kolmafia11.Phylum.get("beast"), import_kolmafia11.Item.get("patch of extra-warm fur")], [import_kolmafia11.Phylum.get("bug"), import_kolmafia11.Item.get("a bug's lymph")], [import_kolmafia11.Phylum.get("constellation"), import_kolmafia11.Item.get("micronova")], [import_kolmafia11.Phylum.get("construct"), import_kolmafia11.Item.get("industrial lubricant")], [import_kolmafia11.Phylum.get("demon"), import_kolmafia11.Item.get("infernal snowball")], [import_kolmafia11.Phylum.get("dude"), import_kolmafia11.Item.get("human musk")], [import_kolmafia11.Phylum.get("elemental"), import_kolmafia11.Item.get("livid energy")], [import_kolmafia11.Phylum.get("elf"), import_kolmafia11.Item.get("peppermint syrup")], [import_kolmafia11.Phylum.get("fish"), import_kolmafia11.Item.get("fish sauce")], [import_kolmafia11.Phylum.get("goblin"), import_kolmafia11.Item.get("guffin")], [import_kolmafia11.Phylum.get("hippy"), import_kolmafia11.Item.get("organic potpourri")], [import_kolmafia11.Phylum.get("hobo"), import_kolmafia11.Item.get("beggin' cologne")], [import_kolmafia11.Phylum.get("horror"), import_kolmafia11.Item.get("powdered madness")], [import_kolmafia11.Phylum.get("humanoid"), import_kolmafia11.Item.get("vial of humanoid growth hormone")], [import_kolmafia11.Phylum.get("mer-kin"), import_kolmafia11.Item.get("Mer-kin eyedrops")], [import_kolmafia11.Phylum.get("orc"), import_kolmafia11.Item.get("boot flask")], [import_kolmafia11.Phylum.get("penguin"), import_kolmafia11.Item.get("envelope full of Meat")], [import_kolmafia11.Phylum.get("pirate"), import_kolmafia11.Item.get("Shantix\u2122")], [import_kolmafia11.Phylum.get("plant"), import_kolmafia11.Item.get("goodberry")], [import_kolmafia11.Phylum.get("slime"), import_kolmafia11.Item.get("extra-strength goo")], [import_kolmafia11.Phylum.get("undead"), import_kolmafia11.Item.get("unfinished pleasure")], [import_kolmafia11.Phylum.get("weird"), import_kolmafia11.Item.get("non-Euclidean angle")]]), itemPhylum = new Map(_toConsumableArray6(phylumItem).map(function(_ref2) {
  var _ref22 = _slicedToArray5(_ref2, 2), phylum = _ref22[0], item5 = _ref22[1];
  return [item5, phylum];
}));
function have5() {
  return (0, import_kolmafia11.haveFamiliar)(familiar2);
}
function getTrackedPhylum() {
  return get("redSnapperPhylum");
}
function trackPhylum(phylum) {
  var currentFamiliar = (0, import_kolmafia11.myFamiliar)();
  try {
    (0, import_kolmafia11.useFamiliar)(familiar2), (0, import_kolmafia11.cliExecute)("snapper ".concat(phylum));
  } finally {
    (0, import_kolmafia11.useFamiliar)(currentFamiliar);
  }
}
function getProgress() {
  return get("redSnapperProgress");
}

// node_modules/libram/dist/resources/2020/Guzzlr.js
var Guzzlr_exports = {};
__export(Guzzlr_exports, {
  Cocktails: function() {
    return Cocktails;
  },
  abandon: function() {
    return abandon;
  },
  acceptBronze: function() {
    return acceptBronze;
  },
  acceptGold: function() {
    return acceptGold;
  },
  acceptPlatinum: function() {
    return acceptPlatinum;
  },
  canAbandon: function() {
    return canAbandon;
  },
  canGold: function() {
    return canGold;
  },
  canPlatinum: function() {
    return canPlatinum;
  },
  expectedReward: function() {
    return expectedReward;
  },
  getBooze: function() {
    return getBooze;
  },
  getBronze: function() {
    return getBronze;
  },
  getCheapestPlatinumCocktail: function() {
    return getCheapestPlatinumCocktail;
  },
  getGold: function() {
    return getGold;
  },
  getGoldToday: function() {
    return getGoldToday;
  },
  getLocation: function() {
    return getLocation2;
  },
  getPlatinum: function() {
    return getPlatinum;
  },
  getPlatinumToday: function() {
    return getPlatinumToday;
  },
  getTier: function() {
    return getTier;
  },
  have: function() {
    return have6;
  },
  haveBooze: function() {
    return haveBooze;
  },
  haveFullBronzeBonus: function() {
    return haveFullBronzeBonus;
  },
  haveFullGoldBonus: function() {
    return haveFullGoldBonus;
  },
  haveFullPlatinumBonus: function() {
    return haveFullPlatinumBonus;
  },
  havePlatinumBooze: function() {
    return havePlatinumBooze;
  },
  ingredientToPlatinumCocktail: function() {
    return ingredientToPlatinumCocktail;
  },
  isQuestActive: function() {
    return isQuestActive;
  },
  item: function() {
    return item3;
  },
  platinumCocktailToIngredient: function() {
    return platinumCocktailToIngredient;
  },
  turnsLeftOnQuest: function() {
    return turnsLeftOnQuest;
  }
});
init_kolmafia_polyfill();
var import_kolmafia12 = require("kolmafia"), import_maxBy = __toESM(require_maxBy());
var _templateObject110, _templateObject219, _templateObject316, _templateObject414, _templateObject512, _templateObject612, _templateObject712, _templateObject812, _templateObject912, _templateObject1010, _templateObject116, _templateObject126, _templateObject136, _templateObject146, _templateObject156;
function _toConsumableArray7(arr) {
  return _arrayWithoutHoles7(arr) || _iterableToArray7(arr) || _unsupportedIterableToArray10(arr) || _nonIterableSpread7();
}
function _nonIterableSpread7() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray10(o, minLen) {
  if (!!o) {
    if (typeof o == "string")
      return _arrayLikeToArray10(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray10(o, minLen);
  }
}
function _iterableToArray7(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles7(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray10(arr);
}
function _arrayLikeToArray10(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _taggedTemplateLiteral8(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var item3 = $item(_templateObject110 || (_templateObject110 = _taggedTemplateLiteral8(["Guzzlr tablet"])));
function have6() {
  return have(item3);
}
function useTabletWithChoice(option) {
  withChoice(1412, option, function() {
    return (0, import_kolmafia12.use)(1, item3);
  });
}
function isQuestActive() {
  return get("questGuzzlr") !== "unstarted";
}
function getPlatinum() {
  return get("guzzlrPlatinumDeliveries");
}
function getPlatinumToday() {
  return get("_guzzlrPlatinumDeliveries");
}
function canPlatinum() {
  return !isQuestActive() && getGold() >= 5 && getPlatinumToday() < 1;
}
function haveFullPlatinumBonus() {
  return getPlatinum() >= 30;
}
function acceptPlatinum() {
  return canPlatinum() ? (useTabletWithChoice(4), !0) : !1;
}
function getGold() {
  return get("guzzlrGoldDeliveries");
}
function getGoldToday() {
  return get("_guzzlrGoldDeliveries");
}
function canGold() {
  return !isQuestActive() && getBronze() >= 5 && getGoldToday() < 3;
}
function haveFullGoldBonus() {
  return getGold() >= 150;
}
function acceptGold() {
  return canGold() ? (useTabletWithChoice(3), !0) : !1;
}
function getBronze() {
  return get("guzzlrBronzeDeliveries");
}
function acceptBronze() {
  return isQuestActive() ? !1 : (useTabletWithChoice(2), !0);
}
function haveFullBronzeBonus() {
  return getBronze() >= 196;
}
function canAbandon() {
  return isQuestActive() && !get("_guzzlrQuestAbandoned");
}
function abandon() {
  return canAbandon() ? ((0, import_kolmafia12.visitUrl)("inventory.php?tap=guzzlr", !1), (0, import_kolmafia12.runChoice)(1), (0, import_kolmafia12.runChoice)(5), !0) : !1;
}
function getLocation2() {
  return get("guzzlrQuestLocation");
}
function getTier() {
  var tier = get("guzzlrQuestTier");
  return tier === "" ? null : tier;
}
function getBooze() {
  var booze = get("guzzlrQuestBooze");
  return booze === "" ? null : import_kolmafia12.Item.get(booze);
}
var Cocktails = $items(_templateObject219 || (_templateObject219 = _taggedTemplateLiteral8(["Buttery Boy, Steamboat, Ghiaccio Colada, Nog-on-the-Cob, Sourfinger"])));
function havePlatinumBooze() {
  return Cocktails.some(function(cock) {
    return have(cock);
  });
}
function haveBooze() {
  var booze = getBooze();
  switch (booze) {
    case null:
      return !1;
    case $item(_templateObject316 || (_templateObject316 = _taggedTemplateLiteral8(["Guzzlr cocktail set"]))):
      return havePlatinumBooze();
    default:
      return have(booze);
  }
}
var ingredientToPlatinumCocktail = /* @__PURE__ */ new Map([[$item(_templateObject414 || (_templateObject414 = _taggedTemplateLiteral8(["miniature boiler"]))), $item(_templateObject512 || (_templateObject512 = _taggedTemplateLiteral8(["Steamboat"])))], [$item(_templateObject612 || (_templateObject612 = _taggedTemplateLiteral8(["cold wad"]))), $item(_templateObject712 || (_templateObject712 = _taggedTemplateLiteral8(["Ghiaccio Colada"])))], [$item(_templateObject812 || (_templateObject812 = _taggedTemplateLiteral8(["robin's egg"]))), $item(_templateObject912 || (_templateObject912 = _taggedTemplateLiteral8(["Nog-on-the-Cob"])))], [$item(_templateObject1010 || (_templateObject1010 = _taggedTemplateLiteral8(["mangled finger"]))), $item(_templateObject116 || (_templateObject116 = _taggedTemplateLiteral8(["Sourfinger"])))], [$item(_templateObject126 || (_templateObject126 = _taggedTemplateLiteral8(["Dish of Clarified Butter"]))), $item(_templateObject136 || (_templateObject136 = _taggedTemplateLiteral8(["Buttery Boy"])))]]), platinumCocktailToIngredient = invertMap(ingredientToPlatinumCocktail);
function getCheapestPlatinumCocktail() {
  var freeCraft = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0, defaultCocktail = [$item(_templateObject146 || (_templateObject146 = _taggedTemplateLiteral8(["Dish of Clarified Butter"]))), $item(_templateObject156 || (_templateObject156 = _taggedTemplateLiteral8(["Buttery Boy"])))];
  if (freeCraft) {
    var _maxBy;
    return ((_maxBy = (0, import_maxBy.default)(Array.from(ingredientToPlatinumCocktail), function(ingredientAndCocktail) {
      return Math.max.apply(Math, _toConsumableArray7(ingredientAndCocktail.map(function(item5) {
        return -(0, import_kolmafia12.mallPrice)(item5);
      })));
    })) !== null && _maxBy !== void 0 ? _maxBy : defaultCocktail)[1];
  } else {
    var _maxBy2;
    return ((_maxBy2 = (0, import_maxBy.default)(Array.from(ingredientToPlatinumCocktail), function(ingredientAndCocktail) {
      return -(0, import_kolmafia12.mallPrice)(ingredientAndCocktail[1]);
    })) !== null && _maxBy2 !== void 0 ? _maxBy2 : defaultCocktail)[1];
  }
}
function turnsLeftOnQuest() {
  var useShoes = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, progressPerTurn = useShoes ? Math.floor((10 - get("_guzzlrDeliveries")) * 1.5) : 10 - get("_guzzlrDeliveries");
  return Math.ceil((100 - get("guzzlrDeliveryProgress")) / progressPerTurn);
}
function expectedReward() {
  var usePants = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
  switch (getTier()) {
    case "platinum":
      return 22.5 + (usePants ? 5 : 0);
    case "gold":
      return 6 + (usePants ? 3 : 0);
    case "bronze":
      return 3 + (usePants ? 3 : 0);
    default:
      return 0;
  }
}

// node_modules/libram/dist/resources/2022/AutumnAton.js
var AutumnAton_exports = {};
__export(AutumnAton_exports, {
  available: function() {
    return available;
  },
  availableLocations: function() {
    return availableLocations;
  },
  currentUpgrades: function() {
    return currentUpgrades;
  },
  currentlyIn: function() {
    return currentlyIn;
  },
  have: function() {
    return have7;
  },
  item: function() {
    return item4;
  },
  possibleUpgrades: function() {
    return possibleUpgrades;
  },
  seasonalItems: function() {
    return seasonalItems;
  },
  sendTo: function() {
    return sendTo;
  },
  turnsForQuest: function() {
    return turnsForQuest;
  },
  turnsLeft: function() {
    return turnsLeft;
  },
  upgrade: function() {
    return upgrade;
  },
  visualAcuity: function() {
    return visualAcuity;
  },
  zoneItems: function() {
    return zoneItems;
  }
});
init_kolmafia_polyfill();
var import_kolmafia13 = require("kolmafia");
var item4 = import_kolmafia13.Item.get("autumn-aton");
function available() {
  return (0, import_kolmafia13.availableAmount)(item4) > 0;
}
function have7() {
  return get("hasAutumnaton") || available();
}
function checkLocations(html) {
  return (0, import_kolmafia13.xpath)(html, '//select[@name="heythereprogrammer"]//option[position()>1]/text()').map(function(name) {
    return (0, import_kolmafia13.toLocation)(name);
  });
}
var use2 = function() {
  return (0, import_kolmafia13.visitUrl)("inv_use.php?pwd&whichitem=10954");
};
function currentlyIn() {
  return get("autumnatonQuestLocation");
}
function sendTo(target) {
  var upgrade2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  if (!available())
    return null;
  var pageHtml = use2();
  upgrade2 && (0, import_kolmafia13.availableChoiceOptions)()[1] && (0, import_kolmafia13.runChoice)(1);
  var locationsAvailable = checkLocations(pageHtml), location2 = target instanceof import_kolmafia13.Location ? target : Array.isArray(target) ? target.find(function(l) {
    return locationsAvailable.includes(l);
  }) : target(locationsAvailable);
  return !location2 || !locationsAvailable.includes(location2) ? null : ((0, import_kolmafia13.runChoice)(2, "heythereprogrammer=".concat(location2.id)), (0, import_kolmafia13.handlingChoice)() && (0, import_kolmafia13.visitUrl)("main.php"), location2);
}
function upgrade() {
  use2();
  var canUpgrade = (0, import_kolmafia13.availableChoiceOptions)()[1] !== void 0;
  return canUpgrade && (0, import_kolmafia13.runChoice)(1), (0, import_kolmafia13.visitUrl)("main.php"), canUpgrade;
}
function availableLocations() {
  if (!available())
    return [];
  var pageHtml = use2();
  return (0, import_kolmafia13.visitUrl)("main.php"), checkLocations(pageHtml);
}
var possibleUpgrades = ["leftarm1", "leftleg1", "rightarm1", "rightleg1", "base_blackhat", "cowcatcher", "periscope", "radardish", "dualexhaust"];
function currentUpgrades() {
  return get("autumnatonUpgrades").split(",");
}
function turnsLeft() {
  return get("autumnatonQuestTurn") - (0, import_kolmafia13.totalTurnsPlayed)();
}
function turnsForQuest() {
  return 11 * Math.max(1, get("_autumnatonQuests") - currentUpgrades().filter(function(u) {
    return u.includes("leg");
  }).length);
}
function visualAcuity() {
  var visualUpgrades = ["periscope", "radardish"];
  return 1 + currentUpgrades().filter(function(u) {
    return visualUpgrades.includes(u);
  }).length;
}
function zoneItems() {
  return 3 + currentUpgrades().filter(function(u) {
    return u.includes("arm");
  }).length;
}
function seasonalItems() {
  return currentUpgrades().includes("cowcatcher") ? 2 : 1;
}

// node_modules/libram/dist/resources/2022/JuneCleaver.js
var JuneCleaver_exports = {};
__export(JuneCleaver_exports, {
  choices: function() {
    return choices;
  },
  choicesAvailable: function() {
    return choicesAvailable;
  },
  cleaver: function() {
    return cleaver;
  },
  damage: function() {
    return damage;
  },
  getInterval: function() {
    return getInterval;
  },
  getSkippedInterval: function() {
    return getSkippedInterval;
  },
  have: function() {
    return have8;
  },
  queue: function() {
    return queue;
  },
  skipsRemaining: function() {
    return skipsRemaining;
  }
});
init_kolmafia_polyfill();
var import_kolmafia14 = require("kolmafia");
var cleaver = (0, import_kolmafia14.toItem)("June cleaver");
function have8() {
  return (0, import_kolmafia14.availableAmount)(cleaver) > 0;
}
function getInterval() {
  var _encounters, encounters = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : get("_juneCleaverEncounters");
  return (_encounters = [1, 6, 10, 12, 15, 20][encounters]) !== null && _encounters !== void 0 ? _encounters : 30;
}
function getSkippedInterval() {
  var _encounters2, encounters = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : get("_juneCleaverEncounters");
  return (_encounters2 = [1, 2, 3, 3, 4, 5][encounters]) !== null && _encounters2 !== void 0 ? _encounters2 : 8;
}
function damage(element) {
  return get("_juneCleaver".concat(element));
}
function skipsRemaining() {
  return 5 - get("_juneCleaverSkips");
}
var choices = [1467, 1468, 1469, 1470, 1471, 1472, 1473, 1474, 1475];
function queue() {
  return get("juneCleaverQueue").split(",").filter(function(x) {
    return x.trim().length > 0;
  }).map(function(x) {
    return parseInt(x);
  });
}
function choicesAvailable() {
  var currentQueue = queue();
  return choices.filter(function(choice) {
    return !currentQueue.includes(choice);
  });
}

// node_modules/libram/dist/counter.js
var counter_exports = {};
__export(counter_exports, {
  exists: function() {
    return exists;
  },
  get: function() {
    return get2;
  },
  set: function() {
    return set;
  }
});
init_kolmafia_polyfill();
var import_kolmafia15 = require("kolmafia");
function get2(counter) {
  var value = (0, import_kolmafia15.getCounter)(counter);
  return value === -1 ? (0, import_kolmafia15.getCounters)(counter, -1, -1).trim() === "" ? 1 / 0 : -1 : value;
}
function exists(counter) {
  return (0, import_kolmafia15.getCounter)(counter) !== -1 || (0, import_kolmafia15.getCounters)(counter, -1, -1).trim() !== "";
}
function set(counter, duration) {
  return (0, import_kolmafia15.cliExecute)("counters add ".concat(duration, " ").concat(counter)), get2(counter) !== null;
}

// node_modules/libram/dist/since.js
init_kolmafia_polyfill();
var import_kolmafia16 = require("kolmafia");
function _defineProperties7(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass7(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties7(Constructor.prototype, protoProps), staticProps && _defineProperties7(Constructor, staticProps), Object.defineProperty(Constructor, "prototype", { writable: !1 }), Constructor;
}
function _classCallCheck7(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _inherits3(subClass, superClass) {
  if (typeof superClass != "function" && superClass !== null)
    throw new TypeError("Super expression must either be null or a function");
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: !0, configurable: !0 } }), Object.defineProperty(subClass, "prototype", { writable: !1 }), superClass && _setPrototypeOf3(subClass, superClass);
}
function _createSuper3(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct3();
  return function() {
    var Super = _getPrototypeOf3(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf3(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else
      result = Super.apply(this, arguments);
    return _possibleConstructorReturn3(this, result);
  };
}
function _possibleConstructorReturn3(self2, call) {
  if (call && (typeof call == "object" || typeof call == "function"))
    return call;
  if (call !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized3(self2);
}
function _assertThisInitialized3(self2) {
  if (self2 === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return self2;
}
function _wrapNativeSuper3(Class5) {
  var _cache = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return _wrapNativeSuper3 = function(Class6) {
    if (Class6 === null || !_isNativeFunction3(Class6))
      return Class6;
    if (typeof Class6 != "function")
      throw new TypeError("Super expression must either be null or a function");
    if (typeof _cache != "undefined") {
      if (_cache.has(Class6))
        return _cache.get(Class6);
      _cache.set(Class6, Wrapper);
    }
    function Wrapper() {
      return _construct3(Class6, arguments, _getPrototypeOf3(this).constructor);
    }
    return Wrapper.prototype = Object.create(Class6.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf3(Wrapper, Class6);
  }, _wrapNativeSuper3(Class5);
}
function _construct3(Parent, args3, Class5) {
  return _isNativeReflectConstruct3() ? _construct3 = Reflect.construct.bind() : _construct3 = function(Parent2, args4, Class6) {
    var a = [null];
    a.push.apply(a, args4);
    var Constructor = Function.bind.apply(Parent2, a), instance = new Constructor();
    return Class6 && _setPrototypeOf3(instance, Class6.prototype), instance;
  }, _construct3.apply(null, arguments);
}
function _isNativeReflectConstruct3() {
  if (typeof Reflect == "undefined" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch (e) {
    return !1;
  }
}
function _isNativeFunction3(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function _setPrototypeOf3(o, p) {
  return _setPrototypeOf3 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(o2, p2) {
    return o2.__proto__ = p2, o2;
  }, _setPrototypeOf3(o, p);
}
function _getPrototypeOf3(o) {
  return _getPrototypeOf3 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  }, _getPrototypeOf3(o);
}
var KolmafiaVersionError = /* @__PURE__ */ function(_Error) {
  _inherits3(KolmafiaVersionError2, _Error);
  var _super = _createSuper3(KolmafiaVersionError2);
  function KolmafiaVersionError2(message) {
    var _this;
    return _classCallCheck7(this, KolmafiaVersionError2), _this = _super.call(this, message), Object.setPrototypeOf(_assertThisInitialized3(_this), KolmafiaVersionError2.prototype), _this;
  }
  return _createClass7(KolmafiaVersionError2);
}(/* @__PURE__ */ _wrapNativeSuper3(Error));
KolmafiaVersionError.prototype.name = "KolmafiaVersionError";
function getScriptName() {
  var _require$main, scriptName = (_require$main = require.main) === null || _require$main === void 0 ? void 0 : _require$main.id;
  return scriptName ? "'".concat(scriptName, "'") : "This script";
}
function sinceKolmafiaRevision(revision) {
  if (!Number.isInteger(revision))
    throw new TypeError("Invalid revision number ".concat(revision, " (must be an integer)"));
  var currentRevision = (0, import_kolmafia16.getRevision)();
  if (currentRevision > 0 && currentRevision < revision)
    throw new KolmafiaVersionError("".concat(getScriptName(), " requires revision r").concat(revision, " of kolmafia or higher (current: ").concat((0, import_kolmafia16.getRevision)(), "). Up-to-date builds can be found at https://ci.kolmafia.us/."));
}

// node_modules/libram/dist/session.js
init_kolmafia_polyfill();
var import_kolmafia17 = require("kolmafia");
var _templateObject111, _templateObject220, _templateObject317, _templateObject415, _templateObject513, _templateObject613, _templateObject713, _templateObject813, _templateObject913, _templateObject1011, _templateObject117, _templateObject127, _templateObject137, _templateObject147, _templateObject157, _templateObject166, _templateObject176, _templateObject186, _templateObject196, _templateObject206, _templateObject2110, _templateObject226, _templateObject236, _templateObject246, _templateObject256, _templateObject266, _templateObject276, _templateObject285, _templateObject295, _templateObject305;
function _classCallCheck8(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties8(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass8(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties8(Constructor.prototype, protoProps), staticProps && _defineProperties8(Constructor, staticProps), Object.defineProperty(Constructor, "prototype", { writable: !1 }), Constructor;
}
function _defineProperty7(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
function _createForOfIteratorHelper5(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray11(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e2) {
        throw _e2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e3) {
    didErr = !0, err = _e3;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _slicedToArray6(arr, i) {
  return _arrayWithHoles6(arr) || _iterableToArrayLimit6(arr, i) || _unsupportedIterableToArray11(arr, i) || _nonIterableRest6();
}
function _nonIterableRest6() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit6(arr, i) {
  var _i = arr == null ? null : typeof Symbol != "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i != null) {
    var _arr = [], _n = !0, _d = !1, _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !(i && _arr.length === i)); _n = !0)
        ;
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        !_n && _i.return != null && _i.return();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles6(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _taggedTemplateLiteral9(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
function _toConsumableArray8(arr) {
  return _arrayWithoutHoles8(arr) || _iterableToArray8(arr) || _unsupportedIterableToArray11(arr) || _nonIterableSpread8();
}
function _nonIterableSpread8() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray11(o, minLen) {
  if (!!o) {
    if (typeof o == "string")
      return _arrayLikeToArray11(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray11(o, minLen);
  }
}
function _iterableToArray8(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles8(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray11(arr);
}
function _arrayLikeToArray11(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function mySessionItemsWrapper() {
  for (var manyToOne = function(primary, mapped) {
    return mapped.map(function(target) {
      return [target, primary];
    });
  }, foldable = function(item6) {
    return manyToOne(item6, getFoldGroup(item6));
  }, itemMappings = new Map([].concat(_toConsumableArray8(foldable($item(_templateObject111 || (_templateObject111 = _taggedTemplateLiteral9(["liar's pants"]))))), _toConsumableArray8(foldable($item(_templateObject220 || (_templateObject220 = _taggedTemplateLiteral9(["ice pick"]))))), _toConsumableArray8(manyToOne($item(_templateObject317 || (_templateObject317 = _taggedTemplateLiteral9(["Spooky Putty sheet"]))), [$item(_templateObject415 || (_templateObject415 = _taggedTemplateLiteral9(["Spooky Putty monster"])))].concat(_toConsumableArray8(getFoldGroup($item(_templateObject513 || (_templateObject513 = _taggedTemplateLiteral9(["Spooky Putty sheet"])))))))), _toConsumableArray8(foldable($item(_templateObject613 || (_templateObject613 = _taggedTemplateLiteral9(["stinky cheese sword"]))))), _toConsumableArray8(foldable($item(_templateObject713 || (_templateObject713 = _taggedTemplateLiteral9(["naughty paper shuriken"]))))), _toConsumableArray8(foldable($item(_templateObject813 || (_templateObject813 = _taggedTemplateLiteral9(["Loathing Legion knife"]))))), _toConsumableArray8(foldable($item(_templateObject913 || (_templateObject913 = _taggedTemplateLiteral9(["deceased crimbo tree"]))))), _toConsumableArray8(foldable($item(_templateObject1011 || (_templateObject1011 = _taggedTemplateLiteral9(["makeshift turban"]))))), _toConsumableArray8(foldable($item(_templateObject117 || (_templateObject117 = _taggedTemplateLiteral9(["turtle wax shield"]))))), _toConsumableArray8(foldable($item(_templateObject127 || (_templateObject127 = _taggedTemplateLiteral9(["metallic foil bow"]))))), _toConsumableArray8(foldable($item(_templateObject137 || (_templateObject137 = _taggedTemplateLiteral9(["ironic moustache"]))))), _toConsumableArray8(foldable($item(_templateObject147 || (_templateObject147 = _taggedTemplateLiteral9(["bugged balaclava"]))))), _toConsumableArray8(foldable($item(_templateObject157 || (_templateObject157 = _taggedTemplateLiteral9(["toggle switch (Bartend)"]))))), _toConsumableArray8(foldable($item(_templateObject166 || (_templateObject166 = _taggedTemplateLiteral9(["mushroom cap"]))))), _toConsumableArray8(manyToOne($item(_templateObject176 || (_templateObject176 = _taggedTemplateLiteral9(["can of Rain-Doh"]))), $items(_templateObject186 || (_templateObject186 = _taggedTemplateLiteral9(["empty Rain-Doh can"]))))), _toConsumableArray8(manyToOne($item(_templateObject196 || (_templateObject196 = _taggedTemplateLiteral9(["meteorite fragment"]))), $items(_templateObject206 || (_templateObject206 = _taggedTemplateLiteral9(["meteorite earring, meteorite necklace, meteorite ring"]))))), _toConsumableArray8(manyToOne($item(_templateObject2110 || (_templateObject2110 = _taggedTemplateLiteral9(["Sneaky Pete's leather jacket"]))), $items(_templateObject226 || (_templateObject226 = _taggedTemplateLiteral9(["Sneaky Pete's leather jacket (collar popped)"]))))), _toConsumableArray8(manyToOne($item(_templateObject236 || (_templateObject236 = _taggedTemplateLiteral9(["Boris's Helm"]))), $items(_templateObject246 || (_templateObject246 = _taggedTemplateLiteral9(["Boris's Helm (askew)"]))))), _toConsumableArray8(manyToOne($item(_templateObject256 || (_templateObject256 = _taggedTemplateLiteral9(["Jarlsberg's pan"]))), $items(_templateObject266 || (_templateObject266 = _taggedTemplateLiteral9(["Jarlsberg's pan (Cosmic portal mode)"]))))), _toConsumableArray8(manyToOne($item(_templateObject276 || (_templateObject276 = _taggedTemplateLiteral9(["tiny plastic sword"]))), $items(_templateObject285 || (_templateObject285 = _taggedTemplateLiteral9(["grogtini, bodyslam, dirty martini, vesper, cherry bomb, sangria del diablo"]))))), _toConsumableArray8(manyToOne($item(_templateObject295 || (_templateObject295 = _taggedTemplateLiteral9(["earthenware muffin tin"]))), $items(_templateObject305 || (_templateObject305 = _taggedTemplateLiteral9(["blueberry muffin, bran muffin, chocolate chip muffin"]))))))), inventory = /* @__PURE__ */ new Map(), _i = 0, _Object$entries = Object.entries((0, import_kolmafia17.mySessionItems)()); _i < _Object$entries.length; _i++) {
    var _itemMappings$get, _inventory$get, _Object$entries$_i = _slicedToArray6(_Object$entries[_i], 2), itemStr = _Object$entries$_i[0], quantity = _Object$entries$_i[1], item5 = (0, import_kolmafia17.toItem)(itemStr), mappedItem = (_itemMappings$get = itemMappings.get(item5)) !== null && _itemMappings$get !== void 0 ? _itemMappings$get : item5;
    inventory.set(mappedItem, quantity + ((_inventory$get = inventory.get(mappedItem)) !== null && _inventory$get !== void 0 ? _inventory$get : 0));
  }
  return inventory;
}
function inventoryOperation(a, b, op, commutative) {
  var difference = /* @__PURE__ */ new Map(), _iterator = _createForOfIteratorHelper5(a.entries()), _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var _b$get, _step$value = _slicedToArray6(_step.value, 2), _item = _step$value[0], _quantity = _step$value[1], combinedQuantity = op(_quantity, (_b$get = b.get(_item)) !== null && _b$get !== void 0 ? _b$get : 0);
      difference.set(_item, combinedQuantity);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  if (commutative) {
    var _iterator2 = _createForOfIteratorHelper5(b.entries()), _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
        var _step2$value = _slicedToArray6(_step2.value, 2), item5 = _step2$value[0], quantity = _step2$value[1];
        a.has(item5) || difference.set(item5, quantity);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }
  var diffEntries = _toConsumableArray8(difference.entries());
  return new Map(diffEntries.filter(function(value) {
    return value[1] !== 0;
  }));
}
var Session = /* @__PURE__ */ function() {
  function Session2(meat, items) {
    _classCallCheck8(this, Session2), _defineProperty7(this, "meat", void 0), _defineProperty7(this, "items", void 0), this.meat = meat, this.items = items;
  }
  return _createClass8(Session2, [{
    key: "register",
    value: function(target, quantity) {
      if (target === "meat")
        this.meat += quantity;
      else {
        var _this$items$get;
        this.items.set(target, ((_this$items$get = this.items.get(target)) !== null && _this$items$get !== void 0 ? _this$items$get : 0) + quantity);
      }
    }
  }, {
    key: "value",
    value: function(itemValue) {
      var meat = Math.floor(this.meat), itemDetails = _toConsumableArray8(this.items.entries()).map(function(_ref2) {
        var _ref22 = _slicedToArray6(_ref2, 2), item5 = _ref22[0], quantity = _ref22[1];
        return {
          item: item5,
          quantity: quantity,
          value: itemValue(item5) * quantity
        };
      }), items = Math.floor(sumNumbers(itemDetails.map(function(detail) {
        return detail.value;
      })));
      return {
        meat: meat,
        items: items,
        total: meat + items,
        itemDetails: itemDetails
      };
    }
  }, {
    key: "diff",
    value: function(other) {
      return new Session2(this.meat - other.meat, inventoryOperation(this.items, other.items, function(a, b) {
        return a - b;
      }, !1));
    }
  }, {
    key: "add",
    value: function(other) {
      return new Session2(this.meat + other.meat, inventoryOperation(this.items, other.items, function(a, b) {
        return a + b;
      }, !0));
    }
  }, {
    key: "toFile",
    value: function(filename) {
      var val = {
        meat: this.meat,
        items: Object.fromEntries(this.items)
      };
      (0, import_kolmafia17.bufferToFile)(JSON.stringify(val), Session2.getFilepath(filename));
    }
  }], [{
    key: "diff",
    value: function(a, b) {
      return a.diff(b);
    }
  }, {
    key: "add",
    value: function() {
      for (var _len = arguments.length, sessions = new Array(_len), _key = 0; _key < _len; _key++)
        sessions[_key] = arguments[_key];
      return sessions.reduce(function(previousSession, currentSession) {
        return previousSession.add(currentSession);
      });
    }
  }, {
    key: "getFilepath",
    value: function(filename) {
      return filename.endsWith(".json") ? filename : "snapshots/".concat((0, import_kolmafia17.myName)(), "/").concat((0, import_kolmafia17.todayToString)(), "_").concat(filename, ".json");
    }
  }, {
    key: "fromFile",
    value: function(filename) {
      var fileValue = (0, import_kolmafia17.fileToBuffer)(Session2.getFilepath(filename));
      if (fileValue.length > 0) {
        var val = JSON.parse(fileValue), parsedItems = Object.entries(val.items).map(function(_ref32) {
          var _ref42 = _slicedToArray6(_ref32, 2), itemStr = _ref42[0], quantity = _ref42[1];
          return [(0, import_kolmafia17.toItem)(itemStr), quantity];
        });
        return new Session2(val.meat, new Map(parsedItems));
      } else
        return new Session2(0, /* @__PURE__ */ new Map());
    }
  }, {
    key: "current",
    value: function() {
      return new Session2((0, import_kolmafia17.mySessionMeat)(), mySessionItemsWrapper());
    }
  }]), Session2;
}();

// node_modules/grimoire-kolmafia/dist/args.js
function _createForOfIteratorHelper6(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray12(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e2) {
        throw _e2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e3) {
    didErr = !0, err = _e3;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _unsupportedIterableToArray12(o, minLen) {
  if (!!o) {
    if (typeof o == "string")
      return _arrayLikeToArray12(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray12(o, minLen);
  }
}
function _arrayLikeToArray12(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function ownKeys3(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread3(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    i % 2 ? ownKeys3(Object(source), !0).forEach(function(key) {
      _defineProperty8(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys3(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty8(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
function _classCallCheck9(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties9(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass9(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties9(Constructor.prototype, protoProps), staticProps && _defineProperties9(Constructor, staticProps), Object.defineProperty(Constructor, "prototype", { writable: !1 }), Constructor;
}
var Args = /* @__PURE__ */ function() {
  function Args2() {
    _classCallCheck9(this, Args2);
  }
  return _createClass9(Args2, null, [{
    key: "custom",
    value: function(spec, _parser, valueHelpName) {
      var _a, _b, raw_options = (_a = spec.options) === null || _a === void 0 ? void 0 : _a.map(function(option) {
        return option[0];
      });
      if ("default" in spec && raw_options && !raw_options.includes(spec.default))
        throw "Invalid default value ".concat(spec.default);
      return _objectSpread3(_objectSpread3({}, spec), {}, {
        valueHelpName: valueHelpName,
        parser: function(value) {
          var parsed_value = _parser(value);
          return parsed_value === void 0 || parsed_value instanceof ParseError ? parsed_value : raw_options && !raw_options.includes(parsed_value) ? new ParseError("received ".concat(value, " which was not in the allowed options")) : parsed_value;
        },
        options: (_b = spec.options) === null || _b === void 0 ? void 0 : _b.map(function(a) {
          return ["".concat(a[0]), a[1]];
        })
      });
    }
  }, {
    key: "arrayFromArg",
    value: function(spec, argFromSpec) {
      var _a, _b, _c, spec_without_default = _objectSpread3({}, spec);
      "default" in spec_without_default && delete spec_without_default.default;
      var arg = argFromSpec.call(this, spec_without_default), raw_options = (_a = spec.options) === null || _a === void 0 ? void 0 : _a.map(function(option) {
        return option[0];
      });
      if ("default" in spec && raw_options) {
        var _iterator = _createForOfIteratorHelper6(spec.default), _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var default_entry = _step.value;
            if (!raw_options.includes(default_entry))
              throw "Invalid default value ".concat(spec.default);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
      var separator = (_b = spec.separator) !== null && _b !== void 0 ? _b : ",", arrayParser = function(value) {
        var values2 = value.split(separator);
        spec.noTrim || (values2 = values2.map(function(v) {
          return v.trim();
        }));
        var result = values2.map(function(v) {
          return arg.parser(v);
        }), error = result.find(function(v) {
          return v instanceof ParseError;
        });
        if (error)
          return error;
        var failure_index = result.indexOf(void 0);
        return failure_index !== -1 ? new ParseError("components expected ".concat(arg.parser.name, "$ but could not parse ").concat(values2[failure_index])) : result;
      };
      return _objectSpread3(_objectSpread3({}, spec), {}, {
        valueHelpName: "".concat(arg.valueHelpName).concat(separator, " ").concat(arg.valueHelpName).concat(separator, " ..."),
        parser: arrayParser,
        options: (_c = spec.options) === null || _c === void 0 ? void 0 : _c.map(function(a) {
          return ["".concat(a[0]), a[1]];
        })
      });
    }
  }, {
    key: "string",
    value: function(spec) {
      return this.custom(spec, function(value) {
        return value;
      }, "TEXT");
    }
  }, {
    key: "strings",
    value: function(spec) {
      return this.arrayFromArg(spec, this.string);
    }
  }, {
    key: "number",
    value: function(spec) {
      return this.custom(spec, function(value) {
        return isNaN(Number(value)) ? void 0 : Number(value);
      }, "NUMBER");
    }
  }, {
    key: "numbers",
    value: function(spec) {
      return this.arrayFromArg(spec, this.number);
    }
  }, {
    key: "boolean",
    value: function(spec) {
      return this.custom(spec, function(value) {
        if (value.toLowerCase() === "true")
          return !0;
        if (value.toLowerCase() === "false")
          return !1;
      }, "BOOLEAN");
    }
  }, {
    key: "booleans",
    value: function(spec) {
      return this.arrayFromArg(spec, this.boolean);
    }
  }, {
    key: "flag",
    value: function(spec) {
      return this.custom(spec, function(value) {
        if (value.toLowerCase() === "true")
          return !0;
        if (value.toLowerCase() === "false")
          return !1;
      }, "FLAG");
    }
  }, {
    key: "class",
    value: function(spec) {
      return this.custom(spec, function(value) {
        var match = import_kolmafia18.Class.get(value);
        if (match.toString().toUpperCase() === value.toString().toUpperCase() || !isNaN(Number(value)))
          return match;
      }, "CLASS");
    }
  }, {
    key: "classes",
    value: function(spec) {
      return this.arrayFromArg(spec, this.class);
    }
  }, {
    key: "effect",
    value: function(spec) {
      return this.custom(spec, import_kolmafia18.Effect.get, "EFFECT");
    }
  }, {
    key: "effects",
    value: function(spec) {
      return this.arrayFromArg(spec, this.effect);
    }
  }, {
    key: "familiar",
    value: function(spec) {
      return this.custom(spec, import_kolmafia18.Familiar.get, "FAMILIAR");
    }
  }, {
    key: "familiars",
    value: function(spec) {
      return this.arrayFromArg(spec, this.familiar);
    }
  }, {
    key: "item",
    value: function(spec) {
      return this.custom(spec, import_kolmafia18.Item.get, "ITEM");
    }
  }, {
    key: "items",
    value: function(spec) {
      return this.arrayFromArg(spec, this.item);
    }
  }, {
    key: "location",
    value: function(spec) {
      return this.custom(spec, import_kolmafia18.Location.get, "LOCATION");
    }
  }, {
    key: "locations",
    value: function(spec) {
      return this.arrayFromArg(spec, this.location);
    }
  }, {
    key: "monster",
    value: function(spec) {
      return this.custom(spec, import_kolmafia18.Monster.get, "MONSTER");
    }
  }, {
    key: "monsters",
    value: function(spec) {
      return this.arrayFromArg(spec, this.monster);
    }
  }, {
    key: "path",
    value: function(spec) {
      return this.custom(spec, import_kolmafia18.Path.get, "PATH");
    }
  }, {
    key: "paths",
    value: function(spec) {
      return this.arrayFromArg(spec, this.path);
    }
  }, {
    key: "skill",
    value: function(spec) {
      return this.custom(spec, import_kolmafia18.Skill.get, "SKILL");
    }
  }, {
    key: "skills",
    value: function(spec) {
      return this.arrayFromArg(spec, this.skill);
    }
  }, {
    key: "group",
    value: function(groupName, args3) {
      return {
        name: groupName,
        args: args3
      };
    }
  }, {
    key: "create",
    value: function(scriptName, scriptHelp, args3, options) {
      var _objectSpread22;
      _traverse(args3, function(keySpec, key) {
        if (key === "help" || keySpec.key === "help")
          throw "help is a reserved argument name";
      });
      var argsWithHelp = _objectSpread3(_objectSpread3({}, args3), {}, {
        help: this.flag({
          help: "Show this message and exit.",
          setting: ""
        })
      }), res = _objectSpread3(_objectSpread3({}, _loadDefaultValues(argsWithHelp)), {}, (_objectSpread22 = {}, _defineProperty8(_objectSpread22, specSymbol, argsWithHelp), _defineProperty8(_objectSpread22, scriptSymbol, scriptName), _defineProperty8(_objectSpread22, scriptHelpSymbol, scriptHelp), _defineProperty8(_objectSpread22, optionsSymbol, options != null ? options : {}), _objectSpread22)), metadata = Args2.getMetadata(res);
      if (metadata.traverseAndMaybeSet(res, function(keySpec, key) {
        var _a, _b, setting = (_a = keySpec.setting) !== null && _a !== void 0 ? _a : "".concat(scriptName, "_").concat((_b = keySpec.key) !== null && _b !== void 0 ? _b : key);
        if (setting !== "") {
          var value_str = get(setting, "");
          if (value_str !== "")
            return parseAndValidate(keySpec, "Setting ".concat(setting), value_str);
        }
      }), options != null && options.positionalArgs) {
        var keys = [];
        metadata.traverse(function(keySpec, key) {
          var _a;
          keys.push((_a = keySpec.key) !== null && _a !== void 0 ? _a : key);
        });
        var _iterator2 = _createForOfIteratorHelper6(options.positionalArgs), _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
            var arg = _step2.value;
            if (!keys.includes(arg))
              throw "Unknown key for positional arg: ".concat(arg);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
      return res;
    }
  }, {
    key: "fill",
    value: function(args3, command) {
      var _a;
      if (!(command === void 0 || command === "")) {
        var metadata = Args2.getMetadata(args3), keys = /* @__PURE__ */ new Set(), flags = /* @__PURE__ */ new Set();
        metadata.traverse(function(keySpec, key) {
          var _a2, name = (_a2 = keySpec.key) !== null && _a2 !== void 0 ? _a2 : key;
          if (flags.has(name) || keys.has(name))
            throw "Duplicate arg key ".concat(name, " is not allowed");
          keySpec.valueHelpName === "FLAG" ? flags.add(name) : keys.add(name);
        });
        var parsed = new CommandParser(command, keys, flags, (_a = metadata.options.positionalArgs) !== null && _a !== void 0 ? _a : []).parse();
        metadata.traverseAndMaybeSet(args3, function(keySpec, key) {
          var _a2, argKey = (_a2 = keySpec.key) !== null && _a2 !== void 0 ? _a2 : key, value_str = parsed.get(argKey);
          if (value_str !== void 0)
            return parseAndValidate(keySpec, "Argument ".concat(argKey), value_str);
        });
      }
    }
  }, {
    key: "parse",
    value: function(scriptName, scriptHelp, spec, command, options) {
      var args3 = this.create(scriptName, scriptHelp, spec, options);
      return this.fill(args3, command), args3;
    }
  }, {
    key: "showHelp",
    value: function(args3, maxOptionsToDisplay) {
      var _a, metadata = Args2.getMetadata(args3);
      (0, import_kolmafia18.printHtml)("".concat(metadata.scriptHelp)), (0, import_kolmafia18.printHtml)(""), (0, import_kolmafia18.printHtml)("<b>".concat((_a = metadata.options.defaultGroupName) !== null && _a !== void 0 ? _a : "Options", ":</b>")), metadata.traverse(function(arg, key) {
        var _a2, _b, _c, _d, _e;
        if (!arg.hidden) {
          var nameText = "<font color='blue'>".concat((_a2 = arg.key) !== null && _a2 !== void 0 ? _a2 : key, "</font>"), valueText = arg.valueHelpName === "FLAG" ? "" : "<font color='purple'>".concat(arg.valueHelpName, "</font>"), helpText = (_b = arg.help) !== null && _b !== void 0 ? _b : "", defaultText = "default" in arg ? "<font color='#888888'>[default: ".concat(arg.default, "]</font>") : "", settingText = arg.setting === "" ? "" : "<font color='#888888'>[setting: ".concat((_c = arg.setting) !== null && _c !== void 0 ? _c : "".concat(metadata.scriptName, "_").concat((_d = arg.key) !== null && _d !== void 0 ? _d : key), "]</font>");
          (0, import_kolmafia18.printHtml)("&nbsp;&nbsp;".concat([nameText, valueText, "-", helpText, defaultText, settingText].join(" ")));
          var valueOptions = (_e = arg.options) !== null && _e !== void 0 ? _e : [];
          if (valueOptions.length < (maxOptionsToDisplay != null ? maxOptionsToDisplay : Number.MAX_VALUE)) {
            var _iterator3 = _createForOfIteratorHelper6(valueOptions), _step3;
            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
                var option = _step3.value;
                option.length === 1 ? (0, import_kolmafia18.printHtml)("&nbsp;&nbsp;&nbsp;&nbsp;<font color='blue'>".concat(nameText, "</font> ").concat(option[0])) : (0, import_kolmafia18.printHtml)("&nbsp;&nbsp;&nbsp;&nbsp;<font color='blue'>".concat(nameText, "</font> ").concat(option[0], " - ").concat(option[1]));
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }
          }
        }
      }, function(group) {
        (0, import_kolmafia18.printHtml)(""), (0, import_kolmafia18.printHtml)("<b>".concat(group.name, ":</b>"));
      });
    }
  }, {
    key: "getMetadata",
    value: function(args3) {
      return new WrappedArgMetadata(args3);
    }
  }]), Args2;
}(), ParseError = /* @__PURE__ */ _createClass9(function ParseError2(message) {
  _classCallCheck9(this, ParseError2), this.message = message;
}), specSymbol = Symbol("spec"), scriptSymbol = Symbol("script"), scriptHelpSymbol = Symbol("scriptHelp"), optionsSymbol = Symbol("options");
function parseAndValidate(arg, source, value) {
  var parsed_value;
  try {
    parsed_value = arg.parser(value);
  } catch (_a) {
    parsed_value = void 0;
  }
  if (parsed_value === void 0)
    throw "".concat(source, " expected ").concat(arg.parser.name, "$ but could not parse ").concat(value);
  if (parsed_value instanceof ParseError)
    throw "".concat(source, " ").concat(parsed_value.message);
  return parsed_value;
}
var WrappedArgMetadata = /* @__PURE__ */ function() {
  function WrappedArgMetadata2(args3) {
    _classCallCheck9(this, WrappedArgMetadata2), this.spec = args3[specSymbol], this.scriptName = args3[scriptSymbol], this.scriptHelp = args3[scriptHelpSymbol], this.options = args3[optionsSymbol];
  }
  return _createClass9(WrappedArgMetadata2, [{
    key: "loadDefaultValues",
    value: function() {
      return _loadDefaultValues(this.spec);
    }
  }, {
    key: "traverseAndMaybeSet",
    value: function(result, setTo) {
      return _traverseAndMaybeSet(this.spec, result, setTo);
    }
  }, {
    key: "traverse",
    value: function(process, onGroup) {
      return _traverse(this.spec, process, onGroup);
    }
  }]), WrappedArgMetadata2;
}();
function _loadDefaultValues(spec) {
  var result = {};
  for (var k in spec) {
    var argSpec = spec[k];
    "args" in argSpec ? result[k] = _loadDefaultValues(argSpec.args) : "default" in argSpec ? result[k] = argSpec.default : result[k] = void 0;
  }
  return result;
}
function _traverseAndMaybeSet(spec, result, setTo) {
  var groups = [];
  for (var k in spec) {
    var argSpec = spec[k];
    if ("args" in argSpec)
      groups.push([argSpec, k]);
    else {
      var value = setTo(argSpec, k);
      if (value === void 0)
        continue;
      result[k] = value;
    }
  }
  for (var _i = 0, _groups = groups; _i < _groups.length; _i++) {
    var group_and_key = _groups[_i];
    _traverseAndMaybeSet(group_and_key[0].args, result[group_and_key[1]], setTo);
  }
}
function _traverse(spec, process, onGroup) {
  var groups = [];
  for (var k in spec) {
    var argSpec = spec[k];
    "args" in argSpec ? groups.push([argSpec, k]) : process(argSpec, k);
  }
  for (var _i2 = 0, _groups2 = groups; _i2 < _groups2.length; _i2++) {
    var group_and_key = _groups2[_i2];
    onGroup == null || onGroup(group_and_key[0], group_and_key[1]), _traverse(group_and_key[0].args, process, onGroup);
  }
}
var CommandParser = /* @__PURE__ */ function() {
  function CommandParser2(command, keys, flags, positionalArgs) {
    _classCallCheck9(this, CommandParser2), this.command = command, this.index = 0, this.keys = keys, this.flags = flags, this.positionalArgs = positionalArgs, this.positionalArgsParsed = 0;
  }
  return _createClass9(CommandParser2, [{
    key: "parse",
    value: function() {
      var _a, _b, _c, _d;
      this.index = 0;
      for (var result = /* @__PURE__ */ new Map(); !this.finished(); ) {
        var parsing_negative_flag = !1;
        this.peek() === "!" && (parsing_negative_flag = !0, this.consume(["!"]));
        var startIndex = this.index, key = this.parseKey();
        if (result.has(key))
          throw "Duplicate key ".concat(key, " (first set to ").concat((_a = result.get(key)) !== null && _a !== void 0 ? _a : "", ")");
        if (this.flags.has(key)) {
          if (result.set(key, parsing_negative_flag ? "false" : "true"), this.peek() === "=")
            throw "Flag ".concat(key, " cannot be assigned a value");
          this.finished() || this.consume([" "]), this.prevUnquotedKey = void 0;
        } else if (this.keys.has(key)) {
          this.consume(["=", " "]);
          var value = this.parseValue();
          ["'", '"'].includes((_b = this.prev()) !== null && _b !== void 0 ? _b : "") ? this.prevUnquotedKey = void 0 : this.prevUnquotedKey = key, this.finished() || this.consume([" "]), result.set(key, value);
        } else if (this.positionalArgsParsed < this.positionalArgs.length && this.peek() !== "=") {
          var positionalKey = this.positionalArgs[this.positionalArgsParsed];
          this.positionalArgsParsed++, this.index = startIndex;
          var _value = this.parseValue();
          if (["'", '"'].includes((_c = this.prev()) !== null && _c !== void 0 ? _c : "") ? this.prevUnquotedKey = void 0 : this.prevUnquotedKey = key, this.finished() || this.consume([" "]), result.has(positionalKey))
            throw "Cannot assign ".concat(_value, " to ").concat(positionalKey, " (positionally) since ").concat(positionalKey, " was already set to ").concat((_d = result.get(positionalKey)) !== null && _d !== void 0 ? _d : "");
          result.set(positionalKey, _value);
        } else
          throw this.prevUnquotedKey && this.peek() !== "=" ? "Unknown argument: ".concat(key, " (if this should have been parsed as part of ").concat(this.prevUnquotedKey, ", you should surround the entire value in quotes)") : "Unknown argument: ".concat(key);
      }
      return result;
    }
  }, {
    key: "finished",
    value: function() {
      return this.index >= this.command.length;
    }
  }, {
    key: "peek",
    value: function() {
      if (!(this.index >= this.command.length))
        return this.command.charAt(this.index);
    }
  }, {
    key: "prev",
    value: function() {
      if (!(this.index <= 0) && !(this.index >= this.command.length + 1))
        return this.command.charAt(this.index - 1);
    }
  }, {
    key: "consume",
    value: function(allowed) {
      var _a;
      if (this.finished())
        throw "Expected ".concat(allowed);
      allowed.includes((_a = this.peek()) !== null && _a !== void 0 ? _a : "") && (this.index += 1);
    }
  }, {
    key: "findNext",
    value: function(searchValue) {
      var result = this.command.length, _iterator4 = _createForOfIteratorHelper6(searchValue), _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done; ) {
          var value = _step4.value, index = this.command.indexOf(value, this.index);
          index !== -1 && index < result && (result = index);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
      return result;
    }
  }, {
    key: "parseKey",
    value: function() {
      var keyEnd = this.findNext(["=", " "]), key = this.command.substring(this.index, keyEnd);
      return this.index = keyEnd, key;
    }
  }, {
    key: "parseValue",
    value: function() {
      var _a, _b, valueEnder = " ", quotes = ["'", '"'];
      quotes.includes((_a = this.peek()) !== null && _a !== void 0 ? _a : "") && (valueEnder = (_b = this.peek()) !== null && _b !== void 0 ? _b : "", this.consume([valueEnder]));
      var valueEnd = this.findNext([valueEnder]), value = this.command.substring(this.index, valueEnd);
      if (valueEnder !== " " && valueEnd === this.command.length)
        throw "No closing ".concat(valueEnder, " found for ").concat(valueEnder).concat(value);
      return this.index = valueEnd, valueEnder !== " " && this.consume([valueEnder]), value;
    }
  }]), CommandParser2;
}();

// node_modules/grimoire-kolmafia/dist/combat.js
init_kolmafia_polyfill();
var import_kolmafia19 = require("kolmafia");
function _inherits4(subClass, superClass) {
  if (typeof superClass != "function" && superClass !== null)
    throw new TypeError("Super expression must either be null or a function");
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: !0, configurable: !0 } }), Object.defineProperty(subClass, "prototype", { writable: !1 }), superClass && _setPrototypeOf4(subClass, superClass);
}
function _setPrototypeOf4(o, p) {
  return _setPrototypeOf4 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(o2, p2) {
    return o2.__proto__ = p2, o2;
  }, _setPrototypeOf4(o, p);
}
function _createSuper4(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct4();
  return function() {
    var Super = _getPrototypeOf4(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf4(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else
      result = Super.apply(this, arguments);
    return _possibleConstructorReturn4(this, result);
  };
}
function _possibleConstructorReturn4(self2, call) {
  if (call && (typeof call == "object" || typeof call == "function"))
    return call;
  if (call !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized4(self2);
}
function _assertThisInitialized4(self2) {
  if (self2 === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return self2;
}
function _isNativeReflectConstruct4() {
  if (typeof Reflect == "undefined" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch (e) {
    return !1;
  }
}
function _getPrototypeOf4(o) {
  return _getPrototypeOf4 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  }, _getPrototypeOf4(o);
}
function _toConsumableArray9(arr) {
  return _arrayWithoutHoles9(arr) || _iterableToArray9(arr) || _unsupportedIterableToArray13(arr) || _nonIterableSpread9();
}
function _nonIterableSpread9() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray9(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles9(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray13(arr);
}
function _createForOfIteratorHelper7(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray13(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e) {
        throw _e;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e2) {
    didErr = !0, err = _e2;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _unsupportedIterableToArray13(o, minLen) {
  if (!!o) {
    if (typeof o == "string")
      return _arrayLikeToArray13(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray13(o, minLen);
  }
}
function _arrayLikeToArray13(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _classCallCheck10(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties10(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass10(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties10(Constructor.prototype, protoProps), staticProps && _defineProperties10(Constructor, staticProps), Object.defineProperty(Constructor, "prototype", { writable: !1 }), Constructor;
}
function undelay(macro) {
  return macro instanceof Macro ? macro : macro();
}
var CombatStrategy = /* @__PURE__ */ function() {
  function CombatStrategy2() {
    _classCallCheck10(this, CombatStrategy2), this.macros = /* @__PURE__ */ new Map(), this.autoattacks = /* @__PURE__ */ new Map(), this.actions = /* @__PURE__ */ new Map(), this.ccs_entries = /* @__PURE__ */ new Map();
  }
  return _createClass10(CombatStrategy2, [{
    key: "macro",
    value: function(_macro, monsters, prepend) {
      var _a, _b;
      if (monsters === void 0)
        this.default_macro === void 0 && (this.default_macro = []), prepend ? this.default_macro.unshift(_macro) : this.default_macro.push(_macro);
      else {
        monsters instanceof import_kolmafia19.Monster && (monsters = [monsters]);
        var _iterator = _createForOfIteratorHelper7(monsters), _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var monster = _step.value;
            this.macros.has(monster) || this.macros.set(monster, []), prepend ? (_a = this.macros.get(monster)) === null || _a === void 0 || _a.unshift(_macro) : (_b = this.macros.get(monster)) === null || _b === void 0 || _b.push(_macro);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
      return this;
    }
  }, {
    key: "autoattack",
    value: function(macro, monsters, prepend) {
      var _a, _b;
      if (monsters === void 0)
        this.default_autoattack === void 0 && (this.default_autoattack = []), prepend ? this.default_autoattack.unshift(macro) : this.default_autoattack.push(macro);
      else {
        monsters instanceof import_kolmafia19.Monster && (monsters = [monsters]);
        var _iterator2 = _createForOfIteratorHelper7(monsters), _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
            var monster = _step2.value;
            this.autoattacks.has(monster) || this.autoattacks.set(monster, []), prepend ? (_a = this.autoattacks.get(monster)) === null || _a === void 0 || _a.unshift(macro) : (_b = this.autoattacks.get(monster)) === null || _b === void 0 || _b.push(macro);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
      return this;
    }
  }, {
    key: "startingMacro",
    value: function(macro, prepend) {
      return this.starting_macro === void 0 && (this.starting_macro = []), prepend ? this.starting_macro.unshift(macro) : this.starting_macro.push(macro), this;
    }
  }, {
    key: "action",
    value: function(_action, monsters) {
      if (monsters === void 0)
        this.default_action = _action;
      else if (monsters instanceof import_kolmafia19.Monster)
        this.actions.set(monsters, _action);
      else {
        var _iterator3 = _createForOfIteratorHelper7(monsters), _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
            var monster = _step3.value;
            this.actions.set(monster, _action);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }
      return this;
    }
  }, {
    key: "ccs",
    value: function(entry, monsters, prepend) {
      var _a, _b;
      monsters instanceof import_kolmafia19.Monster && (monsters = [monsters]);
      var _iterator4 = _createForOfIteratorHelper7(monsters), _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done; ) {
          var monster = _step4.value;
          this.ccs_entries.has(monster) || this.ccs_entries.set(monster, []), prepend ? (_a = this.ccs_entries.get(monster)) === null || _a === void 0 || _a.unshift(entry) : (_b = this.ccs_entries.get(monster)) === null || _b === void 0 || _b.push(entry);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
      return this;
    }
  }, {
    key: "can",
    value: function(action) {
      return action === this.default_action ? !0 : Array.from(this.actions.values()).includes(action);
    }
  }, {
    key: "getDefaultAction",
    value: function() {
      return this.default_action;
    }
  }, {
    key: "where",
    value: function(action) {
      var _this = this;
      return Array.from(this.actions.keys()).filter(function(key) {
        return _this.actions.get(key) === action;
      });
    }
  }, {
    key: "currentStrategy",
    value: function(monster) {
      var _a;
      return (_a = this.actions.get(monster)) !== null && _a !== void 0 ? _a : this.default_action;
    }
  }, {
    key: "clone",
    value: function() {
      var result = new CombatStrategy2();
      this.starting_macro && (result.starting_macro = _toConsumableArray9(this.starting_macro)), this.default_macro && (result.default_macro = _toConsumableArray9(this.default_macro));
      var _iterator5 = _createForOfIteratorHelper7(this.macros), _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done; ) {
          var pair = _step5.value;
          result.macros.set(pair[0], _toConsumableArray9(pair[1]));
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
      this.default_autoattack && (result.default_autoattack = _toConsumableArray9(this.default_autoattack));
      var _iterator6 = _createForOfIteratorHelper7(this.autoattacks), _step6;
      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done; ) {
          var _pair = _step6.value;
          result.autoattacks.set(_pair[0], _toConsumableArray9(_pair[1]));
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
      result.default_action = this.default_action;
      var _iterator7 = _createForOfIteratorHelper7(this.actions), _step7;
      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done; ) {
          var _pair2 = _step7.value;
          result.actions.set(_pair2[0], _pair2[1]);
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }
      var _iterator8 = _createForOfIteratorHelper7(this.ccs_entries), _step8;
      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done; ) {
          var _pair3 = _step8.value;
          result.ccs_entries.set(_pair3[0], _toConsumableArray9(_pair3[1]));
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }
      return result;
    }
  }, {
    key: "compile",
    value: function(resources, defaults, location2) {
      var _a, _b, result = new Macro();
      this.starting_macro && result.step.apply(result, _toConsumableArray9(this.starting_macro.map(undelay)));
      var monster_macros = new CompressedMacro();
      this.macros.forEach(function(value, key) {
        var _Macro;
        monster_macros.add(key, (_Macro = new Macro()).step.apply(_Macro, _toConsumableArray9(value.map(undelay))));
      }), result.step(monster_macros.compile()), this.default_macro && result.step.apply(result, _toConsumableArray9(this.default_macro.map(undelay)));
      var monster_actions = new CompressedMacro();
      if (this.actions.forEach(function(action, key) {
        var _a2, _b2, macro2 = (_a2 = resources.getMacro(action)) !== null && _a2 !== void 0 ? _a2 : (_b2 = defaults == null ? void 0 : defaults[action]) === null || _b2 === void 0 ? void 0 : _b2.call(defaults, key);
        macro2 && monster_actions.add(key, new Macro().step(macro2));
      }), result.step(monster_actions.compile()), this.default_action) {
        var macro = (_a = resources.getMacro(this.default_action)) !== null && _a !== void 0 ? _a : (_b = defaults == null ? void 0 : defaults[this.default_action]) === null || _b === void 0 ? void 0 : _b.call(defaults, location2);
        macro && result.step(macro);
      }
      return result;
    }
  }, {
    key: "compileAutoattack",
    value: function() {
      var result = new Macro(), monster_macros = new CompressedMacro();
      return this.autoattacks.forEach(function(value, key) {
        var _Macro2;
        monster_macros.add(key, (_Macro2 = new Macro()).step.apply(_Macro2, _toConsumableArray9(value.map(undelay))));
      }), result.step(monster_macros.compile()), this.default_autoattack && result.step.apply(result, _toConsumableArray9(this.default_autoattack.map(undelay))), result;
    }
  }, {
    key: "compileCcs",
    value: function() {
      var result = [], _iterator9 = _createForOfIteratorHelper7(this.ccs_entries), _step9;
      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done; ) {
          var ccs_entry = _step9.value;
          result.push.apply(result, ["[".concat(ccs_entry[0].name, "]")].concat(_toConsumableArray9(ccs_entry[1])));
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }
      return result;
    }
  }], [{
    key: "withActions",
    value: function(actions) {
      var CombatStrategyWithActions = /* @__PURE__ */ function(_this) {
        _inherits4(CombatStrategyWithActions2, _this);
        var _super = _createSuper4(CombatStrategyWithActions2);
        function CombatStrategyWithActions2() {
          return _classCallCheck10(this, CombatStrategyWithActions2), _super.apply(this, arguments);
        }
        return _createClass10(CombatStrategyWithActions2);
      }(this), proto = CombatStrategyWithActions.prototype, _iterator10 = _createForOfIteratorHelper7(actions), _step10;
      try {
        var _loop = function() {
          var action = _step10.value;
          proto[action] = function(monsters) {
            return this.action(action, monsters);
          };
        };
        for (_iterator10.s(); !(_step10 = _iterator10.n()).done; )
          _loop();
      } catch (err) {
        _iterator10.e(err);
      } finally {
        _iterator10.f();
      }
      return CombatStrategyWithActions;
    }
  }]), CombatStrategy2;
}(), CompressedMacro = /* @__PURE__ */ function() {
  function CompressedMacro2() {
    _classCallCheck10(this, CompressedMacro2), this.components = /* @__PURE__ */ new Map();
  }
  return _createClass10(CompressedMacro2, [{
    key: "add",
    value: function(monster, macro) {
      var _a, macro_text = macro.toString();
      macro_text.length !== 0 && (this.components.has(macro_text) ? (_a = this.components.get(macro_text)) === null || _a === void 0 || _a.push(monster) : this.components.set(macro_text, [monster]));
    }
  }, {
    key: "compile",
    value: function() {
      var result = new Macro();
      return this.components.forEach(function(monsters, macro) {
        var condition = monsters.map(function(mon) {
          return "monsterid ".concat(mon.id);
        }).join(" || ");
        result.if_(condition, macro);
      }), result;
    }
  }]), CompressedMacro2;
}(), CombatResources = /* @__PURE__ */ function() {
  function CombatResources2() {
    _classCallCheck10(this, CombatResources2), this.resources = /* @__PURE__ */ new Map();
  }
  return _createClass10(CombatResources2, [{
    key: "provide",
    value: function(action, resource) {
      resource !== void 0 && this.resources.set(action, resource);
    }
  }, {
    key: "has",
    value: function(action) {
      return this.resources.has(action);
    }
  }, {
    key: "all",
    value: function() {
      return Array.from(this.resources.values());
    }
  }, {
    key: "getMacro",
    value: function(action) {
      var resource = this.resources.get(action);
      if (resource !== void 0)
        return resource.do instanceof import_kolmafia19.Item ? new Macro().item(resource.do) : resource.do instanceof import_kolmafia19.Skill ? new Macro().skill(resource.do) : resource.do;
    }
  }]), CombatResources2;
}();

// node_modules/grimoire-kolmafia/dist/engine.js
init_kolmafia_polyfill();
var import_kolmafia21 = require("kolmafia");

// node_modules/grimoire-kolmafia/dist/outfit.js
init_kolmafia_polyfill();
var import_kolmafia20 = require("kolmafia");
var _templateObject118, _templateObject221, _templateObject318, _templateObject416, _templateObject514, _templateObject614, _templateObject714, _templateObject814, _templateObject914, _templateObject1012, _templateObject119, _templateObject128, _templateObject138, _templateObject148, _templateObject158, _templateObject167, _templateObject177, _templateObject187, _templateObject197, _templateObject207, _templateObject2111, _templateObject227, _templateObject237, _templateObject247, _templateObject257, _templateObject267, _templateObject277, _templateObject286, _templateObject296, _templateObject306;
function ownKeys4(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread4(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    i % 2 ? ownKeys4(Object(source), !0).forEach(function(key) {
      _defineProperty9(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys4(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty9(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
function _createForOfIteratorHelper8(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray14(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e) {
        throw _e;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e2) {
    didErr = !0, err = _e2;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _taggedTemplateLiteral10(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
function _toConsumableArray10(arr) {
  return _arrayWithoutHoles10(arr) || _iterableToArray10(arr) || _unsupportedIterableToArray14(arr) || _nonIterableSpread10();
}
function _nonIterableSpread10() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray14(o, minLen) {
  if (!!o) {
    if (typeof o == "string")
      return _arrayLikeToArray14(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray14(o, minLen);
  }
}
function _iterableToArray10(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles10(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray14(arr);
}
function _arrayLikeToArray14(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _classCallCheck11(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties11(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass11(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties11(Constructor.prototype, protoProps), staticProps && _defineProperties11(Constructor, staticProps), Object.defineProperty(Constructor, "prototype", { writable: !1 }), Constructor;
}
var outfitSlots = ["hat", "back", "weapon", "offhand", "shirt", "pants", "acc1", "acc2", "acc3", "famequip"], weaponHands = function(i) {
  return i ? (0, import_kolmafia20.weaponHands)(i) : 0;
}, modeableCommands2 = ["backupcamera", "umbrella", "snowsuit", "edpiece", "retrocape", "parka"], Outfit = /* @__PURE__ */ function() {
  function Outfit2() {
    _classCallCheck11(this, Outfit2), this.equips = /* @__PURE__ */ new Map(), this.modes = {}, this.skipDefaults = !1, this.modifier = "", this.avoid = [];
  }
  return _createClass11(Outfit2, [{
    key: "equippedAmount",
    value: function(item5) {
      return _toConsumableArray10(this.equips.values()).filter(function(i) {
        return i === item5;
      }).length;
    }
  }, {
    key: "isAvailable",
    value: function(item5) {
      var _a;
      return !(!((_a = this.avoid) === null || _a === void 0) && _a.includes(item5) || !have(item5, this.equippedAmount(item5) + 1) || (0, import_kolmafia20.booleanModifier)(item5, "Single Equip") && this.equippedAmount(item5) > 0);
    }
  }, {
    key: "haveEquipped",
    value: function(item5, slot) {
      return slot === void 0 ? this.equippedAmount(item5) > 0 : this.equips.get(slot) === item5;
    }
  }, {
    key: "equipItemNone",
    value: function(item5, slot) {
      return item5 !== $item.none ? !1 : slot === void 0 ? !0 : this.equips.has(slot) ? !1 : (this.equips.set(slot, item5), !0);
    }
  }, {
    key: "equipNonAccessory",
    value: function(item5, slot) {
      if ($slots(_templateObject118 || (_templateObject118 = _taggedTemplateLiteral10(["acc1, acc2, acc3"]))).includes((0, import_kolmafia20.toSlot)(item5)) || slot !== void 0 && slot !== (0, import_kolmafia20.toSlot)(item5) || this.equips.has((0, import_kolmafia20.toSlot)(item5)))
        return !1;
      switch ((0, import_kolmafia20.toSlot)(item5)) {
        case $slot(_templateObject221 || (_templateObject221 = _taggedTemplateLiteral10(["off-hand"]))):
          if (this.equips.has($slot(_templateObject318 || (_templateObject318 = _taggedTemplateLiteral10(["weapon"])))) && weaponHands(this.equips.get($slot(_templateObject416 || (_templateObject416 = _taggedTemplateLiteral10(["weapon"]))))) !== 1)
            return !1;
          break;
        case $slot(_templateObject514 || (_templateObject514 = _taggedTemplateLiteral10(["familiar"]))):
          if (this.familiar !== void 0 && !(0, import_kolmafia20.canEquip)(this.familiar, item5))
            return !1;
      }
      return (0, import_kolmafia20.toSlot)(item5) !== $slot(_templateObject614 || (_templateObject614 = _taggedTemplateLiteral10(["familiar"]))) && !(0, import_kolmafia20.canEquip)(item5) ? !1 : (this.equips.set((0, import_kolmafia20.toSlot)(item5), item5), !0);
    }
  }, {
    key: "equipAccessory",
    value: function(item5, slot) {
      var _this = this;
      if (![void 0].concat(_toConsumableArray10($slots(_templateObject714 || (_templateObject714 = _taggedTemplateLiteral10(["acc1, acc2, acc3"]))))).includes(slot) || (0, import_kolmafia20.toSlot)(item5) !== $slot(_templateObject814 || (_templateObject814 = _taggedTemplateLiteral10(["acc1"]))) || !(0, import_kolmafia20.canEquip)(item5))
        return !1;
      if (slot === void 0) {
        var empty = $slots(_templateObject914 || (_templateObject914 = _taggedTemplateLiteral10(["acc1, acc2, acc3"]))).find(function(s) {
          return !_this.equips.has(s);
        });
        if (empty === void 0)
          return !1;
        this.equips.set(empty, item5);
      } else {
        if (this.equips.has(slot))
          return !1;
        this.equips.set(slot, item5);
      }
      return !0;
    }
  }, {
    key: "equipUsingDualWield",
    value: function(item5, slot) {
      return ![void 0, $slot(_templateObject1012 || (_templateObject1012 = _taggedTemplateLiteral10(["off-hand"])))].includes(slot) || (0, import_kolmafia20.toSlot)(item5) !== $slot(_templateObject119 || (_templateObject119 = _taggedTemplateLiteral10(["weapon"]))) || this.equips.has($slot(_templateObject128 || (_templateObject128 = _taggedTemplateLiteral10(["weapon"])))) && weaponHands(this.equips.get($slot(_templateObject138 || (_templateObject138 = _taggedTemplateLiteral10(["weapon"]))))) !== 1 || this.equips.has($slot(_templateObject148 || (_templateObject148 = _taggedTemplateLiteral10(["off-hand"])))) || !have($skill(_templateObject158 || (_templateObject158 = _taggedTemplateLiteral10(["Double-Fisted Skull Smashing"])))) || weaponHands(item5) !== 1 || !(0, import_kolmafia20.canEquip)(item5) ? !1 : (this.equips.set($slot(_templateObject167 || (_templateObject167 = _taggedTemplateLiteral10(["off-hand"]))), item5), !0);
    }
  }, {
    key: "getHoldingFamiliar",
    value: function(item5) {
      switch ((0, import_kolmafia20.toSlot)(item5)) {
        case $slot(_templateObject177 || (_templateObject177 = _taggedTemplateLiteral10(["weapon"]))):
          return $familiar(_templateObject187 || (_templateObject187 = _taggedTemplateLiteral10(["Disembodied Hand"])));
        case $slot(_templateObject197 || (_templateObject197 = _taggedTemplateLiteral10(["off-hand"]))):
          return $familiar(_templateObject207 || (_templateObject207 = _taggedTemplateLiteral10(["Left-Hand Man"])));
        default:
          return;
      }
    }
  }, {
    key: "equipUsingFamiliar",
    value: function(item5, slot) {
      if (![void 0, $slot(_templateObject2111 || (_templateObject2111 = _taggedTemplateLiteral10(["familiar"])))].includes(slot) || this.equips.has($slot(_templateObject227 || (_templateObject227 = _taggedTemplateLiteral10(["familiar"])))) || (0, import_kolmafia20.booleanModifier)(item5, "Single Equip"))
        return !1;
      var familiar3 = this.getHoldingFamiliar(item5);
      return familiar3 === void 0 || !this.equip(familiar3) ? !1 : (this.equips.set($slot(_templateObject237 || (_templateObject237 = _taggedTemplateLiteral10(["familiar"]))), item5), !0);
    }
  }, {
    key: "equipItem",
    value: function(item5, slot) {
      return this.haveEquipped(item5, slot) || this.equipItemNone(item5, slot) || this.isAvailable(item5) && (this.equipNonAccessory(item5, slot) || this.equipAccessory(item5, slot) || this.equipUsingDualWield(item5, slot) || this.equipUsingFamiliar(item5, slot));
    }
  }, {
    key: "equipFamiliar",
    value: function(familiar3) {
      if (familiar3 === this.familiar)
        return !0;
      if (this.familiar !== void 0 || familiar3 !== $familiar.none && !have(familiar3))
        return !1;
      var item5 = this.equips.get($slot(_templateObject247 || (_templateObject247 = _taggedTemplateLiteral10(["familiar"]))));
      return item5 !== void 0 && item5 !== $item.none && !(0, import_kolmafia20.canEquip)(familiar3, item5) ? !1 : (this.familiar = familiar3, !0);
    }
  }, {
    key: "equipSpec",
    value: function(spec) {
      var _this$avoid, _a, _b, _c, _d, succeeded = !0, _iterator = _createForOfIteratorHelper8(outfitSlots), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var slotName = _step.value, slot = (_a = (/* @__PURE__ */ new Map([["famequip", $slot(_templateObject257 || (_templateObject257 = _taggedTemplateLiteral10(["familiar"])))], ["offhand", $slot(_templateObject267 || (_templateObject267 = _taggedTemplateLiteral10(["off-hand"])))]])).get(slotName)) !== null && _a !== void 0 ? _a : (0, import_kolmafia20.toSlot)(slotName), itemOrItems = spec[slotName];
          itemOrItems !== void 0 && !this.equip(itemOrItems, slot) && (succeeded = !1);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      var _iterator2 = _createForOfIteratorHelper8((_b = spec == null ? void 0 : spec.equip) !== null && _b !== void 0 ? _b : []), _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
          var item5 = _step2.value;
          this.equip(item5) || (succeeded = !1);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return (spec == null ? void 0 : spec.familiar) !== void 0 && (this.equip(spec.familiar) || (succeeded = !1)), (_this$avoid = this.avoid).push.apply(_this$avoid, _toConsumableArray10((_c = spec == null ? void 0 : spec.avoid) !== null && _c !== void 0 ? _c : [])), this.skipDefaults = this.skipDefaults || ((_d = spec.skipDefaults) !== null && _d !== void 0 ? _d : !1), spec.modifier && (this.modifier = this.modifier + (this.modifier ? ", " : "") + spec.modifier), spec.modes && (this.setModes(spec.modes) || (succeeded = !1)), succeeded;
    }
  }, {
    key: "equipFirst",
    value: function(things, slot) {
      var _this = this;
      return things.some(function(val) {
        return _this.equip(val, slot);
      });
    }
  }, {
    key: "equip",
    value: function(thing, slot) {
      var _this = this;
      return Array.isArray(thing) ? slot !== void 0 ? this.equipFirst(thing, slot) : thing.every(function(val) {
        return _this.equip(val);
      }) : thing instanceof import_kolmafia20.Item ? this.equipItem(thing, slot) : thing instanceof import_kolmafia20.Familiar ? this.equipFamiliar(thing) : thing instanceof Outfit2 ? this.equipSpec(thing.spec()) : this.equipSpec(thing);
    }
  }, {
    key: "setModes",
    value: function(modes) {
      var _a, _b, compatible = !0, _iterator3 = _createForOfIteratorHelper8(modeableCommands2), _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
          var mode = _step3.value;
          mode !== "retrocape" && this.modes[mode] && modes[mode] && this.modes[mode] !== modes[mode] && (compatible = !1);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      return this.modes.retrocape && modes.retrocape && (this.modes.retrocape[0] && modes.retrocape[0] && this.modes.retrocape[0] !== modes.retrocape[0] && (compatible = !1), this.modes.retrocape[1] && modes.retrocape[1] && this.modes.retrocape[1] !== modes.retrocape[1] && (compatible = !1), this.modes.retrocape[0] = (_a = this.modes.retrocape[0]) !== null && _a !== void 0 ? _a : modes.retrocape[0], this.modes.retrocape[1] = (_b = this.modes.retrocape[1]) !== null && _b !== void 0 ? _b : modes.retrocape[1]), this.modes = _objectSpread4(_objectSpread4({}, modes), this.modes), compatible;
    }
  }, {
    key: "canEquip",
    value: function(thing, slot) {
      var outfit2 = this.clone();
      return outfit2.equip(thing, slot);
    }
  }, {
    key: "dress",
    value: function(extraOptions) {
      var _this = this;
      this.familiar && (0, import_kolmafia20.useFamiliar)(this.familiar);
      var targetEquipment = Array.from(this.equips.values()), usedSlots = /* @__PURE__ */ new Set(), nonaccessorySlots = $slots(_templateObject277 || (_templateObject277 = _taggedTemplateLiteral10(["weapon, off-hand, hat, back, shirt, pants, familiar, buddy-bjorn, crown-of-thrones"]))), _iterator4 = _createForOfIteratorHelper8(nonaccessorySlots), _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done; ) {
          var slot = _step4.value;
          (targetEquipment.includes((0, import_kolmafia20.equippedItem)(slot)) && this.equips.get(slot) !== (0, import_kolmafia20.equippedItem)(slot) || this.avoid.includes((0, import_kolmafia20.equippedItem)(slot))) && (0, import_kolmafia20.equip)(slot, $item.none);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
      var _iterator5 = _createForOfIteratorHelper8(nonaccessorySlots), _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done; ) {
          var _slot = _step5.value, equipment = this.equips.get(_slot);
          equipment && ((0, import_kolmafia20.equip)(_slot, equipment), usedSlots.add(_slot));
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
      var accessorySlots = $slots(_templateObject286 || (_templateObject286 = _taggedTemplateLiteral10(["acc1, acc2, acc3"]))), accessoryEquips = accessorySlots.map(function(slot2) {
        return _this.equips.get(slot2);
      }).filter(function(item5) {
        return item5 !== void 0;
      }), missingAccessories = [], _iterator6 = _createForOfIteratorHelper8(accessoryEquips), _step6;
      try {
        var _loop = function() {
          var accessory2 = _step6.value, alreadyEquipped = accessorySlots.find(function(slot2) {
            return !usedSlots.has(slot2) && (0, import_kolmafia20.equippedItem)(slot2) === accessory2;
          });
          alreadyEquipped ? usedSlots.add(alreadyEquipped) : missingAccessories.push(accessory2);
        };
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done; )
          _loop();
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
      for (var _i = 0, _missingAccessories = missingAccessories; _i < _missingAccessories.length; _i++) {
        var accessory = _missingAccessories[_i], unusedSlot = accessorySlots.find(function(slot2) {
          return !usedSlots.has(slot2);
        });
        if (unusedSlot === void 0)
          throw "No accessory slots remaining";
        (0, import_kolmafia20.equip)(unusedSlot, accessory), usedSlots.add(unusedSlot);
      }
      var modes = convertToLibramModes(this.modes);
      if (this.modifier) {
        var allRequirements = [new Requirement([this.modifier], {
          preventSlot: _toConsumableArray10(usedSlots),
          preventEquip: this.avoid,
          modes: modes
        })];
        if (extraOptions && allRequirements.push(new Requirement([], extraOptions)), !Requirement.merge(allRequirements).maximize())
          throw "Unable to maximize ".concat(this.modifier);
        (0, import_kolmafia20.logprint)("Maximize: ".concat(this.modifier));
      }
      if (applyModes(modes), this.familiar !== void 0 && (0, import_kolmafia20.myFamiliar)() !== this.familiar)
        throw "Failed to fully dress (expected: familiar ".concat(this.familiar, ")");
      var _iterator7 = _createForOfIteratorHelper8(nonaccessorySlots), _step7;
      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done; ) {
          var _slot2 = _step7.value;
          if (this.equips.has(_slot2) && (0, import_kolmafia20.equippedItem)(_slot2) !== this.equips.get(_slot2))
            throw "Failed to fully dress (expected: ".concat(_slot2, " ").concat(this.equips.get(_slot2), ")");
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }
      var _iterator8 = _createForOfIteratorHelper8(accessoryEquips), _step8;
      try {
        var _loop2 = function() {
          var accessory2 = _step8.value;
          if ((0, import_kolmafia20.equippedAmount)(accessory2) < accessoryEquips.filter(function(acc) {
            return acc === accessory2;
          }).length)
            throw "Failed to fully dress (expected: acc ".concat(accessory2, ")");
        };
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done; )
          _loop2();
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }
    }
  }, {
    key: "clone",
    value: function() {
      var result = new Outfit2();
      return result.equips = new Map(this.equips), result.skipDefaults = this.skipDefaults, result.familiar = this.familiar, result.modifier = this.modifier, result.avoid = _toConsumableArray10(this.avoid), result.modes = _objectSpread4({}, this.modes), result;
    }
  }, {
    key: "spec",
    value: function() {
      var _a, result = {
        modifier: this.modifier,
        familiar: this.familiar,
        avoid: _toConsumableArray10(this.avoid),
        skipDefaults: this.skipDefaults,
        modes: _objectSpread4({}, this.modes)
      }, _iterator9 = _createForOfIteratorHelper8(outfitSlots), _step9;
      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done; ) {
          var slotName = _step9.value;
          result[slotName] = this.equips.get((_a = (/* @__PURE__ */ new Map([["famequip", $slot(_templateObject296 || (_templateObject296 = _taggedTemplateLiteral10(["familiar"])))], ["offhand", $slot(_templateObject306 || (_templateObject306 = _taggedTemplateLiteral10(["off-hand"])))]])).get(slotName)) !== null && _a !== void 0 ? _a : (0, import_kolmafia20.toSlot)(slotName));
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }
      return result;
    }
  }]), Outfit2;
}();
function convertToLibramModes(modes) {
  var _a;
  return {
    backupcamera: modes.backupcamera,
    umbrella: modes.umbrella,
    snowsuit: modes.snowsuit,
    edpiece: modes.edpiece,
    retrocape: (_a = modes.retrocape) === null || _a === void 0 ? void 0 : _a.filter(function(s) {
      return s !== void 0;
    }).join(" "),
    parka: modes.parka
  };
}

// node_modules/grimoire-kolmafia/dist/engine.js
var _templateObject120;
function _taggedTemplateLiteral11(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
function _toConsumableArray11(arr) {
  return _arrayWithoutHoles11(arr) || _iterableToArray11(arr) || _unsupportedIterableToArray15(arr) || _nonIterableSpread11();
}
function _nonIterableSpread11() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray11(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles11(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray15(arr);
}
function _createForOfIteratorHelper9(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray15(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e2) {
        throw _e2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e3) {
    didErr = !0, err = _e3;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _unsupportedIterableToArray15(o, minLen) {
  if (!!o) {
    if (typeof o == "string")
      return _arrayLikeToArray15(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray15(o, minLen);
  }
}
function _arrayLikeToArray15(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _defineProperties12(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass12(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties12(Constructor.prototype, protoProps), staticProps && _defineProperties12(Constructor, staticProps), Object.defineProperty(Constructor, "prototype", { writable: !1 }), Constructor;
}
function _classCallCheck12(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
var grimoireCCS = "grimoire_macro", Engine = /* @__PURE__ */ function() {
  function Engine2(tasks, options) {
    _classCallCheck12(this, Engine2), this.attempts = {}, this.propertyManager = new PropertiesManager(), this.tasks_by_name = /* @__PURE__ */ new Map(), this.cachedCcsContents = "", this.tasks = tasks, this.options = options != null ? options : {};
    var _iterator = _createForOfIteratorHelper9(tasks), _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var task = _step.value;
        this.tasks_by_name.set(task.name, task);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    this.initPropertiesManager(this.propertyManager);
  }
  return _createClass12(Engine2, [{
    key: "getNextTask",
    value: function() {
      var _this = this;
      return this.tasks.find(function(task) {
        return _this.available(task);
      });
    }
  }, {
    key: "run",
    value: function(actions) {
      for (var i = 0; i < (actions != null ? actions : 1 / 0); i++) {
        var task = this.getNextTask();
        if (!task)
          return;
        this.execute(task);
      }
    }
  }, {
    key: "destruct",
    value: function() {
      this.propertyManager.resetAll(), (0, import_kolmafia21.setAutoAttack)(0);
    }
  }, {
    key: "available",
    value: function(task) {
      var _a, _iterator2 = _createForOfIteratorHelper9((_a = task.after) !== null && _a !== void 0 ? _a : []), _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
          var after = _step2.value, after_task = this.tasks_by_name.get(after);
          if (after_task === void 0)
            throw "Unknown task dependency ".concat(after, " on ").concat(task.name);
          if (!after_task.completed())
            return !1;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return !(task.ready && !task.ready() || task.completed());
    }
  }, {
    key: "execute",
    value: function(task) {
      var _a, _b, _c, _d, _e;
      (0, import_kolmafia21.print)(""), (0, import_kolmafia21.print)("Executing ".concat(task.name), "blue");
      var postcondition = (_b = (_a = task.limit) === null || _a === void 0 ? void 0 : _a.guard) === null || _b === void 0 ? void 0 : _b.call(_a);
      this.acquireItems(task), this.acquireEffects(task);
      var task_combat = (_d = (_c = task.combat) === null || _c === void 0 ? void 0 : _c.clone()) !== null && _d !== void 0 ? _d : new CombatStrategy(), outfit2 = this.createOutfit(task), task_resources = new CombatResources();
      this.customize(task, outfit2, task_combat, task_resources), this.dress(task, outfit2), this.setCombat(task, task_combat, task_resources), this.setChoices(task, this.propertyManager);
      var _iterator3 = _createForOfIteratorHelper9(task_resources.all()), _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
          var resource = _step3.value;
          (_e = resource.prepare) === null || _e === void 0 || _e.call(resource);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      for (this.prepare(task), this.do(task); this.shouldRepeatAdv(task); )
        _set("lastEncounter", ""), this.do(task);
      this.post(task), this.markAttempt(task), this.checkLimits(task, postcondition);
    }
  }, {
    key: "acquireItems",
    value: function(task) {
      var _a, acquire = task.acquire instanceof Function ? task.acquire() : task.acquire, _iterator4 = _createForOfIteratorHelper9(acquire || []), _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done; ) {
          var to_get = _step4.value, num_needed = (_a = to_get.num) !== null && _a !== void 0 ? _a : 1, num_have = (0, import_kolmafia21.itemAmount)(to_get.item) + (0, import_kolmafia21.equippedAmount)(to_get.item);
          if (!(num_needed <= num_have) && !(to_get.useful !== void 0 && !to_get.useful()) && (to_get.get ? to_get.get() : to_get.price !== void 0 ? (0, import_kolmafia21.buy)(to_get.item, num_needed - num_have, to_get.price) : Object.keys((0, import_kolmafia21.getRelated)(to_get.item, "fold")).length > 0 ? (0, import_kolmafia21.cliExecute)("fold ".concat(to_get.item)) : (0, import_kolmafia21.retrieveItem)(to_get.item, num_needed), (0, import_kolmafia21.itemAmount)(to_get.item) + (0, import_kolmafia21.equippedAmount)(to_get.item) < num_needed && !to_get.optional))
            throw "Task ".concat(task.name, " was unable to acquire ").concat(num_needed, " ").concat(to_get.item);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }
  }, {
    key: "acquireEffects",
    value: function(task) {
      var _a, effects = typeof task.effects == "function" ? task.effects() : (_a = task.effects) !== null && _a !== void 0 ? _a : [], songs = effects.filter(function(effect2) {
        return isSong(effect2);
      });
      if (songs.length > maxSongs())
        throw "Too many AT songs";
      for (var extraSongs = Object.keys((0, import_kolmafia21.myEffects)()).map(function(effectName) {
        return (0, import_kolmafia21.toEffect)(effectName);
      }).filter(function(effect2) {
        return isSong(effect2) && !songs.includes(effect2);
      }); songs.length + extraSongs.length > maxSongs(); ) {
        var toRemove = extraSongs.pop();
        if (toRemove === void 0)
          break;
        uneffect(toRemove);
      }
      var _iterator5 = _createForOfIteratorHelper9(effects), _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done; ) {
          var effect = _step5.value;
          ensureEffect(effect);
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
    }
  }, {
    key: "createOutfit",
    value: function(task) {
      var spec = typeof task.outfit == "function" ? task.outfit() : task.outfit;
      if (spec instanceof Outfit)
        return spec.clone();
      var outfit2 = new Outfit();
      if (spec !== void 0 && !outfit2.equip(spec))
        throw "Unable to equip all items for ".concat(task.name);
      return outfit2;
    }
  }, {
    key: "dress",
    value: function(task, outfit2) {
      task.do instanceof import_kolmafia21.Location && (0, import_kolmafia21.setLocation)(task.do), outfit2.dress();
    }
  }, {
    key: "customize",
    value: function(task, outfit2, combat, resources) {
    }
  }, {
    key: "setChoices",
    value: function(task, manager) {
      var choices2 = {};
      for (var choice_id_str in task.choices) {
        var choice_id = parseInt(choice_id_str), choice = task.choices[choice_id];
        typeof choice == "number" ? choices2[choice_id] = choice : choices2[choice_id] = choice();
      }
      manager.setChoices(choices2);
    }
  }, {
    key: "setCombat",
    value: function(task, task_combat, task_resources) {
      var _a, macro = task_combat.compile(task_resources, (_a = this.options) === null || _a === void 0 ? void 0 : _a.combat_defaults, task.do instanceof import_kolmafia21.Location ? task.do : void 0);
      if (macro.save(), !this.options.ccs) {
        var otherCCSEntries = task_combat.compileCcs(), ccsContents = ["[default]", '"'.concat(macro.toString(), '"')].concat(_toConsumableArray11(otherCCSEntries)).join("\n");
        (0, import_kolmafia21.logprint)("CCS: ".concat(ccsContents.replace("\n", "\\n "))), ccsContents !== this.cachedCcsContents && ((0, import_kolmafia21.writeCcs)(ccsContents, grimoireCCS), (0, import_kolmafia21.cliExecute)("ccs ".concat(grimoireCCS)), this.cachedCcsContents = ccsContents);
      }
      var autoattack = task_combat.compileAutoattack();
      autoattack.toString().length > 1 ? ((0, import_kolmafia21.logprint)("Autoattack macro: ".concat(autoattack.toString())), autoattack.setAutoAttack()) : (0, import_kolmafia21.setAutoAttack)(0);
    }
  }, {
    key: "prepare",
    value: function(task) {
      var _a;
      (_a = task.prepare) === null || _a === void 0 || _a.call(task);
    }
  }, {
    key: "do",
    value: function(task) {
      for (typeof task.do == "function" ? task.do() : (0, import_kolmafia21.adv1)(task.do, 0, ""), (0, import_kolmafia21.runCombat)(); (0, import_kolmafia21.inMultiFight)(); )
        (0, import_kolmafia21.runCombat)();
      (0, import_kolmafia21.choiceFollowsFight)() && (0, import_kolmafia21.runChoice)(-1);
    }
  }, {
    key: "shouldRepeatAdv",
    value: function(task) {
      return task.do instanceof import_kolmafia21.Location && lastEncounterWasWanderingNC();
    }
  }, {
    key: "post",
    value: function(task) {
      var _a;
      (_a = task.post) === null || _a === void 0 || _a.call(task);
    }
  }, {
    key: "markAttempt",
    value: function(task) {
      task.name in this.attempts || (this.attempts[task.name] = 0), this.attempts[task.name]++;
    }
  }, {
    key: "checkLimits",
    value: function(task, postcondition) {
      var _a;
      if (!!task.limit) {
        var failureMessage = task.limit.message ? " ".concat(task.limit.message) : "";
        if (!task.completed()) {
          if (task.limit.tries && this.attempts[task.name] >= task.limit.tries)
            throw "Task ".concat(task.name, " did not complete within ").concat(task.limit.tries, " attempts. Please check what went wrong.").concat(failureMessage);
          if (task.limit.soft && this.attempts[task.name] >= task.limit.soft)
            throw "Task ".concat(task.name, " did not complete within ").concat(task.limit.soft, " attempts. Please check what went wrong (you may just be unlucky).").concat(failureMessage);
          if (task.limit.turns && task.do instanceof import_kolmafia21.Location && task.do.turnsSpent >= task.limit.turns)
            throw "Task ".concat(task.name, " did not complete within ").concat(task.limit.turns, " turns. Please check what went wrong.").concat(failureMessage);
          if (task.limit.unready && ((_a = task.ready) === null || _a === void 0 ? void 0 : _a.call(task)))
            throw "Task ".concat(task.name, " is still ready, but it should not be. Please check what went wrong.").concat(failureMessage);
        }
        if (postcondition && !postcondition())
          throw "Task ".concat(task.name, " failed its guard. Please check what went wrong.").concat(failureMessage);
      }
    }
  }, {
    key: "initPropertiesManager",
    value: function(manager) {
      var _a;
      manager.set({
        logPreferenceChange: !0,
        logPreferenceChangeFilter: _toConsumableArray11(new Set([].concat(_toConsumableArray11(get("logPreferenceChangeFilter").split(",")), ["libram_savedMacro", "maximizerMRUList", "testudinalTeachings", "_lastCombatStarted"]))).sort().filter(function(a) {
          return a;
        }).join(","),
        battleAction: "custom combat script",
        autoSatisfyWithMall: !0,
        autoSatisfyWithNPCs: !0,
        autoSatisfyWithCoinmasters: !0,
        autoSatisfyWithStash: !1,
        dontStopForCounters: !0,
        maximizerFoldables: !0,
        hpAutoRecovery: "-0.05",
        hpAutoRecoveryTarget: "0.0",
        mpAutoRecovery: "-0.05",
        mpAutoRecoveryTarget: "0.0",
        afterAdventureScript: "",
        betweenBattleScript: "",
        choiceAdventureScript: "",
        familiarScript: "",
        currentMood: "apathetic",
        autoTuxedo: !0,
        autoPinkyRing: !0,
        autoGarish: !0,
        allowNonMoodBurning: !1,
        allowSummonBurning: !0,
        libramSkillsSoftcore: "none"
      }), this.options.ccs !== "" && (this.options.ccs === void 0 && (0, import_kolmafia21.readCcs)(grimoireCCS) === "" && (0, import_kolmafia21.writeCcs)("[ default ]\nabort", grimoireCCS), manager.set({
        customCombatScript: (_a = this.options.ccs) !== null && _a !== void 0 ? _a : grimoireCCS
      }));
    }
  }]), Engine2;
}();
function maxSongs() {
  return have($skill(_templateObject120 || (_templateObject120 = _taggedTemplateLiteral11(["Mariachi Memory"])))) ? 4 : 3;
}
var wanderingNCs = /* @__PURE__ */ new Set(["Wooof! Wooooooof!", "Playing Fetch*", "A Pound of Cure", "Aunts not Ants", "Bath Time", "Beware of Aligator", "Delicious Sprouts", "Hypnotic Master", "Lost and Found", "Poetic Justice", "Summer Days", "Teacher's Pet"]);
function lastEncounterWasWanderingNC() {
  return wanderingNCs.has(get("lastEncounter"));
}

// node_modules/grimoire-kolmafia/dist/route.js
init_kolmafia_polyfill();
function ownKeys5(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread5(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    i % 2 ? ownKeys5(Object(source), !0).forEach(function(key) {
      _defineProperty10(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys5(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty10(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
function _createForOfIteratorHelper10(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray16(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e) {
        throw _e;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e2) {
    didErr = !0, err = _e2;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _unsupportedIterableToArray16(o, minLen) {
  if (!!o) {
    if (typeof o == "string")
      return _arrayLikeToArray16(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray16(o, minLen);
  }
}
function _arrayLikeToArray16(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function getTasks(quests) {
  var implicitAfter = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, _a, _b, result = [], _iterator = _createForOfIteratorHelper10(quests), _step;
  try {
    var _loop = function() {
      var quest = _step.value, questCompleted = quest.completed, _iterator3 = _createForOfIteratorHelper10(quest.tasks), _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
          var _task2 = _step3.value, renamedTask = _objectSpread5({}, _task2);
          renamedTask.name = "".concat(quest.name, "/").concat(_task2.name), renamedTask.after = (_a = _task2.after) === null || _a === void 0 ? void 0 : _a.map(function(after2) {
            return after2.includes("/") ? after2 : "".concat(quest.name, "/").concat(after2);
          }), implicitAfter && _task2.after === void 0 && result.length > 0 && (renamedTask.after = [result[result.length - 1].name]), questCompleted !== void 0 && function() {
            var taskCompleted = _task2.completed;
            renamedTask.completed = function() {
              return questCompleted() || taskCompleted();
            };
          }(), result.push(renamedTask);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    };
    for (_iterator.s(); !(_step = _iterator.n()).done; )
      _loop();
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  for (var names = /* @__PURE__ */ new Set(), _i = 0, _result = result; _i < _result.length; _i++) {
    var task = _result[_i];
    names.add(task.name);
  }
  for (var _i2 = 0, _result2 = result; _i2 < _result2.length; _i2++) {
    var _task = _result2[_i2], _iterator2 = _createForOfIteratorHelper10((_b = _task.after) !== null && _b !== void 0 ? _b : []), _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
        var after = _step2.value;
        if (!names.has(after))
          throw "Unknown task dependency ".concat(after, " of ").concat(_task.name);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }
  return result;
}

// node_modules/grimoire-kolmafia/dist/task.js
init_kolmafia_polyfill();

// node_modules/grimoire-kolmafia/dist/limit.js
init_kolmafia_polyfill();

// src/main.ts
var import_kolmafia36 = require("kolmafia");

// src/caboose.ts
init_kolmafia_polyfill();
var import_kolmafia31 = require("kolmafia");

// src/engine.ts
init_kolmafia_polyfill();
var import_kolmafia25 = require("kolmafia");

// src/juneCleaver.ts
init_kolmafia_polyfill();
var import_kolmafia24 = require("kolmafia");

// src/garboValue.ts
init_kolmafia_polyfill();
var import_kolmafia22 = require("kolmafia");
var _templateObject121, _templateObject228, _templateObject319, _templateObject417, _templateObject515, _templateObject615, _templateObject715, _templateObject815, _templateObject915, _templateObject1013, _templateObject1110, _templateObject129, _templateObject139, _templateObject149, _templateObject159, _templateObject168, _templateObject178, _templateObject188, _templateObject198, _templateObject208, _templateObject2112, _templateObject229, _templateObject238, _templateObject248, _templateObject258, _templateObject268, _templateObject278, _templateObject287, _templateObject297, _templateObject307, _templateObject3110, _templateObject325, _templateObject335, _templateObject345, _templateObject355, _templateObject364, _templateObject374, _templateObject383, _templateObject393, _templateObject403, _templateObject418, _templateObject423, _templateObject433, _templateObject443, _templateObject453;
function _taggedTemplateLiteral12(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
function _createForOfIteratorHelper11(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray17(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e2) {
        throw _e2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e3) {
    didErr = !0, err = _e3;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _slicedToArray7(arr, i) {
  return _arrayWithHoles7(arr) || _iterableToArrayLimit7(arr, i) || _unsupportedIterableToArray17(arr, i) || _nonIterableRest7();
}
function _nonIterableRest7() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit7(arr, i) {
  var _i = arr == null ? null : typeof Symbol != "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i != null) {
    var _arr = [], _n = !0, _d = !1, _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !(i && _arr.length === i)); _n = !0)
        ;
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        !_n && _i.return != null && _i.return();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles7(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _toConsumableArray12(arr) {
  return _arrayWithoutHoles12(arr) || _iterableToArray12(arr) || _unsupportedIterableToArray17(arr) || _nonIterableSpread12();
}
function _nonIterableSpread12() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray17(o, minLen) {
  if (!!o) {
    if (typeof o == "string")
      return _arrayLikeToArray17(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray17(o, minLen);
  }
}
function _iterableToArray12(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles12(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray17(arr);
}
function _arrayLikeToArray17(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function currency() {
  for (var _len = arguments.length, items = new Array(_len), _key = 0; _key < _len; _key++)
    items[_key] = arguments[_key];
  var unitCost = items.map(function(i) {
    var coinmaster = import_kolmafia22.Coinmaster.all().find(function(c) {
      return (0, import_kolmafia22.sellPrice)(c, i) > 0;
    });
    if (coinmaster)
      return [i, (0, import_kolmafia22.sellPrice)(coinmaster, i)];
    throw "Invalid coinmaster item ".concat(i);
  });
  return function() {
    return Math.max.apply(Math, _toConsumableArray12(unitCost.map(function(_ref2) {
      var _ref22 = _slicedToArray7(_ref2, 2), item5 = _ref22[0], cost = _ref22[1];
      return garboValue(item5) / cost;
    })));
  };
}
function complexCandy() {
  var candies = import_kolmafia22.Item.all().filter(function(i) {
    return i.candyType === "complex";
  }), candyLookup = [[], [], [], [], []], _iterator = _createForOfIteratorHelper11(candies), _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var candy = _step.value, id = (0, import_kolmafia22.toInt)(candy) % 5;
      candy.tradeable && candyLookup[id].push(candy);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  var candyIdPrices = candies.filter(function(i) {
    return !i.tradeable;
  }).map(function(i) {
    return [i, function() {
      return Math.min.apply(Math, _toConsumableArray12(candyLookup[(0, import_kolmafia22.toInt)(i) % 5].map(function(i2) {
        return garboValue(i2);
      })));
    }];
  });
  return candyIdPrices;
}
var specialValueLookup = new Map([[$item(_templateObject121 || (_templateObject121 = _taggedTemplateLiteral12(["Freddy Kruegerand"]))), currency.apply(void 0, _toConsumableArray12($items(_templateObject228 || (_templateObject228 = _taggedTemplateLiteral12(["bottle of Bloodweiser, electric Kool-Aid, Dreadsylvanian skeleton key"])))))], [$item(_templateObject319 || (_templateObject319 = _taggedTemplateLiteral12(["Beach Buck"]))), currency($item(_templateObject417 || (_templateObject417 = _taggedTemplateLiteral12(["one-day ticket to Spring Break Beach"]))))], [$item(_templateObject515 || (_templateObject515 = _taggedTemplateLiteral12(["Coinspiracy"]))), currency.apply(void 0, _toConsumableArray12($items(_templateObject615 || (_templateObject615 = _taggedTemplateLiteral12(["Merc Core deployment orders, karma shawarma"])))))], [$item(_templateObject715 || (_templateObject715 = _taggedTemplateLiteral12(["FunFunds\u2122"]))), currency($item(_templateObject815 || (_templateObject815 = _taggedTemplateLiteral12(["one-day ticket to Dinseylandfill"]))))], [$item(_templateObject915 || (_templateObject915 = _taggedTemplateLiteral12(["Volcoino"]))), currency($item(_templateObject1013 || (_templateObject1013 = _taggedTemplateLiteral12(["one-day ticket to That 70s Volcano"]))))], [$item(_templateObject1110 || (_templateObject1110 = _taggedTemplateLiteral12(["Wal-Mart gift certificate"]))), currency($item(_templateObject129 || (_templateObject129 = _taggedTemplateLiteral12(["one-day ticket to The Glaciest"]))))], [$item(_templateObject139 || (_templateObject139 = _taggedTemplateLiteral12(["Rubee\u2122"]))), currency($item(_templateObject149 || (_templateObject149 = _taggedTemplateLiteral12(["FantasyRealm guest pass"]))))], [$item(_templateObject159 || (_templateObject159 = _taggedTemplateLiteral12(["Guzzlrbuck"]))), currency($item(_templateObject168 || (_templateObject168 = _taggedTemplateLiteral12(["Never Don't Stop Not Striving"]))))]].concat(_toConsumableArray12(complexCandy()), [[$item(_templateObject178 || (_templateObject178 = _taggedTemplateLiteral12(["Merc Core deployment orders"]))), function() {
  return garboValue($item(_templateObject188 || (_templateObject188 = _taggedTemplateLiteral12(["one-day ticket to Conspiracy Island"]))));
}], [$item(_templateObject198 || (_templateObject198 = _taggedTemplateLiteral12(["free-range mushroom"]))), function() {
  return 3 * Math.max(garboValue($item(_templateObject208 || (_templateObject208 = _taggedTemplateLiteral12(["mushroom tea"])))) - garboValue($item(_templateObject2112 || (_templateObject2112 = _taggedTemplateLiteral12(["soda water"])))), garboValue($item(_templateObject229 || (_templateObject229 = _taggedTemplateLiteral12(["mushroom whiskey"])))) - garboValue($item(_templateObject238 || (_templateObject238 = _taggedTemplateLiteral12(["fermenting powder"])))), garboValue($item(_templateObject248 || (_templateObject248 = _taggedTemplateLiteral12(["mushroom filet"])))));
}], [$item(_templateObject258 || (_templateObject258 = _taggedTemplateLiteral12(["little firkin"]))), function() {
  return garboAverageValue.apply(void 0, _toConsumableArray12($items(_templateObject268 || (_templateObject268 = _taggedTemplateLiteral12(["martini, screwdriver, strawberry daiquiri, margarita, vodka martini, tequila sunrise, bottle of Amontillado, barrel-aged martini, barrel gun"])))));
}], [$item(_templateObject278 || (_templateObject278 = _taggedTemplateLiteral12(["normal barrel"]))), function() {
  return garboAverageValue.apply(void 0, _toConsumableArray12($items(_templateObject287 || (_templateObject287 = _taggedTemplateLiteral12(["a little sump'm sump'm, pink pony, rockin' wagon, roll in the hay, slip 'n' slide, slap and tickle"])))));
}], [$item(_templateObject297 || (_templateObject297 = _taggedTemplateLiteral12(["big tun"]))), function() {
  return garboAverageValue.apply(void 0, _toConsumableArray12($items(_templateObject307 || (_templateObject307 = _taggedTemplateLiteral12(["gibson, gin and tonic, mimosette, tequila sunset, vodka and tonic, zmobie"])))));
}], [$item(_templateObject3110 || (_templateObject3110 = _taggedTemplateLiteral12(["weathered barrel"]))), function() {
  return garboAverageValue.apply(void 0, _toConsumableArray12($items(_templateObject325 || (_templateObject325 = _taggedTemplateLiteral12(["bean burrito, enchanted bean burrito, jumping bean burrito"])))));
}], [$item(_templateObject335 || (_templateObject335 = _taggedTemplateLiteral12(["dusty barrel"]))), function() {
  return garboAverageValue.apply(void 0, _toConsumableArray12($items(_templateObject345 || (_templateObject345 = _taggedTemplateLiteral12(["spicy bean burrito, spicy enchanted bean burrito, spicy jumping bean burrito"])))));
}], [$item(_templateObject355 || (_templateObject355 = _taggedTemplateLiteral12(["disintegrating barrel"]))), function() {
  return garboAverageValue.apply(void 0, _toConsumableArray12($items(_templateObject364 || (_templateObject364 = _taggedTemplateLiteral12(["insanely spicy bean burrito, insanely spicy enchanted bean burrito, insanely spicy jumping bean burrito"])))));
}], [$item(_templateObject374 || (_templateObject374 = _taggedTemplateLiteral12(["moist barrel"]))), function() {
  return garboAverageValue.apply(void 0, _toConsumableArray12($items(_templateObject383 || (_templateObject383 = _taggedTemplateLiteral12(["cast, concentrated magicalness pill, enchanted barbell, giant moxie weed, Mountain Stream soda"])))));
}], [$item(_templateObject393 || (_templateObject393 = _taggedTemplateLiteral12(["rotting barrel"]))), function() {
  return garboAverageValue.apply(void 0, _toConsumableArray12($items(_templateObject403 || (_templateObject403 = _taggedTemplateLiteral12(["Doc Galaktik's Ailment Ointment, extra-strength strongness elixir, jug-o-magicalness, Marquis de Poivre soda, suntan lotion of moxiousness"])))));
}], [$item(_templateObject418 || (_templateObject418 = _taggedTemplateLiteral12(["mouldering barrel"]))), function() {
  return garboAverageValue.apply(void 0, _toConsumableArray12($items(_templateObject423 || (_templateObject423 = _taggedTemplateLiteral12(["creepy ginger ale, haunted battery, scroll of drastic healing, synthetic marrow, the funk"])))));
}], [$item(_templateObject433 || (_templateObject433 = _taggedTemplateLiteral12(["barnacled barrel"]))), function() {
  return garboAverageValue.apply(void 0, _toConsumableArray12($items(_templateObject443 || (_templateObject443 = _taggedTemplateLiteral12(["Alewife\u2122 Ale, bazookafish bubble gum, beefy fish meat, eel battery, glistening fish meat, ink bladder, pufferfish spine, shark cartilage, slick fish meat, slug of rum, slug of shochu, slug of vodka, temporary teardrop tattoo"])))));
}], [$item(_templateObject453 || (_templateObject453 = _taggedTemplateLiteral12(["fake hand"]))), function() {
  return 5e4;
}]]));
function garboSaleValue(item5, useHistorical) {
  if (useHistorical && (0, import_kolmafia22.historicalAge)(item5) <= 7 && (0, import_kolmafia22.historicalPrice)(item5) > 0) {
    var isMallMin = (0, import_kolmafia22.historicalPrice)(item5) === Math.max(100, 2 * (0, import_kolmafia22.autosellPrice)(item5));
    return isMallMin ? (0, import_kolmafia22.autosellPrice)(item5) : 0.9 * (0, import_kolmafia22.historicalPrice)(item5);
  }
  return getSaleValue(item5);
}
var garboRegularValueCache = /* @__PURE__ */ new Map(), garboHistoricalValueCache = /* @__PURE__ */ new Map();
function garboValue(item5) {
  var _garboRegularValueCac, useHistorical = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, cachedValue = (_garboRegularValueCac = garboRegularValueCache.get(item5)) !== null && _garboRegularValueCac !== void 0 ? _garboRegularValueCac : useHistorical ? garboHistoricalValueCache.get(item5) : void 0;
  if (cachedValue === void 0) {
    var specialValueCompute = specialValueLookup.get(item5), value = specialValueCompute ? specialValueCompute() : garboSaleValue(item5, useHistorical);
    return (useHistorical ? garboHistoricalValueCache : garboRegularValueCache).set(item5, value), value;
  }
  return cachedValue;
}
function garboAverageValue() {
  for (var _len2 = arguments.length, items = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++)
    items[_key2] = arguments[_key2];
  return sumNumbers(items.map(function(i) {
    return garboValue(i);
  })) / items.length;
}

// src/lib.ts
init_kolmafia_polyfill();
var import_kolmafia23 = require("kolmafia");
var _templateObject130, _templateObject230, _ref, _templateObject320, _templateObject419, _ref3, _templateObject516, _ref4, _templateObject616, _templateObject716, _templateObject816, _templateObject916, _templateObject1014, _templateObject1111, _ref10, _templateObject1210, _templateObject1310, _templateObject1410, _templateObject1510, _ref14, _templateObject169, _ref15, _templateObject179, _templateObject189, _ref17, _templateObject199;
function _defineProperty11(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
function _taggedTemplateLiteral13(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
function maxBy2(array, optimizer) {
  var reverse = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
  return typeof optimizer == "function" ? maxBy2(array.map(function(key) {
    return {
      key: key,
      value: optimizer(key)
    };
  }), "value", reverse).key : array.reduce(function(a, b) {
    return a[optimizer] > b[optimizer] !== reverse ? a : b;
  });
}
function shouldRedigitize() {
  var digitizesLeft = SourceTerminal_exports.getDigitizeUsesRemaining(), monsterCount = SourceTerminal_exports.getDigitizeMonsterCount() + 1, digitizeAdventuresUsed = monsterCount * (monsterCount + 1) * 5 - 3;
  return SourceTerminal_exports.have() && SourceTerminal_exports.canDigitize() && (0, import_kolmafia23.myAdventures)() / 0.96 < digitizesLeft * digitizeAdventuresUsed;
}
var HIGHLIGHT = (0, import_kolmafia23.isDarkMode)() ? "yellow" : "blue";
function printh(message) {
  (0, import_kolmafia23.print)(message, HIGHLIGHT);
}
function printd(message) {
  args.debug && (0, import_kolmafia23.print)(message, HIGHLIGHT);
}
function sober() {
  return (0, import_kolmafia23.myInebriety)() <= (0, import_kolmafia23.inebrietyLimit)() + ((0, import_kolmafia23.myFamiliar)() === $familiar(_templateObject130 || (_templateObject130 = _taggedTemplateLiteral13(["Stooper"]))) ? -1 : 0);
}
var args = Args.create("railo", "A script for farming elf stuff", {
  turns: Args.number({
    help: "The number of turns to run (use negative numbers for the number of turns remaining)",
    default: 1 / 0
  }),
  car: Args.string({
    options: [["caboose", "Kill robots in the Caboose"]],
    default: "caboose"
  }),
  debug: Args.flag({
    help: "Turn on debug printing",
    default: !1
  }),
  priority: Args.string({
    options: [["elves", "rescue elves"], ["parts", "gather train parts"], ["pingpong", "pingpong"]],
    default: "parts"
  })
});
function getCMCChoices() {
  for (var options = (0, import_kolmafia23.visitUrl)("campground.php?action=workshed"), i = 0, match, entries2 = [], regexp = /descitem\((\d+)\)/g; (match = regexp.exec(options)) !== null; )
    entries2.push(["".concat((0, import_kolmafia23.descToItem)(match[1])), ++i]);
  return Object.fromEntries(entries2);
}
function tryGetCMCItem(item5) {
  var choice = getCMCChoices()["".concat(item5)];
  choice && (0, import_kolmafia23.runChoice)(choice);
}
function countEnvironment(environment) {
  return get("lastCombatEnvironments").split("").filter(function(e) {
    return e === environment;
  }).length;
}
function realmAvailable(identifier) {
  return identifier === "fantasy" ? get("_frToday") || get("frAlways") : identifier === "pirate" ? get("_prToday") || get("prAlways") : get("_".concat(identifier, "AirportToday"), !1) || get("".concat(identifier, "AirportAlways"), !1);
}
var unsupportedChoices = /* @__PURE__ */ new Map([[$location(_templateObject230 || (_templateObject230 = _taggedTemplateLiteral13(["The Spooky Forest"]))), (_ref = {}, _defineProperty11(_ref, 502, 2), _defineProperty11(_ref, 505, 2), _ref)], [$location(_templateObject320 || (_templateObject320 = _taggedTemplateLiteral13(["Guano Junction"]))), _defineProperty11({}, 1427, 1)], [$location(_templateObject419 || (_templateObject419 = _taggedTemplateLiteral13(["The Hidden Apartment Building"]))), (_ref3 = {}, _defineProperty11(_ref3, 780, 6), _defineProperty11(_ref3, 1578, 6), _ref3)], [$location(_templateObject516 || (_templateObject516 = _taggedTemplateLiteral13(["The Black Forest"]))), (_ref4 = {}, _defineProperty11(_ref4, 923, 1), _defineProperty11(_ref4, 924, 1), _ref4)], [$location(_templateObject616 || (_templateObject616 = _taggedTemplateLiteral13(["LavaCo\u2122 Lamp Factory"]))), _defineProperty11({}, 1091, 9)], [$location(_templateObject716 || (_templateObject716 = _taggedTemplateLiteral13(["The Haunted Laboratory"]))), _defineProperty11({}, 884, 6)], [$location(_templateObject816 || (_templateObject816 = _taggedTemplateLiteral13(["The Haunted Nursery"]))), _defineProperty11({}, 885, 6)], [$location(_templateObject916 || (_templateObject916 = _taggedTemplateLiteral13(["The Haunted Storage Room"]))), _defineProperty11({}, 886, 6)], [$location(_templateObject1014 || (_templateObject1014 = _taggedTemplateLiteral13(["The Hidden Park"]))), _defineProperty11({}, 789, 6)], [$location(_templateObject1111 || (_templateObject1111 = _taggedTemplateLiteral13(["A Mob of Zeppelin Protesters"]))), (_ref10 = {}, _defineProperty11(_ref10, 1432, 1), _defineProperty11(_ref10, 857, 2), _ref10)], [$location(_templateObject1210 || (_templateObject1210 = _taggedTemplateLiteral13(["A-Boo Peak"]))), _defineProperty11({}, 1430, 2)], [$location(_templateObject1310 || (_templateObject1310 = _taggedTemplateLiteral13(["Sloppy Seconds Diner"]))), _defineProperty11({}, 919, 6)], [$location(_templateObject1410 || (_templateObject1410 = _taggedTemplateLiteral13(["VYKEA"]))), _defineProperty11({}, 1115, 6)], [$location(_templateObject1510 || (_templateObject1510 = _taggedTemplateLiteral13(["The Castle in the Clouds in the Sky (Basement)"]))), (_ref14 = {}, _defineProperty11(_ref14, 670, 4), _defineProperty11(_ref14, 671, 4), _defineProperty11(_ref14, 672, 1), _ref14)], [$location(_templateObject169 || (_templateObject169 = _taggedTemplateLiteral13(["The Haunted Bedroom"]))), (_ref15 = {}, _defineProperty11(_ref15, 876, 1), _defineProperty11(_ref15, 877, 1), _defineProperty11(_ref15, 878, 1), _defineProperty11(_ref15, 879, 2), _defineProperty11(_ref15, 880, 2), _ref15)], [$location(_templateObject179 || (_templateObject179 = _taggedTemplateLiteral13(["The Copperhead Club"]))), _defineProperty11({}, 855, 4)], [$location(_templateObject189 || (_templateObject189 = _taggedTemplateLiteral13(["The Castle in the Clouds in the Sky (Top Floor)"]))), (_ref17 = {}, _defineProperty11(_ref17, 1431, 1), _defineProperty11(_ref17, 677, 2), _ref17)], [$location(_templateObject199 || (_templateObject199 = _taggedTemplateLiteral13(["The Hidden Office Building"]))), _defineProperty11({}, 786, 6)]]);
function untangleDigitizes(turnCount, chunks) {
  var turnsPerChunk = turnCount / chunks, monstersPerChunk = Math.sqrt((turnsPerChunk + 3) / 5 + 1 / 4) - 1 / 2;
  return Math.round(chunks * monstersPerChunk);
}
function digitizedMonstersRemaining() {
  if (!SourceTerminal_exports.have())
    return 0;
  var digitizesLeft = SourceTerminal_exports.getDigitizeUsesRemaining();
  if (digitizesLeft === SourceTerminal_exports.getMaximumDigitizeUses())
    return untangleDigitizes((0, import_kolmafia23.myAdventures)(), SourceTerminal_exports.getMaximumDigitizeUses());
  var monsterCount = SourceTerminal_exports.getDigitizeMonsterCount() + 1, turnsLeftAtNextMonster = (0, import_kolmafia23.myAdventures)() - counter_exports.get("Digitize Monster");
  if (turnsLeftAtNextMonster <= 0)
    return 0;
  var turnsAtLastDigitize = turnsLeftAtNextMonster + ((monsterCount + 1) * monsterCount * 5 - 3);
  return untangleDigitizes(turnsAtLastDigitize, digitizesLeft + 1) - SourceTerminal_exports.getDigitizeMonsterCount();
}

// src/juneCleaver.ts
var _templateObject131, _templateObject231, _templateObject321, _templateObject420, _templateObject517, _templateObject617, _templateObject717, _templateObject817;
function _toConsumableArray13(arr) {
  return _arrayWithoutHoles13(arr) || _iterableToArray13(arr) || _unsupportedIterableToArray18(arr) || _nonIterableSpread13();
}
function _nonIterableSpread13() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray18(o, minLen) {
  if (!!o) {
    if (typeof o == "string")
      return _arrayLikeToArray18(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray18(o, minLen);
  }
}
function _iterableToArray13(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles13(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray18(arr);
}
function _arrayLikeToArray18(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _taggedTemplateLiteral14(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var juneCleaverChoiceValues = {
  1467: {
    1: 0,
    2: 0,
    3: 5 * get("valueOfAdventure")
  },
  1468: {
    1: 0,
    2: 5,
    3: 0
  },
  1469: {
    1: 0,
    2: $item(_templateObject131 || (_templateObject131 = _taggedTemplateLiteral14(["Dad's brandy"]))),
    3: 1500
  },
  1470: {
    1: 0,
    2: $item(_templateObject231 || (_templateObject231 = _taggedTemplateLiteral14(["teacher's pen"]))),
    3: 0
  },
  1471: {
    1: $item(_templateObject321 || (_templateObject321 = _taggedTemplateLiteral14(["savings bond"]))),
    2: 250,
    3: 0
  },
  1472: {
    1: $item(_templateObject420 || (_templateObject420 = _taggedTemplateLiteral14(["trampled ticket stub"]))),
    2: $item(_templateObject517 || (_templateObject517 = _taggedTemplateLiteral14(["fire-roasted lake trout"]))),
    3: 0
  },
  1473: {
    1: $item(_templateObject617 || (_templateObject617 = _taggedTemplateLiteral14(["gob of wet hair"]))),
    2: 0,
    3: 0
  },
  1474: {
    1: 0,
    2: $item(_templateObject717 || (_templateObject717 = _taggedTemplateLiteral14(["guilty sprout"]))),
    3: 0
  },
  1475: {
    1: $item(_templateObject817 || (_templateObject817 = _taggedTemplateLiteral14(["mother's necklace"]))),
    2: 0,
    3: 0
  }
};
function valueJuneCleaverOption(result) {
  return result instanceof import_kolmafia24.Item ? garboValue(result) : result;
}
function bestJuneCleaverOption(id) {
  var options = [1, 2, 3];
  return maxBy2(options, function(option) {
    return valueJuneCleaverOption(juneCleaverChoiceValues[id][option]);
  });
}
var juneCleaverSkipChoices;
function skipJuneCleaverChoices() {
  return juneCleaverSkipChoices || (juneCleaverSkipChoices = _toConsumableArray13(JuneCleaver_exports.choices).sort(function(a, b) {
    return valueJuneCleaverOption(juneCleaverChoiceValues[a][bestJuneCleaverOption(a)]) - valueJuneCleaverOption(juneCleaverChoiceValues[b][bestJuneCleaverOption(b)]);
  }).splice(0, 3)), juneCleaverSkipChoices;
}
function shouldSkip(choice) {
  return JuneCleaver_exports.skipsRemaining() > 0 && skipJuneCleaverChoices().includes(choice);
}

// src/engine.ts
var _templateObject140, _templateObject239, _templateObject326, _templateObject421, _templateObject518;
function _taggedTemplateLiteral15(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
function _createForOfIteratorHelper12(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray19(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e) {
        throw _e;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e2) {
    didErr = !0, err = _e2;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _unsupportedIterableToArray19(o, minLen) {
  if (!!o) {
    if (typeof o == "string")
      return _arrayLikeToArray19(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray19(o, minLen);
  }
}
function _arrayLikeToArray19(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _get2() {
  return typeof Reflect != "undefined" && Reflect.get ? _get2 = Reflect.get.bind() : _get2 = function(target, property, receiver) {
    var base = _superPropBase2(target, property);
    if (!!base) {
      var desc = Object.getOwnPropertyDescriptor(base, property);
      return desc.get ? desc.get.call(arguments.length < 3 ? target : receiver) : desc.value;
    }
  }, _get2.apply(this, arguments);
}
function _superPropBase2(object, property) {
  for (; !Object.prototype.hasOwnProperty.call(object, property) && (object = _getPrototypeOf5(object), object !== null); )
    ;
  return object;
}
function _defineProperties13(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass13(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties13(Constructor.prototype, protoProps), staticProps && _defineProperties13(Constructor, staticProps), Object.defineProperty(Constructor, "prototype", { writable: !1 }), Constructor;
}
function _classCallCheck13(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _inherits5(subClass, superClass) {
  if (typeof superClass != "function" && superClass !== null)
    throw new TypeError("Super expression must either be null or a function");
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: !0, configurable: !0 } }), Object.defineProperty(subClass, "prototype", { writable: !1 }), superClass && _setPrototypeOf5(subClass, superClass);
}
function _setPrototypeOf5(o, p) {
  return _setPrototypeOf5 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(o2, p2) {
    return o2.__proto__ = p2, o2;
  }, _setPrototypeOf5(o, p);
}
function _createSuper5(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct5();
  return function() {
    var Super = _getPrototypeOf5(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf5(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else
      result = Super.apply(this, arguments);
    return _possibleConstructorReturn5(this, result);
  };
}
function _possibleConstructorReturn5(self2, call) {
  if (call && (typeof call == "object" || typeof call == "function"))
    return call;
  if (call !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized5(self2);
}
function _assertThisInitialized5(self2) {
  if (self2 === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return self2;
}
function _isNativeReflectConstruct5() {
  if (typeof Reflect == "undefined" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch (e) {
    return !1;
  }
}
function _getPrototypeOf5(o) {
  return _getPrototypeOf5 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  }, _getPrototypeOf5(o);
}
var introAdventures = [], CrimboStrategy = /* @__PURE__ */ function(_CombatStrategy) {
  _inherits5(CrimboStrategy2, _CombatStrategy);
  var _super = _createSuper5(CrimboStrategy2);
  function CrimboStrategy2(macro) {
    var _this;
    return _classCallCheck13(this, CrimboStrategy2), _this = _super.call(this), _this.macro(macro).autoattack(macro), _this;
  }
  return _createClass13(CrimboStrategy2);
}(CombatStrategy);
function countAvailableNcForces() {
  return (get("_claraBellUsed") ? 0 : 1) + (5 - get("_spikolodonSpikeUses"));
}
var ncForced = !1;
CrownOfThrones_exports.createRiderMode("default", function() {
  return 0;
});
var chooseRider = function() {
  return CrownOfThrones_exports.pickRider("default");
}, CrimboEngine = /* @__PURE__ */ function(_Engine) {
  _inherits5(CrimboEngine2, _Engine);
  var _super2 = _createSuper5(CrimboEngine2);
  function CrimboEngine2() {
    return _classCallCheck13(this, CrimboEngine2), _super2.apply(this, arguments);
  }
  return _createClass13(CrimboEngine2, [{
    key: "available",
    value: function(task) {
      var sobriety = task.sobriety === "either" || sober() && task.sobriety === "sober" || !sober() && task.sobriety === "drunk";
      return task.forced ? sobriety && ncForced && _get2(_getPrototypeOf5(CrimboEngine2.prototype), "available", this).call(this, task) : sobriety && _get2(_getPrototypeOf5(CrimboEngine2.prototype), "available", this).call(this, task);
    }
  }, {
    key: "initPropertiesManager",
    value: function(manager) {
      _get2(_getPrototypeOf5(CrimboEngine2.prototype), "initPropertiesManager", this).call(this, manager);
      var _iterator = _createForOfIteratorHelper12(unsupportedChoices.values()), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var choices2 = _step.value;
          manager.setChoices(choices2);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      var priority = args.priority;
      manager.setChoice(1486, {
        parts: 1,
        elves: 2,
        pingpong: 3
      }[priority]);
    }
  }, {
    key: "createOutfit",
    value: function(task) {
      var outfit2 = _get2(_getPrototypeOf5(CrimboEngine2.prototype), "createOutfit", this).call(this, task);
      if (outfit2.equips.get($slot(_templateObject140 || (_templateObject140 = _taggedTemplateLiteral15(["hat"])))) === $item(_templateObject239 || (_templateObject239 = _taggedTemplateLiteral15(["Crown of Thrones"])))) {
        var choice = chooseRider();
        choice && (0, import_kolmafia25.enthroneFamiliar)(choice.familiar);
      } else if (outfit2.equips.get($slot(_templateObject326 || (_templateObject326 = _taggedTemplateLiteral15(["back"])))) === $item(_templateObject421 || (_templateObject421 = _taggedTemplateLiteral15(["Buddy Bjorn"])))) {
        var _choice = chooseRider();
        _choice && (0, import_kolmafia25.bjornifyFamiliar)(_choice.familiar);
      }
      return outfit2;
    }
  }, {
    key: "execute",
    value: function(task) {
      var ncBefore = countAvailableNcForces();
      _get2(_getPrototypeOf5(CrimboEngine2.prototype), "execute", this).call(this, task);
      var ncAfter = countAvailableNcForces();
      ncBefore > ncAfter && (ncForced = !0);
    }
  }, {
    key: "setChoices",
    value: function(task, manager) {
      _get2(_getPrototypeOf5(CrimboEngine2.prototype), "setChoices", this).call(this, task, manager), (0, import_kolmafia25.equippedAmount)($item(_templateObject518 || (_templateObject518 = _taggedTemplateLiteral15(["June cleaver"])))) > 0 && this.propertyManager.setChoices(Object.fromEntries(JuneCleaver_exports.choices.map(function(choice) {
        return [choice, shouldSkip(choice) ? 4 : bestJuneCleaverOption(choice)];
      }))), this.propertyManager.setChoices({
        955: 2
      });
    }
  }, {
    key: "shouldRepeatAdv",
    value: function(task) {
      return ["Poetic Justice", "Lost and Found"].includes(get("lastEncounter")) ? (printd("Skipping repeating Adventure despite free NC (beaten up)"), !1) : introAdventures.includes(get("lastEncounter")) ? (printd("Hit Intro adventure ".concat(get("lastEncounter"), " which is a free NC")), !0) : task.name.includes("June Cleaver") ? !1 : _get2(_getPrototypeOf5(CrimboEngine2.prototype), "shouldRepeatAdv", this).call(this, task);
    }
  }, {
    key: "print",
    value: function() {
      printd("Task List:");
      var _iterator2 = _createForOfIteratorHelper12(this.tasks), _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
          var task = _step2.value;
          printd("".concat(task.name, ": available:").concat(this.available(task)));
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }, {
    key: "destruct",
    value: function() {
      _get2(_getPrototypeOf5(CrimboEngine2.prototype), "destruct", this).call(this), (0, import_kolmafia25.setAutoAttack)(0);
    }
  }]), CrimboEngine2;
}(Engine);

// src/macro.ts
init_kolmafia_polyfill();
var import_kolmafia29 = require("kolmafia");

// src/familiar/index.ts
init_kolmafia_polyfill();

// src/familiar/freeFightFamiliar.ts
init_kolmafia_polyfill();
var import_kolmafia28 = require("kolmafia");

// src/familiar/constantValueFamiliars.ts
init_kolmafia_polyfill();
var import_kolmafia26 = require("kolmafia");
var _templateObject141, _templateObject240, _templateObject327, _templateObject424, _templateObject519, _templateObject618, _templateObject718, _templateObject818, _templateObject917, _templateObject1015, _templateObject1112, _templateObject1211, _templateObject1311, _templateObject1411, _templateObject1511, _templateObject1610, _templateObject1710, _templateObject1810, _templateObject1910;
function _toConsumableArray14(arr) {
  return _arrayWithoutHoles14(arr) || _iterableToArray14(arr) || _unsupportedIterableToArray20(arr) || _nonIterableSpread14();
}
function _nonIterableSpread14() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray20(o, minLen) {
  if (!!o) {
    if (typeof o == "string")
      return _arrayLikeToArray20(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray20(o, minLen);
  }
}
function _iterableToArray14(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles14(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray20(arr);
}
function _arrayLikeToArray20(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _taggedTemplateLiteral16(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var standardFamiliars = [{
  familiar: $familiar(_templateObject141 || (_templateObject141 = _taggedTemplateLiteral16(["Obtuse Angel"]))),
  value: function() {
    return 0.02 * garboValue($item(_templateObject240 || (_templateObject240 = _taggedTemplateLiteral16(["time's arrow"]))));
  }
}, {
  familiar: $familiar(_templateObject327 || (_templateObject327 = _taggedTemplateLiteral16(["Stocking Mimic"]))),
  value: function() {
    return garboAverageValue.apply(void 0, _toConsumableArray14($items(_templateObject424 || (_templateObject424 = _taggedTemplateLiteral16(["Polka Pop, BitterSweetTarts, Piddles"]))))) / 6 + (1 / 3 + (have($effect(_templateObject519 || (_templateObject519 = _taggedTemplateLiteral16(["Jingle Jangle Jingle"])))) ? 0.1 : 0)) * ((0, import_kolmafia26.familiarWeight)($familiar(_templateObject618 || (_templateObject618 = _taggedTemplateLiteral16(["Stocking Mimic"])))) + (0, import_kolmafia26.weightAdjustment)());
  }
}, {
  familiar: $familiar(_templateObject718 || (_templateObject718 = _taggedTemplateLiteral16(["Shorter-Order Cook"]))),
  value: function() {
    return garboAverageValue.apply(void 0, _toConsumableArray14($items(_templateObject818 || (_templateObject818 = _taggedTemplateLiteral16(["short beer, short stack of pancakes, short stick of butter, short glass of water, short white"]))))) / 11;
  }
}, {
  familiar: $familiar(_templateObject917 || (_templateObject917 = _taggedTemplateLiteral16(["Robortender"]))),
  value: function() {
    return garboValue($item(_templateObject1015 || (_templateObject1015 = _taggedTemplateLiteral16(["elemental sugarcube"])))) / 5 + (Robortender_exports.currentDrinks().includes($item(_templateObject1112 || (_templateObject1112 = _taggedTemplateLiteral16(["Feliz Navidad"])))) ? get("garbo_felizValue", 0) * 0.25 : 0) + (Robortender_exports.currentDrinks().includes($item(_templateObject1211 || (_templateObject1211 = _taggedTemplateLiteral16(["Newark"])))) ? get("garbo_newarkValue", 0) * 0.25 : 0);
  }
}, {
  familiar: $familiar(_templateObject1311 || (_templateObject1311 = _taggedTemplateLiteral16(["Twitching Space Critter"]))),
  value: function() {
    return Math.min(garboValue($item(_templateObject1411 || (_templateObject1411 = _taggedTemplateLiteral16(["twitching space egg"])))) * 2e-4, 690);
  }
}, {
  familiar: $familiar(_templateObject1511 || (_templateObject1511 = _taggedTemplateLiteral16(["Hobo Monkey"]))),
  value: function() {
    return 75;
  }
}, {
  familiar: $familiar(_templateObject1610 || (_templateObject1610 = _taggedTemplateLiteral16(["Red-Nosed Snapper"]))),
  value: function(_ref2) {
    var location2 = _ref2.location;
    return location2 === $location(_templateObject1710 || (_templateObject1710 = _taggedTemplateLiteral16(["Globe Theatre Main Stage"]))) ? garboValue($item(_templateObject1810 || (_templateObject1810 = _taggedTemplateLiteral16(["human musk"])))) / 11 : 0;
  }
}, {
  familiar: $familiar(_templateObject1910 || (_templateObject1910 = _taggedTemplateLiteral16(["Mosquito"]))),
  value: function() {
    return 1;
  }
}];
function getConstantValueFamiliars() {
  var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  return standardFamiliars.filter(function(_ref2) {
    var familiar3 = _ref2.familiar;
    return have(familiar3);
  }).map(function(_ref32) {
    var familiar3 = _ref32.familiar, value = _ref32.value;
    return {
      familiar: familiar3,
      expectedValue: value(options),
      leprechaunMultiplier: findLeprechaunMultiplier(familiar3),
      limit: "none"
    };
  });
}

// src/familiar/dropFamiliars.ts
init_kolmafia_polyfill();
var _templateObject150, _templateObject241, _templateObject328, _templateObject425, _templateObject520, _templateObject619, _templateObject719, _templateObject819, _templateObject918, _templateObject1016, _templateObject1113, _templateObject1212, _templateObject1312, _templateObject1412, _templateObject1512, _templateObject1611, _templateObject1711, _templateObject1811, _templateObject1911, _templateObject209, _templateObject2113, _templateObject2210, _templateObject2310, _templateObject249, _templateObject259, _templateObject269, _templateObject279, _templateObject288, _templateObject298, _templateObject308, _templateObject3111, _templateObject329, _templateObject336, _templateObject346, _templateObject356, _templateObject365, _templateObject375, _templateObject384, _templateObject394, _templateObject404;
function _taggedTemplateLiteral17(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
function valueStandardDropFamiliar(_ref2) {
  var _additionalValue, familiar3 = _ref2.familiar, expected = _ref2.expected, drop = _ref2.drop, pref = _ref2.pref, additionalValue = _ref2.additionalValue, expectedTurns = expected[get(pref)] || 1 / 0, expectedValue = garboValue(drop) / expectedTurns + ((_additionalValue = additionalValue == null ? void 0 : additionalValue()) !== null && _additionalValue !== void 0 ? _additionalValue : 0);
  return {
    familiar: familiar3,
    expectedValue: expectedValue,
    leprechaunMultiplier: findLeprechaunMultiplier(familiar3),
    limit: "drops"
  };
}
var rotatingFamiliars = [{
  familiar: $familiar(_templateObject150 || (_templateObject150 = _taggedTemplateLiteral17(["Fist Turkey"]))),
  expected: [3.91, 4.52, 4.52, 5.29, 5.29],
  drop: $item(_templateObject241 || (_templateObject241 = _taggedTemplateLiteral17(["Ambitious Turkey"]))),
  pref: "_turkeyBooze"
}, {
  familiar: $familiar(_templateObject328 || (_templateObject328 = _taggedTemplateLiteral17(["Llama Lama"]))),
  expected: [3.42, 3.91, 4.52, 5.29, 5.29],
  drop: $item(_templateObject425 || (_templateObject425 = _taggedTemplateLiteral17(["llama lama gong"]))),
  pref: "_gongDrops"
}, {
  familiar: $familiar(_templateObject520 || (_templateObject520 = _taggedTemplateLiteral17(["Astral Badger"]))),
  expected: [3.03, 3.42, 3.91, 4.52, 5.29],
  drop: $item(_templateObject619 || (_templateObject619 = _taggedTemplateLiteral17(["astral mushroom"]))),
  pref: "_astralDrops"
}, {
  familiar: $familiar(_templateObject719 || (_templateObject719 = _taggedTemplateLiteral17(["Li'l Xenomorph"]))),
  expected: [3.03, 3.42, 3.91, 4.52, 5.29],
  drop: $item(_templateObject819 || (_templateObject819 = _taggedTemplateLiteral17(["transporter transponder"]))),
  pref: "_transponderDrops"
}, {
  familiar: $familiar(_templateObject918 || (_templateObject918 = _taggedTemplateLiteral17(["Rogue Program"]))),
  expected: [3.03, 3.42, 3.91, 4.52, 5.29],
  drop: $item(_templateObject1016 || (_templateObject1016 = _taggedTemplateLiteral17(["Game Grid token"]))),
  pref: "_tokenDrops"
}, {
  familiar: $familiar(_templateObject1113 || (_templateObject1113 = _taggedTemplateLiteral17(["Bloovian Groose"]))),
  expected: [3.03, 3.42, 3.91, 4.52, 5.29],
  drop: $item(_templateObject1212 || (_templateObject1212 = _taggedTemplateLiteral17(["groose grease"]))),
  pref: "_grooseDrops"
}, {
  familiar: $familiar(_templateObject1312 || (_templateObject1312 = _taggedTemplateLiteral17(["Baby Sandworm"]))),
  expected: [3.03, 3.42, 3.91, 4.52, 5.29],
  drop: $item(_templateObject1412 || (_templateObject1412 = _taggedTemplateLiteral17(["agua de vida"]))),
  pref: "_aguaDrops"
}, {
  familiar: $familiar(_templateObject1512 || (_templateObject1512 = _taggedTemplateLiteral17(["Green Pixie"]))),
  expected: [3.03, 3.42, 3.91, 4.52, 5.29],
  drop: $item(_templateObject1611 || (_templateObject1611 = _taggedTemplateLiteral17(["tiny bottle of absinthe"]))),
  pref: "_absintheDrops"
}, {
  familiar: $familiar(_templateObject1711 || (_templateObject1711 = _taggedTemplateLiteral17(["Blavious Kloop"]))),
  expected: [3.03, 3.42, 3.91, 4.52, 5.29],
  drop: $item(_templateObject1811 || (_templateObject1811 = _taggedTemplateLiteral17(["devilish folio"]))),
  pref: "_kloopDrops"
}, {
  familiar: $familiar(_templateObject1911 || (_templateObject1911 = _taggedTemplateLiteral17(["Galloping Grill"]))),
  expected: [3.03, 3.42, 3.91, 4.52, 5.29],
  drop: $item(_templateObject209 || (_templateObject209 = _taggedTemplateLiteral17(["hot ashes"]))),
  pref: "_hotAshesDrops"
}, {
  familiar: $familiar(_templateObject2113 || (_templateObject2113 = _taggedTemplateLiteral17(["Grim Brother"]))),
  expected: [3.03, 3.42, 3.91, 4.52, 5.29],
  drop: $item(_templateObject2210 || (_templateObject2210 = _taggedTemplateLiteral17(["grim fairy tale"]))),
  pref: "_grimFairyTaleDrops"
}, {
  familiar: $familiar(_templateObject2310 || (_templateObject2310 = _taggedTemplateLiteral17(["Golden Monkey"]))),
  expected: [3.03, 3.42, 3.91, 4.52, 5.29],
  drop: $item(_templateObject249 || (_templateObject249 = _taggedTemplateLiteral17(["powdered gold"]))),
  pref: "_powderedGoldDrops"
}, {
  familiar: $familiar(_templateObject259 || (_templateObject259 = _taggedTemplateLiteral17(["Unconscious Collective"]))),
  expected: [3.03, 3.42, 3.91, 4.52, 5.29],
  drop: $item(_templateObject269 || (_templateObject269 = _taggedTemplateLiteral17(["Unconscious Collective Dream Jar"]))),
  pref: "_dreamJarDrops"
}, {
  familiar: $familiar(_templateObject279 || (_templateObject279 = _taggedTemplateLiteral17(["Ms. Puck Man"]))),
  expected: Array($familiar(_templateObject288 || (_templateObject288 = _taggedTemplateLiteral17(["Ms. Puck Man"]))).dropsLimit).fill(12.85),
  drop: $item(_templateObject298 || (_templateObject298 = _taggedTemplateLiteral17(["power pill"]))),
  pref: "_powerPillDrops",
  additionalValue: function() {
    return garboValue($item(_templateObject308 || (_templateObject308 = _taggedTemplateLiteral17(["yellow pixel"]))));
  }
}, {
  familiar: $familiar(_templateObject3111 || (_templateObject3111 = _taggedTemplateLiteral17(["Puck Man"]))),
  expected: Array($familiar(_templateObject329 || (_templateObject329 = _taggedTemplateLiteral17(["Puck Man"]))).dropsLimit).fill(12.85),
  drop: $item(_templateObject336 || (_templateObject336 = _taggedTemplateLiteral17(["power pill"]))),
  pref: "_powerPillDrops",
  additionalValue: function() {
    return garboValue($item(_templateObject346 || (_templateObject346 = _taggedTemplateLiteral17(["yellow pixel"]))));
  }
}, {
  familiar: $familiar(_templateObject356 || (_templateObject356 = _taggedTemplateLiteral17(["Adventurous Spelunker"]))),
  expected: [7],
  drop: $item(_templateObject365 || (_templateObject365 = _taggedTemplateLiteral17(["Tales of Spelunking"]))),
  pref: "_spelunkingTalesDrops"
}, {
  familiar: $familiar(_templateObject375 || (_templateObject375 = _taggedTemplateLiteral17(["Angry Jung Man"]))),
  expected: [30],
  drop: $item(_templateObject384 || (_templateObject384 = _taggedTemplateLiteral17(["psychoanalytic jar"]))),
  pref: "_jungDrops"
}, {
  familiar: $familiar(_templateObject394 || (_templateObject394 = _taggedTemplateLiteral17(["Grimstone Golem"]))),
  expected: [45],
  drop: $item(_templateObject404 || (_templateObject404 = _taggedTemplateLiteral17(["grimstone mask"]))),
  pref: "_grimstoneMaskDrops"
}];
function getDropFamiliars() {
  return rotatingFamiliars.map(valueStandardDropFamiliar).filter(function(_ref2) {
    var familiar3 = _ref2.familiar, expectedValue = _ref2.expectedValue, leprechaunMultiplier = _ref2.leprechaunMultiplier;
    return have(familiar3) && (expectedValue || leprechaunMultiplier);
  });
}

// src/familiar/experienceFamiliars.ts
init_kolmafia_polyfill();
var _templateObject151, _templateObject250, _templateObject330;
function _taggedTemplateLiteral18(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var experienceFamiliars = [{
  familiar: $familiar(_templateObject151 || (_templateObject151 = _taggedTemplateLiteral18(["Pocket Professor"]))),
  used: "_thesisDelivered",
  useValue: 11 * get("valueOfAdventure")
}, {
  familiar: $familiar(_templateObject250 || (_templateObject250 = _taggedTemplateLiteral18(["Grey Goose"]))),
  used: "_meatifyMatterUsed",
  useValue: 15 ** 4
}];
function valueExperienceFamiliar(_ref2) {
  var familiar3 = _ref2.familiar, useValue = _ref2.useValue, currentExp = familiar3.experience || (have($familiar(_templateObject330 || (_templateObject330 = _taggedTemplateLiteral18(["Shorter-Order Cook"])))) ? 100 : 0), experienceNeeded = 400 - currentExp, estimatedExperience = 3;
  return {
    familiar: familiar3,
    expectedValue: useValue / (experienceNeeded / estimatedExperience),
    leprechaunMultiplier: findLeprechaunMultiplier(familiar3),
    limit: "experience"
  };
}
function getExperienceFamiliars() {
  return experienceFamiliars.filter(function(_ref2) {
    var used = _ref2.used, familiar3 = _ref2.familiar;
    return have(familiar3) && !get(used) && familiar3.experience < 400;
  }).map(valueExperienceFamiliar);
}

// src/familiar/lib.ts
init_kolmafia_polyfill();
var import_kolmafia27 = require("kolmafia");
var _templateObject160, _templateObject251, _templateObject331, _templateObject426, _templateObject521, _templateObject620, _templateObject720, _templateObject820;
var _templateObject1017, _templateObject1114;
function _taggedTemplateLiteral19(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
function timeToMeatify() {
  if (!have($familiar(_templateObject160 || (_templateObject160 = _taggedTemplateLiteral19(["Grey Goose"])))) || get("_meatifyMatterUsed") || !sober())
    return !1;
  if ($familiar(_templateObject251 || (_templateObject251 = _taggedTemplateLiteral19(["Grey Goose"]))).experience >= 400)
    return !0;
  if ((0, import_kolmafia27.myAdventures)() > 50)
    return !1;
  var totalTurns = (0, import_kolmafia27.totalTurnsPlayed)(), baseMeat = have($item(_templateObject331 || (_templateObject331 = _taggedTemplateLiteral19(["SongBoom\u2122 BoomBox"])))) ? 275 : 250, usingLatte = have($item(_templateObject426 || (_templateObject426 = _taggedTemplateLiteral19(["latte lovers member's mug"])))) && get("latteModifier").split(",").includes("Meat Drop: 40"), nextProtonicGhost = have($item(_templateObject521 || (_templateObject521 = _taggedTemplateLiteral19(["protonic accelerator pack"])))) ? Math.max(1, get("nextParanormalActivity") - totalTurns) : 1 / 0, nextVoteMonster = have($item(_templateObject620 || (_templateObject620 = _taggedTemplateLiteral19(['"I Voted!" sticker'])))) && get("_voteFreeFights") < 3 ? Math.max(0, (totalTurns % 11 - 1) % 11) : 1 / 0, nextVoidMonster = have($item(_templateObject720 || (_templateObject720 = _taggedTemplateLiteral19(["cursed magnifying glass"])))) && get("_voidFreeFights") < 5 && get("valueOfFreeFight", 2e3) / 13 > baseMeat * (usingLatte ? 0.75 : 0.6) ? -get("cursedMagnifyingGlassCount") % 13 : 1 / 0, freeFightNow = get("questPAGhost") !== "unstarted" || nextVoteMonster === 0 || nextVoidMonster === 0, delay = Math.min(nextProtonicGhost, nextVoteMonster === 0 ? get("_voteFreeFights") < 2 ? 11 : 1 / 0 : nextVoteMonster, nextVoidMonster === 0 ? 13 : nextVoidMonster);
  return delay < (0, import_kolmafia27.myAdventures)() ? !1 : !!(freeFightNow || $familiar(_templateObject820 || (_templateObject820 = _taggedTemplateLiteral19(["Grey Goose"]))).experience >= 121);
}
function canOpenRedPresent() {
  return have($familiar(_templateObject1017 || (_templateObject1017 = _taggedTemplateLiteral19(["Crimbo Shrub"])))) && !have($effect(_templateObject1114 || (_templateObject1114 = _taggedTemplateLiteral19(["Everything Looks Red"])))) && get("shrubGifts") === "meat" && sober();
}

// src/familiar/freeFightFamiliar.ts
var _templateObject161, _templateObject260, _templateObject337, _templateObject427, _templateObject523, _templateObject621, _templateObject721;
function _toConsumableArray15(arr) {
  return _arrayWithoutHoles15(arr) || _iterableToArray15(arr) || _unsupportedIterableToArray21(arr) || _nonIterableSpread15();
}
function _nonIterableSpread15() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray21(o, minLen) {
  if (!!o) {
    if (typeof o == "string")
      return _arrayLikeToArray21(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray21(o, minLen);
  }
}
function _iterableToArray15(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles15(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray21(arr);
}
function _arrayLikeToArray21(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function ownKeys6(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread6(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    i % 2 ? ownKeys6(Object(source), !0).forEach(function(key) {
      _defineProperty12(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys6(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty12(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
function _taggedTemplateLiteral20(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var DEFAULT_MENU_OPTIONS = {
  canChooseMacro: !0,
  location: $location(_templateObject161 || (_templateObject161 = _taggedTemplateLiteral20(["none"]))),
  extraFamiliars: [],
  includeExperienceFamiliars: !0,
  allowAttackFamiliars: !0
};
function menu() {
  var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, _DEFAULT_MENU_OPTIONS = _objectSpread6(_objectSpread6({}, DEFAULT_MENU_OPTIONS), options), includeExperienceFamiliars = _DEFAULT_MENU_OPTIONS.includeExperienceFamiliars, canChooseMacro = _DEFAULT_MENU_OPTIONS.canChooseMacro, location2 = _DEFAULT_MENU_OPTIONS.location, extraFamiliars = _DEFAULT_MENU_OPTIONS.extraFamiliars, allowAttackFamiliars = _DEFAULT_MENU_OPTIONS.allowAttackFamiliars, familiarMenu = [].concat(_toConsumableArray15(getConstantValueFamiliars()), _toConsumableArray15(getDropFamiliars()), _toConsumableArray15(includeExperienceFamiliars ? getExperienceFamiliars() : []), _toConsumableArray15(extraFamiliars), [{
    familiar: $familiar.none,
    expectedValue: 0,
    leprechaunMultiplier: 0,
    limit: "none"
  }]);
  return canChooseMacro && sober() && (timeToMeatify() && familiarMenu.push({
    familiar: $familiar(_templateObject260 || (_templateObject260 = _taggedTemplateLiteral20(["Grey Goose"]))),
    expectedValue: (Math.max((0, import_kolmafia28.familiarWeight)($familiar(_templateObject337 || (_templateObject337 = _taggedTemplateLiteral20(["Grey Goose"])))) - 5), 0 ** 4),
    leprechaunMultiplier: 0,
    limit: "experience"
  }), canOpenRedPresent() && familiarMenu.push({
    familiar: $familiar(_templateObject427 || (_templateObject427 = _taggedTemplateLiteral20(["Crimbo Shrub"]))),
    expectedValue: 2500,
    leprechaunMultiplier: 0,
    limit: "special"
  }), location2.zone === "Dinseylandfill" && have($familiar(_templateObject523 || (_templateObject523 = _taggedTemplateLiteral20(["Space Jellyfish"])))) && familiarMenu.push({
    familiar: $familiar(_templateObject621 || (_templateObject621 = _taggedTemplateLiteral20(["Space Jellyfish"]))),
    expectedValue: garboValue($item(_templateObject721 || (_templateObject721 = _taggedTemplateLiteral20(["stench jelly"])))) / (get("_spaceJellyfishDrops") < 5 ? get("_spaceJellyfishDrops") + 1 : 20),
    leprechaunMultiplier: 0,
    limit: "special"
  })), allowAttackFamiliars ? familiarMenu : familiarMenu.filter(function(fam) {
    return !(fam.familiar.physicalDamage || fam.familiar.elementalDamage);
  });
}
function freeFightFamiliarData() {
  var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, compareFamiliars = function(a, b) {
    return a.expectedValue === b.expectedValue ? a.leprechaunMultiplier > b.leprechaunMultiplier ? a : b : a.expectedValue > b.expectedValue ? a : b;
  };
  return menu(options).reduce(compareFamiliars);
}
function freeFightFamiliar() {
  var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  return freeFightFamiliarData(options).familiar;
}

// src/macro.ts
var _templateObject170, _templateObject261, _templateObject338, _templateObject428, _templateObject524, _templateObject623, _templateObject723, _templateObject821, _templateObject919, _templateObject1018, _templateObject1115, _templateObject1213, _templateObject1313, _templateObject1413, _templateObject1513, _templateObject1612;
function _toConsumableArray16(arr) {
  return _arrayWithoutHoles16(arr) || _iterableToArray16(arr) || _unsupportedIterableToArray22(arr) || _nonIterableSpread16();
}
function _nonIterableSpread16() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray16(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles16(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray22(arr);
}
function _createForOfIteratorHelper13(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray22(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e) {
        throw _e;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e2) {
    didErr = !0, err = _e2;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _unsupportedIterableToArray22(o, minLen) {
  if (!!o) {
    if (typeof o == "string")
      return _arrayLikeToArray22(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray22(o, minLen);
  }
}
function _arrayLikeToArray22(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _taggedTemplateLiteral21(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
function _classCallCheck14(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties14(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass14(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties14(Constructor.prototype, protoProps), staticProps && _defineProperties14(Constructor, staticProps), Object.defineProperty(Constructor, "prototype", { writable: !1 }), Constructor;
}
function _inherits6(subClass, superClass) {
  if (typeof superClass != "function" && superClass !== null)
    throw new TypeError("Super expression must either be null or a function");
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: !0, configurable: !0 } }), Object.defineProperty(subClass, "prototype", { writable: !1 }), superClass && _setPrototypeOf6(subClass, superClass);
}
function _setPrototypeOf6(o, p) {
  return _setPrototypeOf6 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(o2, p2) {
    return o2.__proto__ = p2, o2;
  }, _setPrototypeOf6(o, p);
}
function _createSuper6(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct6();
  return function() {
    var Super = _getPrototypeOf6(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf6(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else
      result = Super.apply(this, arguments);
    return _possibleConstructorReturn6(this, result);
  };
}
function _possibleConstructorReturn6(self2, call) {
  if (call && (typeof call == "object" || typeof call == "function"))
    return call;
  if (call !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized6(self2);
}
function _assertThisInitialized6(self2) {
  if (self2 === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return self2;
}
function _isNativeReflectConstruct6() {
  if (typeof Reflect == "undefined" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch (e) {
    return !1;
  }
}
function _getPrototypeOf6(o) {
  return _getPrototypeOf6 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  }, _getPrototypeOf6(o);
}
var Macro2 = /* @__PURE__ */ function(_StrictMacro) {
  _inherits6(Macro3, _StrictMacro);
  var _super = _createSuper6(Macro3);
  function Macro3() {
    return _classCallCheck14(this, Macro3), _super.apply(this, arguments);
  }
  return _createClass14(Macro3, [{
    key: "tryHaveSkill",
    value: function(skill) {
      return this.externalIf(have(skill), Macro3.trySkill(skill));
    }
  }, {
    key: "tryHaveItem",
    value: function(item5) {
      return this.externalIf(have(item5), Macro3.tryItem(item5));
    }
  }, {
    key: "redigitize",
    value: function() {
      var _get3;
      return this.externalIf(shouldRedigitize(), Macro3.if_((_get3 = get("_sourceTerminalDigitizeMonster")) !== null && _get3 !== void 0 ? _get3 : $monster.none, Macro3.skill($skill(_templateObject170 || (_templateObject170 = _taggedTemplateLiteral21(["Digitize"]))))));
    }
  }, {
    key: "doItems",
    value: function() {
      var steps = new Macro3(), items = $items(_templateObject261 || (_templateObject261 = _taggedTemplateLiteral21(["Rain-Doh blue balls, Time-Spinner, Rain-Doh indigo cup, porquoise-handled sixgun"]))).filter(function(i2) {
        return have(i2);
      });
      if (items.length)
        if (have($skill(_templateObject338 || (_templateObject338 = _taggedTemplateLiteral21(["Ambidextrous Funkslinging"])))))
          for (var i = 0; i <= items.length; i += 2) {
            var chunk = items.slice(i, i + 2);
            chunk.length === 2 ? steps.tryItem(chunk) : steps.tryItem.apply(steps, _toConsumableArray16(chunk));
          }
        else {
          var _iterator = _createForOfIteratorHelper13(items), _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done; ) {
              var item5 = _step.value;
              steps.tryItem(item5);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
      else
        steps.tryHaveItem($item(_templateObject428 || (_templateObject428 = _taggedTemplateLiteral21(["seal tooth"]))));
      return this.step(steps);
    }
  }, {
    key: "standardCombat",
    value: function() {
      return this.tryHaveSkill($skill(_templateObject524 || (_templateObject524 = _taggedTemplateLiteral21(["Curse of Weaksauce"])))).externalIf(canOpenRedPresent() && (0, import_kolmafia29.myFamiliar)() === $familiar(_templateObject623 || (_templateObject623 = _taggedTemplateLiteral21(["Crimbo Shrub"]))), Macro3.trySkill($skill(_templateObject723 || (_templateObject723 = _taggedTemplateLiteral21(["Open a Big Red Present"]))))).externalIf(timeToMeatify() && (0, import_kolmafia29.myFamiliar)() === $familiar(_templateObject821 || (_templateObject821 = _taggedTemplateLiteral21(["Grey Goose"]))), Macro3.trySkill($skill(_templateObject919 || (_templateObject919 = _taggedTemplateLiteral21(["Meatify Matter"]))))).externalIf(get("cosmicBowlingBallReturnCombats") < 1, Macro3.trySkill($skill(_templateObject1018 || (_templateObject1018 = _taggedTemplateLiteral21(["Bowl Straight Up"]))))).externalIf(SongBoom_exports.song() === "Total Eclipse of Your Meat", Macro3.tryHaveSkill($skill(_templateObject1115 || (_templateObject1115 = _taggedTemplateLiteral21(["Sing Along"]))))).tryHaveSkill($skill(_templateObject1213 || (_templateObject1213 = _taggedTemplateLiteral21(["Extract"])))).tryHaveSkill($skill(_templateObject1313 || (_templateObject1313 = _taggedTemplateLiteral21(["Micrometeorite"])))).doItems().tryHaveSkill($skill(_templateObject1413 || (_templateObject1413 = _taggedTemplateLiteral21(["Nantlers"])))).tryHaveSkill($skill(_templateObject1513 || (_templateObject1513 = _taggedTemplateLiteral21(["Nanoshock"])))).tryHaveSkill($skill(_templateObject1612 || (_templateObject1612 = _taggedTemplateLiteral21(["Audioclasm"])))).attack().repeat();
    }
  }], [{
    key: "tryHaveSkill",
    value: function(skill) {
      return new Macro3().tryHaveSkill(skill);
    }
  }, {
    key: "tryHaveItem",
    value: function(item5) {
      return new Macro3().tryHaveItem(item5);
    }
  }, {
    key: "redigitize",
    value: function() {
      return new Macro3().redigitize();
    }
  }, {
    key: "standardCombat",
    value: function() {
      return new Macro3().standardCombat();
    }
  }]), Macro3;
}(StrictMacro);

// src/outfit.ts
init_kolmafia_polyfill();
var import_kolmafia30 = require("kolmafia");
var _templateObject171, _templateObject270, _templateObject339, _templateObject429, _templateObject525, _templateObject624, _templateObject724, _templateObject823, _templateObject920, _templateObject1019, _templateObject1116, _templateObject1214, _templateObject1314, _templateObject1414, _templateObject1514, _templateObject1613, _templateObject1712, _templateObject1812, _templateObject1912, _templateObject2010, _templateObject2114, _templateObject2211, _templateObject2311, _templateObject2410, _templateObject2510, _templateObject2610, _templateObject2710, _templateObject289, _templateObject299, _templateObject309, _templateObject3112, _templateObject3210, _templateObject3310, _templateObject347, _templateObject357, _templateObject366;
function _toConsumableArray17(arr) {
  return _arrayWithoutHoles17(arr) || _iterableToArray17(arr) || _unsupportedIterableToArray23(arr) || _nonIterableSpread17();
}
function _nonIterableSpread17() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray17(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles17(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray23(arr);
}
function _slicedToArray8(arr, i) {
  return _arrayWithHoles8(arr) || _iterableToArrayLimit8(arr, i) || _unsupportedIterableToArray23(arr, i) || _nonIterableRest8();
}
function _nonIterableRest8() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray23(o, minLen) {
  if (!!o) {
    if (typeof o == "string")
      return _arrayLikeToArray23(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray23(o, minLen);
  }
}
function _arrayLikeToArray23(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit8(arr, i) {
  var _i = arr == null ? null : typeof Symbol != "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i != null) {
    var _arr = [], _n = !0, _d = !1, _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !(i && _arr.length === i)); _n = !0)
        ;
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        !_n && _i.return != null && _i.return();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles8(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _taggedTemplateLiteral22(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
function ownKeys7(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread7(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    i % 2 ? ownKeys7(Object(source), !0).forEach(function(key) {
      _defineProperty13(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys7(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty13(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
function ifHave(slot, item5, condition) {
  var _condition;
  return have(item5) && (0, import_kolmafia30.canEquip)(item5) && ((_condition = condition == null ? void 0 : condition()) !== null && _condition !== void 0 ? _condition : !0) ? Object.fromEntries([[slot, item5]]) : {};
}
function mergeSpecs() {
  for (var _len = arguments.length, outfits = new Array(_len), _key = 0; _key < _len; _key++)
    outfits[_key] = arguments[_key];
  return outfits.reduce(function(current, next) {
    return _objectSpread7(_objectSpread7({}, next), current);
  }, {});
}
var chooseFamiliar = function() {
  var _find, options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  return (0, import_kolmafia30.canInteract)() && sober() ? (_find = $familiars(_templateObject171 || (_templateObject171 = _taggedTemplateLiteral22(["Reagnimated Gnome, Temporal Riftlet"]))).find(function(f) {
    return have(f);
  })) !== null && _find !== void 0 ? _find : freeFightFamiliar(options) : freeFightFamiliar(options);
};
function chooseQuestOutfit(_ref2) {
  for (var _equipmentFamiliars$g, location2 = _ref2.location, isFree = _ref2.isFree, familiar3 = chooseFamiliar({
    location: location2
  }), famEquip = (_equipmentFamiliars$g = equipmentFamiliars.get(familiar3)) !== null && _equipmentFamiliars$g !== void 0 ? _equipmentFamiliars$g : familiar3.elementalDamage || familiar3.physicalDamage ? $item(_templateObject270 || (_templateObject270 = _taggedTemplateLiteral22(["tiny stillsuit"]))) : $item(_templateObject339 || (_templateObject339 = _taggedTemplateLiteral22(["oversized fish scaler"]))), weapons = mergeSpecs(ifHave("weapon", $item(_templateObject429 || (_templateObject429 = _taggedTemplateLiteral22(["June cleaver"])))), ifHave("weapon", $item(_templateObject525 || (_templateObject525 = _taggedTemplateLiteral22(["Fourth of May Cosplay Saber"]))))), offhands = ifHave("offhand", $item(_templateObject624 || (_templateObject624 = _taggedTemplateLiteral22(["cursed magnifying glass"]))), function() {
    return get("_voidFreeFights") < 5 && get("cursedMagnifyingGlassCount") < 13;
  }), backs = mergeSpecs(ifHave("back", $item(_templateObject724 || (_templateObject724 = _taggedTemplateLiteral22(["protonic accelerator pack"]))), function() {
    return get("questPAGhost") === "unstarted" && get("nextParanormalActivity") <= (0, import_kolmafia30.totalTurnsPlayed)() && sober();
  }), ifHave("back", $item(_templateObject823 || (_templateObject823 = _taggedTemplateLiteral22(["Trainbot harness"]))), function() {
    return harnessIsEffective(location2);
  })), spec = mergeSpecs(ifHave("hat", $item(_templateObject920 || (_templateObject920 = _taggedTemplateLiteral22(["Crown of Thrones"])))), weapons, offhands, backs, {
    familiar: familiar3
  }, ifHave("famequip", famEquip), ifHave("pants", $item(_templateObject1019 || (_templateObject1019 = _taggedTemplateLiteral22(["designer sweatpants"]))), function() {
    return 25 * get("_sweatOutSomeBoozeUsed") + get("sweat") < 75;
  }), ifHave("pants", $item(_templateObject1116 || (_templateObject1116 = _taggedTemplateLiteral22(["Pantsgiving"]))), function() {
    return get("_pantsgivingCount") < 50 || get("_pantsgivingFullness") < 2 && getRemainingStomach() === 0;
  }), {
    modifier: "Familiar Weight"
  }), bestAccessories = getBestAccessories(isFree), i = 0; i < 3; i++) {
    var accessory = bestAccessories[i];
    if (!accessory)
      break;
    spec["acc".concat(i + 1)] = accessory;
  }
  for (var _len2 = arguments.length, outfits = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++)
    outfits[_key2 - 1] = arguments[_key2];
  var mergedSpec = mergeSpecs.apply(void 0, outfits.concat([spec])), preferCrown = harnessIsEffective(location2), _ref22 = preferCrown ? [$item(_templateObject1214 || (_templateObject1214 = _taggedTemplateLiteral22(["Crown of Thrones"]))), $item(_templateObject1314 || (_templateObject1314 = _taggedTemplateLiteral22(["Buddy Bjorn"])))] : [$item(_templateObject1414 || (_templateObject1414 = _taggedTemplateLiteral22(["Buddy Bjorn"]))), $item(_templateObject1514 || (_templateObject1514 = _taggedTemplateLiteral22(["Crown of Thrones"])))], _ref32 = _slicedToArray8(_ref22, 2), goodFammy = _ref32[0], lessGoodFammy = _ref32[1], lessGoodSlot = (0, import_kolmafia30.toSlot)(lessGoodFammy).toString();
  if (!have(goodFammy) && have(lessGoodFammy) && !(lessGoodSlot in mergedSpec))
    mergedSpec[lessGoodSlot] = lessGoodFammy;
  else {
    var _mergedSpec$avoid;
    mergedSpec.avoid = [].concat(_toConsumableArray17((_mergedSpec$avoid = mergedSpec.avoid) !== null && _mergedSpec$avoid !== void 0 ? _mergedSpec$avoid : []), [lessGoodFammy]);
  }
  return mergedSpec;
}
function harnessIsEffective(location2) {
  return !1;
}
var equipmentFamiliars = /* @__PURE__ */ new Map([[$familiar(_templateObject1613 || (_templateObject1613 = _taggedTemplateLiteral22(["Reagnimated Gnome"]))), $item(_templateObject1712 || (_templateObject1712 = _taggedTemplateLiteral22(["gnomish housemaid's kgnee"])))], [$familiar(_templateObject1812 || (_templateObject1812 = _taggedTemplateLiteral22(["Shorter-Order Cook"]))), $item(_templateObject1912 || (_templateObject1912 = _taggedTemplateLiteral22(["blue plate"])))], [$familiar(_templateObject2010 || (_templateObject2010 = _taggedTemplateLiteral22(["Stocking Mimic"]))), $item(_templateObject2114 || (_templateObject2114 = _taggedTemplateLiteral22(["bag of many confections"])))]]);
function luckyGoldRing() {
  var dropValues = [100].concat(_toConsumableArray17([
    (0, import_kolmafia30.itemAmount)($item(_templateObject2211 || (_templateObject2211 = _taggedTemplateLiteral22(["hobo nickel"])))) > 0 ? 100 : 0,
    (0, import_kolmafia30.itemAmount)($item(_templateObject2311 || (_templateObject2311 = _taggedTemplateLiteral22(["sand dollar"])))) > 0 ? garboValue($item(_templateObject2410 || (_templateObject2410 = _taggedTemplateLiteral22(["sand dollar"])))) : 0,
    (0, import_kolmafia30.itemAmount)($item(_templateObject2510 || (_templateObject2510 = _taggedTemplateLiteral22(["Freddy Kruegerand"])))) > 0 ? garboValue($item(_templateObject2610 || (_templateObject2610 = _taggedTemplateLiteral22(["Freddy Kruegerand"])))) : 0,
    realmAvailable("sleaze") ? garboValue($item(_templateObject2710 || (_templateObject2710 = _taggedTemplateLiteral22(["Beach Buck"])))) : 0,
    realmAvailable("spooky") ? garboValue($item(_templateObject289 || (_templateObject289 = _taggedTemplateLiteral22(["Coinspiracy"])))) : 0,
    realmAvailable("stench") ? garboValue($item(_templateObject299 || (_templateObject299 = _taggedTemplateLiteral22(["FunFunds\u2122"])))) : 0,
    realmAvailable("hot") && !get("_luckyGoldRingVolcoino") ? garboValue($item(_templateObject309 || (_templateObject309 = _taggedTemplateLiteral22(["Volcoino"])))) : 0,
    realmAvailable("cold") ? garboValue($item(_templateObject3112 || (_templateObject3112 = _taggedTemplateLiteral22(["Wal-Mart gift certificate"])))) : 0,
    realmAvailable("fantasy") ? garboValue($item(_templateObject3210 || (_templateObject3210 = _taggedTemplateLiteral22(["Rubee\u2122"])))) : 0
  ].filter(function(value) {
    return value > 0;
  })));
  return sumNumbers(dropValues) / dropValues.length / 10;
}
var accessories = /* @__PURE__ */ new Map([[$item(_templateObject3310 || (_templateObject3310 = _taggedTemplateLiteral22(["mafia thumb ring"]))), function(isFree) {
  return isFree ? 0 : (1 / 0.96 - 1) * get("valueOfAdventure");
}], [$item(_templateObject347 || (_templateObject347 = _taggedTemplateLiteral22(["lucky gold ring"]))), luckyGoldRing], [$item(_templateObject357 || (_templateObject357 = _taggedTemplateLiteral22(["Mr. Screege's spectacles"]))), function() {
  return 180;
}], [$item(_templateObject366 || (_templateObject366 = _taggedTemplateLiteral22(["Mr. Cheeng's spectacles"]))), function() {
  return 220;
}]]);
function getBestAccessories(isFree) {
  return Array.from(accessories.entries()).filter(function(_ref42) {
    var _ref5 = _slicedToArray8(_ref42, 1), item5 = _ref5[0];
    return have(item5) && (0, import_kolmafia30.canEquip)(item5);
  }).map(function(_ref6) {
    var _ref7 = _slicedToArray8(_ref6, 2), item5 = _ref7[0], valueFunction = _ref7[1];
    return [item5, valueFunction(isFree)];
  }).sort(function(_ref8, _ref9) {
    var _ref102 = _slicedToArray8(_ref8, 2), a = _ref102[1], _ref11 = _slicedToArray8(_ref9, 2), b = _ref11[1];
    return b - a;
  }).map(function(_ref12) {
    var _ref13 = _slicedToArray8(_ref12, 1), item5 = _ref13[0];
    return item5;
  }).splice(0, 3);
}

// src/caboose.ts
var _templateObject180, _templateObject271, _templateObject340;
function _taggedTemplateLiteral23(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var location = $location(_templateObject180 || (_templateObject180 = _taggedTemplateLiteral23(["Crimbo Train (Caboose)"]))), caboose = {
  name: "Caboose",
  location: location,
  tasks: [{
    name: "Crimbo",
    completed: function() {
      return !1;
    },
    do: location,
    outfit: function() {
      var drunkSpec = sober() ? {} : {
        offhand: $item(_templateObject271 || (_templateObject271 = _taggedTemplateLiteral23(["Drunkula's wineglass"])))
      };
      return chooseQuestOutfit({
        location: location,
        isFree: !1
      }, drunkSpec);
    },
    effects: function() {
      return $effects(_templateObject340 || (_templateObject340 = _taggedTemplateLiteral23(["Blood Bond, Empathy, Leash of Linguini"]))).filter(function(effect) {
        return have((0, import_kolmafia31.toSkill)(effect));
      });
    },
    combat: new CrimboStrategy(function() {
      return Macro2.standardCombat();
    }),
    sobriety: "either"
  }]
};

// src/setup.ts
init_kolmafia_polyfill();
var import_kolmafia32 = require("kolmafia");
var _templateObject181, _templateObject280, _templateObject341, _templateObject430, _templateObject526, _templateObject625, _templateObject725, _templateObject824, _templateObject921, _templateObject1020, _templateObject1117, _templateObject1215, _templateObject1315, _templateObject1415, _templateObject1515, _templateObject1614, _templateObject1713, _templateObject1813, _templateObject1913, _templateObject2011, _templateObject2115, _templateObject2212, _templateObject2312, _templateObject2411, _templateObject2511, _templateObject2611;
function _taggedTemplateLiteral24(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var poisons = $effects(_templateObject181 || (_templateObject181 = _taggedTemplateLiteral24(["Hardly Poisoned at All, A Little Bit Poisoned, Somewhat Poisoned, Really Quite Poisoned, Majorly Poisoned"])));
function cmcTarget() {
  return args.car === "caboose" ? {
    item: $item(_templateObject280 || (_templateObject280 = _taggedTemplateLiteral24(["Extrovermectin\u2122"]))),
    environment: "i"
  } : {
    item: $item(_templateObject341 || (_templateObject341 = _taggedTemplateLiteral24(["Breathitin\u2122"]))),
    environment: "u"
  };
}
var setup = {
  name: "Setup",
  tasks: [{
    name: "Beaten Up",
    completed: function() {
      return !have($effect(_templateObject430 || (_templateObject430 = _taggedTemplateLiteral24(["Beaten Up"]))));
    },
    do: function() {
      if (["Poetic Justice", "Lost and Found"].includes(get("lastEncounter")) && uneffect($effect(_templateObject526 || (_templateObject526 = _taggedTemplateLiteral24(["Beaten Up"])))), have($effect(_templateObject625 || (_templateObject625 = _taggedTemplateLiteral24(["Beaten Up"])))))
        throw "Got beaten up for no discernable reason!";
    },
    sobriety: "either"
  }, {
    name: "Disco Nap",
    ready: function() {
      return have($skill(_templateObject725 || (_templateObject725 = _taggedTemplateLiteral24(["Disco Nap"])))) && have($skill(_templateObject824 || (_templateObject824 = _taggedTemplateLiteral24(["Adventurer of Leisure"]))));
    },
    completed: function() {
      return poisons.every(function(e) {
        return !have(e);
      });
    },
    do: function() {
      return (0, import_kolmafia32.useSkill)($skill(_templateObject921 || (_templateObject921 = _taggedTemplateLiteral24(["Disco Nap"]))));
    },
    sobriety: "either"
  }, {
    name: "Antidote",
    completed: function() {
      return poisons.every(function(e) {
        return !have(e);
      });
    },
    do: function() {
      return poisons.forEach(function(e) {
        return uneffect(e);
      });
    },
    sobriety: "either"
  }, {
    name: "Recover",
    ready: function() {
      return have($skill(_templateObject1020 || (_templateObject1020 = _taggedTemplateLiteral24(["Cannelloni Cocoon"]))));
    },
    completed: function() {
      return (0, import_kolmafia32.myHp)() / (0, import_kolmafia32.myMaxhp)() >= 0.5;
    },
    do: function() {
      (0, import_kolmafia32.useSkill)($skill(_templateObject1117 || (_templateObject1117 = _taggedTemplateLiteral24(["Cannelloni Cocoon"]))));
    },
    sobriety: "either"
  }, {
    name: "Recover Failed",
    completed: function() {
      return (0, import_kolmafia32.myHp)() / (0, import_kolmafia32.myMaxhp)() >= 0.5;
    },
    do: function() {
      throw "Unable to heal above 50% HP, heal yourself!";
    },
    sobriety: "either"
  }, {
    name: "Kgnee",
    completed: function() {
      return !have($familiar(_templateObject1215 || (_templateObject1215 = _taggedTemplateLiteral24(["Reagnimated Gnome"])))) || have($item(_templateObject1315 || (_templateObject1315 = _taggedTemplateLiteral24(["gnomish housemaid's kgnee"]))));
    },
    do: function() {
      (0, import_kolmafia32.visitUrl)("arena.php"), (0, import_kolmafia32.runChoice)(4);
    },
    outfit: {
      familiar: $familiar(_templateObject1415 || (_templateObject1415 = _taggedTemplateLiteral24(["Reagnimated Gnome"])))
    },
    sobriety: "sober"
  }, {
    name: "Closet Sand Dollars",
    completed: function() {
      return (0, import_kolmafia32.itemAmount)($item(_templateObject1515 || (_templateObject1515 = _taggedTemplateLiteral24(["sand dollar"])))) === 0;
    },
    do: function() {
      return (0, import_kolmafia32.putCloset)((0, import_kolmafia32.itemAmount)($item(_templateObject1614 || (_templateObject1614 = _taggedTemplateLiteral24(["sand dollar"])))), $item(_templateObject1713 || (_templateObject1713 = _taggedTemplateLiteral24(["sand dollar"]))));
    },
    sobriety: "either"
  }, {
    name: "Closet Hobo Nickels",
    completed: function() {
      return (0, import_kolmafia32.itemAmount)($item(_templateObject1813 || (_templateObject1813 = _taggedTemplateLiteral24(["hobo nickel"])))) === 0 || !have($familiar(_templateObject1913 || (_templateObject1913 = _taggedTemplateLiteral24(["Hobo Monkey"])))) && !have($item(_templateObject2011 || (_templateObject2011 = _taggedTemplateLiteral24(["hobo nickel"]))), 1e3);
    },
    do: function() {
      return (0, import_kolmafia32.putCloset)((0, import_kolmafia32.itemAmount)($item(_templateObject2115 || (_templateObject2115 = _taggedTemplateLiteral24(["hobo nickel"])))), $item(_templateObject2212 || (_templateObject2212 = _taggedTemplateLiteral24(["hobo nickel"]))));
    },
    sobriety: "either"
  }, {
    name: "Snapper",
    completed: function() {
      return Snapper_exports.getTrackedPhylum() === $phylum(_templateObject2312 || (_templateObject2312 = _taggedTemplateLiteral24(["dude"])));
    },
    do: function() {
      return Snapper_exports.trackPhylum($phylum(_templateObject2411 || (_templateObject2411 = _taggedTemplateLiteral24(["dude"]))));
    },
    ready: function() {
      return Snapper_exports.have();
    },
    sobriety: "either"
  }, {
    name: "Autumn-Aton",
    completed: function() {
      return AutumnAton_exports.currentlyIn() !== null;
    },
    do: function() {
      return AutumnAton_exports.sendTo($locations(_templateObject2511 || (_templateObject2511 = _taggedTemplateLiteral24(["Moonshiners' Woods, The Cave Before Time, The Sleazy Back Alley"]))));
    },
    ready: function() {
      return AutumnAton_exports.available();
    },
    sobriety: "either"
  }, {
    name: "Cold Medicine Cabinent",
    completed: function() {
      return (0, import_kolmafia32.getWorkshed)() !== $item(_templateObject2611 || (_templateObject2611 = _taggedTemplateLiteral24(["cold medicine cabinet"]))) || (0, import_kolmafia32.totalTurnsPlayed)() < get("_nextColdMedicineConsult") || get("_coldMedicineConsults") >= 5 || countEnvironment(cmcTarget().environment) <= 10;
    },
    do: function() {
      return tryGetCMCItem(cmcTarget().item);
    },
    sobriety: "either"
  }, {
    name: "Boombox",
    completed: function() {
      return !SongBoom_exports.have() || SongBoom_exports.song() === "Food Vibrations" || SongBoom_exports.songChangesLeft() === 0;
    },
    do: function() {
      return SongBoom_exports.setSong("Food Vibrations");
    },
    sobriety: "either"
  }]
};

// src/wanderer/index.ts
init_kolmafia_polyfill();

// src/wanderer/guzzlr.ts
init_kolmafia_polyfill();
var import_kolmafia34 = require("kolmafia");

// src/wanderer/lib.ts
init_kolmafia_polyfill();
var import_kolmafia33 = require("kolmafia");
var _templateObject190, _templateObject281, _templateObject348, _templateObject431, _templateObject527, _templateObject626, _templateObject726, _templateObject825, _templateObject923, _templateObject1021, _templateObject1118, _templateObject1216, _templateObject1316, _templateObject1416, _templateObject1516, _templateObject1615, _templateObject1714, _templateObject1814, _templateObject1914, _templateObject2012, _templateObject2116, _templateObject2213;
function _defineProperties15(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass15(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties15(Constructor.prototype, protoProps), staticProps && _defineProperties15(Constructor, staticProps), Object.defineProperty(Constructor, "prototype", { writable: !1 }), Constructor;
}
function _classCallCheck15(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperty14(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
function _toConsumableArray18(arr) {
  return _arrayWithoutHoles18(arr) || _iterableToArray18(arr) || _unsupportedIterableToArray24(arr) || _nonIterableSpread18();
}
function _nonIterableSpread18() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray24(o, minLen) {
  if (!!o) {
    if (typeof o == "string")
      return _arrayLikeToArray24(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray24(o, minLen);
  }
}
function _iterableToArray18(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles18(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray24(arr);
}
function _arrayLikeToArray24(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _taggedTemplateLiteral25(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var UnlockableZones = [{
  zone: "Spaaace",
  available: function() {
    return have($effect(_templateObject190 || (_templateObject190 = _taggedTemplateLiteral25(["Transpondent"]))));
  },
  unlocker: $item(_templateObject281 || (_templateObject281 = _taggedTemplateLiteral25(["transporter transponder"]))),
  noInv: !1
}, {
  zone: "Wormwood",
  available: function() {
    return have($effect(_templateObject348 || (_templateObject348 = _taggedTemplateLiteral25(["Absinthe-Minded"]))));
  },
  unlocker: $item(_templateObject431 || (_templateObject431 = _taggedTemplateLiteral25(["tiny bottle of absinthe"]))),
  noInv: !1
}, {
  zone: "Rabbit Hole",
  available: function() {
    return have($effect(_templateObject527 || (_templateObject527 = _taggedTemplateLiteral25(["Down the Rabbit Hole"]))));
  },
  unlocker: $item(_templateObject626 || (_templateObject626 = _taggedTemplateLiteral25(['"DRINK ME" potion']))),
  noInv: !1
}, {
  zone: "Conspiracy Island",
  available: function() {
    return realmAvailable("spooky");
  },
  unlocker: $item(_templateObject726 || (_templateObject726 = _taggedTemplateLiteral25(["one-day ticket to Conspiracy Island"]))),
  noInv: !0
}, {
  zone: "Dinseylandfill",
  available: function() {
    return realmAvailable("stench");
  },
  unlocker: $item(_templateObject825 || (_templateObject825 = _taggedTemplateLiteral25(["one-day ticket to Dinseylandfill"]))),
  noInv: !0
}, {
  zone: "The Glaciest",
  available: function() {
    return realmAvailable("cold");
  },
  unlocker: $item(_templateObject923 || (_templateObject923 = _taggedTemplateLiteral25(["one-day ticket to The Glaciest"]))),
  noInv: !0
}, {
  zone: "Spring Break Beach",
  available: function() {
    return realmAvailable("sleaze");
  },
  unlocker: $item(_templateObject1021 || (_templateObject1021 = _taggedTemplateLiteral25(["one-day ticket to Spring Break Beach"]))),
  noInv: !0
}];
function underwater(location2) {
  return location2.environment === "underwater";
}
var canAdventureOrUnlockSkipList = [].concat(_toConsumableArray18($locations(_templateObject1118 || (_templateObject1118 = _taggedTemplateLiteral25(["The Oasis, The Bubblin' Caldera, Barrrney's Barrr, The F'c'le, The Poop Deck, Belowdecks, 8-Bit Realm, Madness Bakery, The Secret Government Laboratory, The Dire Warren, Inside the Palindome, The Haiku Dungeon, An Incredibly Strange Place (Bad Trip), An Incredibly Strange Place (Mediocre Trip), An Incredibly Strange Place (Great Trip)"])))), _toConsumableArray18(import_kolmafia33.Location.all().filter(function(l) {
  return l.parent === "Clan Basement";
})));
function canAdventureOrUnlock(loc) {
  var skiplist = _toConsumableArray18(canAdventureOrUnlockSkipList);
  !have($item(_templateObject1216 || (_templateObject1216 = _taggedTemplateLiteral25(["repaid diaper"])))) && have($item(_templateObject1316 || (_templateObject1316 = _taggedTemplateLiteral25(["Great Wolf's beastly trousers"])))) && skiplist.push($location(_templateObject1416 || (_templateObject1416 = _taggedTemplateLiteral25(["The Icy Peak"]))));
  var canUnlock = UnlockableZones.some(function(z) {
    return loc.zone === z.zone && (z.available() || !z.noInv);
  });
  return !underwater(loc) && !skiplist.includes(loc) && ((0, import_kolmafia33.canAdventure)(loc) || canUnlock);
}
function unlock(loc, value) {
  var unlockableZone = UnlockableZones.find(function(z) {
    return z.zone === loc.zone;
  });
  return unlockableZone ? unlockableZone.available() ? !0 : (0, import_kolmafia33.buy)(1, unlockableZone.unlocker, value) === 0 ? !1 : (0, import_kolmafia33.use)(unlockableZone.unlocker) : (0, import_kolmafia33.canAdventure)(loc);
}
var backupSkiplist = $locations(_templateObject1516 || (_templateObject1516 = _taggedTemplateLiteral25(["The Overgrown Lot, The Skeleton Store, The Mansion of Dr. Weirdeaux"])));
function canWanderTypeBackup(location2) {
  return !backupSkiplist.includes(location2) && location2.combatPercent >= 100;
}
function canWanderTypeYellowRay(location2) {
  return location2 === $location(_templateObject1615 || (_templateObject1615 = _taggedTemplateLiteral25(["The Fun-Guy Mansion"]))) && get("funGuyMansionKills", 0) >= 100 ? !1 : canWanderTypeBackup(location2);
}
var wandererSkiplist = $locations(_templateObject1714 || (_templateObject1714 = _taggedTemplateLiteral25(["The Batrat and Ratbat Burrow, Guano Junction, The Beanbat Chamber, A-Boo Peak"])));
function canWanderTypeWander(location2) {
  return !wandererSkiplist.includes(location2) && location2.wanderers;
}
function canWander(location2, type) {
  if (underwater(location2))
    return !1;
  switch (type) {
    case "backup":
      return canWanderTypeBackup(location2);
    case "yellow ray":
      return canWanderTypeYellowRay(location2);
    case "wanderer":
      return canWanderTypeWander(location2);
  }
}
var WandererTarget = /* @__PURE__ */ _createClass15(
  function WandererTarget2(name, location2, value) {
    var prepareTurn = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : function() {
      return !0;
    };
    _classCallCheck15(this, WandererTarget2), _defineProperty14(this, "name", void 0), _defineProperty14(this, "value", void 0), _defineProperty14(this, "location", void 0), _defineProperty14(this, "prepareTurn", void 0), this.name = name, this.value = value, this.location = location2, this.prepareTurn = prepareTurn;
  }
);
function defaultFactory() {
  return [new WandererTarget("Default", $location(_templateObject1814 || (_templateObject1814 = _taggedTemplateLiteral25(["The Haunted Kitchen"]))), 0)];
}
var WanderingSources = [{
  name: "CMG",
  item: $item(_templateObject1914 || (_templateObject1914 = _taggedTemplateLiteral25(["cursed magnifying glass"]))),
  max: 3,
  property: "_voidFreeFights",
  type: "wanderer"
}, {
  name: "Voter",
  item: $item(_templateObject2012 || (_templateObject2012 = _taggedTemplateLiteral25(['"I Voted!" sticker']))),
  max: 3,
  property: "_voteFreeFights",
  type: "wanderer"
}, {
  name: "Voter",
  item: $item(_templateObject2116 || (_templateObject2116 = _taggedTemplateLiteral25(['"I Voted!" sticker']))),
  max: 3,
  property: "_voteFreeFights",
  type: "wanderer"
}, {
  name: "Backup",
  item: $item(_templateObject2213 || (_templateObject2213 = _taggedTemplateLiteral25(["backup camera"]))),
  max: 11,
  property: "_backUpUses",
  type: "backup"
}];
function wandererTurnsAvailableToday(location2) {
  var canWanderCache = {
    backup: canWander(location2, "backup"),
    wanderer: canWander(location2, "wanderer"),
    "yellow ray": canWander(location2, "yellow ray")
  }, digitize = canWanderCache.backup ? digitizedMonstersRemaining() : 0, yellowRay = canWanderCache["yellow ray"] ? Math.floor((0, import_kolmafia33.myAdventures)() / 100) : 0, wanderers = sum(WanderingSources, function(source) {
    return canWanderCache[source.type] && have(source.item) ? clamp(get(source.property), 0, source.max) : 0;
  });
  return digitize + yellowRay + wanderers;
}

// src/wanderer/guzzlr.ts
var _templateObject191, _templateObject290, _templateObject349;
function _taggedTemplateLiteral26(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
function freeCrafts() {
  return (have($skill(_templateObject191 || (_templateObject191 = _taggedTemplateLiteral26(["Rapid Prototyping"])))) ? 5 - get("_rapidPrototypingUsed") : 0) + (have($skill(_templateObject290 || (_templateObject290 = _taggedTemplateLiteral26(["Expert Corner-Cutter"])))) ? 5 - get("_expertCornerCutterUsed") : 0);
}
function considerAbandon(locationSkiplist) {
  var location2 = Guzzlr_exports.getLocation(), remaningTurns = Math.ceil((100 - get("guzzlrDeliveryProgress")) / (10 - get("_guzzlrDeliveries")));
  (0, import_kolmafia34.print)("Got guzzlr quest ".concat(Guzzlr_exports.getTier(), " at ").concat(Guzzlr_exports.getLocation(), " with remaining turns ").concat(remaningTurns)), (!location2 || locationSkiplist.includes(location2) || !canAdventureOrUnlock(location2) || wandererTurnsAvailableToday(location2) < remaningTurns) && ((0, import_kolmafia34.print)("Abandoning..."), Guzzlr_exports.abandon());
}
function acceptGuzzlrQuest(locationSkiplist) {
  for (Guzzlr_exports.isQuestActive() && considerAbandon(locationSkiplist); !Guzzlr_exports.isQuestActive(); )
    (0, import_kolmafia34.print)("Picking a guzzlr quest"), Guzzlr_exports.canPlatinum() && !(get("garbo_prioritizeCappingGuzzlr", !1) && Guzzlr_exports.haveFullPlatinumBonus()) ? Guzzlr_exports.acceptPlatinum() : Guzzlr_exports.canGold() && (Guzzlr_exports.haveFullBronzeBonus() || !Guzzlr_exports.haveFullGoldBonus()) ? Guzzlr_exports.acceptGold() : Guzzlr_exports.acceptBronze(), considerAbandon(locationSkiplist);
}
function guzzlrValue(tier) {
  var progressPerTurn = 100 / (10 - get("_guzzlrDeliveries")), buckValue = garboValue($item(_templateObject349 || (_templateObject349 = _taggedTemplateLiteral26(["Guzzlrbuck"]))));
  switch (tier) {
    case null:
      return 0;
    case "bronze":
      return 3 * buckValue / progressPerTurn;
    case "gold":
      return 6 * buckValue / progressPerTurn;
    case "platinum":
      return 21.5 * buckValue / progressPerTurn;
  }
}
function guzzlrFactory(_type, locationSkiplist) {
  if (Guzzlr_exports.have()) {
    acceptGuzzlrQuest(locationSkiplist);
    var location2 = Guzzlr_exports.getLocation();
    if (location2 !== null) {
      var guzzlrBooze = Guzzlr_exports.getTier() === "platinum" ? Guzzlr_exports.getCheapestPlatinumCocktail() : Guzzlr_exports.getBooze();
      return [new WandererTarget("Guzzlr", location2, guzzlrValue(Guzzlr_exports.getTier()), function() {
        if (!guzzlrBooze)
          return !1;
        if (!have(guzzlrBooze)) {
          var fancy = guzzlrBooze && (0, import_kolmafia34.craftType)(guzzlrBooze).includes("fancy");
          guzzlrBooze && (!fancy || fancy && freeCrafts() > 0) ? (0, import_kolmafia34.retrieveItem)(guzzlrBooze) : guzzlrBooze && (0, import_kolmafia34.buy)(1, guzzlrBooze, guzzlrValue(Guzzlr_exports.getTier()));
        }
        return have(guzzlrBooze);
      })];
    }
  }
  return [];
}

// src/wanderer/lovebugs.ts
init_kolmafia_polyfill();
var _templateObject200, _templateObject291, _templateObject350, _templateObject434, _templateObject528, _templateObject627;
function _taggedTemplateLiteral27(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var LovebugTargets = [{
  element: "cold",
  location: $location(_templateObject200 || (_templateObject200 = _taggedTemplateLiteral27(["VYKEA"]))),
  currency: $item(_templateObject291 || (_templateObject291 = _taggedTemplateLiteral27(["Wal-Mart gift certificate"])))
}, {
  element: "sleaze",
  location: $location(_templateObject350 || (_templateObject350 = _taggedTemplateLiteral27(["The Fun-Guy Mansion"]))),
  currency: $item(_templateObject434 || (_templateObject434 = _taggedTemplateLiteral27(["Beach Buck"])))
}, {
  element: "spooky",
  location: $location(_templateObject528 || (_templateObject528 = _taggedTemplateLiteral27(["The Deep Dark Jungle"]))),
  currency: $item(_templateObject627 || (_templateObject627 = _taggedTemplateLiteral27(["Coinspiracy"])))
}];
function lovebugsFactory() {
  return get("lovebugsUnlocked") ? LovebugTargets.filter(function(t) {
    return realmAvailable(t.element);
  }).map(function(t) {
    return new WandererTarget("Lovebugs ".concat(t.location), t.location, garboValue(t.currency) * 0.05);
  }) : [];
}

// src/wanderer/yellowray.ts
init_kolmafia_polyfill();
var import_kolmafia35 = require("kolmafia");
function _toConsumableArray19(arr) {
  return _arrayWithoutHoles19(arr) || _iterableToArray19(arr) || _unsupportedIterableToArray25(arr) || _nonIterableSpread19();
}
function _nonIterableSpread19() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray19(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles19(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray25(arr);
}
function _createForOfIteratorHelper14(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray25(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e) {
        throw _e;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e2) {
    didErr = !0, err = _e2;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _unsupportedIterableToArray25(o, minLen) {
  if (!!o) {
    if (typeof o == "string")
      return _arrayLikeToArray25(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray25(o, minLen);
  }
}
function _arrayLikeToArray25(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function averageYrValue(location2) {
  var badAttributes = ["LUCKY", "ULTRARARE", "BOSS"], rates = (0, import_kolmafia35.appearanceRates)(location2), monsters = Object.keys((0, import_kolmafia35.getLocationMonsters)(location2)).map(function(m) {
    return (0, import_kolmafia35.toMonster)(m);
  }).filter(function(m) {
    return !badAttributes.some(function(s) {
      return m.attributes.includes(s);
    }) && rates[m.name] > 0;
  });
  return monsters.length === 0 ? 0 : sum(monsters, function(m) {
    var items = (0, import_kolmafia35.itemDropsArray)(m).filter(function(drop) {
      return ["", "n"].includes(drop.type);
    });
    return sum(items, function(drop) {
      var yrRate = (drop.type === "" ? 100 : drop.rate) / 100;
      return yrRate * garboValue(drop.drop, !0);
    });
  }) / monsters.length;
}
function yrValues() {
  var values2 = /* @__PURE__ */ new Map(), _iterator = _createForOfIteratorHelper14(import_kolmafia35.Location.all().filter(function(l) {
    return canAdventureOrUnlock(l) && !underwater(l);
  })), _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var location2 = _step.value;
      values2.set(location2, averageYrValue(location2) + freeFightFamiliarData({
        location: location2
      }).expectedValue);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return values2;
}
function yellowRayFactory(type, locationSkiplist) {
  if (type === "yellow ray") {
    var _ret = function() {
      var validLocations = import_kolmafia35.Location.all().filter(function(location2) {
        return canWander(location2, "yellow ray") && canAdventureOrUnlock(location2);
      }), locationValues = yrValues(), bestZones = /* @__PURE__ */ new Set([maxBy2(validLocations, function(l) {
        var _locationValues$get;
        return (_locationValues$get = locationValues.get(l)) !== null && _locationValues$get !== void 0 ? _locationValues$get : 0;
      })]), _iterator2 = _createForOfIteratorHelper14(UnlockableZones), _step2;
      try {
        var _loop = function() {
          var unlockableZone = _step2.value, extraLocations = import_kolmafia35.Location.all().filter(function(l) {
            return l.zone === unlockableZone.zone && !locationSkiplist.includes(l);
          });
          bestZones.add(maxBy2(extraLocations, function(l) {
            var _locationValues$get3;
            return (_locationValues$get3 = locationValues.get(l)) !== null && _locationValues$get3 !== void 0 ? _locationValues$get3 : 0;
          }));
        };
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done; )
          _loop();
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      if (bestZones.size > 0)
        return {
          v: _toConsumableArray19(bestZones).map(function(l) {
            var _locationValues$get2;
            return new WandererTarget("Yellow Ray ".concat(l), l, (_locationValues$get2 = locationValues.get(l)) !== null && _locationValues$get2 !== void 0 ? _locationValues$get2 : 0);
          })
        };
    }();
    if (typeof _ret == "object")
      return _ret.v;
  }
  return [];
}

// src/wanderer/index.ts
var _templateObject201;
function _taggedTemplateLiteral28(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
function _toConsumableArray20(arr) {
  return _arrayWithoutHoles20(arr) || _iterableToArray20(arr) || _unsupportedIterableToArray26(arr) || _nonIterableSpread20();
}
function _nonIterableSpread20() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray20(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles20(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray26(arr);
}
function _createForOfIteratorHelper15(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray26(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e) {
        throw _e;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e2) {
    didErr = !0, err = _e2;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _unsupportedIterableToArray26(o, minLen) {
  if (!!o) {
    if (typeof o == "string")
      return _arrayLikeToArray26(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray26(o, minLen);
  }
}
function _arrayLikeToArray26(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
var wanderFactories = [defaultFactory, yellowRayFactory, lovebugsFactory, guzzlrFactory];
function bestWander(type, locationSkiplist, nameSkiplist) {
  var possibleLocations = /* @__PURE__ */ new Map(), _iterator = _createForOfIteratorHelper15(wanderFactories), _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var wanderFactory = _step.value, wanderTargets = wanderFactory(type, locationSkiplist), _iterator2 = _createForOfIteratorHelper15(wanderTargets), _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
          var wanderTarget = _step2.value;
          if (!nameSkiplist.includes(wanderTarget.name) && !locationSkiplist.includes(wanderTarget.location) && canWander(wanderTarget.location, type)) {
            var _possibleLocations$ge, wandererLocation = (_possibleLocations$ge = possibleLocations.get(wanderTarget.location)) !== null && _possibleLocations$ge !== void 0 ? _possibleLocations$ge : {
              location: wanderTarget.location,
              targets: [],
              value: 0
            };
            wandererLocation.targets = [].concat(_toConsumableArray20(wandererLocation.targets), [wanderTarget]), wandererLocation.value += wanderTarget.value, possibleLocations.set(wandererLocation.location, wandererLocation);
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  if (possibleLocations.size === 0)
    throw "Could not determine a wander target!";
  return maxBy2(_toConsumableArray20(possibleLocations.values()), "value");
}
function wanderWhere(type) {
  var nameSkiplist = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], locationSkiplist = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [], candidate = bestWander(type, locationSkiplist, nameSkiplist), failed = candidate.targets.filter(function(target) {
    return !target.prepareTurn();
  }), badLocation = !canAdventureOrUnlock(candidate.location) || !unlock(candidate.location, candidate.value) || !canWander(candidate.location, type) ? [candidate.location] : [];
  if (failed.length > 0 || badLocation.length > 0)
    return wanderWhere(type, [].concat(_toConsumableArray20(nameSkiplist), _toConsumableArray20(failed.map(function(target) {
      return target.name;
    }))), [].concat(_toConsumableArray20(locationSkiplist), badLocation));
  var targets = candidate.targets.map(function(t) {
    return t.name;
  }).join("; "), value = candidate.value.toFixed(2);
  return printh("Wandering at ".concat(candidate.location, " for expected value ").concat(value, " (").concat(targets, ")")), candidate.location;
}
function drunkSafeWander(type) {
  return sober() ? wanderWhere(type) : $location(_templateObject201 || (_templateObject201 = _taggedTemplateLiteral28(["Drunken Stupor"])));
}

// src/main.ts
var _templateObject300, _templateObject2100, _templateObject351, _templateObject435, _templateObject529, _templateObject628, _templateObject727, _templateObject826, _templateObject924, _templateObject1023, _templateObject1119, _templateObject1217, _templateObject1317, _templateObject1417, _templateObject1517, _templateObject1616, _templateObject1715, _templateObject1815, _templateObject1915, _templateObject2013, _templateObject2117, _templateObject2214, _templateObject2313, _templateObject2412, _templateObject2512, _templateObject2612, _templateObject2711, _templateObject2810, _templateObject2910;
function _slicedToArray9(arr, i) {
  return _arrayWithHoles9(arr) || _iterableToArrayLimit9(arr, i) || _unsupportedIterableToArray27(arr, i) || _nonIterableRest9();
}
function _nonIterableRest9() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit9(arr, i) {
  var _i = arr == null ? null : typeof Symbol != "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i != null) {
    var _arr = [], _n = !0, _d = !1, _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !(i && _arr.length === i)); _n = !0)
        ;
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        !_n && _i.return != null && _i.return();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles9(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _createForOfIteratorHelper16(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray27(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e2) {
        throw _e2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e3) {
    didErr = !0, err = _e3;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _unsupportedIterableToArray27(o, minLen) {
  if (!!o) {
    if (typeof o == "string")
      return _arrayLikeToArray27(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray27(o, minLen);
  }
}
function _arrayLikeToArray27(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _taggedTemplateLiteral29(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
function ownKeys8(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread8(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    i % 2 ? ownKeys8(Object(source), !0).forEach(function(key) {
      _defineProperty15(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys8(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty15(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
var QUESTS = {
  caboose: caboose
};
function main(command) {
  if (Args.fill(args, command), args.help) {
    Args.showHelp(args);
    return;
  }
  sinceKolmafiaRevision(26834);
  var turncount = (0, import_kolmafia36.myTurncount)(), completed = args.turns > 0 ? function() {
    return (0, import_kolmafia36.myTurncount)() - turncount >= args.turns || (0, import_kolmafia36.myAdventures)() === 0;
  } : function() {
    return (0, import_kolmafia36.myAdventures)() === -args.turns;
  }, digitizes = -1, quest = _objectSpread8(_objectSpread8({}, QUESTS[args.car]), {}, {
    completed: completed
  }), global2 = {
    name: "Global",
    completed: completed,
    tasks: [{
      name: "June Cleaver",
      ready: function() {
        return have($item(_templateObject300 || (_templateObject300 = _taggedTemplateLiteral29(["June cleaver"])))) && get("_juneCleaverFightsLeft") === 0;
      },
      do: (0, import_kolmafia36.myInebriety)() <= (0, import_kolmafia36.inebrietyLimit)() ? $location(_templateObject2100 || (_templateObject2100 = _taggedTemplateLiteral29(["Noob Cave"]))) : $location(_templateObject351 || (_templateObject351 = _taggedTemplateLiteral29(["Drunken Stupor"]))),
      outfit: {
        weapon: $item(_templateObject435 || (_templateObject435 = _taggedTemplateLiteral29(["June cleaver"])))
      },
      completed: function() {
        return get("_juneCleaverFightsLeft") > 0;
      },
      sobriety: "either",
      combat: new CrimboStrategy(function() {
        return Macro2.abort();
      })
    }, {
      name: "Proton Ghost",
      ready: function() {
        return have($item(_templateObject529 || (_templateObject529 = _taggedTemplateLiteral29(["protonic accelerator pack"])))) && get("questPAGhost") !== "unstarted" && !!get("ghostLocation");
      },
      do: function() {
        var location2 = get("ghostLocation");
        if (location2)
          (0, import_kolmafia36.adv1)(location2, 0, "");
        else
          throw "Could not determine Proton Ghost location!";
      },
      outfit: function() {
        var _get3;
        return chooseQuestOutfit({
          location: (_get3 = get("ghostLocation")) !== null && _get3 !== void 0 ? _get3 : $location.none,
          isFree: !0
        }, {
          back: $item(_templateObject628 || (_templateObject628 = _taggedTemplateLiteral29(["protonic accelerator pack"]))),
          avoid: get("ghostLocation") === $location(_templateObject727 || (_templateObject727 = _taggedTemplateLiteral29(["The Icy Peak"]))) ? $items(_templateObject826 || (_templateObject826 = _taggedTemplateLiteral29(["Great Wolf's beastly trousers"]))) : []
        });
      },
      completed: function() {
        return get("questPAGhost") === "unstarted";
      },
      combat: new CrimboStrategy(function() {
        return Macro2.trySkill($skill(_templateObject924 || (_templateObject924 = _taggedTemplateLiteral29(["Sing Along"])))).trySkill($skill(_templateObject1023 || (_templateObject1023 = _taggedTemplateLiteral29(["Shoot Ghost"])))).trySkill($skill(_templateObject1119 || (_templateObject1119 = _taggedTemplateLiteral29(["Shoot Ghost"])))).trySkill($skill(_templateObject1217 || (_templateObject1217 = _taggedTemplateLiteral29(["Shoot Ghost"])))).trySkill($skill(_templateObject1317 || (_templateObject1317 = _taggedTemplateLiteral29(["Trap Ghost"]))));
      }),
      sobriety: "sober"
    }, {
      name: "Vote Wanderer",
      ready: function() {
        return have($item(_templateObject1417 || (_templateObject1417 = _taggedTemplateLiteral29(['"I Voted!" sticker'])))) && (0, import_kolmafia36.totalTurnsPlayed)() % 11 === 1 && get("lastVoteMonsterTurn") < (0, import_kolmafia36.totalTurnsPlayed)() && get("_voteFreeFights") < 3;
      },
      do: function() {
        (0, import_kolmafia36.adv1)(drunkSafeWander("wanderer"), -1, "");
      },
      outfit: function() {
        return chooseQuestOutfit({
          location: drunkSafeWander("wanderer"),
          isFree: !0
        }, {
          acc3: $item(_templateObject1517 || (_templateObject1517 = _taggedTemplateLiteral29(['"I Voted!" sticker'])))
        });
      },
      completed: function() {
        return get("lastVoteMonsterTurn") === (0, import_kolmafia36.totalTurnsPlayed)();
      },
      combat: new CrimboStrategy(function() {
        return Macro2.redigitize().standardCombat();
      }),
      sobriety: "either"
    }, {
      name: "Digitize Wanderer",
      ready: function() {
        return counter_exports.get("Digitize") <= 0;
      },
      outfit: function() {
        var _get22;
        return chooseQuestOutfit({
          location: drunkSafeWander("wanderer"),
          isFree: (_get22 = get("_sourceTerminalDigitizeMonster")) === null || _get22 === void 0 ? void 0 : _get22.attributes.includes("FREE")
        });
      },
      completed: function() {
        return get("_sourceTerminalDigitizeMonsterCount") !== digitizes;
      },
      do: function() {
        (0, import_kolmafia36.adv1)(drunkSafeWander("wanderer"), -1, ""), digitizes = get("_sourceTerminalDigitizeMonsterCount");
      },
      combat: new CrimboStrategy(function() {
        return Macro2.redigitize().standardCombat();
      }),
      sobriety: "either"
    }, {
      name: "Void Monster",
      ready: function() {
        return have($item(_templateObject1616 || (_templateObject1616 = _taggedTemplateLiteral29(["cursed magnifying glass"])))) && get("cursedMagnifyingGlassCount") === 13;
      },
      completed: function() {
        return get("_voidFreeFights") >= 5;
      },
      outfit: function() {
        return chooseQuestOutfit({
          location: drunkSafeWander("wanderer"),
          isFree: !0
        }, {
          offhand: $item(_templateObject1715 || (_templateObject1715 = _taggedTemplateLiteral29(["cursed magnifying glass"])))
        });
      },
      do: function() {
        return (0, import_kolmafia36.adv1)(drunkSafeWander("wanderer"), -1, "");
      },
      sobriety: "sober",
      combat: new CrimboStrategy(function() {
        return Macro2.standardCombat();
      })
    }, {
      name: "Spit Jurassic Acid",
      completed: function() {
        return have($effect(_templateObject1815 || (_templateObject1815 = _taggedTemplateLiteral29(["Everything Looks Yellow"]))));
      },
      ready: function() {
        return have($item(_templateObject1915 || (_templateObject1915 = _taggedTemplateLiteral29(["Jurassic Parka"])))) && have($skill(_templateObject2013 || (_templateObject2013 = _taggedTemplateLiteral29(["Torso Awareness"]))));
      },
      outfit: function() {
        return chooseQuestOutfit({
          location: drunkSafeWander("yellow ray"),
          isFree: !0
        }, {
          shirt: $item(_templateObject2117 || (_templateObject2117 = _taggedTemplateLiteral29(["Jurassic Parka"])))
        });
      },
      prepare: function() {
        return (0, import_kolmafia36.cliExecute)("parka dilophosaur");
      },
      do: function() {
        return (0, import_kolmafia36.adv1)(drunkSafeWander("yellow ray"), -1, "");
      },
      combat: new CrimboStrategy(function() {
        var romance = get("romanticTarget"), freeMonsters = $monsters(_templateObject2214 || (_templateObject2214 = _taggedTemplateLiteral29(["sausage goblin"])));
        return romance != null && romance.attributes.includes("FREE") && freeMonsters.push(romance), Macro2.if_(freeMonsters, Macro2.standardCombat()).skill($skill(_templateObject2313 || (_templateObject2313 = _taggedTemplateLiteral29(["Spit jurassic acid"])))).abort();
      }),
      sobriety: "sober"
    }, {
      name: "Grey You Attack Skill",
      completed: function() {
        return have($skill(_templateObject2412 || (_templateObject2412 = _taggedTemplateLiteral29(["Nantlers"])))) || have($skill(_templateObject2512 || (_templateObject2512 = _taggedTemplateLiteral29(["Nanoshock"])))) || have($skill(_templateObject2612 || (_templateObject2612 = _taggedTemplateLiteral29(["Audioclasm"]))));
      },
      do: $location(_templateObject2711 || (_templateObject2711 = _taggedTemplateLiteral29(["The Haunted Storage Room"]))),
      ready: function() {
        return (0, import_kolmafia36.myClass)() === $class(_templateObject2810 || (_templateObject2810 = _taggedTemplateLiteral29(["Grey Goo"]))) && (0, import_kolmafia36.canAdventure)($location(_templateObject2910 || (_templateObject2910 = _taggedTemplateLiteral29(["The Haunted Storage Room"]))));
      },
      combat: new CrimboStrategy(function() {
        return Macro2.standardCombat();
      }),
      sobriety: "sober"
    }]
  }, engine = new CrimboEngine(getTasks([setup, global2, quest]));
  engine.print();
  var sessionStart = Session.current();
  withProperty("recoveryScript", "", function() {
    try {
      engine.run();
    } finally {
      engine.destruct();
    }
  });
  var sessionResults = Session.current().diff(sessionStart);
  printh("SESSION RESULTS:");
  var _iterator = _createForOfIteratorHelper16(sessionResults.items.entries()), _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var _step$value = _slicedToArray9(_step.value, 2), item5 = _step$value[0], count = _step$value[1];
      printh("ITEM ".concat(item5, " QTY ").concat(count));
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  main
});
