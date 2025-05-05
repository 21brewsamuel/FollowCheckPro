import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Follow Check Pro</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover who's not following you back on Instagram in seconds. 100% Free!
          </p>
          <Link href="/upload">
            <button className="px-8 py-4 bg-white text-blue-600 rounded-md text-lg font-medium shadow-lg hover:bg-gray-100 transition">
              Upload Your Files
            </button>
          </Link>
          <p className="mt-4 text-blue-200">
            <Link href="/instructions" className="underline hover:text-white">
              How to download your Instagram files
            </Link>
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Download Your Data</h3>
              <p className="text-gray-600">Request your data from Instagram and download the HTML files.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Upload Files</h3>
              <p className="text-gray-600">Upload your followers and following HTML files to our secure system.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Get Results</h3>
              <p className="text-gray-600">Instantly see who doesn't follow you back with our easy-to-read list.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose Follow Check Pro</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex">
              <div className="mr-4 text-blue-600">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">100% Free to Use</h3>
                <p className="text-gray-600">Our basic service is completely free with no hidden costs.</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4 text-blue-600">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Fast & Accurate</h3>
                <p className="text-gray-600">Get results in seconds with 100% accuracy based on your Instagram data.</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4 text-blue-600">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Private & Secure</h3>
                <p className="text-gray-600">Your data never leaves your browser. We don't store your Instagram information.</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4 text-blue-600">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Easy to Use</h3>
                <p className="text-gray-600">Simple interface that anyone can use without technical knowledge.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Ready to see who's not following you back?</h2>
          <p className="text-xl mb-8 text-gray-600">
            Get started in minutes and discover your Instagram non-followers today.
          </p>
          <Link href="/upload">
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-lg font-medium shadow-lg transition">
              Get Started Now - It's Free!
            </button>
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Is it really free?</h3>
              <p className="text-gray-600">
                Yes! Our basic service is completely free to use. We also offer premium features for users who want more detailed analysis.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Is my Instagram data safe?</h3>
              <p className="text-gray-600">
                Absolutely. We never store your Instagram data on our servers. All processing happens in your browser, and your files are never shared with anyone.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">How accurate are the results?</h3>
              <p className="text-gray-600">
                Our results are 100% accurate based on the data provided by Instagram. We directly analyze the HTML files that Instagram provides to you.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Do I need to provide my Instagram login?</h3>
              <p className="text-gray-600">
                No, you don't need to provide your Instagram login details. You only need to upload the data files that Instagram provides to you directly.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
