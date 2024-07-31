import { Form } from "./components/Form";


export function ContactForm() {

    return (
        <div className="flex flex-col gap-2 w-full md:w-contact-form">
            <h2 className="text-xl">Create Contact</h2>
            <Form />
        </div>
    )
}