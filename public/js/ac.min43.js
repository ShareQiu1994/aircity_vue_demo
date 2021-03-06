var $jscomp = $jscomp || {}
$jscomp.scope = {}
$jscomp.createTemplateTagFirstArg = function (a) {
    return (a.raw = a)
}
$jscomp.createTemplateTagFirstArgWithRaw = function (a, b) {
    a.raw = b
    return a
}
$jscomp.arrayIteratorImpl = function (a) {
    var b = 0
    return function () {
        return b < a.length ? { done: !1, value: a[b++] } : { done: !0 }
    }
}
$jscomp.arrayIterator = function (a) {
    return { next: $jscomp.arrayIteratorImpl(a) }
}
$jscomp.makeIterator = function (a) {
    var b = 'undefined' != typeof Symbol && Symbol.iterator && a[Symbol.iterator]
    return b ? b.call(a) : $jscomp.arrayIterator(a)
}
$jscomp.arrayFromIterator = function (a) {
    for (var b, c = []; !(b = a.next()).done;) c.push(b.value)
    return c
}
$jscomp.arrayFromIterable = function (a) {
    return a instanceof Array ? a : $jscomp.arrayFromIterator($jscomp.makeIterator(a))
}
$jscomp.ASSUME_ES5 = !1
$jscomp.ASSUME_NO_NATIVE_MAP = !1
$jscomp.ASSUME_NO_NATIVE_SET = !1
$jscomp.SIMPLE_FROUND_POLYFILL = !1
$jscomp.ISOLATE_POLYFILLS = !1
$jscomp.objectCreate =
    $jscomp.ASSUME_ES5 || 'function' == typeof Object.create
        ? Object.create
        : function (a) {
            var b = function () { }
            b.prototype = a
            return new b()
        }
$jscomp.defineProperty =
    $jscomp.ASSUME_ES5 || 'function' == typeof Object.defineProperties
        ? Object.defineProperty
        : function (a, b, c) {
            if (a == Array.prototype || a == Object.prototype) return a
            a[b] = c.value
            return a
        }
$jscomp.getGlobal = function (a) {
    a = ['object' == typeof globalThis && globalThis, a, 'object' == typeof window && window, 'object' == typeof self && self, 'object' == typeof global && global]
    for (var b = 0; b < a.length; ++b) {
        var c = a[b]
        if (c && c.Math == Math) return c
    }
    throw Error('Cannot find global object')
}
$jscomp.global = $jscomp.getGlobal(this)
$jscomp.IS_SYMBOL_NATIVE = 'function' === typeof Symbol && 'symbol' === typeof Symbol('x')
$jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE
$jscomp.polyfills = {}
$jscomp.propertyToPolyfillSymbol = {}
$jscomp.POLYFILL_PREFIX = '$jscp$'
var $jscomp$lookupPolyfilledValue = function (a, b) {
    var c = $jscomp.propertyToPolyfillSymbol[b]
    if (null == c) return a[b]
    c = a[c]
    return void 0 !== c ? c : a[b]
}
$jscomp.polyfill = function (a, b, c, e) {
    b && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, b, c, e) : $jscomp.polyfillUnisolated(a, b, c, e))
}
$jscomp.polyfillUnisolated = function (a, b, c, e) {
    c = $jscomp.global
    a = a.split('.')
    for (e = 0; e < a.length - 1; e++) {
        var d = a[e]
        if (!(d in c)) return
        c = c[d]
    }
    a = a[a.length - 1]
    e = c[a]
    b = b(e)
    b != e && null != b && $jscomp.defineProperty(c, a, { configurable: !0, writable: !0, value: b })
}
$jscomp.polyfillIsolated = function (a, b, c, e) {
    var d = a.split('.')
    a = 1 === d.length
    e = d[0]
    e = !a && e in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global
    for (var l = 0; l < d.length - 1; l++) {
        var g = d[l]
        if (!(g in e)) return
        e = e[g]
    }
    d = d[d.length - 1]
    c = $jscomp.IS_SYMBOL_NATIVE && 'es6' === c ? e[d] : null
    b = b(c)
    null != b && (a ? $jscomp.defineProperty($jscomp.polyfills, d, { configurable: !0, writable: !0, value: b }) : b !== c && (($jscomp.propertyToPolyfillSymbol[d] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(d) : $jscomp.POLYFILL_PREFIX + d), (d = $jscomp.propertyToPolyfillSymbol[d]), $jscomp.defineProperty(e, d, { configurable: !0, writable: !0, value: b })))
}
$jscomp.getConstructImplementation = function () {
    function a() {
        function c() { }
        new c()
        Reflect.construct(c, [], function () { })
        return new c() instanceof c
    }
    if ($jscomp.TRUST_ES6_POLYFILLS && 'undefined' != typeof Reflect && Reflect.construct) {
        if (a()) return Reflect.construct
        var b = Reflect.construct
        return function (c, e, d) {
            c = b(c, e)
            d && Reflect.setPrototypeOf(c, d.prototype)
            return c
        }
    }
    return function (c, e, d) {
        void 0 === d && (d = c)
        d = $jscomp.objectCreate(d.prototype || Object.prototype)
        return Function.prototype.apply.call(c, d, e) || d
    }
}
$jscomp.construct = { valueOf: $jscomp.getConstructImplementation }.valueOf()
$jscomp.underscoreProtoCanBeSet = function () {
    var a = { a: !0 },
        b = {}
    try {
        return (b.__proto__ = a), b.a
    } catch (c) { }
    return !1
}
$jscomp.setPrototypeOf =
    $jscomp.TRUST_ES6_POLYFILLS && 'function' == typeof Object.setPrototypeOf
        ? Object.setPrototypeOf
        : $jscomp.underscoreProtoCanBeSet()
            ? function (a, b) {
                a.__proto__ = b
                if (a.__proto__ !== b) throw new TypeError(a + ' is not extensible')
                return a
            }
            : null
$jscomp.inherits = function (a, b) {
    a.prototype = $jscomp.objectCreate(b.prototype)
    a.prototype.constructor = a
    if ($jscomp.setPrototypeOf) {
        var c = $jscomp.setPrototypeOf
        c(a, b)
    } else
        for (c in b)
            if ('prototype' != c)
                if (Object.defineProperties) {
                    var e = Object.getOwnPropertyDescriptor(b, c)
                    e && Object.defineProperty(a, c, e)
                } else a[c] = b[c]
    a.superClass_ = b.prototype
}
$jscomp.polyfill(
    'Reflect',
    function (a) {
        return a ? a : {}
    },
    'es6',
    'es3'
)
$jscomp.polyfill(
    'Reflect.construct',
    function (a) {
        return $jscomp.construct
    },
    'es6',
    'es3'
)
$jscomp.polyfill(
    'Reflect.setPrototypeOf',
    function (a) {
        if (a) return a
        if ($jscomp.setPrototypeOf) {
            var b = $jscomp.setPrototypeOf
            return function (c, e) {
                try {
                    return b(c, e), !0
                } catch (d) {
                    return !1
                }
            }
        }
        return null
    },
    'es6',
    'es5'
)
$jscomp.checkEs6ConformanceViaProxy = function () {
    try {
        var a = {},
            b = Object.create(
                new $jscomp.global.Proxy(a, {
                    get: function (c, e, d) {
                        return c == a && 'q' == e && d == b
                    },
                })
            )
        return !0 === b.q
    } catch (c) {
        return !1
    }
}
$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = !1
$jscomp.ES6_CONFORMANCE = $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS && $jscomp.checkEs6ConformanceViaProxy()
$jscomp.initSymbol = function () { }
$jscomp.polyfill(
    'Symbol',
    function (a) {
        if (a) return a
        var b = function (d, l) {
            this.$jscomp$symbol$id_ = d
            $jscomp.defineProperty(this, 'description', { configurable: !0, writable: !0, value: l })
        }
        b.prototype.toString = function () {
            return this.$jscomp$symbol$id_
        }
        var c = 0,
            e = function (d) {
                if (this instanceof e) throw new TypeError('Symbol is not a constructor')
                return new b('jscomp_symbol_' + (d || '') + '_' + c++, d)
            }
        return e
    },
    'es6',
    'es3'
)
$jscomp.initSymbolIterator = function () { }
$jscomp.polyfill(
    'Symbol.iterator',
    function (a) {
        if (a) return a
        a = Symbol('Symbol.iterator')
        for (var b = 'Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array'.split(' '), c = 0; c < b.length; c++) {
            var e = $jscomp.global[b[c]]
            'function' === typeof e &&
                'function' != typeof e.prototype[a] &&
                $jscomp.defineProperty(e.prototype, a, {
                    configurable: !0,
                    writable: !0,
                    value: function () {
                        return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))
                    },
                })
        }
        return a
    },
    'es6',
    'es3'
)
$jscomp.initSymbolAsyncIterator = function () { }
$jscomp.iteratorPrototype = function (a) {
    a = { next: a }
    a[Symbol.iterator] = function () {
        return this
    }
    return a
}
$jscomp.owns = function (a, b) {
    return Object.prototype.hasOwnProperty.call(a, b)
}
$jscomp.polyfill(
    'WeakMap',
    function (a) {
        function b() {
            if (!a || !Object.seal) return !1
            try {
                var f = Object.seal({}),
                    h = Object.seal({}),
                    q = new a([
                        [f, 2],
                        [h, 3],
                    ])
                if (2 != q.get(f) || 3 != q.get(h)) return !1
                q.delete(f)
                q.set(h, 4)
                return !q.has(f) && 4 == q.get(h)
            } catch (t) {
                return !1
            }
        }
        function c() { }
        function e(f) {
            var h = typeof f
            return ('object' === h && null !== f) || 'function' === h
        }
        function d(f) {
            if (!$jscomp.owns(f, g)) {
                var h = new c()
                $jscomp.defineProperty(f, g, { value: h })
            }
        }
        function l(f) {
            if (!$jscomp.ISOLATE_POLYFILLS) {
                var h = Object[f]
                h &&
                    (Object[f] = function (q) {
                        if (q instanceof c) return q
                        Object.isExtensible(q) && d(q)
                        return h(q)
                    })
            }
        }
        if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
            if (a && $jscomp.ES6_CONFORMANCE) return a
        } else if (b()) return a
        var g = '$jscomp_hidden_' + Math.random()
        l('freeze')
        l('preventExtensions')
        l('seal')
        var p = 0,
            k = function (f) {
                this.id_ = (p += Math.random() + 1).toString()
                if (f) {
                    f = $jscomp.makeIterator(f)
                    for (var h; !(h = f.next()).done;) (h = h.value), this.set(h[0], h[1])
                }
            }
        k.prototype.set = function (f, h) {
            if (!e(f)) throw Error('Invalid WeakMap key')
            d(f)
            if (!$jscomp.owns(f, g)) throw Error('WeakMap key fail: ' + f)
            f[g][this.id_] = h
            return this
        }
        k.prototype.get = function (f) {
            return e(f) && $jscomp.owns(f, g) ? f[g][this.id_] : void 0
        }
        k.prototype.has = function (f) {
            return e(f) && $jscomp.owns(f, g) && $jscomp.owns(f[g], this.id_)
        }
        k.prototype.delete = function (f) {
            return e(f) && $jscomp.owns(f, g) && $jscomp.owns(f[g], this.id_) ? delete f[g][this.id_] : !1
        }
        return k
    },
    'es6',
    'es3'
)
$jscomp.MapEntry = function () { }
$jscomp.polyfill(
    'Map',
    function (a) {
        function b() {
            if ($jscomp.ASSUME_NO_NATIVE_MAP || !a || 'function' != typeof a || !a.prototype.entries || 'function' != typeof Object.seal) return !1
            try {
                var k = Object.seal({ x: 4 }),
                    f = new a($jscomp.makeIterator([[k, 's']]))
                if ('s' != f.get(k) || 1 != f.size || f.get({ x: 4 }) || f.set({ x: 4 }, 't') != f || 2 != f.size) return !1
                var h = f.entries(),
                    q = h.next()
                if (q.done || q.value[0] != k || 's' != q.value[1]) return !1
                q = h.next()
                return q.done || 4 != q.value[0].x || 't' != q.value[1] || !h.next().done ? !1 : !0
            } catch (t) {
                return !1
            }
        }
        if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
            if (a && $jscomp.ES6_CONFORMANCE) return a
        } else if (b()) return a
        var c = new WeakMap(),
            e = function (k) {
                this.data_ = {}
                this.head_ = g()
                this.size = 0
                if (k) {
                    k = $jscomp.makeIterator(k)
                    for (var f; !(f = k.next()).done;) (f = f.value), this.set(f[0], f[1])
                }
            }
        e.prototype.set = function (k, f) {
            k = 0 === k ? 0 : k
            var h = d(this, k)
            h.list || (h.list = this.data_[h.id] = [])
            h.entry ? (h.entry.value = f) : ((h.entry = { next: this.head_, previous: this.head_.previous, head: this.head_, key: k, value: f }), h.list.push(h.entry), (this.head_.previous.next = h.entry), (this.head_.previous = h.entry), this.size++)
            return this
        }
        e.prototype.delete = function (k) {
            k = d(this, k)
            return k.entry && k.list ? (k.list.splice(k.index, 1), k.list.length || delete this.data_[k.id], (k.entry.previous.next = k.entry.next), (k.entry.next.previous = k.entry.previous), (k.entry.head = null), this.size--, !0) : !1
        }
        e.prototype.clear = function () {
            this.data_ = {}
            this.head_ = this.head_.previous = g()
            this.size = 0
        }
        e.prototype.has = function (k) {
            return !!d(this, k).entry
        }
        e.prototype.get = function (k) {
            return (k = d(this, k).entry) && k.value
        }
        e.prototype.entries = function () {
            return l(this, function (k) {
                return [k.key, k.value]
            })
        }
        e.prototype.keys = function () {
            return l(this, function (k) {
                return k.key
            })
        }
        e.prototype.values = function () {
            return l(this, function (k) {
                return k.value
            })
        }
        e.prototype.forEach = function (k, f) {
            for (var h = this.entries(), q; !(q = h.next()).done;) (q = q.value), k.call(f, q[1], q[0], this)
        }
        e.prototype[Symbol.iterator] = e.prototype.entries
        var d = function (k, f) {
            var h = f && typeof f
            'object' == h || 'function' == h ? (c.has(f) ? (h = c.get(f)) : ((h = '' + ++p), c.set(f, h))) : (h = 'p_' + f)
            var q = k.data_[h]
            if (q && $jscomp.owns(k.data_, h))
                for (k = 0; k < q.length; k++) {
                    var t = q[k]
                    if ((f !== f && t.key !== t.key) || f === t.key) return { id: h, list: q, index: k, entry: t }
                }
            return { id: h, list: q, index: -1, entry: void 0 }
        },
            l = function (k, f) {
                var h = k.head_
                return $jscomp.iteratorPrototype(function () {
                    if (h) {
                        for (; h.head != k.head_;) h = h.previous
                        for (; h.next != h.head;) return (h = h.next), { done: !1, value: f(h) }
                        h = null
                    }
                    return { done: !0, value: void 0 }
                })
            },
            g = function () {
                var k = {}
                return (k.previous = k.next = k.head = k)
            },
            p = 0
        return e
    },
    'es6',
    'es3'
)
$jscomp.FORCE_POLYFILL_PROMISE = !1
$jscomp.polyfill(
    'Promise',
    function (a) {
        function b() {
            this.batch_ = null
        }
        function c(g) {
            return g instanceof d
                ? g
                : new d(function (p, k) {
                    p(g)
                })
        }
        if (a && !$jscomp.FORCE_POLYFILL_PROMISE) return a
        b.prototype.asyncExecute = function (g) {
            if (null == this.batch_) {
                this.batch_ = []
                var p = this
                this.asyncExecuteFunction(function () {
                    p.executeBatch_()
                })
            }
            this.batch_.push(g)
        }
        var e = $jscomp.global.setTimeout
        b.prototype.asyncExecuteFunction = function (g) {
            e(g, 0)
        }
        b.prototype.executeBatch_ = function () {
            for (; this.batch_ && this.batch_.length;) {
                var g = this.batch_
                this.batch_ = []
                for (var p = 0; p < g.length; ++p) {
                    var k = g[p]
                    g[p] = null
                    try {
                        k()
                    } catch (f) {
                        this.asyncThrow_(f)
                    }
                }
            }
            this.batch_ = null
        }
        b.prototype.asyncThrow_ = function (g) {
            this.asyncExecuteFunction(function () {
                throw g
            })
        }
        var d = function (g) {
            this.state_ = 0
            this.result_ = void 0
            this.onSettledCallbacks_ = []
            var p = this.createResolveAndReject_()
            try {
                g(p.resolve, p.reject)
            } catch (k) {
                p.reject(k)
            }
        }
        d.prototype.createResolveAndReject_ = function () {
            function g(f) {
                return function (h) {
                    k || ((k = !0), f.call(p, h))
                }
            }
            var p = this,
                k = !1
            return { resolve: g(this.resolveTo_), reject: g(this.reject_) }
        }
        d.prototype.resolveTo_ = function (g) {
            if (g === this) this.reject_(new TypeError('A Promise cannot resolve to itself'))
            else if (g instanceof d) this.settleSameAsPromise_(g)
            else {
                a: switch (typeof g) {
                    case 'object':
                        var p = null != g
                        break a
                    case 'function':
                        p = !0
                        break a
                    default:
                        p = !1
                }
                p ? this.resolveToNonPromiseObj_(g) : this.fulfill_(g)
            }
        }
        d.prototype.resolveToNonPromiseObj_ = function (g) {
            var p = void 0
            try {
                p = g.then
            } catch (k) {
                this.reject_(k)
                return
            }
            'function' == typeof p ? this.settleSameAsThenable_(p, g) : this.fulfill_(g)
        }
        d.prototype.reject_ = function (g) {
            this.settle_(2, g)
        }
        d.prototype.fulfill_ = function (g) {
            this.settle_(1, g)
        }
        d.prototype.settle_ = function (g, p) {
            if (0 != this.state_) throw Error('Cannot settle(' + g + ', ' + p + '): Promise already settled in state' + this.state_)
            this.state_ = g
            this.result_ = p
            this.executeOnSettledCallbacks_()
        }
        d.prototype.executeOnSettledCallbacks_ = function () {
            if (null != this.onSettledCallbacks_) {
                for (var g = 0; g < this.onSettledCallbacks_.length; ++g) l.asyncExecute(this.onSettledCallbacks_[g])
                this.onSettledCallbacks_ = null
            }
        }
        var l = new b()
        d.prototype.settleSameAsPromise_ = function (g) {
            var p = this.createResolveAndReject_()
            g.callWhenSettled_(p.resolve, p.reject)
        }
        d.prototype.settleSameAsThenable_ = function (g, p) {
            var k = this.createResolveAndReject_()
            try {
                g.call(p, k.resolve, k.reject)
            } catch (f) {
                k.reject(f)
            }
        }
        d.prototype.then = function (g, p) {
            function k(t, r) {
                return 'function' == typeof t
                    ? function (x) {
                        try {
                            f(t(x))
                        } catch (u) {
                            h(u)
                        }
                    }
                    : r
            }
            var f,
                h,
                q = new d(function (t, r) {
                    f = t
                    h = r
                })
            this.callWhenSettled_(k(g, f), k(p, h))
            return q
        }
        d.prototype.catch = function (g) {
            return this.then(void 0, g)
        }
        d.prototype.callWhenSettled_ = function (g, p) {
            function k() {
                switch (f.state_) {
                    case 1:
                        g(f.result_)
                        break
                    case 2:
                        p(f.result_)
                        break
                    default:
                        throw Error('Unexpected state: ' + f.state_)
                }
            }
            var f = this
            null == this.onSettledCallbacks_ ? l.asyncExecute(k) : this.onSettledCallbacks_.push(k)
        }
        d.resolve = c
        d.reject = function (g) {
            return new d(function (p, k) {
                k(g)
            })
        }
        d.race = function (g) {
            return new d(function (p, k) {
                for (var f = $jscomp.makeIterator(g), h = f.next(); !h.done; h = f.next()) c(h.value).callWhenSettled_(p, k)
            })
        }
        d.all = function (g) {
            var p = $jscomp.makeIterator(g),
                k = p.next()
            return k.done
                ? c([])
                : new d(function (f, h) {
                    function q(x) {
                        return function (u) {
                            t[x] = u
                            r--
                            0 == r && f(t)
                        }
                    }
                    var t = [],
                        r = 0
                    do t.push(void 0), r++, c(k.value).callWhenSettled_(q(t.length - 1), h), (k = p.next())
                    while (!k.done)
                })
        }
        return d
    },
    'es6',
    'es3'
)
$jscomp.findInternal = function (a, b, c) {
    a instanceof String && (a = String(a))
    for (var e = a.length, d = 0; d < e; d++) {
        var l = a[d]
        if (b.call(c, l, d, a)) return { i: d, v: l }
    }
    return { i: -1, v: void 0 }
}
$jscomp.polyfill(
    'Array.prototype.find',
    function (a) {
        return a
            ? a
            : function (b, c) {
                return $jscomp.findInternal(this, b, c).v
            }
    },
    'es6',
    'es3'
)
$jscomp.iteratorFromArray = function (a, b) {
    a instanceof String && (a += '')
    var c = 0,
        e = {
            next: function () {
                if (c < a.length) {
                    var d = c++
                    return { value: b(d, a[d]), done: !1 }
                }
                e.next = function () {
                    return { done: !0, value: void 0 }
                }
                return e.next()
            },
        }
    e[Symbol.iterator] = function () {
        return e
    }
    return e
}
$jscomp.polyfill(
    'Array.prototype.keys',
    function (a) {
        return a
            ? a
            : function () {
                return $jscomp.iteratorFromArray(this, function (b) {
                    return b
                })
            }
    },
    'es6',
    'es3'
)
$jscomp.polyfill(
    'Object.is',
    function (a) {
        return a
            ? a
            : function (b, c) {
                return b === c ? 0 !== b || 1 / b === 1 / c : b !== b && c !== c
            }
    },
    'es6',
    'es3'
)
$jscomp.polyfill(
    'Array.prototype.includes',
    function (a) {
        return a
            ? a
            : function (b, c) {
                var e = this
                e instanceof String && (e = String(e))
                var d = e.length
                c = c || 0
                for (0 > c && (c = Math.max(c + d, 0)); c < d; c++) {
                    var l = e[c]
                    if (l === b || Object.is(l, b)) return !0
                }
                return !1
            }
    },
    'es7',
    'es3'
)
$jscomp.checkStringArgs = function (a, b, c) {
    if (null == a) throw new TypeError("The 'this' value for String.prototype." + c + ' must not be null or undefined')
    if (b instanceof RegExp) throw new TypeError('First argument to String.prototype.' + c + ' must not be a regular expression')
    return a + ''
}
$jscomp.polyfill(
    'String.prototype.includes',
    function (a) {
        return a
            ? a
            : function (b, c) {
                return -1 !== $jscomp.checkStringArgs(this, b, 'includes').indexOf(b, c || 0)
            }
    },
    'es6',
    'es3'
)
$jscomp.assign =
    $jscomp.TRUST_ES6_POLYFILLS && 'function' == typeof Object.assign
        ? Object.assign
        : function (a, b) {
            for (var c = 1; c < arguments.length; c++) {
                var e = arguments[c]
                if (e) for (var d in e) $jscomp.owns(e, d) && (a[d] = e[d])
            }
            return a
        }
$jscomp.polyfill(
    'Object.assign',
    function (a) {
        return a || $jscomp.assign
    },
    'es6',
    'es3'
)
$jscomp.polyfill(
    'String.prototype.startsWith',
    function (a) {
        return a
            ? a
            : function (b, c) {
                var e = $jscomp.checkStringArgs(this, b, 'startsWith')
                b += ''
                var d = e.length,
                    l = b.length
                c = Math.max(0, Math.min(c | 0, e.length))
                for (var g = 0; g < l && c < d;) if (e[c++] != b[g++]) return !1
                return g >= l
            }
    },
    'es6',
    'es3'
)
$jscomp.polyfill(
    'Promise.prototype.finally',
    function (a) {
        return a
            ? a
            : function (b) {
                return this.then(
                    function (c) {
                        return Promise.resolve(b()).then(function () {
                            return c
                        })
                    },
                    function (c) {
                        return Promise.resolve(b()).then(function () {
                            throw c
                        })
                    }
                )
            }
    },
    'es9',
    'es3'
)
$jscomp.polyfill(
    'String.prototype.endsWith',
    function (a) {
        return a
            ? a
            : function (b, c) {
                var e = $jscomp.checkStringArgs(this, b, 'endsWith')
                b += ''
                void 0 === c && (c = e.length)
                c = Math.max(0, Math.min(c | 0, e.length))
                for (var d = b.length; 0 < d && 0 < c;) if (e[--c] != b[--d]) return !1
                return 0 >= d
            }
    },
    'es6',
    'es3'
)
$jscomp.polyfill(
    'String.prototype.repeat',
    function (a) {
        return a
            ? a
            : function (b) {
                var c = $jscomp.checkStringArgs(this, null, 'repeat')
                if (0 > b || 1342177279 < b) throw new RangeError('Invalid count value')
                b |= 0
                for (var e = ''; b;) if ((b & 1 && (e += c), (b >>>= 1))) c += c
                return e
            }
    },
    'es6',
    'es3'
)
var CommandType = {
    None: 0,
    Camera_PlayAnimation: 1,
    Camera_StopAnimation: 2,
    Misc_EnterReportMode: 3,
    Misc_ExitReportMode: 4,
    Misc_SetDateTime: 5,
    Camera_GetCamera: 6,
    Camera_SetState: 7,
    Camera_Set: 8,
    Camera_LookAtBBox: 9,
    Coord_World2Screen: 10,
    Coord_Screen2World: 11,
    InfoTree_SetVisibility: 12,
    InfoTree_Show: 13,
    InfoTree_Hide: 14,
    InfoTree_EnableXRay: 15,
    InfoTree_DisableXRay: 16,
    TileLayer_Add: 17,
    HeatMap_Add: 18,
    HeatMap_Update: 19,
    HeatMap_AddPoints: 20,
    HeatMap_RemovePoints: 21,
    HeatMap_Delete: 22,
    HeatMap_Show: 23,
    HeatMap_Hide: 24,
    HeatMap_Focus: 25,
    HighlightArea_Add: 26,
    HighlightArea_Delete: 27,
    HighlightArea_Update: 28,
    Polygon3D_Add: 29,
    Polygon3D_Delete: 30,
    Misc_AddImageButton: 31,
    Misc_DeleteImageButton: 32,
    Misc_AddAnimatedImageButton: 33,
    Settings_SetMainUIVisibility: 34,
    Settings_SetMousePickMask: 35,
    Tag_Add: 36,
    Tag_Delete: 37,
    Tag_Update: 38,
    Tag_Clear: 39,
    Tag_Focus: 40,
    Beam_Add: 41,
    Beam_Update: 42,
    Beam_Delete: 43,
    Beam_Clear: 44,
    Beam_Focus: 45,
    RadiationPoint_Add: 46,
    RadiationPoint_Update: 47,
    RadiationPoint_Delete: 48,
    RadiationPoint_Clear: 49,
    Polygon_Add: 50,
    Polygon_Update: 51,
    Polygon_Delete: 52,
    Polygon_Clear: 53,
    Polygon_Hightlight: 54,
    Polygon_Glow: 55,
    Polygon_Focus: 56,
    Tag_FocusAll: 57,
    Tag_Show: 58,
    Tag_Hide: 59,
    Tag_ShowAll: 60,
    Tag_HideAll: 61,
    RadiationPoint_Focus: 62,
    RadiationPoint_FocusAll: 63,
    RadiationPoint_Show: 64,
    RadiationPoint_Hide: 65,
    RadiationPoint_ShowAll: 66,
    RadiationPoint_HideAll: 67,
    Polygon_Show: 68,
    Polygon_Hide: 69,
    Polygon3D_Update: 70,
    Polygon3D_Clear: 71,
    Polygon3D_Focus: 72,
    Polygon3D_Show: 73,
    Polygon3D_Hide: 74,
    Polygon3D_Highlight: 75,
    Polygon3D_Glow: 76,
    Polygon3D_StopGlow: 77,
    HighlightArea_Clear: 78,
    HighlightArea_Focus: 79,
    HighlightArea_Show: 80,
    HighlightArea_Hide: 81,
    Misc_GetVersion: 82,
    TileLayer_Update: 83,
    TileLayer_Delete: 84,
    TileLayer_Focus: 85,
    TileLayer_EnableXRay: 86,
    TileLayer_DisableXRay: 87,
    TileLayer_Show: 88,
    TileLayer_Hide: 89,
    Tag_Get: 90,
    RadiationPoint_Get: 91,
    Polygon_Get: 92,
    Polygon3D_Get: 93,
    HighlightArea_Get: 94,
    TileLayer_Get: 95,
    Beam_Get: 96,
    HeatMap_Get: 97,
    Settings_GetMapMode: 98,
    Settings_SetMapMode: 99,
    Settings_SetMapURL: 100,
    TileLayer_Actor_Show: 101,
    TileLayer_Actor_Hide: 102,
    TileLayer_Actor_Focus: 103,
    TileLayer_Actor_Highlight: 104,
    TileLayer_Actor_StopHightlight: 105,
    CustomObject_Add: 106,
    CustomObject_Update: 107,
    CustomObject_Delete: 108,
    CustomObject_Get: 109,
    CustomObject_Focus: 110,
    CustomObject_Show: 111,
    CustomObject_Hide: 112,
    HeatMap_Clear: 113,
    CustomTag_Clear: 39,
    CustomTag_Delete: 37,
    CustomTag_Focus: 40,
    CustomTag_FocusAll: 57,
    CustomTag_Show: 58,
    CustomTag_Hide: 59,
    CustomTag_ShowAll: 60,
    CustomTag_HideAll: 61,
    CustomTag_Add: 114,
    CustomTag_Update: 115,
    CustomTag_Get: 116,
    Polyline_Add: 117,
    Polyline_Update: 118,
    Polyline_Delete: 119,
    Polyline_Clear: 120,
    Polyline_Focus: 121,
    Polyline_Get: 122,
    Polyline_Show: 123,
    Polyline_Hide: 124,
    Polyline_ShowAll: 125,
    Polyline_HideAll: 126,
    VideoProjection_Add: 127,
    VideoProjection_Update: 128,
    VideoProjection_Delete: 129,
    VideoProjection_Show: 130,
    VideoProjection_Hide: 131,
    VideoProjection_Get: 132,
    VideoProjection_Focus: 133,
    Misc_PlayVideo: 134,
    Misc_StopPlayVideo: 135,
    Weather_SetParams: 136,
    Weather_GetParams: 137,
    Weather_SetDate: 138,
    Weather_GetDate: 139,
    ODLine_Add: 140,
    ODLine_Update: 141,
    ODLine_Delete: 142,
    ODLine_Clear: 143,
    ODLine_Focus: 144,
    ODLine_Get: 145,
    ODLine_Show: 146,
    ODLine_Hide: 147,
    ODLine_ShowAll: 148,
    ODLine_HideAll: 149,
    Misc_SetWindowResolution: 150,
    Misc_CallBPFunction: 151,
    Settings_SetHighlightColor: 152,
    InfoTree_ShowByGroupId: 153,
    InfoTree_HideByGroupId: 154,
    InfoTree_HighlightByGroupId: 155,
    InfoTree_DeleteByGroupId: 156,
    EditHelper_Start: 157,
    EditHelper_Quit: 158,
    EditHelper_Finish: 159,
    EditHelper_SetParam: 160,
    Settings_SetFovX: 161,
    TileLayer_Actor_ShowAll: 162,
    TileLayer_Actor_HideAll: 163,
    CameraTour_Add: 164,
    CameraTour_Update: 165,
    CameraTour_Play: 166,
    CameraTour_Stop: 167,
    CameraTour_Delete: 168,
    Tag_PopupWindow_Show: 169,
    Tag_PopupWindow_Hide: 170,
    Tag_PopupWindow_ShowAll: 171,
    Tag_PopupWindow_HideAll: 172,
    Settings_SetOceanColor: 173,
    Misc_ShowAllFoliages: 174,
    Misc_HideAllFoliages: 175,
    Tools_StartPolygonClip: 176,
    Tools_StopClip: 177,
    TileLayer_SetAllowClip: 178,
    Panorama_Add: 179,
    Panorama_Update: 180,
    Panorama_Delete: 181,
    Panorama_Clear: 182,
    Panorama_Focus: 183,
    Panorama_Get: 184,
    Decal_Add: 185,
    Decal_Update: 186,
    Decal_Delete: 187,
    Decal_Clear: 188,
    Decal_Focus: 189,
    Decal_FocusAll: 190,
    Decal_Get: 191,
    Misc_PlayMovie: 192,
    Misc_StopMovie: 193,
    Tools_SetMeasurement: 194,
    Tools_StartMeasurement: 195,
    Tools_StopMeasurement: 196,
    Viewshed_Add: 197,
    Viewshed_Update: 198,
    Viewshed_Focus: 199,
    Viewshed_Delete: 200,
    Viewshed_Clear: 201,
    Viewshed_Get: 202,
    TileLayer_SetStyle: 203,
    Tools_LineIntersect: 204,
    Coord_PCS2GCS: 205,
    Coord_GCS2PCS: 206,
    DynamicWater_Add: 207,
    DynamicWater_Update: 208,
    DynamicWater_Focus: 209,
    DynamicWater_Delete: 210,
    DynamicWater_Clear: 211,
    DynamicWater_Get: 212,
    DynamicWater_Show: 213,
    DynamicWater_Hide: 214,
    Quit: 215,
    TileLayer_Actor_Unhighlight: 216,
    InfoTree_Get: 217,
    Reset: 218,
    CustomObject_Clear: 219,
    CustomObject_Highlight: 220,
    CustomObject_Unhighlight: 221,
    CustomObject_StopHighlight: 222,
    CustomObject_CallFunction: 223,
    CustomObject_AddByTileLayer: 224,
    Tools_StartPlaneClip: 226,
    Tools_StopPlaneClip: 228,
    Tools_StartVolumeClip: 229,
    Tools_StopVolumeClip: 231,
    Tools_StartSkylineAnalysis: 232,
    Tools_StopSkylineAnalysis: 233,
    Tools_ExportSkyline: 234,
    Tools_StartViewshedAnalysis: 235,
    Tools_StopViewshedAnalysis: 236,
    Camera_Move: 237,
    TileLayer_SetCollision: 238,
    TileLayer_Modifier_Add: 239,
    TileLayer_Modifier_Update: 240,
    TileLayer_Modifier_Delete: 241,
    TileLayer_Modifier_Clear: 242,
    Misc_StartProcess: 243,
    Settings_SetCampassVisible: 244,
    Settings_SetEnableInteract: 245,
    Camera_PauseAnimation: 246,
    Camera_ResumeAnimation: 247,
    Settings_SetInteractiveMode: 248,
    CameraTour_Pause: 249,
    CameraTour_Resume: 250,
    Settings_SetTerrainAlpha: 251,
    Marker_Add: 252,
    Marker_Update: 253,
    Marker_Get: 254,
    Marker_Delete: 255,
    Marker_Clear: 256,
    Marker_Focus: 257,
    Marker_FocusAll: 258,
    Marker_Show: 259,
    Marker_Hide: 260,
    Marker_ShowAll: 261,
    Marker_HideAll: 262,
    Marker_ShowPopupWindow: 263,
    Marker_HidePopupWindow: 264,
    Marker_ShowAllPopupWindow: 265,
    Marker_HideAllPopupWindow: 266,
    CustomMesh_Add: 267,
    CustomMesh_Delete: 268,
    CustomMesh_Clear: 269,
    CustomMesh_Update: 270,
    CustomMesh_Get: 271,
    CustomMesh_Focus: 272,
    CustomMesh_Show: 273,
    CustomMesh_Hide: 274,
    CustomMesh_ShowAll: 275,
    CustomMesh_HideAll: 276,
    Settings_EnableCameraMovingEvent: 277,
    TileLayer_SetViewportVisible: 278,
    TileLayer_GetObjectIDs: 279,
    VideoProjection_ShowFrustum: 280,
    VideoProjection_HideFrustum: 281,
    Command_End: 1e4,
},
    __bCommandTypeHasProcessd = !1
    ; (function () {
        if (!__bCommandTypeHasProcessd) {
            __bCommandTypeHasProcessd = !0
            for (var a in CommandType) CommandType[CommandType[a]] = a
        }
    })()
var APIErrorCode = { OK: 0, InvalidParameters: 1, InternalError: 2, ResourceNotFound: 3, AcpProjWKTNotSet: 4, CoordinateConversionFailed: 5, IDExists: 6, InvalidRequestType: 7, InvalidRequestString: 8, NoCommand: 9, DataTypeNotSupport: 10, CodeMax: 65535 },
    MousePickMask = { MouseClick: 1, MouseMove: 2, MouseHover: 4 },
    Color = {
        LightPink: 'RGB(255,182,193)',
        Pink: 'RGB(255,192,203)',
        Crimson: 'RGB(220,20,60)',
        LavenderBlush: 'RGB(255,240,245)',
        PaleVioletRed: 'RGB(219,112,147)',
        HotPink: 'RGB(255,105,180)',
        DeepPink: 'RGB(255,20,147)',
        MediumVioletRed: 'RGB(199,21,133)',
        Orchid: 'RGB(218,112,214)',
        Thistle: 'RGB(216,191,216)',
        plum: 'RGB(221,160,221)',
        Violet: 'RGB(238,130,238)',
        Magenta: 'RGB(255,0,255)',
        Fuchsia: 'RGB(255,0,255)',
        DarkMagenta: 'RGB(139,0,139)',
        Purple: 'RGB(128,0,128)',
        MediumOrchid: 'RGB(186,85,211)',
        DarkVoilet: 'RGB(148,0,211)',
        DarkOrchid: 'RGB(153,50,204)',
        Indigo: 'RGB(75,0,130)',
        BlueViolet: 'RGB(138,43,226)',
        MediumPurple: 'RGB(147,112,219)',
        MediumSlateBlue: 'RGB(123,104,238)',
        SlateBlue: 'RGB(106,90,205)',
        DarkSlateBlue: 'RGB(72,61,139)',
        Lavender: 'RGB(230,230,250)',
        GhostWhite: 'RGB(248,248,255)',
        Blue: 'RGB(0,0,255)',
        MediumBlue: 'RGB(0,0,205)',
        MidnightBlue: 'RGB(25,25,112)',
        DarkBlue: 'RGB(0,0,139)',
        Navy: 'RGB(0,0,128)',
        RoyalBlue: 'RGB(65,105,225)',
        CornflowerBlue: 'RGB(100,149,237)',
        LightSteelBlue: 'RGB(176,196,222)',
        LightSlateGray: 'RGB(119,136,153)',
        SlateGray: 'RGB(112,128,144)',
        DoderBlue: 'RGB(30,144,255)',
        AliceBlue: 'RGB(240,248,255)',
        SteelBlue: 'RGB(70,130,180)',
        LightSkyBlue: 'RGB(135,206,250)',
        SkyBlue: 'RGB(135,206,235)',
        DeepSkyBlue: 'RGB(0,191,255)',
        LightBLue: 'RGB(173,216,230)',
        PowDerBlue: 'RGB(176,224,230)',
        CadetBlue: 'RGB(95,158,160)',
        Azure: 'RGB(240,255,255)',
        LightCyan: 'RGB(225,255,255)',
        PaleTurquoise: 'RGB(175,238,238)',
        Cyan: 'RGB(0,255,255)',
        Aqua: 'RGB(212,242,231)',
        DarkTurquoise: 'RGB(0,206,209)',
        DarkSlateGray: 'RGB(47,79,79)',
        DarkCyan: 'RGB(0,139,139)',
        Teal: 'RGB(0,128,128)',
        MediumTurquoise: 'RGB(72,209,204)',
        LightSeaGreen: 'RGB(32,178,170)',
        Turquoise: 'RGB(64,224,208)',
        Auqamarin: 'RGB(127,255,170)',
        MediumAquamarine: 'RGB(0,250,154)',
        MediumSpringGreen: 'RGB(0,255,127)',
        MintCream: 'RGB(245,255,250)',
        SpringGreen: 'RGB(60,179,113)',
        SeaGreen: 'RGB(46,139,87)',
        Honeydew: 'RGB(240,255,240)',
        LightGreen: 'RGB(144,238,144)',
        PaleGreen: 'RGB(152,251,152)',
        DarkSeaGreen: 'RGB(143,188,143)',
        LimeGreen: 'RGB(50,205,50)',
        Lime: 'RGB(0,255,0)',
        ForestGreen: 'RGB(34,139,34)',
        Green: 'RGB(0,128,0)',
        DarkGreen: 'RGB(0,100,0)',
        Chartreuse: 'RGB(127,255,0)',
        LawnGreen: 'RGB(124,252,0)',
        GreenYellow: 'RGB(173,255,47)',
        OliveDrab: 'RGB(85,107,47)',
        Beige: 'RGB(245,245,220)',
        LightGoldenrodYellow: 'RGB(250,250,210)',
        Ivory: 'RGB(255,255,240)',
        LightYellow: 'RGB(255,255,224)',
        Yellow: 'RGB(255,255,0)',
        Olive: 'RGB(128,128,0)',
        DarkKhaki: 'RGB(189,183,107)',
        LemonChiffon: 'RGB(255,250,205)',
        PaleGodenrod: 'RGB(238,232,170)',
        Khaki: 'RGB(240,230,140)',
        Gold: 'RGB(255,215,0)',
        Cornislk: 'RGB(255,248,220)',
        GoldEnrod: 'RGB(218,165,32)',
        FloralWhite: 'RGB(255,250,240)',
        OldLace: 'RGB(253,245,230)',
        Wheat: 'RGB(245,222,179)',
        Moccasin: 'RGB(255,228,181)',
        Orange: 'RGB(255,165,0)',
        PapayaWhip: 'RGB(255,239,213)',
        BlanchedAlmond: 'RGB(255,235,205)',
        NavajoWhite: 'RGB(255,222,173)',
        AntiqueWhite: 'RGB(250,235,215)',
        Tan: 'RGB(210,180,140)',
        BrulyWood: 'RGB(222,184,135)',
        Bisque: 'RGB(255,228,196)',
        DarkOrange: 'RGB(255,140,0)',
        Linen: 'RGB(250,240,230)',
        Peru: 'RGB(205,133,63)',
        PeachPuff: 'RGB(255,218,185)',
        SandyBrown: 'RGB(244,164,96)',
        Chocolate: 'RGB(210,105,30)',
        SaddleBrown: 'RGB(139,69,19)',
        SeaShell: 'RGB(255,245,238)',
        Sienna: 'RGB(160,82,45)',
        LightSalmon: 'RGB(255,160,122)',
        Coral: 'RGB(255,127,80)',
        OrangeRed: 'RGB(255,69,0)',
        DarkSalmon: 'RGB(233,150,122)',
        Tomato: 'RGB(255,99,71)',
        MistyRose: 'RGB(255,228,225)',
        Salmon: 'RGB(250,128,114)',
        Snow: 'RGB(255,250,250)',
        LightCoral: 'RGB(240,128,128)',
        RosyBrown: 'RGB(188,143,143)',
        IndianRed: 'RGB(205,92,92)',
        Red: 'RGB(255,0,0)',
        Brown: 'RGB(165,42,42)',
        FireBrick: 'RGB(178,34,34)',
        DarkRed: 'RGB(139,0,0)',
        Maroon: 'RGB(128,0,0)',
        White: 'RGB(255,255,255)',
        WhiteSmoke: 'RGB(245,245,245)',
        Gainsboro: 'RGB(220,220,220)',
        LightGrey: 'RGB(211,211,211)',
        Silver: 'RGB(192,192,192)',
        DarkGray: 'RGB(169,169,169)',
        Gray: 'RGB(128,128,128)',
        DimGray: 'RGB(105,105,105)',
        Black: 'RGB(0,0,0)',
    },
    MeasurementMode = {
        Coordinate: 1,
        Linear: 2,
        Horizontal: 3,
        Vertical: 4,
        MultiPoint: 5,
        Volume: 6,
    },
    MapMode = { Campass: 0, SmallMap: 1, BigMap: 2 },
    PolylineStyle = { Arrow: 0, Arrow1: 1, Flow: 2, Beam: 3, Normal: 4, OnTerrain: 5 },
    PolygonStyle = { SingleColor: 0, CirclePoint: 1, Volumn: 2, Gradual: 3, DynamicGradual: 4, WaveTransparent: 5, WideWave: 6, RotateArrow: 7, RotateLine: 8, RotateGradual: 9, OnTerrain: 10 },
    Viewport = { V1: 1, V2: 2, V3: 4, V4: 8, All: 255 }
var LayerVisibleData = function (a, b) {
    this.id = a
    this.visible = b
},
    HeatMapPointData = function (a, b, c, e) {
        this.id = a.toString()
        this.coordinate = b
        this.radius = c
        this.heatValue = e
    },
    TagData = function (a, b, c, e, d, l, g, p, k, f, h, q, t, r) {
        this.id = a.toString()
        this.coordinate = b
        this.imagePath = c
        this.imageSize = e
        this.url = d
        this.text = l
        this.range = g || [1, 1e5]
        this.showLine = !!p
        this.textColor = k || [0, 0, 0, 1]
        this.textBackgroundColor = f || [1, 1, 1, 0.85]
        this.textBorderColor = h || [0, 0, 0, 0]
        this.textRange = q || 1e5
        this.hoverImagePath = t
        this.autoHidePopupWindow = r || !0
    },
    WebUIData = function (a, b, c) {
        this.url = a
        this.width = b
        this.height = c
    },
    CustomTagData = function (a, b, c, e, d, l, g, p) {
        this.id = a.toString()
        this.coordinate = b
        this.contentURL = c.url
        this.contentSize = [c.width, c.height]
        this.popupURL = e.url
        this.popupSize = [e.width, e.height]
        this.pivot = d
        this.range = l
        this.autoHidePopupWindow = g || !0
        this.popupPos = p
    },
    HighlightAreaData = function (a, b, c, e, d, l) {
        this.id = a.toString()
        this.coordinates = __convertCoordinatesForParts(b)
        this.color = __convertColor(c)
        this.heightRange = e
        this.intensity = d
        this.depthTest = l || !0
    },
    ImageButtonData = function (a, b, c, e, d, l, g, p) {
        this.id = a.toString()
        this.x = b
        this.y = c
        this.width = e
        this.height = d
        this.normalImage = l
        this.hoverImage = g
        this.tooltip = p
    },
    AnimatedImageButtonData = function (a, b, c, e, d, l, g, p, k) {
        this.id = a.toString()
        this.x = b
        this.y = c
        this.width = e
        this.height = d
        this.imageSequecePath = l
        this.imageSequeceLength = g
        this.loop = !!p
        this.interactable = !!k
    },
    BeamData = function (a, b, c, e, d, l, g) {
        this.id = a.toString()
        this.duration = b
        this.thickness = c
        this.interval = e
        this.velocity = d
        this.color = __convertColor(l)
        this.coordinates = g
    },
    RadiationPointData = function (a, b, c, e, d, l) {
        this.id = a.toString()
        this.coordinate = b
        this.radius = c
        this.rippleNumber = e
        this.color = __convertColor(d)
        this.brightness = l
    },
    Polygon3DStyle = { Wave: 0, LoopLine: 1, Gradual: 2, DynamicGradual: 3, WaveTransparent: 4, WideWave: 5, RotateArrow: 6, RotateLine: 7, RotateGradual: 8 },
    Polygon3DData = function (a, b, c, e, d, l, g, p) {
        this.id = a.toString()
        this.style = b
        this.coordinates = __convertCoordinatesForParts(c)
        this.color = __convertColor(e)
        this.height = d
        this.intensity = l
        this.tillingX = g
        this.tillingY = p
    },
    PolylineData = function (a, b, c, e, d, l, g, p, k, f) {
        this.id = a.toString()
        this.color = __convertColor(b)
        this.coordinates = c
        this.style = void 0 == e ? 0 : e
        if (0 > this.style || 5 < this.style) this.style = 0
        this.thickness = void 0 == d ? 20 : d
        this.brightness = void 0 == l ? 0.5 : l
        this.flowRate = void 0 == g ? 0.5 : g
        this.tiling = p || 0
        this.depthTest = k || !0
        this.shape = void 0 == f ? 0 : f
    },
    ODLineData = function (a, b, c, e, d, l, g, p, k, f, h, q, t, r, x, u, z) {
        this.id = a.toString()
        this.color = __convertColor(b)
        this.coordinates = c
        this.flowRate = void 0 == e ? 0.5 : e
        this.brightness = void 0 == d ? 0.5 : d
        this.bendDegree = void 0 == l ? 0.5 : l
        this.tiling = g || 0
        this.lineThickness = void 0 == p ? 20 : p
        this.flowPointSizeScale = void 0 == k ? 20 : k
        this.labelSizeScale = void 0 == f ? 100 : f
        this.lineShape = void 0 == h ? 1 : h
        this.lineStyle = q || 0
        this.flowShape = t || 0
        this.startPointShape = r || 0
        this.endPointShape = x || 0
        this.startLabelShape = u || 0
        this.endLabelShape = z || 0
        this.endLabelStyle = this.startLabelStyle = this.endPointStyle = this.startPointStyle = this.flowStyle = 0
    },
    PolygonData = function (a, b, c, e, d, l, g, p) {
        this.id = a.toString()
        this.color = __convertColor(b)
        this.coordinates = __convertCoordinatesForParts(c)
        this.framecolor = __convertColor(e)
        this.framethickness = d
        this.depthTest = l || !0
        this.brightness = g
        this.style = p
        if (0 > this.style || 10 < this.style) this.style = 0
    },
    PanoramaData = function (a, b, c, e, d, l) {
        this.id = a.toString()
        this.imagePath = b
        this.coordinate = c
        this.yaw = e
        this.groupId = d || ''
        this.userData = l || ''
    },
    DecalData = function (a, b, c, e, d, l, g, p) {
        this.id = a.toString()
        this.order = b
        this.texturePath = c
        this.location = e
        this.rotation = d
        this.scale = l
        this.groupId = g
        this.userData = p
    },
    TileLayerData = function (a, b, c, e, d) {
        this.id = a.toString()
        this.fileName = b
        this.location = c
        this.rotation = e
        this.scale = d
    },
    TileLayerActorData = function (a, b) {
        this.tileLayerId = a
        this.tileLayerActorNames = __makeArray(b)
    },
    CustomObjectData = function (a, b, c, e, d, l, g) {
        this.id = a
        this.pakFilePath = b
        this.assetPath = c
        this.location = e
        this.rotation = d
        this.scale = l
        this.smoothMotion = g
    },
    CustomObjectData2 = function (a, b, c, e, d, l, g) {
        this.id = a
        this.tileLayerId = b
        this.objectId = c
        this.location = e
        this.rotation = d
        this.scale = l
        this.smoothMotion = g
    },
    VideoProjectionData = function (a, b, c, e, d, l, g) {
        this.id = a
        this.videoURL = b
        this.location = c
        this.rotation = e
        this.fov = d
        this.aspectRatio = l
        this.distance = g
    },
    BPFuncParamType = { Bool: 0, UInt8: 1, Int32: 2, Float: 3, Double: 4, String: 5, Color: 6, Vector2D: 7, Vector: 8, Rotator: 9, IntArray: 10, StringArray: 11, VectorArray: 12 },
    BPFunctionData = function (a, b, c, e, d) {
        this.actorTag = a
        this.objectName = b
        this.functionName = c
        this.paramType = e
        this.paramValue = d
    },
    ViewshedData = function (a, b, c, e, d, l, g) {
        this.id = a.toString()
        this.coordinate = b
        this.fov = c
        this.radius = e
        this.direction = d
        this.groupId = l
        this.userData = g
    },
    DynamicWaterData = function (a, b, c, e, d) {
        this.id = a
        this.coordinates = __convertCoordinatesForParts(b)
        this.style = c
        this.groupId = e
        this.userData = d
    },
    CameraTourKeyFrame = function (a, b, c, e) {
        this.index = a
        this.time = b
        this.location = c
        this.rotation = e
    },
    CameraTourData = function (a, b, c) {
        this.id = a.toString()
        this.name = b.toString()
        this.keyFrames = c
    }
function __makeInt(a) {
    a = parseInt(a)
    isNaN(a) && (a = 0)
    return a
}
function __convertColor(a) {
    if (void 0 != a) {
        var b = []
        if (/^(rgb|RGB)/.test(a)) {
            a = a.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',')
            a = $jscomp.makeIterator(a)
            for (var c = a.next(); !c.done; c = a.next()) b.push(Number((Number(c.value) / 255).toFixed(1)))
        } else if (/^#/.test(a)) {
            if (/^#[0-9A-F]{3}$/i.test(a)) {
                var e = '#'
                a.replace(/[0-9A-F]/gi, function (d) {
                    e += d + d
                })
                a = e
            }
            ; /^#[0-9A-F]{6}$/i.test(a) &&
                a.replace(/[0-9A-F]{2}/gi, function (d) {
                    d = eval('0x' + d)
                    b.push(Number((d / 255).toFixed(1)))
                })
        } else a instanceof Array && (b = a)
        3 == b.length && b.push(1)
        return b
    }
}
function __getArrayDimenstion(a) {
    function b(c, e) {
        return c.reduce(function (d, l) {
            var g
            Array.isArray(l) && (g = b(l, e + 1))
            return g > d ? g : d
        }, e)
    }
    return b(a, 1)
}
function __convertCoordinatesForParts(a) {
    if (void 0 != a) {
        var b,
            c = __getArrayDimenstion(a)
        2 == c ? (b = [[a]]) : 3 == c ? (b = [a]) : 4 == c && (b = a)
        if (b)
            for (a = $jscomp.makeIterator(b), c = a.next(); !c.done; c = a.next()) {
                c = $jscomp.makeIterator(c.value)
                for (var e = c.next(); !e.done; e = c.next()) {
                    e = $jscomp.makeIterator(e.value)
                    for (var d = e.next(); !d.done; d = e.next()) (d = d.value), 2 == d.length && d.push(0)
                }
            }
        return b
    }
}
function __convertCoordinates(a) {
    if (void 0 != a) return 1 == __getArrayDimenstion(a) ? [a] : a
}
function __makeArray(a) {
    return a instanceof Array ? a : [a]
}
function _ip2int(a) {
    a = a.split('.')
    return (16777216 * Number(a[0]) + 65536 * Number(a[1]) + 256 * Number(a[2]) + Number(a[3])) >>> 0
}
function _int2ip(a) {
    var b = []
    b[0] = (a >>> 24) >>> 0
    b[1] = ((a << 8) >>> 24) >>> 0
    b[2] = (a << 16) >>> 24
    b[3] = (a << 24) >>> 24
    return String(b[0]) + '.' + String(b[1]) + '.' + String(b[2]) + '.' + String(b[3])
} /*
 FreeDo Co.Ltd.@2021 
 @fileoverview AirCity Javascript SDK
*/
var AcApiVersion = 'r4.3.340',
    __g = null,
    AirCityAPI = function (a, b, c) {
        __g = this
        this.callbackMap = new Map()
        this.eventCall = this.webSocket = null
        this.isFirstReady = !0
        this.callbackIndex = 0
        this.isConnected = !1
        this.onApiVersionReceived = void 0
        'function' == typeof b ? ((this.onReadyCall = b), 'function' == typeof c && (this.fnLog = c)) : 'object' == typeof b && ((this.onReadyCall = b.onReady), (this.eventCall = b.onEvent), (this.fnLog = b.onLog), (this.useColorLog = b.useColorLog), (this.onApiVersionReceived = b.onApiVersion))
        b = a.split('-')
        this.url = 4 == b.length ? 'ws://' + _int2ip(b[0]) + ':' + b[3] : 'ws://' + a
        this.initWebSocket()
        this.initInterface()
        this.initCommandType()
    }
AirCityAPI.prototype.setHost = function (a, b) {
    this.url = 'ws://' + a + ':' + b
}
AirCityAPI.prototype.reconnect = function () {
    this.initWebSocket(this.host, this.fnLog)
}
AirCityAPI.prototype._getCBIndex = function () {
    return ++this.callbackIndex
}
AirCityAPI.prototype.call0 = function (a, b) {
    return this.call({ command: a }, b)
}
AirCityAPI.prototype.call = function (a, b) {
    var c = this
    if (this.webSocket && 1 != this.webSocket.readyState) return this.logWithColor('red', 'Not connected!'), b ? void 0 : Promise.reject('Not connected!')
    if (void 0 == a.command || a.command == CommandType.None) return this.logWithColor('red', 'command is undefined or None'), b ? void 0 : Promise.reject('command is undefined or None')
    a.timestamp = Date.now()
    a.callbackIndex = this._getCBIndex()
    a.__command = CommandType[a.command] || 'Unknown'
    var e = a.command + '_' + a.callbackIndex
    b && (this.callbackMap[e] = b)
    var d = JSON.stringify(a)
    this.log('')
    this.logWithColor('RoyalBlue', 'Request: ' + (CommandType[a.command] || 'Unknown'), !0)
    this.logWithColor('green', '\uff08' + new Date(a.timestamp).toLocaleTimeString() + '\uff09')
    this.logWithColor('gray', '' + d)
    if (b) this.webSocket.send(d)
    else
        return new Promise(function (l) {
            c.callbackMap[e] = l
            c.webSocket.send(d)
        })
}
AirCityAPI.prototype.onEvent = function (a) {
    this.eventCall && this.eventCall(a)
}
AirCityAPI.prototype.onReady = function () {
    if (this.onReadyCall) this.onReadyCall()
    this.call({ command: CommandType.Misc_GetVersion })
}
AirCityAPI.prototype.setEventCallback = function (a) {
    this.eventCall = a
}
AirCityAPI.prototype.makeArray = function (a) {
    return a instanceof Array ? a : [a]
}
AirCityAPI.prototype.makeStringArray = function (a) {
    var b = []
    if (a instanceof Array) for (var c in a) b[c] = a[c].toString()
    else b = [a.toString()]
    return b
}
AirCityAPI.prototype.makeIntArray = function (a) {
    var b = []
    if (a instanceof Array) for (var c in a) b[c] = __makeInt(a[c])
    else b = [__makeInt(a)]
    return b
}
AirCityAPI.prototype.log = function (a, b, c) {
    this.fnLog && this.fnLog(a, b, c)
}
AirCityAPI.prototype.logWithColor = function (a, b, c) {
    this.fnLog && (this.useColorLog ? this.log("<font color='" + a + "'>" + b + '</font>', c) : this.log(b, c))
}
AirCityAPI.prototype.onConnectionClose = function (a) {
    this.isConnected = !1
    this.logWithColor('red', 'Closed! code: ' + a.code + ', reason: ' + (1006 == a.code ? 'timeout' : a.reason))
    this.log('')
    this.logWithColor('SpringGreen', 'Reconnecting...')
    this.isDestroyed || this.reconnect()
}
AirCityAPI.prototype.onConnectionMessage = function (a) {
    this.log('')
    var b = null
    try {
        b = JSON.parse(a.data)
    } catch (l) {
        console.error(l.message)
        this.log('Response: [Unknown]')
        return
    }
    var c = b.versionNumber || b.versionnumber
    if (c) {
        var e = b.versionType || '*'
        this.misc.apiVersionServer = e + '.' + c
        if (this.misc.apiVersionServer != AcApiVersion) {
            var d = '\u8b66\u544a\uff1a\n--------------------------------------------------\n    JSAPI\u548c\u4e91\u6e32\u67d3\u670d\u52a1\u5668\u7684\u7248\u672c\u4e0d\u4e00\u81f4\uff1as:' + this.misc.apiVersionServer + '-c:' + AcApiVersion + '\uff0c\n    \u53ef\u80fd\u9020\u6210\u63a5\u53e3\u8c03\u7528\u9519\u8bef\u6216\u5d29\u6e83\uff0c\n    \u8bf7\u4e0e\u6280\u672f\u4eba\u5458\u786e\u8ba4!'
            console.warn(d)
            alert(d)
        }
        if (this.onApiVersionReceived) this.onApiVersionReceived(e, c)
    }
    b.command ? ((c = Date.now() - b.timestamp), this.logWithColor('RoyalBlue', 'Response: ' + (CommandType[b.command] || 'Unknown'), !0), this.logWithColor('green', '\uff08\u8017\u65f6\uff1a' + c + 'ms\uff09'), this.logWithColor('gray', '\u8bf7\u6c42\u65f6\u95f4\uff1a' + new Date(b.timestamp).toLocaleTimeString(), !0), this.logWithColor('gray', '  \u54cd\u5e94\u65f6\u95f4\uff1a' + new Date(Date.now()).toLocaleTimeString())) : b.eventtype ? this.log('Response: Event') : this.log('Response: [Unknown]')
    this.logWithColor('gray', a.data)
    a = b.command + '_' + b.callbackIndex
    if ((c = this.callbackMap[a])) c(b), delete this.callbackMap[a]
    if (b.eventtype)
        if ('CompleteInitialization' == b.eventtype) this.log('The initialization is complete, now you can call the interfaces.'), this.onReady()
        else this.onEvent(b)
}
AirCityAPI.prototype.initWebSocket = function () {
    'WebSocket' in window
        ? (this.log('Connecting: ' + this.url),
            (this.webSocket = new WebSocket(this.url)),
            (this.webSocket.onopen = function () {
                this.logWithColor('blue', 'Connected!')
            }.bind(this)),
            (this.webSocket.onmessage = function (a) {
                this.onConnectionMessage(a)
            }.bind(this)),
            (this.webSocket.onclose = function (a) {
                this.onConnectionClose(a)
            }.bind(this)),
            (this.webSocket.onerror = function (a) {
                this.log('WebSocket error observed')
                console.error('WebSocket error observed')
            }.bind(this)))
        : this.log('Not Support WebSocket!')
}
AirCityAPI.prototype.initInterface = function () {
    this.camera = new AirCityAPI.Camera(this)
    this.coord = new AirCityAPI.Coord(this)
    this.layers = this.infoTree = new AirCityAPI.InfoTree(this)
    this.cameraTour = new AirCityAPI.CameraTour(this)
    this.tl = this.tileLayer = new AirCityAPI.TileLayer(this)
    this.tag = new AirCityAPI.Tag(this)
    this.marker = new AirCityAPI.Marker(this)
    this.ctag = this.customTag = new AirCityAPI.CustomTag(this)
    this.rp = this.radiationPoint = new AirCityAPI.RadiationPoint(this)
    this.customMesh = new AirCityAPI.CustomMesh(this)
    this.polyline = new AirCityAPI.Polyline(this)
    this.odline = new AirCityAPI.ODLine(this)
    this.polygon3d = new AirCityAPI.Polygon3D(this)
    this.polygon = new AirCityAPI.Polygon(this)
    this.heatmap = new AirCityAPI.HeatMap(this)
    this.beam = new AirCityAPI.Beam(this)
    this.ha = this.highlightArea = new AirCityAPI.HighlightArea(this)
    this.co = this.customObject = new AirCityAPI.CustomObject(this)
    this.vp = this.videoProjection = new AirCityAPI.VideoProjection(this)
    this.panorama = new AirCityAPI.Panorama(this)
    this.decal = new AirCityAPI.Decal(this)
    this.viewshed = new AirCityAPI.Viewshed(this)
    this.dynamicWater = new AirCityAPI.DynamicWater(this)
    this.misc = new AirCityAPI.Misc(this)
    this.tools = new AirCityAPI.Tools(this)
    this.settings = new AirCityAPI.Settings(this)
    this.weather = new AirCityAPI.Weather(this)
    this.editHelper = new AirCityAPI.EditHelper(this)
}
AirCityAPI.prototype.initCommandType = function () {
    if (!__bCommandTypeHasProcessd) {
        __bCommandTypeHasProcessd = !0
        for (var a in CommandType) CommandType[CommandType[a]] = a
    }
}
AirCityAPI.prototype.destroy = function () {
    this.isDestroyed = !0
    this.webSocket.close()
}
AirCityAPI.prototype.reset = function (a) {
    return this.call0(CommandType.Reset, a)
}
AirCityAPI.prototype.quit = function () {
    return this.call0(CommandType.Quit)
}
AirCityAPI.getHostFromInstanceId = function (a) {
    if (a && ((a = a.split('-')), 4 == a.length)) return [_int2ip(a[0]), a[3]]
}
AirCityAPI.Camera = function (a) {
    this.int = a
    this._useOldDataFormat = !1
}
AirCityAPI.Camera.prototype.useOldDataFormat = function (a) {
    this._useOldDataFormat = a || !0
}
AirCityAPI.Camera.prototype.get = function (a) {
    return this.int.call0(CommandType.Camera_GetCamera, a)
}
AirCityAPI.Camera.prototype._setByArray = function (a, b, c) {
    return this.set(a[0], a[1], a[2], a[3], a[4], b, c)
}
AirCityAPI.Camera.prototype._setByObject = function (a, b, c) {
    return this.set(a.x, a.y, a.z, a.pitch, a.yaw, b, c)
}
AirCityAPI.Camera.prototype.set = function (a, b, c, e, d, l, g) {
    if (a instanceof Array && 5 <= a.length) return this._setByArray(a, b, c)
    if ('object' == typeof a && a.hasOwnProperty('x')) return this._setByObject(a, b, c)
    'function' == typeof l && ((g = l), (l = void 0))
    if (this._useOldDataFormat) {
        var p = e
        e = d
        d = p
    }
    return this.int.call({ command: CommandType.Camera_Set, coordinate: [a, b, c], pitch: e || 0, yaw: d || 0, flyTime: l }, g)
}
AirCityAPI.Camera.prototype.lookAt = function (a, b, c, e, d, l, g, p) {
    'function' == typeof g && ((p = g), (g = void 0))
    if (this._useOldDataFormat) {
        var k = d
        d = l
        l = k
    }
    return this.int.call({ command: CommandType.Camera_Set, coordinate: [a, b, c], distance: e, pitch: d || 0, yaw: l || 0, flyTime: g }, p)
}
AirCityAPI.Camera.prototype.lookAtBBox = function (a, b, c, e, d) {
    'function' == typeof e && ((d = e), (e = void 0))
    if (this._useOldDataFormat) {
        var l = b
        b = c
        c = l
    }
    return this.int.call({ command: CommandType.Camera_LookAtBBox, bbox: a, pitch: b || 0, yaw: c || 0, flyTime: e }, d)
}
AirCityAPI.Camera.prototype.playAnimation = function (a, b) {
    return this.int.call({ command: CommandType.Camera_PlayAnimation, id: a }, b)
}
AirCityAPI.Camera.prototype.stopAnimation = function (a) {
    return this.int.call0(CommandType.Camera_StopAnimation, a)
}
AirCityAPI.Camera.prototype.pauseAnimation = function (a) {
    return this.int.call0(CommandType.Camera_PauseAnimation, a)
}
AirCityAPI.Camera.prototype.resumeAnimation = function (a) {
    return this.int.call0(CommandType.Camera_ResumeAnimation, a)
}
AirCityAPI.Camera.prototype.moveForward = function (a) {
    return this.int.call({ command: CommandType.Camera_Move, moveForward: !0 }, a)
}
AirCityAPI.Camera.prototype.moveBackward = function (a) {
    return this.int.call({ command: CommandType.Camera_Move, moveBackward: !0 }, a)
}
AirCityAPI.Camera.prototype.moveLeft = function (a) {
    return this.int.call({ command: CommandType.Camera_Move, moveLeft: !0 }, a)
}
AirCityAPI.Camera.prototype.moveRight = function (a) {
    return this.int.call({ command: CommandType.Camera_Move, moveRight: !0 }, a)
}
AirCityAPI.Camera.prototype.moveUp = function (a) {
    return this.int.call({ command: CommandType.Camera_Move, moveUp: !0 }, a)
}
AirCityAPI.Camera.prototype.moveDown = function (a) {
    return this.int.call({ command: CommandType.Camera_Move, moveDown: !0 }, a)
}
AirCityAPI.Camera.prototype.turnLeft = function (a) {
    return this.int.call({ command: CommandType.Camera_Move, turnLeft: !0 }, a)
}
AirCityAPI.Camera.prototype.turnRight = function (a) {
    return this.int.call({ command: CommandType.Camera_Move, turnRight: !0 }, a)
}
AirCityAPI.Camera.prototype.turnUp = function (a) {
    return this.int.call({ command: CommandType.Camera_Move, turnUp: !0 }, a)
}
AirCityAPI.Camera.prototype.turnDown = function (a) {
    return this.int.call({ command: CommandType.Camera_Move, turnDown: !0 }, a)
}
AirCityAPI.Camera.prototype.stop = function (a) {
    return this.int.call({ command: CommandType.Camera_Move, stop: !0 }, a)
}
AirCityAPI.Coord = function (a) {
    this.int = a
}
AirCityAPI.Coord.prototype.screen2World = function (a, b, c) {
    return this.int.call({ command: CommandType.Coord_Screen2World, screenPosition: [a, b] }, c)
}
AirCityAPI.Coord.prototype.world2Screen = function (a, b, c, e) {
    return this.int.call({ command: CommandType.Coord_World2Screen, worldlocation: [a, b, c] }, e)
}
AirCityAPI.Coord.prototype.gcs2pcs = function (a, b) {
    return this.int.call({ command: CommandType.Coord_GCS2PCS, coordinates: __convertCoordinates(a) }, b)
}
AirCityAPI.Coord.prototype.pcs2gcs = function (a, b) {
    return this.int.call({ command: CommandType.Coord_PCS2GCS, coordinates: __convertCoordinates(a) }, b)
}
AirCityAPI.InfoTree = function (a) {
    this.int = a
}
AirCityAPI.InfoTree.prototype.setVisibility = function (a, b) {
    return this.int.call({ command: CommandType.InfoTree_SetVisibility, layers: this.int.makeArray(a) }, b)
}
AirCityAPI.InfoTree.prototype.show = function (a, b) {
    return this.int.call({ command: CommandType.InfoTree_Show, ids: this.int.makeStringArray(a) }, b)
}
AirCityAPI.InfoTree.prototype.hide = function (a, b) {
    return this.int.call({ command: CommandType.InfoTree_Hide, ids: this.int.makeStringArray(a) }, b)
}
AirCityAPI.InfoTree.prototype.enableXRay = function (a, b, c) {
    return this.int.call({ command: CommandType.InfoTree_EnableXRay, ids: this.int.makeArray(a), color: b }, c)
}
AirCityAPI.InfoTree.prototype.disableXRay = function (a, b) {
    return this.int.call({ command: CommandType.InfoTree_DisableXRay, ids: this.int.makeArray(a) }, b)
}
AirCityAPI.InfoTree.prototype.showByGroupId = function (a, b) {
    return this.int.call({ command: CommandType.InfoTree_ShowByGroupId, ids: this.int.makeStringArray(a) }, b)
}
AirCityAPI.InfoTree.prototype.hideByGroupId = function (a, b) {
    return this.int.call({ command: CommandType.InfoTree_HideByGroupId, ids: this.int.makeStringArray(a) }, b)
}
AirCityAPI.InfoTree.prototype.highlightByGroupId = function (a, b) {
    return this.int.call({ command: CommandType.InfoTree_HighlightByGroupId, ids: this.int.makeStringArray(a) }, b)
}
AirCityAPI.InfoTree.prototype.deleteByGroupId = function (a, b) {
    return this.int.call({ command: CommandType.InfoTree_DeleteByGroupId, ids: this.int.makeStringArray(a) }, b)
}
AirCityAPI.InfoTree.prototype.get = function (a) {
    return this.int.call0(CommandType.InfoTree_Get, a)
}
AirCityAPI.Object = function (a, b, c) {
    this.int = a
    this.type = b
    this.colorProps = c
    this._useBatchUpdate = !1
    this._tempUpdateData = []
}
AirCityAPI.Object.prototype._checkCommand = function (a) {
    a = this.type + a
    var b = CommandType[a]
    void 0 == b && this.int.logWithColor('red', 'Invalid command: ' + a)
    return b
}
AirCityAPI.Object.prototype._processProps = function (a) {
    a = this.int.makeArray(a)
    for (var b = $jscomp.makeIterator(a), c = b.next(); !c.done; c = b.next()) {
        var e = c.value
        'string' != typeof e.id && (e.id = e.id.toString())
    }
    if (this.colorProps)
        for (b = this.colorProps.split('|'), e = $jscomp.makeIterator(a), c = e.next(); !c.done; c = e.next()) {
            c = c.value
            for (var d = $jscomp.makeIterator(b), l = d.next(); !l.done; l = d.next()) (l = l.value), c.hasOwnProperty(l) && (c[l] = __convertColor(c[l]))
        }
    if ('Polygon' == this.type || 'Polygon3D' == this.type || 'HighlightArea' == this.type || 'DynamicWater' == this.type) for (a = $jscomp.makeIterator(a), c = a.next(); !c.done; c = a.next()) (b = c.value), (b.coordinates = __convertCoordinatesForParts(b.coordinates))
}
AirCityAPI.Object.prototype._add = function (a, b) {
    this._processProps(a)
    return this.int.call({ command: this._checkCommand('_Add'), data: this.int.makeArray(a) }, b)
}
AirCityAPI.Object.prototype._update = function (a, b) {
    this._processProps(a)
    return this.int.call({ command: this._checkCommand('_Update'), data: this.int.makeArray(a) }, b)
}
AirCityAPI.Object.prototype._delete = function (a, b) {
    return this.int.call({ command: this._checkCommand('_Delete'), ids: this.int.makeStringArray(a) }, b)
}
AirCityAPI.Object.prototype._clear = function (a) {
    return this.int.call0(this._checkCommand('_Clear'), a)
}
AirCityAPI.Object.prototype._get = function (a, b) {
    return this.int.call({ command: this._checkCommand('_Get'), ids: this.int.makeStringArray(a) }, b)
}
AirCityAPI.Object.prototype._focus = function (a, b, c, e) {
    'function' == typeof c && ((e = c), (c = void 0))
    return this.int.call({ command: this._checkCommand('_Focus'), ids: this.int.makeStringArray(a), distance: b || 0, flyTime: c }, e)
}
AirCityAPI.Object.prototype._focusAll = function (a, b, c) {
    'function' == typeof b && ((c = b), (b = void 0))
    return this.int.call({ command: this._checkCommand('_FocusAll'), ids: [], distance: a || 0, flyTime: b }, c)
}
AirCityAPI.Object.prototype._show = function (a, b) {
    return this.int.call({ command: this._checkCommand('_Show'), ids: this.int.makeStringArray(a) }, b)
}
AirCityAPI.Object.prototype._showAll = function (a) {
    return this.int.call0(this._checkCommand('_ShowAll'), a)
}
AirCityAPI.Object.prototype._hide = function (a, b) {
    return this.int.call({ command: this._checkCommand('_Hide'), ids: this.int.makeStringArray(a) }, b)
}
AirCityAPI.Object.prototype._hideAll = function (a) {
    return this.int.call0(this._checkCommand('_HideAll'), a)
}
AirCityAPI.Object.prototype._updateOneProp = function (a, b, c, e) {
    if (this._useBatchUpdate) {
        e = !1
        for (var d = $jscomp.makeIterator(this._tempUpdateData), l = d.next(); !l.done; l = d.next())
            if (((l = l.value), l.id == a.toString())) {
                e = !0
                l[b] = c
                break
            }
        e || ((e = {}), (e.id = a.toString()), (e[b] = c), this._tempUpdateData.push(e))
    } else return (d = {}), (d.id = a.toString()), (d[b] = c), this.update(d, e)
}
AirCityAPI.Object.prototype.updateBegin = function () {
    this._useBatchUpdate = !0
    this._tempUpdateData = []
}
AirCityAPI.Object.prototype.updateEnd = function (a) {
    a = this.update(this._tempUpdateData, a)
    this._tempUpdateData = null
    this._useBatchUpdate = !1
    return a
}
AirCityAPI.CameraTour = function (a) {
    AirCityAPI.Object.call(this, a, 'CameraTour')
}
$jscomp.inherits(AirCityAPI.CameraTour, AirCityAPI.Object)
AirCityAPI.CameraTour.prototype.add = function (a, b) {
    return AirCityAPI.Object.prototype._add.call(this, a, b)
}
AirCityAPI.CameraTour.prototype.update = function (a, b) {
    return AirCityAPI.Object.prototype._update.call(this, a, b)
}
AirCityAPI.CameraTour.prototype.delete = function (a, b) {
    return AirCityAPI.Object.prototype._delete.call(this, a, b)
}
AirCityAPI.CameraTour.prototype.play = function (a, b) {
    return this.int.call({ command: CommandType.CameraTour_Play, ids: this.int.makeStringArray(a) }, b)
}
AirCityAPI.CameraTour.prototype.pause = function (a) {
    return this.int.call0(CommandType.CameraTour_Pause, a)
}
AirCityAPI.CameraTour.prototype.resume = function (a) {
    return this.int.call0(CommandType.CameraTour_Resume, a)
}
AirCityAPI.CameraTour.prototype.stop = function (a, b) {
    return this.int.call({ command: CommandType.CameraTour_Stop, ids: this.int.makeStringArray(a) }, b)
}
AirCityAPI.CameraTour.prototype.setUserData = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'userData', b, c)
}
AirCityAPI.CameraTour.prototype.setDuration = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'duration', b, c)
}
AirCityAPI.CameraTour.prototype.setKeyFrames = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'keyFrames', b, c)
}
AirCityAPI.CameraTour.prototype.setName = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'name', b, c)
}
AirCityAPI.TileLayer = function (a) {
    AirCityAPI.Object.call(this, a, 'TileLayer')
}
$jscomp.inherits(AirCityAPI.TileLayer, AirCityAPI.Object)
AirCityAPI.TileLayer.prototype.add = function (a, b) {
    return AirCityAPI.Object.prototype._add.call(this, a, b)
}
AirCityAPI.TileLayer.prototype.update = function (a, b) {
    return AirCityAPI.Object.prototype._update.call(this, a, b)
}
AirCityAPI.TileLayer.prototype.delete = function (a, b) {
    return AirCityAPI.Object.prototype._delete.call(this, a, b)
}
AirCityAPI.TileLayer.prototype.focus = function (a, b, c, e) {
    return AirCityAPI.Object.prototype._focus.call(this, a, b, c, e)
}
AirCityAPI.TileLayer.prototype.show = function (a, b) {
    return AirCityAPI.Object.prototype._show.call(this, a, b)
}
AirCityAPI.TileLayer.prototype.hide = function (a, b) {
    return AirCityAPI.Object.prototype._hide.call(this, a, b)
}
AirCityAPI.TileLayer.prototype.get = function (a, b) {
    return AirCityAPI.Object.prototype._get.call(this, a, b)
}
AirCityAPI.TileLayer.prototype.enableXRay = function (a, b, c) {
    return this.int.call({ command: CommandType.TileLayer_EnableXRay, ids: this.int.makeStringArray(a), color: b }, c)
}
AirCityAPI.TileLayer.prototype.disableXRay = function (a, b) {
    return this.int.call({ command: CommandType.TileLayer_DisableXRay, ids: this.int.makeStringArray(a) }, b)
}
AirCityAPI.TileLayer.prototype.enableClip = function (a, b) {
    var c = []
    a = this.int.makeArray(a)
    a = $jscomp.makeIterator(a)
    for (var e = a.next(); !e.done; e = a.next()) c.push({ id: e.value, allowClip: !0 })
    return this.int.call({ command: CommandType.TileLayer_SetAllowClip, data: c }, b)
}
AirCityAPI.TileLayer.prototype.disableClip = function (a, b) {
    var c = []
    a = this.int.makeArray(a)
    a = $jscomp.makeIterator(a)
    for (var e = a.next(); !e.done; e = a.next()) c.push({ id: e.value, allowClip: !1 })
    return this.int.call({ command: CommandType.TileLayer_SetAllowClip, data: c }, b)
}
AirCityAPI.TileLayer.prototype.setFileName = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'fileName', b, c)
}
AirCityAPI.TileLayer.prototype.setLocation = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'location', b, c)
}
AirCityAPI.TileLayer.prototype.setRotation = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'rotation', b, c)
}
AirCityAPI.TileLayer.prototype.setScale = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'scale', b, c)
}
AirCityAPI.TileLayer.prototype.showActor = function (a, b, c) {
    a = new TileLayerActorData(a, b)
    return this.showActors(a, c)
}
AirCityAPI.TileLayer.prototype.showActors = function (a, b) {
    return this.int.call({ command: CommandType.TileLayer_Actor_Show, data: this.int.makeArray(a) }, b)
}
AirCityAPI.TileLayer.prototype.hideActor = function (a, b, c) {
    a = new TileLayerActorData(a, b)
    return this.hideActors(a, c)
}
AirCityAPI.TileLayer.prototype.hideActors = function (a, b) {
    return this.int.call({ command: CommandType.TileLayer_Actor_Hide, data: this.int.makeArray(a) }, b)
}
AirCityAPI.TileLayer.prototype.focusActor = function (a, b, c) {
    a = new TileLayerActorData(a, b)
    return this.focusActors(a, c)
}
AirCityAPI.TileLayer.prototype.focusActors = function (a, b) {
    return this.int.call({ command: CommandType.TileLayer_Actor_Focus, data: this.int.makeArray(a) }, b)
}
AirCityAPI.TileLayer.prototype.highlightActor = function (a, b, c) {
    a = new TileLayerActorData(a, b)
    return this.highlightActors(a, c)
}
AirCityAPI.TileLayer.prototype.highlightActors = function (a, b) {
    return this.int.call({ command: CommandType.TileLayer_Actor_Highlight, data: this.int.makeArray(a) }, b)
}
AirCityAPI.TileLayer.prototype.stopHighlightActor = function (a, b, c) {
    var e = void 0 == a
    'function' == typeof a && ((c = a), (e = !0))
    if (e) return this.stopHighlightActors(c)
    a = new TileLayerActorData(a, b)
    return this.stopHighlightActors(a, c)
}
AirCityAPI.TileLayer.prototype.stopHighlightActors = function (a, b) {
    var c = !a
    'function' == typeof a && ((b = a), (c = !0))
    return c ? this.int.call0(CommandType.TileLayer_Actor_StopHightlight, b) : this.int.call({ command: CommandType.TileLayer_Actor_Unhighlight, data: this.int.makeArray(a) }, b)
}
AirCityAPI.TileLayer.prototype.showAllActors = function (a, b) {
    return this.int.call({ command: CommandType.TileLayer_Actor_ShowAll, ids: this.int.makeStringArray(a) }, b)
}
AirCityAPI.TileLayer.prototype.hideAllActors = function (a, b) {
    return this.int.call({ command: CommandType.TileLayer_Actor_HideAll, ids: this.int.makeStringArray(a) }, b)
}
AirCityAPI.TileLayer.prototype.setStyle = function (a, b, c, e) {
    return this.int.call({ command: CommandType.TileLayer_SetStyle, ids: this.int.makeStringArray(a), style: b, color: __convertColor(c) }, e)
}
AirCityAPI.TileLayer.prototype.setCollision = function (a, b, c) {
    a = this.int.makeStringArray(a)
    var e = []
    a = $jscomp.makeIterator(a)
    for (var d = a.next(); !d.done; d = a.next()) e.push({ id: d.value, enableCollision: b })
    return this.int.call({ command: CommandType.TileLayer_SetCollision, data: e }, c)
}
AirCityAPI.TileLayer.prototype.addModifier = function (a, b, c, e, d) {
    return this.int.call({ command: CommandType.TileLayer_Modifier_Add, id: a, tileLayerId: b, coordinates: c, ententBufferSize: e }, d)
}
AirCityAPI.TileLayer.prototype.updateModifier = function (a, b, c, e, d) {
    return this.int.call({ command: CommandType.TileLayer_Modifier_Update, id: a, tileLayerId: b, coordinates: c, ententBufferSize: e }, d)
}
AirCityAPI.TileLayer.prototype.deleteModifier = function (a, b, c) {
    return this.int.call({ command: CommandType.TileLayer_Modifier_Delete, id: a, tileLayerId: b }, c)
}
AirCityAPI.TileLayer.prototype.clearModifier = function (a, b) {
    return this.int.call({ command: CommandType.TileLayer_Modifier_Clear, ids: this.int.makeStringArray(a) }, b)
}
AirCityAPI.TileLayer.prototype.setViewportVisible = function (a, b, c) {
    var e = []
    b & Viewport.V1 && e.push({ viewportIndex: 1, viewportVisible: !0 })
    b & Viewport.V2 && e.push({ viewportIndex: 2, viewportVisible: !0 })
    b & Viewport.V3 && e.push({ viewportIndex: 3, viewportVisible: !0 })
    b & Viewport.V4 && e.push({ viewportIndex: 4, viewportVisible: !0 })
    return this.int.call({ command: CommandType.TileLayer_SetViewportVisible, id: a, data: e }, c)
}
AirCityAPI.TileLayer.prototype.getObjectIDs = function (a, b) {
    return this.int.call({ command: CommandType.TileLayer_GetObjectIDs, ids: this.int.makeStringArray(a) }, b)
}
AirCityAPI.Marker = function (a) {
    AirCityAPI.Object.call(this, a, 'Marker', 'fontColor|fontOutlineColor|textBackgroundColor|lineColor')
}
$jscomp.inherits(AirCityAPI.Marker, AirCityAPI.Object)
AirCityAPI.Marker.prototype.add = function (a, b) {
    this._fixMarkerData(a)
    return AirCityAPI.Object.prototype._add.call(this, a, b)
}
AirCityAPI.Marker.prototype._fixMarkerProperty = function (a) {
    a.textColor && (a.fontColor = a.textColor)
    a.url && (a.popupURL = a.url)
    a.popupURL && !a.popupSize && (a.popupSize = [600, 400])
}
AirCityAPI.Marker.prototype._fixMarkerData = function (a) {
    if (a instanceof Array) {
        a = $jscomp.makeIterator(a)
        for (var b = a.next(); !b.done; b = a.next()) this._fixMarkerProperty(b.value)
    } else this._fixMarkerProperty(a)
}
AirCityAPI.Marker.prototype.update = function (a, b) {
    this._fixMarkerData(a)
    return AirCityAPI.Object.prototype._update.call(this, a, b)
}
AirCityAPI.Marker.prototype.delete = function (a, b) {
    return AirCityAPI.Object.prototype._delete.call(this, a, b)
}
AirCityAPI.Marker.prototype.clear = function (a) {
    return AirCityAPI.Object.prototype._clear.call(this, a)
}
AirCityAPI.Marker.prototype.focus = function (a, b, c, e) {
    return AirCityAPI.Object.prototype._focus.call(this, a, b, c, e)
}
AirCityAPI.Marker.prototype.focusAll = function (a, b, c) {
    return AirCityAPI.Object.prototype._focusAll.call(this, a, b, c)
}
AirCityAPI.Marker.prototype.show = function (a, b) {
    return AirCityAPI.Object.prototype._show.call(this, a, b)
}
AirCityAPI.Marker.prototype.showAll = function (a) {
    return AirCityAPI.Object.prototype._showAll.call(this, a)
}
AirCityAPI.Marker.prototype.hide = function (a, b) {
    return AirCityAPI.Object.prototype._hide.call(this, a, b)
}
AirCityAPI.Marker.prototype.hideAll = function (a) {
    return AirCityAPI.Object.prototype._hideAll.call(this, a)
}
AirCityAPI.Marker.prototype.showPopupWindow = function (a, b) {
    return this.int.call({ command: CommandType.Marker_ShowPopupWindow, ids: this.int.makeStringArray(a) }, b)
}
AirCityAPI.Marker.prototype.hidePopupWindow = function (a, b) {
    return this.int.call({ command: CommandType.Marker_HidePopupWindow, ids: this.int.makeStringArray(a) }, b)
}
AirCityAPI.Marker.prototype.showAllPopupWindow = function (a) {
    return this.int.call0(CommandType.Marker_ShowAllPopupWindow, a)
}
AirCityAPI.Marker.prototype.hideAllPopupWindow = function (a) {
    return this.int.call0(CommandType.Marker_HideAllPopupWindow, a)
}
AirCityAPI.Marker.prototype.get = function (a, b) {
    return AirCityAPI.Object.prototype._get.call(this, a, b)
}
AirCityAPI.Marker.prototype.setGroupId = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'groupId', b, c)
}
AirCityAPI.Marker.prototype.setUserData = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'userData', b, c)
}
AirCityAPI.Marker.prototype.setScreenOffset = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'screenOffset', b, c)
}
AirCityAPI.Marker.prototype.setCoordinate = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'coordinate', b, c)
}
AirCityAPI.Marker.prototype.setImagePath = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'imagePath', b, c)
}
AirCityAPI.Marker.prototype.setImageSize = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'imageSize', b, c)
}
AirCityAPI.Marker.prototype.setHoverImagePath = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'hoverImagePath', b, c)
}
AirCityAPI.Marker.prototype.setURL = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'url', b, c)
}
AirCityAPI.Marker.prototype.setText = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'text', b, c)
}
AirCityAPI.Marker.prototype.setTextOffset = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'textOffset', b, c)
}
AirCityAPI.Marker.prototype.setFontSize = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'fontSize', b, c)
}
AirCityAPI.Marker.prototype.setFontOutlineSize = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'fontOutlineSize', b, c)
}
AirCityAPI.Marker.prototype.setRange = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'range', b, c)
}
AirCityAPI.Marker.prototype.setTextRange = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'textRange', b, c)
}
AirCityAPI.Marker.prototype.setFontColor = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'fontColor', b, c)
}
AirCityAPI.Marker.prototype.setFontOutlineColor = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'fontOutlineColor', b, c)
}
AirCityAPI.Marker.prototype.setTextBackgroundColor = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'textBackgroundColor', b, c)
}
AirCityAPI.Marker.prototype.setAutoHidePopupWindow = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'autoHidePopupWindow', b, c)
}
AirCityAPI.Marker.prototype.setPopupURL = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'popupURL', b, c)
}
AirCityAPI.Marker.prototype.setPopupSize = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'popupSize', b, c)
}
AirCityAPI.Marker.prototype.setPopupOffset = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'popupOffset', b, c)
}
AirCityAPI.Marker.prototype.setLineSize = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'lineSize', b, c)
}
AirCityAPI.Marker.prototype.setLineColor = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'lineColor', b, c)
}
AirCityAPI.Marker.prototype.setLineOffset = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'lineOffset', b, c)
}
AirCityAPI.Marker.prototype.setPriority = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'priority', b, c)
}
AirCityAPI.Tag = function (a) {
    AirCityAPI.Object.call(this, a, 'Tag', 'textColor|textBackgroundColor|textBorderColor')
}
$jscomp.inherits(AirCityAPI.Tag, AirCityAPI.Object)
AirCityAPI.Tag.prototype.add = function (a, b) {
    return AirCityAPI.Object.prototype._add.call(this, a, b)
}
AirCityAPI.Tag.prototype.update = function (a, b) {
    return AirCityAPI.Object.prototype._update.call(this, a, b)
}
AirCityAPI.Tag.prototype.delete = function (a, b) {
    return AirCityAPI.Object.prototype._delete.call(this, a, b)
}
AirCityAPI.Tag.prototype.clear = function (a) {
    return AirCityAPI.Object.prototype._clear.call(this, a)
}
AirCityAPI.Tag.prototype.focus = function (a, b, c, e) {
    return AirCityAPI.Object.prototype._focus.call(this, a, b, c, e)
}
AirCityAPI.Tag.prototype.focusAll = function (a, b, c) {
    return AirCityAPI.Object.prototype._focusAll.call(this, a, b, c)
}
AirCityAPI.Tag.prototype.show = function (a, b) {
    return AirCityAPI.Object.prototype._show.call(this, a, b)
}
AirCityAPI.Tag.prototype.showAll = function (a) {
    return AirCityAPI.Object.prototype._showAll.call(this, a)
}
AirCityAPI.Tag.prototype.hide = function (a, b) {
    return AirCityAPI.Object.prototype._hide.call(this, a, b)
}
AirCityAPI.Tag.prototype.hideAll = function (a) {
    return AirCityAPI.Object.prototype._hideAll.call(this, a)
}
AirCityAPI.Tag.prototype.get = function (a, b) {
    return AirCityAPI.Object.prototype._get.call(this, a, b)
}
AirCityAPI.Tag.prototype.setCoordinate = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'coordinate', b, c)
}
AirCityAPI.Tag.prototype.setImagePath = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'imagePath', b, c)
}
AirCityAPI.Tag.prototype.setImageSize = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'imageSize', b, c)
}
AirCityAPI.Tag.prototype.setURL = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'url', b, c)
}
AirCityAPI.Tag.prototype.setText = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'text', b, c)
}
AirCityAPI.Tag.prototype.setRange = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'range', b, c)
}
AirCityAPI.Tag.prototype.setTextColor = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'textColor', b, c)
}
AirCityAPI.Tag.prototype.setTextBackgroundColor = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'textBackgroundColor', b, c)
}
AirCityAPI.Tag.prototype.setTextBorderColor = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'textBorderColor', b, c)
}
AirCityAPI.Tag.prototype.setShowLine = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'showLine', b, c)
}
AirCityAPI.Tag.prototype.setAutoHidePopupWindow = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'autoHidePopupWindow', b, c)
}
AirCityAPI.Tag.prototype.showPopupWindow = function (a, b) {
    return this.int.call({ command: CommandType.Tag_PopupWindow_Show, ids: this.int.makeStringArray(a) }, b)
}
AirCityAPI.Tag.prototype.hidePopupWindow = function (a, b) {
    return this.int.call({ command: CommandType.Tag_PopupWindow_Hide, ids: this.int.makeStringArray(a) }, b)
}
AirCityAPI.Tag.prototype.showAllPopupWindow = function (a) {
    return this.int.call0(CommandType.Tag_PopupWindow_ShowAll, a)
}
AirCityAPI.Tag.prototype.hideAllPopupWindow = function (a) {
    return this.int.call0(CommandType.Tag_PopupWindow_HideAll, a)
}
AirCityAPI.CustomTag = function (a) {
    AirCityAPI.Object.call(this, a, 'CustomTag')
}
$jscomp.inherits(AirCityAPI.CustomTag, AirCityAPI.Object)
AirCityAPI.CustomTag.prototype.add = function (a, b) {
    return AirCityAPI.Object.prototype._add.call(this, a, b)
}
AirCityAPI.CustomTag.prototype.update = function (a, b) {
    return AirCityAPI.Object.prototype._update.call(this, a, b)
}
AirCityAPI.CustomTag.prototype.delete = function (a, b) {
    return AirCityAPI.Object.prototype._delete.call(this, a, b)
}
AirCityAPI.CustomTag.prototype.clear = function (a) {
    return AirCityAPI.Object.prototype._clear.call(this, a)
}
AirCityAPI.CustomTag.prototype.focus = function (a, b, c, e) {
    return AirCityAPI.Object.prototype._focus.call(this, a, b, c, e)
}
AirCityAPI.CustomTag.prototype.show = function (a, b) {
    return AirCityAPI.Object.prototype._show.call(this, a, b)
}
AirCityAPI.CustomTag.prototype.showAll = function (a) {
    return AirCityAPI.Object.prototype._showAll.call(this, a)
}
AirCityAPI.CustomTag.prototype.hide = function (a, b) {
    return AirCityAPI.Object.prototype._hide.call(this, a, b)
}
AirCityAPI.CustomTag.prototype.hideAll = function (a) {
    return AirCityAPI.Object.prototype._hideAll.call(this, a)
}
AirCityAPI.CustomTag.prototype.get = function (a, b) {
    return AirCityAPI.Object.prototype._get.call(this, a, b)
}
AirCityAPI.CustomTag.prototype.setAutoHidePopupWindow = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'autoHidePopupWindow', b, c)
}
AirCityAPI.RadiationPoint = function (a) {
    AirCityAPI.Object.call(this, a, 'RadiationPoint', 'color')
}
$jscomp.inherits(AirCityAPI.RadiationPoint, AirCityAPI.Object)
AirCityAPI.RadiationPoint.prototype.add = function (a, b) {
    return AirCityAPI.Object.prototype._add.call(this, a, b)
}
AirCityAPI.RadiationPoint.prototype.update = function (a, b) {
    return AirCityAPI.Object.prototype._update.call(this, a, b)
}
AirCityAPI.RadiationPoint.prototype.delete = function (a, b) {
    return AirCityAPI.Object.prototype._delete.call(this, a, b)
}
AirCityAPI.RadiationPoint.prototype.clear = function (a) {
    return AirCityAPI.Object.prototype._clear.call(this, a)
}
AirCityAPI.RadiationPoint.prototype.focus = function (a, b, c, e) {
    return AirCityAPI.Object.prototype._focus.call(this, a, b, c, e)
}
AirCityAPI.RadiationPoint.prototype.focusAll = function (a, b, c) {
    return AirCityAPI.Object.prototype._focusAll.call(this, a, b, c)
}
AirCityAPI.RadiationPoint.prototype.show = function (a, b) {
    return AirCityAPI.Object.prototype._show.call(this, a, b)
}
AirCityAPI.RadiationPoint.prototype.hide = function (a, b) {
    return AirCityAPI.Object.prototype._hide.call(this, a, b)
}
AirCityAPI.RadiationPoint.prototype.get = function (a, b) {
    return AirCityAPI.Object.prototype._get.call(this, a, b)
}
AirCityAPI.RadiationPoint.prototype.setCoordinate = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'coordinate', b, c)
}
AirCityAPI.RadiationPoint.prototype.setRadius = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'radius', b, c)
}
AirCityAPI.RadiationPoint.prototype.setRippleNumber = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'rippleNumber', b, c)
}
AirCityAPI.RadiationPoint.prototype.setColor = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'color', __convertColor(b), c)
}
AirCityAPI.RadiationPoint.prototype.setBrightness = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'brightness', b, c)
}
AirCityAPI.CustomMesh = function (a) {
    AirCityAPI.Object.call(this, a, 'CustomMesh', 'color')
}
$jscomp.inherits(AirCityAPI.CustomMesh, AirCityAPI.Object)
AirCityAPI.CustomMesh.prototype.add = function (a, b) {
    return AirCityAPI.Object.prototype._add.call(this, a, b)
}
AirCityAPI.CustomMesh.prototype.update = function (a, b) {
    return AirCityAPI.Object.prototype._update.call(this, a, b)
}
AirCityAPI.CustomMesh.prototype.delete = function (a, b) {
    return AirCityAPI.Object.prototype._delete.call(this, a, b)
}
AirCityAPI.CustomMesh.prototype.clear = function (a) {
    return AirCityAPI.Object.prototype._clear.call(this, a)
}
AirCityAPI.CustomMesh.prototype.focus = function (a, b, c, e) {
    return AirCityAPI.Object.prototype._focus.call(this, a, b, c, e)
}
AirCityAPI.CustomMesh.prototype.focusAll = function (a, b, c) {
    return AirCityAPI.Object.prototype._focusAll.call(this, a, b, c)
}
AirCityAPI.CustomMesh.prototype.show = function (a, b) {
    return AirCityAPI.Object.prototype._show.call(this, a, b)
}
AirCityAPI.CustomMesh.prototype.hide = function (a, b) {
    return AirCityAPI.Object.prototype._hide.call(this, a, b)
}
AirCityAPI.CustomMesh.prototype.get = function (a, b) {
    return AirCityAPI.Object.prototype._get.call(this, a, b)
}
AirCityAPI.CustomMesh.prototype.setCoordinates = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'coordinates', b, c)
}
AirCityAPI.CustomMesh.prototype.setIndices = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'indices', b, c)
}
AirCityAPI.CustomMesh.prototype.setColor = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'color', b, c)
}
AirCityAPI.Polygon3D = function (a) {
    AirCityAPI.Object.call(this, a, 'Polygon3D', 'color')
}
$jscomp.inherits(AirCityAPI.Polygon3D, AirCityAPI.Object)
AirCityAPI.Polygon3D.prototype.add = function (a, b) {
    return AirCityAPI.Object.prototype._add.call(this, a, b)
}
AirCityAPI.Polygon3D.prototype.update = function (a, b) {
    return AirCityAPI.Object.prototype._update.call(this, a, b)
}
AirCityAPI.Polygon3D.prototype.delete = function (a, b) {
    return AirCityAPI.Object.prototype._delete.call(this, a, b)
}
AirCityAPI.Polygon3D.prototype.clear = function (a) {
    return AirCityAPI.Object.prototype._clear.call(this, a)
}
AirCityAPI.Polygon3D.prototype.focus = function (a, b, c, e) {
    return AirCityAPI.Object.prototype._focus.call(this, a, b, c, e)
}
AirCityAPI.Polygon3D.prototype.show = function (a, b) {
    return AirCityAPI.Object.prototype._show.call(this, a, b)
}
AirCityAPI.Polygon3D.prototype.hide = function (a, b) {
    return AirCityAPI.Object.prototype._hide.call(this, a, b)
}
AirCityAPI.Polygon3D.prototype.get = function (a, b) {
    return AirCityAPI.Object.prototype._get.call(this, a, b)
}
AirCityAPI.Polygon3D.prototype.highlight = function (a, b) {
    return this.int.call({ command: CommandType.Polygon3D_Highlight, ids: this.int.makeStringArray(a) }, b)
}
AirCityAPI.Polygon3D.prototype.glow = function (a, b, c) {
    return this.int.call({ command: CommandType.Polygon3D_Glow, ids: this.int.makeStringArray(a), duration: b }, c)
}
AirCityAPI.Polygon3D.prototype.stopGlow = function (a, b) {
    return this.int.call({ command: CommandType.Polygon3D_Glow, ids: this.int.makeStringArray(a) }, b)
}
AirCityAPI.Polygon3D.prototype.setStyle = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'style', b, c)
}
AirCityAPI.Polygon3D.prototype.setCoordinates = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'coordinates', b, c)
}
AirCityAPI.Polygon3D.prototype.setColor = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'color', __convertColor(b), c)
}
AirCityAPI.Polygon3D.prototype.setHeight = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'height', b, c)
}
AirCityAPI.Polygon3D.prototype.setIntensity = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'intensity', b, c)
}
AirCityAPI.Polygon3D.prototype.setTillingX = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'tillingX', b, c)
}
AirCityAPI.Polygon3D.prototype.setTillingY = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'tillingY', b, c)
}
AirCityAPI.Polyline = function (a) {
    AirCityAPI.Object.call(this, a, 'Polyline', 'color')
}
$jscomp.inherits(AirCityAPI.Polyline, AirCityAPI.Object)
AirCityAPI.Polyline.prototype.add = function (a, b) {
    return AirCityAPI.Object.prototype._add.call(this, a, b)
}
AirCityAPI.Polyline.prototype.update = function (a, b) {
    return AirCityAPI.Object.prototype._update.call(this, a, b)
}
AirCityAPI.Polyline.prototype.delete = function (a, b) {
    return AirCityAPI.Object.prototype._delete.call(this, a, b)
}
AirCityAPI.Polyline.prototype.clear = function (a) {
    return AirCityAPI.Object.prototype._clear.call(this, a)
}
AirCityAPI.Polyline.prototype.focus = function (a, b, c, e) {
    return AirCityAPI.Object.prototype._focus.call(this, a, b, c, e)
}
AirCityAPI.Polyline.prototype.show = function (a, b) {
    return AirCityAPI.Object.prototype._show.call(this, a, b)
}
AirCityAPI.Polyline.prototype.showAll = function (a) {
    return AirCityAPI.Object.prototype._showAll.call(this, a)
}
AirCityAPI.Polyline.prototype.hide = function (a, b) {
    return AirCityAPI.Object.prototype._hide.call(this, a, b)
}
AirCityAPI.Polyline.prototype.hideAll = function (a) {
    return AirCityAPI.Object.prototype._hideAll.call(this, a)
}
AirCityAPI.Polyline.prototype.get = function (a, b) {
    return AirCityAPI.Object.prototype._get.call(this, a, b)
}
AirCityAPI.Polyline.prototype.setCoordinates = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'coordinates', b, c)
}
AirCityAPI.Polyline.prototype.setStyle = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'style', b, c)
}
AirCityAPI.Polyline.prototype.setThickness = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'thickness', b, c)
}
AirCityAPI.Polyline.prototype.setColor = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'color', __convertColor(b), c)
}
AirCityAPI.Polyline.prototype.setFlowRate = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'flowRate', b, c)
}
AirCityAPI.Polyline.prototype.setBrightness = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'brightness', b, c)
}
AirCityAPI.Polyline.prototype.setShape = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'shape', b, c)
}
AirCityAPI.Polyline.prototype.setDepthTest = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'depthTest', b, c)
}
AirCityAPI.ODLine = function (a) {
    AirCityAPI.Object.call(this, a, 'ODLine', 'color')
}
$jscomp.inherits(AirCityAPI.ODLine, AirCityAPI.Object)
AirCityAPI.ODLine.prototype.add = function (a, b) {
    return AirCityAPI.Object.prototype._add.call(this, a, b)
}
AirCityAPI.ODLine.prototype.update = function (a, b) {
    return AirCityAPI.Object.prototype._update.call(this, a, b)
}
AirCityAPI.ODLine.prototype.delete = function (a, b) {
    return AirCityAPI.Object.prototype._delete.call(this, a, b)
}
AirCityAPI.ODLine.prototype.clear = function (a) {
    return AirCityAPI.Object.prototype._clear.call(this, a)
}
AirCityAPI.ODLine.prototype.focus = function (a, b, c, e) {
    return AirCityAPI.Object.prototype._focus.call(this, a, b, c, e)
}
AirCityAPI.ODLine.prototype.show = function (a, b) {
    return AirCityAPI.Object.prototype._show.call(this, a, b)
}
AirCityAPI.ODLine.prototype.showAll = function (a) {
    return AirCityAPI.Object.prototype._showAll.call(this, a)
}
AirCityAPI.ODLine.prototype.hide = function (a, b) {
    return AirCityAPI.Object.prototype._hide.call(this, a, b)
}
AirCityAPI.ODLine.prototype.hideAll = function (a) {
    return AirCityAPI.Object.prototype._hideAll.call(this, a)
}
AirCityAPI.ODLine.prototype.get = function (a, b) {
    return AirCityAPI.Object.prototype._get.call(this, a, b)
}
AirCityAPI.ODLine.prototype.setCoordinates = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'coordinates', b, c)
}
AirCityAPI.ODLine.prototype.setColor = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'color', __convertColor(b), c)
}
AirCityAPI.ODLine.prototype.setFlowRate = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'flowRate', b, c)
}
AirCityAPI.ODLine.prototype.setBrightness = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'brightness', b, c)
}
AirCityAPI.ODLine.prototype.setTiling = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'tiling', b, c)
}
AirCityAPI.ODLine.prototype.setBendDegree = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'bendDegree', b, c)
}
AirCityAPI.ODLine.prototype.setLineThickness = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'lineThickness', b, c)
}
AirCityAPI.ODLine.prototype.setflowPointSizeScale = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'flowPointSizeScale', b, c)
}
AirCityAPI.ODLine.prototype.setLabelSizeScale = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'labelSizeScale', b, c)
}
AirCityAPI.ODLine.prototype.setLineShape = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'lineShape', b, c)
}
AirCityAPI.ODLine.prototype.setLineStyle = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'lineStyle', b, c)
}
AirCityAPI.ODLine.prototype.setFlowShape = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'flowShape', b, c)
}
AirCityAPI.ODLine.prototype.setStartPointShape = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'startPointShape', b, c)
}
AirCityAPI.ODLine.prototype.setEndPointShape = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'endPointShape', b, c)
}
AirCityAPI.ODLine.prototype.setStartLabelShape = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'startLabelShape', b, c)
}
AirCityAPI.ODLine.prototype.setEndLabelShape = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'endLabelShape', b, c)
}
AirCityAPI.Polygon = function (a) {
    AirCityAPI.Object.call(this, a, 'Polygon', 'color|frameColor')
}
$jscomp.inherits(AirCityAPI.Polygon, AirCityAPI.Object)
AirCityAPI.Polygon.prototype.add = function (a, b) {
    return AirCityAPI.Object.prototype._add.call(this, a, b)
}
AirCityAPI.Polygon.prototype.update = function (a, b) {
    return AirCityAPI.Object.prototype._update.call(this, a, b)
}
AirCityAPI.Polygon.prototype.delete = function (a, b) {
    return AirCityAPI.Object.prototype._delete.call(this, a, b)
}
AirCityAPI.Polygon.prototype.clear = function (a) {
    return AirCityAPI.Object.prototype._clear.call(this, a)
}
AirCityAPI.Polygon.prototype.focus = function (a, b, c, e) {
    return AirCityAPI.Object.prototype._focus.call(this, a, b, c, e)
}
AirCityAPI.Polygon.prototype.show = function (a, b) {
    return AirCityAPI.Object.prototype._show.call(this, a, b)
}
AirCityAPI.Polygon.prototype.hide = function (a, b) {
    return AirCityAPI.Object.prototype._hide.call(this, a, b)
}
AirCityAPI.Polygon.prototype.get = function (a, b) {
    return AirCityAPI.Object.prototype._get.call(this, a, b)
}
AirCityAPI.Polygon.prototype.glow = function (a, b, c) {
    return this.int.call({ command: CommandType.Polygon_Glow, ids: this.int.makeStringArray(a), duration: b }, c)
}
AirCityAPI.Polygon.prototype.highlight = function (a, b) {
    return this.int.call({ command: CommandType.Polygon_Hightlight, ids: this.int.makeStringArray(a) }, b)
}
AirCityAPI.Polygon.prototype.setCoordinates = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'coordinates', __convertCoordinatesForParts(b), c)
}
AirCityAPI.Polygon.prototype.setColor = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'color', __convertColor(b), c)
}
AirCityAPI.Polygon.prototype.setDepthTest = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'depthTest', b, c)
}
AirCityAPI.HeatMap = function (a) {
    AirCityAPI.Object.call(this, a, 'HeatMap')
}
$jscomp.inherits(AirCityAPI.HeatMap, AirCityAPI.Object)
AirCityAPI.HeatMap.prototype._checkBBox = function (a) {
    if (a instanceof Array) {
        if (6 != a.length || a[0] > a[3] || a[1] > a[4] || a[2] > a[5]) return !1
    } else return !1
    return !0
}
AirCityAPI.HeatMap.prototype.add = function (a, b, c, e, d) {
    return this._checkBBox(b) ? this.int.call({ command: CommandType.HeatMap_Add, id: a, bbox: b, range: c, data: this.int.makeArray(e) }, d) : (this.int.logWithColor('red', 'Invalid bbox value'), !1)
}
AirCityAPI.HeatMap.prototype.update = function (a, b, c, e, d) {
    a = { command: CommandType.HeatMap_Update, id: a }
    if (b) {
        if (!this._checkBBox(b)) return this.int.logWithColor('red', 'Invalid bbox value'), !1
        a.bbox = b
    }
    c && (a.range = c)
    e && (a.data = this.int.makeArray(e))
    return this.int.call(a, d)
}
AirCityAPI.HeatMap.prototype.delete = function (a, b) {
    return AirCityAPI.Object.prototype._delete.call(this, a, b)
}
AirCityAPI.HeatMap.prototype.clear = function (a) {
    return AirCityAPI.Object.prototype._clear.call(this, a)
}
AirCityAPI.HeatMap.prototype.focus = function (a, b, c, e) {
    return AirCityAPI.Object.prototype._focus.call(this, a, b, c, e)
}
AirCityAPI.HeatMap.prototype.show = function (a, b) {
    return AirCityAPI.Object.prototype._show.call(this, a, b)
}
AirCityAPI.HeatMap.prototype.hide = function (a, b) {
    return AirCityAPI.Object.prototype._hide.call(this, a, b)
}
AirCityAPI.HeatMap.prototype.get = function (a, b) {
    return AirCityAPI.Object.prototype._get.call(this, a, b)
}
AirCityAPI.HeatMap.prototype.addPoints = function (a, b, c) {
    return this.int.call({ command: CommandType.HeatMap_AddPoints, id: a, data: this.int.makeArray(b) }, c)
}
AirCityAPI.HeatMap.prototype.removePoints = function (a, b, c) {
    return this.int.call({ command: CommandType.HeatMap_RemovePoints, id: a, pointIds: this.int.makeArray(b) }, c)
}
AirCityAPI.HeatMap.prototype.setRange = function (a, b, c) {
    return this.int.call({ command: CommandType.HeatMap_Update, id: a, range: b }, c)
}
AirCityAPI.HeatMap.prototype.setBBox = function (a, b, c) {
    return this._checkBBox(bbox) ? this.int.call({ command: CommandType.HeatMap_Update, id: a, bbox: b }, c) : (this.int.logWithColor('red', 'Invalid bbox value'), !1)
}
AirCityAPI.Beam = function (a) {
    AirCityAPI.Object.call(this, a, 'Beam', 'color')
}
$jscomp.inherits(AirCityAPI.Beam, AirCityAPI.Object)
AirCityAPI.Beam.prototype.add = function (a, b) {
    return AirCityAPI.Object.prototype._add.call(this, a, b)
}
AirCityAPI.Beam.prototype.update = function (a, b) {
    return AirCityAPI.Object.prototype._update.call(this, a, b)
}
AirCityAPI.Beam.prototype.delete = function (a, b) {
    return AirCityAPI.Object.prototype._delete.call(this, a, b)
}
AirCityAPI.Beam.prototype.clear = function (a) {
    return AirCityAPI.Object.prototype._clear.call(this, a)
}
AirCityAPI.Beam.prototype.focus = function (a, b, c, e) {
    return AirCityAPI.Object.prototype._focus.call(this, a, b, c, e)
}
AirCityAPI.Beam.prototype.get = function (a, b) {
    return AirCityAPI.Object.prototype._get.call(this, a, b)
}
AirCityAPI.Beam.prototype.setDuration = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'duration', b, c)
}
AirCityAPI.Beam.prototype.setThickness = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'thickness', b, c)
}
AirCityAPI.Beam.prototype.setInterval = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'interval', b, c)
}
AirCityAPI.Beam.prototype.setVelocity = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'velocity', b, c)
}
AirCityAPI.Beam.prototype.setColor = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'color', __convertColor(b), c)
}
AirCityAPI.Beam.prototype.setCoordinates = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'coordinates', b, c)
}
AirCityAPI.HighlightArea = function (a) {
    AirCityAPI.Object.call(this, a, 'HighlightArea', 'color')
}
$jscomp.inherits(AirCityAPI.HighlightArea, AirCityAPI.Object)
AirCityAPI.HighlightArea.prototype.add = function (a, b) {
    return AirCityAPI.Object.prototype._add.call(this, a, b)
}
AirCityAPI.HighlightArea.prototype.update = function (a, b) {
    return AirCityAPI.Object.prototype._update.call(this, a, b)
}
AirCityAPI.HighlightArea.prototype.delete = function (a, b) {
    return AirCityAPI.Object.prototype._delete.call(this, a, b)
}
AirCityAPI.HighlightArea.prototype.clear = function (a) {
    return AirCityAPI.Object.prototype._clear.call(this, a)
}
AirCityAPI.HighlightArea.prototype.focus = function (a, b, c, e) {
    return AirCityAPI.Object.prototype._focus.call(this, a, b, c, e)
}
AirCityAPI.HighlightArea.prototype.show = function (a, b) {
    return AirCityAPI.Object.prototype._show.call(this, a, b)
}
AirCityAPI.HighlightArea.prototype.hide = function (a, b) {
    return AirCityAPI.Object.prototype._hide.call(this, a, b)
}
AirCityAPI.HighlightArea.prototype.get = function (a, b) {
    return AirCityAPI.Object.prototype._get.call(this, a, b)
}
AirCityAPI.HighlightArea.prototype.setColor = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'color', __convertColor(b), c)
}
AirCityAPI.HighlightArea.prototype.setCoordinates = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'coordinates', b, c)
}
AirCityAPI.HighlightArea.prototype.setHeightRange = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'heightRange', b, c)
}
AirCityAPI.HighlightArea.prototype.setIntensity = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'intensity', b, c)
}
AirCityAPI.HighlightArea.prototype.setDepthTest = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'depthTest', b, c)
}
AirCityAPI.CustomObject = function (a) {
    AirCityAPI.Object.call(this, a, 'CustomObject')
}
$jscomp.inherits(AirCityAPI.CustomObject, AirCityAPI.Object)
AirCityAPI.CustomObject.prototype.add = function (a, b) {
    return AirCityAPI.Object.prototype._add.call(this, a, b)
}
AirCityAPI.CustomObject.prototype.update = function (a, b) {
    return AirCityAPI.Object.prototype._update.call(this, a, b)
}
AirCityAPI.CustomObject.prototype.delete = function (a, b) {
    return AirCityAPI.Object.prototype._delete.call(this, a, b)
}
AirCityAPI.CustomObject.prototype.clear = function (a) {
    return AirCityAPI.Object.prototype._clear.call(this, a)
}
AirCityAPI.CustomObject.prototype.focus = function (a, b, c, e) {
    return AirCityAPI.Object.prototype._focus.call(this, a, b, c, e)
}
AirCityAPI.CustomObject.prototype.show = function (a, b) {
    return AirCityAPI.Object.prototype._show.call(this, a, b)
}
AirCityAPI.CustomObject.prototype.hide = function (a, b) {
    return AirCityAPI.Object.prototype._hide.call(this, a, b)
}
AirCityAPI.CustomObject.prototype.get = function (a, b) {
    return AirCityAPI.Object.prototype._get.call(this, a, b)
}
AirCityAPI.CustomObject.prototype.addByTileLayer = function (a, b) {
    return this.int.call({ command: CommandType.CustomObject_AddByTileLayer, data: this.int.makeArray(a) }, b)
}
AirCityAPI.CustomObject.prototype.highlight = function (a, b, c) {
    return this.int.call({ command: CommandType.CustomObject_Highlight, ids: this.int.makeStringArray(a), color: __convertColor(b) }, c)
}
AirCityAPI.CustomObject.prototype.unhighlight = function (a, b) {
    return 'undefined' == typeof a || 'function' == typeof a ? ('function' == typeof a && (b = a), this.int.call({ command: CommandType.CustomObject_StopHighlight }, b)) : this.int.call({ command: CommandType.CustomObject_Unhighlight, ids: this.int.makeStringArray(a) }, b)
}
AirCityAPI.CustomObject.prototype.callFunction = function (a, b, c, e, d) {
    return this.int.call({ command: CommandType.CustomObject_CallFunction, data: this.int.makeArray({ id: a.toString(), functionName: b, paramType: c, paramValue: e }) }, d)
}
AirCityAPI.CustomObject.prototype.setLocation = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'location', b, c)
}
AirCityAPI.CustomObject.prototype.setRotation = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'rotation', b, c)
}
AirCityAPI.CustomObject.prototype.setScale = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'scale', b, c)
}
AirCityAPI.CustomObject.prototype.setSmoothMotion = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'smoothMotion', b, c)
}
AirCityAPI.VideoProjection = function (a) {
    AirCityAPI.Object.call(this, a, 'VideoProjection')
}
$jscomp.inherits(AirCityAPI.VideoProjection, AirCityAPI.Object)
AirCityAPI.VideoProjection.prototype.add = function (a, b) {
    return AirCityAPI.Object.prototype._add.call(this, a, b)
}
AirCityAPI.VideoProjection.prototype.update = function (a, b) {
    return AirCityAPI.Object.prototype._update.call(this, a, b)
}
AirCityAPI.VideoProjection.prototype.delete = function (a, b) {
    return AirCityAPI.Object.prototype._delete.call(this, a, b)
}
AirCityAPI.VideoProjection.prototype.focus = function (a, b, c, e) {
    return AirCityAPI.Object.prototype._focus.call(this, a, b, c, e)
}
AirCityAPI.VideoProjection.prototype.show = function (a, b) {
    return AirCityAPI.Object.prototype._show.call(this, a, b)
}
AirCityAPI.VideoProjection.prototype.hide = function (a, b) {
    return AirCityAPI.Object.prototype._hide.call(this, a, b)
}
AirCityAPI.VideoProjection.prototype.get = function (a, b) {
    return AirCityAPI.Object.prototype._get.call(this, a, b)
}
AirCityAPI.VideoProjection.prototype.showFrustum = function (a, b) {
    return this.int.call({ command: CommandType.VideoProjection_ShowFrustum, ids: this.int.makeStringArray(a) }, b)
}
AirCityAPI.VideoProjection.prototype.hideFrustum = function (a, b) {
    return this.int.call({ command: CommandType.VideoProjection_HideFrustum, ids: this.int.makeStringArray(a) }, b)
}
AirCityAPI.VideoProjection.prototype.setVideoURL = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'videoURL', b, c)
}
AirCityAPI.VideoProjection.prototype.setLocation = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'location', b, c)
}
AirCityAPI.VideoProjection.prototype.setTranslation = function (a, b, c) {
    return this.setLocation(a, b, c)
}
AirCityAPI.VideoProjection.prototype.setRotation = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'rotation', b, c)
}
AirCityAPI.VideoProjection.prototype.setFovy = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'fovy', b, c)
}
AirCityAPI.VideoProjection.prototype.setAspectRatio = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'aspectRatio', b, c)
}
AirCityAPI.VideoProjection.prototype.setDistance = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'distance', b, c)
}
AirCityAPI.Panorama = function (a) {
    AirCityAPI.Object.call(this, a, 'Panorama')
}
$jscomp.inherits(AirCityAPI.Panorama, AirCityAPI.Object)
AirCityAPI.Panorama.prototype.add = function (a, b) {
    return AirCityAPI.Object.prototype._add.call(this, a, b)
}
AirCityAPI.Panorama.prototype.update = function (a, b) {
    return AirCityAPI.Object.prototype._update.call(this, a, b)
}
AirCityAPI.Panorama.prototype.delete = function (a, b) {
    return AirCityAPI.Object.prototype._delete.call(this, a, b)
}
AirCityAPI.Panorama.prototype.clear = function (a) {
    return AirCityAPI.Object.prototype._clear.call(this, a)
}
AirCityAPI.Panorama.prototype.focus = function (a, b, c, e) {
    return AirCityAPI.Object.prototype._focus.call(this, a, b, c, e)
}
AirCityAPI.Panorama.prototype.get = function (a, b) {
    return AirCityAPI.Object.prototype._get.call(this, a, b)
}
AirCityAPI.Decal = function (a) {
    AirCityAPI.Object.call(this, a, 'Decal')
}
$jscomp.inherits(AirCityAPI.Decal, AirCityAPI.Object)
AirCityAPI.Decal.prototype.add = function (a, b) {
    return AirCityAPI.Object.prototype._add.call(this, a, b)
}
AirCityAPI.Decal.prototype.update = function (a, b) {
    return AirCityAPI.Object.prototype._update.call(this, a, b)
}
AirCityAPI.Decal.prototype.delete = function (a, b) {
    return AirCityAPI.Object.prototype._delete.call(this, a, b)
}
AirCityAPI.Decal.prototype.clear = function (a) {
    return AirCityAPI.Object.prototype._clear.call(this, a)
}
AirCityAPI.Decal.prototype.focus = function (a, b, c, e) {
    return AirCityAPI.Object.prototype._focus.call(this, a, b, c, e)
}
AirCityAPI.Decal.prototype.focusAll = function (a, b, c) {
    return AirCityAPI.Object.prototype._focusAll.call(this, a, b, c)
}
AirCityAPI.Decal.prototype.get = function (a, b) {
    return AirCityAPI.Object.prototype._get.call(this, a, b)
}
AirCityAPI.Viewshed = function (a) {
    AirCityAPI.Object.call(this, a, 'Viewshed')
}
$jscomp.inherits(AirCityAPI.Viewshed, AirCityAPI.Object)
AirCityAPI.Viewshed.prototype.add = function (a, b) {
    return AirCityAPI.Object.prototype._add.call(this, a, b)
}
AirCityAPI.Viewshed.prototype.update = function (a, b) {
    return AirCityAPI.Object.prototype._update.call(this, a, b)
}
AirCityAPI.Viewshed.prototype.delete = function (a, b) {
    return AirCityAPI.Object.prototype._delete.call(this, a, b)
}
AirCityAPI.Viewshed.prototype.clear = function (a) {
    return AirCityAPI.Object.prototype._clear.call(this, a)
}
AirCityAPI.Viewshed.prototype.focus = function (a, b, c, e) {
    return AirCityAPI.Object.prototype._focus.call(this, a, b, c, e)
}
AirCityAPI.Viewshed.prototype.get = function (a, b) {
    return AirCityAPI.Object.prototype._get.call(this, a, b)
}
AirCityAPI.DynamicWater = function (a) {
    AirCityAPI.Object.call(this, a, 'DynamicWater')
}
$jscomp.inherits(AirCityAPI.DynamicWater, AirCityAPI.Object)
AirCityAPI.DynamicWater.prototype.add = function (a, b) {
    return AirCityAPI.Object.prototype._add.call(this, a, b)
}
AirCityAPI.DynamicWater.prototype.update = function (a, b) {
    return AirCityAPI.Object.prototype._update.call(this, a, b)
}
AirCityAPI.DynamicWater.prototype.delete = function (a, b) {
    return AirCityAPI.Object.prototype._delete.call(this, a, b)
}
AirCityAPI.DynamicWater.prototype.clear = function (a) {
    return AirCityAPI.Object.prototype._clear.call(this, a)
}
AirCityAPI.DynamicWater.prototype.focus = function (a, b, c, e) {
    return AirCityAPI.Object.prototype._focus.call(this, a, b, c, e)
}
AirCityAPI.DynamicWater.prototype.get = function (a, b) {
    return AirCityAPI.Object.prototype._get.call(this, a, b)
}
AirCityAPI.DynamicWater.prototype.setCoordinates = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'coordinates', __convertCoordinatesForParts(b), c)
}
AirCityAPI.DynamicWater.prototype.setMaterialPath = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'materialPath', b, c)
}
AirCityAPI.DynamicWater.prototype.setStyle = function (a, b, c) {
    return AirCityAPI.Object.prototype._updateOneProp.call(this, a, 'style', b, c)
}
AirCityAPI.Misc = function (a) {
    this.int = a
    this.apiVersion = AcApiVersion
    this.apiVersionServer = ''
}
AirCityAPI.Misc.prototype.isApiVersionMatched = function () {
    return AcApiVersion == this.apiVersionServer
}
AirCityAPI.Misc.prototype.addImageButtons = function (a, b) {
    return this.int.call({ command: CommandType.Misc_AddImageButton, data: this.int.makeArray(a) }, b)
}
AirCityAPI.Misc.prototype.deleteImageButtons = function (a, b) {
    return this.int.call({ command: CommandType.Misc_DeleteImageButton, ids: this.int.makeStringArray(a) }, b)
}
AirCityAPI.Misc.prototype.addAnimatedImageButtons = function (a, b) {
    return this.int.call({ command: CommandType.Misc_AddAnimatedImageButton, data: this.int.makeArray(a) }, b)
}
AirCityAPI.Misc.prototype.setApiVersionReceived = function (a) {
    this.int.onApiVersionReceived = a
}
AirCityAPI.Misc.prototype.playVideo = function (a, b, c, e, d, l, g) {
    return this.int.call({ command: CommandType.Misc_PlayVideo, data: [{ id: a.toString(), position: [b, c], size: [e, d], url: l }] }, g)
}
AirCityAPI.Misc.prototype.stopPlayVideo = function (a, b) {
    return this.int.call({ command: CommandType.Misc_StopPlayVideo, ids: this.int.makeStringArray(a) }, b)
}
AirCityAPI.Misc.prototype.playMovie = function (a, b, c) {
    'function' == typeof b && ((c = b), (b = !1))
    return this.int.call({ command: CommandType.Misc_PlayMovie, loop: b, url: a }, c)
}
AirCityAPI.Misc.prototype.stopMovie = function (a) {
    return this.int.call({ command: CommandType.Misc_StopMovie }, a)
}
AirCityAPI.Misc.prototype.setWindowResolution = function (a, b, c) {
    return this.int.call({ command: CommandType.Misc_SetWindowResolution, cx: a, cy: b, mode: 0 }, c)
}
AirCityAPI.Misc.prototype.callBPFunction = function (a, b) {
    return this.int.call({ command: CommandType.Misc_CallBPFunction, data: this.int.makeArray(a) }, b)
}
AirCityAPI.Misc.prototype.enterReportMode = function (a) {
    return this.int.call0(CommandType.Misc_EnterReportMode)
}
AirCityAPI.Misc.prototype.exitReportMode = function (a) {
    return this.int.call0(CommandType.Misc_ExitReportMode, a)
}
AirCityAPI.Misc.prototype.showAllFoliages = function (a) {
    return this.int.call0(CommandType.Misc_ShowAllFoliages, a)
}
AirCityAPI.Misc.prototype.hideAllFoliages = function (a) {
    return this.int.call0(CommandType.Misc_HideAllFoliages, a)
}
AirCityAPI.Misc.prototype.startProcess = function (a, b, c, e) {
    'function' == typeof c && ((e = c), (c = !0))
    return this.int.call({ command: CommandType.Misc_StartProcess, appName: a, commandLine: b, visible: c }, e)
}
AirCityAPI.Misc.prototype.startPolygonClip = function (a, b, c) {
    return this.int.tools.startPolygonClip(a, b, c)
}
AirCityAPI.Misc.prototype.stopClip = function (a) {
    return this.int.tools.stopClip(a)
}
AirCityAPI.Misc.prototype.playAnimation = function (a, b) {
    return this.int.camera.playAnimation(a, b)
}
AirCityAPI.Misc.prototype.stopAnimation = function (a) {
    return this.int.camera.stopAnimation(a)
}
AirCityAPI.Misc.prototype.setDateTime = function (a, b, c, e, d, l, g, p) {
    return this.int.weather.setDateTime(a, b, c, e, d, l, g, p)
}
AirCityAPI.Misc.prototype.setQueryToolState = function (a, b) {
    return this.int.call({ command: CommandType.Settings_SetMousePickMask, mouseClick: a }, b)
}
AirCityAPI.Misc.prototype.setCampassVisible = function (a, b) {
    return this.int.settings.setCampassVisible(a, b)
}
AirCityAPI.Misc.prototype.setMainUIVisibility = function (a, b) {
    return this.int.settings.setMainUIVisibility(a, b)
}
AirCityAPI.Misc.prototype.setMousePickMask = function (a, b) {
    return this.int.settings.setMousePickMask(a, b)
}
AirCityAPI.Tools = function (a) {
    this.int = a
}
AirCityAPI.Tools.prototype.startPolygonClip = function (a, b, c) {
    return this.int.call({ command: CommandType.Tools_StartPolygonClip, data: this.int.makeArray({ id: '0', toggleImageCut: b, coordinates: __convertCoordinatesForParts(a) }) }, c)
}
AirCityAPI.Tools.prototype.startPlaneClip = function (a, b, c, e) {
    return this.int.call({ command: CommandType.Tools_StartPlaneClip, location: a, rotation: b, showPlane: c }, e)
}
AirCityAPI.Tools.prototype.startVolumeClip = function (a, b, c) {
    return this.int.call({ command: CommandType.Tools_StartVolumeClip, bbox: a, value: b }, c)
}
AirCityAPI.Tools.prototype.stopClip = function (a) {
    return this.stopPolygonClip(a)
}
AirCityAPI.Tools.prototype.stopPolygonClip = function (a) {
    return this.int.call0(CommandType.Tools_StopClip, a)
}
AirCityAPI.Tools.prototype.stopPlaneClip = function (a) {
    return this.int.call({ command: CommandType.Tools_StopPlaneClip }, a)
}
AirCityAPI.Tools.prototype.stopVolumeClip = function (a) {
    return this.int.call({ command: CommandType.Tools_StopVolumeClip }, a)
}
AirCityAPI.Tools.prototype.setMeasurement = function (a, b, c) {
    b = b || {}
    return this.int.call({ command: CommandType.Tools_SetMeasurement, type: a, lineSize: b.lineSize, pointSize: b.pointSize, textColor: __convertColor(b.textColor), pointColor: __convertColor(b.pointColor), lineColor: __convertColor(b.lineColor), areaColor: __convertColor(b.areaColor), showCoordinateText: b.showCoordinateText }, c)
}
AirCityAPI.Tools.prototype.startMeasurement = function (a) {
    return this.int.call0(CommandType.Tools_StartMeasurement, a)
}
AirCityAPI.Tools.prototype.stopMeasurement = function (a) {
    return this.int.call0(CommandType.Tools_StopMeasurement, a)
}
AirCityAPI.Tools.prototype.lineIntersect = function (a, b, c) {
    return this.int.call({ command: CommandType.Tools_LineIntersect, start: a, end: b }, c)
}
AirCityAPI.Tools.prototype.startGeometryEdit = function (a, b) {
    return this.int.call({ command: CommandType.Tools_StartGeometryEdit, id: a }, b)
}
AirCityAPI.Tools.prototype.stopGeometryEdit = function (a) {
    return this.int.call0(CommandType.Tools_StopGeometryEdit, a)
}
AirCityAPI.Tools.prototype.startSkylineAnalysis = function (a, b) {
    a = a || {}
    a.outlineColor && (a.outlineColor = __convertColor(a.outlineColor))
    a.sceneColor && (a.sceneColor = __convertColor(a.sceneColor))
    a.skylineColor && (a.skylineColor = __convertColor(a.skylineColor))
    a.backgroundColor && (a.backgroundColor = __convertColor(a.backgroundColor))
    if (a.tileLayers) {
        a.tileLayers = this.int.makeArray(a.tileLayers)
        for (var c = $jscomp.makeIterator(a.tileLayers), e = c.next(); !e.done; e = c.next()) (e = e.value), e.hasOwnProperty('color') && (e.color = __convertColor(e.color))
    }
    a.command = CommandType.Tools_StartSkylineAnalysis
    return this.int.call(a, b)
}
AirCityAPI.Tools.prototype.stopSkylineAnalysis = function (a) {
    return this.int.call0(CommandType.Tools_StopSkylineAnalysis, a)
}
AirCityAPI.Tools.prototype.exportSkyline = function (a, b, c, e) {
    c = c || {}
    c.skylineColor && (c.skylineColor = __convertColor(c.skylineColor))
    c.backgroundColor && (c.backgroundColor = __convertColor(c.backgroundColor))
    if (c.tileLayers) {
        c.tileLayers = this.int.makeArray(c.tileLayers)
        for (var d = $jscomp.makeIterator(c.tileLayer), l = d.next(); !l.done; l = d.next()) (l = l.value), l.hasOwnProperty('color') && (l.color = __convertColor(l.color))
    }
    return this.int.call(
        {
            command: CommandType.Tools_ExportSkyline,
            path: a,
            size: b,
            skylineColor: c.skylineColor,
            backgroundColor: c.backgroundColor,
        },
        e
    )
}
AirCityAPI.Tools.prototype.startViewshedAnalysis = function (a, b) {
    a = a || {}
    a.visibleColor && (a.visibleColor = __convertColor(a.visibleColor))
    a.invisibleColor && (a.invisibleColor = __convertColor(a.invisibleColor))
    a.command = CommandType.Tools_StartViewshedAnalysis
    return this.int.call(a, b)
}
AirCityAPI.Tools.prototype.stopViewshedAnalysis = function (a) {
    return this.int.call0(CommandType.Tools_StopViewshedAnalysis, a)
}
AirCityAPI.Settings = function (a) {
    this.int = a
}
AirCityAPI.Settings.prototype.setMapMode = function (a, b, c) {
    b = b || {}
    return this.int.call({ command: CommandType.Settings_SetMapMode, mode: a, serviceType: b.serviceType || 0, coordType: b.coordType || 0, mapPoint: b.mapPoint || [0, 0], longitude: b.longitude || 0, latitude: b.latitude || 0, cache: b.cache || ':memory:', style: b.style || 'mapbox://styles/mapbox/streets-v10', groundHeight: b.groundHeight || 0, renderMode: b.renderMode || 0, coordOrder: b.coordOrder }, c)
}
AirCityAPI.Settings.prototype.getMapMode = function (a) {
    return this.int.call0(CommandType.Settings_GetMapMode, a)
}
AirCityAPI.Settings.prototype.setMapURL = function (a, b) {
    return this.int.call({ command: CommandType.Settings_SetMapURL, url: a }, b)
}
AirCityAPI.Settings.prototype.highlightColor = function (a, b) {
    return this.setHighlightColor(a, b)
}
AirCityAPI.Settings.prototype.setHighlightColor = function (a, b) {
    return this.int.call({ command: CommandType.Settings_SetHighlightColor, color: __convertColor(a) }, b)
}
AirCityAPI.Settings.prototype.setFovX = function (a, b) {
    return this.int.call({ command: CommandType.Settings_SetFovX, value: a }, b)
}
AirCityAPI.Settings.prototype.setOceanColor = function (a, b) {
    return this.int.call({ command: CommandType.Settings_SetOceanColor, color: a }, b)
}
AirCityAPI.Settings.prototype.setEnableInteract = function (a, b) {
    return this.int.call({ command: CommandType.Settings_SetEnableInteract, bEnable: a }, b)
}
AirCityAPI.Settings.prototype.setInteractiveMode = function (a, b) {
    return this.int.call({ command: CommandType.Settings_SetInteractiveMode, mode: a }, b)
}
AirCityAPI.Settings.prototype.setCampassVisible = function (a, b) {
    return this.int.call({ command: CommandType.Settings_SetCampassVisible, visible: a }, b)
}
AirCityAPI.Settings.prototype.setMainUIVisibility = function (a, b) {
    return this.int.call({ command: CommandType.Settings_SetMainUIVisibility, visible: a }, b)
}
AirCityAPI.Settings.prototype.setMousePickMask = function (a, b) {
    var c = !1,
        e = !1,
        d = !1
    a & MousePickMask.MouseClick && (c = !0)
    a & MousePickMask.MouseMove && (e = !0)
    a & MousePickMask.MouseHover && (d = !0)
    return this.int.call({ command: CommandType.Settings_SetMousePickMask, mouseClick: c, mouseMove: e, mouseHover: d }, b)
}
AirCityAPI.Settings.prototype.setTerrainAlpha = function (a, b) {
    return this.int.call({ command: CommandType.Settings_SetTerrainAlpha, alpha: a }, b)
}
AirCityAPI.Settings.prototype.setEnableCameraMovingEvent = function (a, b) {
    return this.int.call({ command: CommandType.Settings_EnableCameraMovingEvent, bEnable: a }, b)
}
AirCityAPI.Weather = function (a) {
    this.int = a
}
AirCityAPI.Weather.prototype.getParams = function (a) {
    return this.int.call0(CommandType.Weather_GetParams, a)
}
AirCityAPI.Weather.prototype._setParam = function (a, b) {
    return this.int.call({ command: CommandType.Weather_SetParams, data: a }, b)
}
AirCityAPI.Weather.prototype.setDateTime = function (a, b, c, e, d, l, g) {
    return this.int.call({ command: CommandType.Weather_SetDate, year: a, month: b, day: c, hour: e, minute: d, daynightLoop: l }, g)
}
AirCityAPI.Weather.prototype.setRainParam = function (a, b, c, e) {
    return this.int.call({ command: CommandType.Weather_SetParams, rainsnow: 0, rainsnowStrength: a, rainsnowSpeed: b, raindropSize: c }, e)
}
AirCityAPI.Weather.prototype.setSnowParam = function (a, b, c, e) {
    return this.int.call({ command: CommandType.Weather_SetParams, rainsnow: 1, rainsnowStrength: a, rainsnowSpeed: b, snowflakeSize: c }, e)
}
AirCityAPI.Weather.prototype.disableRainSnow = function (a) {
    return this.int.call({ command: CommandType.Weather_SetParams, rainsnowStrength: 0 }, a)
}
AirCityAPI.Weather.prototype.setFogParam = function (a, b, c, e) {
    return this.int.call({ command: CommandType.Weather_SetParams, fogDensity: a, fogGroundDensity: b, fogGroundHeight: c }, e)
}
AirCityAPI.Weather.prototype.setCloudDensity = function (a, b) {
    return this.int.call({ command: CommandType.Weather_SetParams, cloudDensity: a }, b)
}
AirCityAPI.Weather.prototype.setDarkMode = function (a, b) {
    return this.int.call({ command: CommandType.Weather_SetParams, darkMode: !!a }, b)
}
AirCityAPI.EditHelper = function (a) {
    this.int = a
}
AirCityAPI.EditHelper.prototype.start = function (a) {
    return this.int.call0(CommandType.EditHelper_Start, a)
}
AirCityAPI.EditHelper.prototype.cancel = function (a) {
    return this.int.call0(CommandType.EditHelper_Quit, a)
}
AirCityAPI.EditHelper.prototype.finish = function (a, b) {
    return this.int.call({ command: CommandType.EditHelper_Finish, withOffset: a || !0 }, b)
}
AirCityAPI.EditHelper.prototype.setParam = function (a, b, c, e, d, l) {
    return this.int.call({ command: CommandType.EditHelper_SetParam, lineType: a, buildType: b, drawType: c, color: __convertColor(e), drawThickness: d }, l)
}
var AirCityCloud = AirCityAPI,
    apiExports = {
        MapMode: MapMode,
        WebUIData: WebUIData,
        TagData: TagData,
        CustomTagData: CustomTagData,
        BeamData: BeamData,
        PolylineData: PolylineData,
        ODLineData: ODLineData,
        PolygonData: PolygonData,
        Polygon3DData: Polygon3DData,
        Polygon3DStyle: Polygon3DStyle,
        HeatMapPointData: HeatMapPointData,
        HighlightAreaData: HighlightAreaData,
        RadiationPointData: RadiationPointData,
        ImageButtonData: ImageButtonData,
        AnimatedImageButtonData: AnimatedImageButtonData,
        LayerVisibleData: LayerVisibleData,
        TileLayerData: TileLayerData,
        TileLayerActorData: TileLayerActorData,
        CustomObjectData: CustomObjectData,
        CustomObjectData2: CustomObjectData2,
        VideoProjectionData: VideoProjectionData,
        BPFunctionData: BPFunctionData,
        BPFuncParamType: BPFuncParamType,
        CameraTourKeyFrame: CameraTourKeyFrame,
        CameraTourData: CameraTourData,
        PanoramaData: PanoramaData,
        DecalData: DecalData,
        MeasurementMode: MeasurementMode,
        ViewshedData: ViewshedData,
        DynamicWaterData: DynamicWaterData,
        AirCityCloud: AirCityCloud,
        MousePickMask: MousePickMask,
        AirCityAPI: AirCityAPI,
    }
if ('undefined' == typeof acapi) acapi = apiExports
else for (var v in apiExports) acapi[v] = apiExports[v]
'undefined' != typeof module && module.exports
    ? (module.exports = acapi)
    : 'function' == typeof define && define.amd
        ? define(function () {
            return acapi
        })
        : ((window.MapMode = MapMode),
            (window.WebUIData = WebUIData),
            (window.TagData = TagData),
            (window.CustomTagData = CustomTagData),
            (window.BeamData = BeamData),
            (window.TileLayerData = TileLayerData),
            (window.PolylineData = PolylineData),
            (window.ODLineData = ODLineData),
            (window.PolygonData = PolygonData),
            (window.Polygon3DData = Polygon3DData),
            (window.Polygon3DStyle = Polygon3DStyle),
            (window.HeatMapPointData = HeatMapPointData),
            (window.HighlightAreaData = HighlightAreaData),
            (window.RadiationPointData = RadiationPointData),
            (window.ImageButtonData = ImageButtonData),
            (window.AnimatedImageButtonData = AnimatedImageButtonData),
            (window.LayerVisibleData = LayerVisibleData),
            (window.TileLayerData = TileLayerData),
            (window.TileLayerActorData = TileLayerActorData),
            (window.CustomObjectData = CustomObjectData),
            (window.CustomObjectData2 = CustomObjectData2),
            (window.VideoProjectionData = VideoProjectionData),
            (window.BPFunctionData = BPFunctionData),
            (window.BPFuncParamType = BPFuncParamType),
            (window.CameraTourKeyFrame = CameraTourKeyFrame),
            (window.CameraTourData = CameraTourData),
            (window.PanoramaData = PanoramaData),
            (window.DecalData = DecalData),
            (window.MeasurementMode = MeasurementMode),
            (window.ViewshedData = ViewshedData),
            (window.DynamicWaterData = DynamicWaterData),
            (window.MousePickMask = MousePickMask),
            (window.AirCityCloud = AirCityAPI),
            (window.AirCityAPI = AirCityAPI))
    ; (function (a) {
        'object' === typeof exports && 'undefined' !== typeof module ? (module.exports = a()) : 'function' === typeof define && define.amd ? define([], a) : (('undefined' !== typeof window ? window : 'undefined' !== typeof global ? global : 'undefined' !== typeof self ? self : this).adapter = a())
    })(function () {
        return (function () {
            function a(b, c, e) {
                function d(p, k) {
                    if (!c[p]) {
                        if (!b[p]) {
                            var f = 'function' == typeof require && require
                            if (!k && f) return f(p, !0)
                            if (l) return l(p, !0)
                            k = Error("Cannot find module '" + p + "'")
                            throw ((k.code = 'MODULE_NOT_FOUND'), k)
                        }
                        k = c[p] = { exports: {} }
                        b[p][0].call(
                            k.exports,
                            function (h) {
                                return d(b[p][1][h] || h)
                            },
                            k,
                            k.exports,
                            a,
                            b,
                            c,
                            e
                        )
                    }
                    return c[p].exports
                }
                for (var l = 'function' == typeof require && require, g = 0; g < e.length; g++) d(e[g])
                return d
            }
            return a
        })()(
            {
                1: [
                    function (a, b, c) {
                        a = a('./adapter_factory.js')
                        a = (0, a.adapterFactory)({ window: window })
                        b.exports = a
                    },
                    { './adapter_factory.js': 2 },
                ],
                2: [
                    function (a, b, c) {
                        function e(h) {
                            if (h && h.__esModule) return h
                            var q = {}
                            if (null != h) for (var t in h) Object.prototype.hasOwnProperty.call(h, t) && (q[t] = h[t])
                            q.default = h
                            return q
                        }
                        Object.defineProperty(c, '__esModule', { value: !0 })
                        c.adapterFactory = function () {
                            var h = (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}).window,
                                q = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : { shimChrome: !0, shimFirefox: !0, shimEdge: !0, shimSafari: !0 },
                                t = d.log,
                                r = d.detectBrowser(h),
                                x = { browserDetails: r, commonShim: f, extractVersion: d.extractVersion, disableLog: d.disableLog, disableWarnings: d.disableWarnings }
                            switch (r.browser) {
                                case 'chrome':
                                    if (!l || !l.shimPeerConnection || !q.shimChrome) {
                                        t('Chrome shim is not included in this adapter release.')
                                        break
                                    }
                                    if (null === r.version) {
                                        t('Chrome shim can not determine version, not shimming.')
                                        break
                                    }
                                    t('adapter.js shimming chrome.')
                                    x.browserShim = l
                                    l.shimGetUserMedia(h)
                                    l.shimMediaStream(h)
                                    l.shimPeerConnection(h)
                                    l.shimOnTrack(h)
                                    l.shimAddTrackRemoveTrack(h)
                                    l.shimGetSendersWithDtmf(h)
                                    l.shimGetStats(h)
                                    l.shimSenderReceiverGetStats(h)
                                    l.fixNegotiationNeeded(h)
                                    f.shimRTCIceCandidate(h)
                                    f.shimConnectionState(h)
                                    f.shimMaxMessageSize(h)
                                    f.shimSendThrowTypeError(h)
                                    f.removeAllowExtmapMixed(h)
                                    break
                                case 'firefox':
                                    if (!p || !p.shimPeerConnection || !q.shimFirefox) {
                                        t('Firefox shim is not included in this adapter release.')
                                        break
                                    }
                                    t('adapter.js shimming firefox.')
                                    x.browserShim = p
                                    p.shimGetUserMedia(h)
                                    p.shimPeerConnection(h)
                                    p.shimOnTrack(h)
                                    p.shimRemoveStream(h)
                                    p.shimSenderGetStats(h)
                                    p.shimReceiverGetStats(h)
                                    p.shimRTCDataChannel(h)
                                    p.shimAddTransceiver(h)
                                    p.shimGetParameters(h)
                                    p.shimCreateOffer(h)
                                    p.shimCreateAnswer(h)
                                    f.shimRTCIceCandidate(h)
                                    f.shimConnectionState(h)
                                    f.shimMaxMessageSize(h)
                                    f.shimSendThrowTypeError(h)
                                    break
                                case 'edge':
                                    if (!g || !g.shimPeerConnection || !q.shimEdge) {
                                        t('MS edge shim is not included in this adapter release.')
                                        break
                                    }
                                    t('adapter.js shimming edge.')
                                    x.browserShim = g
                                    g.shimGetUserMedia(h)
                                    g.shimGetDisplayMedia(h)
                                    g.shimPeerConnection(h)
                                    g.shimReplaceTrack(h)
                                    f.shimMaxMessageSize(h)
                                    f.shimSendThrowTypeError(h)
                                    break
                                case 'safari':
                                    if (!k || !q.shimSafari) {
                                        t('Safari shim is not included in this adapter release.')
                                        break
                                    }
                                    t('adapter.js shimming safari.')
                                    x.browserShim = k
                                    k.shimRTCIceServerUrls(h)
                                    k.shimCreateOfferLegacy(h)
                                    k.shimCallbacksAPI(h)
                                    k.shimLocalStreamsAPI(h)
                                    k.shimRemoteStreamsAPI(h)
                                    k.shimTrackEventTransceiver(h)
                                    k.shimGetUserMedia(h)
                                    k.shimAudioContext(h)
                                    f.shimRTCIceCandidate(h)
                                    f.shimMaxMessageSize(h)
                                    f.shimSendThrowTypeError(h)
                                    f.removeAllowExtmapMixed(h)
                                    break
                                default:
                                    t('Unsupported browser!')
                            }
                            return x
                        }
                        b = a('./utils')
                        var d = e(b)
                        b = a('./chrome/chrome_shim')
                        var l = e(b)
                        b = a('./edge/edge_shim')
                        var g = e(b)
                        b = a('./firefox/firefox_shim')
                        var p = e(b)
                        b = a('./safari/safari_shim')
                        var k = e(b)
                        a = a('./common_shim')
                        var f = e(a)
                    },
                    { './chrome/chrome_shim': 3, './common_shim': 6, './edge/edge_shim': 7, './firefox/firefox_shim': 11, './safari/safari_shim': 14, './utils': 15 },
                ],
                3: [
                    function (a, b, c) {
                        function e(f, h, q) {
                            h in f ? Object.defineProperty(f, h, { value: q, enumerable: !0, configurable: !0, writable: !0 }) : (f[h] = q)
                            return f
                        }
                        function d(f) {
                            f.RTCPeerConnection.prototype.getLocalStreams = function () {
                                var x = this
                                this._shimmedLocalStreams = this._shimmedLocalStreams || {}
                                return Object.keys(this._shimmedLocalStreams).map(function (u) {
                                    return x._shimmedLocalStreams[u][0]
                                })
                            }
                            var h = f.RTCPeerConnection.prototype.addTrack
                            f.RTCPeerConnection.prototype.addTrack = function (x, u) {
                                if (!u) return h.apply(this, arguments)
                                this._shimmedLocalStreams = this._shimmedLocalStreams || {}
                                var z = h.apply(this, arguments)
                                this._shimmedLocalStreams[u.id] ? -1 === this._shimmedLocalStreams[u.id].indexOf(z) && this._shimmedLocalStreams[u.id].push(z) : (this._shimmedLocalStreams[u.id] = [u, z])
                                return z
                            }
                            var q = f.RTCPeerConnection.prototype.addStream
                            f.RTCPeerConnection.prototype.addStream = function (x) {
                                var u = this
                                this._shimmedLocalStreams = this._shimmedLocalStreams || {}
                                x.getTracks().forEach(function (n) {
                                    if (
                                        u.getSenders().find(function (w) {
                                            return w.track === n
                                        })
                                    )
                                        throw new DOMException('Track already exists.', 'InvalidAccessError')
                                })
                                var z = this.getSenders()
                                q.apply(this, arguments)
                                var m = this.getSenders().filter(function (n) {
                                    return -1 === z.indexOf(n)
                                })
                                this._shimmedLocalStreams[x.id] = [x].concat(m)
                            }
                            var t = f.RTCPeerConnection.prototype.removeStream
                            f.RTCPeerConnection.prototype.removeStream = function (x) {
                                this._shimmedLocalStreams = this._shimmedLocalStreams || {}
                                delete this._shimmedLocalStreams[x.id]
                                return t.apply(this, arguments)
                            }
                            var r = f.RTCPeerConnection.prototype.removeTrack
                            f.RTCPeerConnection.prototype.removeTrack = function (x) {
                                var u = this
                                this._shimmedLocalStreams = this._shimmedLocalStreams || {}
                                x &&
                                    Object.keys(this._shimmedLocalStreams).forEach(function (z) {
                                        var m = u._shimmedLocalStreams[z].indexOf(x)
                                            ; -1 !== m && u._shimmedLocalStreams[z].splice(m, 1)
                                        1 === u._shimmedLocalStreams[z].length && delete u._shimmedLocalStreams[z]
                                    })
                                return r.apply(this, arguments)
                            }
                        }
                        Object.defineProperty(c, '__esModule', { value: !0 })
                        c.shimGetDisplayMedia = c.shimGetUserMedia = void 0
                        var l =
                            'function' === typeof Symbol && 'symbol' === typeof Symbol.iterator
                                ? function (f) {
                                    return typeof f
                                }
                                : function (f) {
                                    return f && 'function' === typeof Symbol && f.constructor === Symbol && f !== Symbol.prototype ? 'symbol' : typeof f
                                },
                            g = a('./getusermedia')
                        Object.defineProperty(c, 'shimGetUserMedia', {
                            enumerable: !0,
                            get: function () {
                                return g.shimGetUserMedia
                            },
                        })
                        var p = a('./getdisplaymedia')
                        Object.defineProperty(c, 'shimGetDisplayMedia', {
                            enumerable: !0,
                            get: function () {
                                return p.shimGetDisplayMedia
                            },
                        })
                        c.shimMediaStream = function (f) {
                            f.MediaStream = f.MediaStream || f.webkitMediaStream
                        }
                        c.shimOnTrack = function (f) {
                            if ('object' !== ('undefined' === typeof f ? 'undefined' : l(f)) || !f.RTCPeerConnection || 'ontrack' in f.RTCPeerConnection.prototype)
                                k.wrapPeerConnectionEvent(f, 'track', function (q) {
                                    q.transceiver || Object.defineProperty(q, 'transceiver', { value: { receiver: q.receiver } })
                                    return q
                                })
                            else {
                                Object.defineProperty(f.RTCPeerConnection.prototype, 'ontrack', {
                                    get: function () {
                                        return this._ontrack
                                    },
                                    set: function (q) {
                                        this._ontrack && this.removeEventListener('track', this._ontrack)
                                        this.addEventListener('track', (this._ontrack = q))
                                    },
                                    enumerable: !0,
                                    configurable: !0,
                                })
                                var h = f.RTCPeerConnection.prototype.setRemoteDescription
                                f.RTCPeerConnection.prototype.setRemoteDescription = function () {
                                    var q = this
                                    this._ontrackpoly ||
                                        ((this._ontrackpoly = function (t) {
                                            t.stream.addEventListener('addtrack', function (r) {
                                                var x = void 0
                                                x = f.RTCPeerConnection.prototype.getReceivers
                                                    ? q.getReceivers().find(function (z) {
                                                        return z.track && z.track.id === r.track.id
                                                    })
                                                    : { track: r.track }
                                                var u = new Event('track')
                                                u.track = r.track
                                                u.receiver = x
                                                u.transceiver = { receiver: x }
                                                u.streams = [t.stream]
                                                q.dispatchEvent(u)
                                            })
                                            t.stream.getTracks().forEach(function (r) {
                                                var x = void 0
                                                x = f.RTCPeerConnection.prototype.getReceivers
                                                    ? q.getReceivers().find(function (z) {
                                                        return z.track && z.track.id === r.id
                                                    })
                                                    : { track: r }
                                                var u = new Event('track')
                                                u.track = r
                                                u.receiver = x
                                                u.transceiver = { receiver: x }
                                                u.streams = [t.stream]
                                                q.dispatchEvent(u)
                                            })
                                        }),
                                            this.addEventListener('addstream', this._ontrackpoly))
                                    return h.apply(this, arguments)
                                }
                            }
                        }
                        c.shimGetSendersWithDtmf = function (f) {
                            if ('object' === ('undefined' === typeof f ? 'undefined' : l(f)) && f.RTCPeerConnection && !('getSenders' in f.RTCPeerConnection.prototype) && 'createDTMFSender' in f.RTCPeerConnection.prototype) {
                                var h = function (z, m) {
                                    return {
                                        track: m,
                                        get dtmf() {
                                            void 0 === this._dtmf && (this._dtmf = 'audio' === m.kind ? z.createDTMFSender(m) : null)
                                            return this._dtmf
                                        },
                                        _pc: z,
                                    }
                                }
                                if (!f.RTCPeerConnection.prototype.getSenders) {
                                    f.RTCPeerConnection.prototype.getSenders = function () {
                                        this._senders = this._senders || []
                                        return this._senders.slice()
                                    }
                                    var q = f.RTCPeerConnection.prototype.addTrack
                                    f.RTCPeerConnection.prototype.addTrack = function (z, m) {
                                        var n = q.apply(this, arguments)
                                        n || ((n = h(this, z)), this._senders.push(n))
                                        return n
                                    }
                                    var t = f.RTCPeerConnection.prototype.removeTrack
                                    f.RTCPeerConnection.prototype.removeTrack = function (z) {
                                        t.apply(this, arguments)
                                        var m = this._senders.indexOf(z)
                                            ; -1 !== m && this._senders.splice(m, 1)
                                    }
                                }
                                var r = f.RTCPeerConnection.prototype.addStream
                                f.RTCPeerConnection.prototype.addStream = function (z) {
                                    var m = this
                                    this._senders = this._senders || []
                                    r.apply(this, [z])
                                    z.getTracks().forEach(function (n) {
                                        m._senders.push(h(m, n))
                                    })
                                }
                                var x = f.RTCPeerConnection.prototype.removeStream
                                f.RTCPeerConnection.prototype.removeStream = function (z) {
                                    var m = this
                                    this._senders = this._senders || []
                                    x.apply(this, [z])
                                    z.getTracks().forEach(function (n) {
                                        var w = m._senders.find(function (y) {
                                            return y.track === n
                                        })
                                        w && m._senders.splice(m._senders.indexOf(w), 1)
                                    })
                                }
                            } else if ('object' === ('undefined' === typeof f ? 'undefined' : l(f)) && f.RTCPeerConnection && 'getSenders' in f.RTCPeerConnection.prototype && 'createDTMFSender' in f.RTCPeerConnection.prototype && f.RTCRtpSender && !('dtmf' in f.RTCRtpSender.prototype)) {
                                var u = f.RTCPeerConnection.prototype.getSenders
                                f.RTCPeerConnection.prototype.getSenders = function () {
                                    var z = this,
                                        m = u.apply(this, [])
                                    m.forEach(function (n) {
                                        return (n._pc = z)
                                    })
                                    return m
                                }
                                Object.defineProperty(f.RTCRtpSender.prototype, 'dtmf', {
                                    get: function () {
                                        void 0 === this._dtmf && (this._dtmf = 'audio' === this.track.kind ? this._pc.createDTMFSender(this.track) : null)
                                        return this._dtmf
                                    },
                                })
                            }
                        }
                        c.shimGetStats = function (f) {
                            if (f.RTCPeerConnection) {
                                var h = f.RTCPeerConnection.prototype.getStats
                                f.RTCPeerConnection.prototype.getStats = function () {
                                    var q = this,
                                        t = Array.prototype.slice.call(arguments),
                                        r = t[0],
                                        x = t[1]
                                    t = t[2]
                                    if (0 < arguments.length && 'function' === typeof r) return h.apply(this, arguments)
                                    if (0 === h.length && (0 === arguments.length || 'function' !== typeof r)) return h.apply(this, [])
                                    var u = function (m) {
                                        var n = {}
                                        m.result().forEach(function (w) {
                                            var y = {
                                                id: w.id,
                                                timestamp: w.timestamp,
                                                type: { localcandidate: 'local-candidate', remotecandidate: 'remote-candidate' }[w.type] || w.type,
                                            }
                                            w.names().forEach(function (A) {
                                                y[A] = w.stat(A)
                                            })
                                            n[y.id] = y
                                        })
                                        return n
                                    },
                                        z = function (m) {
                                            return new Map(
                                                Object.keys(m).map(function (n) {
                                                    return [n, m[n]]
                                                })
                                            )
                                        }
                                    return 2 <= arguments.length
                                        ? h.apply(this, [
                                            function (m) {
                                                x(z(u(m)))
                                            },
                                            r,
                                        ])
                                        : new Promise(function (m, n) {
                                            h.apply(q, [
                                                function (w) {
                                                    m(z(u(w)))
                                                },
                                                n,
                                            ])
                                        }).then(x, t)
                                }
                            }
                        }
                        c.shimSenderReceiverGetStats = function (f) {
                            if ('object' === ('undefined' === typeof f ? 'undefined' : l(f)) && f.RTCPeerConnection && f.RTCRtpSender && f.RTCRtpReceiver) {
                                if (!('getStats' in f.RTCRtpSender.prototype)) {
                                    var h = f.RTCPeerConnection.prototype.getSenders
                                    h &&
                                        (f.RTCPeerConnection.prototype.getSenders = function () {
                                            var x = this,
                                                u = h.apply(this, [])
                                            u.forEach(function (z) {
                                                return (z._pc = x)
                                            })
                                            return u
                                        })
                                    var q = f.RTCPeerConnection.prototype.addTrack
                                    q &&
                                        (f.RTCPeerConnection.prototype.addTrack = function () {
                                            var x = q.apply(this, arguments)
                                            x._pc = this
                                            return x
                                        })
                                    f.RTCRtpSender.prototype.getStats = function () {
                                        var x = this
                                        return this._pc.getStats().then(function (u) {
                                            return k.filterStats(u, x.track, !0)
                                        })
                                    }
                                }
                                if (!('getStats' in f.RTCRtpReceiver.prototype)) {
                                    var t = f.RTCPeerConnection.prototype.getReceivers
                                    t &&
                                        (f.RTCPeerConnection.prototype.getReceivers = function () {
                                            var x = this,
                                                u = t.apply(this, [])
                                            u.forEach(function (z) {
                                                return (z._pc = x)
                                            })
                                            return u
                                        })
                                    k.wrapPeerConnectionEvent(f, 'track', function (x) {
                                        x.receiver._pc = x.srcElement
                                        return x
                                    })
                                    f.RTCRtpReceiver.prototype.getStats = function () {
                                        var x = this
                                        return this._pc.getStats().then(function (u) {
                                            return k.filterStats(u, x.track, !1)
                                        })
                                    }
                                }
                                if ('getStats' in f.RTCRtpSender.prototype && 'getStats' in f.RTCRtpReceiver.prototype) {
                                    var r = f.RTCPeerConnection.prototype.getStats
                                    f.RTCPeerConnection.prototype.getStats = function () {
                                        if (0 < arguments.length && arguments[0] instanceof f.MediaStreamTrack) {
                                            var x = arguments[0],
                                                u = void 0,
                                                z = void 0,
                                                m = void 0
                                            this.getSenders().forEach(function (n) {
                                                n.track === x && (u ? (m = !0) : (u = n))
                                            })
                                            this.getReceivers().forEach(function (n) {
                                                n.track === x && (z ? (m = !0) : (z = n))
                                                return n.track === x
                                            })
                                            return m || (u && z) ? Promise.reject(new DOMException('There are more than one sender or receiver for the track.', 'InvalidAccessError')) : u ? u.getStats() : z ? z.getStats() : Promise.reject(new DOMException('There is no sender or receiver for the track.', 'InvalidAccessError'))
                                        }
                                        return r.apply(this, arguments)
                                    }
                                }
                            }
                        }
                        c.shimAddTrackRemoveTrackWithNative = d
                        c.shimAddTrackRemoveTrack = function (f) {
                            function h(n, w) {
                                var y = w.sdp
                                Object.keys(n._reverseStreams || []).forEach(function (A) {
                                    A = n._reverseStreams[A]
                                    y = y.replace(new RegExp(n._streams[A.id].id, 'g'), A.id)
                                })
                                return new RTCSessionDescription({ type: w.type, sdp: y })
                            }
                            function q(n, w) {
                                var y = w.sdp
                                Object.keys(n._reverseStreams || []).forEach(function (A) {
                                    A = n._reverseStreams[A]
                                    y = y.replace(new RegExp(A.id, 'g'), n._streams[A.id].id)
                                })
                                return new RTCSessionDescription({ type: w.type, sdp: y })
                            }
                            if (f.RTCPeerConnection) {
                                var t = k.detectBrowser(f)
                                if (f.RTCPeerConnection.prototype.addTrack && 65 <= t.version) return d(f)
                                var r = f.RTCPeerConnection.prototype.getLocalStreams
                                f.RTCPeerConnection.prototype.getLocalStreams = function () {
                                    var n = this,
                                        w = r.apply(this)
                                    this._reverseStreams = this._reverseStreams || {}
                                    return w.map(function (y) {
                                        return n._reverseStreams[y.id]
                                    })
                                }
                                var x = f.RTCPeerConnection.prototype.addStream
                                f.RTCPeerConnection.prototype.addStream = function (n) {
                                    var w = this
                                    this._streams = this._streams || {}
                                    this._reverseStreams = this._reverseStreams || {}
                                    n.getTracks().forEach(function (A) {
                                        if (
                                            w.getSenders().find(function (B) {
                                                return B.track === A
                                            })
                                        )
                                            throw new DOMException('Track already exists.', 'InvalidAccessError')
                                    })
                                    if (!this._reverseStreams[n.id]) {
                                        var y = new f.MediaStream(n.getTracks())
                                        this._streams[n.id] = y
                                        this._reverseStreams[y.id] = n
                                        n = y
                                    }
                                    x.apply(this, [n])
                                }
                                var u = f.RTCPeerConnection.prototype.removeStream
                                f.RTCPeerConnection.prototype.removeStream = function (n) {
                                    this._streams = this._streams || {}
                                    this._reverseStreams = this._reverseStreams || {}
                                    u.apply(this, [this._streams[n.id] || n])
                                    delete this._reverseStreams[this._streams[n.id] ? this._streams[n.id].id : n.id]
                                    delete this._streams[n.id]
                                }
                                f.RTCPeerConnection.prototype.addTrack = function (n, w) {
                                    var y = this
                                    if ('closed' === this.signalingState) throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", 'InvalidStateError')
                                    var A = [].slice.call(arguments, 1)
                                    if (
                                        1 !== A.length ||
                                        !A[0].getTracks().find(function (B) {
                                            return B === n
                                        })
                                    )
                                        throw new DOMException('The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.', 'NotSupportedError')
                                    if (
                                        this.getSenders().find(function (B) {
                                            return B.track === n
                                        })
                                    )
                                        throw new DOMException('Track already exists.', 'InvalidAccessError')
                                    this._streams = this._streams || {}
                                    this._reverseStreams = this._reverseStreams || {}
                                        ; (A = this._streams[w.id])
                                            ? (A.addTrack(n),
                                                Promise.resolve().then(function () {
                                                    y.dispatchEvent(new Event('negotiationneeded'))
                                                }))
                                            : ((A = new f.MediaStream([n])), (this._streams[w.id] = A), (this._reverseStreams[A.id] = w), this.addStream(A))
                                    return this.getSenders().find(function (B) {
                                        return B.track === n
                                    })
                                }
                                    ;['createOffer', 'createAnswer'].forEach(function (n) {
                                        var w = f.RTCPeerConnection.prototype[n],
                                            y = e({}, n, function () {
                                                var A = this,
                                                    B = arguments
                                                return arguments.length && 'function' === typeof arguments[0]
                                                    ? w.apply(this, [
                                                        function (C) {
                                                            C = h(A, C)
                                                            B[0].apply(null, [C])
                                                        },
                                                        function (C) {
                                                            B[1] && B[1].apply(null, C)
                                                        },
                                                        arguments[2],
                                                    ])
                                                    : w.apply(this, arguments).then(function (C) {
                                                        return h(A, C)
                                                    })
                                            })
                                        f.RTCPeerConnection.prototype[n] = y[n]
                                    })
                                var z = f.RTCPeerConnection.prototype.setLocalDescription
                                f.RTCPeerConnection.prototype.setLocalDescription = function () {
                                    if (!arguments.length || !arguments[0].type) return z.apply(this, arguments)
                                    arguments[0] = q(this, arguments[0])
                                    return z.apply(this, arguments)
                                }
                                var m = Object.getOwnPropertyDescriptor(f.RTCPeerConnection.prototype, 'localDescription')
                                Object.defineProperty(f.RTCPeerConnection.prototype, 'localDescription', {
                                    get: function () {
                                        var n = m.get.apply(this)
                                        return '' === n.type ? n : h(this, n)
                                    },
                                })
                                f.RTCPeerConnection.prototype.removeTrack = function (n) {
                                    var w = this
                                    if ('closed' === this.signalingState) throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", 'InvalidStateError')
                                    if (!n._pc) throw new DOMException('Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.', 'TypeError')
                                    if (n._pc !== this) throw new DOMException('Sender was not created by this connection.', 'InvalidAccessError')
                                    this._streams = this._streams || {}
                                    var y = void 0
                                    Object.keys(this._streams).forEach(function (A) {
                                        w._streams[A].getTracks().find(function (B) {
                                            return n.track === B
                                        }) && (y = w._streams[A])
                                    })
                                    y && (1 === y.getTracks().length ? this.removeStream(this._reverseStreams[y.id]) : y.removeTrack(n.track), this.dispatchEvent(new Event('negotiationneeded')))
                                }
                            }
                        }
                        c.shimPeerConnection = function (f) {
                            var h = k.detectBrowser(f)
                            !f.RTCPeerConnection && f.webkitRTCPeerConnection && (f.RTCPeerConnection = f.webkitRTCPeerConnection)
                            if (f.RTCPeerConnection) {
                                var q = 0 === f.RTCPeerConnection.prototype.addIceCandidate.length
                                53 > h.version &&
                                    ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(function (r) {
                                        var x = f.RTCPeerConnection.prototype[r],
                                            u = e({}, r, function () {
                                                arguments[0] = new ('addIceCandidate' === r ? f.RTCIceCandidate : f.RTCSessionDescription)(arguments[0])
                                                return x.apply(this, arguments)
                                            })
                                        f.RTCPeerConnection.prototype[r] = u[r]
                                    })
                                var t = f.RTCPeerConnection.prototype.addIceCandidate
                                f.RTCPeerConnection.prototype.addIceCandidate = function () {
                                    return q || arguments[0] ? (78 > h.version && arguments[0] && '' === arguments[0].candidate ? Promise.resolve() : t.apply(this, arguments)) : (arguments[1] && arguments[1].apply(null), Promise.resolve())
                                }
                            }
                        }
                        c.fixNegotiationNeeded = function (f) {
                            var h = k.detectBrowser(f)
                            k.wrapPeerConnectionEvent(f, 'negotiationneeded', function (q) {
                                var t = q.target
                                if (!(72 > h.version || (t.getConfiguration && 'plan-b' === t.getConfiguration().sdpSemantics)) || 'stable' === t.signalingState) return q
                            })
                        }
                        var k = (function (f) {
                            if (f && f.__esModule) return f
                            var h = {}
                            if (null != f) for (var q in f) Object.prototype.hasOwnProperty.call(f, q) && (h[q] = f[q])
                            h.default = f
                            return h
                        })(a('../utils.js'))
                    },
                    { '../utils.js': 15, './getdisplaymedia': 4, './getusermedia': 5 },
                ],
                4: [
                    function (a, b, c) {
                        Object.defineProperty(c, '__esModule', { value: !0 })
                        c.shimGetDisplayMedia = function (e, d) {
                            ; (e.navigator.mediaDevices && 'getDisplayMedia' in e.navigator.mediaDevices) ||
                                !e.navigator.mediaDevices ||
                                ('function' !== typeof d
                                    ? console.error('shimGetDisplayMedia: getSourceId argument is not a function')
                                    : (e.navigator.mediaDevices.getDisplayMedia = function (l) {
                                        return d(l).then(function (g) {
                                            var p = l.video && l.video.width,
                                                k = l.video && l.video.height
                                            l.video = { mandatory: { chromeMediaSource: 'desktop', chromeMediaSourceId: g, maxFrameRate: (l.video && l.video.frameRate) || 3 } }
                                            p && (l.video.mandatory.maxWidth = p)
                                            k && (l.video.mandatory.maxHeight = k)
                                            return e.navigator.mediaDevices.getUserMedia(l)
                                        })
                                    }))
                        }
                    },
                    {},
                ],
                5: [
                    function (a, b, c) {
                        Object.defineProperty(c, '__esModule', { value: !0 })
                        var e =
                            'function' === typeof Symbol && 'symbol' === typeof Symbol.iterator
                                ? function (g) {
                                    return typeof g
                                }
                                : function (g) {
                                    return g && 'function' === typeof Symbol && g.constructor === Symbol && g !== Symbol.prototype ? 'symbol' : typeof g
                                }
                        c.shimGetUserMedia = function (g) {
                            var p = g && g.navigator
                            if (p.mediaDevices) {
                                var k = d.detectBrowser(g),
                                    f = function (r) {
                                        if ('object' !== ('undefined' === typeof r ? 'undefined' : e(r)) || r.mandatory || r.optional) return r
                                        var x = {}
                                        Object.keys(r).forEach(function (u) {
                                            if ('require' !== u && 'advanced' !== u && 'mediaSource' !== u) {
                                                var z = 'object' === e(r[u]) ? r[u] : { ideal: r[u] }
                                                void 0 !== z.exact && 'number' === typeof z.exact && (z.min = z.max = z.exact)
                                                var m = function (w, y) {
                                                    return w ? w + y.charAt(0).toUpperCase() + y.slice(1) : 'deviceId' === y ? 'sourceId' : y
                                                }
                                                if (void 0 !== z.ideal) {
                                                    x.optional = x.optional || []
                                                    var n = {}
                                                    'number' === typeof z.ideal ? ((n[m('min', u)] = z.ideal), x.optional.push(n), (n = {}), (n[m('max', u)] = z.ideal)) : (n[m('', u)] = z.ideal)
                                                    x.optional.push(n)
                                                }
                                                void 0 !== z.exact && 'number' !== typeof z.exact
                                                    ? ((x.mandatory = x.mandatory || {}), (x.mandatory[m('', u)] = z.exact))
                                                    : ['min', 'max'].forEach(function (w) {
                                                        void 0 !== z[w] && ((x.mandatory = x.mandatory || {}), (x.mandatory[m(w, u)] = z[w]))
                                                    })
                                            }
                                        })
                                        r.advanced && (x.optional = (x.optional || []).concat(r.advanced))
                                        return x
                                    },
                                    h = function (r, x) {
                                        if (61 <= k.version) return x(r)
                                        if ((r = JSON.parse(JSON.stringify(r))) && 'object' === e(r.audio)) {
                                            var u = function (n, w, y) {
                                                w in n && !(y in n) && ((n[y] = n[w]), delete n[w])
                                            }
                                            r = JSON.parse(JSON.stringify(r))
                                            u(r.audio, 'autoGainControl', 'googAutoGainControl')
                                            u(r.audio, 'noiseSuppression', 'googNoiseSuppression')
                                            r.audio = f(r.audio)
                                        }
                                        if (r && 'object' === e(r.video)) {
                                            var z = r.video.facingMode
                                            z = z && ('object' === ('undefined' === typeof z ? 'undefined' : e(z)) ? z : { ideal: z })
                                            u = 66 > k.version
                                            if (!(!z || ('user' !== z.exact && 'environment' !== z.exact && 'user' !== z.ideal && 'environment' !== z.ideal) || (p.mediaDevices.getSupportedConstraints && p.mediaDevices.getSupportedConstraints().facingMode && !u))) {
                                                delete r.video.facingMode
                                                var m = void 0
                                                if ('environment' === z.exact || 'environment' === z.ideal) m = ['back', 'rear']
                                                else if ('user' === z.exact || 'user' === z.ideal) m = ['front']
                                                if (m)
                                                    return p.mediaDevices.enumerateDevices().then(function (n) {
                                                        n = n.filter(function (y) {
                                                            return 'videoinput' === y.kind
                                                        })
                                                        var w = n.find(function (y) {
                                                            return m.some(function (A) {
                                                                return y.label.toLowerCase().includes(A)
                                                            })
                                                        })
                                                        !w && n.length && m.includes('back') && (w = n[n.length - 1])
                                                        w && (r.video.deviceId = z.exact ? { exact: w.deviceId } : { ideal: w.deviceId })
                                                        r.video = f(r.video)
                                                        l('chrome: ' + JSON.stringify(r))
                                                        return x(r)
                                                    })
                                            }
                                            r.video = f(r.video)
                                        }
                                        l('chrome: ' + JSON.stringify(r))
                                        return x(r)
                                    },
                                    q = function (r) {
                                        return 64 <= k.version
                                            ? r
                                            : {
                                                name:
                                                    {
                                                        PermissionDeniedError: 'NotAllowedError',
                                                        PermissionDismissedError: 'NotAllowedError',
                                                        InvalidStateError: 'NotAllowedError',
                                                        DevicesNotFoundError: 'NotFoundError',
                                                        ConstraintNotSatisfiedError: 'OverconstrainedError',
                                                        TrackStartError: 'NotReadableError',
                                                        MediaDeviceFailedDueToShutdown: 'NotAllowedError',
                                                        MediaDeviceKillSwitchOn: 'NotAllowedError',
                                                        TabCaptureError: 'AbortError',
                                                        ScreenCaptureError: 'AbortError',
                                                        DeviceCaptureError: 'AbortError',
                                                    }[r.name] || r.name,
                                                message: r.message,
                                                constraint: r.constraint || r.constraintName,
                                                toString: function () {
                                                    return this.name + (this.message && ': ') + this.message
                                                },
                                            }
                                    }
                                p.getUserMedia = function (r, x, u) {
                                    h(r, function (z) {
                                        p.webkitGetUserMedia(z, x, function (m) {
                                            u && u(q(m))
                                        })
                                    })
                                }.bind(p)
                                if (p.mediaDevices.getUserMedia) {
                                    var t = p.mediaDevices.getUserMedia.bind(p.mediaDevices)
                                    p.mediaDevices.getUserMedia = function (r) {
                                        return h(r, function (x) {
                                            return t(x).then(
                                                function (u) {
                                                    if ((x.audio && !u.getAudioTracks().length) || (x.video && !u.getVideoTracks().length))
                                                        throw (u.getTracks().forEach(function (z) {
                                                            z.stop()
                                                        }),
                                                            new DOMException('', 'NotFoundError'))
                                                    return u
                                                },
                                                function (u) {
                                                    return Promise.reject(q(u))
                                                }
                                            )
                                        })
                                    }
                                }
                            }
                        }
                        var d = (function (g) {
                            if (g && g.__esModule) return g
                            var p = {}
                            if (null != g) for (var k in g) Object.prototype.hasOwnProperty.call(g, k) && (p[k] = g[k])
                            p.default = g
                            return p
                        })(a('../utils.js')),
                            l = d.log
                    },
                    { '../utils.js': 15 },
                ],
                6: [
                    function (a, b, c) {
                        Object.defineProperty(c, '__esModule', { value: !0 })
                        var e =
                            'function' === typeof Symbol && 'symbol' === typeof Symbol.iterator
                                ? function (g) {
                                    return typeof g
                                }
                                : function (g) {
                                    return g && 'function' === typeof Symbol && g.constructor === Symbol && g !== Symbol.prototype ? 'symbol' : typeof g
                                }
                        c.shimRTCIceCandidate = function (g) {
                            if (g.RTCIceCandidate && !(g.RTCIceCandidate && 'foundation' in g.RTCIceCandidate.prototype)) {
                                var p = g.RTCIceCandidate
                                g.RTCIceCandidate = function (k) {
                                    'object' === ('undefined' === typeof k ? 'undefined' : e(k)) && k.candidate && 0 === k.candidate.indexOf('a=') && ((k = JSON.parse(JSON.stringify(k))), (k.candidate = k.candidate.substr(2)))
                                    if (k.candidate && k.candidate.length) {
                                        var f = new p(k)
                                        k = d.default.parseCandidate(k.candidate)
                                        var h = Object.assign(f, k)
                                        h.toJSON = function () {
                                            return { candidate: h.candidate, sdpMid: h.sdpMid, sdpMLineIndex: h.sdpMLineIndex, usernameFragment: h.usernameFragment }
                                        }
                                        return h
                                    }
                                    return new p(k)
                                }
                                g.RTCIceCandidate.prototype = p.prototype
                                l.wrapPeerConnectionEvent(g, 'icecandidate', function (k) {
                                    k.candidate && Object.defineProperty(k, 'candidate', { value: new g.RTCIceCandidate(k.candidate), writable: 'false' })
                                    return k
                                })
                            }
                        }
                        c.shimMaxMessageSize = function (g) {
                            if (g.RTCPeerConnection) {
                                var p = l.detectBrowser(g)
                                'sctp' in g.RTCPeerConnection.prototype ||
                                    Object.defineProperty(g.RTCPeerConnection.prototype, 'sctp', {
                                        get: function () {
                                            return 'undefined' === typeof this._sctp ? null : this._sctp
                                        },
                                    })
                                var k = function (r) {
                                    if (!r || !r.sdp) return !1
                                    r = d.default.splitSections(r.sdp)
                                    r.shift()
                                    return r.some(function (x) {
                                        return (x = d.default.parseMLine(x)) && 'application' === x.kind && -1 !== x.protocol.indexOf('SCTP')
                                    })
                                },
                                    f = function (r) {
                                        r = r.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/)
                                        if (null === r || 2 > r.length) return -1
                                        r = parseInt(r[1], 10)
                                        return r !== r ? -1 : r
                                    },
                                    h = function (r) {
                                        var x = 65536
                                        'firefox' === p.browser && (x = 57 > p.version ? (-1 === r ? 16384 : 2147483637) : 60 > p.version ? (57 === p.version ? 65535 : 65536) : 2147483637)
                                        return x
                                    },
                                    q = function (r, x) {
                                        var u = 65536
                                        'firefox' === p.browser && 57 === p.version && (u = 65535)
                                        r = d.default.matchPrefix(r.sdp, 'a=max-message-size:')
                                        0 < r.length ? (u = parseInt(r[0].substr(19), 10)) : 'firefox' === p.browser && -1 !== x && (u = 2147483637)
                                        return u
                                    },
                                    t = g.RTCPeerConnection.prototype.setRemoteDescription
                                g.RTCPeerConnection.prototype.setRemoteDescription = function () {
                                    this._sctp = null
                                    'chrome' === p.browser &&
                                        76 <= p.version &&
                                        'plan-b' === this.getConfiguration().sdpSemantics &&
                                        Object.defineProperty(this, 'sctp', {
                                            get: function () {
                                                return 'undefined' === typeof this._sctp ? null : this._sctp
                                            },
                                            enumerable: !0,
                                            configurable: !0,
                                        })
                                    if (k(arguments[0])) {
                                        var r = f(arguments[0]),
                                            x = h(r)
                                        r = q(arguments[0], r)
                                        var u = void 0
                                        u = 0 === x && 0 === r ? Number.POSITIVE_INFINITY : 0 === x || 0 === r ? Math.max(x, r) : Math.min(x, r)
                                        x = {}
                                        Object.defineProperty(x, 'maxMessageSize', {
                                            get: function () {
                                                return u
                                            },
                                        })
                                        this._sctp = x
                                    }
                                    return t.apply(this, arguments)
                                }
                            }
                        }
                        c.shimSendThrowTypeError = function (g) {
                            function p(f, h) {
                                var q = f.send
                                f.send = function () {
                                    var t = arguments[0]
                                    t = t.length || t.size || t.byteLength
                                    if ('open' === f.readyState && h.sctp && t > h.sctp.maxMessageSize) throw new TypeError('Message too large (can send a maximum of ' + h.sctp.maxMessageSize + ' bytes)')
                                    return q.apply(f, arguments)
                                }
                            }
                            if (g.RTCPeerConnection && 'createDataChannel' in g.RTCPeerConnection.prototype) {
                                var k = g.RTCPeerConnection.prototype.createDataChannel
                                g.RTCPeerConnection.prototype.createDataChannel = function () {
                                    var f = k.apply(this, arguments)
                                    p(f, this)
                                    return f
                                }
                                l.wrapPeerConnectionEvent(g, 'datachannel', function (f) {
                                    p(f.channel, f.target)
                                    return f
                                })
                            }
                        }
                        c.shimConnectionState = function (g) {
                            if (g.RTCPeerConnection && !('connectionState' in g.RTCPeerConnection.prototype)) {
                                var p = g.RTCPeerConnection.prototype
                                Object.defineProperty(p, 'connectionState', {
                                    get: function () {
                                        return { completed: 'connected', checking: 'connecting' }[this.iceConnectionState] || this.iceConnectionState
                                    },
                                    enumerable: !0,
                                    configurable: !0,
                                })
                                Object.defineProperty(p, 'onconnectionstatechange', {
                                    get: function () {
                                        return this._onconnectionstatechange || null
                                    },
                                    set: function (k) {
                                        this._onconnectionstatechange && (this.removeEventListener('connectionstatechange', this._onconnectionstatechange), delete this._onconnectionstatechange)
                                        k && this.addEventListener('connectionstatechange', (this._onconnectionstatechange = k))
                                    },
                                    enumerable: !0,
                                    configurable: !0,
                                })
                                    ;['setLocalDescription', 'setRemoteDescription'].forEach(function (k) {
                                        var f = p[k]
                                        p[k] = function () {
                                            this._connectionstatechangepoly ||
                                                ((this._connectionstatechangepoly = function (h) {
                                                    var q = h.target
                                                    if (q._lastConnectionState !== q.connectionState) {
                                                        q._lastConnectionState = q.connectionState
                                                        var t = new Event('connectionstatechange', h)
                                                        q.dispatchEvent(t)
                                                    }
                                                    return h
                                                }),
                                                    this.addEventListener('iceconnectionstatechange', this._connectionstatechangepoly))
                                            return f.apply(this, arguments)
                                        }
                                    })
                            }
                        }
                        c.removeAllowExtmapMixed = function (g) {
                            if (g.RTCPeerConnection) {
                                var p = l.detectBrowser(g)
                                if (!(('chrome' === p.browser && 71 <= p.version) || ('safari' === p.browser && 605 <= p.version))) {
                                    var k = g.RTCPeerConnection.prototype.setRemoteDescription
                                    g.RTCPeerConnection.prototype.setRemoteDescription = function (f) {
                                        f &&
                                            f.sdp &&
                                            -1 !== f.sdp.indexOf('\na=extmap-allow-mixed') &&
                                            (f.sdp = f.sdp
                                                .split('\n')
                                                .filter(function (h) {
                                                    return 'a=extmap-allow-mixed' !== h.trim()
                                                })
                                                .join('\n'))
                                        return k.apply(this, arguments)
                                    }
                                }
                            }
                        }
                        var d = (b = a('sdp')) && b.__esModule ? b : { default: b },
                            l = (function (g) {
                                if (g && g.__esModule) return g
                                var p = {}
                                if (null != g) for (var k in g) Object.prototype.hasOwnProperty.call(g, k) && (p[k] = g[k])
                                p.default = g
                                return p
                            })(a('./utils'))
                    },
                    { './utils': 15, sdp: 17 },
                ],
                7: [
                    function (a, b, c) {
                        Object.defineProperty(c, '__esModule', { value: !0 })
                        c.shimGetDisplayMedia = c.shimGetUserMedia = void 0
                        var e = a('./getusermedia')
                        Object.defineProperty(c, 'shimGetUserMedia', {
                            enumerable: !0,
                            get: function () {
                                return e.shimGetUserMedia
                            },
                        })
                        var d = a('./getdisplaymedia')
                        Object.defineProperty(c, 'shimGetDisplayMedia', {
                            enumerable: !0,
                            get: function () {
                                return d.shimGetDisplayMedia
                            },
                        })
                        c.shimPeerConnection = function (k) {
                            var f = l.detectBrowser(k)
                            if (
                                k.RTCIceGatherer &&
                                (k.RTCIceCandidate ||
                                    (k.RTCIceCandidate = function (t) {
                                        return t
                                    }),
                                    k.RTCSessionDescription ||
                                    (k.RTCSessionDescription = function (t) {
                                        return t
                                    }),
                                    15025 > f.version)
                            ) {
                                var h = Object.getOwnPropertyDescriptor(k.MediaStreamTrack.prototype, 'enabled')
                                Object.defineProperty(k.MediaStreamTrack.prototype, 'enabled', {
                                    set: function (t) {
                                        h.set.call(this, t)
                                        var r = new Event('enabled')
                                        r.enabled = t
                                        this.dispatchEvent(r)
                                    },
                                })
                            }
                            !k.RTCRtpSender ||
                                'dtmf' in k.RTCRtpSender.prototype ||
                                Object.defineProperty(k.RTCRtpSender.prototype, 'dtmf', {
                                    get: function () {
                                        void 0 === this._dtmf && ('audio' === this.track.kind ? (this._dtmf = new k.RTCDtmfSender(this)) : 'video' === this.track.kind && (this._dtmf = null))
                                        return this._dtmf
                                    },
                                })
                            k.RTCDtmfSender && !k.RTCDTMFSender && (k.RTCDTMFSender = k.RTCDtmfSender)
                            var q = (0, p.default)(k, f.version)
                            k.RTCPeerConnection = function (t) {
                                t && t.iceServers && ((t.iceServers = (0, g.filterIceServers)(t.iceServers, f.version)), l.log('ICE servers after filtering:', t.iceServers))
                                return new q(t)
                            }
                            k.RTCPeerConnection.prototype = q.prototype
                        }
                        c.shimReplaceTrack = function (k) {
                            !k.RTCRtpSender || 'replaceTrack' in k.RTCRtpSender.prototype || (k.RTCRtpSender.prototype.replaceTrack = k.RTCRtpSender.prototype.setTrack)
                        }
                        var l = (function (k) {
                            if (k && k.__esModule) return k
                            var f = {}
                            if (null != k) for (var h in k) Object.prototype.hasOwnProperty.call(k, h) && (f[h] = k[h])
                            f.default = k
                            return f
                        })(a('../utils')),
                            g = a('./filtericeservers'),
                            p = (a = a('rtcpeerconnection-shim')) && a.__esModule ? a : { default: a }
                    },
                    { '../utils': 15, './filtericeservers': 8, './getdisplaymedia': 9, './getusermedia': 10, 'rtcpeerconnection-shim': 16 },
                ],
                8: [
                    function (a, b, c) {
                        Object.defineProperty(c, '__esModule', { value: !0 })
                        c.filterIceServers = function (d, l) {
                            var g = !1
                            d = JSON.parse(JSON.stringify(d))
                            return d.filter(function (p) {
                                if (p && (p.urls || p.url)) {
                                    var k = p.urls || p.url
                                    p.url && !p.urls && e.deprecated('RTCIceServer.url', 'RTCIceServer.urls')
                                    var f = 'string' === typeof k
                                    f && (k = [k])
                                    k = k.filter(function (h) {
                                        return 0 === h.indexOf('stun:') ? !1 : (h = h.startsWith('turn') && !h.startsWith('turn:[') && h.includes('transport=udp')) && !g ? (g = !0) : h && !g
                                    })
                                    delete p.url
                                    p.urls = f ? k[0] : k
                                    return !!k.length
                                }
                            })
                        }
                        var e = (function (d) {
                            if (d && d.__esModule) return d
                            var l = {}
                            if (null != d) for (var g in d) Object.prototype.hasOwnProperty.call(d, g) && (l[g] = d[g])
                            l.default = d
                            return l
                        })(a('../utils'))
                    },
                    { '../utils': 15 },
                ],
                9: [
                    function (a, b, c) {
                        Object.defineProperty(c, '__esModule', { value: !0 })
                        c.shimGetDisplayMedia = function (e) {
                            'getDisplayMedia' in e.navigator && e.navigator.mediaDevices && !(e.navigator.mediaDevices && 'getDisplayMedia' in e.navigator.mediaDevices) && (e.navigator.mediaDevices.getDisplayMedia = e.navigator.getDisplayMedia.bind(e.navigator))
                        }
                    },
                    {},
                ],
                10: [
                    function (a, b, c) {
                        Object.defineProperty(c, '__esModule', { value: !0 })
                        c.shimGetUserMedia = function (e) {
                            e = e && e.navigator
                            var d = function (g) {
                                return {
                                    name: { PermissionDeniedError: 'NotAllowedError' }[g.name] || g.name,
                                    message: g.message,
                                    constraint: g.constraint,
                                    toString: function () {
                                        return this.name
                                    },
                                }
                            },
                                l = e.mediaDevices.getUserMedia.bind(e.mediaDevices)
                            e.mediaDevices.getUserMedia = function (g) {
                                return l(g).catch(function (p) {
                                    return Promise.reject(d(p))
                                })
                            }
                        }
                    },
                    {},
                ],
                11: [
                    function (a, b, c) {
                        function e(k, f, h) {
                            f in k ? Object.defineProperty(k, f, { value: h, enumerable: !0, configurable: !0, writable: !0 }) : (k[f] = h)
                            return k
                        }
                        Object.defineProperty(c, '__esModule', { value: !0 })
                        c.shimGetDisplayMedia = c.shimGetUserMedia = void 0
                        var d =
                            'function' === typeof Symbol && 'symbol' === typeof Symbol.iterator
                                ? function (k) {
                                    return typeof k
                                }
                                : function (k) {
                                    return k && 'function' === typeof Symbol && k.constructor === Symbol && k !== Symbol.prototype ? 'symbol' : typeof k
                                },
                            l = a('./getusermedia')
                        Object.defineProperty(c, 'shimGetUserMedia', {
                            enumerable: !0,
                            get: function () {
                                return l.shimGetUserMedia
                            },
                        })
                        var g = a('./getdisplaymedia')
                        Object.defineProperty(c, 'shimGetDisplayMedia', {
                            enumerable: !0,
                            get: function () {
                                return g.shimGetDisplayMedia
                            },
                        })
                        c.shimOnTrack = function (k) {
                            'object' === ('undefined' === typeof k ? 'undefined' : d(k)) &&
                                k.RTCTrackEvent &&
                                'receiver' in k.RTCTrackEvent.prototype &&
                                !('transceiver' in k.RTCTrackEvent.prototype) &&
                                Object.defineProperty(k.RTCTrackEvent.prototype, 'transceiver', {
                                    get: function () {
                                        return { receiver: this.receiver }
                                    },
                                })
                        }
                        c.shimPeerConnection = function (k) {
                            var f = p.detectBrowser(k)
                            if ('object' === ('undefined' === typeof k ? 'undefined' : d(k)) && (k.RTCPeerConnection || k.mozRTCPeerConnection)) {
                                !k.RTCPeerConnection && k.mozRTCPeerConnection && (k.RTCPeerConnection = k.mozRTCPeerConnection)
                                53 > f.version &&
                                    ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(function (r) {
                                        var x = k.RTCPeerConnection.prototype[r],
                                            u = e({}, r, function () {
                                                arguments[0] = new ('addIceCandidate' === r ? k.RTCIceCandidate : k.RTCSessionDescription)(arguments[0])
                                                return x.apply(this, arguments)
                                            })
                                        k.RTCPeerConnection.prototype[r] = u[r]
                                    })
                                if (68 > f.version) {
                                    var h = k.RTCPeerConnection.prototype.addIceCandidate
                                    k.RTCPeerConnection.prototype.addIceCandidate = function () {
                                        return arguments[0] ? (arguments[0] && '' === arguments[0].candidate ? Promise.resolve() : h.apply(this, arguments)) : (arguments[1] && arguments[1].apply(null), Promise.resolve())
                                    }
                                }
                                var q = { inboundrtp: 'inbound-rtp', outboundrtp: 'outbound-rtp', candidatepair: 'candidate-pair', localcandidate: 'local-candidate', remotecandidate: 'remote-candidate' },
                                    t = k.RTCPeerConnection.prototype.getStats
                                k.RTCPeerConnection.prototype.getStats = function () {
                                    var r = Array.prototype.slice.call(arguments),
                                        x = r[1],
                                        u = r[2]
                                    return t
                                        .apply(this, [r[0] || null])
                                        .then(function (z) {
                                            if (53 > f.version && !x)
                                                try {
                                                    z.forEach(function (m) {
                                                        m.type = q[m.type] || m.type
                                                    })
                                                } catch (m) {
                                                    if ('TypeError' !== m.name) throw m
                                                    z.forEach(function (n, w) {
                                                        z.set(w, Object.assign({}, n, { type: q[n.type] || n.type }))
                                                    })
                                                }
                                            return z
                                        })
                                        .then(x, u)
                                }
                            }
                        }
                        c.shimSenderGetStats = function (k) {
                            if ('object' === ('undefined' === typeof k ? 'undefined' : d(k)) && k.RTCPeerConnection && k.RTCRtpSender && !(k.RTCRtpSender && 'getStats' in k.RTCRtpSender.prototype)) {
                                var f = k.RTCPeerConnection.prototype.getSenders
                                f &&
                                    (k.RTCPeerConnection.prototype.getSenders = function () {
                                        var q = this,
                                            t = f.apply(this, [])
                                        t.forEach(function (r) {
                                            return (r._pc = q)
                                        })
                                        return t
                                    })
                                var h = k.RTCPeerConnection.prototype.addTrack
                                h &&
                                    (k.RTCPeerConnection.prototype.addTrack = function () {
                                        var q = h.apply(this, arguments)
                                        q._pc = this
                                        return q
                                    })
                                k.RTCRtpSender.prototype.getStats = function () {
                                    return this.track ? this._pc.getStats(this.track) : Promise.resolve(new Map())
                                }
                            }
                        }
                        c.shimReceiverGetStats = function (k) {
                            if ('object' === ('undefined' === typeof k ? 'undefined' : d(k)) && k.RTCPeerConnection && k.RTCRtpSender && !(k.RTCRtpSender && 'getStats' in k.RTCRtpReceiver.prototype)) {
                                var f = k.RTCPeerConnection.prototype.getReceivers
                                f &&
                                    (k.RTCPeerConnection.prototype.getReceivers = function () {
                                        var h = this,
                                            q = f.apply(this, [])
                                        q.forEach(function (t) {
                                            return (t._pc = h)
                                        })
                                        return q
                                    })
                                p.wrapPeerConnectionEvent(k, 'track', function (h) {
                                    h.receiver._pc = h.srcElement
                                    return h
                                })
                                k.RTCRtpReceiver.prototype.getStats = function () {
                                    return this._pc.getStats(this.track)
                                }
                            }
                        }
                        c.shimRemoveStream = function (k) {
                            !k.RTCPeerConnection ||
                                'removeStream' in k.RTCPeerConnection.prototype ||
                                (k.RTCPeerConnection.prototype.removeStream = function (f) {
                                    var h = this
                                    p.deprecated('removeStream', 'removeTrack')
                                    this.getSenders().forEach(function (q) {
                                        q.track && f.getTracks().includes(q.track) && h.removeTrack(q)
                                    })
                                })
                        }
                        c.shimRTCDataChannel = function (k) {
                            k.DataChannel && !k.RTCDataChannel && (k.RTCDataChannel = k.DataChannel)
                        }
                        c.shimAddTransceiver = function (k) {
                            if ('object' === ('undefined' === typeof k ? 'undefined' : d(k)) && k.RTCPeerConnection) {
                                var f = k.RTCPeerConnection.prototype.addTransceiver
                                f &&
                                    (k.RTCPeerConnection.prototype.addTransceiver = function () {
                                        this.setParametersPromises = []
                                        var h = arguments[1],
                                            q = h && 'sendEncodings' in h
                                        q &&
                                            h.sendEncodings.forEach(function (x) {
                                                if ('rid' in x && !/^[a-z0-9]{0,16}$/i.test(x.rid)) throw new TypeError('Invalid RID value provided.')
                                                if ('scaleResolutionDownBy' in x && !(1 <= parseFloat(x.scaleResolutionDownBy))) throw new RangeError('scale_resolution_down_by must be >= 1.0')
                                                if ('maxFramerate' in x && !(0 <= parseFloat(x.maxFramerate))) throw new RangeError('max_framerate must be >= 0.0')
                                            })
                                        var t = f.apply(this, arguments)
                                        if (q) {
                                            var r = t.sender
                                            q = r.getParameters()
                                            'encodings' in q ||
                                                ((q.encodings = h.sendEncodings),
                                                    (r.sendEncodings = h.sendEncodings),
                                                    this.setParametersPromises.push(
                                                        r
                                                            .setParameters(q)
                                                            .then(function () {
                                                                delete r.sendEncodings
                                                            })
                                                            .catch(function () {
                                                                delete r.sendEncodings
                                                            })
                                                    ))
                                        }
                                        return t
                                    })
                            }
                        }
                        c.shimGetParameters = function (k) {
                            if ('object' === ('undefined' === typeof k ? 'undefined' : d(k)) && k.RTCRtpSender) {
                                var f = k.RTCRtpSender.prototype.getParameters
                                f &&
                                    (k.RTCRtpSender.prototype.getParameters = function () {
                                        var h = f.apply(this, arguments)
                                        return 'sendEncodings' in this ? Object.assign({}, { encodings: this.sendEncodings }, h) : h
                                    })
                            }
                        }
                        c.shimCreateOffer = function (k) {
                            if ('object' === ('undefined' === typeof k ? 'undefined' : d(k)) && k.RTCPeerConnection) {
                                var f = k.RTCPeerConnection.prototype.createOffer
                                k.RTCPeerConnection.prototype.createOffer = function () {
                                    var h = this,
                                        q = arguments
                                    return this.setParametersPromises && this.setParametersPromises.length
                                        ? Promise.all(this.setParametersPromises)
                                            .then(function () {
                                                return f.apply(h, q)
                                            })
                                            .finally(function () {
                                                h.setParametersPromises = []
                                            })
                                        : f.apply(this, arguments)
                                }
                            }
                        }
                        c.shimCreateAnswer = function (k) {
                            if ('object' === ('undefined' === typeof k ? 'undefined' : d(k)) && k.RTCPeerConnection) {
                                var f = k.RTCPeerConnection.prototype.createAnswer
                                k.RTCPeerConnection.prototype.createAnswer = function () {
                                    var h = this,
                                        q = arguments
                                    return this.setParametersPromises && this.setParametersPromises.length
                                        ? Promise.all(this.setParametersPromises)
                                            .then(function () {
                                                return f.apply(h, q)
                                            })
                                            .finally(function () {
                                                h.setParametersPromises = []
                                            })
                                        : f.apply(this, arguments)
                                }
                            }
                        }
                        var p = (function (k) {
                            if (k && k.__esModule) return k
                            var f = {}
                            if (null != k) for (var h in k) Object.prototype.hasOwnProperty.call(k, h) && (f[h] = k[h])
                            f.default = k
                            return f
                        })(a('../utils'))
                    },
                    { '../utils': 15, './getdisplaymedia': 12, './getusermedia': 13 },
                ],
                12: [
                    function (a, b, c) {
                        Object.defineProperty(c, '__esModule', { value: !0 })
                        c.shimGetDisplayMedia = function (e, d) {
                            ; (e.navigator.mediaDevices && 'getDisplayMedia' in e.navigator.mediaDevices) ||
                                !e.navigator.mediaDevices ||
                                (e.navigator.mediaDevices.getDisplayMedia = function (l) {
                                    if (!l || !l.video) return (l = new DOMException('getDisplayMedia without video constraints is undefined')), (l.name = 'NotFoundError'), (l.code = 8), Promise.reject(l)
                                    !0 === l.video ? (l.video = { mediaSource: d }) : (l.video.mediaSource = d)
                                    return e.navigator.mediaDevices.getUserMedia(l)
                                })
                        }
                    },
                    {},
                ],
                13: [
                    function (a, b, c) {
                        Object.defineProperty(c, '__esModule', { value: !0 })
                        var e =
                            'function' === typeof Symbol && 'symbol' === typeof Symbol.iterator
                                ? function (l) {
                                    return typeof l
                                }
                                : function (l) {
                                    return l && 'function' === typeof Symbol && l.constructor === Symbol && l !== Symbol.prototype ? 'symbol' : typeof l
                                }
                        c.shimGetUserMedia = function (l) {
                            var g = d.detectBrowser(l),
                                p = l && l.navigator
                            l = l && l.MediaStreamTrack
                            p.getUserMedia = function (t, r, x) {
                                d.deprecated('navigator.getUserMedia', 'navigator.mediaDevices.getUserMedia')
                                p.mediaDevices.getUserMedia(t).then(r, x)
                            }
                            if (!(55 < g.version && 'autoGainControl' in p.mediaDevices.getSupportedConstraints())) {
                                var k = function (t, r, x) {
                                    r in t && !(x in t) && ((t[x] = t[r]), delete t[r])
                                },
                                    f = p.mediaDevices.getUserMedia.bind(p.mediaDevices)
                                p.mediaDevices.getUserMedia = function (t) {
                                    'object' === ('undefined' === typeof t ? 'undefined' : e(t)) && 'object' === e(t.audio) && ((t = JSON.parse(JSON.stringify(t))), k(t.audio, 'autoGainControl', 'mozAutoGainControl'), k(t.audio, 'noiseSuppression', 'mozNoiseSuppression'))
                                    return f(t)
                                }
                                if (l && l.prototype.getSettings) {
                                    var h = l.prototype.getSettings
                                    l.prototype.getSettings = function () {
                                        var t = h.apply(this, arguments)
                                        k(t, 'mozAutoGainControl', 'autoGainControl')
                                        k(t, 'mozNoiseSuppression', 'noiseSuppression')
                                        return t
                                    }
                                }
                                if (l && l.prototype.applyConstraints) {
                                    var q = l.prototype.applyConstraints
                                    l.prototype.applyConstraints = function (t) {
                                        'audio' === this.kind && 'object' === ('undefined' === typeof t ? 'undefined' : e(t)) && ((t = JSON.parse(JSON.stringify(t))), k(t, 'autoGainControl', 'mozAutoGainControl'), k(t, 'noiseSuppression', 'mozNoiseSuppression'))
                                        return q.apply(this, [t])
                                    }
                                }
                            }
                        }
                        var d = (function (l) {
                            if (l && l.__esModule) return l
                            var g = {}
                            if (null != l) for (var p in l) Object.prototype.hasOwnProperty.call(l, p) && (g[p] = l[p])
                            g.default = l
                            return g
                        })(a('../utils'))
                    },
                    { '../utils': 15 },
                ],
                14: [
                    function (a, b, c) {
                        function e(g) {
                            return g && void 0 !== g.video ? Object.assign({}, g, { video: l.compactObject(g.video) }) : g
                        }
                        Object.defineProperty(c, '__esModule', { value: !0 })
                        var d =
                            'function' === typeof Symbol && 'symbol' === typeof Symbol.iterator
                                ? function (g) {
                                    return typeof g
                                }
                                : function (g) {
                                    return g && 'function' === typeof Symbol && g.constructor === Symbol && g !== Symbol.prototype ? 'symbol' : typeof g
                                }
                        c.shimLocalStreamsAPI = function (g) {
                            if ('object' === ('undefined' === typeof g ? 'undefined' : d(g)) && g.RTCPeerConnection) {
                                'getLocalStreams' in g.RTCPeerConnection.prototype ||
                                    (g.RTCPeerConnection.prototype.getLocalStreams = function () {
                                        this._localStreams || (this._localStreams = [])
                                        return this._localStreams
                                    })
                                if (!('addStream' in g.RTCPeerConnection.prototype)) {
                                    var p = g.RTCPeerConnection.prototype.addTrack
                                    g.RTCPeerConnection.prototype.addStream = function (k) {
                                        var f = this
                                        this._localStreams || (this._localStreams = [])
                                        this._localStreams.includes(k) || this._localStreams.push(k)
                                        k.getAudioTracks().forEach(function (h) {
                                            return p.call(f, h, k)
                                        })
                                        k.getVideoTracks().forEach(function (h) {
                                            return p.call(f, h, k)
                                        })
                                    }
                                    g.RTCPeerConnection.prototype.addTrack = function (k) {
                                        for (var f = this, h = arguments.length, q = Array(1 < h ? h - 1 : 0), t = 1; t < h; t++) q[t - 1] = arguments[t]
                                        q &&
                                            q.forEach(function (r) {
                                                f._localStreams ? f._localStreams.includes(r) || f._localStreams.push(r) : (f._localStreams = [r])
                                            })
                                        return p.apply(this, arguments)
                                    }
                                }
                                'removeStream' in g.RTCPeerConnection.prototype ||
                                    (g.RTCPeerConnection.prototype.removeStream = function (k) {
                                        var f = this
                                        this._localStreams || (this._localStreams = [])
                                        var h = this._localStreams.indexOf(k)
                                        if (-1 !== h) {
                                            this._localStreams.splice(h, 1)
                                            var q = k.getTracks()
                                            this.getSenders().forEach(function (t) {
                                                q.includes(t.track) && f.removeTrack(t)
                                            })
                                        }
                                    })
                            }
                        }
                        c.shimRemoteStreamsAPI = function (g) {
                            if (
                                'object' === ('undefined' === typeof g ? 'undefined' : d(g)) &&
                                g.RTCPeerConnection &&
                                ('getRemoteStreams' in g.RTCPeerConnection.prototype ||
                                    (g.RTCPeerConnection.prototype.getRemoteStreams = function () {
                                        return this._remoteStreams ? this._remoteStreams : []
                                    }),
                                    !('onaddstream' in g.RTCPeerConnection.prototype))
                            ) {
                                Object.defineProperty(g.RTCPeerConnection.prototype, 'onaddstream', {
                                    get: function () {
                                        return this._onaddstream
                                    },
                                    set: function (k) {
                                        var f = this
                                        this._onaddstream && (this.removeEventListener('addstream', this._onaddstream), this.removeEventListener('track', this._onaddstreampoly))
                                        this.addEventListener('addstream', (this._onaddstream = k))
                                        this.addEventListener(
                                            'track',
                                            (this._onaddstreampoly = function (h) {
                                                h.streams.forEach(function (q) {
                                                    f._remoteStreams || (f._remoteStreams = [])
                                                    if (!f._remoteStreams.includes(q)) {
                                                        f._remoteStreams.push(q)
                                                        var t = new Event('addstream')
                                                        t.stream = q
                                                        f.dispatchEvent(t)
                                                    }
                                                })
                                            })
                                        )
                                    },
                                })
                                var p = g.RTCPeerConnection.prototype.setRemoteDescription
                                g.RTCPeerConnection.prototype.setRemoteDescription = function () {
                                    var k = this
                                    this._onaddstreampoly ||
                                        this.addEventListener(
                                            'track',
                                            (this._onaddstreampoly = function (f) {
                                                f.streams.forEach(function (h) {
                                                    k._remoteStreams || (k._remoteStreams = [])
                                                    if (!(0 <= k._remoteStreams.indexOf(h))) {
                                                        k._remoteStreams.push(h)
                                                        var q = new Event('addstream')
                                                        q.stream = h
                                                        k.dispatchEvent(q)
                                                    }
                                                })
                                            })
                                        )
                                    return p.apply(k, arguments)
                                }
                            }
                        }
                        c.shimCallbacksAPI = function (g) {
                            if ('object' === ('undefined' === typeof g ? 'undefined' : d(g)) && g.RTCPeerConnection) {
                                g = g.RTCPeerConnection.prototype
                                var p = g.createOffer,
                                    k = g.createAnswer,
                                    f = g.setLocalDescription,
                                    h = g.setRemoteDescription,
                                    q = g.addIceCandidate
                                g.createOffer = function (r, x) {
                                    var u = p.apply(this, [2 <= arguments.length ? arguments[2] : arguments[0]])
                                    if (!x) return u
                                    u.then(r, x)
                                    return Promise.resolve()
                                }
                                g.createAnswer = function (r, x) {
                                    var u = k.apply(this, [2 <= arguments.length ? arguments[2] : arguments[0]])
                                    if (!x) return u
                                    u.then(r, x)
                                    return Promise.resolve()
                                }
                                var t = function (r, x, u) {
                                    r = f.apply(this, [r])
                                    if (!u) return r
                                    r.then(x, u)
                                    return Promise.resolve()
                                }
                                g.setLocalDescription = t
                                t = function (r, x, u) {
                                    r = h.apply(this, [r])
                                    if (!u) return r
                                    r.then(x, u)
                                    return Promise.resolve()
                                }
                                g.setRemoteDescription = t
                                t = function (r, x, u) {
                                    r = q.apply(this, [r])
                                    if (!u) return r
                                    r.then(x, u)
                                    return Promise.resolve()
                                }
                                g.addIceCandidate = t
                            }
                        }
                        c.shimGetUserMedia = function (g) {
                            var p = g && g.navigator
                            if (p.mediaDevices && p.mediaDevices.getUserMedia) {
                                g = p.mediaDevices
                                var k = g.getUserMedia.bind(g)
                                p.mediaDevices.getUserMedia = function (f) {
                                    return k(e(f))
                                }
                            }
                            !p.getUserMedia &&
                                p.mediaDevices &&
                                p.mediaDevices.getUserMedia &&
                                (p.getUserMedia = function (f, h, q) {
                                    p.mediaDevices.getUserMedia(f).then(h, q)
                                }.bind(p))
                        }
                        c.shimConstraints = e
                        c.shimRTCIceServerUrls = function (g) {
                            var p = g.RTCPeerConnection
                            g.RTCPeerConnection = function (k, f) {
                                if (k && k.iceServers) {
                                    for (var h = [], q = 0; q < k.iceServers.length; q++) {
                                        var t = k.iceServers[q]
                                        !t.hasOwnProperty('urls') && t.hasOwnProperty('url') ? (l.deprecated('RTCIceServer.url', 'RTCIceServer.urls'), (t = JSON.parse(JSON.stringify(t))), (t.urls = t.url), delete t.url, h.push(t)) : h.push(k.iceServers[q])
                                    }
                                    k.iceServers = h
                                }
                                return new p(k, f)
                            }
                            g.RTCPeerConnection.prototype = p.prototype
                            'generateCertificate' in g.RTCPeerConnection &&
                                Object.defineProperty(g.RTCPeerConnection, 'generateCertificate', {
                                    get: function () {
                                        return p.generateCertificate
                                    },
                                })
                        }
                        c.shimTrackEventTransceiver = function (g) {
                            'object' === ('undefined' === typeof g ? 'undefined' : d(g)) &&
                                g.RTCTrackEvent &&
                                'receiver' in g.RTCTrackEvent.prototype &&
                                !('transceiver' in g.RTCTrackEvent.prototype) &&
                                Object.defineProperty(g.RTCTrackEvent.prototype, 'transceiver', {
                                    get: function () {
                                        return { receiver: this.receiver }
                                    },
                                })
                        }
                        c.shimCreateOfferLegacy = function (g) {
                            var p = g.RTCPeerConnection.prototype.createOffer
                            g.RTCPeerConnection.prototype.createOffer = function (k) {
                                if (k) {
                                    'undefined' !== typeof k.offerToReceiveAudio && (k.offerToReceiveAudio = !!k.offerToReceiveAudio)
                                    var f = this.getTransceivers().find(function (h) {
                                        return 'audio' === h.receiver.track.kind
                                    })
                                    !1 === k.offerToReceiveAudio && f ? ('sendrecv' === f.direction ? (f.setDirection ? f.setDirection('sendonly') : (f.direction = 'sendonly')) : 'recvonly' === f.direction && (f.setDirection ? f.setDirection('inactive') : (f.direction = 'inactive'))) : !0 !== k.offerToReceiveAudio || f || this.addTransceiver('audio')
                                    'undefined' !== typeof k.offerToReceiveVideo && (k.offerToReceiveVideo = !!k.offerToReceiveVideo)
                                    f = this.getTransceivers().find(function (h) {
                                        return 'video' === h.receiver.track.kind
                                    })
                                    !1 === k.offerToReceiveVideo && f ? ('sendrecv' === f.direction ? (f.setDirection ? f.setDirection('sendonly') : (f.direction = 'sendonly')) : 'recvonly' === f.direction && (f.setDirection ? f.setDirection('inactive') : (f.direction = 'inactive'))) : !0 !== k.offerToReceiveVideo || f || this.addTransceiver('video')
                                }
                                return p.apply(this, arguments)
                            }
                        }
                        c.shimAudioContext = function (g) {
                            'object' !== ('undefined' === typeof g ? 'undefined' : d(g)) || g.AudioContext || (g.AudioContext = g.webkitAudioContext)
                        }
                        var l = (function (g) {
                            if (g && g.__esModule) return g
                            var p = {}
                            if (null != g) for (var k in g) Object.prototype.hasOwnProperty.call(g, k) && (p[k] = g[k])
                            p.default = g
                            return p
                        })(a('../utils'))
                    },
                    { '../utils': 15 },
                ],
                15: [
                    function (a, b, c) {
                        function e(h, q, t) {
                            q in h ? Object.defineProperty(h, q, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : (h[q] = t)
                            return h
                        }
                        function d(h, q, t) {
                            return (h = h.match(q)) && h.length >= t && parseInt(h[t], 10)
                        }
                        function l(h) {
                            return '[object Object]' !== Object.prototype.toString.call(h)
                                ? h
                                : Object.keys(h).reduce(function (q, t) {
                                    var r = '[object Object]' === Object.prototype.toString.call(h[t]),
                                        x = r ? l(h[t]) : h[t]
                                    r = r && !Object.keys(x).length
                                    return void 0 === x || r ? q : Object.assign(q, e({}, t, x))
                                }, {})
                        }
                        function g(h, q, t) {
                            q &&
                                !t.has(q.id) &&
                                (t.set(q.id, q),
                                    Object.keys(q).forEach(function (r) {
                                        r.endsWith('Id')
                                            ? g(h, h.get(q[r]), t)
                                            : r.endsWith('Ids') &&
                                            q[r].forEach(function (x) {
                                                g(h, h.get(x), t)
                                            })
                                    }))
                        }
                        Object.defineProperty(c, '__esModule', { value: !0 })
                        var p =
                            'function' === typeof Symbol && 'symbol' === typeof Symbol.iterator
                                ? function (h) {
                                    return typeof h
                                }
                                : function (h) {
                                    return h && 'function' === typeof Symbol && h.constructor === Symbol && h !== Symbol.prototype ? 'symbol' : typeof h
                                }
                        c.extractVersion = d
                        c.wrapPeerConnectionEvent = function (h, q, t) {
                            if (h.RTCPeerConnection) {
                                h = h.RTCPeerConnection.prototype
                                var r = h.addEventListener
                                h.addEventListener = function (u, z) {
                                    if (u !== q) return r.apply(this, arguments)
                                    var m = function (n) {
                                        ; (n = t(n)) && (z.handleEvent ? z.handleEvent(n) : z(n))
                                    }
                                    this._eventMap = this._eventMap || {}
                                    this._eventMap[q] || (this._eventMap[q] = new Map())
                                    this._eventMap[q].set(z, m)
                                    return r.apply(this, [u, m])
                                }
                                var x = h.removeEventListener
                                h.removeEventListener = function (u, z) {
                                    if (u !== q || !this._eventMap || !this._eventMap[q] || !this._eventMap[q].has(z)) return x.apply(this, arguments)
                                    var m = this._eventMap[q].get(z)
                                    this._eventMap[q].delete(z)
                                    0 === this._eventMap[q].size && delete this._eventMap[q]
                                    0 === Object.keys(this._eventMap).length && delete this._eventMap
                                    return x.apply(this, [u, m])
                                }
                                Object.defineProperty(h, 'on' + q, {
                                    get: function () {
                                        return this['_on' + q]
                                    },
                                    set: function (u) {
                                        this['_on' + q] && (this.removeEventListener(q, this['_on' + q]), delete this['_on' + q])
                                        u && this.addEventListener(q, (this['_on' + q] = u))
                                    },
                                    enumerable: !0,
                                    configurable: !0,
                                })
                            }
                        }
                        c.disableLog = function (h) {
                            return 'boolean' !== typeof h ? Error('Argument type: ' + ('undefined' === typeof h ? 'undefined' : p(h)) + '. Please use a boolean.') : (k = h) ? 'adapter.js logging disabled' : 'adapter.js logging enabled'
                        }
                        c.disableWarnings = function (h) {
                            if ('boolean' !== typeof h) return Error('Argument type: ' + ('undefined' === typeof h ? 'undefined' : p(h)) + '. Please use a boolean.')
                            f = !h
                            return 'adapter.js deprecation warnings ' + (h ? 'disabled' : 'enabled')
                        }
                        c.log = function () {
                            'object' !== ('undefined' === typeof window ? 'undefined' : p(window)) || k || ('undefined' !== typeof console && 'function' === typeof console.log && console.log.apply(console, arguments))
                        }
                        c.deprecated = function (h, q) {
                            f && console.warn(h + ' is deprecated, please use ' + q + ' instead.')
                        }
                        c.detectBrowser = function (h) {
                            var q = h.navigator,
                                t = { browser: null, version: null }
                            if ('undefined' === typeof h || !h.navigator) return (t.browser = 'Not a browser.'), t
                            q.mozGetUserMedia ? ((t.browser = 'firefox'), (t.version = d(q.userAgent, /Firefox\/(\d+)\./, 1))) : q.webkitGetUserMedia || (!1 === h.isSecureContext && h.webkitRTCPeerConnection && !h.RTCIceGatherer) ? ((t.browser = 'chrome'), (t.version = d(q.userAgent, /Chrom(e|ium)\/(\d+)\./, 2))) : q.mediaDevices && q.userAgent.match(/Edge\/(\d+).(\d+)$/) ? ((t.browser = 'edge'), (t.version = d(q.userAgent, /Edge\/(\d+).(\d+)$/, 2))) : h.RTCPeerConnection && q.userAgent.match(/AppleWebKit\/(\d+)\./) ? ((t.browser = 'safari'), (t.version = d(q.userAgent, /AppleWebKit\/(\d+)\./, 1)), (t.supportsUnifiedPlan = h.RTCRtpTransceiver && 'currentDirection' in h.RTCRtpTransceiver.prototype)) : (t.browser = 'Not a supported browser.')
                            return t
                        }
                        c.compactObject = l
                        c.walkStats = g
                        c.filterStats = function (h, q, t) {
                            var r = t ? 'outbound-rtp' : 'inbound-rtp',
                                x = new Map()
                            if (null === q) return x
                            var u = []
                            h.forEach(function (z) {
                                'track' === z.type && z.trackIdentifier === q.id && u.push(z)
                            })
                            u.forEach(function (z) {
                                h.forEach(function (m) {
                                    m.type === r && m.trackId === z.id && g(h, m, x)
                                })
                            })
                            return x
                        }
                        var k = !0,
                            f = !0
                    },
                    {},
                ],
                16: [
                    function (a, b, c) {
                        function e(h, q, t, r, x) {
                            q = f.writeRtpDescription(h.kind, q)
                            q += f.writeIceParameters(h.iceGatherer.getLocalParameters())
                            q += f.writeDtlsParameters(h.dtlsTransport.getLocalParameters(), 'offer' === t ? 'actpass' : x || 'active')
                            q += 'a=mid:' + h.mid + '\r\n'
                            q = h.rtpSender && h.rtpReceiver ? q + 'a=sendrecv\r\n' : h.rtpSender ? q + 'a=sendonly\r\n' : h.rtpReceiver ? q + 'a=recvonly\r\n' : q + 'a=inactive\r\n'
                            h.rtpSender && ((t = h.rtpSender._initialTrackId || h.rtpSender.track.id), (h.rtpSender._initialTrackId = t), (r = 'msid:' + (r ? r.id : '-') + ' ' + t + '\r\n'), (q = q + ('a=' + r) + ('a=ssrc:' + h.sendEncodingParameters[0].ssrc + ' ' + r)), h.sendEncodingParameters[0].rtx && ((q += 'a=ssrc:' + h.sendEncodingParameters[0].rtx.ssrc + ' ' + r), (q += 'a=ssrc-group:FID ' + h.sendEncodingParameters[0].ssrc + ' ' + h.sendEncodingParameters[0].rtx.ssrc + '\r\n')))
                            q += 'a=ssrc:' + h.sendEncodingParameters[0].ssrc + ' cname:' + f.localCName + '\r\n'
                            h.rtpSender && h.sendEncodingParameters[0].rtx && (q += 'a=ssrc:' + h.sendEncodingParameters[0].rtx.ssrc + ' cname:' + f.localCName + '\r\n')
                            return q
                        }
                        function d(h, q) {
                            var t = !1
                            h = JSON.parse(JSON.stringify(h))
                            return h.filter(function (r) {
                                if (r && (r.urls || r.url)) {
                                    var x = r.urls || r.url
                                    r.url && !r.urls && console.warn('RTCIceServer.url is deprecated! Use urls instead.')
                                    var u = 'string' === typeof x
                                    u && (x = [x])
                                    x = x.filter(function (z) {
                                        return 0 !== z.indexOf('turn:') || -1 === z.indexOf('transport=udp') || -1 !== z.indexOf('turn:[') || t ? 0 === z.indexOf('stun:') && 14393 <= q && -1 === z.indexOf('?transport=udp') : (t = !0)
                                    })
                                    delete r.url
                                    r.urls = u ? x[0] : x
                                    return !!x.length
                                }
                            })
                        }
                        function l(h, q) {
                            var t = { codecs: [], headerExtensions: [], fecMechanisms: [] },
                                r = function (u, z) {
                                    u = parseInt(u, 10)
                                    for (var m = 0; m < z.length; m++) if (z[m].payloadType === u || z[m].preferredPayloadType === u) return z[m]
                                },
                                x = function (u, z, m, n) {
                                    u = r(u.parameters.apt, m)
                                    z = r(z.parameters.apt, n)
                                    return u && z && u.name.toLowerCase() === z.name.toLowerCase()
                                }
                            h.codecs.forEach(function (u) {
                                for (var z = 0; z < q.codecs.length; z++) {
                                    var m = q.codecs[z]
                                    if (u.name.toLowerCase() === m.name.toLowerCase() && u.clockRate === m.clockRate && ('rtx' !== u.name.toLowerCase() || !u.parameters || !m.parameters.apt || x(u, m, h.codecs, q.codecs))) {
                                        m = JSON.parse(JSON.stringify(m))
                                        m.numChannels = Math.min(u.numChannels, m.numChannels)
                                        t.codecs.push(m)
                                        m.rtcpFeedback = m.rtcpFeedback.filter(function (n) {
                                            for (var w = 0; w < u.rtcpFeedback.length; w++) if (u.rtcpFeedback[w].type === n.type && u.rtcpFeedback[w].parameter === n.parameter) return !0
                                            return !1
                                        })
                                        break
                                    }
                                }
                            })
                            h.headerExtensions.forEach(function (u) {
                                for (var z = 0; z < q.headerExtensions.length; z++) {
                                    var m = q.headerExtensions[z]
                                    if (u.uri === m.uri) {
                                        t.headerExtensions.push(m)
                                        break
                                    }
                                }
                            })
                            return t
                        }
                        function g(h, q, t) {
                            return -1 !== { offer: { setLocalDescription: ['stable', 'have-local-offer'], setRemoteDescription: ['stable', 'have-remote-offer'] }, answer: { setLocalDescription: ['have-remote-offer', 'have-local-pranswer'], setRemoteDescription: ['have-local-offer', 'have-remote-pranswer'] } }[q][h].indexOf(t)
                        }
                        function p(h, q) {
                            var t = h.getRemoteCandidates().find(function (r) {
                                return q.foundation === r.foundation && q.ip === r.ip && q.port === r.port && q.priority === r.priority && q.protocol === r.protocol && q.type === r.type
                            })
                            t || h.addRemoteCandidate(q)
                            return !t
                        }
                        function k(h, q) {
                            q = Error(q)
                            q.name = h
                            q.code = { NotSupportedError: 9, InvalidStateError: 11, InvalidAccessError: 15, TypeError: void 0, OperationError: void 0 }[h]
                            return q
                        }
                        var f = a('sdp')
                        b.exports = function (h, q) {
                            function t(m, n) {
                                n.addTrack(m)
                                n.dispatchEvent(new h.MediaStreamTrackEvent('addtrack', { track: m }))
                            }
                            function r(m, n) {
                                n.removeTrack(m)
                                n.dispatchEvent(new h.MediaStreamTrackEvent('removetrack', { track: m }))
                            }
                            function x(m, n, w, y) {
                                var A = new Event('track')
                                A.track = n
                                A.receiver = w
                                A.transceiver = { receiver: w }
                                A.streams = y
                                h.setTimeout(function () {
                                    m._dispatchEvent('track', A)
                                })
                            }
                            var u = function (m) {
                                var n = this,
                                    w = document.createDocumentFragment()
                                    ;['addEventListener', 'removeEventListener', 'dispatchEvent'].forEach(function (A) {
                                        n[A] = w[A].bind(w)
                                    })
                                this.canTrickleIceCandidates = null
                                this.needNegotiation = !1
                                this.localStreams = []
                                this.remoteStreams = []
                                this._remoteDescription = this._localDescription = null
                                this.signalingState = 'stable'
                                this.iceGatheringState = this.connectionState = this.iceConnectionState = 'new'
                                m = JSON.parse(JSON.stringify(m || {}))
                                this.usingBundle = 'max-bundle' === m.bundlePolicy
                                if ('negotiate' === m.rtcpMuxPolicy) throw k('NotSupportedError', "rtcpMuxPolicy 'negotiate' is not supported")
                                m.rtcpMuxPolicy || (m.rtcpMuxPolicy = 'require')
                                switch (m.iceTransportPolicy) {
                                    case 'all':
                                    case 'relay':
                                        break
                                    default:
                                        m.iceTransportPolicy = 'all'
                                }
                                switch (m.bundlePolicy) {
                                    case 'balanced':
                                    case 'max-compat':
                                    case 'max-bundle':
                                        break
                                    default:
                                        m.bundlePolicy = 'balanced'
                                }
                                m.iceServers = d(m.iceServers || [], q)
                                this._iceGatherers = []
                                if (m.iceCandidatePoolSize) for (var y = m.iceCandidatePoolSize; 0 < y; y--) this._iceGatherers.push(new h.RTCIceGatherer({ iceServers: m.iceServers, gatherPolicy: m.iceTransportPolicy }))
                                else m.iceCandidatePoolSize = 0
                                this._config = m
                                this.transceivers = []
                                this._sdpSessionId = f.generateSessionId()
                                this._sdpSessionVersion = 0
                                this._dtlsRole = void 0
                                this._isClosed = !1
                            }
                            Object.defineProperty(u.prototype, 'localDescription', {
                                configurable: !0,
                                get: function () {
                                    return this._localDescription
                                },
                            })
                            Object.defineProperty(u.prototype, 'remoteDescription', {
                                configurable: !0,
                                get: function () {
                                    return this._remoteDescription
                                },
                            })
                            u.prototype.onicecandidate = null
                            u.prototype.onaddstream = null
                            u.prototype.ontrack = null
                            u.prototype.onremovestream = null
                            u.prototype.onsignalingstatechange = null
                            u.prototype.oniceconnectionstatechange = null
                            u.prototype.onconnectionstatechange = null
                            u.prototype.onicegatheringstatechange = null
                            u.prototype.onnegotiationneeded = null
                            u.prototype.ondatachannel = null
                            u.prototype._dispatchEvent = function (m, n) {
                                if (!this._isClosed && (this.dispatchEvent(n), 'function' === typeof this['on' + m])) this['on' + m](n)
                            }
                            u.prototype._emitGatheringStateChange = function () {
                                var m = new Event('icegatheringstatechange')
                                this._dispatchEvent('icegatheringstatechange', m)
                            }
                            u.prototype.getConfiguration = function () {
                                return this._config
                            }
                            u.prototype.getLocalStreams = function () {
                                return this.localStreams
                            }
                            u.prototype.getRemoteStreams = function () {
                                return this.remoteStreams
                            }
                            u.prototype._createTransceiver = function (m, n) {
                                var w = 0 < this.transceivers.length
                                m = {
                                    track: null,
                                    iceGatherer: null,
                                    iceTransport: null,
                                    dtlsTransport: null,
                                    localCapabilities: null,
                                    remoteCapabilities: null,
                                    rtpSender: null,
                                    rtpReceiver: null,
                                    kind: m,
                                    mid: null,
                                    sendEncodingParameters: null,
                                    recvEncodingParameters: null,
                                    stream: null,
                                    associatedRemoteMediaStreams: [],
                                    wantReceive: !0,
                                }
                                this.usingBundle && w ? ((m.iceTransport = this.transceivers[0].iceTransport), (m.dtlsTransport = this.transceivers[0].dtlsTransport)) : ((w = this._createIceAndDtlsTransports()), (m.iceTransport = w.iceTransport), (m.dtlsTransport = w.dtlsTransport))
                                n || this.transceivers.push(m)
                                return m
                            }
                            u.prototype.addTrack = function (m, n) {
                                if (this._isClosed) throw k('InvalidStateError', 'Attempted to call addTrack on a closed peerconnection.')
                                if (
                                    this.transceivers.find(function (A) {
                                        return A.track === m
                                    })
                                )
                                    throw k('InvalidAccessError', 'Track already exists.')
                                for (var w, y = 0; y < this.transceivers.length; y++) this.transceivers[y].track || this.transceivers[y].kind !== m.kind || (w = this.transceivers[y])
                                w || (w = this._createTransceiver(m.kind))
                                this._maybeFireNegotiationNeeded()
                                    ; -1 === this.localStreams.indexOf(n) && this.localStreams.push(n)
                                w.track = m
                                w.stream = n
                                w.rtpSender = new h.RTCRtpSender(m, w.dtlsTransport)
                                return w.rtpSender
                            }
                            u.prototype.addStream = function (m) {
                                var n = this
                                if (15025 <= q)
                                    m.getTracks().forEach(function (y) {
                                        n.addTrack(y, m)
                                    })
                                else {
                                    var w = m.clone()
                                    m.getTracks().forEach(function (y, A) {
                                        var B = w.getTracks()[A]
                                        y.addEventListener('enabled', function (C) {
                                            B.enabled = C.enabled
                                        })
                                    })
                                    w.getTracks().forEach(function (y) {
                                        n.addTrack(y, w)
                                    })
                                }
                            }
                            u.prototype.removeTrack = function (m) {
                                if (this._isClosed) throw k('InvalidStateError', 'Attempted to call removeTrack on a closed peerconnection.')
                                if (!(m instanceof h.RTCRtpSender)) throw new TypeError('Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.')
                                var n = this.transceivers.find(function (y) {
                                    return y.rtpSender === m
                                })
                                if (!n) throw k('InvalidAccessError', 'Sender was not created by this connection.')
                                var w = n.stream
                                n.rtpSender.stop()
                                n.rtpSender = null
                                n.track = null
                                n.stream = null
                                    ; -1 ===
                                        this.transceivers
                                            .map(function (y) {
                                                return y.stream
                                            })
                                            .indexOf(w) &&
                                        -1 < this.localStreams.indexOf(w) &&
                                        this.localStreams.splice(this.localStreams.indexOf(w), 1)
                                this._maybeFireNegotiationNeeded()
                            }
                            u.prototype.removeStream = function (m) {
                                var n = this
                                m.getTracks().forEach(function (w) {
                                    var y = n.getSenders().find(function (A) {
                                        return A.track === w
                                    })
                                    y && n.removeTrack(y)
                                })
                            }
                            u.prototype.getSenders = function () {
                                return this.transceivers
                                    .filter(function (m) {
                                        return !!m.rtpSender
                                    })
                                    .map(function (m) {
                                        return m.rtpSender
                                    })
                            }
                            u.prototype.getReceivers = function () {
                                return this.transceivers
                                    .filter(function (m) {
                                        return !!m.rtpReceiver
                                    })
                                    .map(function (m) {
                                        return m.rtpReceiver
                                    })
                            }
                            u.prototype._createIceGatherer = function (m, n) {
                                var w = this
                                if (n && 0 < m) return this.transceivers[0].iceGatherer
                                if (this._iceGatherers.length) return this._iceGatherers.shift()
                                var y = new h.RTCIceGatherer({ iceServers: this._config.iceServers, gatherPolicy: this._config.iceTransportPolicy })
                                Object.defineProperty(y, 'state', { value: 'new', writable: !0 })
                                this.transceivers[m].bufferedCandidateEvents = []
                                this.transceivers[m].bufferCandidates = function (A) {
                                    var B = !A.candidate || 0 === Object.keys(A.candidate).length
                                    y.state = B ? 'completed' : 'gathering'
                                    null !== w.transceivers[m].bufferedCandidateEvents && w.transceivers[m].bufferedCandidateEvents.push(A)
                                }
                                y.addEventListener('localcandidate', this.transceivers[m].bufferCandidates)
                                return y
                            }
                            u.prototype._gather = function (m, n) {
                                var w = this,
                                    y = this.transceivers[n].iceGatherer
                                if (!y.onlocalcandidate) {
                                    var A = this.transceivers[n].bufferedCandidateEvents
                                    this.transceivers[n].bufferedCandidateEvents = null
                                    y.removeEventListener('localcandidate', this.transceivers[n].bufferCandidates)
                                    y.onlocalcandidate = function (B) {
                                        if (!(w.usingBundle && 0 < n)) {
                                            var C = new Event('icecandidate')
                                            C.candidate = { sdpMid: m, sdpMLineIndex: n }
                                            var F = B.candidate
                                            if ((B = !F || 0 === Object.keys(F).length)) {
                                                if ('new' === y.state || 'gathering' === y.state) y.state = 'completed'
                                            } else
                                                'new' === y.state && (y.state = 'gathering'),
                                                    (F.component = 1),
                                                    (F.ufrag = y.getLocalParameters().usernameFragment),
                                                    (F = f.writeCandidate(F)),
                                                    (C.candidate = Object.assign(C.candidate, f.parseCandidate(F))),
                                                    (C.candidate.candidate = F),
                                                    (C.candidate.toJSON = function () {
                                                        return {
                                                            candidate: C.candidate.candidate,
                                                            sdpMid: C.candidate.sdpMid,
                                                            sdpMLineIndex: C.candidate.sdpMLineIndex,
                                                            usernameFragment: C.candidate.usernameFragment,
                                                        }
                                                    })
                                            F = f.getMediaSections(w._localDescription.sdp)
                                            F[C.candidate.sdpMLineIndex] = B ? F[C.candidate.sdpMLineIndex] + 'a=end-of-candidates\r\n' : F[C.candidate.sdpMLineIndex] + ('a=' + C.candidate.candidate + '\r\n')
                                            w._localDescription.sdp = f.getDescription(w._localDescription.sdp) + F.join('')
                                            F = w.transceivers.every(function (L) {
                                                return L.iceGatherer && 'completed' === L.iceGatherer.state
                                            })
                                            'gathering' !== w.iceGatheringState && ((w.iceGatheringState = 'gathering'), w._emitGatheringStateChange())
                                            B || w._dispatchEvent('icecandidate', C)
                                            F && (w._dispatchEvent('icecandidate', new Event('icecandidate')), (w.iceGatheringState = 'complete'), w._emitGatheringStateChange())
                                        }
                                    }
                                    h.setTimeout(function () {
                                        A.forEach(function (B) {
                                            y.onlocalcandidate(B)
                                        })
                                    }, 0)
                                }
                            }
                            u.prototype._createIceAndDtlsTransports = function () {
                                var m = this,
                                    n = new h.RTCIceTransport(null)
                                n.onicestatechange = function () {
                                    m._updateIceConnectionState()
                                    m._updateConnectionState()
                                }
                                var w = new h.RTCDtlsTransport(n)
                                w.ondtlsstatechange = function () {
                                    m._updateConnectionState()
                                }
                                w.onerror = function () {
                                    Object.defineProperty(w, 'state', { value: 'failed', writable: !0 })
                                    m._updateConnectionState()
                                }
                                return { iceTransport: n, dtlsTransport: w }
                            }
                            u.prototype._disposeIceAndDtlsTransports = function (m) {
                                var n = this.transceivers[m].iceGatherer
                                n && (delete n.onlocalcandidate, delete this.transceivers[m].iceGatherer)
                                if ((n = this.transceivers[m].iceTransport)) delete n.onicestatechange, delete this.transceivers[m].iceTransport
                                if ((n = this.transceivers[m].dtlsTransport)) delete n.ondtlsstatechange, delete n.onerror, delete this.transceivers[m].dtlsTransport
                            }
                            u.prototype._transceive = function (m, n, w) {
                                var y = l(m.localCapabilities, m.remoteCapabilities)
                                n && m.rtpSender && ((y.encodings = m.sendEncodingParameters), (y.rtcp = { cname: f.localCName, compound: m.rtcpParameters.compound }), m.recvEncodingParameters.length && (y.rtcp.ssrc = m.recvEncodingParameters[0].ssrc), m.rtpSender.send(y))
                                w &&
                                    m.rtpReceiver &&
                                    0 < y.codecs.length &&
                                    ('video' === m.kind &&
                                        m.recvEncodingParameters &&
                                        15019 > q &&
                                        m.recvEncodingParameters.forEach(function (A) {
                                            delete A.rtx
                                        }),
                                        (y.encodings = m.recvEncodingParameters.length ? m.recvEncodingParameters : [{}]),
                                        (y.rtcp = { compound: m.rtcpParameters.compound }),
                                        m.rtcpParameters.cname && (y.rtcp.cname = m.rtcpParameters.cname),
                                        m.sendEncodingParameters.length && (y.rtcp.ssrc = m.sendEncodingParameters[0].ssrc),
                                        m.rtpReceiver.receive(y))
                            }
                            u.prototype.setLocalDescription = function (m) {
                                var n = this
                                if (-1 === ['offer', 'answer'].indexOf(m.type)) return Promise.reject(k('TypeError', 'Unsupported type "' + m.type + '"'))
                                if (!g('setLocalDescription', m.type, n.signalingState) || n._isClosed) return Promise.reject(k('InvalidStateError', 'Can not set local ' + m.type + ' in state ' + n.signalingState))
                                if ('offer' === m.type) {
                                    var w = f.splitSections(m.sdp)
                                    var y = w.shift()
                                    w.forEach(function (B, C) {
                                        B = f.parseRtpParameters(B)
                                        n.transceivers[C].localCapabilities = B
                                    })
                                    n.transceivers.forEach(function (B, C) {
                                        n._gather(B.mid, C)
                                    })
                                } else if ('answer' === m.type) {
                                    w = f.splitSections(n._remoteDescription.sdp)
                                    y = w.shift()
                                    var A = 0 < f.matchPrefix(y, 'a=ice-lite').length
                                    w.forEach(function (B, C) {
                                        var F = n.transceivers[C],
                                            L = F.iceGatherer,
                                            E = F.iceTransport,
                                            D = F.dtlsTransport,
                                            H = F.localCapabilities,
                                            I = F.remoteCapabilities
                                        if (!((f.isRejected(B) && 0 === f.matchPrefix(B, 'a=bundle-only').length) || F.rejected)) {
                                            var M = f.getIceParameters(B, y)
                                            B = f.getDtlsParameters(B, y)
                                            A && (B.role = 'server')
                                                ; (n.usingBundle && 0 !== C) || (n._gather(F.mid, C), 'new' === E.state && E.start(L, M, A ? 'controlling' : 'controlled'), 'new' === D.state && D.start(B))
                                            C = l(H, I)
                                            n._transceive(F, 0 < C.codecs.length, !1)
                                        }
                                    })
                                }
                                n._localDescription = { type: m.type, sdp: m.sdp }
                                'offer' === m.type ? n._updateSignalingState('have-local-offer') : n._updateSignalingState('stable')
                                return Promise.resolve()
                            }
                            u.prototype.setRemoteDescription = function (m) {
                                var n = this
                                if (-1 === ['offer', 'answer'].indexOf(m.type)) return Promise.reject(k('TypeError', 'Unsupported type "' + m.type + '"'))
                                if (!g('setRemoteDescription', m.type, n.signalingState) || n._isClosed) return Promise.reject(k('InvalidStateError', 'Can not set remote ' + m.type + ' in state ' + n.signalingState))
                                var w = {}
                                n.remoteStreams.forEach(function (E) {
                                    w[E.id] = E
                                })
                                var y = [],
                                    A = f.splitSections(m.sdp),
                                    B = A.shift(),
                                    C = 0 < f.matchPrefix(B, 'a=ice-lite').length,
                                    F = 0 < f.matchPrefix(B, 'a=group:BUNDLE ').length
                                n.usingBundle = F
                                var L = f.matchPrefix(B, 'a=ice-options:')[0]
                                n.canTrickleIceCandidates = L
                                    ? 0 <=
                                    L.substr(14)
                                        .split(' ')
                                        .indexOf('trickle')
                                    : !1
                                A.forEach(function (E, D) {
                                    var H = f.splitLines(E),
                                        I = f.getKind(E),
                                        M = f.isRejected(E) && 0 === f.matchPrefix(E, 'a=bundle-only').length,
                                        P = H[0].substr(2).split(' ')[2]
                                    H = f.getDirection(E, B)
                                    var J = f.parseMsid(E),
                                        R = f.getMid(E) || f.generateIdentifier()
                                    if (M || ('application' === I && ('DTLS/SCTP' === P || 'UDP/DTLS/SCTP' === P))) n.transceivers[D] = { mid: R, kind: I, protocol: P, rejected: !0 }
                                    else {
                                        !M && n.transceivers[D] && n.transceivers[D].rejected && (n.transceivers[D] = n._createTransceiver(I, !0))
                                        var T = f.parseRtpParameters(E)
                                        if (!M) {
                                            var S = f.getIceParameters(E, B)
                                            var U = f.getDtlsParameters(E, B)
                                            U.role = 'client'
                                        }
                                        P = f.parseRtpEncodingParameters(E)
                                        var V = f.parseRtcpParameters(E),
                                            W = 0 < f.matchPrefix(E, 'a=end-of-candidates', B).length,
                                            Q = f
                                                .matchPrefix(E, 'a=candidate:')
                                                .map(function (K) {
                                                    return f.parseCandidate(K)
                                                })
                                                .filter(function (K) {
                                                    return 1 === K.component
                                                })
                                            ; ('offer' === m.type || 'answer' === m.type) && !M && F && 0 < D && n.transceivers[D] && (n._disposeIceAndDtlsTransports(D), (n.transceivers[D].iceGatherer = n.transceivers[0].iceGatherer), (n.transceivers[D].iceTransport = n.transceivers[0].iceTransport), (n.transceivers[D].dtlsTransport = n.transceivers[0].dtlsTransport), n.transceivers[D].rtpSender && n.transceivers[D].rtpSender.setTransport(n.transceivers[0].dtlsTransport), n.transceivers[D].rtpReceiver && n.transceivers[D].rtpReceiver.setTransport(n.transceivers[0].dtlsTransport))
                                        if ('offer' !== m.type || M)
                                            'answer' !== m.type ||
                                                M ||
                                                ((G = n.transceivers[D]),
                                                    (O = G.iceGatherer),
                                                    (I = G.iceTransport),
                                                    (R = G.dtlsTransport),
                                                    (N = G.rtpReceiver),
                                                    (M = G.sendEncodingParameters),
                                                    (E = G.localCapabilities),
                                                    (n.transceivers[D].recvEncodingParameters = P),
                                                    (n.transceivers[D].remoteCapabilities = T),
                                                    (n.transceivers[D].rtcpParameters = V),
                                                    Q.length &&
                                                    'new' === I.state &&
                                                    ((!C && !W) || (F && 0 !== D)
                                                        ? Q.forEach(function (K) {
                                                            p(G.iceTransport, K)
                                                        })
                                                        : I.setRemoteCandidates(Q)),
                                                    (F && 0 !== D) || ('new' === I.state && I.start(O, S, 'controlling'), 'new' === R.state && R.start(U)),
                                                    !l(G.localCapabilities, G.remoteCapabilities).codecs.filter(function (K) {
                                                        return 'rtx' === K.name.toLowerCase()
                                                    }).length &&
                                                    G.sendEncodingParameters[0].rtx &&
                                                    delete G.sendEncodingParameters[0].rtx,
                                                    n._transceive(G, 'sendrecv' === H || 'recvonly' === H, 'sendrecv' === H || 'sendonly' === H),
                                                    !N || ('sendrecv' !== H && 'sendonly' !== H) ? delete G.rtpReceiver : ((H = N.track), J ? (w[J.stream] || (w[J.stream] = new h.MediaStream()), t(H, w[J.stream]), y.push([H, N, w[J.stream]])) : (w.default || (w.default = new h.MediaStream()), t(H, w.default), y.push([H, N, w.default]))))
                                        else {
                                            var G = n.transceivers[D] || n._createTransceiver(I)
                                            G.mid = R
                                            G.iceGatherer || (G.iceGatherer = n._createIceGatherer(D, F))
                                            Q.length &&
                                                'new' === G.iceTransport.state &&
                                                (!W || (F && 0 !== D)
                                                    ? Q.forEach(function (K) {
                                                        p(G.iceTransport, K)
                                                    })
                                                    : G.iceTransport.setRemoteCandidates(Q))
                                            E = h.RTCRtpReceiver.getCapabilities(I)
                                            15019 > q &&
                                                (E.codecs = E.codecs.filter(function (K) {
                                                    return 'rtx' !== K.name
                                                }))
                                            M = G.sendEncodingParameters || [{ ssrc: 1001 * (2 * D + 2) }]
                                            S = !1
                                            if ('sendrecv' === H || 'sendonly' === H) {
                                                S = !G.rtpReceiver
                                                var N = G.rtpReceiver || new h.RTCRtpReceiver(G.dtlsTransport, I)
                                                if (S) {
                                                    H = N.track
                                                    if (!J || '-' !== J.stream)
                                                        if (J) {
                                                            w[J.stream] ||
                                                                ((w[J.stream] = new h.MediaStream()),
                                                                    Object.defineProperty(w[J.stream], 'id', {
                                                                        get: function () {
                                                                            return J.stream
                                                                        },
                                                                    }))
                                                            Object.defineProperty(H, 'id', {
                                                                get: function () {
                                                                    return J.track
                                                                },
                                                            })
                                                            var O = w[J.stream]
                                                        } else w.default || (w.default = new h.MediaStream()), (O = w.default)
                                                    O && (t(H, O), G.associatedRemoteMediaStreams.push(O))
                                                    y.push([H, N, O])
                                                }
                                            } else
                                                G.rtpReceiver &&
                                                    G.rtpReceiver.track &&
                                                    (G.associatedRemoteMediaStreams.forEach(function (K) {
                                                        var X = K.getTracks().find(function (Y) {
                                                            return Y.id === G.rtpReceiver.track.id
                                                        })
                                                        X && r(X, K)
                                                    }),
                                                        (G.associatedRemoteMediaStreams = []))
                                            G.localCapabilities = E
                                            G.remoteCapabilities = T
                                            G.rtpReceiver = N
                                            G.rtcpParameters = V
                                            G.sendEncodingParameters = M
                                            G.recvEncodingParameters = P
                                            n._transceive(n.transceivers[D], !1, S)
                                        }
                                    }
                                })
                                void 0 === n._dtlsRole && (n._dtlsRole = 'offer' === m.type ? 'active' : 'passive')
                                n._remoteDescription = { type: m.type, sdp: m.sdp }
                                'offer' === m.type ? n._updateSignalingState('have-remote-offer') : n._updateSignalingState('stable')
                                Object.keys(w).forEach(function (E) {
                                    var D = w[E]
                                    if (D.getTracks().length) {
                                        if (-1 === n.remoteStreams.indexOf(D)) {
                                            n.remoteStreams.push(D)
                                            var H = new Event('addstream')
                                            H.stream = D
                                            h.setTimeout(function () {
                                                n._dispatchEvent('addstream', H)
                                            })
                                        }
                                        y.forEach(function (I) {
                                            D.id === I[2].id && x(n, I[0], I[1], [D])
                                        })
                                    }
                                })
                                y.forEach(function (E) {
                                    E[2] || x(n, E[0], E[1], [])
                                })
                                h.setTimeout(function () {
                                    n &&
                                        n.transceivers &&
                                        n.transceivers.forEach(function (E) {
                                            E.iceTransport && 'new' === E.iceTransport.state && 0 < E.iceTransport.getRemoteCandidates().length && (console.warn('Timeout for addRemoteCandidate. Consider sending an end-of-candidates notification'), E.iceTransport.addRemoteCandidate({}))
                                        })
                                }, 4e3)
                                return Promise.resolve()
                            }
                            u.prototype.close = function () {
                                this.transceivers.forEach(function (m) {
                                    m.iceTransport && m.iceTransport.stop()
                                    m.dtlsTransport && m.dtlsTransport.stop()
                                    m.rtpSender && m.rtpSender.stop()
                                    m.rtpReceiver && m.rtpReceiver.stop()
                                })
                                this._isClosed = !0
                                this._updateSignalingState('closed')
                            }
                            u.prototype._updateSignalingState = function (m) {
                                this.signalingState = m
                                m = new Event('signalingstatechange')
                                this._dispatchEvent('signalingstatechange', m)
                            }
                            u.prototype._maybeFireNegotiationNeeded = function () {
                                var m = this
                                'stable' === this.signalingState &&
                                    !0 !== this.needNegotiation &&
                                    ((this.needNegotiation = !0),
                                        h.setTimeout(function () {
                                            if (m.needNegotiation) {
                                                m.needNegotiation = !1
                                                var n = new Event('negotiationneeded')
                                                m._dispatchEvent('negotiationneeded', n)
                                            }
                                        }, 0))
                            }
                            u.prototype._updateIceConnectionState = function () {
                                var m = { new: 0, closed: 0, checking: 0, connected: 0, completed: 0, disconnected: 0, failed: 0 }
                                this.transceivers.forEach(function (w) {
                                    w.iceTransport && !w.rejected && m[w.iceTransport.state]++
                                })
                                var n = 'new'
                                0 < m.failed ? (n = 'failed') : 0 < m.checking ? (n = 'checking') : 0 < m.disconnected ? (n = 'disconnected') : 0 < m.new ? (n = 'new') : 0 < m.connected ? (n = 'connected') : 0 < m.completed && (n = 'completed')
                                n !== this.iceConnectionState && ((this.iceConnectionState = n), (n = new Event('iceconnectionstatechange')), this._dispatchEvent('iceconnectionstatechange', n))
                            }
                            u.prototype._updateConnectionState = function () {
                                var m = { new: 0, closed: 0, connecting: 0, connected: 0, completed: 0, disconnected: 0, failed: 0 }
                                this.transceivers.forEach(function (w) {
                                    w.iceTransport && w.dtlsTransport && !w.rejected && (m[w.iceTransport.state]++, m[w.dtlsTransport.state]++)
                                })
                                m.connected += m.completed
                                var n = 'new'
                                0 < m.failed ? (n = 'failed') : 0 < m.connecting ? (n = 'connecting') : 0 < m.disconnected ? (n = 'disconnected') : 0 < m.new ? (n = 'new') : 0 < m.connected && (n = 'connected')
                                n !== this.connectionState && ((this.connectionState = n), (n = new Event('connectionstatechange')), this._dispatchEvent('connectionstatechange', n))
                            }
                            u.prototype.createOffer = function (m) {
                                var n = this
                                if (n._isClosed) return Promise.reject(k('InvalidStateError', 'Can not call createOffer after close'))
                                var w = n.transceivers.filter(function (B) {
                                    return 'audio' === B.kind
                                }).length,
                                    y = n.transceivers.filter(function (B) {
                                        return 'video' === B.kind
                                    }).length
                                if (m) {
                                    if (m.mandatory || m.optional) throw new TypeError('Legacy mandatory/optional constraints not supported.')
                                    void 0 !== m.offerToReceiveAudio && (w = !0 === m.offerToReceiveAudio ? 1 : !1 === m.offerToReceiveAudio ? 0 : m.offerToReceiveAudio)
                                    void 0 !== m.offerToReceiveVideo && (y = !0 === m.offerToReceiveVideo ? 1 : !1 === m.offerToReceiveVideo ? 0 : m.offerToReceiveVideo)
                                }
                                for (
                                    n.transceivers.forEach(function (B) {
                                        'audio' === B.kind ? (w--, 0 > w && (B.wantReceive = !1)) : 'video' === B.kind && (y--, 0 > y && (B.wantReceive = !1))
                                    });
                                    0 < w || 0 < y;

                                )
                                    0 < w && (n._createTransceiver('audio'), w--), 0 < y && (n._createTransceiver('video'), y--)
                                var A = f.writeSessionBoilerplate(n._sdpSessionId, n._sdpSessionVersion++)
                                n.transceivers.forEach(function (B, C) {
                                    var F = B.track,
                                        L = B.kind,
                                        E = B.mid || f.generateIdentifier()
                                    B.mid = E
                                    B.iceGatherer || (B.iceGatherer = n._createIceGatherer(C, n.usingBundle))
                                    E = h.RTCRtpSender.getCapabilities(L)
                                    15019 > q &&
                                        (E.codecs = E.codecs.filter(function (D) {
                                            return 'rtx' !== D.name
                                        }))
                                    E.codecs.forEach(function (D) {
                                        'H264' === D.name && void 0 === D.parameters['level-asymmetry-allowed'] && (D.parameters['level-asymmetry-allowed'] = '1')
                                        B.remoteCapabilities &&
                                            B.remoteCapabilities.codecs &&
                                            B.remoteCapabilities.codecs.forEach(function (H) {
                                                D.name.toLowerCase() === H.name.toLowerCase() && D.clockRate === H.clockRate && (D.preferredPayloadType = H.payloadType)
                                            })
                                    })
                                    E.headerExtensions.forEach(function (D) {
                                        ; ((B.remoteCapabilities && B.remoteCapabilities.headerExtensions) || []).forEach(function (H) {
                                            D.uri === H.uri && (D.id = H.id)
                                        })
                                    })
                                    C = B.sendEncodingParameters || [{ ssrc: 1001 * (2 * C + 1) }]
                                    F && 15019 <= q && 'video' === L && !C[0].rtx && (C[0].rtx = { ssrc: C[0].ssrc + 1 })
                                    B.wantReceive && (B.rtpReceiver = new h.RTCRtpReceiver(B.dtlsTransport, L))
                                    B.localCapabilities = E
                                    B.sendEncodingParameters = C
                                })
                                'max-compat' !== n._config.bundlePolicy &&
                                    (A +=
                                        'a=group:BUNDLE ' +
                                        n.transceivers
                                            .map(function (B) {
                                                return B.mid
                                            })
                                            .join(' ') +
                                        '\r\n')
                                A += 'a=ice-options:trickle\r\n'
                                n.transceivers.forEach(function (B, C) {
                                    A += e(B, B.localCapabilities, 'offer', B.stream, n._dtlsRole)
                                    A += 'a=rtcp-rsize\r\n'
                                    !B.iceGatherer ||
                                        'new' === n.iceGatheringState ||
                                        (0 !== C && n.usingBundle) ||
                                        (B.iceGatherer.getLocalCandidates().forEach(function (F) {
                                            F.component = 1
                                            A += 'a=' + f.writeCandidate(F) + '\r\n'
                                        }),
                                            'completed' === B.iceGatherer.state && (A += 'a=end-of-candidates\r\n'))
                                })
                                m = new h.RTCSessionDescription({ type: 'offer', sdp: A })
                                return Promise.resolve(m)
                            }
                            u.prototype.createAnswer = function () {
                                var m = this
                                if (m._isClosed) return Promise.reject(k('InvalidStateError', 'Can not call createAnswer after close'))
                                if ('have-remote-offer' !== m.signalingState && 'have-local-pranswer' !== m.signalingState) return Promise.reject(k('InvalidStateError', 'Can not call createAnswer in signalingState ' + m.signalingState))
                                var n = f.writeSessionBoilerplate(m._sdpSessionId, m._sdpSessionVersion++)
                                m.usingBundle &&
                                    (n +=
                                        'a=group:BUNDLE ' +
                                        m.transceivers
                                            .map(function (A) {
                                                return A.mid
                                            })
                                            .join(' ') +
                                        '\r\n')
                                n += 'a=ice-options:trickle\r\n'
                                var w = f.getMediaSections(m._remoteDescription.sdp).length
                                m.transceivers.forEach(function (A, B) {
                                    if (!(B + 1 > w))
                                        if (A.rejected) 'application' === A.kind ? (n = 'DTLS/SCTP' === A.protocol ? n + 'm=application 0 DTLS/SCTP 5000\r\n' : n + ('m=application 0 ' + A.protocol + ' webrtc-datachannel\r\n')) : 'audio' === A.kind ? (n += 'm=audio 0 UDP/TLS/RTP/SAVPF 0\r\na=rtpmap:0 PCMU/8000\r\n') : 'video' === A.kind && (n += 'm=video 0 UDP/TLS/RTP/SAVPF 120\r\na=rtpmap:120 VP8/90000\r\n'), (n += 'c=IN IP4 0.0.0.0\r\na=inactive\r\na=mid:' + A.mid + '\r\n')
                                        else {
                                            if (A.stream) {
                                                var C
                                                'audio' === A.kind ? (C = A.stream.getAudioTracks()[0]) : 'video' === A.kind && (C = A.stream.getVideoTracks()[0])
                                                C && 15019 <= q && 'video' === A.kind && !A.sendEncodingParameters[0].rtx && (A.sendEncodingParameters[0].rtx = { ssrc: A.sendEncodingParameters[0].ssrc + 1 })
                                            }
                                            B = l(A.localCapabilities, A.remoteCapabilities)
                                            !B.codecs.filter(function (F) {
                                                return 'rtx' === F.name.toLowerCase()
                                            }).length &&
                                                A.sendEncodingParameters[0].rtx &&
                                                delete A.sendEncodingParameters[0].rtx
                                            n += e(A, B, 'answer', A.stream, m._dtlsRole)
                                            A.rtcpParameters && A.rtcpParameters.reducedSize && (n += 'a=rtcp-rsize\r\n')
                                        }
                                })
                                var y = new h.RTCSessionDescription({ type: 'answer', sdp: n })
                                return Promise.resolve(y)
                            }
                            u.prototype.addIceCandidate = function (m) {
                                var n = this,
                                    w
                                return m && void 0 === m.sdpMLineIndex && !m.sdpMid
                                    ? Promise.reject(new TypeError('sdpMLineIndex or sdpMid required'))
                                    : new Promise(function (y, A) {
                                        if (n._remoteDescription)
                                            if (m && '' !== m.candidate) {
                                                var B = m.sdpMLineIndex
                                                if (m.sdpMid)
                                                    for (var C = 0; C < n.transceivers.length; C++)
                                                        if (n.transceivers[C].mid === m.sdpMid) {
                                                            B = C
                                                            break
                                                        }
                                                var F = n.transceivers[B]
                                                if (F) {
                                                    if (F.rejected) return y()
                                                    C = 0 < Object.keys(m.candidate).length ? f.parseCandidate(m.candidate) : {}
                                                    if (('tcp' === C.protocol && (0 === C.port || 9 === C.port)) || (C.component && 1 !== C.component)) return y()
                                                    if ((0 === B || (0 < B && F.iceTransport !== n.transceivers[0].iceTransport)) && !p(F.iceTransport, C)) return A(k('OperationError', 'Can not add ICE candidate'))
                                                    A = m.candidate.trim()
                                                    0 === A.indexOf('a=') && (A = A.substr(2))
                                                    w = f.getMediaSections(n._remoteDescription.sdp)
                                                    w[B] += 'a=' + (C.type ? A : 'end-of-candidates') + '\r\n'
                                                    n._remoteDescription.sdp = f.getDescription(n._remoteDescription.sdp) + w.join('')
                                                } else return A(k('OperationError', 'Can not add ICE candidate'))
                                            } else for (B = 0; B < n.transceivers.length && (n.transceivers[B].rejected || (n.transceivers[B].iceTransport.addRemoteCandidate({}), (w = f.getMediaSections(n._remoteDescription.sdp)), (w[B] += 'a=end-of-candidates\r\n'), (n._remoteDescription.sdp = f.getDescription(n._remoteDescription.sdp) + w.join('')), !n.usingBundle)); B++);
                                        else return A(k('InvalidStateError', 'Can not add ICE candidate without a remote description'))
                                        y()
                                    })
                            }
                            u.prototype.getStats = function (m) {
                                if (m && m instanceof h.MediaStreamTrack) {
                                    var n = null
                                    this.transceivers.forEach(function (y) {
                                        y.rtpSender && y.rtpSender.track === m ? (n = y.rtpSender) : y.rtpReceiver && y.rtpReceiver.track === m && (n = y.rtpReceiver)
                                    })
                                    if (!n) throw k('InvalidAccessError', 'Invalid selector.')
                                    return n.getStats()
                                }
                                var w = []
                                this.transceivers.forEach(function (y) {
                                    ;['rtpSender', 'rtpReceiver', 'iceGatherer', 'iceTransport', 'dtlsTransport'].forEach(function (A) {
                                        y[A] && w.push(y[A].getStats())
                                    })
                                })
                                return Promise.all(w).then(function (y) {
                                    var A = new Map()
                                    y.forEach(function (B) {
                                        B.forEach(function (C) {
                                            A.set(C.id, C)
                                        })
                                    })
                                    return A
                                })
                            }
                                ;['RTCRtpSender', 'RTCRtpReceiver', 'RTCIceGatherer', 'RTCIceTransport', 'RTCDtlsTransport'].forEach(function (m) {
                                    if ((m = h[m]) && m.prototype && m.prototype.getStats) {
                                        var n = m.prototype.getStats
                                        m.prototype.getStats = function () {
                                            return n.apply(this).then(function (w) {
                                                var y = new Map()
                                                Object.keys(w).forEach(function (A) {
                                                    var B = w[A]
                                                    w[A].type = { inboundrtp: 'inbound-rtp', outboundrtp: 'outbound-rtp', candidatepair: 'candidate-pair', localcandidate: 'local-candidate', remotecandidate: 'remote-candidate' }[B.type] || B.type
                                                    y.set(A, w[A])
                                                })
                                                return y
                                            })
                                        }
                                    }
                                })
                            var z = ['createOffer', 'createAnswer']
                            z.forEach(function (m) {
                                var n = u.prototype[m]
                                u.prototype[m] = function () {
                                    var w = arguments
                                    return 'function' === typeof w[0] || 'function' === typeof w[1]
                                        ? n.apply(this, [arguments[2]]).then(
                                            function (y) {
                                                'function' === typeof w[0] && w[0].apply(null, [y])
                                            },
                                            function (y) {
                                                'function' === typeof w[1] && w[1].apply(null, [y])
                                            }
                                        )
                                        : n.apply(this, arguments)
                                }
                            })
                            z = ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate']
                            z.forEach(function (m) {
                                var n = u.prototype[m]
                                u.prototype[m] = function () {
                                    var w = arguments
                                    return 'function' === typeof w[1] || 'function' === typeof w[2]
                                        ? n.apply(this, arguments).then(
                                            function () {
                                                'function' === typeof w[1] && w[1].apply(null)
                                            },
                                            function (y) {
                                                'function' === typeof w[2] && w[2].apply(null, [y])
                                            }
                                        )
                                        : n.apply(this, arguments)
                                }
                            })
                                ;['getStats'].forEach(function (m) {
                                    var n = u.prototype[m]
                                    u.prototype[m] = function () {
                                        var w = arguments
                                        return 'function' === typeof w[1]
                                            ? n.apply(this, arguments).then(function () {
                                                'function' === typeof w[1] && w[1].apply(null)
                                            })
                                            : n.apply(this, arguments)
                                    }
                                })
                            return u
                        }
                    },
                    { sdp: 17 },
                ],
                17: [
                    function (a, b, c) {
                        var e = {
                            generateIdentifier: function () {
                                return Math.random()
                                    .toString(36)
                                    .substr(2, 10)
                            },
                        }
                        e.localCName = e.generateIdentifier()
                        e.splitLines = function (d) {
                            return d
                                .trim()
                                .split('\n')
                                .map(function (l) {
                                    return l.trim()
                                })
                        }
                        e.splitSections = function (d) {
                            return d.split('\nm=').map(function (l, g) {
                                return (0 < g ? 'm=' + l : l).trim() + '\r\n'
                            })
                        }
                        e.getDescription = function (d) {
                            return (d = e.splitSections(d)) && d[0]
                        }
                        e.getMediaSections = function (d) {
                            d = e.splitSections(d)
                            d.shift()
                            return d
                        }
                        e.matchPrefix = function (d, l) {
                            return e.splitLines(d).filter(function (g) {
                                return 0 === g.indexOf(l)
                            })
                        }
                        e.parseCandidate = function (d) {
                            d = 0 === d.indexOf('a=candidate:') ? d.substring(12).split(' ') : d.substring(10).split(' ')
                            for (var l = { foundation: d[0], component: parseInt(d[1], 10), protocol: d[2].toLowerCase(), priority: parseInt(d[3], 10), ip: d[4], address: d[4], port: parseInt(d[5], 10), type: d[7] }, g = 8; g < d.length; g += 2)
                                switch (d[g]) {
                                    case 'raddr':
                                        l.relatedAddress = d[g + 1]
                                        break
                                    case 'rport':
                                        l.relatedPort = parseInt(d[g + 1], 10)
                                        break
                                    case 'tcptype':
                                        l.tcpType = d[g + 1]
                                        break
                                    case 'ufrag':
                                        l.ufrag = d[g + 1]
                                        l.usernameFragment = d[g + 1]
                                        break
                                    default:
                                        l[d[g]] = d[g + 1]
                                }
                            return l
                        }
                        e.writeCandidate = function (d) {
                            var l = []
                            l.push(d.foundation)
                            l.push(d.component)
                            l.push(d.protocol.toUpperCase())
                            l.push(d.priority)
                            l.push(d.address || d.ip)
                            l.push(d.port)
                            var g = d.type
                            l.push('typ')
                            l.push(g)
                            'host' !== g && d.relatedAddress && d.relatedPort && (l.push('raddr'), l.push(d.relatedAddress), l.push('rport'), l.push(d.relatedPort))
                            d.tcpType && 'tcp' === d.protocol.toLowerCase() && (l.push('tcptype'), l.push(d.tcpType))
                            if (d.usernameFragment || d.ufrag) l.push('ufrag'), l.push(d.usernameFragment || d.ufrag)
                            return 'candidate:' + l.join(' ')
                        }
                        e.parseIceOptions = function (d) {
                            return d.substr(14).split(' ')
                        }
                        e.parseRtpMap = function (d) {
                            d = d.substr(9).split(' ')
                            var l = { payloadType: parseInt(d.shift(), 10) }
                            d = d[0].split('/')
                            l.name = d[0]
                            l.clockRate = parseInt(d[1], 10)
                            l.channels = 3 === d.length ? parseInt(d[2], 10) : 1
                            l.numChannels = l.channels
                            return l
                        }
                        e.writeRtpMap = function (d) {
                            var l = d.payloadType
                            void 0 !== d.preferredPayloadType && (l = d.preferredPayloadType)
                            var g = d.channels || d.numChannels || 1
                            return 'a=rtpmap:' + l + ' ' + d.name + '/' + d.clockRate + (1 !== g ? '/' + g : '') + '\r\n'
                        }
                        e.parseExtmap = function (d) {
                            d = d.substr(9).split(' ')
                            return { id: parseInt(d[0], 10), direction: 0 < d[0].indexOf('/') ? d[0].split('/')[1] : 'sendrecv', uri: d[1] }
                        }
                        e.writeExtmap = function (d) {
                            return 'a=extmap:' + (d.id || d.preferredId) + (d.direction && 'sendrecv' !== d.direction ? '/' + d.direction : '') + ' ' + d.uri + '\r\n'
                        }
                        e.parseFmtp = function (d) {
                            for (var l = {}, g = d.substr(d.indexOf(' ') + 1).split(';'), p = 0; p < g.length; p++) (d = g[p].trim().split('=')), (l[d[0].trim()] = d[1])
                            return l
                        }
                        e.writeFmtp = function (d) {
                            var l = '',
                                g = d.payloadType
                            void 0 !== d.preferredPayloadType && (g = d.preferredPayloadType)
                            if (d.parameters && Object.keys(d.parameters).length) {
                                var p = []
                                Object.keys(d.parameters).forEach(function (k) {
                                    d.parameters[k] ? p.push(k + '=' + d.parameters[k]) : p.push(k)
                                })
                                l += 'a=fmtp:' + g + ' ' + p.join(';') + '\r\n'
                            }
                            return l
                        }
                        e.parseRtcpFb = function (d) {
                            d = d.substr(d.indexOf(' ') + 1).split(' ')
                            return { type: d.shift(), parameter: d.join(' ') }
                        }
                        e.writeRtcpFb = function (d) {
                            var l = '',
                                g = d.payloadType
                            void 0 !== d.preferredPayloadType && (g = d.preferredPayloadType)
                            d.rtcpFeedback &&
                                d.rtcpFeedback.length &&
                                d.rtcpFeedback.forEach(function (p) {
                                    l += 'a=rtcp-fb:' + g + ' ' + p.type + (p.parameter && p.parameter.length ? ' ' + p.parameter : '') + '\r\n'
                                })
                            return l
                        }
                        e.parseSsrcMedia = function (d) {
                            var l = d.indexOf(' '),
                                g = { ssrc: parseInt(d.substr(7, l - 7), 10) },
                                p = d.indexOf(':', l)
                                ; -1 < p ? ((g.attribute = d.substr(l + 1, p - l - 1)), (g.value = d.substr(p + 1))) : (g.attribute = d.substr(l + 1))
                            return g
                        }
                        e.parseSsrcGroup = function (d) {
                            d = d.substr(13).split(' ')
                            return {
                                semantics: d.shift(),
                                ssrcs: d.map(function (l) {
                                    return parseInt(l, 10)
                                }),
                            }
                        }
                        e.getMid = function (d) {
                            if ((d = e.matchPrefix(d, 'a=mid:')[0])) return d.substr(6)
                        }
                        e.parseFingerprint = function (d) {
                            d = d.substr(14).split(' ')
                            return { algorithm: d[0].toLowerCase(), value: d[1] }
                        }
                        e.getDtlsParameters = function (d, l) {
                            return { role: 'auto', fingerprints: e.matchPrefix(d + l, 'a=fingerprint:').map(e.parseFingerprint) }
                        }
                        e.writeDtlsParameters = function (d, l) {
                            var g = 'a=setup:' + l + '\r\n'
                            d.fingerprints.forEach(function (p) {
                                g += 'a=fingerprint:' + p.algorithm + ' ' + p.value + '\r\n'
                            })
                            return g
                        }
                        e.parseCryptoLine = function (d) {
                            d = d.substr(9).split(' ')
                            return { tag: parseInt(d[0], 10), cryptoSuite: d[1], keyParams: d[2], sessionParams: d.slice(3) }
                        }
                        e.writeCryptoLine = function (d) {
                            return 'a=crypto:' + d.tag + ' ' + d.cryptoSuite + ' ' + ('object' === typeof d.keyParams ? e.writeCryptoKeyParams(d.keyParams) : d.keyParams) + (d.sessionParams ? ' ' + d.sessionParams.join(' ') : '') + '\r\n'
                        }
                        e.parseCryptoKeyParams = function (d) {
                            if (0 !== d.indexOf('inline:')) return null
                            d = d.substr(7).split('|')
                            return {
                                keyMethod: 'inline',
                                keySalt: d[0],
                                lifeTime: d[1],
                                mkiValue: d[2] ? d[2].split(':')[0] : void 0,
                                mkiLength: d[2] ? d[2].split(':')[1] : void 0,
                            }
                        }
                        e.writeCryptoKeyParams = function (d) {
                            return d.keyMethod + ':' + d.keySalt + (d.lifeTime ? '|' + d.lifeTime : '') + (d.mkiValue && d.mkiLength ? '|' + d.mkiValue + ':' + d.mkiLength : '')
                        }
                        e.getCryptoParameters = function (d, l) {
                            return e.matchPrefix(d + l, 'a=crypto:').map(e.parseCryptoLine)
                        }
                        e.getIceParameters = function (d, l) {
                            var g = e.matchPrefix(d + l, 'a=ice-ufrag:')[0]
                            d = e.matchPrefix(d + l, 'a=ice-pwd:')[0]
                            return g && d ? { usernameFragment: g.substr(12), password: d.substr(10) } : null
                        }
                        e.writeIceParameters = function (d) {
                            return 'a=ice-ufrag:' + d.usernameFragment + '\r\na=ice-pwd:' + d.password + '\r\n'
                        }
                        e.parseRtpParameters = function (d) {
                            for (var l = { codecs: [], headerExtensions: [], fecMechanisms: [], rtcp: [] }, g = e.splitLines(d)[0].split(' '), p = 3; p < g.length; p++) {
                                var k = g[p],
                                    f = e.matchPrefix(d, 'a=rtpmap:' + k + ' ')[0]
                                if (f) {
                                    f = e.parseRtpMap(f)
                                    var h = e.matchPrefix(d, 'a=fmtp:' + k + ' ')
                                    f.parameters = h.length ? e.parseFmtp(h[0]) : {}
                                    f.rtcpFeedback = e.matchPrefix(d, 'a=rtcp-fb:' + k + ' ').map(e.parseRtcpFb)
                                    l.codecs.push(f)
                                    switch (f.name.toUpperCase()) {
                                        case 'RED':
                                        case 'ULPFEC':
                                            l.fecMechanisms.push(f.name.toUpperCase())
                                    }
                                }
                            }
                            e.matchPrefix(d, 'a=extmap:').forEach(function (q) {
                                l.headerExtensions.push(e.parseExtmap(q))
                            })
                            return l
                        }
                        e.writeRtpDescription = function (d, l) {
                            var g = ''
                            g += 'm=' + d + ' '
                            g += 0 < l.codecs.length ? '9' : '0'
                            g += ' UDP/TLS/RTP/SAVPF '
                            g +=
                                l.codecs
                                    .map(function (k) {
                                        return void 0 !== k.preferredPayloadType ? k.preferredPayloadType : k.payloadType
                                    })
                                    .join(' ') + '\r\n'
                            g += 'c=IN IP4 0.0.0.0\r\n'
                            g += 'a=rtcp:9 IN IP4 0.0.0.0\r\n'
                            l.codecs.forEach(function (k) {
                                g += e.writeRtpMap(k)
                                g += e.writeFmtp(k)
                                g += e.writeRtcpFb(k)
                            })
                            var p = 0
                            l.codecs.forEach(function (k) {
                                k.maxptime > p && (p = k.maxptime)
                            })
                            0 < p && (g += 'a=maxptime:' + p + '\r\n')
                            g += 'a=rtcp-mux\r\n'
                            l.headerExtensions &&
                                l.headerExtensions.forEach(function (k) {
                                    g += e.writeExtmap(k)
                                })
                            return g
                        }
                        e.parseRtpEncodingParameters = function (d) {
                            var l = [],
                                g = e.parseRtpParameters(d),
                                p = -1 !== g.fecMechanisms.indexOf('RED'),
                                k = -1 !== g.fecMechanisms.indexOf('ULPFEC'),
                                f = e
                                    .matchPrefix(d, 'a=ssrc:')
                                    .map(function (r) {
                                        return e.parseSsrcMedia(r)
                                    })
                                    .filter(function (r) {
                                        return 'cname' === r.attribute
                                    }),
                                h = 0 < f.length && f[0].ssrc,
                                q
                            f = e.matchPrefix(d, 'a=ssrc-group:FID').map(function (r) {
                                return r
                                    .substr(17)
                                    .split(' ')
                                    .map(function (x) {
                                        return parseInt(x, 10)
                                    })
                            })
                            0 < f.length && 1 < f[0].length && f[0][0] === h && (q = f[0][1])
                            g.codecs.forEach(function (r) {
                                'RTX' === r.name.toUpperCase() && r.parameters.apt && ((r = { ssrc: h, codecPayloadType: parseInt(r.parameters.apt, 10) }), h && q && (r.rtx = { ssrc: q }), l.push(r), p && ((r = JSON.parse(JSON.stringify(r))), (r.fec = { ssrc: h, mechanism: k ? 'red+ulpfec' : 'red' }), l.push(r)))
                            })
                            0 === l.length && h && l.push({ ssrc: h })
                            var t = e.matchPrefix(d, 'b=')
                            t.length &&
                                ((t = 0 === t[0].indexOf('b=TIAS:') ? parseInt(t[0].substr(7), 10) : 0 === t[0].indexOf('b=AS:') ? 950 * parseInt(t[0].substr(5), 10) - 16e3 : void 0),
                                    l.forEach(function (r) {
                                        r.maxBitrate = t
                                    }))
                            return l
                        }
                        e.parseRtcpParameters = function (d) {
                            var l = {},
                                g = e
                                    .matchPrefix(d, 'a=ssrc:')
                                    .map(function (p) {
                                        return e.parseSsrcMedia(p)
                                    })
                                    .filter(function (p) {
                                        return 'cname' === p.attribute
                                    })[0]
                            g && ((l.cname = g.value), (l.ssrc = g.ssrc))
                            g = e.matchPrefix(d, 'a=rtcp-rsize')
                            l.reducedSize = 0 < g.length
                            l.compound = 0 === g.length
                            d = e.matchPrefix(d, 'a=rtcp-mux')
                            l.mux = 0 < d.length
                            return l
                        }
                        e.parseMsid = function (d) {
                            var l = e.matchPrefix(d, 'a=msid:')
                            if (1 === l.length) return (d = l[0].substr(7).split(' ')), { stream: d[0], track: d[1] }
                            d = e
                                .matchPrefix(d, 'a=ssrc:')
                                .map(function (g) {
                                    return e.parseSsrcMedia(g)
                                })
                                .filter(function (g) {
                                    return 'msid' === g.attribute
                                })
                            if (0 < d.length) return (d = d[0].value.split(' ')), { stream: d[0], track: d[1] }
                        }
                        e.parseSctpDescription = function (d) {
                            var l = e.parseMLine(d),
                                g = e.matchPrefix(d, 'a=max-message-size:'),
                                p
                            0 < g.length && (p = parseInt(g[0].substr(19), 10))
                            isNaN(p) && (p = 65536)
                            g = e.matchPrefix(d, 'a=sctp-port:')
                            if (0 < g.length) return { port: parseInt(g[0].substr(12), 10), protocol: l.fmt, maxMessageSize: p }
                            if (0 < e.matchPrefix(d, 'a=sctpmap:').length)
                                return (
                                    (d = e
                                        .matchPrefix(d, 'a=sctpmap:')[0]
                                        .substr(10)
                                        .split(' ')),
                                    { port: parseInt(d[0], 10), protocol: d[1], maxMessageSize: p }
                                )
                        }
                        e.writeSctpDescription = function (d, l) {
                            d = 'DTLS/SCTP' !== d.protocol ? ['m=' + d.kind + ' 9 ' + d.protocol + ' ' + l.protocol + '\r\n', 'c=IN IP4 0.0.0.0\r\n', 'a=sctp-port:' + l.port + '\r\n'] : ['m=' + d.kind + ' 9 ' + d.protocol + ' ' + l.port + '\r\n', 'c=IN IP4 0.0.0.0\r\n', 'a=sctpmap:' + l.port + ' ' + l.protocol + ' 65535\r\n']
                            void 0 !== l.maxMessageSize && d.push('a=max-message-size:' + l.maxMessageSize + '\r\n')
                            return d.join('')
                        }
                        e.generateSessionId = function () {
                            return Math.random()
                                .toString()
                                .substr(2, 21)
                        }
                        e.writeSessionBoilerplate = function (d, l, g) {
                            l = void 0 !== l ? l : 2
                            d = d ? d : e.generateSessionId()
                            return 'v=0\r\no=' + (g || 'thisisadapterortc') + ' ' + d + ' ' + l + ' IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n'
                        }
                        e.writeMediaSection = function (d, l, g, p) {
                            l = e.writeRtpDescription(d.kind, l)
                            l += e.writeIceParameters(d.iceGatherer.getLocalParameters())
                            l += e.writeDtlsParameters(d.dtlsTransport.getLocalParameters(), 'offer' === g ? 'actpass' : 'active')
                            l += 'a=mid:' + d.mid + '\r\n'
                            l = d.direction ? l + ('a=' + d.direction + '\r\n') : d.rtpSender && d.rtpReceiver ? l + 'a=sendrecv\r\n' : d.rtpSender ? l + 'a=sendonly\r\n' : d.rtpReceiver ? l + 'a=recvonly\r\n' : l + 'a=inactive\r\n'
                            d.rtpSender && ((g = 'msid:' + p.id + ' ' + d.rtpSender.track.id + '\r\n'), (l = l + ('a=' + g) + ('a=ssrc:' + d.sendEncodingParameters[0].ssrc + ' ' + g)), d.sendEncodingParameters[0].rtx && ((l += 'a=ssrc:' + d.sendEncodingParameters[0].rtx.ssrc + ' ' + g), (l += 'a=ssrc-group:FID ' + d.sendEncodingParameters[0].ssrc + ' ' + d.sendEncodingParameters[0].rtx.ssrc + '\r\n')))
                            l += 'a=ssrc:' + d.sendEncodingParameters[0].ssrc + ' cname:' + e.localCName + '\r\n'
                            d.rtpSender && d.sendEncodingParameters[0].rtx && (l += 'a=ssrc:' + d.sendEncodingParameters[0].rtx.ssrc + ' cname:' + e.localCName + '\r\n')
                            return l
                        }
                        e.getDirection = function (d, l) {
                            d = e.splitLines(d)
                            for (var g = 0; g < d.length; g++)
                                switch (d[g]) {
                                    case 'a=sendrecv':
                                    case 'a=sendonly':
                                    case 'a=recvonly':
                                    case 'a=inactive':
                                        return d[g].substr(2)
                                }
                            return l ? e.getDirection(l) : 'sendrecv'
                        }
                        e.getKind = function (d) {
                            return e
                                .splitLines(d)[0]
                                .split(' ')[0]
                                .substr(2)
                        }
                        e.isRejected = function (d) {
                            return '0' === d.split(' ', 2)[1]
                        }
                        e.parseMLine = function (d) {
                            d = e
                                .splitLines(d)[0]
                                .substr(2)
                                .split(' ')
                            return { kind: d[0], port: parseInt(d[1], 10), protocol: d[2], fmt: d.slice(3).join(' ') }
                        }
                        e.parseOLine = function (d) {
                            d = e
                                .matchPrefix(d, 'o=')[0]
                                .substr(2)
                                .split(' ')
                            return { username: d[0], sessionId: d[1], sessionVersion: parseInt(d[2], 10), netType: d[3], addressType: d[4], address: d[5] }
                        }
                        e.isValidSDP = function (d) {
                            if ('string' !== typeof d || 0 === d.length) return !1
                            d = e.splitLines(d)
                            for (var l = 0; l < d.length; l++) if (2 > d[l].length || '=' !== d[l].charAt(1)) return !1
                            return !0
                        }
                        'object' === typeof b && (b.exports = e)
                    },
                    {},
                ],
            },
            {},
            [1]
        )(1)
    })
var WS_OPEN_STATE = 1,
    MessageType = { IFrameRequest: 0, RequestQualityControl: 1, MaxFpsRequest: 2, AverageBitrateRequest: 3, StartStreaming: 4, StopStreaming: 5, UIInteraction: 50, Command: 51, KeyDown: 60, KeyUp: 61, KeyPress: 62, MouseEnter: 70, MouseLeave: 71, MouseDown: 72, MouseUp: 73, MouseMove: 74, MouseWheel: 75, TouchStart: 80, TouchEnd: 81, TouchMove: 82 },
    SpecialKeyCodes = { BackSpace: 8, Shift: 16, Control: 17, Alt: 18, RightShift: 253, RightControl: 254, RightAlt: 255 },
    MouseButton = {
        MainButton: 0,
        AuxiliaryButton: 1,
        SecondaryButton: 2,
        FourthButton: 3,
        FifthButton: 4,
    },
    MouseButtonsMask = { PrimaryButton: 1, SecondaryButton: 2, AuxiliaryButton: 4, FourthButton: 8, FifthButton: 16 },
    AirCityPlayer = function (a, b) {
        var c = this
        if ('object' == typeof b) {
            var e = b.domId
            var d = b.token
            var l = b.showMarker
            var g = b.showStartupInfo
        } else 1 < arguments.length && 'string' == typeof arguments[1] && (e = arguments[1]), 2 < arguments.length && 'string' == typeof arguments[2] && (d = arguments[2]), 3 < arguments.length && (l = arguments[3]), 4 < arguments.length && (g = arguments[4])
        this.uniqueId = Date.now()
            ; (this.container = e ? document.getElementById(e) : null)
                ? (this.container &&
                    ((this.observer = new (window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver)(function (p) {
                        c.onResize()
                    })),
                        this.observer.observe(this.container, { attributes: !0, attributeFilter: ['style'], attributeOldValue: !0 }),
                        g && ((this.startupInfoPanelVisible = g), this.createStartupInfoPanel()),
                        (this.infoMarkerVisible = l),
                        (this.autoAdjustResolution = !0),
                        (this.fakeMouseWithTouches = !1),
                        (this.lastResizeTime = new Date().getTime()),
                        (this.orientationChangeTimeout = void 0)),
                    (e = a.split('-')),
                    (this.host = 4 == e.length || 3 == e.length ? AirCityPlayer._int2ip(e[0]) + ':' + e[2] : a),
                    this.logStartupInfo('host: ' + this.host),
                    (this.url = 'ws://' + this.host),
                    (this.url = this.container ? this.url + '/api-video' : this.url + '/api'),
                    (this.token = d || ''),
                    setTimeout(
                        function () {
                            this.connect()
                        }.bind(this),
                        200
                    ),
                    (this.isMac = 'Mac68K' == navigator.platform || 'MacPPC' == navigator.platform || 'Macintosh' == navigator.platform || 'MacIntel' == navigator.platform))
                : alert('Invalid container: ' + e + '!')
    }
AirCityPlayer.prototype.sendInputData = function (a) {
    this.dcClient && 'open' == this.dcClient.readyState && this.dcClient.send(a)
}
AirCityPlayer.prototype.onOrientationChange = function (a) {
    clearTimeout(this.orientationChangeTimeout)
    this.orientationChangeTimeout = setTimeout(
        function () {
            this.onResize()
        }.bind(this),
        500
    )
}
AirCityPlayer.prototype.onResize = function (a) {
    this.container && ((this.parentClientRect = this.container.getBoundingClientRect()), this.video && (this.autoAdjustResolution && this.updateVideoStreamSize(), this.setupNormalizeAndQuantize()), (a = this.container.getBoundingClientRect()), this.playerInfoPanelMarker && ((this.playerInfoPanelMarker.style.left = a.left + 10 + 'px'), (this.playerInfoPanelMarker.style.top = a.bottom - 30 + 'px')), this.playerInfoPanel && ((this.playerInfoPanel.style.left = a.left + 10 + 'px'), (this.playerInfoPanel.style.top = a.bottom - 250 + 'px')), this.startupInfoPanel && ((this.startupInfoPanel.style.left = a.left + 'px'), (this.startupInfoPanel.style.top = a.top + 'px'), (this.startupInfoPanel.style.height = a.height - 20 + 'px')))
}
AirCityPlayer.prototype.getVideoSize = function () {
    return { width: this.video.videoWidth, height: this.video.videoHeight }
}
AirCityPlayer.prototype.enableAutoAdjustResolution = function (a) {
    this.autoAdjustResolution = a
}
AirCityPlayer.prototype.setResolution = function (a, b) {
    window.devicePixelRatio && ((a *= window.devicePixelRatio), (b *= window.devicePixelRatio))
    if (3840 < a || 2160 < b) (b = a / b), b >= 3840 / 2160 ? ((a = 3840), (b = 3840 / b)) : ((a = 2160 * b), (b = 2160))
    this.emitDescriptor(MessageType.UIInteraction, { Console: 'setres ' + a + 'x' + b + 'w' })
}
AirCityPlayer.prototype.updateVideoStreamSize = function () {
    1e3 < new Date().getTime() - this.lastResizeTime ? (this.setResolution(this.container.clientWidth, this.container.clientHeight), (this.lastResizeTime = new Date().getTime())) : (clearTimeout(this.resizeTimerId), (this.resizeTimerId = setTimeout(this.updateVideoStreamSize.bind(this), 1e3)))
}
AirCityPlayer.prototype.setupNormalizeAndQuantize = function () {
    var a = this.container.clientHeight / this.container.clientWidth,
        b = this.video.videoHeight / this.video.videoWidth
    if (a > b) {
        var c = a / b
        this.normalizeAndQuantizeUnsigned = function (d, l) {
            d /= this.container.clientWidth
            l = c * (l / this.container.clientHeight - 0.5) + 0.5
            return 0 > d || 1 < d || 0 > l || 1 < l ? { inRange: !1, x: 65535, y: 65535 } : { inRange: !0, x: 65536 * d, y: 65536 * l }
        }.bind(this)
        this.unquantizeAndDenormalizeUnsigned = function (d, l) {
            return {
                x: (d / 65536) * this.container.clientWidth,
                y: ((l / 65536 - 0.5) / c + 0.5) * this.container.clientHeight,
            }
        }.bind(this)
        this.normalizeAndQuantizeSigned = function (d, l) {
            return { x: (d / (0.5 * this.container.clientWidth)) * 32767, y: ((c * l) / (0.5 * this.container.clientHeight)) * 32767 }
        }.bind(this)
    } else {
        var e = b / a
        this.normalizeAndQuantizeUnsigned = function (d, l) {
            d = e * (d / this.container.clientWidth - 0.5) + 0.5
            l /= this.container.clientHeight
            return 0 > d || 1 < d || 0 > l || 1 < l ? { inRange: !1, x: 65535, y: 65535 } : { inRange: !0, x: 65536 * d, y: 65536 * l }
        }.bind(this)
        this.unquantizeAndDenormalizeUnsigned = function (d, l) {
            return {
                x: ((d / 65536 - 0.5) / e + 0.5) * this.container.clientWidth,
                y: (l / 65536) * this.container.clientHeight,
            }
        }.bind(this)
        this.normalizeAndQuantizeSigned = function (d, l) {
            return { x: ((e * d) / (0.5 * this.container.clientWidth)) * 32767, y: (l / (0.5 * this.container.clientHeight)) * 32767 }
        }.bind(this)
    }
}
AirCityPlayer.prototype.emitDescriptor = function (a, b) {
    b = JSON.stringify(b)
    var c = new DataView(new ArrayBuffer(3 + 2 * b.length)),
        e = 0
    c.setUint8(e, a)
    e++
    c.setUint16(e, b.length, !0)
    e += 2
    for (a = 0; a < b.length; a++) c.setUint16(e, b.charCodeAt(a), !0), (e += 2)
    this.sendInputData(c.buffer)
}
AirCityPlayer.prototype.emitMouseMove = function (a, b, c, e) {
    a = this.normalizeAndQuantizeUnsigned(a, b)
    c = this.normalizeAndQuantizeSigned(c, e)
    e = new DataView(new ArrayBuffer(9))
    e.setUint8(0, MessageType.MouseMove)
    e.setUint16(1, a.x, !0)
    e.setUint16(3, a.y, !0)
    e.setInt16(5, c.x, !0)
    e.setInt16(7, c.y, !0)
    this.sendInputData(e.buffer)
}
AirCityPlayer.prototype.emitMouseDown = function (a, b, c) {
    b = this.normalizeAndQuantizeUnsigned(b, c)
    c = new DataView(new ArrayBuffer(6))
    c.setUint8(0, MessageType.MouseDown)
    c.setUint8(1, a)
    c.setUint16(2, b.x, !0)
    c.setUint16(4, b.y, !0)
    this.sendInputData(c.buffer)
}
AirCityPlayer.prototype.emitMouseUp = function (a, b, c) {
    b = this.normalizeAndQuantizeUnsigned(b, c)
    c = new DataView(new ArrayBuffer(6))
    c.setUint8(0, MessageType.MouseUp)
    c.setUint8(1, a)
    c.setUint16(2, b.x, !0)
    c.setUint16(4, b.y, !0)
    this.sendInputData(c.buffer)
}
AirCityPlayer.prototype.emitMouseWheel = function (a, b, c) {
    b = this.normalizeAndQuantizeUnsigned(b, c)
    c = new DataView(new ArrayBuffer(7))
    c.setUint8(0, MessageType.MouseWheel)
    c.setInt16(1, a, !0)
    c.setUint16(3, b.x, !0)
    c.setUint16(5, b.y, !0)
    this.sendInputData(c.buffer)
}
AirCityPlayer.prototype.releaseMouseButtons = function (a, b, c) {
    a & MouseButtonsMask.PrimaryButton && this.emitMouseUp(MouseButton.MainButton, b, c)
    a & MouseButtonsMask.SecondaryButton && this.emitMouseUp(MouseButton.SecondaryButton, b, c)
    a & MouseButtonsMask.AuxiliaryButton && this.emitMouseUp(MouseButton.AuxiliaryButton, b, c)
    a & MouseButtonsMask.FourthButton && this.emitMouseUp(MouseButton.FourthButton, b, c)
    a & MouseButtonsMask.FifthButton && this.emitMouseUp(MouseButton.FifthButton, b, c)
}
AirCityPlayer.prototype.pressMouseButtons = function (a, b, c) {

    a & MouseButtonsMask.PrimaryButton && this.emitMouseDown(MouseButton.MainButton, b, c)
    a & MouseButtonsMask.SecondaryButton && this.emitMouseDown(MouseButton.SecondaryButton, b, c)
    a & MouseButtonsMask.AuxiliaryButton && this.emitMouseDown(MouseButton.AuxiliaryButton, b, c)
    a & MouseButtonsMask.FourthButton && this.emitMouseDown(MouseButton.FourthButton, b, c)
    a & MouseButtonsMask.FifthButton && this.emitMouseDown(MouseButton.FifthButton, b, c)
}
AirCityPlayer.prototype.setCursor = function (a) {
    this && this.container && (this.container.style.cursor = a || 'url("cursors/point.cur"),auto')
}
AirCityPlayer.prototype.getKeyCode = function (a) {
    return a.keyCode === SpecialKeyCodes.Shift && 'ShiftRight' === a.code ? SpecialKeyCodes.RightShift : a.keyCode === SpecialKeyCodes.Control && 'ControlRight' === a.code ? SpecialKeyCodes.RightControl : a.keyCode === SpecialKeyCodes.Alt && 'AltRight' === a.code ? SpecialKeyCodes.RightAlt : a.keyCode
}
AirCityPlayer.prototype.isFKey = function (a) {
    return 112 <= a.keyCode && 123 >= a.keyCode
}
AirCityPlayer.prototype.registerKeyboardEvents = function () {
    document.onkeydown = function (a) {
        this.isFKey(a) || a.ctrlKey || this.sendInputData(new Uint8Array([MessageType.KeyDown, this.getKeyCode(a), a.repeat]).buffer)
        if (a.keyCode === SpecialKeyCodes.BackSpace) document.onkeypress({ charCode: SpecialKeyCodes.BackSpace })
    }.bind(this)
    document.onkeyup = function (a) {
        this.isFKey(a) || a.ctrlKey || this.sendInputData(new Uint8Array([MessageType.KeyUp, this.getKeyCode(a)]).buffer)
    }.bind(this)
    document.onkeypress = function (a) {
        if (!this.isFKey(a)) {
            var b = new DataView(new ArrayBuffer(3))
            b.setUint8(0, MessageType.KeyPress)
            b.setUint16(1, a.charCode, !0)
            this.sendInputData(b.buffer)
        }
    }.bind(this)
}
AirCityPlayer.prototype.registerMouseEvents = function () {
    this.container.onmouseenter = function (a) {
        var b = new DataView(new ArrayBuffer(1))
        b.setUint8(0, MessageType.MouseEnter)
        this.sendInputData(b.buffer)
        this.container.pressMouseButtons(a)
    }.bind(this)
    this.container.onmouseleave = function (a) {
        var b = new DataView(new ArrayBuffer(1))
        b.setUint8(0, MessageType.MouseLeave)
        this.sendInputData(b.buffer)
        this.container.releaseMouseButtons(a)
    }.bind(this)
    this.container.onmousemove = function (a) {
        switch (this.mouseDownButton) {
            case MouseButton.MainButton:
                this.setCursor('url("cursors/pan.cur"),auto')
                break
            case MouseButton.AuxiliaryButton:
                this.setCursor('move')
                break
            case MouseButton.SecondaryButton:
                this.setCursor('url("cursors/rotate.cur"),auto')
                break
            default:
                this.setCursor()
        }
        this.emitMouseMove(a.offsetX, a.offsetY, a.movementX, a.movementY)
        a.preventDefault()
    }.bind(this)
    this.container.onmousedown = function (a) {
        this.mouseDownButton = a.button
        this.emitMouseDown(a.button, a.offsetX, a.offsetY)
        a.preventDefault()
    }.bind(this)
    this.container.onmouseup = function (a) {
        this.mouseDownButton = void 0
        this.emitMouseUp(a.button, a.offsetX, a.offsetY)
        a.preventDefault()
    }.bind(this)
    this.container.oncontextmenu = function (a) {

        this.isMac || this.emitMouseUp(a.button, a.offsetX, a.offsetY)
        a.preventDefault()
    }.bind(this)
    'onmousewheel' in this.container
        ? (this.container.onmousewheel = function (a) {
            this.emitMouseWheel(a.wheelDelta, a.offsetX, a.offsetY)
            a.preventDefault()
        }.bind(this))
        : this.container.addEventListener(
            'DOMMouseScroll',
            function (a) {
                this.emitMouseWheel(-120 * a.detail, a.offsetX, a.offsetY)
                a.preventDefault()
            }.bind(this),
            !1
        )
    this.container.pressMouseButtons = function (a) {
        this.pressMouseButtons(a.buttons, a.offsetX, a.offsetY)
    }.bind(this)
    this.container.releaseMouseButtons = function (a) {
        this.releaseMouseButtons(a.buttons, a.offsetX, a.offsetY)
    }.bind(this)
}
AirCityPlayer.prototype.registerTouchEvents = function () {
    this.fingers = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
    this.fingerIds = {}
    this.rememberTouch = function (b) {
        var c = this.fingers.pop()
        this.fingerIds[b.identifier] = c
    }
    this.forgetTouch = function (b) {
        this.fingers.push(this.fingerIds[b.identifier])
        delete this.fingerIds[b.identifier]
    }
    this.emitTouchData = function (b, c) {
        var e = new DataView(new ArrayBuffer(2 + 6 * c.length))
        e.setUint8(0, b)
        e.setUint8(1, c.length)
        b = 2
        for (var d = 0; d < c.length; d++) {
            var l = c[d],
                g = this.normalizeAndQuantizeUnsigned(l.clientX - this.container.offsetLeft, l.clientY - this.container.offsetTop)
            e.setUint16(b, g.x, !0)
            b += 2
            e.setUint16(b, g.y, !0)
            b += 2
            e.setUint8(b, this.fingerIds[l.identifier], !0)
            b += 1
            e.setUint8(b, 255 * l.force, !0)
            b += 1
        }
        this.sendInputData(e.buffer)
    }.bind(this)
    if (this.fakeMouseWithTouches) {
        var a = void 0
        this.container.ontouchstart = function (b) {
            if (void 0 === a) {
                var c = b.changedTouches[0]
                a = { id: c.identifier, x: c.clientX - this.parentClientRect.left, y: c.clientY - this.parentClientRect.top }
                this.container.onmouseenter(b)
                this.emitMouseDown(MouseButton.MainButton, a.x, a.y)
            }
            b.preventDefault()
        }.bind(this)
        this.container.ontouchend = function (b) {
            for (var c = 0; c < b.changedTouches.length; c++) {
                var e = b.changedTouches[c]
                if (e.identifier === a.id) {
                    this.emitMouseUp(MouseButton.MainButton, e.clientX - this.parentClientRect.left, e.clientY - this.parentClientRect.top)
                    this.container.onmouseleave(b)
                    a = void 0
                    break
                }
            }
            b.preventDefault()
        }.bind(this)
        this.container.ontouchmove = function (b) {
            for (var c = 0; c < b.touches.length; c++) {
                var e = b.touches[c]
                if (e.identifier === a.id) {
                    c = e.clientX - this.parentClientRect.left
                    e = e.clientY - this.parentClientRect.top
                    this.emitMouseMove(c, e, c - a.x, e - a.y)
                    a.x = c
                    a.y = e
                    break
                }
            }
            b.preventDefault()
        }.bind(this)
    } else
        (this.container.ontouchstart = function (b) {
            for (var c = 0; c < b.changedTouches.length; c++) this.rememberTouch(b.changedTouches[c])
            this.emitTouchData(MessageType.TouchStart, b.changedTouches)
            b.preventDefault()
        }.bind(this)),
            (this.container.ontouchend = function (b) {
                this.emitTouchData(MessageType.TouchEnd, b.changedTouches)
                for (var c = 0; c < b.changedTouches.length; c++) this.forgetTouch(b.changedTouches[c])
                b.preventDefault()
            }.bind(this)),
            (this.container.ontouchmove = function (b) {
                this.emitTouchData(MessageType.TouchMove, b.touches)
                b.preventDefault()
            }.bind(this))
}
AirCityPlayer.prototype.createStartupInfoPanel = function () {
    var a = '\n            #startupInfoPanel_' + this.uniqueId + ' {\n                position: absolute;\n                left: 0px;\n                top: 0px;\n                width: 350px;\n                background-color: transparent !important;\n                text-shadow: black 0.1em 0.1em 0.2em;\n                color: white;\n                font-family: Verdana;\n                font-size: 12px !important;\n                overflow: auto;\n            }\n        ',
        b = document.createElement('style')
    b.type = 'text/css'
    try {
        b.appendChild(document.createTextNode(a))
    } catch (c) {
        b.styleSheet.cssText = a
    }
    document.getElementsByTagName('head')[0].appendChild(b)
    this.startupInfoPanel = document.createElement('pre')
    this.startupInfoPanel.id = 'startupInfoPanel_' + this.uniqueId
    this.startupInfoPanel.oncontextmenu = new Function('return false')
    this.startupInfoPanel.onselectstart = new Function('return false')
    document.body.appendChild(this.startupInfoPanel)
    this.onResize()
}
AirCityPlayer.prototype.showStartupInfoPanel = function () {
    this.startupInfoPanel && ((this.startupInfoPanel.innerText = ''), (this.startupInfoPanel.style.display = 'block'))
}
AirCityPlayer.prototype.hideStartupInfoPanel = function () {
    this.startupInfoPanel && (this.startupInfoPanel.style.display = 'none')
}
AirCityPlayer.prototype.logStartupInfo = function (a) {
    this.startupInfoPanel && ((this.startupInfoPanel.innerText += a + '\n'), (this.startupInfoPanel.scrollTop = this.startupInfoPanel.scrollHeight + 100))
}
AirCityPlayer.prototype.createPlayerInfoMarker = function () {
    if (!this.playerInfoPanelMarker) {
        var a =
            '\n            #playerInfoPanel_' +
            this.uniqueId +
            ' {\n                position: absolute;\n                left: 100px;\n                top: 100px;\n                width: 180px;\n                height: 195px;\n                background-color: rgba(50,50,50, 0.75);\n                color: #00FF00;\n                padding-top: 10px;\n                padding-left: 10px;\n                font-family: Verdana;\n                font-size: 10px;\n                box-shadow: 0px 0px 10px 5px rgba(255,255,255,0.9); \n                -moz-border-radius:8px;/*8px\u662f\u5706\u89d2\u7684\u89d2\u5ea6\uff0c\u503c\u8d8a\u5927\u5219\u5706\u89d2\u6548\u679c\u8d8a\u660e\u663e\uff0c\u5982\u679c\u4fee\u6539\u6b64\u9879\uff0c\u8bf7\u4fee\u6539\u4ee5\u4e0b\u4e24\u9879\u7684\u503c\uff0c\u4f7f\u4e4b\u76f8\u540c*/\n                -webkit-border-radius:8px;\n            }\n            #playerInfoPanelMarker_' +
            this.uniqueId +
            ' {\n                position: absolute;\n                color: white; \n                text-shadow: black 0.1em 0.1em 0.2em;\n                font-family: \u5b8b\u4f53;\n                font-size: 10px;\n                text-decoration: none;\n            }\n            #playerInfoPanelMarker_' +
            this.uniqueId +
            ':hover{\n                color:rgb(0,255,0);\n            }\n            #startupInfoPanel_' +
            this.uniqueId +
            ' {\n                position: absolute;\n                background-color: transparent;\n                text-shadow: black 0.1em 0.1em 0.2em;\n                color: white;\n                font-family: Verdana;\n                font-size: 14px;\n            }\n        ',
            b = document.createElement('style')
        b.type = 'text/css'
        try {
            b.appendChild(document.createTextNode(a))
        } catch (c) {
            b.styleSheet.cssText = a
        }
        document.getElementsByTagName('head')[0].appendChild(b)
        this.playerInfoPanelMarker = document.createElement('span')
        this.playerInfoPanelMarker.id = 'playerInfoPanelMarker_' + this.uniqueId
        this.playerInfoPanelMarker.style.cursor = 'pointer'
        this.playerInfoPanelMarker.onselectstart = new Function('return false')
        this.playerInfoPanelMarker.onclick = this.showHideInfoPanel.bind(this)
        this.playerInfoPanelMarker.innerText = '\uff0b\u663e\u793a\u4fe1\u606f'
        document.body.appendChild(this.playerInfoPanelMarker)
    }
}
AirCityPlayer.prototype.showHideInfoPanel = function () {
    this.playerInfoPanel ? ('none' == this.playerInfoPanel.style.display ? (this.updateKickButton(), (this.playerInfoPanel.style.display = 'block'), (this.isInfoPanelVisible = !0), this.onResize(), (this.playerInfoPanelMarker.innerText = '\uff0d\u9690\u85cf\u4fe1\u606f')) : ((this.isInfoPanelVisible = !1), (this.playerInfoPanel.style.display = 'none'), (this.playerInfoPanelMarker.innerText = '\uff0b\u663e\u793a\u4fe1\u606f'))) : (this.createPlayerInfoPanel(), (this.isInfoPanelVisible = !0), this.onResize(), (this.playerInfoPanelMarker.innerText = '\uff0d\u9690\u85cf\u4fe1\u606f'), this.updateKickButton())
}
AirCityPlayer.prototype.createPlayerInfoPanel = function () {
    if (!this.playerInfoPanel) {
        var a =
            '\n            <table border="0">\n                <tbody>\n                    <tr>\n                        <td width="53%" align="right">\u8fde\u63a5\u4e2a\u6570\uff1a</td>\n                        <td width="47%" id="playerInfoConnectionCount_' +
            this.uniqueId +
            '"></td>\n                    </tr>\n                    <tr>\n                        <td width="53%" align="right">\u8fd0\u884c\u65f6\u957f\uff1a</td>\n                        <td width="47%" id="playerInfoDuration_' +
            this.uniqueId +
            '"></td>\n                    </tr>\n                    <tr>\n                        <td align="right">\u5206\u8fa8\u7387\uff1a</td>\n                        <td id="playerInfoResolution_' +
            this.uniqueId +
            '"></td>\n                    </tr>\n                    <tr>\n                        <td align="right">\u63a5\u6536\u6570\u636e\uff1a</td>\n                        <td id="playerInfoReceived_' +
            this.uniqueId +
            '"></td>\n                    </tr>\n                    <tr>\n                        <td align="right">\u89e3\u538b\u5e27\u6570\uff1a</td>\n                        <td id="playerInfoFramesDecoded_' +
            this.uniqueId +
            '"></td>\n                    </tr>\n                    <tr>\n                        <td align="right">\u4e22\u5305\u6570\u91cf\uff1a</td>\n                        <td id="playerInfoPacketsLost_' +
            this.uniqueId +
            '"></td>\n                    </tr>\n                    <tr>\n                        <td align="right">\u7801\u7387(kb/s)\uff1a</td>\n                        <td id="playerInfoBitrate_' +
            this.uniqueId +
            '"></td>\n                    </tr>\n                    <tr>\n                        <td align="right">\u5e27\u901f\u7387\uff1a</td>\n                        <td id="playerInfoFramerate_' +
            this.uniqueId +
            '"></td>\n                    </tr>\n                    <tr>\n                        <td align="right">\u4e22\u5e27\uff1a</td>\n                        <td id="playerInfoFramesDropped_' +
            this.uniqueId +
            '"></td>\n                    </tr>\n                </tbody>\n            </table>\n        '
        this.playerInfoPanel = document.createElement('div')
        this.playerInfoPanel.innerHTML = a
        this.playerInfoPanel.id = 'playerInfoPanel_' + this.uniqueId
        document.body.appendChild(this.playerInfoPanel)
    }
}
AirCityPlayer.prototype.updateKickButton = function (a) {
    void 0 != a && (this.playersCount = a)
    if ((a = document.getElementById('playerInfoConnectionCount_' + this.uniqueId))) a.innerText = this.playersCount
    this.autoAdjustResolution && (this.enableAutoAdjustResolution(1 == this.playersCount), this.onResize())
}
AirCityPlayer.prototype.generateAggregatedStats = function (a) {
    var b = {}
    a.forEach(
        function (h) {
            'inbound-rtp' != h.type ||
                h.isRemote ||
                ('video' != h.mediaType && !h.id.toLowerCase().includes('video')) ||
                ((b.timestamp = h.timestamp),
                    (b.bytesReceived = h.bytesReceived),
                    (b.framesDecoded = h.framesDecoded),
                    (b.packetsLost = h.packetsLost),
                    (b.bytesReceivedStart = this.stats && this.stats.bytesReceivedStart ? this.stats.bytesReceivedStart : h.bytesReceived),
                    (b.framesDecodedStart = this.stats && this.stats.framesDecodedStart ? this.stats.framesDecodedStart : h.framesDecoded),
                    (b.timestampStart = this.stats && this.stats.timestampStart ? this.stats.timestampStart : h.timestamp),
                    this.stats &&
                    this.stats.timestamp &&
                    (this.stats.bytesReceived && ((b.bitrate = (8 * (b.bytesReceived - this.stats.bytesReceived)) / (b.timestamp - this.stats.timestamp)), (b.bitrate = Math.floor(b.bitrate)), (b.lowBitrate = this.stats.lowBitrate && this.stats.lowBitrate < b.bitrate ? this.stats.lowBitrate : b.bitrate), (b.highBitrate = this.stats.highBitrate && this.stats.highBitrate > b.bitrate ? this.stats.highBitrate : b.bitrate)),
                        this.stats.bytesReceivedStart && ((b.avgBitrate = (8 * (b.bytesReceived - this.stats.bytesReceivedStart)) / (b.timestamp - this.stats.timestampStart)), (b.avgBitrate = Math.floor(b.avgBitrate))),
                        this.stats.framesDecoded && ((b.framerate = (b.framesDecoded - this.stats.framesDecoded) / ((b.timestamp - this.stats.timestamp) / 1e3)), (b.framerate = Math.floor(b.framerate)), (b.lowFramerate = this.stats.lowFramerate && this.stats.lowFramerate < b.framerate ? this.stats.lowFramerate : b.framerate), (b.highFramerate = this.stats.highFramerate && this.stats.highFramerate > b.framerate ? this.stats.highFramerate : b.framerate)),
                        this.stats.framesDecodedStart && ((b.avgframerate = (b.framesDecoded - this.stats.framesDecodedStart) / ((b.timestamp - this.stats.timestampStart) / 1e3)), (b.avgframerate = Math.floor(b.avgframerate)))))
            'track' == h.type && h.frameWidth && ((b.framesDropped = h.framesDropped), (b.framesReceived = h.framesReceived), (b.framesDroppedPercentage = (h.framesDropped / h.framesReceived) * 100), (b.frameHeight = h.frameHeight), (b.frameWidth = h.frameWidth), (b.frameHeightStart = this.stats && this.stats.frameHeightStart ? this.stats.frameHeightStart : h.frameHeight), (b.frameWidthStart = this.stats && this.stats.frameWidthStart ? this.stats.frameWidthStart : h.frameWidth))
            'candidate-pair' == h.type && h.hasOwnProperty('currentRoundTripTime') && 0 != h.currentRoundTripTime && (b.currentRoundTripTime = h.currentRoundTripTime)
        }.bind(this)
    )
    this.stats = b
    1e5 < (this.stats.hasOwnProperty('bytesReceived') ? this.stats.bytesReceived : 0) && this.hideStartupInfoPanel()
    if (this.isInfoPanelVisible) {
        a = new Intl.NumberFormat(window.navigator.language, { maximumFractionDigits: 0 })
        for (var c = new Intl.NumberFormat(window.navigator.language, { maximumFractionDigits: 0, minimumIntegerDigits: 2 }), e = (this.stats.timestamp - this.stats.timestampStart) / 1e3, d = [], l = [60, 60], g = 0; g < l.length; g++) d.push(e % l[g]), (e /= l[g])
        d.push(e)
        e = d[0]
        l = Math.floor(d[1])
        d = Math.floor([d[2]])
        g = 'B'
        for (var p = this.stats.hasOwnProperty('bytesReceived') ? this.stats.bytesReceived : 0, k = ['kB', 'MB', 'GB'], f = 0; f < k.length && !(1e5 > p); f++) (p /= 1e3), (g = k[f])
        document.getElementById('playerInfoDuration_' + this.uniqueId).innerText = c.format(d) + ':' + c.format(l) + ':' + c.format(e)
        document.getElementById('playerInfoResolution_' + this.uniqueId).innerText = this.stats.hasOwnProperty('frameWidth') && this.stats.frameWidth && this.stats.hasOwnProperty('frameHeight') && this.stats.frameHeight ? this.stats.frameWidth + 'x' + this.stats.frameHeight : 'N/A'
        document.getElementById('playerInfoReceived_' + this.uniqueId).innerText = a.format(p) + ' ' + g
        document.getElementById('playerInfoFramesDecoded_' + this.uniqueId).innerText = '' + (this.stats.hasOwnProperty('framesDecoded') ? a.format(this.stats.framesDecoded) : 'N/A')
        document.getElementById('playerInfoPacketsLost_' + this.uniqueId).innerText = '' + (this.stats.hasOwnProperty('packetsLost') ? a.format(this.stats.packetsLost) : 'N/A')
        document.getElementById('playerInfoBitrate_' + this.uniqueId).innerText = '' + (this.stats.hasOwnProperty('bitrate') ? a.format(this.stats.bitrate) : 'N/A')
        document.getElementById('playerInfoFramerate_' + this.uniqueId).innerText = '' + (this.stats.hasOwnProperty('framerate') ? a.format(this.stats.framerate) : 'N/A')
        document.getElementById('playerInfoFramesDropped_' + this.uniqueId).innerText = '' + (this.stats.hasOwnProperty('framesDropped') ? a.format(this.stats.framesDropped) : 'N/A')
    }
}
AirCityPlayer.prototype.initWebRTCVars = function (a) {
    a = a || {}
    this.webRtcConfig = a.peerConnectionOptions || {}
    this.webRtcConfig.sdpSemantics = 'unified-plan'
    this.tnClient = this.dcClient = this.pcClient = null
    this.sdpConstraints = { offerToReceiveAudio: 0, offerToReceiveVideo: 1 }
    this.dataChannelOptions = { ordered: !0 }
    this.stats = {}
}
AirCityPlayer.prototype.closeWebRTC = function () {
    this.pcClient && (this.pcClient.close(), (this.pcClient = null))
    this.aggregateStatsIntervalId && clearInterval(this.aggregateStatsIntervalId)
}
AirCityPlayer.prototype.setBitrate = function (a) {
    this.maxBitrate = a
}
AirCityPlayer.prototype.refreshWebRTCState = function () {
    this.signalingState != this.pcClient.signalingState && ((this.signalingState = this.pcClient.signalingState), this.logStartupInfo('---signalingState: ' + this.signalingState))
    this.iceConnectionState != this.pcClient.iceConnectionState && ((this.iceConnectionState = this.pcClient.iceConnectionState), this.logStartupInfo('---iceConnectionState: ' + this.iceConnectionState), 'disconnected' == this.iceConnectionState && this.logStartupInfo('\u8fde\u63a5\u5efa\u7acb\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u670d\u52a1\u5668\u7aef\u53e3\u8bbe\u7f6e'))
    this.iceGatheringState != this.pcClient.iceGatheringState && ((this.iceGatheringState = this.pcClient.iceGatheringState), this.logStartupInfo('---iceGatheringState: ' + this.iceGatheringState))
}
AirCityPlayer.prototype.setupWebRTCConnection = function () {
    this.closeWebRTC()
    this.pcClient = new RTCPeerConnection(this.webRtcConfig)
    this.pcClient.onsignalingstatechange = function (b) {
        this.refreshWebRTCState()
    }.bind(this)
    this.pcClient.oniceconnectionstatechange = function (b) {
        this.refreshWebRTCState()
    }.bind(this)
    this.pcClient.onicegatheringstatechange = function (b) {
        this.refreshWebRTCState()
    }.bind(this)
    this.pcClient.ontrack = function (b) {
        this.video.srcObject !== b.streams[0] && (this.video.srcObject = b.streams[0])
    }.bind(this)
    this.pcClient.onicecandidate = function (b) {
        b.candidate && b.candidate.candidate && this.ws && this.ws.readyState === WS_OPEN_STATE && this.ws.send(JSON.stringify({ type: 'iceCandidate', candidate: b.candidate }))
    }.bind(this)
    try {
        var a = this.pcClient.createDataChannel('cirrus', this.dataChannelOptions)
        this.logStartupInfo('created data channel')
        a.onopen = function (b) {
            this.logStartupInfo('data channel connected')
            this.video.play()
            this.logStartupInfo('connected, waiting for video...')
        }.bind(this)
        a.onclose = function (b) {
            this.logStartupInfo('data channel closed')
        }.bind(this)
        a.onmessage = function (b) { }.bind(this)
        this.dcClient = a
    } catch (b) {
        this.logStartupInfo('no data channel!'), (this.dcClient = null)
    }
    this.pcClient.createOffer(this.sdpConstraints).then(
        function (b) {
            this.pcClient.setLocalDescription(b)
            b.sdp = b.sdp.replace(/(a=fmtp:\d+ .*level-asymmetry-allowed=.*)\r\n/gm, '$1;x-google-start-bitrate=15000;x-google-max-bitrate=' + (this.maxBitrate || 3e4) + '\r\n')
            b.sdp = b.sdp.replace('a=extmap-allow-mixed\r\n', '')
            this.ws && this.ws.readyState === WS_OPEN_STATE && ((b = JSON.stringify(b)), this.ws.send(b))
        }.bind(this),
        function () {
            this.logStartupInfo("couldn't create offer")
        }.bind(this)
    )
}
AirCityPlayer.prototype.onConfig = function (a) {
    this.logStartupInfo('create video element')
    this.video = document.createElement('video')
    this.video.id = 'streamingVideo_' + this.uniqueId
    this.video.style = 'width: 100%;height: 100%;'
    this.video.playsInline = !0
    this.video.muted = !0
    this.video.addEventListener(
        'loadedmetadata',
        function (b) {
            this.ws && this.ws.readyState === WS_OPEN_STATE && (this.container.onmouseenter({ button: 0, x: 0, y: 0 }), this.infoMarkerVisible && this.createPlayerInfoMarker(), this.onResize())
        }.bind(this),
        !0
    )
    this.container.appendChild(this.video)
    this.initWebRTCVars({ peerConnectionOptions: a.peerConnectionOptions })
    this.logStartupInfo('setting up...')
    this.setupWebRTCConnection()
    this.onResize()
    this.logStartupInfo('register events')
    this.registerKeyboardEvents()
    this.registerMouseEvents()
    this.registerTouchEvents()
}
AirCityPlayer.prototype.connect = function () {
    window.WebSocket = window.WebSocket || window.MozWebSocket
    window.WebSocket
        ? (this.logStartupInfo('connecting...'),
            (this.ws = new WebSocket(this.url)),
            (this.ws.onopen = function () {
                this.logStartupInfo('connected!')
                this.ws.send(JSON.stringify({ type: 'token', token: this.token }))
            }.bind(this)),
            (this.ws.onmessage = function (a) {
                a = JSON.parse(a.data)
                switch (a.type) {
                    case 'config':
                        this.onConfig(a)
                        break
                    case 'token':
                        this.isInvalidToken = !0
                        this.ws.close(3001, 'Invalid Token')
                        alert('Invalid token value: ' + this.token)
                        break
                    case 'playerCount':
                        this.updateKickButton(a.count)
                        break
                    case 'answer':
                        this.logStartupInfo('received server answer')
                        a = new RTCSessionDescription(a)
                        this.pcClient.setRemoteDescription(a)
                        this.aggregateStatsIntervalId = setInterval(
                            function () {
                                var b = this
                                this.pcClient &&
                                    this.pcClient.getStats(null).then(function (c) {
                                        b.generateAggregatedStats(c)
                                    })
                            }.bind(this),
                            1e3
                        )
                        break
                    case 'iceCandidate':
                        ; (a = new RTCIceCandidate(a.candidate)), this.pcClient.addIceCandidate(a).then(function () { })
                }
            }.bind(this)),
            (this.ws.onerror = function (a) {
                a = 'ws error: ' + JSON.stringify(a)
                this.logStartupInfo(a)
            }.bind(this)),
            (this.ws.onclose = function (a) {
                this.showStartupInfoPanel()
                var b = 'ws closed: ' + JSON.stringify(a.code) + ' - ' + a.reason
                this.logStartupInfo(b)
                this.ws = void 0
                4e3 == a.code || 4001 == a.code ? this.destroy() : this.video && (this.container.removeChild(this.video), (this.video = null), this.closeWebRTC())
                this.isInvalidToken ||
                    this.isDestroyed ||
                    setTimeout(
                        function () {
                            this.connect()
                        }.bind(this),
                        500
                    )
            }.bind(this)))
        : alert('Your browser does not support WebSocket')
}
AirCityPlayer.prototype.start = function () {
    this.delayStartTimerId = setTimeout(
        function () {
            var a = this
            clearTimeout(this.delayStartTimerId)
            this.observer = new (window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver)(function (b) {
                a.onResize()
            })
            this.observer.observe(this.container, { attributes: !0, attributeFilter: ['style'], attributeOldValue: !0 })
            window.addEventListener('orientationchange', this.onOrientationChange.bind(this))
            this.connect()
            this.updateKickButton(1)
        }.bind(this),
        200
    )
}
AirCityPlayer.prototype.destroy = function () {
    this.isDestroyed = !0
    this.video && (this.container.removeChild(this.video), this.closeWebRTC())
    this.playerInfoPanel && (document.body.removeChild(this.playerInfoPanel), (this.playerInfoPanel = null))
    this.playerInfoPanelMarker && (document.body.removeChild(this.playerInfoPanelMarker), (this.playerInfoPanelMarker = null))
    this.ws && (this.ws.close(), (this.ws = null))
}
AirCityPlayer._int2ip = function (a) {
    var b = []
    b[0] = (a >>> 24) >>> 0
    b[1] = ((a << 8) >>> 24) >>> 0
    b[2] = (a << 16) >>> 24
    b[3] = (a << 24) >>> 24
    return String(b[0]) + '.' + String(b[1]) + '.' + String(b[2]) + '.' + String(b[3])
}
AirCityPlayer.getHostFromInstanceId = function (a) {
    if (a && ((a = a.split('-')), 4 == a.length)) return [AirCityPlayer._int2ip(a[0]), a[2]]
}
'undefined' == typeof acapi ? (acapi = { AirCityPlayer: AirCityPlayer }) : (acapi.AirCityPlayer = AirCityPlayer)
'undefined' != typeof module && module.exports
    ? (module.exports = acapi)
    : 'function' == typeof define && define.amd
        ? define(function () {
            return acapi
        })
        : (window.AirCityPlayer = AirCityPlayer)
