import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { ContactList } from '.';
import { store } from '../../store';


describe('ContactList', () => {
    it('should render ContactList component correctly', () => {
        const { container } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <ContactList />
                </MemoryRouter>
            </Provider>
        );

        expect(container).toMatchSnapshot();
    });
});
