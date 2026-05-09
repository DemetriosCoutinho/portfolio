"""Módulo Personagem — versão base para o Lab 3.

👉 Este arquivo deve conter sua implementação completa dos Labs 1 e 2.
   Cole aqui os métodos que você implementou antes de prosseguir.
"""

# 👉 Cole o import do dado (from dado import rolar_todos_atributos)
# 👉 Cole os imports do rich (from rich.console import Console, etc.)


class Personagem:
    """Representa um herói genérico no mundo de Forja de Heróis."""

    def __init__(self, nome: str, rolar: bool = True):
        # 👉 Cole do Lab 1 — inicializa nome e os 6 atributos
        pass

    def nivel_total(self) -> int:
        # 👉 Cole do Lab 1 — soma dos 6 atributos
        pass

    def __str__(self) -> str:
        # 👉 Cole do Lab 2 — ex: "Arador (nível total: 73)"
        pass

    def __repr__(self) -> str:
        return f"Personagem('{self.nome}', rolar=False)"

    def __eq__(self, other) -> bool:
        # 👉 Cole do Lab 2
        pass

    def __lt__(self, other) -> bool:
        return self.nivel_total() < other.nivel_total()

    def exibir_ficha_rich(self) -> None:
        # 👉 Cole do Lab 2 (bônus) ou deixe com pass se não implementou
        pass
