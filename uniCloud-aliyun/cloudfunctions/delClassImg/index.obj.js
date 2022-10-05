// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
module.exports = {
	delImg(delUrl) {
		//调用函数删除对应的图片
		uniCloud.deleteFile({
			fileList: [delUrl]
		})

		return {
			status: 0
		}
	}
}
