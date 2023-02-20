import { ChangeEvent, useState } from "react";
import {
  Box,
  FormHelperText,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { FormikErrors, FormikTouched } from "formik";

import FormattedMessage, { useFormattedMessage } from "theme/FormattedMessage";

import messages from "./messages";
import { InputLabelWrapper } from "./Styled";
import { ButtonWrapper } from "theme/Button";
import { Add } from "@mui/icons-material";
import RemoveIcon from "@mui/icons-material/Remove";

interface FormInputProps {
  que: string;
  options: string[];
  ans: string | number | boolean;
  category: string | number | boolean;
}

interface FormProps {
  values: FormInputProps[];
  touched?: FormikTouched<FormInputProps[]>;
  errors?: FormikErrors<FormInputProps[]>;
  handleBlur: (e: ChangeEvent<any>) => void;
  handleChange: (e: ChangeEvent<any>) => void;
  setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void;
  index: number;
  categories: any;
}

export const Form: React.FC<FormProps> = ({
  touched,
  values,
  errors,
  handleBlur,
  handleChange,
  setFieldValue,
  index,
  categories,
}) => {
  const textPlaceholder = useFormattedMessage(messages.textPlaceholder);
  const optionPlaceholder = useFormattedMessage(messages.optionPlaceholder);

  const [numberOfFields, setNumberOfFields] = useState<number>(2);
  let listOfFields: JSX.Element[] = [];

  const generateInputField = (i: number) => {
    return (
      <Grid item xs={6} key={i}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <InputLabelWrapper htmlFor={`quiz[${index}].options`}>
            <FormattedMessage {...messages.optionLabel} />
          </InputLabelWrapper>
          {i > 2 && (
            <Grid item alignContent="end">
              <ButtonWrapper
                sx={{ height: "25px" }}
                variant="contained"
                color="secondary"
                onClick={() => handleRemoveField(i - 1)}
              >
                <RemoveIcon />
              </ButtonWrapper>
            </Grid>
          )}
        </Box>
        <OutlinedInput
          id={`quiz[${index}].options`}
          name={`quiz[${index}].options[]`}
          value={values[index]?.options[i - 1] ?? ""}
          placeholder={optionPlaceholder}
          fullWidth
          onChange={(e) => {
            if (setFieldValue) {
              setFieldValue(`quiz[${index}].options[${i - 1}]`, e.target.value);
            }
          }}
          error={Boolean(
            touched &&
              errors &&
              touched[index]?.options &&
              errors[index]?.options,
          )}
        />
        {touched &&
          errors &&
          touched[index]?.options &&
          errors[index]?.options && (
            <FormHelperText error id="standard-weight-helper-text-option">
              {errors[index]?.options}
            </FormHelperText>
          )}
      </Grid>
    );
  };

  const generateFields = () => {
    for (let i = 1; i <= numberOfFields; i++) {
      listOfFields.push(generateInputField(i));
    }
    return listOfFields;
  };

  const handleAddField = () => {
    if (numberOfFields < 6) setNumberOfFields(numberOfFields + 1);
  };

  const handleRemoveField = (i: number) => {
    values[index]?.options.splice(i, 1);
    setNumberOfFields(numberOfFields - 1);
  };

  return (
    <Grid
      container
      spacing={3}
      my={1}
      px={1}
      sx={{ borderTop: "1px solid #f1f1f1" }}
    >
      <Grid item xs={12}>
        <InputLabelWrapper htmlFor={`quiz[${index}].que`}>
          <FormattedMessage {...messages.questionLabel} />
        </InputLabelWrapper>
        <OutlinedInput
          id={`quiz[${index}].que`}
          name={`quiz[${index}].que`}
          placeholder={textPlaceholder}
          fullWidth
          value={values[index]?.que ?? ""}
          onBlur={handleBlur}
          onChange={handleChange}
          error={Boolean(
            touched && errors && touched[index]?.que && errors[index]?.que,
          )}
        />
        {touched && errors && touched[index]?.que && errors[index]?.que && (
          <FormHelperText error id="standard-weight-helper-text-que">
            {errors[index]?.que}
          </FormHelperText>
        )}
      </Grid>

      {generateFields()}
      <Grid item xs={12}>
        {numberOfFields < 6 && (
          <ButtonWrapper
            variant="contained"
            onClick={handleAddField}
            sx={{
              color: (theme) => theme.palette.primary.light,
              background: (theme) => theme.palette.primary.dark,
            }}
          >
            <Add />
          </ButtonWrapper>
        )}
      </Grid>

      <Grid item xs={12}>
        <InputLabelWrapper htmlFor={`quiz[${index}].category`}>
          <FormattedMessage {...messages.categoryLabel} />
        </InputLabelWrapper>
        <Select
          labelId={`quiz[${index}].category`}
          id={`quiz[${index}].category`}
          name={`quiz[${index}].category`}
          value={values[index]?.category ?? ""}
          error={Boolean(
            touched &&
              errors &&
              touched[index]?.category &&
              errors[index]?.category,
          )}
          onChange={(e) => {
            if (setFieldValue) {
              setFieldValue(`quiz[${index}].category`, e.target.value);
            }
          }}
        >
          {categories?.map((category: any) => (
            <MenuItem value={category.value} key={category.value}>
              {category.label}
            </MenuItem>
          ))}
        </Select>
        {touched &&
          errors &&
          touched[index]?.category &&
          errors[index]?.category && (
            <FormHelperText error id="standard-weight-helper-text-category">
              {errors[index]?.category}
            </FormHelperText>
          )}
      </Grid>

      <Grid item xs={12}>
        <InputLabelWrapper htmlFor={`quiz[${index}].ans`}>
          <FormattedMessage {...messages.ansLabel} />
        </InputLabelWrapper>
        <Select
          labelId={`quiz[${index}].ans`}
          id={`quiz[${index}].ans`}
          name={`quiz[${index}].ans`}
          value={values[index]?.ans ?? ""}
          error={Boolean(
            touched && errors && touched[index]?.ans && errors[index]?.ans,
          )}
          onChange={(e) => {
            if (setFieldValue) {
              setFieldValue(`quiz[${index}].ans`, e.target.value);
            }
          }}
        >
          {values[index]?.options?.map(
            (option, index) =>
              option != "" && (
                <MenuItem value={option} key={index}>
                  {option}
                </MenuItem>
              ),
          )}
        </Select>
        {touched && errors && touched[index]?.ans && errors[index]?.ans && (
          <FormHelperText error id="standard-weight-helper-text-ans">
            {errors[index]?.ans}
          </FormHelperText>
        )}
      </Grid>
    </Grid>
  );
};
