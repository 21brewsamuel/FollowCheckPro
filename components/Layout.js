import Link from 'next/link';
import Head from 'next/head';

export default function Layout({ children, title = 'Follow Check Pro' }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Head>
        <title>{title}</title>
        <meta name="description" content="Find out who's not following you back on Instagram" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Follow Check Pro
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <li><Link href="/" className="text-gray-600 hover:text-blue-600">Home</Link></li>
              <li><Link href="/instructions" className="text-gray-600 hover:text-blue-600">Instructions</Link></li>
              <li><Link href="/upload" className="text-gray-600 hover:text-blue-600">Upload</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-white border-t mt-10 py-6">
        <div className="max-w-5xl mx-auto px-4 text-center text-gray-500">
          <p>© {new Date().getFullYear()} Follow Check Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 