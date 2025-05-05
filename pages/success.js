import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Success() {
  const router = useRouter();
  const { session_id } = router.query;
  
  useEffect(() => {
    // Redirect to full results if session_id is present
    if (session_id) {
      router.push(`/full-results?session_id=${session_id}`);
    }
    
    // If no session_id after 3 seconds, redirect to home
    const timer = setTimeout(() => {
      if (!session_id) {
        router.push('/');
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [session_id, router]);
  
  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <div className="bg-green-50 rounded-lg p-8 shadow-md">
        <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
        </svg>
        <h1 className="text-2xl font-bold text-green-800 mb-2">Payment Successful!</h1>
        <p className="text-green-700 mb-6">Thank you for your purchase. We're redirecting you to your full results.</p>
        <div className="animate-pulse">
          <div className="w-8 h-8 bg-green-200 rounded-full mx-auto"></div>
        </div>
      </div>
    </div>
  );
} 