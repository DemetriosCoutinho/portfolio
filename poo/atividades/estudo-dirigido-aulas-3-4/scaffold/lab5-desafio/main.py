"""Ponto de entrada do Lab 5 — Desafio (em casa)."""

from racas import Guerreiro, Mago, Arqueiro
from inventario import Inventario
from item import Item
from arena import Arena
from boss_editavel import Boss


def main():
    # --- DESAFIO A: Item + __radd__ ---
    guerreiro = Guerreiro("Arador")
    espada = Item("Espada Longa", {"forca": 3, "destreza": 1})
    equipado = guerreiro + espada
    print(f"FOR original: {guerreiro.forca}  →  com espada: {equipado.forca}")

    # --- DESAFIO C: Inventario ---
    inv = Inventario()
    inv.append(guerreiro)
    inv.append(Mago("Elara"))
    inv.append(Arqueiro("Finn"))
    print("Busca 'ar':", [p.nome for p in inv.buscar("ar")])

    # --- DESAFIO B + D: Arena com 3 raças + Boss ---
    boss = Boss("Ancião Sombrio")
    arena = Arena([guerreiro, Mago("Elara"), Arqueiro("Finn"), boss])
    arena.batalhar(rodadas=5)
    arena.relatorio_rich()


if __name__ == "__main__":
    main()
