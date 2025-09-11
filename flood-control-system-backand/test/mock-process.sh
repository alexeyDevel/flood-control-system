#!/bin/bash

# Mock process for testing on macOS
echo "Starting mock process: $1"
echo "PID: $$"
echo "User ID: $2"
echo "File ID: $3"

# Имитация работы процесса (5 секунд)
sleep 5

# Создаем mock результат
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
OUTPUT_FILE="/Users/$USER/flood-control-system/public/result_${TIMESTAMP}.txt"

echo "Process completed successfully!" > "$OUTPUT_FILE"
echo "Results saved to: $OUTPUT_FILE"

exit 0