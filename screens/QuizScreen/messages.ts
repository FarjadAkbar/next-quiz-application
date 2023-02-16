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
  submitButton: {
    id: `${scope}.submitButton`,
    defaultMessage: "Submit",
  },
  successMessage:{
    id: `${scope}.successMessage`,
    defaultMessage: "Quiz Submit Successfully",
  }
 
});
