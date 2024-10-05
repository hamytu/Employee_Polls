import moment from 'moment'
export function getDatetimeFromUnix(timestamp) {
    return moment.unix(timestamp / 1000).format('MMM DD YYYY, h:mm:ss a')
}