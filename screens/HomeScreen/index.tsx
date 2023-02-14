import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  Typography,
} from "@mui/material";
import * as Yup from "yup";

import { quizSet } from "./data";
import { Box, Container } from "@mui/system";

import { app, database } from 'platform/initFirebase';
import { collection, addDoc } from "@firebase/firestore";


interface QuizValues {
  [key: string]: any;
}

const HomeScreen: React.FC = () => {
  const dbInstance = collection(database, 'quiz-result');

  let [score, setScore] = useState<number>(0);

  const validationSchema = Yup.object().shape({
    que_1: Yup.string().required().label("Question 1"),
    que_2: Yup.string().required().label("Question 2"),
    que_3: Yup.string().required().label("Question 3"),
    que_4: Yup.string().required().label("Question 4"),
    que_5: Yup.string().required().label("Question 5"),
    que_6: Yup.string().required().label("Question 6"),
    que_7: Yup.string().required().label("Question 7"),
    que_8: Yup.string().required().label("Question 8"),
  });

  const initialValues: QuizValues = {
    que_1: "",
    que_2: "",
    que_3: "",
    que_4: "",
    que_5: "",
    que_6: "",
    que_7: "",
    que_8: "",
  };
  

  return (
    <Container>
      <Paper
        sx={{
          margin: (theme) => theme.spacing(2),
          padding: (theme) => theme.spacing(2),
        }}
      >
        <Typography variant="h5">Quiz App {score}</Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            quizSet.forEach((quiz) => {
              if(values[quiz.queNo] == quiz.ans){
                setScore(++score)
              }
            })

            addDoc(dbInstance, {
              name: "test",
              email: "test@gmail.com",
              total_ques: quizSet.length,
              score: score
            });


            setSubmitting(true);
            resetForm();
          }}
          validationSchema={validationSchema}
        >
          {({ isSubmitting }) => (
            <Form>
              {quizSet.map((quiz) => (
                <Box py={3} sx={{ borderBottom: "1px solid #f2f2f2" }} key={quiz.queNo}>
                  <Typography variant="subtitle2">{quiz.que}</Typography>
                  <Field name={quiz.queNo} as={RadioGroup}>
                    {quiz.options.map((option) => (
                      <FormControlLabel
                        value={option.que_options}
                        control={
                          <Radio
                            sx={{
                              "&, &.Mui-checked": {
                                color: "#ccc",
                              },
                            }}
                          />
                        }
                        label={option.que_options}
                      />
                    ))}
                  </Field>
                </Box>
              ))}

              <Box py={3}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default HomeScreen;
