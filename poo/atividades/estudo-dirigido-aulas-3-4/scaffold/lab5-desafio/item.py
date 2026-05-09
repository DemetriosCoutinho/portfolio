"""
Módulo Item — Lab 5 Desafio: operador heroi + item via __radd__.
"""

from personagem import Personagem


class Item:
    """Equipamento que concede bônus de atributos."""

    def __init__(self, nome: str, bonus: dict):
        self.nome = nome
        self.bonus = bonus

    def __str__(self) -> str:
        partes = [f"{k}+{v}" for k, v in self.bonus.items()]
        return f"{self.nome} ({', '.join(partes)})"

    # ------------------------------------------------------------------
    # DESAFIO A: implemente __radd__ em Item.
    #
    # __radd__ é chamado quando Python tenta heroi + item e Personagem
    # não tem __add__. Aqui, `other` é o Personagem, `self` é o Item.
    #
    # O que fazer:
    #   1. Crie um novo Personagem com o mesmo nome de `other` e rolar=False
    #   2. Copie os 6 atributos de `other` para o novo personagem
    #      Dica: for attr in ["forca", "destreza", ...]: setattr(...)
    #   3. Aplique os bônus de self.bonus
    #   4. Retorne o novo Personagem (não modifique `other`!)
    # ------------------------------------------------------------------
    def __radd__(self, other: Personagem) -> Personagem:
        pass  # apague e implemente
