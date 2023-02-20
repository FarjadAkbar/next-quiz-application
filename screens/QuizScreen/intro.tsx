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

interface FormIntroProps {
  category: string | number | boolean;
}

interface IntroProps {
  values: any;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  categories: any;
  setQuestionData: any;
  questionSet: any;
}

const QuizIntro: React.FC<IntroProps> = ({
  values,
  setFieldValue,
  categories,
  setQuestionData,
  questionSet,
}) => {
  return (
    <Container>
      <Typography variant="h5">
        <FormattedMessage {...messages.pageTitleIntro} />
      </Typography>

      <Box>
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
            <MenuItem value="all">All</MenuItem>
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
