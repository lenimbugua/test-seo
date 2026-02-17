<script setup>
import { useInstantStore } from "@/stores/instant";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";
const { count, endedTime } = storeToRefs(useInstantStore());

const props = defineProps({
  isHome: {
    type: Boolean,
    required: true,
  },
  score: {
    type: Object,
    required: true,
  },
});

const score2 = ref("");

const isScoring = ref(false);

function getFinalScore() {
  if (props.isHome) {
    return props.score.home_score;
  } else {
    return props.score.away_score;
  }
}

function scoresArray() {
  if (props.isHome) {
    return props.score.home_score_time.split(",").filter((word) => word !== "");
  } else {
    return props.score.away_score_time.split(",").filter((word) => word !== "");
  }
}

function theOtherTeamScore() {
  if (props.isHome) {
    return props.score.away_score_time.split(",").filter((word) => word !== "");
  } else {
    return props.score.home_score_time.split(",").filter((word) => word !== "");
  }
}

function traverseArrayFromTail(array) {
  for (let i = array.length - 1; i >= 0; i--) {
    if (parseInt(array[i]) <= parseInt(count.value)) {
      return array[i];
    }
  }
  return null;
}

function hasCurrentScore(newCount, currentValue) {
  if (!currentValue) {
    return false;
  }
  let otherTeamScore = theOtherTeamScore();
  if (!otherTeamScore.length) {
    return true;
  }

  let otherScore = traverseArrayFromTail(otherTeamScore, newCount);

  if (!otherScore) {
    return true;
  }

  return currentValue >= otherScore;
}

//add score if <= count
function cumulativeScore(newCount, scoresArray) {
  const cumulativeSum = scoresArray.reduce((accumulator, currentValue) => {
    if (parseInt(currentValue) <= parseInt(newCount)) {
      isScoring.value = hasCurrentScore(newCount, currentValue);
      return accumulator + 1;
    }

    return accumulator;
  }, 0);

  return cumulativeSum;
}

watch(count, ({ newCount }) => {
  if (newCount >= endedTime.value) {
    score2.value = getFinalScore();
    return;
  }
  const scores = scoresArray();
  if (!scores.length) {
    score2.value = getFinalScore();
    return;
  }

  score2.value = cumulativeScore(newCount, scores);
});
</script>
<template>
  <div
    :class="[isScoring && count <= endedTime ? 'blink_me' : '']"
    class="px-1.5 py-0.5 rounded-md bg-[#009260] text-white text-center"
  >
    <span>{{ score2 }}</span>
  </div>
</template>

<style scoped>
.blink_me {
  animation: blinker 1s linear infinite;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-delay: 0s;
  animation-iteration-count: infinite;
  animation-direction: normal;
  animation-fill-mode: none;
  animation-play-state: running;
  animation-name: blinker;
  animation-timeline: auto;
  animation-range-start: normal;
  animation-range-end: normal;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>
