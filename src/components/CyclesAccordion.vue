<script setup>
import { ref, computed, onBeforeUpdate, nextTick } from 'vue'
import CycleTable from './CycleTable.vue'
import { PERIODS, buildSchedule, startRef, monthsShort } from '../utils/schedule.js'

const props = defineProps({
  anchorMode: { type: String, default: 'rolling' }
})

const today = new Date()
const refDate = computed(() => startRef(props.anchorMode, today))

// 👇 Texto dinámico según la opción seleccionada
const summaryText = computed(() => {
  const m = monthsShort[refDate.value.getMonth()]
  const y = refDate.value.getFullYear()
  return props.anchorMode === 'rolling'
    ? `Próximos 12 meses · desde ${m} ${y}`
    : `Año calendario · ${y}`
})

const schedules = computed(() =>
  PERIODS.map(p => ({
    id: p.id,
    rows: buildSchedule(p, refDate.value, 12, today)
  }))
)

const detailsRefs = ref([])
onBeforeUpdate(() => { detailsRefs.value = [] })

function openAll(){ detailsRefs.value.forEach(el => el && (el.open = true)) }
function closeAll(){ detailsRefs.value.forEach(el => el && (el.open = false)) }

function onToggle(e){
  if (!e.target.open) return
  nextTick(() => {
    const row = e.target.querySelector('tr.is-highlight')
    row?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  })
}
</script>

<template>
  <div class="accordion">
    <div class="toolbar" style="margin-bottom:8px">
      <button class="outline" @click="openAll">Abrir todas</button>
      <button class="outline" @click="closeAll">Cerrar todas</button>
    </div>

    <details
      v-for="(sec, i) in schedules"
      :key="sec.id"
      :ref="el => (detailsRefs[i] = el)"
      @toggle="onToggle"
    >
      <summary>
        <div class="left">
          <span class="badge">Periodo {{ sec.id }}</span>
          <small style="color:var(--muted)">{{ summaryText }}</small>
        </div>
        <span class="chev">⌃</span>
      </summary>
     <div class="center-table">
  <CycleTable :rows="sec.rows" />
</div>
    </details>
  </div>
</template>
