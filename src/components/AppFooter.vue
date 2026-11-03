<script setup>
import { onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { lenis, easeOut4 } from '@/lenis'
import { RM } from '@/utils/env'

let ctx = null

// Animations du footer : reconstruites à chaque changement de page
function rebuild() {
  if (ctx) ctx.revert()
  if (RM) return
  ctx = gsap.context(() => {
    gsap.from('.fcol', { y: 60, opacity: 0, stagger: 0.1, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '.fgrid', start: 'top 92%' } })
    gsap.fromTo('.fwm', { yPercent: 35 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: 'footer', start: 'top bottom', end: 'bottom bottom', scrub: true } })
  })
}

const toTop = () => lenis.scrollTo(0, { duration: 1.6, easing: easeOut4 })

defineExpose({ rebuild })
onBeforeUnmount(() => ctx && ctx.revert())
</script>

<template>
<footer>
 <div class="ftrust wrap"><span>✦ Tarifs indiqués en FCFA</span><span>✦ 100 % transformé au Cameroun</span><span>✦ Sans conservateurs artificiels</span></div>
 <div class="wrap fgrid">
  <div class="fcol fbrand"><div class="flogo"><img alt="SOCTRACAO" src="@/assets/img/logo.webp"></div><p>Société Commerciale et de Transformation de Cacao. Du cacao cultivé, transformé et savouré au Cameroun.</p>
   <div class="soc"><a href="https://web.facebook.com/soctracaosarl" target="_blank" rel="noopener" aria-label="Facebook">f</a><a href="https://www.youtube.com/watch?v=3cVM5bX-Bgk" target="_blank" rel="noopener" aria-label="YouTube">▶</a><a href="https://wa.me/237692072781" target="_blank" rel="noopener" aria-label="WhatsApp">WA</a></div></div>
  <div class="fcol"><h4>Navigation</h4><a data-go href="#accueil">Accueil</a><a data-go href="#apropos">À propos</a><a data-go href="#boutique">Produits</a><a data-go href="#galerie">Galerie</a><a data-go href="#contact">Contact</a><a data-go href="#blog">Blog</a></div>
  <div class="fcol"><h4>Nos univers</h4><a data-go href="#boutique">Chocolats Nya Mboa</a><a data-go href="#boutique">Cacao &amp; tartines Goshen</a><a data-go href="#apropos">Équipements Ndeh-Tech</a><a data-go href="#apropos">Formations</a></div>
  <div class="fcol"><h4>Nous joindre</h4><p>BP 9163 Douala<br>Logpom, fin goudron Bassong</p><p>+237 692 07 27 81<br>+237 677 82 24 48<br>+237 690 37 72 80</p><a href="mailto:contact@soctracao.com">contact@soctracao.com</a></div>
 </div>
 <div class="fwm" aria-hidden="true">SOCTRACAO</div>
 <div class="wrap fbot"><div class="fcopy"><span>© 2026 SOCTRACAO · RC/DLA/2015/B/704 · Douala, Cameroun</span><a class="fcredit" href="https://nenxel.com" target="_blank" rel="noopener noreferrer">by Nenxel</a></div><button id="totop" @click="toTop">Retour en haut ↑</button></div>
</footer>
</template>
