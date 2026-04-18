# Sistemas Distribuídos — Materiais Públicos

Conteúdo selecionado da disciplina disponibilizado publicamente.

> **Não edite esta pasta à mão.** Os arquivos aqui são gerados por
> `ops/publish.py` a partir do manifesto `ops/publish.manifest.yml`.
> Para adicionar uma aula, edite o manifesto e rode o script.

Tudo nesta pasta é sincronizado automaticamente com o site público via
GitHub Actions (`.github/workflows/publish-portfolio.yml`) a cada push em
`main` que altere `public/**`.

## Publicar uma nova aula

```bash
# 1. Adicione a entrada em ops/publish.manifest.yml
# 2. Sincronize:
python ops/publish.py
# 3. Commit e push para main
```

Ou peça ao agente: *"publique esta aula"* (skill `publish-lesson`).
