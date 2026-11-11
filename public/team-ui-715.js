/* V7.15: small enhancements for the team's approved UI changes; no new dependency. */
(() => {
  'use strict';

  function initialiseTeamUI() {
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');

    document.querySelectorAll('.photo-carousel').forEach((track, index) => {
      if (track.dataset.teamControlsReady || track.children.length < 2) return;
      track.dataset.teamControlsReady = 'true';
      if (!track.id) track.id = `photo-rail-715-${index + 1}`;

      const title = track.closest('section')?.querySelector('h2')?.textContent.replace(/\s+/g, ' ').trim();
      const controls = document.createElement('div');
      controls.className = 'photo-rail-controls';
      controls.setAttribute('role', 'group');
      controls.setAttribute('aria-label', title ? `Photograph controls: ${title}` : 'Photograph controls');

      function move(direction) {
        track.dispatchEvent(new Event('tint:carousel-interaction'));
        const items = [...track.children];
        const end = Math.max(0, track.scrollWidth - track.clientWidth);
        if (end <= 2) return;
        const origin = items[0].offsetLeft;
        const stops = [...new Set(items.map(item => Math.min(end, Math.max(0, item.offsetLeft - origin))))];
        const current = track.scrollLeft;
        const target = direction > 0
          ? (current >= end - 3 ? 0 : stops.find(left => left > current + 3) ?? end)
          : (current <= 3 ? end : [...stops].reverse().find(left => left < current - 3) ?? 0);
        track.scrollTo({ left: target, behavior: calm.matches ? 'instant' : 'smooth' });
      }

      [-1, 1].forEach(direction => {
        const button = document.createElement('button');
        button.type = 'button';
        button.setAttribute('aria-controls', track.id);
        button.setAttribute('aria-label', direction < 0 ? 'Previous photographs' : 'Next photographs');
        button.innerHTML = direction < 0
          ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>'
          : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>';
        button.addEventListener('click', () => move(direction));
        controls.append(button);
      });

      // Controls sit outside the rail so the existing auto-advance never treats them as photos.
      track.after(controls);
      const update = () => { controls.hidden = track.scrollWidth - track.clientWidth <= 2; };
      if ('ResizeObserver' in window) new ResizeObserver(update).observe(track);
      else window.addEventListener('resize', update, { passive: true });
      update();
    });

    const photograph = document.querySelector('.page-locations main > .locations-photo');
    const note = photograph?.nextElementSibling;
    const image = photograph?.querySelector(':scope > img');
    if (photograph && image && note?.matches('.travel-note') && !photograph.dataset.visitComposed) {
      photograph.dataset.visitComposed = 'true';
      const frame = document.createElement('div');
      frame.className = 'locations-visit-frame';
      image.before(frame);
      frame.append(image, note);
      const reserveCardSpace = () => {
        frame.style.setProperty('--visit-overhang', `${Math.ceil(note.offsetHeight / 2 + 16)}px`);
      };
      if ('ResizeObserver' in window) new ResizeObserver(reserveCardSpace).observe(note);
      else window.addEventListener('resize', reserveCardSpace, { passive: true });
      reserveCardSpace();
    }
  }

  // Load this deferred script after site.js, which creates the shared photo rails.
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialiseTeamUI, { once: true });
  else initialiseTeamUI();
})();
