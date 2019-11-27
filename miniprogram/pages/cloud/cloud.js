// miniprogram/pages/cloud/cloud.js
//初始化数据库
var db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  
  // 插入数据库数据
  insert: function(){
    db.collection('user').add({
      data: {
        firstName: 'hello',
        lastName: 'world',
        age:20
      }
    }).then(res=> {
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  },

  // 删除数据
  delete: function(){
    db.collection('user').doc('66c996965ddb74f4003e4c213c703b94')
    .remove()
    .then(res=> {
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  },

  // 修改数据
  update: function() {
    db.collection('user').doc('66c996965ddb74f4003e4c213c703b94').update({
      data: {
        age: 132
      }
    }).then(res=> {
      console.log(res)
    }).catch(err=> {
      console.log(err)
    })
  },

  // 查找数据
  search: function() {
    db.collection('user').where({
      firstName: 'hello'
    }).get().then(res=> {
      console.log(res)
    }).catch(err=> {
      console.log(err)
    })
  },

  // 调用云函数
  sum: function() {
    wx.cloud.callFunction({
      name: 'sum',
      data: {
        a: 19,
        b: 33
      }
    }).then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  },

  // 获取用户id
  getOpenId: function() {
    wx.cloud.callFunction({
      name: 'login'
    }).then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  },

  // 云存储 上传文件
  updateFile: function() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType:['camera', 'album'],
      success: function(res) {
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        wx.cloud.uploadFile({
          cloudPath: 'example.png',
          filePath: tempFilePaths[0],
          success: res => {
            console.log(res)
            // 上传成功后，可做后续业务操作
          },
          fail: err => {
            console.log(err)
          }
        })

      },
    })
  },

  deleteFile: function() {
    wx.cloud.downloadFile({
      fileID: '',
      success: res=> {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            //toast
          }
        })
      },
      fail: console.error
    })
  }
})