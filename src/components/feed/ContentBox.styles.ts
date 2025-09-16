import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 4rem);
  height: 50%;
  border-radius: 2rem;
  background: #fff;
  box-shadow: 0 0 4px 0 rgba(210, 210, 210, 0.3);
  margin-top: 5.6rem;
  align-items: center;
`;

export const Preview = styled.img`
  width: calc(100% - 2.8rem);
  height: 24.7rem;
  flex-shrink: 0;
  margin-top: 1.9rem;
  object-fit: cover;
  border-radius: 2rem;
  aspect-ratio: 32.5 / 24.7;
  cursor: pointer;
`;

export const TextArea = styled.textarea`
  width: calc(100% - 3.4rem);
  height: 100%;
  padding: 1.7rem 0;
  background: none;
  &:focus {
    outline: none;
  }
`;
