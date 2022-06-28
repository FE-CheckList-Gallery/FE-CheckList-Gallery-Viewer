// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs';
import path from "path";
import axios from 'axios';

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { fileUrl } = req.body;
      const folder = fileUrl.split("/").slice(-2, -1);
      const filename = fileUrl.split("/").slice(-1);
      const data = await axios.get(fileUrl);
      console.log(fileUrl, folder, filename, data.data);

      if (!fs.existsSync(path.join(process.cwd(), `pages/${folder}`)))
        fs.mkdirSync(path.join(process.cwd(), `pages/${folder}`));

      fs.writeFileSync(
        `${path.join(process.cwd(), `pages/${folder}`)}/${filename}`,
        data.data
      );
      res.status(200).json("file saved");
    } 
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}
