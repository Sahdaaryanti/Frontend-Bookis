import { useEffect } from "react";
import useSnap from "../../hooks/useSnap";
import { useLocation } from "react-router-dom";

const PaymentComponent = () => {
  const { snapEmbed } = useSnap();
  const {state} = useLocation();

  useEffect(() => {
        snapEmbed(state.paymentToken, "snap-container", {
          onSuccess: function (result) {
            console.log("success", result);
          },
          onPending: function (result) {
            console.log("pending", result);
          },
          onClose: function () {
          },
        });
  });

  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      <h1 className="font-bold text-[2.25rem]">CHECKOUT</h1>
      <div id="snap-container"></div>
    </div>
  );
};

export default PaymentComponent;




