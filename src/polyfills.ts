/***************************************************************************************************
 * Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.
 */

import '@angular/localize/init';

import { Buffer } from 'buffer';

/***************************************************************************************************
 * GLOBAL POLYFILLS (needed for legacy libraries)
 */

(window as any).global = window;
(window as any).Buffer = Buffer;

/***************************************************************************************************
 * BROWSER POLYFILLS
 */

/**
 * IE11 support (not needed in modern apps)
 */
// import 'classlist.js';

/**
 * Web Animations API polyfill (only if needed)
 */
// import 'web-animations-js';

/***************************************************************************************************
 * ZONE JS - required by Angular
 */

import 'zone.js';

/***************************************************************************************************
 * APPLICATION IMPORTS
 */