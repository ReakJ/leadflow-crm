import * as dashboardService from "../services/dashboardService.js"

export const getDashboard = async (req, res, next) => {
  try {
    const user = req.user;
    const { period } = req.query;

    const dashboard = await dashboardService.getDashboard(user, period);

    return res.status(200).json({
      success: true,
      message: "Dashboard data retrieved successfully.",
      data: dashboard
    });
  } catch (error) {
    return next(error);
  }
}