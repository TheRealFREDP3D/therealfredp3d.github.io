/**
 * RegexDojo integration — opens the self-hosted RegexDojo app in a
 * full-screen overlay iframe, keeping its own visual style intact.
 *
 * The RegexDojo bundle is served from /regexdojo/ on GitHub Pages
 * (matches the CNAME therealfred.ca). For local `file://` previews we
 * fall back to a relative path resolved from the document location.
 *
 * No external dependencies. Plays nicely with the existing main.js
 * (hamburger toggle, smooth-scroll, etc.) — this file is self-contained.
 */
(function () {
    'use strict';

    var OVERLAY_ID     = 'regexdojo-overlay';
    var IFRAME_ID      = 'regexdojo-iframe';
    var LOADER_ID      = 'regexdojo-loader';
    var TAB_ID         = 'regexdojo-tab';
    var CLOSE_ID       = 'regexdojo-close';
    var OPEN_CLASS     = 'regexdojo-open';
    var ACTIVE_CLASS   = 'is-active';
    var HIDDEN_CLASS   = 'is-hidden';

    function resolveDojoUrl() {
        // Prefer the absolute production path (works on therealfred.ca and on
        // the user's *.github.io preview). Fall back to a computed relative
        // path when opened via file:// so devs can preview without a server.
        if (window.location.protocol === 'file:') {
            // count how deep we are: index.html -> 0, projects.html -> 0,
            // blog/articles/foo/index.html -> 3 levels
            var path = window.location.pathname.replace(/\\/g, '/');
            var depth = 0;
            // strip the filename if present
            if (path.charAt(path.length - 1) !== '/') {
                path = path.substring(0, path.lastIndexOf('/') + 1);
            }
            depth = path.split('/').filter(function (s) { return s.length > 0; }).length;
            var prefix = new Array(depth + 1).join('../');
            return prefix + 'regexdojo/index.html';
        }
        return '/regexdojo/index.html';
    }

    function $(id) { return document.getElementById(id); }

    var overlay = $(OVERLAY_ID);
    var iframe  = $(IFRAME_ID);
    var loader  = $(LOADER_ID);
    var tab     = $(TAB_ID);
    var closeBtn= $(CLOSE_ID);

    if (!overlay || !iframe || !tab) {
        // Page doesn't have the overlay markup; nothing to wire up.
        return;
    }

    var loadedOnce = false;

    function open() {
        // Lazy-load the iframe src only on first open so the rest of the
        // site stays snappy.
        if (!loadedOnce) {
            iframe.src = resolveDojoUrl();
            loadedOnce = true;
        }
        overlay.hidden = false;
        overlay.setAttribute('aria-hidden', 'false');
        document.body.classList.add(OPEN_CLASS);
        tab.classList.add(ACTIVE_CLASS);
        // Move focus into the overlay for accessibility.
        if (closeBtn) { closeBtn.focus(); }
    }

    function close() {
        overlay.hidden = true;
        overlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove(OPEN_CLASS);
        tab.classList.remove(ACTIVE_CLASS);
        tab.focus();
    }

    function isOpen() {
        return !overlay.hidden;
    }

    // --- Wire up events ---
    tab.addEventListener('click', function (e) {
        e.preventDefault();
        open();
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', function (e) {
            e.preventDefault();
            close();
        });
    }

    // Hide loader once the iframe has actually loaded.
    iframe.addEventListener('load', function () {
        if (loader) { loader.classList.add(HIDDEN_CLASS); }
    });

    // Esc closes the overlay.
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && isOpen()) {
            close();
        }
    });

    // Expose a tiny API in case other scripts want to drive the overlay.
    window.RegexDojo = {
        open: open,
        close: close,
        toggle: function () { isOpen() ? close() : open(); }
    };
})();
