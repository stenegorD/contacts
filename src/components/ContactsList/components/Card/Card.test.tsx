import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it, Mock, vi } from 'vitest';

import { MemoryRouter } from 'react-router-dom';
import { Card } from '.';
import { store } from '../../../../store';
import * as api from '../../../../store/reducers/contacts/api';

const useNavigateMock: Mock = vi.fn();

vi.mock(`react-router`, async (): Promise<unknown> => {
    const actual: Record<string, unknown> = await vi.importActual(`react-router`);

    return {
        ...actual,
        useNavigate: (): Mock => useNavigateMock,
    };
});

vi.mock('../../../../store/reducers/contacts/api', async (importOriginal) => {
    const actual = await importOriginal() as typeof api;
    return {
        ...actual,
        useDeleteContactMutation: vi.fn(),
    };
});

describe('Card', () => {

    const mockContact = {
        id: '1',
        avatar_url: 'https://via.placeholder.com/150',
        fields: {
            ['first name']: [{ value: 'Test name' }],
            ['last name']: [{ value: 'Test surname' }],
            ['email']: [{ value: 'test@example.com' }],
        },
        tags: [{ tag: "tag" }],
    };

    it('should render contact information correctly', () => {
        (api.useDeleteContactMutation as Mock).mockImplementation(() => [vi.fn(), { isLoading: false }]);
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Card contact={mockContact} />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText('Test name')).toBeInTheDocument();
        expect(screen.getByText('Test surname')).toBeInTheDocument();
        expect(screen.getByText('test@example.com')).toBeInTheDocument();
        expect(screen.getByText('tag')).toBeInTheDocument();
    });

    it('should call deleteContact on delete button click', () => {
        const deleteContact = vi.fn();
        (api.useDeleteContactMutation as Mock).mockImplementation(() => [deleteContact, { isLoading: false }]);

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Card contact={mockContact} />
                </MemoryRouter>
            </Provider>
        );

        fireEvent.click(screen.getByRole('button'));
        expect(deleteContact).toHaveBeenCalledWith('1');
    });

    it('should disable delete button when isLoading is true', () => {
        (api.useDeleteContactMutation as Mock).mockImplementation(() => [vi.fn(), { isLoading: true }]);

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Card contact={mockContact} />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByRole('button')).toBeDisabled();
    });

    it('should navigate to contact page on click', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Card contact={mockContact} />
                </MemoryRouter>
            </Provider>

        );

        fireEvent.click(screen.getByTestId(mockContact.id));

        await waitFor(() => expect(useNavigateMock).toBeCalledWith('/contact/1'));
        await waitFor(() => expect(useNavigateMock).not.toBeCalledWith('/contact/2'));
    })

});
