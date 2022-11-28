const admin = true;

const isAdmin = (req, res, next) => {
  if(!admin) res.status(403).json('No tiene autorizacion para esta acción.');
  next();
}

module.exports = isAdmin;