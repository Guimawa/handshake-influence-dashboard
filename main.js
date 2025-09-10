const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
  // Créer la fenêtre du navigateur
  const mainWindow = new BrowserWindow({
    width: 1600,
    height: 1200,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false
    },
    title: 'Handshake Influence Dashboard',
    show: false, // Ne pas afficher immédiatement
    frame: true,
    resizable: true,
    minimizable: true,
    maximizable: true
  })

  // Charger le fichier HTML principal
  mainWindow.loadFile('index.html')

  // Afficher la fenêtre quand elle est prête
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  // Ouvrir les DevTools en développement (optionnel)
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools()
  }
}

// Désactiver le cache pour éviter les erreurs
app.commandLine.appendSwitch('--disable-gpu-sandbox')
app.commandLine.appendSwitch('--disable-software-rasterizer')
app.commandLine.appendSwitch('--disable-gpu')

// Cette méthode sera appelée quand Electron aura fini de s'initialiser
app.whenReady().then(createWindow)

// Quitter quand toutes les fenêtres sont fermées
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})