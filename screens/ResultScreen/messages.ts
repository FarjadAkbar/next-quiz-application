/*
 * ResultScreen Messages
 *
 * This contains all the text for the ResultScreen
 */

import { defineMessages } from "react-intl";

export const scope = "app.screens.ResultScreen";

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: "Your Result Quiz App",
  },
  restartButton: {
    id: `${scope}.restartButton`,
    defaultMessage: "Restart",
  },
  name: {
    id: `${scope}.name`,
    defaultMessage: "Name:",
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: "Email:",
  },
  category: {
    id: `${scope}.category`,
    defaultMessage: "Category:",
  },
  score: {
    id: `${scope}.score`,
    defaultMessage: "Score:",
  },
  question: {
    id: `${scope}.question`,
    defaultMessage: "Total Question:",
  },
  successMessage: {
    id: `${scope}.successMessage`,
    defaultMessage: "Quiz Submit Successfully",
  },

  yourAns: {
    id: `${scope}.yourAns`,
    defaultMessage: "Submission Answers",
  },
  correctAns: {
    id: `${scope}.correctAns`,
    defaultMessage: "Correct Answer:",
  },
});
