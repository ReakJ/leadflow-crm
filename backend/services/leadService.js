import ApiError from "../errors/ApiError.js";
import Lead, { LEAD_STATUSES } from "../models/Lead.js"
import User from "../models/User.js";

export const createLead = async (leadData) => {
  const duplicateCheck = await Lead.findOne({email: leadData.email, isDeleted: false});

  if(duplicateCheck) {
    throw new ApiError (409, "Lead with this email already exists.");
  }

  const lead = new Lead(leadData);
  
  await lead.save();
  
  return lead;
};


export const getLeads = async (user) => {
  if (user.role === "member") {
    return await Lead.find({
      assignedTo: user.userId,
      isDeleted: false,
    }).sort({ createdAt: -1 });
  }

  return await Lead.find({
    isDeleted: false,
  }).sort({ createdAt: -1 });

};


export const getLeadById = async (id, user) => {
  const lead = await Lead.findOne({_id: id, isDeleted: false}).populate("assignedTo", "name email role")
  .populate("createdBy", "name email role")
  .populate("notes.addedBy", "name email role");

  if (!lead) {
    throw new ApiError(404, "Lead not found.");
  }

  if (user.role === "member" && !lead.assignedTo || !lead.assignedTo._id.equals(user.userId)) {
    throw new ApiError(403, "You are not authorized to access this lead.");
  }

  return lead;
}


export const updateLead = async (id, updateData) => {
  const lead = await Lead.findOne({_id: id, isDeleted: false});

  if (!lead) {
    throw new ApiError(404, "Lead not found.");
  }
  
  const allowedFields = [
    "name",
    "email",
    "phone",
    "company",
    "source" 
  ];
  
  const filteredData = {};
  
  for (const field of allowedFields) {
    if (field in updateData) {
      filteredData[field] = updateData[field];
    }
  }
  
  if (Object.keys(filteredData).length === 0) {
    throw new ApiError(400, "No valid fields provided for update.");
  }

  if (filteredData.email && filteredData.email !== lead.email) {
    const duplicateCheck = await Lead.findOne({email: filteredData.email, isDeleted: false, _id: { $ne: id}});

    if (duplicateCheck) {
      throw new ApiError (409, "Lead with this email already exists.");
    }
  }

  Object.assign(lead, filteredData);

  await lead.save();
  
  return lead;
}


export const assignLead = async (leadId, assignedTo) => {
  const lead = await Lead.findOne({_id: leadId, isDeleted: false});

  if (!lead) {
    throw new ApiError(404, "Lead not found.");
  }

  const closedStatuses = ["Won", "Lost"];

  if(closedStatuses.includes(lead.status)) {
    throw new ApiError(400, "Cannot assign a lead that is already Won or Lost.");
  }

  const user = await User.findById(assignedTo);

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  const assignableRoles = ["manager", "member"];

  if (!assignableRoles.includes(user.role)) {
    throw new ApiError(400, "Lead can only be assigned to a manager or member.");
  }

  lead.assignedTo = user._id;

  if (lead.status === "New") {
    lead.status = "Assigned";
  }

  await lead.save()

  return lead;
};


export const changeLeadStatus = async (leadId, newStatus, currentUser) => {
  const lead = await Lead.findOne({
    _id: leadId, 
    isDeleted: false
  })

  if (!lead) {
    throw new ApiError(404, "Lead not found.");
  }

  const closedStatuses = ["Won", "Lost"];

  if (closedStatuses.includes(lead.status)) {
    throw new ApiError(400, "Cannot change the status of a lead that is already won or lost.")
  }
  
  if (currentUser.role === "member" && (!lead.assignedTo || !lead.assignedTo.equals(currentUser._id))) {
    throw new ApiError(403, "You can only update the status of leads assigned to you.");
  } 

  if (!LEAD_STATUSES.includes(newStatus)) {
    throw new ApiError(400, "Invalid lead status.");
  }

  if (lead.status === newStatus) {
    return lead;
  }

  const allowedTransitions = {
    New: ["Assigned"],
    Assigned: ["Contacted", "Lost"],
    Contacted: ["Qualified", "Lost"],
    Qualified: ["Proposal Sent", "Lost"],
    "Proposal Sent": ["Negotiation", "Lost"],
    Negotiation: ["Won", "Lost"],
    Won: [],
    Lost: [],
  };

  const nextStatuses = allowedTransitions[lead.status];

  if(!nextStatuses.includes(newStatus)) {
    throw new ApiError(400,`Cannot change lead status from "${lead.status}" to "${newStatus}".`);
  }

  lead.status = newStatus;
  
  await lead.save();

  return lead;
}


export const addNote = async (leadId, text, currentUser) => {
  const trimmedText = text?.trim();

  if (!trimmedText) {
    throw new ApiError(400, "Note text is required.");
  }

  if (trimmedText.length > 1000) {
    throw new ApiError(400, "Note cannot exceed 1000 characters.");
  }

  const lead = await Lead.findOne({_id: leadId, isDeleted: false});

  if (!lead) {
      throw new ApiError(404, "Lead not found.");
  }

  if (currentUser.role === "member" && (!lead.assignedTo || !lead.assignedTo.equals(currentUser._id))) {
    throw new ApiError(403, "You can only add notes to leads assigned to you.");
  }

  const note = {text: trimmedText, addedBy: currentUser._id};

  lead.notes.push(note);

  await lead.save();

  return lead;
}

export const deleteLead = async(leadId, currentUser) => {
  const lead = await Lead.findOne({
    _id: leadId, 
    isDeleted: false 
  });

  if (!lead) {
    throw new ApiError(404, "Lead not found.");
  }

  lead.isDeleted = true;
  lead.deletedAt = new Date();
  lead.deletedBy = currentUser._id;

  await lead.save(); 
}


export const restoreLead = async(leadId) => {
  const lead = await Lead.findOne({
    _id: leadId,
    isDeleted: true
  });

  if (!lead) {
    throw new ApiError(404, "Lead not found.");
  }

  lead.isDeleted = false;
  lead.deletedAt = null;
  lead.deletedBy = null;

  await lead.save();
}