import React from 'react';
import * as S from './index.styles';

import logo from '../../assets/mypage/logo.svg';
import notify from '../../assets/mypage/notification.svg';
import nonNotify from '../../assets/mypage/non-notification.svg';
import nonImage from '../../assets/mypage/profile.svg';
import rightArrow from '../../assets/mypage/right-arrow.svg';
import cookie from '../../assets/gif/fortune_content.gif';
import useNotificationStatus from '../../hooks/useNotificationStatus';
import { useApiQuery } from '../../apis/config/builder/ApiBuilder';
import { getMemberDetail } from '../../apis/member';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const navigate = useNavigate();
  const notification = useNotificationStatus();
  const { data: memberDetail } = useApiQuery(getMemberDetail(), ['member']);

  return (
    <S.Container>
      <S.ImageWrapper>
        <S.Logo src={logo} alt="Logo" />
        <S.Notify
          src={notification ? notify : nonNotify}
          alt="Notification"
          onClick={() => navigate('/notification')}
        />
      </S.ImageWrapper>
      <S.ProfileWrapper>
        <S.ProfileImage src={memberDetail?.profileImageUrl || nonImage} />
        <S.ProfileContent>
          <S.Nickname>{memberDetail?.nickname || '닉네임 없음'}</S.Nickname>
          <S.Introduction>
            항상 좋은 일이 가득하길 <br />
            항상 건강하길 바랍니다.
          </S.Introduction>
          <S.EditButton onClick={() => navigate('/my-page/edit')}>
            내 정보 수정
          </S.EditButton>
        </S.ProfileContent>
      </S.ProfileWrapper>
      <S.MenuList>
        <S.RowMenu>
          <S.RowMenuItem color="#FFA263">
            <S.RowMenuTitle>
              내가 남긴 이야기,
              <br />
              다시 만나는 기록
            </S.RowMenuTitle>
            <S.RowMenuDescription>
              내가 쓴 글<img src={rightArrow} />
            </S.RowMenuDescription>
          </S.RowMenuItem>
          <S.RowMenuItem color="#FF893B">
            <S.RowMenuTitle>
              누가 내 얘기 들었나? <br />
              따끈따끈 반응 체크!
            </S.RowMenuTitle>
            <S.RowMenuDescription>
              내가 공유한 정보 <img src={rightArrow} />
            </S.RowMenuDescription>
          </S.RowMenuItem>
        </S.RowMenu>
        <S.ColumnMenuItem>
          <S.ColumnImage src={cookie} />
          <S.ColumnContent>
            <S.ColumnTextBox>
              <S.ColumnTitle>포춘쿠키 모아보기</S.ColumnTitle>
              <S.ColumnDescription>
                과연 오늘의 포춘쿠키는 뭘까?
              </S.ColumnDescription>
            </S.ColumnTextBox>
            <S.ColumnButton>조회하기</S.ColumnButton>
          </S.ColumnContent>
        </S.ColumnMenuItem>
      </S.MenuList>
    </S.Container>
  );
};

export default MyPage;
