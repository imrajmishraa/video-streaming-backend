import { Prisma } from "../../generated/prisma/client";
import { ApiError } from "../../utils/ApiError";

export const handlePrismaError = (err: unknown): ApiError | null => {
  if (!(err instanceof Prisma.PrismaClientKnownRequestError)) {
    return null;
  }

  switch (err.code) {
    case "P2002":
      return new ApiError(
        409,
        `Unique constraint failed on ${String(err.meta?.target)}`,
      );

    case "P2003":
      return new ApiError(400, "Foreign key constraint failed");

    case "P2025":
      return new ApiError(404, "Record not found");

    case "P2000":
      return new ApiError(400, "Value is too long");

    case "P2001":
      return new ApiError(404, "Record does not exist");

    default:
      return new ApiError(500, "Database error");
  }
};
