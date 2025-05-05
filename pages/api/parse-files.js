import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
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
    
    // Parse the form data
    const form = new IncomingForm();
    form.uploadDir = path.join(process.cwd(), 'tmp');
    form.keepExtensions = true;
    
    // Create upload directory if it doesn't exist
    if (!fs.existsSync(form.uploadDir)) {
      console.log('Creating upload directory:', form.uploadDir);
      fs.mkdirSync(form.uploadDir, { recursive: true });
    }

    console.log('Parsing form data...');
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          console.error('Form parsing error:', err);
          reject(err);
        }
        console.log('Form parsed successfully. Files received:', Object.keys(files));
        // Log the full file objects to see their structure
        console.log('Followers file object:', JSON.stringify(files.followers));
        console.log('Following file object:', JSON.stringify(files.following));
        resolve({ fields, files });
      });
    });

    // Check if both files were uploaded
    if (!files.followers || !files.following) {
      console.error('Missing files:', { 
        hasFollowers: !!files.followers, 
        hasFollowing: !!files.following 
      });
      return res.status(400).json({ 
        success: false, 
        message: 'Please upload both followers and following files' 
      });
    }

    console.log('Reading file contents...');
    
    // Get file paths - handle different versions of formidable
    // In newer versions, the file object structure has changed
    let followersPath, followingPath;
    
    if (files.followers.filepath) {
      // Newer formidable versions
      followersPath = files.followers.filepath;
      followingPath = files.following.filepath;
    } else if (files.followers.path) {
      // Older formidable versions
      followersPath = files.followers.path;
      followingPath = files.following.path;
    } else if (Array.isArray(files.followers)) {
      // Some versions return arrays
      followersPath = files.followers[0].filepath || files.followers[0].path;
      followingPath = files.following[0].filepath || files.following[0].path;
    } else {
      // Try to find any property that might contain the path
      const followerKeys = Object.keys(files.followers);
      const followingKeys = Object.keys(files.following);
      
      console.log('Follower file keys:', followerKeys);
      console.log('Following file keys:', followingKeys);
      
      // Try common path properties
      for (const key of ['filepath', 'path', 'file', 'filePath']) {
        if (files.followers[key]) {
          followersPath = files.followers[key];
          break;
        }
      }
      
      for (const key of ['filepath', 'path', 'file', 'filePath']) {
        if (files.following[key]) {
          followingPath = files.following[key];
          break;
        }
      }
    }
    
    console.log('File paths:', { followersPath, followingPath });
    
    if (!followersPath || !followingPath) {
      console.error('Could not determine file paths');
      return res.status(500).json({
        success: false,
        message: 'Error processing files: Could not determine file paths'
      });
    }
    
    const followersHtml = fs.readFileSync(followersPath, 'utf8');
    const followingHtml = fs.readFileSync(followingPath, 'utf8');

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

    // Clean up temporary files
    try {
      fs.unlinkSync(followersPath);
      fs.unlinkSync(followingPath);
      console.log('Temporary files cleaned up');
    } catch (cleanupError) {
      console.error('Error cleaning up files:', cleanupError);
      // Continue despite cleanup errors
    }

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
    // Log a small sample of the HTML to see its structure
    console.log('HTML sample:', html.substring(0, 200) + '...');
    
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