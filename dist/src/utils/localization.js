/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { configureLocalization } from '@lit/localize';
import { sourceLocale, targetLocales } from '../generated/locale-codes.js';
export const { getLocale, setLocale } = configureLocalization({
    sourceLocale,
    targetLocales,
    loadLocale: (locale) => import(`../generated/locales/${locale}.js`),
});
//# sourceMappingURL=localization.js.map