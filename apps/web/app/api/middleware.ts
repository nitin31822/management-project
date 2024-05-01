// // pages/api/upload.ts

// // import { NextApiRequest, NextApiResponse } from 'next';s
// import multer from 'multer';
// import nc from 'next-connect';

// const upload = multer({ dest: './public/temp' });

// const handler = nc<NextApiRequest, NextApiResponse>();

// handler.use(upload.single('file'));

// handler.post((req, res) => {
//     const file = req.file;
//     // Handle file upload here
//     res.status(200).json({ message: 'File uploaded successfully' });
// });

// export default handler;

