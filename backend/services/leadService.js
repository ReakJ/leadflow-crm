import ApiError from "../errors/ApiError.js";
import Lead from "../models/Lead.js"

export const createLead = async (leadData) => {
  const duplicateCheck = await Lead.findOne({email: leadData.email, isDeleted: false});

  if(duplicateCheck) {
    throw new ApiError (409, "Lead with this email already exists.");
  }

  const lead = new Lead(leadData);
  
  await lead.save();
  
  return lead;
}