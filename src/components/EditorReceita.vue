<template>
  <div id="container">
    <ion-grid>
      <ion-row>
        <ion-col size="8">
          <ion-item>
            <ion-label position="stacked">Nome da Receita:</ion-label>
            <ion-input v-model="receitaAtual.Nome"></ion-input> </ion-item
        ></ion-col>
        <ion-col>
          <ion-item>
            <ion-label position="stacked">Porções:</ion-label>
            <ion-input
              type="number"
              max="99"
              maxlength="2"
              placeholder="qtd."
              v-model="receitaAtual.Porcoes"
            ></ion-input></ion-item
        ></ion-col>
      </ion-row>
    </ion-grid>

    <hr class="separator" />
    <ion-text v-if="erro" color="danger" class="ion-color-danger">
      {{ textoErro }}
    </ion-text>
    <ion-grid>
      <ion-row>
        <ion-col size="2">
          <ion-input
            type="number"
            max="999"
            maxlength="3"
            placeholder="qtd."
            v-model="itemAtual.Quantidade"
          ></ion-input>
        </ion-col>
        <ion-col>
          <ion-select
            interface="popover"
            placeholder="un. de medida"
            v-model="itemAtual.UnidadeMedida"
          >
            <ion-select-option
              v-for="unidadeDeMedida in listaDeUnidadesDeMedida"
              :key="unidadeDeMedida.Nome"
              :value="unidadeDeMedida.Nome"
            >
              {{ unidadeDeMedida.Nome }}
            </ion-select-option>
          </ion-select>
        </ion-col>
        <ion-col size="5">
          <ion-input
            placeholder="ingrediente"
            v-model="itemAtual.Ingrediente"
          ></ion-input>
        </ion-col>

        <ion-col size="2">
          <ion-button @click.prevent="novoItem" size="small">
            <ion-icon :icon="arrowDown" slot="end" />
            Incluir
          </ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>

    <ion-list
      :inset="true"
      class="fixed-middle scrollable"
      ref="uiListaIngredientes"
    >
      <ion-item v-for="item in receitaAtual.Ingredientes" :key="item.Id">
        <span> {{ item.Quantidade }} {{ item.UnidadeMedida }} </span>
        <span> &nbsp;de {{ item.Ingrediente }} </span>
        <ion-button
          slot="end"
          size="small"
          color="danger"
          @click.prevent="receitaAtual.Retirar(item)"
          >X</ion-button
        >
      </ion-item>
    </ion-list>
  </div>
</template>

<script setup lang="ts">
import {
  IonButton,
  IonInput,
  IonList,
  IonItem,
  IonText,
  IonGrid,
  IonCol,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonLabel,
  IonIcon,
} from "@ionic/vue";
import { arrowDown } from "ionicons/icons";
import { ListaDeUnidadesDeMedida } from "@/Models/UnidadeDeMedida";
import { ref, reactive } from "vue";
import Ingrediente from "@/Models/Ingrediente";
import { Receita } from "@/Models/Receita";

let ultimoId = 0;

const receitaAtual = reactive(Receita.EmBranco());
const itemAtual = ref(new Ingrediente(ultimoId++, "", "", ""));
const erro = ref(false);
const textoErro = ref("");

const uiListaIngredientes = ref(null);

const listaDeUnidadesDeMedida = ListaDeUnidadesDeMedida;

const novoItem = function () {
  erro.value = false;
  textoErro.value = "";

  const num = parseFloat(itemAtual.value.Quantidade);

  if (isNaN(num)) {
    erro.value = true;
    textoErro.value = "Por favor, digite um número válido no campo Quantidade.";
    return;
  }

  if (!itemAtual.value.UnidadeMedida.trim()) {
    erro.value = true;
    textoErro.value = "Por favor, informe a unidade de medida.";
    return;
  }

  if (!itemAtual.value.Ingrediente.trim()) {
    erro.value = true;
    textoErro.value = "Por favor, informe o ingrediente.";
    return;
  }

  itemAtual.value.UnidadeMedida = itemAtual.value.UnidadeMedida.toLowerCase();
  if (itemAtual.value.Quantidade) receitaAtual.Adicionar(itemAtual.value);

  itemAtual.value = new Ingrediente(ultimoId++, "", "", "");

  if (!uiListaIngredientes.value) return;

  const el: Element = uiListaIngredientes.value.$el;

  if (!el) return;

  window.setTimeout(function () {
    el.scroll({ top: el.scrollHeight, behavior: "smooth" });
  }, 10);
};
</script>

<style scoped>
.fixed-middle {
  max-height: 40%;
}
.scrollable {
  overflow-y: scroll;
}
.separator {
  border-top: 1px #555555 solid;
}
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  /*top: 50%;*/
  /*transform: translateY(-50%);*/
  padding-top: 16px;
  max-height: 100%;
  height: 100%;
  overflow: hidden;
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
