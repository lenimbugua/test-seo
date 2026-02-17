<script setup>
import { useModalTypes } from "@/composables/useModalTypes";
import { Tab, TabGroup, TabList } from "@headlessui/vue";
import { PhoneIcon } from "@heroicons/vue/24/outline";
import { GiftIcon } from "@heroicons/vue/24/solid";
import { ref, toRefs } from "vue";
import { useFeedbackStore } from "../stores/feedback";

import { useModalStore } from "@/stores/modal";

const { sendFeedback } = useFeedbackStore();
const { pending } = toRefs(useFeedbackStore());

const { openModal } = useModalStore();

const { customerSupportModal } = useModalTypes();

const tabs = [
  {
    name: "🌟 Spark a New Feature",
    value: "NEW_FEATURE",
  },
  {
    name: "🛠️ Help Us Improve",
    value: "HELP_US_IMPROVE",
  },
  {
    name: "🗣️ Make a Complaint 💎",
    value: "MAKE_COMPLAINT",
  },
];

const idea = ref("");
const error = ref("");
const category = ref("NEW_FEATURE");
const minLength = 30;
const maxLength = 2000;

const handleSubmit = async () => {
  const body = {
    category: category.value,
    comment: idea.value,
  };

  await sendFeedback(body);
  idea.value = "";
};

function isValidIdea() {
  return idea.value.length > minLength;
}

function validateField() {
  if (idea.value.length < minLength) {
    error.value = `Idea must be at least ${minLength} characters long`;
  } else if (idea.value.length > maxLength) {
    error.value = `Idea cannot exceed ${maxLength} characters`;
  } else {
    error.value = "";
  }
}
function updateCharacterCount() {
  if (error.value) validateField();
}
</script>
<template>
  <HeaderLinks />

  <div class="max-w-md flex sm:max-w-xl mx-auto">
    <div
      class="w-full m-2 md:m-4 bg-gray-200 dark:bg-black/25 rounded-md p-6 pb-10"
    >
      <div
        class="flex w-full items-center gap-10 text-xl text-gray-600 font-bold dark:text-slate-400"
      >
        <div
          class="flex w-full cursor-pointer items-center justify-between"
          @click="$router.go(-1)"
        >
          <div class="flex items-center space-x-2">
            <ChevronLeftIcon
              class="w-7 h-7 cursor-pointer text-black dark:text-white"
            />
            <div class="">Back</div>
          </div>
          <div>Share Feedback</div>
          <div></div>
        </div>
      </div>
      <div class="py-5">
        <div class="w-full flex justify-center mx-auto">
          <span class="text-4xl">🚀</span>
          <!-- <ShareIdeaIcon /> -->
        </div>
        <h1
          class="text-2xl font-bold text-center text-gray-900 dark:text-slate-300"
        >
          Shape Tomorrow's Experience!
        </h1>
        <div class="text-gray-600 dark:text-slate-400 text-center text-sm">
          Your brilliant ideas become our next breakthrough features.
        </div>
      </div>
      <div
        class="flex items-start gap-1 text-fuchsia-800 text-sm mt-4 p-3 bg-amber-500/90 dark:bg-amber-500/90 rounded-md"
      >
        <GiftIcon class="h-6 w-6 text-fuchsia-700" />
        <span>
          <span class="text-fuchsia-800">🤝</span> Share your idea with us and
          stand a chance to enter our daily "Shinda Freebet" draw! 🎖️🎲</span
        >
      </div>
      <div
        class="cursor-pointer flex items-start gap-1 text-amber-950 dark:text-fuchsia-200 text-sm mt-4 p-3 bg-amber-500/50 dark:bg-amber-500/20 rounded-md"
        @click="openModal(customerSupportModal)"
      >
        <PhoneIcon class="text-amber-950 dark:text-fuchsia-200 h-6 w-6" />
        <span
          >Need instant help? Our expert support team responds in seconds, not
          hours.</span
        >
      </div>
      <form @submit.prevent="handleSubmit">
        <h1
          class="font-bold text-xl text-gray-600 dark:text-slate-400 mt-4 mb-2"
        >
          Select Category <sup class="text-red-500">*</sup>
        </h1>
        <TabGroup>
          <TabList class="flex flex-wrap gap-2 mb-4">
            <Tab
              v-for="tab in tabs"
              :key="tab"
              v-slot="{ selected }"
              as="template"
              @click="category = tab.value"
            >
              <button
                class="rounded-full font-extrabold px-4 whitespace-nowrap hover:bg-[#FEAF04] hover:text-gray-950 focus:bg-[#56CB05] capitalize py-2.5 text-sm border-x dark:border-black/40 focus:outline-none"
                :class="[
                  selected
                    ? 'bg-[#56CB05] text-fuchsia-950'
                    : 'text-gray-700 dark:text-gray-400 bg-gray-300 dark:bg-[#393444]',
                ]"
              >
                {{ tab.name }}
              </button>
            </Tab>
          </TabList>
        </TabGroup>
        <div class="mb-4">
          <div class="space-y-1">
            <label
              for="idea"
              class="flex font-bold text-xl text-gray-600 dark:text-slate-400 mt-4 mb-2"
            >
              <LightBulbIcon /> Your Idea
            </label>
            <div class="relative">
              <textarea
                id="idea"
                v-model="idea"
                required
                :minlength="minLength"
                :maxlength="maxLength"
                rows="4"
                placeholder="Share your creative idea here (minimum 60 characters)..."
                :class="[
                  'appearance-none text-slate-900 dark:text-gray-400 bg-white dark:bg-[#141019]/50 rounded-md block w-full p-3 text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 shadow ring-2 ring-black/10 dark:ring-white/25 resize-y',
                  error
                    ? 'ring-red-500 focus:ring-red-500'
                    : 'focus:ring-[#36C31F]',
                ]"
                @input="updateCharacterCount"
                @blur="validateField"
              ></textarea>
              <div
                class="absolute bottom-2 right-2 text-xs px-2 py-1 rounded bg-white/80 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400"
              >
                {{ idea.length }}/{{ maxLength }}
              </div>
            </div>
            <div v-if="error" class="text-red-500 text-xs">
              {{ error }}
            </div>
            <div
              v-else-if="idea.length > 0"
              class="text-xs text-slate-500 dark:text-slate-400"
            >
              {{ maxLength - idea.length }} characters remaining
            </div>
          </div>
        </div>
        <div class="w-full flex items-center justify-between gap-2">
          <button
            type="submit"
            :class="[
              isValidIdea()
                ? 'cursor-pointer bg-[#0A7E2D]'
                : 'bg-[#0A7E2D] cursor-not-allowed',
            ]"
            class="flex text-white flex-grow space-x-1 items-center justify-center p-2 py-3 shadow rounded-md font-medium"
          >
            <TheButtonSpin v-if="pending" />
            <div v-else class="flex items-center justify-between space-x-1">
              <span>🚀</span>
              <!-- <LightBulbIcon /> -->
              <span class="">Launch Your Idea</span>
            </div>
          </button>
        </div>
      </form>
    </div>
  </div>
  <Footer />
</template>
