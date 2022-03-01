// ./web/pages/api/preview.js

const secret = "j8heapkqy4rdz6kudrvsc7ywpvfhrv022abyx5zgmuwpc1xv"
export default function preview(req, res) {
    if (!req?.query?.secret) {
      return res.status(401).json({message: 'No secret token'})
    }
  
    // Check the secret and next parameters
    // This secret should only be known to this API route and the CMS
    if (req.query.secret !== secret) {
      return res.status(401).json({message: 'Invalid secret token'})
    }
  
    if (!req.query.slug) {
      return res.status(401).json({message: 'No slug'})
    }
  
    // Enable Preview Mode by setting the cookies
    res.setPreviewData({})
  
    // Redirect to the path from the fetched post
    // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
    res.writeHead(307, {Location: `/preview/${req?.query?.slug}` ?? `/`})
  
    return res.end()
  }