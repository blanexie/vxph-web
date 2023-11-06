import { ElNotification } from 'element-plus'



const Notification = {
    success: function (title, message) {
        ElNotification({
            title: 'Success',
            message: message,
            type: title,
        })
    },
    warning: function (title, message) {
        ElNotification({
            title: 'Warning',
            message: message,
            type: title,
        })
    },
    info: function (title, message) {
        ElNotification({
            title: 'Info',
            message: message,
            type: title,
        })
    },
    error: function (title, message) {
        ElNotification({
            title: 'Error',
            message: message,
            type: title,
        })
    }
}

export default Notification