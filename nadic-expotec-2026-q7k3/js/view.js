/* Camada visual: aplica o estado da linha do tempo (NadicLoop.at) ao DOM.

   aplicar(est, {seek})  reposiciona TUDO de forma determinística (testes, folhas de contato, recuperação).
   quadro(est, {snap})   chamada a cada quadro ao vivo; só faz trabalho quando a "assinatura" do estado muda
                         (cena entrou/saiu, transição começou/terminou) ou quando há contagem em andamento. */
(function (root) {
  'use strict';
  var NL = root.NadicLoop = root.NadicLoop || {};
  var P = NL.primitivas, C = NL.choreography;
  var doc = root.document;

  var palco, cenas = [], rigs = {}, trilho = {}, ultimaAssinatura = null;

  /* ---------- escala do palco ---------- */
  function escalar() {
    var k = Math.min(root.innerWidth / 1920, root.innerHeight / 1080);
    palco.style.transform = 'scale(' + k + ')';
  }

  /* ---------- preparo: fontes e imagens decodificadas antes do primeiro quadro ---------- */
  function preparar() {
    palco = doc.getElementById('palco');
    cenas = C.CENAS.map(function (c) { return palco.querySelector('.scene[data-scene="' + c.id + '"]'); });
    trilho.el = doc.getElementById('trilho');
    trilho.marcador = trilho.el.querySelector('.marcador');
    trilho.prog = trilho.el.querySelector('.prog');
    trilho.caps = [].slice.call(trilho.el.querySelectorAll('.cap'));
    escalar();
    root.addEventListener('resize', escalar);
    /* Falha de rede numa fonte (pelo Pages) não pode segurar o loop: sem o catch a TV ficava preta para sempre. */
    var fontes = ['500', '600', '700', '800'].map(function (w) {
      return doc.fonts.load(w + ' 32px Montserrat').catch(function () {});
    });
    var imagens = [].slice.call(doc.images).map(function (i) {
      return i.decode ? i.decode().catch(function () {}) : Promise.resolve();
    });
    return Promise.all(fontes.concat(imagens, [doc.fonts.ready]));
  }

  /* ---------- montagem de uma cena: cria (pausadas) as animações de cada beat ---------- */
  function armar(i) {
    var el = cenas[i], rig = { anims: [], contagens: [], saida: null, nova: true };
    C.CENAS[i].beats.forEach(function (b) {
      if (P.reduzido && P.ambiente[b.a]) return;   // reduced motion: nada de deriva, giro, flutuação, pulso ou varredura
      // b.g: seletor global (elementos da moldura, que vivem fora da cena)
      var alvos = [].slice.call((b.g ? doc : el).querySelectorAll(b.s));
      alvos.forEach(function (alvo, k) {
        if (b.a === 'count') {
          var ds = alvo.dataset;   // o valor final e o formato vêm do próprio elemento (data-to, data-sufixo...)
          rig.contagens.push(P.contagem(alvo, Object.assign({}, b, {
            t: (b.t || 0) + k * (b.gap || 0), to: parseFloat(ds.to), casas: ds.casas ? Number(ds.casas) : 0,
            prefixo: ds.prefixo || '', sufixo: ds.sufixo || '' })));
        } else rig.anims.push(P.criar(alvo, b, k));
      });
    });
    return rig;
  }

  function desativar(i) {
    var rig = rigs[i];
    if (!rig) { cenas[i].classList.remove('is-active', 'is-saindo'); return; }
    rig.anims.forEach(function (a) { a.cancel(); });
    if (rig.saida) rig.saida.cancel();
    delete rigs[i];
    cenas[i].classList.remove('is-active', 'is-saindo');
  }

  function ativar(v, ordem, seek, snap) {
    var el = cenas[v.i], rig = rigs[v.i];
    if (!rig) rig = rigs[v.i] = armar(v.i);
    el.classList.add('is-active');
    el.classList.toggle('is-saindo', ordem === 1 || v.sair !== null);

    var posicionar = seek || snap || rig.nova;
    if (posicionar) rig.anims.forEach(function (a) { a.currentTime = v.tIn; });
    if (seek) rig.anims.forEach(function (a) { a.pause(); });
    else if (rig.nova || snap) rig.anims.forEach(function (a) { a.play(); });
    rig.nova = false;

    // saída da cena antiga (Passagem)
    if (v.sair !== null) {
      if (!rig.saida) rig.saida = NL.transicoes.criarSaida(el);
      if (seek) { rig.saida.pause(); rig.saida.currentTime = v.sair; }
      else if (rig.saidaTocando !== true || snap) { rig.saida.currentTime = v.sair; rig.saida.play(); rig.saidaTocando = true; }
    } else if (rig.saida) {
      rig.saida.cancel(); rig.saida = null; rig.saidaTocando = false;
    }
    rig.contagens.forEach(function (c) { c.render(v.tIn); });
  }

  /* ---------- trilho de capítulos ---------- */
  var capAtual = 0, animProg = null, animMarc = null;
  function inicioDoCapitulo(cap) {
    for (var i = 0; i < C.CENAS.length; i++) if (C.CENAS[i].capitulo === cap) return NL.swaps[i];
    return 0;
  }
  function fimDoCapitulo(cap) { return cap >= 4 ? NL.total : inicioDoCapitulo(cap + 1); }
  function alvoDoMarcador(cap) {
    var c = trilho.caps[cap - 1];
    return 'translateX(' + c.offsetLeft + 'px) scaleX(' + (c.offsetWidth / 100) + ')';
  }
  function atualizarTrilho(est, seek) {
    var cap = est.capitulo;
    trilho.caps.forEach(function (c, k) {
      if (k + 1 === cap) c.setAttribute('aria-current', 'step'); else c.removeAttribute('aria-current');
    });
    var alvo = alvoDoMarcador(cap);
    var mudou = cap !== capAtual;
    if (mudou && !seek && capAtual && !P.reduzido) {
      var de = trilho.marcador.style.transform;
      trilho.marcador.style.transform = alvo;
      if (animMarc) animMarc.cancel();
      animMarc = trilho.marcador.animate([{ transform: de }, { transform: alvo }],
        { duration: 500, easing: P.tok('--ease-in-out') });
    } else {
      if (animMarc) { animMarc.cancel(); animMarc = null; }
      trilho.marcador.style.transform = alvo;
    }
    // progresso do capítulo: barra scaleX linear durante todo o capítulo
    var ini = inicioDoCapitulo(cap), dur = fimDoCapitulo(cap) - ini;
    var local = est.T - ini;
    if (!animProg || mudou || seek) {
      if (animProg) animProg.cancel();
      animProg = trilho.prog.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }],
        { duration: dur, easing: 'linear', fill: 'both' });
      animProg.currentTime = local;
      if (seek) animProg.pause(); else animProg.play();
    }
    capAtual = cap;
  }

  /* ---------- aplicação do estado ---------- */
  function sincronizar(est, seek, snap) {
    var visiveis = est.visiveis, tr = est.transicao;
    if (P.reduzido && tr && tr.tipo === 'cortina' && !tr.trocou) {
      // sem painel: a cena que sai faz um fade nos 300 ms que antecedem a troca
      visiveis = [Object.assign({}, visiveis[0], { sair: Math.max(0, tr.t - 200) })];
    }
    var vis = {};
    visiveis.forEach(function (v) { vis[v.i] = v; });
    cenas.forEach(function (_, i) { if (!vis[i]) desativar(i); });
    visiveis.forEach(function (v, ordem) { ativar(v, ordem, seek, snap); });
    NL.transicoes.atualizar(est.transicao, seek, snap);
    atualizarTrilho(est, seek);
  }

  function assinatura(est) {
    var t = est.transicao;
    return est.visiveis.map(function (v) { return v.i + (v.sair !== null ? 's' : ''); }).join('|') +
      '/' + (t ? t.tipo + t.para + (t.trocou ? 'T' : 'F') : '-') + '/' + est.capitulo;
  }

  function aplicar(est, opt) {
    sincronizar(est, !!(opt && opt.seek), !!(opt && opt.snap));
    ultimaAssinatura = assinatura(est);
  }

  function quadro(est, opt) {
    var snap = !!(opt && opt.snap);
    var sig = assinatura(est);
    if (snap || sig !== ultimaAssinatura) {
      sincronizar(est, false, snap);
      ultimaAssinatura = sig;
    }
    // contagens em andamento (poucas, curtas): atualizam o texto a cada quadro
    est.visiveis.forEach(function (v) {
      var rig = rigs[v.i];
      if (rig && rig.contagens.length) rig.contagens.forEach(function (c) { c.render(v.tIn); });
    });
  }

  NL.view = { preparar: preparar, aplicar: aplicar, quadro: quadro, cena: function (i) { return cenas[i]; } };
})(window);
