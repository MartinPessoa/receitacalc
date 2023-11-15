<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Calculadora</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Calculadora</ion-title>
        </ion-toolbar>
      </ion-header>

      <EditorDeReceita />
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
} from "@ionic/vue";
import EditorDeReceita from "@/components/EditorReceita.vue";
</script>
