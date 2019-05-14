const module_list = {
    xTraning: [{
        name: '热身',
        time: 5
    }, {
        name: '上面',
        time: 1800
    }, {
        name: '下面',
        time: 1800
    }, {
        name: '下面',
        time: 1800
    }, {
        name: '下面',
        time: 1800
    }, {
        name: '下面',
        time: 3700
    }, {
        name: '下面',
        time: 0
    }]
};

const getContent = (type) => {
    if (!type) return [];
    return module_list[type] || [];
};

export default getContent;