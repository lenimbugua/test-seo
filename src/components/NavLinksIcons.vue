<script setup>
import { SparklesIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  iconCss: {
    type: String,
    required: true,
  },
});

function showIcon(name) {
  return name === props.icon;
}
</script>
<template>
  <!-- sports -->
  <div v-if="showIcon('sport')" class="flex items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :class="iconCss"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M11 19q-2.5 0-4.25-1.75T5 13q0-.275.025-.55t.075-.55q-.125.05-.3.075T4.5 12q-1.05 0-1.775-.725T2 9.5t.688-1.775T4.425 7q.825 0 1.488.462T6.85 8.65q.825-.75 1.888-1.2T11 7h10q.425 0 .713.288T22 8v2q0 .425-.288.713T21 11h-4v2q0 2.5-1.75 4.25T11 19m-6.5-8.5q.425 0 .713-.288T5.5 9.5t-.288-.712T4.5 8.5t-.712.288T3.5 9.5t.288.713t.712.287M11 15q.825 0 1.413-.587T13 13t-.587-1.412T11 11t-1.412.588T9 13t.588 1.413T11 15"
      ></path>
    </svg>
  </div>
  <div v-if="showIcon('live')" class="flex items-center mr-2">
    <span :class="iconCss" class="relative flex justify-center items-center"
      ><span
        class="animate-ping bg-red-600 absolute inline-flex h-3 w-3 rounded-full"
      ></span
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        class="text-red-600"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M6.343 4.938a1 1 0 0 1 0 1.415a8.003 8.003 0 0 0 0 11.317a1 1 0 1 1-1.414 1.414c-3.907-3.906-3.907-10.24 0-14.146a1 1 0 0 1 1.414 0m12.732 0c3.906 3.907 3.906 10.24 0 14.146a1 1 0 0 1-1.415-1.414a8.003 8.003 0 0 0 0-11.317a1 1 0 0 1 1.415-1.415M9.31 7.812a1 1 0 0 1 0 1.414a3.92 3.92 0 0 0 0 5.544a1 1 0 1 1-1.415 1.414a5.92 5.92 0 0 1 0-8.372a1 1 0 0 1 1.415 0m6.958 0a5.92 5.92 0 0 1 0 8.372a1 1 0 0 1-1.414-1.414a3.92 3.92 0 0 0 0-5.544a1 1 0 0 1 1.414-1.414m-4.186 2.77a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3"
        /></svg
    ></span>
  </div>
  <div v-if="showIcon('crash')" class="flex items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
      :class="iconCss"
      class=""
    >
      <path
        fill="currentColor"
        fill-rule="evenodd"
        d="M11.3 1.046A1 1 0 0 1 12 2v5h4a1 1 0 0 1 .82 1.574l-7 10A1 1 0 0 1 8 18v-5H4a1 1 0 0 1-.82-1.573l7-10a1 1 0 0 1 1.12-.38"
        clip-rule="evenodd"
      ></path>
    </svg>
  </div>
  <div v-if="showIcon('flag')" class="flex items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :class="iconCss"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M11 6H9V4h2zm4-2h-2v2h2zM9 14h2v-2H9zm10-4V8h-2v2zm0 4v-2h-2v2zm-6 0h2v-2h-2zm6-10h-2v2h2zm-6 4V6h-2v2zm-6 2V8h2V6H7V4H5v16h2v-8h2v-2zm8 2h2v-2h-2zm-4-2v2h2v-2zM9 8v2h2V8zm4 2h2V8h-2zm2-4v2h2V6z"
      ></path>
    </svg>
  </div>
  <div v-if="showIcon('aviator')" class="flex items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :class="iconCss"
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M2 22h20M6.36 17.4L4 17l-2-4l1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12L5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2l4.19-2.06a2.4 2.4 0 0 1 1.73-.17L21 7a1.4 1.4 0 0 1 .87 1.99l-.38.76c-.23.46-.6.84-1.07 1.08L7.58 17.2a2 2 0 0 1-1.22.18Z"
      ></path>
    </svg>
  </div>
  <div v-if="showIcon('virtual')" class="flex items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :class="iconCss"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2m0 18a8 8 0 1 1 8-8a8 8 0 0 1-8 8"
      ></path>
      <circle cx="11.999" cy="7.493" r="1.493" fill="currentColor"></circle>
      <circle cx="11.999" cy="16.493" r="1.493" fill="currentColor"></circle>
      <circle cx="16.496" cy="12" r="1.493" fill="currentColor"></circle>
      <circle cx="7.496" cy="12" r="1.493" fill="currentColor"></circle>
      <circle cx="11.999" cy="12" r="1" fill="currentColor"></circle>
    </svg>
  </div>
  <div v-if="showIcon('casino')" class="flex items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :class="iconCss"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M12 15.916a2 2 0 0 0-2.8-1.295A3.9 3.9 0 0 1 7.5 15C5.383 15 4 13.482 4 12c0-1.06.515-2.115 1.613-3.29c1.133-1.212 2.655-2.311 4.285-3.486c.693-.5 1.421-1.024 2.102-1.567c.68.543 1.409 1.067 2.102 1.567c1.63 1.175 3.152 2.274 4.285 3.486C19.485 9.885 20 10.94 20 12c0 1.482-1.383 3-3.5 3a3.9 3.9 0 0 1-1.7-.379a2 2 0 0 0-2.8 1.295M12 1c-.871.871-2.08 1.742-3.356 2.662C5.524 5.911 2 8.452 2 12c0 2.761 2.462 5 5.5 5c.927 0 1.8-.208 2.566-.576a9.6 9.6 0 0 1-.536 2.317c-.22.604-.491 1.188-.802 1.813A.997.997 0 0 0 9.618 22h4.764c.743 0 1.22-.78.89-1.446a18 18 0 0 1-.802-1.813a9.6 9.6 0 0 1-.536-2.317A5.9 5.9 0 0 0 16.5 17c3.038 0 5.5-2.239 5.5-5c0-3.548-3.525-6.09-6.644-8.338C14.08 2.742 12.871 1.872 12 1m0 16.074c.158 1.11.451 2.047.815 2.926h-1.63c.364-.879.657-1.816.815-2.926"
      />
    </svg>
  </div>
  <div v-if="showIcon('promotion')" class="flex items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :class="iconCss"
      viewBox="0 0 24 24"
    >
      <g
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        color="currentColor"
      >
        <path
          d="M14.926 2.911L8.274 6.105a2.43 2.43 0 0 1-1.617.182a8 8 0 0 0-.695-.14C4.137 5.94 3 7.384 3 9.045v.912c0 1.66 1.137 3.105 2.962 2.896a7 7 0 0 0 .695-.139a2.43 2.43 0 0 1 1.617.183l6.652 3.193c1.527.733 2.291 1.1 3.142.814c.852-.286 1.144-.899 1.728-2.125a12.17 12.17 0 0 0 0-10.556c-.584-1.226-.876-1.84-1.728-2.125c-.851-.286-1.615.08-3.142.814"
        ></path>
        <path
          d="M11.458 20.77L9.967 22c-3.362-2.666-2.951-3.937-2.951-9H8.15c.46 2.86 1.545 4.216 3.043 5.197c.922.604 1.112 1.876.265 2.574M7.5 12.5v-6"
        ></path>
      </g>
    </svg>
  </div>
  <div v-if="showIcon('buzz')" class="flex pr-1 items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :class="iconCss"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M32 16c0 8.839-7.161 16-16 16S0 24.839 0 16S7.161 0 16 0s16 7.161 16 16m-5.531-.364L25.166 6.38l-8.667 3.5l3.432 1.984l-3.244 5.62l-5.62-3.244l-5.537 9.588l3.1 1.792l3.749-6.489l5.62 3.244l5.036-8.724z"
      />
    </svg>
  </div>
  <div v-if="showIcon('sparkles')" class="flex pr-1 items-center">
    <SparklesIcon :class="iconCss" class="h-4 w-4 flex mx-auto" />
  </div>
  <div v-if="showIcon('trophy')" class="flex items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :class="iconCss"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859a6.753 6.753 0 0 0 6.138 5.6a6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a.75.75 0 0 0 0 1.5h12.17a.75.75 0 0 0 0-1.5h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.707 6.707 0 0 1-1.112-3.173a6.73 6.73 0 0 0 2.743-1.347a6.753 6.753 0 0 0 6.139-5.6a.75.75 0 0 0-.585-.858a47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.658-.744a49.22 49.22 0 0 0-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 0 0-.657.744Z"
      />
    </svg>
  </div>
</template>
