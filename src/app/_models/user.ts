import { Role } from "./role";

export class User {
    constructor(
        public username: string,
        public autorites: Role[]
      ) {}
}