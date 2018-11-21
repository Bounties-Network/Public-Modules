import nock from 'nock'
import fixtures from './fixtures'
import Bounties from '../src/bounties'


nock.disableNetConnect()
const mock = nock('https://api.bounties.network/')
const bounties = new Bounties(null, '0x2af47a65da8CD66729b4209C22017d6A5C2d2400')

describe('bounty module', () => {
    it('should load bounty with specified id', async () => {
        mock.get('/bounty/1/').reply(200, fixtures.bounty)

        const bounty = await bounties.bounty.load((1))
        expect(bounty).toEqual(fixtures.bounty)
    })

    it('should load bounty with corrent parameters', async () => {
        const params = { platform__in: 'bounties' }
        mock.get('/bounty/1/').query(params).reply(200, fixtures.bounty)

        const bounty = await bounties.bounty.load(1, params)
        expect(bounty).toEqual(fixtures.bounty)
    })

    it('should fail if id does not exist', async () => {
        mock.get('/bounty/1234/').reply(400, fixtures.bounty);
        await expect(bounties.bounty.load(1)).rejects.toThrow(new Error())
    })
})