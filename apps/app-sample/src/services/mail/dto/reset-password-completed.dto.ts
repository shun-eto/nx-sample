export class ResetPasswordCompletedMailCommand {
  readonly to: string;

  constructor(command: ResetPasswordCompletedMailCommand) {
    /** @todo validate to */

    Object.assign(this, command);
  }
}

export class ResetPasswordCompletedMailResult {
  readonly ok: boolean;

  constructor(result: ResetPasswordCompletedMailResult) {
    Object.assign(this, result);
  }
}
