/*
===========================================
AVAILABILITY STATUS
===========================================
Reads data/status.json ("open" or "closed") and updates the header pill.
The owner switches the value with the "Update availability" GitHub Actions
workflow; the markup already shows the closed state as a fallback.
*/
(function () {
  var MESSAGES = {
    open: {
      long: "Open to automation roles",
      short: "Open to work"
    },
    closed: {
      long: "Automation Software Engineer @ Provide Solution",
      short: "@ Provide Solution"
    }
  };

  function applyStatus(status) {
    var message = MESSAGES[status];
    if (!message) return;

    document.querySelectorAll(".brand-status").forEach(function (pill) {
      pill.classList.toggle("is-open", status === "open");
      pill.classList.toggle("is-closed", status !== "open");
      pill.querySelector(".status-long").textContent = message.long;
      pill.querySelector(".status-short").textContent = message.short;
    });
  }

  // The query string bypasses the GitHub Pages CDN cache after a change
  fetch("data/status.json?t=" + Date.now(), { cache: "no-store" })
    .then(function (response) {
      return response.ok ? response.json() : null;
    })
    .then(function (data) {
      if (data && data.status) applyStatus(data.status);
    })
    .catch(function () {
      // Keep the fallback shown in the markup
    });
})();
