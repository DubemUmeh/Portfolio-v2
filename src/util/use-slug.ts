export default function createSlug(title: string) {
  if (!title) return;
  return title
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-');
}