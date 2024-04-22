import { Application } from "@hotwired/stimulus";

const application = Application.start();

// Configure Stimulus development experience
application.debug = false;
window.Stimulus = application;

if (navigator.serviceWorker) {
  navigator.serviceWorker
    .register("/service-worker.js", { scope: "/" })
    .then(() => navigator.serviceWorker.ready)
    .then(() => console.log("Service worker registered!"));
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          console.log("Notification permission granted.");
        } else {
          console.log("Notification permission denied.");
        }
      });
    }
    serviceWorkerRegistration.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey: window.vapidPublicKey,
      })
      .then(function (subscription) {
        fetch("/push_subscriptions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": document.querySelector("[name='csrf-token']").getAttribute("content"),
          },
          body: JSON.stringify(subscription),
        });
      });
  });
}

document.addEventListener("click", function () {
  if (!("Notification" in window)) {
    console.log("This browser does not support desktop notification");
  } else if (Notification.permission === "default") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notifications enabled!");
        navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
          serviceWorkerRegistration.pushManager
            .subscribe({
              userVisibleOnly: true,
              applicationServerKey: window.vapidPublicKey,
            })
            .then(function (subscription) {
              fetch("/push_subscriptions", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "X-CSRF-Token": document
                    .querySelector("[name='csrf-token']")
                    .getAttribute("content"),
                },
                body: JSON.stringify(subscription),
              });
            });
        });
      } else {
        console.log("Notifications were not enabled.");
      }
    });
  }
});

export { application };
