# 📤 Guía para subir archivos al Railway Volume

## Método 1: SSH Interactivo (Explorar y copiar manualmente)

```bash
# 1. Conectarte al contenedor
railway shell

# 2. Dentro del contenedor, verificar que el Volume está montado
ls -la /app/api/public/uploads

# 3. Crear carpetas si no existen
mkdir -p /app/api/public/uploads/images/anime/easy
mkdir -p /app/api/public/uploads/images/anime/medium
mkdir -p /app/api/public/uploads/images/anime/hard
mkdir -p /app/api/public/uploads/images/anime/very_easy
mkdir -p /app/api/public/uploads/images/character
mkdir -p /app/api/public/uploads/audios/openings

# 4. Para salir
exit
```

## Método 2: Subir archivos con Railway Run

Desde tu terminal local (Windows), para cada archivo:

```bash
# Subir una imagen
railway run -- bash -c "cat > /app/api/public/uploads/images/anime/easy/bocchi_easy.webp" < api/public/uploads/images/anime/easy/bocchi_easy.webp

# Subir un audio
railway run -- bash -c "cat > /app/api/public/uploads/audios/openings/one_piece.mp3" < api/public/uploads/audios/openings/one_piece.mp3
```

## Método 3: Script automatizado (PowerShell)

Guarda esto en `upload-all.ps1`:

```powershell
# upload-all.ps1
$files = Get-ChildItem -Path "api\public\uploads" -Recurse -File

foreach ($file in $files) {
    $relativePath = $file.FullName.Replace((Get-Location).Path + "\api\public\uploads\", "").Replace("\", "/")
    $destPath = "/app/api/public/uploads/$relativePath"
    
    Write-Host "Subiendo: $relativePath"
    
    # Crear directorio en Railway
    $dir = Split-Path $destPath -Parent
    railway run -- bash -c "mkdir -p '$dir'"
    
    # Subir archivo
    Get-Content $file.FullName -Raw -AsByteStream | railway run -- bash -c "cat > '$destPath'"
    
    Write-Host "✓ Subido: $relativePath"
}

Write-Host "🎉 Todos los archivos subidos!"
```

Luego ejecuta:
```powershell
.\upload-all.ps1
```

## Método 4: Usar SFTP con WinSCP (Visual)

1. Railway → Settings → Enable SSH
2. Copia el comando SSH que te da
3. En WinSCP:
   - Protocol: SFTP
   - Host/User/Password: del comando SSH de Railway
4. Arrastra y suelta archivos visualmente

## Verificar archivos subidos

```bash
railway run -- ls -la /app/api/public/uploads/images/anime/easy
railway run -- du -sh /app/api/public/uploads
```

## Probar que funciona

Accede a:
```
https://tu-url.railway.app/uploads/images/anime/easy/bocchi_easy.webp
```
