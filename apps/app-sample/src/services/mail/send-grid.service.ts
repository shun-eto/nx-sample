import {
  ResetPasswordCompletedMailCommand,
  ResetPasswordCompletedMailResult,
} from './dto/reset-password-completed.dto';
import {
  ResetPasswordNotAllowedMailCommand,
  ResetPasswordNotAllowedMailResult,
} from './dto/reset-password-not-allowed.dto';
import {
  ResetPasswordMailCommand,
  ResetPasswordMailResult,
} from './dto/reset-password.dto';
import { SignUpMailResult, SignUpMailCommand } from './dto/sign-up.dto';
import { MailService } from './mail.service';

export class SendGridService extends MailService {
  async signUp(command: SignUpMailCommand): Promise<SignUpMailResult> {
    /** @todo メール送信処理 */

    const result = new SignUpMailResult({
      ok: true,
    });

    return result;
  }

  async resetPassword(
    command: ResetPasswordMailCommand
  ): Promise<ResetPasswordMailResult> {
    /** @todo メール送信処理 */

    const result = new ResetPasswordMailResult({ ok: true });
    return result;
  }

  async resetPasswordCompleted(
    command: ResetPasswordCompletedMailCommand
  ): Promise<ResetPasswordCompletedMailResult> {
    /** @todo メール送信処理 */

    const result = new ResetPasswordCompletedMailResult({
      ok: true,
    });
    return result;
  }

  async resetPasswordNotAllowed(
    command: ResetPasswordNotAllowedMailCommand
  ): Promise<ResetPasswordNotAllowedMailResult> {
    /** @todo メール送信処理 */

    const result = new ResetPasswordNotAllowedMailResult({
      ok: true,
    });
    return result;
  }
}
