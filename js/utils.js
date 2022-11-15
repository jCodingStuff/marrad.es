/**
 * Check if we are in a mobile device
 * @returns {boolean} `true` if we are in a mobile device, `false` otherwise
 */
export function isMobile() {
    return (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        || isIpadOS()
    );
}

/**
 * Check if we are in ipadOS
 * @returns {boolean} `true` if we are in ipadOS, `false` otherwise
 */
export function isIpadOS() {
    return navigator.maxTouchPoints &&
        navigator.maxTouchPoints > 2 &&
        /MacIntel/.test(navigator.platform);
}