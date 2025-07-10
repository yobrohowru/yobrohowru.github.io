self.addEventListener("install", () => {
  console.log("[SW] Installed");
  self.skipWaiting();
});

self.addEventListener("activate", () => {
  console.log("[SW] Activated");
});

// 當使用者點通知
self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  // 可選：導向頁面或觸發邏輯
  event.waitUntil(
    clients.matchAll({ type: "window" }).then((clientList) => {
      if (clientList.length > 0) {
        return clientList[0].focus();
      }
      return clients.openWindow("/");
    })
  );
});

// 從伺服器收到 push 時顯示通知
self.addEventListener("push", function (event) {
  const data = event.data ? event.data.text() : "（沒有訊息內容）";
  event.waitUntil(
    self.registration.showNotification("📦 背景推播", {
      body: data,
      icon: "icons/icon-192.png",
      badge: "icons/icon-72.png",
    })
  );
});
