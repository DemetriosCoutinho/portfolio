"""Módulo de raças — Lab 4: cada subclasse implementa atacar() de forma diferente.

Isso é polimorfismo: a Arena chama atacante.atacar(alvo) sem saber qual subclasse é.
"""

from personagem import Personagem
from dado import rolar_dado


class Guerreiro(Personagem):
    """Guerreiro: ataque físico baseado em FOR."""

    bonus_racial = {"forca": 2, "constituicao": 1}

    def __init__(self, nome: str, rolar: bool = True):
        # 👉 Cole do Lab 3 — super().__init__ + aplicar bonus_racial
        pass

    # ------------------------------------------------------------------
    # TODO 4-A: implemente atacar() para o Guerreiro.
    #
    # Regra de dano:
    #   modificador = (self.forca - 10) // 2
    #   dano = rolar_dado(8) + modificador
    #
    # O método deve:
    #   1. Calcular o dano
    #   2. Chamar alvo.receber_dano(dano)
    #   3. Imprimir uma mensagem, ex:
    #      "⚔  Arador golpeia Elara com 9 de dano físico!"
    #   4. Retornar o dano (int)
    # ------------------------------------------------------------------
    def atacar(self, alvo: Personagem) -> int:
        pass  # apague e implemente


class Mago(Personagem):
    """Mago: ataque mágico baseado em INT."""

    bonus_racial = {"inteligencia": 2, "sabedoria": 1}

    def __init__(self, nome: str, rolar: bool = True):
        # 👉 Cole do Lab 3
        pass

    # ------------------------------------------------------------------
    # TODO 4-B: implemente atacar() para o Mago.
    #
    # Regra de dano:
    #   modificador = (self.inteligencia - 10) // 2
    #   dano = rolar_dado(6) + rolar_dado(6) + modificador
    #
    # Mensagem sugerida:
    #   "✨ Elara lança magia em Arador causando 11 de dano mágico!"
    # ------------------------------------------------------------------
    def atacar(self, alvo: Personagem) -> int:
        pass  # apague e implemente
