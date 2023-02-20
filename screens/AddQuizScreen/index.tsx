import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import * as Yup from "yup";

import { ButtonWrapper } from "theme/Button";
import FormattedMessage from "theme/FormattedMessage";
import { Form } from "./form";
import messages from "./messages";
import { useRouter } from "next/router";
import { useCreateQuiz } from "providers/Questions";
import { useQuizCategory } from "providers/Categories";
import { Add } from "@mui/icons-material";
import RemoveIcon from "@mui/icons-material/Remove";

interface FormInputError {
  que: string;
  options: string[];
  ans: string;
  category: string;
}

const AddQuizScreen: React.FC = () => {
  const categorySet = useQuizCategory();

  const validationSchema = Yup.object().shape({
    quiz: Yup.array().of(
      Yup.object().shape({
        options: Yup.array()
          .min(2, "Question must have at least 2 option ")
          .of(Yup.string().trim().required("Option must not be empty "))
          .test(
            "all-non-empty",
            ", All options must be non-empty",
            function (value) {
              return (value ?? []).every((val) => val && val.trim().length > 0);
            },
          )
          .test("all-unique", "All options must be unique", function (value) {
            const uniqueValues = new Set(value);
            return uniqueValues.size === value?.length;
          }),
        que: Yup.string().required("Question is required").label("question"),
        ans: Yup.string().required("Answer is required").label("answer"),
        category: Yup.string()
          .required("Category is required")
          .label("category"),
      }),
    ),
  });
  const { enqueueSnackbar } = useSnackbar();
  const createQuiz = useCreateQuiz();
  const router = useRouter();

  const [numberOfForm, setNumberOfForm] = useState<number>(1);

  useEffect(() => {
    if (createQuiz.isSuccess) {
      enqueueSnackbar(<FormattedMessage {...messages.successMessage} />, {
        variant: "success",
      });
      router.push(`/`);
    }
  }, [createQuiz.isSuccess]);

  const initialValues = {
    quiz: [
      {
        que: "",
        options: [""],
        ans: "",
        category: "",
      },
    ],
  };
  // use formik
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    setFieldValue,
    errors,
    values,
    touched,
    isSubmitting,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      values.quiz.map((submission) =>
        createQuiz.mutate({
          que: submission.que,
          queNo: `que_${Math.floor(Math.random() * 1000)}`,
          options: submission.options.filter((option) => !!option),
          ans: submission.ans,
          category: submission.category,
        }),
      );

      setSubmitting(false);
      resetForm();
    },
  });

  const generateQuizForm = (i: number) => {
    return (
      <Grid item xs={12} md={6} lg={12} key={i}>
        {i > 1 && (
          <Grid item alignContent="end">
            <ButtonWrapper
              variant="contained"
              color="secondary"
              onClick={() => handleRemoveForm(i - 1)}
            >
              <RemoveIcon />
            </ButtonWrapper>
          </Grid>
        )}
        <Form
          handleChange={handleChange}
          handleBlur={handleBlur}
          errors={errors?.quiz as FormInputError[]}
          touched={touched?.quiz}
          values={values.quiz}
          setFieldValue={setFieldValue}
          index={i - 1}
          categories={categorySet.data}
        />
      </Grid>
    );
  };

  const generateForm = () => {
    let listOfForm = [];
    for (let i = 1; i <= numberOfForm; i++) {
      listOfForm.push(generateQuizForm(i));
    }
    return listOfForm;
  };

  const handleAddForm = () => {
    values.quiz.push({
      que: "",
      options: [""],
      ans: "",
      category: "",
    });
    setNumberOfForm(numberOfForm + 1);
  };

  const handleRemoveForm = (i: number) => {
    values.quiz.splice(i, 1);
    setNumberOfForm(numberOfForm - 1);
  };

  if (createQuiz.isLoading) {
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

  return (
    <Container>
      <Paper
        sx={{
          margin: (theme) => theme.spacing(2),
          padding: (theme) => theme.spacing(2),
          position: "relative",
        }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
            mb={2}
          >
            <Typography sx={{ m: 1 }} variant="h4">
              <FormattedMessage {...messages.pageTitle} />
            </Typography>
            <Box sx={{ m: 1 }}>
              <ButtonWrapper
                variant="contained"
                onClick={handleAddForm}
                color="secondary"
              >
                <Add />
              </ButtonWrapper>

              <Link href="/" style={{ textDecoration: "inherit" }}>
                <ButtonWrapper
                  variant="contained"
                  sx={{
                    color: (theme) => theme.palette.primary.light,
                    background: (theme) => theme.palette.primary.dark,
                  }}
                >
                  <FormattedMessage {...messages.backButton} />
                </ButtonWrapper>
              </Link>
            </Box>
          </Box>

          <Grid container direction="row" spacing={3}>
            {generateForm()}
            <Grid item>
              <Box sx={{ m: 1 }}>
                <ButtonWrapper
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={isSubmitting}
                >
                  <FormattedMessage {...messages.submitButton} />
                </ButtonWrapper>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddQuizScreen;
