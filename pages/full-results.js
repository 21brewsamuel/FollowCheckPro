import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function FullResults() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  
  useEffect(() => {
    const { session_id } = router.query;
    
    if (session_id) {
      verifyPayment(session_id);
    } else if (router.isReady) {
      // If no session_id is present but the router is ready, redirect to results
      router.push('/results');
    }
  }, [router.query, router.isReady]);
  
  const verifyPayment = async (sessionId) => {
    try {
      const res = await fetch(`/api/verify-payment?session_id=${sessionId}`);
      const data = await res.json();
      
      if (data.paid) {
        fetchFullList();
      } else {
        setError('Payment verification failed. Please try again.');
        setLoading(false);
      }
    } catch (err) {
      setError('Error verifying payment. Please try again.');
      setLoading(false);
    }
  };
  
  const fetchFullList = async () => {
    try {
      const res = await fetch('/api/get-full-list?paid=true');
      const data = await res.json();
      
      setUsers(data.fullList || []);
      setLoading(false);
    } catch (err) {
      setError('Error fetching results. Please try again.');
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading your complete results...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-red-50 p-4 rounded-md border border-red-200 text-center">
          <h2 className="text-xl font-medium text-red-800 mb-2">Error</h2>
          <p className="text-red-700">{error}</p>
          <Link href="/results">
            <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
              Back to Results
            </button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Your Full Results</h1>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            Premium Access
          </span>
        </div>
        
        <p className="text-gray-600 mb-6">
          {users.length > 0 
            ? `Here's the complete list of ${users.length} users who don't follow you back:` 
            : "We couldn't find any additional users who don't follow you back."}
        </p>
        
        {users.length > 0 ? (
          <ul className="divide-y">
            {users.map((user, i) => (
              <li key={i} className="flex items-center py-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 flex-shrink-0 flex items-center justify-center text-gray-500">
                  {user.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-gray-800 font-medium">{user}</p>
                  <a 
                    href={`https://instagram.com/${user}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View Profile
                  </a>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500 py-8">No additional users found</p>
        )}
        
        <div className="mt-8 text-center">
          <Link href="/">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
} 