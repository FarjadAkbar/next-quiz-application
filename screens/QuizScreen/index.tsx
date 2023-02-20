import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import { Paper, Typography, CircularProgress } from "@mui/material";
import { Box, Container } from "@mui/system";

import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import * as Yup from "yup";

import { useCreateResult } from "providers/Results";
import { useQuizQuestion } from "providers/Questions";
import FormattedMessage from "theme/FormattedMessage";

import Questions from "components/Questions";
import messages from "./messages";
import { ButtonWrapper } from "theme/Button";
import { useQuizCategory } from "providers/Categories";
import QuizIntro from "./intro";

interface QuizValues {
  [key: string]: any;
}

const QuizScreen: React.FC = () => {
  const questionSet = useQuizQuestion();
  const categorySet = useQuizCategory();

  let [step, setStep] = useState<number>(0);
  let [score, setScore] = useState<number>(0);
  const [nextDisabled, setNextDisabled] = useState<boolean>(true);
  const [backDisabled, setBackDisabled] = useState<boolean>(true);
  const [intro, setIntro] = useState<boolean>(true);

  const [questionData, setQuestionData] = useState<any>();

  const initialValues: QuizValues = {
    category: "all"
  };


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
    setQuestionData(questionSet.data);
  }, [createResult.isSuccess, questionSet.isSuccess]);

  const handleNext = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    setStep(++step);
    if (questionData && !values[questionData[step].queNo]) {
      setNextDisabled(true);
    }

    if (step > 0) {
      setBackDisabled(false);
    }
  };

  const handleBack = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    setStep(--step);

    if (questionData && values[questionData[step].queNo]) {
      setNextDisabled(false);
    }

    if (step <= 0) {
      setBackDisabled(true);
    }
  };

  const {
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    isSubmitting,
    setFieldValue,
  } = useFormik({
    initialValues,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      questionData?.forEach((quiz: { queNo: string | number; ans: any }) => {
        if (values[quiz.queNo] == quiz.ans) {
          setScore(++score);
        }
      });
      
      const submission = { ...values };
      delete submission?.category;

      createResult.mutate({
        name: "abc",
        email: "ew@gmail.com",
        category: values.category,
        total_ques: questionData?.length,
        score: score,
        submission: submission,
      });
      setSubmitting(true);
      resetForm();
    },
  });

  if (!questionSet.isFetched || createResult.isLoading) {
    return (
      <CircularProgress
        size={68}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          marginTop: "-12px",
          marginLeft: "-12px",
        }}
      />
    );
  }
  // console.log(questionData, "data...........");

  return (
    <Container>
      <Paper
        sx={{
          margin: (theme) => theme.spacing(2),
          padding: (theme) => theme.spacing(2),
        }}
      >
        {intro ? (
          <>
          <QuizIntro
            values={values}
            setFieldValue={setFieldValue}
            setQuestionData={setQuestionData}
            categories={categorySet.data}
            questionSet={questionSet.data}
          />
          <Box p={3}>
          <ButtonWrapper
            variant="contained"
            color="primary"
            onClick={() => { setIntro(false)}}
          >
            <FormattedMessage {...messages.startButton} />
          </ButtonWrapper>
          </Box>
          </>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: (theme) => theme.spacing(2),
              }}
            >
              <Typography variant="h5">
                <FormattedMessage {...messages.pageTitle} /> {step + 1} /{" "}
                {questionData?.length}
              </Typography>
              <Link href="/add-quiz" style={{ textDecoration: "inherit" }}>
                <ButtonWrapper color="primary" variant="contained">
                  <FormattedMessage {...messages.addButton} />
                </ButtonWrapper>
              </Link>
            </Box>
            {!questionSet.isLoading && (
              <Box component="form" onSubmit={handleSubmit}>
                {questionSet && questionData && (
                  <Questions
                    question={questionData[step]?.que}
                    name={questionData[step]?.queNo}
                    value={values[questionData[step]?.queNo]}
                    changeHandler={(e) => {
                      handleChange(e);
                      setNextDisabled(false);
                    }}
                    options={questionData[step]?.options}
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

                  {questionData?.length === step + 1 ? (
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
          </>
        )}
      </Paper>
    </Container>
  );
};

export default QuizScreen;
