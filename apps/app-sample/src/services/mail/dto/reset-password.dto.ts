export class ResetPasswordMailCommand {
  readonly to: string;
  readonly url: string;

  constructor(command: ResetPasswordMailCommand) {
    /** @todo validate to */

    Object.assign(this, command);
  }
}

export class ResetPasswordMailResult {
  readonly ok: boolean;

  constructor(result: ResetPasswordMailResult) {
    Object.assign(this, result);
  }
}
