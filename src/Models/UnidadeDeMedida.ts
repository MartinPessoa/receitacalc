/*
 * <MartinPessoa>//Desenvolvedor 2023.
 */

export class UnidadeDeMedida {
  Nome: string;

  constructor(nome: string) {
    this.Nome = nome;
  }
}

export const ListaDeUnidadesDeMedida = [
  new UnidadeDeMedida("Xícara"),
  new UnidadeDeMedida("Copo"),
  new UnidadeDeMedida("Colher de sopa"),
  new UnidadeDeMedida("Colher de sobremesa"),
  new UnidadeDeMedida("Colher de chá"),
  new UnidadeDeMedida("Colher de Café"),
  new UnidadeDeMedida("Dose"),
  new UnidadeDeMedida("Dash (ou splash)"),
  new UnidadeDeMedida("Kg"),
  new UnidadeDeMedida("gramas"),
];

/*
Líquidos
1 xícara	240 ml
1 copo	240 ml
1 colher de sopa	15 ml
1 colher de sobremesa	10 ml
1 colher de chá	5 ml
1 colher de café	2,5 ml
1 dose	50 ml
1 dash (ou splash)	aprox. 1 ml
Açúcar
1 xícara	180 gramas
1 colher de sopa	12 gramas
1 colher de chá	4 gramas
Farinha de trigo
1 xícara	120 gramas
1 colher de sopa	7,5 gramas
1 colher de chá	2,5 gramas
Manteiga
1 xícara	200 gramas
1 colher de sopa	15 gramas
1 colher de chá	5 gramas

 */
