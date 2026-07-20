import { User } from "./auth.model";

export const loginOrCreateUser = async (payload: {
    name: string;
    email: string;
    photoURL?: string;
}) => {
    let user = await User.findOne({ email: payload.email });

    if (!user) {
        user = await User.create(payload);
    }

    return user;
};