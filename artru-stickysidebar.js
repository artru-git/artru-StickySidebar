/**
 * ARTRU Sticky Sidebar
 * Modernized sticky behavior with ResizeObserver & MutationObserver.
 * Optimized for dynamic content (AdSense, Lazy-load, DOM changes).
 *
 * @version 1.0.0
 * @author  ARTRU <https://artru.net>
 * @license MIT
 */

(() => {
    'use strict';

    const initArtruSticky = () => {
        const stickyElement = document.querySelector('[data-sticky-sidebar]') ||
            document.querySelector('[data-sticky="true"]');

        if (!stickyElement) return;

        const state = {
            topGap: 0,
            bottomGap: 0,
            mobileWidth: 0,
            sidebarHeight: 0,
            viewportHeight: 0,
            currentScrollY: window.scrollY,
            lastComputedTop: 0,
            isTicking: false
        };

        // Reads attributes and updates the internal state
        function updateFromAttributes() {
            const data = stickyElement.dataset;
            const rect = stickyElement.getBoundingClientRect();
            const initialRectTop = rect.top + window.scrollY;

            state.topGap = data.topGap === 'auto' ? initialRectTop : (parseInt(data.topGap) || 0);
            state.bottomGap = parseInt(data.bottomGap) || 0;
            state.mobileWidth = parseInt(data.mobileWidth) || 0;

            refreshAll();
        }

        // Helper to trigger full recalculation
        function refreshAll() {
            updateMetrics();
            applyInitialStyles();
            positionSidebar();
        }

        function init() {
            // Default attribute injection
            if (!stickyElement.hasAttribute('data-top-gap')) stickyElement.setAttribute('data-top-gap', '0');
            if (!stickyElement.hasAttribute('data-bottom-gap')) stickyElement.setAttribute('data-bottom-gap', '0');
            if (!stickyElement.hasAttribute('data-mobile-width')) stickyElement.setAttribute('data-mobile-width', '0');

            updateFromAttributes();
            setupObservers();
        }

        /**
         * ENGINE: Hybrid Observer System
         * MutationObserver for settings + ResizeObserver for layout shifts
         */
        function setupObservers() {
            // Watch for Data Attribute changes
            const attrObserver = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && mutation.attributeName.startsWith('data-')) {
                        updateFromAttributes();
                    }
                });
            });
            attrObserver.observe(stickyElement, { attributes: true });

            // Watch for Size changes (The AdSense & Lazy-load Fix)
            if (window.ResizeObserver) {
                const resizeObserver = new ResizeObserver(() => {
                    if (!state.isTicking) {
                        state.isTicking = true;
                        requestAnimationFrame(() => {
                            refreshAll();
                            state.isTicking = false;
                        });
                    }
                });

                resizeObserver.observe(stickyElement);
                if (stickyElement.parentElement) {
                    resizeObserver.observe(stickyElement.parentElement);
                }
            }
        }

        function updateMetrics() {
            state.viewportHeight = window.innerHeight;
            state.sidebarHeight = stickyElement.offsetHeight;
        }

        function applyInitialStyles() {
            if (window.innerWidth > state.mobileWidth) {
                stickyElement.style.position = 'sticky';
                stickyElement.style.height = 'fit-content';

                if (state.sidebarHeight + state.topGap + state.bottomGap <= state.viewportHeight) {
                    state.lastComputedTop = state.topGap;
                }
                stickyElement.style.setProperty('top', `${state.lastComputedTop}px`, 'important');
            } else {
                stickyElement.style.removeProperty('position');
                stickyElement.style.removeProperty('height');
                stickyElement.style.removeProperty('top');
            }
        }

        function positionSidebar() {
            if (window.innerWidth <= state.mobileWidth) return;

            const newScrollY = window.scrollY;
            const scrollDelta = state.currentScrollY - newScrollY;
            const bottomLimit = state.viewportHeight - state.sidebarHeight - state.bottomGap;

            if (state.sidebarHeight + state.topGap + state.bottomGap <= state.viewportHeight) {
                state.lastComputedTop = state.topGap;
            } else {
                let targetTop = state.lastComputedTop + scrollDelta;
                if (newScrollY < state.currentScrollY) {
                    targetTop = Math.min(state.topGap, targetTop);
                } else {
                    targetTop = Math.max(bottomLimit, targetTop);
                }
                state.lastComputedTop = targetTop;
            }

            stickyElement.style.setProperty('top', `${state.lastComputedTop}px`, 'important');
            state.currentScrollY = newScrollY;
            state.isTicking = false;
        }

        const onScroll = () => {
            if (!state.isTicking) {
                state.isTicking = true;
                requestAnimationFrame(positionSidebar);
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', refreshAll);

        init();
    };

    // Auto-init
    if (document.readyState === "complete" || document.readyState === "interactive") {
        initArtruSticky();
    } else {
        document.addEventListener("DOMContentLoaded", initArtruSticky);
    }

    // Safety sync for late-loading ads
    window.addEventListener("load", () => {
        setTimeout(() => window.dispatchEvent(new Event('resize')), 200);
    });

})();
