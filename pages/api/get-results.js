export default function handler(req, res) {
  try {
    console.log('Retrieving results...');
    
    // In a real app, you'd retrieve this from a database or session
    // Here we're using the global variable we set in parse-files.js
    const fullList = global.fullResultsList || [];
    
    console.log(`Retrieved ${fullList.length} non-followers`);
    
    // Create a preview list of the first 10 items
    const previewList = fullList.slice(0, 10);
    
    return res.status(200).json({
      success: true,
      previewList,
      fullList,
      totalCount: fullList.length
    });
  } catch (error) {
    console.error('Error retrieving results:', error);
    return res.status(500).json({
      success: false,
      message: `Error retrieving results: ${error.message}. Please try again.`
    });
  }
} 