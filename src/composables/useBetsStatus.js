export function useBetsStatus() {
  // bet status
  const all = 0;
  const pending = 1;
  const voided = 2;
  const lost = 3;
  const cancelled = 4;
  const won = 5;
  const pendingPayout = 10;
  const cashedOut = 15;

  function getStatusText(status) {
    switch (status) {
      case won:
        return "won";
      case lost:
        return "lost";
      case pending:
        return "open";
      case voided:
        return "voided";
      case cancelled:
        return "cancelled";
      case pendingPayout:
        return "pending payout";
      case cashedOut:
        return "cashed out";
      default:
        return "";
    }
  }

  function getColor(prefix, status) {
    switch (status) {
      case pending:
        return `dark:${prefix}-slate-200 ${prefix}-slate-600`;
      case lost:
        return `${prefix}-red-500`;
      case voided:
        return `${prefix}-gray-200`;
      case won:
        return `${prefix}-[#56CB05]`;
      case pendingPayout:
        return `${prefix}-yellow-500`;
      case cancelled:
        return `dark:${prefix}-slate-200 ${prefix}-slate-600`;
      case cashedOut:
        return `${prefix}-teal-400`;
      default:
        return "";
    }
  }

  return {
    all,
    won,
    lost,
    voided,
    pending,
    cancelled,
    cashedOut,
    pendingPayout,

    getColor,
    getStatusText,
  };
}
