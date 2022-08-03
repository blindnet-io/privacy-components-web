"use strict";
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var _a;
exports.__esModule = true;
exports.setLocale = exports.getLocale = void 0;
var localize_1 = require("@lit/localize");
var locale_codes_js_1 = require("../generated/locale-codes.js");
exports.getLocale = (_a = (0, localize_1.configureLocalization)({
    sourceLocale: locale_codes_js_1.sourceLocale,
    targetLocales: locale_codes_js_1.targetLocales,
    loadLocale: function (locale) { return Promise.resolve().then(function () { return require("../generated/locales/".concat(locale, ".js")); }); }
}), _a.getLocale), exports.setLocale = _a.setLocale;
