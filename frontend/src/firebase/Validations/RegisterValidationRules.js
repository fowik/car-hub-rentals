import { computed, reactive } from "vue";
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs,
} from "@vuelidate/validators";

const useValidationRules = () => {
  const state = reactive({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: {
      password: "",
      confirmPassword: "",
    },
  });

  const rules = computed(() => ({
    firstName: {
      required,
      minLength: minLength(2),
      maxLength: maxLength(20),
    },
    lastName: {
      required,
      minLength: minLength(2),
      maxLength: maxLength(20),
    },
    email: { required, email, maxLength: maxLength(50) },
    phoneNumber: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(13),
    },
    password: {
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(20),
      },
      confirmPassword: {
        required,
        sameAs: sameAs(state.password.password),
      },
    },
  }));

  return { state, rules };
};

export default useValidationRules;
