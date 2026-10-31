<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, computed } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { lenis, easeOut4 } from '@/lenis'
import { $, $$ } from '@/utils/dom'
import { RM } from '@/utils/env'

const root = ref(null)
let ctx = null

const rv = r => $$("#" + r + " .rv").forEach(x => gsap.from(x, { yPercent: 110, rotation: 3, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: x, start: "top 90%" } }))

// Le message part sur WhatsApp, pré-rempli
function send() {
  open('https://wa.me/237692072781?text=' + encodeURIComponent(`Message de ${$('#cn').value} (${$('#cm').value})${$('#cs').value ? '\nSujet : ' + $('#cs').value : ''}\n${$('#cx').value}`), '_blank')
}

// Animations de la page Contact
function build() {
  rv('v-contact')
  gsap.from("#ctl",{rotationY:-35,x:-120,opacity:0,transformPerspective:1400,transformOrigin:"right center",duration:1.8,ease:"expo.out"});
  gsap.from("#cf",{rotationY:30,x:120,opacity:0,transformPerspective:1400,transformOrigin:"left center",duration:1.8,ease:"expo.out",delay:.15});
  gsap.from("#cf > *",{y:40,opacity:0,stagger:.08,duration:1.2,ease:"power4.out",delay:.5});
  gsap.fromTo("#ctbg",{scale:1.15,yPercent:-4},{scale:1,yPercent:4,ease:"none",scrollTrigger:{trigger:"#contact",start:"top bottom",end:"bottom top",scrub:true}});
}

onMounted(() => { ctx = gsap.context(() => { if (!RM) build() }, root.value) })
onBeforeUnmount(() => ctx && ctx.revert())
</script>

<template>
  <div class="view" id="v-contact" ref="root" style="display:block">
<section id="contact" class="ct">
<img class="ctbg" id="ctbg" alt="" src="@/assets/img/contact/bg.jpg">
<div class="ctgrid">
 <div class="ctl" id="ctl"><i class="sq"></i>
  <h2 class="ctitle"><span class="ov"><span class="rv">Contactez-nous<b>.</b></span></span></h2>
  <p>Une question sur nos produits, une formation ou un devis d’équipement ? Écrivez-nous : nous lisons chaque message et nous répondons.</p>
  <ul class="cl">
   <li><span class="cic"><svg viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg></span><div><b>WhatsApp &amp; téléphone</b>+237 692 07 27 81<br>+237 677 82 24 48 · +237 690 37 72 80</div></li>
   <li><span class="cic"><svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg></span><div><b>Email</b><a href="mailto:contact@soctracao.com">contact@soctracao.com</a></div></li>
   <li><span class="cic"><svg viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg></span><div><b>Adresse</b>BP 9163 Douala, Logpom, fin goudron Bassong</div></li>
  </ul>
  <div class="soc"><a href="https://web.facebook.com/soctracaosarl" target="_blank" rel="noopener" aria-label="Facebook">f</a><a href="https://www.youtube.com/watch?v=3cVM5bX-Bgk" target="_blank" rel="noopener" aria-label="YouTube">▶</a><a href="https://wa.me/237692072781" target="_blank" rel="noopener" aria-label="WhatsApp">WA</a></div>
 </div>
 <form class="ctr" id="cf" @submit.prevent="send">
  <p class="eyebrow">Envoyez-nous un message</p>
  <div class="row2"><input id="cn" placeholder="Votre nom" required><input id="cm" placeholder="Email ou téléphone" required></div>
  <input id="cs" placeholder="Sujet">
  <textarea id="cx" rows="7" placeholder="Votre message" required></textarea>
  <div class="foot"><button>Envoyer le message</button></div>
 </form>
</div></section>
  </div>
</template>
