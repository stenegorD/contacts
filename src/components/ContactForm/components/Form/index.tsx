import { SubmitHandler, useForm } from 'react-hook-form';
import { useCreateContactMutation } from '../../../../store/reducers/contacts/api';

interface IFormInput {
    firstName: string;
    lastName: string;
    email: string;
}

export function Form() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormInput>({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: ''
        }
    });
    const [createContact, { isLoading }] = useCreateContactMutation();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            await createContact({
                record_type: 'person',
                privacy: {
                    edit: null,
                    read: null,
                },
                owner_id: null,
                fields: {
                    ['first name']: [{ value: data.firstName, modifier: '', label: 'first name' }],
                    ['last name']: [{ value: data.lastName, modifier: '', label: 'last name' }],
                    ['email']: [{ value: data.email, modifier: '', label: 'email' }],
                }
            })
            reset()
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <form className='flex flex-col gap-2' onSubmit={handleSubmit(onSubmit)} >
            <div className='field'>
                <label htmlFor="firstName" className='label'>Name</label>
                <input
                    className='input'
                    id="firstName"
                    placeholder='Name'
                    {...register('firstName', { required: 'Name is required' })}
                />
                <p className='error'>{errors.firstName?.message}</p>
            </div>

            <div className='field'>
                <label htmlFor="lastName" className='label'>Surname</label>
                <input
                    className='input'
                    id="lastName"
                    placeholder='Surname'
                    {...register('lastName', { required: 'Surname is required' })}
                />
                <p className='error'>{errors.lastName?.message}</p>
            </div>

            <div className='field'>
                <label htmlFor="email" className='label'>Email</label>
                <input
                    className='input'
                    id="email"
                    type="email"
                    placeholder='Email'
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                            message: 'Invalid email address',
                        },
                    })}
                />
                <p className='error'>{errors.email?.message}</p>
            </div>
            <button className='text-md font-medium p-2 border border-gray-300 border-solid rounded hover:border-indigo-300 hover:text-indigo-500 duration-500 ease-linear' type="submit" disabled={isLoading}>Add contact</button>
        </form>
    )
}