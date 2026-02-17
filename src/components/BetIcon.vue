<script setup>
import { CheckIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { useBetsStatus } from "../composables/useBetsStatus";

const { pending, pendingPayout, won, cashedOut, lost, voided, cancelled } =
  useBetsStatus();

const props = defineProps({
  status: {
    type: Number,
    required: true,
  },
});

function showIcon(status) {
  return status === props.status;
}
</script>
<template>
  <div v-if="showIcon(lost)" class="text-red-500">
    <XMarkIcon class="w-6" />
  </div>
  <div v-if="showIcon(won)" class="text-[#56CB05]">
    <CheckIcon class="w-6" />
  </div>
  <div v-if="showIcon(cashedOut)" class="text-teal-500">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      viewBox="0 0 24 24"
    >
      <!-- Icon from Material Design Icons by Pictogrammers - https://github.com/Templarian/MaterialDesign/blob/master/LICENSE -->
      <path
        fill="currentColor"
        d="M12.3 8.93L9.88 6.5h5.62V10H17V5H9.88l2.42-2.43l-1.06-1.07L7 5.75L11.24 10zM12 14a3 3 0 1 0 3 3a3 3 0 0 0-3-3m-9-3v12h18V11m-2 8a2 2 0 0 0-2 2H7a2 2 0 0 0-2-2v-4a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2Z"
      />
    </svg>
    <!-- <ArrowUturnLeftIcon class="w-6" /> -->
  </div>
  <div v-if="showIcon(pending)" class="text-slate-500 dark:text-slate-400">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5 fill-current"
      viewBox="0 0 24 24"
    >
      <path
        d="M13 12.175V9q0-.425-.288-.712T12 8t-.712.288T11 9v3.575q0 .2.075.388t.225.337l2.525 2.525q.3.3.713.3t.712-.3q.275-.3.275-.712t-.275-.688zM12 6q.425 0 .713-.288T13 5t-.288-.712T12 4t-.712.288T11 5t.288.713T12 6m6 6q0 .425.288.713T19 13t.713-.288T20 12t-.288-.712T19 11t-.712.288T18 12m-6 6q-.425 0-.712.288T11 19t.288.713T12 20t.713-.288T13 19t-.288-.712T12 18m-6-6q0-.425-.288-.712T5 11t-.712.288T4 12t.288.713T5 13t.713-.288T6 12m6 10q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
      ></path>
    </svg>
  </div>
  <div v-if="showIcon(voided)" class="text-slate-600 dark:text-slate-400">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="fill-curent h-5 w-5"
      viewBox="0 0 24 24"
    >
      <path
        d="M15.818 12a3.82 3.82 0 0 1-3.82 3.82A3.82 3.82 0 0 1 8.178 12a3.82 3.82 0 0 1 3.82-3.82a3.82 3.82 0 0 1 3.82 3.82m3.179 9.73l-2.726-2.725A8.2 8.2 0 0 1 12 20.212A8.21 8.21 0 0 1 3.788 12a8.2 8.2 0 0 1 1.209-4.269l-2.73-2.73A12 12 0 0 0 0 12c0 6.627 5.373 12 12 12a12 12 0 0 0 6.997-2.27M12 0a12 12 0 0 0-6.997 2.27L7.73 4.994A8.2 8.2 0 0 1 12 3.788A8.21 8.21 0 0 1 20.212 12a8.2 8.2 0 0 1-1.209 4.269l2.73 2.73A12 12 0 0 0 24 12c0-6.627-5.373-12-12-12"
      ></path>
    </svg>
  </div>
  <div v-if="showIcon(cancelled)" class="text-slate-600 dark:text-slate-400">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5 fill-current"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M30 24a6 6 0 1 0-6 6a6.007 6.007 0 0 0 6-6m-2 0a3.95 3.95 0 0 1-.567 2.019l-5.452-5.452A3.95 3.95 0 0 1 24 20a4.005 4.005 0 0 1 4 4m-8 0a3.95 3.95 0 0 1 .567-2.019l5.452 5.452A3.95 3.95 0 0 1 24 28a4.005 4.005 0 0 1-4-4M8 16h10v2H8zm0-6h12v2H8z"
      />
      <path
        fill="currentColor"
        d="m14 27.733l-5.234-2.79A8.99 8.99 0 0 1 4 17V4h20v11h2V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v13a10.98 10.98 0 0 0 5.824 9.707L14 30Z"
      />
    </svg>
  </div>
  <div
    v-if="showIcon(pendingPayout)"
    class="text-slate-600 dark:text-yellow-500"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5 fill-current"
      viewBox="0 0 24 24"
    >
      <path
        d="M6.5 12a5.5 5.5 0 1 1 0 11a5.5 5.5 0 0 1 0-11zm0 7.88a.625.625 0 1 0 0 1.249a.625.625 0 0 0 0-1.249zM17.75 3A3.25 3.25 0 0 1 21 6.25v11.5A3.25 3.25 0 0 1 17.75 21l-5.773.001a6.47 6.47 0 0 0 .71-1.5l5.063-.001a1.75 1.75 0 0 0 1.75-1.75V6.25a1.75 1.75 0 0 0-1.75-1.75H6.25A1.75 1.75 0 0 0 4.5 6.25v5.064a6.47 6.47 0 0 0-1.501.709L3 6.25A3.25 3.25 0 0 1 6.25 3h11.5zM6.5 14.003c-1.048 0-1.864.817-1.853 1.954a.5.5 0 1 0 1-.01c-.006-.578.36-.944.853-.944c.472 0 .853.392.853.95c0 .224-.075.39-.317.677l-.1.113l-.265.29c-.484.542-.671.892-.671 1.468a.5.5 0 1 0 1 0c0-.233.076-.403.324-.695l.1-.115l.266-.29c.478-.535.663-.882.663-1.448c0-1.104-.822-1.95-1.853-1.95zM11.75 6a.75.75 0 0 1 .743.648l.007.102V12h3.748a.75.75 0 0 1 .102 1.493l-.102.007H11.75a.75.75 0 0 1-.743-.648L11 12.75v-6a.75.75 0 0 1 .75-.75z"
        fill="currentColor"
        fill-rule="nonzero"
      />
    </svg>
  </div>
</template>
