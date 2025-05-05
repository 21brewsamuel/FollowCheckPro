import { IncomingForm } from 'formidable';
import fs from 'fs';
import { parseFollowers } from '../../lib/parseHTML';

// Disable the default body parser to allow formidable to parse the request
export const config = {
  api: {
    bodyParser: false,
  },
};

// Create a global variable to store results
export const parsedResults = {
  fullList: [],
  previewList: [],
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  // Create a new instance of IncomingForm
  const form = new IncomingForm();

  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error parsing form data' });
        return resolve();
      }

      try {
        // Check if files were uploaded
        if (!files.followers || !files.following) {
          res.status(400).json({ success: false, message: 'Please upload both files' });
          return resolve();
        }

        // Read the uploaded files
        const followersFile = fs.readFileSync(files.followers[0].filepath, 'utf-8');
        const followingFile = fs.readFileSync(files.following[0].filepath, 'utf-8');

        // Parse the HTML files to extract usernames
        const followers = parseFollowers(followersFile);
        const following = parseFollowers(followingFile);

        // Find users who don't follow back
        const notFollowingBack = following.filter(user => !followers.includes(user));

        // Store results for later retrieval
        parsedResults.fullList = notFollowingBack;
        parsedResults.previewList = notFollowingBack.slice(0, 10);

        // Return success
        res.status(200).json({ success: true });
        return resolve();
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'File processing error' });
        return resolve();
      }
    });
  });
}

export function getParsedResults() {
  return parsedResults;
}
