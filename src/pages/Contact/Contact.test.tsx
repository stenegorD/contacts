import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it, Mock, vi } from 'vitest';

import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Contact } from '.';
import { store } from '../../store';
import * as api from '../../store/reducers/contacts/api';

vi.mock('../../store/reducers/contacts/api', async (importOriginal) => {
    const actual = await importOriginal() as typeof api;
    return {
        ...actual,
        useGetContactQuery: vi.fn(),
        useAddTagsMutation: vi.fn(),
    };
});

describe('Contact', () => {

    const addTagsMock = vi.fn().mockResolvedValue({});
    (api.useAddTagsMutation as Mock).mockImplementation(() => [addTagsMock, { isLoading: false }]);

    it('should render contact information correctly', async () => {
        (api.useGetContactQuery as Mock).mockImplementation(() => ({
            data: {
                id: '1',
                avatar_url: 'https://via.placeholder.com/150',
                fields: {
                    'first name': [{ value: 'Test name' }],
                    'last name': [{ value: 'Test surname' }],
                    'email': [{ value: 'test@example.com' }],
                },
                tags: [{ tag: 'tag' }],
            },
            isLoading: false,
        }));

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/contact/1']} >
                    <Contact />
                </MemoryRouter>
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByText('Test name')).toBeInTheDocument();
            expect(screen.getByText('Test surname')).toBeInTheDocument();
            expect(screen.getByText('test@example.com')).toBeInTheDocument();
            expect(screen.getByText('tag')).toBeInTheDocument();
        })
    });

    it('should render loading state initially', () => {
        (api.useGetContactQuery as Mock).mockImplementation(() => ({
            isLoading: true,
        }));

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Contact />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('should submit the form and call addTags mutation', async () => {
        const mockContact = {
            id: '1',
            avatar_url: 'https://via.placeholder.com/150',
            fields: {
                ['first name']: [{ value: 'Test name' }],
                ['last name']: [{ value: 'Test surname' }],
                ['email']: [{ value: 'test@example.com' }],
            },
            tags: [{ tag: "tag" }],
            tags2: ["tag1", "tag2"],
        };

        (api.useGetContactQuery as Mock).mockImplementation(() => ({
            data: mockContact,
            isLoading: false,
        }));

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/contact/1']}>
                    <Routes>
                        <Route path="/contact/:contactId" element={<Contact />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        fireEvent.change(screen.getByPlaceholderText('Add new Tag'), { target: { value: 'newTag' } });
        fireEvent.click(screen.getByText('Add Tag'));

        await waitFor(() => {
            expect(addTagsMock).toHaveBeenCalledWith({
                tags: { tags: [...mockContact.tags2, 'newTag'] },
                id: '1',
            });
        });

        await waitFor(() => {
            expect(screen.getByPlaceholderText('Add new Tag')).toHaveValue('');
        });
    });
});
