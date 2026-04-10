/**
 * Converts a string into a URL-friendly slug.
 * @param {string} text - The input string (e.g., "Hello World!")
 * @returns {string} - The slugified string (e.g., "hello-world")
 */
export function slugify(text) {
  return text
    .toString() // Ensure input is a string
    .normalize("NFD") // Separate accents from base characters
    .replace(/[\u0300-\u036f]/g, "") // Remove the accent marks
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading/trailing whitespace
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars (except -)
    .replace(/--+/g, "-"); // Replace multiple - with single -
}
