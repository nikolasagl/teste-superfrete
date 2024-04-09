import * as admin from "firebase-admin";
import {registerUser, userOnCreate} from "./modules/users/index";

admin.initializeApp();

export {registerUser, userOnCreate};
