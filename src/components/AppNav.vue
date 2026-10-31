<script setup>
import { LOGO } from '@/data/images'
import { current } from '@/composables/router'

const LINKS = [
  ['accueil', 'Accueil'],
  ['apropos', 'À propos'],
  ['boutique', 'Produits'],
  ['galerie', 'Galerie'],
  ['contact', 'Contact'],
  ['blog', 'Blog']
]
</script>

<template>
  <nav>
    <a href="#accueil" class="logo" data-go aria-label="SOCTRACAO, accueil"><img class="lg" alt="SOCTRACAO" :src="LOGO"></a>
    <div class="links">
      <a v-for="[id, label] in LINKS" :key="id" :href="'#' + id" data-go :class="{ on: current === id }">{{ label }}</a>
    </div>
  </nav>
</template>
