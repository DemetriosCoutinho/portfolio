# Origem dos assets

Nada aqui é regenerado em tempo de execução: a página funciona offline. Os scripts em `tools/` documentam como cada grupo foi obtido.

| Pasta | Origem | Script |
|---|---|---|
| `expotec/` (logo, `arte-capa`, `fundo-conteudo`) | template da 9ª Expotec (`pei.pptx`) | `tools/extract_pptx_media.py` |
| `expotec/divisor-sertao.jpg` | **gerada** com `gpt-image-2` (skill `ai-image`), sem texto | prompt abaixo |
| `logos/` (IFRN, CEPEDI, IBTI, Softex/MCTI, Hardware BR, UESC, UFRN, UERJ) | `pei.pptx` e deck do HAPI | `tools/extract_pptx_media.py` |
| `logos/nadic*.png`, `hapi/redis.png`, `publicos/`, `privados/`, `parceiros/` | Figma "Thalocan 2025 - D" e "Thalocan 2026" (`download_assets`) | `tools/prepare_figma_assets.py` |
| `peis/`, `hapi/` (foto, `rato-*` = cortes do slide 21) | PPTX do PEIs e do HAPI (sem prints com nomes de pessoas e sem fotos de equipe) | `tools/extract_pptx_media.py` |
| `thalocan/ecossistema.jpg` (recortado), `thalocan/{lama,tavos,tricoa,learning-lab}.png` | deck "Thalocan 2025 - D" (PDF do Figma), p. 37 e p. 20; logos = JPEG + máscara de alfa recombinados | `tools/prepare_thalocan_assets.py` |
| `publicos/mapa-<região>.svg` (uma camada por região), `parceiros/mapa-parceiros.svg` | malha por UF do IBGE (domínio público) | `tools/build_maps.py` |
| `fonts/` | Montserrat (SIL OFL), via `@fontsource/montserrat` | `tools/fetch_urls.py` |
| `../js/icons.js` | ícones Lucide (ISC) | `tools/build_icons.py` |

Marcas de terceiros (empresas e instituições parceiras) aparecem por pedido do NADIC, em contexto institucional.

## Prompts das imagens geradas

**`expotec/divisor-sertao.jpg`** — "Flat vector illustration of a night scene in the Brazilian semi-arid sertao, for a presentation divider background. Layered rolling hills in dark forest greens (#0F4022, #1C4827, #335E39), tall mandacaru cactus silhouettes in leaf green, a large pale cream moon, a few tiny glowing dots connected by very thin lines like a constellation network in the sky, and one sweeping red ribbon curve (#A72C2E) with a thin green line beside it crossing the lower right. Keep the left half calm, dark and mostly empty so a title can sit there. Elegant, minimal, wide composition. Absolutely no text, no letters, no numbers, no logos, no watermark." (horizontal 1536×1024)
