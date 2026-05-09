"""🐲 Boss — Ancião Sombrio.

Herda de Personagem. A maior parte já vem pronta:
  - __init__ com atributos poderosos e PV=200
  - atacar() com 2d10 + bônus de FOR
  - __str__ customizado

Sua única tarefa: implementar receber_dano() com resistência de escudo.
"""

from personagem import Personagem
from dado import rolar_dado


class Boss(Personagem):
    """Antagonista final com PV máximo e escudo que reduz todo dano."""

    pontos_de_vida_max = 200

    def __init__(self, nome: str):
        """Inicializa o Boss com atributos poderosos e escudo de 10."""
        super().__init__(nome, rolar=False)
        self.forca = 18
        self.destreza = 14
        self.constituicao = 16
        self.sabedoria = 12
        self.inteligencia = 10
        self.carisma = 8
        self.pontos_de_vida = self.pontos_de_vida_max
        self.escudo = 10  # reduz todo dano recebido

    def __str__(self) -> str:
        return f"🐲 {self.nome} (PV: {self.pontos_de_vida} | Escudo: {self.escudo})"

    # ------------------------------------------------------------------
    # TODO 4-C: implemente receber_dano(dano).
    #
    # O Boss tem um escudo que absorve parte do dano:
    #   dano_real = max(0, dano - self.escudo)
    #
    # Depois aplique dano_real aos pontos_de_vida (mínimo 0).
    # Dica: self.pontos_de_vida = max(0, self.pontos_de_vida - dano_real)
    # ------------------------------------------------------------------
    def receber_dano(self, dano: int) -> None:
        pass  # apague e implemente

    def atacar(self, alvo: Personagem) -> int:
        """Ataque especial com 2d10 + modificador de FOR."""
        modificador = (self.forca - 10) // 2
        dano = rolar_dado(10) + rolar_dado(10) + modificador
        alvo.receber_dano(dano)
        print(f"🐲 {self.nome} conjura FÚRIA SOMBRIA em {alvo.nome}: {dano} de dano!")
        return dano
