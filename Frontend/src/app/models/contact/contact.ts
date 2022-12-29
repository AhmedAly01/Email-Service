export class Contact {
  name: string | undefined = '';
  emails: string[] | undefined = []

  constructor(name?: string, emails?: string[] | undefined) {
    this.name = name;
    this.emails = emails;
  }

  getName(): string | undefined {
    return this.name;
  }

  setName(value: string) {
    this.name = value;
  }

  getEmails(): string[] | undefined {
    return this.emails;
  }

  setEmails(value: string[] | undefined) {
    this.emails = value;
  }
}
