!(function (e, t) {
	'object' == typeof exports && 'undefined' != typeof module
		? (module.exports = t(require('react'), require('limu')))
		: 'function' == typeof define && define.amd
		? define(['react', 'limu'], t)
		: ((e = 'undefined' != typeof globalThis ? globalThis : e || self)['use-limu'] = t(e.React, e.limu));
})(this, function (e, r) {
	'use strict';
	var t,
		c = (t = e) && 'object' == typeof t && 'default' in t ? t : { default: t };
	function u(e = null) {
		const [t, u] = c.default.useState(() => r.produce('function' == typeof e ? e() : e, () => {}));
		return [
			t,
			c.default.useCallback(
				(e) => {
					u('function' == typeof e ? r.produce(t, e) : r.produce(e, () => {}));
				},
				[t],
			),
		];
	}
	return {
		useLimu: u,
		useLimuReducer: function (u, e = null) {
			const [t, r] = useLimu(e);
			return [
				t,
				c.default.useCallback(
					(t) => {
						r((e) => u(e, t));
					},
					[t],
				),
			];
		},
		useLimuArray: function (e = [], { idName: r = null }) {
			const [t, n] = u(() => (Array.isArray(e) ? e : []));
			return (
				c.default.useEffect(() => {
					Array.isArray(e) || console.error('useLimuArray initState not is Array');
				}, []),
				{
					state: t,
					setState: n,
					change: c.default.useCallback((t = null, u = null) => {
						if (t || 0 === t)
							switch (typeof t) {
								case 'string':
									n((e) => {
										e.forEach((e) => {
											e[r] === t && { ...e, ...(u || {}) };
										});
									});
									break;
								case 'number':
									n((e) => {
										e.forEach((e, t) => {});
									});
							}
					}, []),
				}
			);
		},
		useLimuObject: function (e) {
			const [t, o] = u(() => ('[object Object]' === Object.prototype.toString.call(e) ? e : {}));
			return (
				c.default.useEffect(() => {
					'[object Object]' === !Object.prototype.toString.call(e) && console.error('useLimuObject initState not is Object');
				}, []),
				{
					state: t,
					setState: o,
					change: c.default.useCallBack((t, n) => {
						if (t && 'string' == typeof t) {
							let u = t.split('.'),
								r = u.length;
							o(
								2 <= r
									? (e) => {
											let t = e[u[0]];
											for (let e = 1; e < r - 1; e++) t = t[u[e]];
											t[u[r - 1]] = n;
									  }
									: (e) => {
											e[t] = n;
									  },
							);
						}
					}, []),
				}
			);
		},
	};
});
