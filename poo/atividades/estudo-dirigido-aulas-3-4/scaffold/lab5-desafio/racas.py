"""
Módulo de raças — Lab 5 Desafio.

Guerreiro e Mago já vêm prontos (cole dos labs anteriores ou use as versões abaixo).
Seu trabalho: implementar Arqueiro com atacar() e acerto crítico.
"""

from personagem import Personagem
from dado import rolar_dado


class Guerreiro(Personagem):
    bonus_racial = {"forca": 2, "constituicao": 1}

    def __init__(self, nome: str, rolar: bool = True):
        # 👉 Cole do Lab 4
        pass

    def atacar(self, alvo: Personagem) -> int:
        # 👉 Cole do Lab 4
        pass


class Mago(Personagem):
    bonus_racial = {"inteligencia": 2, "sabedoria": 1}

    def __init__(self, nome: str, rolar: bool = True):
        # 👉 Cole do Lab 4
        pass

    def atacar(self, alvo: Personagem) -> int:
        # 👉 Cole do Lab 4
        pass


# ------------------------------------------------------------------
# DESAFIO B: implemente a classe Arqueiro.
#
# bonus_racial = {"destreza": 2, "sabedoria": 1}
#
# Regra de atacar():
#   - Role rolar_dado(20). Se >= 18: CRÍTICO → dano = rolar_dado(6) * 2
#   - Caso contrário: dano = rolar_dado(6)
#   - Adicione modificador = (self.destreza - 10) // 2
#   - Chame alvo.receber_dano(dano) e retorne o dano.
#
# Mensagem sugerida:
#   "🏹 Finn dispara em Elara: 7 de dano."
#   "🏹 Finn dispara em Elara: 14 de dano CRÍTICO!"
# ------------------------------------------------------------------
class Arqueiro(Personagem):
    bonus_racial = {"destreza": 2, "sabedoria": 1}

    def __init__(self, nome: str, rolar: bool = True):
        pass  # apague e implemente

    def atacar(self, alvo: Personagem) -> int:
        pass  # apague e implemente
