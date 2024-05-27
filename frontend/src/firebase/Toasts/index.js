import { toast } from "vue3-toastify";

export function showErrorToast(message) {
  toast(message, {
    type: "error",
    autoClose: 3000,
    position: "bottom-right",
    theme: "auto",
  });
}

export function showInfoToast(message) {
  toast(message, {
    type: "info",
    autoClose: 5000,
    position: "bottom-right",
    theme: "auto",
  });
}

export function showSuccessToast(message) {
  toast(message, {
    type: "success",
    autoClose: 3000,
    position: "bottom-right",
    theme: "auto",
  });
}
