/* Optional conveniences; content and navigation work without JavaScript. */
(() => {
  document.querySelectorAll('.copy-citation').forEach((button) => {
    if (!navigator.clipboard || !window.isSecureContext) return;
    button.hidden = false;
    button.addEventListener('click', async () => {
      const citation = button.closest('.citation-body');
      const status = citation.querySelector('.copy-status');
      try {
        await navigator.clipboard.writeText(citation.querySelector('code').textContent.trim());
        status.textContent = 'Copied.';
      } catch (_) {
        status.textContent = 'Copy unavailable. Select the citation above to copy it manually.';
      }
    });
  });
  document.querySelectorAll('.publication-image img').forEach((img) => {
    const removeFigure = () => {
      img.closest('.publication').classList.add('publication-text-only');
      img.parentElement.hidden = true;
    };
    img.addEventListener('error', removeFigure, { once: true });
    if (img.complete && !img.naturalWidth) removeFigure();
  });
})();
