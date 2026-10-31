import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Défilement fluide, synchronisé avec ScrollTrigger
export const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 })
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add(t => lenis.raf(t * 1000))
gsap.ticker.lagSmoothing(0)

export const easeOut4 = t => 1 - Math.pow(1 - t, 4)
