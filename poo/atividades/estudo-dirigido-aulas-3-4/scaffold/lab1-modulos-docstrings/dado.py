"""
Módulo de utilitários para rolagem de dados.

Este módulo é importado por outros módulos do projeto Forja de Heróis.
"""

import random


def rolar_dado(lados: int = 6) -> int:
    """Rola um dado com o número de lados especificado.

    Args:
        lados: Número de lados do dado. Padrão: 6.

    Returns:
        Resultado inteiro entre 1 e lados (inclusive).
    """
    return random.randint(1, lados)


def rolar_atributo() -> int:
    """Rola 4d6 e descarta o menor resultado (método padrão D&D 5e).

    Returns:
        Soma dos 3 maiores resultados de 4 rolagens de d6.

    Exemplo:
        >>> resultado = rolar_atributo()
        >>> 3 <= resultado <= 18
        True
    """
    # TODO 1-A: implemente esta função.
    # Passo a passo:
    #   1. Crie uma lista com 4 chamadas a rolar_dado(6)
    #   2. Remova o menor valor da lista (dica: min() e list.remove())
    #   3. Retorne a soma dos 3 valores restantes
    pass  # apague este 'pass' quando implementar


def rolar_todos_atributos() -> dict:
    """Rola atributos para todos os 6 atributos de um personagem.

    Returns:
        Dicionário com chaves FOR, DES, CON, SAB, INT, CAR e
        valores inteiros entre 3 e 18.
    """
    # TODO 1-B: use rolar_atributo() para preencher todos os 6 atributos.
    # Retorne um dict com as chaves: "FOR", "DES", "CON", "SAB", "INT", "CAR"
    pass  # apague este 'pass' quando implementar
