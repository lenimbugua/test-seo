<script setup>
const props = defineProps({
  date: {
    type: String,
    required: true,
  },
});
function parseDate() {
  // Expected format: DD/MM/YY HH:mm
  const [datePart, time] = props.date.split(" ");
  const [day, month] = datePart.split("/");

  // Convert month number → short month name
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthName = months[parseInt(month, 10) - 1];

  return {
    day: day,
    month: monthName,
    time: time,
  };
}

const result = parseDate();
</script>
<template>
  <div class="border dark:border-white/10 rounded-md p-2 w-12 fle flex-col items-center justify-center">
    <div class="text-md">{{ result.day }}</div>
    <div class="text-xs">{{ result.month }}</div>
    <div class="text-xs">{{ result.time }}</div>
  </div>
</template>
