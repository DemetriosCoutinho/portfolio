"""Módulo Personagem — Lab 2: Sobrecarga de operadores + rich."""

# 👉 Cole aqui o import do Lab 1 (from dado import rolar_todos_atributos)


class Personagem:
    """Representa um herói genérico no mundo de Forja de Heróis."""

    def __init__(self, nome: str, rolar: bool = True):
        # 👉 TODO 2-A (Lab 1 revisitado): cole aqui o corpo do __init__ que você
        # implementou no Lab 1. Atribua self.nome e os 6 atributos.
        pass

    def nivel_total(self) -> int:
        """Retorna a soma dos 6 atributos."""
        # 👉 Cole do Lab 1 (ou reescreva — é 1 linha de soma)
        pass

    # ------------------------------------------------------------------
    # TODO 2-B: implemente __str__
    # Deve retornar uma string legível, por exemplo:
    #   "Arador (nível total: 73)"
    # __str__ é chamado por print() e str().
    # ------------------------------------------------------------------
    def __str__(self) -> str:
        pass  # apague e implemente

    # __repr__ (representação técnica) — fornecido como exemplo:
    def __repr__(self) -> str:
        return f"Personagem('{self.nome}', rolar=False)"

    # ------------------------------------------------------------------
    # TODO 2-C: implemente __eq__
    # Dois personagens são iguais se tiverem o mesmo nivel_total().
    # ------------------------------------------------------------------
    def __eq__(self, other) -> bool:
        pass  # apague e implemente

    # __lt__ fornecido — permite usar < e sorted() automaticamente:
    def __lt__(self, other) -> bool:
        return self.nivel_total() < other.nivel_total()

    # exibir_ficha_rich — fornecido pronto para você usar:
    def exibir_ficha_rich(self) -> None:
        """Exibe a ficha do personagem como painel colorido no terminal."""
        from rich.console import Console
        from rich.table import Table
        from rich.panel import Panel

        console = Console()
        tabela = Table(title=f"Ficha de {self.nome}")
        tabela.add_column("Atributo")
        tabela.add_column("Valor", justify="right")
        for nome, val in [
            ("FOR", self.forca),
            ("DES", self.destreza),
            ("CON", self.constituicao),
            ("SAB", self.sabedoria),
            ("INT", self.inteligencia),
            ("CAR", self.carisma),
        ]:
            tabela.add_row(nome, str(val))
        console.print(Panel(tabela))
