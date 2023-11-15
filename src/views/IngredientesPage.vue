<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>A Receita</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">A receita</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-card v-if="dicaVisivel">
        <ion-card-title></ion-card-title>
        <ion-card-content>
          <p>
            <strong>Selecione uma receita existente:</strong> Vá para a aba
            "Lista" para ver todas as suas receitas salvas.
          </p>
          <hr />
          <p>
            <strong>Ou, crie uma nova receita:</strong> Escolha um nome, informe
            a quantidade por porção e adicione os ingredientes. Depois, é só
            clicar no botão "+" para salvar.
          </p>
          <hr />
          <p>
            Sua receita ficará salva na aba "lista", e você poderá calcular os
            ingredientes para outras porções na aba "calculadora".
          </p>
        </ion-card-content>
        <ion-button fill="clear" @click.prevent="dicaVisivel = false"
          >Fechar dica</ion-button
        ></ion-card
      >
      <editor-receita :nome-da-receita="props.nomeDaReceita" />
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
  IonCard,
  IonCardTitle,
  IonCardContent,
  IonButton,
} from "@ionic/vue";
import EditorReceita from "@/components/EditorReceita.vue";
import { ref } from "vue";

const dicaVisivel = ref(true);

const props = defineProps({ nomeDaReceita: String });
</script>
