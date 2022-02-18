import { HttpException } from '@nestjs/common';
import { SignUpMailCommand } from './dto/sign-up.dto';
import { SendGridService } from './send-grid.service';

describe('SendGridService', () => {
  const sendGridService = new SendGridService();

  describe('signUp()', () => {
    test('success', async () => {
      const command = new SignUpMailCommand({
        to: 'test@mail.com',
        url: 'http://www.test-rul',
      });
      const result = await sendGridService.signUp(command);
      expect(result.ok).toBeTruthy();
    });
  });
});
