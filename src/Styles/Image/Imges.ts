// src/Styles/Image/FrontCharactor.ts
import styled from "styled-components";
import frontCharImg from "../../assets/FrontCharacter.png";
import logoTextImg from "../../assets/LogoText.png";
import logoTextOrangeImg from "../../assets/LogoTextOrange.png";
import capCharacterImgSrc from "../../assets/CapCharacter.png";
import scarfCharacterImg from "../../assets/ScarfCharacter.png";
import mypageCharacterImg from "../../assets/MypageCharacter.png";

export const FrontCharacterImg = styled.img.attrs({
  src: frontCharImg,
  alt: "Front Charactor",
})`
  width: 100%;
  height: 200px;
  margin-top: auto;
`;

export const LogoTextImg = styled.img.attrs({
  src: logoTextImg,
  alt: "Logo Text",
})`

`;

export const LogoTextOrangeImg = styled.img.attrs({
  src: logoTextOrangeImg,
  alt: "logoTextOrangeImg",
})`
  width: 180px;
  height: auto;
`;

export const CapCharacterImg = styled.img.attrs({
  src: capCharacterImgSrc,
  alt: "CapCharacterImg",
})`
  width: 50%;
  margin-top: auto;
`;

export const ScarfCharacterImg = styled.img.attrs({
  src: scarfCharacterImg,
  alt: "scarfCharacterImg",
})`
  width: 50%;
  margin-top: auto;
`;

export const MypageCharacterImg = styled.img.attrs({
  src: mypageCharacterImg,
  alt: "mypageCharacterImg",
})`
  width: 100%;
`;