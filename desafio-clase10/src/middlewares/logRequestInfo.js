const logRequestInfo = (req, res, next) => {
  console.log(`METODO: ${req.method} ${req.path}`);
  next();
}

module.exports = logRequestInfo;