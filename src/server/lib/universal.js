
export default function universalMiddleware() {

  return (req, res, next) => {
    const { app } = req;

    if (app.get('x-powered-by'))
      res.removeHeader('x-powered-by');
      res.set({
        'X-Written-With': 'Universal JavaScript'
      });

    next();
  }

}
