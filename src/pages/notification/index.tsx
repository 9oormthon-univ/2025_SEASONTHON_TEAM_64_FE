import React from 'react';
import * as S from './index.styles';
import back from '../../assets/notification/left-arrow.svg';
import NotificationList from '../../components/notification/NotificationList';
import useInfiniteNotifications from '../../hooks/useInfiniteNotifications';
import { useNavigate } from 'react-router-dom';

const Notification = () => {
  const { items, isLoading, isFetchingNextPage, sentinelRef } =
    useInfiniteNotifications();

  const navigate = useNavigate();

  return (
    <S.Container>
      <S.Header>
        <img src={back} alt="back" onClick={() => navigate(-1)} />
      </S.Header>
      <S.Title>알림</S.Title>
      <NotificationList
        items={items}
        sentinelRef={sentinelRef}
        loading={isLoading || isFetchingNextPage}
      />
    </S.Container>
  );
};

export default Notification;
