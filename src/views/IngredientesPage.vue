<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>A Receita</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" scroll-y="false">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">A receita</ion-title>
        </ion-toolbar>
      </ion-header>

      <editor-receita name="Tab 1 page" />
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
import EditorReceita from "@/components/EditorReceita.vue";
</script>
