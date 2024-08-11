import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

// Extend the Express Request interface to include user information
export interface AuthRequest extends Request {
  /**
   * This property holds the decoded JWT token information.
   * It can be one of the following:
   * - `string`: In some cases, it may be just a string (though typically not recommended).
   * - `JwtPayload`: The decoded payload from the JWT if it is valid.
   * - `null`: If the token is not present or authentication fails.
   * - `undefined`: If the `user` property has not been set by middleware.
   */
  user?: string | JwtPayload | null | undefined;
}
