import ApiError from "../errors/ApiError.js";
import Lead, {  LEAD_STATUSES  } from "../models/Lead.js";

const DASHBOARD_PERIODS = ["7d", "30d"]

const IN_PROGRESS_STATUSES = [
  "Assigned",
  "Contacted",
  "Qualified",
  "Proposal Sent",
  "Negotiation"
];

const APP_TIMEZONE = "Asia/Kolkata";
const APP_TIMEZONE_OFFSET = 5.5 * 60 * 60 * 1000;

export const getDashboard = async (user, period = "7d") => {
  
  if (!DASHBOARD_PERIODS.includes(period)) {
    throw new ApiError(400, "Invalid period query parameter.")
  }

  let filter;

  if (user.role === "member") {
    filter = {
      assignedTo: user._id,
      isDeleted: false
    };
  } else {
    filter = {
      isDeleted: false
    };
  }

  const statusCounts = await Lead.aggregate([
    {
      $match: filter
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 }
      }
    }
  ]);

  const statusDistribution = {};

  for (const status of LEAD_STATUSES) {
    statusDistribution[status] = 0;
  }

  for (const item of statusCounts) {
    statusDistribution[item._id] = item.count;
  }

  const totalLeads = Object.values(statusDistribution)
    .reduce((total, count) => total + count, 0);
    
  const newLeads = statusDistribution.New;

  const converted = statusDistribution.Won;

  const inProgress = IN_PROGRESS_STATUSES.reduce(
    (total, status) => total + statusDistribution[status],
    0
  );

  const statusData = LEAD_STATUSES.map((status) => ({
    status,
    count: statusDistribution[status]
  }));


  const dateFormatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: APP_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });

  const todayParts = dateFormatter.formatToParts(new Date());

  const year = Number(todayParts.find(part => part.type === "year").value);
  const month = Number(todayParts.find(part => part.type === "month").value);
  const day = Number(todayParts.find(part => part.type === "day").value);

  const endDate = new Date(
    Date.UTC(year, month - 1, day + 1) - APP_TIMEZONE_OFFSET
  );

  const startDate = new Date(endDate);

  if (period === "7d") {
    startDate.setUTCDate(startDate.getUTCDate() - 7);
  } else {
    startDate.setUTCDate(startDate.getUTCDate() - 30);
  }

  const leadOverview = await Lead.aggregate([
    {
      $match: {
        ...filter,
        createdAt: {
          $gte: startDate,
          $lt: endDate
        }
      }
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$createdAt",
            timezone: APP_TIMEZONE
          }
        },
        count: {
          $sum: 1
        }
      }
    },
    {
      $sort: {
        _id: 1
      }
    }
  ]);

  const overviewMap = {};

  for (const item of leadOverview) {
    overviewMap[item._id] = item.count;
  }

  const overviewData = [];

  for (
    const date = new Date(startDate);
    date < endDate;
    date.setUTCDate(date.getUTCDate() + 1)
  ) {
    const dateString = dateFormatter.format(date);

    overviewData.push({
      date: dateString,
      count: overviewMap[dateString] || 0
    });
  }


  const recentLeads = await Lead.find(filter)
    .sort({ createdAt: -1 })
    .limit(4)
    .select("name company status assignedTo createdAt")
    .populate("assignedTo", "name");


  return {
    summary: {
      totalLeads,
      newLeads,
      inProgress,
      converted
    },
    leadOverview: overviewData,
    statusDistribution: statusData,
    recentLeads
  };
}