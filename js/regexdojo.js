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
            // For file:// protocol, count directory depth from the current page.
            // We need to navigate up to the repo root, then into regexdojo/.
            var path = window.location.pathname.replace(/\\/g, '/');
            var parts = path.split('/').filter(function (s) { return s.length > 0; });

            // Remove the filename if present
            if (path.indexOf('.') !== -1 && path.lastIndexOf('/') < path.length - 1) {
                parts.pop();
            }

            // Find the repo root by looking for known repo directory names
            var repoNames = ['therealfredp3d.github.io', 'therealfred.ca'];
            var repoIndex = -1;

            for (var i = parts.length - 1; i >= 0; i--) {
                if (repoNames.indexOf(parts[i]) !== -1) {
                    repoIndex = i;
                    break;
                }
            }

            // Calculate depth: go up from current dir to repo root, then into regexdojo
            var depth;
            if (repoIndex !== -1) {
                // If we're in the repo root (repoIndex == parts.length - 1), depth is 0
                // Otherwise, go up to repo root, then into regexdojo
                depth = parts.length - 1 - repoIndex;
            } else {
                // Fallback: count all segments as depth
                depth = parts.length;
            }

            var prefix = new Array(depth).join('../');
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
    var previousActiveElement = null;
    var loadTimeout = null;

    function getFocusableElements() {
        return overlay.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
    }

    function trapFocus(e) {
        if (e.key !== 'Tab') return;

        var focusableElements = getFocusableElements();
        var firstElement = focusableElements[0];
        var lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }

    function open() {
        // Save the currently focused element to restore later
        previousActiveElement = document.activeElement;

        // Lazy-load the iframe src only on first open so the rest of the
        // site stays snappy. Set loadedOnce only after successful load.
        if (!loadedOnce) {
            iframe.src = resolveDojoUrl();
            // Set a timeout to detect load failures
            loadTimeout = setTimeout(function () {
                if (!loadedOnce) {
                    console.error('RegexDojo iframe load timeout - will retry on next open');
                    loadedOnce = false; // Allow retry
                }
            }, 10000); // 10 second timeout
        }
        overlay.hidden = false;
        overlay.setAttribute('aria-hidden', 'false');
        document.body.classList.add(OPEN_CLASS);
        tab.classList.add(ACTIVE_CLASS);

        // Make the background inert to prevent interaction
        var mainContent = document.querySelector('main, section, .container');
        if (mainContent) {
            mainContent.setAttribute('inert', '');
        }

        // Move focus into the overlay for accessibility
        if (closeBtn) { closeBtn.focus(); }

        // Add focus trap listener
        document.addEventListener('keydown', trapFocus);
    }

    function close() {
        overlay.hidden = true;
        overlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove(OPEN_CLASS);
        tab.classList.remove(ACTIVE_CLASS);

        // Remove inert from background
        var mainContent = document.querySelector('main, section, .container');
        if (mainContent) {
            mainContent.removeAttribute('inert');
        }

        // Remove focus trap listener
        document.removeEventListener('keydown', trapFocus);

        // Check if mobile menu is currently closed (meaning tab is offscreen)
        var navMenu = tab.closest('.nav-menu');
        var isMenuClosed = navMenu && !navMenu.classList.contains('active');

        // Restore focus to a visible element
        if (previousActiveElement && document.body.contains(previousActiveElement) && previousActiveElement.offsetParent !== null) {
            // If the previous element is still visible (not hidden)
            previousActiveElement.focus();
        } else if (isMenuClosed) {
            // If the mobile menu is closed, focus the hamburger button
            var hamburger = document.querySelector('.hamburger');
            if (hamburger) {
                hamburger.focus();
            } else {
                // Fallback to first visible focusable element
                var firstFocusable = document.querySelector('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
                if (firstFocusable) {
                    firstFocusable.focus();
                }
            }
        } else {
            // Default to tab focus
            tab.focus();
        }
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

        // Clear the timeout and mark as successfully loaded
        if (loadTimeout) {
            clearTimeout(loadTimeout);
            loadTimeout = null;
        }
        loadedOnce = true;

        // Inject escape key handler into the iframe document
        try {
            var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            var escapeScript = iframeDoc.createElement('script');
            escapeScript.textContent = '(function() {' +
                '  document.addEventListener("keydown", function(e) {' +
                '    if (e.key === "Escape") {' +
                '      window.parent.postMessage({ type: "regexdojo-escape" }, "*");' +
                '    }' +
                '  });' +
                '})();';
            iframeDoc.head.appendChild(escapeScript);
        } catch (e) {
            // Cross-origin restriction - iframe content is not accessible
            // This is expected when loading from a different origin
            console.log('Cannot inject script into iframe (likely cross-origin):', e);
        }
    });

    // Handle iframe load errors to allow retry
    iframe.addEventListener('error', function () {
        console.error('Failed to load RegexDojo iframe');
        // Clear timeout and reset loadedOnce so the next open will retry
        if (loadTimeout) {
            clearTimeout(loadTimeout);
            loadTimeout = null;
        }
        loadedOnce = false;
        if (loader) { loader.classList.remove(HIDDEN_CLASS); }
    });

    // Listen for escape messages from iframe
    window.addEventListener('message', function (e) {
        if (e.data && e.data.type === 'regexdojo-escape' && isOpen()) {
            close();
        }
    });

    // Esc closes the overlay in the parent document.
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
