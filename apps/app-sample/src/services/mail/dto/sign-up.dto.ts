export class SignUpMailCommand {
  readonly to: string;
  readonly url: string;

  constructor(dto: SignUpMailCommand) {
    /** @todo validate to */

    Object.assign(this, dto);
  }
}

export class SignUpMailResult {
  readonly ok: boolean;

  constructor(result: SignUpMailResult) {
    Object.assign(this, result);
  }
}
