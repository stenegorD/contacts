import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { expect } from 'vitest';
import { Form } from '.';
import { store } from '../../../../store';


describe("Form", () => {
   
    it('should display validation error when name is not provided', async () => {
        render(
            <Provider store={store}>
                <Form />
            </Provider>
        );
        fireEvent.input(screen.getByPlaceholderText('Email'), {
            target: { value: 'test@example.com' },
        });
        fireEvent.click(screen.getByText('Add contact'));

        await waitFor(() => {
            expect(screen.getByText('Name or Surname is required')).toBeInTheDocument();
        });
    });


    it('should display validation error when fields empty is not provided', async () => {
        render(
            <Provider store={store}>
                <Form />
            </Provider>
        );

        fireEvent.click(screen.getByText('Add contact'));

        await waitFor(() => {
            expect(screen.getByText('Name or Surname is required')).toBeInTheDocument();
            expect(screen.getByText('Email is required')).toBeInTheDocument();
        });
    });

    it('should display validation error when email is invalid', async () => {
        render(
            <Provider store={store}>
                <Form />
            </Provider>
        );

        fireEvent.input(screen.getByPlaceholderText('Email'), {
            target: { value: 'invalid-email' },
        });

        fireEvent.click(screen.getByText('Add contact'));

        await waitFor(() => {
            expect(screen.getByText('Invalid email address')).toBeInTheDocument();
        });
    });

    it('should submit the form successfully when valid data is provided', async () => {
        render(
            <Provider store={store}>
                <Form />
            </Provider>
        );

        fireEvent.input(screen.getByPlaceholderText('Name'), {
            target: { value: 'Test name' },
        });
        fireEvent.input(screen.getByPlaceholderText('Surname'), {
            target: { value: 'Test surname' },
        });
        fireEvent.input(screen.getByPlaceholderText('Email'), {
            target: { value: 'test@example.com' },
        });

        fireEvent.click(screen.getByText('Add contact'));


        await waitFor(() => {
            expect(screen.queryByPlaceholderText('Name')).toHaveValue('');
            expect(screen.queryByPlaceholderText('Surname')).toHaveValue('');
            expect(screen.queryByPlaceholderText('Email')).toHaveValue('');
        });
    });
});
