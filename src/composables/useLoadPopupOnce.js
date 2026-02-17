import { onMounted } from "vue";

export function useLoadPopupOnce() {
  function isNotReload(callback) {
    onMounted(() => {
      const isReload = performance?.navigation?.type === 1; // 1 = Reload

      if (!isReload) {
        callback;
      }
    });
  }
  return {
    isNotReload,
  };
}
