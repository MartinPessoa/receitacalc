<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/ingredientes">
          <ion-icon :icon="list" />
          <ion-label>Receita</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/calculadora">
          <ion-icon :icon="calculator" />
          <ion-label>Calculadora</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/listadereceitas">
          <ion-icon :icon="book" />
          <ion-label>Lista</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
} from "@ionic/vue";
import { calculator, book, list } from "ionicons/icons";
</script>
