use port_parser::parse_port;

#[test]
fn accepts_valid_port() {
    assert_eq!(parse_port("8080"), 8080);
}

#[test]
fn trims_whitespace() {
    assert_eq!(parse_port(" 3000\n"), 3000);
}
