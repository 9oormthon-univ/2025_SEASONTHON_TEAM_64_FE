/* eslint-disable no-undef */

self.addEventListener('push', (event) => {
  try {
    const data = event.data?.json() || {};
    const notification = data.notification || data;
    const title = notification.title || '알림';
    const options = {
      body: notification.body,
      icon: '/logo192.png',
      badge: '/logo192.png',
      data: notification.data,
    };
    event.waitUntil(self.registration.showNotification(title, options));
  } catch (e) {
    event.waitUntil(
      self.registration.showNotification('알림', {
        body: '새로운 알림이 도착했습니다.',
        icon: '/logo192.png',
      }),
    );
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = '/';
  event.waitUntil(
    clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((clis) => {
        for (const client of clis) {
          if ('focus' in client) return client.focus();
        }
        if (clients.openWindow) return clients.openWindow(url);
        return null;
      }),
  );
});
