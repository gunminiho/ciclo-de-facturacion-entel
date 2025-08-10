<script setup>
import { fmtDM } from '../utils/schedule.js'
const props = defineProps({ rows: { type: Array, required: true } })
</script>

<template>
  <div class="table-wrap">
    <table aria-label="Ciclo de facturación">
      <thead>
        <tr>
          <th>Inicio</th>
          <th>Fin</th>
          <th>Emisión</th>
          <th>F. Pago</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(r, i) in rows"
          :key="i"
          :class="{ 'is-highlight': r.status === 'vigente' }"
          :title="r.status === 'vigente'
                    ? 'Ciclo vigente'
                    : (r.status === 'proximo'
                        ? `Inicia ${fmtDM(r.inicio)} (en ${r.daysUntilInicio} día${r.daysUntilInicio===1?'':'s'})`
                        : '')"
        >
          <td :data-label="'Inicio'">
            {{ fmtDM(r.inicio) }}
            <span
              v-if="r.status === 'vigente'"
              class="flag flag-cycle"
              data-tip="Hoy está dentro de este ciclo"
            >
              Vigente
            </span>

            <span
              v-else-if="r.status === 'proximo'"
              class="flag flag-next"
              :data-tip="`Inicia ${fmtDM(r.inicio)} (en ${r.daysUntilInicio} día${r.daysUntilInicio===1?'':'s'})`"
            >
              Próximo · en {{ r.daysUntilInicio }} días
            </span>
          </td>

          <td :data-label="'Fin'">{{ fmtDM(r.fin) }}</td>
          <td :data-label="'Emisión'">{{ fmtDM(r.emision) }}</td>
          <td :data-label="'F. Pago'">{{ fmtDM(r.vencimiento) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
