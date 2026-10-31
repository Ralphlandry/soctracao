<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { SLIDES } from '@/data/slider'

// Carrousel 3D « Instants SOCTRACAO » (défilement automatique)
const stage = ref(null)
const cap = ref(null)
const idx = ref(0)
let figs = []
let cur = 0
let tm = null
const n = SLIDES.length

const lay = first => {
  figs.forEach((s, i) => {
    let o = i - cur
    if (o > n / 2) o -= n
    if (o < -n / 2) o += n
    const a = Math.abs(o)
    gsap.to(s, { xPercent: -50 + o * 64, z: -a * 280, rotationY: -o * 42, scale: 1 - a * 0.06, opacity: a > 1 ? 0 : 1 - a * 0.45, zIndex: 10 - a, duration: first ? 0 : 1.5, ease: 'expo.out', overwrite: true })
  })
  idx.value = cur
  gsap.fromTo(cap.value, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: 'power4.out' })
  cap.value.textContent = SLIDES[cur].t
}
const go = d => { cur = (cur + d + n) % n; lay() }
const to = i => { cur = i; lay() }
const play = () => { clearInterval(tm); tm = setInterval(() => go(1), 3800) }
const next = () => { go(1); play() }
const prev = () => { go(-1); play() }
const pick = i => { to(i); play() }
const pause = () => clearInterval(tm)
const tilt = e => {
  const st = stage.value
  const r = st.getBoundingClientRect()
  gsap.to(st, { rotationX: -((e.clientY - r.top) / r.height - 0.5) * 8, duration: 1, ease: 'power4.out' })
}

onMounted(() => {
  figs = [...stage.value.querySelectorAll('.s3d')]
  lay(true)
  play()
})
onBeforeUnmount(() => { clearInterval(tm); gsap.killTweensOf(figs) })
</script>

<template>
  <section class="slider" id="slider">
    <p class="eyebrow">Instants SOCTRACAO</p>
    <div class="sstage" id="sstage" ref="stage" @mouseenter="pause" @mouseleave="play" @mousemove="tilt">
      <figure v-for="(s, i) in SLIDES" :key="i" class="s3d" :data-t="s.t" @click="pick(i)">
        <img class="bg" alt="" :src="s.src">
        <img :alt="s.t" :src="s.src">
      </figure>
    </div>
    <p class="scap" id="scap" ref="cap"></p>
    <div class="sctl">
      <button id="sprev" aria-label="Précédent" @click="prev">←</button>
      <span id="sdots"><i v-for="(s, i) in SLIDES" :key="i" :class="{ on: i === idx }"></i></span>
      <button id="snext" aria-label="Suivant" @click="next">→</button>
    </div>
  </section>
</template>
