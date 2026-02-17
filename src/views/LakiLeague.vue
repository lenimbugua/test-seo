<script setup>
import TheBetslip from "@/components/TheBetslip.vue";
import TheSidebar from "@/components/TheSidebar.vue";
</script>
<template>
  <TheDepositBar class="md:hidden" />
  <HeaderLinks />
  <div id="main">
    <div class="main-content-wrapper">
      <div class="container-fluid">
        <div class="row">
          <div class="main-content">
            <TheSidebar class="hidden lg:block" />
            <RouterView />

            <TheBetslip />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
