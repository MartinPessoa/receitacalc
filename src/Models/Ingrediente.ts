export default class Ingrediente {
  Id: number;

  Quantidade: number;

  UnidadeMedida: string;

  Ingrediente: string;

  constructor(id: number, qtd: number, unidade: string, ingrediente: string) {
    this.Id = id;
    this.Quantidade = qtd;
    this.UnidadeMedida = unidade;
    this.Ingrediente = ingrediente;
  }
}
