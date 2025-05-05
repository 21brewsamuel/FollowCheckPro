import Link from 'next/link';
import Head from 'next/head';

export default function Instructions() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Head>
        <title>How to Download Instagram Data - Follow Check Pro</title>
        <meta name="description" content="Step-by-step instructions to download your Instagram followers and following data" />
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
                Upload Files
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-3">How to Download Your Instagram Data</h1>
            <p className="text-gray-600 text-lg">
              Follow these simple steps to download your followers and following data from Instagram
            </p>
          </div>

          {/* Instructions Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-10">
            {/* Progress Bar - Top of card */}
            <div className="h-1.5 w-full bg-gray-200">
              <div className="h-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 w-full"></div>
            </div>
            
            <div className="p-8">
              <div className="space-y-12">
                {/* Step 1 */}
                <div className="relative">
                  <div className="absolute left-0 top-0 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold text-lg">
                    1
                  </div>
                  <div className="ml-16">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Log in to Instagram</h2>
                    <p className="text-gray-600 mb-4">
                      Go to <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-700 underline">instagram.com</a> or open your Instagram app and log in to your account.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative">
                  <div className="absolute left-0 top-0 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 text-white font-bold text-lg">
                    2
                  </div>
                  <div className="ml-16">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Go to Accounts Center</h2>
                    <p className="text-gray-600 mb-4">
                      Click on your profile picture, then go to "Settings and privacy" from the menu. From there, scroll down and tap on "Accounts Center".
                    </p>
                    <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                      <div className="flex items-start">
                        <svg className="h-5 w-5 text-purple-600 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                        </svg>
                        <p className="text-sm text-purple-700">
                          The Accounts Center is where you manage settings that connect across Instagram, Facebook, and Messenger.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative">
                  <div className="absolute left-0 top-0 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 text-white font-bold text-lg">
                    3
                  </div>
                  <div className="ml-16">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Your information and permissions</h2>
                    <p className="text-gray-600 mb-4">
                      In the Accounts Center, tap on "Your information and permissions" to access data download options.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="relative">
                  <div className="absolute left-0 top-0 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-green-500 text-white font-bold text-lg">
                    4
                  </div>
                  <div className="ml-16">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Download your information</h2>
                    <p className="text-gray-600 mb-4">
                      Select "Download your information" from the menu options.
                    </p>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="relative">
                  <div className="absolute left-0 top-0 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-blue-500 text-white font-bold text-lg">
                    5
                  </div>
                  <div className="ml-16">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Download or transfer information</h2>
                    <p className="text-gray-600 mb-4">
                      Tap on "Download or transfer information" to proceed with downloading your data.
                    </p>
                  </div>
                </div>

                {/* Step 6 */}
                <div className="relative">
                  <div className="absolute left-0 top-0 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white font-bold text-lg">
                    6
                  </div>
                  <div className="ml-16">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Select "Some of your information"</h2>
                    <p className="text-gray-600 mb-4">
                      Choose "Some of your information" to select specific data types to download.
                    </p>
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                      <div className="flex items-start">
                        <svg className="h-5 w-5 text-blue-600 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                        </svg>
                        <p className="text-sm text-blue-700">
                          This option allows you to download only the specific data you need rather than your entire account history.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 7 */}
                <div className="relative">
                  <div className="absolute left-0 top-0 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white font-bold text-lg">
                    7
                  </div>
                  <div className="ml-16">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Select "Followers and following"</h2>
                    <p className="text-gray-600 mb-4">
                      From the list of information types, select "Followers and following" to download only this specific data.
                    </p>
                    <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100 mb-4">
                      <div className="flex items-start">
                        <svg className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                        </svg>
                        <p className="text-sm text-yellow-800">
                          <span className="font-medium">Important:</span> Make sure to select HTML format when prompted, not JSON. Our tool only works with HTML files.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 8 */}
                <div className="relative">
                  <div className="absolute left-0 top-0 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold text-lg">
                    8
                  </div>
                  <div className="ml-16">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Choose "Download to device"</h2>
                    <p className="text-gray-600 mb-4">
                      Select "Download to device" as your download method.
                    </p>
                  </div>
                </div>

                {/* Step 9 */}
                <div className="relative">
                  <div className="absolute left-0 top-0 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 text-white font-bold text-lg">
                    9
                  </div>
                  <div className="ml-16">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Create files</h2>
                    <p className="text-gray-600 mb-4">
                      Tap "Create files" to begin the process. Instagram will prepare your data and notify you when it's ready to download.
                    </p>
                    <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                      <div className="flex items-start">
                        <svg className="h-5 w-5 text-green-600 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                        </svg>
                        <p className="text-sm text-green-800">
                          You'll receive a notification when your data is ready to download. This usually takes between 5-10 minutes but can take up to 48 hours.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 10 */}
                <div className="relative">
                  <div className="absolute left-0 top-0 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 text-white font-bold text-lg">
                    10
                  </div>
                  <div className="ml-16">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Download and extract your data</h2>
                    <p className="text-gray-600 mb-4">
                      Once notified, download your data and extract the ZIP file. Navigate to the "followers_and_following" folder to find your HTML files.
                    </p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-pink-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        <span className="text-gray-700"><span className="font-medium text-pink-600">followers_1.html</span> - Contains the list of people who follow you</span>
                      </li>
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-pink-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        <span className="text-gray-700"><span className="font-medium text-pink-600">following.html</span> - Contains the list of people you follow</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Step 11 */}
                <div className="relative">
                  <div className="absolute left-0 top-0 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-green-500 text-white font-bold text-lg">
                    11
                  </div>
                  <div className="ml-16">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Upload the files to Follow Check Pro</h2>
                    <p className="text-gray-600 mb-4">
                      Return to our website and upload both HTML files on the upload page. We'll analyze them and show you who doesn't follow you back.
                    </p>
                    <Link href="/upload">
                      <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                        Go to Upload Page
                        <svg className="ml-2 -mr-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-transparent bg-clip-text">
                Frequently Asked Questions
              </span>
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">How long does it take to get my Instagram data?</h3>
                <p className="text-gray-600">
                  Instagram says it can take up to 48 hours, but in most cases, you'll receive the download link within 5-10 minutes.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Is it safe to request my Instagram data?</h3>
                <p className="text-gray-600">
                  Yes, it's completely safe. You're using Instagram's official data download tool, and the data is sent directly to your registered email address.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">What if I have more than 1000 followers?</h3>
                <p className="text-gray-600">
                  Instagram splits your followers into multiple files if you have more than 1000. You'll see files named followers_1.html, followers_2.html, etc. Our tool currently supports analyzing the first file (followers_1.html).
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Will Instagram notify others when I download my data?</h3>
                <p className="text-gray-600">
                  No, Instagram does not notify anyone when you download your own data. This is a private action that only affects your account.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-12">
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
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
