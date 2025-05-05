import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Results() {
  const [nonFollowers, setNonFollowers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showingPreview, setShowingPreview] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchResults() {
      try {
        const res = await fetch('/api/get-results');
        const data = await res.json();
        
        if (data.success) {
          setNonFollowers(showingPreview ? data.previewList : data.fullList);
        } else {
          setError('Failed to load results. Please try uploading your files again.');
        }
      } catch (err) {
        console.error('Error fetching results:', err);
        setError('Network error. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchResults();
  }, [showingPreview]);

  const filteredNonFollowers = nonFollowers.filter(username => 
    username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUnlockFull = () => {
    router.push('/payment');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Head>
        <title>Your Instagram Non-Followers - Follow Check Pro</title>
        <meta name="description" content="See who doesn't follow you back on Instagram" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-transparent bg-clip-text">
                Follow Check Pro
              </h1>
            </Link>
            <nav className="hidden md:flex space-x-8 items-center">
              <Link href="/upload" className="text-gray-600 hover:text-pink-500 font-medium">
                Upload New Files
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Results Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-3">Your Instagram Non-Followers</h1>
            <p className="text-gray-600 text-lg">
              Here are the people who don't follow you back
            </p>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 border-4 border-gray-200 border-t-pink-500 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600 text-lg">Loading your results...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <svg className="w-12 h-12 text-red-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
              </svg>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{error}</h2>
              <Link href="/upload">
                <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                  Try Again
                </button>
              </Link>
            </div>
          ) : (
            <>
              {/* Results Card */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                {/* Progress Bar - Top of card */}
                <div className="h-1.5 w-full bg-gray-200">
                  <div className="h-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 w-full"></div>
                </div>
                
                <div className="p-6">
                  {/* Search Bar */}
                  <div className="mb-6">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                      <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                        placeholder="Search usernames..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Results Count */}
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-gray-600">
                      {showingPreview ? (
                        <span>Showing <span className="font-medium text-pink-600">{filteredNonFollowers.length}</span> of <span className="font-medium text-pink-600">10</span> non-followers</span>
                      ) : (
                        <span>Found <span className="font-medium text-pink-600">{filteredNonFollowers.length}</span> non-followers</span>
                      )}
                    </p>
                    {showingPreview && (
                      <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full font-medium">
                        Preview
                      </span>
                    )}
                  </div>

                  {/* Results List */}
                  {filteredNonFollowers.length > 0 ? (
                    <div className="space-y-3 mb-6">
                      {filteredNonFollowers.map((username, index) => (
                        <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {username.charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-3 flex-grow">
                            <p className="text-gray-800 font-medium">{username}</p>
                          </div>
                          <a 
                            href={`https://instagram.com/${username}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-pink-500 hover:text-pink-700 text-sm font-medium flex items-center"
                          >
                            View Profile
                            <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                            </svg>
                          </a>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                      </svg>
                      <p className="text-gray-600">No matching results found</p>
                    </div>
                  )}

                  {/* Preview Message */}
                  {showingPreview && (
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-purple-700">
                            <span className="font-medium">This is a preview.</span> You're seeing only the first 10 non-followers. Unlock the full list to see everyone who doesn't follow you back.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Unlock Full Results CTA */}
              {showingPreview && (
                <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 rounded-xl shadow-lg overflow-hidden">
                  <div className="px-6 py-8 sm:p-10 sm:pb-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-2xl leading-8 font-bold text-white">Unlock Full Results</h3>
                        <div className="mt-2 text-base text-purple-100">Get access to your complete list of non-followers</div>
                      </div>
                      <div className="bg-white rounded-full p-2 flex items-center justify-center">
                        <svg className="h-6 w-6 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 pt-6 pb-8 bg-white sm:p-10 sm:pt-6">
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="h-6 w-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                          </svg>
                        </div>
                        <p className="ml-3 text-base text-gray-700">
                          <span className="font-medium text-gray-900">Complete list</span> of all users who don't follow you back
                        </p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="h-6 w-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                          </svg>
                        </div>
                        <p className="ml-3 text-base text-gray-700">
                          <span className="font-medium text-gray-900">Direct links</span> to each Instagram profile
                        </p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="h-6 w-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                          </svg>
                        </div>
                        <p className="ml-3 text-base text-gray-700">
                          <span className="font-medium text-gray-900">One-time payment</span> - no subscription required
                        </p>
                      </li>
                    </ul>
                    <div className="mt-8">
                      <div className="rounded-lg shadow-md">
                        <button
                          onClick={handleUnlockFull}
                          className="block w-full text-center rounded-lg border border-transparent bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 px-6 py-4 text-xl leading-6 font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors"
                        >
                          Unlock Full Results - $5.00
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-sm text-gray-500">
                        Secure payment processed by Stripe
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Upload New Files Button */}
              <div className="mt-8 text-center">
                <Link href="/upload">
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                    <svg className="mr-2 -ml-1 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"></path>
                    </svg>
                    Upload New Files
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-transparent bg-clip-text">
                Follow Check Pro
              </Link>
            </div>
            <div className="flex space-x-6">
              <Link href="/" className="text-gray-500 hover:text-pink-500">Home</Link>
              <Link href="/upload" className="text-gray-500 hover:text-pink-500">Upload</Link>
              <Link href="/instructions" className="text-gray-500 hover:text-pink-500">Instructions</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
