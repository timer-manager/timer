// pages/detail.js
import getContent from '../../data/TrainingPrograms'

let timer = null, breakTimer = null, tempState = false;
const voice = wx.getBackgroundAudioManager();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        content: [], // 内容
        remainingTime: 0, // 剩余时间
        currentIndex: 0, // 当前序号
        current: {},
        runTime: 0, // 历时
        totalTime: 0, // 总时间
        lockState: false, // 锁屏状态
        runningState: false, // 计时状态
        breakState: false, // 休息状态
        lockImage: '../../assets/lock.png',
        unlockImage: '../../assets/unlock.png',
        playImage: '../../assets/play.png',
        pauseImage: '../../assets/pause.png',
        scrollDomName: 'button0'
    },
    /**
     * 开始倒计时
     */
    start() {
        if (this.data.remainingTime < 0) return false;
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
        if (breakTimer) {
            clearTimeout(breakTimer);
            breakTimer = null;
        }
        this.setData({
            runningState: true
        });
        voice.title = '提示音';
        voice.src = 'http://fjdx.sc.chinaz.net/Files/DownLoad/sound1/201901/11040.mp3';
        timer = setInterval(() => {
            this.setData({
                remainingTime: this.data.remainingTime - 1,
                runTime: this.data.runTime + 1
            });
            if (this.data.remainingTime <= 0){
                this.stop();
                if (this.data.currentIndex < this.data.content.length - 1) {
                    this.setData({
                        breakState: true
                    });
                    breakTimer = setTimeout(() => {
                        this.setData({
                            breakState: false
                        });
                        this.translateAction(this.data.currentIndex + 1);
                        this.data.runningState && this.data.current.time > 0 && this.start();
                    },5000);
                }
            }
        }, 1000);
    },
    /**
     * 停止倒计时
     */
    stop() {
        clearInterval(timer);
        // clearTimeout(breakTimer);
        // breakTimer = null;
        timer = null;
        this.setData({
            runningState: false,
            breakState: false
        })
    },
    /**
     * 切换动作
     * @param index 动作序号
     */
    translateAction(index) {
        let action = this.data.content[index];
        if (action) {
            this.stop();
            this.setData({
                lockState: false
            });
            this.setData({
                current: action,
                remainingTime: action.time,
                currentIndex: index,
                scrollDomName: 'button' + index,
                lockState: tempState
            });
            this.setTotalTime();
        }
    },
    /**
     * 处理点击动作事件
     */
    handleClickItem(e) {
        let index = e.currentTarget.dataset.index;
        if (index || index === 0) {
            if(index !== this.data.currentIndex) {
                this.translateAction(index);
                this.data.current.time > 0 && this.start();
            } else {
                if(this.data.runningState) {
                    this.stop()
                } else {
                    this.start()
                }
            }
        }
    },
    /**
     * 重置
     */
    reset () {
        this.setData({
            remainingTime: 0, // 剩余时间
            currentIndex: 0, // 当前序号
            current: this.data.content[0],
            runTime: 0, // 历时
        });
        this.translateAction(0);
        this.setTotalTime();
    },
    /**
     * 锁屏
     */
    lock () {
        this.setData({
            lockState: !this.data.lockState
        });
        tempState = this.data.lockState;
    },
    /**
     * 暂停/继续
     */
    operate () {
        if(this.data.runningState || this.data.breakState) {
            this.stop();
        } else {
            this.start();
        }
    },
    /**
     * 获取剩余时长
     */
    setTotalTime() {
        let t = 0;
        for (let i = this.data.currentIndex + 1; i < this.data.content.length; i++) {
            t = t + this.data.content[i].time;
        }
        this.setData({
            totalTime: t
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            content: getContent(options.type || 'xTraning')
        });
        this.translateAction(0);
        this.setTotalTime();
        this.stop();
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
});