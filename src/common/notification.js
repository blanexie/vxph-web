import { ElNotification } from 'element-plus'



const Notification = {
    success: function (title, message) {
        ElNotification({
            type: 'success',
            message: message,
            title: title,
        })
    },
    warning: function (title, message) {
        ElNotification({
            type: 'warning',
            message: message,
            title: title,
        })
    },
    info: function (title, message) {
        ElNotification({
            type: 'info',
            message: message,
            title: title,
        })
    },
    error: function (title, message) {
        ElNotification({
            title: title,
            message: message,
            type:'error',
        })
    }
}

export default Notification