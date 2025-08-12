import { Response } from "express";
import HTTP_STATUS from "./status_code";

class ResponseHandler {

/**
 * Handles a successful API response.
 * @param res The Express Response object.
 * @param message A human-readable success message.
 * @param status_code The HTTP status code (defaults to 200 OK).
 * @param data The payload data to be returned.
 * @returns The Express Response object with a JSON success payload.
 */
  static success(
    res: Response,
    message : string = 'Success',
    status_code : number = HTTP_STATUS.OK,
    data: any = null
  ) {
    return res.status(status_code).json({
      success: true,
      message,
      data,
    });
  }

/**
 * Handles an unsuccessful (error) API response.
 * @param res The Express Response object.
 * @param message A human-readable error message.
 * @param status_code The HTTP status code (defaults to 500 Internal Server Error).
 * @param error The error object or message (e.g., Error instance, string, or custom object).
 * @returns The Express Response object with a JSON error payload.
 */
  static error(
    res: Response,
    message : string = 'Something went wrong',
    status_code : number = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    error: any = null
  ) {
    return res.status(status_code).json({
      success: false,
      message,
      error: error?.message || error,
    });
  }
}

export default ResponseHandler;