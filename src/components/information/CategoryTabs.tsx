import React from 'react';
import * as S from '../../pages/information/index.styles';

export type CategoryValue = string | null;

type Category = { label: string; value: CategoryValue };

type Props = {
  categories: Category[];
  selected: CategoryValue;
  onChange: (value: CategoryValue) => void;
};

const CategoryTabs: React.FC<Props> = ({ categories, selected, onChange }) => {
  return (
    <S.CategoryBox>
      {categories.map((cat, idx) => (
        <S.Category
          key={`${cat.value ?? 'ALL'}-${idx}`}
          selected={selected === cat.value}
          onClick={() => onChange(cat.value)}
        >
          {cat.label}
        </S.Category>
      ))}
    </S.CategoryBox>
  );
};

export default CategoryTabs;
