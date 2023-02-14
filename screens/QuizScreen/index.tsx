import React, { useState, useEffect } from "react";
import { Formik, Form, ErrorMessage, useFormik } from "formik";
import {
  Button,
  TextField,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  Paper,
  Typography,
} from "@mui/material";
import * as Yup from "yup";

import { Box, Container } from "@mui/system";

import { app, database } from "platform/initFirebase";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";
import messages from "./messages";
import { useCreateResult } from "providers/Results";
import { useQuizQuestion } from "providers/Questions";

interface QuizValues {
  [key: string]: any;
}

const QuizScreen: React.FC = () => {
  const questionSet = useQuizQuestion();

  let [score, setScore] = useState<number>(0);
  const [submission, setSubmission] = useState<string[]>([]);
  const [correctAns, setCorrectAns] = useState<string[]>([]);

  const initialValues: QuizValues = {};

  const { enqueueSnackbar } = useSnackbar();
  const createResult = useCreateResult();
  const router = useRouter();

  useEffect(() => {
    if (createResult.isSuccess) {
      enqueueSnackbar(<FormattedMessage {...messages.successMessage} />, {
        variant: "success",
      });
      router.push(`result/${createResult.data}`);
    }
  }, [createResult.isSuccess]);

  const { handleChange, handleSubmit, values, isSubmitting } = useFormik({
    initialValues,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      questionSet.data?.forEach(
        (quiz: { queNo: string | number; ans: any }) => {
          if (values[quiz.queNo] == quiz.ans) {
            setScore(++score);
          }
          setSubmission((current) => [...current, values[quiz.queNo]]);
          setCorrectAns((current) => [...current, quiz.ans]);
        },
      );

      createResult.mutate({
        name: "abc",
        email: "ew@gmail.com",
        total_ques: questionSet.data?.length,
        score: score,
        submission: submission,
        correctAns: correctAns,
      });
      setSubmitting(true);
      resetForm();
    },
  });

  return (
    <Container>
      <Paper
        sx={{
          margin: (theme) => theme.spacing(2),
          padding: (theme) => theme.spacing(2),
        }}
      >
        <Typography variant="h5">
          <FormattedMessage {...messages.pageTitle} />
        </Typography>

        {!questionSet.isLoading && (
          <Box component="form" onSubmit={handleSubmit}>
            {questionSet.data?.map((quiz: any) => (
              <Box py={3} sx={{ borderBottom: "1px solid" }} key={quiz.queNo}>
                <Typography variant="subtitle2">{quiz.que}</Typography>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name={quiz.queNo}
                    onChange={handleChange}
                  >
                    {quiz.options?.map((option: any) => (
                      <FormControlLabel
                        value={option}
                        key={option}
                        control={
                          <Radio
                            sx={{
                              "&, &.Mui-checked": {
                                color: "#ccc",
                              },
                            }}
                          />
                        }
                        label={option}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Box>
            ))}
            <Box py={3}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                <FormattedMessage {...messages.submitButton} />
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default QuizScreen;
