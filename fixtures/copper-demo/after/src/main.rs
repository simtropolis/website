use port_parser::parse_port;

fn main() {
    match parse_port("8080") {
        Ok(port) => println!("Listening on port {port}"),
        Err(error) => eprintln!("Invalid port: {error}"),
    }
}
