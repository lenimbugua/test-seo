<script setup>
import { useDark } from "@vueuse/core";
import { toRefs } from "vue";

import { useAffiliateV2Store } from "../../stores/affiliate-v2";
import SparkleLoader from "./SparkleLoader.vue";

import { VueDatePicker } from "@vuepic/vue-datepicker";
import { ref } from "vue";

const isDark = useDark();
const date = ref(new Date());
const { fetchEarnings } = useAffiliateV2Store();
const { earnings, pending } = toRefs(useAffiliateV2Store());
console.log(earnings.value);

fetchEarnings(date.value);
</script>
<template>
  <section class="mb-16">
    <SparkleLoader v-if="pending" />
    <div v-else>
      <div v-if="!earnings" class="p-12 text-center">
        <div
          class="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <span class="text-2xl">📱</span>
        </div>
        <p class="text-gray-300 font-semibold mb-2">No friends invited yet</p>
        <p class="text-gray-500 text-sm">
          Invite friends to start earning bonuses!
        </p>
      </div>
      <div v-else class="container mx-auto pb-20">
        <VueDatePicker
          v-model="date"
          :teleport="true"
          menu-class="datepicker-fix-zindex"
          :dark="isDark"
          @update:model-value="fetchEarnings(date)"
        />
        <div class="flex flex-col lg:flex-row gap-8 mt-2">
          <div class="w-full">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div
                class="bg-white dark:bg-[#2A2438] p-4 rounded-2xl border border-gray-300 dark:border-gray-700"
              >
                <p
                  class="text-xs text-gray-600 dark:text-gray-400 uppercase font-bold"
                >
                  Sent
                </p>
                <p
                  class="text-2xl font-black text-gray-600 dark:text-white mt-1"
                >
                  {{ earnings.sent }}
                </p>
              </div>
              <div
                class="bg-white dark:bg-[#2A2438] p-4 rounded-2xl border border-gray-300 dark:border-gray-700 relative overflow-hidden"
              >
                <div class="absolute top-0 right-0 p-1">
                  <span class="flex h-2 w-2 relative">
                    <span
                      class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1C7929] opacity-75"
                    ></span>
                    <span
                      class="relative inline-flex rounded-full h-2 w-2 bg-[#1C7929]"
                    ></span>
                  </span>
                </div>
                <p
                  class="text-xs text-gray-600 dark:text-gray-400 uppercase font-bold"
                >
                  Signed Up
                </p>
                <p class="text-2xl font-black text-[#1C7929] mt-1">
                  {{ earnings.signedUp }}
                </p>
              </div>
              <div
                class="bg-white dark:bg-[#2A2438] p-4 border border-gray-300 dark:border-gray-700 rounded-2xl"
              >
                <p
                  class="text-xs text-gray-600 dark:text-gray-400 uppercase font-bold"
                >
                  My Earnings
                </p>
                <p class="text-2xl font-black text-[#FFB002] mt-1">
                  <span class="text-sm">KES</span> {{ earnings.earnings }}
                </p>
              </div>
              <div
                class="bg-gradient-to-br from-amber-600 to-[#1C7929] backdrop-blur-lg p-4 rounded-2xl text-white"
              >
                <p class="text-xs opacity-80 uppercase font-bold">Rank</p>
                <p class="text-2xl font-black mt-1">#{{ earnings.rank }}</p>
              </div>
            </div>
            <div
              class="bg-white dark:bg-[#2A2438] border border-gray-300 dark:border-gray-700 rounded-2xl overflow-hidden"
            >
              <div
                class="px-6 py-4 border-b border-gray-300 dark:border-gray-700 flex justify-between items-center bg-white dark:bg-[#1F1A2D]"
              >
                <h3 class="font-bold dark:text-white text-gray-700">
                  Live Referral Feed
                </h3>
                <span
                  class="text-xs text-amber-600 dark:text-[#FFB002] animate-pulse"
                  >● Live Updates</span
                >
              </div>
              <div
                v-if="!earnings.details || !earnings.details.length"
                class="p-12 text-center"
              >
                <div
                  class="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <span class="text-2xl">📱</span>
                </div>
                <p class="text-gray-600 dark:text-gray-300 font-semibold mb-2">
                  No data yet
                </p>
                <p class="text-gray-500 text-sm">
                  Invite friends to start earning bonuses!
                </p>
              </div>
              <div v-else class="overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-400">
                  <thead
                    class="text-xs text-gray-500 uppercase bg-gray-200 dark:bg-[#241E34]"
                  >
                    <tr>
                      <th scope="col" class="px-6 py-3">Friend</th>
                      <th scope="col" class="px-6 py-3">Status</th>
                      <th scope="col" class="px-6 py-3 text-right">Reward</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="detail in earnings.details"
                      :key="detail.msisdn"
                      class="border-b border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-[#241E34] transition-colors"
                    >
                      <td
                        class="px-6 py-4 font-mono text-gray-600 dark:text-white"
                      >
                        {{ detail.msisdn }}
                      </td>
                      <td class="px-6 py-4 text-gray-600 dark:text-white">
                        <span
                          v-if="detail.status === 'ACTIVE'"
                          class="bg-[#1C7929]/20 text-[#1C7929] text-xs font-bold px-2 py-1 rounded border border-[#1C7929]/30"
                        >
                          WAGERED ✅
                        </span>
                        <span
                          v-if="detail.status === 'SIGNED_UP'"
                          class="bg-blue-500/20 text-blue-400 text-xs font-bold px-2 py-1 rounded border border-blue-500/30"
                        >
                          SIGNED UP
                        </span>
                        <span
                          v-if="detail.status === 'PENDING'"
                          class="bg-yellow-500/10 text-yellow-500 text-xs font-bold px-2 py-1 rounded border border-yellow-500/30"
                        >
                          SMS SENT
                        </span>
                      </td>
                      <td
                        v-if="detail.status === 'PENDING'"
                        class="px-6 py-4 text-right font-bold text-gray-600 dark:text-white"
                      >
                        Pending
                      </td>
                      <td
                        v-else
                        class="px-6 py-4 text-right font-bold text-[#FFB002]"
                      >
                        {{ detail.commission }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                class="px-6 py-3 bg-white dark:bg-[#1F1A2D] border-t dark:border-0 text-center"
              >
                <button
                  class="text-xs text-gray-600 dark:text-gray-400 hover:text-white transition-colors"
                >
                  View All History
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
