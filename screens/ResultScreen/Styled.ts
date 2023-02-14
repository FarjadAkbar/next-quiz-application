import CardHeader, { CardHeaderProps } from "@mui/material/CardHeader";
import InputLabel, { InputLabelProps } from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";




export const CardHeaderWrapper = styled(CardHeader)<CardHeaderProps>(
  ({ theme }) =>
    ({
      borderBottom: "1px solid rgba(0,0,0,0.05)",
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    } as any),
) as (props: CardHeaderProps) => JSX.Element;



export const InputLabelWrapper = styled(InputLabel)<InputLabelProps>(
  ({ theme }) =>
    ({
      marginBottom:  theme.spacing(1),
    } as any),
) as (props: InputLabelProps) => JSX.Element;