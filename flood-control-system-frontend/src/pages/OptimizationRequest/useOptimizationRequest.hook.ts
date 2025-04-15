import { useState } from "react";
import { useNavigate } from "react-router";
import { pushNotification } from "src/stores/notification";
import { IStart, start } from "src/api/app/app";

export const useOptimizationRequest = () => {
  const [formData, setFormData] = useState<IStart>({
    ngdu: "",
    field: "",
    area: "",
    bl: "",
    strat: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    start({
      ngdu: formData.ngdu,
      field: formData.field,
      area: formData.area,
      bl: formData.bl,
      strat: formData.strat,
    })
      .then(() => {
        pushNotification({
          title: "Запрос успешно отправлен!",
          variant: "success",
        });
        navigate("/services/optimization/requests");
      })
      .catch(async (error) => {
        try {
          const errorResponse = await error.response.json();

          // Выводим все сообщения об ошибках через уведомление
          if (errorResponse.message && Array.isArray(errorResponse.message)) {
            pushNotification({
              title: `Ошибка`,
              description: errorResponse.message.join(";  "),
              variant: "error",
            });
          } else {
            pushNotification({
              title: `Ошибка`,
              description: errorResponse.message || "Неизвестная ошибка",
              variant: "error",
            });
          }
        } catch (parseError) {
          // Если не удалось распарсить ответ
          console.error("Failed to parse error response:", parseError);
          pushNotification({
            title: "Ошибка",
            description: "Произошла неизвестная ошибка",
            variant: "error",
          });
        }
      });
  };

  return {
    formData,
    setFormData,
    // errors,
    // setErrors,
    handleSubmit,
  };
};
