import Parse from "parse";

// Parse model for the "Awareness" class. All queries live here,
// so components never talk to Parse directly.
const Awareness = Parse.Object.extend("Awareness");

// READ: every awareness entry, in display order, as plain objects
export async function getAllAwareness() {
  const query = new Parse.Query(Awareness);
  query.ascending("order");
  const rows = await query.find();
  return rows.map((r) => ({
    id: r.id,
    title: r.get("title"),
    description: r.get("description"),
    category: r.get("category"),
    link: r.get("link"),
  }));
}