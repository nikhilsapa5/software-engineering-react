import tuits, {Tuits} from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import * as axios from "axios";
import {UserList} from "../components/profile/user-list";
import Tuit from "../components/tuits/tuit";
import {findAllTuits} from "../services/tuits-service";

jest.mock('axios');

const MOCKED_USERS = [
    {username: 'alice', password: 'lv426', email: 'repley@weyland.com', _id: "123"},
    {username: 'bob', password: 'illbeback', email: 'sarah@bigjeff.com', _id: "234"},
    {username: 'charlie', password: 'illbeback', email: 'sarah@bigjeff.com', _id: "234"}
]

const MOCKED_TUITS = [
    {
        tuit: "alice's tuit",
        postedBy: MOCKED_USERS[0],
        _id: "123"
    },
    {
        tuit: "bob's tuit",
        postedBy: MOCKED_USERS[1],
        _id: "234"
    }
    ,{
        tuit: "charlie's tuit",
        postedBy: MOCKED_USERS[2],
        _id:"456"
    }
];

test('tuit list renders mocked', async () => {
    axios.get.mockImplementation(() =>
        Promise.resolve({ data: {tuits: MOCKED_TUITS} }));
    const response = await findAllTuits();
    const tuits = response.tuits;

    render(
        <HashRouter>
            <Tuit tuit={tuits[0]}/>
            <Tuit tuit={tuits[1]}/>
            <Tuit tuit={tuits[2]}/>
        </HashRouter>
    );

    const tuit = screen.getByText(/alice's tuit/i);
    expect(tuit).toBeInTheDocument();
});