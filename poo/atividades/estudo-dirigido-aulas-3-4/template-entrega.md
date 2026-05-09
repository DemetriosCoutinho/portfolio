# Respostas — Estudo Dirigido: Forja de Heróis

**Dupla:** _______________________  e  _______________________

**Data de entrega:** _______________

> Copie este arquivo para um documento `.docx` (Word/LibreOffice) e preencha
> cada resposta abaixo. Seja objetivo e use suas próprias palavras.
> Respostas que apenas repetem o texto do caderno não serão consideradas.

---

## LAB 1 — Módulos e Docstrings

**Q1.** Como você importaria só a classe `Animal` de `animal.py` em `zoologico.py`?
Qual a diferença se usasse `import animal` em vez disso?

> _Sua resposta aqui_

---

**Q2.** Para que serve o `as` em `from dado import rolar_atributo as rolar`?
Em que situação isso seria útil?

> _Sua resposta aqui_

---

**Q3.** Qual é a diferença prática entre um comentário `# ...` e uma docstring `"""..."""`?

> _Sua resposta aqui_

---

**Q4.** Reescreva a chamada a `rolar_todos_atributos()` usando `import dado`
(sem o `from`). Qual forma você prefere e por quê?

> _Sua resposta aqui_

---

## LAB 2 — Sobrecarga de Operadores

**Q5.** Qual é a diferença entre `__str__` e `__repr__`?
Dê um exemplo de situação em que cada um seria chamado.

> _Sua resposta aqui_

---

**Q6.** Por que implementamos `__eq__` usando `nivel_total()` em vez de comparar
os atributos individualmente? Que situação isso pode criar?

> _Sua resposta aqui_

---

**Q7.** Quais cuidados você deve tomar ao usar uma biblioteca de terceiros?
Como o `requirements.txt` ajuda?

> _Sua resposta aqui_

---

**Q8.** Analise o método `__add__` de `Data.py` (Aula 4):
(a) O que acontece quando você escreve `data1 + data2`?
(b) O que acontece quando você escreve `data1 + 5`?
(c) Por que há um `if isinstance(other, Data)`?

> _Sua resposta aqui_

---

## LAB 3 — Herança

**Q9.** Em `Funcionario.py` (Aula 4):
(a) Qual é a superclasse? Qual é a subclasse?
(b) Qual método foi sobrescrito em `Gerente`?
(c) O que `super().get_bonificacao()` faz?

> _Sua resposta aqui_

---

**Q10.** Por que `rex.latir()` não funciona em um objeto `Animal`?

> _Sua resposta aqui_

---

**Q11.** O que acontece se você fizer `guerreiro1.bonus_racial["forca"] = 99`?
Isso afeta `guerreiro2.bonus_racial`? Explique por que (ou por que não).

> _Sua resposta aqui_

---

## LAB 4 — Polimorfismo

**Q12.** Em `AudioFile.py`:
(a) Onde está o polimorfismo?
(b) O que acontece se criar `MP3File("musica.ogg")`?
(c) O que você precisa implementar para criar `FlacFile`?

> _Sua resposta aqui_

---

**Q13.** A `Arena` sabe se `atacante` é Guerreiro ou Mago?
Qual é a vantagem de não precisar saber?

> _Sua resposta aqui_

---

**Q14.** O que acontece se `Personagem.atacar()` não lançasse `NotImplementedError`
e um aluno chamasse `Personagem("X").atacar(alvo)` direto?
Por que a exceção explícita é melhor?

> _Sua resposta aqui_

---

## BOSS — Ancião Sombrio

**Q15.** O Boss usa `escudo` para reduzir dano em `receber_dano()`.
Você implementou: `dano_real = max(0, dano - self.escudo)`.
O que acontece se `escudo` for maior que o dano? O `max(0, ...)` é necessário?

> _Sua resposta aqui_

---

**Q16.** (Questão final — síntese dos 4 labs)

O projeto Forja de Heróis usa módulos, sobrecarga, herança e polimorfismo.
Para **cada conceito**, aponte:
(a) Qual arquivo/método implementa o conceito no seu projeto.
(b) O que quebraria ou ficaria mais difícil sem aquele conceito.

> _Sua resposta aqui_

---

_Entregue este arquivo preenchido (Q1–Q16) junto com os arquivos `.py` no Google Classroom._
