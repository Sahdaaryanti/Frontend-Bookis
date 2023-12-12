import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RiwayatPesanan = () => {
  const [riwayatPesanan, setRiwayatPesanan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRiwayat = async () => {
      try {
        const response = await fetch(`http://localhost:3000/payment/user/${localStorage.getItem('userId')}`);
        const data = await response.json();

        setRiwayatPesanan(data.paymentStatusResults);
        console.log(data.paymentStatusResults)
      } catch (error) {
        console.error(error);
        setError("Error fetching data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getRiwayat();
  }, []);

  const getStatusColor = (status) => {
  
    switch (status.toLowerCase()) {
      case 'authorize':
      case 'capture':
      case 'cancel':
        return 'bg-green-100 text-green-800 me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300';
        case 'settlement':
        return 'bg-green-600 text-white me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300';
      case 'refund':
      case 'chargeback':
      case 'partial_refund':
      case 'partial_chargeback':
        return 'bg-blue-100 text-blue-800 me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300';
      case 'deny':
      case 'expire':
      case 'failure':
        return 'bg-red-100 text-red-800 me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'bg-blue-100 text-blue-800 me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300';
    }
  };

  if (loading) {
    return <p>Loading...</p>; // You can replace this with a loading spinner or any other loading indicator
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="min-h-screen bg-[#FDF9EC] p-8 overflow-x-auto">
      <h1 className="text-3xl font-semibold mb-6">Riwayat Pesanan Buku</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b sm:px-6">Order</th>
            <th className="py-2 px-4 border-b sm:px-6">Status Pembayaran</th>
            <th className="py-2 px-4 border-b sm:px-6">Total Harga</th>
          </tr>
        </thead>
        <tbody>
          {riwayatPesanan.length !== 0 && (
            riwayatPesanan.map((pesanan, index) => (
              <tr key={index} className="text-center">
                <td className="py-2 px-4 border-b">
                  <Link to="/users/payment" state={{paymentToken:pesanan.payment.noPayment}} className="sm:text-sm">
                    {pesanan.payment.id}
                  </Link>
                </td>
                <td className="border-b">
                  <span className={`${getStatusColor(pesanan.status === 'error' ? 'error' :pesanan.status.transaction_status)}`}>
                      {pesanan.status === 'error' ? 'error' :pesanan.status.transaction_status }
                  </span>
                </td>
                <td className="py-2 px-4 border-b">Rp.{pesanan.status.gross_amount}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RiwayatPesanan;
