(function (doc, win) {
    var docEl = doc.documentElement;
    var resizeEvt = 'orientationChange' in win ? 'orientationChange' : 'resize'
    var recalc = function () {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) {
            return false
        }
        if (clientWidth >= 1920) {
            docEl.style.fontSize = '100px';
        } else {
            docEl.style.fontSize = 100 * (clientWidth / 1920) + 'px'
        }
        if (!docEl.addEventListener) return;
    }
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false)
}(document, window))