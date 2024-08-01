

// Card.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it, vi } from 'vitest';

import { MemoryRouter } from 'react-router-dom';
import { Contact } from '.';
import { store } from '../../store';
import * as api from '../../store/reducers/contacts/api';

vi.mock('../../store/reducers/contacts/api', async (importOriginal) => {
    const actual = await importOriginal()as typeof api;
    return {
        ...actual,
        useGetContactQuery: vi.fn(),
    };
});

describe('Contact', () => {
    it('should render contact information correctly', async () => {
        (api.useGetContactQuery as jest.Mock).mockImplementation(() => ({
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
        (api.useGetContactQuery as jest.Mock).mockImplementation(() => ({
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
});
