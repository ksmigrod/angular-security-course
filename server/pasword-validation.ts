import * as passwordValidator from 'password-validator';

const schema = new passwordValidator();

schema.is().min(10)
  .has().uppercase()
  .has().lowercase()
  .has().digits()
  .has().not().spaces();

export function passwordValidate(password: string) : string[] {
  return schema.validate(password, {list: true});
}
