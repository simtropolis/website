use port_parser::parse_port;

#[test]
fn accepts_valid_port() {
    assert_eq!(parse_port("8080").unwrap(), 8080);
}

#[test]
fn trims_whitespace() {
    assert_eq!(parse_port(" 3000\n").unwrap(), 3000);
}

#[test]
fn rejects_empty_input() {
    assert!(parse_port("").is_err());
}

#[test]
fn rejects_letters() {
    assert!(parse_port("copper").is_err());
}

#[test]
fn rejects_negative_ports() {
    assert!(parse_port("-1").is_err());
}

#[test]
fn rejects_out_of_range_ports() {
    assert!(parse_port("65536").is_err());
}
