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
    defaultMessage: "Add Quiz",
  },
  submitButton: {
    id: `${scope}.submitButton`,
    defaultMessage: "Submit",
  },
  successMessage: {
    id: `${scope}.successMessage`,
    defaultMessage: "Quiz Add Successfully",
  },

  textPlaceholder: {
    id: `${scope}.textPlaceholder`,
    defaultMessage: "Write Question",
  },
  questionLabel: {
    id: `${scope}.questionLabel`,
    defaultMessage: "Question",
  },
  optionLabel: {
    id: `${scope}.optionLabel`,
    defaultMessage: "Option",
  },
  optionPlaceholder: {
    id: `${scope}.optionPlaceholder`,
    defaultMessage: "Option",
  },

  
  ansLabel: {
    id: `${scope}.ansLabel`,
    defaultMessage: "Answer",
  },
  backButton: {
    id: `${scope}.backButton`,
    defaultMessage: "Back",
  },
});
