import { parsedResults } from './parse-files';

export default function handler(req, res) {
  const { paid } = req.query;
  
  // Initialize with empty arrays if parsedResults is not yet populated
  const fullList = parsedResults?.fullList || [];
  const previewList = parsedResults?.previewList || [];
  
  if (paid === 'true') {
    // Return the full list for paid users
    return res.status(200).json({ fullList });
  } else {
    // Return the preview list for free users
    return res.status(200).json({ previewList });
  }
}
