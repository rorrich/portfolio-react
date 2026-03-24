import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

/** Регистрация один раз на приложение (вместо дублирования на страницах). */
gsap.registerPlugin(ScrollTrigger, useGSAP)
