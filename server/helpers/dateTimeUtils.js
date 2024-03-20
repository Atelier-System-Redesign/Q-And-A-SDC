function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);
  return date.toISOString().slice(0, 19).replace('T', ' ');
}

module.exports = {
  formatDateTime,
};
