export default function addDay(targetDate: Date, amount: number) {
  const target = new Date(targetDate);
  target.setDate(target.getDate() + amount);
  return target;
}
