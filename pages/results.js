import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Results() {
  const [loading, setLoading] = useState(false);
  const [previewUsers, setPreviewUsers] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    // Fetch the preview list when the component mounts
    async function fetchPreviewData() {
      try {
        const response = await fetch('/api/get-full-list?paid=false');
        const data = await response.json();
        
        if (data.previewList) {
          setPreviewUsers(data.previewList);
        }
      } catch (err) {
        console.error('Error fetching preview data:', err);
        setError('Failed to load results. Please try again.');
      } finally {
        setDataLoading(false);
      }
    }
    
    fetchPreviewData();
  }, []);
  
  const handlePayment = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
      });
      
      const { id } = await response.json();
      
      // Redirect to Stripe Checkout
      const stripe = window.Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
      await stripe.redirectToCheckout({ sessionId: id });
    } catch (error) {
      console.error('Payment error:', error);
      setLoading(false);
    }
  };
  
  if (dataLoading) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading your results...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-red-50 p-4 rounded-md border border-red-200 text-center">
          <h2 className="text-xl font-medium text-red-800 mb-2">Error</h2>
          <p className="text-red-700">{error}</p>
          <Link href="/upload">
            <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
              Try Again
            </button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Your Results</h1>
        <p className="text-gray-600 mb-6">
          {previewUsers.length > 0 
            ? `Here are ${previewUsers.length} users who don't follow you back:` 
            : "We couldn't find any users who don't follow you back."}
        </p>
        
        {previewUsers.length > 0 ? (
          <ul className="space-y-2 mb-6">
            {previewUsers.map((user, i) => (
              <li key={i} className="flex items-center p-2 border-b">
                <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 flex-shrink-0 flex items-center justify-center text-gray-500">
                  {user.charAt(0).toUpperCase()}
                </div>
                <div>
                  <span className="text-gray-800 font-medium">{user}</span>
                  <a 
                    href={`https://instagram.com/${user}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block text-sm text-blue-600 hover:underline"
                  >
                    View Profile
                  </a>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No users found. Everyone who you follow is following you back!
          </div>
        )}
        
        {previewUsers.length > 0 && (
          <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200 mb-6">
            <p className="text-yellow-800">
              <strong>Note:</strong> We found more users who don't follow you back! This is just a partial list.
            </p>
          </div>
        )}
      </div>
      
      {previewUsers.length > 0 && (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-6 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Unlock Your Complete List</h2>
          <p className="mb-6 opacity-90">Get the full detailed list of all users who don't follow you back</p>
          
          <ul className="mb-6 inline-block text-left">
            <li className="flex items-center mb-2">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
              </svg>
              See ALL users who don't follow you back
            </li>
            <li className="flex items-center mb-2">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
              </svg>
              Get direct links to each profile
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
              </svg>
              One-time payment, no subscription
            </li>
          </ul>
          
          <button 
            onClick={handlePayment}
            disabled={loading}
            className="px-8 py-3 bg-white text-purple-600 rounded-md text-lg font-medium shadow-md hover:bg-gray-100 transition"
          >
            {loading ? 'Processing...' : 'Unlock Full List for $5'}
          </button>
        </div>
      )}
    </div>
  );
}
