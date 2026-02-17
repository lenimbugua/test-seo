<script setup>
import { storeToRefs } from "pinia";
import { useAffiliateStore } from "../../stores/affiliate";
const { earnings } = storeToRefs(useAffiliateStore());
</script>
<template>
  <div class="w-full border dark:border-black/50 rounded-md overflow-clip">
    <table class="w-full">
      <thead class="bg-gray-200 dark:bg-white/10 text-gray-800 dark:text-slate-300">
        <tr
          class="divide-x text-xs py-2 dark:divide-black/50 border-b dark:border-black/50"
        >
          <th>Week</th>
          <th>Players</th>
          <th>Revenue</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody class="text-sm dark:text-gray-50 text-center">
        <tr
          v-for="payment in earnings?.payments"
          :key="payment.week"
          class="divide-x py-2 dark:divide-black/50 border-b dark:border-black/50 last:border-0"
        >
          <td>{{ payment.week }}</td>
          <td>{{ payment.players }}</td>
          <td>{{ payment.revenue }}</td>
          <td class="">{{ payment.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
