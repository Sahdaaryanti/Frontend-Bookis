import { useState } from 'react';

const PesanBuku = () => {
  const [pesanan, setPesanan] = useState({
    judul: '',
    jumlah: 0,
    totalHarga: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPesanan((prevPesanan) => ({
      ...prevPesanan,
      [name]: name === 'jumlah' ? parseInt(value) : value,
      totalHarga: name === 'jumlah' ? parseInt(value) * 10 : prevPesanan.totalHarga,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Proses logika pemesanan atau kirim data ke backend
    console.log('Pesanan terkirim:', pesanan);
    // Reset state setelah submit
    setPesanan({
      judul: '',
      jumlah: 0,
      totalHarga: 0,
    });
  };

  return (
    <div className="min-h-screen bg-[#FDF9EC] p-8">
      <h1 className="text-3xl font-semibold mb-6">Pesan Buku</h1>
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label htmlFor="judul" className="block text-gray-700 font-semibold mb-2">
            Judul Buku
          </label>
          <input
            type="text"
            id="judul"
            name="judul"
            value={pesanan.judul}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="jumlah" className="block text-gray-700 font-semibold mb-2">
            Jumlah Buku
          </label>
          <input
            type="number"
            id="jumlah"
            name="jumlah"
            value={pesanan.jumlah}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="totalHarga" className="block text-gray-700 font-semibold mb-2">
            Total Harga
          </label>
          <input
            type="text"
            id="totalHarga"
            name="totalHarga"
            value={pesanan.totalHarga}
            className="w-full px-4 py-2 border rounded-md bg-gray-100"
            readOnly
          />
        </div>
        <button
          type="submit"
          className="bg-[#677C52] text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Pesan Buku
        </button>
      </form>
    </div>
  );
};

export default PesanBuku;

