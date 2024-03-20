function formatDateTime(timestamp) {
  const date = new Date(timestamp);
  return date.toISOString().slice(0, 19).replace('T', ' ');
}

module.exports = {
  formatDateTime,
};
