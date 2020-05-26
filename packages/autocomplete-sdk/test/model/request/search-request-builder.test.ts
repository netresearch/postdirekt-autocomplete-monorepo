import Subject from '../../../src/api/search-subjects';
import SearchRequestBuilder from '../../../src/model/request/search-request-builder';
import Request from '../../../src/model/request/request';
import AddressType from '../../../src/api/address-types';

/**
 * SelectRequestBuilder test
 */
describe('Test search request builder', () => {
    it('can create a correct request', () => {
        const subject = new SearchRequestBuilder('baseurl', 'token');
        const request = subject.create({ country: 'de', subject: Subject.Cities, address_type: AddressType.A });
        expect(request).toBeInstanceOf(Request);
        expect(request.url).toMatch('baseurl/de/cities');
        expect(request.headers.Authorization).not.toBeUndefined();
        expect(request.headers.Authorization).toBe('Bearer token');
    });
});
