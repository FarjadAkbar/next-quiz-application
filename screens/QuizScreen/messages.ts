/*
 * QuizScreen Messages
 *
 * This contains all the text for the QuizScreen
 */

import { defineMessages } from "react-intl";

export const scope = "app.screens.QuizScreen";

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: "Quiz App",
  },
  pageTitleIntro: {
    id: `${scope}.pageTitleIntro`,
    defaultMessage: "Select Questions Category",
  },
  submitButton: {
    id: `${scope}.submitButton`,
    defaultMessage: "Submit",
  },
  successMessage: {
    id: `${scope}.successMessage`,
    defaultMessage: "Quiz Submit Successfully",
  },
  nextButton: {
    id: `${scope}.nextButton`,
    defaultMessage: "Next Button",
  },
  backButton: {
    id: `${scope}.backButton`,
    defaultMessage: "Back Button",
  },
  addButton: {
    id: `${scope}.addButton`,
    defaultMessage: "Add Quiz",
  },

  nameLabel:{
    id: `${scope}.nameLabel`,
    defaultMessage: "Name",
  },
  emailLabel:{
    id: `${scope}.emailLabel`,
    defaultMessage: "Email",
  },
  
  categoryLabel:{
    id: `${scope}.categoryLabel`,
    defaultMessage: "Category",
  },

  namePlaceholder:{
    id: `${scope}.namePlaceholder`,
    defaultMessage: "Name",
  },

  emailPlaceholder:{
    id: `${scope}.emailPlaceholder`,
    defaultMessage: "Email",
  },

  startButton:{
    id: `${scope}.startButton`,
    defaultMessage: "Start Quiz",
  }

});
