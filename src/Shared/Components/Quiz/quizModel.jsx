import Parse from "parse";

// Parse model for the "Quiz" class. The "static" row holds the original
// quiz.json questions, in the same shape (id, type, question, options,
// correct_answer), so the quiz page doesn't care where they came from.
const Quiz = Parse.Object.extend("Quiz");

// READ: the built-in quiz, or null if it hasn't been seeded
export async function getStaticQuiz() {
  const query = new Parse.Query(Quiz);
  query.equalTo("source", "static");
  const row = await query.first();
  if (!row) return null;
  return {
    id: row.id,
    title: row.get("title"),
    questions: row.get("questions"),
  };
}