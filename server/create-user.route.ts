import {Request, Response} from "express";
import {db} from "./database";
import {USERS} from "./database-data";
import {passwordValidate} from "./pasword-validation";
import {isArray} from "util";


export async function createUser(req: Request, res: Response) {

  const credentials = req.body;
  const password = credentials.password;
  const passwordValidationResult = passwordValidate(password);

  if (isArray(passwordValidationResult) && passwordValidationResult.length > 0) {
    console.log(passwordValidationResult);
    res.status(400).json({errors: passwordValidationResult});
  } else {
    const user = await db.createUser(credentials.email, password);

    console.log(USERS);

    res.status(200).json({id: user.id, email: user.email});
  }
}
