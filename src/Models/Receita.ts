/*
 * <MartinPessoa>//Desenvolvedor\nmartin.pessoa@gmail.com 2023.
 */

import Ingrediente from "@/Models/Ingrediente";

export class Receita {
  nome: string;
  porcoes: number;
  ingredientes: Ingrediente[];

  constructor(nome: string, porcoes: number, ingredientes: Ingrediente[]) {
    this.nome = nome;
    this.porcoes = porcoes;
    this.ingredientes = ingredientes;
  }

  static EmBranco(): Receita {
    return new Receita("", 1, []);
  }

  Adicionar(ingrediente: Ingrediente): void {
    this.ingredientes.push(ingrediente);
  }

  Retirar(item: Ingrediente) {
    const index = this.ingredientes.indexOf(item);

    if (index > -1) {
      this.ingredientes.splice(index, 1);
    }
  }
}
