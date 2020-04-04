import { app, App, BrowserWindow } from 'electron'
import windowStateKeeper from 'electron-window-state'

class TimerApp {
    mainWindow: BrowserWindow | null = null
    app: App
    mainURL: string = `file://${__dirname}/../renderer/index.html`
    mainWindowState!: windowStateKeeper.State

    constructor(app: App) {
        this.app = app
        this.app.on('window-all-closed', this.onWindowAllClosed.bind(this))
        this.app.on('ready', this.create.bind(this))
        this.app.on('activate', this.onActivated.bind(this))
    }

    private onWindowAllClosed() {
        this.app.quit()
    }

    private create() {
        this.mainWindowState = windowStateKeeper({})

        this.mainWindow = new BrowserWindow({
            x: this.mainWindowState.x,
            y: this.mainWindowState.y,
            width: this.mainWindowState.width,
            height: this.mainWindowState.height,
            minWidth: 500,
            minHeight: 250,
            acceptFirstMouse: true,
            frame: false,
            opacity: 0.96,
            webPreferences: {
                nodeIntegration: true
            },
            alwaysOnTop: true,
        })

        this.mainWindow.loadURL(this.mainURL)
        this.mainWindowState.manage(this.mainWindow)

        this.mainWindow.webContents.openDevTools({
            mode: 'detach',
        })

        this.mainWindow.on('closed', () => {
            this.mainWindow = null
        })
    }

    private onReady() {
        this.create()
    }

    private onActivated() {
        if (this.mainWindow === null) {
            this.create()
        }
    }
}

const MyApp: TimerApp = new TimerApp(app)
