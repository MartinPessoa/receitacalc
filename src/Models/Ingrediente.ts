export default class Ingrediente {
  Id: number;

  Quantidade: string;

  UnidadeMedida: string;

  Ingrediente: string;

  constructor(id: number, qtd: string, unidade: string, ingrediente: string) {
    this.Id = id;
    this.Quantidade = qtd;
    this.UnidadeMedida = unidade;
    this.Ingrediente = ingrediente;
  }
}
