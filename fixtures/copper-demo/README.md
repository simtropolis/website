# Guided Copper example

An original, dependency-free Rust workspace for the website demonstration. `before/` has a panic-prone `u16` parser and two tests. `after/` returns `Result<u16, ParseIntError>`, updates the caller, and has six tests. This demonstrates parsing the `u16` range; it does not claim to validate every network-port policy (for example, port zero is a valid `u16`).

`workspace.json` is the public browser fixture generated from the actual Rust files and `recorded-output.txt`. `recording.json` binds the recording to the patched files with SHA-256. No visitor code is executed or persisted. The record contains only actual test count and individual test-result lines; machine-specific paths and timing are omitted.

Validate with `bun run test:demo:rust`. This runs Cargo offline and locked against both fixtures and compares the actual patched test results with the recording. The normal website test suite verifies JSON/source equality and the recording hash without requiring Rust in Amplify.

When changing the example, run its real tests first, update the normalized recording, run `node scripts/demo-fixtures.mjs --write`, and format the generated JSON with Prettier. Never fabricate recorded output. Commit the Rust files, locks, recording, and generated JSON together.
