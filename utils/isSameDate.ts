export default function isSameDate(dates: Date[]) {
  const result = dates.every((date) => {
    date.toLocaleDateString;
    return date.toLocaleDateString() === dates[0].toLocaleDateString();
  });
  return result;
}
