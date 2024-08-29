# Rust with Axum and Tokio

The crate has all optimizations enabled in dev profile (`opt-level = 3`).

The output is constructed using html macro, which generates Virtual Nodes and
replicates "jsx" – style. Output is also compressed into gzip to match with
other rendering comparisons.

The returned html is styled with tailwind, which needs to be separately built.

Result cases are intentionally ignored due to the nature of this comparison
example. We can always assume that we end in the happy path, and if not it's ok
to panic.

## Running the application

1. Install rust 

```sh
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
```

2. Build tailwind styles

```sh
npx tailwindcss -i ./tailwind.css -o ./assets/styles.css
```

3. Start the server

```sh
cargo run .
```

4. Server is available at [http://localhost:8080](http://localhost:8080)
