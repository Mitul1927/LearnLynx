const jwt = require("jsonwebtoken");

class JWTSERVICE {
  static jwt_auth = "MySecretKey";

  static generateToken = (payload) => {
    const token = jwt.sign(payload, this.jwt_auth, {
      expiresIn: "2h",
    });
    return token;
  };

  static verifyToken = (token, key) => {
    const payload = jwt.verify(token, this.jwt_auth);
    return payload[key];
  };
}

module.exports = JWTSERVICE;
