use std::{
    error::Error, fs::{self, File}, io::BufReader, sync::Arc
};

use axum::{
    extract::State,
    http::{header::{CONTENT_ENCODING, CONTENT_TYPE}, StatusCode},
    response::IntoResponse,
    routing::get,
    Router,
};
use html_macro::html;
use mime::TEXT_HTML_UTF_8;
use serde::Deserialize;

use flate2::write::GzEncoder;
use flate2::Compression;
use std::io::prelude::*;

use tokio::net::TcpListener;
use virtual_node::*;

#[derive(Deserialize, Debug, Clone)]
struct Player {
    name: String,
    score: u32,
}

#[derive(Deserialize)]
struct PlayersJson {
    players: Vec<Player>,
}

fn compress_to_gzip(bytes: &[u8]) -> Vec<u8> {
    let mut encoder = GzEncoder::new(vec![], Compression::default());
    encoder.write_all(bytes).unwrap();
    encoder.finish().unwrap()
}

/// Return Arc so we don't clone the whole vector, but instead just the pointer reference
fn read_players() -> Result<Arc<[Player]>, Box<dyn Error>> {
    let file = File::open("../../players.json")?;
    let players_json: PlayersJson = serde_json::from_reader(BufReader::new(file))?;
    Ok(Arc::from(players_json.players))
}

fn player_node(player: &Player) -> VirtualNode {
    html! { <li class="my-2 ml-2 odd:bg-gray-50">{*player.name} {" - "} {player.score}</li> }
}

fn player_list_node(players: &[Player]) -> VirtualNode {
    let nodes = players
        .iter()
        .map(player_node)
        .collect::<Vec<VirtualNode>>();
    html! { <ul class="border">{nodes}</ul> }
}

async fn render_html(State(players): State<Arc<[Player]>>) -> impl IntoResponse {
    let html_nodes = html! {
        <html lang="en">
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link href="/styles.css" rel="stylesheet">
            </head>
            <body class="container">
              <div class="ml-2">
                  <h1 class="text-xl my-4">Players from Rust App</h1>
                  {player_list_node(&players)}
              </div>
            </body>
        </html>
    };

    let headers = [(CONTENT_TYPE, TEXT_HTML_UTF_8.as_ref()), (CONTENT_ENCODING, "gzip")];

    (headers, compress_to_gzip(html_nodes.to_string().as_bytes()))
}

async fn read_styles() -> impl IntoResponse {
    match fs::read("./assets/styles.css") {
        Ok(styles_css) => {
            let headers = [(CONTENT_ENCODING, "gzip")];
            (headers, compress_to_gzip(&styles_css)).into_response()
        }
        Err(_) => (StatusCode::NOT_FOUND, "Styles not found").into_response(),
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    let app = Router::new()
        .route("/", get(render_html))
        .route("/styles.css", get(read_styles))
        .with_state(read_players()?);

    axum::serve(TcpListener::bind("127.0.0.1:8080").await?, app).await?;
    Ok(())
}
