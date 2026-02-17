<script setup>
import { usePoll } from "@/composables/usePoll";
import { useLoginStore } from "@/stores/login";
import {
  EyeIcon,
  EyeSlashIcon,
  InformationCircleIcon,
} from "@heroicons/vue/24/outline";
import { onUnmounted, ref, toRefs } from "vue";
import {
  MAX_WITHDRAWAL,
  MIN_WITHDRAWAL,
} from "../composables/useDefinedConstants";
import { useProfileStore } from "../stores/profile.js";
import { useWithdrawStore } from "../stores/withdraw";
import formatStuff from "../utilities/format-stuff";

const { balance, pending: profilePending } = toRefs(useProfileStore());
const { getProfileInfo } = useProfileStore();

getProfileInfo();

const showBalance = ref(true);
const withdrawTax = import.meta.env.VITE_WITHDRAW_TAX;

const { formattedNumber } = formatStuff();

const { startPolling, pollingInterval } = usePoll();
const { isAuthenticated } = toRefs(useLoginStore());

const { setAmount, withdraw } = useWithdrawStore();
const { pending, amount, responseOK } = toRefs(useWithdrawStore());
const withdrawAmount = ref(amount.value);

async function makeWithdrawal() {
  setAmount(withdrawAmount.value);
  await withdraw();
  if (responseOK.value) {
    startPolling(getProfileInfo);
  }
}

function getMaxWithdrawal() {
  let userBal = Math.floor(parseInt(balance.value));
  let maxBal = parseInt(MAX_WITHDRAWAL);
  let minBal = parseInt(MIN_WITHDRAWAL);
  if (userBal < minBal) {
    return minBal;
  }
  if (userBal < maxBal) {
    return userBal;
  }
  return MAX_WITHDRAWAL;
}

onUnmounted(() => {
  if (pollingInterval) {
    clearInterval(pollingInterval);
  }
});
</script>
<template>
  <NotAuthenicated v-if="!isAuthenticated" />
  <div
    v-if="isAuthenticated && balance"
    class="pb-2 space-y-3 max-w-xl mx-auto"
  >
    <div class="shadow border dark:border-white/10 rounded-md overflow-clip">
      <div class="dark:bg-dark-purple-19 bg-gray-200 p-3 w-full">
        <div class="w-full flex justify-between items-center">
          <div
            class="font-semibold flex items-center space-x-2 dark:text-gray-50"
          >
            My Balance KES
            <div class="text-sm sm:text-lg ml-1.5">
              <div v-if="showBalance">
                {{ balance }}
              </div>
              <div v-else>****</div>
            </div>
            <div class="cursor-pointer" @click="showBalance = !showBalance">
              <EyeIcon v-if="showBalance" class="h-4 w-4" />
              <EyeSlashIcon v-else class="h-4 w-4" />
            </div>
          </div>
          <div class="cursor-pointer" @click="getProfileInfo()">
            <div
              class="bg-white dark:bg-black/30 px-2 py-1 rounded-md"
              style="display: flex"
            >
              <svg
                width="16"
                class="h-6 w-6 text-green-600 fill-current"
                :class="{ 'animate-spin': profilePending }"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4 -3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35Z"
                ></path>
                <path fill="none" d="M0 0h24v24H0Z"></path></svg
              ><span class="text-green-600">Refesh</span>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full dark:bg-dark-purple-20 p-3 dark:text-gray-50">
        <div class="space-y-4 px-3 max-w-sm">
          <form class="space-y-4 py-4" @submit.prevent="makeWithdrawal">
            <span v-if="balance < MIN_WITHDRAWAL" class="text-xs text-red-500">
              Your balance (KES {{ balance }}) is less than the minimum
              withdrawal amount (KES {{ MIN_WITHDRAWAL }}).</span
            >
            <p class="dark:text-slate-400">Enter Amount to Withdraw</p>
            <div
              class="flex items-center rounded-md overflow-clip border-2 border-gray-400/60 dark:border-white/20"
            >
              <div class="uppercase bg-[#393444] text-slate-300 py-2 px-2">
                KES
              </div>
              <input
                id="amount"
                v-model="withdrawAmount"
                type="number"
                :min="MIN_WITHDRAWAL"
                :max="getMaxWithdrawal()"
                class="py-2 px-2 flex flex-grow bg-gray-200 dark:bg-black/30 text-black dark:text-slate-100 ring-0 outline-none"
                placeholder="10"
                name="withdraw"
                required
              />
            </div>

            <div class="">
              <button
                class="w-full bg-[#1C7928] text-white p-2 rounded-md"
                type="submit"
              >
                <TheButtonSpin v-if="pending" />
                <span v-else> Continue</span>
              </button>
            </div>
            <div class="w-full flex space-x-1">
              <InformationCircleIcon class="h-6 w-6 text-yellow-500" />
              <div class="text-sm text-gray-800 dark:text-slate-400">
                <p>My minimum withdraw amount is KES. {{ MIN_WITHDRAWAL }}.</p>
                <p v-if="balance >= MIN_WITHDRAWAL">
                  My maximum withdraw amount is KES.
                  {{ formattedNumber(getMaxWithdrawal()) }}.
                </p>
                <p class="text-xs">{{ withdrawTax }}% tax applies.</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
