import SearchService from '../../src/service/search-service';
import SelectService from '../../src/service/select-service';
import ServiceFactory from '../../src/service/service-factory';

/**
 * ServiceFactory test
 */
describe('Test service factory', () => {
    it('can generate search service class', () => {
        const subject = new ServiceFactory();
        const searchService = subject.createSearchService('myToken');
        expect(searchService).toBeInstanceOf(SearchService);
    });

    it('can generate select service class', () => {
        const subject = new ServiceFactory();
        const selectService = subject.createSelectService('myToken');
        expect(selectService).toBeInstanceOf(SelectService);
    });
});
