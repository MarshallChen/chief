import classNames from 'classnames';
import Notification from 'rc-notification';

export function popupNotification(component) {
  return (error, type) => {
    if (error instanceof ServerError) {
      if (!error.code) return;
      if (!type) type = error.type;
      // Notification Instance
      const notification = Notification.newInstance({ prefixCls: classNames('next', type, 'rc-notification'), style: { left: '97%', top: 40 }});
      notification.notice({
        content: <span>{error.code} {error.field} {error.msg}</span>,
        duration: 50,
        closable: true,
        style: {
          right: '100%'
        }
      });
      return;
    }
    throw error;
  }
}
