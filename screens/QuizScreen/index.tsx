import React, { useState, useEffect } from "react";
import Link from 'next/link'
import { useFormik } from "formik";
import { Grid, Paper, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";

import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

import { useCreateResult } from "providers/Results";
import { useQuizQuestion } from "providers/Questions";
import FormattedMessage from "theme/FormattedMessage";

import Questions from "components/Questions";
import messages from "./messages";
import { ButtonWrapper } from "theme/Button";

interface QuizValues {
  [key: string]: any;
}

const QuizScreen: React.FC = () => {
  const questionSet = useQuizQuestion();

  let [step, setStep] = useState<number>(0);
  let [score, setScore] = useState<number>(0);
  const [nextDisabled, setNextDisabled] = useState<boolean>(true);
  const [backDisabled, setBackDisabled] = useState<boolean>(true);

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

  const handleNext = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    setStep(++step);
    if (questionSet.data && !values[questionSet.data[step].queNo]) {
      setNextDisabled(true);
    }

    if (step > 0) {
      setBackDisabled(false);
    }
  };

  const handleBack = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    setStep(--step);

    if (questionSet.data && values[questionSet.data[step].queNo]) {
      setNextDisabled(false);
    }

    if (step <= 0) {
      setBackDisabled(true);
    }
  };

  const { handleChange, handleSubmit, values, isSubmitting } = useFormik({
    initialValues,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      questionSet.data?.forEach(
        (quiz: { queNo: string | number; ans: any }) => {
          if (values[quiz.queNo] == quiz.ans) {
            setScore(++score);
          }
        },
      );

      createResult.mutate({
        name: "abc",
        email: "ew@gmail.com",
        total_ques: questionSet.data?.length,
        score: score,
        submission: values,
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: (theme) => theme.spacing(2),
          }}
        >
          <Typography variant="h5">
            <FormattedMessage {...messages.pageTitle} /> {step + 1} /{" "}
            {questionSet.data?.length}
          </Typography>
          <Link href="/add-quiz" style={{ textDecoration: 'inherit'}}>
            <ButtonWrapper color="primary" variant="contained">
              <FormattedMessage {...messages.addButton} />
            </ButtonWrapper>
          </Link>
        </Box>

        {!questionSet.isLoading && (
          <Box component="form" onSubmit={handleSubmit}>
            {questionSet && questionSet.data && (
              <Questions
                question={questionSet.data[step].que}
                name={questionSet.data[step].queNo}
                value={values[questionSet.data[step].queNo]}
                changeHandler={(e) => {
                  handleChange(e);
                  setNextDisabled(false);
                }}
                options={questionSet.data[step].options}
              />
            )}

            <Box py={3}>
              <ButtonWrapper
                variant="contained"
                color="secondary"
                disabled={backDisabled}
                onClick={handleBack}
              >
                <FormattedMessage {...messages.backButton} />
              </ButtonWrapper>

              {questionSet.data?.length === step + 1 ? (
                <ButtonWrapper
                  type="submit"
                  variant="contained"
                  color="success"
                  disabled={nextDisabled}
                >
                  <FormattedMessage {...messages.submitButton} />
                </ButtonWrapper>
              ) : (
                <ButtonWrapper
                  variant="contained"
                  color="primary"
                  disabled={nextDisabled}
                  onClick={handleNext}
                >
                  <FormattedMessage {...messages.nextButton} />
                </ButtonWrapper>
              )}
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default QuizScreen;
