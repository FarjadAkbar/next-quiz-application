import {
  Container,
  Paper,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
} from "@mui/material";
import { useRouter } from "next/router";
import { useResultDetail } from "providers/Results";
import {
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
} from "react";
import FormattedMessage from "theme/FormattedMessage";

import messages from "./messages";

const ResultScreen: React.FC = () => {
  const router = useRouter();
  const quizResult = useResultDetail({
    id: router?.query?.id?.toString(),
  });

  const handleClick = () => {
    router.push(`/`);
  };

  return (
    <Container>
      <Paper
        sx={{
          margin: (theme) => theme.spacing(2),
          padding: (theme) => theme.spacing(2),
        }}
      >
        <Typography variant="h5">
          <FormattedMessage {...messages.pageTitle} />
        </Typography>
        <Box p={3}>
          <Card>
            <CardContent>
              <Grid container>
                {/* Name */}
                <Grid item xs={3}>
                  <Typography variant="h6" component="p">
                    <FormattedMessage {...messages.name} />
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="h6" component="p">
                    {quizResult.data?.data.name}
                  </Typography>
                </Grid>

                {/* Email */}
                <Grid item xs={3}>
                  <Typography variant="h6" component="p">
                    <FormattedMessage {...messages.email} />
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="h6" component="p">
                    {quizResult.data?.data.email}
                  </Typography>
                </Grid>

                {/* Total Question */}
                <Grid item xs={3}>
                  <Typography variant="h6" component="p">
                    <FormattedMessage {...messages.question} />
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="h6" component="p">
                    {quizResult.data?.data.total_ques}
                  </Typography>
                </Grid>

                {/* Score */}
                <Grid item xs={3}>
                  <Typography variant="h6" component="p">
                    <FormattedMessage {...messages.score} />
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="h6" component="p">
                    {quizResult.data?.data.score}
                  </Typography>
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={3}>
                  <Typography variant="h6" component="p">
                    <FormattedMessage {...messages.yourAns} />
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="h6" component="p">
                    <FormattedMessage {...messages.correctAns} />
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>

        <Box py={3}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleClick}
          >
            <FormattedMessage {...messages.backButton} />
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ResultScreen;
