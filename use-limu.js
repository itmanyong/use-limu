!(function (e, u) {
	'object' == typeof exports && 'undefined' != typeof module
		? (module.exports = u(require('react'), require('limu')))
		: 'function' == typeof define && define.amd
		? define(['react', 'limu'], u)
		: ((e = 'undefined' != typeof globalThis ? globalThis : e || self)['use-limu'] = u(e.React, e.limu));
})(this, function (e, n) {
	'use strict';
	var u,
		o = (u = e) && 'object' == typeof u && 'default' in u ? u : { default: u };
	return {
		useLimu: function (e = null) {
			const [u, t] = o.default.useState(() => n.produce('function' == typeof e ? e() : e, () => {}));
			return [
				u,
				o.default.useCallback(
					(e) => {
						t('function' == typeof e ? n.produce(u, e) : n.produce(e, () => {}));
					},
					[u],
				),
			];
		},
		useLimuReducer: function (t, e = null) {
			const [u, n] = useLimu(e);
			return [
				u,
				o.default.useCallback(
					(u) => {
						n((e) => t(e, u));
					},
					[u],
				),
			];
		},
	};
});
