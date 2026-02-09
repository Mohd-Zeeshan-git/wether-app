/**
 *  * Compute Levenshtein distance between two strings
  * Smaller distance = more similar
   */
   function levenshtein(a = '', b = '') {
const matrix = Array.from({ length: a.length + 1 }, () =>
    new Array(b.length + 1).fill(0)
 )

   // Initialize rows & columns
for (let i = 0; i <= a.length; i++) matrix[i][0] = i
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j

    // Fill matrix
 for (let i = 1; i <= a.length; i++) {
for (let j = 1; j <= b.length; j++) {
 const cost = a[i - 1] === b[j - 1] ? 0 : 1

  matrix[i][j] = Math.min(
matrix[i - 1][j] + 1, // deletion
   matrix[i][j - 1] + 1, // insertion
 matrix[i - 1][j - 1] + cost // substitution
  )
 }
   }

return matrix[a.length][b.length]
}

/**
 * Normalize similarity score between 0 and 1
  */
  export function similarityScore(input, target) {
    if (!input || !target) return 0

 const a = input.toLowerCase()
   const b = target.toLowerCase()

const distance = levenshtein(a, b)
  const maxLen = Math.max(a.length, b.length)

    return maxLen === 0 ? 1 : 1 - distance / maxLen
    }

    /**
* Rank list of strings by similarity to input
 */
 export function rankBySimilarity(input, list = []) {
   return list
  .map((item) => ({
   value: item,
    score: similarityScore(input, item)
   }))
  .filter((item) => item.score > 0.3)
 .sort((a, b) => b.score - a.score)
 }
 
 