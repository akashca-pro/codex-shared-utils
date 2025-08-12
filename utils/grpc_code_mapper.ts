import { status as GrpcStatus } from "@grpc/grpc-js";
import HTTP_STATUS from "./status_code"; // Assuming this is your HTTP status codes enum/object

export function mapGrpcCodeToHttp(grpcCode: number): number {
  switch (grpcCode) {
    case GrpcStatus.OK: // gRPC OK maps to HTTP OK (implicitly)
        return HTTP_STATUS.OK;
    case GrpcStatus.CANCELLED:
        return HTTP_STATUS.CANCELED_REQUEST; // 499 Client Closed Request (Nginx specific, common in APIs) or 400
    case GrpcStatus.UNKNOWN:
        return HTTP_STATUS.INTERNAL_SERVER_ERROR; // Or 500
    case GrpcStatus.INVALID_ARGUMENT:
        return HTTP_STATUS.BAD_REQUEST; // 400
    case GrpcStatus.DEADLINE_EXCEEDED:
        return HTTP_STATUS.GATEWAY_TIMEOUT; // 504
    case GrpcStatus.NOT_FOUND:
        return HTTP_STATUS.NOT_FOUND; // 404
    case GrpcStatus.ALREADY_EXISTS:
        return HTTP_STATUS.CONFLICT; // 409
    case GrpcStatus.PERMISSION_DENIED:
        return HTTP_STATUS.FORBIDDEN; // 403
    case GrpcStatus.UNAUTHENTICATED:
        return HTTP_STATUS.UNAUTHORIZED; // 401
    case GrpcStatus.RESOURCE_EXHAUSTED:
        return HTTP_STATUS.TOO_MANY_REQUESTS; // 429
    case GrpcStatus.FAILED_PRECONDITION:
        return HTTP_STATUS.BAD_REQUEST; // 400 (Client-side error, e.g., required state not met)
    case GrpcStatus.ABORTED:
        return HTTP_STATUS.CONFLICT; // 409 (Concurrent update conflicts, etc.)
    case GrpcStatus.OUT_OF_RANGE:
        return HTTP_STATUS.BAD_REQUEST; // 400 (e.g., pagination beyond bounds)
    case GrpcStatus.UNIMPLEMENTED:
        return HTTP_STATUS.NOT_IMPLEMENTED; // 501
    case GrpcStatus.INTERNAL:
        return HTTP_STATUS.INTERNAL_SERVER_ERROR; // 500
    case GrpcStatus.UNAVAILABLE:
        return HTTP_STATUS.SERVICE_UNAVAILABLE; // 503
    case GrpcStatus.DATA_LOSS:
        return HTTP_STATUS.INTERNAL_SERVER_ERROR; // 500 (Unrecoverable data corruption)
    default:
      return HTTP_STATUS.INTERNAL_SERVER_ERROR; // Fallback
  }
}

export function mapHttpCodetoGrpc(httpCode: number): number {
  switch (httpCode) {
    case HTTP_STATUS.OK: // 200 OK
    case HTTP_STATUS.CREATED: // 201 Created
    case HTTP_STATUS.ACCEPTED: // 202 Accepted
    case HTTP_STATUS.NO_CONTENT: // 204 No Content
      return GrpcStatus.OK;

    case HTTP_STATUS.BAD_REQUEST: // 400 Bad Request
    case HTTP_STATUS.UNPROCESSABLE_ENTITY: // 422 Unprocessable Entity (often treated as bad request for gRPC)
      return GrpcStatus.INVALID_ARGUMENT;

    case HTTP_STATUS.UNAUTHORIZED: // 401 Unauthorized
      return GrpcStatus.UNAUTHENTICATED;

    case HTTP_STATUS.FORBIDDEN: // 403 Forbidden
      return GrpcStatus.PERMISSION_DENIED;

    case HTTP_STATUS.NOT_FOUND: // 404 Not Found
      return GrpcStatus.NOT_FOUND;

    case HTTP_STATUS.CONFLICT: // 409 Conflict
      return GrpcStatus.ALREADY_EXISTS; // Or ABORTED depending on context

    case HTTP_STATUS.TOO_MANY_REQUESTS: // 429 Too Many Requests
      return GrpcStatus.RESOURCE_EXHAUSTED;

    case HTTP_STATUS.CANCELED_REQUEST: // 499 Client Closed Request (Non-standard but common)
      return GrpcStatus.CANCELLED;

    case HTTP_STATUS.INTERNAL_SERVER_ERROR: // 500 Internal Server Error
      return GrpcStatus.INTERNAL; // Most generic internal error

    case HTTP_STATUS.NOT_IMPLEMENTED: // 501 Not Implemented
      return GrpcStatus.UNIMPLEMENTED;

    case HTTP_STATUS.BAD_GATEWAY: // 502 Bad Gateway
    case HTTP_STATUS.SERVICE_UNAVAILABLE: // 503 Service Unavailable
    case HTTP_STATUS.GATEWAY_TIMEOUT: // 504 Gateway Timeout
      return GrpcStatus.UNAVAILABLE;

    default:
      // For any other unhandled HTTP status, default to INTERNAL, or UNKNOWN
      // UNKNOWN is a good fallback for anything that doesn't fit standard categories.
      return GrpcStatus.UNKNOWN;
  }
}