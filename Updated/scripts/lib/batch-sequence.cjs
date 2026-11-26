/** Execute each batch at most once. Continuing never changes a failed outcome. */
async function runBatchSequence(batches, execute, options = {}) {
  const results = [];
  for (const batch of batches) {
    let result;
    try { result = await execute(batch); }
    catch (error) { result = { batch: batch.name || batch, exitCode: 1, infrastructureError: error instanceof Error ? error.name : 'UnknownError' }; }
    results.push(result);
    if (options.onResult) await options.onResult(results);
    if (result.exitCode && !options.continueOnFailure) break;
  }
  return { results, exitCode: results.some(result => result.exitCode !== 0) ? 1 : 0 };
}
module.exports = { runBatchSequence };
