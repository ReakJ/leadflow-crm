import { login as loginService} from "../services/authService.js";
import { cookieOptions } from "../utils/cookieOptions.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginService(email, password);
  
    res.cookie("accessToken", token, cookieOptions());
    return res.status(200).json({
      success: true,
      message: "Login successful.",
      data: {
        user,
      },
    });

  } catch (error) {
    return next(error)
  }
}