import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { interval } from 'rxjs';
import {
  allNotificationsMarkedRead,
  notificationReceived,
  notificationRemoved,
} from '../features/notifications/notificationsSlice.js';

const notificationMessages = [
  {
    type: 'stock update',
    message: 'Stock changed for a meal-prep product. Review availability before checkout.',
  },
  {
    type: 'voucher campaign',
    message: 'Voucher campaign reminder: SAVE20 and FOOD10 are active demo codes.',
  },
  {
    type: 'checkout reminder',
    message: 'Checkout should verify cart items against current stock before continuing.',
  },
  {
    type: 'system message',
    message: 'System simulation is running. New notifications arrive every 8 seconds.',
  },
];

function NotificationCenter() {
  const dispatch = useDispatch();
  const { items, unreadCount } = useSelector((state) => state.notifications);
  const messageIndexRef = useRef(0);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const visibleItems = showUnreadOnly
    ? items.filter((notification) => !notification.read)
    : items;

  useEffect(() => {
    const subscription = interval(8000).subscribe(() => {
      const template = notificationMessages[messageIndexRef.current % notificationMessages.length];
      messageIndexRef.current += 1;

      dispatch(
        notificationReceived({
          id: `${Date.now()}-${messageIndexRef.current}`,
          ...template,
          read: false,
          createdAt: new Date().toLocaleTimeString(),
        }),
      );
    });

    return () => subscription.unsubscribe();
  }, [dispatch]);

  return (
    <section className="panel notification-center" aria-labelledby="notification-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Participant Assignment</p>
          <h2 id="notification-title">Notification Center</h2>
        </div>
        <button type="button" onClick={() => dispatch(allNotificationsMarkedRead())}>
          Mark all as read
        </button>
      </div>

      <div className="notification-controls">
        <p className="notification-summary">
          Unread notifications: <strong>{unreadCount}</strong>
        </p>
        <label className="unread-toggle">
          <input
            type="checkbox"
            checked={showUnreadOnly}
            onChange={(event) => setShowUnreadOnly(event.target.checked)}
          />
          Show unread only
        </label>
      </div>

      {visibleItems.length === 0 ? (
        <p className="empty-state">
          {showUnreadOnly ? 'No unread notifications.' : 'Waiting for the first simulated notification.'}
        </p>
      ) : (
        <ul className="notification-list">
          {visibleItems.map((notification) => (
            <li key={notification.id} className={notification.read ? 'notification-read' : ''}>
              <div>
                <strong>{notification.type}</strong>
                <span>{notification.createdAt}</span>
              </div>
              <p>{notification.message}</p>
              <button type="button" onClick={() => dispatch(notificationRemoved(notification.id))}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default NotificationCenter;
