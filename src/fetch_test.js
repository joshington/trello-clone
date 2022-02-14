import React from 'react';
import {rest} from 'msw';
import {setupServer} from 'msw/node'
import {render, fireEvent,waitFor,screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Fetch from '../fetch'

const server = setupServer(
    rest.get('/greeting', (req, res, ctx) => {
        return res(ctx.json({greeting: 'hello there'}))
    }),
)

/*
    use the setupServer function from msw to mock an API request that our tested cpt makes.
*/
//establish API mocking before all tests
beforeAll(() => server.listen())
//reset any request handlers that are dclared as apart of our tests.
//ie. for testing one-time error scenarios
afterEach(() => server.resetHandlers())
//clean up once the tests are done
afterAll(() => server.close())

test('loads and displays greeting', async () => {
    render(<Fetch url="/greeting" />)
    fireEvent.click(screen.getByText('Load Greeting'),)
    await waitFor(() => screen.getByRole('heading'))
    
    expect(screen.getByRole('heading')).toHaveTextContent('hello there')
//getByRole throws an error if it cannot find an element.
    expect(screen.getByRole('button')).toBeDisabled()
})
test('handles server error', async () => {
    server.use(
        //override the initial "GET/greeting" request handler.
        //to return a 500 server error.
        rest.get('/greeting', (req,res, ctx) => {
            return res(ctx.status(500))
        }),
    )
    render(<Fetch url="/greeting" />)
    fireEvent.click(screen.getByText('Load Greeting'))
//fireEvent mthd allows u to fire event to simulate user actions.
//wait until the get request promise resolves and the cpt calls setState and re-renders.
//waitFor waits until the callback doesnt throw an error.

    await waitFor(() => screen.getByRole('alert'))

    expect(screen.getByRole('alert')).toHaveTextContent('Oops,failed to fetch')
//assert that the alert message is correct using toHaveTextContent, a custom matcher from jest-dom.
    expect(screen.getByRole('button')).not.toBeDisabled()
//assert that the button is not disabled using toBeDisabled, a custom matcher from jest-dom
})