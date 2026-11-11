/**
 * MEDIA STORAGE MODULE
 * 
 * Modul terpusat untuk menyimpan dan menghapus file media.
 * Saat ini menyimpan file secara lokal di folder public/uploads/.
 * 
 * CATATAN PENTING MEDIA:
 * Vercel menggunakan ephemeral serverless disk di production (file yang ditulis saat runtime
 * tidak disimpan permanen). Modul ini dibungkus secara terpisah agar mudah dimigrasikan
 * ke Cloud Storage (seperti Vercel Blob, Cloudinary, atau S3) di Step 4 tanpa mengubah kode lain.
 */

import fs from "fs";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

// Pastikan folder uploads tersedia
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

export interface SaveFileResult {
  success: boolean;
  filePath?: string;
  url?: string;
  error?: string;
}

export async function saveFile(
  file: File,
  allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"],
  maxSizeBytes = 5 * 1024 * 1024 // 5 MB
): Promise<SaveFileResult> {
  // 1. Validasi tipe file
  if (!allowedTypes.includes(file.type)) {
    return {
      success: false,
      error: `Format file tidak diizinkan (${file.type}). Gunakan JPG, PNG, atau WebP.`,
    };
  }

  // 2. Validasi ukuran file
  if (file.size > maxSizeBytes) {
    return {
      success: false,
      error: `Ukuran file melebihi batas maksimal ${Math.round(maxSizeBytes / (1024 * 1024))}MB.`,
    };
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 3. Buat nama file unik dan aman
    const ext = path.extname(file.name) || ".jpg";
    const cleanBase = path
      .basename(file.name, ext)
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .toLowerCase();
    const uniqueFileName = `${Date.now()}-${cleanBase}${ext}`;
    const destinationPath = path.join(UPLOAD_DIR, uniqueFileName);

    // 4. Tulis file ke public/uploads/
    fs.writeFileSync(destinationPath, buffer);

    const publicUrl = `/uploads/${uniqueFileName}`;
    return {
      success: true,
      filePath: destinationPath,
      url: publicUrl,
    };
  } catch (err: any) {
    console.error("Gagal menyimpan file lokal:", err);
    return {
      success: false,
      error: err.message || "Gagal menyimpan file ke penyimpanan lokal.",
    };
  }
}

export async function deleteFile(fileUrlOrPath: string): Promise<boolean> {
  try {
    const filename = path.basename(fileUrlOrPath);
    const targetPath = path.join(UPLOAD_DIR, filename);

    if (fs.existsSync(targetPath)) {
      fs.unlinkSync(targetPath);
      return true;
    }
    return false;
  } catch (err) {
    console.error("Gagal menghapus file lokal:", err);
    return false;
  }
}

