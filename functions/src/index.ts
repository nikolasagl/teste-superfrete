import * as admin from "firebase-admin";
import {createUser} from "./users/index";

admin.initializeApp();

export {createUser};
