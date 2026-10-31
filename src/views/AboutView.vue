<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, computed } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { lenis, easeOut4 } from '@/lenis'
import { $, $$ } from '@/utils/dom'
import { RM } from '@/utils/env'
import { IM, X } from '@/data/images'
import { P, f, POPULAR } from '@/data/products'
import { POINTS } from '@/data/points'
import { openLightbox } from '@/composables/lightbox'

const root = ref(null)
const LOOP = [...POINTS, ...POINTS]   // défilé des points de vente, répété pour la boucle
const vcText = ref('01 / 03')
let ctx = null
let valuesTimer = null

const rv = r => $$("#" + r + " .rv").forEach(x => gsap.from(x, { yPercent: 110, rotation: 3, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: x, start: "top 90%" } }))

const prod = id => P.find(x => x[0] == id)
const onPm = e => {
  const i = e.target.closest('img')
  if (i) openLightbox(i.src, i.alt)
}

// Carrousel « Ce qui nous anime »
let vgo = () => {}
const go = d => vgo(d)
function initValues() {
  const S = $$('.vsl'), n = S.length
  let i = 0, busy = 0
  gsap.set(S, { opacity: 0, x: 40 })
  gsap.set(S[0], { opacity: 1, x: 0 })
  vgo = d => {
    if (busy) return
    busy = 1
    const o = S[i]
    i = (i + d + n) % n
    gsap.to(o, { x: -50 * d, opacity: 0, duration: 0.6, ease: 'power3.in' })
    gsap.fromTo(S[i], { x: 50 * d, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 0.45, onComplete: () => (busy = 0) })
    vcText.value = '0' + (i + 1) + ' / 0' + n
  }
  valuesTimer = setInterval(() => vgo(1), 6000)
}

// Animations de la page À propos
function build() {
  gsap.from(".nhx > *",{y:50,opacity:0,stagger:.12,duration:1.3,ease:"expo.out",delay:.15});
  gsap.from(".hb",{z:-400,rotationY:40,y:120,opacity:0,transformPerspective:1000,stagger:.15,duration:1.9,ease:"expo.out",delay:.2});
  gsap.from(".nhv .blob",{scale:.4,opacity:0,duration:1.8,ease:"expo.out"});
  [[".hb1",-18,3.2],[".hb2",-26,3.8],[".hb3",-14,3.5]].forEach(([s,y,d])=>gsap.to(s,{y,duration:d,ease:"sine.inOut",yoyo:true,repeat:-1,delay:2.3}));
  gsap.to(".nhv",{y:-70,ease:"none",scrollTrigger:{trigger:".nh",start:"top top",end:"bottom top",scrub:1}});
  gsap.to(".dsh",{rotation:90,ease:"none",scrollTrigger:{trigger:".nh",start:"top top",end:"bottom top",scrub:1}});
  gsap.from(".ni",{y:40,opacity:0,stagger:.12,duration:1.2,ease:"expo.out",scrollTrigger:{trigger:".nstrip",start:"top 95%"}});
  gsap.utils.toArray("#apropos .nt,#apropos .nsub").forEach(t=>gsap.from(t,{y:50,opacity:0,duration:1.3,ease:"expo.out",scrollTrigger:{trigger:t,start:"top 90%"}}));
  gsap.from(".pc",{y:90,rotationX:-25,opacity:0,transformPerspective:900,stagger:.1,duration:1.4,ease:"expo.out",scrollTrigger:{trigger:"#pop",start:"top 85%"}});
  gsap.from(".wc",{y:70,scale:.9,opacity:0,stagger:.12,duration:1.3,ease:"expo.out",scrollTrigger:{trigger:".wg",start:"top 85%"}});
  gsap.from(".wc .gi",{scale:0,rotation:-40,duration:1.4,ease:"elastic.out(1,.5)",stagger:.12,delay:.3,scrollTrigger:{trigger:".wg",start:"top 85%"}});
  $$(".cn b").forEach(b=>{const f=+b.dataset.from,o={v:f},n=+b.dataset.n;b.textContent=f;gsap.to(o,{v:n,duration:2.8,ease:"power4.out",scrollTrigger:{trigger:".acn",start:"top 75%"},onUpdate:()=>b.textContent=Math.round(o.v)})});
  gsap.from(".acn h2",{y:40,opacity:0,duration:1.3,ease:"expo.out",scrollTrigger:{trigger:".acn",start:"top 85%"}});
  gsap.from(".cn",{y:90,rotationX:-35,opacity:0,transformPerspective:900,stagger:.12,duration:1.5,ease:"expo.out",scrollTrigger:{trigger:".acn",start:"top 78%"}});
  gsap.from(".cn svg",{scale:0,rotation:-40,duration:1.4,ease:"elastic.out(1,.5)",stagger:.12,delay:.3,scrollTrigger:{trigger:".acn",start:"top 78%"}});
  gsap.from(".vcard",{x:-80,opacity:0,duration:1.5,ease:"expo.out",scrollTrigger:{trigger:".vg",start:"top 82%"}});
  gsap.from(".vblob",{scale:.7,rotation:-14,opacity:0,duration:1.8,ease:"expo.out",scrollTrigger:{trigger:".vg",start:"top 82%"}});
  gsap.to(".vblob",{rotation:8,ease:"none",scrollTrigger:{trigger:".nval",start:"top bottom",end:"bottom top",scrub:1}});
  gsap.from(".col > div",{y:90,opacity:0,stagger:.14,duration:1.5,ease:"expo.out",scrollTrigger:{trigger:".col",start:"top 85%"}});
  gsap.fromTo(".col img",{scale:1.25,yPercent:-7},{scale:1.25,yPercent:7,ease:"none",scrollTrigger:{trigger:".col",start:"top bottom",end:"bottom top",scrub:1}});
  gsap.from(".atx3 > *",{y:50,opacity:0,stagger:.1,duration:1.3,ease:"expo.out",scrollTrigger:{trigger:".atx3",start:"top 82%"}});
  const pt=$("#pm .pmt");
  const ptw=gsap.fromTo(pt,{xPercent:0},{xPercent:-50,duration:190,ease:"none",repeat:-1});
  ScrollTrigger.create({trigger:".npt",start:"top bottom",end:"bottom top",onUpdate:s=>{ptw.timeScale(Math.min(1+Math.abs(s.getVelocity())/300,7));gsap.to(ptw,{timeScale:1,duration:1.6,ease:"power3.out",overwrite:true})}});
  $("#pm").onmouseenter=()=>gsap.to(ptw,{timeScale:0,duration:.7,ease:"power3.out",overwrite:true});$("#pm").onmouseleave=()=>gsap.to(ptw,{timeScale:1,duration:1.2,ease:"power3.out",overwrite:true});
  gsap.from("#pm",{y:100,rotationX:-20,opacity:0,transformPerspective:1000,duration:1.7,ease:"expo.out",scrollTrigger:{trigger:"#pm",start:"top 90%"}});
  gsap.from(".sg .nt,.sl2 li,.sg .nbtns",{x:-50,opacity:0,stagger:.1,duration:1.3,ease:"expo.out",scrollTrigger:{trigger:".sg",start:"top 80%"}});
  gsap.from(".svv .a",{y:90,rotation:-10,opacity:0,duration:1.7,ease:"expo.out",scrollTrigger:{trigger:".svv",start:"top 85%"}});
  gsap.from(".svv .b",{y:120,rotation:12,opacity:0,duration:1.8,ease:"expo.out",delay:.2,scrollTrigger:{trigger:".svv",start:"top 85%"}});
  gsap.fromTo(".svv .b",{yPercent:-6},{yPercent:8,ease:"none",scrollTrigger:{trigger:".svv",start:"top bottom",end:"bottom top",scrub:1}});
}

onMounted(() => {
  initValues()
  ctx = gsap.context(() => { if (!RM) build() }, root.value)
})
onBeforeUnmount(() => {
  clearInterval(valuesTimer)
  ctx && ctx.revert()
})
</script>

<template>
  <div class="view" id="v-apropos" ref="root" style="display:block">
<section id="apropos">
<header class="nh"><i class="dsh" style="width:260px;height:260px;left:-80px;top:20vh"></i><i class="dsh" style="width:380px;height:380px;right:-120px;bottom:-140px"></i>
 <div class="wrap nhg">
  <div class="nhx"><p class="eyebrow" style="color:var(--green)">À propos de nous</p>
   <h1>Le bon chocolat, <span class="gr">transformé au Cameroun</span></h1>
   <p>SOCTRACAO transforme localement le cacao camerounais en beurre, poudre, chocolats et pâte à tartiner, sans composants artificiels.</p>
   <div class="nbtns"><a data-go href="#boutique" class="nb">Découvrir nos produits</a><a data-go href="#contact" class="nb o">Nous contacter</a></div></div>
  <div class="nhv"><i class="blob"></i><img class="hb hb1" :src="IM[10]" alt="Chocolat noir au gingembre"><img class="hb hb2" :src="IM[11]" alt="Chocolat noir au piment"><img class="hb hb3" :src="IM[7]" alt="Chocolat blanc"></div>
 </div></header>
<div class="wrap"><div class="nstrip">
 <div class="ni"><span class="gi"><svg viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg></span><b>Logpom, Bassong · Douala</b><small>Siège social</small></div>
 <div class="ni"><span class="gi"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg></span><b>Depuis 2015</b><small>Année de création</small></div>
 <div class="ni"><span class="gi"><svg viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg></span><b>+237 692 07 27 81</b><small>WhatsApp &amp; téléphone</small></div>
</div></div>
<div class="npop wrap"><h2 class="nt">Nos produits phares</h2><p class="nsub">Découvrez quelques-uns de nos chocolats et produits Goshen, 100 % camerounais.</p><div class="pg" id="pop">
      <article v-for="id in POPULAR" :key="id" class="pc">
        <div class="pci"><img :class="id == 14 ? 'full' : ''" :alt="prod(id)[1]" :src="IM[id]"></div>
        <h3>{{ prod(id)[1] }}</h3>
        <div class="prow"><strong>{{ f(prod(id)[3] || prod(id)[2]) }}</strong></div>
      </article>
    </div>
 <div style="text-align:center;margin-top:40px"><a data-go href="#boutique" class="nb">Voir tous nos produits</a></div></div>
<div class="nwhy wrap"><h2 class="nt">Pourquoi choisir SOCTRACAO ?</h2><div class="wg">
 <div class="wc"><span class="gi"><svg viewBox="0 0 24 24"><circle cx="12" cy="9" r="6"/><path d="m8.5 14.5-1.5 7 5-3 5 3-1.5-7"/></svg></span><h3>Qualité supérieure</h3><p>Nous sélectionnons les meilleurs ingrédients pour garantir un produit final d’excellence.</p></div>
 <div class="wc"><span class="gi"><svg viewBox="0 0 24 24"><path d="M11 20A7 7 0 0 1 9.800 6.100C15.500 5 17 4.500 19 2c1 2 2 4.200 2 8 0 5.500-4.800 10-10 10z"/><path d="M2 21c0-3 1.900-5.500 6-6.500"/></svg></span><h3>Durabilité</h3><p>Nous soutenons des pratiques éthiques et durables tout au long de notre chaîne d’approvisionnement.</p></div>
 <div class="wc"><span class="gi"><svg viewBox="0 0 24 24"><path d="M21 12a9 9 0 0 1-13.500 7.800L3 21l1.200-4.500A9 9 0 1 1 21 12z"/></svg></span><h3>Service clientèle</h3><p>À l’écoute de vos besoins, pour une expérience personnalisée et satisfaisante.</p></div>
 <div class="wc"><span class="gi"><svg viewBox="0 0 24 24"><path d="M2 12s3.600-7 10-7 10 7 10 7-3.600 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg></span><h3>Transparence</h3><p>Des informations claires sur nos produits, leur provenance et leur processus de fabrication.</p></div>
</div></div>
<div class="acn"><div class="wrap"><h2>Formations en transformation de cacao, fabrication d’équipements de transformation de cacao + maintenance</h2><div class="cng"><div class="cn"><svg viewBox="0 0 24 24"><path d="M9 4.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7zM2 20c0-3.6 3.1-6 7-6s7 2.4 7 6zM17 6.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM17.5 14c2.8.2 4.5 2 4.5 4.5V20h-4.2c0-2.3-.7-4.1-2.1-5.4z"/></svg><b data-n="16" data-from="0">0</b><span>Points de vente partenaires</span></div><div class="cn"><svg viewBox="0 0 24 24"><path d="M11 13C11 8 7 5 2 5c0 5 3 8 9 8zM13 11c0-4 3-7 9-7 0 5-3 8-9 8zM11 12h2v10h-2z"/></svg><b data-n="16" data-from="0">0</b><span>Produits</span></div><div class="cn"><svg viewBox="0 0 24 24"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8 5.8 21.1 7 14.2 2 9.3l6.9-1z"/></svg><b data-n="3" data-from="0">0</b><span>Salons internationaux</span></div><div class="cn"><svg viewBox="0 0 24 24"><path fill-rule="evenodd" d="M7 2h2v2h6V2h2v2h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3zM5 9v10h14V9z"/></svg><b data-n="2026" data-from="2015">2015</b><span>Année</span></div></div></div></div>

<div class="nval"><div class="wrap"><h2 class="nt">Ce qui nous anime</h2><div class="vg">
 <div class="vcard"><button class="va l" id="vprev" @click="go(-1)" aria-label="Précédent">‹</button><button class="va r" id="vnext" @click="go(1)" aria-label="Suivant">›</button>
  <div class="vsl"><p class="vnum">Nos valeurs</p><h3>La satisfaction client</h3><p>Répondre aux besoins de l’ensemble des clients, en étant une entreprise au service du bien-être et du développement.</p></div>
  <div class="vsl"><p class="vnum">Nos valeurs</p><h3>La passion du chocolat</h3><p>Produire du chocolat, c’est de la passion, de l’art et des process.</p></div>
  <div class="vsl"><p class="vnum">Nos valeurs</p><h3>La qualité</h3><p>Chez SOCTRACAO, la qualité est une évidence.</p></div>
  <span class="vc" id="vc">{{ vcText }}</span></div>
 <div class="vblob"><img :src="X.cabw" alt="Cabosses et fèves de cacao"></div>
</div></div></div>
<div class="nab wrap"><div class="ag">
 <div class="col"><div class="w"><img :src="X.team" alt="L’équipe SOCTRACAO"></div><div class="s"><img :src="X.wk" alt="Pépinière de cacaoyers"></div><div class="s"><img :src="X.cab" alt="Cabosses de cacao"></div></div>
 <div class="atx3"><h2 class="nt">Vision &amp; missions</h2>
  <p>Le sol camerounais est riche et fertile, mais les unités de transformation sont rares. C’est fort de ce constat que nous avons créé en 2015 la Société Commerciale et de Transformation du Cacao (SOCTRACAO SARL), entreprise de droit camerounais dont le siège est à Logpom, Bassong.</p>
  <p>Nous proposons des produits sans composants artificiels : beurre, fèves et poudre de cacao Goshen, chocolats Nya Mboa aux saveurs exotiques (piment, gingembre, Artémisia, arachides, sésame…) et Tartine Mboa, de 30 g à 10 kg. Nous contribuons aussi à l’autonomisation des femmes rurales par la formation.</p>
  <ul class="ml"><li><span class="gi"><svg viewBox="0 0 24 24"><path d="m5 12 5 5 9-10"/></svg></span><span><b>Produit :</b> pas de colorants, pas de conservateurs chimiques.</span></li><li><span class="gi"><svg viewBox="0 0 24 24"><path d="m5 12 5 5 9-10"/></svg></span><span><b>Personnel :</b> un cadre et des conditions de travail optimales.</span></li><li><span class="gi"><svg viewBox="0 0 24 24"><path d="m5 12 5 5 9-10"/></svg></span><span><b>Communauté :</b> respecter les normes et contribuer au développement local.</span></li></ul></div>
</div></div>
<div class="npt"><div class="wrap"><h2 class="nt">Ils nous font confiance</h2><p class="nsub">Retrouvez nos produits à Douala, Yaoundé, Garoua et partout où notre réseau de distribution grandit. Touchez une image pour l’agrandir.</p></div>
 <div class="pm" id="pm" @click="onPm"><div class="pmt"><img v-for="(p, i) in LOOP" :key="i" :alt="p.alt" :src="p.src"></div></div>
 <p class="sal">Salon du chocolat de Paris · Montréal · Chocoa Amsterdam</p></div>
<div class="nsv"><div class="wrap sg">
 <div><h2 class="nt">Nos services</h2>
  <ul class="sl2"><li><span class="gi"><svg viewBox="0 0 24 24"><path d="m5 12 5 5 9-10"/></svg></span><span><b>Produits semi-finis</b> : beurre, poudre et masse de cacao</span></li><li><span class="gi"><svg viewBox="0 0 24 24"><path d="m5 12 5 5 9-10"/></svg></span><span><b>Produits finis</b> : chocolats Nya Mboa, Tartine Mboa, Choco Mboa</span></li><li><span class="gi"><svg viewBox="0 0 24 24"><path d="m5 12 5 5 9-10"/></svg></span><span><b>Équipements Ndeh-Tech</b> : torréfacteur, presses, tamis, broyeurs…</span></li><li><span class="gi"><svg viewBox="0 0 24 24"><path d="m5 12 5 5 9-10"/></svg></span><span><b>Formations</b> : coopératives et associations de planteurs</span></li></ul>
  <div class="nbtns"><a data-go href="#contact" class="nb">Demander une formation</a><a data-go href="#boutique" class="nb o">Voir nos produits</a></div></div>
 <div class="svv"><img class="a" :src="IM[14]" alt="Poudre de cacao Goshen"><img class="b" :src="IM[1]" alt="Beurre de cacao Goshen"></div>
</div></div>
</section>
  </div>
</template>
