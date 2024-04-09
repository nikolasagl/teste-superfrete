import * as admin from "firebase-admin";
import {registerUser, userOnCreate} from "./users/index";

admin.initializeApp();

export {registerUser, userOnCreate};
