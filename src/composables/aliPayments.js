import { waitForAlipayBridge } from "@/composables/alipay";

export function makePayBillPayment(amount) {
  waitForAlipayBridge(() => {
    try {
      window.AlipayJSBridge.call(
        "payBill",
        {
          businessID: "4999908", // Paybill number
          billReference: "123456789",
          amount,
          currency: "KES",
          reason: "Hakibets Ali Payment",
        },
        (res) => {
          console.log("PayBill success:", res);
          alert(`PayBill Success: ${JSON.stringify(res)}`);
        },
        (res) => {
          console.error("PayBill failed:", res);
          window.AlipayJSBridge.call(
            "alert",
            { title: "Payment Failed", content: JSON.stringify(res) },
            () => {},
            () => {}
          );
        }
      );
    } catch (error) {
      console.error("PayBill error:", error);
      alert(error);
    }
  });
}

export function makeTillPayment() {
  waitForAlipayBridge(() => {
    try {
      window.AlipayJSBridge.call(
        "buyGoods",
        {
          tillNumber: "89900",
          amount: "25.0",
          currency: "KES",
          reason: "Jon Groceries",
        },
        (res) => {
          console.log("BuyGoods success:", res);
          alert(`BuyGoods Success: ${JSON.stringify(res)}`);
        },
        (res) => {
          console.error("BuyGoods failed:", res);
          alert(`BuyGoods Failed: ${JSON.stringify(res)}`);
        }
      );
    } catch (error) {
      console.error("BuyGoods error:", error);
      alert(error);
    }
  });
}
