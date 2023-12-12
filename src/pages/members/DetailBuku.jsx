import { useEffect, useState } from "react";
import { getBukuById } from "../../modules/fetch/members/Buku";
import { getAllPenulis } from "../../modules/fetch/members/penulis";
import { getAllPenerbit } from "../../modules/fetch/members/penerbit";
import { getAllFileBuku } from "../../modules/fetch/members/fileBuku";
import { getAllStocks } from "../../modules/fetch//members/gudang";
import { useParams, useNavigate } from "react-router-dom";
import { instance } from "../../modules/axios/index";

const DetailBuku = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [detailBuku, setDetailBuku] = useState(null);
  const [penulis, setPenulis] = useState({});
  const [penerbit, setPenerbit] = useState({});
  const [fileBuku, setFileBuku] = useState({});
  const [stock, setStock] = useState(null);

  useEffect(() => {
    const fetchBookAndPenulis = async () => {
      try {
        const result = await getBukuById(id);
        setDetailBuku(result);

        if (result) {
          const penulisData = await getAllPenulis();
          const penulisBook = penulisData.find(
            (p) => p.id === result.penulisId
          );
          setPenulis(penulisBook || {});

          const penerbitData = await getAllPenerbit();
          const penerbitBook = penerbitData.find(
            (p) => p.id === result.penerbitId
          );
          setPenerbit(penerbitBook || {});

          // Ambil data file buku
          const fileBukuData = await getAllFileBuku();
          console.log("fileBukuData:", fileBukuData);

          // Periksa apakah file bukuData bukan array kosong
          if (Array.isArray(fileBukuData) && fileBukuData.length > 0) {
            const fileBukuBook = fileBukuData.find(
              (file) => file.bukuId === result.id
            );
            setFileBuku(fileBukuBook || {});
          } else {
            console.error("File buku data tidak valid atau kosong");
          }

          const stockData = await getAllStocks();

          // Check if stockData is an array and not empty
          if (Array.isArray(stockData) && stockData.length > 0) {
            const stockBook = stockData.find(
              (stock) => stock.bukuId === result.id
            );
            setStock(stockBook || {});
          } else {
            console.error("Stock data tidak valid atau kosong");
          }
        }
      } catch (error) {
        console.error("Error fetching book details:", error.message);
      }
    };

    fetchBookAndPenulis();
  }, [id]);

  const addToCart = async () => {
    try {
      console.log("Before axios post"); 
      const response = await instance.post(
        "/cart/cart/add",
        {
          bukuId: detailBuku.id,
          jumlah: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("After axios post");

      if (response) {
        console.log("response:", response);
        navigate("/users/keranjang"); 
      }
    } catch (error) {
      console.error("Error adding to cart:", error.message);
    }
  }

  return (
    <div className="min-h-screen bg-[#FDF9EC] p-4 mx-auto">
      {detailBuku ? (
        <div className="items-start">
          <div className="mr-4 md:mr-0 md:flex justify-end md:self-start md:mb-4">
            {/* Logo Keranjang */}
            <div onClick={addToCart}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              className="mt-10 mb-4 md:mr-4 md:mt-0"
              style={{ alignSelf: "flex-end", marginRight: "4px" }}
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 14C18.2175 14.0001 18.4291 13.9292 18.6027 13.7982C18.7763 13.6672 18.9024 13.4832 18.962 13.274L20.962 6.274C21.0044 6.12518 21.0117 5.96855 20.9833 5.81644C20.9549 5.66433 20.8916 5.52089 20.7983 5.3974C20.7051 5.27391 20.5844 5.17374 20.4459 5.10479C20.3074 5.03583 20.1547 4.99996 20 5H6.77L6.175 2.745C6.11869 2.53148 5.99329 2.3426 5.81836 2.20783C5.64344 2.07307 5.42882 1.99999 5.208 2H4C3.73478 2 3.48043 2.10536 3.29289 2.29289C3.10536 2.48043 3 2.73478 3 3C3 3.26522 3.10536 3.51957 3.29289 3.70711C3.48043 3.89464 3.73478 4 4 4H4.438L5.038 6.255V6.265V6.274L7.038 13.274L7.784 16.26C7.29013 16.479 6.86456 16.8272 6.55222 17.268C6.23988 17.7088 6.05237 18.2258 6.00947 18.7643C5.96658 19.3028 6.0699 19.843 6.30853 20.3276C6.54715 20.8123 6.91223 21.2236 7.3652 21.5179C7.81818 21.8123 8.34224 21.9789 8.88206 22.0002C9.42188 22.0214 9.95741 21.8965 10.4321 21.6386C10.9068 21.3807 11.3031 20.9994 11.579 20.535C11.855 20.0706 12.0005 19.5402 12 19C11.9967 18.6586 11.9344 18.3203 11.816 18H14.184C14.0656 18.3203 14.0033 18.6586 14 19C14 19.5933 14.1759 20.1734 14.5056 20.6667C14.8352 21.1601 15.3038 21.5446 15.8519 21.7716C16.4001 21.9987 17.0033 22.0581 17.5853 21.9424C18.1672 21.8266 18.7018 21.5409 19.1213 21.1213C19.5409 20.7018 19.8266 20.1672 19.9424 19.5853C20.0581 19.0033 19.9987 18.4001 19.7716 17.8519C19.5446 17.3038 19.1601 16.8352 18.6667 16.5056C18.1734 16.1759 17.5933 16 17 16H9.78L9.28 14H18Z"
                fill="currentColor"
              />
            </svg>
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4 text-center">
            {detailBuku.judul}
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center">
            {fileBuku && fileBuku.urlFile && (
              <img
              src={`${fileBuku.urlFile}`}
              className="w-full md:w-64 h-96 object-cover mb-4 md:mr-10 max-w-full"
              // alt={Cover ${book.judul}}
            />
            )}
            {/* <img src={detailBuku.gambarUrl} className="w-full md:w-64 h-96 object-cover mb-4 md:mr-10" /> */}
            <div className="ml-0 md:ml-10">
              <p>Penulis: {penulis.nama}</p>
              <p>Penerbit: {penerbit.nama}</p>
              <p>ISBN: {detailBuku.isbn}</p>
              <p>Tahun Terbit: {detailBuku.tahunTerbit}</p>
              {stock && (
                <div>
                  <p className="">Stok Buku: {stock.stok || "N/A"}</p>
                </div>
              )}
              <p className="mt-4 text-lg text-[#3046BC] font-bold mb-2">
                Harga: {detailBuku.harga}
              </p>
            </div>
          </div>
          {/* <div className="flex justify-center mt-4">
            <button className="bg-[#677C52] text-white p-2 rounded m-5">
              <Link to="/users/shop">Buy Now</Link>
            </button>
          </div> */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DetailBuku;
