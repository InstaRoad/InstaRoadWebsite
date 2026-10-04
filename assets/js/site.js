/* InstaRoad project website — shared behaviour.
   Everything here is progressive enhancement: pages stay readable without JS. */
(function () {
  'use strict';

  // Before/after comparison sliders (.compare). Pointer drags anywhere on the
  // frame; the hidden range input keeps the slider keyboard accessible.
  document.querySelectorAll('.compare').forEach(function (figure) {
    var frame = figure.querySelector('.compare-frame');
    var range = figure.querySelector('.compare-range');
    if (!frame || !range) return;

    var render = function () {
      figure.style.setProperty('--pos', range.value + '%');
    };
    var setFromPointer = function (clientX) {
      var box = frame.getBoundingClientRect();
      var pct = ((clientX - box.left) / box.width) * 100;
      range.value = Math.max(0, Math.min(100, pct)).toFixed(1);
      render();
    };

    var dragging = false;
    frame.addEventListener('pointerdown', function (event) {
      dragging = true;
      frame.setPointerCapture(event.pointerId);
      setFromPointer(event.clientX);
    });
    frame.addEventListener('pointermove', function (event) {
      if (dragging) setFromPointer(event.clientX);
    });
    ['pointerup', 'pointercancel'].forEach(function (type) {
      frame.addEventListener(type, function () { dragging = false; });
    });

    range.addEventListener('input', render);
    render();
  });

  // Copy buttons: <button data-copy="id-of-element-to-copy">
  var fallbackCopy = function (text) {
    var area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'absolute';
    area.style.left = '-9999px';
    document.body.appendChild(area);
    area.select();
    try { document.execCommand('copy'); } catch (err) { /* nothing else to try */ }
    document.body.removeChild(area);
    return Promise.resolve();
  };

  document.querySelectorAll('[data-copy]').forEach(function (button) {
    button.addEventListener('click', function () {
      var source = document.getElementById(button.getAttribute('data-copy'));
      if (!source) return;
      var text = source.textContent.trim();
      var copy = navigator.clipboard && window.isSecureContext
        ? navigator.clipboard.writeText(text).catch(function () { return fallbackCopy(text); })
        : fallbackCopy(text);
      copy.then(function () {
        var label = button.querySelector('.copy-label');
        if (!label) return;
        label.textContent = 'Copied';
        setTimeout(function () { label.textContent = 'Copy'; }, 1800);
      });
    });
  });

  // Floating back-to-top link appears after scrolling down.
  var toTop = document.querySelector('.to-top');
  if (toTop) {
    var onScroll = function () {
      toTop.classList.toggle('is-visible', window.scrollY > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();
