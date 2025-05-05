import { IncomingForm } from 'formidable';
import { parse } from 'node-html-parser';

// Disable the default body parser to handle form data
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    console.log('Starting file upload process...');
    
    // Parse the form data - process files in memory instead of writing to disk
    const form = new IncomingForm({
      keepExtensions: true,
      // Important: Don't write to filesystem on Vercel
      multiples: true,
      uploadDir: undefined, // Don't specify an upload directory
    });
    
    console.log('Parsing form data...');
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          console.error('Form parsing error:', err);
          reject(err);
        }
        console.log('Form parsed successfully');
        resolve({ fields, files });
      });
    });

    // Check if both files were uploaded
    if (!files.followers || !files.following) {
      console.error('Missing files');
      return res.status(400).json({ 
        success: false, 
        message: 'Please upload both followers and following files' 
      });
    }

    console.log('Processing files...');
    
    // Process files directly from memory instead of reading from disk
    let followersHtml, followingHtml;
    
    // Handle different formidable versions and configurations
    if (files.followers.buffer) {
      // If formidable provides buffers directly
      followersHtml = files.followers.buffer.toString('utf8');
      followingHtml = files.following.buffer.toString('utf8');
    } else if (files.followers.data) {
      // Some versions provide data property
      followersHtml = files.followers.data.toString('utf8');
      followingHtml = files.following.data.toString('utf8');
    } else if (Array.isArray(files.followers)) {
      // Handle array format
      followersHtml = files.followers[0].buffer?.toString('utf8') || 
                     files.followers[0].data?.toString('utf8');
      followingHtml = files.following[0].buffer?.toString('utf8') || 
                     files.following[0].data?.toString('utf8');
    } else {
      // Last resort - try to access the file content from the temporary path
      // This won't work on Vercel but might work locally
      console.log('Warning: Falling back to file path method, which may not work on Vercel');
      
      // This is just for logging - we'll handle the error if it occurs
      const followerPath = files.followers.filepath || files.followers.path;
      const followingPath = files.following.filepath || files.following.path;
      console.log('Attempted file paths:', { followerPath, followingPath });
      
      // This will likely fail on Vercel, but we'll catch the error
      try {
        const fs = require('fs');
        followersHtml = fs.readFileSync(followerPath, 'utf8');
        followingHtml = fs.readFileSync(followingPath, 'utf8');
      } catch (fsError) {
        console.error('File system error:', fsError);
        return res.status(500).json({
          success: false,
          message: 'Error reading files. This may be due to deployment environment restrictions.'
        });
      }
    }

    if (!followersHtml || !followingHtml) {
      return res.status(500).json({
        success: false,
        message: 'Could not extract file contents'
      });
    }

    console.log('Extracting usernames...');
    // Extract usernames from the HTML
    const followers = extractUsernames(followersHtml);
    const following = extractUsernames(followingHtml);

    console.log('Username counts:', { 
      followersCount: followers.length, 
      followingCount: following.length 
    });

    // Find users who don't follow back
    const nonFollowers = following.filter(user => !followers.includes(user));
    console.log('Non-followers count:', nonFollowers.length);

    // Store results in session or temporary storage
    // For simplicity, we'll just return a preview and store the full list in a mock session
    const previewList = nonFollowers.slice(0, 10);
    
    // In a real app, you'd store this in a database or session
    // Here we're simulating storage for the example
    global.fullResultsList = nonFollowers;

    // No need to clean up files as we're not writing to disk

    console.log('Processing complete, returning results');
    return res.status(200).json({ 
      success: true, 
      message: 'Files processed successfully',
      previewCount: previewList.length,
      totalCount: nonFollowers.length
    });
  } catch (error) {
    console.error('Error processing files:', error);
    return res.status(500).json({ 
      success: false, 
      message: `Error processing files: ${error.message}. Please try again.` 
    });
  }
}

// Helper function to extract usernames from Instagram HTML
function extractUsernames(html) {
  try {
    console.log('HTML length:', html.length);
    
    const root = parse(html);
    
    // Try multiple selectors to find usernames in Instagram's HTML
    let usernames = [];
    
    // Method 1: Look for username class
    const usernameElements = root.querySelectorAll('.username');
    if (usernameElements.length > 0) {
      console.log('Found usernames via .username class');
      usernames = [...usernameElements.map(el => el.text.trim())];
    }
    
    // Method 2: Look for links to Instagram profiles
    if (usernames.length === 0) {
      const profileLinks = root.querySelectorAll('a[href^="https://www.instagram.com/"]');
      if (profileLinks.length > 0) {
        console.log('Found usernames via profile links');
        usernames = [...profileLinks.map(el => {
          const href = el.getAttribute('href');
          return href.replace('https://www.instagram.com/', '').replace('/', '');
        })];
      }
    }
    
    // Method 3: Regular expression to find usernames
    if (usernames.length === 0) {
      console.log('Trying regex method to find usernames');
      const usernameMatches = html.match(/instagram\.com\/([a-zA-Z0-9._]+)/g);
      if (usernameMatches && usernameMatches.length > 0) {
        console.log('Found usernames via regex');
        usernames = usernameMatches.map(match => 
          match.replace('instagram.com/', '')
        );
      }
    }
    
    // Method 4: Try to find any text that looks like a username
    if (usernames.length === 0) {
      console.log('Trying to find username patterns in text');
      // This is a simplified approach - Instagram usernames can contain letters, numbers, periods, and underscores
      const usernamePattern = /\b[a-zA-Z0-9._]{3,30}\b/g;
      const potentialUsernames = html.match(usernamePattern);
      if (potentialUsernames && potentialUsernames.length > 0) {
        console.log('Found potential usernames via text pattern');
        usernames = potentialUsernames;
      }
    }
    
    // Remove duplicates
    const uniqueUsernames = [...new Set(usernames)];
    console.log(`Found ${uniqueUsernames.length} unique usernames`);
    
    return uniqueUsernames;
  } catch (error) {
    console.error('Error parsing HTML:', error);
    return [];
  }
} 