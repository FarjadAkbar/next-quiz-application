import { ChangeEvent } from "react";
import {
  Grid,
  Paper,
  Typography,
  OutlinedInput,
  FormHelperText,
  Select,
  MenuItem,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { FormikErrors, FormikTouched } from "formik";

import FormattedMessage, { useFormattedMessage } from "theme/FormattedMessage";

import messages from "./messages";
import { InputLabelWrapper } from "./Styled";
import Link from "next/link";
import { ButtonWrapper } from "theme/Button";

interface FormIntroProps {
  name: string;
  email: string;
  category: string;
}

interface IntroProps {
  values: FormIntroProps;
  touched?: FormikTouched<FormIntroProps>;
  errors?: FormikErrors<FormIntroProps>;
  handleChange: (e: ChangeEvent<any>) => void;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  categories: any;
  setQuestionData: any;
  questionSet: any;
}

const QuizIntro: React.FC<IntroProps> = ({
  values,
  touched,
  errors,
  handleChange,
  setFieldValue,
  categories,
  setQuestionData,
  questionSet,
}) => {
  const namePlaceholder = useFormattedMessage(messages.namePlaceholder);
  const emailPlaceholder = useFormattedMessage(messages.emailPlaceholder);

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #f1f1f1",
          paddingBottom: (theme) => theme.spacing(2),
        }}
      >
        <Typography variant="h5">
          <FormattedMessage {...messages.pageTitleIntro} />
        </Typography>
        <Link href="/add-quiz" style={{ textDecoration: "inherit" }}>
          <ButtonWrapper color="primary" variant="contained">
            <FormattedMessage {...messages.addButton} />
          </ButtonWrapper>
        </Link>
      </Box>

      <Box>
        <Grid item xs={12}>
          <InputLabelWrapper htmlFor={`name`}>
            <FormattedMessage {...messages.nameLabel} />
          </InputLabelWrapper>
          <OutlinedInput
            id={`name`}
            name={`name`}
            placeholder={namePlaceholder}
            fullWidth
            value={values.name ?? ""}
            onChange={handleChange}
            error={Boolean(touched && errors && touched.name && errors.name)}
          />
          {touched && errors && touched.name && errors.name && (
            <FormHelperText error id="standard-weight-helper-text-name">
              {errors.name}
            </FormHelperText>
          )}
        </Grid>

        <Grid item xs={12}>
          <InputLabelWrapper htmlFor={`email`}>
            <FormattedMessage {...messages.emailLabel} />
          </InputLabelWrapper>
          <OutlinedInput
            id={`email`}
            name={`email`}
            placeholder={emailPlaceholder}
            fullWidth
            value={values.email ?? ""}
            onChange={handleChange}
            error={Boolean(touched && errors && touched.email && errors.email)}
          />
          {touched && errors && touched.email && errors.email && (
            <FormHelperText error id="standard-weight-helper-text-email">
              {errors.email}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12}>
          <InputLabelWrapper htmlFor="category">
            <FormattedMessage {...messages.categoryLabel} />
          </InputLabelWrapper>
          <Select
            labelId="category"
            id="category"
            name="category"
            value={values.category}
            onChange={(e) => {
              setFieldValue(`category`, e.target.value);

              if (e.target.value === "all") {
                setQuestionData(questionSet);
              } else {
                setQuestionData(
                  questionSet?.filter((q: any) => q.category == e.target.value),
                );
              }
            }}
          >
            <MenuItem value="all">
              <FormattedMessage {...messages.allLabel} />
            </MenuItem>
            {categories?.map((category: any) => (
              <MenuItem value={category.value} key={category.value}>
                {category.label}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Box>
    </Container>
  );
};

export default QuizIntro;
