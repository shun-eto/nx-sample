import { Provider } from '@nestjs/common';
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
import { SignUpMailCommand, SignUpMailResult } from './dto/sign-up.dto';
import { MailService } from './mail.service';
import { SendGridService } from './send-grid.service';

export const mailServiceProvider: Provider = {
  provide: MailService.name,
  useClass: SendGridService,
};

class MailServiceMock extends MailService {
  async signUp(command: SignUpMailCommand): Promise<SignUpMailResult> {
    const result = new SignUpMailResult({ ok: true });
    return result;
  }

  async resetPassword(
    command: ResetPasswordMailCommand,
  ): Promise<ResetPasswordMailResult> {
    const result = new ResetPasswordMailResult({
      ok: true,
    });
    return result;
  }

  async resetPasswordCompleted(
    command: ResetPasswordCompletedMailCommand,
  ): Promise<ResetPasswordCompletedMailResult> {
    const result = new ResetPasswordCompletedMailResult({
      ok: true,
    });
    return result;
  }

  async resetPasswordNotAllowed(
    command: ResetPasswordNotAllowedMailCommand,
  ): Promise<ResetPasswordNotAllowedMailResult> {
    const result = new ResetPasswordNotAllowedMailResult({
      ok: true,
    });
    return result;
  }
}

describe('MailService', () => {
  const mailService = new MailServiceMock();

  describe('validateEmail()', () => {
    test('return true', () => {
      expect(mailService['validateEmail']('email@mail.com')).toBeTruthy();
    });

    test('return false', () => {
      expect(mailService['validateEmail']('bad-email')).toBeFalsy();
    });
  });
});
