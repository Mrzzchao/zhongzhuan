const axios = require('axios')

const options = {}

const _axios = axios.create(options)

const ajax = function (url, config = {}) {
    return _axios.get(url, config).then((response) => {
        if (response.status === 200) {
            return response.data
        } else if (config.ignore) {
            return {data: {}}
        } else {
            throw new Error(response.message)
        }
    }).then((res) => {
        if(res.code === 100) {
            return {
                list: res.data,
                countAll: res.count
            }
        } else {
            throw new Error(res.msg)
        }
    }).catch((err) => {
        console.error(err);
    })
}

ajax.get = function (url, config = {ignore: true}) {
    // config.withCredentials = true
    // config.timeout = config.timeout || 5000
    return _axios.get(url, config).then((response) => {
        if (response.status === 200) {
            return response.data
        } else if (config.ignore) {
            return {data: {}}
        } else {
            throw new Error(response.message)
        }
    }).then((res) => {
        if(res.code === 100) {
            return {
                list: res.data,
                countAll: res.count
            }
        } else {
            throw new Error(res.msg)
        }
    }).catch((err) => {
        console.error(err);
    })
}

ajax.post = function (url, param, config = {ignore: true}) {
    // config.withCredentials = true
    // config.timeout = config.timeout || 5000
    return _axios.post(url, param, config).then((response) => {
        if (response.status === 200) {
            return response.data
        } else if (config.ignore) {
            return {data: {}}
        } else {
            throw new Error(response.message)
        }
    }).then((res) => {
        if(res.code === 100) {
            return {
                list: res.data,
                countAll: res.count
            }
        } else {
            throw new Error(res.msg)
        }
    }).catch((err) => {
        console.error(err);
    })
}

module.exports = ajax
