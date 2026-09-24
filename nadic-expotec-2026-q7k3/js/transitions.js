/* Transições entre slides: um gesto (a fita vermelha do template), duas escalas.

   Cortina (troca de capítulo): painel de 9600 px com a fita vermelha na borda da frente. Um único
   translateX de -9600 a +1920 px em 1000 ms (ease-in-out). O palco fica 100% coberto de ~372 a ~596 ms
   (a curva é assimétrica, por isso o painel é largo) e a cena troca aos 500 ms, no meio dessa janela.
   Passagem (mesmo capítulo): a cena antiga sai (translateX -4%, opacity 0, blur 2px, 450 ms ease-out) e
   uma fita fina varre a borda superior; cabeçalho, rodapé e trilho ficam parados.

   Tudo por Web Animations API. Em modo seek as animações ficam pausadas em currentTime; ao vivo, tocam. */
(function (root) {
  'use strict';
  var NL = root.NadicLoop = root.NadicLoop || {};
  var P = NL.primitivas;

  var cortina, fita, animCortina = null, animFita = null;

  function el() {
    cortina = cortina || root.document.getElementById('cortina');
    fita = fita || root.document.getElementById('fita-fina');
  }

  /* garante a animação do elemento e a posiciona; `existente` é reaproveitada se ainda for a mesma janela */
  function posicionar(elemento, existente, chave, criarFn, t, seek, snap) {
    var nova = false;
    if (!existente || existente.chave !== chave) {
      if (existente) existente.anim.cancel();
      existente = { anim: criarFn(), chave: chave };
      nova = true;
    }
    if (seek) {
      existente.anim.pause();
      existente.anim.currentTime = t;
    } else if (nova || snap) {
      existente.anim.currentTime = t;
      existente.anim.play();
    }
    return existente;
  }

  function esconder(elemento, existente) {
    if (existente) existente.anim.cancel();
    elemento.style.visibility = 'hidden';
    return null;
  }

  /* Chamada a cada mudança de estado (ao vivo) e a cada seek. `tr` é est.transicao (ou null). */
  function atualizar(tr, seek, snap) {
    el();
    if (P.reduzido) {   // sem painel, sem fita, sem voador: a cena antiga só some em fade (ver criarSaida)
      animCortina = esconder(cortina, animCortina);
      animFita = esconder(fita, animFita);
      limparVoo();
      return;
    }
    if (tr && tr.tipo === 'cortina') {
      cortina.style.visibility = 'visible';
      animCortina = posicionar(cortina, animCortina, 'c' + tr.para, function () {
        return cortina.animate(
          [{ transform: 'translateX(-9600px)' }, { transform: 'translateX(1920px)' }],
          { duration: tr.dur, easing: P.tok('--ease-in-out'), fill: 'both' });
      }, tr.t, seek, snap);
    } else {
      animCortina = esconder(cortina, animCortina);
    }

    if (tr && tr.tipo === 'passagem') {
      fita.style.visibility = 'visible';
      animFita = posicionar(fita, animFita, 'f' + tr.para, function () {
        return fita.animate(
          [{ transform: 'translateX(-100%)' }, { transform: 'translateX(100%)' }],
          { duration: tr.dur, easing: P.tok('--ease-in-out'), fill: 'both' });
      }, tr.t, seek, snap);
    } else {
      animFita = esconder(fita, animFita);
    }
    atualizarVoo(tr, seek, snap);
  }

  /* ---- FLIP: um elemento da cena que sai voa até o seu par na cena que entra ----
     Origem: [data-flip-de="x"] na cena antiga; alvo: [data-flip-para="x"] na nova. O voador é um clone
     posicionado por offsets (não afetados por transform) e animado por transform, de S-300 a S+400 ms.
     O alvo já está sob o clone (a coreografia o faz "surgir" um pouco antes do pouso), então não há salto. */
  var voo = null;

  function caixa(el) {
    var palco = root.document.getElementById('palco'), x = 0, y = 0, e = el;
    while (e && e !== palco) { x += e.offsetLeft; y += e.offsetTop; e = e.offsetParent; }
    return { x: x, y: y, w: el.offsetWidth, h: el.offsetHeight };
  }

  function limparVoo() {
    if (!voo) return;
    voo.anim.cancel();
    voo.wrap.remove();
    voo.origem.style.visibility = '';
    voo = null;
  }

  function voar(tr, seek, snap) {
    var chave = 'v' + tr.para, novo = false;
    if (!voo || voo.chave !== chave) {
      limparVoo();
      var de = NL.view.cena(tr.de), para = NL.view.cena(tr.para);
      var origem = de.querySelector('[data-flip-de="' + tr.flip + '"]');
      var alvo = para.querySelector('[data-flip-para="' + tr.flip + '"]');
      if (!origem || !alvo) return;
      var a = caixa(origem), b = caixa(alvo), esc = b.w / a.w;
      var wrap = root.document.createElement('div');
      wrap.className = 'voador ' + [].filter.call(de.classList, function (c) { return c.indexOf('s-') === 0; }).join(' ');
      wrap.style.cssText = 'position:absolute;left:0;top:0;width:0;height:0;z-index:6;pointer-events:none';
      var clone = origem.cloneNode(true);
      clone.removeAttribute('data-b');
      clone.removeAttribute('data-flip-de');
      clone.style.cssText += ';position:absolute;margin:0;left:' + a.x + 'px;top:' + a.y + 'px;width:' + a.w +
        'px;height:' + a.h + 'px;transform-origin:0 0;opacity:1;visibility:visible';
      wrap.appendChild(clone);
      root.document.getElementById('palco').appendChild(wrap);
      origem.style.visibility = 'hidden';
      // a cor viaja junto: um título branco (divisor escuro) precisa virar a cor do rótulo (fundo claro)
      var cor0 = root.getComputedStyle(origem).color, cor1 = root.getComputedStyle(alvo).color;
      var anim = clone.animate(
        [{ transform: 'translate(0px, 0px) scale(1)', color: cor0 },
         { transform: 'translate(' + (b.x - a.x) + 'px, ' + (b.y - a.y) + 'px) scale(' + esc + ')', color: cor1 }],
        { duration: 700, easing: P.tok('--ease-in-out'), fill: 'both' });
      voo = { chave: chave, wrap: wrap, anim: anim, origem: origem };
      novo = true;
    }
    if (seek) { voo.anim.pause(); voo.anim.currentTime = tr.t; }
    else if (novo || snap) { voo.anim.currentTime = tr.t; voo.anim.play(); }
  }

  function atualizarVoo(tr, seek, snap) {
    if (tr && tr.flip) voar(tr, seek, snap); else limparVoo();
  }

  /* saída da cena antiga na Passagem */
  function criarSaida(elemento) {
    if (P.reduzido) {   // fade de 300 ms, sem deslocamento nem desfoque
      return elemento.animate([{ opacity: 1 }, { opacity: 0 }],
        { duration: 300, easing: P.tok('--ease-out'), fill: 'both' });
    }
    return elemento.animate(
      [{ opacity: 1, transform: 'translateX(0)', filter: 'blur(0px)' },
       { opacity: 0, transform: 'translateX(-4%)', filter: 'blur(2px)' }],
      { duration: NL.choreography.SAIDA_PASSAGEM, easing: P.tok('--ease-out'), fill: 'both' });
  }

  NL.transicoes = { atualizar: atualizar, criarSaida: criarSaida };
})(window);
