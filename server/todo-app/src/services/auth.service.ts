import { User } from "../models/User";
import { hashPassword, comparePassword } from "../utils/bcryptUtils";
import { generateToken } from "../utils/jwtUtils";
import { statusCodes } from "../utils/errorCodes";

export const registerUser = async (email: string, password: string) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return { type: "Error", statusCode: statusCodes.CONFLICT, message: "User already exists." };
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({ email, password: hashedPassword });

    const token = generateToken({ id: newUser._id });

    return {
        type: "Success",
        statusCode: statusCodes.CREATED,
        message: "User registered successfully.",
        token,
        userId: newUser._id,
    };
}

export const loginUser = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (!user || !(await comparePassword(password, user.password))) {
        return { type: "Error", statusCode: statusCodes.UNAUTHORIZED, message: "Invalid credentials." };
    }

    const token = generateToken({ id: user._id });
    return {
        type: "Success",
        statusCode: statusCodes.OK,
        message: "Login successful.",
        token,
        userId: user._id,

    };
}

