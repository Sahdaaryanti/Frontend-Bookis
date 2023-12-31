// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import {
//   getBukuByKategori,
//   getBukuTerbaru,
//   getBukuPopuler,
// } from "../../modules/fetch/admins/buku";
// import BookCard from "../../components/admins/BookCard";

// const KategoriBuku = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResult, setSearchResult] = useState([]);
//   const [error, setError] = useState("");
//   const [populer, setPopuler] = useState([]);
//   const [rekomendasi, setRekomendasi] = useState([]);

//   useEffect(() => {
//     getBukuPopuler()
//       .then((response) => {
//         setPopuler(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching popular books:", error.message);
//       });

//     getBukuTerbaru()
//       .then((response) => {
//         setRekomendasi(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching recommended books:", error.message);
//       });
//   }, []);

//   const handleSearch = async (e) => {
//     e.preventDefault();

//     try {
//       const result = await getBukuByKategori(searchQuery);
//       setSearchResult(result.data);
//       setError("");
//     } catch (error) {
//       console.error("Error searching books by category:", error.message);
//       setError(
//         `Mohon Maaf, Buku Dengan Kategori ${searchQuery} Tidak Ditemukan!!!`
//       );
//       setSearchResult([]);
//     }
//   };

//   return (
//     <div className="min-h-screen p-4">
//       <form onSubmit={handleSearch} className="mt-4 flex items-center">
//         <input
//           type="search"
//           id="search-category"
//           className="flex-1 p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
//           placeholder="Search your book with Category..."
//           required
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         ></input>
//         <button
//           type="submit"
//           className="p-2.5 z-20 text-sm font-medium h-full text-white bg-[#677C52] hover:bg-[#8FA778] focus:ring-4 focus:outline-none rounded-r-lg focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//         >
//           <svg
//             className="w-4 h-4"
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 20 20"
//           >
//             <path
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
//             />
//           </svg>
//         </button>
//       </form>

//       {error && (
//         <h2 className="m-4 text-2xl font-bold text-gray-900 dark:text-white">
//           {error}
//         </h2>
//       )}

//       {searchResult.length > 0 && (
//         <div>
//           <h2 className="m-4 text-2xl font-bold text-gray-900 dark:text-white">
//             Search Results For Product With Category {searchQuery}:
//           </h2>
//           <div className="ml-4 mr-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//             {searchResult.map((book) => (
//               <BookCard key={book.id} book={book} />
//             ))}
//           </div>
//         </div>
//       )}

//       <div className="m-4">
//         <div>
//           <h2 className="m-4 text-2xl font-bold mb-4">
//             Buku-Buku Populer Untuk Anda:
//           </h2>
//           <div className="mt-4">
//             <Link to="/admins/buku-populer" className="m-4 text-blue-500 block">
//               Lihat Semua
//             </Link>
//           </div>
//           <div className="ml-4 mr-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
//             {populer.map((book) => (
//               <BookCard key={book.id} book={book} />
//             ))}
//           </div>
//         </div>

//         <div className="mt-8">
//           <h2 className="m-4 text-2xl font-bold mb-4">
//             Rekomendasi Buku Untuk Anda:
//           </h2>
//           <div className="mt-4">
//             <Link
//               to="/admins/buku-rekomendasi"
//               className="m-4 text-blue-500 block"
//             >
//               Lihat Semua
//             </Link>
//           </div>
//           <div className="ml-4 mr-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
//             {rekomendasi.map((book) => (
//               <BookCard key={book.id} book={book} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default KategoriBuku;


// AdminKategoriPage.jsx

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CategoryForm from "../../components/admins/KategoriForm";
import {
  getAllKategoris,
  createKategoris,
  updateKategoris,
  deleteKategoris,
} from "../../modules/fetch/admins/kategori";

const AdminKategoriPage = () => {
  const [kategoris, setKategoris] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isCreateMode, setCreateMode] = useState(true);
  // const navigate = useNavigate();

  useEffect(() => {
    // Fetch all categories when the component mounts
    fetchAllKategoris();
  }, []);

  const fetchAllKategoris = async () => {
    try {
      const allKategoris = await getAllKategoris();
      setKategoris(allKategoris);
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  };

  const handleCreateCategory = async (formData) => {
    try {
      await createKategoris(formData);
      // Refresh the category list after creating a new category
      fetchAllKategoris();
      // Reset the form
      setSelectedCategory(null);
      setCreateMode(true);
    } catch (error) {
      console.error("Error creating category:", error.message);
    }
  };

  const handleUpdateCategory = async (formData) => {
    try {
      if (selectedCategory) {
        await updateKategoris(selectedCategory.id, formData);
        // Refresh the category list after updating a category
        fetchAllKategoris();
        // Reset the form and exit update mode
        setSelectedCategory(null);
        setCreateMode(true);
      }
    } catch (error) {
      console.error("Error updating category:", error.message);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      if (window.confirm("Are you sure you want to delete this category?")) {
        await deleteKategoris(categoryId);
        // Refresh the category list after deleting a category
        fetchAllKategoris();
        // Reset the form and exit update mode
        setSelectedCategory(null);
        setCreateMode(true);
      }
    } catch (error) {
      console.error("Error deleting category:", error.message);
    }
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setCreateMode(false);
  };

  return (
    <div className="min-h-screen p-4">
      <div className="mb-4">
        <Link to="/admins/dashboard" className="text-blue-500">
          Back to Dashboard
        </Link>
      </div>
      <h1 className="text-3xl font-semibold mb-4">Manage Categories</h1>
      <div className="max-w-md">
        <CategoryForm
          onSubmit={isCreateMode ? handleCreateCategory : handleUpdateCategory}
          initialData={selectedCategory}
        />
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Categories:</h2>
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">Nama</th>
              <th className="border p-2">Deskripsi</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {kategoris.map((category, index) => (
              <tr key={category.id}>
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{category.nama}</td>
                <td className="border p-2">{category.deskripsi}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleEditCategory(category)}
                    className="ml-2 bg-blue-500 text-white p-2 ml-auto "
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="ml-2 bg-red-500 text-white p-2 ml-auto"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminKategoriPage;