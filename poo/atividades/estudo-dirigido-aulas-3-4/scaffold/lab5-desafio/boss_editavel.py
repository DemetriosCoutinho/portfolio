"""
Boss editável — Lab 5 Desafio.

receber_dano() já vem implementado (você fez no Lab 4).
Aqui o desafio é criar seu próprio atacar() com regras criativas.
"""

from personagem import Personagem
from dado import rolar_dado


class Boss(Personagem):
    """Antagonista final com PV máximo e escudo."""

    pontos_de_vida_max = 200

    def __init__(self, nome: str):
        super().__init__(nome, rolar=False)
        self.forca = 18
        self.destreza = 14
        self.constituicao = 16
        self.sabedoria = 12
        self.inteligencia = 10
        self.carisma = 8
        self.pontos_de_vida = self.pontos_de_vida_max
        self.escudo = 10

    def __str__(self) -> str:
        return f"🐲 {self.nome} (PV: {self.pontos_de_vida} | Escudo: {self.escudo})"

    def receber_dano(self, dano: int) -> None:
        """Dano reduzido pelo escudo — cole do Lab 4."""
        # 👉 Cole do Lab 4
        pass

    # ------------------------------------------------------------------
    # DESAFIO D: implemente atacar() com suas próprias regras.
    #
    # Sugestão mínima: 2d10 + modificador de FOR.
    # Desafio extra: veneno (dano ao longo de rodadas), múltiplos alvos,
    #                fraqueza baseada em INT/SAB, etc.
    # ------------------------------------------------------------------
    def atacar(self, alvo: Personagem) -> int:
        pass  # apague e implemente
