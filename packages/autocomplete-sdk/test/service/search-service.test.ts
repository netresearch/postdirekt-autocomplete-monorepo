import SearchResponseProvider from '../provider/search-response-provider';
import SearchService from '../../src/service/search-service';
import Subject from '../../src/api/search-subjects';
import FetchAdapter from '../../src/model/adapter/fetch-adapter';
import 'jest-fetch-mock';
import AddressType from '../../src/api/address-types';

beforeEach(() => {
    fetchMock.enableMocks();
});

const adapterStub = new FetchAdapter();
const testSubject = new SearchService('token', 'baseUrl', adapterStub);

describe('Search Service HTTP 200 tests', () => {
    const responses = SearchResponseProvider.get200Responses();
    const request = testSubject.requestBuilder.create({ country: 'de', subject: Subject.Cities, address_type: AddressType.A });
    // fetchMock.mockResponses(...responses);
    responses.forEach(([data, params]) => {
        it(params.statusText as string, async () => {
            fetchMock.mockResponseOnce(data, params);
            const response = await testSubject.search(request);
            expect(response).toEqual(JSON.parse(data));
        });
    });
});
describe('Search Service HTTP 4xx tests', () => {
    const responses = SearchResponseProvider.get400Responses();
    const request = testSubject.requestBuilder.create({ country: 'de', subject: Subject.Cities, address_type: AddressType.A });
    responses.forEach(([data, params]) => {
        it(params.statusText as string, async () => {
            fetchMock.mockResponseOnce(data, params);
            try {
                await testSubject.search(request);
            } catch (e) {
                expect(e).toBeInstanceOf(Error);
                expect(e.message).toContain(params.statusText);
            }
        });
    });
});
