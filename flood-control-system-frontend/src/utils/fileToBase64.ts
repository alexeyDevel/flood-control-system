/**
 * Преобразует файл в base64 строку
 * @param file - Файл для преобразования
 * @returns Promise с base64 строкой (без data-префикса)
 * @throws {Error} Если преобразование не удалось
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!(file instanceof File)) {
      reject(new Error("Переданный объект не является файлом"));
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      try {
        const result = reader.result as string;
        // Удаляем префикс "data:*/*;base64,"
        const base64String = result.split(",")[1];
        if (!base64String) {
          throw new Error("Не удалось извлечь base64 данные");
        }
        resolve(base64String);
      } catch (error) {
        reject(
          new Error(
            `Ошибка обработки файла: ${
              error instanceof Error ? error.message : String(error)
            }`
          )
        );
      }
    };

    reader.onerror = () => {
      reject(
        new Error(
          `Ошибка чтения файла: ${
            reader.error?.message || "Неизвестная ошибка"
          }`
        )
      );
    };

    reader.onabort = () => {
      reject(new Error("Чтение файла прервано"));
    };

    reader.readAsDataURL(file);
  });
};

/**
 * Валидирует расширение файла
 * @param filename - Имя файла
 * @param allowedExtensions - Массив разрешенных расширений (например, ['.xlsx', '.csv'])
 * @returns true если расширение допустимо
 */
export const validateFileExtension = (
  filename: string,
  allowedExtensions: string[]
): boolean => {
  const extension = filename.slice(filename.lastIndexOf(".")).toLowerCase();
  return allowedExtensions.includes(extension);
};

/**
 * Хелпер для загрузки файла с валидацией
 * @param file - Файл для обработки
 * @param options - Опции валидации
 * @returns Promise с объектом { name: string, data: string }
 */
export const prepareFileForUpload = async (
  file: File,
  options?: {
    allowedExtensions?: string[];
    maxSizeMB?: number;
  }
): Promise<{ name: string; data: string }> => {
  // Валидация размера
  if (options?.maxSizeMB && file.size > options.maxSizeMB * 1024 * 1024) {
    throw new Error(`Файл слишком большой. Максимум: ${options.maxSizeMB}MB`);
  }

  // Валидация расширения
  if (options?.allowedExtensions) {
    const isValid = validateFileExtension(file.name, options.allowedExtensions);
    if (!isValid) {
      throw new Error(
        `Недопустимое расширение файла. Разрешены: ${options.allowedExtensions.join(
          ", "
        )}`
      );
    }
  }

  const data = await fileToBase64(file);
  return {
    name: file.name,
    data,
  };
};
