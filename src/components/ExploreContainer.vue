<template>
  <div id="container">
   <ion-text v-if="erro" color="danger" class="ion-color-danger">
     {{ textoErro }}
   </ion-text>
    <ion-list :inset="true">
      <ion-item v-for="item in itens" :key="item.Id">
      <span>
        {{ item.Quantidade }} {{ item.UnidadeMedida }}
      </span>
        &nbsp;
        <span>
        {{ item.Ingrediente }}
      </span>
        <ion-button slot="end"  size="small" color="danger" @click.prevent="Remover(item)">X</ion-button>
      </ion-item>
    </ion-list>


    <ion-input placeholder="Quantidade" v-model="itemAtual.Quantidade"></ion-input>
    <ion-input placeholder="Unidade de Medida" v-model="itemAtual.UnidadeMedida"></ion-input>
    <ion-input placeholder="Ingrediente" v-model="itemAtual.Ingrediente"></ion-input>
    <ion-button @click.prevent="novoItem">Adicionar</ion-button>
  </div>
</template>

<script setup lang="ts">
import {IonButton, IonInput, IonList, IonItem, IonText} from "@ionic/vue"
import {ref, reactive} from "vue";

class Item {
  Id: number;
  Quantidade: string;
  UnidadeMedida: string;
  Ingrediente: string;

  constructor(id:number, qtd:string, unidade:string, ingrediente:string) {
    this.Id = id;
    this.Quantidade = qtd;
    this.UnidadeMedida = unidade;
    this.Ingrediente = ingrediente;
  }
}

let ultimoId = 0;

const itemAtual = ref(new Item(ultimoId++, "", "", ""))
const itens = reactive(new Array<Item>());
const erro = ref(false)
const textoErro = ref("")

const novoItem = function(){
  erro.value = false;
  textoErro.value = ""

  const num = parseFloat(itemAtual.value.Quantidade);

  //console.log(isNaN(num))

  if(isNaN(num)) {
    erro.value = true;
    textoErro.value = "Por favor, digite um número válido no campo Quantidade."
    return
  }

  if(itemAtual.value.Quantidade)

  itens.push(itemAtual.value);

  console.log(itens)

  itemAtual.value = new Item(ultimoId++, "", "", "")
}

const Remover = function(item:Item){
  const index = itens.indexOf(item);

  if(index > -1){
    itens.splice(index, 1)
  }
}

</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
