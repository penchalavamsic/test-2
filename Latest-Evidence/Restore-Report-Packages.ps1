$ErrorActionPreference = 'Stop'
$reportRoot = [System.IO.Path]::GetFullPath($PSScriptRoot)
$manifest = Get-Content -LiteralPath (Join-Path $reportRoot 'PACKAGE-PARTS.json') -Raw | ConvertFrom-Json
function Resolve-ReportPath([string]$relative) {
    $resolved = [System.IO.Path]::GetFullPath((Join-Path $reportRoot $relative))
    if (-not $resolved.StartsWith($reportRoot + [System.IO.Path]::DirectorySeparatorChar, [System.StringComparison]::OrdinalIgnoreCase)) { throw 'Unsafe package path' }
    return $resolved
}
function Get-PackageHash([string]$file) {
    $stream = [System.IO.File]::OpenRead($file)
    $algorithm = [System.Security.Cryptography.SHA256]::Create()
    try { return ([System.BitConverter]::ToString($algorithm.ComputeHash($stream))).Replace('-', '').ToLowerInvariant() }
    finally { $stream.Dispose(); $algorithm.Dispose() }
}
foreach ($package in $manifest.packages) {
    $destination = Resolve-ReportPath $package.file
    if (Test-Path -LiteralPath $destination) {
        if ((Get-PackageHash $destination) -ne $package.sha256) { throw ('Existing package differs: ' + $package.file) }
        Write-Host ('Already restored: ' + $package.file)
        continue
    }
    $temporary = $destination + '.restoring'
    New-Item -ItemType Directory -Force -Path ([System.IO.Path]::GetDirectoryName($destination)) | Out-Null
    $output = [System.IO.File]::Open($temporary, [System.IO.FileMode]::Create)
    try {
        foreach ($part in $package.parts) {
            $partPath = Resolve-ReportPath $part.file
            if ((Get-PackageHash $partPath) -ne $part.sha256) { throw ('Damaged or missing package part: ' + $part.file) }
            $inputStream = [System.IO.File]::OpenRead($partPath)
            try { $inputStream.CopyTo($output) } finally { $inputStream.Dispose() }
        }
    } finally { $output.Dispose() }
    if ((Get-Item -LiteralPath $temporary).Length -ne $package.bytes -or (Get-PackageHash $temporary) -ne $package.sha256) { throw ('Restored package verification failed: ' + $package.file) }
    Move-Item -LiteralPath $temporary -Destination $destination
    Write-Host ('Restored and verified: ' + $package.file)
}
Write-Host 'All report packages are ready. Extract each Complete-Suite-Test-Report.zip fully and open its HTML report. Part files were retained.'
