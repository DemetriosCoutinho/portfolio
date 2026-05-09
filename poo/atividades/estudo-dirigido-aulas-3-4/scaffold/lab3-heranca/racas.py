"""Módulo de raças — subclasses de Personagem com bônus raciais.

Conceito: herança. Cada raça reutiliza todo o comportamento de Personagem
e acrescenta apenas o que a diferencia (os bônus).
"""

from personagem import Personagem


# ==============================================================
# TODO 3-A: implemente a classe Guerreiro
#
# Requisitos:
#   - Herda de Personagem
#   - Atributo de CLASSE: bonus_racial = {"forca": 2, "constituicao": 1}
#   - Sobrescreve __init__: chama super().__init__(nome, rolar)
#     e depois aplica os bônus com setattr/getattr.
#
# Dica para aplicar bônus:
#   for atributo, valor in self.bonus_racial.items():
#       setattr(self, atributo, getattr(self, atributo) + valor)
#
# Pergunta (anote no template): por que usamos super().__init__()
# em vez de copiar o código de Personagem.__init__ aqui dentro?
# ==============================================================
class Guerreiro(Personagem):
    bonus_racial = {"forca": 2, "constituicao": 1}

    def __init__(self, nome: str, rolar: bool = True):
        pass  # apague e implemente


# ==============================================================
# TODO 3-B: implemente a classe Mago usando o mesmo padrão.
#   bonus_racial = {"inteligencia": 2, "sabedoria": 1}
# ==============================================================
class Mago(Personagem):
    bonus_racial = {"inteligencia": 2, "sabedoria": 1}

    def __init__(self, nome: str, rolar: bool = True):
        pass  # apague e implemente
