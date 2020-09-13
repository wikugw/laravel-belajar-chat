window.Vue = require('vue');
// import moment from "moment";
window.moment = require('moment');

Vue.filter('timeformat', function (arg) {
    return moment(arg).format('MMMM Do YYYY, h:mm:ss a')
});
