'use strict';
(() => {
  // Keep original text nodes so switching languages never translates a translation.
  const languages = ['en', 'ja', 'es', 'pt', 'id'];
  const rows = [
    ['Skip to music','音楽へ移動','Ir a la música','Ir para a música','Langsung ke musik'],
    ['☰ MENU','☰ メニュー','☰ MENÚ','☰ MENU','☰ MENU'],
    ['HOME','ホーム','INICIO','INÍCIO','BERANDA'],
    ['MUSIC','音楽','MÚSICA','MÚSICA','MUSIK'],
    ['VIDEO ARCHIVE','動画アーカイブ','ARCHIVO DE VIDEOS','ARQUIVO DE VÍDEOS','ARSIP VIDEO'],
    ['PROFILE','プロフィール','PERFIL','PERFIL','PROFIL'],
    ['THE AWAKENING','目覚めの歌声','EL DESPERTAR','O DESPERTAR','KEBANGKITAN'],
    ['CONNECT','つながる','CONECTA','CONECTE-SE','TERHUBUNG'],
    ['EXPLORE ↓','音楽を聴く ↓','EXPLORAR ↓','EXPLORAR ↓','JELAJAHI ↓'],
    ['BROWSE BY ARTIST / ORIGINALS / REQUESTS','アーティスト別 / オリジナル / リクエスト','ARTISTAS / ORIGINALES / PETICIONES','ARTISTAS / ORIGINAIS / PEDIDOS','ARTIS / LAGU ORISINAL / PERMINTAAN'],
    ['COVERS','カバー','VERSIONES','COVERS','COVER'],
    ['COVER','カバー','VERSIÓN','COVER','COVER'],
    ['ORIGINALS','オリジナル','ORIGINALES','ORIGINAIS','ORISINAL'],
    ['ORIGINAL','オリジナル','ORIGINAL','ORIGINAL','ORISINAL'],
    ['REQUESTS','リクエスト','PETICIONES','PEDIDOS','PERMINTAAN'],
    ['Visual Kei classics, revisited','Visual Keiの名曲を、もう一度','Clásicos del visual kei, reinterpretados','Clássicos do visual kei, reinterpretados','Klasik visual kei, dibawakan kembali'],
    ['The next chapter','次の物語へ','El próximo capítulo','O próximo capítulo','Bab berikutnya'],
    ['Connect on TikTok','TikTokでつながる','Conecta en TikTok','Conecte-se no TikTok','Terhubung di TikTok'],
    ['SELECT AN ARTIST · EXPLORE THE MUSIC','アーティストを選んで、音楽を探す','ELIGE UN ARTISTA · DESCUBRE SU MÚSICA','ESCOLHA UM ARTISTA · DESCUBRA A MÚSICA','PILIH ARTIS · TEMUKAN MUSIKNYA'],
    ['SELECT AN ARTIST','アーティストを選ぶ','ELIGE UN ARTISTA','ESCOLHA UM ARTISTA','PILIH ARTIS'],
    ['ALL','すべて','TODO','TODOS','SEMUA'],
    ['ALL ARTISTS','すべてのアーティスト','TODOS LOS ARTISTAS','TODOS OS ARTISTAS','SEMUA ARTIS'],
    ['ALL PERFORMANCES','すべての演奏','TODAS LAS ACTUACIONES','TODAS AS APRESENTAÇÕES','SEMUA PENAMPILAN'],
    ['PERFORMANCES','演奏','ACTUACIONES','APRESENTAÇÕES','PENAMPILAN'],
    ['No songs in this category yet. / このカテゴリの曲は準備中です。','このカテゴリの曲は準備中です。','Aún no hay canciones en esta categoría.','Ainda não há músicas nesta categoria.','Belum ada lagu dalam kategori ini.'],
    ['AI VOCAL DEMO · 45 SEC','AI歌唱デモ · 45秒','DEMO CON VOZ DE IA · 45 S','DEMO COM VOZ DE IA · 45 S','DEMO VOKAL AI · 45 DETIK'],
    ['AI-sung original demo. / AI歌唱によるオリジナル曲の試聴版です。','AI歌唱によるオリジナル曲の試聴版です。','Demo de una canción original cantada por IA.','Demo de uma música original cantada por IA.','Demo lagu orisinal yang dinyanyikan AI.'],
    ['LISTEN / 試聴する ↓','試聴する ↓','ESCUCHAR ↓','OUVIR ↓','DENGARKAN ↓'],
    ['LOAD TIKTOK VIDEO ▶','TikTok動画を読み込む ▶','CARGAR VIDEO DE TIKTOK ▶','CARREGAR VÍDEO DO TIKTOK ▶','MUAT VIDEO TIKTOK ▶'],
    ['WATCH ON TIKTOK ↗','TikTokで見る ↗','VER EN TIKTOK ↗','ASSISTIR NO TIKTOK ↗','TONTON DI TIKTOK ↗'],
    ['OPEN ON TIKTOK ↗','TikTokで開く ↗','ABRIR EN TIKTOK ↗','ABRIR NO TIKTOK ↗','BUKA DI TIKTOK ↗'],
    ['殉 -jun · ORIGINAL MUSIC','殉 -jun · オリジナル曲','殉 -jun · MÚSICA ORIGINAL','殉 -jun · MÚSICA ORIGINAL','殉 -jun · MUSIK ORISINAL'],
    ['Which song should awaken in jun’s real voice?','どの曲を、殉本人の声で聴きたいですか？','¿Qué canción quieres escuchar con la voz de jun?','Qual música você quer ouvir na voz de jun?','Lagu mana yang ingin kamu dengar dengan suara jun?'],
    ['AI vocal demos of original songs. Listen, discover, and help shape what comes next.','オリジナル曲のAI歌唱デモ。聴いて、出会って、次の歌声を一緒に。','Escucha demos originales con voz de IA y ayuda a elegir lo que viene.','Ouça demos originais com voz de IA e ajude a escolher o que vem a seguir.','Dengarkan demo lagu orisinal dengan vokal AI dan bantu pilih karya berikutnya.'],
    ['ORIGINAL DEMO 01 · AI VOCAL DEMO','オリジナルデモ 01 · AI歌唱','DEMO ORIGINAL 01 · VOZ DE IA','DEMO ORIGINAL 01 · VOZ DE IA','DEMO ORISINAL 01 · VOKAL AI'],
    ['Original song by 殉 -jun · 45-second preview','殉 -jun オリジナル曲 · 45秒試聴版','Canción original de 殉 -jun · Avance de 45 segundos','Música original de 殉 -jun · Prévia de 45 segundos','Lagu orisinal oleh 殉 -jun · Cuplikan 45 detik'],
    ['This is an AI-sung demo, not a recording of jun’s own vocals. Only the preview is available here.','AIによる歌唱デモです。殉本人の歌唱音源ではありません。ここでは試聴版を公開しています。','Esta demo está cantada por IA, no por jun. Aquí solo está disponible un avance.','Esta demo é cantada por IA, não por jun. Aqui está disponível apenas uma prévia.','Demo ini dinyanyikan AI, bukan jun. Hanya cuplikannya yang tersedia di sini.'],
    ["VOTE FOR JUN'S REAL VOCAL VERSION",'本人歌唱してほしい曲に投票','VOTA PARA QUE JUN LA CANTE','VOTE PARA JUN CANTAR','PILIH LAGU UNTUK DINYANYIKAN JUN'],
    ['Which song would you like jun to sing?','殉に歌ってほしい曲は？','¿Qué canción quieres que cante jun?','Qual música você quer que jun cante?','Lagu apa yang ingin kamu dengar dinyanyikan jun?'],
    ['本人の声で聴きたい曲を、あなたの一票で。','本人の声で聴きたい曲を、あなたの一票で。','Tu voto ayuda a elegir su próxima canción.','Seu voto ajuda a escolher a próxima música.','Suaramu membantu memilih lagu berikutnya.'],
    ['VOTE ↗','投票する ↗','VOTAR ↗','VOTAR ↗','BERI SUARA ↗'],
    ['Voting is not open yet. / 投票受付は準備中です。','投票受付は準備中です。','La votación aún no está abierta.','A votação ainda não está aberta.','Pemungutan suara belum dibuka.'],
    ['Voting opens in an external service. / 外部サービスの投票ページが開きます。','外部サービスの投票ページが開きます。','La votación se abre en un servicio externo.','A votação abre em um serviço externo.','Halaman pemungutan suara dibuka di layanan eksternal.'],
    ['After twenty years, the music begins again.','20年の時を経て、音楽が再び始まる。','Después de veinte años, la música vuelve a comenzar.','Depois de vinte anos, a música recomeça.','Setelah dua puluh tahun, musik kembali dimulai.'],
    ['Revisiting the sounds of visual kei, and creating what comes next.','Visual Keiの音に再び向き合い、その先を創る。','Volviendo al sonido del visual kei y creando lo que viene.','Revisitando o som do visual kei e criando o que vem a seguir.','Kembali menyelami suara visual kei dan menciptakan karya berikutnya.'],
    ['Same soul. A new story.','変わらない魂。新しい物語。','La misma alma. Una nueva historia.','A mesma alma. Uma nova história.','Jiwa yang sama. Kisah yang baru.'],
    ['THE STORY CONTINUES','物語は続く','LA HISTORIA CONTINÚA','A HISTÓRIA CONTINUA','KISAH BERLANJUT'],
    ['Share your thoughts and cover requests on TikTok.','感想やカバーのリクエストはTikTokへ。','Comparte tus opiniones y peticiones de versiones en TikTok.','Compartilhe suas opiniões e pedidos de covers no TikTok.','Bagikan pendapat dan permintaan cover di TikTok.'],
    ['感想やカバーのリクエストは、TikTokのコメントへ。','TikTokのコメントでお待ちしています。','Te esperamos en los comentarios de TikTok.','Esperamos você nos comentários do TikTok.','Kami menantimu di komentar TikTok.'],
    ['FAN COMMUNITY ↗','ファンコミュニティ ↗','COMUNIDAD DE FANS ↗','COMUNIDADE DE FÃS ↗','KOMUNITAS PENGGEMAR ↗'],
    ['Privacy','プライバシー','Privacidad (japonés)','Privacidade (japonês)','Privasi (bahasa Jepang)'],
    ['Loading music… / 読み込み中…','音楽を読み込み中…','Cargando música…','Carregando músicas…','Memuat musik…'],
    ['The archive could not load. Please reload, or visit TikTok. / 一覧を読み込めませんでした。再読み込みするか、TikTokをご覧ください。','一覧を読み込めませんでした。再読み込みするか、TikTokをご覧ください。','No se pudo cargar el archivo. Recarga la página o visita TikTok.','Não foi possível carregar o arquivo. Recarregue a página ou visite o TikTok.','Arsip tidak dapat dimuat. Muat ulang halaman atau kunjungi TikTok.'],
    ['Audio could not load. Please reload and try again. / 音源を読み込めませんでした。再読み込みしてください。','音源を読み込めませんでした。再読み込みしてください。','No se pudo cargar el audio. Recarga la página.','Não foi possível carregar o áudio. Recarregue a página.','Audio tidak dapat dimuat. Muat ulang halaman.'],
    ['Your browser does not support audio playback.','このブラウザーは音声再生に対応していません。','Tu navegador no admite la reproducción de audio.','Seu navegador não suporta reprodução de áudio.','Browser ini tidak mendukung pemutaran audio.']
  ];
  const dictionary = new Map(rows.map(row => [row[0], row]));
  const english = {
    '本人の声で聴きたい曲を、あなたの一票で。': 'Your vote helps choose the next song.',
    '感想やカバーのリクエストは、TikTokのコメントへ。': 'See you in the TikTok comments.',
    'LISTEN / 試聴する ↓': 'LISTEN ↓'
  };
  const originalNodes = new WeakMap();
  const requested = new URL(location.href).searchParams.get('lang') || navigator.language.split('-')[0];
  let language = languages.includes(requested) ? requested : 'en';
  function translate(text) {
    const row = dictionary.get(text);
    if (row) return language === 'en' ? (english[text] || (text.includes(' / ') && /[\u3040-\u30ff]/.test(text) ? text.split(' / ')[0] : text)) : row[languages.indexOf(language)];
    const count = text.match(/^(\d+) SONGS?$/);
    if (count) return `${count[1]} ${({en:Number(count[1]) === 1 ? 'SONG' : 'SONGS',ja:'曲',es:Number(count[1]) === 1 ? 'CANCIÓN' : 'CANCIONES',pt:Number(count[1]) === 1 ? 'MÚSICA' : 'MÚSICAS',id:'LAGU'})[language]}`;
    const suffix = text.match(/^(.*) \/ (COVER|ORIGINAL|PERFORMANCES)$/);
    if (suffix) return `${suffix[1]} / ${translate(suffix[2])}`;
    return text;
  }
  function localize() {
    document.documentElement.lang = language;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (node.parentElement.closest('script,style,select,.language-picker')) continue;
      const previous = originalNodes.get(node);
      const source = previous && node.nodeValue === previous.output ? previous.source : node.nodeValue;
      const trimmed = source.trim();
      const output = source.replace(trimmed, translate(trimmed));
      if (node.nodeValue !== output) node.nodeValue = output;
      originalNodes.set(node, {source,output});
    }
    document.querySelectorAll('.load-video').forEach(button => button.setAttribute('aria-label',button.closest('article').querySelector('h3').textContent + ' — ' + translate('LOAD TIKTOK VIDEO ▶')));
    document.querySelector('audio').setAttribute('aria-label','哀の花 / Ai no Hana — '+translate('AI VOCAL DEMO · 45 SEC'));
    document.querySelectorAll('main [lang]').forEach(node => node.removeAttribute('lang'));
  }
  const picker = document.createElement('label');
  picker.className = 'language-picker';
  picker.textContent = 'Language ';
  const select = document.createElement('select');
  select.setAttribute('aria-label','Language / 言語');
  [['ja','日本語'],['en','English'],['es','Español'],['pt','Português'],['id','Bahasa Indonesia']].forEach(([value,label]) => {
    const option = document.createElement('option'); option.value = value; option.textContent = label; select.append(option);
  });
  select.value = language; picker.append(select); document.body.prepend(picker);
  const languageStyles = document.createElement('style');
  languageStyles.textContent = '.language-picker{display:flex;justify-content:flex-end;align-items:center;gap:10px;padding:10px 18px;background:#050916;color:#b9caf0;font:13px system-ui;letter-spacing:.04em}.language-picker select{max-width:65vw;min-height:44px;padding:8px 12px;background:#0b1530;color:#e6edff;border:1px solid #6379b6;font:inherit}.menu{max-width:calc(100vw - 32px);min-width:220px}.menu a,.link,.filter,.artist-choice,.scroll{overflow-wrap:anywhere}.aw-title,.section h2{overflow-wrap:anywhere}html[lang=ja] body{line-height:1.7}';
  document.head.append(languageStyles);
  select.addEventListener('change', () => {
    language = select.value;
    const url = new URL(location.href); url.searchParams.set('lang',language); history.replaceState(null,'',url);
    localize();
  });

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
    localize();
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
    localize();
  });
  fetch('settings.json').then(r => { if (!r.ok) throw Error(); return r.json(); }).then(settings => {
    if (externalUrl(settings.voteUrl)) {
      $('vote-link').href = settings.voteUrl; $('vote-link').hidden = false;
      $('vote-status').textContent = 'Voting opens in an external service. / 外部サービスの投票ページが開きます。';
    }
    if (externalUrl(settings.communityUrl)) {
      $('community-link').href = settings.communityUrl; $('community-link').hidden = false;
    }
    localize();
  }).catch(() => {});
  const audio = document.querySelector('audio');
  audio.addEventListener('error', () => {
    if (!$('audio-error')) {
      const note = el('p','aw-note','Audio could not load. Please reload and try again. / 音源を読み込めませんでした。再読み込みしてください。');
      note.id = 'audio-error'; audio.after(note); localize();
    }
  },true);
  localize();
})();
