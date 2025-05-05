import Link from 'next/link';
import Head from 'next/head';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Follow Check Pro - Find Instagram Non-Followers</title>
        <meta name="description" content="Discover who's not following you back on Instagram with our free tool" />
        <link rel="icon" href="/favicon.ico" />
        {/* Instagram font */}
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-transparent bg-clip-text">
                Follow Check Pro
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8 items-center">
              <Link href="/instructions" className="text-gray-600 hover:text-pink-500 font-medium">
                Instructions
              </Link>
              <Link href="/upload">
                <button className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out">
                  Get Started
                </button>
              </Link>
            </nav>
            <div className="md:hidden">
              <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Instagram-inspired background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 opacity-90"></div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-white opacity-10 rounded-full"></div>
            <div className="absolute top-1/2 -right-48 w-96 h-96 bg-white opacity-10 rounded-full"></div>
            <div className="absolute -bottom-24 left-1/3 w-64 h-64 bg-white opacity-10 rounded-full"></div>
          </div>
          
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Discover Who's Not Following You Back
            </h2>
            <p className="text-xl md:text-2xl text-white opacity-90 mb-10 max-w-2xl mx-auto">
              The easiest way to find your Instagram non-followers in seconds. 100% Free!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/upload">
                <button className="px-8 py-4 bg-white text-pink-600 rounded-lg text-lg font-semibold shadow-lg hover:bg-gray-100 transition transform hover:-translate-y-1">
                  Check My Followers
                </button>
              </Link>
              <Link href="/instructions">
                <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg text-lg font-semibold hover:bg-white hover:bg-opacity-10 transition transform hover:-translate-y-1">
                  How It Works
                </button>
              </Link>
            </div>
            
            {/* Mock UI Preview */}
            <div className="mt-16 max-w-3xl mx-auto relative">
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-pink-500 h-3"></div>
                <div className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl font-bold">FC</div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-gray-800">Your Results</h3>
                      <p className="text-gray-500">See who doesn't follow you back</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {String.fromCharCode(64 + i)}
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-800 font-medium">user{i}name</p>
                          <p className="text-sm text-pink-500">View Profile</p>
                        </div>
                      </div>
                    ))}
                    <div className="text-center pt-2">
                      <p className="text-gray-400 text-sm">and more...</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-70 blur-xl"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full opacity-70 blur-xl"></div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-transparent bg-clip-text">
                How It Works
              </span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-md text-center relative overflow-hidden group hover:shadow-xl transition duration-300">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 opacity-10 rounded-full transform translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition duration-300"></div>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 transform group-hover:scale-110 transition duration-300">1</div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Download Your Data</h3>
                <p className="text-gray-600">Request your data from Instagram and download the HTML files containing your followers and following lists.</p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md text-center relative overflow-hidden group hover:shadow-xl transition duration-300">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-pink-500 to-orange-500 opacity-10 rounded-full transform translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition duration-300"></div>
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 transform group-hover:scale-110 transition duration-300">2</div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Upload Files</h3>
                <p className="text-gray-600">Upload your followers and following HTML files to our secure system for instant analysis.</p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md text-center relative overflow-hidden group hover:shadow-xl transition duration-300">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-500 to-yellow-500 opacity-10 rounded-full transform translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition duration-300"></div>
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 transform group-hover:scale-110 transition duration-300">3</div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Get Results</h3>
                <p className="text-gray-600">Instantly see who doesn't follow you back with our easy-to-read list and direct profile links.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-transparent bg-clip-text">
                Why Choose Follow Check Pro
              </span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
              <div className="flex">
                <div className="flex-shrink-0 mr-5">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">100% Free to Use</h3>
                  <p className="text-gray-600">Our basic service is completely free with no hidden costs. Premium features available for those who want more.</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-5">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Privacy Focused</h3>
                  <p className="text-gray-600">Your data is processed securely in your browser and never stored on our servers. Your privacy is our priority.</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-5">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Accurate Results</h3>
                  <p className="text-gray-600">Get precise information about who's not following you back with our advanced analysis algorithm.</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-5">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">User Friendly</h3>
                  <p className="text-gray-600">Simple interface that anyone can use without technical knowledge. Get results in just a few clicks.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500"></div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white opacity-10 rounded-full blur-xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white opacity-10 rounded-full blur-xl"></div>
          </div>
          
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to see who's not following you back?</h2>
            <p className="text-xl mb-10 text-white opacity-90">
              Get started in minutes and discover your Instagram non-followers today.
            </p>
            <Link href="/upload">
              <button className="px-8 py-4 bg-white hover:bg-gray-100 text-pink-600 rounded-lg text-lg font-semibold shadow-lg transition transform hover:-translate-y-1">
                Get Started Now - It's Free!
              </button>
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-transparent bg-clip-text">
                Frequently Asked Questions
              </span>
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Is it really free?</h3>
                <p className="text-gray-600">
                  Yes! Our basic service is completely free to use. We also offer premium features for users who want more detailed analysis.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Is my Instagram data safe?</h3>
                <p className="text-gray-600">
                  Absolutely. We never store your Instagram data on our servers. All processing happens in your browser, and your files are never shared with anyone.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">How accurate are the results?</h3>
                <p className="text-gray-600">
                  Our results are 100% accurate based on the data provided by Instagram. We directly analyze the HTML files that Instagram provides to you.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Do I need to provide my Instagram login?</h3>
                <p className="text-gray-600">
                  No, you don't need to provide your Instagram login details. You only need to upload the data files that Instagram provides to you directly.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-transparent bg-clip-text mb-2">
                Follow Check Pro
              </h2>
              <p className="text-gray-500">The easiest way to find who's not following you back</p>
            </div>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
              <Link href="/" className="text-gray-600 hover:text-pink-500">Home</Link>
              <Link href="/instructions" className="text-gray-600 hover:text-pink-500">Instructions</Link>
              <Link href="/upload" className="text-gray-600 hover:text-pink-500">Upload</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Follow Check Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
