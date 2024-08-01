import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Home } from '.';
import { store } from '../../store';


describe('Home', () => {
    it('should render Home component correctly', () => {
        const { container } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            </Provider>
        );

        expect(container).toMatchSnapshot();
    });
});