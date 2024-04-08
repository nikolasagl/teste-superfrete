import * as admin from "firebase-admin";
import {createUser, userOnCreate} from "./users/index";

admin.initializeApp();

export {createUser, userOnCreate};
