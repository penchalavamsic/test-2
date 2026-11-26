<#
.SYNOPSIS
Run named batches with permanent HTML, JSON, JUnit, video, trace and step evidence.
.DESCRIPTION
Uses the installed Playwright CLI through a Node child process without a shell or
an external preflight deadline. Legacy SUD batch names remain supported.
#>
[CmdletBinding(DefaultParameterSetName = 'Run')]
param(
    [Parameter(ParameterSetName = 'Run')][string]$Suite,
    [Parameter(ParameterSetName = 'Run')][string]$Batch,
    [Parameter(Mandatory = $true, ParameterSetName = 'List')][switch]$ListBatches,
    [Parameter(ParameterSetName = 'Run')][string]$AccessProfile,
    [Parameter(ParameterSetName = 'Run')][ValidateRange(1,16)][int]$Workers = 1,
    [Parameter(ParameterSetName = 'Run')][ValidateRange(1,50)][int]$BatchSize = 20,
    [Parameter(ParameterSetName = 'Run')][switch]$Headed,
    [Parameter(ParameterSetName = 'Run')][switch]$DetailedEvidence,
    [Parameter(ParameterSetName = 'Run')][switch]$TestReport,
    [Parameter(ParameterSetName = 'Run')][switch]$ShareableReport,
    [Parameter(ParameterSetName = 'Run')][switch]$DryRun,
    [Parameter(Mandatory = $true, ParameterSetName = 'Rebuild')][string]$RebuildReportsFrom
)
$ErrorActionPreference = 'Stop'
$runner = Join-Path $PSScriptRoot 'run-batches.cjs'
$runnerArguments = @()
if ($RebuildReportsFrom) { $runnerArguments += @('--rebuild', $RebuildReportsFrom) }
elseif ($ListBatches) { $runnerArguments += '--list' }
else {
    if ($Suite) { $runnerArguments += @('--suite', $Suite) }
    if ($Batch) { $runnerArguments += @('--batch', $Batch) }
    elseif ($Suite) { $runnerArguments += '--all' }
    else { $runnerArguments += '--list' }
    if ($AccessProfile) { $runnerArguments += @('--profile', $AccessProfile) }
    $runnerArguments += @('--workers', [string]$Workers, '--size', [string]$BatchSize)
    if ($Headed) { $runnerArguments += '--headed' }
    if ($DryRun) { $runnerArguments += '--dry-run' }
    if ($TestReport -or $ShareableReport) { $runnerArguments += '--portable' }
}
# Evidence is enabled by default. The legacy switch remains accepted.
$previousEvidence = $env:PLAYWRIGHT_EVIDENCE_MODE
try {
    if ($DetailedEvidence) { $env:PLAYWRIGHT_EVIDENCE_MODE = 'detailed' }
    & node $runner @runnerArguments
    $runExitCode = $LASTEXITCODE
} finally {
    $env:PLAYWRIGHT_EVIDENCE_MODE = $previousEvidence
}
exit $runExitCode
