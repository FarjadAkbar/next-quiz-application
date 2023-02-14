/*
 * HomeScreen Messages
 *
 * This contains all the text for the HomeScreen
 */

import { defineMessages } from "react-intl";

export const scope = "app.screens.HomeScreen";

export default defineMessages({
  welcome: {
    id: `${scope}.welcome`,
    defaultMessage: "Welcome To Quiz App",
  },
  name: {
    id: `${scope}.name`,
    defaultMessage: "Name",
  },
  namePlaceholder: {
    id: `${scope}.namePlaceholder`,
    defaultMessage: "Enter Name"
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: "Email",
  },
  emailPlaceholder: {
    id: `${scope}.emailPlaceholder`,
    defaultMessage: "Enter Email"
  },



  
  quizAppTitle: {
    id: `${scope}.quizAppTitle`,
    defaultMessage: "Quiz App",
  },
 
 
});
