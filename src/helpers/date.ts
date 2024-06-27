export function formatDefaultTime(date: string | number | Date) {
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date || 0));
}
