export class Email {
  id: number | undefined;
  private from: string | undefined;
  private to: string[] | undefined;
  subject: string | undefined;
  private date: object | undefined;
  body: string | undefined;
  private attachments: File[] | any[] | undefined;
  priority: number | undefined;
  toWho: any;
  importance: any;


  constructor(from?: string, to?: string[], subject?: string, date?: object, body?: string, attachments?: File[], priority?: number) {
    this.from = from;
    this.to = to;
    this.subject = subject;
    this.date = date;
    this.body = body;
    this.attachments = attachments;
    this.priority = priority;
  }


  getId(): number {
    return this.id as number;
  }

  setId(value: number) {
    this.id = value;
  }

  getFrom(): string {
    return <string>this.from;
  }

  setFrom(value: string) {
    this.from = value;
  }

  getTo(): string[] | undefined {
    return this.to;
  }

  setTo(value: string[]) {
    this.to = value;
  }

  getSubject(): string {
    return <string>this.subject;
  }

  setSubject(value: string) {
    this.subject = value;
  }

  getDate(): object {
    return <Date>this.date;
  }

  setDate(value: object) {
    this.date = new Date();
  }

  getBody(): string {
    return <string>this.body;
  }

  setBody(value: string) {
    this.body = value;
  }

  getAttachments(): File[] {
    return <File[]>this.attachments;
  }

  setAttachments(value: File[]) {
    this.attachments = value;
  }

  getPriority(): number {
    return <number>this.priority;
  }

  setPriority(value: number) {
    this.priority = value;
  }
}
