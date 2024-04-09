import * as admin from "firebase-admin";
import {registerUser, userOnCreate} from "./users/index";
require("module-alias/register");

admin.initializeApp();

export {registerUser, userOnCreate};
