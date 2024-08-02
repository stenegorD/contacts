import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, Mock, vi } from 'vitest';
import { List } from '.';
import { store } from '../../../../store';
import * as api from '../../../../store/reducers/contacts/api';


vi.mock('../../../../store/reducers/contacts/api', async (importOriginal) => {
    const actual = await importOriginal() as typeof api;
    return {
        ...actual,
        useGetContactsQuery: vi.fn(),
    };
});

describe('List', () => {
    it('should render loading state initially', () => {
        (api.useGetContactsQuery as Mock).mockImplementation(() => ({
            data: undefined,
            isLoading: true,
        }));

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <List />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('should render contact list when data is loaded', async () => {
        const contacts = [
            { id: '1', avatar_url: 'https://via.placeholder.com/150', fields: { ['first name']: [{ value: 'Cat' }], ['last name']: [{ value: 'Kitty' }], ['email']: [{ value: 'cat@example.com' }] }, tags: [{ tag: 'cat' }] },
            { id: '2', avatar_url: 'https://via.placeholder.com/150', fields: { ['first name']: [{ value: 'Dog' }], ['last name']: [{ value: 'Bobby' }], ['email']: [{ value: 'dog@example.com' }] }, tags: [{ tag: 'dog' }] },
        ];

        (api.useGetContactsQuery as Mock).mockImplementation(() => ({
            data: contacts,
            isLoading: false,
        }));

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <List />
                </MemoryRouter>
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByText('Kitty')).toBeInTheDocument();
            expect(screen.getByText('Bobby')).toBeInTheDocument();
            expect(screen.getByText('cat@example.com')).toBeInTheDocument();
            expect(screen.getByText('dog@example.com')).toBeInTheDocument();
        });
    });

    it('should render empty state when no contacts are available', async () => {
        (api.useGetContactsQuery as Mock).mockImplementation(() => ({
            data: [],
            isLoading: false,
        }));

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <List />
                </MemoryRouter>
            </Provider>
        );

        await waitFor(() => {
            expect(screen.queryByText('Kitty')).not.toBeInTheDocument();
            expect(screen.queryByText('Bobby')).not.toBeInTheDocument();
        });
    });
});
