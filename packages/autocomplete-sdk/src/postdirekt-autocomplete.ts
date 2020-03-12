/**
 * See LICENSE.txt for license details.
 */
import ServiceFactory from './service/service-factory';
import SearchSubject from './api/search-subjects';

const { createSearchService } = ServiceFactory;
const { createSelectService } = ServiceFactory;

export default {
    createSearchService,
    createSelectService,
    SearchSubject,
};
