const response = require("../utils/response");
const allowRoles = (...allowedRoles) => {
  return (req, res, next) => {
    console.log("ROLE CHECK:", req.user?.role);
    console.log("ALLOWED ROLES:", allowedRoles);

    if (!req.user) {
      return response.error(res, "Unauthorized", 401);
    }

    if (!allowedRoles.includes(req.user.role)) {
      return response.error(res, "Access denied", 403);
    }

    return next();
  };
};

module.exports = allowRoles;
