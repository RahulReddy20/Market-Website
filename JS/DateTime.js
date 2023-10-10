function updateDateTime() {
  const datetimeElement = document.getElementById("current-datetime");
  const now = new Date();
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };
  const formattedDateTime = now.toLocaleDateString(undefined, options);
  datetimeElement.textContent = formattedDateTime;
}

setInterval(updateDateTime, 1000);

updateDateTime();
