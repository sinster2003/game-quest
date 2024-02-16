import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const useFormSchema = (schema, formData) => {
    const {register, formState: {errors}, handleSubmit} = useForm({
        resolver: zodResolver(schema),
        defaultValues: formData || {}
    });

    return {register, errors, handleSubmit};
}

export default useFormSchema