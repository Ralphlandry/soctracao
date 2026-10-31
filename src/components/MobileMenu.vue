<script setup>
import { onMounted, onBeforeUnmount, watch } from 'vue'
import gsap from 'gsap'
import { lenis } from '@/lenis'
import { menuOpen } from '@/composables/menu'
import { current } from '@/composables/router'

const MORE_LINKS = [['galerie', 'Galerie'], ['blog', 'Blog']]

let tl = null
// Un clic sur un lien referme le menu
const onMenuClick = e => { if (e.target.closest('a')) menuOpen.value = false }
const onResize = () => { if (innerWidth > 760 && menuOpen.value) menuOpen.value = false }

onMounted(() => {
  tl = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } })
    .set('#mnav', { visibility: 'visible' })
    .to('#mnav', { opacity: 1, duration: 0.5, ease: 'power2.out' })
    .from('#mnav .mnav-kicker, #mnav .mnav-link, #mnav .mnav-contact', { y: 28, opacity: 0, stagger: 0.055, duration: 0.8 }, 0.1)
  addEventListener('resize', onResize)
})
onBeforeUnmount(() => removeEventListener('resize', onResize))

watch(menuOpen, open => {
  if (!tl) return
  if (open) { tl.timeScale(1).play(); lenis.stop() }
  else { tl.timeScale(1.6).reverse(); lenis.start() }
})
</script>

<template>
  <nav class="mobile-dock" aria-label="Navigation mobile" @click="onMenuClick">
    <a href="#accueil" data-go :class="{ on: current === 'accueil' }" :aria-current="current === 'accueil' ? 'page' : undefined">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg><span>Accueil</span>
    </a>
    <a href="#boutique" data-go :class="{ on: current === 'boutique' }" :aria-current="current === 'boutique' ? 'page' : undefined">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 8.5 4.5v9L12 21l-8.5-4.5v-9z"/><path d="m3.5 7.5 8.5 4.5 8.5-4.5M12 12v9"/></svg><span>Produits</span>
    </a>
    <a href="#apropos" data-go :class="{ on: current === 'apropos' }" :aria-current="current === 'apropos' ? 'page' : undefined">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 1 4 17.5z"/><path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20M8 7h8M8 10h8"/></svg><span>Histoire</span>
    </a>
    <a href="#contact" data-go :class="{ on: current === 'contact' }" :aria-current="current === 'contact' ? 'page' : undefined">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="2.5"/></svg><span>Contact</span>
    </a>
    <button type="button" :class="{ on: menuOpen }" :aria-expanded="menuOpen" aria-controls="mnav" @click="menuOpen = !menuOpen">
      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></svg><span>Plus</span>
    </button>
  </nav>
  <div id="mnav" @click="onMenuClick">
    <p class="mnav-kicker"><span>Explorer</span><span>SOCTRACAO</span></p>
    <div class="mnav-list" role="navigation" aria-label="Plus de navigation">
      <a v-for="([id, label]) in MORE_LINKS" :key="id" class="mnav-link" :class="{ on: current === id }" :aria-current="current === id ? 'page' : undefined" data-go :href="'#' + id">
        <span class="mnav-label">{{ label }}</span>
      </a>
    </div>
    <div class="mnav-contact">
      <span>Parlons cacao</span>
      <a href="tel:+237692072781">+237 692 07 27 81</a>
      <a href="mailto:contact@soctracao.com">contact@soctracao.com</a>
    </div>
  </div>
</template>
