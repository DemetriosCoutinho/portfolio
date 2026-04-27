# Análise Estratégica de Licença Capacitação — Case Study

> **Dados anonimizados** — projeto de portfólio. Versão real reside em repositório privado.

## O problema

Servidores federais têm direito a até 90 dias de licença capacitação remunerada a cada quinquênio de efetivo exercício (Lei 8.112/90, art. 87). A decisão de **quando** e **como** usar esse direito envolve múltiplas variáveis normativas que interagem de forma não-óbvia:

- Prazo de validade do período aquisitivo (5 anos a partir da aquisição)
- Interstício mínimo entre parcelas (60 dias)
- Bloqueio cruzado com afastamento pós-doutoral (Resolução CONSUP/IFRN 18/2021, art. 42 — **4 anos** de interstício)
- Rodízio informal do grupo de trabalho
- Competição por vagas em editais semestrais

Este projeto automatiza a análise normativa e gera um **dashboard executivo** para apoio à decisão.

## Pipeline

```
PDFs normativos + snapshot SUAP
        ↓
    ingestão (pdfplumber + wkhtmltopdf)
        ↓
   análise normativa (6 cenários)
        ↓
  dashboard HTML interativo (/30 scores)
```

## Cenários analisados

| # | Cenário | Descrição resumida |
|---|---|---|
| 1 | Base EUA 74d | 74 dias contínuos no exterior. Requer carta de aceite. |
| 2 | Adiamento 2027 | Esperar edital 1º sem 2027. Risco: PA expirar. |
| 3 | Split 2026+2027 | Parcela 1 (~44d Brasil) + Parcela 2 (~44d exterior), interstício ≥60d. |
| 4 | Pós-Doc 96-A | Priorizar pós-doutorado (art. 96-A, 12 meses). PA pode expirar. |
| 5 | Brasil 90d | 90 dias integrais em instituição nacional. |
| 6 | Híbrido EUA 90d | 90 dias totais com parcela no exterior. |

Cada cenário recebe score /30 em 6 dimensões: viabilidade, financeiro, família, jogo longo, risco e rodízio.

## Tecnologias

- Python 3.12 + `uv` (gerenciamento de dependências)
- `pdfplumber` para extração de texto normativo
- Dashboard HTML puro (sem frameworks) com SVG por cenário
- GitHub Actions para publicação de artefatos públicos

## Decisão-chave descoberta

A principal armadilha normativa: o art. 42 da Resolução CONSUP/IFRN impõe **4 anos de interstício** após qualquer licença capacitação para a modalidade pós-doutoral — regra **interna ao IFRN**, não prevista na Lei 8.112. Isso cria um trade-off real entre usar o PA (que expira) e preservar a elegibilidade ao pós-doc.

## Artefatos

- [Dashboard executivo](dashboard/index.html) — 12 abas, scores /30, SVG por cenário
- [Slides da apresentação](slides/apresentacao.html) — 30 slides cobrindo elegibilidade, cenários e checklist SUAP

---

*Dados reais substituídos por ficcionais para publicação. Metodologia e código integralmente preservados.*
