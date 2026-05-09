"""Ponto de entrada do Lab 2 — Sobrecarga de operadores + rich."""

from personagem import Personagem


def main():
    heroi = Personagem("Arador")
    heroi2 = Personagem("Elara")

    # Teste __str__ e __eq__
    print(heroi)  # chama __str__
    print(heroi == heroi2)  # chama __eq__
    print(heroi < heroi2)  # chama __lt__ (já fornecido)

    # Exibição visual com rich — já implementado, só chame:
    heroi.exibir_ficha_rich()

    # sorted() usa __lt__:
    heroes = [Personagem("A"), Personagem("B"), Personagem("C")]
    for h in sorted(heroes):
        print(h)


if __name__ == "__main__":
    main()
