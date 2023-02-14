import { ChangeEvent, useState } from "react";
import {
  FormHelperText,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { FormikErrors, FormikTouched } from "formik";

import FormattedMessage, { useFormattedMessage } from "theme/FormattedMessage";

import messages from "./messages";
import { CardHeaderWrapper, InputLabelWrapper } from "./Styled";
import { ButtonWrapper } from "theme/Button";
import { Add } from "@mui/icons-material";

interface FormInputProps {
  que: string;
  options: string[];
  ans: string | number | boolean;
}

interface FormProps {
  values: FormInputProps;
  touched: FormikTouched<FormInputProps>;
  errors: FormikErrors<FormInputProps>;
  handleBlur: (e: ChangeEvent<any>) => void;
  handleChange: (e: ChangeEvent<any>) => void;
  setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void;
}

export const Form: React.FC<FormProps> = ({
  touched,
  values,
  errors,
  handleBlur,
  handleChange,
  setFieldValue,
}) => {
  const textPlaceholder = useFormattedMessage(messages.textPlaceholder);
  const optionPlaceholder = useFormattedMessage(messages.optionPlaceholder);

  const [numberOfFields, setNumberOfFields] = useState<number>(3);

  const generateInputField = (ingredientNum: number) => {
    return (
      <Grid item xs={4}>
        <InputLabelWrapper htmlFor="quiz-option">
          <FormattedMessage {...messages.optionLabel} />
        </InputLabelWrapper>
        <OutlinedInput
          id="quiz-option"
          name="options[]"
          value={values.options[ingredientNum]}
          placeholder={optionPlaceholder}
          fullWidth
          onBlur={handleBlur}
          onChange={handleChange}
          error={Boolean(touched.options && errors.options)}
        />
        {touched.options && errors.options && (
          <FormHelperText error id="standard-weight-helper-text-option">
            {errors.options}
          </FormHelperText>
        )}
      </Grid>
    );
  };

  const generateFields = () => {
    let listOfFields = [];
    for (let i = 1; i <= numberOfFields; i++) {
      listOfFields.push(generateInputField(i));
    }
    return listOfFields;
  };

  const handleAddField = () => {
    if (numberOfFields < 10) setNumberOfFields(numberOfFields + 1);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <InputLabelWrapper htmlFor="quiz-que">
          <FormattedMessage {...messages.questionLabel} />
        </InputLabelWrapper>
        <OutlinedInput
          id="quiz-que"
          name="que"
          placeholder={textPlaceholder}
          fullWidth
          value={values.que}
          onBlur={handleBlur}
          onChange={handleChange}
          error={Boolean(touched.que && errors.que)}
        />
        {touched.que && errors.que && (
          <FormHelperText error id="standard-weight-helper-text-que">
            {errors.que}
          </FormHelperText>
        )}
      </Grid>

      {generateFields()}
      <Grid item xs={12}>
        {numberOfFields < 10 && (
          <ButtonWrapper
            variant="contained"
            color="primary"
            onClick={handleAddField}
          >
            <Add />
          </ButtonWrapper>
        )}
      </Grid>

      <Grid item xs={12}>
        <InputLabelWrapper htmlFor="quiz-ans">
          <FormattedMessage {...messages.ansLabel} />
          {
            values.options
          }
        </InputLabelWrapper>
        <Select
          labelId="quiz-ans"
          id="quiz-ans"
          name="ans"
          value={values.ans}
          onChange={(e) => {
            if (setFieldValue) {
              setFieldValue("ans", e.target.value);
            }
          }}
        >
          {values.options?.map((option) => (
            <MenuItem value={option} key={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </Grid>
    </Grid>
  );
};
