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
  loadLocale: (locale: string) => import(`../generated/locales/${locale}.js`),
});
