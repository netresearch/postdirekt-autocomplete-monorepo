import SelectRequestBuilder from '../../../src/model/request/select-request-builder';
import Subject from '../../../src/api/search-subjects';
import Request from '../../../src/model/request/request';

/**
 * SelectRequestBuilder test
 */
describe('Test select request builder', () => {
    it('can create a correct request', () => {
        const subject = new SelectRequestBuilder('baseurl', 'token');
        const request = subject.create({
            country: 'de',
            subject: Subject.Cities,
            uuid: '012345',
        });
        expect(request).toBeInstanceOf(Request);
        expect(request.url).toMatch('baseurl/de/cities');
        expect(request.url).toContain('uuid=012345');
        expect(request.headers.Authorization).not.toBeUndefined();
        expect(request.headers.Authorization).toBe('Bearer token');
    });
});
