export class User {
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;
  inbox: number[] | undefined;
  sent: number[] | undefined;
  deleted: number[] | undefined;


  constructor(name?: string, email?: string, password?: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  getName(): string {
    return <string>this.name;
  }

  setName(value: string) {
    this.name = value;
  }

  getEmail(): string {
    return <string>this.email;
  }

  setEmail(value: string) {
    this.email = value;
  }

  getPassword(): string {
    return <string>this.password;
  }

  setPassword(value: string) {
    this.password = value;
  }
}
