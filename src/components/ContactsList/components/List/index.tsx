import { useGetContactsQuery } from "../../../../store/reducers/contacts/api";
import { Card } from "../Card";



export function List() {
    const { data: contacts, isLoading } = useGetContactsQuery(null);

    if (isLoading) {
        return <div className="w-full md:w-contact-list">Loading...</div>
    }

    return (
        <div className="flex flex-col gap-4 w-full md:w-contact-list">
            {contacts && contacts.map((contact) => <Card key={contact.id} contact={contact} />)}
        </div>
    )
}