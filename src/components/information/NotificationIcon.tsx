import React from 'react';
import notify from '../../assets/information/notification.svg';
import nonNotify from '../../assets/information/non-notification.svg';

type Props = {
  enabled?: boolean;
  onClick?: () => void;
};

const NotificationIcon: React.FC<Props> = ({ enabled, onClick }) => {
  return <img src={enabled ? notify : nonNotify} onClick={onClick} />;
};

export default NotificationIcon;
