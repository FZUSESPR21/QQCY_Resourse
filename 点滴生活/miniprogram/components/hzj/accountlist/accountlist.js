// components/hzj/accountlist/accountlist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    accountlist: {
      type: Object,
      value: {
        accountgroup: [{
          date: "",
          vlheight: "",//在数据库获取完数据的时候就设置好这个高度 垂直线的高度 vlheight=ondayaccountheight-80rpx
          onedayaccountheight: "",
          account: [
            {
              type: "",
              num: "",
              remark: ""
            },
            {
              type: "",
              num: "",
              remark: ""
            }
          ]
        },]
      },
    },
    accounttype: {
      type: Object,
      value: {

      }
    },//判断收入或支出 0支出，1收入
  },
  /**
   * 组件的初始数据
   */
  data: {
    vlheight: "",
    length: [{
      index: 1,
    }, { index: 2 }],
    slideButtons: [{
      text: '查看详情',
      src: "../../../images/view-detail.png",
      data:1,
    }, {
      text: '修改',
      src: "../../../images/edit.png",
      data:1,
    }, {
      text: '删除',
      src: "../../../images/delete.png",
      data:1,
    }],
    accountlist: {
      accountgroup: [{
        date: "1M1d",
        account: [
          {
            type: "1",
            num: "200",
            remark: "奶茶",
          },
          {
            type: "2",
            num: "201",
            remark: "奶茶2",
          },
          {
            type: "2",
            num: "204",
            remark: "奶茶2",
          },
          {
            type: "2",
            num: "211",
            remark: "奶茶2",
          },
          {
            type: "2",
            num: "2501",
            remark: "奶茶2",
          }
        ]
      },
      ]
    },
    accountType: "0"
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行

    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
    ready: function () {
      //在组件布局完成后执行
    }
  },
  pageLifetimes: {
    show: function () {
      // 页面被展示

    },
    hide: function () {
      // 页面被隐藏
    },
    resize: function (size) {
      // 页面尺寸变化
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    slideButtonTap(e) {
      this.triggerEvent('slidebutton',e.detail);
    }
  }

})
