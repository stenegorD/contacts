import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';
import { App } from './App';
import { store } from './store';


describe('App', () => {
    it('should render the Home page by default', () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );
        expect(screen.getByText('Create Contact')).toBeInTheDocument();
        expect(screen.getByText('Contact List')).toBeInTheDocument();
    });

});
