import { fireEvent, render, screen } from "@testing-library/react";
import CreateSticky, { CreateStickyProps } from "../CreateSticky";
import userEvent from '@testing-library/user-event';
import { act } from "react-dom/test-utils";


describe('CreateSticky', () => {
    const createStickyProps: CreateStickyProps = {
        onCreateSticky: jest.fn(),
        onUpdateSticky: jest.fn(),
        selectedSticky: {
            id: '1',
            title: 'Online shopping',
            tag: 'Blue',
            body: 'Create a list of items to buy online',
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
            image: 'image'
        }
    }
    test('RENDER: should show update button when selectedSticky is not null', () => {
        const { getByRole, queryByRole, getAllByRole } = render(<CreateSticky {...createStickyProps}/>);
        expect(getByRole('button', { name: 'Update'})).toBeInTheDocument();
        expect(queryByRole('button', { name: 'Submit'})).not.toBeInTheDocument();

        expect(getAllByRole('textbox')).toHaveLength(2);
        expect(getAllByRole('combobox')).toHaveLength(1);
    });
    test('RENDER: should show submit button when selectedSticky is null', () => {
        const props = { ...createStickyProps, selectedSticky: null };
        const { getByRole } = render(<CreateSticky {...props}/>);
        expect(getByRole('button', { name: 'Submit'})).toBeInTheDocument();
    });

    test('EVENTS: should show changed value in inputs', async () => {
        const props = { ...createStickyProps, selectedSticky: null };
        const { getByRole, debug, getByTestId } = render(<CreateSticky {...props}/>);

        const titleInput = getByTestId('sticky-title');
        const tagInput = getByRole('combobox', { name: /tag/i});
        const bodyInput = getByRole('textbox', { name: 'Body'});
        const submitButton = getByRole('button', { name: 'Submit'});
        expect(tagInput).toHaveValue('Select tag color');

        act(() => {
            fireEvent.change(titleInput, { target: { value: 'Online shopping - updated' }});
            fireEvent.change(bodyInput, { target: { value: 'Create a list of items to buy online - updated' }});
        })

        expect(titleInput).toHaveValue('Online shopping - updated');
        expect(bodyInput).toHaveValue('Create a list of items to buy online - updated');
       
    });
})