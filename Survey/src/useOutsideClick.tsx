import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type UseOutsideClickType = ( // 선택된 요소(el), Active 초기값(initialState)을 넘겨받는다.
  el: React.RefObject<HTMLDivElement>, 
  initialState: boolean
) => [boolean, Dispatch<SetStateAction<boolean>>];

export const useOutsideClick: UseOutsideClickType = (el, initialState) => {
  const [isActive, setIsActive] = useState(initialState);
 
  // 1)
  useEffect(() => {
    const pageClickEvent = e => {
      if (el.current !== null && !el.current.contains(e.target)) {
        setIsActive(!isActive);
      }
    };
    // 2)
    if (isActive) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => {
      window.removeEventListener('click', pageClickEvent);
    };
  }, [isActive, el]);
  // 3) 
  return [isActive, setIsActive];
};