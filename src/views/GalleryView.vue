<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, computed } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { lenis, easeOut4 } from '@/lenis'
import { $, $$ } from '@/utils/dom'
import { RM } from '@/utils/env'
import { SLIDES, GALLERY_CATS } from '@/data/slider'
import { openLightbox } from '@/composables/lightbox'

// Toutes les images du carrousel « Instants SOCTRACAO », classées par thème
const ALL = SLIDES.map((x, i) => ({ ...x, c: GALLERY_CATS[i] || 'Moments' }))
const CATS = ['Tout', 'Produits', 'Salons & rencontres', 'Moments']
const root = ref(null)
const cat = ref('Tout')
const shown = computed(() => ALL.filter(x => cat.value == 'Tout' || x.c == cat.value))
let ctx = null

// Animations de la galerie
function build() {
  gsap.from("#galerie .gh .wrap > *",{y:50,opacity:0,stagger:.12,duration:1.3,ease:"expo.out",delay:.15});
  gsap.to("#galerie .dsh",{rotation:90,ease:"none",scrollTrigger:{trigger:"#galerie .nh",start:"top top",end:"bottom top",scrub:1}});
  gsap.from("#gf .chip",{y:30,opacity:0,stagger:.08,duration:1.1,ease:"expo.out",scrollTrigger:{trigger:"#gf",start:"top 94%"}});
  gsap.utils.toArray("#gal .gt").forEach(g=>{gsap.from(g,{y:90,rotationX:-18,opacity:0,transformPerspective:900,duration:1.3,ease:"expo.out",scrollTrigger:{trigger:g,start:"top 94%"}});
    gsap.fromTo(g.querySelector("img"),{yPercent:-4,scale:1.12},{yPercent:4,scale:1.12,ease:"none",scrollTrigger:{trigger:g,start:"top bottom",end:"bottom top",scrub:1}})});
}

async function setCat(c) {
  cat.value = c
  await nextTick()
  gsap.fromTo('#gal .gt', { y: 60, rotationX: -18, opacity: 0, transformPerspective: 900 }, { y: 0, rotationX: 0, opacity: 1, duration: 1.2, ease: 'expo.out', stagger: 0.07 })
  ScrollTrigger.refresh()
}

onMounted(() => { ctx = gsap.context(() => { if (!RM) build() }, root.value) })
onBeforeUnmount(() => ctx && ctx.revert())
</script>

<template>
  <div class="view" id="v-galerie" ref="root" style="display:block">
<section id="galerie">
<header class="nh gh"><i class="dsh" style="width:260px;height:260px;left:-80px;top:20vh"></i><i class="dsh" style="width:380px;height:380px;right:-120px;bottom:-140px"></i>
 <div class="wrap"><p class="eyebrow" style="color:var(--green)">Galerie</p><h1>Nos <span class="gr">instants</span> en images</h1><p id="gcount">{{ SLIDES.length }} photos : produits, salons, rencontres et moments de partage. L’univers SOCTRACAO en images.</p></div></header>
<div class="wrap gw"><div class="bar bf" id="gf"><button v-for="c in CATS" :key="c" class="chip" :class="{ on: cat === c }" :data-c="c" @click="setCat(c)">{{ c }}</button></div>
      <div class="gx" id="gal">
        <figure v-for="x in shown" :key="x.src" class="gt" @click="openLightbox(x.src, x.t)"><img :alt="x.t" :src="x.src"><figcaption>{{ x.t }}</figcaption></figure>
      </div></div>
</section>
  </div>
</template>
