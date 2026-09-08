/// Read a port from a small configuration file.
pub fn parse_port(input: &str) -> u16 {
    input.trim().parse::<u16>().unwrap()
}
