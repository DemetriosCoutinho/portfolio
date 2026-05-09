"""Módulo Arena — orquestra batalhas entre personagens polimorficamente.

A Arena não sabe qual subclasse está usando. Ela apenas chama .atacar()
e o Python decide qual implementação executar — isso é polimorfismo.

Este arquivo está pronto: rode e observe o polimorfismo em ação!
"""

import random
from personagem import Personagem
from rich.console import Console
from rich.table import Table


class Arena:
    """Gerencia uma batalha em turnos entre uma lista de personagens."""

    def __init__(self, personagens: list):
        self.personagens = personagens
        self.historico: list[str] = []

    def batalhar(self, rodadas: int = 3) -> None:
        """Executa a batalha por N rodadas."""
        console = Console()
        for rodada in range(1, rodadas + 1):
            console.rule(f"[bold yellow]Rodada {rodada}[/bold yellow]")
            for atacante in self.personagens:
                if not atacante.esta_vivo():
                    continue
                vivos = [
                    p for p in self.personagens if p.esta_vivo() and p is not atacante
                ]
                if not vivos:
                    break
                alvo = random.choice(vivos)
                dano = atacante.atacar(alvo)
                evento = f"R{rodada}: {atacante.nome} → {alvo.nome} ({dano} dano)"
                self.historico.append(evento)
            vivos_nomes = [p.nome for p in self.personagens if p.esta_vivo()]
            console.print(
                f"  Vivos: {', '.join(vivos_nomes) if vivos_nomes else 'nenhum'}"
            )

    def relatorio_rich(self) -> None:
        """Exibe o relatório final da batalha."""
        console = Console()
        tabela = Table(title="Resultado Final")
        tabela.add_column("Personagem")
        tabela.add_column("Raça")
        tabela.add_column("PV", justify="right")
        tabela.add_column("Status")
        for p in self.personagens:
            status = "[green]Vivo[/green]" if p.esta_vivo() else "[red]Derrotado[/red]"
            tabela.add_row(p.nome, type(p).__name__, str(p.pontos_de_vida), status)
        console.print(tabela)
