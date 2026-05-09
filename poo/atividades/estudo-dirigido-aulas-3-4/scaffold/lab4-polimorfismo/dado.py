"""Módulo de utilitários para rolagem de dados (versão completa)."""

import random


def rolar_dado(lados: int = 6) -> int:
    """Rola um dado com o número de lados especificado."""
    return random.randint(1, lados)


def rolar_atributo() -> int:
    """Rola 4d6 e descarta o menor resultado."""
    rolls = [rolar_dado(6) for _ in range(4)]
    rolls.remove(min(rolls))
    return sum(rolls)


def rolar_todos_atributos() -> dict:
    """Rola os 6 atributos de um personagem."""
    chaves = ["FOR", "DES", "CON", "SAB", "INT", "CAR"]
    return {k: rolar_atributo() for k in chaves}
