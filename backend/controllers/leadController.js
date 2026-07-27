import * as leadService from "../services/leadService.js";

export const createLead = async (req, res, next) => {
  try {
    const leadData = {
      ...req.body,
      createdBy: req.user._id
    };

    const lead = await leadService.createLead(leadData);
    return res.status(201).json({
      success: true,
      message: "Lead created successfully.",
      data: {
        lead
      }
    });

  } catch (error) {
    return next(error)
  }
}