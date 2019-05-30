import * as _ from 'lodash';
import {LESSONS, USERS} from "./database-data";
import {DbUser} from "./db-user";
import * as argon2 from 'argon2';

class InMemoryDatabase {

  userCounter = 0;

  readAllLessons() {
    return _.values(LESSONS);
  }


  async createUser(email: string, password: string) {

    this.userCounter++;

    const id = this.userCounter;

    const passwordHash = await argon2.hash(password);

    const user: DbUser = {
      id: id,
      email: email,
      password: passwordHash
    };

    USERS[id] = user;

    return user;

  }

}

export const db = new InMemoryDatabase();
