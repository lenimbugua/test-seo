<script setup>
import { passwordConfig } from "@/composables/usePasswordConfig";
import { validatePassword } from "@/composables/usePasswordValidator";
import { storeToRefs } from "pinia";
import { computed, onBeforeUnmount, ref } from "vue";
import { useRegisterStore } from "../stores/register";

const { showPasswordDoNotMatch } = storeToRefs(useRegisterStore());

const props = defineProps({
  updateFunction: {
    type: Function,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  showValidationErrors: {
    type: Boolean,
    defalt: false,
  },
  id: {
    type: String,
    required: true,
  },
});

const password = ref("");

const showPassword = ref(false);

const inputType = ref("password");

props.updateFunction("");

onBeforeUnmount(() => {
  props.updateFunction("");
});

function shouldhighlightError() {
  if (showPasswordDoNotMatch.value && props.id === "confirmPassword") {
    return true;
  }
  return false;
}

function viewPassword() {
  showPassword.value = !showPassword.value;
  if (showPassword.value) {
    inputType.value = "text";
  } else {
    inputType.value = "password";
  }
}

const validation = computed(() =>
  validatePassword(password.value, passwordConfig)
);
</script>

<template>
  <div class="relative">
    <label
      :for="id"
      class="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-400"
      >{{ label }}</label
    >
    <input
      :id="id"
      v-model="password"
      :type="inputType"
      :class="[
        shouldhighlightError()
          ? 'ring-red-500'
          : 'focus:ring-[#36C31F]  ring-dark-purple-18',
      ]"
      class="mt-2 text-extrabold text-lg appearance-none text-slate-900 dark:text-gray-400 bg-white dark:bg-[#141019] rounded-md block w-full px-3 h-12 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 ring-1"
      placeholder=".............."
      required
      autocomplete="current-password"
      @input="updateFunction(password)"
    />
    <div
      v-if="password"
      class="absolute right-2 cursor-pointer top-2/3 -translate-y-1/2"
      @click="viewPassword"
    >
      <EyeSVG :show="showPassword" />
    </div>
  </div>

  <ul
    v-if="passwordConfig.enabled && showValidationErrors"
    class="mt-2 text-sm"
  >
    <li
      v-if="!validation.errors.minLength"
      :class="validation.errors.minLength ? 'text-green-600' : 'text-red-600'"
    >
      Minimum {{ passwordConfig.minLength }} characters
    </li>

    <li
      v-if="passwordConfig.rules.uppercase && !validation.errors.uppercase"
      :class="validation.errors.uppercase ? 'text-green-600' : 'text-red-600'"
    >
      Uppercase letter
    </li>

    <li
      v-if="passwordConfig.rules.lowercase && !validation.errors.lowercase"
      :class="validation.errors.lowercase ? 'text-green-600' : 'text-red-600'"
    >
      Lowercase letter
    </li>

    <li
      v-if="passwordConfig.rules.number && !validation.errors.number"
      :class="validation.errors.number ? 'text-green-600' : 'text-red-600'"
    >
      Number
    </li>

    <li
      v-if="passwordConfig.rules.special && !validation.errors.special"
      :class="validation.errors.special ? 'text-green-600' : 'text-red-600'"
    >
      Special character
    </li>
  </ul>
</template>
