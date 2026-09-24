/* Primitivas de montagem. Toda cena é composta só destas, o que dá coesão ao movimento:
   rise, reveal, pop, draw (mais count e o "ambiente": drift, giro, flutuar, pulso).
   Curvas e durações vêm dos tokens em css/tokens.css (nada de curva solta aqui).
   Só transform/opacity (mais clip-path e stroke-dashoffset em SVG pequeno). */
(function (root) {
  'use strict';
  var NL = root.NadicLoop = root.NadicLoop || {};

  function tok(nome) { return root.getComputedStyle(root.document.documentElement).getPropertyValue(nome).trim(); }
  function ms(nome) { return parseFloat(tok(nome)); }

  /* prefers-reduced-motion: menos movimento, não zero. Toda entrada vira um fade (opacity), sem deslocamento,
     escala nem recorte; o "ambiente" (deriva, giro, flutuação, pulso, varredura) não existe. */
  var reduzido = !!(root.matchMedia && root.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var AMBIENTE = { drift: 1, giro: 1, flutuar: 1, pulso: 1, varrer: 1 };
  var MOVIMENTO = { rise: 1, reveal: 1, pop: 1, draw: 1 };

  /* ---- criação de animações (Web Animations API: roda no compositor e é "buscável") ---- */
  var FABRICAS = {
    rise: function () {
      return { kf: [{ opacity: 0, transform: 'translateY(24px)' }, { opacity: 1, transform: 'none' }],
               d: ms('--dur-m'), e: tok('--ease-out') };
    },
    reveal: function (el, b) {
      var de = { lr: 'inset(0 100% 0 0)', rl: 'inset(0 0 0 100%)', bt: 'inset(100% 0 0 0)', tb: 'inset(0 0 100% 0)' };
      return { kf: [{ clipPath: de[b.dir || 'lr'] }, { clipPath: 'inset(0 0 0 0)' }],
               d: ms('--dur-l'), e: tok('--ease-out') };
    },
    pop: function (el, b) {
      return { kf: [{ opacity: 0, transform: 'scale(0.92)' }, { opacity: 1, transform: 'scale(1)' }],
               d: ms('--dur-s'), e: tok('--ease-out'), origem: b.origem || 'center' };
    },
    draw: function (el, b) {
      if (el instanceof root.SVGGeometryElement) {
        el.style.strokeDasharray = '1';   // pathLength="1" no HTML: o traço vai de 1 (oculto) a 0 (inteiro)
        return { kf: [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], d: ms('--dur-s'), e: tok('--ease-out') };
      }
      var y = b.eixo === 'y';
      return { kf: [{ transform: y ? 'scaleY(0)' : 'scaleX(0)' }, { transform: y ? 'scaleY(1)' : 'scaleX(1)' }],
               d: ms('--dur-s'), e: tok('--ease-out'), origem: b.origem || (y ? '50% 0' : '0 50%') };
    },
    /* utilitárias */
    surgir: function (el, b) {   // o elemento "aparece" onde um FLIP acabou de pousar (fade curto, sem deslocamento)
      return { kf: [{ opacity: 0 }, { opacity: 1 }], d: b.d || 120, e: 'linear' };
    },
    varrer: function (el, b) {   // a fita fina como scanner: corre `dx` px e some ao fim
      return { kf: [{ transform: 'translateX(0)', opacity: 1 },
                    { transform: 'translateX(' + b.dx + 'px)', opacity: 1, offset: 0.9 },
                    { transform: 'translateX(' + b.dx + 'px)', opacity: 0 }],
               d: b.d || ms('--dur-l'), e: tok('--ease-out') };
    },
    /* ambiente: só durante o "segurar" */
    drift: function (el, b) {
      return { kf: [{ transform: 'scale(1)' }, { transform: 'scale(' + (b.escala || 1.04) + ')' }],
               d: b.d, e: 'linear', origem: b.origem || 'center' };
    },
    giro: function (el, b) {
      return { kf: [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }],
               d: b.d || 40000, e: 'linear', iter: Infinity, origem: 'center' };
    },
    flutuar: function (el, b) {   // vai e volta; `kf` troca o movimento (o volume 3D do HAPI oscila em rotateY)
      return { kf: b.kf || [{ transform: 'translateY(-6px)' }, { transform: 'translateY(6px)' }],
               d: b.d || 3000, e: tok('--ease-in-out'), iter: Infinity, dir: 'alternate' };
    },
    pulso: function (el, b) {
      return { kf: b.kf, d: b.d || 2400, e: 'linear', iter: Infinity };
    }
  };

  /* Cria a animação de UM elemento para um beat, pausada em 0 (com fill "both" o estado inicial já vale). */
  function criar(el, beat, k) {
    var f = FABRICAS[beat.a];
    if (!f) throw new Error('primitiva desconhecida: ' + beat.a);
    var c = f(el, beat);
    if (reduzido && MOVIMENTO[beat.a]) c = { kf: [{ opacity: 0 }, { opacity: 1 }], d: ms('--dur-s'), e: tok('--ease-out') };
    if (c.origem && !reduzido) el.style.transformOrigin = c.origem;
    var atraso = (beat.t || 0) + (k || 0) * (beat.gap || 0);
    // ease: 'in-out' é para movimentos que atravessam a tela (varredura, revelação sincronizada com ela)
    var a = el.animate(c.kf, {
      delay: atraso, duration: beat.d || c.d, easing: beat.ease === 'in-out' ? tok('--ease-in-out') : c.e, fill: 'both',
      iterations: c.iter || 1, direction: c.dir || 'normal'
    });
    a.pause();
    return a;
  }

  /* ---- contagem (JS): renderiza o texto em função do tempo local, então também é determinística ---- */
  function bezier(x1, y1, x2, y2) {
    function cx(t) { return 3 * (1 - t) * (1 - t) * t * x1 + 3 * (1 - t) * t * t * x2 + t * t * t; }
    function cy(t) { return 3 * (1 - t) * (1 - t) * t * y1 + 3 * (1 - t) * t * t * y2 + t * t * t; }
    return function (x) {
      if (x <= 0) return 0;
      if (x >= 1) return 1;
      var lo = 0, hi = 1, t = x;
      for (var i = 0; i < 30; i++) { t = (lo + hi) / 2; if (cx(t) < x) lo = t; else hi = t; }
      return cy(t);
    };
  }
  function curvaDoToken() {
    var m = tok('--ease-out').match(/cubic-bezier\(([^)]+)\)/);
    var p = m[1].split(',').map(parseFloat);
    return bezier(p[0], p[1], p[2], p[3]);
  }

  function formatar(v, cfg) {
    var casas = cfg.casas || 0;
    var s = new root.Intl.NumberFormat('pt-BR', { minimumFractionDigits: casas, maximumFractionDigits: casas }).format(v);
    return (cfg.prefixo || '') + s + (cfg.sufixo || '');
  }

  function contagem(el, cfg) {
    var curva = curvaDoToken();
    var t0 = cfg.t || 0, dur = cfg.d || 900;
    // largura travada no valor final: os dígitos mudam e o layout não se mexe
    el.textContent = formatar(cfg.to, cfg);
    el.style.display = 'inline-block';
    el.style.fontVariantNumeric = 'tabular-nums';
    el.style.minWidth = el.getBoundingClientRect().width / escalaDoPalco() + 'px';
    function render(t) {
      var p = curva(Math.min(1, Math.max(0, (t - t0) / dur)));
      el.textContent = formatar(cfg.to * p, cfg);
    }
    render(0);
    return { render: render, t0: t0, dur: dur };
  }

  function escalaDoPalco() {
    var p = root.document.getElementById('palco');
    return p ? p.getBoundingClientRect().width / p.offsetWidth : 1;
  }

  NL.primitivas = { criar: criar, contagem: contagem, tok: tok, ms: ms, reduzido: reduzido, ambiente: AMBIENTE };
})(window);
