<script setup>
import ShareToSocials from "@/components/community-bets/ShareToSocials.vue";
import { useShareToSocials } from "@/composables/useShareToSocials";
import { useAffiliateStore } from "@/stores/affiliate";
import { storeToRefs } from "pinia";
const { affiliateText } = useShareToSocials();

const { affiliateUrl } = storeToRefs(useAffiliateStore());
</script>
<template>
  <div
    class="border border-gray-300 dark:bg-[#504B5C] dark:border-white/20 rounded-md bg-white p-4 mt-3"
  >
    <div class="max-w-xl justify-center md:justify-start">
      <div
        class="text-3xl font-bold text-amber-500 pt-3 text-center md:text-left"
      >
        Or...
      </div>
      <div class="text-gray-900 dark:text-gray-400 pb-1">
        Click on the icons below to Invite friends on your favorite social
        networks:
      </div>
      <ShareToSocials :share-url="affiliateUrl" :share-text="affiliateText" />
      <!-- <div class="flex space-x-2 text-[#504B5C] fill-current dark:text-gray-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <g fill="none">
              <g clip-path="url(#akarIconsFacebookFill0)">
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M0 12.067C0 18.034 4.333 22.994 10 24v-8.667H7V12h3V9.333c0-3 1.933-4.666 4.667-4.666c.866 0 1.8.133 2.666.266V8H15.8c-1.467 0-1.8.733-1.8 1.667V12h3.2l-.533 3.333H14V24c5.667-1.006 10-5.966 10-11.933C24 5.43 18.6 0 12 0S0 5.43 0 12.067"
                  clip-rule="evenodd"
                />
              </g>
              <defs>
                <clipPath id="akarIconsFacebookFill0">
                  <path fill="#fff" d="M0 0h24v24H0z" />
                </clipPath>
              </defs>
            </g>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 16 16"
          >
            <path
              fill="currentColor"
              d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07l-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 16 16"
          >
            <path
              fill="currentColor"
              d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01q-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32q3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817c-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088c.327.216.589.393.85.571c.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414c.214-.02.435-.22.547-.82c.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315a.34.34 0 0 0-.114-.217a.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <g fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M12 7a5 5 0 1 0 0 10a5 5 0 0 0 0-10m-3 5a3 3 0 1 0 6 0a3 3 0 0 0-6 0"
                clip-rule="evenodd"
              />
              <path d="M18 5a1 1 0 1 0 0 2a1 1 0 0 0 0-2" />
              <path
                fill-rule="evenodd"
                d="M5 1a4 4 0 0 0-4 4v14a4 4 0 0 0 4 4h14a4 4 0 0 0 4-4V5a4 4 0 0 0-4-4zm14 2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2"
                clip-rule="evenodd"
              />
            </g>
          </svg>
        </div> -->
    </div>
  </div>
</template>
