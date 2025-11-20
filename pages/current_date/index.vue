<script setup>
import { ref, onMounted } from 'vue'

const todayString = ref('')
const nowString = ref('')

onMounted(() => {
  const today = new Date()
  nowString.value = today.toString() // 表示用
  today.setHours(0, 0, 0, 0)
  todayString.value = today.toString() // 表示用
})
</script>

<template>
  <div style="padding: 20px;">
    <h2>現在の時刻</h2>
    <p>NOW: {{ nowString }}</p>
    <p>0時設定後：{{ todayString }}</p>
  </div>
</template>
