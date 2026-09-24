/* Player: dono do tempo. Liga a linha do tempo (pura) à camada visual (NadicLoop.view).

   - Ao vivo: o tempo do loop é performance.now() % total, então não há deriva e uma aba que volta de
     uma pausa cai sozinha na cena certa.
   - Se um quadro chegar com mais de 300 ms de atraso (aba congelada, computador dormiu), a camada
     visual é avisada com `snap: true` e reposiciona tudo sem animar a transição perdida.
   - ?freeze: nada anda sozinho; os testes e as folhas de contato usam NadicLoop.seek(ms).
   - ?t=ms: começa naquele instante do loop (útil para conferir uma cena na TV). */
(function (root) {
  'use strict';
  var NL = root.NadicLoop = root.NadicLoop || {};
  var ATRASO_MAX = 300;
  var params = new URLSearchParams(root.location.search);

  var rodando = false, t0 = 0, T = 0, ultimoQuadro = 0, rafId = 0;

  function norm(t) { return ((t % NL.total) + NL.total) % NL.total; }
  function agora() { return rodando ? norm(root.performance.now() - t0) : T; }
  function view() { return NL.view; }

  function quadro(agoraReal) {
    if (!rodando) return;
    var atrasado = agoraReal - ultimoQuadro > ATRASO_MAX;
    ultimoQuadro = agoraReal;
    var est = NL.at(agora());
    if (view()) view().quadro(est, { snap: atrasado });
    rafId = root.requestAnimationFrame(quadro);
  }

  /* Reforço ao `caffeinate` do run-tv.sh: pede ao navegador que a tela não apague. Melhor esforço. */
  var travaTela = null;
  function pedirTravaTela() {
    if (!root.navigator.wakeLock || travaTela) return;
    root.navigator.wakeLock.request('screen').then(function (t) {
      travaTela = t;
      t.addEventListener('release', function () { travaTela = null; });
    }).catch(function () {});
  }
  root.document.addEventListener('visibilitychange', function () {
    if (root.document.visibilityState === 'visible' && rodando) pedirTravaTela();
  });

  function play() {
    if (rodando) return;
    rodando = true;
    pedirTravaTela();
    t0 = root.performance.now() - T;
    ultimoQuadro = root.performance.now();
    if (view()) view().quadro(NL.at(agora()), { snap: true });
    rafId = root.requestAnimationFrame(quadro);
  }

  function parar() {
    if (rodando) T = agora();
    rodando = false;
    root.cancelAnimationFrame(rafId);
  }

  /* Congela o loop no instante `ms` e posiciona TODA a camada visual nele, de forma determinística. */
  function seek(ms) {
    parar();
    T = norm(ms);
    var est = NL.at(T);
    if (view()) view().aplicar(est, { seek: true });
    return est;
  }

  NL.agora = agora;
  NL.estado = function () { return NL.at(agora()); };
  NL.play = play;
  NL.parar = parar;
  NL.seek = seek;

  function iniciar() {
    var pronto = view() && view().preparar ? view().preparar() : Promise.resolve();
    pronto.then(function () {
      if (params.has('freeze')) {
        seek(params.has('t') ? Number(params.get('t')) : 0);
      } else {
        T = params.has('t') ? norm(Number(params.get('t'))) : 0;
        play();
      }
      NL.pronto = true;
    });
  }

  if (root.document.readyState === 'loading') root.document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})(window);
