<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, computed } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { lenis, easeOut4 } from '@/lenis'
import { $, $$ } from '@/utils/dom'
import { RM } from '@/utils/env'
import { IM } from '@/data/images'
import { P, T, f, CATS } from '@/data/products'

const root = ref(null)
const cat = ref('all')
const list = computed(() => P.filter(p => cat.value == 'all' || p[4] == cat.value))
let ctx = null

const rv = r => $$("#" + r + " .rv").forEach(x => gsap.from(x, { yPercent: 110, rotation: 3, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: x, start: "top 90%" } }))

const pct = p => {
  const m = (p[1].match(/(\d+) ?%/) || [])[1]
  return m ? m + '%' : p[4] == 'soin' ? '✿' : 'CAO'
}
const tabStyle = p => {
  const t = T[p[5]]
  return IM[p[0]] ? `color:${t[2]}` : `background:linear-gradient(135deg,${t[0]},${t[1]});color:${t[2]}`
}

// Animation d’apparition des cartes + inclinaison 3D au survol
function afterRender() {
  gsap.fromTo('#grid .p', { y: 80, rotationX: -25, opacity: 0 }, { y: 0, rotationX: 0, opacity: 1, duration: 1.2, ease: 'expo.out', stagger: 0.06, scrollTrigger: { trigger: '#grid', start: 'top 85%' } })
  $$('.p').forEach(el => {
    const tb = el.querySelector('.tab')
    el.onmousemove = e => {
      const r = el.getBoundingClientRect()
      gsap.to(tb, { rotationY: ((e.clientX - r.left) / r.width - 0.5) * 24, rotationX: -((e.clientY - r.top) / r.height - 0.5) * 24, duration: 0.6, ease: 'power4.out' })
    }
    el.onmouseleave = () => gsap.to(tb, { rotationY: 0, rotationX: 0, duration: 1, ease: 'expo.out' })
  })
  ScrollTrigger.refresh()
}

async function setCat(c) {
  cat.value = c
  await nextTick()
  afterRender()
}

onMounted(() => {
  ctx = gsap.context(() => {
    if (RM) afterRender()
    else { rv('v-boutique'); afterRender() }
  }, root.value)
})
onBeforeUnmount(() => ctx && ctx.revert())
</script>

<template>
  <div class="view" id="v-boutique" ref="root" style="display:block">
<section id="boutique"><div class="wrap">
  <p class="eyebrow">Produits</p>
  <h2><span class="ov"><span class="rv">Nos produits,</span></span><span class="ov"><span class="rv">du cacao au chocolat.</span></span></h2>
  <p style="opacity:.75">Découvrez nos gammes et leurs tarifs.</p>
  <div class="bar" id="chips"><button v-for="c in CATS" :key="c[0]" class="chip" :class="{ on: cat === c[0] }" :data-c="c[0]" @click="setCat(c[0])">{{ c[1] }}</button></div>
  <div class="grid" id="grid">
      <article v-for="p in list" :key="p[0]" class="p">
        <div class="tab" :class="{ has: !!IM[p[0]] }" :style="tabStyle(p)">
          <img v-if="IM[p[0]]" class="pimg" :class="{ full: p[0] == 14 }" :alt="p[1]" :src="IM[p[0]]">
          <b v-else>{{ pct(p) }}</b>
        </div>
        <h3>{{ p[1] }}</h3>
        <div class="pr">
          <strong>{{ p[2] ? f(p[3] || p[2]) : 'Tarif non communiqué' }}</strong>
        </div>
      </article>
    </div>
</div></section>
  </div>
</template>
