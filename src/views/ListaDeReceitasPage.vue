<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Lista de Receitas</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Lista de Receitas</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list v-if="listaReceitas.length > 0">
        <ion-item
          v-for="receita in listaReceitas"
          :key="receita.nome"
          @click.prevent="verReceita(receita.nome)"
        >
          {{ receita.nome }}
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
} from "@ionic/vue";

import { useStorage } from "@vueuse/core";
import { Receita } from "@/Models/Receita";
import Ingrediente from "@/Models/Ingrediente";
import router from "@/router";

const listaReceitas = useStorage(
  "listaDeReceitasStorage",
  [new Receita("Exemplo", 5, [new Ingrediente(1, 3, "Copo", "água")])],
  localStorage,
  { mergeDefaults: true }
);

const verReceita = function (nomeReceita: string) {
  router.replace(`/ingredientes/${nomeReceita}`);
};
</script>
