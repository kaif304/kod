import { HTTP_STATUS } from "../../constants/httpStatus.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { createLead, getLeads, updateLeadStatus } from "./leads.service.js";

export const createLeadEntry = asyncHandler(async (req, res) => {
  const data = await createLead(req.body);

  res.status(HTTP_STATUS.CREATED).json({
    success: true,
    message: "Lead created successfully",
    data,
  });
});

export const getLeadEntries = asyncHandler(async (req, res) => {
  const data = await getLeads(req.query);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    data,
  });
});

export const updateLeadEntryStatus = asyncHandler(async (req, res) => {
  const data = await updateLeadStatus(req.params.id, req.body.status);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Lead status updated",
    data,
  });
});
