"""Módulo Personagem — Lab 4: adiciona atacar() e pontos_de_vida.

👉 Cole aqui sua implementação completa dos Labs 1–3 e acrescente
   os métodos novos abaixo (esta versão já os fornece prontos).
"""

# 👉 Cole seus imports (dado, rich) aqui


class Personagem:
    """Representa um herói no mundo de Forja de Heróis."""

    def __init__(self, nome: str, rolar: bool = True):
        # 👉 Cole do Lab 1 e adicione: self.pontos_de_vida = 100
        self.pontos_de_vida = 100
        pass

    def nivel_total(self) -> int:
        # 👉 Cole do Lab 1
        pass

    # --- Métodos novos — já fornecidos ---

    def esta_vivo(self) -> bool:
        """Retorna True se o personagem ainda tem pontos de vida."""
        return self.pontos_de_vida > 0

    def receber_dano(self, dano: int) -> None:
        """Reduz os pontos de vida pelo dano recebido (mínimo 0)."""
        self.pontos_de_vida = max(0, self.pontos_de_vida - dano)

    def atacar(self, alvo: "Personagem") -> int:
        """Ataca outro personagem — deve ser sobrescrito pelas subclasses."""
        raise NotImplementedError(
            f"{type(self).__name__} deve implementar o método atacar()."
        )

    def __str__(self) -> str:
        return f"{self.nome} [{type(self).__name__}] PV:{self.pontos_de_vida}"

    def __repr__(self) -> str:
        return f"Personagem('{self.nome}', rolar=False)"

    def __eq__(self, other) -> bool:
        # 👉 Cole do Lab 2
        pass

    def __lt__(self, other) -> bool:
        return self.nivel_total() < other.nivel_total()

    def exibir_ficha_rich(self) -> None:
        # 👉 Cole do Lab 2 (bônus) ou deixe com pass
        pass
