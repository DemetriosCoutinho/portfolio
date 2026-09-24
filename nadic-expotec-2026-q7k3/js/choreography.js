/* Coreografia: dados, sem DOM. Fonte de verdade dos tempos do loop.
   Todos os tempos em ms. `dur` é medido de swap a swap (do instante em que a cena troca até a próxima).
   Cada beat: { s: seletor dentro da cena, a: primitiva, t: início (ms desde o swap), d: duração, gap: defasagem
   entre elementos que casam com o seletor }. Plano: docs/superpowers/specs/2026-09-23-expotec-loop-design.md */
(function (root) {
  'use strict';
  var NL = root.NadicLoop = root.NadicLoop || {};

  var CENAS = [
    { id: 'abertura',            capitulo: 1, dur: 6000,  holdMin: 2000, beats: [
        { s: '[data-b="edicao"]', a: 'rise',   t: 150 },
        { s: '[data-b="logo"]',   a: 'reveal', t: 400, d: 900 },              // o logo se revela...
        { s: '[data-b="scan"]',   a: 'varrer', t: 400, d: 900, dx: 680 },      // ...seguindo a fita fina
        { s: '[data-b="nome"]',   a: 'rise',   t: 1000 },
        { s: '[data-b="frase"]',  a: 'rise',   t: 1400 },
        { s: '.bg',               a: 'drift',  t: 0, d: 6000, escala: 1.03 }
      ] },
    { id: 'nadic-quem-somos',    capitulo: 1, dur: 11000, holdMin: 4000, beats: [
        { s: '[data-b="rotulo"]',   a: 'rise',   t: 150 },
        { s: '[data-b="titulo"]',   a: 'rise',   t: 150 },
        { s: '[data-b="definicao"]', a: 'rise',  t: 500 },
        { s: '[data-b="logo-anel"]', a: 'surgir', t: 280, d: 120 },            // fica pronto sob o FLIP, que pousa aos 400 ms
        { s: '[data-b="arco"]',     a: 'draw',   t: 1000, d: 450, gap: 300 },  // o anel se fecha, em sentido horário
        { s: '[data-b="frente"]',   a: 'pop',    t: 1400, gap: 300 },
        { s: '[data-b="stat"]',     a: 'rise',   t: 3000, gap: 500 },          // cadência de leitura
        { s: '[data-b="num"]',      a: 'count',  t: 3100, d: 900, gap: 500 }
      ] },
    { id: 'nadic-talentos',      capitulo: 1, dur: 10000, holdMin: 4000, beats: [
        { s: '[data-b="rotulo"]',  a: 'rise',  t: 150 },
        { s: '[data-b="titulo"]',  a: 'rise',  t: 150 },
        { s: '[data-b="motor"]',   a: 'pop',   t: 500 },
        { s: '[data-b="giro"]',    a: 'giro',  t: 0, d: 40000 },                // a engrenagem gira devagar
        { s: '[data-b="fio"]',     a: 'draw',  t: 1100, d: 400, gap: 70 },      // a engrenagem liga as competências
        { s: '[data-b="chip-a"]',  a: 'pop',   t: 1500, gap: 70, origem: '0 50%' },
        { s: '[data-b="chip-b"]',  a: 'pop',   t: 2400, gap: 70, origem: '0 50%' }
      ] },
    { id: 'publico-divisor',     capitulo: 2, dur: 4000,  holdMin: 2000, beats: [
        { s: '[data-b="capnum"]', a: 'rise',   t: 100 },
        { s: '[data-b="tit"]',    a: 'reveal', t: 250, d: 700, dir: 'bt' },      // o título sobe de dentro do chão
        { s: '[data-b="sub"]',    a: 'rise',   t: 900 },
        { s: '.bg',               a: 'drift',  t: 0, d: 4000, escala: 1.04 }
      ] },
    { id: 'publico-tela-brasil', capitulo: 2, dur: 11000, holdMin: 4000, beats: [
        { s: '[data-b="rotulo"]', a: 'surgir', t: 280, d: 120 },                 // pousa aqui o título do divisor (FLIP)
        { s: '[data-b="titulo"]', a: 'rise',   t: 150 },
        { s: '[data-b="hero"]',   a: 'reveal', t: 500, d: 1100 },                // o hero se revela como uma tela abrindo
        { s: '.hero img',         a: 'drift',  t: 0, d: 11000, escala: 1.02 },   // pouco, para não cortar o logo do canto
        { s: '.info',             a: 'rise',   t: 1300 },
        { s: '[data-b="info"]',   a: 'rise',   t: 1700, gap: 120 },
        { s: '[data-b="fato"]',   a: 'rise',   t: 2200, gap: 500 },              // cadência de leitura
        { s: '[data-b="check"]',  a: 'pop',    t: 2300, gap: 500 },
        { s: '[data-b="num"]',    a: 'count',  t: 2400, d: 900 }
      ] },
    { id: 'publico-pe-de-meia',  capitulo: 2, dur: 11000, holdMin: 4000, beats: [
        { s: '[data-b="rotulo"]', a: 'rise',   t: 150 },
        { s: '[data-b="titulo"]', a: 'rise',   t: 150 },
        { s: '[data-b="logo"]',   a: 'pop',    t: 400, origem: '0 50%' },
        { s: '[data-b="regiao"]', a: 'pop',    t: 800, gap: 120 },               // as cinco regiões entram uma a uma
        { s: '[data-b="numero"]', a: 'rise',   t: 2000, gap: 300 },
        { s: '[data-b="num"]',    a: 'count',  t: 2100, d: 900, gap: 300 },
        { s: '.passos',           a: 'rise',   t: 2600 },
        { s: '[data-b="linha"]',  a: 'draw',   t: 3200, d: 1800, eixo: 'y' },    // a régua desce ligando os 4 passos
        { s: '[data-b="passo"]',  a: 'rise',   t: 3200, gap: 500 },
        { s: '[data-b="faixa"]',  a: 'reveal', t: 4800, d: 1100 }
      ] },
    { id: 'portfolio-peis',      capitulo: 2, dur: 12000, holdMin: 4000, beats: [
        { s: '[data-b="rotulo"]', a: 'rise',   t: 150 },
        { s: '[data-b="titulo"]', a: 'rise',   t: 150 },
        { s: '[data-b="janela"]', a: 'rise',   t: 500 },
        { s: '[data-b="tela"]',   a: 'surgir', t: 1000, d: 500, gap: 2200 },     // login, painel e PEI do aluno passam na moldura
        { s: '[data-b="logo"]',   a: 'pop',    t: 700, origem: '0 50%' },
        { s: '[data-b="num"]',    a: 'count',  t: 1600, d: 900 },
        { s: '[data-b="quatro-l"]', a: 'rise', t: 1600 },
        { s: '[data-b="spark"]',  a: 'reveal', t: 1600, d: 1100 },
        { s: '[data-b="nota"]',   a: 'rise',   t: 2700 },
        { s: '[data-b="fato"]',   a: 'rise',   t: 3000, gap: 500 },
        { s: '[data-b="artigo"]', a: 'pop',    t: 5500, origem: '0 50%' }
      ] },
    { id: 'privado-divisor',     capitulo: 3, dur: 4000,  holdMin: 2000, beats: [
        { s: '[data-b="capnum"]', a: 'rise',   t: 100 },
        { s: '[data-b="tit"]',    a: 'reveal', t: 250, d: 700, dir: 'bt' },
        { s: '[data-b="sub"]',    a: 'rise',   t: 900 },
        { s: '.bg',               a: 'drift',  t: 0, d: 4000, escala: 1.04 }
      ] },
    { id: 'privado-pechinchou',  capitulo: 3, dur: 10000, holdMin: 4000, beats: [
        { s: '[data-b="rotulo"]', a: 'surgir', t: 280, d: 120 },                 // pousa aqui o título do divisor (FLIP)
        { s: '[data-b="titulo"]', a: 'rise',   t: 150 },
        { s: '[data-b="mock"]',   a: 'rise',   t: 500 },
        { s: '[data-b="logo"]',   a: 'pop',    t: 1000 },
        { s: '[data-b="fotos"]',  a: 'reveal', t: 1300, d: 1100, dir: 'tb' },
        { s: '.fotos img',        a: 'drift',  t: 0, d: 10000, escala: 1.02 },
        { s: '[data-b="fh"]',     a: 'rise',   t: 2000, gap: 500 },              // cadência de leitura
        { s: '[data-b="num"]',    a: 'count',  t: 2100, d: 900, gap: 500 }
      ] },
    { id: 'privado-thalocan',    capitulo: 3, dur: 12000, holdMin: 4000, beats: [
        { s: '[data-b="rotulo"]', a: 'rise',   t: 150 },
        { s: '[data-b="titulo"]', a: 'rise',   t: 150 },
        { s: '[data-b="hero"]',   a: 'reveal', t: 500, d: 1100 },                // o ecossistema se revela como uma tela abrindo
        { s: '.hero img',         a: 'drift',  t: 0, d: 12000, escala: 1.02 },
        { s: '[data-b="leg"]',    a: 'pop',    t: 1500, gap: 300 },               // a nuvem e, um a um, os produtos
        { s: '[data-b="numeros"]', a: 'rise',  t: 1800 },
        { s: '[data-b="stat"]',   a: 'rise',   t: 2200, gap: 450 },               // cadência de leitura
        { s: '[data-b="num"]',    a: 'count',  t: 2300, d: 900, gap: 450 },
        { s: '[data-b="prods"]',  a: 'rise',   t: 3200 },
        { s: '[data-b="prod"]',   a: 'rise',   t: 3500, gap: 350 },
        { s: '[data-b="fato"]',   a: 'rise',   t: 4800, gap: 300 },
        { s: '[data-b="check"]',  a: 'pop',    t: 4900, gap: 300 }
      ] },
    { id: 'portfolio-hapi',      capitulo: 3, dur: 16000, holdMin: 4000, beats: [
        { s: '[data-b="rotulo"]', a: 'rise',   t: 150 },
        { s: '[data-b="titulo"]', a: 'rise',   t: 150 },
        { s: '[data-b="foto"]',   a: 'reveal', t: 500, d: 1100 },
        { s: '.foto img',         a: 'drift',  t: 0, d: 16000, escala: 1.03 },
        // o volume 3D do rato: os três planos entram um a um e o cubo passa a oscilar ±15° (turntable)
        { s: '[data-b="volume"]', a: 'rise',   t: 700 },
        { s: '[data-b="p-coronal"]', a: 'reveal', t: 1100, d: 900 },
        { s: '[data-b="p-sagital"]', a: 'reveal', t: 1500, d: 900 },
        { s: '[data-b="p-axial"]',   a: 'reveal', t: 1900, d: 1100, dir: 'tb' },
        { s: '[data-b="cubo"]',   a: 'flutuar', t: 0, d: 4500, kf: [
            { transform: 'rotateY(-15deg)' }, { transform: 'rotateY(15deg)' } ] },
        { s: '[data-b="legenda"]', a: 'rise',  t: 2800 },
        { s: '[data-b="hfatos"]', a: 'rise',   t: 1200 },
        { s: '[data-b="hfato"]',  a: 'rise',   t: 2000, gap: 400 },
        { s: '[data-b="num"]',    a: 'count',  t: 2100, d: 900, gap: 400 },
        // a arquitetura do servidor RECON: uma camada a cada passo do fluxo de dados
        { s: '[data-b="arq-tit"]', a: 'rise',  t: 4500 },
        { s: '[data-b="fluxo"]',  a: 'draw',   t: 4700, d: 2400 },
        { s: '[data-b="col"]',    a: 'pop',    t: 4700, gap: 500 },
        { s: '[data-b="tec"]',    a: 'pop',    t: 5200, gap: 250, origem: '0 50%' },
        { s: '[data-b="pulso"]',  a: 'pulso',  t: 7400, d: 2600, kf: [
            { transform: 'translateX(0px)',    opacity: 0 },
            { transform: 'translateX(70px)',   opacity: 1, offset: 0.05 },
            { transform: 'translateX(1256px)', opacity: 1, offset: 0.95 },
            { transform: 'translateX(1326px)', opacity: 0 } ] },
        { s: '[data-b="logos"]',  a: 'rise',   t: 7300 },
        { s: '[data-b="lg"]',     a: 'pop',    t: 7600, gap: 60 }
      ] },
    { id: 'parceiros',           capitulo: 4, dur: 14000, holdMin: 4000, beats: [
        { s: '[data-b="rotulo"]',   a: 'rise', t: 150 },
        { s: '[data-b="titulo"]',   a: 'rise', t: 150 },
        { s: '[data-b="mapa"]',     a: 'pop',  t: 500, d: 800 },
        { s: '[data-b="pino"]',     a: 'pop',  t: 1100, origem: '50% 100%' },   // o NADIC, no RN
        { s: '[data-b="mapa-leg"]', a: 'rise', t: 900 },
        { s: '[data-b="cab"]',      a: 'rise', t: 1000, gap: 400 },
        { s: '[data-b="cab-linha"]', a: 'draw', t: 1300, gap: 400 },
        { s: '[data-b="cel-i"]',    a: 'pop',  t: 1300, gap: 80 },              // as instituições chegam uma a uma...
        { s: '[data-b="cel-e"]',    a: 'pop',  t: 1700, gap: 80 }               // ...e depois as empresas, com defasagem
      ] },
    { id: 'encerramento',        capitulo: 4, dur: 5000,  holdMin: 2000, beats: [
        { s: '[data-b="frase"]',    a: 'rise', t: 200 },
        { s: '[data-b="logo"]',     a: 'pop',  t: 600, gap: 150, origem: '0 50%' },
        { s: '.bg',                 a: 'drift', t: 0, d: 5000, escala: 1.03 }
      ] }
  ];

  /* Transição que ENTRA em cada cena (índice 0 = a volta ao início). "tipo+flip" quando há elemento que voa. */
  var FRONTEIRAS = [
    'cortina',
    'passagem+logo',
    'passagem',
    'cortina',
    'passagem+titulo',
    'passagem',
    'passagem',
    'cortina',
    'passagem+titulo',
    'passagem',
    'passagem',
    'cortina',
    'passagem'
  ];

  /* pre = ms antes do swap em que a transição começa; post = ms depois do swap em que ela termina. */
  var JANELA = {
    'cortina':         { pre: 500, post: 500 },
    'passagem':        { pre: 200, post: 450 },
    'passagem+logo':   { pre: 300, post: 450 },
    'passagem+titulo': { pre: 300, post: 450 }
  };

  /* Duração da saída da cena antiga na Passagem (ela começa `pre` ms antes do swap). */
  var SAIDA_PASSAGEM = 450;

  NL.choreography = { CENAS: CENAS, FRONTEIRAS: FRONTEIRAS, JANELA: JANELA, SAIDA_PASSAGEM: SAIDA_PASSAGEM };
})(window);
