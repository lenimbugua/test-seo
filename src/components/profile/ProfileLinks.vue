<script setup>
import { useDownloadApp } from "@/composables/useDownloadApp";
import { useModalTypes } from "@/composables/useModalTypes";
import { useLoginStore } from "@/stores/login";
import { useModalStore } from "@/stores/modal";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/vue/24/outline";
import { ref } from "vue";
import { useRouter } from "vue-router";

const { downloadApp } = useDownloadApp();

const { chat, customerSupportModal } = useModalTypes();

const { openModal } = useModalStore();

const router = useRouter();

const { logout } = useLoginStore();

const signOut = () => {
  router.push({ name: "home" });
  logout();
};

const links = ref([
//   {
//     path: "share-happiness",
//     name: "Sambaza Krisii Na Mabaste!",
//     icon: "giftIcon",
//     isNew: true,
//   },
  {
    path: "promotions",
    name: "Promotion",
    icon: "giftTopIcon",
    isNew: true,
  },
  {
    path: "join-affiliate",
    name: "Join Affiliate",
    icon: "userPlusIcon",
    isHot: true,
  },
  {
    path: "share-feedback",
    name: "Share Feedback",
    icon: "lightBulbIcon",
    isNew: true,
  },
  {
    path: "my-bets",
    name: "My Bets",
    icon: "clipboardDocumentListIcon",
  },
  {
    path: "sort-deposit",
    name: "Sort your Deposit (Jisort)",
    icon: "checkBadgeIcon",
  },
  //   {
  //     path: "join-affiliate",
  //     name: "Join Affiliate",
  //     icon: "userPlusIcon",
  //   },
  //   {
  //     path: "",
  //     name: "Loyalty Rewards",
  //     icon: "banknotes",
  //   },
  //   {
  //     path: "",
  //     name: "Help and Support",
  //     icon: "questionMarkCircleIcon",
  //   },
  //   {
  //     path: "",
  //     name: "Change Password",
  //     icon: "lockClosedIcon",
  //   },
]);

// const callPhone = (phone) => {
//   window.location.href = `tel:${phone}`;
// };
</script>
<template>
  <div class="w-full dark:text-gray-300">
    <div>
      <RouterLink
        v-for="link in links"
        :key="link"
        :to="{ name: link.path }"
        class="dark:bg-[#504B5C] text-sm bg-gray-200 p-3 py-2 border-b-2 dark:border-gray-900 border-white flex justify-between"
      >
        <div class="relative">
          <span
            v-if="link?.isHot"
            class="absolute -right-7 -top-1 p-0.5 px-1 rounded-lg border-red-600 bg-[#EF4444] text-[0.6rem] font-bold leading-none text-white"
            >HOT</span
          >
          <span
            v-if="link?.isNew"
            class="absolute -right-7 -top-1 p-0.5 px-1 rounded-lg border-red-600 bg-[#EF4444] text-[0.6rem] font-bold leading-none text-white"
            >NEW</span
          >
          {{ link.name }}
        </div>
        <ProfileIcons :icon="link.icon" />
      </RouterLink>

      <div
        class="dark:bg-[#504B5C] bg-gray-200 p-3 flex justify-between cursor-pointer border-b-2 dark:border-gray-900 border-white"
        @click="downloadApp"
      >
        <div class="flex items-center space-x-2">
          <span>Download App</span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="text-[#56CB05] h-6 w-6 fill-current"
          viewBox="0 0 22.147 27.549"
        >
          <g
            id="Icon_core-screen-smartphone"
            data-name="Icon core-screen-smartphone"
            transform="translate(-7.313 -1.125)"
          >
            <path
              id="Path_84"
              data-name="Path 84"
              d="M7.313,2.962V26.837a2.091,2.091,0,0,0,2.271,1.837h17.6a2.091,2.091,0,0,0,2.271-1.837V2.962a2.091,2.091,0,0,0-2.271-1.837H9.584A2.091,2.091,0,0,0,7.313,2.962ZM27.189,26.837H9.584V2.962h17.6Z"
              transform="translate(0 0)"
            />
            <path
              id="Path_85"
              data-name="Path 85"
              d="M15.188,5.625H22V7.462H15.188Zm2.271,17.907H19.73v1.837H17.459Z"
              transform="translate(0.075 -0.827)"
            />
          </g>
        </svg>
      </div>

      <div
        class="dark:bg-[#504B5C] bg-gray-200 p-3 flex justify-between cursor-pointer border-b-2 dark:border-gray-900 border-white"
        @click="openModal(chat)"
      >
        Chat with our Support
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="text-[#56CB05] h-6 w-6"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M21 12.22C21 6.73 16.74 3 12 3c-4.69 0-9 3.65-9 9.28c-.6.34-1 .98-1 1.72v2c0 1.1.9 2 2 2h1v-6.1c0-3.87 3.13-7 7-7s7 3.13 7 7V19h-8v2h8c1.1 0 2-.9 2-2v-1.22c.59-.31 1-.92 1-1.64v-2.3c0-.7-.41-1.31-1-1.62"
          />
          <circle cx="9" cy="13" r="1" fill="currentColor" />
          <circle cx="15" cy="13" r="1" fill="currentColor" />
          <path
            fill="currentColor"
            d="M18 11.03A6.04 6.04 0 0 0 12.05 6c-3.03 0-6.29 2.51-6.03 6.45a8.07 8.07 0 0 0 4.86-5.89c1.31 2.63 4 4.44 7.12 4.47"
          />
        </svg>
      </div>

      <div
        class="dark:bg-[#504B5C] bg-gray-200 p-3 flex justify-between cursor-pointer border-b-2 dark:border-gray-900 border-white"
        @click="openModal(customerSupportModal)"
      >
        <div>
          24/7 Support Call -
          <span
            class="text-[#56CB05] text-sm font-bold"
            >+254711082816</span
          >
          or
          <span
            class="text-[#56CB05] text-sm font-bold"
            >+254205000832</span
          >
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="text-[#56CB05] h-6 w-6"
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
              d="M3.778 11.942C2.83 10.29 2.372 8.94 2.096 7.572c-.408-2.024.526-4.001 2.073-5.263c.654-.533 1.404-.35 1.791.343l.873 1.567c.692 1.242 1.038 1.862.97 2.52c-.069.659-.536 1.195-1.469 2.267zm0 0c1.919 3.346 4.93 6.36 8.28 8.28m0 0c1.653.948 3.002 1.406 4.37 1.682c2.024.408 4.001-.526 5.262-2.073c.534-.654.351-1.404-.342-1.791l-1.567-.873c-1.242-.692-1.862-1.038-2.52-.97c-.659.069-1.195.536-2.267 1.469zM12 7h.857c.404 0 .606 0 .732.122c.125.122.125.319.125.711c0 .786 0 1.179-.25 1.423c-.192.186-.471.23-.95.24c-.245.006-.367.009-.44.082S12 9.767 12 10v1.167c0 .393 0 .589.126.711c.125.122.327.122.731.122h.857M18 7v2.5m0 0h-1.457c-.323 0-.485 0-.585-.098c-.1-.097-.1-.254-.1-.569V7M18 9.5V12"
            />
            <path d="M10 4.305q.133-.15.277-.294A6.867 6.867 0 1 1 19.695 14" />
          </g>
        </svg>
      </div>
      <RouterLink
        :to="{ name: 'self-exclusion' }"
        class="dark:bg-[#504B5C] bg-gray-200 p-3 flex justify-between cursor-pointer border-b-2 dark:border-gray-900 border-white"
      >
        Exclude myself from betting
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="text-[#56CB05] h-6 w-6"
          viewBox="0 0 16 16"
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M9.412 1H6.588l-.484 2.423l-2.056-1.37l-1.996 1.995l1.37 2.056L1 6.588v2.824l2.423.484l-1.37 2.056l1.995 1.996l2.056-1.37L6.588 15h2.083a4.5 4.5 0 0 1-.917-1.005h-.342l-.288-1.441a5 5 0 0 1-.067-.334l-.116-.583l-.764-.316l-2 1.334l-.832-.831L4.68 9.823l-.316-.764l-2.358-.471V7.412l2.358-.471l.316-.764l-1.334-2l.831-.832l2 1.335l.764-.316l.471-2.358h1.176l.471 2.358l.764.316l2-1.334l.832.831l-1.334 2.001l.316.764l.582.116q.17.027.335.067l1.441.288v.342c.38.254.719.563 1.005.917V6.588l-2.422-.484l1.37-2.056l-1.996-1.996l-2.056 1.37zM8 6a2 2 0 0 1 1.875 1.302a4.5 4.5 0 0 0-.9.473a1 1 0 1 0-1.2 1.2a4.5 4.5 0 0 0-.473.9A2 2 0 0 1 8 6m1.28 2.795a3.5 3.5 0 1 1 4.44 5.41a3.5 3.5 0 0 1-4.44-5.41M9 11v1h5v-1z"
            clip-rule="evenodd"
          />
        </svg>
      </RouterLink>
      <div
        class="dark:bg-[#504B5C] bg-gray-200 p-3 flex justify-between cursor-pointer border-b-2 dark:border-gray-900 border-white"
        @click="signOut"
      >
        Logout
        <ArrowRightEndOnRectangleIcon
          class="w-6 dark:text-gray-400 text-gray-900"
        />
      </div>
    </div>
  </div>
</template>
