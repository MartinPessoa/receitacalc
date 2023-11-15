<template>
  <div id="container">
    <ion-grid>
      <ion-row>
        <ion-col size="8">
          <ion-item>
            <ion-label position="stacked">Nome da Receita:</ion-label>
            <ion-input v-model="receitaAtual.nome"></ion-input> </ion-item
        ></ion-col>
        <ion-col>
          <ion-item>
            <ion-label position="stacked">Porções:</ion-label>
            <ion-input
              type="number"
              max="99"
              maxlength="2"
              placeholder="qtd."
              v-model="receitaAtual.porcoes"
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
            min="0"
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

        <ion-col size="2" offset="8">
          <ion-button @click.prevent="novoItem" size="small">
            <ion-icon :icon="arrowDown" slot="end" />
            Incluir
          </ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>

    <div class="ion-margin-top" v-if="receitaAtual.ingredientes.length < 1">
      Nenhum ingrediente ainda ;)
    </div>

    <ion-list
      v-if="receitaAtual.ingredientes.length > 0"
      :inset="true"
      class="fixed-middle scrollable"
      ref="uiListaIngredientes"
    >
      <ion-item v-for="item in receitaAtual.ingredientes" :key="item.Id">
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
  <ion-fab
    v-if="receitaAtual.ingredientes.length > 0"
    slot="fixed"
    vertical="bottom"
    horizontal="end"
    :edge="true"
  >
    <ion-fab-button @click.prevent="salvarReceita">
      <ion-icon :icon="add"></ion-icon>
    </ion-fab-button>
  </ion-fab>

  <ion-alert
    :is-open="mostraMensagem"
    header="Alterar receita"
    sub-header="Já existe uma receita com este nome"
    message="Se clicar em Salvar alterações, a receita será alterada. Se deseja adicionar uma nova receita, por favor, altere o nome."
    :buttons="alertButtons"
  ></ion-alert>
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
  IonFab,
  IonFabButton,
  IonAlert,
} from "@ionic/vue";
import { arrowDown, add } from "ionicons/icons";
import { ListaDeUnidadesDeMedida } from "@/Models/UnidadeDeMedida";
import { ref } from "vue";
import Ingrediente from "@/Models/Ingrediente";
import { Receita } from "@/Models/Receita";
import { useStorage } from "@vueuse/core";
import router from "@/router";

// outras receitas
const listaReceitas = useStorage(
  "listaDeReceitasStorage",
  new Array<Receita>(),
  localStorage,
  {
    mergeDefaults: true,
  }
);

const props = defineProps({ nomeDaReceita: String });

let ultimoId = 0;

const receitaAUtilizar = listaReceitas.value.find(
  (r) => r.nome === (props.nomeDaReceita ?? "")
);

let receitaAtual =
  receitaAUtilizar === undefined
    ? ref(Receita.EmBranco())
    : ref(
        new Receita(
          receitaAUtilizar.nome,
          receitaAUtilizar.porcoes,
          receitaAUtilizar.ingredientes.map(
            (v) =>
              new Ingrediente(
                v.Id,
                v.Quantidade,
                v.UnidadeMedida,
                v.Ingrediente
              )
          )
        )
      );

const itemAtual = ref(new Ingrediente(ultimoId++, 0, "", ""));
const erro = ref(false);
const textoErro = ref("");

const mostraMensagem = ref(false);

const uiListaIngredientes = ref(null);

const listaDeUnidadesDeMedida = ListaDeUnidadesDeMedida;

const novoItem = function () {
  erro.value = false;
  textoErro.value = "";

  const num = itemAtual.value.Quantidade;

  if (Number.isNaN(num)) {
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
  if (itemAtual.value.Quantidade) receitaAtual.value.Adicionar(itemAtual.value);

  itemAtual.value = new Ingrediente(ultimoId++, 0, "", "");

  if (!uiListaIngredientes.value) return;

  const el: Element = uiListaIngredientes.value.$el;

  if (!el) return;

  window.setTimeout(function () {
    el.scroll({ top: el.scrollHeight, behavior: "smooth" });
  }, 10);
};

const salvarReceita = function () {
  const comMesmoNome = listaReceitas.value.find(
    (r) => r.nome === (receitaAtual.value.nome ?? "")
  );

  if (comMesmoNome != undefined) {
    mostraMensagem.value = true;
    return;
  }

  listaReceitas.value.push(receitaAtual.value);
  router.replace("/listadereceitas");

  receitaAtual = ref(Receita.EmBranco());
};

const alertButtons = [
  {
    text: "Cancelar",
    role: "cancel",
    handler: () => {
      console.log("Alert canceled");
    },
  },
  {
    text: "Salvar alteração",
    role: "confirm",
    handler: () => {
      const indexComMesmoNome = listaReceitas.value.findIndex(
        (r) => r.nome === (receitaAtual.value.nome ?? "")
      );

      listaReceitas.value.splice(indexComMesmoNome, 1);
      listaReceitas.value.push(receitaAtual.value);

      router.replace("/listadereceitas");

      receitaAtual = ref(Receita.EmBranco());
    },
  },
];
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
ion-fab {
  margin-bottom: 50px;
}
</style>
