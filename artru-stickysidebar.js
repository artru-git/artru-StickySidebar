/**
 * ARTRU Sticky Sidebar
 * Modernized sticky behavior with ResizeObserver & MutationObserver.
 * Optimized for dynamic content (AdSense, Lazy-load, DOM changes).
 *
 * @version 1.0.1
 * @author  ARTRU <https://artru.net>
 * @license MIT
 */

(() => {
    'use strict';

    const initArtruSticky = () => {
        const stickyElement = document.querySelector('[data-sticky-sidebar]');
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

        const updateFromAttributes = () => {
            const data = stickyElement.dataset;
            const rect = stickyElement.getBoundingClientRect();
            
            // Tính toán topGap: nếu là 'auto' thì lấy vị trí tự nhiên, ngược lại lấy số cụ thể
            state.topGap = data.topGap === 'auto' 
                ? (rect.top + window.scrollY) 
                : (parseInt(data.topGap) || 0);
            
            state.bottomGap = parseInt(data.bottomGap) || 0;
            state.mobileWidth = parseInt(data.mobileWidth) || 0;

            refreshAll();
        };

        const updateMetrics = () => {
            state.viewportHeight = window.innerHeight;
            state.sidebarHeight = stickyElement.offsetHeight;
        };

        const positionSidebar = () => {
            if (window.innerWidth <= state.mobileWidth) return;

            const newScrollY = window.scrollY;
            const scrollDelta = state.currentScrollY - newScrollY;
            const bottomLimit = state.viewportHeight - state.sidebarHeight - state.bottomGap;

            // Nếu Sidebar ngắn hơn Viewport: Dính chặt ở topGap
            if (state.sidebarHeight + state.topGap + state.bottomGap <= state.viewportHeight) {
                state.lastComputedTop = state.topGap;
            } else {
                // Nếu Sidebar dài hơn Viewport: Tính toán scroll lên/xuống
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
        };

        const applyStyles = () => {
            if (window.innerWidth > state.mobileWidth) {
                stickyElement.style.position = 'sticky';
                stickyElement.style.height = 'fit-content';
                stickyElement.style.willChange = 'top'; // Tối ưu GPU
                positionSidebar();
            } else {
                ['position', 'height', 'top', 'will-change'].forEach(p => stickyElement.style.removeProperty(p));
            }
        };

        function refreshAll() {
            updateMetrics();
            applyStyles();
        }

        // Theo dõi thay đổi Attributes và DOM (AdSense/Lazyload)
        const setupObservers = () => {
            const observer = new MutationObserver(mutations => {
                if (mutations.some(m => m.attributeName?.startsWith('data-'))) {
                    updateFromAttributes();
                }
            });
            observer.observe(stickyElement, { attributes: true });

            if (window.ResizeObserver) {
                const ro = new ResizeObserver(() => {
                    if (!state.isTicking) {
                        state.isTicking = true;
                        requestAnimationFrame(() => {
                            refreshAll();
                            state.isTicking = false;
                        });
                    }
                });
                ro.observe(stickyElement);
                if (stickyElement.parentElement) ro.observe(stickyElement.parentElement);
            }
        };

        const onScroll = () => {
            if (!state.isTicking) {
                state.isTicking = true;
                requestAnimationFrame(positionSidebar);
            }
        };

        // Khởi tạo
        updateFromAttributes();
        setupObservers();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', refreshAll);
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initArtruSticky);
    } else {
        initArtruSticky();
    }

    // Fix cho các trường hợp đặc biệt nội dung nhảy sau khi load xong hoàn toàn
    window.addEventListener("load", () => {
        setTimeout(() => window.dispatchEvent(new Event('resize')), 200);
    });

})();
