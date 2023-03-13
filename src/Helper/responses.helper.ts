module.exports = {
    '500': {
        'message': 'Something went wrong',
        'error': true,
        'data': null
    },
    '200': (data:any) => ({
        'message': 'Success',
        'error': false,
        data
    }),
    '404': {
        'message': 'Data not found',
        'error': true,
        'data': null
    }
}