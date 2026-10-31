import gsap from 'gsap'
import { lenis } from '@/lenis'
import { $ } from '@/utils/dom'

export function openLightbox(src, alt) {
  $('#lbi').src = src
  $('#lbc').textContent = alt
  gsap.set('#lb', { visibility: 'visible' })
  gsap.fromTo('#lb', { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' })
  gsap.fromTo('#lbi', { scale: 0.8, y: 40 }, { scale: 1, y: 0, duration: 1, ease: 'expo.out' })
  lenis.stop()
}

export function closeLightbox() {
  gsap.to('#lb', {
    opacity: 0, duration: 0.35, ease: 'power2.in',
    onComplete: () => { gsap.set('#lb', { visibility: 'hidden' }); lenis.start() }
  })
}
