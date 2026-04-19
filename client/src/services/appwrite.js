import { Client, Storage } from 'appwrite';

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const storage = new Storage(client);

export function getFileDownloadUrl(bucketId, fileId) {
  return storage.getFileDownload(bucketId, fileId);
}

export function getFileViewUrl(bucketId, fileId) {
  return storage.getFileView(bucketId, fileId);
}

export function listFiles(bucketId) {
  return storage.listFiles(bucketId);
}
