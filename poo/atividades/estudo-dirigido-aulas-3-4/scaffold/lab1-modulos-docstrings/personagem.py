"""Módulo que define a classe Personagem para o projeto Forja de Heróis."""

# TODO 1-A: importe rolar_todos_atributos do módulo dado
# Sintaxe: from dado import rolar_todos_atributos


class Personagem:
    """Representa um herói com 6 atributos numéricos (estilo D&D 5e)."""

    def __init__(self, nome: str, rolar: bool = True):
        """Inicializa o personagem; se rolar=True gera atributos aleatórios."""
        self.nome = nome

        if rolar:
            # TODO 1-B: chame rolar_todos_atributos() e atribua cada valor.
            # Dica:
            #   atributos = rolar_todos_atributos()
            #   self.forca = atributos["FOR"]  ... e assim por diante
            pass  # apague este 'pass' quando implementar
        else:
            self.forca = 0
            self.destreza = 0
            self.constituicao = 0
            self.sabedoria = 0
            self.inteligencia = 0
            self.carisma = 0

    def nivel_total(self) -> int:
        """Retorna a soma dos 6 atributos."""
        return (
            self.forca
            + self.destreza
            + self.constituicao
            + self.sabedoria
            + self.inteligencia
            + self.carisma
        )

    def exibir_ficha(self) -> None:
        """Imprime a ficha no terminal.

        Exemplo de saída esperada:
            === Arador ===
            FOR: 15  DES: 12  CON: 14
            SAB:  9  INT: 10  CAR: 13
            Nível total: 73
        """
        # TODO 1-C: implemente usando print(). Não use rich aqui — isso é Lab 2.
        pass  # apague este 'pass' quando implementar
