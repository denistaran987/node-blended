import createHttpError from 'http-errors';
export const validateBody = (validationSchema) => async (req, res, next) => {
  try {
    await validationSchema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(
      createHttpError(400, 'Bad request', {
        data: error.details,
      }),
    );
  }
};
