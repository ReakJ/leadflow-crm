import ApiError from "../errors/ApiError.js";
import Lead, { LEAD_STATUSES } from "../models/Lead.js"
import User, { ASSIGNABLE_ROLES } from "../models/User.js";
import { validateObjectId } from "../utils/validateObjectId.js";

const allowedDeletedValues = [
  "true",
  "false",
  "all"
];

const allowedSortFields = [
  "name",
  "company",
  "createdAt"
];

const allowedOrderValues = [
  "asc",
  "desc"
];

const closedStatuses = ["Won", "Lost"];

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


export const createLead = async (leadData) => {
  const duplicateCheck = await Lead.findOne({email: leadData.email, isDeleted: false});

  if(duplicateCheck) {
    throw new ApiError (409, "Lead with this email already exists.");
  }

  const lead = new Lead(leadData);
  
  await lead.save();
  
  return lead;
};


export const getLeads = async (user, query) => {
  const {
    deleted,
    status,
    assignedTo,
    search,
    sort,
    order,
    page,
    limit
  } = query;

  let filter;


  if(user.role === "member") {
    filter = {
      assignedTo: user.userId,
      isDeleted: false
    };
  } else {
    filter = {};
  }


  if (deleted) {
    if (deleted && !allowedDeletedValues.includes(deleted)) {
      throw new ApiError(400, "Invalid deleted query parameter.")
    }

    if (user.role === "member" && deleted !== undefined && deleted !== "false") {
      throw new ApiError(
        403,
        "Members are not allowed to see deleted leads."
      );
    }

    if (deleted === undefined || deleted === "false") {
      filter.isDeleted = false;
    } else if (deleted === "true") {
      filter.isDeleted = true;
    }
  }

  if (status) {
    if (status && !LEAD_STATUSES.includes(status)) {
      throw new ApiError(400, "Invalid status query parameter.");
    }
  
    filter.status = status;
  }

  if (assignedTo) {
    validateObjectId(assignedTo, "user");
  
    const assignedUser = await User.findOne({ 
      _id: assignedTo,
      isDeleted: false
    });
  
    if (!assignedUser) {
      throw new ApiError(404, "User not found.")
    }
  
    if (!ASSIGNABLE_ROLES.includes(assignedUser.role)) {
      throw new ApiError(400, "Lead can only be assigned to a manager or member.");
    }
  
    if (user.role === "member") {
      throw new ApiError(403, "Members are not allowed to filter by assigned user.");
    }
  
    filter.assignedTo = assignedUser._id;
  }

  if (search) {
    const regex = new RegExp(search, "i");
    filter.$or = [
      {
        name: regex
      },
      {
        email: regex
      },
      {
        company: regex
      },
    ];
  }


  if (sort && !allowedSortFields.includes(sort)) {
    throw new ApiError(400, "Invalid sort query parameter.");
  }

  if (order && !allowedOrderValues.includes(order)) {
    throw new ApiError(400, "Invalid order query parameter.");
  }

  let sortOptions = {
    createdAt: -1
  };

  if (sort) {
    sortOptions = {
      [sort]: order === "desc" ? -1 : 1
    };
  }


  const pageNumber = page ? Number(page) : 1;
  let limitNumber = limit ? Number(limit) : 10;

  if (Number.isNaN(pageNumber) || pageNumber < 1) {
    throw new ApiError(400, "Invalid page query parameter.");
  }

  if (Number.isNaN(limitNumber) || limitNumber < 1) {
    throw new ApiError(400, "Invalid limit query parameter.");
  }

  if (limitNumber > 100) {
    limitNumber = 100;  
  }

  const skip = (pageNumber - 1) * limitNumber;

  const leads = await Lead.find(filter)
    .populate("assignedTo", "name email role isActive")
    .sort(sortOptions)
    .skip(skip)
    .limit(limitNumber);
  const totalItems = await Lead.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / limitNumber);

  return {
    leads,
    pagination : {
      page: pageNumber,
      limit: limitNumber,
      totalItems,
      totalPages
    }
  }
};


export const getLeadById = async (id, user) => {
  validateObjectId(id, "Lead");

  const lead = await Lead.findOne({_id: id, isDeleted: false}).populate("assignedTo", "name email role isActive")
  .populate("createdBy", "name email role")
  .populate("notes.addedBy", "name email role");

  if (!lead) {
    throw new ApiError(404, "Lead not found.");
  }

  if (user.role === "member" && (!lead.assignedTo || !lead.assignedTo._id.equals(user.userId))) {
    throw new ApiError(403, "You are not authorized to access this lead.");
  }

  return lead;
}


export const updateLead = async (id, updateData) => {
  validateObjectId(id, "Lead");

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
  validateObjectId(leadId, "Lead");

  const lead = await Lead.findOne({_id: leadId, isDeleted: false});

  if (!lead) {
    throw new ApiError(404, "Lead not found.");
  }

  if(closedStatuses.includes(lead.status)) {
    throw new ApiError(400, "Cannot assign a lead that is already Won or Lost.");
  }

  const user = await User.findOne({
    _id: assignedTo, 
    isDeleted: false,
    isActive: true,
  });

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  if (!ASSIGNABLE_ROLES.includes(user.role)) {
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
  validateObjectId(leadId, "Lead");

  const lead = await Lead.findOne({
    _id: leadId, 
    isDeleted: false
  })

  if (!lead) {
    throw new ApiError(404, "Lead not found.");
  }

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

  const nextStatuses = allowedTransitions[lead.status];

  if(!nextStatuses.includes(newStatus)) {
    throw new ApiError(400,`Cannot change lead status from "${lead.status}" to "${newStatus}".`);
  }

  lead.status = newStatus;
  
  await lead.save();

  return lead;
}


export const addNote = async (leadId, text, currentUser) => {
  validateObjectId(leadId, "Lead");

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
  validateObjectId(leadId, "Lead");

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
  validateObjectId(leadId, "Lead");

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