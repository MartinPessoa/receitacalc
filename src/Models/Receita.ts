/*
 * <MartinPessoa>//Desenvolvedor\nmartin.pessoa@gmail.com 2023.
 */

import Ingrediente from "@/Models/Ingrediente";

export class Receita {
  Nome: string;

  Porcoes: number;

  Ingredientes: Ingrediente[];

  constructor(nome: string, porcoes: number, ingredientes: Ingrediente[]) {
    this.Nome = nome;
    this.Porcoes = porcoes;
    this.Ingredientes = ingredientes;
  }

  static EmBranco(): Receita {
    return new Receita("", 1, []);
  }

  Adicionar(ingrediente: Ingrediente): void {
    this.Ingredientes.push(ingrediente);
  }

  Retirar(item: Ingrediente) {
    const index = this.Ingredientes.indexOf(item);

    if (index > -1) {
      this.Ingredientes.splice(index, 1);
    }
  }
}
