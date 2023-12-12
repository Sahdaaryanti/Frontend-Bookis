import React, { useEffect, useState } from "react";
import placeholder from "../../assets/Group 34.png";
import useSnap from "../../hooks/useSnap";
import { useLocation, useNavigate } from "react-router-dom";

const ConstantPengiriman = [
  { name: "JNE", price: 100000 },
  { name: "JNT", price: 200000 },
  { name: "Sicepat", price: 300000 },
];

const CheckOut = () => {
  const { snapEmbed } = useSnap();
  const [show, setShow] = useState(false);
  const { state } = useLocation();
  const [total, setTotal] = useState(0);
  const [selectedShipping, setSelectedShipping] = useState(ConstantPengiriman[0]);

  const navigate = useNavigate();
  
  useEffect(() => {
    const temp = state && state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(temp);
  }, [state]);


  const payment = async () => {
    try {
      const response = await fetch("https://backed-bookis-production-c128.up.railway.app/api-docs/payment/buku", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          detailUserId: localStorage.getItem("userId"),
          provider: "A",
          noPayment: "123",
          totalPrice: total,
        }),
      }).then((res) => res.json());

      if (response && response.status === 200) {
        setShow(true);
        snapEmbed(response.paymentToken, "snap-container", {
          onSuccess: function (result) {
            console.log("success", result)
            navigate("/users/shop", { replace: true })
            setShow(false);
          },
          onPending: function (result) {
            console.log("pending", result);
            setShow(false);
          },
          onClose: function () {
            setShow(false);
          },
        });
      } else if (response.status === 'error') {
        const errorMessage = (await response.json()).errors.map((msg) => msg.msg).join(', ');
        alert(errorMessage);
      }
    } catch (error) {
      console.error('Error during payment:', error);
    }
  };

  
  const handleShippingOptionChange = (selectedOption) => {
    setSelectedShipping(selectedOption);
  };

  return (
    <div className="bg-[#FDF9EC] m-4w-full h-full flex justify-center items-center flex-col">
      <h1 className="font-bold text-[2.25rem]">Checkout</h1>
      {!show && (
        <section className="w-[75%] flex flex-col gap-[3.38rem]">
          <div className="p-[2.25rem] bg-[#FDF9EC]">
            <div className="font-semibold">Alamat Pengirim</div>
            <div>Alamat Lengkap</div>
            <div>Kode Pos</div>
          </div>
          <div className="bg-[#FDF9EC]">
            <section className="p-[2.25rem]">
              <div className="font-semibold">Produk Dipesan</div>
              <div className="flex flex-row gap-[3.13rem] overflow-auto">
                {state &&
                  state.cart.map((item) => (
                    <React.Fragment key={item.id}>
                      <img src={placeholder} width={100} alt="placeholder" />
                      <div className="flex flex-col gap-[4.56rem]">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-[#1E24B1] font-medium">Rp: {item.price}</p>
                      </div>
                    </React.Fragment>
                  ))}
              </div>
            </section>
            <section className="flex border-t-2 border-[#D9D9D9] flex-col">
              <div className="p-[2.25rem] flex flex-col items-end gap-[1.69rem]">
                <div className="flex flex-row gap-[14rem]">
                  <p>Opsi Pengiriman</p>
                  <div className="flex flex-col justify-center">
                    <p>Ubah</p>
                    <div className="flex flex-row gap-[1.69rem]">
                    {ConstantPengiriman.map((item, i) => (
                    <div
                        key={i}
                        className={`px-[0.6rem] rounded bg-[#677C52] text-white ${selectedShipping.name === item.name ? 'bg-opacity-100' : 'bg-opacity-50'}`}
                        onClick={() => handleShippingOptionChange(item)}
                    >
                        <p>{item.name}</p>
                    </div>
                    ))}
                                </div>
                            </div>
                            </div>
                            <div className="flex flex-row gap-[14rem]">
                    <p>{selectedShipping.name}</p>
                    <p>Rp.{selectedShipping.price}</p>
                </div>
              </div>
              <div className="border-t-2 border-1 border-[#D9D9D9]"></div>
              <div className="p-[2.25rem] flex justify-between">
                <p>Total Pesanan</p>
                {state && <p>Rp.{total}</p>}
              </div>
            </section>
          </div>
          <div className="bg-[#fdf9ec] mb-[3rem]">
            <section className=" flex flex-col">
              <p className="p-[2.25rem]">Rincian Belanja</p>
              <div className="border-t-2 border-1 border-[#D9D9D9]"></div>
            </section>
            <section className="px-[2.25rem] pt-[2.25rem] mb-[1.16rem] flex justify-between">
              <p className="font-medium">Ringkasan Belanja</p>
            </section>
            <section className="px-[2.25rem] mb-[1.13rem] flex justify-between">
              <p>Total Harga</p>
              <p>Rp.{total}</p>
            </section>
            <section className="px-[2.25rem] mb-[7rem] flex justify-between">
              <p>Total Pengiriman</p>
              <p>Rp.{selectedShipping.price}</p>
            </section>
            <div className="border-t-2 border-1 border-[#D9D9D9]"></div>
            <section className="p-[2.25rem] flex justify-between flex-row">
              <p>Total Pembayaran</p>
              <p>Rp.{total + selectedShipping.price}</p>
            </section>
            <div className="border-t-2 border-1 border-[#D9D9D9]"></div>
            <section className="p-[2.25rem] flex justify-end flex-row mb-[1rem]">
              <button onClick={payment} className="bg-[#677C52] text-white p-2 rounded-md">
                Buat Pesanan
              </button>
            </section>
          </div>
        </section>
      )}
      <div id="snap-container"></div>
    </div>
  );
};

export default CheckOut;