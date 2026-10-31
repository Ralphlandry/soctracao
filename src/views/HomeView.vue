<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, computed } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { lenis, easeOut4 } from '@/lenis'
import { $, $$ } from '@/utils/dom'
import { RM } from '@/utils/env'
import ImageSlider from '@/components/ImageSlider.vue'
import { TREND } from '@/data/trend'
import { P, f } from '@/data/products'

const root = ref(null)
// Les cartes « Tendance maintenant » sont répétées pour une boucle continue
const LOOP1 = [...TREND, ...TREND]
const LOOP2 = [...TREND].reverse().concat([...TREND].reverse())
const priceFor = id => {
  const product = P.find(p => p[0] === id)
  return product ? f(product[3] || product[2]) : 'Tarif non communiqué'
}
let ctx = null
let tilt = null

const rv = r => $$("#" + r + " .rv").forEach(x => gsap.from(x, { yPercent: 110, rotation: 3, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: x, start: "top 90%" } }))

// Animations de la page d’accueil (GSAP + ScrollTrigger)
function build() {
rv("v-accueil");{const r1=$("#r1 .mtrack"),r2=$("#r2 .mtrack");
 const t1=gsap.fromTo(r1,{xPercent:0},{xPercent:-50,duration:55,ease:"none",repeat:-1}),t2=gsap.fromTo(r2,{xPercent:-50},{xPercent:0,duration:65,ease:"none",repeat:-1}),tws=[t1,t2],rows=$$(".mrow");
 ScrollTrigger.create({trigger:"#trend",start:"top bottom",end:"bottom top",onUpdate:s=>{const v=s.getVelocity();
  tws.forEach(t=>{t.timeScale(Math.min(1+Math.abs(v)/300,7));gsap.to(t,{timeScale:1,duration:1.6,ease:"power3.out",overwrite:true})});
  gsap.to(rows,{skewX:gsap.utils.clamp(-9,9,v/-140),duration:.5,ease:"power3.out",overwrite:true,onComplete:()=>gsap.to(rows,{skewX:0,duration:1.4,ease:"expo.out"})})}});
 rows.forEach((r,i)=>{r.onmouseenter=()=>gsap.to(tws[i],{timeScale:0,duration:.7,ease:"power3.out",overwrite:true});r.onmouseleave=()=>gsap.to(tws[i],{timeScale:1,duration:1.2,ease:"power3.out",overwrite:true})});
 gsap.from(rows,{y:110,rotationX:-28,opacity:0,transformPerspective:1000,transformOrigin:"top center",stagger:.2,duration:1.7,ease:"expo.out",scrollTrigger:{trigger:"#trend",start:"top 70%"}});
 gsap.from(".thd .tsub,.thd .eyebrow",{y:40,opacity:0,stagger:.15,duration:1.3,ease:"expo.out",scrollTrigger:{trigger:".thd",start:"top 85%"}});
 gsap.fromTo(".twm",{xPercent:5},{xPercent:-40,ease:"none",scrollTrigger:{trigger:"#trend",start:"top bottom",end:"bottom top",scrub:1}})}
  const h=$("#h1");h.innerHTML=h.textContent.split("").map(c=>`<span>${c}</span>`).join("");
  gsap.set("#h1 span",{transformOrigin:"50% 100%"});
  gsap.timeline({defaults:{ease:"expo.out"}}).from("#h1 span",{yPercent:120,rotationX:-90,opacity:0,duration:1.6,stagger:.06}).from(".heroT p,.cta",{y:40,opacity:0,duration:1.2,stagger:.15},"-=1").from(".layer",{z:-600,opacity:0,duration:2,stagger:.1,ease:"power4.out"},0);
  const hs=gsap.timeline({scrollTrigger:{trigger:"#accueil",start:"top top",end:"bottom top",scrub:1}});
  $$(".layer").forEach(l=>hs.to(l,{y:-140*l.dataset.d,z:90*l.dataset.d,rotation:l.dataset.d*6,ease:"none"},0));
  hs.to("#heroT",{y:-160,scale:1.25,opacity:0,ease:"power2.in"},0).to("#hint",{opacity:0,y:30},0);
  tilt={rx:gsap.quickTo("#stage","rotationX",{duration:1.2,ease:"power4.out"}),ry:gsap.quickTo("#stage","rotationY",{duration:1.2,ease:"power4.out"})};
  gsap.from("#slider .sstage",{y:100,opacity:0,duration:1.6,ease:"expo.out",scrollTrigger:{trigger:"#slider",start:"top 80%"}});
  const steps=$$(".vstep"),imgs=$$(".vimg"),vt=gsap.timeline({scrollTrigger:{trigger:"#voyage",start:"top top",end:"+=450%",pin:true,scrub:1}});
  steps.forEach((s,i)=>{const L=i==steps.length-1;
    if(i){vt.fromTo(imgs[i],{opacity:0,rotationY:-90,x:-160,scale:.8},{opacity:1,rotationY:0,x:0,scale:1,ease:"power4.out",duration:.8},i*2);
      vt.fromTo(s,{opacity:0,y:60,rotationX:-40},{opacity:1,y:0,rotationX:0,ease:"power4.out",duration:.7},i*2)}
    else gsap.set([imgs[0],s],{opacity:1});
    if(!L){vt.to(imgs[i],{opacity:0,rotationY:90,x:160,scale:.8,ease:"power4.in",duration:.8},i*2+1.2);
      vt.to(s,{opacity:0,y:-60,rotationX:40,ease:"power4.in",duration:.7},i*2+1.3)}});
  $$(".card").forEach((c,i)=>gsap.fromTo(c,{z:-500,rotationY:i%2?30:-30,rotationX:20,opacity:0},{z:0,rotationY:0,rotationX:0,opacity:1,ease:"power4.out",scrollTrigger:{trigger:"#cards",start:"top 90%",end:"top 30%",scrub:1}}));
}

const onMove = e => {
  if (tilt) { tilt.ry((e.clientX / innerWidth - 0.5) * 10); tilt.rx(-(e.clientY / innerHeight - 0.5) * 10) }
}

onMounted(() => {
  ctx = gsap.context(() => { if (!RM) build() }, root.value)
  addEventListener('mousemove', onMove)
  // Cartes de services qui se retournent
$$(".card").forEach(c=>{const f=c.querySelector(".fl");let on=0;const set=v=>{on=v;gsap.to(f,{rotationY:v?180:0,duration:1.2,ease:"expo.out",overwrite:true})};
if(matchMedia("(hover:hover)").matches){c.onmouseenter=()=>set(1);c.onmouseleave=()=>set(0)}else c.onclick=e=>{if(!e.target.closest("a"))set(on?0:1)};
c.onfocus=()=>set(1);c.onblur=()=>set(0)});
})
onBeforeUnmount(() => {
  ctx && ctx.revert()
  removeEventListener('mousemove', onMove)
})
</script>

<template>
  <div class="view" id="v-accueil" ref="root" style="display:block">
<header id="accueil">
  <div class="stage" id="stage">
    <svg class="layer leafL" data-d="0.5" viewBox="0 0 200 200"><path d="M10 190C10 80 80 10 190 10 190 120 120 190 10 190Z" fill="#2f6b2f"/><path d="M10 190L170 30" stroke="#f4e9d8" stroke-width="5" fill="none"/></svg>
    <svg class="layer leafR" data-d="0.5" viewBox="0 0 200 200" style="transform:scaleX(-1)"><path d="M10 190C10 80 80 10 190 10 190 120 120 190 10 190Z" fill="#3f8a3f"/><path d="M10 190L170 30" stroke="#f4e9d8" stroke-width="5" fill="none"/></svg>
    <svg class="layer pod" data-d="1" viewBox="0 0 200 260"><ellipse cx="100" cy="130" rx="78" ry="118" fill="#8a4a28"/><ellipse cx="100" cy="130" rx="56" ry="98" fill="#d9a441" opacity=".25"/><g fill="#c98a56"><ellipse cx="100" cy="60" rx="26" ry="13"/><ellipse cx="100" cy="96" rx="34" ry="13"/><ellipse cx="100" cy="132" rx="36" ry="13"/><ellipse cx="100" cy="168" rx="34" ry="13"/><ellipse cx="100" cy="204" rx="26" ry="13"/></g></svg>
    <div class="layer bean" data-d="2" style="left:14%;top:22%"></div><div class="layer bean" data-d="2.4" style="left:80%;top:18%;transform:scale(1.5)"></div>
    <div class="layer bean" data-d="1.6" style="left:70%;top:68%"></div><div class="layer bean" data-d="2.8" style="left:22%;top:72%;transform:scale(1.8)"></div>
    <div class="layer bean" data-d="1.2" style="left:48%;top:12%;transform:scale(.7)"></div>
  </div>
  <div class="heroT" id="heroT">
    <h1 id="h1">SOCTRACAO</h1>
    <p>Société Commerciale et de Transformation de Cacao — du cacao cultivé, transformé et savouré au Cameroun.</p>
    <a href="#boutique" data-go class="cta">Découvrir nos chocolats Nya Mboa</a>
  </div>
  <div class="scrollhint" id="hint">SCROLL ↓</div>
</header>

<ImageSlider />


<section id="voyage">
  <div class="wrap vgrid">
    <div class="vimgs" id="vimgs"><img class="vimg" alt="Chocolat au lait 55 % au sésame" src="@/assets/img/chocolats/01.webp"><img class="vimg" alt="Chocolat au lait 55 % aux éclats d’arachides" src="@/assets/img/chocolats/02.webp"><img class="vimg" alt="Chocolat noir 70 % au gingembre" src="@/assets/img/chocolats/03.webp"><img class="vimg" alt="Chocolat noir 80 % aux dattes" src="@/assets/img/chocolats/04.webp"><img class="vimg" alt="Choco Mboa — lait 40 % pur cacao" src="@/assets/img/chocolats/05.webp"></div>
    <div>
      <p class="eyebrow">NOS CHOCOLATS NYA MBOA</p>
      <div class="vsteps"><div class="vstep"><em>01</em><h3>Chocolat au lait 55 % au sésame</h3><p>Le lait et le sésame grillé, sous le label Nya Mboa.</p><strong class="vprice">{{ priceFor(3) }}</strong></div><div class="vstep"><em>02</em><h3>Chocolat au lait 55 % aux éclats d’arachides</h3><p>Le croquant des arachides dans un chocolat au lait généreux.</p><strong class="vprice">{{ priceFor(5) }}</strong></div><div class="vstep"><em>03</em><h3>Chocolat noir 70 % au gingembre</h3><p>Un noir intense relevé par la fraîcheur piquante du gingembre.</p><strong class="vprice">{{ priceFor(10) }}</strong></div><div class="vstep"><em>04</em><h3>Chocolat noir 80 % aux dattes</h3><p>Un noir profond adouci par la douceur des dattes.</p><strong class="vprice">{{ priceFor(8) }}</strong></div><div class="vstep"><em>05</em><h3>Choco Mboa — lait 40 % pur cacao</h3><p>La nouveauté : un chocolat au lait 40 % de pur cacao.</p><strong class="vprice">{{ priceFor(2) }}</strong></div></div>
    </div>
  </div>
</section>


<section id="gamme"><div class="wrap">
  <p class="eyebrow">Nos services</p>
  <h2><span class="ov"><span class="rv">Quatre univers,</span></span><span class="ov"><span class="rv">une seule passion.</span></span></h2>
  <div class="cards" id="cards"><article class="card" tabindex="0"><div class="fl">
<div class="face front"><span class="num">01</span><div class="ic"><svg viewBox="0 0 24 24"><path d="M12 2 3 7v10l9 5 9-5V7z"/><path d="m3 7 9 5 9-5M12 12v10"/></svg></div><h3>Produits alimentaires semi-finis</h3><small>Survolez pour découvrir ↻</small></div>
<div class="face back"><span class="num">01</span><h3>Produits alimentaires semi-finis</h3><p>Beurre de cacao, poudre de cacao et masse de cacao : la base noble des chocolatiers, pâtissiers et artisans.</p><a href="#boutique" data-go>Voir nos produits →</a></div></div></article><article class="card" tabindex="0"><div class="fl">
<div class="face front"><span class="num">02</span><div class="ic"><svg viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2.5"/><path d="M5 8.7h14M5 15.3h14M12 2v20"/></svg></div><h3>Produits alimentaires finis</h3><small>Survolez pour découvrir ↻</small></div>
<div class="face back"><span class="num">02</span><h3>Produits alimentaires finis</h3><p>Chocolat à croquer Nya Mboa, pâte à tartiner Tartine Mboa, poudre de cacao lactée Choco Mboa et poudre de cacao au gingembre Choco Mboa.</p><a href="#boutique" data-go>Voir nos produits →</a></div></div></article><article class="card" tabindex="0"><div class="fl">
<div class="face front"><span class="num">03</span><div class="ic"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="7"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"/></svg></div><h3>Équipements</h3><small>Survolez pour découvrir ↻</small></div>
<div class="face back"><span class="num">03</span><h3>Équipements</h3><p>Made Cocoa Processing Equipment : torréfacteur, presse à vis et hydraulique, tamis automatique, four à résistance, broyeurs à meule et à marteau… avec installation et maintenance.</p><a href="#apropos" data-go>Découvrir les équipements →</a></div></div></article><article class="card" tabindex="0"><div class="fl">
<div class="face front"><span class="num">04</span><div class="ic"><svg viewBox="0 0 24 24"><path d="M22 10 12 5 2 10l10 5z"/><path d="M6 12v5c3 2.5 9 2.5 12 0v-5M22 10v6"/></svg></div><h3>Formations</h3><small>Survolez pour découvrir ↻</small></div>
<div class="face back"><span class="num">04</span><h3>Formations</h3><p>Formation et encadrement des coopératives et associations de planteurs aux techniques de production du cacao, et fabrication locale de machines semi-industrielles de transformation.</p><a href="#contact" data-go>Nous contacter →</a></div></div></article></div>
</div></section>

<section class="trend" id="trend">
 <div class="twm" aria-hidden="true">CACAO ✦ CHOCOLAT ✦ CACAO ✦ CHOCOLAT ✦ CACAO</div>
 <div class="wrap thd"><p class="eyebrow"><i class="dot"></i> En ce moment</p>
  <h2><span class="ov"><span class="rv">Tendance</span></span><span class="ov"><span class="rv"><i>maintenant</i></span></span></h2>
  <p class="tsub">Les articles les plus lus sur le cacao et le chocolat au Cameroun.</p></div>
 <div class="mrow" id="r1"><div class="mtrack"><a v-for="(a, i) in LOOP1" :key="i" class="mc" :href="a.href" target="_blank" rel="noopener"><span class="mn">{{ a.n }}</span><span class="mi"><img alt="" :src="a.img"></span><span class="mt">{{ a.t }}</span><span class="ma">↗</span></a></div></div>
 <div class="mrow" id="r2"><div class="mtrack"><a v-for="(a, i) in LOOP2" :key="i" class="mc" :href="a.href" target="_blank" rel="noopener"><span class="mn">{{ a.n }}</span><span class="mi"><img alt="" :src="a.img"></span><span class="mt">{{ a.t }}</span><span class="ma">↗</span></a></div></div>
</section>
  </div>
</template>
