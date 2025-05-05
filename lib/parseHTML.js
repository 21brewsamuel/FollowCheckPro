import { JSDOM } from 'jsdom';

export function parseFollowers(html) {
  try {
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Try different selectors based on Instagram's HTML structure
    // This makes the parser more robust to changes in Instagram's HTML
    let usernames = [];
    
    // First attempt: Look for links with usernames
    const links = document.querySelectorAll('a');
    usernames = Array.from(links)
      .map(link => {
        const href = link.href;
        if (!href || !href.includes('instagram.com/')) return null;
        
        // Extract username from href
        const parts = href.split('/').filter(Boolean);
        return parts.length > 0 ? parts[parts.length - 1] : null;
      })
      .filter(Boolean);
    
    // If that didn't work, try looking for specific elements
    if (usernames.length === 0) {
      // Look for divs or spans that might contain usernames
      const possibleUsernameElements = document.querySelectorAll('.username, [data-username]');
      usernames = Array.from(possibleUsernameElements)
        .map(el => el.textContent?.trim() || el.getAttribute('data-username'))
        .filter(Boolean);
    }
    
    // Remove duplicates
    return [...new Set(usernames)];
  } catch (error) {
    console.error('Error parsing HTML:', error);
    return [];
  }
}

export function parseFollowing(html) {
  const dom = new JSDOM(html);
  const links = dom.window.document.querySelectorAll('a');
  return Array.from(links).map(link => link.href.split('/').filter(Boolean).pop());
}
