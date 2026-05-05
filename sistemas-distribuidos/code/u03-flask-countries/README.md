# Flask Countries — API REST de Países

Projeto didático usado na Unidade 03 — Programação de Serviços.
Cada subpasta é uma **etapa independente** com complexidade crescente.

## Pré-requisitos

```bash
pip install -r requirements.txt
```

## Sequência de estudo

### Etapa 1 — API em memória (`01-no-db/`)

Ponto de entrada mais simples: dados em uma lista Python, sem persistência.

```bash
python 01-no-db/app.py
```

Rotas disponíveis: `GET /countries`, `POST /countries`.

Limitação: os dados somem ao reiniciar o servidor.

---

### Etapa 2 — Persistência com SQLite (`02-sqlite/`)

Usa `sqlite3` diretamente via `db.py`. O banco é inicializado pelo comando `init-db`.

```bash
cd 02-sqlite
flask --app app init-db   # cria o banco vazio
python app.py
```

Rotas disponíveis: `GET /countries`, `POST /countries`.

---

### Etapa 3 — SQLAlchemy + Marshmallow (`03-sqlalchemy/`)

ORM completo com serialização automática. CRUD total.

```bash
python 03-sqlalchemy/app.py
```

Rotas disponíveis: `GET /countries`, `POST /countries`, `GET /countries/<id>`,
`PUT /countries/<id>`, `DELETE /countries/<id>`.

---

### Cliente Python (`client.py`)

Consome a API com a biblioteca `requests`. Roda sobre qualquer etapa.

```bash
python client.py
```

## Estrutura

```
flask-countries/
├── requirements.txt
├── client.py
├── 01-no-db/app.py
├── 02-sqlite/{app.py,db.py,schema.sql}
└── 03-sqlalchemy/app.py
```
