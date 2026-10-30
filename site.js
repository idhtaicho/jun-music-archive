'use strict';
(() => {
  const $ = id => document.getElementById(id);
  const menu = $('menu'), toggle = $('toggle');
  function closeMenu() { menu.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
  toggle.setAttribute('aria-controls', 'menu');
  toggle.onclick = () => toggle.setAttribute('aria-expanded', String(menu.classList.toggle('open')));
  menu.querySelectorAll('a').forEach(a => a.onclick = closeMenu);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeMenu(); toggle.focus(); } });
  document.addEventListener('click', e => { if (!e.target.closest('.nav')) closeMenu(); });
  let entries = [], category = 'all', artist = 'all';
  const grid = $('video-grid'), empty = $('empty');
  function el(tag, cls, text) {
    const element = document.createElement(tag);
    if (cls) element.className = cls;
    if (text) element.textContent = text;
    return element;
  }
  function externalUrl(value, tiktokOnly = false) {
    try {
      const u = new URL(value);
      if (u.protocol !== 'https:' || u.username || u.password) return null;
      if (tiktokOnly && !['www.tiktok.com', 'tiktok.com', 'vt.tiktok.com', 'vm.tiktok.com'].includes(u.hostname)) return null;
      return u;
    } catch { return null; }
  }
  function validEntry(e) {
    return e && typeof e.id === 'string' && typeof e.title === 'string' && typeof e.artist === 'string'
      && ['cover','original'].includes(e.category)
      && (externalUrl(e.url, true) || (e.category === 'original' && e.audio === 'ai-no-hana-preview.mp3'));
  }
  function render() {
    const filtered = entries.filter(e => category === 'all' || e.category === category);
    const artists = [...new Set(filtered.map(e => e.artist))].sort((a,b) => a.localeCompare(b));
    if (artist !== 'all' && !artists.includes(artist)) artist = 'all';
    const options = $('artist-options'); options.replaceChildren();
    for (const name of ['all', ...artists]) {
      const count = name === 'all' ? filtered.length : filtered.filter(e => e.artist === name).length;
      const button = el('button','artist-choice' + (artist === name ? ' active' : ''),name === 'all' ? 'ALL ARTISTS' : name);
      button.type = 'button'; button.setAttribute('aria-pressed',String(artist === name));
      button.append(el('small','',`${count} ${count === 1 ? 'SONG' : 'SONGS'}`));
      button.onclick = () => { artist = name; render(); [...options.children].find(b => b.dataset.artist === name)?.focus(); };
      button.dataset.artist = name; options.append(button);
    }
    $('artist-current').textContent = artist === 'all' ? 'ALL PERFORMANCES' : `${artist} / PERFORMANCES`;
    const visible = filtered.filter(e => artist === 'all' || e.artist === artist);
    grid.replaceChildren(); empty.hidden = visible.length > 0;
    empty.textContent = 'No songs in this category yet. / このカテゴリの曲は準備中です。';
    for (const entry of visible) {
      const card = el('article','video-card');
      card.append(el('p','kind',`${entry.artist} / ${entry.category.toUpperCase()}`),el('h3','',entry.title));
      if (entry.audio) {
        card.append(el('div','short-preview','AI VOCAL DEMO · 45 SEC'));
        card.append(el('p','aw-note','AI-sung original demo. / AI歌唱によるオリジナル曲の試聴版です。'));
        const link = el('a','link','LISTEN / 試聴する ↓'); link.href = '#awakening'; card.append(link);
      } else {
        const url = externalUrl(entry.url,true), id = url.pathname.match(/^\/@[^/]+\/video\/(\d{10,25})\/?$/)?.[1];
        const preview = el('div','short-preview');
        if (id) {
          const play = el('button','load-video','LOAD TIKTOK VIDEO ▶');
          play.type = 'button'; play.setAttribute('aria-label', `${entry.title} — TikTok動画を読み込む`);
          play.onclick = () => {
            const iframe = el('iframe'); iframe.title = `${entry.artist} — ${entry.title}`;
            iframe.src = `https://www.tiktok.com/embed/v2/${id}`;
            iframe.allow = 'encrypted-media; fullscreen; picture-in-picture';
            iframe.referrerPolicy = 'strict-origin-when-cross-origin'; preview.replaceWith(iframe);
          };
          preview.append(play);
        } else preview.textContent = 'WATCH ON TIKTOK ↗';
        card.append(preview);
        const link = el('a','watch','OPEN ON TIKTOK ↗'); link.href = url.href;
        link.target = '_blank'; link.rel = 'noopener noreferrer'; card.append(link);
      }
      grid.append(card);
    }
    document.querySelectorAll('[data-filter]').forEach(button => {
      const selected = button.dataset.filter === category;
      button.classList.toggle('active',selected); button.setAttribute('aria-pressed',String(selected));
    });
  }
  function setCategory(next) { category = next; artist = 'all'; render(); }
  document.querySelectorAll('[data-filter]').forEach(b => b.onclick = () => setCategory(b.dataset.filter));
  document.querySelectorAll('[data-category-link]').forEach(a => a.onclick = () => setCategory(a.dataset.categoryLink));
  empty.textContent = 'Loading music… / 読み込み中…';
  fetch('archive.json').then(r => { if (!r.ok) throw Error(); return r.json(); }).then(data => {
    if (!Array.isArray(data) || !data.every(validEntry)) throw Error();
    entries = data; render();
  }).catch(() => {
    empty.hidden = false;
    empty.textContent = 'The archive could not load. Please reload, or visit TikTok. / 一覧を読み込めませんでした。再読み込みするか、TikTokをご覧ください。';
    $('artist-browser').hidden = true;
  });
  fetch('settings.json').then(r => { if (!r.ok) throw Error(); return r.json(); }).then(settings => {
    if (externalUrl(settings.voteUrl)) {
      $('vote-link').href = settings.voteUrl; $('vote-link').hidden = false;
      $('vote-status').textContent = 'Voting opens in an external service. / 外部サービスの投票ページが開きます。';
    }
    if (externalUrl(settings.communityUrl)) {
      $('community-link').href = settings.communityUrl; $('community-link').hidden = false;
    }
  }).catch(() => {});
  const audio = document.querySelector('audio');
  audio.addEventListener('error', () => {
    if (!$('audio-error')) {
      const note = el('p','aw-note','Audio could not load. Please reload and try again. / 音源を読み込めませんでした。再読み込みしてください。');
      note.id = 'audio-error'; audio.after(note);
    }
  },true);
})();
