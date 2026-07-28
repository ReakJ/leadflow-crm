import ApiError from "../errors/ApiError.js";
import Lead from "../models/Lead.js"
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
  const lead = await Lead.findOne({_id: id, isDeleted: false});

  if (!lead) {
    throw new ApiError(404, "Lead not found.");
  }

  if (user.role === "member" && !lead.assignedTo.equals(user.userId)) {
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