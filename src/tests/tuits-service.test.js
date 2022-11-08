import {
    findAllTuits,
    findTuitById,
    findTuitByUser,
    createTuit,
    updateTuit,
    deleteTuit, deleteTuitByUsername, deleteTuitsByUid
} from "../services/tuits-service";

import {
    createUser
} from "../services/users-service";

describe('can create tuit with REST API',  () => {
    // sample tuit to insert
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    }

    let newUser;

    beforeAll(async () => {
        newUser = await createUser(ripley);
        return deleteTuitsByUid(newUser._id);
    })

    afterAll(() => {
        return deleteTuitsByUid(newUser._id)
    })

    test('can insert new tuits with REST API', async () => {

        const mockTuit = {
            tuit: 'This is a mock tuit for testing',
            postedOn: '2022-11-15T00:00:00.000Z',
            postedBy: `${newUser._id}`
        }

        //insert new user in the database
        const newTuit = await createTuit(newUser._id, mockTuit);
        //verify tuits parameters match the parameters of new tuit created
        expect(newTuit.tuit).toEqual(mockTuit.tuit);
        expect(newTuit.postedOn).toEqual(mockTuit.postedOn);
        expect(newTuit.postedBy).toEqual(mockTuit.postedBy);
    })
});

describe('can delete tuit with REST API', () => {
    // sample tuit to insert
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    }

    let newUser;

    beforeAll(async () => {
        newUser = await createUser(ripley);
        return deleteTuitsByUid(newUser._id);
    })

    afterAll(() => {
        return deleteTuitsByUid(newUser._id)
    })

    test('can delete new tuit with REST API', async () => {

        const mockTuit = {
            tuit: 'This is a mock tuit for testing',
            postedOn: '2022-11-15T00:00:00.000Z',
            postedBy: `${newUser._id}`
        }

        //insert new user in the database
        const newTuit = await createTuit(newUser._id, mockTuit);
        //verify tuits parameters match the parameters of new tuit created
        expect(newTuit.tuit).toEqual(mockTuit.tuit);
        expect(newTuit.postedOn).toEqual(mockTuit.postedOn);
        expect(newTuit.postedBy).toEqual(mockTuit.postedBy);

        const status = await deleteTuit(newTuit._id);

        expect(status.deletedCount).toBeGreaterThanOrEqual(1);

    })
});

describe('can retrieve a tuit by their primary key with REST API', () => {
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    }

    let newUser;

    beforeAll(async () => {
        newUser = await createUser(ripley);
        return deleteTuitsByUid(newUser._id);
    })

    afterAll(() => {
        return deleteTuitsByUid(newUser._id)
    })

    test('can delete new tuit with REST API', async () => {

        const mockTuit = {
            tuit: 'This is a mock tuit for testing',
            postedOn: '2022-11-15T00:00:00.000Z',
            postedBy: `${newUser._id}`
        }

        //insert new user in the database
        const newTuit = await createTuit(newUser._id, mockTuit);
        //verify tuits parameters match the parameters of new tuit created
        expect(newTuit.tuit).toEqual(mockTuit.tuit);
        expect(newTuit.postedOn).toEqual(mockTuit.postedOn);
        expect(newTuit.postedBy).toEqual(mockTuit.postedBy);

        const getTuit = await findTuitById(newTuit._id);

        expect(newTuit.tuit).toEqual(getTuit.tuit);
        expect(newTuit.postedOn).toEqual(getTuit.postedOn);
        expect(newTuit.postedBy).toEqual(getTuit.postedBy._id);

    });

});

describe('can retrieve all tuits with REST API', () => {
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    }

    let newUser;
    const tuits = [
        "This is the first test tuit",
        "This is the second tuit",
        "This is the third tuit"
    ];

    //setup data before test
    beforeAll(
        async () => {
            newUser = await createUser(ripley);
            tuits.map(tuit =>
                createTuit(newUser._id,{
                    tuit,
                    postedBy: `${newUser._id}`,
                    postedOn: '2022-11-15T00:00:00.000Z'
                }))
        }

    );

    //clean up after ourselves
    afterAll(() => deleteTuitsByUid(newUser._id));

    test('can retreive all tuits from REST API', async () => {
        const tuits = await findAllTuits();

        //there should be minimum number of tuits
        expect(tuits.length).toBeGreaterThanOrEqual(tuits.length);


        //let's check the tuits that we inserted
        const tuitsWeInserted = tuits.filter(
            tuit => tuits.indexOf(tuit.tuit) >=0);

        // compare the actual tuits in database with the ones we sent
        tuitsWeInserted.forEach(tuit => {
            const tuitExpect = tuits.find(tuit => tuit === tuit.tuit);
            expect(tuit.tuit).toEqual(tuitExpect);
            expect(tuit.postedBy).toEqual(`${newUser._id}`);
            expect(tuit.postedOn).toEqual('2022-11-15T00:00:00.000Z');
        })
    })

});