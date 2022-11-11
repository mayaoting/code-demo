const { app, BrowserWindow, Menu, dialog } = require('electron');
const path = require('path');
const isDev = !app.isPackaged;
const cp = require('child_process');
const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');
const application = express();
const START_PORT = 50001;
const DOMAIN = 'http://xxx';
const enviroment = process.platform == 'darwin' ? 'mac' : 'win';
const log = require('electron-log');
// 获取项目资源目录注意区分打包前和打包后的区别
const appPath = app.isPackaged
    ? path.dirname(app.getPath('exe')) // 打包后
    : app.getAppPath();  // 打包前
const { autoUpdater } = require('electron-updater');

if (isDev) {
    // 判断如果是dev环境就将log存储在项目根目录的logs文件夹
    log.transports.file.resolvePath = () =>
        path.join(__dirname, `logs/${new Date().toLocaleDateString()}.log`);
}
// 设置log日志的格式可以去electron-log官方文档查看更多格式化
log.transports.file.format = '[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}] {text}';

let localServer; // node服务的实例，这里定义是为了后面方便在关闭窗口的时候杀掉它
function createWindow() {
    // 主进程开启一个尺寸为1920*1000的窗口
    const mainWindow = new BrowserWindow({
        width: 1920,
        height: 1000,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });
    // 生命一个meu
    const menu = [
        {
            label: '帮助',
            submenu: [
                {
                    label: '控制台',
                    click: () => {
                        mainWindow.webContents.openDevTools({ mode: 'bottom' });
                    },
                },
                {
                    label: '检查更新',
                    click: () => {
                        autoUpdater.checkForUpdates();
                    },
                },
                {
                    label: '关于',
                    click: () => {
                        dialog.showMessageBoxSync({
                            title: '关于',
                            message: `${app.getName()}V${app.getVersion()}`,
                            type: 'info',
                            icon: path.resolve(
                                __dirname,
                                'media/images/logo.png'
                            ),
                            buttons: ['好的'],
                        });
                    },
                },
            ],
        },
    ];
    // 启动一个node服务也就是用node部署打包后的文件
    proxys().then((res) => {
        const m = Menu.buildFromTemplate(menu);
        // 设置顶部菜单
        Menu.setApplicationMenu(m);
        // 窗口显示我们部属的前端项目
        mainWindow.loadURL(`http://127.0.0.1:${START_PORT}`);
        // 判断如果是dev环境将devTool打开
        isDev && mainWindow.webContents.openDevTools();
    });

    // 启动后端服务
    startServer();
}

function checkUpdate() {
    if (enviroment === 'win') {
        // 本地模拟更新的端口
        autoUpdater.setFeedURL('http://127.0.0.1:9005/win32');
    } else {
        // mac系統更新
    }

    autoUpdater.checkForUpdates();
    //监听'error'事件
    autoUpdater.on('error', (err) => {
        logMsg(`autoUpdater错误${err}`);
    });

    //监听'update-available'事件，发现有新版本时触发
    autoUpdater.on('update-available', () => {
        logMsg('发现更新-----------------------------');
    });

    autoUpdater.on('update-not-available', () => {
        dialog
        .showMessageBox({
            type: 'info',
            title: '应用更新',
            message: '未发现新版本'
        })
    })

    //监听'update-downloaded'事件，新版本下载完成时触发
    autoUpdater.on('update-downloaded', () => {
        // 如果有更新提示用户并后台下载安装
        dialog
            .showMessageBox({
                type: 'info',
                title: '应用更新',
                message: '发现新版本，是否更新？',
                buttons: ['是', '否'],
            })
            .then((buttonIndex) => {
                if (buttonIndex.response == 0) {
                    //选择是，则退出程序，安装新版本
                    autoUpdater.quitAndInstall();
                    app.quit();
                }
            });
    });
}
function logMsg(msg) {
    log.info(msg);
}

function startServer() {
    // 启动后台打包后的可执行文件
    logMsg('开始执行-----------------------------');
    let shellCode;
    if (enviroment === 'win') {
        logMsg(`程序安装目录: ${appPath}`);
        // serverPath = path.resolve(__dirname, 'server/python');
        const serverPathSplit = appPath.split(':');
        shellCode = `${serverPathSplit[0]}: && cd ${serverPathSplit[1]}${
            isDev ? '' : '\\resources'
        }\\server\\python && ${enviroment === 'win' ? 'main.exe' : 'test'}`;
        logMsg(`即将执行脚本：${shellCode}`);
    }
    // 子进程运行后端可执行文件
    cp.exec(shellCode, (error, stdout, stderr) => {
        if (error) {
            logMsg(`脚本执行错误: ${error}`);
            return;
        }
        logMsg('执行成功');
        logMsg(`stdout: ${stdout}`);
        log.error(`stderr: ${stderr}`);
    });
    logMsg('结束执行-----------------------------');
}

function proxys() {
    return new Promise((resolve, reject) => {
        application.use(
            createProxyMiddleware('/api', {
                target: DOMAIN,
                changeOrigin: true,
                secure: false,
            })
        );
        application.use(
            createProxyMiddleware('/v1', {
                target: DOMAIN,
                changeOrigin: true,
                secure: false,
            })
        );
        application.use(
            createProxyMiddleware('/icons', {
                target: DOMAIN,
                changeOrigin: true,
                secure: false,
            })
        );
        application.use(
            createProxyMiddleware('/apks', {
                target: DOMAIN,
                changeOrigin: true,
                secure: false,
            })
        );
        application.use(
            createProxyMiddleware('/zip', {
                target: DOMAIN,
                changeOrigin: true,
                secure: false,
            })
        );
        application.use(
            createProxyMiddleware('/img_avatar', {
                target: DOMAIN,
                changeOrigin: true,
                secure: false,
            })
        );
        application.use(
            createProxyMiddleware('/screenshot', {
                target: DOMAIN,
                changeOrigin: true,
                secure: false,
            })
        );
        application.use(
            createProxyMiddleware('/data', {
                target: DOMAIN,
                changeOrigin: true,
                secure: false,
            })
        );
        application.use(
            createProxyMiddleware('/android', {
                target: DOMAIN,
                changeOrigin: true,
                secure: false,
            })
        );
        application.use(
            createProxyMiddleware('/ipa_icons', {
                target: DOMAIN,
                changeOrigin: true,
                secure: false,
            })
        );
        application.use(
            createProxyMiddleware('/ipas', {
                target: DOMAIN,
                changeOrigin: true,
                secure: false,
            })
        );
        application.use(
            createProxyMiddleware('/admin', {
                target: DOMAIN,
                changeOrigin: true,
                secure: false,
            })
        );
        application.use(
            createProxyMiddleware('/ws', {
                target: DOMAIN,
                changeOrigin: true,
                secure: false,
            })
        );
        application.use(
            createProxyMiddleware('/desktop', {
                target: 'http://127.0.0.1:29096',
                changeOrigin: true,
                secure: false,
            })
        );
        // 这一步是用户前端项目是history路由比如写的相关配置
        application.use(express.static(path.resolve(__dirname, 'build')));
        application.get('*', function (request, response) {
            response.sendFile(path.resolve(__dirname, 'build', 'index.html'));
        });
        localServer = application.listen(START_PORT, () => {
            resolve();
        });
    });
}
app.whenReady().then(() => {
    createWindow();
    // 判断窗口ready之后检测更新
    checkUpdate();
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', function () {
    // 关闭窗口之后需要杀掉node启动的服务
    localServer.close();
    logMsg(`node服务已中止---------------------`);
    if (enviroment === 'win') {
        cp.exec(`taskkill /f /t /im main.exe`, (error, stdout, stderr) => {
            if (error) {
                logMsg(`杀死进程执行错误: ${error}`);
                return;
            }
            logMsg(`stdout: ${stdout}`);
            log.error(`stderr: ${stderr}`);
            logMsg('后台服务程序已被杀死---------------------');
        });
    }

    if (process.platform !== 'darwin') app.quit();
});
