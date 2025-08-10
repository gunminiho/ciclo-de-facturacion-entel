<script setup>
import { ref, computed, onMounted } from 'vue'
import CyclesAccordion from './components/CyclesAccordion.vue'
import { monthsShort } from './utils/schedule.js'

const anchorMode = ref('year') // 'rolling' | 'year'

/* Tema claro/oscuro con preferencia del usuario */
const theme = ref('auto') // 'light' | 'dark' | 'auto'
function applyTheme(){
  const root = document.documentElement
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const resolved = theme.value === 'auto' ? (prefersDark ? 'dark' : 'light') : theme.value
  root.setAttribute('data-theme', resolved === 'dark' ? 'dark' : 'light')
  localStorage.setItem('theme', theme.value)
}
onMounted(() => {
  theme.value = localStorage.getItem('theme') || 'auto'
  applyTheme()
})

const today = new Date()
const niceToday = computed(() => `${today.getDate()} ${monthsShort[today.getMonth()]} ${today.getFullYear()}`)
</script>

<template>
  <div class="container">
    <header class="header">
      <div class="title">
        <h1>Ciclos de facturación - Entel Chile</h1>
        <p>Hoy: <strong>{{ niceToday }}</strong></p>
      </div>

      <div class="toolbar">
        <label>
          <select v-model="anchorMode" aria-label="Rango">
            <option value="rolling">Próximos 12 meses</option>
            <option value="year">Año calendario</option>
          </select>
        </label>

        <label>
          <select v-model="theme" @change="applyTheme" aria-label="Tema">
            <option value="auto">Tema: Automático</option>
            <option value="light">Tema: Claro</option>
            <option value="dark">Tema: Oscuro</option>
          </select>
        </label>
      </div>
    </header>

<CyclesAccordion :anchor-mode="anchorMode" :key="`cycles-${anchorMode}`" />
  </div>
</template>
