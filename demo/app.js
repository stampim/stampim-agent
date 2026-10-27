/* Fictional "Granit" app — for local demonstration only.
   All data, names and organisations are made up.
   ?lang=en switches the page to English; without it the page stays in Russian. */
(function () {
  'use strict';

  var LANG = /^en/i.test(new URLSearchParams(window.location.search).get('lang') || '') ? 'en' : 'ru';

  var DATA = {
    ru: {
      title: 'Гранит — склад и заявки',
      brandMark: 'Г',
      brand: 'Гранит <span class="brand-sub">склад и заявки</span>',
      tabs: { requests: 'Заявки', stock: 'Склад' },
      userName: { manager: 'Анна Соколова · менеджер', storekeeper: 'Игорь Лебедев · кладовщик' },
      roleLabel: 'Роль',
      roles: { manager: 'Менеджер', storekeeper: 'Кладовщик' },
      requestsTitle: 'Заявки клиентов',
      requestsUpdated: 'Обновлено сегодня, 10:24',
      stockTitle: 'Склад',
      stockUpdated: 'Остатки по региону «Север»',
      metrics: { open: 'открытых заявок', overdue: 'просрочено', high: 'высокий приоритет' },
      th: { client: 'Клиент', item: 'Позиция', qty: 'Кол-во', status: 'Статус', priority: 'Приоритет', due: 'Срок', sum: 'Сумма' },
      embedTitle: 'Встраивание — одна строка',
      embedButton: 'Встроить агента',
      statuses: { overdue: 'Просрочена', progress: 'В работе', 'new': 'Новая', closed: 'Закрыта' },
      priorities: { high: 'Высокий', normal: 'Обычный' },
      stockLine: function (qty, min, low) {
        return 'Остаток: <b class="' + (low ? 'low-stock' : '') + '">' + qty + '</b>' +
          ' · минимум: <b>' + min + '</b>' + (low ? ' · ниже минимума' : '');
      },
      stockSupplier: 'Поставщик: ',
      stockPrice: 'Закупка: ',
      modalTitle: 'Заявка № ',
      modalLabels: { client: 'Клиент', item: 'Позиция', qty: 'Количество', status: 'Статус', priority: 'Приоритет', due: 'Срок', delivery: 'Доставка', sum: 'Сумма' },
      money: function (n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₽'; },
      widgetPlaceholder: 'Что ищете?',
      widgetGreeting: 'Привет! Я Slyder — помогу сориентироваться на этой странице. Что ищете?'
    },
    en: {
      title: 'Granit — warehouse & requests',
      brandMark: 'G',
      brand: 'Granit <span class="brand-sub">warehouse &amp; requests</span>',
      tabs: { requests: 'Requests', stock: 'Stock' },
      userName: { manager: 'Anna Sokolova · manager', storekeeper: 'Igor Lebedev · storekeeper' },
      roleLabel: 'Role',
      roles: { manager: 'Manager', storekeeper: 'Storekeeper' },
      requestsTitle: 'Customer requests',
      requestsUpdated: 'Updated today, 10:24',
      stockTitle: 'Stock',
      stockUpdated: 'Stock levels · region “North”',
      metrics: { open: 'open requests', overdue: 'overdue', high: 'high priority' },
      th: { client: 'Customer', item: 'Item', qty: 'Qty', status: 'Status', priority: 'Priority', due: 'Due', sum: 'Total' },
      embedTitle: 'Embedding — one line',
      embedButton: 'Embed the agent',
      statuses: { overdue: 'Overdue', progress: 'In progress', 'new': 'New', closed: 'Closed' },
      priorities: { high: 'High', normal: 'Normal' },
      stockLine: function (qty, min, low) {
        return 'Stock: <b class="' + (low ? 'low-stock' : '') + '">' + qty + '</b>' +
          ' · min: <b>' + min + '</b>' + (low ? ' · below minimum' : '');
      },
      stockSupplier: 'Supplier: ',
      stockPrice: 'Purchase: ',
      modalTitle: 'Request # ',
      modalLabels: { client: 'Customer', item: 'Item', qty: 'Quantity', status: 'Status', priority: 'Priority', due: 'Due', delivery: 'Delivery', sum: 'Total' },
      money: function (n) { return '$' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ','); },
      widgetPlaceholder: 'What are you looking for?',
      widgetGreeting: "Hi! I'm Slyder — I'll help you navigate this page. What are you looking for?"
    }
  };
  var D = DATA[LANG];

  var REQUESTS = [
    { id: 1041, client: 'ООО «Ритм»', clientEn: 'Ritm LLC', item: 'Кабель ВВГ 3×2,5', itemEn: 'Cable VVG 3×2.5', qty: '120 м', qtyEn: '120 m', status: 'progress', priority: 'normal', due: '24.10', dueEn: '24 Oct', sum: 18400 },
    { id: 1042, client: 'ООО «Кварц»', clientEn: 'Kvarts LLC', item: 'Щит ЩРН-12', itemEn: 'ShchRN-12 panel', qty: '2 шт', qtyEn: '2 pcs', status: 'overdue', priority: 'high', due: '21.10', dueEn: '21 Oct', sum: 128400 },
    { id: 1043, client: 'ООО «Лада-Сервис»', clientEn: 'Lada-Service LLC', item: 'Автомат C16', itemEn: 'C16 breaker', qty: '40 шт', qtyEn: '40 pcs', status: 'new', priority: 'normal', due: '25.10', dueEn: '25 Oct', sum: 9600 },
    { id: 1044, client: 'ООО «Ритм»', clientEn: 'Ritm LLC', item: 'Лоток металлический 200 мм', itemEn: 'Metal tray 200 mm', qty: '30 м', qtyEn: '30 m', status: 'progress', priority: 'normal', due: '26.10', dueEn: '26 Oct', sum: 21300 },
    { id: 1045, client: 'ООО «Сфера»', clientEn: 'Sfera LLC', item: 'Розетка 16А', itemEn: '16A socket', qty: '100 шт', qtyEn: '100 pcs', status: 'overdue', priority: 'high', due: '20.10', dueEn: '20 Oct', sum: 7200 },
    { id: 1046, client: 'ООО «Кварц»', clientEn: 'Kvarts LLC', item: 'Кабель ВВГ 5×6', itemEn: 'Cable VVG 5×6', qty: '80 м', qtyEn: '80 m', status: 'new', priority: 'high', due: '27.10', dueEn: '27 Oct', sum: 44800 },
    { id: 1047, client: 'ООО «Лада-Сервис»', clientEn: 'Lada-Service LLC', item: 'Светильник LED 36 Вт', itemEn: 'LED light 36 W', qty: '24 шт', qtyEn: '24 pcs', status: 'progress', priority: 'normal', due: '28.10', dueEn: '28 Oct', sum: 31200 },
    { id: 1048, client: 'ООО «Сфера»', clientEn: 'Sfera LLC', item: 'Гофра ПВХ 25 мм', itemEn: 'PVC conduit 25 mm', qty: '200 м', qtyEn: '200 m', status: 'closed', priority: 'normal', due: '19.10', dueEn: '19 Oct', sum: 6400 }
  ];

  var STOCK = [
    { title: 'Кабель ВВГ 3×2,5', titleEn: 'Cable VVG 3×2.5', qty: '840 м', qtyEn: '840 m', min: 300, supplier: 'Кабель-Юг', supplierEn: 'Kabel-Yug', price: '68 ₽/м', priceEn: '$68/m' },
    { title: 'Щит ЩРН-12', titleEn: 'ShchRN-12 panel', qty: '7 шт', qtyEn: '7 pcs', min: 10, supplier: 'Электрощит-М', supplierEn: 'Elektroshchit-M', price: '41 200 ₽', priceEn: '$41,200' },
    { title: 'Автомат C16', titleEn: 'C16 breaker', qty: '320 шт', qtyEn: '320 pcs', min: 100, supplier: 'Электрощит-М', supplierEn: 'Elektroshchit-M', price: '180 ₽', priceEn: '$180' },
    { title: 'Лоток металлический 200 мм', titleEn: 'Metal tray 200 mm', qty: '95 м', qtyEn: '95 m', min: 50, supplier: 'МеталлПрофиль', supplierEn: 'MetallProfil', price: '520 ₽/м', priceEn: '$520/m' },
    { title: 'Розетка 16А', titleEn: '16A socket', qty: '1 200 шт', qtyEn: '1,200 pcs', min: 500, supplier: 'Кабель-Юг', supplierEn: 'Kabel-Yug', price: '54 ₽', priceEn: '$54' },
    { title: 'Светильник LED 36 Вт', titleEn: 'LED light 36 W', qty: '18 шт', qtyEn: '18 pcs', min: 20, supplier: 'СветоТех', supplierEn: 'SvetoTekh', price: '980 ₽', priceEn: '$980' }
  ];

  var ADDRESSES = {
    1041: ['Северный склад, зона B', 'North warehouse, zone B'],
    1042: ['Объект «Кварц-2», ул. Заводская, 14', 'Kvarts-2 site, Zavodskaya st., 14'],
    1043: ['Объект «Лада-Сервис», пр-т Мира, 8', 'Lada-Service site, Mira ave., 8'],
    1044: ['Северный склад, зона C', 'North warehouse, zone C'],
    1045: ['Объект «Сфера», ул. Полевая, 3', 'Sfera site, Polevaya st., 3'],
    1046: ['Объект «Кварц-2», ул. Заводская, 14', 'Kvarts-2 site, Zavodskaya st., 14'],
    1047: ['Объект «Лада-Сервис», пр-т Мира, 8', 'Lada-Service site, Mira ave., 8'],
    1048: ['Северный склад, зона A', 'North warehouse, zone A']
  };

  var role = 'manager';
  var screen = 'requests';

  function pick(pair) { return LANG === 'en' ? pair[1] : pair[0]; }
  function money(n) { return D.money(n); }

  function statusClass(s) {
    if (s === 'overdue') return 'badge-overdue';
    if (s === 'progress') return 'badge-progress';
    if (s === 'new') return 'badge-new';
    return 'badge-closed';
  }

  function renderRequests() {
    var body = document.getElementById('req-body');
    var html = '';
    REQUESTS.forEach(function (r) {
      html += '<tr class="req-row" data-id="' + r.id + '">' +
        '<td>' + r.id + '</td>' +
        '<td>' + (LANG === 'en' ? r.clientEn : r.client) + '</td>' +
        '<td>' + (LANG === 'en' ? r.itemEn : r.item) + '</td>' +
        '<td class="num">' + (LANG === 'en' ? r.qtyEn : r.qty) + '</td>' +
        '<td><span class="badge ' + statusClass(r.status) + '">' + D.statuses[r.status] + '</span></td>' +
        '<td class="' + (r.priority === 'high' ? 'prio-high' : 'prio-normal') + '">' + D.priorities[r.priority] + '</td>' +
        '<td>' + (LANG === 'en' ? r.dueEn : r.due) + '</td>' +
        (role === 'manager' ? '<td class="num sum-col">' + money(r.sum) + '</td>' : '') +
        '</tr>';
    });
    body.innerHTML = html;
    document.querySelectorAll('.sum-col').forEach(function (el) {
      el.style.display = role === 'manager' ? '' : 'none';
    });
  }

  function renderStock() {
    var grid = document.getElementById('stock-grid');
    var html = '';
    STOCK.forEach(function (s) {
      var low = parseInt(s.qty, 10) < s.min;
      html += '<article class="stock-card">' +
        '<h3>' + (LANG === 'en' ? s.titleEn : s.title) + '</h3>' +
        '<div class="stock-line">' + D.stockLine(LANG === 'en' ? s.qtyEn : s.qty, s.min, low) + '</div>' +
        '<div class="stock-line">' + D.stockSupplier + '<b>' + (LANG === 'en' ? s.supplierEn : s.supplier) + '</b></div>' +
        (role === 'manager' ? '<div class="stock-price">' + D.stockPrice + '<b>' + (LANG === 'en' ? s.priceEn : s.price) + '</b></div>' : '') +
        '</article>';
    });
    grid.innerHTML = html;
  }

  function renderAll() {
    document.getElementById('user-name').textContent = D.userName[role];
    renderRequests();
    renderStock();
    closeModal();
  }

  function openModal(id) {
    var r = REQUESTS.filter(function (x) { return String(x.id) === String(id); })[0];
    if (!r) return;
    var rows = [
      [D.modalLabels.client, LANG === 'en' ? r.clientEn : r.client],
      [D.modalLabels.item, LANG === 'en' ? r.itemEn : r.item],
      [D.modalLabels.qty, LANG === 'en' ? r.qtyEn : r.qty],
      [D.modalLabels.status, D.statuses[r.status]],
      [D.modalLabels.priority, D.priorities[r.priority]],
      [D.modalLabels.due, LANG === 'en' ? r.dueEn : r.due],
      [D.modalLabels.delivery, pick(ADDRESSES[r.id] || ['—', '—'])]
    ];
    if (role === 'manager') rows.push([D.modalLabels.sum, money(r.sum)]);
    var html = '<h2>' + D.modalTitle + r.id + '</h2><div class="modal-sub">' +
      (LANG === 'en' ? r.clientEn : r.client) + ' · ' + (LANG === 'en' ? r.itemEn : r.item) + '</div>';
    rows.forEach(function (pair) {
      html += '<div class="modal-row"><span>' + pair[0] + '</span><span>' + pair[1] + '</span></div>';
    });
    document.getElementById('modal-body').innerHTML = html;
    document.getElementById('detail-modal').classList.add('is-open');
  }

  function closeModal() {
    document.getElementById('detail-modal').classList.remove('is-open');
  }

  function applyStaticI18n() {
    if (LANG !== 'en') return;
    document.documentElement.lang = 'en';
    document.title = D.title;
    document.querySelector('.brand-mark').textContent = D.brandMark;
    document.querySelector('.brand-text').innerHTML = D.brand;
    document.querySelectorAll('.tab').forEach(function (t) {
      t.textContent = D.tabs[t.getAttribute('data-screen')] || t.textContent;
    });
    document.getElementById('role-label-text').textContent = D.roleLabel;
    document.querySelectorAll('#role-select option').forEach(function (o) {
      o.textContent = D.roles[o.value] || o.textContent;
    });
    document.getElementById('requests-title').textContent = D.requestsTitle;
    document.getElementById('requests-updated').textContent = D.requestsUpdated;
    document.getElementById('stock-title').textContent = D.stockTitle;
    document.getElementById('stock-updated').textContent = D.stockUpdated;
    document.querySelectorAll('[data-metric]').forEach(function (el) {
      el.textContent = D.metrics[el.getAttribute('data-metric')] || el.textContent;
    });
    document.querySelectorAll('[data-th]').forEach(function (el) {
      el.textContent = D.th[el.getAttribute('data-th')] || el.textContent;
    });
    document.getElementById('embed-title').textContent = D.embedTitle;
    document.getElementById('embed-btn').textContent = D.embedButton;
  }

  // The agent widget is a product file and is not modified here. The English
  // demo shell only localises the widget's visible strings (greeting and input
  // placeholder) so the video does not mix languages.
  function localizeWidget() {
    if (LANG !== 'en') return;
    var input = document.getElementById('eg-input');
    if (input) input.placeholder = D.widgetPlaceholder;
    var first = document.querySelector('#eg-messages .eg-msg.eg-bot');
    if (first && first.textContent.charAt(0) === 'П') first.textContent = D.widgetGreeting;
  }

  document.getElementById('req-body').addEventListener('click', function (e) {
    var tr = e.target.closest('tr');
    if (tr) openModal(tr.getAttribute('data-id'));
  });
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('detail-modal').addEventListener('click', function (e) {
    if (e.target.id === 'detail-modal') closeModal();
  });

  document.querySelectorAll('.tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      screen = tab.getAttribute('data-screen');
      document.querySelectorAll('.tab').forEach(function (t) { t.classList.toggle('is-active', t === tab); });
      document.querySelectorAll('.screen').forEach(function (s) {
        s.classList.toggle('is-active', s.id === 'screen-' + screen);
      });
    });
  });

  document.getElementById('role-select').addEventListener('change', function (e) {
    role = e.target.value;
    renderAll();
  });

  document.getElementById('embed-btn').addEventListener('click', function () {
    var panel = document.getElementById('embed-panel');
    var s = document.createElement('script');
    s.src = '/agent.js';
    if (LANG === 'en') {
      s.addEventListener('load', function () {
        localizeWidget();
        setTimeout(localizeWidget, 0);
      });
    }
    document.body.appendChild(s);
    panel.classList.add('is-hidden');
  });

  applyStaticI18n();
  renderAll();

  // Helpers for recording the video (do not affect demo behaviour).
  window.demoCaption = function (text) {
    var el = document.getElementById('video-caption');
    el.textContent = text || '';
    el.classList.toggle('is-visible', !!text);
  };
  window.moveCursor = function (x, y) {
    var el = document.getElementById('fake-cursor');
    el.style.left = x + 'px';
    el.style.top = y + 'px';
  };
})();
