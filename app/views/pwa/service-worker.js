self.addEventListener("push", async (event) => {
  const { title, options } = await event.data.json();
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window" }).then((clientList) => {
      for (let i = 0; i < clientList.length; i++) {
        let client = clientList[i];
        let clientPath = new URL(client.url).pathname;

        if (clientPath == event.notification.data.path && "focus" in client) {
          return client.focus();
        }
      }

      if (clients.openWindow) {
        return clients.openWindow(event.notification.data.path);
      }
    })
  );
});

// function onInstall(event) {
//   console.log("[Serviceworker]", "Installing!", event);
// }

// function onActivate(event) {
//   console.log("[Serviceworker]", "Activating!", event);
// }

// function onFetch(event) {
//   console.log("[Serviceworker]", "Fetching!", event);
// }

// self.addEventListener("install", onInstall);
// self.addEventListener("activate", onActivate);
// self.addEventListener("fetch", onFetch);

// console.log("Hello");

// Add a service worker for processing Web Push notifications:
//
// self.addEventListener("install", function (event) {
// Perform install steps
// });

// self.addEventListener("fetch", function (event) {
//   event.respondWith(
//     caches.match(event.request).then(function (response) {
//       // Cache hit - return response
//       if (response) {
//         return response;
//       }
//       return fetch(event.request);
//     })
//   );
// });
