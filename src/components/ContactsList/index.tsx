import { List } from "./components/List";


export function ContactList() {
    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-xl">ContactList</h2>
            <List />
        </div>
    )
}