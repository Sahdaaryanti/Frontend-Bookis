import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getAllPenulis } from "../../modules/fetch/members/penulis";
import { getAllFileBuku } from "../../modules/fetch/members/fileBuku";

const BukuCard = ({ book }) => {
  const [penulis, setPenulis] = useState({});
  const [fileBuku, setFileBuku] = useState({});

  useEffect(() => {
    const fetchPenulis = async () => {
      try {
        const penulisData = await getAllPenulis();
        const penulisBook = penulisData.find((p) => p.id === book.penulisId);
        setPenulis(penulisBook || {});
      } catch (error) {
        console.error("Error fetching penulis:", error.message);
      }
    };

    const fetchFileBuku = async () => {
      try {
        const fileBukuData = await getAllFileBuku();
        console.log("fileBukuData:", fileBukuData);

        // Periksa apakah file bukuData bukan array kosong
        if (Array.isArray(fileBukuData) && fileBukuData.length > 0) {
          const fileBukuBook = fileBukuData.find(
            (file) => file.bukuId === book.id
          );
          setFileBuku(fileBukuBook || {});
        } else {
          console.error("File buku data tidak valid atau kosong");
        }
      } catch (error) {
        console.error("Error fetching file buku:", error.message);
      }
    };

    fetchPenulis();
    fetchFileBuku();
  }, [book.penulisId, book.id]);

  return (
    <div className="bg-[#FDF9EC] border border-black p-4 rounded-md shadow">
      <Link to={`/users/detail-buku/${book.id}`}>
        <h2 className="text-xl font-bold mb-2 text-center">{book.judul}</h2>
        {fileBuku && fileBuku.urlFile && (
           <img
           src={`${fileBuku.urlFile}`}
           className="mb-4 object-cover w-full h-48 lg:h-64 rounded-md justify-center"
           alt={`Cover ${book.judul}`}
         />
        )}
      </Link>
      <p className="text-gray-500 mb-2 text-center">{penulis.nama}</p>
      <p className="text-gray-500 mb-2 text-center">{book.tahunTerbit}</p>
      <p className="text-lg text-[#3046BC] font-bold text-right">
        Rp {book.harga}
      </p>
    </div>
  );
};

// Define prop types for the component
BukuCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number.isRequired,
    cover: PropTypes.string.isRequired,
    judul: PropTypes.string.isRequired,
    penulisId: PropTypes.number.isRequired,
    tahunTerbit: PropTypes.number.isRequired,
    harga: PropTypes.number.isRequired,
  }).isRequired,
};

export default BukuCard;
