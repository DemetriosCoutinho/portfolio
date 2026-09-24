/* Linha do tempo: função pura, sem DOM. at(T) diz o que está na tela no instante global T (ms).

   Modelo: cada cena i "começa" no seu swap S_i (soma das durações anteriores). A transição que entra na
   cena i vai de S_i - pre até S_i + post. Antes do swap a cena atual ainda é a antiga; depois, a nova.
   Na Passagem a cena antiga continua visível por mais um tempo (saída de 450 ms), sem quadro vazio. */
(function (root) {
  'use strict';
  var NL = root.NadicLoop = root.NadicLoop || {};
  var C = NL.choreography;
  var CENAS = C.CENAS, N = CENAS.length;

  var swaps = [], total = 0;
  CENAS.forEach(function (c) { swaps.push(total); total += c.dur; });

  function tipoBase(f) { return f.split('+')[0]; }
  function flipDe(f) { return f.split('+')[1] || null; }

  function transicao(fronteira, de, para, t, trocou) {
    var j = C.JANELA[fronteira], dur = j.pre + j.post;
    return { tipo: tipoBase(fronteira), flip: flipDe(fronteira), de: de, para: para,
             t: t, dur: dur, p: t / dur, trocou: trocou };
  }

  function indiceDa(T) {
    var lo = 0, hi = N - 1;
    while (lo < hi) {
      var mid = (lo + hi + 1) >> 1;
      if (swaps[mid] <= T) lo = mid; else hi = mid - 1;
    }
    return lo;
  }

  function at(Tbruto) {
    var T = ((Tbruto % total) + total) % total;
    var i = indiceDa(T);
    var tIn = T - swaps[i];
    var ant = (i - 1 + N) % N, prox = (i + 1) % N;
    var fIn = C.FRONTEIRAS[i], jIn = C.JANELA[fIn];
    var fOut = C.FRONTEIRAS[prox], jOut = C.JANELA[fOut];
    var restante = CENAS[i].dur - tIn;
    var visiveis = [{ i: i, tIn: tIn, sair: null }];
    var tr = null;

    if (tIn < jIn.post) {
      // fase posterior à transição que entrou nesta cena
      var t = jIn.pre + tIn;
      tr = transicao(fIn, ant, i, t, true);
      if (tr.tipo === 'passagem' && t < C.SAIDA_PASSAGEM) {
        visiveis.push({ i: ant, tIn: CENAS[ant].dur + tIn, sair: t });
      }
    } else if (restante <= jOut.pre) {
      // fase anterior à transição que vai entrar na próxima cena
      var tp = jOut.pre - restante;
      tr = transicao(fOut, i, prox, tp, false);
      if (tr.tipo === 'passagem') visiveis[0].sair = tp;
    }

    return { T: T, cena: i, tIn: tIn, capitulo: CENAS[i].capitulo, transicao: tr, visiveis: visiveis };
  }

  NL.CENAS = CENAS;
  NL.FRONTEIRAS = C.FRONTEIRAS;
  NL.JANELA = C.JANELA;
  NL.swaps = swaps;
  NL.total = total;
  NL.at = at;
})(window);
