import { MouseEvent } from "react";
import { useNavigate } from "react-router";
import { SvgRemove } from "../../../../assets/svg";
import { useDeleteContactMutation } from "../../../../store/reducers/contacts/api";
import { TagsList } from "../../../TagsList";

type CardProps = {
    contact: any
}

export function Card({ contact }: CardProps) {
    const navigate = useNavigate()
    const [deleteContact] = useDeleteContactMutation();
    
    const { id, avatar_url, fields, tags } = contact;

    const handleRemoveContact = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        e.preventDefault()
        deleteContact(id)
    }

    const navigateToContactPage = () => {
        navigate(`/contact/${id}`)
    }

    return (
        <div className="bg-custom-gray-bg rounded p-4 cursor-pointer" onClick={navigateToContactPage}>
            <div className="flex gap-2">
                <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                    <img className="w-full h-full object-cover" src={avatar_url} />
                </div>
                <div className="flex flex-col flex-grow gap-4">
                    <div className="flex flex-col">
                        <div className="flex gap-2 flex-wrap">
                            <p className="font-medium max-w-36 md:max-w-52 overflow-hidden text-ellipsis whitespace-nowrap">{fields?.['first name']?.[0]?.value}</p>
                            <p className="font-medium max-w-36 md:max-w-52 overflow-hidden text-ellipsis whitespace-nowrap">{fields?.['last name']?.[0]?.value}</p>
                        </div>
                        <p className="font-medium max-w-36 md:max-w-52 overflow-hidden text-ellipsis whitespace-nowrap">{fields?.['email']?.[0]?.value}</p>
                    </div>
                    <TagsList tags={tags} />
                </div>
                <button className="self-start button" type="button" onClick={handleRemoveContact}><SvgRemove className="svg-icon" /></button>
            </div>
        </div>
    )
}