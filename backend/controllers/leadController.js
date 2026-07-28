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

export const getLeads = async (req, res, next) => {
  try {
    const user = {
      userId: req.user._id,
      role: req.user.role
    };

    const leads = await leadService.getLeads(user);
    return res.status(200).json ({
      success: true,
      "message": "Leads retrieved successfully.",
      data: {
        leads
      }
    });

  } catch (error) {
    return next(error);
  }
}

export const getLeadById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = {
      userId: req.user._id,
      role: req.user.role
    };

    const lead = await leadService.getLeadById(id, user);
    return res.status(200).json ({
      success: true,
      "message": "Lead retrieved successfully.",
      data: {
        lead
      }
    });

  } catch (error) {
    return next(error);
  }
}

export const updateLead = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updateData = req.body;
    const lead = await leadService.updateLead(id, updateData);
    return res.status(200).json({
      success: true,
      "message": "Lead updated successfully.",
      data: {
        lead
      }
    })
  } catch (error) {
    return next(error);
  }
}

export const assignLead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { assignedTo } = req.body;
    
    const lead = await leadService.assignLead(id, assignedTo);
    return res.status(200).json({
      success: true,
      "message": "Lead assigned successfully.",
      data: {
        lead
      }
    })
  } catch (error) {
    return next(error);
  }
}