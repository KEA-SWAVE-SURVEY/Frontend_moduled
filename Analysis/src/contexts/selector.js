import { selector } from "recoil";
import { surveyListState, answerListState, navbarState } from './atom.js'

export const getSurveyList = selector({
  key: 'getSurveyListState',

  get: ({ get }) => {
    const surveyList = get(surveyListState);
    return surveyList;
  },
});

export const getAnswerList = selector({
  key: 'getAnswerListState',

  get: ({ get }) => {
    const answerList = get(answerListState);
    return answerList;
  },
});

export const navbarItemState = selector({
  key: 'navbarItemState',

  get: ({ get }) => {
    const navbarItem = get(navbarState).item;
    return navbarItem;
  },
  set: ({ set }, newValue) => {
    set(navbarState, (prev) => {
      return { item : newValue, selected: prev.selected }
    });
  }
});

export const navbarSelectedState = selector({
  key: 'navbarSelectedState',

  get: ({ get }) => {
    const selected = get(navbarState).selected;
    return selected;
  },
  set: ({ set }, newValue) => {
    set(navbarState, (prev) => {
      return { item : prev.item, selected : newValue }
    });
  }
});


