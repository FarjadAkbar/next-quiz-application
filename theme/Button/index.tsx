import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";


export const ButtonWrapper = styled(Button)<ButtonProps>(
    ({ theme }) =>
      ({
        fontSize: "14px",
        fontWeight: "400",
        height: "40px",
        textTransform: "capitalize",
        color: theme.palette.common.white,
        marginRight: theme.spacing(2),
        borderRadius: theme.borderRadius.radius1,
      } as any),
  ) as (props: ButtonProps) => JSX.Element;
  