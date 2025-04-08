import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

@Injectable()
export class ProcessService {
  /**
   * Проверяет, запущен ли указанный процесс.
   * @param processName Имя процесса (например, "msedgewebview2.exe").
   * @returns true, если процесс запущен, иначе false.
   */
  async isProcessRunning(processName: string): Promise<boolean> {
    const command = process.platform === 'win32' ? 'tasklist' : 'ps -e';

    try {
      const { stdout } = await execAsync(command);

      // Проверяем, содержится ли имя процесса в выводе
      const isRunning = stdout
        .toLowerCase()
        .includes(processName.toLowerCase());
      return isRunning;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new Error(`Ошибка при проверке процесса: ${error.message}`);
    }
  }
}
