export default function addMonth(targetDate: Date, amount: number) {
  const target = new Date(targetDate);
  target.setMonth(target.getMonth() + amount);
  return target;
}
