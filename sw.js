self.addEventListener("install", () => {
  self.skipWaiting();
});
self.addEventListener("activate", () => {
  console.log("Service worker ready.");
});
self.addEventListener("notificationclick", function (event) {
  event.notification.close();
});
