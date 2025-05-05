import { IncomingForm } from 'formidable';
import { parse } from 'node-html-parser';
import fs from 'fs';
import os from 'os';
import path from 'path';

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
    
    // Determine if we're running on Vercel
    const isVercel = process.env.VERCEL === '1';
    console.log(`Running on ${isVercel ? 'Vercel' : 'local environment'}`);
    
    // Configure formidable based on environment
    const formOptions = {
      keepExtensions: true,
      multiples: true,
    };
    
    // Only set uploadDir for local environment
    if (!isVercel) {
      // Use system temp directory for local development
      formOptions.uploadDir = os.tmpdir();
      console.log(`Using temp directory: ${formOptions.uploadDir}`);
    }
    
    const form = new IncomingForm(formOptions);
    
    console.log('Parsing form data...');
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          console.error('Form parsing error:', err);
          reject(err);
        }
        console.log('Form parsed successfully');
        // Log file structure to debug
        console.log('Files structure:', JSON.stringify(Object.keys(files)));
        if (files.followers) {
          console.log('Followers file keys:', Object.keys(files.followers));
        }
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
    
    // Process files based on environment
    let followersHtml, followingHtml;
    
    // Function to handle file reading with multiple approaches
    const getFileContents = async (fileObj) => {
      // Try multiple approaches to get file contents
      
      // Approach 1: Direct buffer or data access (memory)
      if (fileObj.buffer) {
        console.log('Reading from buffer property');
        return fileObj.buffer.toString('utf8');
      }
      
      if (fileObj.data) {
        console.log('Reading from data property');
        return fileObj.data.toString('utf8');
      }
      
      // Approach 2: Read from file path (works in local environment)
      const filePath = fileObj.filepath || fileObj.path;
      if (filePath && fs.existsSync(filePath)) {
        console.log(`Reading from file path: ${filePath}`);
        return fs.readFileSync(filePath, 'utf8');
      }
      
      // Approach 3: Handle array format
      if (Array.isArray(fileObj)) {
        console.log('File object is an array, trying first element');
        const firstFile = fileObj[0];
        
        if (firstFile.buffer) {
          return firstFile.buffer.toString('utf8');
        }
        
        if (firstFile.data) {
          return firstFile.data.toString('utf8');
        }
        
        const firstFilePath = firstFile.filepath || firstFile.path;
        if (firstFilePath && fs.existsSync(firstFilePath)) {
          return fs.readFileSync(firstFilePath, 'utf8');
        }
      }
      
      // Approach 4: Try to access the file content using a stream (for newer formidable versions)
      if (fileObj.toJSON) {
        console.log('File has toJSON method, trying to extract content');
        const fileData = fileObj.toJSON();
        console.log('File JSON data keys:', Object.keys(fileData));
        
        if (fileData.filepath && fs.existsSync(fileData.filepath)) {
          return fs.readFileSync(fileData.filepath, 'utf8');
        }
      }
      
      console.error('Could not extract file contents with any method');
      return null;
    };
    
    // Get file contents
    followersHtml = await getFileContents(files.followers);
    followingHtml = await getFileContents(files.following);

    if (!followersHtml || !followingHtml) {
      console.error('Failed to extract file contents');
      return res.status(500).json({
        success: false,
        message: 'Could not extract file contents. Please try again.'
      });
    }

    console.log('Successfully extracted file contents');
    console.log('Followers HTML length:', followersHtml.length);
    console.log('Following HTML length:', followingHtml.length);

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

    // Clean up temporary files if we're in local environment
    if (!isVercel) {
      try {
        const followerPath = files.followers.filepath || files.followers.path;
        const followingPath = files.following.filepath || files.following.path;
        
        if (followerPath && fs.existsSync(followerPath)) {
          fs.unlinkSync(followerPath);
        }
        
        if (followingPath && fs.existsSync(followingPath)) {
          fs.unlinkSync(followingPath);
        }
        
        console.log('Temporary files cleaned up');
      } catch (cleanupError) {
        console.error('Error cleaning up files:', cleanupError);
        // Continue despite cleanup errors
      }
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