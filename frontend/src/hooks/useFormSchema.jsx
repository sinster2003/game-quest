import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const useFormSchema = (schema) => {
    const {register, formState: {errors}, handleSubmit} = useForm({
        resolver: zodResolver(schema)
    });

    return {register, errors, handleSubmit};
}

export default useFormSchema