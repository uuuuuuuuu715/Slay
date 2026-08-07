(() => {
  'use strict';

  const poster = document.getElementById('poster');
  const button = document.getElementById('pushButton');
  const dust = document.getElementById('dust');
  const frames = [
    document.getElementById('scene2'),
    document.getElementById('scene3'),
    document.getElementById('scene4')
  ];

  if (!poster || !button || frames.some((f) => !f)) return;

  let running = false;
  const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

  async function preloadImages() {
    const images = Array.from(document.images);
    await Promise.all(images.map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.addEventListener('load', resolve, { once: true });
        img.addEventListener('error', resolve, { once: true });
      });
    }));
  }

  function dustBurst() {
    dust.classList.remove('active');
    // Force reflow so the same CSS animation can replay.
    void dust.offsetWidth;
    dust.classList.add('active');
    window.setTimeout(() => dust.classList.remove('active'), 1100);
  }

  async function showFrame(index, holdMs) {
    const next = frames[index];
    const previous = index > 0 ? frames[index - 1] : null;

    next.classList.remove('leaving');
    next.classList.add('is-visible', 'entering');

    if (previous) {
      previous.classList.remove('entering');
      previous.classList.add('leaving');
    }

    await wait(260);

    next.classList.remove('entering');
    if (previous) previous.classList.remove('is-visible', 'leaving');

    await wait(holdMs);
  }

  async function run() {
    if (running) return;
    running = true;
    button.disabled = true;
    poster.classList.add('running');

    // Tiny anticipation: the poster stays on frame 1 while the viewer feels a jolt.
    await wait(180);
    dustBurst();

    // Whole-scene keyframes. Fast dissolves hide small artwork mismatches.
    await showFrame(0, 250);
    dustBurst();
    await showFrame(1, 250);
    dustBurst();
    await showFrame(2, 0);

    // Let the open cave sit dark for a moment before the rave wakes up.
    poster.classList.remove('running');
    await wait(430);
    poster.classList.add('open');
  }

  button.addEventListener('click', run);
  button.addEventListener('pointerdown', () => poster.classList.add('pressed'));
  window.addEventListener('pointerup', () => poster.classList.remove('pressed'));

  preloadImages();
})();
