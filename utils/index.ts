export function timeFormatter(time: any) {
  const newTime = time.split(".");
  return new Date(newTime[0]);
}

export const validateEmail = (email: string) => {
  let error: boolean = true;

  // Check if email is in a valid format
  if (!/\S+@\S+\.\S+/.test(email)) {
    error = false;
  }

  return error;
};
