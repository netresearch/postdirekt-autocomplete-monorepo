import { MockParams } from 'jest-fetch-mock';

export default class SearchResponseProvider {
    public static get200Responses(): Array<[string, MockParams]> {
        return [
            [
                JSON.stringify({}),
                {
                    status: 200,
                    statusText: 'empty',
                    headers: { 'Content-Type': 'application/json' },
                },
            ],
            [
                JSON.stringify(null),
                {
                    status: 200,
                    statusText: 'null',
                    headers: { 'Content-Type': 'application/json' },
                },
            ],
            [
                JSON.stringify({}),
                {
                    status: 200,
                    statusText: 'undefined',
                    headers: { 'Content-Type': 'application/json' },
                },
            ],
            [
                JSON.stringify({
                    addresses: [
                        {
                            uuid: '7D22315B37F6B4AF920E77C96938F214',
                            postalCode: '04105',
                            city: 'Leipzig',
                            street: 'Berliner Str.',
                            addressType: 'A',
                        },
                        {
                            uuid: 'AAE442EBC38118420BF8C1071732F877',
                            postalCode: '04107',
                            city: 'Leipzig',
                            street: 'Beethovenstr.',
                            addressType: 'A',
                        },
                        {
                            uuid: '40CE022B89EEB2AEC4881D4C016F0200',
                            postalCode: '04107',
                            city: 'Leipzig',
                            street: 'Bernhard-Göring-Str.',
                            addressType: 'A',
                        },
                        {
                            uuid: '21873BCAAA4F4B90811B52F908037C49',
                            postalCode: '04129',
                            city: 'Leipzig',
                            street: 'Berliner Str.',
                            addressType: 'A',
                        },
                        {
                            uuid: '3D578ABF4A902AEA4E3DF3F1E307567C',
                            postalCode: '04129',
                            city: 'Leipzig',
                            street: 'Bernburger Str.',
                            addressType: 'A',
                        },
                        {
                            uuid: 'D9F15A1C36502564DC387358496D3760',
                            postalCode: '04155',
                            city: 'Leipzig',
                            street: 'Berggartenstr.',
                            addressType: 'A',
                        },
                        {
                            uuid: 'BC0A6FF1431185BF68BBEECE7012A4DA',
                            postalCode: '04157',
                            city: 'Leipzig',
                            street: 'Benedixstr.',
                            addressType: 'A',
                        },
                        {
                            uuid: 'E79A3BBE2F6D6D43FB54BBEB7D92F556',
                            postalCode: '04157',
                            city: 'Leipzig',
                            street: 'Beyerleinstr.',
                            addressType: 'A',
                        },
                        {
                            uuid: 'FB6DB23AA66F22818C62A2EC41513E8C',
                            postalCode: '04159',
                            city: 'Leipzig',
                            street: 'Benedekring',
                            addressType: 'A',
                        },
                        {
                            uuid: 'C6AED9D5DF4B1EC80006EA360CF5F749',
                            postalCode: '04159',
                            city: 'Leipzig',
                            street: 'Berggartenweg',
                            addressType: 'A',
                        },
                        {
                            uuid: '1C3E5F969130BD4ACA239C009EBA4B4A',
                            postalCode: '04179',
                            city: 'Leipzig',
                            street: 'Beckerstr.',
                            addressType: 'A',
                        },
                        {
                            uuid: '4D079E9DB68B8CDD5250D93D4AA8C835',
                            postalCode: '04179',
                            city: 'Leipzig',
                            street: 'Benediktusstr.',
                            addressType: 'A',
                        },
                        {
                            uuid: '064F810E54C08AC7FE5D23582F08905C',
                            postalCode: '04207',
                            city: 'Leipzig',
                            street: 'Berkaer Weg',
                            addressType: 'A',
                        },
                        {
                            uuid: '0AB3C0BFEEF0B5B0B49D594668ABE9F5',
                            postalCode: '04229',
                            city: 'Leipzig',
                            street: 'Beipertstr.',
                            addressType: 'A',
                        },
                        {
                            uuid: '0203DFF001DCB4C11D8C937351CBB6EE',
                            postalCode: '04249',
                            city: 'Leipzig',
                            street: 'Berlichingenweg',
                            addressType: 'A',
                        },
                    ],
                }),
                {
                    status: 200,
                    statusText: 'Success',
                    headers: { 'Content-Type': 'application/json' },
                },
            ],
        ];
    }

    public static get400Responses(): Array<[string, MockParams]> {
        return [
            [
                '',
                {
                    status: 401,
                    statusText: 'Unauthorized',
                    headers: {
                        'WWW-Authenticate': 'Bearer realm="Autocomplete2_Realm", error="invalid_token", error_description="Token is not active"',

                    },
                },
            ],
            [
                JSON.stringify({
                    timestamp: '2020-01-08T13:14:24.093+0000',
                    status: 400,
                    error: 'Bad Request',
                    message: 'No other parameters are allowed when using combined search! Please remove either the combined parameter or the other used parameters.',
                    path: '/autocomplete2/search/de/postalcodes_cities_streets',
                }),
                {
                    status: 400,
                    statusText: 'Bad Request',
                    headers: { 'Content-Type': 'application/json' },
                },
            ],
        ];
    }
}
