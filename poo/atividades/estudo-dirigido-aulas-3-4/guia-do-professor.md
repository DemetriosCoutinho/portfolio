# Guia do Professor — Forja de Heróis
**Programação Orientada a Objetos · IFRN-PF**

> Este guia é para o professor que vai aplicar a atividade.
> O `index.html` é autocontido — seu papel é orientar, não explicar os conceitos.
>
> **Gabarito completo:** `reference/estudo-dirigido-aulas-3-4/gabarito/` (não publicado).

---

## Estrutura em 2026

| Labs | Onde | Tempo | Entrega |
|------|------|-------|---------|
| Labs 1–4 | Em sala | ~140 min (2 aulas × 70 min) | Obrigatória (Q1–Q16 + `.py`) |
| Lab 5 — Desafio | Em casa | Livre | Voluntária, sem nota |

**Escopo reduzido (labs 1–4) vs versão anterior:**
- Lab 3: só Guerreiro e Mago (Arqueiro → Lab 5)
- Lab 3: sem Inventario (→ Lab 5)
- Lab 2: `exibir_ficha_rich()` fornecida pronta (não é mais TODO)
- Lab 2: sem `__radd__`/`Item` (→ Lab 5)
- Lab 4: `arena.py` fornecido pronto (não é mais TODO)
- Lab 4: Boss tem 1 TODO: `receber_dano()` com escudo

---

## Cronograma sugerido (2 aulas de 70 min = 140 min)

**Aula 1 (~70 min)**

| Tempo | Atividade |
|-------|-----------|
| 0–5 min | Apresentar a atividade, abrir `index.html` |
| 5–40 min | Lab 1 — Módulos & Docstrings |
| 40–70 min | Lab 2 — Sobrecarga (`__str__`, `__eq__`, `__lt__`) |

**Aula 2 (~70 min)**

| Tempo | Atividade |
|-------|-----------|
| 0–30 min | Lab 3 — Herança (Guerreiro e Mago) |
| 30–60 min | Lab 4 — Polimorfismo (atacar + Boss) |
| 60–70 min | Entrega no Classroom |

---

## Pré-requisitos

```bash
# Verificar Python
python --version   # 3.10+

# Instalar rich (Labs 2, 3 e 4)
pip install rich
# ou, em lab sem admin:
pip install --user rich
```

---

## Gabarito — Labs 1–4

### Lab 1

**TODO 1-A** (`rolar_atributo`):
```python
rolls = [rolar_dado(6) for _ in range(4)]
rolls.remove(min(rolls))
return sum(rolls)
```

**TODO 1-B** (`rolar_todos_atributos`):
```python
chaves = ["FOR", "DES", "CON", "SAB", "INT", "CAR"]
return {k: rolar_atributo() for k in chaves}
```

**TODO 1-C** (import): `from dado import rolar_todos_atributos`

**TODO 1-D** (atribuição):
```python
atributos = rolar_todos_atributos()
self.forca = atributos["FOR"]
# ... (repete para os 6)
```

**TODO 1-E** (`nivel_total`):
```python
return self.forca + self.destreza + self.constituicao + self.sabedoria + self.inteligencia + self.carisma
```

**TODO 1-F** (`exibir_ficha`):
```python
print(f"=== {self.nome} ===")
print(f"FOR:{self.forca}  DES:{self.destreza}  CON:{self.constituicao}")
print(f"SAB:{self.sabedoria}  INT:{self.inteligencia}  CAR:{self.carisma}")
print(f"Nível total: {self.nivel_total()}")
```

---

### Lab 2

**TODO 2-A/B/C** (`__str__`, `__repr__`, `__eq__`):
```python
def __str__(self):   return f"{self.nome} (nível total: {self.nivel_total()})"
def __repr__(self):  return f"Personagem('{self.nome}', rolar=False)"
def __eq__(self, other): return self.nivel_total() == other.nivel_total()
```

`exibir_ficha_rich()` — já fornecida pronta no scaffold; aluno só chama.

---

### Lab 3

**TODO 3-A e 3-B** (Guerreiro e Mago — mesmo padrão):
```python
def __init__(self, nome, rolar=True):
    super().__init__(nome, rolar)
    for atributo, valor in self.bonus_racial.items():
        setattr(self, atributo, getattr(self, atributo) + valor)
```

**TODO 3-C** (main — instanciar e observar herança):
```python
guerreiro = Guerreiro("Arador")
mago = Mago("Elara")
guerreiro.exibir_ficha_rich()  # herdado sem reimplementar
```

---

### Lab 4

**TODO 4-A** (Guerreiro.atacar):
```python
def atacar(self, alvo):
    mod = (self.forca - 10) // 2
    dano = rolar_dado(8) + mod
    alvo.receber_dano(dano)
    print(f"⚔  {self.nome} golpeia {alvo.nome} com {dano} de dano físico!")
    return dano
```

**TODO 4-B** (Mago.atacar):
```python
def atacar(self, alvo):
    mod = (self.inteligencia - 10) // 2
    dano = rolar_dado(6) + rolar_dado(6) + mod
    alvo.receber_dano(dano)
    print(f"✨ {self.nome} lança magia em {alvo.nome} causando {dano} de dano mágico!")
    return dano
```

**TODO 4-C** (Boss.receber_dano):
```python
def receber_dano(self, dano):
    dano_real = max(0, dano - self.escudo)
    self.pontos_de_vida = max(0, self.pontos_de_vida - dano_real)
```

**TODO 4-D** (main — montar Arena):
```python
guerreiro = Guerreiro("Arador")
mago = Mago("Elara")
boss = Boss("Ancião Sombrio")
arena = Arena([guerreiro, mago, boss])
arena.batalhar(rodadas=5)
arena.relatorio_rich()
```

`arena.py` — já fornecido pronto; aluno lê para entender o polimorfismo.

---

## Gabarito das Questões (Q1–Q16)

| Q | Resposta esperada (resumo) |
|---|--------------------------|
| Q1 | `from animal import Animal` → importa só a classe; `import animal` → importa o módulo, acessar via `animal.Animal` |
| Q2 | `as` cria alias local; útil quando há conflito de nomes ou o nome original é longo |
| Q3 | `#` é ignorado pelo interpretador; `""" """` é string acessível via `__doc__` e ferramentas como `help()` |
| Q4 | `dado.rolar_todos_atributos()` — depende do contexto; `from` é mais explícito no uso |
| Q5 | `__str__` é para humanos (print/str); `__repr__` é técnico (repr/debug/interpretador) |
| Q6 | `__eq__` por `nivel_total()` causa dois personagens com atributos diferentes mas mesma soma serem "iguais" — trade-off pedagógico |
| Q7 | Verificar licença, atualizar com cuidado, versionar com `requirements.txt` |
| Q8 | (a) `data1.__add__(data2)`, (b) `NotImplemented` → tenta `__radd__` de int → erro, (c) evita somar `Data + int` |
| Q9 | (a) Superclasse: `Funcionario`, subclasse: `Gerente`; (b) `get_bonificacao()`; (c) chama o método do pai e adiciona ao resultado |
| Q10 | `latir()` é definido em `Cachorro`, não em `Animal`; herança é de cima pra baixo |
| Q11 | `bonus_racial` é atributo de CLASSE → `guerreiro1.bonus_racial is guerreiro2.bonus_racial` = True → sim, afeta |
| Q12 | (a) Método `play()` varia por subclasse; (b) erro de nome inválido (depende da impl.); (c) `play()` com lógica FLAC |
| Q13 | Não sabe — só chama `.atacar(alvo)`; vantagem: adicionar novas raças sem mudar Arena |
| Q14 | Sem `NotImplementedError`, o código "silencia" silenciosamente; a exceção explicita o contrato de polimorfismo |
| Q15 | Se `escudo > dano`, `dano - self.escudo < 0`; `max(0, ...)` garante PV não negativo e dano não negativo |
| Q16 | Módulos (`dado.py` separado), sobrecarga (`__str__`/`__eq__`), herança (`Guerreiro(Personagem)`), polimorfismo (`Arena.batalhar` chama `.atacar()` sem `if type`) |

---

## Erros frequentes

| Erro | Causa | O que dizer |
|------|-------|-------------|
| `ModuleNotFoundError: dado` | Não está na pasta do lab | "Rode `python main.py` de dentro de `lab1-modulos-docstrings/`" |
| `ModuleNotFoundError: rich` | Não instalado | "Execute: `pip install rich`" |
| `AttributeError: 'NoneType'...` | Esqueceu `return` | "Esse método tem um `return`?" |
| `NotImplementedError: Personagem...` | Chamou `Personagem.atacar()` direto | "Qual classe você instanciou? Guerreiro e Mago devem ter `atacar()`." |
| `super().__init__` com args errados | Parâmetros não batem | "Veja quantos parâmetros `Personagem.__init__` espera." |

---

## Critérios de avaliação (0–100, mínimo 60)

| Critério | Peso | O que verificar |
|----------|------|----------------|
| Código funcional (Labs 1–4) | 30 | `python main.py` de cada lab roda sem erro |
| Conceitos aplicados corretamente | 30 | `super()` em herança, polimorfismo sem `if type() ==` |
| Respostas reflexivas (Q1–Q16) | 30 | Compreensão genuína, não cópia do caderno |
| Organização | 10 | Docstrings, nomes em pt-BR, arquivos nas pastas corretas |

**Entrega aceita:** zip com `respostas.docx` + pastas `lab1/`, `lab2/`, `lab3/`, `lab4/`.

---

## Como mediar sem dar a resposta

- "O que o erro está dizendo? Leia a última linha."
- "Qual linha do caderno fala sobre esse caso?"
- "Você testou o mini-exemplo do caderno isolado?"
- "O que `super()` faz? Onde você o chamou?"
- "Mostre o `return` do método."
