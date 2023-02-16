import React, { useState, useEffect } from "react";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import * as Yup from "yup";

import { ButtonWrapper } from "theme/Button";
import FormattedMessage from "theme/FormattedMessage";
import { Form } from "./form";
import messages from "./messages";
import { CardHeaderWrapper, InputLabelWrapper } from "./Styled";

const AddQuizScreen: React.FC = () => {
  // const validationSchema = Yup.object().shape({
  //   que: Yup.string().required().label("question"),
  //   options: Yup.string().required().label("option"),
  //   ans: Yup.string().required().label("answer"),
  // });

  // use formik
  const { handleChange, handleSubmit, handleBlur, setFieldValue, errors, values, touched } = useFormik({
    initialValues: {
      que: "",
      options: [],
      ans: ""
    },
    // validationSchema,
    onSubmit: (values, { resetForm }) => {
      resetForm();
    },
  });

  console.log(values)

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
              <ButtonWrapper color="primary" variant="contained">
                <FormattedMessage {...messages.submitButton} />
              </ButtonWrapper>
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
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddQuizScreen;
