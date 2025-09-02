import { FortuneCookieData } from './types';

export const fortuneCookieMessages: FortuneCookieData[] = [
  {
    id: 1,
    message: "자주 웃어라. 웃는 것을 미루면, 쌓이지 않고, 더 사라지더라.",
    category: "행복"
  },
  {
    id: 2,
    message: "오늘 하루도 당신의 미소로 시작하세요. 세상이 밝아집니다.",
    category: "행복"
  },
  {
    id: 3,
    message: "작은 진전도 진전입니다. 한 걸음씩 나아가세요.",
    category: "성장"
  },
  {
    id: 4,
    message: "당신의 꿈을 믿으세요. 그것이 현실이 되는 첫 번째 단계입니다.",
    category: "꿈"
  },
  {
    id: 5,
    message: "오늘은 어제보다 더 나은 하루가 될 것입니다.",
    category: "희망"
  },
  {
    id: 6,
    message: "인내는 쓴 약이지만, 그 열매는 달콤합니다.",
    category: "인내"
  },
  {
    id: 7,
    message: "당신의 긍정적인 에너지가 주변 사람들에게 전파됩니다.",
    category: "에너지"
  },
  {
    id: 8,
    message: "실패는 성공의 어머니입니다. 포기하지 마세요.",
    category: "성공"
  },
  {
    id: 9,
    message: "오늘 하루도 당신다운 모습으로 살아가세요.",
    category: "자기계발"
  },
  {
    id: 10,
    message: "작은 친절이 큰 변화를 만듭니다. 오늘도 따뜻하게.",
    category: "친절"
  },
  {
    id: 11,
    message: "당신의 열정이 세상을 바꿉니다. 꿈을 향해 달려가세요.",
    category: "열정"
  },
  {
    id: 12,
    message: "오늘의 도전이 내일의 성공을 만듭니다.",
    category: "성공"
  },
  {
    id: 13,
    message: "당신은 이미 충분히 훌륭합니다. 자신을 믿으세요.",
    category: "자신감"
  },
  {
    id: 14,
    message: "행복은 선택입니다. 오늘도 행복을 선택하세요.",
    category: "행복"
  },
  {
    id: 15,
    message: "당신의 존재 자체가 누군가에게는 선물입니다.",
    category: "존재"
  }
];

export const getRandomFortuneCookie = (): FortuneCookieData => {
  const randomIndex = Math.floor(Math.random() * fortuneCookieMessages.length);
  return fortuneCookieMessages[randomIndex];
};
