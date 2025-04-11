import { BadRequestException, Injectable } from '@nestjs/common';
import { exec, execFile } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const execFileAsync = promisify(execFile);
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

  /**
   * Запускает указанный exe-файл
   * @param filePath Полный путь к exe-файлу
   * @param args Аргументы командной строки (опционально)
   * @param options Опции запуска (опционально)
   * @returns Promise с PID запущенного процесса
   */
  async launchExe(
    filePath: string,
    args: string[] = [],
    options: { detached?: boolean; cwd?: string } = {},
  ): Promise<number> {
    const defaultOptions = {
      detached: false,
      cwd: process.cwd(),
      ...options,
    };

    return new Promise((resolve, reject) => {
      // Для Windows используем execFile
      if (process.platform === 'win32') {
        const child = execFile(
          filePath,
          args,
          defaultOptions,
          (error, stdout, stderr) => {
            if (error) {
              reject(
                new BadRequestException(`Ошибка выполнения: ${error.message}`),
              );
            }
          },
        );
        resolve(child?.pid || 1);
      }
      // Для других платформ используем exec
      else {
        const command = `"${filePath}" ${args.join(' ')}`;
        const child = exec(command, defaultOptions, (error, stdout, stderr) => {
          if (error) {
            reject(
              new BadRequestException(`Ошибка выполнения: ${error.message}`),
            );
          }
        });
        resolve(child?.pid || 1);
      }
    });
  }
}
