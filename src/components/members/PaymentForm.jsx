import { useState } from 'react';
import { createPayment } from '../../modules/fetch/members/userPayment';
import Snap from 'midtrans-client';

const PaymentForm = () => {
  const [provider, setProvider] = useState('MidTrans'); // Default to MidTrans
  const [noPayment, setNoPayment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
  
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
  
      // Create payment with formData
      const formData = new FormData();
      formData.append('provider', provider);
      formData.append('noPayment', noPayment); 
  
      const response = await createPayment(formData, token);
      const { transactionToken } = response;
  
      // Use Snap API to handle the payment process
      Snap.createTransaction(transactionToken.token, {
        onSuccess: function () {
          setIsLoading(false);
          setSuccessMessage('Payment successful!');
          setTimeout(() => {
            setSuccessMessage('');
          }, 5000);
        },
        onPending: function () {
          setIsLoading(false);
          setSuccessMessage('Payment is being processed.');
          setTimeout(() => {
            setSuccessMessage('');
          }, 5000);
        },
        onError: function () {
          setIsLoading(false);
          setError('Payment failed. Please try again.');
        },
        onClose: function () {
          setIsLoading(false);
          setError('Payment canceled.');
        },
      });
    } catch (error) {
      setIsLoading(false);
      setError('Payment failed. Please try again.');
    }
  };
  

  return (
    <div className="flowbite-container min-h-screen m-10">
      <div className="flowbite-row">
        <div className="flowbite-col-md-6">
          <h2>Payment Form</h2>
          {successMessage && (
            <div className="alert alert-success" role="alert" onClick={() => setSuccessMessage('')}>
              {successMessage}
            </div>
          )}
          {error && (
            <div className="alert alert-danger" role="alert" onClick={() => setError('')}>
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="provider">Provider:</label>
              <select
                id="provider"
                className="form-control"
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
              >
                <option value="MidTrans">Bank Transfer/Gopay/Shopeepay</option>
                {/* Add other payment providers as needed */}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="noPayment">Payment No:</label>
              <input
                type="text"
                id="noPayment"
                className="form-control"
                value={noPayment}
                onChange={(e) => setNoPayment(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? 'Processing Payment...' : 'Process Payment'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
