<script setup>
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { lenis, easeOut4 } from '@/lenis'
import { current } from '@/composables/router'
import AppNav from '@/components/AppNav.vue'
import AppFooter from '@/components/AppFooter.vue'
import MobileMenu from '@/components/MobileMenu.vue'
import Lightbox from '@/components/Lightbox.vue'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import ProductsView from '@/views/ProductsView.vue'
import GalleryView from '@/views/GalleryView.vue'
import ContactView from '@/views/ContactView.vue'
import BlogView from '@/views/BlogView.vue'

// Les identifiants de page sont ceux du site d’origine (#apropos, #boutique…)
const VIEWS = { accueil: HomeView, apropos: AboutView, boutique: ProductsView, galerie: GalleryView, contact: ContactView, blog: BlogView }

const footer = ref(null)
let busy = false

function swap(id) {
  document.body.className = 'pg-' + id
  lenis.scrollTo(0, { immediate: true })
  scrollTo(0, 0)
  current.value = id
}

function route(id) {
  if (id === 'produits') id = 'boutique'
  if (!VIEWS[id] || id === current.value || busy) return
  if (!current.value) { swap(id); return }
  busy = true
  const old = document.querySelector('#v-' + current.value)
  gsap.to(old, { opacity: 0, duration: 0.4, ease: 'power2.out', onComplete: () => { swap(id); busy = false } })
}

// Après chaque changement de page : footer + recalcul de ScrollTrigger
watch(current, async () => {
  await nextTick()
  try {
    footer.value && footer.value.rebuild()
    ScrollTrigger.refresh()
  } catch (e) { console.error(e) }
})

// Tous les liens marqués data-go changent de page (ou remontent en haut)
const onGo = e => {
  const a = e.target.closest('[data-go]')
  if (!a) return
  e.preventDefault()
  const id = a.getAttribute('href').slice(1)
  id === current.value ? lenis.scrollTo(0, { duration: 1.4, easing: easeOut4 }) : route(id)
}
const onHash = () => route(location.hash.slice(1))

onMounted(() => {
  document.addEventListener('click', onGo)
  addEventListener('hashchange', onHash)
  route(location.hash.slice(1) || 'accueil')
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onGo)
  removeEventListener('hashchange', onHash)
})
</script>

<template>
  <AppNav />
  <component :is="VIEWS[current]" v-if="current" :key="current" />
  <AppFooter ref="footer" />
  <MobileMenu />
  <Lightbox />
</template>
