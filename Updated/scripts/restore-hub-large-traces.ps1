$ErrorActionPreference = 'Stop'
$reportRoot = [System.IO.Path]::GetFullPath($PSScriptRoot)
$manifest = Get-Content -LiteralPath (Join-Path $reportRoot 'LARGE-TRACES.json') -Raw | ConvertFrom-Json
function Resolve-ReportPath([string]$relative) {
    $resolved = [System.IO.Path]::GetFullPath((Join-Path $reportRoot $relative))
    if (-not $resolved.StartsWith($reportRoot + [System.IO.Path]::DirectorySeparatorChar, [System.StringComparison]::OrdinalIgnoreCase)) { throw 'Unsafe trace path' }
    return $resolved
}
function Get-TraceHash([string]$file) {
    $stream = [System.IO.File]::OpenRead($file)
    $algorithm = [System.Security.Cryptography.SHA256]::Create()
    try { return ([System.BitConverter]::ToString($algorithm.ComputeHash($stream))).Replace('-', '').ToLowerInvariant() }
    finally { $stream.Dispose(); $algorithm.Dispose() }
}
foreach ($trace in $manifest.traces) {
    $destination = Resolve-ReportPath $trace.file
    if (Test-Path -LiteralPath $destination) {
        if ((Get-TraceHash $destination) -ne $trace.sha256) { throw ('Existing trace differs: ' + $trace.file) }
        Write-Host ('Already restored: ' + $trace.file)
        continue
    }
    $temporary = $destination + '.restoring'
    New-Item -ItemType Directory -Force -Path ([System.IO.Path]::GetDirectoryName($destination)) | Out-Null
    $output = [System.IO.File]::Open($temporary, [System.IO.FileMode]::Create)
    try {
        foreach ($part in $trace.parts) {
            $partPath = Resolve-ReportPath $part.file
            if ((Get-TraceHash $partPath) -ne $part.sha256) { throw ('Damaged or missing trace part: ' + $part.file) }
            $inputStream = [System.IO.File]::OpenRead($partPath)
            try { $inputStream.CopyTo($output) } finally { $inputStream.Dispose() }
        }
    } finally { $output.Dispose() }
    if ((Get-Item -LiteralPath $temporary).Length -ne $trace.bytes -or (Get-TraceHash $temporary) -ne $trace.sha256) { throw ('Restored trace verification failed: ' + $trace.file) }
    Move-Item -LiteralPath $temporary -Destination $destination
    Write-Host ('Restored and verified: ' + $trace.file)
}
Write-Host 'All large traces are ready. Open index.html. Part files were retained.'
