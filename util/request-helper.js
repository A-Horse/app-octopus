export function handleEpicError(err, caught) {
  console.error(err, caught);
  return caught;
}
