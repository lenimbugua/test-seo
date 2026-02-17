<script setup>
const bonusRanges = [
  { deposit: "49 - 99", bonus: "4" },
  { deposit: "100 - 199", bonus: "9" },
  { deposit: "200 - 299", bonus: "13" },
  { deposit: "300 - 399", bonus: "18" },
  { deposit: "400 - 499", bonus: "22" },
  { deposit: "500 - 999", bonus: "30" },
  { deposit: "1000 - 1999", bonus: "40" },
  { deposit: "2000+", bonus: "50" },
];
</script>
<template>
  <!-- Bonus table -->
  <section>
    <div class="overflow-x-auto rounded-lg shadow-lg dark:text-slate-400">
      <table class="w-full bg-white dark:bg-white/5">
        <thead>
          <tr class="dark:bg-white/10 bg-gray-50">
            <th class="px-6 py-4 text-left">Deposit Range (KES)</th>
            <th class="px-6 py-4 text-left">Bonus Awarded</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 divide-white/10">
          <tr
            v-for="(range, index) in bonusRanges"
            :key="index"
            class="dark:hover:bg-white/5 hover:bg-gray-50"
          >
            <td class="px-6 py-4">KES {{ range.deposit }}</td>
            <td class="px-6 py-4">KES {{ range.bonus }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
