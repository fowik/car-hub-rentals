import { reactive } from "vue";
import { required, minLength, maxLength } from "@vuelidate/validators";

const useValidationRules = () => {
  const state = reactive({
    email: "",
    password: "",
  });

  const rules = {
    email: { required },
    password: { required, minLength: minLength(6), maxLength: maxLength(20) },
  };

  return { state, rules };
};

export default useValidationRules;
