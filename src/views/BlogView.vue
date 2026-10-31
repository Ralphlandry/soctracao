<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, computed } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { lenis, easeOut4 } from '@/lenis'
import { $, $$ } from '@/utils/dom'
import { RM } from '@/utils/env'
import { BI, X } from '@/data/images'
import { BL } from '@/data/blog'

const CATS = ['Tout', 'Fève de cacao', 'Secteur cacaoyer', 'Chocolat']
const root = ref(null)
const cat = ref('Tout')
const shown = computed(() => BL.filter(a => cat.value == 'Tout' || a.cat == cat.value))
const art = ref(null)
const prev = computed(() => BL[(BL.findIndex(x => x.id == art.value.id) - 1 + BL.length) % BL.length])
const next = computed(() => BL[(BL.findIndex(x => x.id == art.value.id) + 1) % BL.length])
const artHtml = computed(() => art.value.b + (art.value.src ? '<p class="src">Source : ' + art.value.src + '</p>' : ''))
let isOpen = 0
let ctx = null

// Animations de la page Blog
function build() {
  gsap.from("#blog .nhx > *",{y:50,opacity:0,stagger:.12,duration:1.3,ease:"expo.out",delay:.15});
  gsap.from("#blog .bcard",{z:-300,rotationY:35,y:100,opacity:0,transformPerspective:1000,stagger:.18,duration:1.8,ease:"expo.out",delay:.2});
  gsap.from("#blog .bchip",{scale:0,rotation:-20,stagger:.12,duration:1.4,ease:"elastic.out(1,.55)",delay:.9});
  gsap.from("#blog .nhv .blob",{scale:.4,opacity:0,duration:1.8,ease:"expo.out"});
  [["#blog .b1",-14,3.6],["#blog .b2",-20,3.2],["#blog .c1",-8,2.8],["#blog .c2",-10,3.4],["#blog .c3",-8,3]].forEach(([s,y,d])=>gsap.to(s,{y,duration:d,ease:"sine.inOut",yoyo:true,repeat:-1,delay:2.4}));
  gsap.to("#blog .nhv",{y:-60,ease:"none",scrollTrigger:{trigger:"#blog .nh",start:"top top",end:"bottom top",scrub:1}});
  gsap.to("#blog .dsh",{rotation:90,ease:"none",scrollTrigger:{trigger:"#blog .nh",start:"top top",end:"bottom top",scrub:1}});
  gsap.utils.toArray("#blog .nt,#blog .nsub").forEach(t=>gsap.from(t,{y:50,opacity:0,duration:1.3,ease:"expo.out",scrollTrigger:{trigger:t,start:"top 90%"}}));
  gsap.from("#blog .bf .chip",{y:30,opacity:0,stagger:.08,duration:1.1,ease:"expo.out",scrollTrigger:{trigger:"#bf",start:"top 92%"}});
  gsap.from("#blog .bc",{y:90,rotationX:-22,opacity:0,transformPerspective:900,stagger:.1,duration:1.4,ease:"expo.out",scrollTrigger:{trigger:"#blg",start:"top 88%"}});
  gsap.from("#blog .bcta .wrap > *",{y:40,opacity:0,stagger:.12,duration:1.2,ease:"expo.out",scrollTrigger:{trigger:".bcta",start:"top 85%"}});
}

async function setCat(c) {
  cat.value = c
  await nextTick()
  gsap.fromTo('#blg .bc', { y: 60, rotationX: -20, opacity: 0, transformPerspective: 900 }, { y: 0, rotationX: 0, opacity: 1, duration: 1.2, ease: 'expo.out', stagger: 0.08 })
}

// Lecteur d’article plein écran
async function openR(id) {
  art.value = BL.find(x => x.id == id)
  await nextTick()
  $('#rd').scrollTop = 0
  gsap.set(['#rd', '#rdx'], { visibility: 'visible' })
  if (!isOpen) {
    gsap.fromTo('#rd', { yPercent: 100 }, { yPercent: 0, duration: 1.1, ease: 'expo.out' })
    gsap.fromTo('#rdx', { scale: 0, rotation: -90 }, { scale: 1, rotation: 0, duration: 1, ease: 'elastic.out(1,.6)', delay: 0.4 })
  }
  gsap.from('#rdin > *', { y: 40, opacity: 0, stagger: 0.08, duration: 1.2, ease: 'expo.out', delay: isOpen ? 0 : 0.45 })
  isOpen = 1
  lenis.stop()
}
function closeR() {
  if (!isOpen) return
  isOpen = 0
  gsap.to('#rd', { yPercent: 100, duration: 0.8, ease: 'power4.inOut', onComplete: () => gsap.set('#rd', { visibility: 'hidden' }) })
  gsap.to('#rdx', { scale: 0, duration: 0.4, ease: 'power3.in', onComplete: () => gsap.set('#rdx', { visibility: 'hidden' }) })
  lenis.start()
}
const onRdin = e => {
  const b = e.target.closest('[data-id]')
  if (b) openR(b.dataset.id)
}
const onKey = e => { if (e.key == 'Escape') closeR() }
const toGrid = () => lenis.scrollTo('#blgrid', { duration: 1.6, easing: easeOut4 })

onMounted(() => {
  ctx = gsap.context(() => { if (!RM) build() }, root.value)
  addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  removeEventListener('keydown', onKey)
  if (isOpen) lenis.start()
  ctx && ctx.revert()
})
</script>

<template>
  <div class="view" id="v-blog" ref="root" style="display:block">
<section id="blog">
<header class="nh"><i class="dsh" style="width:260px;height:260px;left:-80px;top:20vh"></i><i class="dsh" style="width:380px;height:380px;right:-120px;bottom:-140px"></i>
 <div class="wrap nhg">
  <div class="nhx"><p class="eyebrow" style="color:var(--green)">Blog</p><h1>Actualités du <span class="gr">cacao &amp; du chocolat</span></h1>
   <p>Filière cacao, plantation, transformation, recherche : nos lectures pour comprendre le cacao camerounais, de la cabosse à la tablette.</p>
   <div class="nbtns"><a href="#blgrid" class="nb" id="bgo" @click.prevent="toGrid">Lire les articles</a><a data-go href="#contact" class="nb o">Nous écrire</a></div></div>
  <div class="nhv"><i class="blob"></i><div class="bcard b1"><img :src="X.cabw" alt="Cabosses et fèves de cacao"></div><div class="bcard b2"><img :src="X.wk" alt="Pépinière de cacaoyers"></div><span class="bchip c1">Fève de cacao</span><span class="bchip c2">Secteur cacaoyer</span><span class="bchip c3">Chocolat</span></div>
 </div></header>
<div class="wrap bgw" id="blgrid"><h2 class="nt">Nos articles</h2><p class="nsub">8 articles pour tout savoir sur le cacao du Cameroun. Cliquez sur un article pour le lire ici.</p><div class="bar bf" id="bf"><button v-for="c in CATS" :key="c" class="chip" :class="{ on: cat === c }" :data-c="c" @click="setCat(c)">{{ c }}</button></div>
      <div class="blg" id="blg">
        <article v-for="a in shown" :key="a.id" class="bc" :data-id="a.id" @click="openR(a.id)">
          <div class="bcv" :class="a.kind"><img class="bgi" alt="" :src="BI[a.img]"><img class="fg" alt="" :src="BI[a.img]"><span class="bcat">{{ a.cat }}</span></div>
          <div class="bcb"><p class="bmeta">{{ a.date }} · {{ a.read }} de lecture</p><h3>{{ a.t }}</h3><p class="ex">{{ a.ex }}</p><span class="bmore">Lire l’article <i>→</i></span></div>
        </article>
      </div></div>
<div class="bcta"><div class="wrap"><h2 class="nt">Une question sur le cacao ou nos produits ?</h2><p class="nsub">Notre équipe vous répond sur WhatsApp ou par message.</p><div class="nbtns" style="justify-content:center;margin-top:26px"><a data-go href="#contact" class="nb">Nous contacter</a><a href="https://wa.me/237692072781" target="_blank" rel="noopener" class="nb o">WhatsApp</a></div></div></div>
</section>
    <Teleport to="body">
      <div id="rd" data-lenis-prevent>
        <div class="rdp" id="rdin" @click="onRdin">
          <template v-if="art">
            <span class="bcat">{{ art.cat }}</span>
            <h1>{{ art.t }}</h1>
            <p class="rdm">{{ art.date }} · {{ art.read }} de lecture</p>
            <div class="rdc"><div class="bcv" :class="art.kind"><img class="bgi" alt="" :src="BI[art.img]"><img class="fg" alt="" :src="BI[art.img]"></div></div>
            <div class="rdb" v-html="artHtml"></div>
            <div class="rdf"><a class="nb o" :href="'https://soctracao.com/' + art.slug + '/'" target="_blank" rel="noopener">Lire sur le site d’origine</a><a class="nb" :href="'https://wa.me/?text=' + encodeURIComponent(art.t + ' — SOCTRACAO')" target="_blank" rel="noopener">Partager sur WhatsApp</a></div>
            <div class="rdn"><button :data-id="prev.id"><small>← Précédent</small>{{ prev.t }}</button><button :data-id="next.id"><small>Suivant →</small>{{ next.t }}</button></div>
          </template>
        </div>
      </div>
      <button id="rdx" aria-label="Fermer l’article" @click="closeR">✕</button>
    </Teleport>
  </div>
</template>
