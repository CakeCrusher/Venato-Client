export const today = new Date();
export const lastWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7
)
  .toISOString()
  .slice(0, 10);
export const tomrrow = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() + 1
)
  .toISOString()
  .slice(0, 10);
