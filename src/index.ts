import { app, BrowserWindow, remote } from 'electron';
import * as path from 'path';
import * as url from 'url';

let win: BrowserWindow | null
let devtools: any

const createWindow = async () => {
    win = new BrowserWindow({ width: 800, height: 600 })

    win.webContents.openDevTools();
    console.log(url.format({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file:',
    }))

    win = new BrowserWindow()
    devtools = new BrowserWindow()
    win.loadURL('https://github.com')
    win.webContents.setDevToolsWebContents(devtools.webContents)
    win.webContents.openDevTools({ mode: 'detach' })

    win.loadFile('index.html')

    win.on('closed', () => {
        win = null
    })

    // win.loadFile(url.format({
    //     pathname: path.join(__dirname, 'index.html'),
    //     protocol: 'file:',
    //     slashes: true,
    // }))
}

app.on('ready', createWindow);