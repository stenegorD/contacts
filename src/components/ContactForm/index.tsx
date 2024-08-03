import { Form } from "./components/Form";


export function ContactForm() {

    return (
        <div className="flex flex-col gap-2 w-full h-full top-[40px] bottom md:w-contact-form md:sticky">
            <h2 className="text-xl">Create Contact</h2>
            <Form />
        </div>
    )
}