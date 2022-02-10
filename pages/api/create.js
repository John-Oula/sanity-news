// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  const { title , submenu} = req.body;
  if (req.method === 'POST') {
    console.log(title)
    var filePath = path.join(__dirname, title);
    fs.writeFileSync(path.resolve('./public/example.js'), title)



    // Process a POST request
    res.status(200).json({ menu: title })
  } else {
    // Handle any other HTTP method
    res.status(200).json({ status: 'error!' })
  }


}
