"""
Módulo Inventario — Lab 5 Desafio: herança de tipo built-in.
"""

from personagem import Personagem


# ------------------------------------------------------------------
# DESAFIO C: implemente Inventario herdando de list.
#
# Inventario já ganha append, sort, len, etc. de graça.
# Adicione apenas: buscar(nome) → lista de Personagens cujo nome
# contém `nome` (case-insensitive).
#
# Pergunta: o que muda se Inventario herdar de object ao invés de list?
# ------------------------------------------------------------------
class Inventario(list):
    def buscar(self, nome: str) -> list:
        pass  # apague e implemente
