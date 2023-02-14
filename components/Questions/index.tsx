import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

interface QuestionProps {
  question: string;
  name: string;
  value: any;
  options: string[];
  changeHandler?: (e: any) => void;
  disabled?: boolean;
  label?: JSX.Element;
  ans?: string | number | boolean;
}
const Questions: React.FC<QuestionProps> = ({
  question,
  name,
  value,
  options,
  changeHandler,
  disabled,
  label,
  ans,
}) => {
  return (
    <Box py={3} sx={{ borderTop: "1px solid #f1f1f1" }}>
      <Typography variant="subtitle2">{question}</Typography>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name={name}
          value={value ?? ""}
          onChange={changeHandler}
        >
          {options?.map((option) => (
            <FormControlLabel
              value={option}
              key={option}
              disabled={disabled}
              control={
                <Radio
                  sx={{
                    "&, &.Mui-checked": {
                      color: (theme) => theme.additionalColors?.lightGrey,
                    },
                  }}
                />
              }
              label={option}
            />
          ))}
        </RadioGroup>
      </FormControl>

      {ans && (
        <Typography
          variant="subtitle1"
          component="p"
          sx={{
            color:
              ans == value
                ? (theme) => theme.palette.success.main
                : (theme) => theme.palette.error.main,
          }}
        >
          {label} {ans}
        </Typography>
      )}
    </Box>
  );
};
export default Questions;
