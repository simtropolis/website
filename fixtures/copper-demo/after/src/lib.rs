use std::num::ParseIntError;

/// Return an error instead of panicking on invalid input.
pub fn parse_port(input: &str) -> Result<u16, ParseIntError> {
    input.trim().parse::<u16>()
}
