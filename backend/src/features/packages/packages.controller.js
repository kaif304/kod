import { HTTP_STATUS } from "../../constants/httpStatus.js";
import { asyncHandler } from "../../utils/async-handler.js";
import {
  createPackage,
  deletePackage,
  getPackageBySlug,
  getPackages,
  updatePackage,
} from "./packages.service.js";

export const getAllPackages = asyncHandler(async (req, res) => {
  const data = await getPackages(req.query, { onlyPublished: !req.user });

  res.status(HTTP_STATUS.OK).json({
    success: true,
    data,
  });
});

export const getAdminPackages = asyncHandler(async (req, res) => {
  const data = await getPackages(req.query, { onlyPublished: false });

  res.status(HTTP_STATUS.OK).json({
    success: true,
    data,
  });
});

export const getSinglePackage = asyncHandler(async (req, res) => {
  const data = await getPackageBySlug(req.params.slug);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    data,
  });
});

export const createSinglePackage = asyncHandler(async (req, res) => {
  const data = await createPackage(req.body);

  res.status(HTTP_STATUS.CREATED).json({
    success: true,
    message: "Package created successfully",
    data,
  });
});

export const updateSinglePackage = asyncHandler(async (req, res) => {
  const data = await updatePackage(req.params.id, req.body);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Package updated successfully",
    data,
  });
});

export const deleteSinglePackage = asyncHandler(async (req, res) => {
  await deletePackage(req.params.id);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Package deleted successfully",
  });
});
