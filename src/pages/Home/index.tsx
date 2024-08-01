import { ContactForm } from "../../components/ContactForm";
import { ContactList } from "../../components/ContactsList";


export function Home() {
    return (
        <div className="flex justify-center gap-8 m-10 flex-col md:flex-row">
            <ContactForm />
            <ContactList />
        </div>
    )
}