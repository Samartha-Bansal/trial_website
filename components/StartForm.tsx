"use client";

import React, { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import MDEditor from "@uiw/react-md-editor";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";


const StartForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [pitch, setPitch] = useState("");
    const router = useRouter();

    const handleFormSubmit = async (prevState: any, formData: FormData) => {
        try {
            const formValues = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                link: formData.get("link") as string,
                pitch,
            }; 

            await formSchema.parseAsync(formValues);
            console.log(formValues)

            const result = await createPitch(prevState, formData, pitch);
            console.log(result);

            if (result.status === 'SUCCESS') {   
                toast('Success', {
                    description: 'Pitch successfully created.', 
                });
                router.push(`/start/${result._id}`)
            }
            return result;

        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors = error.flatten().fieldErrors;
                setErrors(fieldErrors as unknown as Record<string, string>);

                toast.error('Error', {
                    description: 'Please check your inputs and try again.', 
                });

                return {...prevState, error: 'Validation failed', status: 'ERROR'};
            }

            toast.error('Error', {
                    description: 'An unexpected error has occured.', 
                });

            return {
                ...prevState,
                error: 'An unexpected error has occured',
                status: "ERROR",
            };
        } 
    };

    const [state, formAction, isPending] = useActionState(handleFormSubmit, {error: "", status: "INITIAL",});

  return (
    <form action={formAction} className='start-form'>
        <div>
            <label htmlFor="title" className="start-form_label">Title</label>
            <Input id="title" name="title" className="start-form_input" required placeholder="Start Title"/>

            {errors.title && <p className="start-form_error">{errors.title}</p>}
        </div>

        <div>
            <label htmlFor="description" className="start-form_label">Description</label>
            <Textarea id="description" name="description" className="start-form_textarea" required placeholder="Start Description"/>

            {errors.description && <p className="start-form_error">{errors.description}</p>}
        </div>

        <div>
            <label htmlFor="category" className="start-form_label">Category</label>
            <Input id="category" name="category" className="start-form_input" required placeholder="Start Category (eg. Tech, Health, Education)"/>

            {errors.category && <p className="start-form_error">{errors.category}</p>}
        </div>

        <div>
            <label htmlFor="link" className="start-form_label">Image URL</label>
            <Input id="link" name="link" className="start-form_input" required placeholder="Start Image URL"/>

            {errors.link && <p className="start-form_error">{errors.link}</p>}
        </div>

        <div data-color-mode="light">
            <label htmlFor="pitch" className="start-form_label">Pitch</label>
            <MDEditor 
                value={pitch} 
                onChange={(value) => setPitch(value as string)} 
                id="pitch" 
                preview="edit" 
                height={300} 
                style = {{borderRadius: 10, overflow: "hidden"}} 
                textareaProps={{placeholder: "Briefly describe your entry."}} 
                previewOptions={{disallowedElements: ['style']}} />

            {errors.pitch && <p className="start-form_error">{errors.pitch}</p>}
        </div>

        <Button type="submit" className="start-form_btn text-white flex justify-center" disabled={isPending}>
            {isPending ? "Submitting..." : "Submit"}
            <Send className="size-6 ml-2"/>
        </Button>
    </form>
  );
};

export default StartForm;