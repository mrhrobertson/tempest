# Tempest

A containerised password sharing tool using Fernet symmetric encryption.

## What is Tempest and why should I use it?

Tempest is my attempt at a secret-sharing tool to get around the current vulnerabilities found in other open-source tools due to PyCA's implementation of Fernet, which uses AES-128 with CBC which is not secure by modern standards. With that in mind, I wrote [Furnace](https://github.com/mrhrobertson/furnace), a TypeScript implementation of Fernet encoding, but the token's content is encrypted using XChaCha20-Poly1305, which is a quantum-resistant combination and should keep this secure for the next few years. If a newer and better encryption method becomes available, this library can be updated with ease to support it.

This means that Tempest can take your secrets, store them safely, and makes them easily movable. When your link is generated, a key is appended to your link. This is generated by the server and is **NEVER** stored in the database. If you modify it or remove it from the URL, the URL will not reveal the secret. When you generate the link you can set a TTL (time-to-live) or a max number of clicks. If all clicks are used, or the TTL expires, the next time someone tries to use the link, it will be deleted.

## How can I use this?

Tempest is containerised for modularity and scalability. It's also easy to deploy and maintain.

1. Download the `compose.yml` to the directory you want to use and run `docker compose up -d`. This will build the environment out for you, and will run a un-customised version of Tempest.
2. Tempest uses named volumes to manage all the data, so you will need to either copy files out of the container and put them back in after editing. This can be done with the following commands:

```sh
# For copying the files out
docker cp $(docker compose ps -q core):/app/config ./local-config
docker cp $(docker compose ps -q core):/app/public ./local-public

# edit the files as you see fit...

# For copying back in
docker cp ./local-config/. $(docker compose ps -q core):/app/config/
docker cp ./local-public/. $(docker compose ps -q core):/app/public/
```

3. For TLS certificates, you can bring your own proxy (BYOP) or modify the HTTP-01 challenge details (depending on your existing DNS/TLS setup, you can modify Traefik to use DNS-01/TLS-ALPN-01 challenges) in the `compose.yml`. To use HTTP challenges, change the following lines:

```yaml
- "--certificatesresolvers.letsencrypt.acme.email=your-email@example.com" # on line 13 (unlucky for some)
- "traefik.http.routers.core.rule=Host(`your-domain.com`)" # on line 28 (in a state)
```

## Customisation

> NOTE: All these changes will require a restart of the core container as the application builds on boot which is when the `config` and `public` folders are checked.

To add your own logo for the favicon and the top of the interface, put a image/SVG in the `public` folder and then update `strings.generic.logo` in `strings.json` to match the relative file path. The app supports a light theme and a dark theme, so you can choose different colourways depending on the browser settings. This is also where you can update all the text in the application.

You can set the default values in the app and enable/disable functionality (mailto on generated links + link generation on revealed links, multiline input, developer branding) using `config.json`.

For theming and changing colours of the app, you can modify the `tailwind.config.ts` which allows you to use the Tailwind colour options, or make your own.
