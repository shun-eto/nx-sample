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

export abstract class MailService {
  abstract signUp(dto: SignUpMailCommand): Promise<SignUpMailResult>;

  abstract resetPassword(
    dto: ResetPasswordMailCommand
  ): Promise<ResetPasswordMailResult>;

  abstract resetPasswordNotAllowed(
    command: ResetPasswordNotAllowedMailCommand
  ): Promise<ResetPasswordNotAllowedMailResult>;

  abstract resetPasswordCompleted(
    command: ResetPasswordCompletedMailCommand
  ): Promise<ResetPasswordCompletedMailResult>;

  /** @todo 正規表現チェック */
  protected validateEmail(email: string) {
    return email !== 'bad-email';
  }
}
