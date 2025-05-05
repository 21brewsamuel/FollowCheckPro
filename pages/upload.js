import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Upload() {
  const [followersFile, setFollowersFile] = useState(null);
  const [followingFile, setFollowingFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!followersFile || !followingFile) {
      setError('Please upload both files');
      return;
    }

    setIsLoading(true);
    setError('');
    
    const formData = new FormData();
    formData.append('followers', followersFile);
    formData.append('following', followingFile);

    try {
      const res = await fetch('/api/parse-files', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        router.push('/results');
      } else {
        setError(data.message || 'Error processing files. Please check your uploads.');
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Upload Your Instagram Files</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Followers File</label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
              {followersFile ? (
                <div className="text-green-600">
                  <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <p>{followersFile.name}</p>
                  <button 
                    type="button"
                    onClick={() => setFollowersFile(null)}
                    className="text-sm text-red-600 hover:underline mt-2"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  <p className="text-gray-500 mb-2">Upload <span className="font-medium">followers_1.html</span></p>
                  <input 
                    id="followers-file" 
                    type="file" 
                    onChange={(e) => setFollowersFile(e.target.files[0])} 
                    accept=".html" 
                    className="hidden" 
                  />
                  <label 
                    htmlFor="followers-file"
                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700"
                  >
                    Browse Files
                  </label>
                </>
              )}
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Following File</label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
              {followingFile ? (
                <div className="text-green-600">
                  <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <p>{followingFile.name}</p>
                  <button 
                    type="button"
                    onClick={() => setFollowingFile(null)}
                    className="text-sm text-red-600 hover:underline mt-2"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  <p className="text-gray-500 mb-2">Upload <span className="font-medium">following.html</span></p>
                  <input 
                    id="following-file" 
                    type="file" 
                    onChange={(e) => setFollowingFile(e.target.files[0])} 
                    accept=".html" 
                    className="hidden" 
                  />
                  <label 
                    htmlFor="following-file"
                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700"
                  >
                    Browse Files
                  </label>
                </>
              )}
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={isLoading || !followersFile || !followingFile}
            className={`w-full px-6 py-3 ${isLoading || !followersFile || !followingFile ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-md text-lg shadow transition`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : 'Process Files'}
          </button>
        </form>
      </div>

      <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
        <h2 className="text-lg font-medium text-blue-800 mb-2">Not sure how to get these files?</h2>
        <p className="text-blue-700 mb-2">Follow our step-by-step instructions to download your Instagram data.</p>
        <Link href="/instructions">
          <button className="text-blue-600 font-medium hover:underline">
            View Instructions →
          </button>
        </Link>
      </div>
    </div>
  );
}
