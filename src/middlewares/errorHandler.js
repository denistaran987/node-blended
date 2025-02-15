import { HttpError } from 'http-errors';

export const errorHandler = (error, req, res, next) => {
  console.log(error);
  if (error instanceof HttpError) {
    res.status(error.status).json({
      status: error.status,
      message: error.message,
      data: error,
    });
    return;
  }
  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
  });
};
