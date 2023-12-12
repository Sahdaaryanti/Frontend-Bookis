// // DeleteBuku.jsx
// import { useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { deleteBuku, getBukuById } from "../../modules/fetch/admins/buku";
// import { deleteFileBuku } from "../../modules/fetch/admins/fileBuku";

// const DeleteBuku = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBookDetails = async () => {
//       try {
//         const book = await getBukuById(id);
//         if (!window.confirm(`Are you sure you want to delete the book: ${book.judul}?`)) {
//           navigate("/admins/dashboard");
//         }
//       } catch (error) {
//         console.error("Error fetching book details:", error.message);
//       }
//     };

//     fetchBookDetails();
//   }, [id, navigate]);

//   const deleteBook = async () => {
//     try {
//       await deleteFileBuku.destroy({ where: { bukuId: id } });
//       await deleteBuku(id);
//       navigate("/admins/dashboard-buku");
//     } catch (error) {
//       console.error("Error deleting book:", error.message);
//       // Log the complete error object for detailed information
//       console.error("Complete error object:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white py-4">
//       <div className="m-4">
//         <h2 className="m-4 text-2xl font-bold mb-4">Delete Buku</h2>
//         <button onClick={deleteBook} className="bg-red-500 text-white p-2">
//           Confirm Delete
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DeleteBuku;
