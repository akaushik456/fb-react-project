import { IncomingForm } from 'formidable';
import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  const uploadDir = path.join(process.cwd(), 'public', 'Images');
  await fs.mkdir(uploadDir, { recursive: true });

  const form = new IncomingForm({
    uploadDir,
    keepExtensions: true,
    multiples: false,
  });

  return new Promise((resolve, reject) => {
    form.parse(req as any, async (err, fields, files) => {
      if (err) {
        console.error('Form parse error:', err);
        return resolve(
          NextResponse.json({ success: false, error: err.message }, { status: 500 })
        );
      }

      const file = Array.isArray(files.file) ? files.file[0] : files.file;
      if (!file) {
        return resolve(
          NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 })
        );
      }

      const filename = file.newFilename || file.originalFilename;
      const imageUrl = `/Images/${filename}`;
      resolve(NextResponse.json({ success: true, imageUrl }));
    });
  });
}
