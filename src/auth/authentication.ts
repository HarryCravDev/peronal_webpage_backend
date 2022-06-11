import * as express from "express";
import * as jwt from "jsonwebtoken";
import config from "config";

function generateJWT(token: string) {
  const verified = jwt.verify(token, "123");

  return verified;
}

export function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  if (securityName === "jwt") {
    const token = request.headers["authorization"] as string;

    console.log("Auth: Header value - ", token);
    return new Promise((resolve, reject) => {
      if (!token) {
        reject(new Error("No token provided"));
      }

      jwt.verify(
        token.split("Bearer ")[1],
        config.get("app.secret"),
        function (err: any, decoded: any) {
          if (err) {
            reject(err);
          } else {
            // Check if JWT contains all required scopes
            if (scopes) {
              for (let scope of scopes) {
                if (!decoded.scopes.includes(scope)) {
                  reject(new Error("JWT does not contain required scope."));
                }
              }
            }
            resolve(decoded);
          }
        }
      );
    });
  }
  return Promise.reject(new Error("Incorrect authorization used."));
}
