use port_parser::parse_port;

fn main() {
    let port = parse_port("8080");
    println!("Listening on port {port}");
}
