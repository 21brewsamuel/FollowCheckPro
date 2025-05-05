import Link from 'next/link';

export default function Instructions() {
  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">How to Download Your Instagram Files</h1>
      <ol className="list-decimal list-inside space-y-4 text-gray-700">
        <li>Open Instagram App ➔ Settings ➔ Privacy and Security ➔ Data Download.</li>
        <li>Request download in <strong>HTML</strong> format (NOT JSON).</li>
        <li>Check your email for the download link.</li>
        <li>Unzip the folder and find the <code>followers_and_following</code> folder.</li>
        <li>Upload <code>followers_1.html</code> and <code>following.html</code> on our upload page.</li>
      </ol>
      <Link href="/upload">
        <button className="mt-8 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow">
          Ready? Upload Files
        </button>
      </Link>
    </main>
  );
}
