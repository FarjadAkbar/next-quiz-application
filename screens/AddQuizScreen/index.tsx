import React, { useState, useEffect } from "react";
import Link from 'next/link'
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import * as Yup from "yup";

import { ButtonWrapper } from "theme/Button";
import FormattedMessage from "theme/FormattedMessage";
import { Form } from "./form";
import messages from "./messages";
import { CardHeaderWrapper, InputLabelWrapper } from "./Styled";
import { useRouter } from "next/router";
import { useCreateQuiz } from "providers/Questions";

const AddQuizScreen: React.FC = () => {
  const validationSchema = Yup.object().shape({
    que: Yup.string().required().label("question"),
    options: Yup.array().required().label("option"),
    ans: Yup.string().required().label("answer"),
  });

  const { enqueueSnackbar } = useSnackbar();
  const createQuiz = useCreateQuiz();
  const router = useRouter();

  useEffect(() => {
    if (createQuiz.isSuccess) {
      enqueueSnackbar(<FormattedMessage {...messages.successMessage} />, {
        variant: "success",
      });
      router.push(`/`);
    }
  }, [createQuiz.isSuccess]);

  // use formik
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    setFieldValue,
    errors,
    values,
    touched,
  } = useFormik({
    initialValues: {
      que: "",
      options: [""],
      ans: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      createQuiz.mutate({
        que: values.que,
        queNo: `que_${Math.floor(Math.random() * 1000)}`,
        options: values.options.filter(option => !!option),
        ans: values.ans,
      });

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
              <Link href="/"  style={{ textDecoration: 'inherit'}}>
                <ButtonWrapper variant="contained" sx={{color: (theme) => theme.palette.primary.light, background: (theme) => theme.palette.primary.dark}}>
                  <FormattedMessage {...messages.backButton} />
                </ButtonWrapper>
              </Link>
            </Box>
          </Box>

          <Grid container direction="row" spacing={3}>
            <Grid item xs={12} md={6} lg={12}>
              <Form
                handleChange={handleChange}
                handleBlur={handleBlur}
                errors={errors}
                values={values}
                touched={touched}
                setFieldValue={setFieldValue}
              />
            </Grid>
            <Grid item>
            <Box sx={{ m: 1 }}>
              <ButtonWrapper type="submit" color="primary" variant="contained">
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
