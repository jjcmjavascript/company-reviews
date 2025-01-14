export function error404({ message }) {
  return {
    message,
    error: 'Bad Request',
    statusCode: 400,
  };
}
