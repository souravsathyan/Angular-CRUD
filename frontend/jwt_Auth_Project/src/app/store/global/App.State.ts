import { adminReducer } from "../admin/admin.reducer";
import { userReducer } from "../user/user.reducer";

export const AppState = {
    user : userReducer,
    admin:adminReducer
}