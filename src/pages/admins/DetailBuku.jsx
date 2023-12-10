import { useEffect, useState } from "react";
import { getBukuById } from "../../modules/fetch/admins/buku";
import { getAllPenulis } from "../../modules/fetch/admins/penulis";
import { getAllPenerbit } from "../../modules/fetch/admins/penerbit";
import { getAllFileBuku } from "../../modules/fetch/admins/fileBuku";
import { getAllStocks } from "../../modules/fetch/admins/gudang";
import { Link, useParams } from "react-router-dom";

const DetailBuku = () => {
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
            const stockBook = stockData.find((stock) => stock.bukuId === result.id);
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

  return (
    <div className="min-h-screen p-4 mx-auto">
      {detailBuku ? (
        <div className="items-start">
          <h2 className="text-3xl font-bold mb-4 text-center">
            {detailBuku.judul}
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center">
            {fileBuku && fileBuku.urlFile && (
              <img
                src={`https://backed-bookis-production-c128.up.railway.app/${fileBuku.urlFile}`}
                className="w-full md:w-64 h-96 object-cover mb-4 md:mr-10"
                alt={`Cover ${detailBuku.judul}`}
              />
            )}
            {/* <img src={detailBuku.gambarUrl} className="w-full md:w-64 h-96 object-cover mb-4 md:mr-10" /> */}
            <div className="ml-0 md:ml-10">
              <p>Penulis: {penulis.nama}</p>
              <p>Penerbit: {penerbit.nama}</p>
              <p>ISBN: {detailBuku.isbn}</p>
              <p>Tahun Terbit: {detailBuku.tahunTerbit}</p>
              <p className="mt-4 text-lg text-[#3046BC] font-bold mb-2">
                Harga: {detailBuku.harga}
              </p>
              {stock && (
            <div>
              <h3 className="text-xl font-bold mb-2">Stok Buku:</h3>
              <p>{stock.stok || "N/A"}</p>
            </div>
          )}
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button className="bg-[#677C52] text-white p-2 rounded m-5">
              <Link to={`/admins/update-buku/${detailBuku.id}`}>edit buku</Link>
            </button>
            <button className="bg-red-500 text-white p-2 rounded m-5">
              <Link to={`/admins/update-buku/${detailBuku.id}`}>
                delete buku
              </Link>
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DetailBuku;
