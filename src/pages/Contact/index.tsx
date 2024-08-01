import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router";
import { TagsList } from "../../components/TagsList";
import { useAddTagsMutation, useGetContactQuery } from "../../store/reducers/contacts/api";

interface IFormInput {
    tags: string;
}

export function Contact() {
    const { contactId } = useParams();
    const { data: contact, isLoading } = useGetContactQuery(contactId);
    
    const [addTags, { isLoading: isLoadingAddTags }] = useAddTagsMutation();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormInput>({
        defaultValues: {
            tags: ''
        }
    });

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        const tagsArr = data.tags.split(' ').filter(tag => tag !== "")
        try {
            await addTags({ tags: { tags: [...contact.tags2, ...tagsArr] }, id: contactId })
            reset()
        } catch (error) {
            console.log(error)
        }
    };

    if (isLoading) {
        return <div className="text-center">Loading...</div>
    }

    return (
        <div className="w-contact flex flex-col gap-6 m-10">
            <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                    <img className="w-full h-full object-cover object-center" src={contact?.avatar_url} />
                </div>
                <div className="flex flex-col flex-grow">
                    <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-medium max-w-52 overflow-hidden text-ellipsis whitespace-nowrap">{contact?.fields?.['first name']?.[0]?.value}</p>
                        <p className="font-medium max-w-52 overflow-hidden text-ellipsis whitespace-nowrap">{contact?.fields?.['last name']?.[0]?.value}</p>
                    </div>
                    <p className="font-medium max-w-52 overflow-hidden text-ellipsis whitespace-nowrap">{contact?.fields?.['email']?.[0]?.value}</p>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="font-medium">Tags</h3>
                <TagsList tags={contact?.tags} />
            </div>
            <form className='flex flex-col gap-2' onSubmit={handleSubmit(onSubmit)} >
                <div className='field'>
                    <input
                        className='input'
                        id="tags"
                        placeholder='Add new Tag'
                        {...register('tags', { required: 'Tags is required' })}
                    />
                    <p className='error'>{errors.tags?.message}</p>
                </div>
                <button className='submit-button' type="submit" disabled={isLoadingAddTags}>Add Tag</button>
            </form>
        </div>
    )
}