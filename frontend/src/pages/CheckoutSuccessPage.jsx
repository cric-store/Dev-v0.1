import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2, ShoppingBag, Home } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CheckoutSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [status, setStatus] = useState('loading');
  const [paymentData, setPaymentData] = useState(null);
  const { clearCart } = useCart();

  useEffect(() => {
    if (!sessionId) {
      setStatus('error');
      return;
    }

    const pollPaymentStatus = async (attempts = 0) => {
      const maxAttempts = 10;
      const pollInterval = 2000;

      if (attempts >= maxAttempts) {
        setStatus('timeout');
        return;
      }

      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/checkout/status/${sessionId}`
        );

        if (!response.ok) {
          throw new Error('Failed to check payment status');
        }

        const data = await response.json();
        setPaymentData(data);

        if (data.payment_status === 'paid') {
          setStatus('success');
          clearCart(); // Clear cart on successful payment
          return;
        } else if (data.status === 'expired') {
          setStatus('expired');
          return;
        }

        // Continue polling if still pending
        setTimeout(() => pollPaymentStatus(attempts + 1), pollInterval);
      } catch (error) {
        console.error('Error checking payment status:', error);
        if (attempts >= maxAttempts - 1) {
          setStatus('error');
        } else {
          setTimeout(() => pollPaymentStatus(attempts + 1), pollInterval);
        }
      }
    };

    pollPaymentStatus();
  }, [sessionId, clearCart]);

  const formatPrice = (amount, currency = 'CAD') => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: currency.toUpperCase(),
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount / 100); // Stripe returns amount in smallest currency unit
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          {status === 'loading' && (
            <>
              <Loader2 size={64} className="mx-auto text-emerald-500 animate-spin mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Processing Payment...</h1>
              <p className="text-gray-500">Please wait while we confirm your payment.</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="w-20 h-20 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle size={48} className="text-emerald-500" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
              <p className="text-gray-500 mb-6">
                Thank you for your purchase. Your order has been confirmed.
              </p>
              
              {paymentData && (
                <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
                  <p className="text-sm text-gray-500 mb-1">Order Total</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatPrice(paymentData.amount_total, paymentData.currency)}
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-400 to-green-500 text-white font-bold rounded-xl hover:shadow-lg transition-all"
                >
                  <Home size={20} />
                  Continue Shopping
                </Link>
              </div>
            </>
          )}

          {(status === 'error' || status === 'expired' || status === 'timeout') && (
            <>
              <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-6">
                <XCircle size={48} className="text-red-500" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {status === 'expired' ? 'Payment Expired' : 'Payment Issue'}
              </h1>
              <p className="text-gray-500 mb-6">
                {status === 'expired'
                  ? 'Your payment session has expired. Please try again.'
                  : status === 'timeout'
                  ? 'We could not confirm your payment. Please check your email for confirmation.'
                  : 'There was an issue with your payment. Please try again.'}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/cart"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-400 to-green-500 text-white font-bold rounded-xl hover:shadow-lg transition-all"
                >
                  <ShoppingBag size={20} />
                  Return to Cart
                </Link>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all"
                >
                  <Home size={20} />
                  Go Home
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutSuccessPage;
