export class ResetPasswordNotAllowedMailCommand {
  readonly to: string;

  constructor(command: ResetPasswordNotAllowedMailCommand) {
    /** @todo validate to */

    Object.assign(this, command);
  }
}

export class ResetPasswordNotAllowedMailResult {
  readonly ok: boolean;

  constructor(result: ResetPasswordNotAllowedMailResult) {
    Object.assign(this, result);
  }
}
