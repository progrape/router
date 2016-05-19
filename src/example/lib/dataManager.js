
let data = {};

export default {
    /**
     * get data
     * @param {String} key
     * @returns {*}
     */
    getData: function (key){
        return data[key];
    },
    /**
     * set data
     * @param {String} key
     * @param {*} value
     */
    setData: function (key, value){
        data[key] = value;
    }
};