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
import Questions from "components/Questions";
import { useRouter } from "next/router";
import { useQuizQuestion } from "providers/Questions";
import { useResultDetail } from "providers/Results";
import { useEffect, useState } from "react";
import { quizSet } from "screens/HomeScreen/data";
import { ButtonWrapper } from "theme/Button";
import FormattedMessage from "theme/FormattedMessage";

import messages from "./messages";
import { TypographyWrapper } from "./Styled";

const ResultScreen: React.FC = () => {
  const router = useRouter();
  const questionSet = useQuizQuestion();
  const quizResult = useResultDetail({
    id: router?.query?.id?.toString(),
  });

  const handleClick = () => {
    router.push(`/`);
  };

  const [questionData, setQuestionData] = useState<any>();
  useEffect(() => {
    if(quizResult?.data?.data.category !== "all"){
      setQuestionData(questionSet.data?.filter((q: any) => q.category == quizResult?.data?.data.category));
    } else{
      setQuestionData(questionSet.data);
    }
  }, [quizResult.isSuccess, questionSet.isSuccess]);

  return (
    <Container>
      <Paper
        sx={{
          margin: (theme) => theme.spacing(2),
          padding: (theme) => theme.spacing(5),
        }}
      >
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          <FormattedMessage {...messages.pageTitle} />
        </Typography>
        <hr />
        <Box p={3}>
          <Grid container>
            {/* Name */}
            <Grid item xs={6}>
              <TypographyWrapper sx={{ textAlign: "right" }}>
                <FormattedMessage {...messages.name} />
              </TypographyWrapper>
            </Grid>
            <Grid item xs={6}>
              <TypographyWrapper>
                {quizResult.data?.data.name}
              </TypographyWrapper>
            </Grid>

            {/* Email */}
            <Grid item xs={6}>
              <TypographyWrapper sx={{ textAlign: "right", fontWeight: 500 }}>
                <FormattedMessage {...messages.email} />
              </TypographyWrapper>
            </Grid>
            <Grid item xs={6}>
              <TypographyWrapper>
                {quizResult.data?.data.email}
              </TypographyWrapper>
            </Grid>

            {/* Category */}
            <Grid item xs={6}>
              <TypographyWrapper sx={{ textAlign: "right", fontWeight: 500 }}>
                <FormattedMessage {...messages.category} />
              </TypographyWrapper>
            </Grid>
            <Grid item xs={6}>
              <TypographyWrapper>
                {quizResult.data?.data.category}
              </TypographyWrapper>
            </Grid>

            {/* Total Question */}
            <Grid item xs={6}>
              <TypographyWrapper sx={{ textAlign: "right", fontWeight: 500 }}>
                <FormattedMessage {...messages.question} />
              </TypographyWrapper>
            </Grid>
            <Grid item xs={6}>
              <TypographyWrapper>
                {quizResult.data?.data.total_ques}
              </TypographyWrapper>
            </Grid>

            {/* Score */}
            <Grid item xs={6}>
              <TypographyWrapper sx={{ textAlign: "right", fontWeight: 500 }}>
                <FormattedMessage {...messages.score} />
              </TypographyWrapper>
            </Grid>
            <Grid item xs={6}>
              <TypographyWrapper>
                {quizResult.data?.data.score}
              </TypographyWrapper>
            </Grid>
          </Grid>
        </Box>
        <Box py={3}>
          {questionData?.map(
            (
              quiz: {
                ans: string | number | boolean | undefined;
                que: string;
                queNo: string;
                options: string[];
              },
              index: string | number,
            ) => (
              <Questions
                question={quiz.que}
                name={quiz.queNo}
                value={quizResult.data?.data.submission[quiz.queNo]}
                options={quiz.options}
                disabled={true}
                ans={quiz.ans}
                label={<FormattedMessage {...messages.correctAns} />}
                key={quiz.queNo}
              />
            ),
          )}
        </Box>

        <Box py={3}>
          <ButtonWrapper
            type="submit"
            variant="contained"
            color="secondary"
            onClick={handleClick}
          >
            <FormattedMessage {...messages.restartButton} />
          </ButtonWrapper>
        </Box>
      </Paper>
    </Container>
  );
};

export default ResultScreen;
